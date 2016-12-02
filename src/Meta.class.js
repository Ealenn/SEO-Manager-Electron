class Meta {
  /**
   * @constructor
   * @param {string} html Header in HTML
   */
  constructor(html) {
    this.html = html;

    this.inPage = function(re, space) {
      if(!space){ space = 'body'; }

      if (this.html.search(re) != -1) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * Open Graph
   * @return {bool} isOpenGraph - If true this site use Open-Graph for social share (Facebook)
   */
  isOpenGraph(){return this.inPage('og:title', 'header');}

  /**
   * Twitter Cards
   * @Return {bool} isTwitterCards - If true this site use Twitter Cards for Twitter share
   */
  isTwitterCards(){return this.inPage('twitter:card', 'header');}

  /**
   * Title And Description
   * @param {obj} JSON {title, keywords, description, (Elements)meta, (Elements)links, (HTMLCollection)openGraph, (Bool)schema}
   */
  AnalyseHeader(callback){
    var jsdom = require("jsdom");

    jsdom.env(this.html, function (err, window) {
      var R = {};

      R.title = window.document.getElementsByTagName("title")[0].innerHTML;
      R.meta = window.document.getElementsByTagName("meta");
      R.links = window.document.getElementsByTagName("link");

      /* Function Filter */
      var filterMeta = function(attribute, contains){
        var array = [];
        for (var i = 0; i < R.meta.length; i++) {
          var buff = R.meta[i].getAttribute(attribute);
          if(buff){
            if (buff.indexOf(contains) !== -1) {
              var title = R.meta[i].name;
              if(!title){
                title = R.meta[i].attributes[0].nodeValue;
              }

              array.push({
                name:title,
                content:R.meta[i].content
              });
            }
          }
        }
        return array;
      }

      /* OpenGraph */
      R.openGraph = filterMeta('property', 'og:');

      /* Schema */
      R.schema = false;
      var sh = this.html.indexOf('itemtype="http://schema.org');
      if(sh !== -1){R.schema = true;}

      /* Keyword and Description */
      for (var i = 0; i < R.meta.length; i++) {
        var buff = R.meta[i];

        if(buff.name == 'keywords'){
          R.keywords = buff.content;
        }

        if(buff.name == 'description'){
          R.description = buff.content;
        }
      }

      callback(R);
    });
  }
}

module.exports = Meta;
