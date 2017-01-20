'use strict';
/**
 * Created by julian on 25/07/16.
 */

import angular from 'angular';
import { PrincipalComponent } from './principal.component';


const principal = angular
    .module('principal', [])
    .component('principalComponent', PrincipalComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('principal', {
                url: '/',
                component: 'principalComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default principal;