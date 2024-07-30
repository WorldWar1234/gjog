const sharp = require('sharp');
const shouldCompress = require('./shouldCompress');
const setOriginHeaders = require('./setOriginHeaders');

function compress(req, res, imageUrl) {
  setOriginHeaders(req, res, () => {
    if (shouldCompress(req)) {
      sharp(imageUrl)
        .grayscale(req.params.grayscale)
        .toFormat(req.params.webp ? 'webp' : 'jpeg', {
          quality: req.params.quality,
          progressive: true,
          optimizeScans: true
        })
        .toBuffer((err, output, info) => {
          if (err) {
            console.error(err);
            return res.status(500).end();
          }
          console.log('Output buffer:', output.length);
          const format = req.params.webp ? 'webp' : 'jpeg';
          res.setHeader('content-type', `image/${format}`);
          res.setHeader('content-length', info.size);
          res.setHeader('content-encoding', 'identity');
          res.setHeader('x-original-size', req.params.originSize);
          res.setHeader('x-bytes-saved', req.params.originSize - info.size);
          console.log('Sending response...');
          res.status(200).send(output);
        });
    } else {
      return res.redirect(imageUrl);
    }
  });
}

module.exports = compress;
