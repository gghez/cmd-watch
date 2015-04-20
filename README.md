# cmd-watch

Command line tool to run a specific command whenever the file system changes on a targetted path.

Useful on a server to watch deployed files update and execute a kind of `npm install`.


## Installation

```
npm install -g cmd-watch
```

## Usage
```
Usage: node index.js

  -d, --target=ARG     Path to file or directory to watch
  -r, --retention=ARG  Retention (in ms.) before command (default: 1000ms)
  -c, --command=ARG    Command to execute after retention
      --help           Display this help
```

Watch current directory and execute `npm install` on file system changes:
```
cmd-watch --command 'npm install'
```
