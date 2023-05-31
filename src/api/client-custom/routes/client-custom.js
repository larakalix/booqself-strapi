module.exports = {
  routes: [
    {
      method: "GET",
      path: "/client-custom/appointment/:email",
      handler: "client-custom.clientAppointmentsById",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
