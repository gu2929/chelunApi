<template>
  <div class='wrap'>
    <div class='header'>
      <span v-for='(val,ind) in headerArr' :key='ind' :class="Index===ind ? 'active':''">{{val}}</span>
    </div>
    <div class='main'>
        <Banner></Banner>
        <UpdateImg></UpdateImg>
        <div class='cont'>
            <div>
                <div>
                    <span>服务类型</span><span @click="getShow(1)">换驾照</span>
                </div>
            </div>
            <div>
                <div>
                    <span>当前驾照签发城市</span><span @click='getShow'>请选择签发地</span>
                </div>
            </div>
            <div>
                <div>
                    <span>可补换的签发城市</span><span @click='getShow'>请选择补换地</span>
                </div>
            </div>
            <div>
                <span>服务费</span><span :style="{color:'red'}">￥399</span>
            </div>
        </div>
        <div class='bottom_cont'>
            <span>优惠</span><span>></span>
        </div>
        <BottomDalog 
            :show='show' 
            :columns='columns'
            @ParentChange='onChange'
            @ParentremoveShow='removeShow'>
        </BottomDalog>
        <div class='bottom_cont_Link'>
            <p>常见问题</p>
        </div>
    </div>
    <div class='footer'>
        <p>实付:<span style={color:red;}>￥399</span></p>
        <button @click='login'>立即支付</button>
    </div>
  </div>
</template>
<script>
let JSbridge=require('../utils/JSbridge.js');

import Banner from '../components/banner.vue';
import BottomDalog from '../components/bottom_dalog.vue';
import UpdateImg from '../components/updateImg.vue';

import Vue from 'vue'

import { Swipe, SwipeItem, Popup, Picker} from 'vant';
Vue.use(Swipe).use(SwipeItem);
Vue.use(Popup);
Vue.use(Picker);
export default {
    name:'Index',
    data () {
        return {
            headerArr:['订单提交','填写收货地址','正在办理','办理完成'],
            Index:0,
            showChangeIndex:0,
            show:false,
            citys: {
                '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                '福建': ['福州', '厦门', '莆田', '三明', '泉州']
            },
            columns:[]
        }
    },
    components:{
        Banner,
        BottomDalog,
        UpdateImg
    },
    mounted() {
        this.Picker=Picker;
        this.columns=[
            {
            values: Object.keys(this.citys),
            className: 'column1'
            },
            {
            values: this.citys['浙江'],
            className: 'column2',
            defaultIndex: 2
            }
        ]
    },
    methods:{
        login () {
            chelunJSBridge.invoke('app', 'login', {
                loginCallBackName: res=>{
                console.log('res...', res);
                }
            });
        },
        getShow (index) {
            this.showChangeIndex=index;
            if(index===1){
                this.columns=['考驾照','买驾照']
            }
            this.show = true;
        },
        removeShow () {
            this.show = false;
        },
        onChange(values) {
            if(this.showChangeIndex===1){
              this.columns=['考驾照','买驾照']
            }else{
                this.columns=[
                    {
                    values: Object.keys(this.citys),
                    className: 'column1'
                    },
                    {
                    values: this.citys[values],
                    className: 'column2',
                    defaultIndex: 2
                    }
                ]
            }
            
           //Picker.methods.setColumnValues();
        }
    }
}
</script>
<style lang='scss'>
    @import '../css/common.scss';
    .wrap{
        width:100%;
        height:100%;
        background:#ccc;
        display:flex;
        flex-direction:column;
        .header{
            width:100%;
            height:px2rem(50px);
            background:#fff;
            display:flex;
            line-height:px2rem(50px);
            text-align:center;      
            flex-shrink: 0;
            span{
                flex:1;
                font-size:px2rem(14px);
                position:relative;
            }
            span:nth-child(2){
                &:after{
                    display:block;
                    content:'';
                    width:0;
                    height:0;
                    position:absolute;
                    right:px2rem(-20px);
                    top:0;
                    border-left:px2rem(1px);
                    border-right:px2rem(1px);
                    border-top:px2rem(25px);
                    border-bottom:px2rem(25px);
                    border-style: solid;
                    border-color: #ccc #ccc #ccc #fff;
                }
            }
            .active{
                margin-right:10px;
                color:#fff;
                background:skyblue;
                &:after{
                    display:block;
                    content:'';
                    width:0;
                    height:0;
                    position:absolute;
                    right:px2rem(-20px);
                    top:0;
                    border-width:px2rem(25px) px2rem(10px);
                    border-style: solid;
                    border-color: transparent transparent transparent skyblue;
                }
            }
        }
        .main{
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
                margin-top:px2rem(10px);
                width:100%;
                height:auto;
                text-align:center;
                color:blue;
            }
        }
        .footer{
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
            button{
                width:px2rem(80px);
                height:px2rem(50px);
                border:0;
                background:#eee;
            }
        }
  }
</style>