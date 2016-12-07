/** ProgressBar */
class ProgressBar {
  constructor(idBar, idText) {
    this.id = idBar;
    this.text = idText;
    this.Step = {};
  }

  changeState(){
    var titleCase = require('title-case');
    var html = '';
    var total = 0;
    var nbFinish = 0;

    html += '<ul>';
    $.each(this.Step, function(index, value) {
      var img = 'loading.gif';
      total++;
      if(value == 0){
        nbFinish++;
        img = 'check.png';
      }

      html += '<li>' + titleCase(index) + ' <img src="res/img/' + img + '" height="24" width="24">' + '</li>';
    });
    html += '</ul>';

    var prc = 100 - Math.floor((nbFinish / total) * 100);
    $('#' + this.id).attr('style','width: ' + (100 - prc) + '%');
    $('#' + this.text).html(html);
  }

  /**
   * Start Step
   * @param {string} stepName Name of step
   */
  startStep(stepName){
    this.Step[stepName] = 1;
    this.changeState();
  }

  /**
   * Stop Step
   * @param {string} stepName Name of step
   */
  finishStep(stepName){
    this.Step[stepName] = 0;
    this.changeState();
  }

  /**
   * Clean all step
   */
  clean(){
    $('#ProgressBar').attr('style','width: 0%');
    $('#progressTitle').html('');
  }
}

module.exports = ProgressBar;
