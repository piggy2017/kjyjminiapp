<template>
    <div class="content">
        <div class="content-wraper">
            <div class="express-item" v-for="(item ,index) in expressDetail" :key="index">
                <p :class="[index==0?'first-data':'']">{{item.context}}</p>
                <p class="time">{{item.time}}</p>
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
            orderId:"",
            expressDetail:[]
        }
    },
    mounted(){
        this.orderId="";
        console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.orderId=this.$root.$mp.query.id;
        }
        this.getData();
    },
    methods:{
        getData(){
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.IntegralOrderDetail+this.orderId,{orderId:this.orderId},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.expressDetail=res.api_data.expressDetail;
                }
                 wx.hideLoading();
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.content{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    .content-wraper{
        padding 30rpx
        .express-item{
            padding-left 60rpx
            position relative
            font-family: PingFangSC-Medium;
            font-size: 28rpx;
            color: #999999;  
            padding-top 40rpx
            border-left 1rpx solid #ddd
            .first-data{
                color: #333333;
            }
            .time{
                margin-top 4rpx
            }       
        }
        .express-item:first-child{
            padding-top 0 !important
        }
        .express-item:not(:first-child)::before{
            content ""
            position absolute
            z-index 9
            width 20rpx
            height 20rpx
            border-radius 50%
            background-color #ddd
            top 44rpx
            left -10rpx
        }
        .express-item:first-child::before{
            content ""
            position absolute
            z-index 9
            width 36rpx
            height 36rpx
            border-radius 50%
            background-color #43AEC8
            top 0
            left -20rpx
        }
    }
}
</style>

