'use strict';
/**
 * Created by julian on 25/07/16.
 */

import angular from 'angular';
import { FormUserComponent } from './formUser.component';
import RoleService from '../../scripts/services/gcba.role.srv';



const formUser = angular
    .module('formUser',['angular-loading-bar'])
    .component('formUserComponent', FormUserComponent)
    .service('RoleService', RoleService)
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = true;
    }])
/*    .factory('Hidebar', function($resource) {
    return $resource('/giu-api/operator/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true,
            ignoreLoadingBar: true
        }
    });
})*/

    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('user', {
                url: '/user/:id',
                component: 'formUserComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default formUser;