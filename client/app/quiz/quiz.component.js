import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './quiz.routes';

export class QuizController {
  $http;
  answers ={};
  correctCount = 0;

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;

  }

  $onInit() {
    // to get quiz data from results API==========
    this.$http.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then(response => {
        this.results = response.data.results;
        for(var i=0;i<this.results.length;i++) {
          var item = this.results[i];
          var answers = this.shuffle(item.incorrect_answers, item.correct_answer);
          item.answers = [];
          for (var j=0;j<answers.length;j++) {
            item.answers.push({ 'answerText': answers[j] })
          }
        }

        console.log(this.results)
      });

  }

  shuffle(array1, array2) {
    return array1.concat(array2).sort(function() {
      return .5 - Math.random();
    });
  }

 showResult(){
    this.correctCount = 0;
    var qLength = this.results.length;
    for(var i=0;i<qLength;i++){
      var answers = this.results[i].answers;
      this.results[i].userAnswerCorrect = false;
      this.results[i].userAnswer = this.answers[i];
      for(var j=0;j<answers.length;j++){
        answers[j].selected = "donno";
        if (this.results[i].correct_answer === this.answers[i] &&  this.results[i].correct_answer === answers[j].answerText){
          this.results[i].userAnswerCorrect = true;
          answers[j].selected = "true";
          this.correctCount++;
        }else if(this.results[i].userAnswer === answers[j].answerText &&  this.results[i].correct_answer !== answers[j].answerText){
          this.results[i].userAnswerCorrect = false;
          answers[j].selected = "false";
        }
      }
    }

    console.log(this.answers);

  };

}

export default angular.module('apphazzApp.quiz', [uiRouter])
  .config(routing)
  .component('quiz', {
    template: require('./quiz.html'),
    controller: QuizController
  })
  .name;
