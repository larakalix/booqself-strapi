module.exports = {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/tenant-custom',
    //  handler: 'tenant-custom.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
      method: "GET",
      path: "/tenant-custom/:tenantId",
      handler: "tenant-custom.tenantById",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
