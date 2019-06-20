<template>
    <div class="content">
        <swiper class="banner" circular="true" indicator-dots="true" autoplay="true" indicator-active-color="#fff" interval="3000" duration="1000">
          <swiper-item class="index-swiper-item" v-for="(item,index) in banner" :key="index">
            <image :src="item.picture" background-size="cover"></image>
          </swiper-item>
       </swiper>
       <div class="data-list">
           <div class="dance-item" v-for="(item,index) in danceList" :key="index">
               <div class="item-img" @click="goDetail(item.id,item.video)">
                   <img :src="item.cover" alt="">
                   <div class="dance-name" v-if="item.name">{{item.name}}</div>
                   <div class="dance-play">
                       <img src="/static/images/play.png" alt="">
                   </div>
               </div>
                <div class="item-detail">
                    <div class="item-name">
                        <p class="name">{{item.team}}</p>
                        <p class="introduction">{{item.introduction}}</p>
                    </div>
                    <div class="item-right">
                        <div class="zan" @click="like(item.id)">
                            <img src="/static/images/list-zan.png" alt="" v-if="item.userlike==false">
                            <img src="/static/images/leke-press.png" alt="" v-if="item.userlike==true">
                            <p>点赞</p>
                        </div>
                        <div class="share" >
                            <button open-type="share" class="share-btn" :data-ids="item.id">
                                <img src="/static/images/list-wxchart.png" alt="">
                            </button>
                            
                            <p>分享</p>
                        </div>
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
            banner:[],
            danceList:[],
            pageSize:5,
            curPage:1,
            totalPages:1
        }
    },
    onShow:function(){
        this.curPage=1;
        this.totalPages=1;
        this.getData();
    },
    onLoad(){
        Object.assign(this, this.$options.data());
        this.getData();
    },
    methods:{
        // async asyncRequest(url, data = {}, method = "POST", header = "application/x-www-form-urlencoded"){
        //     try{
        //         let response =await util.getInfo(url,data,method , header);
        //         console.log(response);
        //         this.banner=response.api_data
        //         //await  request(url, data, method, header)
        //     }catch(e){
        //         console.error(e);
        //     }
        // },
        getData(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            //this.asyncRequest(api.DanceBanner,{},"GET");
            util.asyncRequest(api.DanceBanner,{},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.banner=res.api_data
                }
                wx.hideLoading();
            }).catch(e=>{
                console.log(e);
            })
            util.request(api.DanceList,{pageSize:this.pageSize, curPage:this.curPage},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.danceList=res.api_data;
                    this.curPage=res.api_page.curPage;
                    this.totalPages=res.api_page.totalPages;
                }
                wx.hideLoading();
            })
        },
        like(_id){
            util.request(api.DanceLike,{activityDanceId:_id},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    console.log("点赞成功");
                    let _list=this.danceList;
                    for(let i=0;i<_list.length;i++){
                        if(_list[i].id==_id){
                            _list[i].userlike=true;
                        }
                    }
                    this.danceList=_list;
                }else{
                    util.showErrorToastMessage(res.api_message);
                }
            })
        },
        goDetail(id,video){
            wx.setStorageSync("videoAddress",video);
            wx.navigateTo({
                url:"../dancedetail/main?id="+id
            })
        }
    },
    onShareAppMessage: function (res) {
        console.log(res);
        if (res.from === 'button') {
            console.log(res.target.dataset.ids)
            return {
                title: "好东西与您分享！",
                path: "/pages/dancedetail/main?id="+res.target.dataset.ids
           }
    //  分享功能
        } else {
            return {
                title: "好东西与您分享！",
                path: "/pages/dance/main"
           }
        }
    },
       // 下拉刷新
  onPullDownRefresh: function () {
    this.curPage=1;
    this.totalPages=1;
    this.getData();
    wx.stopPullDownRefresh();
  },
  // 上拉加载更多
    onReachBottom: function () {
        if (this.curPage < this.totalPages) {
            // 显示加载图标  
            wx.showLoading({
                title: '加载中...',
                icon: 'loading'
            })
            let nextPage = this.curPage+1*1;
            util.request(api.DanceList, {pageSize:this.pageSize, curPage:nextPage},"GET").then(res=> {
                console.log(res);
                if(res.api_code=="0"){
                    this.danceList=this.danceList.concat(res.api_data);
                    this.curPage=res.api_page.curPage;
                    this.totalPages=res.api_page.totalPages;
                }
                wx.hideLoading();
            });
        } else {
            return
        }
    }
}
</script>
<style lang="stylus" scoped>
.banner{
    height: 400rpx;
    width: 750rpx;
    overflow: hidden;
    .index-swiper-item{
        overflow: hidden;
        image{
            width: 100%;
            height: 100%;
        }
    }
}
.dance-item{
    width 700rpx
    margin 40rpx auto 0 auto
    .item-img{
        width 100%
        height 350rpx
        border-radius 12rpx
        position relative
        img{
            width 100%
            height 350rpx
            border-radius 12rpx
        }
        .dance-name{
            position absolute
            z-index 9
            background-color rgba(0,0,0,0.5)
            color #ffffff
            font-family: PingFangSC-Medium;
            font-size: 24rpx;
            padding 10rpx 20rpx
            border-top-left-radius 12rpx
            border-bottom-right-radius 12rpx
            top 0
            left 0
        }
        .dance-play{
            position absolute
            z-index 9
            top 127rpx
            left 302rpx
            width 96rpx
            height 96rpx
            img{
                width 100%
                height 100%
            }
        }
    }
    .item-detail{
        display flex
        flex-flow row nowrap
        align-items center
        justify-content space-between
        margin-top 20rpx
        .item-name{
            font-family: PingFangSC-Regular;
            font-size: 24rpx;
            color: #AAAAAA;
            width 480rpx
            .name{
                font-family: PingFangSC-Medium;
                font-size: 32rpx;
                color: #333333;
                margin-bottom 14rpx
            }
            .introduction{
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:1;
                -webkit-box-orient:vertical !important;
                overflow:hidden;
            }
        }
        .item-right{
            display flex
            flex-flow row nowrap
            align-items center
            justify-content space-between
            .zan{
                display flex
                flex-flow column nowrap
                align-items center
                padding-right 30rpx
                position relative
                img{
                    width 36rpx
                    height 32rpx
                    margin-bottom 10rpx
                }
                p{
                    font-family: PingFangSC-Regular;
                    font-size: 24rpx;
                    color: #AAAAAA;
                }
            }
            .zan::after{
                position absolute
                z-index 9
                content ""
                top 10rpx
                bottom 10rpx
                right 1rpx
                width 2rpx
                background-color #ddd
            }
            .share{
                display flex
                flex-flow column nowrap
                background #fff
                align-items center
                padding-left 30rpx
                .share-btn{
                    background #fff
                    width 48rpx
                    height 40rpx
                    padding 0
                    line-height:1;
                    margin-bottom 6rpx
                    img{
                        width 48rpx
                        height 40rpx
                        margin-bottom 10rpx
                    }
                }
                .share-btn::after{
                    border none
                }
                
                p{
                    font-family: PingFangSC-Regular;
                    font-size: 24rpx;
                    color: #AAAAAA;
                }
            }
        }
    }
}
</style>


