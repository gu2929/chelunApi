import {cityListApi} from '../../api/index'
let state={
    arr:[],
    values:['北京','北京市','东城区'],
    columns:[]
}
let mutations={
    async cityListStoreTwo (state,payload) {
        let res =await cityListApi();
        state.arr =res.data
    },
    getShowStoreTwo (state,payload) {
        state.columns=[
            {
                values:state.arr.map(item=>item.name),
            },
            {
                values: state.arr[0].list.map(item=>item.name),
            },
            {
                values: state.arr[0].list[0].list.map(item=>item.name),
            }
        ]
    },
    getValuesStoreTwo(state,payload) {
        state.values=payload.values
    }
}
export default {
    namespaced:true,
    state,
    mutations
}