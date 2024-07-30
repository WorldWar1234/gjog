function copyHeaders(source, target) {
  if (source.headers) {
    for (const [key, value] of Object.entries(source.headers)) {
      try {
        target.setHeader(key, value);
      } catch (e) {
        console.log(e.message);
      }
    }
  } else {
    console.log('Source headers are null or undefined');
  }
}

module.exports = copyHeaders;
