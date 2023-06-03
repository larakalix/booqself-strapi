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
      path: "/custom-client/appointment/:tenantId/:email/:offset/:limit",
      handler: "custom-client.appointmentsById",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/custom-client/filter/:tenantId/:offset/:limit",
      handler: "custom-client.clientsByFilter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
