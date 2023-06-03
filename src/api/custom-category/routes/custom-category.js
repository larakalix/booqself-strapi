module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-category/:tenantId",
      handler: "custom-category.categories",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
