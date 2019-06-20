<template>
    <div class="activity">
        <div class="parse-data">
                    <wxParse :content="article"  noData="" />
        </div>
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
import wxParse from 'mpvue-wxparse'
export default {
    components: {
        wxParse
    },
    data(){
        return{
            article:"",
        }
    },
     mounted(){ 
        this.getDetail();
    },
    methods:{
        getDetail(){
            wx.showLoading({
                title: "加载中...",
                icon: "loading"
            });
            util.request(api.ActivityPreview,{},"GET").then(res=>{
                console.log(res);
                if(res.api_code=="0"){
                    this.article=res.api_data
                }
            })
        },
    }
}
</script>
<style lang="stylus" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.activity{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    position relative
    font-family: PingFangSC-Regular;
    font-size 20rpx
}
.parse-data{
     background-color white
     padding 0rpx 20rpx
}
</style>


