appMain.controller('MainController', ['$scope', '$window', 'texts', function($scope, $window, texts) {
    var lang = $window.navigator.language || $window.navigator.userLanguage;

    if (lang === 'en-US' || lang === 'en') {
        $scope.txt = texts.getText('en');
    } else if (lang === 'ru-RU' || lang === 'ru') {
        $scope.txt = texts.getText('ru');
    } else {
        $scope.txt = texts.getText('en');
    }

    $scope.LanguageSwitch = function(lang) {
        $scope.txt = texts.getText(lang);
    }
}]);
