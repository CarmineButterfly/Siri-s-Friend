//二次封装axios,用于处理放松请求前和发送请求后的一些业务逻辑
import axios from 'axios'

//create是axios上的一个属性方法
const requests = axios.create({
    //config options
    baseURL: "/api",
    timeout: 800000
})

//export the second encapsulate of axios
export default requests