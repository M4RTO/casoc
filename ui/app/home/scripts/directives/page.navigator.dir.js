/**
 * Created by julian on 06/09/16.
 */
'use strict';

class PaginationController {

    /*@ngInject*/
    constructor() {
    }

    change(pageNumber) {
        this.pageable.page.number = pageNumber;
        this.pageable.get();
    }

    

}

export default class PageNavigator {

    /*@ngInject*/
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.controllerAs = 'vmPagination';
        this.scope = {};
        this.bindToController = {
            pageable: '=',
        };
        this.templateUrl = 'home/scripts/directives/page.navigator.html';
        this.controller = PaginationController;
    }

    static directiveFactory() {
        var instance = new PageNavigator();
        return instance;
    }

}