'use strict';

import config from '../../../config/config';

import './index.scss';

class abcCtrl {
    constructor(service) {
        this.service = service;
        this.init();
       
    }
    init () {
        this.name   = 'hello webpack3';
        this.age = '2';
        this.url    = 'http://www.baidu.com';
        this.toggle = () => {
            alert(200)
        };
        this.service.ajax();
    }
}
class abcService {
    constructor($http){
        this.$http = $http;
    }
    ajax () {
        this.$http.get('../../json/index.json', {}).then((rsp) => {
            return rsp;
        })
    }
}

abcCtrl.$inject = ['abcService'];
abcService.$inject = ['$http'];
let app = angular.module('ngApp');
app.controller('abcCtrl',abcCtrl)
.service('abcService', abcService);
module.exports = app;