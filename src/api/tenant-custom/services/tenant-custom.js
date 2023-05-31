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
      const service = await strapi.db;

      const response = await service.query("api::tenant.tenant").findOne({
        where: { tenantId },
      });

      const clients = await service.query("api::client.client").findMany({
        where: {
          tenant: {
            tenantId,
          },
        },
        offset: offset ?? 0,
        limit: limit ?? 20,
      });

      const appointments = await service
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
