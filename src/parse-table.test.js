const { parseTable } = require('./parse-table');

test('Parse a NAT table', () => {
  const table = `
  nat
  :PREROUTING ACCEPT [10446:1172408]
  :INPUT ACCEPT [2:128]
  :OUTPUT ACCEPT [936796:35582363]
  :POSTROUTING ACCEPT [2:100]
  -A PREROUTING -p tcp --dport 8080 -m tcp -i enp2s0 -j DNAT --to-destination 10.0.0.2:8080
  -A POSTROUTING -o enp2s0 -j MASQUERADE
  COMMIT
  `;

  const { name, chains, rules } = parseTable(table);
  expect(name).toBe('nat');

  expect(rules).toStrictEqual([
    {
      rule: '-A PREROUTING -p tcp --dport 8080 -m tcp -i enp2s0 -j DNAT --to-destination 10.0.0.2:8080',
      chain: 'PREROUTING',
      protocol: 'tcp',
      source: undefined,
      sourcePort: undefined,
      destination: undefined,
      destinationPort: '8080',
      destinationIp: '10.0.0.2:8080',
      match: 'tcp',
      state: undefined,
      jump: 'DNAT',
      goto: undefined,
      inInterface: 'enp2s0',
      outInterface: undefined,
      limit: undefined,
      logPrefix: undefined,
      tos: undefined,
      comment: undefined
    },
    {
      rule: '-A POSTROUTING -o enp2s0 -j MASQUERADE',
      chain: 'POSTROUTING',
      protocol: undefined,
      source: undefined,
      sourcePort: undefined,
      destination: undefined,
      destinationPort: undefined,
      destinationIp: undefined,
      match: undefined,
      state: undefined,
      jump: 'MASQUERADE',
      goto: undefined,
      inInterface: undefined,
      outInterface: 'enp2s0',
      limit: undefined,
      logPrefix: undefined,
      tos: undefined,
      comment: undefined
    }
  ]);

  expect(chains).toStrictEqual([
    ':PREROUTING ACCEPT [10446:1172408]',
    ':INPUT ACCEPT [2:128]',
    ':OUTPUT ACCEPT [936796:35582363]',
    ':POSTROUTING ACCEPT [2:100]'
  ]);
});
