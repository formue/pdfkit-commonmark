"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeForHeadingLevel = exports.sizeForCode = exports.nameForHeadingLevel = exports.nameForCode = exports.forInternalName = exports.DEFAULT_HEADING_MULTIPLIERS = void 0;
var nameForHeadingLevel = exports.nameForHeadingLevel = function nameForHeadingLevel(level) {
  switch (level) {
    case 1:
      return 'heading-bold';
    case 2:
      return 'heading-bold';
    case 3:
      return 'heading-default';
    case 4:
      return 'heading-bold';
    default:
      return 'heading-default';
  }
};
var DEFAULT_HEADING_MULTIPLIERS = exports.DEFAULT_HEADING_MULTIPLIERS = {
  1: 1.4,
  2: 1.2,
  3: 1.2
};

/**
 * Size for the given heading level as a multiple of the base font size.
 *
 * @param {number} level Heading level (1-6)
 * @param {number} [baseSize=12] Base font size
 * @param {Object.<number, number>} [headingSizes] Optional map of heading level
 *   to multiplier of baseSize. Levels not present fall back to 1x. When omitted,
 *   the library defaults (h1 1.4x, h2/h3 1.2x, else 1x) apply.
 * @returns {number} The font size to use for the heading
 */
var sizeForHeadingLevel = exports.sizeForHeadingLevel = function sizeForHeadingLevel(level) {
  var baseSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
  var headingSizes = arguments.length > 2 ? arguments[2] : undefined;
  var multipliers = headingSizes || DEFAULT_HEADING_MULTIPLIERS;
  var multiplier = typeof multipliers[level] === 'number' ? multipliers[level] : 1;
  return baseSize * multiplier;
};
var nameForCode = exports.nameForCode = function nameForCode() {
  return 'code';
};
var sizeForCode = exports.sizeForCode = function sizeForCode(options) {
  if (!options || !options.fonts) {
    throw new Error('missing options.fonts');
  }
  // TODO: Adjusting the font-size requires adjusting the baseline to make sure
  //  inline-code is aligned with the surrounding text.
  return options.fontSize * 1;
};

/**
 * Get the defined font for the given
 * internal name from the supplied
 * options map.
 *
 * @param {string} internalName
 * @param {object} options
 * @returns {string} The actual font name to use with pdfkit
 */
var forInternalName = exports.forInternalName = function forInternalName(internalName, options) {
  if (!options || !options.fonts) {
    throw new Error('missing options.fonts');
  }
  return options.fonts[internalName];
};