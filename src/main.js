import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    pages: [
      '^pages/index/main',
      "pages/logs/main",
      "pages/counter/main",
      "pages/friends/main",
      "pages/center/main",
      "pages/auth/main",
      "pages/bindphone/main",
      "pages/activity/main",
      "pages/message/main",
      "pages/money/main",
      "pages/contactlist/main",
      "pages/addcontact/main",
      "pages/choosecontact/main",
      "pages/choosephone/main",
      "pages/activityorder/main",
      "pages/activityPreview/main",
      "pages/paysuccess/main",
      "pages/travelorder/main",
      "pages/activityorderdetail/main",
      "pages/coupon/main",
      "pages/integralorder/main",
      "pages/integralorderdetail/main",
      "pages/purchaselist/main",
      "pages/purchasedetail/main",
      "pages/purchasebuy/main",
      "pages/addresslist/main",
      "pages/addaddress/main",
      "pages/express/main",
      "pages/video/main",
      "pages/dance/main",
      "pages/dancedetail/main",
      "pages/getphone/main",
      "pages/canvas/main",
      "pages/fatherday/main",
      "pages/test/main"
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '康加旅居',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: "#ffffff",
      borderStyle: "black",
      selectedColor: "#43AEC8",
      color: "#666",
      list: [
        {
            text: "首页",
            pagePath: "pages/index/main",
            iconPath: "static/tabs/home_nomal.png",
            selectedIconPath: "static/tabs/home-press.png"
          }, 
          {
            text: "活动",
            pagePath: "pages/dance/main",
            iconPath: "static/tabs/activity_nomal.png",
            selectedIconPath: "static/tabs/activity_press.png"
          },
          {
            text: "好友",
            pagePath: "pages/friends/main",
            iconPath: "static/tabs/friends_nomal.png",
            selectedIconPath: "static/tabs/friends_press.png"
          },
          {
            text: "我的",
            pagePath: "pages/center/main",
            iconPath: "static/tabs/center_nomal.png",
            selectedIconPath: "static/tabs/center_press.png"
          }
      ]
    }
  }
}
