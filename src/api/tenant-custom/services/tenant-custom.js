"use strict";

/**
 * tenant-custom service
 */

module.exports = () => ({
  tenantById: async ({ tenantId }) => {
    try {
      return await strapi.db.query("api::tenant.tenant").findOne({
        where: { tenantId },
      });
    } catch (err) {
      return err;
    }
  },
  tenantBoilerplate: async ({ tenantId, offset, limit }) => {
    try {
      const response = await strapi.db.query("api::tenant.tenant").findOne({
        where: { tenantId },
      });

      const clients = await strapi.entityService.findMany(
        "api::client.client",
        {
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
        }
      );

      const appointments = await strapi.entityService.findMany(
        "api::appointment.appointment",
        {
          filters: {
            tenant: {
              tenantId: {
                $eq: tenantId,
              },
            },
          },
          sort: [{ appointmentDay: "desc" }],
          offset: offset ?? 0,
          limit: limit ?? 20,
        }
      );

      const tenant = {
        ...response,
        clients: {
          data: [...clients],
          meta: {
            pagination: {
              page: 1,
              pageSize: limit,
              pageCount: 1,
              total: clients.length,
            },
          },
        },
        appointments: {
          data: [...appointments],
          meta: {
            pagination: {
              page: 1,
              pageSize: limit,
              pageCount: 1,
              total: clients.length,
            },
          },
        },
      };

      return tenant;
    } catch (err) {
      return err;
    }
  },
});
