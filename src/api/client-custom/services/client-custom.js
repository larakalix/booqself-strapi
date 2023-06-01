"use strict";

/**
 * tenant-custom service
 */

module.exports = () => ({
  appointmentsById: async ({ tenantId, email, offset, limit }) => {
    try {
      const result = await strapi.db
        .query("api::appointment.appointment")
        .findMany({
          where: {
            tenant: {
              tenantId,
            },
            email,
          },
          offset: offset ?? 0,
          limit: limit ?? 20,
        });

      return result;
    } catch (err) {
      return err;
    }
  },
});
