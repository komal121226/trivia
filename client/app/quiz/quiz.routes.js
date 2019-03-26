'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('quiz', {
    url: '/quiz',
    template: '<quiz></quiz>'
  });
}
