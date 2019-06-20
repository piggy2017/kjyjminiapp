<template>
    <div class="wraper">
        <canvas v-bind:style="{ width: canvasWidth+ 'px', height: canvasHeight + 'px' }" canvas-id='myCanvas'></canvas>
        <cover-view class="cover-wraper" :style="{bottom:btnBottom+'rpx'}">
            <cover-view class="cover-top">
                <cover-image src="/static/images/againbutton.png" alt="" @click="testAgain"></cover-image>
                <cover-image src="/static/images/savebutton.png" alt="" class="mar-left-10" @click="save"></cover-image>
            </cover-view>
            <cover-view class="cover-share">
                <button open-type="share">
                    <cover-image src="/static/images/testsharebutton.png" alt=""></cover-image>
                </button>
                
            </cover-view>
        </cover-view>
        
    </div>
</template>
<script>
import util from "@/utils/util";
import api from "@/utils/api";
export default {
    data(){
        return{
            canvasWidth:0,
            canvasHeight:0,
            canvasimgbg:"",
            atarimg:"",
            avatarUrl:"",
            nickName:"",
            tempFilePath:"",
            number:0,
            btnBottom:250
        }
    },
    onShow(){
        let token=wx.getStorageSync('token');
        console.log(token);
        let userInfo = wx.getStorageSync('userInfo');
        console.log(userInfo);
        if(!token || !userInfo){
            let paramsUrl = util.getCurrentPageUrlWithArgs();
            console.log(paramsUrl);
            wx.setStorageSync('navUrl', paramsUrl);
            wx.redirectTo({
                url: '/pages/auth/main'
            })
        }else{
            //this.getImg(userInfo.avatarUrl);
            this.avatarUrl=userInfo.avatarUrl;
            this.nickName="||| "+userInfo.nickName+" |||"
        }
        this.sysInfo();
    },
    mounted(){
        console.log(this.$root.$mp.query.id);
        this.number=this.$root.$mp.query.id;
        if(this.number==0){
            this.createdCode("https://xcx.kangjiayiju.com/mall/img/father-result1.jpg");
        }else{
            this.createdCode("https://xcx.kangjiayiju.com/mall/img/father-result"+this.number+".jpg");
        }
    },
    methods:{
        sysInfo (){
            let _self=this;
            wx.getSystemInfo({
                success:function(res){
                    console.log(res);
                    _self.canvasWidth=res.screenWidth;
                    _self.canvasHeight=res.screenHeight;
                    if(res.screenHeight>800){
                        _self.btnBottom=350
                    }else{
                        _self.btnBottom=250
                    }
                }
            })
        },
        getImg(_src){
            let that=this;
            wx.getImageInfo({
                src:_src,
                success:res=>{
                    console.log(res);
                    that.avatarUrl=res.path;
                }
            })
        },
        createdCode(_src){
            wx.getImageInfo({
                src:_src,
                success:res=>{
                    console.log(res);
                    this.canvasimgbg=res.path;
                    wx.getImageInfo({
                        src:this.avatarUrl,
                        success:result=>{
                            this.atarimg=result.path;
                        
                            const canvas = wx.createCanvasContext('myCanvas');    //绘图上下文
                            canvas.drawImage(this.canvasimgbg, 0, 0, this.canvasWidth, this.canvasHeight);
                            canvas.setTextAlign('center')    // 文字居中
                            canvas.setFillStyle('#D86047')  // 文字颜色：黑色
                            
                            if(this.canvasWidth<340){
                                canvas.setFontSize(14)         // 文字字号
                                canvas.fillText(this.nickName, this.canvasWidth/2, 105);
                            }else{
                                canvas.setFontSize(16)         
                                canvas.fillText(this.nickName, this.canvasWidth/2, 120);
                            }
                            canvas.arc(this.canvasWidth/2, 60, 33, 0, 2 * Math.PI);  // 绘制园
                            canvas.clip();
                            canvas.drawImage(this.atarimg, (this.canvasWidth/2)-33, 27, 66, 66);
                            canvas.restore();
                            let _self=this;
                            canvas.draw(true,function(){
                                wx.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: _self.canvasWidth,
                                    height:  _self.canvasHeight-60,
                                    // destWidth: _self.canvasWidth,
                                    // destHeight:  _self.canvasHeight,
                                    canvasId:"myCanvas",
                                    success:function(res){
                                        console.log(res);
                                        _self.tempFilePath=res.tempFilePath;
                                    }
                                })
                            });
                            }
                    })
                }
            })
        },
        save(){
            //console.log(this.tempFilePath);
            let _tempFilePath=this.tempFilePath;
            if (!wx.saveImageToPhotosAlbum) {
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                })
                return;
            }
            // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope  
            wx.getSetting({
                success(res) {
                    console.log("getSetting: success");
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        console.log("1-没有授权《保存图片》权限");

                        // 接口调用询问  
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success() {
                                console.log("2-授权《保存图片》权限成功");
                                //util.downloadImage(downloadUrl);
                                wx.saveImageToPhotosAlbum({
                                    filePath: _tempFilePath,
                                    success(res) {
                                        console.log("保存图片：success");
                                        console.log(res);
                                        wx.showToast({
                                            title: '保存成功',
                                        });
                                    },
                                    fail(res) {
                                        console.log("保存图片：fail");
                                        console.log(res);
                                    }
                                })
                            },
                            fail() {
                                // 用户拒绝了授权  
                                console.log("2-授权《保存图片》权限失败");
                                // 打开设置页面  
                                wx.openSetting({
                                    success: function (data) {
                                        console.log("openSetting: success");
                                    },
                                    fail: function (data) {
                                        console.log("openSetting: fail");
                                    }
                                });
                            }
                        })
                    } else {
                        console.log("1-已经授权《保存图片》权限");
                        //util.downloadImage(downloadUrl)
                        wx.saveImageToPhotosAlbum({
                            filePath: _tempFilePath,
                            success(res) {
                                console.log("保存图片：success");
                                console.log(res);
                                wx.showToast({
                                    title: '保存成功',
                                });
                            },
                            fail(res) {
                                console.log("保存图片：fail");
                                console.log(res);
                            }
                        })
                    }
                },
                fail(res) {
                    console.log("getSetting: success");
                    console.log(res);
                }

            }) 
        },
        testAgain(){
            wx.redirectTo({
                url:"../test/main"
            })
        }
    },
    //  分享功能
    onShareAppMessage: function (res) {
        console.log(res);
        if (res.from === 'button') {
            console.log(1111111)
            // 来自页面内转发按钮
          return {
            title: '"爸"爱说出来！参与活动就可获得350元现金券',
            path: "/pages/index/main"
          }
        } else {
            return {
                title: '"爸"爱说出来！参与活动就可获得350元现金券',
                path: "/pages/index/main"
          }
        }
    }
}
</script>
<style lang="stylus" scoped>
.wraper{
    position relative
    width 100%
    min-height 100vh
    .cover-wraper{
        position absolute
        z-index 99
        width 100%
        // width 200rpx
        // height 200rpx
        // background-color #ed4864
        .cover-top{
            display flex
            flex-flow row nowrap
            justify-content center
            cover-image{
                width 284rpx
                height 70rpx
            }
            .mar-left-10{
                margin-left 20rpx
            }
        }
        .cover-share{
            margin-top 30rpx
            display flex
            flex-flow row nowrap
            justify-content center
            button{
                width 580rpx
                height 92rpx
                cover-image{
                    width 580rpx
                    height 92rpx
                }
            }
            
        }
    }
}
</style>


