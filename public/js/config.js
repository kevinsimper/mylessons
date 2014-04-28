var app = require('./modules/app');

app.value('firebaseUrl', 'https://mylessons.firebaseio.com/')
app.constant('loginRedirectPath', '/')

app.value('LessonDefaultValues', {
  'types': [{'display': 'Video', 'value': 'video'}, 
            {'display': 'Article', 'value': 'article'},
            {'display': 'Event', 'value': 'event'}],
  'levels': [{'display': 'Basic', 'value': 'basic'}, 
             {'display': 'Medium', 'value': 'medium'}, 
             {'display': 'Advanced', 'value': 'advanced'}]
})

app.filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});