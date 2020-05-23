const server = require("./api/server.js");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`\n\t\t\t\t\t*** API running on port ${PORT} ***\n`);
});
