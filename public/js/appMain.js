var appMain = angular.module('Main', []);

appMain.factory('texts', ['$http', function($http) {
    var GetLanguageText = {};
    GetLanguageText.getText = function(lang) {
        var TextLang = {};
        $http.get('texts.json').then(function(resp) {
            angular.forEach(resp.data[lang], function(value, key) {
                TextLang[key] = value;
            });
        });
        return TextLang;
    };
    return GetLanguageText;
}]);