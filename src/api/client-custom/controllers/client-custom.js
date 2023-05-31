"use strict";

/**
 * A set of functions called "actions" for `client-custom`
 */

module.exports = {
  clientAppointmentsById: async (ctx, next) => {
    try {
      const email = ctx.params["email"];

      if (!email) return ctx.badRequest("Email is required");

      const appointments = await strapi
        .service("api::client-custom.client-custom")
        .clientAppointmentsById({ email, offset: 0, limit: 20 });

      ctx.body = { data: appointments, error: null };
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
