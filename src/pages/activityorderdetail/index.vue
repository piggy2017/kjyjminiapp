<template>
    <div class="content">
        <div class="order-detail-top wait-pay" v-if="info.status==0">
            <p>待付款</p>
            <p class='p2'>赶紧将它收入囊中吧</p>
        </div>
        <div class="order-detail-top wait-travel" v-if="info.status==1">
            <p>待出行</p>
            <p class='p2'>假日即将开启～</p>
        </div>
        <div class="order-detail-top has-travel" v-if="info.status==2">
            <p>已出行</p>
            <p class='p2'>享受美好时光～</p>
        </div>
        <div class="order-detail-top has-end" v-if="info.status==3">
            <p>已完成</p>
            <p class='p2'>期待与您再次相遇～</p>
        </div>
        <div class="order-detail-top refund-load" v-if="info.refundStatus==0">
            <p>退款中</p>
            <p class='p2'>已申请退款</p>
        </div>
        <div class="order-detail-top refund-success" v-if="info.refundStatus==1">
            <p>已退款</p>
            <p class='p2'>已成功退款</p>
        </div>
        <div class="detail-content">
            <!-- <div @click="showPas">showPas</div> -->
            <div class="detail-info">
                <img :src="info.cover" alt="">
                <div class="detail-info-right">
                    <p class="activity-name font-w">{{info.activityName}}</p>
                    <p class="chuxing-date">
                        <img src="/static/images/go-date.png" alt="">
                        <span>{{info.startDate}}至{{info.endDate}}</span>
                    </p>
                </div>
            </div>
            <div class="contact-info">
                <div class="contact-info-cell">
                    <span class="label-1 font-w">出行人</span>
                   
                    <span class="color-b" @click="viewCHUxing">{{chuxingPeople}}</span>
                </div>
                <div class="big-man-content" v-if="bigman>0">
                    <div class="big-man-content-left">
                        <span>成人</span>
                        <img src="/static/images/score16.png" alt="" v-if="info.accountInfo.payWay==2">
                        <img src="/static/images/bi16.png" alt="" v-else-if="info.accountInfo.payWay==3">
                        <span v-else-if="info.accountInfo.payWay==1" class="yuan">￥</span>
                        <span class="color-blue">{{info.activityPrice}}</span>
                    </div>
                    <div class="big-man-content-right">x{{bigman}}</div>
                </div>
                <div class="big-man-content" v-if="children>0">
                    <div class="big-man-content-left">
                        <span>儿童</span>
                        <img src="/static/images/score16.png" alt="" v-if="info.accountInfo.payWay==2">
                        <img src="/static/images/bi16.png" alt="" v-else-if="info.accountInfo.payWay==3">
                        <span v-else-if="info.accountInfo.payWay==1" class="yuan">￥</span>
                        <span class="color-blue">{{info.activityChildPrice}}</span>
                    </div>
                    <div class="big-man-content-right">x{{children}}</div>
                </div>
                <div class="contact-cell-bot">
                    <span class="label-1 font-w">联系人</span>
                    <span class="color-b">{{info.contact}}</span>
                </div>
            </div>
            <div class="pay-type">
                <span class="font-w">支付方式</span>
                <div class="pay-type-right" v-if="info.accountInfo.payWay==2">
                    <img src="/static/images/score16.png" alt="" >
                    <span>加分支付</span>
                </div>
                <div class="pay-type-right" v-if="info.accountInfo.payWay==3">
                    <img src="/static/images/bi16.png" alt="">
                    <span>加币支付</span>
                </div>
                <div class="pay-type-right" v-if="info.accountInfo.payWay==1">
                    <span>微信支付</span>
                </div>
            </div>

            <div class="order-no">
                <span class="font-w">订单总额</span>
                <span class="order-no-right">{{info.totalPrice}}</span>
            </div>

            <div class="order-no">
                <span class="font-w">优惠劵</span>
                <span class="order-no-right">-{{couponPrice}}</span>
            </div>

            <div class="order-no">
                <span class="font-w">订单号</span>
                <span class="order-no-right">{{info.activityOrderNo}}</span>
            </div>
            <div class="order-time">
                <span class="font-w">下单时间</span>
                <span class="order-no-right">{{info.createDate}}</span>
            </div>
        </div>
        <div class="detail-fiexd">
            <div class="detail-fiexd-left" v-if="info.accountInfo.payWay==1">
                <span>￥{{info.paymentPrice}}</span>
            </div>
            <div class="detail-fiexd-left" v-else-if="info.accountInfo.payWay==2">
                <img src="/static/images/score16.png" alt="" >
                <span>{{info.paymentPrice}}</span>
            </div>
            <div class="detail-fiexd-left" v-else-if="info.accountInfo.payWay==3">
                <img src="/static/images/bi16.png" alt="" >
                <span>{{info.paymentPrice}}</span>
            </div>
            <!-- v-if="info.status==0" -->
            <div class="detail-fiexd-right" v-if="info.status==0">
                <div class="btn cancal-btn mar-right" @click="cancelOrder(info.activityOrderId,1,info.accountInfo.payWay)">取消订单</div>
                <div class="btn pay-btn" @click="goPay($event,info.activityOrderId)" :data-way="info.accountInfo.payWay">支付</div>
            </div>

            <div class="detail-fiexd-right" v-else-if="info.status==1 || info.status==2 || info.refundStatus==0">
                <!-- <div class="detail-fiexd-right" v-if="info.status==1"> -->
               
                <!-- </div> -->
                <div class="btn cancal-btn mar-right" @click="call(info.businessPhone)">拨打客服</div>
                 <div class="btn cancal-btn " @click="refundOrder(info.activityOrderId,info.accountInfo.payWay)">退款</div>
                <!-- <div class="btn cancal-btn margin-left-20" @click="goHome" v-if="info.status==1 && isfromActivi==true">返回首页</div> -->
            </div>
             
            <div class="detail-fiexd-right" v-else-if="info.status==3 || info.refundStatus==1">
                <div class="btn cancal-btn" @click="deleteOrder(info.activityOrderId,2,info.accountInfo.payWay)">删除订单</div>
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
            id:"",
            info:{
                accountInfo:{
                    payWay:1
                }
            },
            chuxingPeople:"",
            children:0,
            bigman:0,
            showPerson:false,
            orderId:"",
            isShow:true,
            scorePSsd:"",
            pasd:"",
            isFocus:false,
            beforeUrl:"",
            isfromActivi:false,
            couponPrice:0,
        }
    },
    onLoad(){
        Object.assign(this, this.$options.data());
        let pages = getCurrentPages();
        console.log(pages);
        // this.beforeUrl=pages[pages.length - 2].route;
        // console.log(this.beforeUrl=="pages/travelorder/main");
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
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.id=this.$root.$mp.query.id;
        }
        this.getData();
    },
    methods:{
         refundOrder(orderid,way){ // 退款
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.ActivityOrderEdit+orderid,{type:3,payWay:way}).then(res=>{
                console.log(res);
                if(res.api_data==true){
                    util.showErrorToastMessage("退款申请成功");
                    setTimeout(()=>{
                        this.getdata();
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
                util.request(api.ScoreBack+this.orderId+"/back",{payPwd:e.mp.detail.value,orderId:this.orderId,type:0,payWay:2}).then(data=>{
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
            util.request(api.ActivityOrderDetail+this.id+"/detail",{orderId:this.id},"GET").then(res=>{
                console.log(res);
                 this.children=0;
                  this.bigman=0;
                if(res.api_code=="0"){
                    this.info=res.api_data;
                    this.orderId=res.api_data.activityOrderId
                    if(res.api_data.couponPrice){
                        this.couponPrice=res.api_data.couponPrice;
                    }
                    if(res.api_data.tourists.length<4 && res.api_data.tourists.length>0){
                        let _list=[];
                        for(let i=0;i<res.api_data.tourists.length;i++){
                            _list.push(res.api_data.tourists[i].userName);
                            if(res.api_data.tourists[i].child==false){
                                this.bigman+=1;
                            }else{
                                this.children+=1;
                            }
                        }
                        console.log(_list);
                        this.chuxingPeople=_list.join("/")
                    }else if(res.api_data.tourists.length>=4){
                        let personList=JSON.parse(JSON.stringify(res.api_data.tourists)).splice(3);
                        let _list=[];
                        for(let i=0;i<personList.length;i++){
                            _list.push(personList.userName);
                            if(personList.child==false){
                                this.bigman+=1;
                            }else{
                                this.children+=1;
                            }
                        }
                        console.log(_list);
                        this.chuxingPeople=_list.join("/")+"等"+res.api_data.tourists.length+"人"
                    }
                }
                 wx.hideLoading();
            })
        },
        cancelOrder(orderid,_type,way){  //  取消订单
            wx.showLoading({
                title: '加载中...',
            });
            util.request(api.ActivityOrderEdit+orderid,{orderId:orderid,type:_type,payWay:way}).then(res=>{
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
                util.request(api.ActivityOrderEdit+orderid,{orderId:orderid,type:0,payWay:1}).then(data=>{
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
                                console.log(ress);
                                if (ress.errMsg == "requestPayment:ok") {
                                    util.showErrorToastMessage("支付成功");
                                    setTimeout(()=>{
                                        this.getData();
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
                 util.request(api.ActivityOrderEdit+orderid,{orderId:orderid,type:0,payWay:3}).then(data=>{
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
                phoneNumber:number
            })
        }, 
        deleteOrder(orderid,_type,way){  // 删除订单
            wx.showLoading({
                title: '删除中...',
            });
            util.request(api.ActivityOrderEdit+orderid,{orderId:orderid,type:_type,payWay:way}).then(res=>{
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
        }
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
    min-height 110vh
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
            .detail-info-right{
                width 540rpx
                height 100%
                display flex
                flex-flow column nowrap
                justify-content space-around
                font-size: 32rpx;
                color: #333333;
                .chuxing-date{
                    font-size: 28rpx;
                    color: #666666;
                    display flex
                    flex-flow row nowrap
                    align-items center
                    img{
                        width 40rpx 
                        height 40rpx
                        margin-right 20rpx
                    }
                }
                .activity-name{
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp:1;
                    -webkit-box-orient:vertical !important;
                    overflow:hidden;
                }
            }
        }
        .contact-info{
            width 100%
            background-color #ffffff
            .contact-info-cell{
                width 690rpx
                height 90rpx
                display flex
                flex-flow rwo nowrap
                align-items center
                justify-content space-between
                margin 0 auto
                border-top 1rpx solid #dddddd
                font-family: PingFangSC-Medium;
                font-size: 28rpx;
                color: #333333;
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
            height 80rpx
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


