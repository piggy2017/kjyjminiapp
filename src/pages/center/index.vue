<template>
    <div class="center">
        <div class="center-top">
            <div class="center-user">
                <div class="center-user-privator">
                    <img :src="photo">
                </div>
                <div class="user-name">
                    <p class="user-name-p">{{userName}}</p>
                    <div v-if="bindUser==0" class="user-name-btn" @click="bindPhone">
                        <img src="/static/images/bind-phone-icon.png" alt="">
                    </div>
                    <div v-else-if="bindUser==1" class="user-name-btn">认证用户</div>
                    <div v-else-if="bindUser==2" class="user-name-btn">普通用户</div>
                </div>
                <div class="user-money" @click="myMoney">
                    <p class="my-money-text">{{money}}</p>
                    <p class="yu-e">零钱余额</p>
                </div>
            </div> 
            
                <div class="user-order">
                    <div class="user-order-number" >
                        <div class="user-order-travel" @click="goTravelOrder(0)">
                             <img src="/static/images/travel.png" alt="">
                             <div v-if="noPayOrder>0" class="center-barge">{{noPayOrder}}</div>
                            <p>旅游出行</p>
                        </div>
                        <div class="user-order-integral" @click="goIntegralOrder(0)">
                            <img src="/static/images/integral.png" alt="">
                            <div v-if="noPayIntegralOrder>0" class="center-barge">{{noPayIntegralOrder}}</div>
                            <p>商城订单</p>
                        </div>
                    </div>
                     <div class="user-coupon" @click="goCoupon">
                         <p class="user-coupon-number">{{couponCount}}</p>
                         <p class="user-coupon-title">优惠劵</p>
                     </div>
                </div>
        
        </div> 
        <div class="center-content">
            <!-- <div class="center-content-item after-bor" @click="goCoupon">
                <div class="center-content-item-left">
                    <img src="/static/images/center-coupon.png" alt="" class="center-content-item-icon">
                    <span>优惠券</span>
                </div>
                <div class="center-content-item-right">
                    <div v-if="couponCount>0" class="barge-c">{{couponCount}}</div>
                    <img src="/static/images/more.png" alt="" class="more-icon">
                </div>
            </div> -->
            <div class="center-content-item after-bor" @click="goMessage">
                <div class="center-content-item-left" >
                    <img src="/static/images/my-mes.png" alt="" class="center-content-item-icon">
                    <span>消息</span>
                </div>
                <div class="center-content-item-right">
                    <div v-if="messageCount>0" class="barge-c">{{messageCount}}</div>
                    <img src="/static/images/more.png" alt="" class="more-icon">
                </div>
            </div>
            <div class="center-content-item after-bor" @click="goContactList">
                <div class="center-content-item-left">
                    <img src="/static/images/my-call.png" alt="" class="center-content-item-icon">
                    <span>常用联系人</span>
                </div>
                <div class="center-content-item-right">
                    <img src="/static/images/more.png" alt="" class="more-icon">
                </div>
            </div>
            <div class="center-content-item" @click="address">
                <div class="center-content-item-left">
                    <img src="/static/images/center-address.png" alt="" class="center-content-item-icon">
                    <span>收货地址</span>
                </div>
                <div class="center-content-item-right">
                    <img src="/static/images/more.png" alt="" class="more-icon">
                </div>
            </div>
        </div>
        <!-- <div @click="goCanvas">canvas</div>
        <div @click="father">father day</div> -->
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
    data(){
        return{
            userName:"",
            money:"0.0",
            photo:"",
            bindUser:0,
            messageCount:0,
            couponCount:0,
            noPayOrder:0,
            noPayIntegralOrder:0,
            noOutOrder:0,
            refundOrder:0,
            focusIndex:1,
            isShow:true,
            scorePSsd:"",
            pasd:"",
            isFocus:false,
            phoneNum:""
        }
    },
    onShow() {
        console.log("onShow");
        this.getData();
    },
    methods:{
        father(){
            wx.navigateTo({
                url:"../fatherday/main"
            })
        },
        goTravelOrder(type){
            console.log(type);
            wx.navigateTo({
                url:"../travelorder/main?id="+type
            })
        },
        goCanvas(){
            wx.navigateTo({
                url:"../canvas/main"
            })
        },
        address(){
            wx.navigateTo({
                url:"../addresslist/main"
            })
        },
        goIntegralOrder(type){
            console.log(type);
            wx.navigateTo({
                url:"../integralorder/main?id="+type
            })
        },
        goCoupon(){
            wx.navigateTo({
                url:"../coupon/main"
            })
        },
        goMessage(){
           wx.navigateTo({
                url:"../message/main"
            })
        },
        goAuth(){
            wx.navigateTo({
                url:"../choosephone/main"
            })
        },
        goContactList(){
            wx.navigateTo({
                url:"../contactlist/main"
            })
        },
        bindPhone(){
            wx.navigateTo({
                url:"../getphone/main"
            })
        },
        myMoney(){
            wx.navigateTo({
                url:"../money/main"
            }) 
        },

        getData(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.asyncRequest(api.CenterInfo,{},"GET").then(res=>{
                console.log(res);
                if( res.api_code=="0"){
                    if(res.api_data.account){
                       this.userName=res.api_data.wechat.nickname;
                       this.phoneNum=res.api_data.account.phone;
                        this.photo=res.api_data.wechat.avatar;  
                        if(res.api_data.account.approveStatus){
                            this.bindUser=1; 
                        }else{
                            this.bindUser=2;
                        }
                       this.money= res.api_data.account.score+res.api_data.account.coinBalance;
                       this.noPayOrder= res.api_data.noPayOrder;
                       this.noPayIntegralOrder= res.api_data.noPayIntegralOrder;
                       this.noOutOrder= res.api_data.noOutOrder;
                       this.refundOrder=res.api_data.refundOrder;
                    }else{
                       this.userName=res.api_data.wechat.nickname;
                       this.photo=res.api_data.wechat.avatar;
                       this.bindUser=0;
                    }
                    
                    this.messageCount=res.api_data.message;
                    this.couponCount=0;
                    if(res.api_data.account.userCouponNum){
                      this.couponCount=res.api_data.account.userCouponNum;
                    }
                   
                }
                wx.hideLoading();
            })
        },
    },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.getData();
    wx.stopPullDownRefresh();
  }
   
}
</script>
<style lang="stylus" scoped>
.center{
    width 100%;
    min-height 100vh;
    background-color #f2f2f2;
    font-family: PingFangSC-Regular;
    font-size: 30rpx;
    color: #333333;
    .center-top{
        width 100%
        height 440rpx
        background-image: linear-gradient(130deg, #7DDCDC 0%, #3DC9D7 47%, #24A4CF 88%, #229FBE 100%);
        position relative
        border-bottom-left-radius 12rpx
        border-bottom-right-radius 12rpx
        .center-user{
            display flex
            padding 40rpx 30rpx
            flex-flow row nowrap
            align-items center
            justify-content space-between
            .center-user-privator{
                width 120rpx
                height 120rpx
                border-radius 50%
                background-color #fff
                img{
                    width 100%
                    height 100%
                    border-radius 50%
                }
            }
            .user-name{
                font-family: PingFangSC-Semibold;
                font-size: 32rpx;
                width 370rpx
                height 120rpx
                margin-left 10rpx
                color: #FFFFFF;
                display flex
                flex-flow column nowrap
                justify-content space-around
                font-weight bold
                .user-name-p{
                    width 100%
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp:1;
                    -webkit-box-orient:vertical !important;
                    overflow:hidden;
                }
                .user-name-btn{
                    font-family: PingFangSC-Medium;
                    font-size: 24rpx;
                    color: #fff;
                    width 196rpx
                    height  42rpx
                    border-radius 21rpx
                    background: rgba(255,255,255,0.3);
                    text-align center
                    line-height 42rpx
                    font-weight normal
                    img{
                        width 100%
                        height 100%
                        border-radius 21rpx
                    }
                }
            }
            .user-money{
                font-family: PingFangSC-Semibold;
                font-size: 36rpx;
                color: #FFFFFF;
                height 120rpx
                width 170rpx
                display flex
                flex-flow column nowrap
                justify-content space-around
                font-weight bold
                text-align center
                .my-money-text{
                    width 176rpx
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp:1;
                    -webkit-box-orient:vertical !important;
                    overflow:hidden;
                }
                .yu-e{
                    font-family: PingFangSC-Regular;
                    font-size: 24rpx;
                    color: #FFFFFF;
                    font-weight normal
                }
            }
        }
        .my-order{
            width 710rpx
            height 230rpx
            background-color #ffffff
            border-radius 12rpx
            position absolute
            z-index 9
            left 20rpx
            top 212rpx
            .my-order-title{
                width 650rpx
                height 80rpx
                border-bottom 1rpx solid #eee
                display flex
                flex-flow row nowrap
                justify-content space-between
                font-family: PingFangSC-Regular;
                font-size: 30rpx;
                color: #333333;
                margin 0 auto
                align-items center
                img{
                    width 14rpx
                    height 24rpx
                }
            }
            .my-order-class{
                width 100%
                height 150rpx
                display flex
                flex-flow row nowrap
                font-size: 24rpx;
                color: #666666;
                .my-order-class-item{
                    width 25%
                    height 100%
                    display flex
                    flex-flow column nowrap
                    align-items center
                    justify-content center
                    .my-order-class-item-img{
                        width 68rpx
                        height 68rpx
                        position relative
                        img{
                            width 68rpx
                            height 68rpx
                        }
                    }
                    p{
                        margin-top 18rpx
                    }
                }
            }
        }
    }
    .center-content{
        width 710rpx
        border-radius 12rpx
        background-color #ffffff
        margin 30rpx auto 0 auto
        // height 300rpx
        .center-content-item{
            height 100rpx
            padding 0 30rpx
            display flex
            flex-flow row nowrap
            justify-content space-between
            align-items center
            font-size: 30rpx;
            color: #333333;
            .center-content-item-left{
                display flex
                flex-flow row nowrap
                align-items center
                .center-content-item-icon{
                    width 48rpx
                    height 48rpx
                }
                span{
                    margin-left 32rpx
                }
            }
            .center-content-item-right{
                display flex
                flex-flow row nowrap
                align-items center
                .barge-c{
                    width 32rpx
                    height 32rpx
                    text-align center
                    line-height 32rpx
                    font-family: PingFangSC-Semibold;
                    font-size: 24rpx;
                    background: #E93030;
                    border-radius: 50%;
                    color: #FFFFFF;
                }
                .more-icon{
                    width 14rpx
                    height 24rpx
                    margin-left 20rpx
                }
            }
        }
        .after-bor{
            position relative
            ::after{
                position absolute
                content ""
                z-index 11
                right 30rpx
                bottom 1rpx
                left 100rpx
                height 1rpx
                background-color #eee
            }
        }
    }
}
.dis-none{
    display none !important
}
.user-order{
    height 200rpx
    width 100%
    .user-order-number{
        width 466rpx
        height 200rpx
        margin-left 24rpx
        float left
        background-image url("http://img.tracenet.cn/order-bg-number.png")
        background-size 100%
        background-repeat no-repeat
        text-align center
        .user-order-travel{
            margin-top 40rpx
            margin-left 46rpx
            width 40%
            position relative
            ::after{
                content ""
                position absolute
                width 2rpx
                height 50rpx
                background-color #CBEBF2
                left 190rpx
                top 30rpx
            }
            img{
                width 70rpx
                height 70rpx
            }
            float left
            p{
                font-size: 28rpx;
                color: #000000;
            }
             .center-barge{
                background: #E93030;
                border: 2rpx solid #FFFFFF;
                width 32rpx
                height 32rpx
                text-align center
                line-height 30rpx
                box-sizing border-box
                position absolute
                z-index 10
                right 50rpx
                top -8rpx
                font-family: PingFangSC-Semibold;
                font-size: 24rpx;
                color: #FFFFFF;
                border-radius 50%
            }
        }
        .user-order-integral{
            margin-top 40rpx
            width 40%
            position relative
            img{
                 width 70rpx
                height 70rpx
            }
             float left
            p{
                font-size: 28rpx;
                color: #000000;
            }
             .center-barge{
                background: #E93030;
                border: 2rpx solid #FFFFFF;
                width 32rpx
                height 32rpx
                text-align center
                line-height 30rpx
                box-sizing border-box
                position absolute
                z-index 10
                right 50rpx
                top -8rpx
                font-family: PingFangSC-Semibold;
                font-size: 24rpx;
                color: #FFFFFF;
                border-radius 50%
            }
        }
    }
    .user-coupon{
        width 224rpx
        height 200rpx
        float left
        margin-left 20rpx
        background-image url("http://img.tracenet.cn/coupon.png")
        background-size 100%
        background-repeat:no-repeat;
        text-align center
        .user-coupon-number{
            font-size: 52rpx;
            color: #F65356;
            margin-top 36rpx

        }
        .user-coupon-title{
            font-size: 28rpx;
            color: #000000;
            margin-top 8rpx
        }
    }
}
</style>

