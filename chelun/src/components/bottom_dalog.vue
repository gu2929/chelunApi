<template>
    <div class='dalog'>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker :columns="columns" @change="ChildChange" />
            <div class='buttonDom'>
                <button @click='ChildremoveShow'>确定</button><button @click='ChildremoveShow'>取消</button>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    props:{
        show:{
            type:Boolean
        },
        columns:{
            type:null
        }
    },
    methods:{
        ChildChange () {
            //console.log(this)
            this.$emit('ParentChange','福建')
        },
        ChildremoveShow () {
            this.$emit('ParentremoveShow')
        }
    }
}
</script>
<style lang="scss" scoped>
    .dalog{
        .buttonDom{
            width:100%;
            height:auto;
            padding:0 px2rem(15px);
            display:flex;
            justify-content: space-between;
            button{
                border:none;
                background:none;
            }
        }
    }
</style>