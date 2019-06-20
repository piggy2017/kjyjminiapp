<template>
    <div class="content">
        <swiper class="banner" circular="true" indicator-dots="true" autoplay="true" indicator-active-color="#fff" interval="3000" duration="1000">
          <swiper-item class="index-swiper-item" v-for="(item,index) in banner" :key="index">
            <image :src="item" background-size="cover"></image>
          </swiper-item>
       </swiper>
      <div class="goods-content">
          <div class="goods-info">
              <p class="goods-name">{{info.name}}</p>
              <div class="goods-price">
                <div class="goods-price-left">
                    <span class="price-color">￥{{info.price}}</span>
                    <span class="before-price">￥{{info.marketPrice}}</span>
                </div>
                <div class="goods-price-right">
                    <img src="/static/images/icon-sale.png" alt="">
                    <span>已售：{{info.sales}}</span>
                </div>
              </div>
          </div>
          <div class="hr"></div>
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
      <div class="buy-btn" @click="buy">立即购买</div>
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
            info:{},
            article:"",
        }
    },
    onLoad(){
        Object.assign(this, this.$options.data());
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.id=this.$root.$mp.query.id;
            this.getData();
        }else{
            this.id="";
        }
    },
    methods:{
        getData(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.GoodsDetail,{productId:this.id},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.banner=res.api_data.pictureList;
                    this.info=res.api_data;
                    this.article=res.api_data.detail
                }
                wx.hideLoading();
            })
        },
        buy(){
            wx.navigateTo({
                url:"../purchasebuy/main?id="+this.id
            })
        }
    },
    onUnload(){
        console.log("onUnloadonUnloadonUnloadonUnloadonUnloadonUnload")
    },
    onHide(){
        console.log("onHideonHideonHideonHideonHideonHideonHideonHide")
    },
    //  分享功能
    onShareAppMessage: function (res) {
        console.log(res);
        if (res.from === 'button') {
            console.log(1111111)
            return {
                title: "好东西与您分享！",
                path: "/pages/purchasedetail/main?id="+this.id
           }
    //  分享功能
        } else {
            return {
                title: "好东西与您分享！",
                path: "/pages/purchasedetail/main?id="+this.id
           }
        }
    },
}
</script>
<style lang="stylus" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.wxParse view{
    white-space: pre-wrap !important;
}
.content{
    width 100%
    min-height 100vh
    position relative
    font-family: PingFangSC-Regular;
    .banner{
        height: 750rpx;
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
    .goods-content{
        position absolute
        z-index 9
        background-color #ffffff
        width 100%
        border-top-left-radius 16rpx
        border-top-right-radius 16rpx
        top 730rpx
        .goods-info{
            padding 20rpx 30rpx
            .goods-name{
                font-size: 32rpx;
                color: #000000;
                margin-bottom 10rpx
            }
            .goods-price{
                display flex
                flex-flow row nowrap
                align-items center
                justify-content space-between
                .goods-price-left{
                    .price-color{
                        font-family: PingFangSC-Semibold;
                        font-size: 36rpx;
                        color: #43AEC8;
                    }
                    .before-price{
                        font-family: PingFangSC-Regular;
                        font-size: 28rpx;
                        color: #AAAAAA;
                        margin-left 10rpx
                        text-decoration line-through
                    }
                }
                .goods-price-right{
                    font-size: 14px;
                    color: #999999;
                    display flex
                    flex-flow row nowrap
                    align-items center
                    img{
                        margin-right 10rpx
                        width 24rpx
                        height 30rpx
                    }
                }
            }
        }
    }
    .hr{
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
            // padding 0 30rpx
        }
    }
    .buy-btn{
        width 100%
        height 88rpx
        line-height 88rpx
        background: #43AEC8;
        text-align center
        position fixed
        z-index 9999
        bottom 0
        font-family: PingFangSC-Medium;
        font-size: 32rpx;
        color: #FFFFFF;
    }
}
.share-btn{
    position fixed
    z-index 999
    left 24rpx
    bottom 140rpx
    background-image url("http://img.tracenet.cn/share-button.png")
    background-repeat no-repeat
    background-size 100%
    width 100rpx
    height 100rpx
    border-radius 50%
}
</style>


