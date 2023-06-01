"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const { Server } = require("socket.io");

    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
      allowEIO3: true,
      transports: ["polling"],
    });

    io.on("connection", async (socket) => {
      socket.on("book", ({ appointment, tenantId }) => {
        const dashboard = `dashboard${tenantId}`;

        const notification = {
          type: "appointment",
          message: `You have a new schedule`,
          user: `${appointment.name}`,
          tenantId,
        };

        socket.broadcast.emit(dashboard, { notification });
      });
    });

    strapi.io = io;
  },
};
