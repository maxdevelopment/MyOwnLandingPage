appMain.directive('topPanel', function() {
    return {
        restrict: 'E',
        scope: {
            top: '='
        },
        templateUrl: 'tpl/topPanel.html'
    };
});

appMain.directive('mainScreen', function() {
    return {
        restrict: 'E',
        scope: {
            txt: '='
        },
        templateUrl: 'tpl/mainScreen.html'
    };
});

appMain.directive('footerScreen', function() {
    return {
        restrict: 'E',
        scope: {
            footer: '='
        },
        templateUrl: 'tpl/footerScreen.html'
    };
});