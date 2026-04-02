const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, agentController.getAgents);
router.post('/', authenticateToken, agentController.createAgent);
router.put('/:id', authenticateToken, agentController.updateAgent);
router.delete('/:id', authenticateToken, agentController.deleteAgent);

module.exports = router;
