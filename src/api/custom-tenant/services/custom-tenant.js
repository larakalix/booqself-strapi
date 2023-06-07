"use strict";

/**
 * custom-tenant service
 */

module.exports = () => ({
  tenantById: async ({ tenantId, justTenant }) => {
    try {
      const response = await strapi.db.query("api::tenant.tenant").findOne({
        where: {
          $or: [
            {
              tenantId,
            },
            {
              cloverMerchantId: tenantId,
            },
          ],
        },
      });

      let employees = [];
      let services = [];
      let timeOptions = [];

      if (!justTenant || justTenant === "false") {
        employees = await strapi
          .service("api::custom-employee.custom-employee")
          .employeesByTenantId({ tenantId });

        services = await strapi
          .service("api::custom-service.custom-service")
          .servicesByTenantId({ tenantId });

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
  update: async ({ tenantId, tenant }) => {
    try {
      const result = await strapi.entityService.update(
        "api::tenant.tenant",
        tenantId,
        {
          data: {
            ...tenant,
          },
        }
      );

      return result;
    } catch (err) {
      return err;
    }
  },
});
