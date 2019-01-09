<template>
    <div class='wrap'>
        <div class='header'>
            <span v-for='(val,ind) in headerArr' :key='ind' :class="Index===ind ? 'active':''">{{val}}</span>
        </div>
        <div class='main'>
            <One v-if='Index===0'></One>
            <Two v-if='Index===1'></Two>
        </div>
    </div>
</template>
<script>
import One from '../components/one';
import Two from '../components/two';
import {mapState} from 'vuex'
export default {
    name:'Index',
    data () {
        return {
            headerArr:['订单提交','填写收货地址','正在办理','办理完成']
        }
    },
    computed: {
        ...mapState({
            Index:state=>state.indexStore.Index
        })
    },
    components:{
        One,
        Two
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
        overflow:hidden;
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
            span:nth-child(2),span:nth-child(3){
                &:before{
                    display:block;
                    content:'';
                    width:0;
                    height:0;
                    position:absolute;
                    right:px2rem(-20px);
                    top:0;
                    border-width:px2rem(25px) px2rem(10px);
                    border-style: solid;
                    border-color: transparent transparent transparent #ccc;
                }
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
                    border-color: transparent transparent transparent #fff;
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
        }
    }
</style>