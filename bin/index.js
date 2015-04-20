var exec, fs, getopt, opt, run, target, timer, wOpts;

fs = require('fs');

exec = require('child_process').exec;

getopt = require('node-getopt').create([['d', 'target=ARG', 'Path to file or directory to watch'], ['r', 'retention=ARG', 'Retention (in ms.) before command (default: 1000ms)'], ['c', 'command=ARG', 'Command to execute after retention'], ['', 'help', 'Display this help']]).bindHelp();

opt = getopt.parseSystem();

timer = null;

run = function(cmd) {
  var proc;
  console.log("Running " + cmd + "...");
  return proc = exec(cmd, function(stderr, stdout) {
    if (stderr) {
      console.error(stderr);
    }
    if (stdout) {
      console.log(stdout);
    }
    return console.log('Done.');
  });
};

if ((target = opt.options['target'] || '.')) {
  wOpts = {
    persistent: true,
    recursive: true
  };
  console.log('Watching', target);
  fs.watch(target, wOpts, function(event, filename) {
    console.log('Watcher', event, filename);
    if (timer) {
      clearTimeout(timer);
    }
    return timer = setTimeout((function() {
      return run(opt.options['command']);
    }), opt.options['retention'] || 1000);
  });
} else {
  getopt.showHelp();
}
