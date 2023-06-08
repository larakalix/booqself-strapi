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

      const { openingTime, closingTime, minutesInterval } = response;
      const intervalMilliseconds = minutesInterval * 60 * 1000;

      const timeOptions = Array.from(
        {
          length:
            Math.floor(
              (new Date(`2000-01-01 ${closingTime}`).getTime() -
                new Date(`2000-01-01 ${openingTime}`).getTime()) /
                intervalMilliseconds
            ) + 1,
        },
        (_, index) => {
          const currentTime = new Date(
            new Date(`2000-01-01 ${openingTime}`).getTime() +
              index * intervalMilliseconds
          );
          return {
            value: `time${index + 1}`,
            label: currentTime.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          };
        }
      );

      if (!justTenant || justTenant === "false") {
        employees = await strapi
          .service("api::custom-employee.custom-employee")
          .employeesByTenantId({ tenantId: response.tenantId });

        services = await strapi
          .service("api::custom-service.custom-service")
          .servicesByTenantId({ tenantId: response.tenantId });
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
