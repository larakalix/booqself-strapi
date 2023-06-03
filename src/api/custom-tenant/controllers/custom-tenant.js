"use strict";

/**
 * A set of functions called "actions" for `tenant-custom`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  tenantById: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const tenant = await strapi
        .service("api::custom-tenant.custom-tenant")
        .tenantById({ tenantId });

      ctx.body = { data: tenant, error: null };
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
  boilerplate: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const tenant = await strapi
        .service("api::custom-tenant.custom-tenant")
        .tenantBoilerplate({ tenantId, offset: 0, limit: 30 });

      ctx.body = { data: tenant, error: null };
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
