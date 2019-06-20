<template>
  <div class="content">
    <div class="goods-info">
      <img :src="info.picture[0]" alt class="goods-img">
      <div class="goods-info-right">
        <p class="goods-name">{{info.name}}</p>
        <div class="buy-number">
          <div class="buy-number-price">￥{{info.price}}</div>
          <div class="buy-number-right">
            <img src="/static/images/reduce.png" alt @click="reduce">
            <span>{{number}}</span>
            <img src="/static/images/add.png" alt @click="add">
          </div>
        </div>
      </div>
    </div>
    <div class="no-address" v-if="hasAddress==false" @click="goAdd">
      <div class="no-address-top">
        <div class="no-address-left">
          <img src="/static/images/order-address.png" alt>
          <span>添加收货地址</span>
        </div>
        <div class="no-address-right">
          <img src="/static/images/more.png" alt>
        </div>
      </div>
      <div class="no-address-bottom">您当前还没有收货地址</div>
    </div>

    <div class="has-address" v-else @click="changeAddress">
      <div class="has-address-top">
        <div class="has-address-left">
          <img src="/static/images/order-address.png" alt>
          <p>
            <span>{{receiver}}</span>
            <span class="tel-span">{{receiverTel}}</span>
          </p>
        </div>
        <div class="has-address-right">
          <img src="/static/images/more.png" alt>
        </div>
      </div>
      <div class="has-address-bottom">{{province}}{{city}}{{county}} {{address}}</div>
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

    <div class="choose-payway">
      <div class="choose-payway-title">选择支付方式</div>
      <div class="payway-score" :class="[payChe==2?'pay-active':'']" @click="choosePay(2)" v-if="supscore==true" >
        <div class="payway-score-left">
          <img src="/static/images/score16.png" alt>
          <span>加分支付</span>
        </div>
        <div class="payway-score-right">(余额：{{score}})</div>
      </div>
      <div class="payway-score" v-else-if="supscore==false">
        <div class="payway-score-left">
          <img src="/static/images/score16.png" alt>
          <span class="color-bbb">加分支付</span>
        </div>
        <div class="payway-score-right">(余额：{{score}})</div>
      </div>
      <div
        class="payway-score margin-top-10"
        :class="[payChe==3?'pay-active':'']"
        @click="choosePay(3)"
        v-if="supbi==true"
      >
        <div class="payway-score-left">
          <img src="/static/images/bi16.png" alt>
          <span>加币支付</span>
        </div>
        <div class="payway-score-right">(余额：{{bi}})</div>
      </div>
      <div class="payway-score margin-top-10" v-else-if="supbi==false">
        <div class="payway-score-left">
          <img src="/static/images/bi16.png" alt>
          <span class="color-bbb">加币支付</span>
        </div>
        <div class="payway-score-right">(余额：{{bi}})</div>
      </div>
      <div
        class="payway-score margin-top-10"
        :class="[payChe==1?'pay-active':'']"
        @click="choosePay(1)"
        v-if="supwechaer==true"
      >
        <div class="payway-score-left">
          <img src="/static/images/wechat16.png" alt>
          <span>微信支付</span>
        </div>
        <div class="payway-score-right"></div>
      </div>
      <div class="payway-score margin-top-10" v-else-if="supwechaer==false">
        <div class="payway-score-left">
          <img src="/static/images/wechat16.png" alt>
          <span class="color-bbb">微信支付</span>
        </div>
        <div class="payway-score-right"></div>
      </div>
    </div>

    <div class="settlement">
      <div class="settlement-money">
        <div class="settlement-money-left">
          <span>商品总额</span>
        </div>
        <div class="settlement-money-right">{{info.price*number}}</div>
      </div>
      <div class="settlement-money">
        <div class="settlement-money-left">
          <span>商品邮费</span>
        </div>
        <div class="settlement-money-right">{{postage}}</div>
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
        <div class="settlement-money-right">{{totalPrice}}</div>
      </div>
    </div>

    <div class="gopay-btn">
      <div class="gopay-btn-left">¥{{totalPrice}}</div>
      <div class="gopay-btn-right" @click="pay">去付款</div>
    </div>
    <!-- <div @click="showPas">showPastst</div> -->
    <div class="password-content" :class="[isShow==false?'visible':'']" id="password-content">
      <div class="psd-wrapper" id="psd-wrapper">
        <div class="psd-wrapper-title">
          请输入密码支付
          <img
            src="/static/images/close-btn.png"
            alt
            class="close-img"
            @click="closeModel($event)"
            id="close-img"
          >
        </div>
        <div class="score-con">
          <div class="score-con-left">
            <img src="/static/images/score16.png" alt>
            <span>加分支付</span>
          </div>
          <div class="score-con-right">{{totalprice}}</div>
        </div>
        <div class="input-hide">
          <input
            type="number"
            password="true"
            maxlength="6"
            v-model="scorePSsd"
            @input="getScorePsd($event)"
            :focus="isFocus"
            @focus="hasFouce($event)"
            @blur="hasBlur"
          >
        </div>
        <div class="pas-iputlist">
          <div class="inpit-div" :class="[scorePSsd.length==0?'guangbiao':'']">
            <p v-if="scorePSsd.length>=1">*</p>
          </div>
          <div class="inpit-div inpit-div-left-none" :class="[scorePSsd.length==1?'guangbiao':'']">
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
  data() {
    return {
      id: "",
      info: {
        picture: [],
        price: "",
        name: "",
        id:"",
      },
      payChe: 0,
      hasAddress: true,
      supscore: false,
      supbi: false,
      supwechaer: false,
      stock: 1,
      number: 1,
      addressId: "",
      addresslist: [],
      receiver: "",
      postage: 0,
      city: "",
      county: "",
      province: "",
      receiverTel: "",
      address: "",
      score: 0,
      bi: 0,
      supportPayWay: "",
      totalPrice: 0,
      singleprice: 0,
      orderId: "",
      wechatInfo: {},
      hasPay: false,
      isShow: true,
      scorePSsd: "",
      pasd: "",
      isFocus: false,
      couponTitle: "请选择",
      couponId: "",
      couponRule: 0, //0 直减  1 满减  2 折扣
      cutPrice: 0, //减金额
      discount: 1, //折扣
      fullPrice:0,  //满金额
      fullCutPrice:0, //满减的金额
      userCouponId:"",

    };
  },
  onShow: function() {
    let _id = wx.getStorageSync("addressId");
    if (_id != "" && _id != null && _id != undefined) {
      if (this.addressId == "") {
        //this.addressId=_id;
        this.getAddress();
      } else if (this.addressId != "" && this.addressId != _id) {
        // 调用地址改变的接口
        this.getChangeAddress(_id);
      }
    }
    this.cutPrice=0;
    let _couponId = wx.getStorageSync("couponId");
    if (_couponId != "" && _couponId != null && _couponId != undefined) {
      this.userCouponId=_couponId;
      this.getChangeCoupon(_couponId);
    }
  },
  mounted() {
    this.totalPrice = 0;
    this.singleprice = 0;
    this.cutPrice=0;
    this.payChe = 0;
    this.number = 1;
    //console.log(this.$root.$mp.query)
    this.orderId = "";
    if (
      this.$root.$mp.query.id != "" &&
      this.$root.$mp.query.id != null &&
      this.$root.$mp.query.id != undefined
    ) {
      this.id = this.$root.$mp.query.id;
     
    } else {
      this.id = "";
    }
    this.getData();
    this.getMoney();
  },
  methods: {
    getChangeCoupon(_id) {
        this.userCouponId=_id;
       util.request(api.CouponInfo + _id + "/info", {}, "GET").then(data => {
        console.log(data);
        wx.hideLoading();
        if (data.api_code == "0") {

          this.couponTitle = data.api_data.name;
          this.couponRule = data.api_data.couponRule;

          let payPrice = this.singleprice * this.number + this.postage;

          if (this.couponRule == 0) {
            //直减金额
            this.cutPrice = data.api_data.cutPrice;
            if (this.cutPrice > payPrice) {
              this.totalPrice = 0;
            } else {
              this.totalPrice =  (Math.round(payPrice* 100) - Math.round(this.cutPrice * 100)) / 100;
            }
          } else if (this.couponRule == 1) {
            //满减
            this.fullPrice = data.api_data.fullPrice;
            this.fullCutPrice = data.api_data.fullCutPrice;
           
            if(payPrice<this.fullPrice){
                this.cutPrice=0;
            }else{
                this.cutPrice=this.fullCutPrice;
                this.totalPrice =  (Math.round(payPrice* 100) - Math.round(this.cutPrice * 100)) / 100;
               
            }
          } else {
            //折扣
            this.discount = data.api_data.discount;
            this.totalPrice = (Math.round(payPrice * 100) * Math.round(this.discount * 100)) / 10000;
            this.cutPrice =  (Math.round(payPrice * 100) - Math.round(this.totalPrice * 100)) / 100;
          }
        }
      });
    },
    chooseCoupon() {
      wx.navigateTo({
        url: "../coupon/main?useType=0&correlationId=" + this.id+"&totalPrice="+this.payPrice
      });
    },
    showPas() {
      this.isShow = false;
      this.isFocus = true;
    },
    hasFouce(e) {
      console.log(e);
      console.log("this.scorePSsd==::" + this.scorePSsd);
    },
    getScorePsd(e) {
      console.log(e.mp.detail);
      this.scorePSsd = e.mp.detail.value;
      if (e.mp.detail.value.length == 6) {
        // 加分支付回调
        wx.showLoading({
          title: "支付中..."
        });
        console.log(e.mp.detail.value + "end");
        util
          .request(api.MakeGoodsScore + this.orderId + "/back", {
            payPwd: e.mp.detail.value
          })
          .then(data => {
            console.log(data);
            wx.hideLoading();
            if (data.api_code == "0") {
              util.showErrorToastMessage("支付成功");
              this.hasPay = true;
              this.isShow = true;
              this.scorePSsd = "";
              this.isFocus = false;
              setTimeout(() => {
                wx.redirectTo({
                  url: "../paysuccess/main?id=" + this.orderId
                });
              }, 1000);
            } else {
              util.showErrorToastMessage(data.api_message);
              this.isShow = true;
              this.scorePSsd = "";
              this.isFocus = false;
            }
          })
          .catch(error=>{
                    util.showErrorToastMessage(error.api_message);
                });
      }
    },
    hasBlur() {
      this.scorePSsd = "";
    },
    closeM(e) {
      console.log(e.mp.currentTarget);
      if (e.mp.currentTarget.id == "password-content") {
        this.isShow = true;
        this.scorePSsd = "";
        this.isFocus = false;
      }
    },
    closeModel(e) {
      console.log(e);
      if (e.mp.currentTarget.id == "close-img") {
        this.isShow = true;
        this.scorePSsd = "";
        this.isFocus = false;
      }
    },
    getData() {
      wx.showLoading({
        title: "加载中...",
        icon: "loading"
      });
      util.request(api.GoodsDetail, { productId: this.id }, "GET").then(res => {
        console.log(res);
        if (res.api_code == "0") {
          this.info = res.api_data;
          this.stock = res.api_data.stock;
          this.totalPrice = res.api_data.price;
          this.singleprice = res.api_data.price;
          //this.supportPayWay=res.api_data.supportPayWay;
          if (res.api_data.supportPayWay.includes("2")) {
            this.supscore = true;
          } else {
            this.supscore = false;
          }
          if (res.api_data.supportPayWay.includes("3")) {
            this.supbi = true;
          } else {
            this.supbi = false;
          }
          if (res.api_data.supportPayWay.includes("1")) {
            this.supwechaer = true;
          } else {
            this.supwechaer = false;
          }
          this.getAddress();
        }
        wx.hideLoading();
      });
    },
    getAddress() {
      // 获取默认地址和邮费
      util.request(api.GetDefaultAddress, {price:this.info.price,correlationId:this.info.id}, "GET").then(res => {
        console.log(res);
        if (res.api_code == "0") {
          //this.addresslist=res.api_data;
          if (res.api_data.address.postage) {
            this.postage = res.api_data.address.postage;
          } else {
            this.postage = 0;
          }
          if (
            res.api_data.address.id != null &&
            res.api_data.address.id != "" &&
            res.api_data.address.id != undefined
          ) {
            this.city = res.api_data.address.city;
            this.county = res.api_data.address.county;
            this.province = res.api_data.address.province;
            this.receiver = res.api_data.address.receiver;
            this.receiverTel = res.api_data.address.receiverTel;
            this.addressId = res.api_data.address.id;
            this.address = res.api_data.address.address;
            this.hasAddress = true;
          } else {
            this.addressId = "";
            this.hasAddress = false;
          }
          if(res.api_data.couponId){
            this.getChangeCoupon(res.api_data.couponId);
          }
        }
      });
    },
    getChangeAddress(_id) {
      util
        .request(api.GetAddressChange, { addressId: _id }, "GET")
        .then(res => {
          console.log(res);
          if (res.api_code == "0") {
            if (res.api_data.address.postage) {
              this.postage = res.api_data.address.postage;
            } else {
              this.postage = 0;
            }
            if (
              res.api_data.address.id != null &&
              res.api_data.address.id != "" &&
              res.api_data.address.id != undefined
            ) {
              this.city = res.api_data.address.city;
              this.county = res.api_data.address.county;
              this.province = res.api_data.address.province;
              this.receiver = res.api_data.address.receiver;
              this.receiverTel = res.api_data.address.receiverTel;
              this.addressId = res.api_data.address.id;
              this.address = res.api_data.address.address;
              this.hasAddress = true;
            }
          }
        });
    },
    pay() {
      if (this.payChe == 0) {
        util.showErrorToastMessage("请选择支付方式");
        return;
      } else if (this.addressId == "") {
        util.showErrorToastMessage("请设置收货地址");
        return;
      } else {
        if(this.cutPrice<=0){
          this.userCouponId="";
        }
        if (this.orderId == "") {
          wx.showLoading({
            title: "支付中...",
            icon: "loading"
          });
          util
            .request(api.MakeGoodsOrder, {
              productId: this.id,
              number: this.number,
              addressId: this.addressId,
              payWay: this.payChe,
              userCouponId:this.userCouponId,
            })
            .then(res => {
              console.log(res);
              wx.hideLoading();
              if (res.api_code == "0") {
                this.orderId = res.api_data.orderId;
                let _orderId = res.api_data.orderId;
                this.wechatInfo = res.api_data.wechat;
                if (this.payChe == 1) {
                  // 微信支付
                  this.isShow = true;
                  this.isFocus = false;
                  wx.requestPayment({
                    timeStamp: res.api_data.wechat.timeStamp,
                    nonceStr: res.api_data.wechat.nonceStr,
                    package: res.api_data.wechat.package,
                    signType: res.api_data.wechat.signType,
                    paySign: res.api_data.wechat.paySign,
                    success(ress) {
                      console.log(ress);
                      if (ress.errMsg == "requestPayment:ok") {
                        //this.orderId=_orderid;
                        //this.hasPay=true;
                        util.showErrorToastMessage("支付成功");
                        setTimeout(() => {
                          wx.redirectTo({
                            url: "../paysuccess/main?id=" + _orderId
                          });
                        }, 1000);
                      } else {
                        util.showErrorToastMessage(ress.errMsg);
                      }
                    },
                    fail(error) {
                      util.showErrorToastMessage(error);
                    }
                  });
                } else if (this.payChe == 2) {
                  // 加分支付
                  this.isShow = false;
                  this.isFocus = true;
                } else if (this.payChe == 3) {
                  // 加币支付
                  this.isShow = true;
                  this.isFocus = false;
                  util
                    .request(api.MakeGoodsBi + this.orderId + "/back")
                    .then(data => {
                      console.log(data);
                      if (data.api_code == "0") {
                        //this.orderId=_orderid;
                        util.showErrorToastMessage("支付成功");
                        this.hasPay = true;
                        setTimeout(() => {
                          wx.redirectTo({
                            url: "../paysuccess/main?id=" + this.orderId
                          });
                        }, 1000);
                      } else {
                        util.showErrorToastMessage(data.api_message);
                      }
                    });
                }
              } else {
                util.showErrorToastMessage(res.api_message); // 创建订单失败
              }
            });
        } else {
          if (this.payChe == 1) {
            this.isShow = true;
            this.isFocus = false;
            let _orderid = this.orderId;
            wx.requestPayment({
              timeStamp: this.wechatInfo.timeStamp,
              nonceStr: this.wechatInfo.nonceStr,
              package: this.wechatInfo.package,
              signType: this.wechatInfo.signType,
              paySign: this.wechatInfo.paySign,
              success(ress) {
                console.log(ress);
                if (ress.errMsg == "requestPayment:ok") {
                  util.showErrorToastMessage("支付成功");
                  setTimeout(() => {
                    wx.redirectTo({
                      url: "../paysuccess/main?id=" + _orderid
                    });
                  }, 1000);
                } else {
                  util.showErrorToastMessage(ress.errMsg);
                }
              },
              fail(error) {
                util.showErrorToastMessage(error);
              }
            });
          } else if (this.payChe == 2) {
            this.isShow = false;
            this.isFocus = true;
          } else if (this.payChe == 3) {
            this.isShow = true;
            this.isFocus = false;
            util
              .request(api.MakeGoodsBi + this.orderId + "/back")
              .then(data => {
                console.log(data);
                if (data.api_code == "0") {
                  util.showErrorToastMessage("支付成功");
                  this.hasPay = true;
                  setTimeout(() => {
                    wx.redirectTo({
                      url: "../paysuccess/main?id=" + this.orderId
                    });
                  }, 1000);
                } else {
                  util.showErrorToastMessage(data.api_message);
                }
              });
          }
        }
      }
    },
    choosePay(num) {
      this.payChe = num;
    },
    getMoney() {
      util.request(api.GetMoney, {}, "GET").then(res => {
        console.log(res);
        if (res.api_code == "0") {
          this.score = res.api_data.score;
          this.bi = res.api_data.coinBalance;
        }
      });
    },
    reduce() {
      if (this.number > 1) {
        this.number -= 1;
        this.totalPrice = this.number * this.singleprice + this.postage;
      } else {
        this.number = 1;
        this.totalPrice = this.number * this.singleprice + this.postage;
      }
       if(this.couponId){
          if (this.couponRule == 0) {
            //直减金额
            if (this.cutPrice > this.totalPrice) {
              this.totalPrice = 0;
            } else {
              this.totalPrice = (Math.round(this.totalPrice * 100) - Math.round(this.cutPrice * 100)) / 100;
            }
          } else if (this.couponRule == 2) {
            let payPrice=this.totalPrice;
            //折扣
            this.totalPrice = (Math.round(this.totalPrice * 100) * Math.round(this.discount * 100)) / 10000;
            this.cutPrice =  (Math.round(payPrice * 100) - Math.round(this.totalPrice * 100)) / 100;
          }else{
              //满减
            if(this.totalPrice<this.fullPrice){
                this.cutPrice=0;
            }else{
                this.cutPrice=this.fullCutPrice;
                this.totalPrice =(Math.round(this.totalPrice * 100) - Math.round(this.cutPrice * 100)) / 100;
            }
          }
       }
     
    }, 
    add() {
      if (this.number < this.stock) {
        this.number += 1;
        this.totalPrice = this.number * this.singleprice + this.postage;
      } else {
        this.number = this.stock;
        this.totalPrice = this.number * this.singleprice + this.postage;
      }
      if(this.couponId){
          if (this.couponRule == 0) {
            let payPrice=this.totalPrice;
            //直减金额
            if (this.cutPrice > this.totalPrice) {
              this.totalPrice = 0;
            } else {
              this.totalPrice =(Math.round(this.totalPrice * 100) - Math.round(this.cutPrice * 100)) / 100;
            }
          } else if (this.couponRule == 2) {
            let payPrice=this.totalPrice;
            //折扣
            this.totalPrice =(Math.round(this.totalPrice * 100) * Math.round(this.discount * 100)) / 10000;
            this.cutPrice =  (Math.round(payPrice * 100) - Math.round(this.totalPrice * 100)) / 100;
          }else{
              //满减
            if(this.totalPrice<this.fullPrice){
                this.cutPrice=0;
            }else{
                this.cutPrice=this.fullCutPrice;
                this.totalPrice = (Math.round(this.totalPrice * 100) - Math.round(this.cutPrice * 100)) / 100;
            }
          }
      }
    
    },
    goAdd() {
      wx.navigateTo({
        url: "../addaddress/main"
      });
    },
    changeAddress() {
      wx.navigateTo({
        url: "../addresslist/main"
      });
    }
  },
  onUnload: function() {
    this.couponTitle = "请选择";
    this.couponId = "";
    this.cutPrice = 0;
    this.addressId="";
    wx.removeStorageSync("addressId");
    wx.removeStorageSync("couponId");
  },
  onHide() {}
};
</script>
<style lang="stylus" scoped>
.dis-none {
  display: none !important;
}

.color-a {
  color: #aaa;
}

.visible {
  visibility: visible !important;
}

.content {
  width: 100%;
  min-height: 125vh;
  background-color: #f2f2f2;

  .goods-info {
    padding: 48rpx 30rpx;
    background-color: #f8f8f8;
    height: 132rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    .goods-img {
      width: 132rpx;
      height: 132rpx;
      border-radius: 8rpx;
    }

    .goods-info-right {
      width: 534rpx;
      height: 132rpx;

      .goods-name {
        font-size: 32rpx;
        color: #333333;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical !important;
        overflow: hidden;
        padding-top: 8rpx;
        font-weight: bold;
      }

      .buy-number {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        margin-top: 24rpx;

        .buy-number-price {
          font-family: PingFangSC-Medium;
          font-size: 32rpx;
          color: #43AEC8;
        }

        .buy-number-right {
          font-family: PingFangSC-Light;
          font-size: 34rpx;
          color: #333333;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;

          img {
            width: 52rpx;
            height: 52rpx;
          }

          span {
            margin: 0 20rpx;
          }
        }
      }
    }
  }

  .no-address {
    padding: 30rpx;
    background-color: #ffffff;
    font-size: 28rpx;
    display: flex;
    flex-flow: column nowrap;

    .no-address-top {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .no-address-left {
        display: flex;
        flex-flow: row nowrap;
        font-family: PingFangSC-Medium;
        font-size: 28rpx;
        font-weight: bold;
        color: #43AEC8;

        img {
          width: 32rpx;
          height: 40rpx;
          margin-right: 26rpx;
        }
      }

      .no-address-right {
        img {
          width: 14rpx;
          height: 24rpx;
        }
      }
    }

    .no-address-bottom {
      font-size: 28rpx;
      color: #BBBBBB;
      margin-top: 10rpx;
      padding-left: 54rpx;
    }
  }

  .has-address {
    padding: 30rpx;
    background-color: #ffffff;
    font-size: 28rpx;
    display: flex;
    flex-flow: column nowrap;

    .has-address-top {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .has-address-left {
        display: flex;
        flex-flow: row nowrap;
        font-family: PingFangSC-Medium;
        font-size: 28rpx;
        font-weight: bold;
        color: #333;

        img {
          width: 32rpx;
          height: 40rpx;
          margin-right: 26rpx;
        }

        .tel-span {
          margin-left: 30rpx;
        }
      }

      .has-address-right {
        img {
          width: 14rpx;
          height: 24rpx;
        }
      }
    }

    .has-address-bottom {
      font-size: 28rpx;
      color: #666;
      margin-top: 10rpx;
      padding-left: 54rpx;
    }
  }

  .choose-payway {
    margin-top: 20rpx;
    padding: 30rpx;
    background-color: #ffffff;

    .choose-payway-title {
      font-size: 28rpx;
      color: #AAAAAA;
    }

    .payway-score {
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

      .payway-score-left {
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

      .payway-score-right {
        margin-right: 20rpx;
      }
    }

    .payway-score-nosup {
      .payway-score-left {
        color: #BBBBBB !important;
      }
    }

    .margin-top-10 {
      margin-top: 20rpx;
    }

    .pay-active {
      background-repeat: no-repeat;
      background-size: 100%;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAABmCAMAAAAAl4KiAAAAbFBMVEVTtc1mvtNVu8wAAABOs8xMuMv///9DrshOssv+//+Nzt7X7vPr9/lEr8nl9PhStc1Iscr7/v72/P3B5e6l2OWHy9x5xthovtNZuM/Q6/KY0+Jyw9Zhu9Hv+fve8fbZ7/TJ6PC44euu3eiAydraRtnXAAAABnRSTlP6yx4A7DbJ3e3xAAACIklEQVR42uzbSXKDMBRFUblDxKZvDO67/e8x5VISU/EAz/iv6p4BsIA7ENKXW8xnzgMS0uVq4eaxB2SkKzfz2yQCplQX/mNL5zzFYmq72H8qdd5HwNQuuf8UycKErPej4qYpSBZWJMfRYjdR1JIszDh148V+dSQLO6rDaLFr1rKwpHyMFcvvF2wJTQZ5/l4sOwYwZ+9/dGW5/l8sm1ww6J6GMNvQ6LBY9mVh0i00W4RKB8VylACjrsWg09cXp18waxcPmv19c2ALw875oNnwZMYApmX9q9nsWSxjMTAuOf41+yyWSS6YVx0GawOGDyGg2oZm66xlXhYSypYRb4jZkyzENCQLMfeUZKGlLkgWWq4xyULLJidZaDn3JAst2ZFkoeXUkSy0VAeShZbyQbLQwq0EyNmTLMQ0JAsxt5RkoaUuSBZadjHJQsslJ1loyXqShZaEZCGGZCGGZL/ZpQMSAAAAAEH/X7cj0A0yoywzyjKjLDPKMqMsM8oyoywzyjKjLDPKMqMsM8oyoywzyjKjLDPKMqMsM8oyoywzyjKjLDPKMqMsM8oyoywzyjKjLDPKMqMsM8oyoywzyjKjLDPKMqMsM8oyoywzyjKjLDPKMqMsM8oyoywzytYuHdsADAJBEDweyUdATP+luo6VdmoYwVhWMJYVjGUFY1nBWFYwlhWMZQVjWcFYVjBt0vtJELfJ6vOsIO7rypxKGGeyZ6USQtbsH2EthrJpVFnFAAAAAElFTkSuQmCC');
    }
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

  .gopay-btn {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100rpx;
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    background-color: #ffffff;
    bottom: 0;

    .gopay-btn-left {
      font-family: PingFangSC-Medium;
      font-size: 44rpx;
      color: #43AEC8;
      margin-left: 30rpx;
    }

    .gopay-btn-right {
      height: 60rpx;
      width: 156rpx;
      text-align: center;
      line-height: 60rpx;
      border-radius: 8rpx;
      background: #43AEC8;
      font-family: PingFangSC-Regular;
      font-size: 28rpx;
      color: #FFFFFF;
      margin-right: 30rpx;
    }
  }

  .password-content {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    visibility: hidden;

    .psd-wrapper {
      width: 600rpx;
      height: 396rpx;
      background: #FFFFFF;
      border-radius: 8rpx;
      position: relative;

      .psd-wrapper-title {
        height: 80rpx;
        line-height: 80rpx;
        position: relative;
        text-align: center;
        font-size: 28rpx;
        color: #666666;

        .close-img {
          width: 20rpx;
          height: 20rpx;
          position: absolute;
          z-index: 1000;
          right: 30rpx;
          top: 30rpx;
        }
      }

      .score-con {
        width: 540rpx;
        height: 108rpx;
        background: #F1F6F8;
        border-radius: 4rpx;
        margin: 0 auto;
        font-family: PingFangSC-Medium;
        font-size: 30rpx;
        color: #333333;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        .score-con-left {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          font-weight: bold;
          height: 100%;
          align-items: center;

          img {
            height: 52rpx;
            width: 52rpx;
            margin: 0 10rpx 0 24rpx;
          }
        }

        .score-con-right {
          margin-right: 24rpx;
          font-family: PingFangSC-Medium;
          font-size: 40rpx;
          color: #43AEC8;
        }
      }

      .input-hide {
        width: 540rpx;
        height: 230rpx;
        // opacity 0
        z-index: 9999;
        top: 80rpx;
        left: 30rpx;
        position: absolute;

        input {
          width: 100%;
          height: 100%;
          margin-left: -20%;
          color: rgba(255, 255, 255, 0);
        }
      }

      .pas-iputlist {
        margin: 30rpx auto 0 auto;
        width: 552rpx;
        height: 92rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .inpit-div {
          width: 92rpx;
          height: 92rpx;
          background: #FFFFFF;
          border: 1rpx solid #DDDDDD;
          box-sizing: border-box;
          text-align: center;
          line-height: 92rpx;
          position: relative;
        }

        .inpit-div-left-none {
          border-left: none !important;
        }

        .guangbiao::after {
          position: absolute;
          content: '';
          z-index: 1001;
          width: 4rpx;
          height: 40rpx;
          top: 26rpx;
          left: 44rpx;
          background-color: #666;
        }
      }
    }
  }
}
</style>


