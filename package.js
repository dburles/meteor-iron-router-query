Package.describe({
  summary: 'Iron Router addon that allows control of query string arrays'
});

Package.on_use(function(api) {
  api.use('iron-router');
  api.add_files('iron-router-query.js');
});
