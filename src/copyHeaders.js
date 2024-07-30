function copyHeaders(source, target, manipulator) {
  if (source.headers) {
    for (const [key, value] of Object.entries(source.headers)) {
      if (manipulator) {
        const manipulatedValue = manipulator(key, value);
        if (manipulatedValue !== undefined) {
          target.setHeader(key, manipulatedValue);
        }
      } else {
        target.setHeader(key, value);
      }
    }
  } else {
    console.log('Source headers are null or undefined');
  }
}

module.exports = copyHeaders;
