/** Template */
class Template{
  constructor(ProgressBar) {
    this.ArrayTemplates = [];
    this.ProgressBar = ProgressBar;
  }

  /**
   * Render template
   * @param {string} name Name of template (name -template)
   * @param {json} data Handlebars data
   */
  renderTemplate(name, data){
    this.ArrayTemplates.push(name);
    var template = Handlebars.compile($("#" + name + "-template").html());
    var html = template(data);
    $('#' + name).html(html);
  }

  /**
   * Finish task
   * @param {string} name Name of template (name -template)
   * @param {json} data Handlebars data
   */
  finishTask(name, data){
    this.renderTemplate(name, data);
    this.ProgressBar.finishStep(name);
  }

  /**
   * Add template
   * @param {string} name Name of template (name -template)
   * @param {function} callback
   */
  addTask(name, callback){
    this.ProgressBar.startStep(name);
    callback();
  }

  /**
   * Clean all template + progress bar
   */
  clean(){
    this.ArrayTemplates.forEach(function(element) {
      $("#" + element).html(' ');
    });
    this.ProgressBar.clean();
  }
}

module.exports = Template;
