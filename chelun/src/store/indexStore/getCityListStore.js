import {cityListApi,getCostListApi} from '../../api/index';

let state={
    columns:[],
    obj:{info:'买驾照',nowCity:'请选择签发地',costCity:"请选择补换地"},
    cityListArr:[],
    costCityListArr:[],
    num:1,
    money:399
}
let getters={

}
let mutations={
    async cityListStore (state,payload) {
        let res = await cityListApi();
        res.data.forEach((val,ind)=>{
            val.list.forEach((v,i)=>{
                delete v.list
            })
        })
        state.cityListArr=res.data;
    },
    //通过判断num来给弹层里面赋值
    async getShowStore (state,payload) {
        if(payload.num ===2){
            state.columns=[
                {
                    values:state.cityListArr.map(item=>item.name),
                },
                {
                    values: state.cityListArr[0].list.map(item=>item.name),
                }
            ]
        }else if(payload.num===1){
            state.columns=['买驾照','考驾照']
        }else{
            let idObj={
                order_type:1
            }
            let newObj=state.cityListArr.filter(item=>item.name===state.obj.nowCity.split(' ')[0]);
            let newObj1=newObj[0].list.filter(item=>item.name===state.obj.nowCity.split(' ')[1]);
            idObj.city_id=newObj[0].id;
            idObj.province_id=newObj1[0].id;
            let res = await getCostListApi(idObj);
            state.costCityListArr =res.data;
            state.costCityListArr.forEach(item=>{
                if(item.source_city===1){
                    item.name = item.name+' (签发地)'
                }
            })
            state.columns=[
                {
                    values:state.costCityListArr.map(item=>item.name),
                },
                {
                    values:state.costCityListArr[0].list.map(item=>item.name),
                }
            ]
        }
        state.num = payload.num;
    },
    //得到弹层的values，设置到页面
    getValuesStore (state,payload) {
        if(state.num===1){
            state.obj.info=payload.values;
        }else if(state.num===2){
            state.obj.nowCity=payload.values.join(' ');
        }else{
            state.obj.costCity=payload.values.join(' ');
            let newObj=state.costCityListArr.filter(item=>item.name===state.obj.costCity.split(' ')[0]);
            let newObj1=newObj[0].list.filter(item=>item.name===state.obj.costCity.split(' ')[1]);
            state.money=newObj1[0].cost;
        }
    }
}
let actions={
    
}
export default {
    namespaced:true,
    state,
    mutations
}