/**
 * Created by julian on 04/08/16.
 */
'use strict';

import angular from 'angular';
import { PasswordComponent } from './password.component';


const password = angular
    .module('password', [])
    .component('passwordComponent', PasswordComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('password', {
                url: '/password/{hash}',
                component: 'passwordComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default password;