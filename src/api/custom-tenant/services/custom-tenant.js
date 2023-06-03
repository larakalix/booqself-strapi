"use strict";

/**
 * custom-tenant service
 */

module.exports = () => ({
  tenantById: async ({ tenantId }) => {
    try {
      const response = await strapi.db.query("api::tenant.tenant").findOne({
        where: { tenantId },
      });

      const employees = await strapi
        .service("api::custom-employee.custom-employee")
        .employeesByTenantId({ tenantId });

      const services = await strapi
        .service("api::custom-service.custom-service")
        .servicesByTenantId({ tenantId });

      const tenant = {
        ...response,
        employees,
        services,
      };

      return tenant;
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
