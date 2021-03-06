var app = require('./modules/app');
var _ = require('underscore');

app.constant('loginRedirectPath', '/');

app.value('LessonDefaultValues', {
  'types': [{'display': 'Video', 'value': 'video'},
            {'display': 'Article', 'value': 'article'},
            {'display': 'Event', 'value': 'event'},
            {'display': 'Book', 'value': 'book'}],
  'levels': [{'display': 'Basic', 'value': 'basic'},
             {'display': 'Medium', 'value': 'medium'},
             {'display': 'Advanced', 'value': 'advanced'}]
});


app.filter('filterObjects', function(){
  return function(items, filters, reverse){
    if(_.isEmpty(filters)) return items;
    var data = {};
    for(var item in items){
      var allFilters = 0;
      var allFiltersEqual = 0;
      for(var filter in filters){
        allFilters++;
        if(items[item][filter] === filters[filter]){
          allFiltersEqual++;
        }
      }
      if(allFilters === allFiltersEqual){
        data[item] = items[item];
      }
    }
    return data;
  };
});
