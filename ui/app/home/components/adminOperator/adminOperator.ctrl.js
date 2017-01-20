/**
 * Created by julian on 25/07/16.
 */
'use strict';
import Pageable from 'module-crud-ui/app/scripts/crud.pageable.js';

export default class adminOperatorCtrl extends Pageable{
    /*@ngInject*/
    constructor($injector, $state,$uibModal,RoleService) {
        super(
            {
                injector: $injector,
                endpoint: 'admin',
                backToState: ".",
                key: 'id',
                executeGet: false,
                params: $state.params,
                selectable: {
                    itemKey: 'cid',
                    enabled: true,
                    params: {}
                }
            }
        );
        this.uibModal = $uibModal;
        if(this.params.nameOrMail){
            this.query = this.params.nameOrMail;
            this.search(this.params.nameOrMail);

        }
        this.roleService = RoleService;
       this.getMyRole();
    }

    getMyRole(){
        this.roleService.getCurrentUser().then((result) => {
            this.dgtal = result.dgtal;
            this.cnUser = result.cn;
            this.roleService.getState();
        });

    }

    search(query){
        if(!query){
            return false;
        }
        this.lastQuery = query;
        this.$state.params.nameOrMail = query;
        this.params.nameOrMail = query;
        let response = this.get();
        response.$promise.then((result) => {
            if(result.content.length > 0){
                this.entityNotFound = false;
            }else{
                this.userSelected = undefined;
                this.entityNotFound = true;
            }
        });
        return response;
    }

    _addParams() {
        if(this.params.nameOrMail){
            return {page: this.$location.search().page};
        }else{
            return this.$location.search();
        }
    }

    selectUser(user){
        this.userSelected = user;
        this.functionToPerform();
    }

    functionToPerform(){

        if(this.userSelected){
        if(!this.userSelected.membersOf[0]){
            this.btnTitle = "Hacer operador";
        }

        else{
            this.btnTitle = "Deshacer operador";
        }

    }
    }

    convertToAdmin() {
        let algo = this.userSelected;
        if(!this.userSelected.membersOf[0]) {
            this.api.admin
                .update({id: this.userSelected.employeeID })
                .$promise
                .then(()=> {
                    this.search(this.lastQuery);
                  this.userSelected = undefined;
                });
        }
        else{
                 this.api.admin
                .remove({id: this.userSelected.employeeID })
                .$promise
                .then(()=> {
                    this.search(this.lastQuery);
                    this.selectUser(this.userSelected);
                      this.userSelected = undefined;
                });
        }
    }

    cutBaseDn(string) {
        var res = string.split(',');
        let ou = res[0];
        var def = ou.split('=');
        let nuevares = def[1];
        return nuevares;
    }

    acceptable(query){
        if(query == undefined || query.length < 3){
            return false
        }else {
            return true;

        }
    }

    onEnter(keyEvent,query) {
        if (keyEvent.which === 13) {
            this.search(query);
        }

    }

}
