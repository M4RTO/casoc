'use strict';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class principalCtrl extends Saveable{
    /*@ngInject*/
    constructor($injector, $state, $uibModal, OAuth) {
        super(
            {
                injector: $injector,
                endpoint: 'operator',
                backToState: ".",
                key: 'id',
                executeGet: true,
                params: $state.params
            }
        );
    
        //     this.uibModal = $uibModal;
        //     this.oauth = OAuth;
        //
        //     if(this.oauth.isAuthenticated()) {
        //         this.api.operator.get({});
        //     }
        //     this.response = this.api.userRole.get({});
        //     this.response.$promise.then((result) => {
        //         this.principal = result.principal;
        //         if(!this.principal){
        //             return false;
        //         }
        //         if(this.principal.authorities.length === 0){
        //             this.$state.go('userAccount',{});
        //         }else{
        //             this.principal.authorities.forEach( it => {
        //                 if(it.authority === "ADMIN"){
        //                     this.$state.go('admin',{});
        //                 }
        //                 if(it.authority === "OPERATOR"){
        //                     this.$state.go('users',{});
        //                 }
        //                 if(it.authority === "USER"){
        //                     this.$state.go('userAccount',{});
        //                 }
        //             });
        //         }
        //     });
        //     return this.response;
        // }
    }
}
