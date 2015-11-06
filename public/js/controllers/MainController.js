appMain.controller('MainController', ['$scope', '$window', 'texts', 'ngDialog', 'SendMessage', function($scope, $window, texts, ngDialog, SendMessage) {
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
    };

    $scope.clickToOpen = function () {
        ngDialog.open({
            template: '/tpl/ngdialog/ngDialog.html',
            plain: false,
            showClose: false,
            cache: true,
            scope: $scope
        });
    };

    $scope.openSecond = function () {
        ngDialog.close();
        ngDialog.open({
            template: '/tpl/ngdialog/ngDialog_second.html',
            plain: false,
            showClose: false,
            cache: true,
            scope: $scope
        });
    };

    $scope.closeDialog = function () {
        ngDialog.close();
    };

    $scope.form_data = {};
    $scope.submitForm = function(isValid) {
        if (isValid) {
            $scope.closeDialog();
            $scope.openSecond();
            console.log($scope.form_data.name);
            console.log($scope.form_data.message);

            SendMessage.SendMsg({
                name: $scope.form_data.name,
                message: $scope.form_data.message
            });
        }
    };
}]);
