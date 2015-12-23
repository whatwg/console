exports = (module.exports = Logger)

exports.maybeApplyFormatSpecifier = maybeApplyFormatSpecifier;
exports.getFormatter = getFormatter;
exports.format = format;

function notImplemented() { throw new Error('not implemented'); };

const converters = {
  '%s': function(a) { return '' + a; }, // string
  '%d': function(a) { return Number.parseInt(a); }, // integer
  '%i': function(a) { return Number.parseInt(a); }, // integer
  '%f': function(a) { return Number.parseFloat(a); }, // float

  // these require a UI
  '%o': notImplemented, // expandable DOM element
  '%O': notImplemented, // expandable JS Object
  '%c': notImplemented, // applies CSS
};
const specifier = Object.keys(converters);


const hasSpecifier = new RegExp('(' + specifier.join('|') + ')');

global.print = print;
function print(logLevel, ...args) {

  const message = args.join(' ');
  if (logLevel === 'error') {
    process.stderr.write(message + '\n');
    return;
  }

  if (logLevel === 'log' || logLevel === 'info' || logLevel === 'warn') {
    process.stdout.write(message + '\n');
    return;
  }
}

function Logger(logLevel, ...args) {
  if (args.length === 0) {
    return;
  }

  args = maybeApplyFormatSpecifier(args);

  global.print(logLevel, args);
}

function maybeApplyFormatSpecifier(args) {
  if (args.length === 1) {
    return args;
  }

  if (!hasSpecifier.test(args[0])) {
    return args;
  }

  return format(args);
}

function format(args) {

  const token = args[0].split('');
  let rest;
  let result;
  for (let i = 0; i < (token.length - 1); i++) {
    if (specifier.indexOf(token[i] + token[i + 1]) !== -1) {
      const formatter = getFormatter(token[i] + token[i + 1]);

      let formatted = args[0].replace(token[i] + token[i + 1], formatter(args[1]));
      rest = args.slice(2);
      result = [formatted, ...rest];
      break;
    }
  }

  if (!hasSpecifier.test(result)) {
    return result;
  }

  if (result.length === 1) {
    return result;
  }

  return format(result);
}

function getFormatter(specifier) {
  function passThrough(a) { return a; };

  if (!converters[specifier]) {
    return passThrough;
  }

  return converters[specifier];
}
