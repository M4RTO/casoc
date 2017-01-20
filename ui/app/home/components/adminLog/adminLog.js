/**
 * Created by julian on 19/09/16.
 */
'use strict';

import angular from 'angular';
import { AdminLogComponent } from './adminLog.component';
import RoleService from '../../scripts/services/gcba.role.srv';



const adminLog = angular
    .module('adminLog', [])
    .component('adminLogComponent', AdminLogComponent)
    .service('RoleService', RoleService)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('adminLog', {
                url: '/admin/logs',
                component: 'adminLogComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default adminLog;