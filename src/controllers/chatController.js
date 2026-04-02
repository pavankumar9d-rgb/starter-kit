const agentService = require('../services/agentService');
const memoryService = require('../services/memoryService');
const openaiService = require('../services/openaiService');

async function chat(req, res) {
  try {
    const { agent_id, message } = req.body;
    const userId = req.user.userId;

    if (!agent_id || !message) {
      return res.status(400).json({ error: 'agent_id and message are required' });
    }

    const agent = await agentService.getAgentById(agent_id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // 1. Get memory (limit 10)
    const history = await memoryService.getChatHistory(agent_id, userId);

    // 2. Construct messages for OpenAI
    const messages = [
      { role: 'system', content: agent.system_prompt },
      ...history,
      { role: 'user', content: message }
    ];

    // 3. Call OpenAI
    const aiResponse = await openaiService.getChatCompletion(messages, agent);

    // 4. Save history (User message and AI response)
    await memoryService.saveMessage(agent_id, userId, 'user', message);
    await memoryService.saveMessage(agent_id, userId, 'assistant', aiResponse.content, aiResponse.usage);

    res.json({
      role: 'assistant',
      content: aiResponse.content,
      usage: aiResponse.usage
    });
  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ error: 'AI processing failed', details: error.message });
  }
}

module.exports = { chat };
