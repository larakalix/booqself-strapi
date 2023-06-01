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

      if (!email) return ctx.badRequest("Email is required");
      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const result = await strapi
        .service("api::client-custom.client-custom")
        .appointmentsById({ tenantId, email, offset: 0, limit: 20 });

      ctx.body = { data: result, error: null };
    } catch (error) {
      ctx.body = {
        data: null,
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }
  },
  boilerplate: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const tenant = await strapi
        .service("api::tenant-custom.tenant-custom")
        .tenantBoilerplate({ tenantId, offset: 0, limit: 20 });

      ctx.body = { data: tenant, error: null };
    } catch (error) {
      ctx.body = {
        data: null,
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }
  },
};