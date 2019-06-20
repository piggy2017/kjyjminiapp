<template>
    <div class="activity">
        <swiper class="banner" circular="true" indicator-dots="true" autoplay="true" indicator-active-color="#fff" interval="3000" duration="1000">
            <swiper-item class="index-swiper-item" v-for="(item,index) in banner" :key="index">
                <image :src="item" background-size="cover"></image>
            </swiper-item>
        </swiper>
        <div class="content">
            <div class="content-name">{{name}}</div>
            <div class="price-con">
                <div class="price-con-left">
                    <span class="blue">￥{{info.price}}</span>/成人
                </div>
                <div class="price-con-right">
                    <span class="blue">￥{{info.childPrice}}</span>/儿童
                </div>
            </div>
            <div class="progress">
                <progress :percent="pecentNum" border-radius="17px" stroke-width="17px" class="activity-progress" activeColor="#43AEC8" backgroundColor="#CDE3E8"/>
                <div class="progress-position-1">
                    {{info.joinNum}}人已报名
                </div>
                <div class="hr" :style="{ left: positionLeft }"></div>
            </div>
            <div class="time">
                <span>{{info.date}}</span>
                <span>满{{info.validPersonNum}}人开团，限{{info.personNum}}人</span>
            </div>
            <div class="hr-bg"></div>
            <div class="activity-detail">
                <div class="activity-detail-tit">
                    <img src="/static/images/goods-detail-icon.png" alt="">
                    <span>产品详情</span>
                    <img src="/static/images/goods-detail-icon.png" alt="">
                </div>
                <div class="parse-data">
                    <wxParse :content="article"  noData=""/>
                </div>
            </div>
        </div>
        <button open-type="share" class="share-btn"></button>

        <div class="join-btn">
            <div class="call" @click="phoneCall">
                <img src="/static/images/tel-button.png" alt="">
            </div>
            <div class="join-content" @click="joinActivity">立即报名</div>
        </div>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
import wxParse from 'mpvue-wxparse'
export default {
    components: {
        wxParse
    },
    data(){
        return{
            id:"",
            banner:[],
            name:"",
            info:{},
            pecentNum:20,
            positionLeft:"",
            article:"",
            contact:""
        }
    },
    onLoad(options){ 
        Object.assign(this, this.$options.data());
        console.log("mountedmountedmountedmountedmountedmounted");
        var scan_url = decodeURIComponent(options.scene);
        console.log(scan_url);
        this.banner=[];
        this.id="";
        this.name="";
        this.info={},
        this.article="";
        this.contact="";
        // 获取小程序在 page onLoad 时候传递的 options
        wx.removeStorageSync("idlist");
        wx.removeStorageSync("postPHone");
        console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.id=this.$root.$mp.query.id;
            this.getDetail();
        }else{
            this.id="";
        }
    },
    onShow:function(){
        wx.removeStorageSync("idlist");
        wx.removeStorageSync("postPHone");
    },
    methods:{
        phoneCall(){
            console.log(this.contact)
            wx.makePhoneCall({
                phoneNumber: this.contact
            })
        },
        getDetail(){
            console.log(api.ActivityDetail+this.id);
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.ActivityDetail+this.id,{},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.banner=res.api_data.imageArr
                    this.name=res.api_data.name
                    this.info=res.api_data;
                    this.pecentNum=(res.api_data.joinNum/res.api_data.personNum)*100
                    this.positionLeft=(res.api_data.validPersonNum/res.api_data.personNum)*100+"%"
                    this.article=res.api_data.detail
                    this.contact=res.api_data.contact
                }
            })
        },
        joinActivity(){
            wx.navigateTo({
                url:"../activityorder/main?id="+this.id
            })
        }
    },
    //  分享功能
    onShareAppMessage: function (res) {
        console.log(res);
        if (res.from === 'button') {
            console.log(1111111)
            // 来自页面内转发按钮
          return {
            title: "好东西与您分享！",
            path: "/pages/activity/main?id="+this.id
          }

        } else {
            console.log(22222);
            return {
                title: "好东西与您分享！",
                path: "/pages/activity/main?id="+this.id
          }
        }
    }
    // onUnload: function() {
    //     console.log("onUnload to activity------------");
    //     //相当于监听返回按钮
    //     let pages = getCurrentPages();
    //     console.log(pages);
    //     wx.reLaunch({
    //         url:"../index/main"
    //     })
    // }
    //  分享功能

}

</script>
<style lang="stylus" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.wxParse view{
    white-space: pre-wrap !important;
}
.activity{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    position relative
    font-family: PingFangSC-Regular;
    .banner{
        height: 468rpx;
        width: 750rpx;
        overflow: hidden;
        .index-swiper-item{
            overflow: hidden;
            image{
                width: 100%;
                height: 100%;
            }
        }
    }
    .content{
        position absolute
        z-index 9
        background-color #ffffff
        width 100%
        border-top-left-radius 16rpx
        border-top-right-radius 16rpx
        top 450rpx
        .content-name{
            width 680rpx
            padding-top 20rpx
            margin 0 auto
            font-size: 32rpx;
            color: #333333;
            letter-spacing: 0;
            line-height: 48rpx;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical !important;
            overflow:hidden;
        }
        .price-con{
            width 680rpx
            margin 20rpx auto 10rpx auto
            font-size: 26rpx;
            color: #999999;
            display flex
            flex-flow row nowrap
            justify-content space-between
            .blue{
                font-family: PingFangSC-Medium;
                font-size: 36rpx;
                color: #43AEC8;
                margin-right 10rpx
            }
        }
        .progress{
            width 680rpx
            margin 0 auto 
            position relative
            .activity-progress{
                width 100%
            }
            .progress-position-1{
                position absolute
                width 100%
                text-align center
                z-index 10
                height 34rpx
                line-height 34rpx
                top 0
                font-family: PingFangSC-Medium;
                font-size: 24rpx;
                color: #FFFFFF;
            }
            .hr{
                width 2rpx
                height 34rpx
                background-color #fff
                position absolute
                z-index 12
                top 0
            }
        }
        .time{
            width 680rpx
            margin 18rpx auto 0 auto
            font-size: 26rpx;
            color: #666666;
            display flex
            flex-flow row nowrap
            justify-content space-between
            padding-bottom 24rpx
        }
        .hr-bg{
            width 100%
            height 16rpx
            background-color #f2f2f2
        }
        .activity-detail{
            width 100%
            background-color #ffffff
            padding-bottom 60rpx
            .activity-detail-tit{
                padding 30rpx 0
                width 100%
                display flex
                flex-flow row nowrap
                justify-content center
                align-items center
                img{
                    width 23rpx
                    height 23rpx
                }
                span{
                    margin 0 16rpx
                }
            }
            .parse-data{
                padding 0 30rpx
            }
        }
    }
    .join-btn{
        width 690rpx
        height 88rpx
        position fixed
        z-index 99
        bottom 46rpx
        left 30rpx
        background: #43AEC8;
        border-radius: 8rpx;
        display flex
        flex-flow row nowrap
        overflow hidden
        .call{
            width 100rpx
            height 100%
            background: #53DFE1;
            img{
                width 100%
                height 100%
            }
        }
        .join-content{
            width 590rpx
            height 100%
            line-height 88rpx
            text-align center
            font-family: PingFangSC-Medium;
            font-size: 36rpx;
            background: #43AEC8;
            color: #FFFFFF;
        }
    }
}
.share-btn{
    position fixed
    z-index 999
    left 24rpx
    bottom 200rpx
    background-image url("http://img.tracenet.cn/share-button.png")
    background-repeat no-repeat
    background-size 100%
    width 100rpx
    height 100rpx
    border-radius 50%
}
</style>


