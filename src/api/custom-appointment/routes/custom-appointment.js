module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-appointment/:tenantId/:limit/:offset",
      handler: "custom-appointment.appointmentsByTenantId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/custom-appointment/book/:tenantId",
      handler: "custom-appointment.appointmentsForBooking",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/custom-appointment/filter/:tenantId/:offset/:limit",
      handler: "custom-appointment.appointmentsByFilter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/custom-appointment/create",
      handler: "custom-appointment.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/custom-appointment/update/:appointmentId",
      handler: "custom-appointment.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
