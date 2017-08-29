function HttpInterceptor($q) {
    return {
        request: function(config) {
            return config;
        },
        requestError: function(err) {
            return $q.reject(err);
        },
        response: function(res) {
            if (res.data.code == 1006 && res.data.code) {
                //location.href = 'login.html';
            }
            return res;
        },
        // responseError: function(err){
        //   if(-1 === err.status) {
        //     // 远程服务器无响应
        //   } else if(500 === err.status) {
        //     // 处理各类自定义错误
        //   } else if(501 === err.status) {
        //     // ...
        //   }
        //   return $q.reject(err);
        // }
    }
};
HttpInterceptor.$inject = ['$q'];
export default HttpInterceptor;
