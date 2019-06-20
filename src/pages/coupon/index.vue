<template>
    <div class="content">
        <div class="no-coupon" v-if="couponList.length==0">
            <img src="/static/images/n-coupon.png" alt="">
            <p>暂无优惠券</p>
        </div>
        <div class="has-coupon" v-else>
            <div class="coupon-item" @click="chooseCoupon(item.userCouponId,index,item.fullPrice,item.couponRule)"  
            v-for="(item,index) in couponList" 
            :key="index" :id="index" 
            :class="[item.useType==0?'back-goods':'',item.useType==1?'back-hotel':'',item.useType==2?'back-travel':'',index==startIndex?'item-checked':'']">
                <div class="" v-if="item.useType==3">
                    <div class="coupon-item-title">
                        <span>{{item.couponCode}}</span>
                        <img src="/static/images/yizhan.png" alt="" class="yizhan-img">
                    </div>
                    <p class="item-name" >{{item.name}}</p>
                    <canvas :canvas-id="item.id" class="shu_codebox"/>
                    <p class="end-time">过期时间:{{item.expireDate}}</p>
                </div>
                <div class="" v-if="item.useType==0">
                    <div class="coupon-item-title">
                        <p v-if="item.couponRule==0">
                            <span>￥{{item.cutPrice}}</span>
                            <span class="no-door">无门槛使用</span>
                        </p>
                        <p v-else-if="item.couponRule==1">
                            <span>￥{{item.fullCutPrice}}</span>
                            <span class="no-door">满{{item.fullPrice}}使用</span>
                        </p>
                        <p v-else-if="item.couponRule==2">
                            <span>{{item.miniDiscount}}折</span>
                        </p>
                        <p v-else>{{item.couponCode}}</p>
                        <img src="/static/images/cou-goods.png" alt="" class="yizhan-img">
                    </div>
                    <p class="item-name-2">{{item.name}}</p>
                    <p class="end-time">过期时间:{{item.expireDate}}</p>
                </div>
                <div class="" v-if="item.useType==1">
                    <div class="coupon-item-title">
                        <!-- <span>{{item.couponCode}}</span> -->
                        <p v-if="item.couponRule==0">
                            <span>￥{{item.cutPrice}}</span>
                            <span class="no-door">无门槛使用</span>
                        </p>
                        <p v-else-if="item.couponRule==1">
                            <span>￥{{item.fullCutPrice}}</span>
                            <span class="no-door">满{{item.fullPrice}}使用</span>
                        </p>
                        <p v-else-if="item.couponRule==2">
                            <span>{{item.miniDiscount}}折</span>
                        </p>
                        <img src="/static/images/cou-hotel.png" alt="" class="yizhan-img">
                    </div>
                    <p class="item-name-2">{{item.name}}</p>
                    <p class="end-time">过期时间:{{item.expireDate}}</p>
                </div>
                <div class="" v-if="item.useType==2">
                    <div class="coupon-item-title">
                        <!-- <span>{{item.couponCode}}</span> -->
                        <p v-if="item.couponRule==0">
                            <span>￥{{item.cutPrice}}</span>
                            <span class="no-door">无门槛使用</span>
                        </p>
                        <p v-else-if="item.couponRule==1">
                            <span>￥{{item.fullCutPrice}}</span>
                            <span class="no-door">满{{item.fullPrice}}使用</span>
                        </p>
                        <p v-else-if="item.couponRule==2">
                            <span>{{item.miniDiscount}}折</span>
                        </p>
                        <img src="/static/images/cou-travel.png" alt="" class="yizhan-img">
                    </div>
                    <p class="item-name-2">{{item.name}}</p>
                    <p class="end-time">过期时间:{{item.expireDate}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
import hasCode from '@/utils/index2'
// const { barcode, qrcode } = require('@/util/index2.js')
export default {
    data(){
        return{
            couponList:[],
            useType:0,
            startIndex:-1,
            correlationId:"",
            totalPrice:0
        }
    },
    mounted(){
        this.useType="";
        this.correlationId="";
        if(this.$root.$mp.query.useType!=null && this.$root.$mp.query.useType!=undefined){
            this.useType=this.$root.$mp.query.useType;
            this.correlationId=this.$root.$mp.query.correlationId;
            this.totalPrice=this.$root.$mp.query.totalPrice;
        }
        this.getdata();
    },
    methods:{
        chooseCoupon(couponId,_index,price,type){
             if(this.correlationId){
                 if(type==1 && this.totalPrice<price){
                     util.showErrorToastMessage("该优惠劵未达到满减金额");
                    return
                 }else{
                     this.startIndex=_index;
                    wx.setStorageSync('couponId',couponId);
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta: 1
                        })
                    },500)
                 }
             }
        },
        getdata(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.Coupons,{useType:this.useType,correlationId:this.correlationId},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.couponList=res.api_data;
                    for(let i=0;i<this.couponList.length;i++){
                        if(this.couponList[i].useType==3){
                            hasCode.barcode(this.couponList[i].id, this.couponList[i].couponCode*1, 620, 80);
                        }
                    }
                }
                wx.hideLoading();
            })
        }
    },
    onUnload:function(){
        console.log("onUnload counpon--==-=-=-=-=-")
        this.startIndex=-1;
    },
    onHide(){
        console.log("onHide counpon--==-=-=-=-=-")
    },
    onPullDownRefresh(){
        this.getdata();
        wx.stopPullDownRefresh();
    }
}
</script>
<style lang="stylus" scoped>
.content{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    font-family: PingFangSC-Regular;
    .no-coupon{
        width 100%
        display flex
        flex-flow column nowrap
        align-items center
        font-size:28rpx;
        color:#87c6d6;
        img{
            width 230rpx
            height 220rpx
            margin-bottom:28rpx;
            margin-top:360rpx;
        }
    }
    .has-coupon{
        width 690rpx
        // padding-top 30rpx
        padding-top:4rpx;
        padding-bottom 50rpx
        margin 0 auto 0 auto
        .coupon-item{
            padding 20rpx 36rpx
            background-color #fff
            position relative
            font-family: PingFangSC-Medium;
            font-size: 60rpx;
            color: #333333;
            border-radius: 12rpx;
            margin-top 30rpx
            .yizhan-img{
                width 94rpx
                height 42rpx
                position absolute
                z-index 9;
                right 0
                top 38rpx
            }
            .item-name{
                font-size: 24rpx;
                color: #666666;
                margin 14rpx 0 20rpx 0
            }
            .item-name-2{
                width 500rpx
                font-size: 24rpx;
                color: #666666;
                margin 14rpx 0 20rpx 0
            }
            .end-time{
                text-align right
                font-size: 24rpx;
                color: #999999;
            }
            .shu_codebox{
                width 620rpx
                height  80rpx
                margin 20rpx auto
            }
        }
        .back-goods{
            background-size 108rpx 108rpx
            background-repeat no-repeat
            background-position 540rpx 50rpx
            background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABqAgMAAAAkUVxDAAAACVBMVEUAAAAAAAAAAACDY+nAAAAAA3RSTlMACQQs2buOAAABIElEQVRIx+2VO47EIBBE8UgOZnPyTXwPH4GAQoTem3AJLjGnXH4t3Du0tRpppAkoyXLbD6hqf4T6hzZP1Q3HHwaEVq2wHC0ATYwAZyto4j1VO7dLd0ypNHAypDuuJmmjuqJL9KgL/MDzmDb52JIX6YLH9DlfSEly5c7sDpMOGqDBW9jLcnXhDTtrIZQYNf/KmAbFd8XdsBaoSVMGedYCPa7QLlkLZTqd3ZmZFjeQfVMPdrM9dlOvv/vYBsbyObCg8nQlHWoVmcl2oqEWmVXaqbFiYlZgerKXGCRdsqv3fvm9LCLblYoCcvlDf4wV1Dsk/xDh45hRz1onm2yyyT6SKfgB26AKw+NZqCxK20OSHjLbbAdqARdhNxINXcv7JexGvx5XayY32P32AAAAAElFTkSuQmCC")
        }
        .back-hotel{
            background-size 108rpx 108rpx
            background-repeat no-repeat
            background-position 540rpx 50rpx
            background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsAgMAAADyCL9eAAAACVBMVEUAAAAAAAAAAACDY+nAAAAAA3RSTlMACQLFuh67AAABDElEQVRIx+3VsQ3DIBAFUIJEwQAeIUW2YAQXnIVSeRSWoHcbT5kYES7HAZGlFJHs3z5h++DOiG40lHHZArD4RBJ4Rnwki02mKjYlu0IlyYb4ZpIAPtnEqlLZ7C7TYJp2A3OuO9f9fp0ko0DWkZkwZB0dT1cYmT1qFzJ73DDUNMxC4DgWZrKpr7ZlSXZf3wkgktnGt8T4zSSrIcbw2rON0YYPG7O5aIrutVxfeYCNJkOme64mWTWhY8MxjPY1Gt9raoGcERo/WzTeE2i8l9B4D6Lx3t1hjt1TvW/p19Cvnf8LenvdO6M/7qXTDmjTLsP/LixVkmDxPmVxQjVtFLpps5BN83Qwy+HWzUf28gQEoUEw1tlupwAAAABJRU5ErkJggg==")
        }
        .back-travel{
            background-size 108rpx 108rpx
            background-repeat no-repeat
            background-position 540rpx 50rpx
            background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABqAgMAAAAkUVxDAAAACVBMVEUAAAAAAAAAAACDY+nAAAAAA3RSTlMACQQs2buOAAACpklEQVRIx9WVPY4bMQyFPQNMMel1BAPJLXSEKURBceVyk1MIAfYISp1mgaxPmeGPSMlSUqTbBxA760+iOI+Ufen1+Yy53gDgNiVrAVScsQKsNKIrVOVntIMqjRlNebLt+/nwjhvHbS/6NGx70XeE+1ORN8vdJ+UCrKQ+ZerexHcpbdu3M46mStm2YB1LZ+pak1wx9wpfAZrjYlsShALejjvakkrED0ROljkuycEOwd6u/k2c5ocWs8qqXUraIJfaiwWSHBtljb/WYnbxtr7yAvcNHzmHlxfPwg5MJbluvCTW8w8sQRglvWprzoQFak7KZmaci5zk34FtBLU+XLTQwvYHY1S7dfS18TBgrd1Me2XxPCF1k2tjELFR3ehmZYCN6m5KapmzNGs7shswb7PGXBkG/2NZje1StmX1wrIyy3ooW/j0LxCzTmfP1nrQ2jBsYjUsc1bLeaFnRPTABv9WVq9VkCHCEJZwEUmG74xozEHkqaVcuDQpo48L3I3BK40PjknET6ViqVrYAkmvhItn8OnI6tDQbheQyz5IdeAdLQ0Y1C1h4iXNLEUhEyHRh2YhsZWywkHnG8PgWqOxHXK1TEYSWRDmKZYz6mS1bGNOpY0sY9RB98ayWGZfY20tzhg+5Ob9cBmG6Cdyux6BQtX6CYHDGPehRLWTJbPF/VPLRNrVHRJbhswEkOnb1ew0Fe6Kr5Y+/6Rgv8QyP/7wxfG21n5wRyk6ObmwZlmfNMqUGbOf9V/EOHo9EKllo9gujIkWtXOUWTbKLBu1TdmnB+qN7Hywsm5gkWUi/ZY35pQlqU8UWwZ9ytCyei0sjZ3HL+qa/3ZjB7O/GCitGQXp/1j5IAyIuTgbOmHwGPUOh/Zh1F37N8rr/RuV+diZot6/UUnGc7YtX/6tP+GMktMdaoATAAAAAElFTkSuQmCC")
        }
    }
}
.item-checked{
    background-color #D8EFF5 !important;
}
.no-door{
    font-size: 28rpx;
    color: #333333;
    margin-left 20rpx
}
</style>

