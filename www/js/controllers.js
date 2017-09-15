angular.module('starter.controllers', [])
  .controller('DashCtrl', function ($scope, $http, DashService) {

    DashService.getAll(1).then(function (response) { //2. so you can use .then()
      $scope.items = response.data.resultList;

      /*$scope.items=response.products;*/
    });
    $scope.isMoreItems = false;
    $scope.items2 = [];


    $scope.loadMore = function () {

      DashService.getAll(1).then(function (response) { //2. so you can use .then()
        $scope.item2 = response.data.resultList;
      });


      $scope.$apply(function () {
        $scope.items = $scope.items.concat($scope.item2);
      });

      $scope.isMoreItems = true;

      $scope.$broadcast('scroll.infiniteScrollComplete');

    }

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })


  /**
   *#####################
   * 임대 컨트롤러....................
   * ######################
   */
  .controller('AccountCtrl', function ($scope, DashService, $state, $location) {


    $scope.itemsAvailable = true;
    $scope.pageIndex = 1;
    $scope.items = [];


    $scope.loadMore = function () {

      DashService.getAll($scope.pageIndex).then(function (response) { //2. so you can use .then()
        $scope.items2 = response.data.resultList;

        for (var i = 0; i < $scope.items2.length; i++) {
          $scope.items.push($scope.items2[i]);
        }
        $scope.pageIndex++;

        console.log("pageIndex--->" + $scope.pageIndex);

        /*if ($scope.items.length == 99) {
          //더이상의 아이템이 있는지 여부 (더이상아이템이 no가능==> true)
          $scope.noMoreItemsAvailable = true;
        }*/
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.openInAppBrowser = function (parameters) {
      var pblancId = parameters.pblancId;
      // Open in app browser
      window.open('https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do?pblancId=' + pblancId, '_blank');
    };

    $scope.openCordovaWebView = function (parameters) {
      var pblancId = parameters.pblancId;
      // Open cordova webview if the url is in the whitelist otherwise opens in app browser
      window.open('https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do?pblancId=' + pblancId, '_selft');
    };


    $scope.goDetail = function (pblancId) {

      console.log("pblancId---> " + pblancId);

      $state.go("tab.imdeDetail", {pblancId: pblancId});


    }

  })

  .controller('DetailCtrl', function ($scope, $stateParams, DetailService) {

    console.log("pblancId333333333333333333-->" + $stateParams.pblancId);

    $scope.pblancId = $stateParams.pblancId;

    DetailService.getDetail($stateParams.pblancId).then(function (response) { //2. so you can use .then()
      console.log(response.data.rcritBasic);

      var rsult = response.data.rcritBasic;
      $scope.guidanceCn = rsult.guidanceCn;

      $scope.sttusNm = rsult.sttusNm;
      $scope.suplyTyNm = rsult.suplyTyNm;
      $scope.pblancNm = rsult.pblancNm;

    });
  })
  .filter('newlines', function () {
    return function(text) {
      return text.replace(/\n/g, '<br/>');
    }
  });

;
