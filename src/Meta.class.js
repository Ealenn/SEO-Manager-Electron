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
   * @param {obj} JSON {title, (Elements)meta, (Elements)links}
   */
  AnalyseHeader(callback){
    var jsdom = require("jsdom");

    jsdom.env(this.html, function (err, window) {
      var R = {};

      R.title = window.document.getElementsByTagName("title")[0].innerHTML;
      R.meta = window.document.getElementsByTagName("meta");
      R.links = window.document.getElementsByTagName("link");

      callback(R);
    });
  }
}

module.exports = Meta;
