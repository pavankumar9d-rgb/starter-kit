const agentService = require('../services/agentService');

async function getAgents(req, res) {
  try {
    const agents = await agentService.getAllAgents();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
}

async function createAgent(req, res) {
  try {
    const agent = await agentService.createAgent({
      ...req.body,
      created_by: req.user.userId
    });
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create agent' });
  }
}

async function updateAgent(req, res) {
  try {
    const agent = await agentService.updateAgent(req.params.id, req.body);
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update agent' });
  }
}

async function deleteAgent(req, res) {
  try {
    await agentService.deleteAgent(req.params.id);
    res.json({ message: 'Agent deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete agent' });
  }
}

module.exports = { getAgents, createAgent, updateAgent, deleteAgent };
