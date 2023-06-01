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
  appointmentsByTenantId: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const result = await strapi
        .service("api::appointment-custom.appointment-custom")
        .appointmentsByTenantId({
          tenantId,
          offset: offset ?? 0,
          limit: limit ?? 20,
        });

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
  appointmentsByFilter: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const data = await strapi
        .service("api::appointment-custom.appointment-custom")
        .getAppointmentsByFilter({ tenantId, offset, limit });

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
