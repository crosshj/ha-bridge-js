module.exports = function(){
  // SUCKS, this is put here so control-C works in git-bash shell
  // see https://www.bountysource.com/issues/23308082-continuous-ctrl-c-freezes-bash-started-via-git-cmd
  // see http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
  if (process.platform === "win32") {
    GLOBAL.lameStupid = require("readline").createInterface({
      input: process.stdin
    });
    GLOBAL.lameStupid.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
  process.on("SIGINT", function () {
    //graceful shutdown
    process.exit();
  });
}
