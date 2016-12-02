class ProgressBar {
  constructor(idBar, idText) {
    this.id = idBar;
    this.text = idText;
    this.Step = {};
  }

  changeState(){
    var total = 0;
    var nbFinish = 0;

    $.each(this.Step, function(index, value) {
      total++;
      if(value == 0)
        nbFinish++;
    });

    var prc = 100 - Math.floor((nbFinish / total) * 100);
    $('#' + this.id).attr('style','width: ' + (100 - prc) + '%');
  }

  startStep(stepName){
    $('#' + this.text).html('Start ' + stepName);
    this.Step[stepName] = 1;
    this.changeState();
  }

  finishStep(stepName){
    $('#' + this.text).html('Finish ' + stepName);
    this.Step[stepName] = 0;
    this.changeState();
  }
}
