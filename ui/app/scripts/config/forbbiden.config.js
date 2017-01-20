'use strict';
/**
 * Created by julian on 22/08/16.
 */

function forbbidenConfig($httpProvider) {
    $httpProvider.interceptors.push('forbbidenInterceptor');
}

export default forbbidenConfig;
