"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = require("./utils.js");
var _executeOperation = _interopRequireDefault(require("./logic/execute-operation.js"));
var Font = _interopRequireWildcard(require("./logic/font.js"));
var _defaultOptions = _interopRequireDefault(require("./default-options.js"));
var List = _interopRequireWildcard(require("./logic/list.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @typedef {Object} Fonts
 * @property {string} default
 * @property {string} bold
 * @property {string} italic
 * @property {string} bold-italic
 * @property {string} heading-bold
 * @property {string} heading-default
 * @property {string} code
 */
/**
 * @typedef {Object} Options
 * @property {number} [fontSize=12] Base font size
 * @property {Fonts} [fonts] Set fonts used for specific markup
 * @property {string} [fillColor] Text color
 * @property {boolean} [debug]
 */
var PDFOperationPropertyStack = /*#__PURE__*/function () {
  function PDFOperationPropertyStack() {
    _classCallCheck(this, PDFOperationPropertyStack);
    this.stack = [];
  }

  /**
   * Push instance to the stack
   * @param instance
   * @returns {PDFOperationPropertyStack} the stack instance
   */
  return _createClass(PDFOperationPropertyStack, [{
    key: "push",
    value: function push(instance) {
      this.stack.push(instance);
      return this;
    }

    /**
     * Remove the top-most item from the stack and return it.
     * @returns {*} the top-most item of the stack
     */
  }, {
    key: "pop",
    value: function pop() {
      return this.stack.pop();
    }

    /**
     * Returns the top-most item of the stack, {@see #pop},
     * without removing it from the stack.
     *
     * @returns {*} the top-most item of the stack
     */
  }, {
    key: "peek",
    value: function peek() {
      if (this.stack.length === 0) return undefined;
      return this.stack[this.stack.length - 1];
    }

    /**
     * Returns the union of all stack items. Where
     * properties from items higher up the stack will
     * overwrite properties from items lower in the
     * stack.
     *
     * @returns {*}
     */
  }, {
    key: "get",
    value: function get() {
      var additional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var stackUnion = this.stack.reduce(function (reduced, current) {
        return Object.assign(reduced, current);
      }, {});
      return Object.assign(stackUnion, additional);
    }

    /**
     * Return the top-most object from the stack having
     * set the requested property
     *
     * @param {string|Symbol} property to search for
     * @returns {*} the top-most item on the stack having the requested property
     */
  }, {
    key: "find",
    value: function find(property) {
      for (var i = this.stack.length - 1; i >= 0; i--) {
        var f = this.stack[i];
        if (Object.prototype.hasOwnProperty.call(f, property)) {
          return f;
        }
      }
      return undefined;
    }

    /**
     * Returns the property-value from the top-most item
     * where the requested property is defined.
     *
     * {@see #find}
     *
     * @param {string|Symbol} property property to search for
     * @returns {*} the property-value of the top-most item on the stack having the requested property
     */
  }, {
    key: "getValue",
    value: function getValue(property) {
      var frame = this.find(property);
      if (frame) {
        return frame[property];
      }
      return undefined;
    }

    /**
     * Returns the incremented property value from the
     * top-most item where the requested property is
     * defined.
     *
     * @param property
     * @param {number} [inc] defaults to 1
     * @returns {number}
     */
  }, {
    key: "getIncValue",
    value: function getIncValue(property) {
      var inc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var frame = this.find(property);
      if (frame) {
        if (typeof frame[property] !== 'number') {
          throw new Error("property '".concat(property, "' must be a number"));
        }
        frame[property] += inc;
        return frame[property];
      }
      return undefined;
    }
  }]);
}();
/**
 * An implementation of a renderer for commonmark. Using
 * pdfkit for rendering of the pdf.
 */
var CommonmarkPDFKitRenderer = /*#__PURE__*/function () {
  /**
   * @param {Options} [options]
   */
  function CommonmarkPDFKitRenderer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CommonmarkPDFKitRenderer);
    if (_typeof(options) !== 'object' || Array.isArray(options)) {
      throw new Error('options must be a plain object');
    }

    // ensure default options
    this.options = (0, _utils.deepDefaults)(options, _defaultOptions["default"]);
  }

  /**
   * Takes a commonmark node tree and converts it into our
   * intermediate operations format.
   *
   * For information on the commonmark nodeTree
   * {@see https://github.com/commonmark/commonmark.js#usage}.
   *
   * @param {object} nodeTree
   * @returns {Array} of operations
   */
  return _createClass(CommonmarkPDFKitRenderer, [{
    key: "operations",
    value: function operations(nodeTree) {
      var walker = nodeTree.walker();
      var event, node;

      // array holding the extracted operations
      var operations = [];
      var stack = new PDFOperationPropertyStack();

      // define initial values
      stack.push({
        font: 'default',
        fontSize: this.options.fontSize || 12,
        fillColor: this.options.fillColor || 'black',
        strokeColor: 'black',
        fillOpacity: 1,
        strokeOpacity: 1,
        continued: false,
        listDepth: 0
      });

      /*
           text
              emp -> push(font=italic)
                  link -> push(link,fillColor,underline)
                      strong -> push(font=bold-italic)
                      /strong -> pull(font)
                  /link -> pull(link, fillColor, underline)
              /emp -> pull(font)
              text
              /text
          /text
        */

      var lastOperationWith = function lastOperationWith(property) {
        for (var i = operations.length - 1; i >= 0; i--) {
          var operation = operations[i];
          if (Object.prototype.hasOwnProperty.call(operation, property)) {
            return operation;
          }
        }
        return undefined;
      };
      var mapListTypes = function mapListTypes(type) {
        var defaultListStyleType = 'disc';
        switch (type) {
          case 'bullet':
            return 'disc';
          case 'ordered':
            return 'arabic';
          default:
            console.error("unkown list type '".concat(type, "', falling back to default: ").concat(defaultListStyleType));
            return defaultListStyleType;
        }
      };

      // walk the commonmark AST
      while (event = walker.next()) {
        node = event.node;
        var previousOperation = operations[operations.length - 1];
        var moveDown = function moveDown() {
          var moveDownIsAllowed = stack.getValue('listDepth') === 0;
          if (moveDownIsAllowed) {
            operations.push({
              moveDown: true
            });
          }
        };
        switch (node.type) {
          case 'text':
            {
              if (event.entering) {
                operations.push(stack.get({
                  text: node.literal
                }));
              }
              break;
            }
          case 'softbreak':
            {
              if (event.entering) {
                var previousText = lastOperationWith('text');
                // check if previous texts ends on whitespace
                if (previousText && !/ $/.test(previousText.text)) {
                  // if not, add an additional softbreak operation. The
                  // softbreak string is configurable (defaults to a space);
                  // a '\n' softbreak ends the continued run so it renders
                  // as a hard line break.
                  var softbreak = this.options.softbreak;
                  var continued = softbreak === '\n' ? false : true;
                  operations.push({
                    text: softbreak,
                    continued: continued
                  });
                }
              }
              break;
            }
          case 'linebreak':
            {
              if (event.entering) {
                // must discontinue any open text
                if (previousOperation && previousOperation.continued === true) {
                  previousOperation.continued = false;
                }
                operations.push(stack.get({
                  continued: true,
                  text: '\n'
                }));
              } else {
                // this case is never called!
              }
              break;
            }
          case 'emph':
            {
              if (event.entering) {
                var nextFont = stack.getValue('font') === 'bold' ? 'bold-italic' : 'italic';
                operations.push(stack.push({
                  font: nextFont
                }).get());
              } else {
                stack.pop();
                operations.push(stack.get());
              }
              break;
            }
          case 'strong':
            {
              if (event.entering) {
                var _nextFont = stack.getValue('font') === 'italic' ? 'bold-italic' : 'bold';
                operations.push(stack.push({
                  font: _nextFont
                }).get());
              } else {
                stack.pop();
                operations.push(stack.get());
              }
              break;
            }
          case 'link':
            {
              if (event.entering) {
                operations.push(stack.push({
                  fillColor: 'blue',
                  link: node.destination,
                  underline: true
                }).get());
              } else {
                stack.pop();
                operations.push(stack.get());
              }
              break;
            }
          case 'image':
            // unsupported
            break;
          case 'code':
            if (event.entering) {
              operations.push(stack.get({
                text: node.literal,
                font: Font.nameForCode(),
                fontSize: Font.sizeForCode(this.options)
              }));
            } else {
              stack.pop();
              operations.push(stack.get());
            }
            break;
          case 'document':
            // ignored
            break;
          case 'html_inline':
            // unsupported
            break;
          case 'paragraph':
            {
              if (event.entering) {
                stack.push({
                  continued: true
                });
              } else {
                stack.pop();
                lastOperationWith('text').continued = false;

                // prevent repeated move down operations
                if (!previousOperation.moveDown) {
                  moveDown();
                }
              }
              break;
            }
          case 'block_quote':
            {
              // unsupported
              // TODO
              break;
            }
          case 'item':
            {
              if (event.entering) {
                var listItemIndex = stack.getIncValue('listItemIndex');
                operations.push(stack.get({
                  listItem: true,
                  listItemStyle: mapListTypes(node._listData.type),
                  listItemIndex: listItemIndex
                }));
              }
              break;
            }
          case 'list':
            {
              if (event.entering) {
                operations.push(stack.push({
                  listDepth: stack.getValue('listDepth') + 1,
                  listItemIndex: -1
                }).get({
                  listItemStyle: mapListTypes(node._listData.type),
                  list: true
                }));
              } else {
                var item = stack.pop();

                // find start operation
                for (var i = operations.length - 1; i >= 0; i--) {
                  var operation = operations[i];
                  // update the listItemCount (used for arabic, as there we need to
                  // space the number and the list items according to the longest
                  // number we need to print
                  if (operation.listDepth === item.listDepth) {
                    if (operation.listItem === true || operation.list === true) {
                      operation.listItemCount = item.listItemIndex + 1;
                    }
                    if (operation.list === true) {
                      break;
                    }
                  }
                }
                operations.push(stack.get());
                moveDown();
              }
              break;
            }
          case 'heading':
            {
              if (event.entering) {
                operations.push(stack.push({
                  font: Font.nameForHeadingLevel(node.level),
                  fontSize: Font.sizeForHeadingLevel(node.level, this.options.fontSize, this.options.headingSizes),
                  continued: true
                }).get());
              } else {
                stack.pop();
                operations.push(stack.get());
                var _previousText = lastOperationWith('text');
                if (_previousText) {
                  _previousText.continued = false;
                }
                moveDown();
              }
              break;
            }
          case 'code_block':
            {
              if (event.entering) {
                operations.push(stack.get({
                  font: Font.nameForCode(),
                  fontSize: Font.sizeForCode(this.options),
                  text: node.literal
                }));
                moveDown();
              }
              break;
            }
          case 'html_block':
            {
              // unsupported
              break;
            }
          case 'thematic_break':
            {
              if (event.entering) {
                operations.push({
                  horizontalLine: true
                });
                moveDown();
              }
              break;
            }
        }
      }
      var removeRedundancies = function removeRedundancies(operation, index, operations) {
        var previousState = operations.slice(0, index).reduce(function (reduced, current) {
          return Object.assign(reduced, current);
        }, {});

        //console.log('_', index);
        //console.log('_previousState', JSON.stringify(previousState));
        //console.log('_operation____', JSON.stringify(operation));

        var PROPERTY_RULES = {
          continued: function continued(current) {
            return Object.prototype.hasOwnProperty.call(current, 'text');
          },
          link: function link(current) {
            return Object.prototype.hasOwnProperty.call(current, 'text');
          },
          underline: function underline(current) {
            return Object.prototype.hasOwnProperty.call(current, 'text');
          },
          font: function font(current, previous) {
            var hasChanged = current.font !== previous.font;
            return (
              // include on text operation if changed
              Object.prototype.hasOwnProperty.call(current, 'text') && hasChanged
              // include on non-text operation if changed
              || hasChanged
            );
          },
          fontSize: function fontSize(current, previous) {
            return previous.fontSize !== current.fontSize;
          },
          moveDown: function moveDown() {
            return true;
          },
          // keep always
          horizontalLine: function horizontalLine() {
            return true;
          },
          // keep always
          listItemStyle: function listItemStyle(current) {
            return current.listItem === true || current.list === true;
          },
          listItem: function listItem() {
            return true;
          },
          // keep always
          listItemIndex: function listItemIndex(current) {
            return current.listItem === true;
          },
          listItemCount: function listItemCount(current) {
            return current.listDepth > 0 || current.listItem === true;
          }
        };
        var propertiesToKeepEvenIfRedundant = [
          //'continued', 'link', 'underline'
        ];
        if (previousState) {
          var properties = Object.keys(operation);
          var propertiesToKeep = properties.filter(function (property) {
            var keepAccordingToPropertyRules = Object.prototype.hasOwnProperty.call(PROPERTY_RULES, property) && PROPERTY_RULES[property](operation, previousState);
            return propertiesToKeepEvenIfRedundant.includes(property) || keepAccordingToPropertyRules || !Object.prototype.hasOwnProperty.call(PROPERTY_RULES, property) && operation[property] !== previousState[property];
          });
          var reducedOperation = propertiesToKeep.reduce(function (reduced, property) {
            return Object.assign(reduced, _defineProperty({}, property, operation[property]));
          }, {});

          //console.log('_reduced______', JSON.stringify(reducedOperation));

          return reducedOperation;
        }

        //console.log('_original_____', JSON.stringify(operation));
        return operation;
      };
      return operations.map(removeRedundancies);
    }

    /**
     * Return the (estimated) height which the provided
     * markdown will require upon rendering.
     *
     * Similar to the 'heightOfString' function provided
     * by pdfkit. It's also used here.
     *
     * TODO: What to return if the rendering would span multiple pages?
     *
     * @param {PDFDocument} doc
     * @param {object} nodeTree
     * @param {object} pdfkitOptions
     * @returns {number} the height which the provided markdown will require upon rendering
     */
  }, {
    key: "heightOfMarkdown",
    value: function heightOfMarkdown(doc, nodeTree, pdfkitOptions) {
      return this.dimensionsOfMarkdown(doc, nodeTree, pdfkitOptions).h;
    }

    /**
     * Return the (estimated) dimensions which the provided
     * markdown will occupy upon rendering.
     **
     * TODO: What to return if the rendering would span multiple pages?
     *
     * @param {PDFDocument} doc
     * @param {object} nodeTree
     * @param {object} pdfkitOptions
     * @returns {{x:number,y:number,w:number,h:number}} the dimensions of the bounding box of the rendered markup
     */
  }, {
    key: "dimensionsOfMarkdown",
    value: function dimensionsOfMarkdown(doc, nodeTree, pdfkitOptions) {
      var _this = this;
      var operations = this.operations(nodeTree);
      var targetWidth = pdfkitOptions && pdfkitOptions.width || doc.page && doc.page.width - doc.page.margins.left - doc.page.margins.right;
      var initialPosition = {
        x: doc.x,
        y: doc.y
      };
      var dimensions = Object.assign({}, initialPosition, {
        w: targetWidth,
        h: 0
      });
      var currentLineHeight = 0;
      var currentFontSize = this.options.fontSize;
      var continuousText = '';
      var indent = 0;
      operations.forEach(function (op) {
        var heightChange = 0;

        // Must move down BEFORE changing the font!
        // As the moveDown is based on the PREVIOUS lines height,
        // not on the next lines height.
        if (op.moveDown) {
          currentLineHeight = doc._font.lineHeight(currentFontSize, true);
          heightChange += currentLineHeight * op.moveDown;
        }
        if (op.moveUp) {
          currentLineHeight = doc._font.lineHeight(currentFontSize, true);
          heightChange -= currentLineHeight * op.moveUp;
        }

        // change the font
        if (op.font) {
          var resolvedFont = Font.forInternalName(op.font, _this.options);
          doc.font(resolvedFont);
        }

        // change the fontSize
        if (op.fontSize) {
          currentFontSize = op.fontSize;
          doc.fontSize(currentFontSize);
        }

        // calculate height for text
        if (op.text) {
          // if we have continuous text, we collect it all, and then do
          // a single height calculation for the full text.
          continuousText += op.text;
          if (!op.continued) {
            var textOptions = Object.assign({}, pdfkitOptions);
            if (pdfkitOptions && Object.prototype.hasOwnProperty.call(pdfkitOptions, 'width')) {
              textOptions.width = pdfkitOptions.width - indent;
            }

            // might be inaccurate, due to different fonts?
            // TODO: Continuous text height might need to take different fonts into account
            var delta = doc.heightOfString(continuousText, textOptions);
            heightChange += delta;

            // for each linebreak, we need to subtract one currentLineHeight
            var numLinebreaks = ((continuousText || '').match(/\n/g) || []).length;
            if (numLinebreaks > 0) {
              currentLineHeight = doc._font.lineHeight(currentFontSize, true);
              heightChange -= numLinebreaks * currentLineHeight;
            }
            if (_this.options.debug) {
              console.log('\t', heightChange, "from text \"".concat(continuousText, "\""));
              console.log('\t', 'currentLineHeight', doc._font.lineHeight(currentFontSize, true));
            }

            // make sure the text already included in the height
            // is not evaluated again
            continuousText = '';
          }
        }
        if (op.list === true) {
          indent = op.listDepth * List.indent(doc, op.listStyleType, op.listItemCount, pdfkitOptions.fontSize);
        }
        if (_this.options.debug) {
          console.log('height change', heightChange, 'for', op);
          console.log('total height', dimensions.h + heightChange);
        }
        dimensions.h += heightChange;
      });
      return dimensions;
    }

    /**
     * Render into an pdf document.
     *
     * TODO: What to return if the rendering spans multiple pages?
     *
     * @param {PDFDocument} doc to rende into
     * @param {object} nodeTree
     * @returns {{x:number,y:number,w:number,h:number}} The dimensions of the rendered markdown.
     */
  }, {
    key: "render",
    value: function render(doc, nodeTree, pdfkitOptions) {
      var _this2 = this;
      var operations = this.operations(nodeTree);
      var initialPosition = {
        y: doc.y,
        x: doc.x
      };
      operations.forEach(function (op) {
        (0, _executeOperation["default"])(op, doc, Object.assign({}, _this2.options, {
          pdfkit: pdfkitOptions
        }));
      });
      var finalPosition = {
        y: doc.y,
        x: doc.x
      };
      return {
        y: initialPosition.y,
        x: initialPosition.x,
        w: pdfkitOptions && pdfkitOptions.width || doc && doc.page && doc.page.width - doc.page.margins.left - doc.page.margins.right || 0,
        h: finalPosition.y - initialPosition.y
      };
    }
  }]);
}();
var _default = exports["default"] = CommonmarkPDFKitRenderer;