"use strict";

/**
 * A set of functions called "actions" for `client-custom`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  categories: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const result = await strapi
        .service("api::custom-category.custom-category")
        .getCategories({ tenantId });

      ctx.body = { data: result, error: null };
    } catch (error) {
      ctx.body = {
        data: [],
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }
  },
};
