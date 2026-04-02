const { db } = require('../config/database');

async function getAllAgents() {
  return await db('agents').select('*');
}

async function getAgentById(id) {
  return await db('agents').where({ id }).first();
}

async function createAgent(agentData) {
  const [id] = await db('agents').insert(agentData);
  return await getAgentById(id);
}

async function updateAgent(id, agentData) {
  await db('agents').where({ id }).update(agentData);
  return await getAgentById(id);
}

async function deleteAgent(id) {
  return await db('agents').where({ id }).del();
}

module.exports = { getAllAgents, getAgentById, createAgent, updateAgent, deleteAgent };
