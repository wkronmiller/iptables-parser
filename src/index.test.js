const { parseIptablesDoc, encodeIPTables, } = require('./index');

const doc = `
*nat
:PREROUTING ACCEPT [10446:1172408]
:INPUT ACCEPT [2:128]
:OUTPUT ACCEPT [936796:35582363]
:POSTROUTING ACCEPT [2:100]
-A PREROUTING -p tcp --dport 8080 -m tcp -i enp2s0 -j DNAT --to-destination 10.0.0.2:8080
-A POSTROUTING -o enp2s0 -j MASQUERADE
COMMIT

*filter
:INPUT DROP [921:224347]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [565105:269130484]
:LOGGING - [0:0]
:lowercase-chain - [0:0]
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p udp --sport 67:68 --dport 67:68 -m udp -i enp3s0 -j ACCEPT
-A INPUT -p udp -s 10.0.0.0/8 --sport 67:68 --dport 67:68 -m udp -j ACCEPT
-A INPUT -p tcp --dport 22 -m tcp -m state --state NEW -i enp3s0 -j ACCEPT
-A INPUT -p tcp --dport 22 -m tcp -m state --state NEW -i enp3s0.2048 -j ACCEPT
-A INPUT -p tcp --dport 22 -m tcp -m state --state NEW -i enp3s0.666 -j ACCEPT
-A INPUT -p tcp --dport 22 -m tcp -i enp2s0 -j LOGGING
-A INPUT -p tcp --dport 80 -m tcp -i enp2s0 -j LOGGING
-A INPUT -p tcp --dport 443 -m tcp -i enp2s0 -j LOGGING
-A INPUT -p icmp -i enp2s0 -j LOGGING
-A FORWARD -p tcp --dport 8080 -m tcp -i enp2s0 -o enp3s0.2048 -j ACCEPT
-A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT
-A FORWARD -o enp2s0 -j ACCEPT
-A FORWARD -i enp3s0.2048 -o enp3s0 -j ACCEPT
-A FORWARD -d 10.0.0.1/32 -i enp3s0.666 -o enp3s0 -j ACCEPT
-A LOGGING -m limit --limit 1/sec -j LOG --log-prefix "IPTables Blocked: "
-A LOGGING -j DROP
-A lowercase-chain -j DROP
COMMIT

*mangle
:PREROUTING ACCEPT [29954120:21998687750]
:INPUT ACCEPT [13724903:714542939]
:FORWARD ACCEPT [16227934:21283971156]
:OUTPUT ACCEPT [115615848:51845984788]
:POSTROUTING ACCEPT [131843756:73129954576]
-A PREROUTING -p tcp --dport 22 -m tcp -j TOS --set-tos 0x10/0x3f -m comment --comment "Make ssh faster"
COMMIT
`;

test('Parse and re-encode a full IPTables Doc', () => {
  const tables = parseIptablesDoc(doc);
  const encoded = encodeIPTables({ tables });
  expect(doc.trim()).toBe(encoded.trim());
});
