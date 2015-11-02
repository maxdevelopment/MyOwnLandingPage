var appNotesList = angular.module('NotesList', ['ngResource', 'ngRoute']);

appNotesList.factory('Notes', ['$resource', function($resource) {
    return $resource('/api/notes/:noteId/:clientId', {}, {
        'all' : {method: 'GET', isArray: true},
        'save': {method:'POST', isArray: true},
        'remove' : {method: 'DELETE', params: {noteId: '@id', clientId: '@client'}, isArray: true},
        'update' : {method: 'PUT', isArray: false}
    });
}]);