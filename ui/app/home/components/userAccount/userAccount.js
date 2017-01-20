/**
 * Created by julian on 04/08/16.
 */
'use strict';

import angular from 'angular';
import { UserAccountComponent } from './userAccount.component';
import RoleService from '../../scripts/services/gcba.role.srv';



const userAccount = angular
    .module('userAccount', [])
    .component('userAccountComponent', UserAccountComponent)
    .service('RoleService', RoleService)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('userAccount', {
                url: '/user/config',
                component: 'userAccountComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default userAccount;