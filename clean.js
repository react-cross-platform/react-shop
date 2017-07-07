var rimraf = require('rimraf');
var mode = process.argv[2];
var path = process.cwd() + "/static/" + (mode ? mode : "");

console.log("start clean dir " + path);
rimraf(path, function () {
  console.log("clean dir finish!");
});