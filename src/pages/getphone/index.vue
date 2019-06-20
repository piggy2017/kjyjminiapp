<template>
    <div class="content">
        <div class="content-img">
            <img src="/static/images/get-phone-image.png" alt="">
        </div>
        <p class="con-p">绑定手机号，随时带你</p>
        <p class="con-p">发现更多的实惠</p>
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="phone-btn">获取并绑定手机号</button>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
    data(){
        return{

        }
    },
    methods:{
        getPhoneNumber(e){
            console.log(e);
            if (e.mp.detail.errMsg == "getPhoneNumber:ok"){
                util.request(api.Decodephone,{encryptedData:e.mp.detail.encryptedData,iv:e.mp.detail.iv}).then(res=>{
                    console.log(res);
                    if(res.api_code=="0"){
                        util.showErrorToastMessage("绑定成功");
                        setTimeout(()=>{
                            wx.navigateBack({
                                delta: 1
                            })
                        },1000)
                    }
                })
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.content{
    width 100%;
    min-height 100vh;
    background-color #f2f2f2;
    font-family: PingFangSC-Regular;
    .content-img{
        text-align center
        img{
            margin 124rpx auto 60rpx auto
            width 540rpx
            height 472rpx
        }
    }
    .con-p{
        font-size: 32rpx;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        line-height: 48rpx;
    }
    .phone-btn{
        font-family: PingFangSC-Regular;
        font-size: 32rpx;
        color: #FFFFFF;
        background: #43AEC8;
        border-radius: 42rpx;
        text-align center
        width 530rpx
        height 84rpx
        margin 80rpx auto
    }
}
</style>

