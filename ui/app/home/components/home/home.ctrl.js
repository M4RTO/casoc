'use strict';
import Pageable from 'module-crud-ui/app/scripts/crud.pageable.js';
// import ModalConfirmController from '../modalConfirm/modalConfirm.ctrl';
// import DetailUserController from '../detailUserModal/detailUser.crtl';
// import createEntityCtrl from '.././createEntity/createEntity.ctrl';

export default class homeCtrl extends Pageable {
    /*@ngInject*/
    constructor($injector, $state, $uibModal, $cookies) {
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
        this.myInterval = 2500;
        this.noWrapSlides = true;
        this.active = 0;
        this.slides = this.slides = [];
        this.currIndex = 0;
        for (var i = 0; i < 4; i++) {
            this.addSlide();
        };
    
    }
    
    addSlide() {
        var newWidth = 600 + this.slides.length + 1;
        this.slides.push({
            image: '//unsplash.it/' + newWidth + '/300',
            text: ['Nice image','Awesome photograph','That is so cool','I love that'][this.slides.length % 4],
            id: this.currIndex++
        });
    };
    
    randomize() {
        var indexes = this.generateIndexesArray();
        this.assignNewIndexesToSlides(indexes);
    };
    
    
    
    assignNewIndexesToSlides (indexes) {
        for (var i = 0, l = this.slides.length; i < l; i++) {
            this.slides[i].id = indexes.pop();
        }
    }
    
    generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < this.currIndex; ++i) {
            indexes[i] = i;
        }
        return this.shuffle(indexes);
    }
    
    shuffle(array) {
        var tmp, current, top = array.length;
        
        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }
        
        return array;
    }
    
    
    
    
    
}