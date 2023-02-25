import Vue from 'vue'
import Vuex from 'vuex'

//引入Vuex插件
Vue.use(Vuex)
// 引入chat仓库
import chat from './modules/chat'

export default new Vuex.Store({
    modules: {
        chat 
    }
})