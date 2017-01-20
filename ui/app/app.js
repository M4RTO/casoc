/*jshint strict:false */
'use strict';

import angular from 'angular';
// import 'giu-module-security/app/scripts/sec.module.js';
import 'angular-resource';
import 'angular-ui-router';
import 'angular-loading-bar';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-messages';
import 'bower:angular-bootstrap@1.3.3';
import TranslateCfg from './scripts/config/main.translate.cfg.js';
import TranslateService from './home/scripts/services/gcba.translate.srv.js';
import translateInterceptor from './home/scripts/interceptors/main.translate.interceptor.js';
import interceptorTranslateConfig from './scripts/config/main.interceptor.cfg.js';
import 'bower:angularjs-toaster@2.0.0';
import 'angular-animate';
import 'module-crud-ui/app/scripts/crud.module.js';
// import RoleService from './home/scripts/services/gcba.role.srv';


import dashboardApiCfg from './scripts/config/dashboard.api.cfg';
import giuOAuthCfg from './scripts/config/med.oauth.cfg.js';
import forbbidenInterceptor from './scripts/config/forbbiden.interceptor.cfg.js';
import forbbidenConfig from './scripts/config/forbbiden.config.js';
import common from './home/components/common/common.js';
import components from './home/components/components.js';
import { AppComponent } from './app.component';

import './templates';

const app = angular.module('cyc-ui.app',
  [
    'ui.router',
      'ngAnimate',
      // 'security.module',
    'crud.module',
    'ui.bootstrap',
    'giu-ui-templates',
    'pascalprecht.translate',
    'angular-loading-bar',
    'ngCookies',
    'ngMessages',
      'toaster',
      components,
    common
  ]);
/* global System, document */

System.import('jquery').then(function () {
  angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {
      // strictDi: trueSegment
    });
  });
});





app
    //.config(mediaroutes())
    .config(dashboardApiCfg())
    .config(giuOAuthCfg())
    .config(TranslateCfg.cfgFactory)
    .config(interceptorTranslateConfig)
    .config(forbbidenConfig)
    .service('translateService', TranslateService)
    // .service('roleService',RoleService)
    .factory('translateInterceptor', translateInterceptor)
    .factory('forbbidenInterceptor', forbbidenInterceptor)
    .component('cycApp', AppComponent);

app.run((OAuthToken, $location,$cookies,api) => {
    // let token = $location.path().substr(1);
    // if(typeof token !== 'undefined' && token !== '' && token.indexOf('access_token')===0 ){
    //     OAuthToken.setToken(token);
    //     api.userRole.get({}).$promise
    //         .then((result)=> {
    //
    //             $cookies.putObject('role', result.principal.authorities)
    //             roleService.getState();
    //
    //         });
    //     window.location.replace(OAuthToken.getLogin().redirect);
    //
    // }
});

export default app;
