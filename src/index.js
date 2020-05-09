const { parseTable } = require('./parse-table');
const { encodeTable } = require('./encode-table');

/**
 * Parse IPTables config file (e.g. /etc/sysconfig/network/iptables)
 */
function parseIptablesDoc(doc) {
  const startTableRules = doc.indexOf('*');
  return doc.substring(startTableRules).split('*')
    .map(block => block.trim())
    .filter(block => block.length > 0)
    .map(parseTable)
    .reduce((obj, { name, ...rest }) => {
      obj[name] = rest;
      return obj;
    }, {});
}

/**
 * Convert Javascript object to IPTables config file string. Meant to be mirror image of parseIptablesDoc
 */
function encodeIPTables({ tables }) {
  return `${Object.keys(tables).map(table => encodeTable(Object.assign({ table }, tables[table]))).join('\n\n')}\n`; // newline required!
}

module.exports = { parseIptablesDoc, encodeIPTables };
