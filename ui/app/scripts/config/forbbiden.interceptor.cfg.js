'use strict';


/**
 * Created by julian on 22/08/16.
 */
function forbbidenInterceptor($q, $state,$cookies) {
    return {
        request: function (config) {
            return config;
        },
        responseError: function (rejection) {
            // Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
            if (403 === rejection.status ){
                let role = $cookies.getObject('role');
                if(role.length === 0){
                    $state.go('userAccount',{});
                }else{
                    role.forEach(it => {
                        if (it.authority === "ADMIN") {
                            $state.go('admin', {});
                        }
                        if (it.authority === "OPERATOR") {
                            $state.go('users', {});
                        }
                        if (it.authority === "USER") {
                            $state.go('userAccount', {});
                        }
                    });
                }
            }

            return $q.reject(rejection);
        }
    };
}

export default forbbidenInterceptor;
