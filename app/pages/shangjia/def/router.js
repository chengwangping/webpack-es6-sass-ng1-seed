let router =  {
    name: 'shangjia/def',
    url: '/shangjia/def',
    template: require('./index.html'),
    controller: 'defCtrl as vm',
    resolve: {
        shims: ["$q", "$ocLazyLoad", function($q, $ocLazyLoad) {
            return $q((resolve) => {
                require.ensure([], () => {
                    // load whole module
                    let module = require('./index.js');
                    $ocLazyLoad.load({ name: module.name });
                    resolve(module.controller);
                });
            });
        }]
    }
};
export default router;