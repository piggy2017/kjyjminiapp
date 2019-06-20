<template>
    <div class="money">
        <div class="money-type">
            <div class="money-class-item " :class="[active==0?'money-class-active':'']" @click='changeType(0)'>加币</div>
            <div class="money-class-item " :class="[active==1?'money-class-active':'']" @click='changeType(1)'>加分</div>
        </div>
         <div class="money-vule">
             <div class="current-money">{{coinBalance}}</div>
             <div class="current-money-title">
                 <img v-if="active==0" src="/static/images/bi16.png">
                 <img v-else-if="active==1" src="/static/images/score16.png">
                 <span v-if="active==0">当前加币</span>
                 <span v-if="active==1">当前加分</span>
            </div>
         </div>
         <div v-for="(item,index) in moneyResult" :key="index" class="money-list">
            <div class="money-img">
                 <img v-if="item.type==1" src="/static/images/wallet-goods.png">
                 <img v-else-if="item.type==2" src="/static/images/wallet-travel.png">
                 <img v-else-if="item.type==3" src="/static/images/wallet-recharge.png">
            </div>
            <div class="money-title">
                   <p>{{item.sorts}}</p>
                   <p v-if="item.type==3&&active==0">加币充值</p>
                   <p v-if="item.type==3&&active==1">加分充值</p>
            </div>
            <div class="money-time">
                <p v-if="item.money>=0" class="money-color" :class="[item.money>0?'money-color-red':'']">+{{item.money}}</p>
                <p v-if="item.money<0" class="money-color" :class="[item.money<0?'money-color-blue':'']">{{item.money}}</p>
                <p class="time">{{item.saleDate}}</p>
            </div>
        </div>
         <div class="password-content" :class="[isShow==false?'visible':'']" id="password-content">
            <div class="psd-wrapper" id="psd-wrapper">
                <div class="psd-wrapper-title">
                    请输入查询密码
                    <img src="/static/images/close-btn.png" alt="" class="close-img" @click="closeModel($event)" id="close-img">
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
           active:0,
           moneyResult:[],
           coinBalance:0,
           isShow:true,
            scorePSsd:"",
            pasd:"",
            isFocus:false,
        }
    },
    mounted(){ 
       this.money();

    },
    methods:{
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
            if(e.mp.detail.value.length==6){ 
                wx.showLoading({
                    title: '查询中...',
                });
                util.request(api.JiaFenInfo,{password:e.mp.detail.value},"GET").then(data=>{
                    wx.hideLoading();
                    if(data.api_code=="0"){
                        this.coinBalance=data.api_data.noDisScoreCan;
                        this.moneyResult=data.api_data.dealList;
                        this.isShow=true;
                        this.scorePSsd="";
                        this.isFocus=false;
                       
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
        money(){
            if(this.active===0){
               util.request(api.JiaBiInfo,{},"GET").then(res=>{
                if(res.api_code=="0"){
                   this.moneyResult=res.api_data.dealList;
                   this.coinBalance=res.api_data.coinBalance;
                }
              })
            }else{
                // util.request(api.JiaFenInfo,{password:"123456"},"GET").then(res=>{
                // if(res.api_code=="0"){
                //    this.coinBalance=res.api_data.noDisScoreCan;
                //     this.moneyResult=res.api_data.dealList;
                // }
                this.showPas();
              
            }
           
        },
        changeType(e){
            this.active=e;
            this.money();
        }
    },
     // 下拉刷新
  onPullDownRefresh: function () {
    this.money();
    wx.stopPullDownRefresh();
  },
   // 上拉加载更多
    onReachBottom: function () {
        
    }, 
}
</script>
<style lang="stylus" scoped>
.money{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    padding-bottom 20rpx
}
.money-type{
    height: 84rpx;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-top: 4rpx solid #f2f2f2;
    text-align center
}
.money-class-item{
    width: 16.66%;
    height: 100%;
    font-size: 28rpx;
    color: #999999;
    line-height: 84rpx;
    position: relative;
    margin-left 20%
}
.money-class-active{
    font-family: PingFangSC-Semibold;
    font-size: 28rpx;
    color: #000000;
    font-weight: bold;
}
.money-class-active::after{
    content: "";
    position: absolute;
    z-index: 99;
    bottom: 10rpx;
    left: 30rpx;
    right: 30rpx;
    height: 6rpx;
    background: #43AEC8;
}
.money-vule{
    background-image  url(http://img.tracenet.cn/mini8.jpg)
    height 222rpx
    width 100%
    background-size 100%
    background-repeat no-repeat
}
.money-list{
    // height 114rpx
    // width 100%
    padding 20rpx 30rpx
    font-size 28rpx
    background-color white
    margin-bottom 20rpx
    display flex
    flex-flow row nowrap
    // align-items center
    justify-content space-between
}
 .money-img{
    width 74rpx
    height 74rpx
    img{
       width 74rpx
       height 74rpx
    }
} 
.money-title{
    width 50%
}
.money-time{
    width 30%
    text-align right 
 }
 .time{
   font-size 24rpx  
   color #BBBBBB
 }
 .money-color{
     font-size 30rpx  
 }
 .money-color-red{
     color: #FF6642;
 }
  .money-color-blue{
     color:#00A2EA;
 }
 .current-money{
     font-size: 54rpx;
     color: #FFFFFF;
     margin-left 64rpx
     padding-top 40rpx
 }
 .current-money-title{
    font-size:28rpx;
    color: #FFFFFF;
    margin-left 70rpx
    padding-top 20rpx
    align-items:center;
    display:flex;
    img{
        width 30rpx
        height 30rpx
        margin-right 10rpx

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
            height 300rpx
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
.color-a{
    color #aaa
}
.visible{
    visibility:visible !important;
}
</style>


