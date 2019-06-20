<template>
    <div class="message">
        <div class="no-massage" v-if="messageResult.length==0">
            <img src="/static/images/no-message.png" alt="">
            <p>没有消息</p>
        </div>
        <div v-else>
            <div v-for="(item,index) in messageResult" :key="index" :data-id="item.id" class="message-content">
                <div class="content-time">{{item.createDate}}</div>
                    <div class="content">
                        <div class="content-title">
                            <!-- <label class="noRead" v-if="item.showRead==false">.</label> -->
                            {{item.title}}
                        </div>
                    <div class="content-notice">{{item.msg}}</div>
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
            messageResult:[],
            page:1,
            currentPage:1,
            totalPages:1,
            size:10,
        }
    },
    onShow:function(){
        console.log("onshow")
        this.message();
    },
    mounted(){ 
        this.message();
    },
    methods:{
        message(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.MessageInfo,{curPage:this.currentPage,pageSize:this.size},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                   this.messageResult=res.api_data;
                   this.currentPage=res.api_page.curPage;
                   this.totalPages=res.api_page.totalPages;
                }
                wx.hideLoading();
            })
        }
    },
     // 下拉刷新
  onPullDownRefresh: function () {
    this.message();
    wx.stopPullDownRefresh();
  },
   // 上拉加载更多
    onReachBottom: function () {
        if (this.currentPage < this.totalPages) {
            // 显示加载图标  
            wx.showLoading({
                title: '加载中...',
                icon: 'loading'
            })
            var nextPage = this.currentPage+1*1;
            util.request(api.MessageInfo,{curPage:nextPage,pageSize:this.size},"GET").then(res=>{
                if(res.api_code=="0"){
                   var result=res.api_data;
                   this.messageResult=this.messageResult.concat(result);
                   this.currentPage=res.api_page.curPage;
                   this.totalPages=res.api_page.totalPages;
                }
                  wx.hideLoading();
            })
        } else {
            return
        }
    }, 
}
</script>
<style lang="stylus" scoped>
.message{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    padding-bottom 20rpx
}
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
.message-content{
   padding-top 20rpx
}
.content-time{
    text-align center
    font-size 24rpx
    background: #B8B8B8
    border-radius: 4px
    width 160rpx
    height 52rpx
    line-height 52rpx
    color #FFFFFF
    margin 0 auto
}
.content{
    margin 20rpx auto 
    background: white 
    width 94%
    border-radius: 4px

}
.content-title{
    padding 24rpx 24rpx 16rpx 24rpx
    font-size 32rpx 
    color #333333
    font-weight 500
}
.content-notice{
   font-size 28rpx
   color: #666666
    width 642rpx
    padding 0 24rpx 24rpx 24rpx
    
}
.noRead{
     color #DC143C
}

</style>


