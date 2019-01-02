import demo1 from '../../assets/id-a.png';
import demo2 from '../../assets/id-b.png';
import demo3 from '../../assets/licence-a.png';
import demo4 from '../../assets/licence-b.png';
import demo5 from '../../assets/photo.png';

let state={
    list:[{
        src:'',
        demo:demo1,
        desc:'身份证正面'
    },{
        src:'',
        demo:demo2,
        desc:'身份证反面'
    },{
        src:'',
        demo:demo3,
        desc:'驾驶证正面'
    },{
        src:'',
        demo:demo4,
        desc:'驾驶证反面'
    },{
        src:'',
        demo:demo5,
        desc:'一寸蓝底照片'
    }]
}
let mutations={
    updateLoadImg(state, payload){
        console.log(payload)
        state[payload.index].src = payload.src
    }
}
export default {
    state
}