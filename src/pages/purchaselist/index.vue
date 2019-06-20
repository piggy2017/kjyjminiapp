<template>
    <div class="content">
        <div class="content-top">
            <img src="/static/images/xianshi-banner.jpg" alt="">
            <div class="content-top-info">还剩{{days}}天{{hours}}小时{{minutes}}分结束</div>
        </div>
        <div class="purchase-content" v-if="isShowList==true">
            <div class="purchase-item" v-for="(item,index) in flashList" :key="index">
                <img :src="item.picture[0]" alt="">
                <div class="purchase-right">
                    <p class="purchase-name">{{item.name}}</p>
                    <div class="purchase-price">
                        <span>抢购价：</span>
                        <span class="color-blue-1">￥{{item.price}}</span>
                        <span class="purchase-price-right">￥{{item.originalPrice}}</span>
                    </div>
                    <div class="purchase-bottom">
                        <div class="purchase-bottom-left">
                            <progress class="purchase-number-pro" border-radius="18rpx" stroke-width="36rpx" activeColor="#D8EFF5" backgroundColor="#fff" :percent="item.percent"></progress>
                            <p class="purchase-progress-text">仅剩{{item.stock}}件</p>
                        </div>
                        <div class="purchase-bottom-right" @click="goshop(item.id)">
                            立即抢购
                        </div>
                    </div>
                </div>
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
            flashList:[],
            days:0,
            hours:"00",
            minutes:"00",
            seconds:"00",
            isShowList:true,
            timer:null
        }
    },
    mounted(){
        this.getFlash();
    },
    methods:{
        getFlash(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.FlashSaleList,{},"GET").then(res=>{
                console.log(res);
                wx.hideLoading();
                if(res.api_code=="0"){
                    //this.flashList=res.api_data[0].integralProducts;
                    let _list=res.api_data[0].integralProducts;
                    for(let i=0;i<_list.length;i++){
                         _list[i].percent=_list[i].sales*100/(_list[i].sales+_list[i].stock);
                    }
                    if(res.api_data[0].status==1){
                        this.isShowList=true;
                    }else if(res.api_data[0].status==0){
                        this.isShowList=false;
                    }
                    this.flashList=_list;
                    console.log(this.flashList);
                    let endTime=parseInt(new Date(res.api_data[0].endDate.replace(/-/g, '/')).getTime());   // 结束时间的时间戳
                    //let endTime=res.api_data[0].date;
                    console.log(endTime);
                    clearInterval(this.timer);
                    this.timer=setInterval(() => {
                        let nowTime = new Date().getTime(); // 当前时间的时间戳
                        let hasTime=(endTime-nowTime)/1000;
                        if(hasTime>0){
                            let days=Math.floor(hasTime / (1 * 60 * 60*24));
                            let hours = Math.floor((hasTime-days*60*60*24) / (1 * 60 * 60));
                            let minutes = Math.floor((hasTime-days*60*60*24-hours*60*60) / (1 * 60)) ;
                            //console.log(minutes);
                            if (minutes <= 0) minutes = "00";
                            if (days <= 0) days = 0;
                            if (hours <= 0) hours = "00";
                            if (minutes > 0 && minutes < 10) {
                                minutes = "0" + minutes
                            }
                            this.hours=hours;
                            this.days=days;
                            this.minutes=minutes;
                        }else{
                            clearInterval(this.timer);
                            this.timer=null;
                            //this.$options.methods.getFlash();
                            this.getFlash();
                        }
                    }, 1000);
                }
            })
        },
        goshop(id){
            wx.navigateTo({
                url:"../purchasedetail/main?id="+id
            })
        }
    },
    onUnload:function(){
        console.log("list onunload");
        console.log(this.timer);
        clearInterval(this.timer);
        // this.timer=null;
        // console.log(this.timer);
    },
    onHide:function(){
        console.log("list onHide");
        console.log(this.timer);
    },
    // 下拉刷新
  onPullDownRefresh: function () {
    this.getFlash();
    wx.stopPullDownRefresh();
  }
}
</script>
<style lang="stylus" scoped>
.content-top{
    width 100%
    height 300rpx
    position relative
    font-family: PingFangSC-Regular;
    img{
        width 100%
        height 100%
    }
    .content-top-info{
        position absolute
        z-index 99
        width 292rpx
        height 42rpx
        background: #43AEC8;
        line-height 42rpx
        text-align center
        border-radius: 21rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        top 174rpx
        left 228rpx
    }
}
.purchase-content{
    width 100%
    padding-bottom 40rpx
    .purchase-item{
        padding 30rpx
        display flex
        flex-flow row nowrap
        align-items center
        height 200rpx
        align-items center
        justify-content space-between
        position relative
        img{
            width 200rpx
            height 200rpx
        }
        .purchase-right{
            width 466rpx
            height 200rpx
            display flex
            flex-flow column nowrap
            justify-content space-between
            .purchase-name{
                width 450rpx
                font-family: PingFangSC-Medium;
                font-size: 30rpx;
                color: #333333;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical !important;
                overflow:hidden;
                font-weight bold
            }
            .purchase-price{
                margin-top 10rpx
                display flex
                flex-flow row nowrap
                align-items center
                font-family: PingFangSC-Regular;
                color: #999999;
                font-size: 24rpx;
                .color-blue-1{
                    font-family: PingFangSC-Medium;
                    font-size: 30rpx;
                    color: #3AAECB;
                    font-weight bold
                }
                .purchase-price-right{
                    font-size: 26rpx;
                    margin-left 20rpx
                    text-decoration line-through
                }
            }
            .purchase-bottom{
                display flex
                flex-flow row nowrap
                justify-content space-between
                align-items flex-end
                .purchase-bottom-left{
                    width 200rpx
                    height 36rpx
                    border 1rpx solid #43AEC8
                    border-radius: 18rpx;
                    position relative
                    .purchase-number-pro{
                        width 100%
                        height 100%
                    }
                    .purchase-progress-text{
                        position absolute
                        z-index 99
                        width 200rpx
                        height 36rpx
                        line-height 36rpx
                        text-align center
                        top 0
                        left 0
                        font-family: PingFangSC-Medium;
                        font-size: 20rpx;
                        color: #43AEC8;
                    }
                }
                .purchase-bottom-right{
                    width 152rpx
                    height 56rpx
                    background: #43AEC8;
                    border-radius: 8rpx;
                    font-family: PingFangSC-Medium;
                    font-size: 28rpx;
                    color: #FFFFFF;
                    line-height 56rpx
                    text-align center
                }
            }
        }
    }
    .purchase-item:not(:first-child)::before{
        position absolute
        z-index 99
        content ""
        left 30rpx
        right 30rpx
        top 2rpx
        height 1rpx
        background-color #eee
    }
}
</style>


