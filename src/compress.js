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
          res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
          res.setHeader('content-length', info.size);
          res.setHeader('content-encoding', 'identity');
          console.log('Sending response...');
          res.send(output);
        });
    } else {
      return res.redirect(imageUrl);
    }
  });
}

module.exports = compress;
