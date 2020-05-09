function map2Str(str, elem) {
  if(elem) {
    return `${str} ${elem} `;
  }
  return '';
}

function encodeRule({ 
  chain,
  protocol,
  source,
  sourcePort,
  destination,
  destinationPort,
  destinationIp,
  match,
  state,
  inInterface,
  outInterface,
  limit,
  logPrefix, 
  jump,
  goto,
  tos,
  comment,
}) {
  return map2Str('-A', chain) +
    map2Str('-p', protocol) +
    map2Str('-s', source) +
    map2Str('--sport', sourcePort) +
    map2Str('-d', destination) +
    map2Str('--dport', destinationPort) +
    map2Str('-m', match) +
    map2Str('-m state --state', state) +
    map2Str('-i', inInterface) +
    map2Str('-o', outInterface) +
    map2Str('-m limit --limit', limit) +
    map2Str('-j', jump) +
    map2Str('-g', goto) +
    map2Str('--to-destination', destinationIp) +
    map2Str('--log-prefix', logPrefix) +
    map2Str('--set-tos', tos) +
    map2Str('-m comment --comment', comment)
      .trim();
}

module.exports = { encodeRule };
