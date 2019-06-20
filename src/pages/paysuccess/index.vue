<template>
    <div class="content">
        <img src="/static/images/pay-success.png" alt="">
        <p class="content-p">支付成功</p>
        <div class="btn order-btn" @click="viewOrder">查看订单</div>
        <div class="btn home-btn" @click="goHome">回到首页</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:"",
            beforeUrl:""
        }
    },
    mounted(){
         let pages = getCurrentPages();
        console.log(pages);
        let prevPage = pages[pages.length - 2]; //上一个页面
        console.log(prevPage);
        this.beforeUrl=prevPage.route;
        // 获取小程序在 page onLoad 时候传递的 options
        console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.id=this.$root.$mp.query.id
        }
    },
    methods:{
        goHome(){
            wx.switchTab({
                url:"../index/main"
            })
        },
        viewOrder(){
            if(this.beforeUrl=="pages/purchasedetail/main"){
                wx.redirectTo({
                    url:"../integralorderdetail/main?orderId="+this.id
                })
                
            }else{
                wx.redirectTo({
                    url:"../activityorderdetail/main?id="+this.id
                })
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.content{
    display flex
    flex-flow column nowrap
    justify-content center
    font-family: PingFangSC-Regular;
    align-items center
    img{
        width 180rpx
        height 128rpx
        margin-top 100rpx
    }
    .content-p{
        margin-top 32rpx
        font-size: 36rpx;
        color: #333333;
    }
    .btn{
        width 520rpx
        height 72rpx
        line-height 72rpx
        text-align center
        box-sizing border-box
        font-size: 28rpx;
        border-radius: 8rpx;
    }
    .order-btn{
        border: 2rpx solid #43AEC8;
        color: #43AEC8;
        margin-top 100rpx
    }
    .home-btn{
        background: #43AEC8;
        font-size: 30rpx;
        color: #FFFFFF;
        margin-top 40rpx
    }
}
</style>


