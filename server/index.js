const express = require('express')
const OpenAI = require('openai')

// const { ElevenLabsClient } = require("elevenlabs");



var cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json());

const port = 3000

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// const elevenlabs = new ElevenLabsClient({
//     apiKey: process.env.ELEVENLABS_API_KEY
// })

app.post('/', async (req, res) => {

    const input = req.body.input

    const CHARACTERS = 5000
    const TOKENS = CHARACTERS * 0.25

    const chatResponse = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "Your role is to simplify text (i.e. Reiterate the text in layman's terms). Don't explain it as if you're a median trying to make sense of another person's writing. Explain it as if you're the author of the given input, and you restate what you said in simpler (i.e., layman's) terms."
            },
            {
                role: "user",
                content: input
            }
        ],
        max_tokens: TOKENS,
        model: "gpt-4o-mini",
    });

    const content = chatResponse.choices[0].message.content

    // const voiceResponse = await elevenlabs.generate({
    //     voice: 'Brian',
    //     text: content,
    //     model_id: 'eleven_turbo_v2'

    // })

    res.json({
        "output": content,
        // "audio": voiceResponse,
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})