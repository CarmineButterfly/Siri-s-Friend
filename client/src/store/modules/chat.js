// 引入接口函数
import {reqChatToAI} from '@/api'
const actions ={
    chatToAI:async (context,question)=>{
        let data = {
            prompt:JSON.stringify(question) 
        }
        // 保存提问
        context.commit('CHATTOAI',question)
        // 请求回答
        try {
            let result = await reqChatToAI(data)
            if(result.status == 200){
                // 收到回答,保存回答
                let answer = result.data.bot
                context.commit('ANSWERFROMAI',answer)
            }
        } catch (error) {
            console.log(error.message)
            // 若ai回答不了,或者请求超时,返回错误结果信息,防止前端bug
            context.commit('ANSWERFROMAI',error.message)
        }
    }
}
const mutations ={
    CHATTOAI:(state,question)=>{
        let data = {
            isAi:false,
            Q:question
        }
        state.message.push(data)
    },
    ANSWERFROMAI:(state,answer)=>{
        // 过滤掉"号
        let str = answer.replace(/\"/g, '') 
        str = str.replace(/\\n/g,'\n ')  //将无效的换行符替换成有效换行符(\n后面加空格)
        str = str.replace(/^\+/,'')
        str = str.replace(/\+ \\n/g,'\n ') //将文中的+号连接替换掉成正常换行
        str = str.trim()  //去除头尾的换行符
        let data = {
            isAi:true,
            A:str
        }
        state.message.push(data)
    },

}
const state ={
    message:[
        // {
            // 回答
            // A:[],
            // 提问
            // Q:[],
        // }    
    ]
}
const getters ={}
export default{
    //开启命名空间
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}