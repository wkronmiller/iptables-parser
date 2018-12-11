# About

I couldn't find a NodeJS parser for CentOS IPTables configs, so I wrote one.

## Example Usage

### Parsing

```
const fs = require('fs');

const { parseIptablesDoc } = require('@wkronmiller/iptables-parser');

const tables = parseIptablesDoc(String(fs.readFileSync('/etc/sysconfig/iptables')));

/**
{ nat:
   { chains:
      [ ':PREROUTING ACCEPT [10446:1172408]',
        ':INPUT ACCEPT [2:128]',
        ':OUTPUT ACCEPT [936796:35582363]',
        ':POSTROUTING ACCEPT [2:100]' ],
     rules: [ [Object], [Object] ] },
  filter:
   { chains:
      [ ':INPUT DROP [921:224347]',
        ':FORWARD DROP [0:0]',
        ':OUTPUT ACCEPT [565105:269130484]',
        ':LOGGING - [0:0]' ],
     rules:
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ] },
  mangle:
   { chains:
      [ ':PREROUTING ACCEPT [29954120:21998687750]',
        ':INPUT ACCEPT [13724903:714542939]',
        ':FORWARD ACCEPT [16227934:21283971156]',
        ':OUTPUT ACCEPT [115615848:51845984788]',
        ':POSTROUTING ACCEPT [131843756:73129954576]' ],
     rules: [ [Object] ] } }
*/

```
