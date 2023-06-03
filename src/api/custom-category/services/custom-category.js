"use strict";

/**
 * tenant-custom service
 */

module.exports = () => ({
  getCategories: async ({ tenantId }) => {
    try {
      const result = await strapi.db.query("api::category.category").findMany({
        where: {
          tenant: {
            tenantId,
          },
          isActive: true,
          categories: {
            isActive: true,
          },
        },
        populate: {
          categories: {},
        },
      });

      return result;
    } catch (err) {
      return err;
    }
  },
});
