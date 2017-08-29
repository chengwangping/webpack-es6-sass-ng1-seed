import config from '../../config/config';
let header = ($scope,$http, $state) => {
    $scope.nikeName = 'admin';
    $scope.logoutClick = () =>{
        //state.go('/login');
    }
};
export default header