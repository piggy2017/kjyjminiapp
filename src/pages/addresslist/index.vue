<template>
    <div class="content">
        <div class="no-massage" v-if="list.length==0">
            <img src="/static/images/address-non.png" alt="">
            <p>暂无收货地址</p>
        </div>
        <div class="btn-area" v-else>
            <view class="address-item" v-for="(item,index) in list" :key="index">
                <view class="address-item-title">
                    <text class="address-item-title-name">{{item.receiver}}</text>
                    <text>{{item.receiverTel}}</text>
                </view>
                <view class="address-item-detail">
                    {{item.province}}{{item.city}}{{item.county}}{{item.address}}
                </view>
                <view class="address-item-bottom">
                    <view class="address-item-bottom-left" @click='setDefault(item.id,index)'>
                        <img v-if="item.defaultStatus==true" src="/static/images/address-moren.png"/>
                        <img v-else src="/static/images/address-nol.png"/>
                        <!-- <img v-if="choose==index" src="/static/images/address-moren.png"/>
                        <img v-else src="/static/images/address-nol.png"/> -->
                        <text>设为默认</text>
                    </view>
                    
                    <view class="address-item-bottom-right">
                        <!-- <navigator url="../addAddress/addAddress?provinceName={{item.provinceName}}&detail={{item.detailInfo}}&receiveName={{item.userName}}
                        &tel={{item.telNumber}}&addressid={{item.id}}&cityName={{item.cityName}}&countyName={{item.countyName}}">
                            
                        </navigator> -->
                        <img src="/static/images/edit.png" class="edit-image" @click="goEdit(item)"/>
                        <img src="/static/images/delete.png" class="delete-image" @click='deleteAddress(item.id)'/>
                    </view>
                </view>
            </view>
        </div>
        <div class="add-btn" @click="goAdd">新增</div>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
    data(){
        return{
            curPage:1,
            totalPages:1,
            pageSize:10,
            list:[],
            choose:0
        }
    },
    mounted(){
        this.getData();
    },
    onShow:function(){
        this.getData();
    },
    methods:{
        getData(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.Getaddress,{curPage:this.curPage,pageSize:this.pageSize},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.curPage=res.api_page.curPage;
                    this.totalPages=res.api_page.totalPages;
                    this.list=res.api_data;
                    for (let i = 0; i < this.list.length;i++){
                        if (this.list[i].defaultStatus==true){
                            console.log(i);
                            this.choose=i;
                        }
                    }
                }
                wx.hideLoading();
            })
        },
        goAdd(){
            wx.navigateTo({
                url:"../addaddress/main"
            })
        },
        setDefault(id){
            console.log(id);
            let _id=id;
            wx.showLoading({
                title: '设置中...',
            });
            util.request(api.EditAddress, { id: _id,defaultStatus:true }).then(res=>{
                console.log(res);
                if (res.api_code == "0"){
                    wx.setStorageSync('addressId', _id);
                    let _list=this.list;
                    for(let i=0;i<_list.length;i++){
                        if(_list[i].id==_id){
                            _list[i].defaultStatus=true;
                        }else{
                            _list[i].defaultStatus=false;
                        }
                    }
                    this.list=_list;
                    console.log(this.list);
                    util.showErrorToastMessage("设置成功");
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
                wx.hideLoading();
            });
        },
        deleteAddress(id){
            let _id=id;
            wx.showLoading({
                title: '加载中...',
            });
            let defaultId = wx.getStorageSync('addressId');
            util.request(api.DelelteAddress, { addressId: _id }).then( res=>{
                console.log(res);
                if (res.api_code == "0"){
                    util.showErrorToastMessage("删除成功");
                    var newList = [];
                    for (var i = 0; i < this.list.length; i++) {
                        if (this.list[i].id != _id) {
                            newList.push(this.list[i])
                        }
                    }
                    console.log(newList);
                    this.list=newList;
                    if (defaultId==_id){
                        wx.removeStorageSync('addressId');
                    }
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
                wx.hideLoading();
            });
        },
        goEdit(_obj){
            console.log(_obj);
            wx.navigateTo({
                url:"../addaddress/main?provinceName="+_obj.province+"&detail="+_obj.address+"&receiveName="
                +_obj.receiver+"&tel="+_obj.receiverTel+"&addressid="+_obj.id+"&cityName="+_obj.city+"&countyName="+_obj.county+"&defaultStatus="+_obj.defaultStatus
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
.content{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    padding-top 20rpx
    .no-massage{
        width 100%
        display flex
        flex-flow column nowrap
        align-items center
        font-size:28rpx;
        color:#87c6d6;
        img{
            width 230rpx
            height 220rpx
            margin-bottom:28rpx;
            margin-top:360rpx;
        }
    }
    .add-btn{
        position fixed
        z-index 99
        width 100%
        height 90rpx
        line-height 90rpx
        background: #43AEC8;
        font-family: PingFangSC-Medium;
        font-size: 32rpx;
        color: #FFFFFF;
        text-align center
        bottom 0
    }
}
.address-item{
    background: #FFFFFF;
    box-shadow: 0 12px 28px 0 rgba(0,0,0,0.07);
    border-radius: 12px;
    width: 700rpx;
    /* height: 284rpx; */
    margin: 20rpx auto 0 auto;
}
.address-item-title{
    font-size: 36rpx;
    color: #333333;
    padding: 36rpx 0 0 36rpx;
    margin-bottom: 16rpx;
    font-weight: bold;
}
.address-item-title-name{
    margin-right: 30rpx;
}
.address-item-detail{
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #666666;
    padding: 0 36rpx;
    position: relative;
    min-height: 50rpx;
    padding-bottom: 8rpx;
}
/* .address-item-detail::after{

} */
.address-item-bottom{
    padding: 0 36rpx;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    position: relative;
}
.address-item-bottom::before{
    position: absolute;
    content: "";
    z-index: 99;
    height: 1rpx;
    background-color: #ddd;
    left: 36rpx;
    right: 36rpx;
    top:2rpx;
}
.address-item-bottom-left{
    display: flex;
    flex-flow: row nowrap;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #333333;
    height: 100%;
    align-items: center;
}
.address-item-bottom-left image{
    width: 28rpx;
    height: 28rpx;
    margin-right: 10rpx;
}
.address-item-bottom-right{
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    align-items: center;
     position: relative;
}
.address-item-bottom-right .navigator-hover{
    width: 40rpx;
}
.address-item-bottom-right image{
    width: 36rpx;
    height: 36rpx;
    position: relative;
}
.edit-image{
    /* margin-right: 60rpx; */
    display: block;
}
.address-item-bottom-right::after{
    position: absolute;
    z-index: 99;
    width: 1rpx;
    background-color: #ddd;
    top: 24rpx;
    bottom: 24rpx;
    right: 66rpx;
    content: "";
}
.delete-image{
    margin-left: 60rpx;
}
.btn-area{
    padding-bottom: 140rpx;
}
</style>

