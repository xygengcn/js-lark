const { TimeFormat, uuid } = require("../dist/index.js");

console.log(TimeFormat(new Date(), "yyyy-MM-dd HH:mm:ss DD RR"));

console.log(uuid());
