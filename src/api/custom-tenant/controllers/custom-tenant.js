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
      const query = ctx?.query ?? null;

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const tenant = await strapi
        .service("api::custom-tenant.custom-tenant")
        .tenantById({ tenantId, justTenant: query?.justTenant ?? false });

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
  update: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];
      const tenant = ctx?.request?.body ?? null;

      if (!tenantId) return ctx.badRequest("Tenant Id is required");
      if (!tenant) return ctx.badRequest("Data is required");

      const data = await strapi
        .service("api::custom-tenant.custom-tenant")
        .update({ tenantId, tenant });

      ctx.body = { data: { ...data }, error: null };
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
