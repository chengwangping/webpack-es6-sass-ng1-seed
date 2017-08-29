function uiNav($timeout) {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {
            $(el).on('click', 'a', function(e) {
                var _this = $(this);
                _this.parent().siblings( ".active" ).toggleClass('active');
                if(_this.parent().hasClass('active')){
                    _this.find('.pull-right i').removeClass('fa-angle-down').addClass('fa-angle-right');
                }else{
                    _this.find('.pull-right i').removeClass('fa-angle-right').addClass('fa-angle-down');
                };
                _this.next().is('ul') &&
                _this.parent().toggleClass('active') &&  
                e.preventDefault();
                // mobile
               // _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
            });
        }
    }
};
export default uiNav;