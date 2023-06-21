"use strict";

/**
 * custom-appointment service
 */

module.exports = () => ({
  getMembershipsByFilter: async ({ tenantId, offset, limit, query }) => {
    try {
      console.log("tenantId", tenantId);
      console.log("query", query);
      const filters = { tenant: { cloverMerchantId: { $eq: tenantId } } };
      const updatedFilters = Object.fromEntries(
        new Map([
          ...Object.entries(filters),
          ...Object.entries(query).map(([p, v]) => [p, { $containsi: v }]),
        ])
      );

      const result = await strapi.entityService.findMany(
        "api::membership.membership",
        {
          filters: updatedFilters,
          sort: [{ id: "desc" }],
          populate: {
            services: {},
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
  create: async ({ membership }) => {
    try {
      const result = await strapi.entityService.create(
        "api::membership.membership",
        {
          data: {
            ...membership,
          },
        }
      );

      return result;
    } catch (error) {
      console.log("___ERROR_SERVICE", error);
      return { error };
    }
  },
  update: async ({ membershipId, membership }) => {
    try {
      const result = await strapi.entityService.update(
        "api::membership.membership",
        membershipId,
        {
          data: {
            ...membership,
          },
        }
      );

      return result;
    } catch (err) {
      return err;
    }
  },
});
