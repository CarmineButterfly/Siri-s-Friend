<template>
    <div :class="isAi ? 'box ai' : 'box user'" ref="box">
        <div class="chat">
            <el-row :gutter="10" class="rows">
                <el-col :span="2">
                    <div class="profile">
                        <i :class="isAi ? 'el-icon-orange' : 'el-icon-user'"></i>
                    </div>
                </el-col>
                <el-col :span="22" class="message-col">
                    <div class="message">{{ formattedMsg }} </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chats',
    props: ['msg', 'isAi'],
    data() {
        return {
            // 临时处理的msg
            tempMsg: '',
            // msg的索引值
            index: 0,
            // 用于实现打字机效果的计时器
            timer: undefined
        }
    },
    mounted() {
        // 开启定时器
        this.timer = setInterval(this.typewriter, 30)
    },
    computed: {
        // 最终渲染至页面的msg
        formattedMsg() {
            // 如果挂载的是AI
            if (this.isAi) {
                // 未打印完全,打印
                if (this.tempMsg.length < this.msg.length) {
                    return this.tempMsg + '|'
                } else {
                    // 已经打印完整,清除计时器
                    clearInterval(this.timer)
                    // 通知User组件,重新允许用户向提问
                    this.$parent.$refs['user'].notAllowAsk = false
                    return this.msg
                }
            } else {
                // 如果挂载的是用户,直接返回msg的信息即可
                return this.msg
            }
        },
    },
    watch: {
        tempMsg: {
            handler(newVal, oldVal) {
                this.$parent.$refs['chat-docker'].scrollTo(0, this.$parent.$refs['chat-docker'].scrollHeight)
            }
        }
    },
    methods: {
        // 打字函数
        typewriter() {
            this.tempMsg += this.msg.charAt(this.index)
            this.index++
        }
    },
}
</script >

<style scoped>
.box {
    width: 100%;
    padding: 15px;
}

.ai {
    background: #40414F;
}

.chat {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
}

.rows {
    width: 100%;
}

.rows .profile {
    width: 56px;
    height: 56px;
    border-radius: 15px;

    background: #ff7f50;

    display: flex;
    justify-content: center;
    align-items: center;
}

.ai .profile {
    background: #10a37f;
}

.profile i {
    display: inline-block;
    color: white;
    line-height: 56px;
    font-size: 50px;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.rows .message-col {
    display: flex;
    justify-content: space-between;
}

.rows .message-col .message {
    color: #dcdcdc;
    font-size: 20px;
    max-width: 100%;
    overflow-x: scroll;
    white-space: pre-wrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
    text-align: left;
}

/* hides scrollbar */
.message::-webkit-scrollbar {
    display: none;
}
</style>