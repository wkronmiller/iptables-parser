const fs = require('fs');
const JsDiff = require('diff');

const { parseIptablesDoc, encodeIPTables } = require('../src/index');

const testRules = String(fs.readFileSync('test/test-rule.iptables'));

const parsedRules = parseIptablesDoc(testRules);
const encodedRules = encodeIPTables({ tables: parsedRules });

if(encodedRules.trim() != testRules.trim()) {
  const { added, removed } = JsDiff.diffWords(testRules, encodedRules);
  if(added || removed) {
    throw 'Lines do not match';
  }
}
