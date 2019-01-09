<template>
  <div class='wrap_one'>
    <div class='wrap_one_main'>
        <Banner></Banner>
        <UpdateImg ></UpdateImg>
        <div class='cont'>
            <div>
                <div>
                    <span>服务类型</span><span @click="getShow(1)">{{obj.info}}</span>
                </div>
            </div>
            <div>
                <div>
                    <span>当前驾照签发城市</span><span @click='getShow(2)'>{{obj.nowCity}}</span>
                </div>
            </div>
            <div>
                <div>
                    <span>可补换的签发城市</span><span @click='getShow(3)'>{{obj.costCity | filterCity(/\(签发地\)/g)}}</span>
                </div>
            </div>
            <div>
                <span>服务费</span><span :style="{color:'red'}">￥{{money}}</span>
            </div>
        </div>
        <div class='bottom_cont'>
            <span>优惠</span><span id="cc">联系客服</span><a href="mailto:342690199@qq.com">打电话</a>
        </div>
        <BottomDalog 
            :show='show'
            @parentShow='parentShow'
        ></BottomDalog>
        <div class='bottom_cont_Link'>
            <router-link to='/question'>常见问题</router-link>
        </div>
    </div>
    <div class='wrap_one_footer'>
        <p>实付:<span style={color:red;}>￥{{money}}</span></p>
        <button @click='goTwo' :class="(flag===false || flagTwo===false) ? 'active':'active_true'">立即支付</button>
    </div>
  </div>
</template>
<script>
let JSbridge=require('../utils/JSbridge.js');

import {mapState,mapMutations} from 'vuex'

import Banner from '../components/banner.vue';
import BottomDalog from '../components/bottom_dalog.vue';
import UpdateImg from '../components/updateImg.vue';

import Vue from 'vue'

import { Swipe, SwipeItem, Popup, Picker} from 'vant';

Vue.use(Swipe).use(SwipeItem);
Vue.use(Popup);
Vue.use(Picker);

export default {
    name:'One',
    data () {
        return {
            show:false
        }
    },
    computed: {
        ...mapState({
            obj:state=>state.getCityListStore.obj,
            money:state=>state.getCityListStore.money,
            list:state=>state.upDateImgStore.list
        }),
        flag () {
           return this.list.every(item=>item.src!='')  
        },
        flagTwo () {
            return this.obj.nowCity !='请选择签发地' && this.obj.costCity !='请选择补换地'
        }
    },
    components:{
        Banner,
        BottomDalog,
        UpdateImg
    },
    methods:{
        ...mapMutations({
            getShowStore:'getCityListStore/getShowStore',
            changeIndex:'indexStore/changeIndex'
        }),
        goTwo () {
            this.changeIndex()
        },
        // login () {
        //     chelunJSBridge.invoke('app', 'login', {
        //         loginCallBackName: res=>{
        //         console.log('res...', res);
        //         }
        //     });
        // },
        parentShow () {
            this.show=false;
        },
        getShow (num) {
            this.show =true;
            this.getShowStore({
                num
            })
        }
    }
}
</script>
<style lang='scss' scoped>
    @import '../css/common.scss';
    .wrap_one{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        .wrap_one_main{
            flex:1;
            overflow:auto;
            .cont{
                margin-top:px2rem(10px);
                width:100%;
                height:auto;
                background:#fff;
                >div{
                    width:100%;
                    height:px2rem(50px);
                    padding-left:px2rem(15px);
                    font-size:px2rem(16px);
                    >div{
                        width:100%;
                        height:px2rem(50px);
                        padding:0 px2rem(15px) 0 0;
                        display:flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom:1px solid #ccc;
                    }
                }
                >div:nth-child(4){
                    display:flex;
                    justify-content: space-between;
                    padding:0 px2rem(15px);
                    line-height:px2rem(50px);
                }
            }
            .bottom_cont{
                width:100%;
                height:px2rem(50px);
                display:flex;
                justify-content: space-between;
                padding:0 px2rem(15px);
                background:#fff;
                margin-top:px2rem(15px);
                line-height:px2rem(50px);
            }
            .bottom_cont_Link{
                margin:px2rem(10px) 0px;
                width:100%;
                height:auto;
                text-align:center;
                a{
                    color:blue;
                    position:relative;
                    &:after{
                        content:'';
                        width:100%;
                        height:1px;
                        position:absolute;
                        left:0;
                        bottom:px2rem(-5px);
                        background:#000;
                    }
                }
                
            }
        }
        .wrap_one_footer{
            width:100%;
            height:px2rem(50px);
            display:flex;
            justify-content: space-between;
            align-items: center;
            background:#fff;
            padding-left:px2rem(15px);
            flex-shrink: 0;
            span{
                color:red;
            }
            .active{
                width:px2rem(80px);
                height:px2rem(50px);
                border:0;
                background:#eee;
            }
            .active_true{
                width:px2rem(80px);
                height:px2rem(50px);
                border:0;
                background:blue;
            }
        }
    }
    @media (-webkit-max-device-pixel-ratio:2){
        .bottom_cont_Link a{
            &:after{
                transform:scaleY(.5);
            }
        }
    }
    @media (-webkit-max-device-pixel-ratio:3){
        .bottom_cont_Link a{
            &:after{
                transform:scaleY(.33);
            }
        }
    }
</style>