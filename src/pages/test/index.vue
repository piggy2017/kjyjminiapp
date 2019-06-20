<template>
    <div class="test">
        <img src="http://img.tracenet.cn/father5.jpg" alt="" class="test-bg-img">
        <div class="img-bottom">
            <img src="http://img.tracenet.cn/father1.png" alt="">
        </div>
        <div class="next-btn" :style="{bottom:absbottom+'rpx'}" @click="nextQuestion">
            <img src="/static/images/nextbutton.png" alt="">
        </div>
        <div class="test-content">
            <p class="test-content-title">{{dataList[index].question}}</p>
            <div class="que-pictrue">
                <img :src="dataList[index].img" alt="">
            </div>
            <div 
            class="answer-item" 
            v-for="item in dataList[index].ans" 
            :key="item.key" 
            :class="[item.isActive ? 'activeClass' : '']"
            @click="choose(item._parId,item.id,item.key)">{{item.detail}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            absbottom:450,
            index:0,
            dataList:[
                {id:1,question:"1、你给父亲办过生日会吗？",img:"http://img.tracenet.cn/father-test1.jpg",ans:[
                    {id:11,detail:"A：办过，邀请了很多亲戚朋友",key:"A",isActive:false,_parId:1},
                    {id:12,detail:"B：不是每年都办",key:"B",isActive:false,_parId:1},
                    {id:13,detail:"C：没办过，以后会办",key:"C",isActive:false,_parId:1}
                ],choosed:false},
                {id:2,question:"2、你有没有为父亲做过饭？",img:"http://img.tracenet.cn/father-test2.jpg",ans:[
                    {id:21,detail:"A：经常做，我厨艺很好",key:"A",isActive:false,_parId:2},
                    {id:22,detail:"B：偶尔做一次",key:"B",isActive:false,_parId:2},
                    {id:23,detail:"C：没做过，以后想为他做",key:"C",isActive:false,_parId:2}
                ],choosed:false},
                {id:3,question:"3、你陪父亲散过步吗？",img:"http://img.tracenet.cn/father-test3.jpg",ans:[
                    {id:31,detail:"A：在家时，每天晚上陪他散步",key:"A",isActive:false,_parId:3},
                    {id:32,detail:"B：偶尔陪他散步",key:"B",isActive:false,_parId:3},
                    {id:33,detail:"C：没有，以后想陪陪他",key:"C",isActive:false,_parId:3}
                ],choosed:false},
                {id:4,question:"4、家里遇到困难了，父亲会找你诉说吗？",img:"http://img.tracenet.cn/father-test4.jpg",ans:[
                    {id:41,detail:"A：会，我是他的智囊团",key:"A",isActive:false,_parId:4},
                    {id:42,detail:"B：偶尔会，可能怕我担心",key:"B",isActive:false,_parId:4},
                    {id:43,detail:"C：不会，今后会多关心他",key:"C",isActive:false,_parId:4}
                ],choosed:false},
                {id:5,question:"5、你跟父亲出去旅游过吗？",img:"http://img.tracenet.cn/father-test5.jpg",ans:[
                    {id:51,detail:"A：经常去，我们有很多合照",key:"A",isActive:false,_parId:5},
                    {id:52,detail:"B：偶尔去一次",key:"B",isActive:false,_parId:5},
                    {id:53,detail:"C：没去过，未来有计划",key:"C",isActive:false,_parId:5}
                ],choosed:false},
                {id:6,question:"6、父亲会跟你分享他的生活小事吗？",img:"http://img.tracenet.cn/father-test6.jpg",ans:[
                    {id:61,detail:"A：会，我们每次都会放声大笑",key:"A",isActive:false,_parId:6},
                    {id:62,detail:"B：偶尔会",key:"B",isActive:false,_parId:6},
                    {id:63,detail:"C：不会，我们之间可能沟通太少了",key:"C",isActive:false,_parId:6}
                ],choosed:false},
                {id:7,question:"7、你跟父亲一起钓过鱼吗？",img:"http://img.tracenet.cn/father-test7.jpg",ans:[
                    {id:71,detail:"A：经常去，总是收获满满",key:"A",isActive:false,_parId:7},
                    {id:72,detail:"B：偶尔去一次",key:"B",isActive:false,_parId:7},
                    {id:73,detail:"C：没有，父亲不喜欢钓鱼或没有时间",key:"C",isActive:false,_parId:7}
                ],choosed:false}
            ],
            answers:[]
        }
    },
    onLoad:function(){
        Object.assign(this, this.$options.data());
        console.log(this.$root.$mp.query);
    },
    methods:{
        choose(parentId,id,num){
            console.log(parentId,id,num);
            let _list=this.dataList[this.index]
            console.log(_list);
            _list.choosed=true;
            for(let i=0;i<_list.ans.length;i++){
                if(_list.ans[i].id==id){
                    _list.ans[i].isActive=true;
                    let obj={
                       "id":parentId,
                       "answer":num
                    }
                    //this.answers.push(obj);
                    if(this.answers.length<this.index+1){
                        this.answers.push(obj)
                    }else{
                        //this.answers.pop();
                        //this.answers.push(obj);
                        this.answers.splice(this.index,1,obj)
                    }
                    // for(let j=0;j<this.answers.length;j++){
                    //     if(this.answers[j].)
                    // }
                }else{
                    _list.ans[i].isActive=false;
                }
            }
            console.log(this.answers);
        },
        nextQuestion(){
            if(this.index<6){
                if(this.answers.length==this.index){
                    return
                }else{
                    this.index+=1;
                }
            }else{
                if(this.answers.length==7){
                    console.log("答题完毕");
                    console.log(this.answers);
                    let aNumber=0;
                    for(let i=0;i<this.answers.length;i++){
                        if(this.answers[i].answer=="A"){
                            aNumber+=1;
                        }
                    }
                    console.log(aNumber);
                    wx.setStorageSync("hasTest",true);
                    wx.redirectTo({
                        url:"../canvas/main?id="+aNumber
                    })
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.test{
    width 100%
    min-height 100vh
    position relative
    font-family: PingFangSC-Regular;
    .test-content{
        width 584rpx
        font-size: 32rpx;
        color: #333333;
        position absolute
        z-index 999
        top 160rpx
        left 83rpx
        .que-pictrue{
            width 584rpx
            height 240rpx
            margin 30rpx 0 40rpx 0
            img{
                width 100%
                height 100%
            }
        }
        .answer-item{
            width 100%
            height 104rpx
            line-height 104rpx
            position relative
            border-bottom 1rpx solid #eee
            box-sizing border-box
            padding-left 40rpx
        }
        .activeClass{
            background: #F3F8ED !important;
            border-radius: 7px !important;
            color: #5DA50C !important;
            border 1rpx solid #5DA50C
        }
        .activeClass::before{
            position absolute
            content ""
        }
    }
    .test-bg-img{
        width 100%
        height 1496rpx
    }
    .next-btn{
        width 322rpx
        height 116rpx
        position absolute
        left 214rpx
        z-index 999
        img{
            width 100%
            height 100%
        }
    }
    .img-bottom{
        position fixed
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


