<template>
    <div class="content">
        <div class="content-wrap">
            <div class="name border">
                <div>姓名</div>
                <input type="text" v-model="name" placeholder="请输入您的姓名" placeholder-class="my-class">
            </div>
            <div class="name border">
                <div>身份证</div>
                <input type="idcard" v-model="idCode" placeholder="请输入您的身份证" placeholder-class="my-class">
            </div>
            <div class="name">
                <div>手机号</div>
                <input type="number" v-model="phonenumber" placeholder="请输入您的手机号" placeholder-class="my-class">
            </div>
        </div>
        <div class="add-btn" @click="addBtn">保存</div>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
    data(){
        return{
            name:"",
            idCode:"",
            phonenumber:""
        }
    },
    onShow:function(){
        this.name="";
        this.idCode="";
        this.phonenumber="";
    },
    methods:{
        addBtn(){
             let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
             if(!myreg.exec(this.phonenumber)){
                util.showErrorToastMessage("手机号码不正确")
                return false
            }else if(this.name.length==0){
                util.showErrorToastMessage("姓名不能为空")
                return false
            }else if(this.idCode.length!=18){
                util.showErrorToastMessage("身份证号码不正确")
                return false
            }else{
                util.request(api.AddUsualUser,{userName:this.name,phone:this.phonenumber,IDcard:this.idCode,type:0}).then(res=>{
                    console.log(res);
                    if(res.api_code=="0"){
                        util.showErrorToastMessage("添加成功")
                        setTimeout(function(){
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
    width 100%
    min-height 100vh
    background-color #f2f2f2
    font-family: PingFangSC-Regular;
    .content-wrap{
        padding-top 20rpx
        .name{
            width 690rpx
            height 100rpx
            padding 0 30rpx
            background-color #fff
            font-size: 30rpx;
            color: #666666;
            display flex
            flex-flow row nowrap
            align-items center
            div{
                width 200rpx
            }
        }
        .border{
            position relative
        }
        .border::after{
            content ""
            position absolute
            z-index 9
            bottom 1rpx
            height 1rpx
            left 30rpx
            right 30rpx
            background-color #ddd
        }
    }
}
.my-class{
    color #999
}
.add-btn{
    background: #43AEC8;
    width 100%
    height 90rpx
    line-height 90rpx
    text-align center
    font-family: PingFangSC-Medium;
    font-size: 32rpx;
    color: #FFFFFF
    position fixed
    z-index 99
    bottom 0
}
</style>


