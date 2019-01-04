<template>
    <div class='updateImg'>
        <p v-for='(item,index) in list' :key='index'>
            <span v-if='item.src'><img :src="item.src" @click='showMask(item)'></span>
            <span v-else><img :src="addImg" @click='showMask(item)'></span>
            <span>{{item.desc}}</span>
        </p>
        <div :class="flag===false ? 'mask':'mask active'">
            <img :src="current.demo" alt="">
            <div>
                <button @click='clickType(1)'>拍照</button>
                <button @click='clickType(2)'>相册</button>
                <button @click='removeShow'>取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import add from '../assets/add.png';
import {uploadImg} from '../api/index';
export default {
    name:'updateImg',
    data () {
        return {
            maskImg:'',
            flag:false,
            current:{}
        } 
    },
    computed: {
        ...mapState({
            list:state=>state.indexStore.list
        }),
        addImg () {
            return add;
        }
    },
    methods: {
        ...mapMutations({
            updateLoadImg:'indexStore/updateLoadImg'
        }),
        showMask (val) {
            this.current=val;
            this.flag=true;
        },
        removeShow () {
            this.flag=false;
        },
        async clickType (type) {
            let res=await uploadImg(type);
            if (res.result == 1){
                this.updateLoadImg({
                    src: res.data.url,
                    index: this.list.findIndex(item=>item==this.current)
                })
                this.flag = false;
            }else{
                alert('上传图片失败');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    $baseline-px:37.5px;
    @function px2rem ($px-values) {
        $baseline-rem: $baseline-px / 1rem * 1;
        $px-values: $px-values / $baseline-rem;
        @return $px-values;
    }
    .updateImg{
        width:100%;
        height:auto;
        background:#fff;
        display:flex;
        padding:px2rem(15px) 0;
        p{
            flex:1;
            display:flex;    
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span:nth-child(1){
                box-sizing:border-box;
                border:1px solid #ccc;
                border-radius:px2rem(10px);
                padding:px2rem(5px);
                img{
                    width:80%;
                    height:80%;
                    margin:0 auto;
                    display:block;
                }
            }
            span:nth-child(2){
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
    .mask{
        width:100%;
        height:100%;
        background:rgba(0,0,0,.5);
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        visibility:hidden;
        position:absolute;
        left:0;
        top:0;
        img{
            width:90%;
            height:auto;
            position:absolute;
            top:-100%;
            left:0;
            transition:all 1s;
        }
        div{
            width:90%;
            height:auto;
            margin:0 auto;
            position:absolute;
            bottom:-100%;
            left:0;
            transition:all 1s;
            button{
                width:100%;
                display:block;
                border:none;
                background:#fff;
                padding:px2rem(5px) 0;
            }
            button:nth-child(1){
               border-bottom:1px solid #ccc;
               border-radius:px2rem(10px) px2rem(10px) 0 0;
            } 
            button:nth-child(2){
               border-bottom:1px solid #ccc;
               border-radius:0 0 px2rem(10px) px2rem(10px);
            }   
            button:nth-child(3){
                margin-top:px2rem(10px);
                border-radius:px2rem(10px);
            }   
        }
        &.active{
            visibility:visible;
            img{
                top:5%;
                left:5%;
            };
            div{
                bottom:5%;
                left:5%;
            }
        }
    }
    
    
</style>