<template>
    <div class='two_wrap'>
        <h2>收货地址</h2>
        <ul>
            <li>
                <span>联系省市</span><span @click='getShow'><b>{{values[0]}}</b><b>{{values[1]}}</b><b>{{values[2]}}</b></span>  
            </li>
            <li>
                <span>详细地址</span><span></span>
            </li>
             <li>
                <span>联系电话</span><span></span>
            </li>
             <li>
                <span>联系人</span><span></span>
            </li>
        </ul>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker :columns="columns" @change="changeValues" show-toolbar @confirm='onConfirm' @cancel='onCancel'/>
        </van-popup>
        <div class='moneyBox'>
            <p @click='getMask'>红包</p>
        </div>
        <div>
            <input type="file" @change="fileUpload">
        </div>
        <canvas id="canvas"></canvas>
        <div :class="flag===false ? 'mask':'mask active'">
            <div>
                <img src="../assets/coupon.png" alt="">
                <p>
                    <button @click='removeMask'>给钱都不要</button>
                    <button @click='WXshare'>分享到朋友圈</button>
                </p>  
            </div> 
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {mapState,mapMutations} from 'vuex';
import {Popup, Picker} from 'vant';
Vue.use(Popup);
Vue.use(Picker);
import {share,uploadBase64} from '../api/index';
export default {
    name:'two',
    data () {
        return {
            flag:false,
            show:false
        }
    },
    computed: {
        ...mapState({
            arr:state=>state.indexStoreTwo.arr,
            columns:state=>state.indexStoreTwo.columns,
            values:state=>state.indexStoreTwo.values
        })
    },
    created() {
        this.cityListStoreTwo();
        //分享到朋友圈
        window['CHELUN_SHARE_DATA_WXTIMELINE']={
            title:'分享一只可爱的杨蓉',
            imgUrl:'http://pic1.win4000.com/wallpaper/e/584e11d10fff2.jpg',
            type:'photo'
        },
        //分享到朋友
        window['CHELUN_SHARE_DATA_WXMESSAGE']={
            title:'分享一只可爱的杨蓉',
            desc:'可爱',
            link:'http://www.win4000.com/wallpaper_detail_117786_5.html',
            imgUrl:'http://pic1.win4000.com/wallpaper/e/584e11d10fff2.jpg'
        }
    },
    methods: {
        ...mapMutations({
            cityListStoreTwo:'indexStoreTwo/cityListStoreTwo',
            getShowStoreTwo:'indexStoreTwo/getShowStoreTwo',
            getValuesStoreTwo:'indexStoreTwo/getValuesStoreTwo'
        }),
        getShow () {
            this.show=true
            this.getShowStoreTwo()
        },
        onConfirm(values) {
            this.show=false
            this.getValuesStoreTwo({values})
         },
        onCancel() {
            this.show=false
        },
        changeValues (Pickers,values) {
            let obj=this.arr.filter(item=>values[0]===item.name);
            let index=this.arr.findIndex(item=>values[0]===item.name);
            let index_1=this.arr[index].list.findIndex(item=>values[1]===item.name) < 0 ? 0: this.arr[index].list.findIndex(item=>values[1]===item.name);
            Pickers.setColumnValues(1,obj[0].list.map(item=>item.name));
            Pickers.setColumnValues(2,this.arr[index].list[index_1].list.map(item=>item.name));
        },
        getMask () {
            this.flag = true
        },
        removeMask () {
            this.flag = false
        },
        WXshare () {
            console.log(1)
            share()
        },
        async fileUpload(e){
            let reader = new FileReader();
            // 判断图片是否过多
            if (e.target.files[0].size > 1024*300){
            }
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = ()=>{
                this.src = reader.result;
                var img = new Image();
                img.src = reader.result;
                img.onload = async ()=>{
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // 压缩画布
                    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width/2, img.height/2);
                    // 绘制一张网络图片
                    var img2 = new Image();
                    img2.crossOrigin = 'anonymous'
                    var url = 'http://123.206.55.50:11000/static/9c5ab5222bb94e9beec79ded.jpg';
                    let data = await imageToBase64(url)
                    img2.src = 'data:image/jpeg;base64,'+data;
                    img2.onload = async ()=>{
                        context.drawImage(img2, 0, 0, img2.width, img2.height, 50, 50, img2.width/2, img2.height/2);
                        // toDataUrl时，设置为jpeg或者图片质量
                        var baseStr1 = canvas.toDataURL('image/jpeg', 0.7);
                        var baseStr2 = canvas.toDataURL('image/png', 1);
                        // console.log(baseStr1, baseStr2);
                        let res1 = await uploadBase64(baseStr1);
                        let res2 = await uploadBase64(baseStr2);
                    }
                }
            }
        }
    }      
}
</script>
<style lang="scss" scoped>
    @import '../css/common.scss';
    .two_wrap{
        width:100%;
        height:100%;
        h2{
            width:100%;
            height:px2rem(30px);
            text-align:center;
            line-height:px2rem(30px);
            margin-top:px2rem(10px);
        }
        ul{
            width:100%;
            height:auto;
            padding-left: px2rem(15px);
            background:#fff;
            li{
                width:100%;
                height:px2rem(50px);
                padding-right:px2rem(15px);
                border-bottom:1px solid #ccc;
                display:flex;
                justify-content: space-between;
                align-items: center;
                &:nth-child(4) {
                    border:none;
                }
                b{
                    margin-left:px2rem(5px)
                }
            }  
        }
        .moneyBox{
            width:100%;
            height:px2rem(30px);
            text-align:center;
            line-height:px2rem(30px);
            margin-top:px2rem(10px);
        }
        .mask{
            width:100%;
            height:100%;
            background:rgba(0,0,0,.5);
            position:fixed;
            left:-100%;
            top:0;
            display:flex;
            justify-content: center;
            align-items: center;
            div{
                position:relative;
                img{
                    display:block;
                    margin:0 auto;
                    width:px2rem(300px);
                    height:auto;
                    transition:all 2s;
                    opacity:0;
                }
                p{
                    width:100%;
                    height:auto;
                    position:absolute;
                    left:0;
                    bottom:0;
                    display:flex;
                    button{
                        flex:1;
                        background:none;
                        border:none;
                        padding:px2rem(10px) 0;
                        &:nth-child(1){
                            background:#ccc;
                        }
                        &:nth-child(2){
                            background:skyblue;
                        }
                    }
                }
            }
            &.active{
                left:0;
                div{
                    img{
                        opacity:1;
                    }
                }
                
            }
        }
    }
</style>