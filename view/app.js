$(document).ready(function(){

  var ProgressBar = require('./ProgressBar.class.js');
  var PBar = new ProgressBar('ProgressBar', 'progressTitle');

  var Template = require('./Template.class.js');
  var T = new Template(PBar);

  var Website = require('./Website.class.js');

  /* Form */
  $('#form_url').submit(function(event) {
      event.preventDefault();
      T.clean();
      var $inputs = $('#form_url :input');
      var values = {};

      $inputs.each(function() {
          values[this.name] = $(this).val();
      });

      Analyse(values['url']);
  });
  /* End Form */

  /* Website */
  var Analyse = function(url){
      Website.FromUrl(url, (Website) =>{

      /* Metadata */
      T.addTask('metadata', ()=>{
        Website.metaphor((data)=>{
          T.finishTask('metadata', data);

          // OpenGraph
          T.addTask('opengraph',()=>{T.finishTask('opengraph', data);});

          // Wappalyzer
          T.addTask('wappalyzer', ()=>{
            Website.wappalyzer((response)=>{
              var wapp = [];

              $.each(response, function(index, value){
                wapp.push(value);
              });

              T.finishTask('wappalyzer', {wapp:wapp});
            });
          });

          // Picture
          Website.getPicture((obj)=>{
            $('#a_' + obj.type).attr('href', obj.addr);
            $('#img_' + obj.type).attr('src', obj.addr);
          });

        });
      });

      /* Page-speed-insights-report */
      T.addTask('page-speed-insights-report', ()=>{
        Website.w3c_css(function(res){

          Website.PageSpeedInsightsReport((data)=>{
            // Color
            var getColor = (score)=>{var color = 'default';if(score < 40){color = 'danger';} else if(score >= 40 && score <= 60){color = 'warning';} else {color = 'success';}return color;}

            // Score
            var score = {};
            score.speed = data.ruleGroups.SPEED.score;
            score.speedColor = getColor(score.speed);

            score.usability = data.ruleGroups.USABILITY.score;
            score.usabilityColor = getColor(score.usability);

            score.average = Math.round((score.speed + score.usability) / 2);

            // Rule
            var rule = [];
            $.each(data.formattedResults.ruleResults, function( index, value ){
              rule.push(value);
            });

            // Template
            T.finishTask('page-speed-insights-report', {data: data, rule: rule, score: score, color: getColor(score.average)});
          });

        });
      });

      /* Keyword */
      T.addTask('keywords', ()=>{
        var ArrayKeyword = Website.getKeywords();
        T.finishTask('keywords', {key: ArrayKeyword});
      })

      // W3C
      T.addTask('w3c', ()=>{
        Website.w3c('json', function(res){
          if(res.messages[0]){res.Color = 'danger';} else {res.Color = 'success';}
          T.finishTask('w3c', {array_message: res.messages, nb_errors: res.messages.length, color:res.Color});
        });
      });

      // W3C CSS
      T.addTask('w3ccss', ()=>{
        Website.w3c_css(function(res){
          if(res[0]){res.Color = 'danger';} else {res.Color = 'success';}
          T.finishTask('w3ccss',  {errors: res, nb_errors: res.length, color: res.Color});
        });
      });

    });
  }


  // HREF
  var shell = require('electron').shell;$(document).on('click', 'a[href^="http"]', function(event) {event.preventDefault();shell.openExternal(this.href);});
});
