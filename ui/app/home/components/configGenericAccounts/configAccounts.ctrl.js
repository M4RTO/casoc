/**
 * Created by julian on 04/08/16.
 */

import configController from './configController.crtl';

'use strict';
import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class configAccountsCtrl extends Saveable {
    /*@ngInject*/
    constructor($injector, $state, $uibModal, RoleService) {
        super(
            {
                injector: $injector,
                endpoint: "",
                backToState: ".",
                key: 'id',
                executeGet: false,
                params: $state.params
            }
        );
        this.roleService = RoleService;
        this.getMyRole();
        this.uibModal = $uibModal;
    }


    getMyRole(){
        this.roleService.getCurrentUser().then((result) => {
            this.user = result
        });

    }


    openModal(detailUser) {
        return this.uibModal.open({
            animation: true,
            templateUrl: 'home/views/partials/modal.config.generic.html',
            size: 'sm',
            controller: configController,
            controllerAs: 'vm',
            resolve: {
                detailUser : function () {
                    return detailUser;
                }
            }
        });
    }

    back(){
        this.$state.go("userAccount",{});

    }


  

}