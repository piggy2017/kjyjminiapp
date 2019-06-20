<template>
    <div class="content">
        <div class="img-top">
            <img src="http://img.tracenet.cn/father2.png" alt="">
        </div>
        <div class="test-div" :style="{bottom:adbottom+'rpx'}" @click="goTest">
            <img src="/static/images/test-btn.png" alt="">
        </div>
        <div class="img-bottom">
            <img src="http://img.tracenet.cn/father1.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            adbottom:130
        }
    },
    onShow(){
        this.sysInfo();
    },
    methods:{
        sysInfo (){
            let _self=this;
            wx.getSystemInfo({
                success:function(res){
                    console.log(res);
                    if(res.screenHeight>760){
                        _self.adbottom=240;
                    }else{
                        _self.adbottom=130;
                    }
                }
            })
        },
        goTest(){
            wx.navigateTo({
                url:"../test/main"
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.content{
    width 100%
    min-height 100vh
    background-image url("http://img.tracenet.cn/father4.jpg")
    background-position center center
    background-repeat no-repeat
    background-size cover
    position relative
    .test-div{
        width 324rpx
        height 118rpx
        left 213rpx
        position absolute
        z-index 999
        img{
            width 100%
            height 100%
        }
    }
    .img-top{
        width 700rpx
        height 288rpx
        margin 0 auto
        img{
            width 100%
            height 100%
        }
    }
    .img-bottom{
        position absolute
        bottom 0
        z-index 99
        width 750rpx
        height 206rpx
        img{
            width 100%
            height 100%
        }
    }
}
</style>

