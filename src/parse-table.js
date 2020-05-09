const { parseRule } = require('./parse-rule');

/**
 * Parse a single table (e.g. nat) for IPTables
 */
function parseTable(table) {
  const [name, ...body] = table.split('\n')
  // No # comments pls! Use -m comment --comment
    .filter(line => line.indexOf('#') !== 0)
    .map(lines => lines.trim());
  const chains = body.filter(line => line.indexOf(':') === 0);
  const rules = body.filter(line => line.indexOf('-A') === 0)
    .map(parseRule);
  return { name, chains, rules };
}

module.exports = { parseTable };
