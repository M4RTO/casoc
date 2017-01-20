/**
 * Created by julian on 04/08/16.
 */
'use strict';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class userAccountCtrl extends Saveable{
    /*@ngInject*/
    constructor($injector, $state,$uibModal,RoleService) {
        super(
            {
                injector:$injector,
                endpoint: "operator",
                backToState: ".",
                key:'id',
                executeGet: false,
                params:$state.params
            }
        );
        this.roleService = RoleService;
        this.getMyRole();
        this.newPassword = true;
        this.newPasswordCheck = {};
        this.uibModal = $uibModal;
    }

    getMyRole(){
        this.roleService.getCurrentUser().then((result) => {
            this.dgtal = result.dgtal;
            this.cnUser = result.cn;
            this.entity = result;
            this.dgtal = this.cutBaseDn(result.dgtal);
            //this.roleService.getState();
        });
        return this.response;
    }


    cutBaseDn(string) {
        var res = string.split(',');
        let ou = res[0];
        var def = ou.split('=');
        let nuevares = def[1];
        return nuevares;
    }

    _isNew() {
        let id = this.$state.params[this.key];
        return id === '' || typeof id === 'undefined';
    }

    updateUser(form){
        this.$state.params.id = this.entity.employeeID;
        this.params.id = this.entity.employeeID;
        this.save(form).then( () => {
            this.openModal();
            this.$state.go("principal",{});
        },(error)=> {
            if(error.status == 400){
               this.oldPassword = true;
                this.newPassword = true;
                this.ero = false;

            }else if(error.status == 409){
                this.ero = true;
                this.oldPassword = false;
                this.newPassword = true;

            }else if(error.status == 406){
                this.newPassword = false;
                this.ero = false;
                this.oldPassword = false;


            }
        });
    }

    openModal(){
        let self = this;
        let modalInstance = this.uibModal.open({
            animation: true,
            templateUrl: 'home/views/partials/modal.config.user.html',
            size: 'sm'
        });
    }
}