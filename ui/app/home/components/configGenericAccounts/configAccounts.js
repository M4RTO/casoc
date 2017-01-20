/**
 * Created by julian on 04/08/16.
 */
'use strict';

import angular from 'angular';
import { ConfigAccountsComponent } from './configAccounts.component';
import RoleService from '../../scripts/services/gcba.role.srv';



const configAccounts = angular
    .module('configAccounts', [])
    .component('configAccountsComponent', ConfigAccountsComponent)
    .service('RoleService', RoleService)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('configAccounts', {
                url: '/configAccount',
                component: 'configAccountsComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default configAccounts;  