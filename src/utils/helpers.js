// helpers.js
// General utility helper functions for the Starter Kit

/**
 * Ensures any string is safely escaped to prevent basic XSS or SQL injection hints
 * Note: Knex already handles SQL injection, but this is good for raw text processing.
 */
function escapeString(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Simple delay helper (sleep)
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = { escapeString, sleep };
