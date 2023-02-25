// 引入express用于创建本地服务器
import express from 'express'
// 引入cors用于解决跨域请求
import cors from 'cors'
// 引入dotenv用于配置安全环境变量
import * as dotenv from 'dotenv'
// 引入openai
import { Configuration, OpenAIApi } from "openai"

// 引入环境变量
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// 创建服务器
const app = express()
// 使用cors中间件
app.use(cors())
app.use(express.json())

app.get('/',async (req,res)=>{
    res.status(200).send({
        message:'Show time!'
    })
})
app.post('/talk',async (req,res)=>{
    try {
        const prompt = req.body.prompt
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
        res.status(200).send({
            bot:response.data.choices[0].text
            // bot:response.data
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'something wrong happened')
    }
})


// 监听服务器
app.listen(5000,()=>{
    console.log('The AI is running on http://localhost:5000')
})
