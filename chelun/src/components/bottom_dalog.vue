<template>
    <div class='dalog'>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker :columns="columns" @change="ChildChange" show-toolbar @confirm='onConfirm' @cancel='onCancel'/>
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
        },
        cityListArr:{
            type:Array
        },
        num:{
            type:Number
        }
    },
    methods:{
        ChildChange (Picker,values) {
            if(this.num===1){      
                this.$emit('ParentChange',values)
            }else if(this.num===2){
                let obj=this.cityListArr.filter(item=>values[0]===item.name);
                Picker.setColumnValues(1,obj[0].list.map(item=>item.name));
                this.$emit('ParentChange',values)
            }
        },
        onConfirm() {
             this.$emit('ParentremoveShow')
         },
        onCancel() {
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