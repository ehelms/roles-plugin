/**
 * Copyright 2013 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 */

/**
 * @ngdoc object
 * @name  Roles.roles.controller:RoleAddUsersController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Role
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for adding users to a role.
 */
angular.module('Roles.roles').controller('RoleAddUsersController',
    ['$scope', '$q', '$location', 'gettext', 'Role', 'Nutupane',
    function ($scope, $q, $location, gettext, Role, Nutupane) {
        var usersPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true,
            'id':          $scope.$stateParams.roleId
        };

        usersPane = new Nutupane(Role, params, 'availableUsers');
        $scope.usersTable = usersPane.table;

        $scope.addUsers = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                users = _.pluck($scope.role.users, 'id'),
                usersToAdd = _.pluck($scope.usersTable.getSelected(), 'id');

            data = {
                role: {
                    "user_ids": _.union(users, usersToAdd)
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Added %x users to role "%y".')
                    .replace('%x', $scope.usersTable.numSelected).replace('%y', $scope.role.name)];
                $scope.usersTable.working = false;
                $scope.usersTable.selectAll(false);
                usersPane.refresh();
                $scope.role.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors['base'];
                $scope.usersTable.working = false;
            };

            $scope.usersTable.working = true;
            Role.saveUsers({id: $scope.role.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
