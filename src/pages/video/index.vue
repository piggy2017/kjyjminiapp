<template>
    <div class="video">
        <video class="my-video" 
        id="myVideo" 
        poster="http://img.tracenet.cn/mini9.jpg"
        autoplay="true"
        :danmu-btn="false" 
        src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" 
        enable-danmu  
        controls>
        </video>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style lang="stylus" scoped>
.video{
    width 100%
    min-height 100vh
    background-color #f2f2f2
    position relative
    .my-video{
        width 700rpx
        height 400rpx
        margin-left 25rpx
        border-radius 8rpx
    }
}
</style>



