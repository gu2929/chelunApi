let state={
    Index:0
}
let mutations={
    changeIndex (state,payload) {
        state.Index=1;
    }
}
export default {
    namespaced:true,
    state,
    mutations
}