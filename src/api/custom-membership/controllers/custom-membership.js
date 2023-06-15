"use strict";

/**
 * A set of functions called "actions" for `client-custom`
 */

module.exports = {
  membershipsByFilter: async (ctx, next) => {
    try {
      const query = ctx?.query ?? null;
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const data = await strapi
        .service("api::custom-membership.custom-membership")
        .getMembershipsByFilter({ tenantId, offset, limit, query });

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
  create: async (ctx, next) => {
    try {
      const membership = ctx?.request?.body ?? null;

      if (!membership) return ctx.badRequest("Data is required");

      const data = await strapi
        .service("api::custom-membership.custom-membership")
        .create({ membership });

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
  update: async (ctx, next) => {
    try {
      const membershipId = ctx.params["membershipId"];
      const membership = ctx?.request?.body ?? null;

      if (!membershipId) return ctx.badRequest("Tenant Id is required");
      if (!membership) return ctx.badRequest("Data is required");

      const data = await strapi
        .service("api::custom-membership.custom-membership")
        .update({ membershipId, membership });

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
