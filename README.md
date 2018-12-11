# About

I couldn't find a NodeJS parser for CentOS IPTables configs, so I wrote one.

## Example Usage

### Parsing

```
const fs = require('fs');

const { parseIptablesDoc } = require('@wkronmiller/iptables-parser');

const tables = parseIptablesDoc(String(fs.readFileSync('/etc/sysconfig/iptables')));

{
  "nat": {
    "chains": [
      ":PREROUTING ACCEPT [10446:1172408]",
      ":INPUT ACCEPT [2:128]",
      ":OUTPUT ACCEPT [936796:35582363]",
      ":POSTROUTING ACCEPT [2:100]"
    ],
    "rules": [
      {
        "rule": "-A PREROUTING -p tcp --dport 8080 -m tcp -i enp2s0 -j DNAT --to-destination 10.0.0.2:8080",
        "chain": "PREROUTING",
        "protocol": "tcp",
        "destinationPort": "8080",
        "destinationIp": "10.0.0.2:8080",
        "match": "tcp",
        "jump": "DNAT",
        "inInterface": "enp2s0"
      },
      {
        "rule": "-A POSTROUTING -o enp2s0 -j MASQUERADE",
        "chain": "POSTROUTING",
        "jump": "MASQUERADE",
        "outInterface": "enp2s0"
      }
    ]
  },
  "filter": {
    "chains": [
      ":INPUT DROP [921:224347]",
      ":FORWARD DROP [0:0]",
      ":OUTPUT ACCEPT [565105:269130484]",
      ":LOGGING - [0:0]"
    ],
    "rules": [
      {
        "rule": "-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT",
        "chain": "INPUT",
        "state": "RELATED,ESTABLISHED",
        "jump": "ACCEPT"
      },
      {
        "rule": "-A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT",
        "chain": "FORWARD",
        "state": "RELATED,ESTABLISHED",
        "jump": "ACCEPT"
      },
      {
        "rule": "-A FORWARD -o enp2s0 -j ACCEPT",
        "chain": "FORWARD",
        "jump": "ACCEPT",
        "outInterface": "enp2s0"
      }
    ]
  },
  "mangle": {
    "chains": [
      ":PREROUTING ACCEPT [29954120:21998687750]",
      ":INPUT ACCEPT [13724903:714542939]",
      ":FORWARD ACCEPT [16227934:21283971156]",
      ":OUTPUT ACCEPT [115615848:51845984788]",
      ":POSTROUTING ACCEPT [131843756:73129954576]"
    ],
    "rules": [
      {
        "rule": "-A PREROUTING -p tcp --dport 22 -m tcp -j TOS --set-tos 0x10/0x3f -m comment --comment \"Make ssh faster\"",
        "chain": "PREROUTING",
        "protocol": "tcp",
        "destinationPort": "22",
        "match": "tcp",
        "jump": "TOS",
        "tos": "0x10/0x3f",
        "comment": "\"Make ssh faster\""
      }
    ]
  }
}

```

### Encoding

```

const { encodeIPTables } = require('../src/index');

const tables = {
  "nat": {
    "chains": [
      ":PREROUTING ACCEPT [10446:1172408]",
      ":INPUT ACCEPT [2:128]",
      ":OUTPUT ACCEPT [936796:35582363]",
      ":POSTROUTING ACCEPT [2:100]"
    ],
    "rules": [
      {
        "rule": "-A PREROUTING -p tcp --dport 8080 -m tcp -i enp2s0 -j DNAT --to-destination 10.0.0.2:8080",
        "chain": "PREROUTING",
        "protocol": "tcp",
        "destinationPort": "8080",
        "destinationIp": "10.0.0.2:8080",
        "match": "tcp",
        "jump": "DNAT",
        "inInterface": "enp2s0"
      },
      {
        "rule": "-A POSTROUTING -o enp2s0 -j MASQUERADE",
        "chain": "POSTROUTING",
        "jump": "MASQUERADE",
        "outInterface": "enp2s0"
      }
    ]
  },
  "filter": {
    "chains": [
      ":INPUT DROP [921:224347]",
      ":FORWARD DROP [0:0]",
      ":OUTPUT ACCEPT [565105:269130484]",
      ":LOGGING - [0:0]"
    ],
    "rules": [
      {
        "rule": "-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT",
        "chain": "INPUT",
        "state": "RELATED,ESTABLISHED",
        "jump": "ACCEPT"
      },
      {
        "rule": "-A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT",
        "chain": "FORWARD",
        "state": "RELATED,ESTABLISHED",
        "jump": "ACCEPT"
      },
      {
        "rule": "-A FORWARD -o enp2s0 -j ACCEPT",
        "chain": "FORWARD",
        "jump": "ACCEPT",
        "outInterface": "enp2s0"
      }
    ]
  },
  "mangle": {
    "chains": [
      ":PREROUTING ACCEPT [29954120:21998687750]",
      ":INPUT ACCEPT [13724903:714542939]",
      ":FORWARD ACCEPT [16227934:21283971156]",
      ":OUTPUT ACCEPT [115615848:51845984788]",
      ":POSTROUTING ACCEPT [131843756:73129954576]"
    ],
    "rules": [
      {
        "rule": "-A PREROUTING -p tcp --dport 22 -m tcp -j TOS --set-tos 0x10/0x3f -m comment --comment \"Make ssh faster\"",
        "chain": "PREROUTING",
        "protocol": "tcp",
        "destinationPort": "22",
        "match": "tcp",
        "jump": "TOS",
        "tos": "0x10/0x3f",
        "comment": "\"Make ssh faster\""
      }
    ]
  }
};

encodeIPTables({ tables });

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
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT
-A FORWARD -o enp2s0 -j ACCEPT
COMMIT

*mangle
:PREROUTING ACCEPT [29954120:21998687750]
:INPUT ACCEPT [13724903:714542939]
:FORWARD ACCEPT [16227934:21283971156]
:OUTPUT ACCEPT [115615848:51845984788]
:POSTROUTING ACCEPT [131843756:73129954576]
-A PREROUTING -p tcp --dport 22 -m tcp -j TOS --set-tos 0x10/0x3f -m comment --comment "Make ssh faster"
COMMIT

```
