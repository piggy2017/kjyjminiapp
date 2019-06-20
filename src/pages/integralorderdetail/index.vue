<template>
    <div class="content">
        <div class="order-detail-top wait-pay" v-if="info.orderDetail.status==0">
            <p>待付款</p>
            <p class='p2'>赶紧将它收入囊中吧</p>
        </div>
        <div class="order-detail-top wait-travel" v-if="info.orderDetail.status==1">
            <p>待发货</p>
            <p class='p2'>正在努力为您备货～</p>
        </div>
        <div class="order-detail-top has-travel" v-if="info.orderDetail.status==2">
            <p>已发货</p>
            <p class='p2'>准备收货啦～</p>
        </div>
        <div class="order-detail-top has-end" v-if="info.orderDetail.status==3">
            <p>已完成</p>
            <p class='p2'>期待与您再次相遇～</p>
        </div>
        <div class="order-detail-top refund-load" v-if="info.orderDetail.status==5">
            <p>退款中</p>
            <p class='p2'>已申请退款</p>
        </div>
        <div class="order-detail-top refund-success" v-if="info.orderDetail.status==6">
            <p>已退款</p>
            <p class='p2'>已成功退款</p>
        </div>
        <div class="detail-content">
            <div class="detail-info">
                <img :src="info.orderDetail.productPicture" alt="">
                 <div class="order-item-content-right">
                    <div class="integral-name">{{info.orderDetail.productName}}</div>
                    <div class="integral-product-price" v-if="info.orderDetail.payWay==1">
                        <span>￥{{info.orderDetail.productPrice}}</span>
                    </div>
                    <div class="integral-product-price" v-else-if="info.orderDetail.payWay==2">
                        <img src="/static/images/score16.png" alt="" >
                        <span>{{info.orderDetail.productPrice}}</span>
                    </div>
                    <div class="integral-product-price" v-else-if="info.orderDetail.payWay==3">
                        <img src="/static/images/bi16.png" alt="" >
                        <span>{{info.orderDetail.productPrice}}</span>
                    </div>
                </div>
                 <div class="integral-price">
                    <span class="number">数量</span>
                    <p class=integral-number>x{{info.orderDetail.number}}</p>
                </div>
            </div>
            <div class="contact-info">
                <div class="contact-info-address">
                    <div class="contact-info-user">
                          <img src="/static/images/address.png" alt="" class="img-address">
                    </div>
                    <div class="contact-info-address-info">
                         <p>
                            <span>{{info.address.name}}&nbsp;&nbsp;</span>
                             
                            <span>{{info.address.phone}}</span>
                         </p>
                         <p class="contact-address">{{info.address.address}} </p>
                    </div>
                </div>
                <div class="contact-info-address" v-if="info.expressInfo!=null" @click="viewExpress">
                     <div class="contact-info-user">
                          <img src="/static/images/car.png" alt="" class="img-car">
                    </div>
                    <div class="contact-info-address-info">
                         <p>
                            <span>{{info.expressInfo.logistics}}&nbsp;&nbsp;</span>
                             
                            <span>{{info.expressInfo.logisticsNumber}}</span>
                         </p>
                         <p class="contact-address">{{info.expressInfo.sendDate}} </p>
                    </div>
                </div>
            </div>
            <div class="pay-type">
                <span class="font-w">支付方式</span>
                <div class="pay-type-right" v-if="info.orderDetail.payWay==2">
                    <img src="/static/images/score16.png" alt="" >
                    <span>加分支付</span>
                </div>
                <div class="pay-type-right" v-if="info.orderDetail.payWay==3">
                    <img src="/static/images/bi16.png" alt="">
                    <span>加币支付</span>
                </div>
                <div class="pay-type-right" v-if="info.orderDetail.payWay==1">
                       <img src="/static/images/wechat16.png" alt="">
                    <span>微信支付</span>
                </div>
            </div>
            
            <div class="order-no">
                <span class="font-w">邮费</span>
                <span class="order-no-right">{{info.orderDetail.postage}}</span>
            </div>
            <div class="order-no">
                <span class="font-w">优惠劵</span>
                <span class="order-no-right">-{{info.orderDetail.couponPrice}}</span>
            </div>
            <div class="order-no">
                <span class="font-w">订单号</span>
                <span class="order-no-right">{{info.orderDetail.orderNumber}}</span>
            </div>
            <div class="order-time">
                <span class="font-w">下单时间</span>
                <span class="order-no-right">{{info.orderDetail.createDate}}</span>
            </div>
        </div>
        <div class="detail-fiexd">
            <div class="detail-fiexd-left" v-if="info.orderDetail.payWay==1">
                <span>￥{{info.orderDetail.paymentPrice}}</span>
            </div>
            <div class="detail-fiexd-left" v-else-if="info.orderDetail.payWay==2">
                <img src="/static/images/score16.png" alt="" >
                <span>{{info.orderDetail.paymentPrice}}</span>
            </div>
            <div class="detail-fiexd-left" v-else-if="info.orderDetail.payWay==3">
                <img src="/static/images/bi16.png" alt="" >
                <span>{{info.orderDetail.paymentPrice}}</span>
            </div>
            <div class="detail-fiexd-right" v-if="info.orderDetail.status==0">
                <div class="btn cancal-btn mar-right" @click="cancelOrder(info.orderDetail.orderId,1,info.orderDetail.payWay)">取消订单</div>
                <div class="btn pay-btn" @click="goPay($event,info.orderDetail.orderId)" :data-way="info.orderDetail.payWay">支付</div>
            </div>

            <div class="detail-fiexd-right" v-else-if="info.orderDetail.status==1">
                <div class="btn cancal-btn mar-right" @click="call(info.businessPhone)">拨打客服</div>
                <div class="btn cancal-btn " @click="refundOrder(info.orderDetail.orderId,info.orderDetail.payWay)">退款</div>
            </div>

            <div class="detail-fiexd-right" v-else-if="info.orderDetail.status==2">
                <div class="btn cancal-btn mar-right" @click="call(info.businessPhone)">拨打客服</div>
                <div class="btn cancal-btn mar-right" @click="refundOrder(info.orderDetail.orderId,info.orderDetail.payWay)">退货</div>
                 <div class="btn pay-btn " @click="getOrder(info.orderDetail.orderId,info.orderDetail.payWay)">确认收货</div>
            </div>
             
            <div class="detail-fiexd-right" v-else-if="info.orderDetail.status==3 || info.orderDetail.status==6">
                <div class="btn cancal-btn" @click="deleteOrder(info.orderDetail.orderId,2,info.orderDetail.payWay)">删除订单</div>
            </div>
        </div>
        <div :class="[showPerson ? 'zan-dialog-show' : '']">
            <div class="popup" v-if="showPerson" @click="clickModel($event)" id="popup">
            </div>
            <div class="popup-wraper service-popup-wraper">
                <div class="popup-item" v-for="(item,index) in info.tourists" :key="index">
                    <span class="popup-item-name">{{item.userName}}</span>
                    <span>({{item.IDCard}})</span>
                </div>
            </div>
        </div>
        
        <div class="password-content" :class="[isShow==false?'visible':'']" id="password-content">
            <div class="psd-wrapper" id="psd-wrapper">
                <div class="psd-wrapper-title">
                    请输入密码支付
                    <img src="/static/images/close-btn.png" alt="" class="close-img" @click="closeModel($event)" id="close-img">
                </div>
                <div class="score-con">
                    <div class="score-con-left">
                        <img src="/static/images/score16.png" alt="">
                        <span>加分支付</span>
                    </div>
                    <div class="score-con-right">{{totalprice}}</div>
                </div>
                <div class="input-hide">
                    <input type="number" password="true" maxlength="6" v-model="scorePSsd" @input="getScorePsd($event)" :focus="isFocus" @focus="hasFouce($event)" @blur="hasBlur">
                </div>
                <div class="pas-iputlist">
                    <div class="inpit-div" :class="[scorePSsd.length==0?'guangbiao':'']">
                        <p v-if="scorePSsd.length>=1">*</p>
                    </div>
                    <div class="inpit-div inpit-div-left-none" :class="[scorePSsd.length==1?'guangbiao':'']" >
                        <p v-if="scorePSsd.length>=2">*</p>
                    </div>
                    <div class="inpit-div inpit-div-left-none" :class="[scorePSsd.length==2?'guangbiao':'']">
                        <p v-if="scorePSsd.length>=3">*</p>
                    </div>
                    <div class="inpit-div inpit-div-left-none" :class="[scorePSsd.length==3?'guangbiao':'']">
                        <p v-if="scorePSsd.length>=4">*</p>
                    </div>
                    <div class="inpit-div inpit-div-left-none" :class="[scorePSsd.length==4?'guangbiao':'']">
                        <p v-if="scorePSsd.length>=5">*</p>
                    </div>
                    <div class="inpit-div inpit-div-left-none" :class="[scorePSsd.length==5?'guangbiao':'']">
                        <p v-if="scorePSsd.length>=6">*</p>
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
            info:{
                orderDetail:{
                    payWay:0
                },
                address:{

                },
                expressDetail:[
                    {time:""}
                ],
                expressInfo:{
                    logistics:"",
                    logisticsNumber:"",
                },
                account:{

                }
            },
            showPerson:false,
            orderId:"",
            isShow:true,
            scorePSsd:"",
            pasd:"",
            isFocus:false,
            beforeUrl:"",
            isfromActivi:false
        }
    },
    onLoad(){
        this.orderId="";
        Object.assign(this, this.$options.data());
        let pages = getCurrentPages();
        console.log(pages);
        if(pages.length>1){
            if(pages[pages.length - 2].route=="pages/travelorder/main"){
                this.isfromActivi=false
            }else{
                this.isfromActivi=true
            }
        }else{
            this.isfromActivi=true
        }
        console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.orderId!="" && this.$root.$mp.query.orderId!=null && this.$root.$mp.query.orderId!=undefined){
            this.orderId=this.$root.$mp.query.orderId;
        }
        this.getData();
    },
    methods:{
        viewExpress(){
            wx.navigateTo({
                url:"../express/main?id="+this.orderId
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
                       this.getData();
                    },1000)
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
                         this.getData();
                    },1000)
                }else{
                    util.showErrorToastMessage(res.api_message)
                }
                wx.hideLoading();
            })
        },
        showPas(){
            this.isShow=false;
            this.isFocus=true;
        },
        hasFouce(e){
            console.log(e);
            console.log("this.scorePSsd==::"+this.scorePSsd);
        },
        hasBlur(){
            this.scorePSsd=""
        },
        goHome(){
            wx.switchTab({
                url:'../index/main'
            })
        },
        getScorePsd(e){
            console.log(e.mp.detail)
            if(e.mp.detail.value.length==6){ // 加分支付回调
                console.log(e.mp.detail.value+"end");
                wx.showLoading({
                    title: '支付中...',
                });
                util.request(api.IntegralOrderPayScoreBack+this.orderId+"/back",{payPwd:e.mp.detail.value,orderId:this.orderId,type:0,payWay:2})
                .then(data=>{
                    console.log(data);
                    wx.hideLoading();
                    if(data.api_code=="0"){
                        util.showErrorToastMessage("支付成功");
                        this.hasPay=true;
                        this.isShow=true;
                        this.scorePSsd="";
                        this.isFocus=false;
                        setTimeout(()=>{
                            this.getData();
                        },1000)
                    }else{
                        util.showErrorToastMessage(data.api_message);
                        this.isShow=true;
                        this.scorePSsd="";
                        this.isFocus=false;
                    }
                })
                .catch(error=>{
                    util.showErrorToastMessage(error.api_message);
                })
            }
        },
        closeM(e){
            console.log(e.mp.currentTarget);
            if(e.mp.currentTarget.id=="password-content"){
                this.isShow=true;
                this.scorePSsd="";
                this.isFocus=false;
            }
        },
        closeModel(e){
            console.log(e);
            if(e.mp.currentTarget.id=="close-img"){
                this.isShow=true;
                this.scorePSsd="";
                this.isFocus=false;
            }
        },
        clickModel(e){
            console.log(e);
            if(e.mp.currentTarget.id=="popup"){
                this.showPerson=false;
            }
        },
        getData(){
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.IntegralOrderDetail+this.orderId,{orderId:this.orderId},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.info=res.api_data;
                    this.orderId=res.api_data.orderDetail.orderId;
                }
                 wx.hideLoading();
            })
        },
        cancelOrder(orderid,_type,way){  //  取消订单
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.IntegralOrderEdit+orderid,{orderId:orderid,type:_type,payWay:way}).then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    util.showErrorToastMessage("取消订单成功");
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta: 1
                        })
                    })
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
                        wx.navigateBack({
                            delta: 1
                        })
                    })
                }else{
                    util.showErrorToastMessage(res.api_message)
                }
                wx.hideLoading();
            })
        },
        viewCHUxing(){
            this.showPerson=true;
        },
        goPay(e,orderid){  // 订单支付
            console.log(e.mp.currentTarget.dataset.way);
            console.log(orderid);
            if(e.mp.currentTarget.dataset.way==1){  // 微信支付
                wx.showLoading({
                    title: '支付中...',
                });
                console.log("微信支付--------------")
                let that=this;
                util.request(api.IntegralOrderEdit+orderid,{orderId:orderid,type:0,payWay:1}).then(data=>{
                    console.log(data)
                    wx.hideLoading();
                    if(data.api_code=="0"){
                        wx.requestPayment({
                            timeStamp: data.api_data.wechat.timeStamp,
                            nonceStr: data.api_data.wechat.nonceStr,
                            package: data.api_data.wechat.package,
                            signType:  data.api_data.wechat.signType,
                            paySign:  data.api_data.wechat.paySign,
                            success(ress) { 
                                let _that=that;
                                console.log(ress);
                                if (ress.errMsg == "requestPayment:ok") {
                                    util.showErrorToastMessage("支付成功");
                                    setTimeout(()=>{
                                       _that.getData();
                                    },1000)
                                }else{
                                    util.showErrorToastMessage(ress.errMsg)
                                }
                            },
                            fail(error) { 
                                console.log(error);
                                util.showErrorToastMessage(error)
                            }
                        })
                    }else{
                        util.showErrorToastMessage(data.api_message)
                    }
                })
            }else if(e.mp.currentTarget.dataset.way==3){   // 加币支付回调
                wx.showLoading({
                    title: '支付中...',
                });
                 util.request(api.IntegralOrderPayCoinBack+orderid+"/back").then(data=>{
                    console.log(data)
                    wx.hideLoading();
                    if(data.api_code=="0"){
                        util.showErrorToastMessage("支付成功");
                        setTimeout(()=>{
                            this.getData();
                        },1000)
                    }else{
                        util.showErrorToastMessage(data.api_message)
                    }
                })
            }else if(e.mp.currentTarget.dataset.way==2){ // 加分支付回调
                this.isShow=false;
                this.isFocus=true;
            }
        },
        call(number){
            wx.makePhoneCall({
                phoneNumber:"400-827-0099"
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
.visible{
    visibility:visible !important;
}
.content{
    position relative
    width 100%
    min-height 113vh
    background-color #f2f2f2
    font-family: PingFangSC-Regular;
    .order-detail-top{
        width 100%
        height 230rpx
        background-repeat no-repeat
        background-size 100%
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        padding 40rpx 0 0 30rpx
        .p2{
            opacity: 0.8;
            font-family: PingFangSC-Regular;
            font-size: 28rpx;
            margin-top 8rpx
        }
    }
    .wait-pay{
        background-image url("http://img.tracenet.cn/mini7.jpg")
    }
    .wait-travel{
        background-image url("http://img.tracenet.cn/mini2.jpg")
    }
    .has-travel{
        background-image url("http://img.tracenet.cn/mini5.jpg")
    }
    .has-end{
        background-image url("http://img.tracenet.cn/mini1.jpg")
    }
    .refund-load{
        background-image url("http://img.tracenet.cn/mini4.jpg")
    }
    .refund-success{
        background-image url("http://img.tracenet.cn/mini6.jpg")
    }
    .detail-content{
        width 100%
        position absolute
        top 200rpx
        z-index 99
        .detail-info{
            background-color #fff
            padding 50rpx 30rpx 30rpx 20rpx
            border-top-left-radius 16rpx
            border-top-right-radius 16rpx
            display flex
            flex-flow row nowrap
            align-items center
            justify-content space-between
            height 132rpx
            img{
                width 132rpx
                height 132rpx
                border-radius 6rpx
            }
            .order-item-content-right{
                    margin-left 20rpx
                    width 532rpx
                    font-size: 32rpx;
                    color: #333333;
                    flex-flow column nowrap
                    justify-content space-around
                    height 100%
                    .integral-name{
                        width 80%
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-line-clamp:1;
                        -webkit-box-orient:vertical !important;
                        overflow:hidden;
                        float left
                    }
                    .integral-product-price{
                        width 80%
                        padding-top 30rpx
                        font-size: 32rpx;
                        color: #43AEC8;
                        height 50rpx
                        display flex
                        flex-flow row nowrap
                        align-items center
                        img{
                            width 32rpx 
                            height 32rpx
                            margin-right 6rpx
                        }
                    }
                    
             }
             .integral-price{
                        width 20%
                        float left
                        text-align right 
                        font-size: 24rpx;
                        color: #888888;
                        flex-flow row nowrap
                        align-items center
                        img{
                            width 32rpx 
                            height 32rpx
                        }
                        .number{
                            font-size: 24rpx;
                            color: #AAAAAA;
                        }
                        .integral-number{
                            margin-top 30rpx
                            font-size 14px
                            color #333333
                        }
             }
        }
        .contact-info{
            width 100%
            background-color #ffffff
            .contact-info-address{
                width 690rpx
                height 148rpx
                display flex
                flex-flow rwo nowrap
                align-items center
                margin 0 auto
                border-top 1rpx solid #dddddd
                font-family: PingFangSC-Medium;
                font-size: 28rpx;
                color: #333333;
                .contact-info-user{
                    .img-address{
                        width 32rpx
                        height 40rpx
                    }
                    .img-car{
                        width 38rpx
                        height 30rpx
                    }
                }
                .contact-info-address-info{
                    margin-left 20rpx
                    font-size: 28rpx;
                    color: #333333;
                    font-weight 500
                   .contact-address{
                    color: #666666;
                    font-weight 400
                    margin-top 10rpx
                   }
                }
            
            }
            .big-man-content{
                width 680rpx
                height 56rpx
                background: #F4F8F9;
                padding 0 10rpx
                font-size: 26rpx;
                color: #333333;
                display flex
                flex-flow row nowrap
                align-items center
                justify-content space-between
                margin 0 auto
                .big-man-content-left{
                    display flex
                    flex-flow row nowrap
                    align-items center
                    img{
                        width 32rpx 
                        height 32rpx
                        margin 0 4rpx 0 16rpx
                    }
                    .color-blue{
                        font-family: PingFangSC-Medium;
                        font-size: 28rpx;
                        color: #43AEC8;
                    }
                    .yuan{
                        color: #43AEC8;
                        margin-left 16rpx
                    }
                }
            }
            .contact-cell-bot{
                padding 0 30rpx
                background-color #ffffff
                height 100rpx
                display flex
                flex-flow rwo nowrap
                align-items center
                justify-content space-between
                margin 0 auto
                font-family: PingFangSC-Medium;
                font-size: 28rpx;
                color: #333333;
            }
        }
        .pay-type{
            padding 0 30rpx
            background-color #ffffff
            height 100rpx
            display flex
            flex-flow row nowrap
            align-items center
            justify-content space-between
            font-family: PingFangSC-Medium;
            font-size: 28rpx;
            color: #333333;
            margin 20rpx 0
            .pay-type-right{
                font-family: PingFangSC-Regular;
                color: #666666;
                display flex
                flex-flow row nowrap
                align-items center
                height 100rpx
                img{
                    width 32rpx
                    height 32rpx
                    margin-right 10rpx
                }
            }
        }
        .order-no{
            height 100rpx
            padding 0 30rpx
            background-color #fff
            display flex
            flex-flow row nowrap
            justify-content space-between
            align-items center
            font-family: PingFangSC-Medium;
            font-size: 28rpx;
            color: #333333;
        }
        .order-time{
            height 100rpx
            width 690rpx
            margin 0 auto
            background-color #fff
            display flex
            flex-flow row nowrap
            justify-content space-between
            align-items center
            font-family: PingFangSC-Medium;
            font-size: 28rpx;
            color: #333333;
            padding 0 30rpx
            border-top 1rpx solid #ddd
        }
    }
    .detail-fiexd{
        height 100rpx
        padding 0 30rpx
        width 690rpx
        background-color #ffffff
        display flex
        flex-flow row nowrap
        justify-content space-between
        align-items center
        bottom 0
        position fixed
        z-index 999
        .detail-fiexd-left{
            display flex
            flex-flow row nowrap
            align-items center
            height 100%
            font-family: PingFangSC-Medium;
            font-size: 44rpx;
            color: #43AEC8;
            img{
                width 32rpx
                height 32rpx
                margin-right 10rpx
            }
        }
        .detail-fiexd-right{
            display flex
            flex-flow row nowrap
            align-items center
            height 100%
            .btn{
                width 160rpx
                height 60rpx
                border-radius: 2px;
                border: 1rpx solid #43AEC8;
                box-sizing border-box
                text-align center
                line-height 60rpx
                font-family: PingFangSC-Regular;
                font-size: 28rpx;
            }
            .cancal-btn{
                background-color #ffffff
                color: #43AEC8;
            }
            .mar-right{
                margin-right 20rpx
            }
            .pay-btn{
                background: #43AEC8;
                color: #FFFFFF;
            }
        }
    }
    .password-content{
        width 100%
        height 100vh
        position fixed
        z-index 999
        top 0
        right 0
        left 0
        right 0
        background-color rgba(0,0,0,0.3);
        display flex
        flex-flow row nowrap
        align-items center
        justify-content center
        visibility:hidden;
        .psd-wrapper{
            width 600rpx
            height 396rpx
            background: #FFFFFF;
            border-radius: 8rpx;
            .psd-wrapper-title{
                height 80rpx
                line-height 80rpx
                position relative
                text-align center
                font-size: 28rpx;
                color: #666666;
                .close-img{
                    width 20rpx
                    height 20rpx
                    position absolute
                    z-index 1000
                    right 30rpx
                    top 30rpx
                }
            }
            .score-con{
                width 540rpx
                height 108rpx
                background: #F1F6F8;
                border-radius: 4rpx;
                margin 0 auto
                font-family: PingFangSC-Medium;
                font-size: 30rpx;
                color: #333333;
                display flex
                flex-flow row nowrap
                align-items center
                justify-content space-between
                .score-con-left{
                    display flex
                    flex-flow row nowrap
                    justify-content space-between
                    font-weight bold
                    height 100%
                    align-items center
                    img{
                        height 52rpx
                        width 52rpx
                        margin 0 10rpx 0 24rpx
                    }
                }
                .score-con-right{
                    margin-right 24rpx
                    font-family: PingFangSC-Medium;
                    font-size: 40rpx;
                    color: #43AEC8;
                }
                
            }
            .input-hide{
                width 540rpx
                height 230rpx
                //opacity 0
                z-index 9999
                top 80rpx
                left 30rpx
                position absolute
                input{
                    width 100%
                    height 100%
                    margin-left: -20%
                    color rgba(255,255,255,0)
                }
            }
            .pas-iputlist{
                margin 30rpx auto 0 auto
                width 552rpx
                height 92rpx
                display flex
                flex-flow row nowrap
                align-items center
                .inpit-div{
                    width 92rpx
                    height 92rpx
                    background: #FFFFFF;
                    border: 1rpx solid #DDDDDD;
                    box-sizing border-box
                    text-align center
                    line-height 92rpx
                    position relative
                }
                .inpit-div-left-none{
                    border-left none !important
                }
                .guangbiao::after{
                    position absolute
                    content ""
                    z-index 1001
                    width 4rpx
                    height 40rpx
                    top 26rpx
                    left 44rpx
                    background-color #666
                }
            }
        }
    }
}
.dis-none{
    display none !important
}
.color-b{
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #43AEC8;
}
.font-w{
    font-weight bold
}
.order-no-right{
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #666666;
}
.zan-dialog-show .popup-wraper{
    transform: translateY(0);
  }
.zan-dialog-show .popup-wraper-2{
    transform: translateY(0);
}
.service-popup-wraper{
}
.popup{
    width: 100%;
    height:100%;
    position: absolute;
    z-index: 99;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
}
.popup-wraper{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    overflow-y: auto;
    z-index: 999;
    transform: translateY(150%);  
    transition: all 0.4s ease; 
}
.popup-item{
    display flex
    flex-flow row nowrap
    padding-left 46rpx
    font-size: 30rpx;
    color: #AAAAAA;
    height 80rpx
    align-items center
    .popup-item-name{
        color: #333333;
        font-weight bold
        margin-right 60rpx
        width 100rpx
    }
}
.popup-item:nth-child(even){
    border-top 1rpx solid #ddd
    border-bottom 1rpx solid #ddd
}
.margin-left-10{
    margin-left 10rpx
}
.margin-left-20{
    margin-left 20rpx
}
</style>


