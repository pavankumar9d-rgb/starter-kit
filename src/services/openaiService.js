const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatCompletion(messages, agentConfig) {
  try {
    const response = await openai.chat.completions.create({
      model: agentConfig.model || 'gpt-4o-mini',
      messages: messages,
      temperature: agentConfig.temperature || 0.7,
      max_tokens: agentConfig.max_tokens || 1000,
    });

    return {
      content: response.choices[0].message.content,
      usage: response.usage,
    };
  } catch (error) {
    console.error('OpenAI Service Error:', error);
    throw error;
  }
}

module.exports = { getChatCompletion };
