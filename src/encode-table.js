const { encodeRule } = require('./encode-rule');

function encodeTable({ table, chains, rules }) {
  return `*${table}\n${chains.concat(rules.map(encodeRule)).join('\n')}\nCOMMIT`;
}

module.exports = { encodeTable };
