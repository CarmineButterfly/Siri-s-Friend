<template>
    <div class="wrapper">
        <div class="chat-docker" ref="chat-docker">
            <div class="initChat">
                <Chats msg="你好呀!" :isAi="true"></Chats>
            </div>
            <div class="updateChat">
                <div class="chatDialog" v-for="(talk, index) in message" :key="index">
                    <Chats :msg="talk.Q || talk.A" :isAi="talk.isAi"></Chats>
                </div>
                <div class="chatLoading" v-if="msgLength != 0 && msgLength % 2 != 0">
                    <Loading></Loading>
                </div>
            </div>
        </div>
        <div class="user-issue">
            <User ref="user"></User>
        </div>
    </div>
</template>

<script>
import User from '@/components/User'
import Chats from '@/components/Chats'
import Loading from '@/components/Loading'
import { mapState } from 'vuex'
export default {
    name: "Codex",
    components: {
        User,
        Chats,
        Loading
    },
    computed: {
        ...mapState('chat', ['message']),
        msgLength() {
            return this.message.length
        }
    },
    mounted() {
        // 页面（window）完成挂载后滚动至底部
        this.$nextTick(() => {
            window.scrollTo(0, document.body.scrollHeight)
        })
    },
    updated() {
        // 用户提问后，在Vuex中message会更新，页面会挂载新的Chat组件,此时也要chat-docker容器滚动至底部
        this.$nextTick(() => {
            this.$refs['chat-docker'].scrollTo(0, this.$refs['chat-docker'].scrollHeight)
        })
    }
}
</script>

<style scoped>
.wrapper {
    width: 100vw;
    height: 100vh;
    background: #343541;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.chat-docker {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    gap: 10px;

    -ms-overflow-style: none;
    scrollbar-width: none;

    padding-bottom: 20px;
    scroll-behavior: smooth;
}

.chat-docker::-webkit-scrollbar {
    display: none;
}

.user-issue {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px;
    background: #40414F;

    display: flex;
    /* justify-content: space-between; */
    flex-direction: row;
    gap: 10px;
}
</style>