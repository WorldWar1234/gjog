function setOriginHeaders(req, res, next) {
  req.params.originType = req.headers['content-type'] || '';
  const buffer = [];
  res.on('data', (chunk) => buffer.push(chunk));
  res.on('end', () => {
    req.params.originSize = Buffer.concat(buffer).length;
    next();
  });
}

module.exports = setOriginHeaders;
