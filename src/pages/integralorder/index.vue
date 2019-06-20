<template>
    <div class="content">
        <div class="order-classify">
            <div class="order-classify-item" :class="[classify==0?'order-integral':'']" @click="checkOrder(0)">待支付</div>
            <div class="order-classify-item" :class="[classify==1?'order-integral':'']" @click="checkOrder(1)">待发货</div>
            <div class="order-classify-item" :class="[classify==2?'order-integral':'']" @click="checkOrder(2)">待收货</div>
            <div class="order-classify-item" :class="[classify==3?'order-integral':'']" @click="checkOrder(3)">已完成</div>
            <div class="order-classify-item" :class="[classify==5?'order-integral':'']" @click="checkOrder(5)">退款</div>
        </div>
        <div class="nodata" v-if="orderList.length==0">
            <img src="/static/images/order-none.png" alt="">
            <p>您还没有此类订单</p>
        </div>
        <div class="order-wrapper" v-else>
            <div class="order-item" v-for="(item,index) in orderList" :key="index">
                <div class="order-item-title">
                    <span>{{item.createDate}}</span>
                    <span v-if="item.status==0" class="blue">待支付</span>
                    <span v-else-if="item.status==1" class="blue">待发货</span>
                    <span v-else-if="item.status==2">待收货</span>
                    <span v-else-if="item.status==3">已完成</span>
                    <span v-else-if="item.status==4">已关闭</span>
                    <span v-else-if="item.status==5" class="orange">退款中</span>
                    <span v-else-if="item.status==6">已退款</span>
                </div>
                <div class="order-item-content" @click="viewDetail(item.id)">
                    <img :src="item.productPicture" alt="">
                    <div class="order-item-content-right">
                        <div class="integral-name">{{item.productName}}</div>
                        <div class="integral-price" v-if="item.payWay==1">
                            <span class="price">￥{{item.productPrice}}</span>
                            <p class=integral-number>x{{item.number}}</p>
                        </div>
                        <div class="integral-price" v-else-if="item.payWay==2">
                            <p class="integral-price-p">
                                <img src="/static/images/score16.png" alt="">
                                <span class="price">{{item.productPrice}}</span>
                            </p>
                            <p class=integral-number>x{{item.number}}</p>
                        </div>
                        <div class="integral-price" v-else-if="item.payWay==3">
                            <p class="integral-price-p">
                                <img src="/static/images/bi16.png" alt="">
                                <span class="price">{{item.productPrice}}</span>
                            </p>
                            <p class=integral-number>x{{item.number}}</p>
                        </div>
                    </div>
                </div>
                <div class="order-item-status">
                    <div class="order-price" v-if="item.payWay==1">
                        <span>￥</span>
                        <span>{{item.paymentPrice}}</span>
                    </div>
                    <div class="order-price" v-else-if="item.payWay==2">
                        <img src="/static/images/score16.png" alt="">
                        <span>{{item.paymentPrice}}</span>
                    </div>
                    <div class="order-price" v-else-if="item.payWay==3">
                        <img src="/static/images/bi16.png" alt="">
                        <span>{{item.paymentPrice}}</span>
                    </div>
                    <div class="order-item-status-right" v-if="item.status==0">
                        <div class="btn cancel-order margin-right-10" @click="cancalOrder(item.id,1,item.payWay)">取消订单</div>
                        <div class="btn pay-btn" @click="gopay(item.id)">去支付</div>
                    </div>
                    <div class="order-item-status-right" v-if="item.status==1">
                        <div class="btn cancel-order  margin-left-10" @click="call(item.businessPhone)">拨打客服</div>
                    </div>
                     <div class="order-item-status-right" v-if="item.status==2">
                        <div class="btn cancel-order " @click="call(item.businessPhone)">拨打客服</div>
                        <div class="btn pay-btn margin-left-10" @click="getOrder(item.id,item.payWay)">确认收货</div>
                    </div>
                     <div class="order-item-status-right" v-else-if="item.status ==3 ||item.status ==6">
                        <div class="btn cancel-order" @click="deleteOrder(item.id,2,item.payWay)">删除订单</div>
                    </div>
                    <div class="order-item-status-right" v-else-if="item.status ==5">
                        <div class="btn cancel-order" @click="call(item.businessPhone)">拨打客服</div>
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
            classify:0,
            curPage:1,
            pageSize:10,
            orderList:[]
        }
    },
    mounted(){
        console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.classify=this.$root.$mp.query.id;
        }
        this.getdata(this.curPage);
    },
    onShow:function(){
        this.getdata(this.curPage);
    },
    methods:{
        cancalOrder(orderid,_type,way){ // 取消订单
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.IntegralOrderEdit+orderid,{orderId:orderid,type:_type,payWay:way}).then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    util.showErrorToastMessage("取消订单成功");
                    setTimeout(()=>{
                        this.getdata(1);
                    })
                }else{
                    util.showErrorToastMessage(res.api_message)
                }
                wx.hideLoading();
            })
        },
        refundOrder(orderid,way){ // 退款
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.IntegralOrderEdit+orderid,{type:3,payWay:way}).then(res=>{
                console.log(res);
                if(res.api_data==true){
                    util.showErrorToastMessage("退款申请成功");
                    setTimeout(()=>{
                        this.getdata(1);
                    },1000)
                }else{
                    util.showErrorToastMessage(res.api_message)
                }
                wx.hideLoading();
            })
        },
        getOrder(orderid,way){ // 确认收货
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.IntegralOrderEdit+orderid,{type:4,payWay:way}).then(res=>{
                console.log(res);
                if(res.api_data==true){
                    util.showErrorToastMessage("确认收货成功");
                    setTimeout(()=>{
                        this.getdata(1);
                    },1000)
                }else{
                    util.showErrorToastMessage(res.api_message)
                }
                wx.hideLoading();
            })
        },
        deleteOrder(orderid,_type,way){  // 删除订单
            wx.showLoading({
                title: '删除中...',
            });
            util.request(api.IntegralOrderEdit+orderid,{orderId:orderid,type:_type,payWay:way}).then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    util.showErrorToastMessage("订单已删除");
                    setTimeout(()=>{
                        this.getdata(1);
                    })
                }else{
                    util.showErrorToastMessage(res.api_message)
                }
                wx.hideLoading();
            })
        },
        viewDetail(_id){
            wx.navigateTo({
                url:"../integralorderdetail/main?orderId="+_id
            })
        },
        gopay(_id){
            wx.navigateTo({
                url:"../integralorderdetail/main?orderId="+_id
            })
        },
        call(number){
            wx.makePhoneCall({
                phoneNumber:"400-827-0099"
            })
        },
        checkOrder(type){
            console.log(type);
            this.classify=type;
            this.getdata(1);
        },
        getdata(currentPage){
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.IntegralOrders,{type:this.classify,curPage:currentPage,pageSize:this.pageSize},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.orderList=res.api_data;
                }
                wx.hideLoading();
            })
        }
    },
      // 下拉刷新
  onPullDownRefresh: function () {
    this.getdata(1);
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
    .order-classify{
        width 100%
        height 100rpx
        background-color #fff
        display flex
        flex-flow rwo nowrap
        align-items center
        border-bottom 1rpx solid #ddd
        box-sizing border-box
        .order-classify-item{
            width 150rpx
            height 100%
            line-height 100rpx
            text-align center
            font-family: PingFangSC-Regular;
            font-size: 28rpx;
            color: #999999;
            position relative
        }
        .order-integral{
            font-family: PingFangSC-Medium;
            font-size: 28rpx;
            color: #333333;
        }
        .order-integral::after{
            content ""
            position absolute
            z-index 99
            width 80rpx
            height 4rpx
            background: #43AEC8;
            bottom 1rpx
            left 35rpx
        }
    }
    .nodata{
        font-size: 14px;
        color: #87C6D6;
        display flex
        flex-flow column nowrap
        align-items center
        img{
            width 228rpx
            height 216rpx
            margin-bottom 28rpx
            margin-top 360rpx
        }
    }
    .order-wrapper{
        width 100%
        .order-item{
            margin-top 20rpx
            background-color #fff
            .order-item-title{
                padding 0 30rpx
                height 84rpx
                font-size: 28rpx;
                color: #777777;
                display flex
                flex-flow row nowrap
                justify-content space-between
                align-items center
                .blue{
                    color: #43AEC8;
                }
                .orange{
                    color: #F08239;
                }
            }
            .order-item-content{
                height 132rpx
                padding 30rpx 
                background: #F8F8F8;
                display flex
                flex-flow row nowrap
                justify-content space-between
                align-items center
                img{
                    width 132rpx
                    height 132rpx
                    margin-right 12rpx
                    border-radius 6rpx
                }
                .order-item-content-right{
                    width 532rpx
                    font-size: 32rpx;
                    color: #333333;
                    display flex
                    flex-flow row nowrap
                    justify-content space-around
                    height 100%
                    .integral-name{
                        width 380rpx
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-line-clamp:2;
                        -webkit-box-orient:vertical !important;
                        overflow:hidden;
                    }
                    .integral-price{
                        width 152rpx
                        display flex
                        text-align right 
                        font-size: 24rpx;
                        color: #888888;
                        flex-flow column nowrap
                        align-items flex-end

                        .integral-price-p{
                            display flex
                            flex-flow row nowrap
                            align-items center
                            img{
                                width 32rpx 
                                height 32rpx
                            }
                            .price{
                                font-size: 16px;
                                color: #43AEC8;
                            }
                        }
                        .price{
                            font-size: 16px;
                            color: #43AEC8;
                        }
                        .integral-number{
                            margin-top 30rpx
                        }
                    }
                }
            }
            .order-item-status{
                padding 0 30rpx
                height 120rpx
                display flex
                flex-flow row nowrap
                justify-content space-between
                align-items center
                .order-price{
                    font-family: PingFangSC-Medium;
                    font-size: 32rpx;
                    height 32rpx
                    color: #43AEC8;
                    display flex
                    flex-flow row nowrap
                    align-items center
                    img{
                        width 32rpx
                        height 32rpx
                        margin-right 8rpx
                    }
                }
                .order-item-status-right{
                    display flex
                    flex-flow row nowrap
                    align-items center
                    .btn{
                        border: 1rpx solid #43AEC8;
                        border-radius: 4rpx;
                        box-sizing border-box
                        height 60rpx
                        width 136rpx
                        line-height 60rpx
                        text-align center
                        font-size: 26rpx;
                    }
                    .margin-right-10{
                        margin-right 20rpx
                    }
                    .cancel-order{
                        background-color #fff
                        color: #43AEC8;
                        margin-left 10rpx
                    }
                    .pay-btn{
                        background: #43AEC8;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
}
.margin-left-10{
    margin-left 10rpx
}
</style>

