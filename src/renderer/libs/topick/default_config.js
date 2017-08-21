module.exports = {

  htmlTags: ['p', 'b', 'em', 'title'],
  method: 'combined',
  useDefaultStopWords: true,
  maxNumberOfKeywords: 10,
  minKeywordLength: 3,
  ngram: {
    min_count: 3,
    max_size: 1
  },
  progressiveGeneration: true
}