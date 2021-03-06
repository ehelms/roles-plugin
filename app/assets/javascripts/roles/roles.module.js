/**
 Copyright 2014 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

BASTION_MODULES.push('Roles.roles');

/**
 * @ngdoc module
 * @name  Roles.roles
 *
 * @description
 *   Module for roles
 */
angular.module('Roles.roles', [
    'ngResource',
    'alchemy',
    'alch-templates',
    'ui.router',
    'Bastion.widgets'
]);

/**
 * @ngdoc object
 * @name Roles.roles.config
 *
 * @requires $stateProvider
 *
 * @description
 *   Used for roles level configuration such as setting up the ui state machine.
 */
angular.module('Roles.roles').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('roles', {
        abstract: true,
        controller: 'RolesController',
        templateUrl: 'roles/views/roles.html'
    });

    $stateProvider.state('roles.index', {
        url: '/roles',
        views: {
            'table': {
                templateUrl: 'roles/views/roles-table-full.html'
            }
        }
    })
    .state('roles.new', {
        url: '/roles/new',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'roles/views/roles-table-collapsed.html'
            },
            'action-panel': {
                controller: 'NewRoleController',
                templateUrl: 'roles/new/views/role-new.html'
            }
        }
    });

    $stateProvider.state('roles.details', {
        abstract: true,
        url: '/roles/:roleId',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'roles/views/roles-table-collapsed.html'
            },
            'action-panel': {
                controller: 'RoleDetailsController',
                templateUrl: 'roles/details/views/role-details.html'
            }
        }
    })
    .state('roles.details.info', {
        url: '/info',
        collapsed: true,
        templateUrl: 'roles/details/views/role-info.html'
    })
    .state('roles.details.permissions', {
        url: '/permissions',
        collapsed: true,
        controller: 'RoleDetailsPermissionsController',
        templateUrl: 'roles/details/views/role-permissions.html'
    })
    .state('roles.details.permissions.new', {
        url: '/new',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'roles/views/roles-table-collapsed.html'
            },
            'action-panel': {
                controller: 'NewRolePermissionController',
                templateUrl: 'roles/new/views/role-permission-new.html'
            }
        }
    });

    $stateProvider.state('roles.details.users', {
        abstract: true,
        collapsed: true,
        templateUrl: 'roles/details/views/role-users.html'
    })
    .state('roles.details.users.list', {
        url: '/users',
        collapsed: true,
        controller: 'RoleUsersController',
        templateUrl: 'roles/details/views/role-users-table.html'
    })
    .state('roles.details.users.add', {
        url: '/users/add',
        collapsed: true,
        controller: 'RoleAddUsersController',
        templateUrl: 'roles/details/views/role-users-table.html'
    });

    $stateProvider.state('roles.details.user-groups', {
        abstract: true,
        collapsed: true,
        templateUrl: 'roles/details/views/role-user-groups.html'
    })
    .state('roles.details.user-groups.list', {
        url: '/user-groups',
        collapsed: true,
        controller: 'RoleUserGroupsController',
        templateUrl: 'roles/details/views/role-user-groups-table.html'
    })
    .state('roles.details.user-groups.add', {
        url: '/user-groups/add',
        collapsed: true,
        controller: 'RoleAddUserGroupsController',
        templateUrl: 'roles/details/views/role-user-groups-table.html'
    });

    $stateProvider.state("roles.bulk-actions", {
        abstract: true,
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'roles/views/roles-table-collapsed.html'
            },
            'action-panel': {
                controller: 'RolesBulkActionController',
                templateUrl: 'roles/bulk/views/bulk-actions.html'
            }
        }
    })
    .state('roles.bulk-actions.packages', {
        url: '/roles/bulk-actions/apply',
        collapsed: true,
        controller: 'RolesBulkActionApplyController',
        templateUrl: 'roles/bulk/views/bulk-actions-apply.html'
    })
}]);
