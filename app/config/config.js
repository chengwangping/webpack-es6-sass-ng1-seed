window.UEDITOR_HOME_URL = '/js/ueditor/';
var baseUrl = {
   apiPath:'' 
};
var setVisit = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
if (setVisit == "http://10.99.2.140:8080") {
    //开发环境
    baseUrl.apiPath = 'http://10.99.2.140:8080/egg-operate-web/';
} else if (setVisit == "http://10.99.2.142:8080") {
    //测试环境
    baseUrl.apiPath = 'http://10.99.2.142:8080/egg-operate-web/';
} else if (setVisit == "http://10.99.2.147:8082") {
    //测试环境
    baseUrl.apiPath = 'http://172.16.9.147:8082/egg-operate-web/';
} else {
    //本地环境
    baseUrl.apiPath = "http://10.99.2.142:8080/egg-operate-web";
};
baseUrl.imgPath = '';
baseUrl.filePath = '';
export default baseUrl;