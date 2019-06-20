<template>
    <div class="content">
        <div class="wrap">
            <div class="content-list-item" :class="[item.isChecked==true?'has-check':'']"  v-for="(item,index) in contactList" :key="index" :data-id="item.id" :data-child="item.child">
                <div class="name">
                    <span>{{item.userName}}</span>
                    <div class="click-img" :data-id="item.id" @click="choosePerson($event)" :data-che="item.isChecked">
                        <img src="/static/images/preson-unselected.png" alt="" v-if="item.isChecked==false">
                        <img src="/static/images/preson-selected.png" alt="" v-if="item.isChecked==true">
                    </div>
                </div>
                <div class="shengf">
                    <img src="/static/images/id-card.png" alt="">
                    <span>{{item.IDCard}}(身份证号)</span>
                </div>
                <div class="phone-c">
                    <img src="/static/images/phone.png" alt="">
                    <span>{{item.phone}}</span>
                </div>
            </div>
        </div>
        <div class="fix-choose">
            <div class="check-all" @click="checkAllPerson">
                <img src="/static/images/preson-unselected.png" alt="" v-if="checkedAll==false">
                <img src="/static/images/preson-selected.png" alt="" v-if="checkedAll==true">
                <span>{{checkText}}</span>
            </div>
            <div class="btns">
                <div class="add-contact con-btn" @click="goAdd">新增联系人</div>
                <div class="add-check-btn con-btn" @click="choosed">添加选中</div>
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
            contactList:[],
            checkText:"全选",
            checkedAll:false,
            checkIds:[],
            id:"",
            beforeUrl:""
        }
    },
    mounted(){
        let pages = getCurrentPages();
        console.log(pages);
        this.beforeUrl=pages[pages.length - 2].route;
        console.log(this.beforeUrl);
        console.log("mounted--mounted--mounted")
        this.getData();
        //console.log(this.$root.$mp.query);
        if(this.$root.$mp.query.id!="" && this.$root.$mp.query.id!=null && this.$root.$mp.query.id!=undefined){
            this.id=this.$root.$mp.query.id
        }
    },
    onShow:function(){
        wx.removeStorageSync("idlist");
        console.log("onShow")
        this.getData();
        this.checkText="全选";
        this.checkedAll=false;
        this.checkIds=[];
    },
    methods:{
        choosed(){
            console.log(this.checkIds);
            console.log(this.beforeUrl);
            if(this.checkIds.length==0){
                util.showErrorToastMessage("未选择人员");
                return
            }else{
                let postArray=[];
                //let _idString=this.checkIds.join(",");
                console.log(this.checkIds);
                console.log(this.contactList);
                for(let i=0;i<this.contactList.length;i++){
                    if(this.checkIds.includes(this.contactList[i].id)){
                        postArray.push(this.contactList[i]);
                    }
                }
                console.log(postArray);
                wx.setStorageSync("idlist",JSON.stringify(postArray));
                if(this.beforeUrl=="pages/activityorder/main"){
                    wx.navigateBack({
                        delta: 1
                    })
                }
            }
        },
        choosePerson(e){
            console.log(e.mp.currentTarget.dataset.che);
            console.log(e.mp.currentTarget.dataset.id);
            let _list=this.contactList;
            for(let i=0;i<_list.length;i++){
                if(_list[i].id==e.mp.currentTarget.dataset.id){
                    if(e.mp.currentTarget.dataset.che==false) {
                        _list[i].isChecked=true;
                        this.getchecknum();
                    }else{
                        _list[i].isChecked=false;
                        this.getchecknum();
                    }
                }
            }
        },
        getchecknum(){
            this.checkIds=[];
            let _list=this.contactList;
            for(let j=0;j<_list.length;j++){
                if(_list[j].isChecked==true){
                    this.checkIds.push(_list[j].id)
                }
            }
            console.log(this.checkIds);
            if(this.checkIds.length==0){
                this.checkText="全选";
                this.checkedAll=false;
            }else if(this.checkIds.length==this.contactList.length){
                this.checkText="已选中"+this.contactList.length+"个";
                this.checkedAll=true;
            }else{
                this.checkText="已选中"+this.checkIds.length+"个";
                this.checkedAll=false;
            }
        },
        checkAllPerson(){
            this.checkIds=[];
            if(this.checkedAll==false){
                this.checkedAll=true;
                let _list=this.contactList;
                for(let i=0;i<_list.length;i++){
                    _list[i].isChecked=true;
                    this.checkIds.push(_list[i].id);
                }
                this.checkText="已选中"+this.contactList.length+"个";
                console.log(this.checkIds);
            }else{
                this.checkedAll=false;
                let _list=this.contactList;
                for(let i=0;i<_list.length;i++){
                    _list[i].isChecked=false
                }
                this.checkText="全选";
                console.log(this.checkIds);
            }
        },
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
                    let _list=JSON.parse(JSON.stringify(res.api_data));
                    for(let i=0;i<_list.length;i++){
                        _list[i].isChecked=false;
                    }
                    console.log(_list);
                    this.contactList=_list;
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
            })
        }
    },
    onUnload:function(){
        console.log("onUnload------choosecontact------");
        // let pages = getCurrentPages();
        // console.log(pages);
        // let prevPage = pages[pages.length - 2]; //上一个页面
        // console.log(prevPage);
    }
}
</script>
<style lang="stylus" scoped>
.content{
    width 100%;
    min-height 100vh;
    background-color #f2f2f2;
    .wrap{
        padding-top 30rpx
        .content-list-item{
            width 700rpx
            height 246rpx
            background: #FFFFFF;
            box-shadow: 0 10rpx 18rpx 0 rgba(0,0,0,0.05);
            border-radius: 6rpx;
            margin 30rpx auto 0 auto
            .name{
                padding 30rpx 40rpx 0 40rpx
                font-family: PingFangSC-Regular;
                font-size: 36rpx;
                color: #333333;
                display flex
                flex-flow row nowrap
                justify-content space-between
                align-items center
                .click-img{
                    width 36rpx
                    height 36rpx
                    img{
                        width 100%
                        height 100%
                    }
                }
            }
            .shengf{
                padding 30rpx 0 0 40rpx
                display flex
                flex-flow row nowrap
                font-family: PingFangSC-Regular;
                font-size: 28rpx;
                color: #666666;
                align-items center
                img{
                    width 48rpx
                    height 48rpx
                    margin-right 20rpx
                }
            }
            .phone-c{
                display flex
                flex-flow row nowrap
                font-family: PingFangSC-Regular;
                font-size: 28rpx;
                color: #666666;
                align-items center
                padding 20rpx 0 0 40rpx
                img{
                    width 48rpx
                    height 48rpx
                    margin-right 20rpx
                }
            }
        }
        .has-check{
            background: #F4FDFF !important;
            border: 4rpx solid #FFFFFF !important;
            box-shadow: 0 10rpx 16rpx 0 rgba(0,0,0,0.04) !important;
        }
    }
    .fix-choose{
        width 690rpx
        padding 0 30rpx
        height 100rpx
        background: #FFFFFF;
        border-top: 1rpx solid #DDDDDD;
        position fixed
        z-index 99
        bottom 0
        display flex
        flex-flow row nowrap
        justify-content space-between
        align-items center
        .check-all{
            font-size: 28rpx;
            color: #666666;
            display flex
            flex-flow row nowrap
            align-items center
            height 100%
            img{
                width 36rpx
                height 36rpx
                margin-right 10rpx
            }
        }
        .btns{
            display flex
            flex-flow row nowrap
            height 100%
            align-items center
            .con-btn{
                width 190rpx
                height 60rpx
                line-height 60rpx
                box-sizing border-box
                border-radius: 4rpx;
                font-size: 28rpx;
                text-align center
            }
            .add-contact{
                border: 2rpx solid #43AEC8;
                color: #43AEC8;
                margin-right 20rpx
            }
            .add-check-btn{
                background: #43AEC8;
                color: #FFFFFF;
            }
        }
    }
}
</style>


