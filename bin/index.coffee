fs = require 'fs'
exec = require 'child_process'
  .exec

getopt = require 'node-getopt'
  .create [
      ['d', 'target=ARG', 'Path to file or directory to watch']
      ['r', 'retention=ARG', 'Retention (in ms.) before command (default: 1000ms)']
      ['c', 'command=ARG', 'Command to execute after retention']
      ['', 'help', 'Display this help']
    ]
  .bindHelp()

opt = getopt.parseSystem()
timer = null

run = (cmd) ->
  console.log "Running #{cmd}..."
  proc = exec cmd, (stderr, stdout) ->
    console.error stderr if stderr
    console.log stdout if stdout
    console.log 'Done.'

if (target = opt.options['target'] || '.')
  wOpts =
    persistent: true
    recursive: true
  console.log 'Watching', target
  fs.watch target, wOpts, (event, filename) ->
  	console.log 'Watcher', event, filename
  	clearTimeout timer if timer
  	timer = setTimeout (-> run opt.options['command']), opt.options['retention'] || 1000
else
  getopt.showHelp()
