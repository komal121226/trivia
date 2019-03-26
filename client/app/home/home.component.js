import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';

export class HomeController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';
  noWrapSlides = false;
  active = 0;
  nopause = false;
  slides = [];
  slidestest;

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });


  this.slides = [
      {
        'image1':'assets/images/01.png',
        'image2':'assets/images/02.png'

      },
      {
        'image1':'assets/images/03.png',
        'image2':'assets/images/04.png'

      }
    ];
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('apphazzApp.home', [uiRouter])
  .config(routing)
  .component('home', {
    template: require('./home.html'),
    controller: HomeController
  })
  .name;
