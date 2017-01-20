/**
 * Created by julian on 25/07/16.
 */
'use strict';
import ModalConfirmController from '../modalConfirm/modalConfirm.ctrl';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class formUserCtrl extends Saveable{
    /*@ngInject*/
    constructor($injector, $state, $uibModal,RoleService,cfpLoadingBar,$http) {
        super(
            {
                injector:$injector,
                endpoint:'employeeID',
                backToState: ".",
                key:'id',
                executeGet: false,
                params:$state.params,
                entityDependencies: [
                    {api: 'workRelationShip', loading: 'isLoading', model: 'list'},
                    {api: 'operatorReparticiones', loading: 'isLoading', model: 'reparticiones'},
                    {api: 'mailDomain', loading: 'isLoading', model: 'mailDomain'}
                ]
            }
        );
        this.http = $http;
        this.roleService = RoleService;
        this.getMyRole();
        this.loading =cfpLoadingBar;
        this.alternativeMailExist = true;
        this.userPrincipalExist = true;
        this.cnMultipleRepeat = false;
        this.inputCuil = false;
        this.disabledOther = true;
        this.uibModal = $uibModal;
        this.existUser = true;
        this.otherMailbox = [];
        this.entity = {};
        this.mail = {};
        this.mail.enabledInput = true;
        this.entity.otherMailbox = [];
        if(!this._isNew()){
            this.get().$promise.then(
                ()=> {
                    this.inputCuil = true;
                    this.disabledOther = false;
                    this.entity.otherMailbox.forEach( (other)=>{
                        let mail = {};
                        mail.alias = other.split("@")[0];
                        mail.domain = "@" + other.split("@")[1];
                        mail.created = true;
                        this.otherMailbox.push(mail);
                    });
                    if(this.entity.mail){
                        this.isMailExist = false;
                    }
                    this.entity.genero = "m";
                    this.entity.dni = "444";
                    this.mail.alias = this.entity.mail.split("@")[0];
                });
        }
        this.cuil = true;
        this.showAddOtherMail = true;
        this.getWorkRelationShip();
        this.getReparticiones();
        this.getMailDomain();
    }

    _isNew() {
        let id = this.$state.params[this.key];
        return id === '' || typeof id === 'undefined';
    }

    getWorkRelationShip(){
        let response = this.api.workRelationShip.get();
        response.$promise.then((result) => {
            this.list = result.list;
        });
        return response;
    }

    validCompleteMail(){
        this.entity.userPrincipalName = this.mail.alias + "@buenosaires.gob.ar";
    }

    showTitle(){
        if (!this._isNew()){
          return "Modificacion de Usuario";
        }
        else {
            return "Alta de Usuario";
        }
    }

    getMyRole(){
        this.roleService.getCurrentUser().then((result) => {
            this.dgtal = result.dgtal;
            this.cnUser = result.cn;
        });

    }

    cancel(){
        this.$state.go("users");
    }

    getReparticiones(){
        let response = this.api.operatorReparticiones.get();
        response.$promise.then((result) => {
            this.reparticiones = result.content;
        });
        return response;
    }

    getMailDomain(){
        let response = this.api.mailDomain.get();
        response.$promise.then((result) => {
            this.mailDomain = result.list;
        });
        return response;
    }

    verifyUser() {
        if (!this.entity.employeeID) {
            this.existUser = false;
            this.msgError = false;
            this.disabledOther = false;
            return false;
        }
        let response = this.api.employeeID.get({'id': this.entity.employeeID});
            response.$promise.then((result)=> {
            if (result) {
                this.existUser = true;
                this.cuil = true;
                if(this.disabledOther === false){
                   this.disabledOther = true;
                }
                this.msgError = true;
                this.cleanFields();
            }
        },(error)=> {
            if (error.status === 404) {
                this.existUser = false;
                this.disabledOther = false;
                this.msgError = false;
                this.cuil = true;
            }else{
                if (error.status === 502) {
                    this.cuil = false;
                    this.existUser = true;
                    this.disabledOther = true;
                    this.msgError = false;

                }
                this.cleanFields();
            }
            });
        return response;
    }
    
    validExistMail(){
        let response = this.api.mail.get({mail:this.entity.alternativeMail});
        response.$promise.then((result)=>{
            if(result){
                this.alternativeMailExist = false;
            }
        },(error)=>{
            if(error.status == 404){
                this.alternativeMailExist = true;
            }
        });
        return response;
    }

    validExistPrincipal(){
        this.entity.userPrincipalName = this.mail.alias + "@buenosaires.gob.ar";
        let response = this.api.mail.get({mail:this.entity.userPrincipalName});
        response.$promise.then((result)=>{
            if(result){
                this.userPrincipalExist = false;
            }
        },(error)=>{
            if(error.status == 404){
                this.userPrincipalExist = true;
            }
        });
        return response;
    }

    existUser(){
        if (!this.entity.employeeID){
            return true;
        }
        else{
            return false;
        }
    }

    cleanFields(){
        let employeeID = this.entity.employeeID;
        this.entity = {};
        this.entity.employeeID = employeeID;
        this.entity.dgtal = {};
    }

    removeAlertCn(){
        this.cnMultipleRepeat = false;
    }

    createUser(form){
        this.entity.userPrincipalName = this.mail.alias + "@buenosaires.gob.ar";
        this.entity.mail = this.mail.alias + "@buenosaires.gob.ar";
        this.entity.sAMAccountName = this.entity.employeeID;
        this.openModalConfirm()
            .result
            .then((a) => {
                this.save(form).then( (result) => {
                    if (result.message === 'Entity not found'){
                        this.openError();
                    }else{
                        if (this._isNew()){
                        this.openModal();
                        }
                        else {
                            this.openModifyModal();
                        }
                    }
                    this.$state.go("users",{nameOrMail:this.entity.employeeID});
                },(error)=> {
                    if(error.status==400){
                        this.cnMultipleRepeat = true;
                    }
                });
            });
    }

    openModal(){
        let self = this;
        let modalInstance = this.uibModal.open({
            animation: true,
            templateUrl: 'home/views/partials/modal.create.user.html',
            size: 'sm'
        });
    }

    openModifyModal(){
        let self = this;
        let modalInstance = this.uibModal.open({
            animation: true,
            templateUrl: 'home/views/partials/modal.modify.user.html',
            size: 'sm'
        });
    }

    openError(){
        let self = this;
        let modalInstance = this.uibModal.open({
            animation: true,
            templateUrl: 'home/views/partials/modal.error.modify.user.html',
            size: 'sm'
        });
    }

    validMail(){
        if(!this.mail){
            return false;
        }
        let param = {};
        param.mail = this.mail.alias + "@buenosaires.gob.ar";
        let response = this.api.mail.get(param);
        response.$promise.then((result) => {
            if (result.message === 'Entity not found'){
                this.isMailExist =  false;
            }else{
                this.isMailExist =  true;
                this.mail.alias = undefined;
            }
        });
        return response;
    }

    suggestAlias(domain){
        if(!domain){
            return false;
        }
        let param = {};
        param.name = this.entity.name;
        param.domain = domain;
        param.lastName = this.entity.lastName;
        let response = this.http.get('/giu-api/mail/alias', {params:{"name": param.name, "lastName": param.lastName, "domain":param.domain},ignoreLoadingBar : true})
       return response;
    }

    getListAlias(domain){
        if(!this.entity.name || !this.entity.lastName){
            return false;
        }
        let response = this.suggestAlias(domain);
        response.$promise.then((result) => {
            if (result){
                this.listAlias = result.list;
            }
        });
        return response;
    }

    getListAliasForMail(domain){
        if(!this.entity.name || !this.entity.lastName){
            return false;
        }
        let response = this.suggestAlias("@buenosaires.gob.ar");
        response.then((result) => {
            if (result.data){
                this.listAliasForMail = result.data.list;
            }
        });
        return response;
    }

    addOtherMail(){
        let otherMailbox = {
            alias: undefined,
            domain: undefined,
            enabledInput: false,
            created: false
        };
        this.otherMailbox.push(otherMailbox);
        this.showAddOtherMail = false;
    }

    removeLastOtherMail(){
        if(this.otherMailbox.length < 1){
            return false;
        }
        let remove = this.otherMailbox.pop();
        this.showAddOtherMail = true;
    }

    removeOtherMail(index){
        if(this.entity.otherMailbox.length < 1){
            return false;
        }
        this.entity.otherMailbox.splice(index, 1);
        this.otherMailbox.splice(index, 1);
    }

    isCheck(otherMail){
        otherMail.disabledInput = !otherMail.disabledInput;
    }

    buildAlias(otherMail){
        if(!otherMail){
            return false;
        }
        let alias = otherMail.alias + otherMail.domain;
        let response = this.validOtherMailBox(alias);
        if(!response){
            this.isOtherMailExist =  true;
            return false;
        }
        response.$promise.then((result) => {
                this.isOtherMailExist =  true;
        },(error) => {
            if (error.status == 404){
                this.isOtherMailExist =  false;
                this.entity.otherMailbox.push(alias);
                otherMail.created = true;
                this.showAddOtherMail = true;
            }
        });
    }

    validOtherMailBox(otherMail){
        if(!this.mail){
            return false;
        }
        let param = {};
        param.otherMailbox = otherMail;
        let response = this.api.mailOtherMail.get(param);
        return response;
    }

    openModalConfirm() {
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