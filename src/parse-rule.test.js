const { parseRule } = require('./parse-rule');

const EmptyRule = {
  rule: undefined,
  chain: undefined,
  protocol: undefined,
  source: undefined,
  sourcePort: undefined,
  destination: undefined,
  destinationPort: undefined,
  destinationIp: undefined,
  match: undefined,
  state: undefined,
  jump: undefined,
  goto: undefined,
  inInterface: undefined,
  outInterface: undefined,
  limit: undefined,
  logPrefix: undefined, 
  tos: undefined,
  comment: undefined,
};

test('Parse catch-all drop rule', () => { 
  const rule = '-A LOGGING -j DROP';
  const parsed = parseRule(rule);
  const expected = Object.assign({}, EmptyRule, { rule, chain: 'LOGGING', jump: 'DROP' });
  expect(parsed).toStrictEqual(expected);
});

test('Parse prerouting TOS rule', () => {
  const rule = '-A PREROUTING -p tcp --dport 22 -m tcp -j TOS --set-tos 0x10/0x3f -m comment --comment "Make ssh faster"'
  const parsed = parseRule(rule);
  const expected = Object.assign({}, EmptyRule, {
    rule,
    chain: 'PREROUTING',
    protocol: 'tcp',
    match: 'tcp',
    destinationPort: '22',
    jump: 'TOS',
    tos: '0x10/0x3f',
    comment: 'Make ssh faster',
  });

  expect(parsed).toStrictEqual(expected);
});

test('Parse logging rule', () => {
  const rule = '-A LOGGING -m limit --limit 1/sec -j LOG --log-prefix "IPTables Blocked: "';
  const parsed = parseRule(rule);
  const expected = Object.assign({}, EmptyRule, {
    rule,
    chain: 'LOGGING',
    limit: '1/sec',
    jump: 'LOG',
    logPrefix: 'IPTables Blocked: ',
  });

  expect(parsed).toStrictEqual(expected);
});

test('Parse a chain with special characters in the name', () => {
  const rule = '-A strange-cha1n-name -j DROP';
  const parsed = parseRule(rule);
  const expected = Object.assign({}, EmptyRule, { 
    rule, 
    chain: 'strange-cha1n-name', 
    jump: 'DROP',
  });
  expect(parsed).toStrictEqual(expected);
});
