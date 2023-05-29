'use strict';

/**
 * tenant-landing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tenant-landing.tenant-landing');
