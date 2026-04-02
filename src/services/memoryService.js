const { db } = require('../config/database');

async function getChatHistory(agentId, userId, limit = 10) {
  try {
    const messages = await db('messages')
      .where({ agent_id: agentId, user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(limit);
    
    // Reverse to get chronological order (oldest to newest)
    return messages.reverse().map(m => ({
      role: m.role,
      content: m.content
    }));
  } catch (error) {
    console.error('Memory Service Error:', error);
    return [];
  }
}

async function saveMessage(agentId, userId, role, content, usage = null) {
  try {
    await db('messages').insert({
      agent_id: agentId,
      user_id: userId,
      role: role,
      content: content,
      prompt_tokens: usage ? usage.prompt_tokens : 0,
      completion_tokens: usage ? usage.completion_tokens : 0,
      total_tokens: usage ? usage.total_tokens : 0,
    });
  } catch (error) {
    console.error('Error saving message:', error);
  }
}

module.exports = { getChatHistory, saveMessage };
