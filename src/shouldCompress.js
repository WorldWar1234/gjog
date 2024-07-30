const MIN_COMPRESS_LENGTH = 512; // Adjust the minimum compress length as desired
const MIN_TRANSPARENT_COMPRESS_LENGTH = MIN_COMPRESS_LENGTH * 100;

function shouldCompress(req) {
  const { originType, originSize, webp } = req.params;

  if (typeof originType !== 'string' || !originType.startsWith('image')) {
    return false;
  }

  if (isNaN(originSize) || originSize === 0) {
    return false;
  }

  if (webp && (isNaN(originSize) || originSize < MIN_COMPRESS_LENGTH)) {
    return false;
  }

  if (!webp && (originType.endsWith('png') || originType.endsWith('gif')) && (isNaN(originSize) || originSize < MIN_TRANSPARENT_COMPRESS_LENGTH)) {
    return false;
  }

  return true;
}

module.exports = shouldCompress;
