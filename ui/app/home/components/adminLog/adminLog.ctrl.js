/**
 * Created by julian on 19/09/16.
 */
'use strict';
import Pageable from 'module-crud-ui/app/scripts/crud.pageable.js';

export default class adminLogCtrl extends Pageable {
    /*@ngInject*/
    
    constructor($injector, $state, $uibModal, OAuth,RoleService) {
        super(
            {
                injector:$injector,
                endpoint:'searchLog',
                backToState: ".",
                key:'id',
                executeGet: false,
                params:$state.params,
                selectable:
                {
                    itemKey: 'cid',
                    enabled:true,
                    params: {}
                }
            }
        );
        this.roleService = RoleService;
       this.getMyRole();
        this.entity = {};
        this.OAuth = OAuth;
        this.uibModal = $uibModal;
        this.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: null,
            startingDay: 1
        };

        this.altInputFormats = ['M!/d!/yyyy'];
        this.popup1 = {};
        this.popup1.opened = false;
        this.popup2 = {};
        this.popup2.opened = false;
        this.getListActions();
    }


    cancel(){
        this.$state.go("admin",{});
    }
    
    
    getMyRole(){
        this.roleService.getCurrentUser().then((result) => {
            this.dgtal = result.dgtal;
            this.cnUser = result.cn;
        });

    }

    getListActions(){
        let response = this.api.actionLog.get();
        response.$promise.then((result) => {
            this.listAction = result.list;
        });
        return response;
    }

    open1(){
        this.popup1.opened = true;
    }

    open2(){
        this.popup2.opened = true;
    }

    searchLog(){
        let params = {};
        this.entity.dateFrom = this.buildDate(this.dateFrom);
        this.entity.dateTo = this.buildDate(this.dateTo);
        if(this.entity.cn === "" || !this.entity.cn){
            this.entity.cn = undefined;
        }
        if(this.entity.sAMAccountName === "" || !this.entity.sAMAccountName){
            this.entity.sAMAccountName = undefined;
        }
        params = this.entity;
        let responses = this.api.logs.get(params);
        responses.$promise.then((result) => {
            this.logs = result.content;
        });
    }

    buildDate(date){
        if(!date || date ==="") {
            return undefined;
        }
        let day ="";
        if(date.getDate()<10){
            day ="0"+date.getDate();
        }else{
            day = date.getDate();
        }
        let month ="";
        if(date){
            if(date.getMonth()+1<10){
                month ="0"+(date.getMonth()+1);
            }else{
                month = date.getMonth()+1;
            }
        }
        return date.getFullYear() + "-" + month +"-" + day;

    }


    getAccessToken() {
        return this.OAuth.getAuthorizationHeader().split(' ')[1];
    }

    clearSearch(){
        this.entity = {};
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.state = undefined;
        this.action = undefined;
        this.role = undefined;
        this.logs = undefined;
    }


}
