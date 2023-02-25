<template>
    <div class="user-container">
        <el-row :gutter="10">
            <el-col :span="21">
                <el-input ref="input" v-model="question" type="textarea" :rows="2"
                    placeholder=" Hi! Say something to Siri's Friend" class="user-textarea" clearable
                    @keyup.native.enter="asking" :disabled="notAllowAsk"></el-input>
            </el-col>
            <el-col :span="3" class="btn-col">
                <el-button type="primary" class="btn" @click="asking">
                    <span>
                        <i class="el-icon-position"></i>
                    </span>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'User',
    data() {
        return {
            // 收集用户输入问题
            question: '',
            // 不允许用户输入问题的标记
            notAllowAsk: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.input.focus()
        })
    },
    watch: {
        notAllowAsk: {
            handler(newVal, oldVal) {
                if (newVal == false) {
                    this.$nextTick(() => {
                        this.$refs.input.focus()
                    })
                }
            }
        }
    },
    methods: {
        // 向AI问话的回调
        asking() {
            const { question } = this
            this.$store.dispatch('chat/chatToAI', question)
            // 清空input
            this.$refs.input.clear()
            // 用户已提问,在AI完成回答之前,禁止用户在输入框再次输入问题提问
            this.notAllowAsk = true
        }
    }
}
</script>

<style scoped>
.user-container {
    width: 100%;
    height: 100%;
    align-items: center;
}

.user-textarea {
    width: 100%;
    margin-left: 20px;
    color: #fff;
    font-size: 18px;

    padding: 10px;
    background: transparent;
    border-radius: 5px;
    border: none;
    outline: none;
}

.btn-col {
    position: relative;
}

.btn {
    position: absolute;
    left: 30px;
    top: 7px;
    outline: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
    vertical-align: middle;
}

.btn span {
    display: inline-block;
    font-size: 50px;
    line-height: 50px;
}
</style>