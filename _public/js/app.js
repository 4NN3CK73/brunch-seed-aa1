'use strict';
var App;

App = angular.module('app', ['ngCookies', 'ngResource', 'ngRoute', 'app.controllers', 'app.directives', 'app.filters', 'app.services', 'partials']);

App.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, config) {
    $routeProvider.when('/todo', {
      templateUrl: '/partials/todo.html'
    }).when('/view1', {
      templateUrl: '/partials/partial1.html'
    }).when('/view2', {
      templateUrl: '/partials/partial2.html'
    }).otherwise({
      redirectTo: '/todo'
    });
    return $locationProvider.html5Mode(false);
  }
]);
;'use strict';

/* Controllers */
angular.module('app.controllers', []).controller('AppCtrl', [
  '$scope', '$location', '$resource', '$rootScope', function($scope, $location, $resource, $rootScope) {
    $scope.$location = $location;
    $scope.$watch('$location.path()', function(path) {
      return $scope.activeNavId = path || '/';
    });
    return $scope.getClass = function(id) {
      if ($scope.activeNavId.substring(0, id.length) === id) {
        return 'active';
      } else {
        return '';
      }
    };
  }
]).controller('MyCtrl1', [
  '$scope', function($scope) {
    return $scope.onePlusOne = 2;
  }
]).controller('MyCtrl2', [
  '$scope', function($scope) {
    return $scope;
  }
]).controller('TodoCtrl', [
  '$scope', function($scope) {
    $scope.todos = [
      {
        text: "learn angular",
        done: true
      }, {
        text: "build an angular app",
        done: false
      }
    ];
    $scope.addTodo = function() {
      $scope.todos.push({
        text: $scope.todoText,
        done: false
      });
      return $scope.todoText = "";
    };
    $scope.remaining = function() {
      var count;
      count = 0;
      angular.forEach($scope.todos, function(todo) {
        return count += (todo.done ? 0 : 1);
      });
      return count;
    };
    return $scope.archive = function() {
      var oldTodos;
      oldTodos = $scope.todos;
      $scope.todos = [];
      return angular.forEach(oldTodos, function(todo) {
        if (!todo.done) {
          return $scope.todos.push(todo);
        }
      });
    };
  }
]);
;var DataStore, createDocumentStore, createRelationalStore, createSimpleStore;

DataStore = (typeof exports !== "undefined" && exports !== null) && exports || (this.DataStore = {});

DataStore.create = function(type) {
  switch (type) {
    case "simple":
      return createSimpleStore();
    case "relational":
      return createRelationalStore();
    case "document":
      return createDocumentStore();
    default:
      return void 0;
  }
};

createSimpleStore = function() {
  return {
    get: function(key) {
      return JSON.parse(localStorage.getItem(JSON.stringify(key)));
    },
    set: function(key, value) {
      return localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
    },
    "delete": function(key) {
      return localStorage.removeItem(JSON.stringify(key));
    },
    count: function() {
      return localStorage.length;
    },
    clear: function() {
      return localStorage.clear();
    }
  };
};

createRelationalStore = function() {
  var db, store;
  db = openDatabase("nwsqldb", "1.0", "embedded sql database", 1024 * 1024 * 256);
  store = {
    run: function(query, fn) {
      return db.transaction(function(tx) {
        return tx.executeSql(query, [], function(tx, result) {
          var i;
          return typeof fn === "function" ? fn((function() {
            var j, ref, results;
            results = [];
            for (i = j = 0, ref = result.rows.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              results.push(result.rows.item(i));
            }
            return results;
          })()) : void 0;
        });
      });
    }
  };
  return store;
};

createDocumentStore = function() {
  var NeDB, datapath, e, error, store;
  try {
    NeDB = require("nedb");
    datapath = require('nw.gui').App.dataPath + "/nedb";
    store = {
      collection: function(name) {
        return new NeDB({
          filename: "/" + name,
          autoload: true
        });
      }
    };
    return store;
  } catch (error) {
    e = error;
    if (e.code === "MODULE_NOT_FOUND") {
      return console.error("NeDB not found. Try `npm install nedb --save` inside of `/app/assets`.");
    } else {
      return console.error(e);
    }
  }
};
;'use strict';

/* Directives */
angular.module('app.directives', ['app.services']).directive('appVersion', [
  'version', function(version) {
    return function(scope, elm, attrs) {
      return elm.text(version);
    };
  }
]);
;'use strict';

/* Filters */
angular.module('app.filters', []).filter('interpolate', [
  'version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }
]);
;'use strict';

/* Sevices */
angular.module('app.services', []).factory('version', function() {
  return "0.1";
});
;
//# sourceMappingURL=app.js.map