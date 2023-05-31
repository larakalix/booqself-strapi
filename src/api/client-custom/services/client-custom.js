"use strict";

/**
 * client-custom service
 */

module.exports = () => ({
  clientAppointmentsById: async ({ email, offset, limit }) => {
    try {
      return await await strapi.db
        .query("api::appointment.appointment")
        .findMany({
          where: {
            email,
          },
          offset: offset ?? 0,
          limit: limit ?? 20,
        });
    } catch (err) {
      return err;
    }
  },
});
