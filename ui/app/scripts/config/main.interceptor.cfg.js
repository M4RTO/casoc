'use strict';
/**
 * Created by julian on 26/07/16.
 */
function interceptorTranslateConfig($httpProvider) {

    $httpProvider.interceptors.push('translateInterceptor');
}
export default interceptorTranslateConfig;