"use strict";

/**
 * tenant-custom service
 */

module.exports = () => ({
  getAppointmentsById: async ({ tenantId, email, offset, limit }) => {
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
  getClientsByFilter: async ({ tenantId, offset, limit }) => {
    try {
      const result = await strapi.entityService.findMany("api::client.client", {
        filters: {
          tenant: {
            tenantId: {
              $eq: tenantId,
            },
          },
        },
        sort: [{ publishedAt: "desc" }],
        offset: offset ?? 0,
        limit: limit ?? 20,
      });

      return {
        data: result,
        meta: {
          pagination: {
            page: 1,
            pageSize: limit,
            pageCount: 1,
            total: result.length,
          },
        },
      };
    } catch (err) {
      return err;
    }
  },
});
