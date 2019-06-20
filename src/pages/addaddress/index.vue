<template>
    <div class="content">
            <form class="add-address-form">
        <view class="form-cell">
            <view class="form-cell-label">姓名:</view>
            <view class="form-cell-input">
                <input v-model="name" placeholder-class="pla-class" class="weui-input" name="name" placeholder='请输入'/>
            </view>
        </view>
         <!-- 手机号码 -->
      
        <view class="form-cell">
            <view class="form-cell-label">手机号:</view>
            <view class="form-cell-input">
            <input v-model="phone" type="number" placeholder-class="pla-class" class="weui-input" name="phone" placeholder='请输入'/>
            </view>
        </view>
          <!-- 选择地区 -->
        <view class="form-cell">
            <view class="form-cell-label">所在地区:</view>
            <view class="form-cell-input">
            <picker @change="bindAreaChange($event)" mode="region" v-model="addressArea" >
                <view class="color-09">{{addressArea}}</view>
                </picker>
            </view>
        </view>
            <!-- 街道地址 -->
        <view class="form-cell-text">
            <view class="form-cell-label">详细地址:</view>
            <view class=" form-cell-input-text">
                <textarea  v-model="Address" class="address-textarea" placeholder="这里输入详细地址"  placeholder-class="pla-class"></textarea>
            </view>
        </view>
    </form>
    <view class="save-address" @click='saveAddress'>保存</view>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
    data(){
        return{
            addressList: [],
            addressArea:"请选择地区",
            name:"",
            phone:'',
            Address:"",
            id:"",
            provinceName:"",
            cityName:"",
            countyName:"",
            AddressLength:0,
            page:"",
            editIsDefault:false
        }
    },
    mounted(){
        console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.addressid!="" && this.$root.$mp.query.addressid!=null && this.$root.$mp.query.addressid!=undefined){
            this.id=this.$root.$mp.query.addressid;
            this.addressArea=this.$root.$mp.query.provinceName+this.$root.$mp.query.cityName+this.$root.$mp.query.countyName;
            this.cityName=this.$root.$mp.query.cityName;
            this.provinceName=this.$root.$mp.query.provinceName;
            this.countyName=this.$root.$mp.query.countyName;
            this.Address=this.$root.$mp.query.detail;
            this.name=this.$root.$mp.query.receiveName;
            this.phone=this.$root.$mp.query.tel;
            this.editIsDefault=this.$root.$mp.query.defaultStatus;
        }
    },
    methods:{
        bindAreaChange(e){
            console.log(e);
            this.addressArea=e.mp.detail.value[0]+e.mp.detail.value[1]+e.mp.detail.value[2];
            this.provinceName=e.mp.detail.value[0];
            this.cityName=e.mp.detail.value[1];
            this.countyName= e.mp.detail.value[2];
            console.log(this.addressArea);
        },
        getList(){
            util.request(api.Getaddress,{curPage:this.curPage,pageSize:this.pageSize},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.AddressLength=res.api_data.length;
                }
                wx.hideLoading();
            })
        },
        saveAddress(){
            if (this.name == "") {
                util.showErrorToastMessage("请输入姓名");
                return
            } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                util.showErrorToastMessage("手机号码不正确");
                return
            } else if (this.addressArea == "请选择地区") {
                util.showErrorToastMessage("手机号码不正确");
                return
            } else if (this.Address == "") {
                util.showErrorToastMessage("请输入详细地址");
                return
            } else{
                let isDefault=true;
                if(this.AddressLength==0){
                    isDefault=true;
                }else{
                    isDefault=false;
                }
                if(this.id==""){ // 新增地址
                    util.request(api.AddAddress,
                        {
                            receiver:this.name,
                            tel:this.phone,
                            province:this.provinceName,
                            city:this.cityName,
                            county:this.countyName,
                            address:this.Address,
                            defaultStatus:isDefault
                        }).then(res=>{
                            console.log(res);
                            if(res.api_code=="0"){
                                util.showErrorToastMessage("添加成功");
                                if(res.api_data.defaultStatus==true){  // 是默认地址
                                    wx.setStorageSync('addressId', res.api_data.id);
                                    setTimeout(()=>{
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    },1000)
                                }
                            }else{
                                util.showErrorToastMessage(res.api_message);
                            }
                        })
                }else{ // 修改地址
                    util.request(api.EditAddress,
                        {
                            id:this.id,
                            receiver:this.name,
                            tel:this.phone,
                            province:this.provinceName,
                            city:this.cityName,
                            county:this.countyName,
                            address:this.Address,
                            defaultStatus:this.editIsDefault
                        }
                    ).then(res=>{
                        console.log(res);
                        if(res.api_code=="0"){
                            util.showErrorToastMessage("修改成功");
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
}
</script>
<style lang="stylus" scoped>
.content{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    padding-top 20rpx
}

.address-add{
  width: 100%;
  background-color: #fff;
   margin-top: 20rpx;
}
.add-address-form{
  width: 100%;
  background-color: #fff;
}
.form-cell{
    background-color: #fff;
    height: 106rpx;
    display: flex;
    flex-flow: row nowrap;
    padding:0 30rpx;
    /* line-height: 106rpx; */
    align-items: center;
    position: relative;
}
.lianxi-ren{
    position: absolute;
    z-index: 99;
    width: 46rpx;
    height: 44rpx;
    right: 36rpx;
}
.lianxi-ren image{
    width: 100%;
    height: 100%;
}
.form-cell::after{
    position: absolute;
    z-index: 99;
    right: 0;
    bottom: 1rpx;
    height: 1rpx;
    background-color: #ddd;
    left: 30rpx;
    content: "";
}
.form-cell-label{
    width: 210rpx;
    font-family: PingFangSC-Regular;
    font-size: 30rpx;
    color: #666666;
    
}
textarea {
    width: 400rpx !important;
}
.form-cell-input,.weui-input{
    font-family: PingFangSC-Regular;
    font-size: 30rpx;
    color: #AAAAAA !important;
}
.form-cell-text{
    height: 172rpx !important;
    display: flex;
    flex-flow: row nowrap;
    padding:30rpx 30rpx 0 30rpx;
    background-color #fff
}
.address-textarea{
    font-family: PingFangSC-Regular;
    font-size: 30rpx;
    color: #AAAAAA !important;
    height: 150rpx;
}
.save-address{
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    color: #fff;
    font-family: PingFangSC-Medium;
    font-size: 32rpx;
    position: fixed;
    z-index: 99;
    bottom: 0;
    background: #43AEC8;
}
</style>


