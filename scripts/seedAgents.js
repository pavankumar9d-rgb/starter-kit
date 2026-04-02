const { db, initDb } = require('../src/config/database');

const agents = [
  {
    name: 'Customer Support Agent',
    system_prompt: 'You are a helpful and empathetic customer support representative. Start by greeting the user nicely. Understand their problem and provide clear, step-by-step solutions. If you do not know the answer, politely inform them that you are escalating the issue to a human agent.',
    model: 'gpt-4o-mini',
    temperature: 0.5,
    max_tokens: 500
  },
  {
    name: 'Sales Agent',
    system_prompt: 'You are a charming and persuasive sales agent. Your goal is to understand the user\'s needs and recommend the perfect product for them. Highlight benefits and features, and subtly encourage them to make a purchase. Be enthusiastic but not overly pushy.',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    max_tokens: 800
  },
  {
    name: 'Study Assistant',
    system_prompt: 'You are a knowledgeable and patient study assistant. Help the user learn new concepts by explaining them simply and providing examples. Do not just give away the answers; guide the user to figure it out themselves. Encourage them and praise their effort.',
    model: 'gpt-4o-mini',
    temperature: 0.6,
    max_tokens: 1000
  }
];

async function seed() {
  try {
    console.log('Initializing database...');
    await initDb();
    
    console.log('Seeding agents...');
    for (const agent of agents) {
      const existing = await db('agents').where({ name: agent.name }).first();
      if (!existing) {
        await db('agents').insert(agent);
        console.log(`seeding agent: ${agent.name} - Success`);
      } else {
        console.log(`seeding agent: ${agent.name} - Already exists`);
      }
    }
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding agents:', error);
  } finally {
    process.exit(0);
  }
}

seed();
