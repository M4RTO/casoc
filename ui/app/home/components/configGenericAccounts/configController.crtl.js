/**
 * Created by julian on 04/08/16.
 */
'use strict';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';


export default class configController extends Saveable {
    /*@ngInject*/
    constructor($injector, $state, $uibModal, $uibModalInstance, detailUser,api) {
        super(
            {
                injector: $injector,
                endpoint: "",
                backToState: ".",
                key: 'userPrincipal',
                executeGet: false,
                params: $state.params
            }
        );
        this.entity = {};
        this.detailUser = detailUser;
        this.getDetail();
        this.uibModal = $uibModal;
        this.uibModalInstance = $uibModalInstance;
        this.api = api;
    }


    cancel() {
        this.uibModalInstance.dismiss('cancel');
    }

    ok() {
        this.uibModalInstance.close({});
    }

    getDetail() {
        let response = this.api.mailPrincipal.get({userPrincipal: this.detailUser});
        response.$promise.then((result) => {
            this.entity = result;
        });
        return response;
    }

    updateUser() {
        this.response = this.api.changePassMail.update({}, this.entity)
            .$promise.then((result) => {
                this.cancel()
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


}