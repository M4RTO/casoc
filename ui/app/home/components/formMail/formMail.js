'use strict';
/**
 * Created by julian on 29/08/16.
 */

import angular from 'angular';
import { FormMailComponent } from './formMail.component';
import RoleService from '../../scripts/services/gcba.role.srv';



const formMail = angular
    .module('formMail', [])
    .component('formMailComponent', FormMailComponent)
    .service('RoleService', RoleService)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('mail', {
                url: '/formMail/:id',
                component: 'formMailComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default formMail;