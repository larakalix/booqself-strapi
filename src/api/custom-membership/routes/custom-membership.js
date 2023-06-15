module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-membership/filter/:tenantId/:offset/:limit",
      handler: "custom-membership.membershipsByFilter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/custom-membership/create",
      handler: "custom-membership.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/custom-membership/update/:membershipId",
      handler: "custom-membership.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
