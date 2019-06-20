<template>
    <div class="index-page">
      <div class="father-time" v-if="fatherdayStatus==true" @click="goHoliday">
        <img src="http://img.tracenet.cn/father-banner.jpg" alt="">
      </div>
      <swiper v-else class="banner" circular="true" indicator-dots="true" autoplay="true" indicator-active-color="#fff" interval="3000" duration="1000">
          <swiper-item class="index-swiper-item" v-for="(item,index) in banner" :key="index">
            <image :src="item.picture" background-size="cover"></image>
          </swiper-item>
      </swiper>
      <div class="purchase" v-if="goodsIsShow==true">
        <div class="purchase-title">
          <div class="purchase-title-left">
              <img src="/static/images/time-home.png" alt="">
              <span class="purchase-title-t">限时抢购</span>
              <div class="time-counter">
                <span class="time-counter-num">{{hours}}</span>
                <span class="hr-black">:</span>
                <span class="time-counter-num">{{minues}}</span>
                <span class="hr-black">:</span>
                <span class="time-counter-num">{{miao}}</span>
              </div>
          </div>
          <div class="purchase-title-right" @click="gopurchaseList">
            <span>查看更多</span>
            <img src="/static/images/more.png" alt="">
          </div>
        </div>
        <div class="purchase-goods">
          <div class="purchase-goods-item" v-for="(item,index) in flashList" :key="index" @click="goshop(item.id)">
            <img :src="item.picture[0]" alt="">
            <p class="purchase-price">
              <span class="purchase-price-label">抢购价:</span>
              <span>￥{{item.price}}</span>
            </p>
            <p class="before-price">
              <span >市场价:</span>
              <span class="before-price-label">￥{{item.originalPrice}}</span>
            </p>
            <div class="purchase-number">
                <progress class="purchase-number-pro" border-radius="18rpx" stroke-width="36rpx" activeColor="#D8EFF5" backgroundColor="#fff" :percent="item.percent"></progress>
                <p class="purchase-number-text">仅剩{{item.stock}}件</p>
            </div>
            <!-- 仅剩{{item.stock}}件 -->
          </div>
        </div>
      </div>
      <div class="travel" v-if="allTravel==true">
          <div class="travel-title">
            <img src="/static/images/xianlu.png" alt="">
            <span>旅游线路</span>
          </div>
          <div class="first-traval" @click="goDetail($event)" :data-id="firstActivity.activityId">
            <img :src="firstActivity.cover" alt="">
            <div class="first-traval-content">
              <p class="traval-first-name">{{firstActivity.name}}</p>
              <span>￥{{firstActivity.price}}起</span>
            </div>
          </div>
          <div class="traval-content">
              <div class="traval-item" v-for="(item,index) in activityResult" :key="index" :data-id="item.activityId" @click="goDetail($event)">
                <img :src="item.cover" alt="">
                <p class="traval-item-name">{{item.name}}</p>
                <p class="traval-item-price">
                  <span>￥{{item.price}}</span> 起
                </p>
              </div>
          </div>
      </div>
      <div class="coupon-content" :class="[isShowcoupon==false?'visible':'']">
        <div class="coupon-wrapper">
          <p class="conpun-title">¥{{couponInfo.fullCutPrice}}.00</p>
          <p class="conpun-text-1">当日有效 | 满{{couponInfo.fullPrice}}减{{couponInfo.fullCutPrice}}</p>
          <p class="conpun-text-2">限时抢购指定商品有效</p>
          <div class="get-btn" @click="getCoupon">
            <img src="/static/images/button.png" alt="">
          </div>
        </div>
      </div>
      <div class="get-success" :class="[isShowsuccess==false?'visible':'']">
        <img src="/static/images/get-success.png" alt="">
        <p>领取成功</p>
      </div>
      <div class="father-day" :class="[isShowHoliday==false?'visible':'']">
        <div class="father-wrapper">
          <div class="father-top-img">
            <img src="http://img.tracenet.cn/father-6.png" alt="">
          </div>
          <div class="go-test-wraper">
            <img src="/static/images/dati-btn.png" alt="" @click="goHoliday">
          </div>
          <div class="close-test" @click="closeHoliday">
            <img src="/static/images/close-model.png" alt="">
          </div>
        </div>
      </div>
      <!-- <div @click="goVideo">go video</div> -->
    </div>
</template>

<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      banner:[],
      firstActivity:{
        activityId:""
      },
      activityResult:[],
      hours:"00",
      minues:"00",
      miao:"00",
      timer:null,
      flashList:[],
      test:"123123",
      allTravel:true,
      goodsIsShow:true,
      couponInfo:{},
      isShowcoupon:true,  // 显示领取优惠券的弹框
      isShowsuccess:true,  // 显示领取成功
      hasGet:false,  // 是否领取了首页优惠券
      isShowHoliday:true,
      fatherdayStatus:false  // 父亲节活动是否有效
    }
  },
  created() {
    console.log("index created")
    this.getData();
    this.getFlash();
  },
  mounted(){
    let getTest=wx.getStorageSync("hasTest");
    console.log(getTest);
    // if(getTest==true){
    //   this.isShowHoliday=true
    // }else{
    //   this.isShowHoliday=false
    // }
  },
  onShow:function(){
      console.log("index onshow");
    //  this.checkCoupon();
    //this.getData();
    wx.removeStorageSync("idlist");
    wx.removeStorageSync("postPHone");
    let getEntry=wx.getStorageSync("appEntry");
    console.log(getEntry);

    let nowTime = new Date().getTime(); // 当前时间的时间戳
    let endTime=parseInt(new Date("2019/06/17 23:59:59").getTime());   // 结束时间的时间戳
    console.log(endTime)
    if(nowTime<endTime){  // 父亲节未过期
      console.log(111111111111)
      this.fatherdayStatus=true
    }else{
      console.log(2222222222222)
      this.fatherdayStatus=false
    }
  },
  methods: {
    goVideo(){
      wx.navigateTo({
        url:"../video/main"
      })
    },
    goHoliday(){
      wx.navigateTo({
        url:"../fatherday/main"
      })
    },
    closeHoliday(){
      this.isShowHoliday=true
    },
    getData(){
       wx.showLoading({
          title: "加载中...",
          icon: "loading"
        });
      util.request(api.Index,{},"GET").then(res=>{
        //console.log(res);
        if(res.api_code=="0"){
          this.banner=res.api_data.banner;
          if(res.api_data.activityResult.length>0){
            this.allTravel=true;
            this.firstActivity=res.api_data.activityResult[0];
            this.activityResult=JSON.parse(JSON.stringify(res.api_data.activityResult));
            this.activityResult.shift();
          }else{
            this.allTravel=false;
          }
        }
       wx.hideLoading();
      })
    },
    checkCoupon(){
      console.log("checkCouponcheckCouponcheckCouponcheckCoupon");
      let getEntry=wx.getStorageSync("appEntry");
      let nowTime = new Date().getTime(); // 当前时间的时间戳
      console.log(getEntry);
      util.request(api.OulineCoupon,{data:nowTime},"GET").then(result=>{
        console.log(result);
        if(result.api_code=="0"){  // 0表示优惠券没有过期  没有领取过
            // this.isShowcoupon=false;
            // this.couponInfo=result.api_data;
          if(getEntry==true){  // 如果是扫码进来的，并且没有领取过
            console.log("index getEntry is true !!!")
            this.isShowcoupon=false;
            this.couponInfo=result.api_data;
          }
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    getFlash(){
      util.request(api.FlashSaleList,{},"GET").then(res=>{
        //console.log(res);
        if(res.api_code=="0"){
          //this.flashList=res.api_data[0].integralProducts.slice(0,4);
          if(res.api_data[0].status==1){
            this.goodsIsShow=true;
          }else if(res.api_data[0].status==0){
            this.goodsIsShow=false;
          }
          let _list=res.api_data[0].integralProducts.slice(0,4);;
          for(let i=0;i<_list.length;i++){
            _list[i].percent=_list[i].sales*100/(_list[i].sales+_list[i].stock);
          }
          this.flashList=_list;
          //console.log(this.flashList);
          let endTime=parseInt(new Date(res.api_data[0].endDate.replace(/-/g, '/')).getTime());   // 结束时间的时间戳
          //let endTime=res.api_data[0].date;
          //console.log(res.api_data[0].endDate);
          clearInterval(this.timer);
          this.timer=setInterval(() => {
            let nowTime = new Date().getTime(); // 当前时间的时间戳
            let hasTime=(endTime-nowTime)/1000;
            if(hasTime>0){
                let hours = Math.floor(hasTime / (1 * 60 * 60));
                let minutes = Math.floor(hasTime / (1 * 60)) % 60;
                let seconds = Math.floor(hasTime / 1) % 60;
                if (minutes <= 0) minutes = "00";
                if (seconds <= 0) seconds = "00";
                if (hours <= 0) hours = "00";
                if (minutes > 0 && minutes < 10) {
                    minutes = "0" + minutes
                }
                if (seconds > 0 && seconds < 10) {
                    seconds = "0" + seconds
                }
                this.hours=hours;
                this.minues=minutes;
                this.miao=seconds;
            }else{
              this.hours="00";
              this.minues="00";
              this.miao="00";
              clearInterval(this.timer);
              //this.$options.methods.getFlash();
              this.getFlash();
            }
          }, 1000);
        }
      })
    },
    getCoupon(){
      util.request(api.GetOulineCoupon,{},"GET").then(result=>{
        console.log(result);
        if(result.api_code=="0"){  // 0表示优惠券没有过期
          this.isShowcoupon=true;
          this.isShowsuccess=false;
          setTimeout(()=>{
            this.isShowsuccess=true;
          },1000)
        }else{
          util.showErrorToastMessage(result.api_message);
        }
      })
    },
    
    goshop(id){
      wx.navigateTo({
        url:"../purchasedetail/main?id="+id
      })
    },
    gopurchaseList(){
      wx.navigateTo({
        url:"../purchaselist/main"
      })
    },
    goDetail(e){
      console.log(e.mp.currentTarget.dataset.id);
      wx.navigateTo({
          url:"../activity/main?id="+e.mp.currentTarget.dataset.id
      })
    }
  },
  onUnload:function(){
    console.log("index onunload");
    console.log(this.timer);
    clearInterval(this.timer);
    console.log(this.timer);
  },
  onHide:function(){
    console.log("index onHide");
    console.log(this.timer);
    this.isShowHoliday=true;
  },
   // 下拉刷新
  onPullDownRefresh: function () {
    this.getData();
    this.getFlash();
    wx.stopPullDownRefresh();
  },
  //  分享功能
    onShareAppMessage: function (res) {
        console.log(res);
        if (res.from === 'button') {
            console.log(1111111)
            // 来自页面内转发按钮
          return {
            title: "好东西与您分享！",
            path: "/pages/index/main"
          }

        } else {
            console.log(22222);
            return {
                title: "好东西与您分享！",
                path: "/pages/index/main"
          }
        }
    }
}
</script>

<style scoped lang="stylus">
.index-page{
    width 100%;
    min-height 100vh;
    background-color #f2f2f2;
    .banner{
      height: 400rpx;
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
    .father-time{
      width 750rpx
      height 400rpx
      img{
        width 100%
        height 100%
      }
    }
    .purchase{
      height 424rpx
      background-color #ffffff
      padding 0 30rpx
      .purchase-title{
        height 94rpx
        display flex
        flex-flow row nowrap
        align-items center
        justify-content space-between
        .purchase-title-left{
          display flex
          flex-flow row nowrap
          align-items center
          img{
            width 48rpx
            height 48rpx
          }
          .purchase-title-t{
            font-family: PingFangSC-Medium;
            font-size: 32rpx;
            color: #333333;
            font-weight bold
            margin 0 16rpx
          }
          .time-counter{
            display flex
            flex-flow row nowrap
            align-items center
            font-family: PingFangSC-Medium;
            font-size: 24rpx;
            color: #FFFFFF;
            .time-counter-num{
              width 36rpx
              height 34rpx
              background: #000000;
              border-radius: 4rpx;
              line-height 34rpx
              text-align center
            }
            .hr-black{
              color #333
              margin 0 8rpx
            }
          }
        }
        .purchase-title-right{
          font-size: 28rpx;
          color: #AAAAAA;
          img{
            width 14rpx
            height 24rpx
            margin-left 10rpx
          }
        }
      }
      .purchase-goods{
        width 100%
        display flex
        flex-flow row nowrap
        align-items center
        .purchase-goods-item{
          width 164rpx
          img{
            width 164rpx
            height 164rpx
            border-radius 8rpx
          }
          .purchase-price{
            font-family: PingFangSC-Medium;
            font-size: 24rpx;
            color: #43AEC8;
            margin 14rpx 0 6rpx 0
            text-align center
            .purchase-price-label{
              font-size: 20rpx;
            }
          }
          .before-price{
            font-family: PingFangSC-Regular;
            font-size: 20rpx;
            color: #AAAAAA;
            text-align center
            .before-price-label{
              text-decoration line-through
              font-size 24rpx
            }
          }
          .purchase-number{
            width 152rpx
            height 36rpx
            border-radius 19rpx
            position relative
            border: 1rpx solid #43AEC8;
            margin 12rpx auto 0 auto
            .purchase-number-pro{
              width 100%
              height 100%
            }
            .purchase-number-text{
              position absolute
              z-index 99
              height 38rpx
              width 152rpx
              text-align center
              line-height 38rpx
              top 0
              left 0
              font-family: PingFangSC-Medium;
              font-size: 20rpx;
              color: #43AEC8;
            }
          }
        }
        .purchase-goods-item:not(:first-child){
          margin-left 12rpx
        }
      }
      
    }
    .travel{
      width 100%
      background-color #fff
      margin-top 20rpx
      .travel-title{
        padding 30rpx 0
        font-family: PingFangSC-Medium;
        font-size: 32rpx;
        color: #333333;
        width 690rpx
        margin 0 auto
        display flex
        flex-flow row nowrap
        align-items center
        font-weight bold
        img{
          width 48rpx
          height 48rpx
          margin-right 16rpx
        }
      }
      .first-traval{
        width 690rpx
        height 344rpx
        border-radius 12rpx
        margin 0 auto
        position relative
        img{
          width 100%
          height 100%
          border-radius 12rpx
        }
        .first-traval-content{
          width 690rpx
          height 122rpx
          line-height 150rpx
          position absolute
          background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAB6CAMAAAB0g0BCAAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDIYgjAAAAMHRSTlMKFXPCYm0baKqljF1JgzgjlCe5oMd7WDOvQEQvVHe1nCs8kAaHTZi9f1ERAssfDrLohSluAAADJUlEQVR42uzS224aMRSF4QWCQWpDgAtAnCSOUtto8v6P1y23GjMMGSU3jpb0f2O0beN1t/QGWNH/eXm7JLF5FFf5voM8+bJ5XRpN7EvIky+b1wWwIgAAgHvveo+VZsj7JzPcvyNP/hvygBX9AaxQWZjRALBCZWGGysKMBlU1qAax4sv70L3vzvjIky+bVwVYobIwo7qq6qpuxCGJzef25MmXzasGrGjWVc/qWHk+ucvIky+b1wywQmVhRgvACpWFGcXvuDjGWmT57qN9viNPvmxeR8AKlYUZ7QArVBZmtFs3dutdEptYMVv/te7zW/Lky+a1BqxQWZjRK2CFysLMR5U9vZ5iPZ6bmZEnXzavE2CFysKMNoAVKgszit92s42VZsj7JzO0323Iky+b1xawQmVhRi+AFSoLM7rb315usT4Vy2/Jky+b1w2wQmVhRr8BK1QWZrQHrFBZmNGqbb/aJ7GJlefDXUaefNm8VoAVKgsz+glYobIwQ2VhRiPACpWFGSoLM5qMRpP8tYzyf3fnNPMdefJl85oAVqgszGj8z2Q8idWZof9uTJ582bzGgBUqCzMaD1tf65AM+z/y5MvmNQSsUFmYobIwowNghcrCjA7LxmGZrmLkc98+TfLky+a1BKxQWZjRL8AKlYUZTQErVBZmNM2u02usaVffG/Lky+Z1BaxQWZjRD8AKlYUZKgszOgNWqCzM6DxPzvNzrHmP/KZ1Jk++bF5z/G2XDlYjhKEoDF8MA3almCzcTFwIdhHB93+7XpxSCZahq9AD/+eFXGLO7kCKjbVt3HzGvyNPvm3eNkAKlYUYWwApVBZibIlxia/dlxu/9LnO2z/y5NvmLQJSqCzE2AcghcpCDJWFGOsBKVQWYqgsxNgMSKGyEGPzcczHa/fl5ItPdbprr96RJ982bwcgxTIghcpCjOWpkqfsc53v7s+dPPm2eZsAKVQWYuwTkEJlIcZyAIRkiwEQEu0RACEPG0Lyzyedvvf6vL7f3pIn3y4fBitdAmR0xco6JkDEuBYrZX2m/Ufak899f488+Rb59FxLseKGrg878K+FvhuK+wKZWabu7OLbmAAAAABJRU5ErkJggg==");
          background-size 100%
          background-repeat no-repeat
          z-index 9
          bottom 1rpx
          left 0
          display flex
          flex-flow row nowrap
          justify-content space-between
          font-family: PingFangSC-Medium;
          font-size: 24rpx;
          color: #FFFFFF;
          .traval-first-name{
            width 524rpx
            padding-left 30rpx
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:1;
            -webkit-box-orient:vertical !important;
            overflow:hidden;
          }
          span{
            padding-right 30rpx
          }
        }
      }
      .traval-content{
        background-color #fff
        padding 30rpx 30rpx
        margin 0 auto
        display flex
        flex-flow row wrap
        .traval-item{
          width 336rpx
          display flex
          flex-flow column nowrap
          padding-bottom 30rpx
          // margin-top 30rpx
          img{
            width 100%
            height 210rpx
            border-radius 12rpx
          }
          .traval-item-name{
            width 100%
            // height 60rpx
            font-size: 24rpx;
            color: #333333;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical !important;
            overflow:hidden;
            margin 10rpx 0
          }
          .traval-item-price{
            font-family: PingFangSC-Semibold;
            font-size: 24rpx;
            color: #999999;
            span{
              color: #43AEC8;
            }
          }
        }
        .traval-item:nth-child(even){
          margin-left 18rpx
        }
      }
    }
    .visible{
        visibility:visible !important;
    }
    .coupon-content{
        width 100%
        height 100vh
        position fixed
        z-index 999
        top 0
        right 0
        left 0
        right 0
        background-color rgba(0,0,0,0.7);
        display flex
        flex-flow row nowrap
        align-items center
        justify-content center
        visibility:hidden;
        .coupon-wrapper{
          width 548rpx
          height 560rpx
          background-image url("http://img.tracenet.cn/mini-bg1.png")
          background-repeat no-repeat
          background-size 100%
          .conpun-title{
            font-family: PingFangSC-Medium;
            font-size: 68rpx;
            color: #BF9F52;
            text-align center
            margin 54rpx 0 20rpx 0;
          }
          .conpun-text-1{
            font-family: PingFangSC-Regular;
            font-size: 28rpx;
            color: #AE8A34;
            text-align center
          }
          .conpun-text-2{
            font-family: PingFangSC-Regular;
            font-size: 28rpx;
            color: #AE8A34;
            text-align center
            margin-top 10rpx
          }
          .get-btn{
            width 460rpx
            height 132rpx
            margin 160rpx auto 0 auto
          }
          .get-btn img{
            width 460rpx
            height 132rpx
          }
        }
    }
    .get-success{
      width 240rpx
      height 210rpx
      background-color rgba(0,0,0,0.7);
      border-radius: 16rpx;
      display flex
      flex-flow column nowrap
      justify-content center
      align-items center
      position fixed
      z-index 999
      top 440rpx
      left 255rpx
      visibility:hidden;
      img{
        width 60rpx
        height 60rpx
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        color: #FFFFFF;
        margin-top 30rpx
      }
    }
    .father-day{
        width 100%
        height 100vh
        position fixed
        z-index 999
        top 0
        right 0
        left 0
        right 0
        background-color rgba(0,0,0,0.7);
        display flex
        flex-flow row nowrap
        align-items center
        justify-content center
        visibility:hidden;
        .father-wrapper{
          width 590rpx
          height 552rpx
          background: #FFFFFF;
          border-radius: 8px 8px 8px 8px;
          position relative
          .father-top-img{
            width 100%
            height 376rpx
            img{
              width 100%
              height 100%
            }
          }
          .go-test-wraper{
            width 100%
            height 176rpx
            display flex
            flex-flow row nowrap
            align-items center
            justify-content center
            img{
              width 396rpx
              height 92rpx
            }
          }
          .close-test{
            position absolute
            z-index 1001
            width 84rpx
            height 84rpx
            bottom -130rpx
            left 253rpx
            img{
              width 100%
              height 100%
            }
          }
        }
    }
}
</style>
