const ts = require('typescript');
const _path = require('path');
const chalk = require('chalk');

const ENV = process.env.NODE_ENV || process.env.ENV || process.env.npm_lifecycle_event || '';
const HMR = _hasProcessFlag('hot');
const AOT = process.env.BUILD_AOT || _hasNpmFlag('aot');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.WEBSERVERPORT ? 5000 : 2000;
const isProd = ENV === 'prod';
const isStats = process.env.STATS === 'true';
const isDevServer = _isDevServer();
const e2e =  !!process.env.BUILD_E2E;
const watch = _hasProcessFlag('watch');

const _options = {
  metadata: {
    ENV: ENV,
    HMR: HMR,
    AOT: AOT,
    E2E: e2e,
    WATCH: watch,
    isStats: isStats,
    isProd: isProd,
    isDevServer: isDevServer,
    host: HOST,
    port: PORT,
    public: HOST + ':' + PORT,
    title: 'hibiscus.js',
    keywords: 'hibiscus',
    description: 'hibiscus',
    baseUrl: '/',
  },
  path: {
    root: _root(),
    output: _root('dist'),
    src: _root('src'),
    node_modules: _root('node_modules'),
    tsconfig: 'tsconfig.json'
  }
};

function _root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return _path.join.apply(_path, [_path.resolve(__dirname, '..')].concat(args));
}

function _isDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

function _hasNpmFlag(flag) {
  return (process.env.npm_lifecycle_event || '').includes(flag);
}

function _hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function _chalk(options) {
  console.log("\n \n**************************************************************************");
  //console.log("options: " + JSON.stringify(options));
  if (options.ENV) {
    console.log("NODE_ENV not set!");
  }
  var ENV_color = options.ENV === 'dev'
    ? chalk.bold.blue
    : chalk.bold.green;
  var isDevServer_color = options.isDevServer
    ? chalk.bold.blue
    : chalk.red;
  var isProd_color = options.isProd
    ? chalk.bold.green
    : chalk.red;
  var AOT_color = options.AOT
    ? chalk.blue
    : chalk.red;
  var HMR_color = options.HMR
    ? chalk.blue
    : chalk.red;

  console.log(ENV_color("Building for: " + options.ENV));
  console.log(isDevServer_color("isDevServer: " + options.isDevServer));
  console.log(AOT_color("AOT: " + options.AOT));
  console.log(HMR_color("HMR: " + options.HMR));
  console.log(isProd_color("isProd: " + options.isProd));
  console.log("isStats: " + options.isStats);
  console.log("");
  console.log("output: " + _options.path.output);
  console.log("**************************************************************************\n \n");
}

exports.path = _path;
exports.options = _options;
exports.chalk = _chalk;
exports.root = _root;
exports.isDevServer = _isDevServer;
exports.hasNpmFlag = _hasNpmFlag;
exports.hasProcessFlag = _hasProcessFlag;

