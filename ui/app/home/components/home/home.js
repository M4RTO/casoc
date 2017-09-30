
'use strict';

import angular from 'angular';
import { HomeComponent } from './home.component';
import PageNavigator from '../../scripts/directives/page.navigator.dir.js';
// import RoleService from '../../scripts/services/gcba.role.srv';





const home = angular
    .module('home', [])
    .component('homeComponent', HomeComponent)
    .directive('pageNavigator', PageNavigator.directiveFactory)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('home', {
                url: '/',
                component: 'homeComponent'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default home;