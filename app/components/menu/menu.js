let menu = ($scope,$state) => {
    $scope.$state = $state;
    $scope.$watch('$state.current.name', function(newValue, oldValue) {
        $state.curRouter = newValue.split('/')[0];
        console.log($state.curRouter);
    });
};
export default menu;