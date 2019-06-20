<template>
    <div class="content-list">
        <div class="content-list-item" v-for="(item,index) in lists" :key="index" :data-id="item.id">
            <div class="name">{{item.userName}}</div>
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
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        lists:{
            type:Array
        }
    },
    created(){
        console.log("created");
        console.log(this.lists)
        //this.init();
    }
}
</script>

<style lang="stylus" scoped>
.content-list{
    width: 100%
    padding-top 30rpx
    .content-list-item{
        width 700rpx
        height 246rpx
        background: #FFFFFF;
        box-shadow: 0 10rpx 18rpx 0 rgba(0,0,0,0.05);
        border-radius: 6rpx;
        margin 30rpx auto 0 auto
        .name{
            padding 30rpx 0 0 40rpx
            font-family: PingFangSC-Regular;
            font-size: 36rpx;
            color: #333333;
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
}
</style>