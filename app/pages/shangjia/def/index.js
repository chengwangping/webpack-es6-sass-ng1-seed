'use strict';

import config from '../../../config/config';

import './index.scss';

class defCtrl {
    constructor(service) {
        this.service = service;
        this.init();
       
    }
    init () {
        this.name   = 'hello webpack3';
        this.age= '2';
        this.url    = 'http://www.baidu.com';
        this.toggle = () => {
            alert(20)
        };
        this.service.ajax()

    }
}
class defService {
    constructor($http){
        this.$http = $http;
    }
    ajax () {
        this.$http.get('../../json/index.json', {}).then((rsp) => {
            return rsp;
        })
    }
}

defCtrl.$inject = ['defService'];
defService.$inject = ['$http'];
let app = angular.module('ngApp');
app.controller('defCtrl',defCtrl)
.service('defService', defService);
module.exports = app;