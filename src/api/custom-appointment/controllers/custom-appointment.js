"use strict";

/**
 * A set of functions called "actions" for `client-custom`
 */

module.exports = {
  appointmentsByTenantId: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const result = await strapi
        .service("api::custom-appointment.custom-appointment")
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
  appointmentsForBooking: async (ctx, next) => {
    try {
      const tenantId = ctx.params["tenantId"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const result = await strapi
        .service("api::custom-appointment.custom-appointment")
        .appointmentsForBooking({
          tenantId,
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
      const query = ctx?.query ?? null;
      const tenantId = ctx.params["tenantId"];
      const offset = ctx.params["offset"];
      const limit = ctx.params["limit"];

      if (!tenantId) return ctx.badRequest("Tenant Id is required");

      const data = await strapi
        .service("api::custom-appointment.custom-appointment")
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
  create: async (ctx, next) => {
    try {
      const appointment = ctx?.request?.body ?? null;

      if (!appointment) return ctx.badRequest("Data is required");

      const data = await strapi
        .service("api::custom-appointment.custom-appointment")
        .create({ appointment });

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
