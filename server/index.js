const express = require('express')
var cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json());

const port = 3000

app.post('/', async (req, res) => {

    const input = req.body.input

    await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "system",
                    "content": "Your role is to simplify text (i.e. Reiterate the text in layman's terms). Don't explain it as if you're a median trying to make sense of another person's writing. Explain it as if you're the author of the given input, and you restate what you said in simpler (i.e., layman's) terms."
                },
                {
                    "role": "user",
                    "content": input
                }
            ]
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Completed.")
            const content = data.choices[0].message.content;
            res.json({ "output": content });
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})