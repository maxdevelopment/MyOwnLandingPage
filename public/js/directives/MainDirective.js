appMain.directive('mainScreen', function() {
    return {
        restrict: 'E',
        scope: {
            txt: '='
        },
        templateUrl: 'tpl/mainScreen.html'
    };
});
