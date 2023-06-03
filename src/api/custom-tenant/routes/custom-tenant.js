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
      path: "/custom-tenant/:tenantId",
      handler: "custom-tenant.tenantById",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/custom-tenant/boilerplate/:tenantId",
      handler: "custom-tenant.boilerplate",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
