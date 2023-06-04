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

      const timeOptions = [];
      const start = new Date(`2000-01-01 ${response.openingTime}`);
      const end = new Date(`2000-01-01 ${response.closingTime}`);
      const intervalMilliseconds = response.minutesInterval * 60 * 1000;
      let currentTime = start.getTime();

      while (currentTime <= end.getTime()) {
        const timeValue = new Date(currentTime).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        timeOptions.push({
          value: `time${timeOptions.length + 1}`,
          label: timeValue,
        });
        currentTime += intervalMilliseconds;
      }

      const tenant = {
        ...response,
        employees,
        services,
        timeOptions,
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

      const clients = await strapi
        .service("api::custom-client.custom-client")
        .getAppointmentsByTenantId({
          tenantId,
          offset: offset ?? 0,
          limit: limit ?? 20,
        });

      const appointments = await strapi
        .service("api::custom-appointment.custom-appointment")
        .appointmentsByTenantId({
          tenantId,
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
