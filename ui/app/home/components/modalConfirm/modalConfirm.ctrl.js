/**
 * Created by julian on 04/08/16.
 */
'use strict';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class ModalConfirmCtrl extends Saveable{
    /*@ngInject*/
    constructor($injector, $state,$uibModal,$uibModalInstance,detailUser) {
        super(
            {
                injector:$injector,
                endpoint: "",
                backToState: ".",
                key:'id',
                executeGet: false,
                params:$state.params
            }
        );
        this.entity = {};
        this.detailUser = detailUser;
        if(this.detailUser.sAMAccountName){
            this.getDetail();
        }
        this.uibModal = $uibModal;
        this.uibModalInstance = $uibModalInstance;
    }



    cancel(){
        this.uibModalInstance.dismiss('cancel');
          }

    ok(){
        this.uibModalInstance.close({});
    }

    getDetail() {
        let response = this.api.employeeID.get({id: this.detailUser.sAMAccountName});
        response.$promise.then((result) => {
            this.entity = result;
        });
        return response;
    }

}