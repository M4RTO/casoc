'use strict';
/**
 * Created by julian on 25/07/16.
 */

import angular from 'angular';

import { NavBarComponent } from './navBar/navBar.component';
import { FooterComponent } from './footer/footer.component';
import RoleService from '../../scripts/services/gcba.role.srv';


const common = angular
    .module('app.common', [])
    .component('navBar', NavBarComponent)
    .service('RoleService', RoleService)
    .component('footerCmp', FooterComponent)
    .name;

export default common;