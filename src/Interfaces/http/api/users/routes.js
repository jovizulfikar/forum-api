const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{userId}/hello',
    handler: handler.getUserHelloHandler,
  },
]);

module.exports = routes;
