// src/openaiService.js
import axios from 'axios';

const API_KEY = 'sk-proj-9cmpsQINEdLbc2pauaxFT3BlbkFJRTXGGV5l26hVNBKCquL0'; // Replace with your OpenAI API key
const API_URL = 'https://api.openai.com/v1/completions'; // OpenAI endpoint

export const getOpenAIResponse = async (prompt) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: 'gpt-3.5-turbo', // You can choose a different model if you prefer
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );
 console.log(response.data);
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching data from OpenAI:', error);
        throw new Error('Failed to fetch response from OpenAI');
    }
};
