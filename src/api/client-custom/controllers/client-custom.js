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
  appointmentsById: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];
      const email = ctx.params["email"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!email) return ctx.badRequest("Email is required");
      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const result = await strapi
        .service("api::client-custom.client-custom")
        .getAppointmentsById({ tenantId, email, offset, limit });

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
  clientsByFilter: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const data = await strapi
        .service("api::client-custom.client-custom")
        .getClientsByFilter({ tenantId, offset, limit });

      console.log({ ...data, error: null });

      ctx.body = { ...data, error: null };
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
