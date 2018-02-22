/* eslint-disable no-unused-vars */
import numeral from 'numeral'

// load a format
numeral.register('format', 'balanceDisplay', {
  regexps: {
    format: /(#)/,
    unformat: /(#)/,
  },
  format(value, format, roundingFunction) {
    /* var space = numeral._.includes(format, ' %') ? ' ' : '',
      output;

    value = value * 100;

    // check for space before %
    format = format.replace(/\s?\%/, '');

    output = numeral._.numberToFormat(value, format, roundingFunction);

    if (numeral._.includes(output, ')')) {
      output = output.split('');

      output.splice(-1, 0, space + '%');

      output = output.join('');
    } else {
      output = output + space + '%';
    } */

    return '111';
  },
  unformat(string) {
    return numeral._.stringToNumber(string) * 0.01;
  },
});

// use your custom format
numeral().format('0%');
