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
      method: "PUT",
      path: "/custom-tenant/update/:tenantId",
      handler: "custom-tenant.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
