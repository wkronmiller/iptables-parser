function tryMatch(re, str) {
  const matches = re.exec(str);
  if(!matches) {
    return [];
  }
  return matches;
}

/**
 * Parse a single rule for a chain
 */
function parseRule(rule) {
  const [, chain] = tryMatch(/-A\s([^\s]+)\s/, rule);
  const [, protocol] = tryMatch(/\s-p\s([A-Za-z]+)/, rule);
  const [, source] = tryMatch(/\s-s\s([^\s]+)/, rule);
  const [, sourcePort] = tryMatch(/\s--sport\s([^\s]+)/, rule);
  const [, destination] = tryMatch(/\s-d\s([^\s]+)/, rule);
  const [, destinationPort] = tryMatch(/\s--dport\s([^\s]+)/, rule);
  const [, destinationIp] = tryMatch(/\s--to-destination\s([^\s]+)/, rule);
  const [,match] = tryMatch(/\s-m\s((?!state|comment|limit)[^\s]+)\s/, rule);
  const [, jump] = tryMatch(/\s-j\s([^\s]+)/, rule);
  const [, goto] = tryMatch(/\s-g\s([^\s]+)/, rule);
  const [, inInterface] = tryMatch(/\s-i\s([^\s]+)/, rule);
  const [, outInterface] = tryMatch(/\s-o\s([^\s]+)/, rule);

  const [, state] = tryMatch(/\s-m\sstate\s--state\s([^\s]+)/, rule);

  const [, limit] = tryMatch(/\s-m limit --limit\s([^\s]+)/, rule);
  const [, logPrefix] = tryMatch(/\s--log-prefix\s("[^"]+")/, rule);
  const [, tos] = tryMatch(/\s--set-tos\s([^\s]+)/, rule);
  const [, comment] = tryMatch(/\s-m\scomment\s--comment\s("[^"]+")/, rule);

  return { 
    rule,
    chain,
    protocol,
    source,
    sourcePort,
    destination,
    destinationPort,
    destinationIp,
    match,
    state,
    jump,
    goto,
    inInterface,
    outInterface,
    limit,
    logPrefix, 
    tos,
    comment,
  };
}

module.exports = { parseRule };
