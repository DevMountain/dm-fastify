async function routes(app, options) {
  app.get("/", (req, res) => {
    res.view("index.html");
  });
}

module.exports = routes;
