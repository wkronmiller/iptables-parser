# About

I couldn't find a NodeJS parser for CentOS IPTables configs, so I wrote one.

## Example Usage

### Parsing

```
const fs = require('fs');

const { parseIptablesDoc } = require('@wkronmiller/iptables-parser');

const tables = parseIptablesDoc(String(fs.readFileSync('/etc/sysconfig/iptables')));

/**
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
        "rule": "-A INPUT -p udp --sport 67:68 --dport 67:68 -m udp -i enp3s0 -j ACCEPT",
        "chain": "INPUT",
        "protocol": "udp",
        "sourcePort": "67:68",
        "destinationPort": "67:68",
        "match": "udp",
        "jump": "ACCEPT",
        "inInterface": "enp3s0"
      },
      {
        "rule": "-A INPUT -p udp -s 10.0.0.0/8 --sport 67:68 --dport 67:68 -m udp -j ACCEPT",
        "chain": "INPUT",
        "protocol": "udp",
        "source": "10.0.0.0/8",
        "sourcePort": "67:68",
        "destinationPort": "67:68",
        "match": "udp",
        "jump": "ACCEPT"
      },
      {
        "rule": "-A INPUT -p tcp --dport 22 -m tcp -m state --state NEW -i enp3s0 -j ACCEPT",
        "chain": "INPUT",
        "protocol": "tcp",
        "destinationPort": "22",
        "match": "tcp",
        "state": "NEW",
        "jump": "ACCEPT",
        "inInterface": "enp3s0"
      },
      {
        "rule": "-A INPUT -p tcp --dport 22 -m tcp -m state --state NEW -i enp3s0.2048 -j ACCEPT",
        "chain": "INPUT",
        "protocol": "tcp",
        "destinationPort": "22",
        "match": "tcp",
        "state": "NEW",
        "jump": "ACCEPT",
        "inInterface": "enp3s0.2048"
      },
      {
        "rule": "-A INPUT -p tcp --dport 22 -m tcp -m state --state NEW -i enp3s0.666 -j ACCEPT",
        "chain": "INPUT",
        "protocol": "tcp",
        "destinationPort": "22",
        "match": "tcp",
        "state": "NEW",
        "jump": "ACCEPT",
        "inInterface": "enp3s0.666"
      },
      {
        "rule": "-A INPUT -p tcp --dport 22 -m tcp -i enp2s0 -j LOGGING",
        "chain": "INPUT",
        "protocol": "tcp",
        "destinationPort": "22",
        "match": "tcp",
        "jump": "LOGGING",
        "inInterface": "enp2s0"
      },
      {
        "rule": "-A INPUT -p tcp --dport 80 -m tcp -i enp2s0 -j LOGGING",
        "chain": "INPUT",
        "protocol": "tcp",
        "destinationPort": "80",
        "match": "tcp",
        "jump": "LOGGING",
        "inInterface": "enp2s0"
      },
      {
        "rule": "-A INPUT -p tcp --dport 443 -m tcp -i enp2s0 -j LOGGING",
        "chain": "INPUT",
        "protocol": "tcp",
        "destinationPort": "443",
        "match": "tcp",
        "jump": "LOGGING",
        "inInterface": "enp2s0"
      },
      {
        "rule": "-A INPUT -p icmp -i enp2s0 -j LOGGING",
        "chain": "INPUT",
        "protocol": "icmp",
        "jump": "LOGGING",
        "inInterface": "enp2s0"
      },
      {
        "rule": "-A FORWARD -p tcp --dport 8080 -m tcp -i enp2s0 -o enp3s0.2048 -j ACCEPT",
        "chain": "FORWARD",
        "protocol": "tcp",
        "destinationPort": "8080",
        "match": "tcp",
        "jump": "ACCEPT",
        "inInterface": "enp2s0",
        "outInterface": "enp3s0.2048"
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
      },
      {
        "rule": "-A FORWARD -i enp3s0.2048 -o enp3s0 -j ACCEPT",
        "chain": "FORWARD",
        "jump": "ACCEPT",
        "inInterface": "enp3s0.2048",
        "outInterface": "enp3s0"
      },
      {
        "rule": "-A FORWARD -i enp3s0.666 -o enp3s0 -j ACCEPT",
        "chain": "FORWARD",
        "jump": "ACCEPT",
        "inInterface": "enp3s0.666",
        "outInterface": "enp3s0"
      },
      {
        "rule": "-A LOGGING -m limit --limit 1/sec -j LOG --log-prefix \"IPTables Blocked: \"",
        "chain": "LOGGING",
        "jump": "LOG",
        "limit": "1/sec",
        "logPrefix": "\"IPTables Blocked: \""
      },
      {
        "rule": "-A LOGGING -j DROP",
        "chain": "LOGGING",
        "jump": "DROP"
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
*/

```
