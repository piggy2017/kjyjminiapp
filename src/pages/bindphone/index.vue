<template>
    <div class="bind-phone">
        <div class="bind-phone-top">
            <img src="http://img.tracenet.cn/mini9.jpg" alt="">
            
            <div class="phone-content">
                <div class="phone-content-number">
                    <div class="phone-cell-left">
                        <img src="/static/images/phone-icon.png" alt="" class="phone-icon">
                        <input type="number" placeholder="请输入手机号" class="phone-num" v-model="number" @blur="phoneBlur($event)"/>
                    </div>
                    <div class="phone-cell-right"></div>
                </div>
                <div class="phone-content-number">
                    <div class="phone-cell-left">
                        <img src="/static/images/img-icon.png" alt="" class="phone-icon">
                        <input type="text" placeholder="输入图形验证码" class="phone-num" v-model="imgCode" placeholder-class="pla-class"/>
                    </div>
                    <div class="phone-cell-right" @click="changeImgCode">
                        <img :src="codeImg" class="img-code-class" alt="">
                    </div>
                </div>
                <div class="phone-content-number">
                    <div class="phone-cell-left">
                        <img src="/static/images/code-icon.png" alt="" class="phone-icon">
                        <input type="number" placeholder="短信验证码" class="phone-num" v-model="messageCode" placeholder-class="pla-class"/>
                    </div>
                    <div class="phone-cell-right text-gre" @click="getCode" v-if="hasget==false">
                        获取验证码
                    </div>
                    <div class="phone-cell-right text-gre" v-if="hasget==true">{{time}}S后重新获取</div>
                </div>
                <div class="login-btn" @click="login">登录</div>
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
            number:"",
            imgCode:"",
            messageCode:"",
            codeImg:"",
            time:60,
            timer:null,
            hasget:false,
            navUrl:"",
        }
    },
    onShow:function(){
        this.time=60;
        this.timer=null;
    },
    mounted() {
        console.log("mounted");
        //this.getPICCode();
    },
    methods:{
        phoneBlur(e){
            console.log(e.mp.detail.value);
            let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            if(!myreg.exec(e.mp.detail.value)){
                util.showErrorToastMessage("手机号码不正确")
                return false
            }else{
                this.number=e.mp.detail.value;
                this.codeImg=api.NewPictureCode+"?phone="+e.mp.detail.value;
            }
            //this.getPICCode(e.mp.detail.value);
        },
        getCode(){
            let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            console.log(this.number,this.imgCode);
            if(!myreg.exec(this.number)){
                util.showErrorToastMessage("手机号码不正确")
                return false
            }else if(this.imgCode.length!=4){
                util.showErrorToastMessage("图形验证码不正确")
                return false
            }else{
                util.request(api.SmCode,{phone:this.number,pictureCode:this.imgCode,templateType:"login"},"GET").then(res=>{
                    if(res.api_code=="0"){
                        console.log(res);
                        this.hasget=true;
                        this.timer=null;
                        clearInterval(this.timer);
                        this.timer=setInterval(()=>{
                            console.log(window);
                            if(this.time>0){
                                this.time--
                            }else{
                                console.log("倒计时结束");
                                clearInterval(this.timer);
                                this.timer=null;
                                this.time=60;
                                this.hasget=false;
                                console.log(this.timer);
                            }
                        },1000)
                    }else{
                        this.time=60;
                        this.timer=null;
                        clearInterval(this.timer);
                        util.showErrorToastMessage(res.api_message);
                    }
                })
            }
        },
        login(){
            let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            console.log(this.number,this.messageCode);
            let getEntry=wx.getStorageSync("appEntry");
            if(!myreg.exec(this.number)){
                util.showErrorToastMessage("手机号码不正确");
                return false
            }else if(this.messageCode.length!=4){
                util.showErrorToastMessage("验证码不正确");
                return false
            }else{
                 util.request(api.BindPhone,{phone:this.number,code:this.messageCode}).then(res=>{
                    console.log(res);
                    if(res.api_code=="0" && res.api_message=="处理成功"){
                        util.showErrorToastMessage("绑定成功");
                        console.log("getEntry================"+getEntry);
                        if(getEntry==true){ 
                             // 添加默认的收货地址
                            // util.request(api.AddAddress,{
                            //     receiver:"蓝光锦绣城",
                            //     tel:13228191891,
                            //     province:"四川省",
                            //     city:"成都市",
                            //     county:"成华区",
                            //     address:"和美东路8号蓝光锦绣城",
                            //     defaultStatus:true
                            // }).then(ress=>{
                               
                            // })
                            
                                setTimeout(()=>{
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                },1000)
                        }else{
                            setTimeout(()=>{
                                wx.navigateBack({
                                    delta:1
                                })
                            },1000)
                        }
                    }else{
                        util.showErrorToastMessage(res.api_message)
                    }
                })
            }
        },
        changeImgCode(){
            this.codeImg="";
            console.log(this.number);
            setTimeout(()=>{
                let timestamp = (new Date()).getTime();
                console.log(timestamp); 
                console.log(this.number);
                this.codeImg=api.NewPictureCode+"?phone="+this.number+"&time="+timestamp;
            },500)
            
        }
    },
    destroyed(){
        clearInterval(this.timer);
    },
    onHide(){
        clearInterval(this.timer);
    },
    onUnload:function(){
        clearInterval(this.timer);
    }
}
</script>
<style lang="stylus" scoped>
.bind-phone{
    font-family: PingFangSC-Regular;
    .bind-phone-top{
        width 100%
        height 360rpx
        position relative
        img{
            width 100%
            height 100%
        }
        .phone-content{
            width 100%
            height 800rpx
            background-color #fff
            position absolute
            z-index 9
            top 330rpx
            border-top-left-radius 12rpx
            border-top-right-radius 12rpx
            .phone-content-number{
                width 670rpx
                margin 0 auto
                display flex
                flex-flow row nowrap
                justify-content space-between
                align-items center
                font-size: 28rpx;
                color: #333;
                height 130rpx
                border-bottom 1rpx solid #ddd
                .phone-cell-left{
                    display flex
                    flex-flow row nowrap
                    align-items center
                    height 100%
                    .phone-icon{
                        width 40rpx 
                        height 40rpx
                    }
                    .phone-num{
                        margin-left 30rpx
                    }
                    .pla-class{
                        font-size: 28rpx;
                        color: #AAAAAA;
                    }
                }
                .phone-cell-right{
                    .img-code-class{
                        width 160rpx
                        height 64rpx
                    }
                }
                .text-gre{
                    font-size: 28rpx;
                    color: #43AEC8;
                }
            }
            .login-btn{
                width 690rpx 
                height 84rpx
                background: #43AEC8;
                border-radius: 8rpx;
                text-align center
                line-height 84rpx
                font-size: 36rpx;
                margin 128rpx auto 0 auto
                color: #FFFFFF;
            }
        }
    }
}
</style>


