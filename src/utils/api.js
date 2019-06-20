const root = '/api/';
const rootMini="/mini/api/";
const tra = "http://tracenet.nat300.top/mall";
const test = "http://101.37.67.51:8082/mall";
const zhou ="http://192.168.85.211:8080/mall";
const pay="http://tracenet.nat300.top/mall";
const product="https://xcx.kangjiayiju.com/mall/";

const API_BASE_URL = product + root;
const API_BASE_USER_URL = product + rootMini;

const api = {

    MessageInfo:API_BASE_USER_URL+'common/messages', //获取消息列表
    Login: API_BASE_USER_URL + 'auth/login_by_weixin', //登陆授权 POST
    InviteInfo: API_BASE_USER_URL + 'invite/info', //获取自己的邀请码(分享) GET
    NewPictureCode: API_BASE_URL + 'common/newPictureCode', //获取图形验证码 GET
    SmCode: API_BASE_URL + 'common/smscode', //获取获取验证码 GET
    BindPhone: API_BASE_USER_URL + 'common/bindPhone', //绑定手机号 POST
    Exchange: API_BASE_USER_URL + 'invite/exchange', //输入好友邀请码 POST
    Index: API_BASE_USER_URL + 'common/index', //首页展示接口 GET
    ActivityDetail: API_BASE_URL + 'activity/', //获取活动详情 GET
    UsualUser: API_BASE_USER_URL + 'usualUser', //查询常用联系人的列表 GET
    CenterInfo:API_BASE_USER_URL+'account/data', //个人中心数据
    AddUsualUser:API_BASE_USER_URL+'usualUser', //添加常用联系人 POST
    ActivityMoney:API_BASE_USER_URL+'activityOrder/money', //获取账户金额 GET
    SubmitActivity:API_BASE_USER_URL+'activityOrder', //提交活动订单 POST
    CoinBack:API_BASE_USER_URL+'activityOrder/coin/', //加B支付回调 POST
    ScoreBack:API_BASE_USER_URL+'activityOrder/wallet/', //加分支付回调 POST
    ActivityPreview:API_BASE_URL+'/agreementPage/preview?name=activity_agreement',//参团协议
    JiaFenInfo:API_BASE_USER_URL+'account/jiaFenDeal', //加分消费列表
    JiaBiInfo:API_BASE_USER_URL+'account/jiaBideal',  //加币消费列表
    ActivityOrders:API_BASE_USER_URL+'activityOrders',//获取活动订单列表 GET
    ActivityOrderEdit:API_BASE_USER_URL+'activityOrder/',//活动订单操作 POST (type 0 去支付 1 取消订单（无数据返回值）2 删除订单 3退款)
    ActivityOrderDetail:API_BASE_USER_URL+'activityOrder/',//获取活动订单详情 GET
    Coupons:API_BASE_USER_URL+'coupon/coupon/new',//获取我的平台优惠劵 GET
    CouponInfo:API_BASE_USER_URL+'coupon/',//获取我的平台优惠劵详情 GET
    FlashSaleList:API_BASE_URL+'flashSaleList',//获取限时购列表 GET
    IntegralOrders:API_BASE_USER_URL+'orderProduct',//获取商品订单列表 GET
    IntegralOrderEdit:API_BASE_USER_URL+'orderProduct/',//商品订单操作 POST (type 0 去支付 1 取消订单（无数据返回值）2 删除订单 3退款 4确认收货)
    IntegralOrderDetail:API_BASE_USER_URL+'integral/orderProduct/',//获取商品订单详情 GET
    GoodsDetail:API_BASE_URL+'integral/getIntegralProductDetail',//获取加分商品详情 GET
    Getaddress:API_BASE_USER_URL+'address',//获取收货地址 GET
    AddAddress:API_BASE_USER_URL+'address/addAddress',//新增收货地址 POST
    EditAddress:API_BASE_USER_URL+'address',//修改收货地址 POST
    DelelteAddress:API_BASE_USER_URL+'address/delete',//删除收货地址 POST
    GetDefaultAddress:API_BASE_USER_URL+'integral/default/account',//获取默认收货地址和邮费 GET
    GetAddressChange:API_BASE_USER_URL+'integral/change/address',//切换地址重新获取邮费 GET
    GetMoney:API_BASE_USER_URL+'integral/money',//获取账户金额 GET
    MakeGoodsOrder:API_BASE_USER_URL+'integral/IntegralExchange',//创建兑换商品订单 POST
    MakeGoodsScore:API_BASE_USER_URL+'integral/wallet/',//商品订单加分支付回调 POST
    MakeGoodsBi:API_BASE_USER_URL+'integral/coin/',//商品订单加币支付回调 POST
    IntegralOrderPayCoinBack:API_BASE_USER_URL+'integral/coin/', //加币支付商品回调
    IntegralOrderPayScoreBack:API_BASE_USER_URL+'integral/wallet/', //加分支付商品回调 POST
    OulineCoupon:API_BASE_USER_URL+'coupon/activity/info', //线下活动（2019-05-25 线下活动） GET
    GetOulineCoupon:API_BASE_USER_URL+'coupon/activity/get', //领取优惠劵（2019-05-25 线下活动） GET
    DanceBanner:API_BASE_USER_URL+'activity/banner',//获取活动页面banner GET
    DanceList:API_BASE_USER_URL+'activityDance',//获取活动列表 GET
    DanceLike:API_BASE_USER_URL+'activityDance/like',//点赞 GET
    Dancedetail:API_BASE_USER_URL+'activityDance/',//dance detail GET
    Decodephone:API_BASE_USER_URL+'common/decode/phone',//获取微信绑定手机号码 POST
};
export default api
