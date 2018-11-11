import axios from 'axios';

const Request = axios.create({
    withCredentials: true,
    timeout: 100000,
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        let params = new URLSearchParams;
        for(let key in data){
            params.append(key, data[key]);
        }
        return params;
    }],
    headers: [
        {'X-Custom-Header': 'foobar'},
        {'X-Requested-With': 'XMLHttpRequest'},
        {'Content-type':'application/json'}
    ]
})

export default Request;
