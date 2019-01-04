// const host = /localhost/.test(window.location.host)?'https://h5.chelun.com':'http://h5-test.chelun.com';
let JSbridge=require('../utils/JSbridge.js');

export let uploadImg = (type) => {
    return new Promise((resolve, reject)=>{
        JSbridge.invoke('device', 'chooseImage', {
            type,
            chooseCallbackName: function(res){
                resolve(res);
            }
        })
    })
}

function sendRequest(url, method = 'GET', data = {}) {
    let params = {
        method
    };
    // 判断如果是一个post请求，带上请求体信息
    if (method == 'POST') {
        params.body = JSON.stringify(data);
    }
    // 判断请求查询url是否携带query
    if (url.indexOf('?') == -1) {
        url += `?_=${+new Date()}`
    } else {
        url += `&_=${+new Date()}`
    }
    // 拼接登陆态token
    // url += `&token=${getToken()}`;
    return fetch(url, params)
      .then(res => res.json())
      .then(body => body);
}

export let cityListApi = () => {
    return sendRequest('https://chezhu.eclicks.cn/ExchangeJiaZhao/cityList')
}
export let getCostListApi = ({...params}) => {
    return sendRequest(`https://chezhu.eclicks.cn/ExchangeJiaZhao/getCostList?order_type=${params.order_type}&city_id=${params.province_id}&province_id=${params.city_id}`)
}