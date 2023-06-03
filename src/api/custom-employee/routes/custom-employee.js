module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-employee/:tenantId/:limit/:offset",
      handler: "custom-employee.employeesByTenantId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/custom-employee/filter/:tenantId/:offset/:limit",
      handler: "custom-employee.employeesByFilter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
