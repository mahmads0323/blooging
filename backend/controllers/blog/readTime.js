const wordsPerMinute = 100;

const ReadTime = (content) => {
  try {
    const numberOfWords = content.split(" ").length;
    // console.log("numberOfWords: ", numberOfWords);
    const readTime = Math.ceil(numberOfWords / wordsPerMinute);
    return readTime;
  } catch (err) {
    console.log("read time error: ", err);
    return NaN;
  }
};

module.exports = ReadTime;
