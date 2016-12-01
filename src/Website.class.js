/** Class representing a Website. */
class Website{
  /**
   * @constructor
   * @param {string} html Webpage in HTML
   */
  constructor(html, uri) {
    this.html = html;
    this.url = uri;
  }

  /** KEYWORDS
   * @return {array} JSon https://www.npmjs.com/package/density =
   * [{"word": "world","count": 1},{"word": "hello","count": 2}]
   */
  getKeywords(){
    var density = require('density');
    return density(this.html).getDensity();
  }

  /** PICTURES
   * @param {string} URL URL to generate PICTURES
   * @param {Requester~requestCallback} callback function(obj) obj = {type, addr} | type : iphone or desktop
   */
  getPicture(callback){
    var Pageres = require('pageres');

    var pageres_iphone = new Pageres({delay: 2, filename: 'iphone', crop: true})
        .src(this.url, ['iphone 5s'])
        .dest(__dirname)
        .run()
        .then(() => callback({type: 'iphone', addr: __dirname + '/iphone.png'}));

    var pageres_desktop = new Pageres({delay: 2, filename: 'desktop', crop: true})
        .src(this.url, ['1920x1080'])
        .dest(__dirname)
        .run()
        .then(() => callback({type: 'desktop', addr: __dirname + '/desktop.png'}));
  }

  /** GET WEBSITE FROM URL
   * @param {string} URL URL to create obj Website
   * @param {Requester~requestCallback} callback function(website) : website is instance of Website
   */
  static FromUrl(uri, callback) {
      var request = require("request");

      var options = {
        url: uri,
        headers: {
          'User-Agent': 'request'
        }
      };

      request(options, (err,res,body) => {
        var W = new Website(body, uri);
        callback(W);
      });
    }

    /**
     * @return {Meta} obj Return obj Meta
     */
    getMeta(){
      var Meta = require('./Meta.class.js');
      return new Meta(this.html);
    }

    /**
     * @return {Body} obj Return obj Body
     */
    getBody(){
      var Body = require('./Body.class.js');
      return new Body(this.html);
    }
}

module.exports = Website;
