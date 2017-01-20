/**
 * Created by julian on 04/08/16.
 */
'use strict';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class passwordCtrl extends Saveable {
    /*@ngInject*/
    constructor($injector, $state, $uibModal) {
        super(
            {
                injector: $injector,
                endpoint: "password",
                backToState: ".",
                key: 'id',
                executeGet: false,
                params: $state.params
            }
        );
        this.newPassword = false;
        this.newPasswordCheck = {};
        this.uibModal = $uibModal;
    }


    _isNew() {
        let id = this.$state.params[this.key];
        return id === '' || typeof id === 'undefined';
    }

    updateUser(form) {
        this.$state.params.id = this.entity.employeeID;
        this.params.id = this.entity.employeeID;
        this.save(form).then(() => {
           this.$state.go("principal", {});
        },  (error)=> {
            if (error.status == 404) {
                this.oldPassword = true;
                this.ero = false;
                this.newPassword = false;
            }else if(error.status == 409){
                this.ero = true;
                this.oldPassword = false;
                this.newPassword = false;
            }else{
                if(error.status == 406){
                    this.newPassword = true;
                    this.ero = false;
                    this.oldPassword = false;
                }
            }

        });

    }

  

    openModal() {
        let self = this;
        let modalInstance = this.uibModal.open({
            animation: true,
            templateUrl: 'home/views/partials/modal.config.user.html',
            size: 'sm'
        });
    }



  

}