var app = require('./modules/app');

app.value('firebaseUrl', 'https://mylessons.firebaseio.com/')
app.constant('loginRedirectPath', '/')

app.filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});