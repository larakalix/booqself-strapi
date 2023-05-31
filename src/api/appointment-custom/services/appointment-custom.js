"use strict";

/**
 * tenant-custom service
 */

module.exports = () => ({
  appointmentsByTenantId: async ({ tenantId, email, offset, limit }) => {
    try {
      const result = await strapi.db
        .query("api::appointment.appointment")
        .findMany({
          where: {
            tenant: {
              tenantId,
            },
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
