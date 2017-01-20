
'use strict';
/**
 * Created by julian on 29/08/16.
 */
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';
import ModalConfirmController from '../modalConfirm/modalConfirm.ctrl';
export default class formMail extends Saveable{
    /*@ngInject*/
    constructor($injector, $state, $uibModal,toaster,RoleService) {
        super(
            {
                injector:$injector,
                endpoint:'genericAccount',
                backToState: ".",
                key:'id',
                executeGet: false,
                params:$state.params,
                entityDependencies: [
                    {api: 'mailDomain', loading: 'isLoading', model: 'mailDomain'}
                ]
            }
        );
        this.roleService = RoleService;
        this.getMyRole();
        this.entity = {};
        this.uibModal = $uibModal;
        this.otherMail = {};
        this.isMailExist = true;
        this.hasDataLdap = true;
        this.getMailDomain();
        this.userExists = true;
        this.userIsInDealings = true;
        this.isNewMial = true;
        this.isNew = true;
        if(!this._isNew()){
            this.isNewMial = false;
            this.get().$promise.then(
                (result)=> {
                    if(this.entity.dgtal){
                        this.dgtal = this.cutBaseDn(this.entity.dgtal);
                        this.otherMail.domain = "@" + result.mail.split("@")[1];
                    }
                    if(!this.entity.alternativeMail || this.entity.alternativeMail === ' '){
                        this.isNew = true;
                        this.dgtal = undefined;
                        this.hasDataLdap = false;
                    }else {
                        this.isNew = false;
                        this.haveRegisterUser = true;
                        this.hasDataLdap = true;
                    }
                });
        }
        

    }

    getMyRole(){
        this.roleService.getCurrentUser().then((result) => {
        });

    }

    _isNew() {
        let id = this.$state.params[this.key];
       /* console.log(this.entity.alternativeMail);*/
        return id === '' || typeof id === 'undefined';
    }

    cancel(){
        this.$state.go("users",{});
    }


    showTitle(){
        if (!this._isNew()){
            return "Modificacion de Correo";
        }
        else {
            return "Alta de Correo";
        }
    }

    verifyUser(){
        if (!this.entity.sAMAccountName){
            this.existUser =  false;
            this.msgError = false;
            return false;
        }

        this.response = this.api.genericAccount.get({'id':this.entity.sAMAccountName});
        this.response.$promise.then((result) => {
            if (result.message === 'Entity not found'){
                this.isMailExist =  false;
                this.msgError = false;
            }else{
                this.entity = result;
                this.isMailExist =  true;
                this.msgError = true;
            }
        });
        return this.response;
    }



    getMailDomain(){
        this.response = this.api.mailDomain.get();
        this.response.$promise.then((result) => {
            this.mailDomain = result.list;
        });
        return this.response;
    }

    validMail(){
        if (!this.entity.sAMAccountName || !this.otherMail.domain){
            return false;
        }
        this.entity.mail = this.entity.sAMAccountName +this.otherMail.domain;
        this.response = this.api.mail.get({mail:this.entity.mail});
        this.response.$promise.then((result) => {
            if (result){
                this.isMailExist =  false;
                /*this.cleanFields();*/
            }else{
                this.isMailExist =  true;
                if(result.employeeID){
                    this.getUser(result.employeeID);
                }
            }
        });
        return this.response;
    }

    getUserByMail(){
        if(!this.entity.alternativeMail || this.entity.alternativeMail === ' '){
            this.msgError = false;
            return false;
        }
        this.userExists = true;
        this.userIsInDealings = true;
  /*      this.userResponse = this.api.physicalDelivery.get({physicalDelivery:this.entity.alternativeMail});*/
          this.userResponse = this.api.userPrincipal.get({userPrincipal:this.entity.alternativeMail});
        this.userResponse.$promise.then((result) => {
            if (result.message === undefined) {
                this.userExists = true;
                this.userIsInDealings = true;
                this.hasDataLdap = false;
                this.entity.dgtal = result.dgtal;
                this.entity.employeeID = result.employeeID;
                this.entity.workRelationShip = result.workRelationShip;
                this.entity.streetAddres = result.streetAddres;
                this.dgtal = result.dgtal;
                this.dgtal = this.cutBaseDn(result.dgtal);
                this.user = result;
                this.msgError = false;
            }else{
                /*this.userExists = false;*/
                this.userExists = true;
                this.hasDataLdap = true;
                this.userIsInDealings = true;
                this.entity.employeeID = undefined;
                this.entity.workRelationShip = undefined;
                this.entity.streetAddres = undefined;
                this.dgtal = undefined;
                this.user = undefined;
                if(this.haveEmptyRegisterUser() || this.entity.alternativeMail === undefined){
                    this.msgError = false;
                    this.entity.alternativeMail = undefined;
                }
                else{
                    this.msgError = true;
                }
            }
        }
            ,(error)=> {
                    if(error.status === 404){
                    this.userExists = false; }

                if(error.status === 400){
                    this.userIsInDealings = false;
                }
                this.entity.dgtal = undefined;
                this.dgtal = undefined;
            }




        );
        return this.userResponse;
    }



    cutBaseDn(string) {
        var res = string.split(',');
        let ou = res[0];
        var def = ou.split('=');
        let nuevares = def[1];
        return nuevares;
    }

    haveEmptyRegisterUser(){
        return  this.entity.alternativeMail === " " || this.entity.alternativeMail === "";
}


    cleanFields(){
        this.entity.sAMAccountName = undefined;
        this.entity.dgtal = undefined;
        this.dgtal = undefined;
    }

    hasErrors(){
        return !this.userIsInDealings || !this.userExists;
    }

    createGenericMailBox(formCreate){

        this.save(formCreate).then(()=>{
            this.$state.go('users',{nameOrMail:this.entity.mail});
        });

    }

    unlinkAccount(formCreate) {
        this.openModalConfirm()
            .result
            .then((a) => {
                this.entity.alternativeMail = undefined; // limpio cuenta en el front
                this.dgtal = undefined;
                    this.haveRegisterUser = false;
                this.save(formCreate).then((result)=> {
                    if (result.message === undefined){
                        this.isNew = false;
                    }else{
                        this.isNew = true;
                    }
                });
            }); // llamo al backend para desvincular cuenta
    }

    openModalConfirm(){
        return this.uibModal.open({
            animation: true,
            templateUrl: 'home/views/partials/modal.transfer.user.confirm.html',
            size: 'sm',
            controller: ModalConfirmController,
            controllerAs: 'vm',
            resolve: {
                detailUser: {}
            }
        });
    }

}