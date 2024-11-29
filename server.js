const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3001;

const API_KEY = 'tpsg-eG5ezeD7M8W2pQ3EfA3YqQ6gjYIaFfp';
const BaseUrl = 'https://api.metisai.ir/openai/v1';

app.use(express.static('public'));
app.use(express.json());

app.post('/extract-content', async (req, res) => {
    const url = req.body.url;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            const content = $('body').text().trim();
            res.json({ content: content.slice(0, 3000) });
        } else {
            res.status(500).json({ error: 'Unable to fetch content' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching content' });
    }
});

app.post('/ask-question', async (req, res) => {
    const { content, question } = req.body;

    if (!content || !question) {
        return res.status(400).json({ error: 'Content and question are required' });
    }

    const systemPrompt = `
    You are a highly intelligent and helpful assistant.
    Your purpose is to respond to user queries **only based on the content provided in the context**.
    - If the query cannot be answered using the context, respond with: "Answer not found".
    - Do not provide answers or opinions beyond the context.
    - Always keep your response concise and relevant to the query.

    <context>
    ${content}
    </context>
  `;

    try {
        const response = await axios.post(`${BaseUrl}/chat/completions`, {
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: question }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const assistantReply = response.data.choices[0].message.content.trim();
        res.json({ answer: assistantReply || 'Answer not found' });

    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




