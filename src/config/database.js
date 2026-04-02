const knex = require('knex');
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_PATH || './src/config/database.sqlite';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '../../', dbPath)
  },
  useNullAsDefault: true,
});

async function initDb() {
  // Check if tables exist, if not create them
  const hasUsers = await db.schema.hasTable('users');
  if (!hasUsers) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password_hash').notNullable();
      table.timestamp('created_at').defaultTo(db.fn.now());
    });
  }

  const hasAgents = await db.schema.hasTable('agents');
  if (!hasAgents) {
    await db.schema.createTable('agents', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('system_prompt').notNullable();
      table.string('model').defaultTo('gpt-4o-mini');
      table.float('temperature').defaultTo(0.7);
      table.integer('max_tokens').defaultTo(1000);
      table.integer('created_by').references('id').inTable('users');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });
  }

  const hasMessages = await db.schema.hasTable('messages');
  if (!hasMessages) {
    await db.schema.createTable('messages', (table) => {
      table.increments('id').primary();
      table.integer('agent_id').references('id').inTable('agents');
      table.integer('user_id').references('id').inTable('users');
      table.string('role').notNullable(); // user or assistant
      table.text('content').notNullable();
      table.integer('prompt_tokens').defaultTo(0);
      table.integer('completion_tokens').defaultTo(0);
      table.integer('total_tokens').defaultTo(0);
      table.timestamp('created_at').defaultTo(db.fn.now());
    });
  }
}

module.exports = { db, initDb };
