<template>
    <div class="friends">
        <div class="friend-top">
            <img class="friend-bg-1" src="/static/images/friend-1.jpg" alt="" v-if="isPhone==false">
            <img class="friend-bg-1" src="/static/images/friend-3.jpg" alt="" v-else>
            <div class="friend-top-air">
                <p class="p1">{{inviteDescription1}}</p>
                <p>{{inviteDescription2}}</p>
                <p>{{inviteDescription3}}</p>
            </div>
            <div class="my-invite-code" v-if="isPhone==true">
                <p>您的邀请码</p>
                <p class="invite-code-content">{{inviteNo}}</p>
            </div>
        </div>
        <div class="friend-bottom">
            <img class="friend-bg-2" src="/static/images/friend-2.jpg" alt="">
            <button open-type="share" class="share-btn"></button>
            <!-- <div class="share-btn">share</div> -->
            <div class="get-coupon">
                
                <button v-if="isPhone==false" class="go-bind-phone" @click="bindPhone">| 请绑定手机号登录 |</button>
                <input v-if="isPhone==true" type="text" class="bind-phone-input" placeholder="| 输入好友邀请码，立得优惠券 |" 
                v-model="inputCounpon" @confirm="confirmCoupon($event)" confirm-type="done" placeholder-class="place-center"/>
                <p class="get-coupon-p">- 限时优惠，先到先得 -</p>
            </div>
        </div>
        <div class="get-success" v-if="getSuccess==true">
            <div class="get-success-wraper">
                <div class="get-success-title">
                    <img class="friend-bg-2" src="/static/images/succee.png" alt="">
                    <span>优惠券领取成功</span>
                </div>
                <p class="suc-test">请到“我的>优惠券”中查看</p>
                <div class="i-know" @click="know">我知道了</div>
            </div>
        </div>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
    data(){
        return{
            isPhone:false,
            phoneNumber:"",
            inputCounpon:"",
            inviteNo:"",
            invite:false,
            getSuccess:false,
            inviteDescription1:"",
            inviteDescription2:"",
            inviteDescription3:"",
        }
    },
    onShow() {
        console.log("onShow");
        this.getData();
    },
    mounted() {
        console.log("mounted");
        this.getData();
    },
    methods:{
        getData(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.InviteInfo,{},"GET").then(res=>{
                console.log(res);
                if(res.api_message=="未绑定电话号码" || res.api_code=="2"){
                    this.isPhone=false;
                    if(res.api_data.baseData){
                        this.inviteDescription1=res.api_data.baseData[0];
                        this.inviteDescription2=res.api_data.baseData[1];
                        this.inviteDescription3=res.api_data.baseData[2];
                    }
                }else{
                    this.isPhone=true;
                    this.inviteNo=res.api_data.inviteNo;
                    this.invite=res.api_data.invite;
                    if(res.api_data.baseData){
                        this.inviteDescription1=res.api_data.baseData[0];
                        this.inviteDescription2=res.api_data.baseData[1];
                        this.inviteDescription3=res.api_data.baseData[2];
                    }
                }
                wx.hideLoading();
            })
        },
        bindPhone(){
            //console.log("phone");
            wx.navigateTo({
                url:"../bindphone/main"
            })
        },
        confirmPhone(event){
            console.log(event);
            util.showErrorToastMessage(event.mp.detail.value);
        },
        know(){
            this.getSuccess=false
        },
        confirmCoupon(e){
            console.log(e);
            util.request(api.Exchange,{inviteCode:e.mp.detail.value}).then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.getSuccess=true;
                    console.log("success");
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
            })
            
        }
    },
      // 下拉刷新
  onPullDownRefresh: function () {
    this.getData();
    wx.stopPullDownRefresh();
  },
   //  分享功能
    onShareAppMessage: function (res) {
        console.log(res);
        if (res.from === 'button') {
            console.log(1111111)
            // 来自页面内转发按钮
          return {
            title: "快来领取优惠券吧",
            path: "/pages/friends/main"
          }
        } else {
            console.log(22222);
            return {
                title: "快来领取优惠券吧",
                path: "/pages/friends/main"
          }
        }
    },
}
</script>
<style lang="stylus" scoped>
.friends{
    width 100%
    min-height 100vh
    .friend-top{
        width 100%
        height 685rpx
        position relative
        .friend-bg-1{
            width 100%
            height 685rpx
        }
        .friend-top-air{
            width 480rpx
            height 188rpx
            position absolute
            z-index 9
            right 20rpx
            bottom 0
            background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAC8CAMAAACXMY2fAAAAqFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////m+fz////q+/3o+v3+///t+/38///z/f7w/P74/v/6/v/1/f6w8OHNAAAALHRSTlMA/Qm3IgHq5EwD3LFEE9fIGeC/q5sr+vZuYe/Re1YdBKJzNPNnUYKSPoePNvIgs1AAAAacSURBVHja7NtZW+IwFMbx0w0KCFoE2QdZHHWmoSwFvv83m/Ei3WihgEhznvd35f3/SXKaCN3U2HzoDf+8Go9Vp9TvaAJ+xKxhdH/RbenT3nvTQdK70VpPdCNWe/5aRdq7m9l0A+2J0RdQCFqXvpf+1nIEFIdmf2fd0XNHQLHMnuh7VGzULaQWfQfzd1lAIWm/6Gq2oYnT1tv9xvdXq4X3xYUb8Bar/VrEdek61ttAHLfc7f0Vkv4Uz48nNuga415DHPO/7QJpf5i3FRGNa/LOq8fiblZoexfeXoRmdCm9WxZZllsfce8kuYbpQqNydl0s3Tvz1tcGbjdFBtQtAv+6wPrni0i13qBuIXjrawLbTtbidaEg9pcHNmsZeRcuFMbq0sDWpCPS7JG3UBYXBq4b6Xlx9BaMd1ngj7I4tMRkVUCXBLaGGlavKoR05fa8w+RcTOcH/ihjd1bI2YHTtuct8hbWmYErLXFgjd25wM4LrNfEAezOhXZW4HoTy1c15wR+GuD0Vc4ZgU0H27N68geelrA9Kyh34IcZtmcV5Q08nWF7VlLOwGZJJPguqCBf4CdHxC1x/CoiV+D6AOOVqvIE1pvJvvi3DWXkCFypibgdxit15AjcQl+FnQ48xOevyk4G/tDQV2WnAtfL2J+VdiKwZYiYNfoq5kTgIb6PFCekPAfwEn2VI6Q8BzDur9RzLLBl4H1BeccCT0TMxgX1HAlsdvABrL4jgWv4QGIgO7CNAYuDzMC6gwOYg8zAnziAWcgK3H7BAcxCVuAmDmAeMgKPcAAzkR5YL+OJkIn0wF1s0FykBh7HFvDeBXWlBp6LiCU2aJWlBR5X8YbERlrgHiYsPlICWw1MWHykBH7DhMVISuABJixGDgPbuMPi5DCwgQXMyUFgU8MC5uQg8G8RgQWsvGTgShkjNCvJwDYWMC/JwM9YwLwkAusdEcIvkRhIBB6J0NYF9SUCP+MWmhkhHezQOxcYiAd+wzswN/HALXwjcRMP7OAbiZtY4DZGLHZigSd4R2InFtjADs1ONLDVxw7NTjRwGz8n5CcaeI4dmp9o4FfccvATDVzFLQc7niz6QqRruIdmJwhcIprin+34CQI7RD18JPGzkEkHRO84gvlZyaSPRE0cwfwEgQ0iB0cwP0HgZxprOIL58WXTFpk4ghkKAr/Tg5DWLnCxl1En1MP/yzK0lVFtGmLGYmgto5r0By8N/IRX0RV6xU9W+AkushpEBoZofoIhukb0KP9eusDFRkb9JKriopKfYIjuEZXxlcSOFwzRU6ISvpLYCWasfoWoj8DsRGcs6uAzmJ3gCO4SkYa3JG68pWzaJiI8FrITHMEli4hwkcXOJnzt/w8XWezsZNI5AnO0EJKJwBwFO/QjITBD4TVWNx7YBRZWwVtwnb7gMYmZfXiNhcAMhbccIwTmyA8eGnQEZigcsVqEwAz5QvqLwAyFC7hJCMyQL6QHBGbI24W3WAjM0EpINgIzFJ7AAwuBGdoIaUQIzM+/9u0sOW0gisLwMZNBCETA4Bljx0NSqavWrP3vLFQqDcLDE04Mp863AT38Ut9WlxSbNx4oMKHSvCcoMJ/UvCEUmM92h3XeUWBCuXk3UGA+qXlBS4H5uMS8EApMx1XmzaDAfHLzehMF5pOadxJCgenEiXnPUGA6LjNvOlBgOq5qDmAFZuOq5gBWYDautI1nKDCd2jZWXQVm4xp923dQYDLN9TlqQYHJuMo2xiMoMJlm39MlFJhMnNlGbw4FJlMktnE6hwJzcbVtjZdQYC5xZVvRCArMpUhsq92CAlNxtTWs7qDAVIrMtk6eu1BgJnFpDb0QUGAiLrem6QQKTMQVme0szwMoMA+ft7k8KzANl2e2YzaBAtNweWI7ghBQYBKuKG3X+U0LCszBpXVirww7gAIzcGme2WvjJ0CBj986bmVvXd8OoMDHzcVpUVf2nqjfBf5hYOfF8unStCiKPC8r+8g0hLd/YH8rrS9Zl2VVZVli8oWuzn4BnxTYpcW6amZyKBbD2xawZ2A/2lX20EQXIwD7Bv67b5PD0ps9duDtFTiu9eQemKvhxbyLPZkcoMV4+PPyYYA1BWax6H27jtqz1ct9v+PT/ofA34Pp7OXmsf/jYd5ZTkatAeSo2IeuorOLcAI5bvau4Ox2CWFgb/RWl4rL482RSf8OQsSaru9HEC62FYUQOs0PBYSQ/4X4Ui+4nOyPtmYvK1tb3HchpMwseIDQMhvrOJKZBepLLdCxJDf15fYb7sH0Z2hQAYgAAAAASUVORK5CYII=")
            background-size 100%
            background-repeat no-repeat
            font-size: 26rpx;
            color: #5EB5C9;
            line-height 44rpx
            p{
                padding-left 30rpx
            }
            .p1{
                padding-top 20rpx
                padding-left 82rpx
            }
        }
    }
    .friend-bottom{
        width 100%
        height 786rpx
        position relative
        .friend-bg-2{
            width 100%
            height 786rpx
        }
        .share-btn{
            position absolute
            z-index 99
            border none
            width 600rpx
            height 80rpx
            top 30rpx
            left 75rpx
            background-color rgba(255,255,255,0)
        }
        .share-btn::after{
            border none
        }
        .get-coupon{
            width 700rpx
            height 216rpx
            background-color #ffffff
            border-radius 16rpx
            position absolute
            z-index 9
            left 25rpx
            top 160rpx
            .bind-phone-input{
                background: #56D4E6;
                border: 6rpx solid #2C9CB7;
                border-radius: 12rpx;
                font-size: 28rpx;
                width 654rpx
                height 98rpx
                margin 24rpx auto
                box-sizing border-box
                text-align center
                color #0A7893
            }
            .go-bind-phone{
                background: #56D4E6;
                border: 6rpx solid #2C9CB7;
                border-radius: 12rpx;
                font-size: 28rpx;
                width 654rpx
                height 98rpx
                margin 24rpx auto
                line-height:82rpx;
                box-sizing border-box
                text-align center
                color #0A7893
                ::after{
                    border:none
                }
            }
            .get-coupon-p{
                font-family: PingFangSC-Regular;
                font-size: 28rpx;
                color: #AAAAAA;
                text-align center
            }
        }
    }
    .my-invite-code{
        width 200rpx
        height 120rpx
        position absolute
        z-index 9
        left 275rpx
        top 190rpx
        color: #B17607;
        font-family: PingFangSC-Medium;
        font-size 28rpx
        text-align center
        display flex
        flex-flow column nowrap
        justify-content space-around
        .invite-code-content{
            font-size: 22px;
            color: #B17607;
            position relative
            ::after{
                position absolute
                z-index 10
                bottom 10rpx
                width 150rpx
                left 25rpx
                height 6rpx
                background-color #B17607
            }
        }  
    }
    .get-success{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background-color:rgba(0,0,0,0.5);
        z-index:9999;
        display:flex;
        flex-flow:row nowrap;
        align-items:center;
        justify-content:center;
        .get-success-wraper{
            width 552rpx
            height 304rpx
            background: #FFFFFF;
            border-radius: 12rpx;
            position relative
            .get-success-title{
                font-family: PingFangSC-Medium;
                font-size: 30rpx;
                color: #333333;
                display flex
                flex-flow row nowrap
                justify-content center
                padding-top 30rpx
                font-weight bold
                img{
                    width 44rpx
                    height 44rpx
                    margin-right 20rpx
                }
            }
            .suc-test{
                font-size: 28rpx;
                text-align center
                color: #666666;
                padding-top 40rpx
            }
            .i-know{
                font-size: 30rpx;
                color: #43AEC8;
                height 84rpx
                width 100%
                letter-spacing: 0.47px;
                position absolute
                z-index 100
                bottom 0
                background: #F8F8F8;
                text-align center
                line-height 84rpx
                border-bottom-left-radius 12rpx
                border-bottom-right-radius 12rpx
            }
        }
    }
}
.place-center{
    font-family: PingFangSC-Medium;
    font-size: 30rpx;
    color: #0A7893;
    text-align center !important
}
.invite-description{
    font-size 28rpx;
    color #5EB5C9;
    position absolute; 
}
img{
    font-size 0
}
</style>


