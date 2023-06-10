const path = require("path");
const fastify = require("fastify")({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore:
          "pid,hostname,reqId,req.hostname,req.remoteAddress,req.remotePort",
      },
    },
  },
});

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/view"), {
  engine: {
    nunjucks: require("nunjucks"),
  },
  root: path.join(__dirname, "views"),
});
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
});

fastify.register(require("./src/app.js"));

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
