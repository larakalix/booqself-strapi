"use strict";

/**
 * custom-appointment service
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
          populate: {
            employee: {},
            service: {},
          },
          offset: offset ?? 0,
          limit: limit ?? 20,
        });

      return result;
    } catch (err) {
      return err;
    }
  },
  getAppointmentsByFilter: async ({ tenantId, offset, limit, query }) => {
    try {
      const filters = { tenant: { tenantId: { $eq: tenantId } } };
      const updatedFilters = Object.fromEntries(
        new Map([
          ...Object.entries(filters),
          ...Object.entries(query).map(([p, v]) => [p, { $containsi: v }]),
        ])
      );

      if (query?.rangeDate) {
        const [start, end] = query.rangeDate.split("|");
        updatedFilters.appointmentDay = {
          $gte: decodeURIComponent(start),
          $lte: decodeURIComponent(end),
          // $between: [decodeURIComponent(start), decodeURIComponent(end)],
        };
        delete updatedFilters.rangeDate;
      }

      const result = await strapi.entityService.findMany(
        "api::appointment.appointment",
        {
          filters: updatedFilters,
          sort: [{ appointmentDay: "desc" }],
          populate: {
            employee: {},
            service: {},
          },
          offset: offset ?? 0,
          limit: limit ?? 20,
        }
      );

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
  create: async ({ appointment }) => {
    try {
      // {
      //   "name": "Marion Cook",
      //   "email": "marion_cook@example.com",
      //   "appointmentDay": "2023-06-29T11:00:00.000Z",
      //   "phone": "55622877738",
      //   "employee": 2,
      //   "service": 1,
      //   "tenant": 1
      // }
      const { employee, service, tenant, ...values } = appointment;

      const result = await strapi.entityService.create(
        "api::appointment.appointment",
        {
          data: {
            ...values,
            tenant,
            employee,
            service,
          },
        }
      );

      console.log("__DATA", result);

      return result;
    } catch (err) {
      return err;
    }
  },
});
