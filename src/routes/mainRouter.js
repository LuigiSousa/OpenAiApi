const express = require('express')

const router = express.Router()

const dotenv = require('dotenv')
dotenv.config()

const data = [] // Could be saved in a database

const key = process.env.openAiKey

const OpenAi = require('openai')

const client = new OpenAi({
    apiKey: key
})

router.get('/', (req, res) => {
    console.log('GET: /post')
    res.send('Use method post to use ai')
})

router.post('/', async (req, res) => {
    const prompt = req.body.prompt
    data.push(prompt) 
    const dataString = data.join(', ') 
    console.log(dataString)
    
    const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": dataString
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens: 100,
    })

    console.log("POST: /post")
    res.send(response.choices[0].message.content)
})

module.exports = router