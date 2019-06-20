<template>
    <div class="content">
        <video class="my-video"  id="myVideo" :poster="poster" :danmu-btn="false" :src="videoSrc"  enable-danmu  autoplay="true" controls>
        </video>
        <div class="video-name">
            <span class="video-name-left">{{team}}</span>
            <div class="video-name-right">{{name}}</div>
        </div>
        <div class="introduction">{{introduction}}</div>
        <div class="parse-data">
            <wxParse :content="article"  noData=""/>
        </div>
        <div class="video-bottom">
            <div class="gohome" @click="goHome">首页</div>
            <div class='video-edit' v-if="isLike==false">
                <div class="dianzan" @click="like()">
                    <img src="/static/images/zan-white.png" alt="">
                    <span>{{number}}</span>
                </div>
                <button class="share-btn" open-type="share">
                    <img src="/static/images/wechart-white.png" alt="">
                    <span>分享</span>
                </button>
            </div>
            <div class='video-edit' v-if="isLike==true">
                <div class="dianzan">
                    <img src="/static/images/detail-press.png" alt="">
                    <span>{{number}}</span>
                </div>
                <button class="share-btn" open-type="share">
                    <img src="/static/images/wechart-white.png" alt="">
                    <span>分享</span>
                </button>
            </div>
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
            poster:"",
            videoSrc:"",
            team:"",
            name:"",
            number:0,
            article:"",
            introduction:"",
            isLike:false
        }
    },
    onLoad(){
        Object.assign(this, this.$options.data());
        console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.id=this.$root.$mp.query.id;
        }
        this.getDetail();
    },
    onShow(){
        this.videoSrc=wx.getStorageSync("videoAddress");
        console.log(this.videoSrc);
    },
    methods:{
        getDetail(){
            util.request(api.Dancedetail+this.id+"/detail",{},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.poster=res.api_data.cover;
                    if(this.videoSrc==""){
                         this.videoSrc=res.api_data.video;
                    }
                    this.team=res.api_data.team;
                    this.name=res.api_data.name;
                    this.article=res.api_data.detail;
                    this.number=res.api_data.likeCount;
                    this.isLike=res.api_data.isLike;
                    this.introduction=res.api_data.introduction;
                }
            })
        },
        like(){
            util.request(api.DanceLike,{activityDanceId:this.id},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    console.log("点赞成功")
                    this.number=this.number+1;
                    this.isLike=true;
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
            })
        },
        goHome(){
            wx.switchTab({
                url:"../index/main"
            })
        }
    },
        onShareAppMessage: function (res) {
        console.log(res);
        if (res.from === 'button') {
            console.log(res.target.dataset.ids)
            return {
                title: "给世界一个陪伴你的机会",
                path: "/pages/dancedetail/main?id="+this.id
           }
        } else {
            return {
                title: "给世界一个陪伴你的机会",
               path: "/pages/dancedetail/main?id="+this.id
           }
        }
    },
}
</script>
<style lang="stylus" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.my-video{
    width 100%
    height 400rpx
}
.video-name{
    width 690rpx
    margin 0 auto
    padding 30rpx 0
    display flex
    flex-flow row nowrap
    align-items center
    justify-content space-between
    font-family: PingFangSC-Medium;
    font-size: 36rpx;
    color: #333333;
    .video-name-right{
        font-family: PingFangSC-Regular;
        font-size: 30rpx;
        color: #43AEC8;
        height 50rpx
        line-height 50rpx
        padding 0rpx 20rpx
        background rgba(67,174,207,0.1)
        border-radius: 25rpx;
    }
    .video-name-lef{
        font-weight bold
    }
}
.parse-data{
    padding 0 30rpx 150rpx 30rpx
}
.introduction{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 22px;
    width 690rpx
    margin 0 auto 20rpx auto
}
.video-bottom{
    position fixed
    z-index 9
    bottom 0
    width 100%
    height 124rpx
    background-color #ffffff
    border-top 1rpx solid #ddd
    display flex
    flex-flow row nowrap
    justify-content space-between
    align-items center
    .gohome{
        width 138rpx
        height 84rpx
        line-height 84rpx
        text-align center
        font-family: PingFangSC-Regular;
        font-size: 36rpx;
        color: #0DCA6C;
        border: 1px solid #0DCA6C;
        border-radius: 4px 0px 0px 4px;
        box-sizing border-box
        margin-left 24rpx
    }
    .video-edit{
        width 554rpx
        height 84rpx
        // line-height 84rpx
        background: #0DCA6C;
        border-radius: 0px 6px 6px 0px;
        margin-right 24rpx
        font-family: PingFangSC-Medium;
        font-size: 36rpx;
        color: #FFFFFF;
        display flex
        flex-flow row nowrap
        align-items center
        div{
            width 277rpx
            height 84rpx
            display flex
            flex-flow row nowrap
            justify-content center
            align-items center
            position relative
            img{
                width 40rpx
                height 36rpx
                margin-right 18rpx
            }
        }
        div::after{
            position absolute
            content ""
            z-index 99
            right 1rpx
            top 10rpx
            bottom 10rpx
            width 2rpx
            background-color #fff
        }
        button{
            width 277rpx
            height 84rpx
            display flex
            justify-content center
            flex-flow row nowrap
            align-items center
            background: #0DCA6C;
            color: #FFFFFF;
            padding 0
            line-height 1
            img{
                width 50rpx
                height 42rpx
                margin-right 19rpx
            }
        }
        button::after{
            border none
        }
    }
}
.wxParse{
    color:#666;
    line-height:1;

}
.wxParse .p {
    margin:0 0 !important;
}

</style>


