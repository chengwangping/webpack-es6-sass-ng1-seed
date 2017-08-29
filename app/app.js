
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.scss';
import uirouter from '@uirouter/angularjs';
import ocLazyLoad from 'oclazyload';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import pageRouter from './router';
import _ from 'lodash';
import $ from 'jquery';

import 'babel-polyfill';
import './vendor/angular-bootstrap/ui-bootstrap-tpls';
import footer from './components/footer/footer';
import header from './components/header/header';
import menu from './components/menu/menu';
import HttpInterceptor from './httpInterceptor';

//directive
import uiNav from './directive/menu';

let appCtrl = ($rootScope, $scope, $http, $state, $timeout) => {
    footer($scope);
    menu($scope, $state);
    header($scope, $http, $state);
};
let modules = [
    uirouter, 
    ocLazyLoad,
    ngAnimate, 
    ngCookies,
    'ui.bootstrap'
];

window.$ = $;

angular
    .module('ngApp',modules)
    .factory('HttpInterceptor', ['$q', HttpInterceptor])
    .directive('uiNav', ['$timeout',uiNav])
    .config(pageRouter)
    .controller('appCtrl', 
        ['$rootScope','$scope', '$http','$state','$timeout', appCtrl]
    )

export default 'ngApp';
