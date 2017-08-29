
import index from './pages/index/router';
import about from './pages/about/router';

import  abc from './pages/shangjia/abc/router';
import  def from './pages/shangjia/def/router';


function router($httpProvider,$stateProvider, $locationProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    $locationProvider.html5Mode(
        { 
            enable:true, 
            requireBase:false
        }
    );
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/index');

    //pages router
    $stateProvider.state(index);
    $stateProvider.state(about);
    
    $stateProvider.state(abc);
    $stateProvider.state(def);

    
};
router.$inject = [
    '$httpProvider', 
    '$stateProvider',
    '$locationProvider', 
    '$urlRouterProvider'
];
export default router;