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
});
