const sharp = require('sharp');
const shouldCompress = require('./shouldCompress');

function compress(req, res, imageUrl) {
  if (!shouldCompress(req)) {
    // Redirect to the original image URL without compression
    return res.redirect(imageUrl);
  }

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
      res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
      res.setHeader('content-length', info.size);
      res.status(200).send(output);
    });
}

module.exports = compress;
