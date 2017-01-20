'use strict';
/**
 * Created by julian on 01/08/16.
 */
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class createEntityCtrl extends Saveable{
    /*@ngInject*/
    constructor($injector, $state,$uibModal,$uibModalInstance) {
        super(
            {
                injector:$injector,
                endpoint:'',
                backToState: ".",
                key:'id',
                executeGet: false,
                params:$state.params
            }
        );
        this.uibModal = $uibModal;
        this.uibModalInstance = $uibModalInstance;
    }

    _isNew() {
        let id = this.$state.params[this.key];
        return id === '' || typeof id === 'undefined';
    }

    redirect(){
        this.$state.go(this.selected,{id:""});
        this.uibModalInstance.close();
}
}