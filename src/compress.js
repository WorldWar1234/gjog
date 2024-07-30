const sharp = require('sharp');
const shouldCompress = require('./shouldCompress');
const copyHeaders = require('./copyHeaders');

function compress(req, res, imageUrl) {
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
        const manipulator = (key, value) => {
          if (key === 'content-type') {
            return `image/${format}`;
          }
          return value;
        };
        copyHeaders(req, res, manipulator);
        res.setHeader('content-length', info.size);
        if (req.params.originSize) {
          res.setHeader('x-original-size', req.params.originSize);
          res.setHeader('x-bytes-saved', req.params.originSize - info.size);
        }
        console.log('Headers:', res.getHeaders());
        console.log('Sending response...');
        res.status(200).send(output);
      });
  } else {
    return res.redirect(imageUrl);
  }
}

module.exports = compress;
