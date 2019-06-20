<script>
export default {
  created (options) {
    console.log("app created created");
    console.log(options);
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    if (wx.canIUse('getUpdateManager')) {
          const updateManager = wx.getUpdateManager()
          updateManager.onCheckForUpdate(function (res) {
              // 请求完新版本信息的回调
              if (res.hasUpdate) {
                  updateManager.onUpdateReady(function () {
                      wx.showModal({
                          title: '更新提示',
                          content: '新版本已经准备好，是否重启应用？',
                          success: function (res) {
                              if (res.confirm) {
                                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                  updateManager.applyUpdate()
                              }
                          }
                      })
                  })
                  updateManager.onUpdateFailed(function () {
                      // 新的版本下载失败
                      wx.showModal({
                          title: '已经有新版本了哟~',
                          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                      })
                  })
              }
          })
      } else {
          wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。'
          })
      }

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  onLaunch: function (options) {
    console.log("app onLaunch onLaunch");
    console.log("[onLaunch] 场景值:", options.scene);
    if(options.scene==1047 || options.scene==1011 || options.scene==1017){  // 扫描小程序码或者二维码
        wx.setStorageSync("appEntry",true);
      }else{
        wx.removeStorageSync("appEntry");
      }

      if (wx.canIUse('getUpdateManager')) {
          const updateManager = wx.getUpdateManager()
          updateManager.onCheckForUpdate(function (res) {
              // 请求完新版本信息的回调
              if (res.hasUpdate) {
                  updateManager.onUpdateReady(function () {
                      wx.showModal({
                          title: '更新提示',
                          content: '新版本已经准备好，是否重启应用？',
                          success: function (res) {
                              if (res.confirm) {
                                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                  updateManager.applyUpdate()
                              }
                          }
                      })
                  })
                  updateManager.onUpdateFailed(function () {
                      // 新的版本下载失败
                      wx.showModal({
                          title: '已经有新版本了哟~',
                          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                      })
                  })
              }
          })
      } else {
          wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。'
          })
      }
},
  onShow: function (options) {
      console.log(options);
      let option = JSON.stringify(options);
      console.log('app.js option-----' + option)
      console.log('app.js--------------------'+options.scene);
      if(options.scene==1047 || options.scene==1011 || options.scene==1017){  // 扫描小程序码或者二维码
        wx.setStorageSync("appEntry",true);
      }else{
        wx.removeStorageSync("appEntry");
      }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
