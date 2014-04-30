var app = require('./modules/app');
var _ = require('underscore');

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


app.filter('filterObjects', function(){
  return function(items, filters, reverse){
    if(_.isEmpty(filters)) return items;
    var data = {};
    for(item in items){
      for(filter in filters){
        if(items[item][filter] === filters[filter]){
          data[item] = items[item];
        }
      }
    }
    return data;
  };
});
