let JSbridge=require('../utils/JSbridge.js');
export const uploadImg = (type) => {
    return new Promise((resolve, reject)=>{
        JSbridge.invoke('device', 'chooseImage', {
            type,
            chooseCallbackName: function(res){
                console.log(res)
                resolve(res);
            }
        })
    })
}