module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-service/:tenantId/:limit/:offset",
      handler: "custom-service.servicesByTenantId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/custom-service/filter/:tenantId/:offset/:limit",
      handler: "custom-service.servicesByFilter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
