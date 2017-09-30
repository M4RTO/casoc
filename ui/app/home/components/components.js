'use strict';
/**
 * Created by julian on 25/07/16.
 */
import angular from 'angular';
import principal from './principal/principal';
import formUser from './formUser/formUser';
import userAccount from './userAccount/userAccount';
import password from './password/password';
import searchUsers from './home/home';
import adminOperator from './adminOperator/adminOperator';
import formMail from './formMail/formMail';
import adminLog from './adminLog/adminLog';
import configAccounts from './configGenericAccounts/configAccounts';



const components = angular
    .module('app.components', [
            password,
            adminOperator,
            userAccount,
            formUser,
            searchUsers,
            formMail,
            configAccounts,
            principal,
            adminLog
    ])
    .name;

export default components;