"use strict";

/**
 * custom-employee service
 */

module.exports = () => ({
  employeesByTenantId: async ({ tenantId, email, offset, limit }) => {
    try {
      const result = await strapi.db.query("api::employee.employee").findMany({
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
  employeesByFilter: async ({ tenantId, offset, limit, query }) => {
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
        "api::employee.employee",
        {
          filters: updatedFilters,
          sort: [{ appointmentDay: "desc" }],
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
});
