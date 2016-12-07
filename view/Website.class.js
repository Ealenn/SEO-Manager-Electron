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

  /**
   * Page Speed Insights Report
   * @param {Requester~requestCallback} callback function(data)
   */
  metaphor(callback){
    const Metaphor = require('Metaphor');
    const engine = new Metaphor.Engine();
    engine.describe(this.url, (description) => {
      callback(description);
    });
  }

  /** KEYWORDS
   * @return {array} JSon https://www.npmjs.com/package/density =
   * [{"word": "world","count": 1},{"word": "hello","count": 2}]
   */
  getKeywords(){
    var density = require('density');
    return density(this.html).getDensity();
  }

  /**
   * Page Speed Insights Report
   * @param {Requester~requestCallback} callback function(data)
   */
  PageSpeedInsightsReport(callback){
    const psi = require('psi');
    psi(this.url).then(data => {
      callback(data);
    });
  }

  /**
   * Google Search
   * @param {Requester~requestCallback} callback function(data)
   */
  googleSearch(callback){
    var google = require('google-tools');

    google.search({
        q: 'site:' + this.url.replace('http://', '').replace('https://', '').replace('www.', '').split('/')[0],
        num: 100
    }, function(err, r) {
        callback(r);
    });
  }

  /**
   * @param {string} output json / html
   * @param {Requester~requestCallback} callback function(res)
   */
  w3c(output, callback){
    var w3cjs = require('w3cjs');
    var results = w3cjs.validate({
        input: this.html,
        output: output,
        callback: callback
    });
  }

  /**
   * @param {Requester~requestCallback} callback function(res)
   */
  w3c_css(callback){
    var validator = require('w3c-css');

    validator.validate(this.url, function(err, data) {
      if(err) {
        console.error(err);
      } else {
        //console.log(data.errors);
        callback(data.errors);

        // validation warnings
        //console.log('validation warnings', data.warnings);
      }

    });
  }

  /**
   * @param {Requester~requestCallback} callback function(err,apps,appInfo)
   */
  wappalyzer(callback){
    var wappalyzer = require("wappalyzer");

    var options={
      url : this.url,
      debug:false
    }

    wappalyzer.detectFromUrl(options,function  (err,apps,appInfo) {
      callback(appInfo);
    })
  }

  /** PICTURES
   * @param {string} URL URL to generate PICTURES
   * @param {Requester~requestCallback} callback function(obj) obj = {type, addr} | type : desktopHD, desktop, microsoftSurface, iphone
   */
  getPicture(callback){
    var Pageres = require('pageres');

    var screenshot = function(url, name, resolution, callback){
      var screen = new Pageres({delay: 2, filename: name, crop: true})
          .src(url, [resolution])
          .dest(__dirname)
          .run()
          .then(() => callback({type: name, addr: __dirname + '/' + name + '.png'}));
    }

    screenshot(this.url, 'desktopHD', '1920x1080', callback);
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
}

module.exports = Website;
