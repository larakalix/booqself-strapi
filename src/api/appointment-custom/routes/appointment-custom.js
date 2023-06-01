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
      path: "/appointment-custom/:tenantId/:limit/:offset",
      handler: "appointment-custom.appointmentsByTenantId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/appointment-custom/filter/:tenantId/:offset/:limit",
      handler: "appointment-custom.appointmentsByFilter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
