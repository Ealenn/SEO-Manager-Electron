module.exports = {

  htmlTags: ['p', 'b', 'em', 'title', 'h1', 'h2', 'h3', 'h4'],
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