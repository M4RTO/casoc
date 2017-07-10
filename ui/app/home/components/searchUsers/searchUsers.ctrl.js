'use strict';
import Pageable from 'module-crud-ui/app/scripts/crud.pageable.js';
// import ModalConfirmController from '../modalConfirm/modalConfirm.ctrl';
// import DetailUserController from '../detailUserModal/detailUser.crtl';
// import createEntityCtrl from '.././createEntity/createEntity.ctrl';

export default class searchUsersCtrl extends Pageable {
    /*@ngInject*/
    constructor($injector, $state, $uibModal, $cookies) {
        super(
            {
                injector: $injector,
                endpoint: 'searchUsers',
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
        // this.cookies = $cookies;
        // this.roleService = RoleService;
        // this.getMyRole();
        // this.uibModal = $uibModal;
        // if (this.params.nameOrMail) {
        //     this.query = this.params.nameOrMail;
        //     this.search(this.params.nameOrMail);
        //
        // }
    }

  

    // hasEmployeeType() {
    //     return this.userSelected.employeeType == "Mail" || this.userSelected.state == "Deshabilitado"
    // }
    //
    // acceptable(query) {
    //     if (query == undefined || query.length < 3) {
    //         return false
    //     } else {
    //         return true;
    //
    //     }
    // }
    //
    // search(query) {
    //     if (!query) {
    //         return false;
    //     }
    //     if(this.page.number > 0 || this.page.number == undefined)
    //         this.page.number = 0;
    //     this.lastQuery = query;
    //     this.$state.params.nameOrMail = query;
    //     this.params.nameOrMail = query;
    //     let response = this.get();
    //     response.$promise.then((result) => {
    //         if (result.content.length > 0) {
    //             this.entityNotFound = false;
    //         } else {
    //             this.userSelected = undefined;
    //             this.entityNotFound = true;
    //         }
    //     });
    //     return response;
    // }
    //
    // _addParams() {
    //     if (this.params.nameOrMail) {
    //         return {page: this.$location.search().page};
    //     } else {
    //         return this.$location.search();
    //     }
    // }
    //
    // selectecUser(user) {
    //     this.userSelected = user;
    // }
    //
    // transfer() {
    //     if (!this.userSelected) {
    //         return false;
    //     }
    //     if (this.userSelected.isTransfer) {
    //         this.openModalConfirm()
    //             .result
    //             .then((a) => {
    //                 this.deleteUser(this.userSelected.employeeID);
    //             });
    //     } else {
    //         this.openModalConfirm()
    //             .result
    //             .then((a) => {
    //                 this.transferUser(this.userSelected.employeeID);
    //             });
    //     }
    // }
    //
    // lowPhysical() {
    //     this.openModalConfirm()
    //         .result
    //         .then((a) => {
    //             this.response = this.api.userPhysical.remove({id: this.userSelected.sAMAccountName});
    //             this.response.$promise.then((result) => {
    //                 this.search(this.lastQuery);
    //                 this.userSelected = undefined;
    //             });
    //         });
    //
    // }
    //
    // low() {
    //     this.openModalConfirm()
    //         .result
    //         .then((a) => {
    //             this.response = this.api.member.update({id: this.userSelected.employeeID})
    //                 .$promise
    //                 .then(()=> {
    //                     this.userSelected = undefined;
    //                     this.search(this.lastQuery);
    //                 }, (error)=> {
    //                     if (error.status == 502) {
    //                         this.noDGTALModal();
    //                     }
    //                 });
    //         });
    //     return this.response;
    // }
    //
    // deleteUser(employeeID) {
    //     this.response = this.api.transferUser.remove({employeeID: employeeID});
    //     this.response.$promise.then((result) => {
    //         this.search(this.lastQuery);
    //         this.userSelected = undefined;
    //     });
    //     return this.response;
    // }
    //
    // modify() {
    //     if (this.userSelected.employeeType == "Mail") {
    //         this.$state.go('mail', {id: this.userSelected.sAMAccountName});
    //     } else {
    //         this.$state.go('user', {id: this.userSelected.employeeID});
    //     }
    // }
    //
    // transferUser(employeeID) {
    //     this.response = this.api.transferUser.save({employeeID: employeeID});
    //     this.response.$promise.then((result) => {
    //         this.search(this.lastQuery);
    //         this.userSelected = undefined;
    //     });
    //     return this.response;
    // }
    //
    //
    // addEntity() {
    //     var modalInstance = this.uibModal.open({
    //         animation: true,
    //         templateUrl: 'home/components/createEntity/createEntity.html',
    //         size: 'sm',
    //         controller: createEntityCtrl,
    //         controllerAs: 'vm'
    //     });
    // }
    //
    // canTranfer() {
    //     if (!this.userSelected) {
    //         return false;
    //     }
    //
    //     return this.userSelected.isBelongToOU || this.userSelected.isTransfer;
    // }
    //
    //
    // noDGTALModal() {
    //     let self = this;
    //     let modalInstance = this.uibModal.open({
    //         animation: true,
    //         templateUrl: 'home/views/partials/modal.dgtal.user.noMine.html',
    //         size: 'sm'
    //     });
    // }
    //
    //
    // openModalConfirm() {
    //     let self = this;
    //     return this.uibModal.open({
    //         animation: true,
    //         templateUrl: 'home/views/partials/modal.transfer.user.confirm.html',
    //         //size: 'sm',
    //         controller: ModalConfirmController,
    //         controllerAs: 'vm',
    //         resolve: {
    //             detailUser: function () {
    //                 return self.userSelected;
    //             }
    //         }
    //     });
    // }
    //
    // watch(detailUser) {
    //     return this.uibModal.open({
    //         animation: true,
    //         templateUrl: 'home/views/partials/modal.watch.user.html',
    //         size: 'lg',
    //         controller: DetailUserController,
    //         controllerAs: 'vm',
    //         resolve: {
    //             detailUser: function () {
    //                 return detailUser;
    //             }
    //         }
    //     });
    // }
    //
    // onEnter(keyEvent, query) {
    //     if (keyEvent.which === 13) {
    //         this.search(query);
    //     }
    // }
    
    
}