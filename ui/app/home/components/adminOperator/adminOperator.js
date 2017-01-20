
'use strict';
/**
 * Created by julian on 25/07/16.
 */

import angular from 'angular';
import { AdminOperatorComponent } from './adminOperator.component';
import RoleService from '../../scripts/services/gcba.role.srv';



const adminOperator = angular
    .module('adminOperator', [])
    .component('adminOperatorComponent', AdminOperatorComponent)
    .service('RoleService', RoleService)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('admin', {
                url: '/admin?nameOrMail',
                component: 'adminOperatorComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default adminOperator;