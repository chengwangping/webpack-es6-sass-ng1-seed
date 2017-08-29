'use strict';

import config from '../../config/config';
import './index.scss';

class indexCtrl {
    constructor(service) {
        this.service = service;
        this.init();
    }
    init () {
        this.name   = 'hello webpack2';
        this.url    = 'http://www.baidu.com';
        this.toggle = () => {
            alert(20)
        };
        this.service.ajax()

    }
}
class indexService {
    constructor($http){
        this.$http = $http;
    }
    ajax () {
        this.$http.get('../../json/index.json', {}).then((rsp) => {
            return rsp;
        });
        //console.log($('.index-page'));
    }
}
indexCtrl.$inject = ['indexService'];
indexService.$inject = ['$http'];
let app = angular.module('ngApp');
app.controller('indexCtrl',indexCtrl)
.service('indexService', indexService);
module.exports = app;