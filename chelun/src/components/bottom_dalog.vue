<template>
    <div class='dalog'>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker :columns="columns" @change="changeValues" show-toolbar @confirm='onConfirm' @cancel='onCancel'/>
        </van-popup>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    props :{
        show:{
            type:null
        }
    },
    computed: {
        ...mapState({
            columns:state=>state.getCityListStore.columns,
            cityListArr:state=>state.getCityListStore.cityListArr,
            costCityListArr:state=>state.getCityListStore.costCityListArr,
            num:state=>state.getCityListStore.num,
        })
    },
    created() {
        this.cityList();
    },
    methods:{
        ...mapMutations({
            cityListStore:'getCityListStore/cityListStore',
            getValuesStore:'getCityListStore/getValuesStore'
        }),
        cityList () {
            this.cityListStore();
        },
        changeValues (Picker,values) {
            if(this.num===1){      
            }else if(this.num===2){
                let obj=this.cityListArr.filter(item=>values[0]===item.name);
                Picker.setColumnValues(1,obj[0].list.map(item=>item.name));
            }else{
                let obj=this.costCityListArr.filter(item=>values[0]===item.name);
                Picker.setColumnValues(1,obj[0].list.map(item=>item.name));
            }
        },
        onConfirm(values) {
            this.$emit('parentShow')
            this.getValuesStore({values})
         },
        onCancel() {
            this.$emit('parentShow')
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