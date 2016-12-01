class Body {
  /**
   * @constructor
   * @param {string} html Body in HTML
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
   * @param {string} balise - HTML Balise (ex: h1 | h2 | b)
   * @Return {int} nbOfBalise - Count balise
   */
  countBalise(balise){
    return (this.html.match(new RegExp('<'+balise, "g")) || []).length;
  }
}

module.exports = Body;
