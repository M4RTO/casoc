/**
 * Created by martin on 07/10/16.
 */
'use strict';

export default class RoleService {
    /*@ngInject*/
    constructor(OAuth,$http, api,$cookies,$state) {
        this.oauth = OAuth;
        this.$http = $http;
        this.api = api;
        this.cookies = $cookies;
        this.state = $state;
    }

     getCurrentUser(){
         return this.api.operator.get({}).$promise;
     }

     getState() {
         let role = this.cookies.getObject('role');
         if(role.length === 0){
             this.state.go('userAccount',{});
         }else{
         role.forEach( it => {
             if(it.authority === "ADMIN"){
                 this.state.go('admin',{});
             }
             if(it.authority === "OPERATOR"){
                 this.state.go('users',{});
             }
             if(it.authority === "USER"){
                 this.state.go('userAccount',{});
             }
         });
         }

     }



    //this.$on('this', this.getRolesss);


}
