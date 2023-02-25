<template>
    <div class=" box ai">
        <div class="chat">
            <el-row :gutter="10" class="rows">
                <el-col :span="2">
                    <div class="profile">
                        <i class="el-icon-orange"></i>
                    </div>
                </el-col>
                <el-col :span="22" class="message-col">
                    <div class="message" ref="message">{{ dot }}</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: [],
    data() {
        return {
            timer: undefined,
            dot: '.'
        }
    },
    mounted() {
        this.timer = setInterval(this.updateDot, 300)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        // 更新dot
        updateDot() {
            if (this.dot == '....') {
                this.dot = '.'
            } else {
                this.dot += '.'
            }
        }
    }
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