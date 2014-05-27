Router.query = (function(router) {
  var current = function() {
    return router.current();
  };

  var currentParams = function() {
    return current().params;
  };

  var currentQueryParams = function() {
    return current().queryParams;
  };

  var get = function(name) {
    name = resolveName(name);
    var values = currentQueryParams()[name];
    if (! values)
      return [];

    return values;
  };

  var resolveName = function(name) {
    return name + '[]';
  };

  return {
    set: function(name, value) {
      name = resolveName(name);
      var query = EJSON.clone(currentQueryParams());
      if (! value || ! value.length)
        delete query[name];
      else
        query[name] = value;
      
      router.go(current().route.name, currentParams(), { query: query });
    },

    isSet: function(name, value) {
      name = resolveName(name);
      return _.indexOf(currentParams()[name] || [], value) !== -1;
    },
    
    add: function(name, value) {
      var values = get(name);

      if (_.indexOf(values, value) === -1)
        values.push(value);

      this.set(name, values);
    },

    remove: function(name, value) {
      this.set(name, _.without(get(name), value));
    },
    
    clear: function() {
      router.go(current().route.name, currentParams());
    }
  };
})(Router);
