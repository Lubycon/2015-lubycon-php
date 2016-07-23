(function(){
    'use strict';

    angular.module('App')
    .config(function($stateProvider){
        $stateProvider
            .state('contentPage',{
                templateUrl: '/pages/view/contents/contents_page',
                controller: 'ContentsPageController'
            });
    });
}());
