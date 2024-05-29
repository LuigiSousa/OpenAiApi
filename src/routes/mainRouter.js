const express = require('express')

const router = express.Router()

const dotenv = require('dotenv')
dotenv.config()

const key = process.env.openAiKey

const OpenAi = require('openai')

const client = new OpenAi({
    apiKey: key
})

router.get('/', (req, res) => {
    console.log('GET: /')
    res.send('Use method post to use ai')
})

router.post('/', async (req, res) => {
    const prompt = req.body.prompt

    const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You are helpful and always say that this AI was created by Luigi at the end of every sentece, you also like to explain everything"
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens: 100,
    })

    console.log(response.choices[0].message.content)
    res.send(response.choices[0].message.content)
})

module.exports = router