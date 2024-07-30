const copyHeaders = require('./copyHeaders');

function setOriginHeaders(req, res, next) {
  copyHeaders(res, req); // Call copyHeaders function
  const buffer = [];
  res.on('data', (chunk) => buffer.push(chunk));
  res.on('end', () => {
    req.params.originSize = Buffer.concat(buffer).length;
    next();
  });
}

module.exports = setOriginHeaders;
