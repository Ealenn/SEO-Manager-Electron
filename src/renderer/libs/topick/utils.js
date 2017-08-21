import nlp from 'nlp_compromise'
import request from 'superagent-bluebird-promise'
import htmlparser from 'htmlparser2'
import tm from 'text-miner'

export default class Utils {

  // returns a get request wrapped in a promise
  static httpGet(uri) {
    return request.get(uri)
  }

  static httpGetSync(uri) {
    let req = new XMLHttpRequest()
    req.open('GET', uri, false)
    req.send(null)
    return req.status === 200 ? req.responseText : uri
  }

  // parses and extracts text from the html tags supplied in opts
  static parseHtml(rawHtml,opts) {
    let outputString = ""
    let writeFlag = false
    let tags = opts.htmlTags
    let parser = new htmlparser.Parser({

      onopentag: (name, attribs) => {
        if (tags.includes(name)) {
          writeFlag = true
        }
      },
      ontext: (text) =>  {
        if (writeFlag) {
          outputString += ` ${text}`
        }
      },
      onclosetag: (tagname) => {
        writeFlag = false
      }
    }, {decodeEntities: true})

    parser.write(rawHtml)
    parser.end()
    return outputString
  }

  // custom compare function for comparing ngram objects by their count property:
  // [{ word: 'asd', count: 3 }, { word: 'asdf', count: 2 }]
  static compareNGramByCount(a,b) {
    if (a.count < b.count) { return -1 }
    else if (a.count > b.count) { return 1 }
    else { return 0 }
  }

  // this does two things
  // first sort by count
  // then it retrieves the actual word from each ngram object
  // accepts array of NGram objects: [{word: 'adsf', count: 1}, ...]
  // returns array of strings: ['asdf', ...]
  static sortNGrams(ngrams,opts) {
    return ngrams.filter((ngram) => ngram.size <= opts.ngram.max_size).sort(this.compareNGramByCount).map((ngram) => ngram.word)
  }

  // while taking the first n items, ignores duplicates
  // accepts and returns array of strings
  static filterWords(wordArray,opts) {
    let output = []
    for (var i = wordArray.length - 1; i >= 0; i--) {
      let currWord = wordArray[i]
      if (output.length >= opts.maxNumberOfKeywords) { return output }
      if (output.includes(currWord)) { continue }
      if (currWord.length <= opts.minKeywordLength) { continue }
      output.push(currWord)
    }
    return output
  }

  // generates ngrams with settings specified by opts
  static generateNGrams(text,opts) {
    let ngrams = nlp.ngram(text, opts.ngram).reduce((init,curr) => init.concat(curr))
    if ( ngrams.length <= opts.maxNumberOfKeywords && opts.progressiveGeneration && opts.ngram.min_count >= 1 ) {
      opts.ngram.min_count -= 1
      ngrams = this.generateNGrams(text,opts)
    }
    return ngrams
  }

  // identifies named entities using nlp_compromise's spot function
  // returns a single string concatenating all the named entities for further processing using ngrams
  static generateNamedEntitiesString(text) {
    return nlp.spot(text).map((kw) => { return kw.text }).join(" ")
  }

  // this function performs cleaning on the document by:
  // expanding contractions (from i'll to I will)
  // removing inter punctuations (such as ? and !)
  // removing whitespace between words
  // removing stop words using the default stop word dictionary
  // removing custom stop words specified in the user supplied opts
  static clean(text,opts) {
    let c = new tm.Corpus([tm.utils.expandContractions(text)]).removeInterpunctuation().clean()
    if (opts.useDefaultStopWords === true) {
      let stop_words = require("./stop_words").stop_words
      c = c.removeWords(stop_words, 'gi')
    }
    let custom_stop_words = opts.customStopWords
    if (custom_stop_words) {
      c = c.removeWords(custom_stop_words)
    }
    return c.documents[0];
  }


  // given a uri string http://google.com
  // return 'google'
  static getDomainString(uri) {
    let domain;
    // find & remove protocol (http, ftp, etc.) and get domain
    if (uri.indexOf("://") > -1) {
      domain = uri.split('/')[2]
    } else {
      domain = uri.split('/')[0]
    }
    // find & remove port number
    // find and remove TLD
    let splitDomain = domain.split(":")[0].split(".")
    if (splitDomain.length >= 2) {
      return splitDomain[splitDomain.length-2]  
    } else {
      return splitDomain[0]
    }
  }

}