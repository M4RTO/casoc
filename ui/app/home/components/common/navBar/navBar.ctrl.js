/**
 * Created by julian on 25/07/16.
 */
'use strict';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class navBarCtrl extends Saveable{

    /*@ngInject*/
    constructor($injector, $state,OAuth,RoleService,$cookies) {

        super(
            {
                injector:$injector,
                endpoint:'operator',
                backToState: ".",
                key:'id',
                executeGet: true,
                params:$state.params
            }

        );
        // this.cookies = $cookies;
        // this.roleService = RoleService;
        // this.oauth = OAuth;
        // this.getMyRole();
        // this.showLog = false;
        // this.showBT = false;
        // this.showFile = false;
        // this.state = $state;
    }

    // getMyRole(){
    //     if(this.oauth.isAuthenticated()) {
    //         this.roleService.getCurrentUser().then((result) => {
    //             this.dgtal = result.dgtal;
    //             this.cnUser = result.cn;
    //         });
    //     }
    // }
    //
    // goToHome(){
    //     this.roleService.getState();
    // }
    //
    // goToMyFile(){
    //     this.state.go('userAccount',{});
    // }
    //
    // logout(){
    //     this.oauth.logout();
    //     this.getMyRole();
    // }
    //
    // checkRoleButton() {
    //         let role = this.cookies.getObject('role');
    //     if(role != undefined && role.length!=0) {
    //         role.forEach(it => {
    //             if (it.authority === "ADMIN") {
    //                 this.showFile = true;
    //                 this.showLog = true;
    //             } else if (it.authority === "OPERATOR"){
    //                 this.showFile = true;
    //                 this.showLog = false;
    //             }
    //             else{
    //             }
    //         });
    //     }else{
    //         return false;
    //     }
    //
    // }
    //
    // logs(){
    //     this.state.go('adminLog',{})
    // }
    //
    // showGenericAccountBT() {
    //     let role = this.cookies.getObject('role');
    //     if (role != undefined) {
    //         this.showBT = true;
    //     } else {
    //         this.showLog = false;
    //     }
    //
    // }
    //
    // genericAccounts(){
    //     this.state.go('configAccounts',{})
    // }






}