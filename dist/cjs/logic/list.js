"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indent = exports.discIndent = exports.arabicIndent = void 0;
var arabicIndent = exports.arabicIndent = function arabicIndent(doc, count) {
  return doc.widthOfString("".concat(count, ".")) + 5;
};
var discIndent = exports.discIndent = function discIndent(doc, fontSize) {
  return (fontSize || 12) * 1;
}; // eslint-disable-line no-unused-vars

/**
 * Return the calculated indent for the given listStyle,
 * listCount, fontSize and document.
 *
 * @param {PDFKitDocument} document
 * @param {string} listStyle
 * @param {number} listCount
 * @param {number} fontSize
 * @returns {number} The indent for the given list parameters
 */
var indent = exports.indent = function indent(document, listStyle, listCount, fontSize) {
  switch (listStyle) {
    case 'arabic':
      return arabicIndent(document, listCount);
    case 'disc':
    default:
      return discIndent(document, fontSize);
  }
};