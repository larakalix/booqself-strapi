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
      path: "/client-custom/appointment/:tenantId/:email/:offset/:limit",
      handler: "client-custom.appointmentsById",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/client-custom/filter/:tenantId/:offset/:limit",
      handler: "client-custom.clientsByFilter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
