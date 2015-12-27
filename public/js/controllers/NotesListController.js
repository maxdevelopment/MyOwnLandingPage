appNotesList.controller('NotesListController', ['$scope', '$routeParams', 'Notes', '$window', function($scope, $routeParams, Notes, $window) {
    $scope.formData = {};

    $scope.addNote = function(isValid) {
        if (isValid) {
            $scope.formData.client = $window.client;
            Notes.save($scope.formData, function(res) {
                $scope.notes = res;
                $scope.formData = {};
                $scope.noteForm.$setPristine(true);
            });
        }
    };
    $scope.deleteNote = function(id) {
        Notes.remove({ noteId: id, clientId: $window.client }, function(res) {
            $scope.notes = res;
            $scope.formData = {};
        });
    };

    $scope.editNote = function(index) {
        $scope.notes[index].view = true;
        $scope.updateMoveLeft = index;
        $scope.updateMoveRight = index;
    };

    $scope.updateNote = function(id, index, msg, isValid) {
        if (isValid) {
            Notes.update({dbId: id, msg: msg}, function(res) {
                $scope.notes[index].view = false;
                $scope.notes[index].text = res.msg;
            });
        }
    };
}]);
