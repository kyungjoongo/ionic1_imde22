angular.module('starter.services', [])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }, {
      id: 5,
      name: 'kyugjoon',
      lastText: '고경준은 천재님이십니다sdlfkdlkfssldk is wicked good ice cream.',
      face: 'img/mike.png'
    }


    ];

    return {


      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })


  .factory('DashService', function ($http) {
    // Might use a resource here that returns a JSON array
    return {
      getAll: function (pageIndex) {
        return $http.post("http://kyungjoon.ipdisk.co.kr:8080/lh/lhListToJson?pageIndex="+ pageIndex);  //1. this returns promise
      }
    };

  })

  .factory('DashService2', function ($http) {
    // Might use a resource here that returns a JSON array
    return {
      getAll: function (pageIndex) {
        return $http.post("http://kyungjoon.ipdisk.co.kr:8080/lh/lhListToJson?pageIndex=2");  //1. this returns promise
      }
    };

  })

  .factory('DetailService', function ($http) {
    // Might use a resource here that returns a JSON array
    return {
      getDetail: function (pblancId) {
        return $http.post("http://kyungjoon.ipdisk.co.kr:8080/lh/lhDetailToJson?pblancId="+ pblancId);  //1. this returns promise
      }
    };

  })
;

