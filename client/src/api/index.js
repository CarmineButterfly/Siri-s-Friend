import requests from "./request"
// 请求ai交流的接口
const reqChatToAI = (data)=>{
    return requests({
        url:'/talk',
        method:'post',
        headers: {
            'Content-Type': 'application/json',
        },
        // data参数就是body参数
        data,
    })
}
export {
    reqChatToAI
}