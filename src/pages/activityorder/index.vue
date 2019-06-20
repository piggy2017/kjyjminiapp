<template>
    <div class="content">
        <div class="travel-content">
            <img :src="info.cover" alt="" class="travel-img">
            <div class="travel-content-right">
                <div class="travel-name">{{name}}</div>
                <div class="travel-date">
                    <img src="/static/images/go-date.png" alt="">
                    <span>{{info.date}}</span>
                </div>
            </div>
        </div>
        <div class="choose">
            <div class="choose-person">
                <span class="font-w">出行人</span>
                <div class="text-g" @click="chooseChuXing">{{choose1}}</div>
            </div>
            <div class="person-num-big" v-if="bigNumber>0">
                <div class="big-left font-w">
                    <span>成人</span>
                    <span class="color-b">￥{{info.price}}</span>
                </div>
                <div class="big-right">
                    x{{bigNumber}}
                </div>
            </div>
            <div class="person-num-big" v-if="smallNumber>0">
                <div class="big-left font-w">
                    <span>儿童</span>
                    <span class="color-b">￥{{info.childPrice}}</span>
                </div>
                <div class="big-right">
                    x{{smallNumber}}
                </div>
            </div>
            <div class="choose-person hegiht-m">
                <span class="font-w">联系人</span>
                <div class="text-g" @click="chooseContact">{{choose2}}</div>
            </div>
        </div>


        <div class="choose-coupon">
            <div class="choose-coupon-title">选择优惠劵</div>
            <div class="coupon">
                <div class="coupon-left">
                <span>优惠劵</span>
                </div>
                <div class="coupon-right" @click="chooseCoupon">{{couponTitle}}</div>
            </div>
        </div>


        <div class="pay">
            <div class="pay-title">选择支付方式</div>
            <div class="pay-score"  @click="choosePay(2)" :class="[payChe==2?'pay-active':'']" v-if="scoreUse==true">
                <div class="pay-score-left">
                    <img src="/static/images/score16.png" alt="">
                    <span>加分支付</span>
                </div>
                <div class="pay-score-right">(余额:{{score}})</div>
            </div>
            <div class="pay-score" v-else>
                <div class="pay-score-left">
                    <img src="/static/images/score16.png" alt="">
                    <span class="color-a">加分支付</span>
                </div>
                <div class="pay-score-right">(余额:{{score}})</div>
            </div>

            <div class="pay-score margin-top-10"  @click="choosePay(3)" :class="[payChe==3?'pay-active':'']">
                <div class="pay-score-left">
                    <img src="/static/images/bi16.png" alt="">
                    <span>加币支付</span>
                </div>
                <div class="pay-score-right">(余额:{{bi}})</div>
            </div>
            <div class="pay-score margin-top-10" :class="[payChe==1?'pay-active':'']" @click="choosePay(1)">
                <div class="pay-score-left">
                    <img src="/static/images/wechat16.png" alt="">
                    <span>微信支付</span>
                </div>
                <div class="pay-score-right"></div>
            </div>
        </div>
       
        <div class="settlement">
            <div class="settlement-money">
                <div class="settlement-money-left">
                <span>订单总额</span>
                </div>
                <div class="settlement-money-right">{{totalprice}}</div>
            </div>
            <div class="settlement-money">
                <div class="settlement-money-left">
                <span>优惠劵</span>
                </div>
                <div class="settlement-money-right">-{{cutPrice}}</div>
            </div>
            <div class="settlement-money">
                <div class="settlement-money-left">
                <span>实付金额</span>
                </div>
                <div class="settlement-money-right">{{payPrice}}</div>
            </div>
        </div>



        <div class="pay-fiex">
            <div class="pay-fiex-top">
                <div  @click="changeTongyi">
                    <img src="/static/images/moren-1.png" alt="" v-if="tongyi==false">
                    <img src="/static/images/moren-2.png" alt="" v-if="tongyi==true">
                    <span>我已阅读并同意</span>
                </div>
                <span class="bot-color" @click="read">《报名参团协议》</span>
            </div>
            <div class="pay-btn">
                <span>¥{{payPrice}}</span>
                <div class="pay-sure" @click="payMoney">去付款</div>
            </div>
        </div>
        <!-- <div @click="showPas">showPastst</div> -->
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
                    <div class="score-con-right">{{payPrice}}</div>
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
            name:"",
            info:{},
            choose1:"请选择",
            choose2:"请选择",
            score:0,
            bi:0,
            payChe:0,
            bigNumber:0,
            smallNumber:0,
            tongyi:false,
            totalprice:0,
            bigman:0,
            samllman:0,
            phoneId:"",
            contactName:"",
            contactPhone:"",
            chuxingList:"",
            personList:[],
            hasPay:false,
            orderId:"",
            price:0,
            childPrice:0,
            isShow:true,
            scorePSsd:"",
            pasd:"",
            isFocus:false,
            wechat:{},
            scoreUse:true, // 是否支持加分支付
            couponTitle: "请选择",
            couponId: "",
            couponRule: 0, //0 直减  1 满减  2 折扣
            cutPrice: 0, //减金额
            discount: 1, //折扣
            fullPrice:0,  //满金额
            fullCutPrice:0, //满减的金额
            userCouponId:"",
            payPrice:0,

        }
    },
    onLoad(){ 
        Object.assign(this, this.$options.data());
        this.isShow=true;
        this.isFocus=false;
        console.log("123456789");
        this.orderId="";
        let getIdS=wx.getStorageSync("idlist");
        console.log(getIdS);
        this.payChe=0;
        this.hasPay=false;
        this.totalprice=0;
        this.bigNumber=0;
        this.smallNumber=0;
        this.cutPrice=0;
        let pages = getCurrentPages();
        console.log(pages);
        // 获取小程序在 page onLoad 时候传递的 options
        this.bigNumber=0;
        this.smallNumber=0;
        this.contactName="";
        //console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.id=this.$root.$mp.query.id;
        }
        this.getDetail();
        this.getMoney();
    },
    onShow:function(){
        this.isShow=true;
        this.isFocus=false;
        console.log("activityorder==== onshow ----onshow==== onshow")
        this.payChe=0;
        this.hasPay=false;
        this.totalprice=0;
        this.bigNumber=0;
        this.smallNumber=0;
        //   获取出行人
        let getIdS=[];
        let goList="";
        let idArr=wx.getStorageSync("idlist");
        if(idArr!=null && idArr!=undefined && idArr!=""){
            getIdS=JSON.parse(idArr);
            this.choose1="";
            //this.chuxingList=
            for(let i=0;i<getIdS.length;i++){
                this.choose1+=getIdS[i].userName+" ";
                goList+=getIdS[i].id+",";
                if(getIdS[i].child==false){
                    this.bigNumber+=1;
                    this.totalprice+=this.info.price*1;
                }else{
                    this.smallNumber+=1;
                    this.totalprice+=this.info.childPrice*1;
                }
            }
            this.payPrice=this.totalprice;
            console.log(goList);
            this.chuxingList=goList.substr(0,goList.length-1);
        }else{
            this.choose1="请选择";
        }
        console.log(getIdS);
        // 获取联系人
        let getPhone=[];
        let storagr=wx.getStorageSync("postPHone");
        if(storagr!=null && storagr!=undefined && storagr!=""){
            getPhone=JSON.parse(storagr);
            this.choose2=getPhone[0].userName;
            this.contactName=getPhone[0].userName;
            this.contactPhone=getPhone[0].phone;
        }else{
            this.choose2="请选择"
        }
       
        let _couponId = wx.getStorageSync("couponId");
        if (_couponId != "" && _couponId != null && _couponId != undefined) {
        this.userCouponId=_couponId;
        this.getChangeCoupon(_couponId);
        }
    },
    methods:{
        chooseCoupon() {
            wx.navigateTo({
                url: "../coupon/main?useType=2&correlationId=" + this.id+"&totalPrice="+this.totalprice
            });
        },
        getChangeCoupon(_id) {
            this.userCouponId=_id;
            util.request(api.CouponInfo + _id + "/info", {}, "GET").then(data => {
                console.log(data);
                wx.hideLoading();
                if (data.api_code == "0") {

                this.couponTitle = data.api_data.name;
                this.couponRule = data.api_data.couponRule;
                if (this.couponRule == 0) {
                    //直减金额
                    this.cutPrice = data.api_data.cutPrice;
                    if (this.cutPrice > this.totalprice) {
                       this.payPrice = 0;
                    } else {
                    this.payPrice =(Math.round(this.totalprice * 100) - Math.round(this.cutPrice * 100)) / 100;
                     
                    }
                } else if (this.couponRule == 1) {
                    //满减
                    this.fullPrice = data.api_data.fullPrice;
                    this.fullCutPrice = data.api_data.fullCutPrice;
                
                    if(this.totalprice<this.fullPrice){
                        this.cutPrice=0;
                    }else{
                        this.cutPrice=this.fullCutPrice;
                        this.payPrice =(Math.round(this.totalprice * 100) - Math.round(this.cutPrice * 100)) / 100;
                    }
                } else {
                    //折扣
                    this.discount = data.api_data.discount;
                    this.payPrice = (Math.round(this.totalprice * 100) - Math.round( this.discount* 100)) / 10000;

                    this.cutPrice =  (Math.round(this.totalprice * 100) - Math.round(this.payPrice * 100)) / 100;
                }
            }
        });
    },
        showPas(){
            this.isShow=false;
            this.isFocus=true;
        },
        hasFouce(e){
            console.log(e);
            console.log("this.scorePSsd==::"+this.scorePSsd);
        },
        getScorePsd(e){
            console.log(e.mp.detail)
            this.scorePSsd=e.mp.detail.value;
            if(e.mp.detail.value.length==6){ // 加分支付回调
                wx.showLoading({
                    title: '支付中...',
                });
                console.log(e.mp.detail.value+"end");
                util.request(api.ScoreBack+this.orderId+"/back",{payPwd:e.mp.detail.value}).then(data=>{
                    console.log(data);
                    wx.hideLoading();
                    if(data.api_code=="0"){
                        util.showErrorToastMessage("支付成功");
                        this.hasPay=true;
                        this.isShow=true;
                        this.scorePSsd="";
                        this.isFocus=false;
                        wx.removeStorageSync("idlist");
                        wx.removeStorageSync("postPHone");
                        setTimeout(() => {
                            wx.redirectTo({
                                url:"../paysuccess/main?id="+this.orderId
                            })
                        }, 1000);
                    }else{
                        util.showErrorToastMessage(data.api_message);
                        this.isShow=true;
                        this.scorePSsd="";
                        this.isFocus=false;
                    }
                })
            }
        },
        hasBlur(){
            this.scorePSsd=""
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
        getDetail(){
            console.log(api.ActivityDetail+this.id);
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.ActivityDetail+this.id,{},"GET").then(res=>{
                //console.log(res);
                if(res.api_code=="0"){
                    this.name=res.api_data.name
                    this.info=res.api_data;
                    this.price=res.api_data.price;
                    this.childPrice=res.api_data.childPrice;
                }
            })
        },
        chooseChuXing(){  // 选择出行人
            wx.navigateTo({
                url:"../choosecontact/main?id="+this.id
            })
        },
        chooseContact(){  // 选择联系人
            wx.navigateTo({
                url:"../choosephone/main?id="+this.id
            })
        },
        changeTongyi(){
            this.tongyi=!this.tongyi;
        },
        choosePay(type){
            console.log(type)
            if(type==1){
                this.payChe=1;
            }else if(type==3){
                this.payChe=3;
            }else if(type==2){
                this.payChe=2;
                // if(this.scoreUse==true){
                //     this.payChe=2;
                // }else{

                // }
            }
        },
        read(){
            wx.navigateTo({
                url:"../activityPreview/main"
            })
        },
        getMoney(){
             util.request(api.ActivityMoney,{activityId:this.id},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.score=res.api_data.score;
                    this.bi=res.api_data.coinBalance;
                    this.scoreUse=res.api_data.scoreUse;
                }
            })
        },
        getPerson(){
            util.request(api.UsualUser,{type:0},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.personList=res.api_data;
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
            })
        },
        payMoney(){
            if(this.tongyi==false){
                util.showErrorToastMessage("请勾选同意参团协议");
                return
            }else if(this.bigNumber==0 && this.smallNumber==0){
                util.showErrorToastMessage("选择出行人");
                return
            }else if(this.choose2=="请选择"){
                util.showErrorToastMessage("请选择联系人");
                return
            }else if(this.payChe==0){
                util.showErrorToastMessage("请选择支付方式");
                return
            }else{
                 if(this.cutPrice<=0){
                    this.userCouponId="";
                    }
                if(this.orderId==""){
                    wx.showLoading({
                        title: "支付中...",
                        icon: "loading"
                    });
                    util.request(api.SubmitActivity,
                        {
                            activityId:this.id,
                            touristIds:this.chuxingList,
                            contact:this.contactName,
                            phone:this.contactPhone,
                            payWay:this.payChe,
                            userCouponId:this.userCouponId,
                        }
                    ).then(res=>{
                        console.log(res);
                        wx.hideLoading();
                        if(res.api_code=="0"){
                            let _orderid=res.api_data.orderId;
                            this.orderId=_orderid;
                            this.wechat=res.api_data.wechat;
                            if(this.payChe==3){  // 加币支付回调
                                this.isShow=true;
                                this.isFocus=false;
                                util.request(api.CoinBack+_orderid+"/back").then(data=>{
                                    console.log(data)
                                    if(data.api_code=="0"){
                                        this.orderId=_orderid;
                                        util.showErrorToastMessage("支付成功");
                                        this.hasPay=true;
                                        setTimeout(() => {
                                            wx.redirectTo({
                                                url:"../paysuccess/main?id="+_orderid
                                            })
                                        }, 1000);
                                    }else{
                                        util.showErrorToastMessage(data.api_message)
                                    }
                                })
                            }else if(this.payChe==2){ // 加分支付回调
                                this.isShow=false;
                                this.isFocus=true;
                            }else if(this.payChe==1){  // 微信支付
                                this.isShow=true;
                                this.isFocus=false;
                                wx.requestPayment({
                                    timeStamp: res.api_data.wechat.timeStamp,
                                    nonceStr: res.api_data.wechat.nonceStr,
                                    package: res.api_data.wechat.package,
                                    signType:  res.api_data.wechat.signType,
                                    paySign:  res.api_data.wechat.paySign,
                                    success(ress) { 
                                        console.log(ress);
                                        if (ress.errMsg == "requestPayment:ok") {
                                            //this.orderId=_orderid;
                                            //this.hasPay=true;
                                            util.showErrorToastMessage("支付成功");
                                            setTimeout(() => {
                                                wx.redirectTo({
                                                    url:"../paysuccess/main?id="+_orderid
                                                })
                                            }, 1000);
                                        }else{
                                            util.showErrorToastMessage(ress.errMsg)
                                        }
                                    },
                                    fail(error) { 
                                        util.showErrorToastMessage(error)
                                    }
                                })
                            }
                        }else{
                            util.showErrorToastMessage(res.api_message)
                        }
                    })
                }else{
                    if(this.payChe==3){  // 加币支付回调
                        this.isShow=true;
                        this.isFocus=false;
                        util.request(api.CoinBack+this.orderId+"/back").then(data=>{
                            console.log(data)
                            if(data.api_code=="0"){
                                //this.orderId=_orderid;
                                util.showErrorToastMessage("支付成功");
                                wx.removeStorageSync("idlist");
                                wx.removeStorageSync("postPHone");
                                this.hasPay=true;
                                setTimeout(() => {
                                    wx.redirectTo({
                                        url:"../paysuccess/main?id="+this.orderId
                                    })
                                }, 1000);
                            }else{
                                util.showErrorToastMessage(data.api_message)
                            }
                        })
                    }else if(this.payChe==2){ // 加分支付回调
                        this.isShow=false;
                        this.isFocus=true;
                    }else if(this.payChe==1){  // 微信支付
                        this.isShow=true;
                        this.isFocus=false;
                        wx.requestPayment({
                            timeStamp: this.wechat.timeStamp,
                            nonceStr: this.wechat.nonceStr,
                            package: this.wechat.package,
                            signType:  this.wechat.signType,
                            paySign:  this.wechat.paySign,
                            success(ress) { 
                                console.log(ress);
                                if (ress.errMsg == "requestPayment:ok") {
                                    //this.orderId=_orderid;
                                    this.hasPay=true;
                                    util.showErrorToastMessage("支付成功");
                                    wx.removeStorageSync("idlist");
                                    wx.removeStorageSync("postPHone");
                                    setTimeout(() => {
                                        wx.redirectTo({
                                            url:"../paysuccess/main?id="+this.orderId
                                        })
                                    }, 1000);
                                }else{
                                    util.showErrorToastMessage(ress.errMsg)
                                }
                            },
                            fail(error) { 
                                util.showErrorToastMessage(error)
                            }
                        })
                    }
                }
            }
        }
    },
     onUnload: function() {
        console.log("onUnload------------");
        console.log("id=::::::"+this.id);
        this.isShow=true;
        this.isFocus=false;
        this.scorePSsd="";
        //相当于监听返回按钮
        let pages = getCurrentPages();
        console.log(pages);
        let prevPage = pages[pages.length - 2]; //上一个页面
        console.log(prevPage);
        this.couponTitle = "请选择";
        this.couponId = "";
        this.cutPrice = 0;
        wx.removeStorageSync("couponId");
    }
}

</script>
<style lang="stylus" scoped>
.dis-none{
    display none !important
}
.color-a{
    color #aaa
}
.visible{
    visibility:visible !important;
}
.content{
    width 100%
    min-height 137vh
    background-color #f2f2f2
    font-family: PingFangSC-Regular;
    .travel-content{
        background-color #f8f8f8
        padding 50rpx 30rpx
        display flex
        flex-flow row nowrap
        justify-content space-between
        .travel-img{
            width 132rpx
            height 132rpx
            border-radius 8rpx
        }
        .travel-content-right{
            width 530rpx
            font-size: 32rpx;
            color: #333333;
            display flex
            flex-flow column nowrap
            justify-content center
            .travel-name{
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:1;
                -webkit-box-orient:vertical !important;
                overflow:hidden;
            }
            .travel-date{
                margin-top 20rpx
                display flex
                flex-flow row nowrap
                align-items  center
                font-size: 28rpx;
                color: #666666;
                img{
                    width 40rpx
                    height 40rpx
                    margin-right 20rpx
                }
            }
        }
    }
    .choose{
        padding 0 30rpx
        background-color #fff
        .choose-person{
            height 90rpx
            display flex
            flex-flow row nowrap
            justify-content space-between
            font-family: PingFangSC-Medium;
            font-size: 28rpx;
            color: #333333;
            align-items center
            .text-g{
                text-align right
                color: #43AEC8;
                font-family: PingFangSC-Regular;
            }
        }
        .person-num-big{
            display flex
            flex-flow row nowrap
            justify-content space-between
            font-size: 13px;
            padding 8rpx 0
            background: #F4F8F9;
            color: #333333;
            .big-left{
                padding-left 10rpx
                .color-b{
                    font-size: 28rpx;
                    color: #43AEC8;
                    margin-left 20rpx
                    font-family: PingFangSC-Medium;
                }
            }
            .big-righ{
                padding-right 10rpx
            }
        }
        .hegiht-m{
            height 100rpx !important
        }
    }
    .pay{
        padding 0 30rpx 20rpx 30rpx
        background-color #ffffff
        margin-top 20rpx
        .pay-title{
            font-size: 28rpx;
            color: #AAAAAA;
            height 80rpx
            line-height 80rpx
        }
        .pay-score{
            width 690rpx
            height 100rpx
            border 1rpx solid #ddd
            border-radius: 4rpx;
            box-sizing border-box
            display flex
            flex-flow row nowrap
            align-items center
            justify-content space-between
            font-size: 28rpx;
            color: #AAAAAA;
            .pay-score-left{
                display flex
                flex-flow row nowrap
                align-items center
                font-family: PingFangSC-Medium;
                font-size: 30rpx;
                color: #333333;
                img{
                    margin 0 16rpx 0 20rpx
                    width 32rpx
                    height 32rpx
                }
            }
            .pay-score-right{
                margin-right 20rpx
            }
        }
        .margin-top-10{
            margin-top 20rpx
        }
        .pay-active{
            border 2rpx solid #43aec8 !important 
        }
    }
    .pay-fiex{
        width 100%
        height 160rpx
        background-color #ffffff
        position fixed
        z-index 99
        bottom 0
        .pay-fiex-top{
            height 60rpx
            border-bottom 1rpx solid #dddddd
            display flex
            flex-flow row nowrap
            align-items center
            font-size: 28rpx;
            color: #333333;
            padding 0 30rpx
            img{
                width 28rpx
                height 28rpx
                margin-right 16rpx
            }
            .bot-color{
                color: #43AEC8;
                margin-left 10rpx
            }
        }
        .pay-btn{
            height 100rpx
            display flex
            flex-flow row nowrap
            align-items center
            justify-content space-between
            padding 0 30rpx
            font-family: PingFangSC-Medium;
            font-size: 44rpx;
            color: #43AEC8;
            .pay-sure{
                font-family: PingFangSC-Regular;
                font-size: 28rpx;
                color: #FFFFFF;
                background: #43AEC8;
                border-radius: 8rpx;
                width 160rpx
                height 60rpx
                text-align center
                line-height 60rpx
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
            position relative
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
.font-w{
    // font-weight bold
}

 .choose-coupon {
    margin-top: 20rpx;
    padding: 30rpx;
    background-color: #ffffff;

    .choose-coupon-title {
      font-size: 28rpx;
      color: #AAAAAA;
    }

    .coupon {
      height: 105rpx;
      padding: 0 20rpx;
      border: 1rpx solid #eee;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #AAAAAA;

      .coupon-left {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 30rpx;
        color: #333333;

        img {
          margin: 0 16rpx 0 20rpx;
          width: 32rpx;
          height: 32rpx;
        }

        .color-bbb {
          color: #bbb;
        }
      }

      .coupon-right {
        margin-right: 20rpx;
        color: #43aec8;
      }
    }
  }
.settlement {
    margin-top: 20rpx;
    padding: 30rpx;
    background-color: #ffffff;

    .settlement-money {
      height: 30rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #AAAAAA;

      .settlement-money-left {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 30rpx;
        color: #333333;

        img {
          margin: 0 16rpx 0 20rpx;
          width: 32rpx;
          height: 32rpx;
        }

        .color-bbb {
          color: #bbb;
        }
      }

      .settlement-money-right {
        margin-right: 20rpx;
        color: #43aec8;
      }
    }
  }

</style>


