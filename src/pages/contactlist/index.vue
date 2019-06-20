<template>
    <div class="contact-list">
        <contact :lists="contactList"></contact>  
        <div class="add-more" @click="goAdd">新增</div>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
import contact from "@/components/contactlist"
export default {
    components:{
        contact
    },
    data(){
        return{
            contactList:[]
        }
    },
    onShow() {
        this.getData();
    },
    mounted() {
        this.getData();
    },
    methods:{
        goAdd(){
            wx.navigateTo({
                url:"../addcontact/main"
            })
        },
        getData(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.UsualUser,{type:0},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.contactList=res.api_data
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.contact-list{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    .add-more{
        width 100%
        height 90rpx
        position fixed
        z-index 9
        bottom 0
        background: #43AEC8;
        font-family: PingFangSC-Medium;
        font-size: 32rpx;
        text-align center
        line-height 90rpx
        color: #FFFFFF;
    }
}
</style>


