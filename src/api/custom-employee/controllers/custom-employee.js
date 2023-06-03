"use strict";

/**
 * A set of functions called "actions" for `custom-employee`
 */

module.exports = {
  employeesByTenantId: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const result = await strapi
        .service("api::custom-employee.custom-employee")
        .employeesByTenantId({
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
  employeesByFilter: async (ctx, next) => {
    try {
      const query = ctx?.query ?? null;
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const data = await strapi
        .service("api::custom-employee.custom-employee")
        .getAppointmentsByFilter({ tenantId, offset, limit, query });

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
