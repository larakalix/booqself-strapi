"use strict";

/**
 * custom-appointment service
 */

module.exports = () => ({
  appointmentsByTenantId: async ({ tenantId, offset, limit }) => {
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
  appointmentsForBooking: async ({ tenantId, month, year }) => {
    try {
      let filter = {
        $gte: new Date().toISOString().split("T")[0],
      };

      if (month && year) {
        const _month = parseInt(month, 10) + 1;
        filter = {
          $gte: new Date(`${year}-${_month}-01`).toISOString().split("T")[0],
          $lte: new Date(`${year}-${_month}-31`).toISOString().split("T")[0],
        };
      }

      console.log(filter);

      const result = await strapi.db
        .query("api::appointment.appointment")
        .findMany({
          where: {
            tenant: {
              tenantId,
            },
            appointmentDay: filter,
          },
        });

      return result
        .map((item) => ({
          id: item.id,
          appointmentDay: item.appointmentDay,
        }))
        .sort(
          (a, b) => new Date(a.appointmentDay) - new Date(b.appointmentDay)
        );
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
        const [from, to] = query.rangeDate.split("|");
        updatedFilters.appointmentDay = {
          // $gte: decodeURIComponent(start),
          // $lte: decodeURIComponent(end),
          // $between: [decodeURIComponent(start), decodeURIComponent(end)],
          $gte: new Date(from).toISOString().split("T")[0],
          $lte: new Date(to).toISOString().split("T")[0],
        };
        delete updatedFilters.rangeDate;
      }

      if (query?.employee) {
        updatedFilters.employee = {
          name: {
            $containsi: query.employee,
          },
        };
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

      return result;
    } catch (err) {
      return err;
    }
  },
});
