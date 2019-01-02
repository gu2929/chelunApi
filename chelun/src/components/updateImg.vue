<template>
    <div class='updateImg'>
        <p v-for='(item,index) in list' :key='index'>
            <span><img :src="addImg" @click='showMask(item)'></span>
            <span>{{item.desc}}</span>
        </p>
        <div class='mask' v-show='flag===true'>
            <img :src="maskImg" alt="">
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
            flag:false
        } 
    },
    computed: {
        ...mapState({
            list:state=>state.indexStore.list
        }),
        ...mapMutations({
            updateLoadImg:'indexStore/updateLoadImg'
        }),
        addImg () {
            return add;
        }
    },
    methods: {
        showMask (val) {
            this.maskImg=val.demo;
            this.flag=true;
        },
        removeShow () {
            this.flag=false;
        },
        clickType (type) {  
            uploadImg(type).then(res=>{
                if (res.code == 0){
                    let src = '';
                    if (/picture.eclicks.cn/.test(res.data.image01)) {
                        src = res.data.temp.replace('http://', '//');
                    } else {
                        src = '//picture.eclicks.cn/' + res.data.temp;
                    }
                    this.updateLoadImg({
                        src,
                        index: this.list.findIndex(item=>item==this.current)
                    })
                }else{
                    alert(res.msg);
                }
            })
        }
    },
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
        position:fixed;
        top:0;
        left:0;
        background:rgba(0,0,0,.5);
        padding:px2rem(30px) 0;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        img{
            display:block;
            width:90%;
            height:auto;
            margin:0 auto;
        }
        div{
            width:90%;
            margin:0 auto;
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
    }
</style>