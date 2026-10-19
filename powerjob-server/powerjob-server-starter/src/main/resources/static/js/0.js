(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ \"./node_modules/core-js/internals/to-string-tag-support.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar classofRaw = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar $Object = Object;\n\n// ES3 wrong here\nvar CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (error) { /* empty */ }\n};\n\n// getting tag from ES6+ `Object.prototype.toString`\nmodule.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {\n  var O, tag, result;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag\n    // builtinTag case\n    : CORRECT_ARGUMENTS ? classofRaw(O)\n    // ES3 arguments fallback\n    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/classof.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\n\nmodule.exports = getBuiltIn('document', 'documentElement');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/html.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-raw-json.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-raw-json.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar getInternalState = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\").get;\n\nmodule.exports = function isRawJSON(O) {\n  if (!isObject(O)) return false;\n  var state = getInternalState(O);\n  return !!state && state.type === 'RawJSON';\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-raw-json.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-raw-json.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-raw-json.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-disable es/no-json -- safe */\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  var unsafeInt = '9007199254740993';\n  // eslint-disable-next-line es/no-json-rawjson -- feature detection\n  var raw = JSON.rawJSON(unsafeInt);\n  // eslint-disable-next-line es/no-json-israwjson -- feature detection\n  return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/native-raw-json.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* global ActiveXObject -- old IE, WSH */\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ \"./node_modules/core-js/internals/object-define-properties.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js/internals/html.js\");\nvar documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\n\nvar GT = '>';\nvar LT = '<';\nvar PROTOTYPE = 'prototype';\nvar SCRIPT = 'script';\nvar IE_PROTO = sharedKey('IE_PROTO');\n\nvar EmptyConstructor = function () { /* empty */ };\n\nvar scriptTag = function (content) {\n  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;\n};\n\n// Create object with fake `null` prototype: use ActiveX Object with cleared prototype\nvar NullProtoObjectViaActiveX = function (activeXDocument) {\n  activeXDocument.write(scriptTag(''));\n  activeXDocument.close();\n  var temp = activeXDocument.parentWindow.Object;\n  // eslint-disable-next-line no-useless-assignment -- avoid memory leak\n  activeXDocument = null;\n  return temp;\n};\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar NullProtoObjectViaIFrame = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = documentCreateElement('iframe');\n  var JS = 'java' + SCRIPT + ':';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  html.appendChild(iframe);\n  // https://github.com/zloirock/core-js/issues/475\n  iframe.src = String(JS);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(scriptTag('document.F=Object'));\n  iframeDocument.close();\n  return iframeDocument.F;\n};\n\n// Check for document.domain and active x support\n// No need to use active x approach when document.domain is not set\n// see https://github.com/es-shims/es5-shim/issues/150\n// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346\n// avoid IE GC bug\nvar activeXDocument;\nvar NullProtoObject = function () {\n  try {\n    activeXDocument = new ActiveXObject('htmlfile');\n  } catch (error) { /* ignore */ }\n  NullProtoObject = typeof document != 'undefined'\n    ? document.domain && activeXDocument\n      ? NullProtoObjectViaActiveX(activeXDocument) // old IE\n      : NullProtoObjectViaIFrame()\n    : NullProtoObjectViaActiveX(activeXDocument); // WSH\n  var length = enumBugKeys.length;\n  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];\n  return NullProtoObject();\n};\n\nhiddenKeys[IE_PROTO] = true;\n\n// `Object.create` method\n// https://tc39.es/ecma262/#sec-object.create\n// eslint-disable-next-line es/no-object-create -- safe\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    EmptyConstructor[PROTOTYPE] = anObject(O);\n    result = new EmptyConstructor();\n    EmptyConstructor[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = NullProtoObject();\n  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-create.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ \"./node_modules/core-js/internals/v8-prototype-define-bug.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js/internals/object-keys.js\");\n\n// `Object.defineProperties` method\n// https://tc39.es/ecma262/#sec-object.defineproperties\n// eslint-disable-next-line es/no-object-defineproperties -- safe\nexports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var props = toIndexedObject(Properties);\n  var keys = objectKeys(Properties);\n  var length = keys.length;\n  var index = 0;\n  var key;\n  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);\n  return O;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-define-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\n// `Object.keys` method\n// https://tc39.es/ecma262/#sec-object.keys\n// eslint-disable-next-line es/no-object-keys -- safe\nmodule.exports = Object.keys || function keys(O) {\n  return internalObjectKeys(O, enumBugKeys);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/parse-json-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/parse-json-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\n\nvar $SyntaxError = SyntaxError;\nvar $parseInt = parseInt;\nvar fromCharCode = String.fromCharCode;\nvar at = uncurryThis(''.charAt);\nvar slice = uncurryThis(''.slice);\nvar exec = uncurryThis(/./.exec);\n\nvar codePoints = {\n  '\\\\\"': '\"',\n  '\\\\\\\\': '\\\\',\n  '\\\\/': '/',\n  '\\\\b': '\\b',\n  '\\\\f': '\\f',\n  '\\\\n': '\\n',\n  '\\\\r': '\\r',\n  '\\\\t': '\\t'\n};\n\nvar IS_4_HEX_DIGITS = /^[\\da-f]{4}$/i;\n// eslint-disable-next-line regexp/no-control-character -- safe\nvar IS_C0_CONTROL_CODE = /^[\\u0000-\\u001F]$/;\n\nmodule.exports = function (source, i) {\n  var unterminated = true;\n  var value = '';\n  while (i < source.length) {\n    var chr = at(source, i);\n    if (chr === '\\\\') {\n      var twoChars = slice(source, i, i + 2);\n      if (hasOwn(codePoints, twoChars)) {\n        value += codePoints[twoChars];\n        i += 2;\n      } else if (twoChars === '\\\\u') {\n        i += 2;\n        var fourHexDigits = slice(source, i, i + 4);\n        if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);\n        value += fromCharCode($parseInt(fourHexDigits, 16));\n        i += 4;\n      } else throw new $SyntaxError('Unknown escape sequence: \"' + twoChars + '\"');\n    } else if (chr === '\"') {\n      unterminated = false;\n      i++;\n      break;\n    } else {\n      if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);\n      value += chr;\n      i++;\n    }\n  }\n  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);\n  return { value: value, end: i };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/parse-json-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/this-number-value.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/this-number-value.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\n// `thisNumberValue` abstract operation\n// https://tc39.es/ecma262/#sec-thisnumbervalue\nmodule.exports = uncurryThis(1.1.valueOf);\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/this-number-value.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar test = {};\n// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation\ntest[TO_STRING_TAG] = 'z';\n\nmodule.exports = String(test) === '[object z]';\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-string-tag-support.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\n\nvar $String = String;\n\nmodule.exports = function (argument) {\n  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');\n  return $String(argument);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.json.stringify.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.json.stringify.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js/internals/is-array.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar isRawJSON = __webpack_require__(/*! ../internals/is-raw-json */ \"./node_modules/core-js/internals/is-raw-json.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js/internals/is-symbol.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ \"./node_modules/core-js/internals/this-number-value.js\");\nvar includes = __webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js/internals/array-includes.js\").includes;\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js/internals/to-string.js\");\nvar parseJSONString = __webpack_require__(/*! ../internals/parse-json-string */ \"./node_modules/core-js/internals/parse-json-string.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js/internals/symbol-constructor-detection.js\");\nvar NATIVE_RAW_JSON = __webpack_require__(/*! ../internals/native-raw-json */ \"./node_modules/core-js/internals/native-raw-json.js\");\n\nvar $String = String;\nvar $TypeError = TypeError;\nvar $stringify = getBuiltIn('JSON', 'stringify');\nvar $BigInt = getBuiltIn('BigInt');\nvar stringValueOf = uncurryThis(''.valueOf);\nvar booleanValueOf = uncurryThis(true.valueOf);\nvar bigIntValueOf = $BigInt && uncurryThis($BigInt.prototype.valueOf);\nvar exec = uncurryThis(/./.exec);\nvar charAt = uncurryThis(''.charAt);\nvar charCodeAt = uncurryThis(''.charCodeAt);\nvar replace = uncurryThis(''.replace);\nvar slice = uncurryThis(''.slice);\nvar push = uncurryThis([].push);\nvar pop = uncurryThis([].pop);\nvar numberToString = uncurryThis(1.1.toString);\n\nvar surrogates = /[\\uD800-\\uDFFF]/g;\nvar leadingSurrogates = /^[\\uD800-\\uDBFF]$/;\nvar trailingSurrogates = /^[\\uDC00-\\uDFFF]$/;\nvar digits = /^\\d+$/;\n\n// a placeholder of a raw JSON value\nvar RAW_MARK = uid();\n// a prefix of keys of a reordered object, see `createOrderedObject`\nvar KEY_MARK = uid();\n// the last key of a reordered object, marks the end of its serialization\nvar END_MARK = uid();\nvar RAW_MARK_LENGTH = RAW_MARK.length;\nvar KEY_MARK_LENGTH = KEY_MARK.length;\n\nvar WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {\n  var symbol = getBuiltIn('Symbol')('stringify detection');\n  // MS Edge converts symbol values to JSON as {}\n  return $stringify([symbol]) !== '[null]'\n    // WebKit converts symbol values to JSON as null\n    || $stringify({ a: symbol }) !== '{}'\n    // V8 throws on boxed symbols\n    || $stringify(Object(symbol)) !== '{}';\n});\n\n// https://github.com/tc39/proposal-well-formed-stringify\nvar ILL_FORMED_UNICODE = fails(function () {\n  return $stringify('\\uDF06\\uD834') !== '\"\\\\udf06\\\\ud834\"'\n    || $stringify('\\uDEAD') !== '\"\\\\udead\"';\n});\n\nvar isRawJSONValue = NATIVE_RAW_JSON ? getBuiltIn('JSON', 'isRawJSON') : isRawJSON;\n\nvar stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function (it, replacer, space) {\n  return $stringify(it, function (key, value) {\n    var replaced = call(replacer, this, key, value);\n    if (!isSymbol(replaced)) return replaced;\n  }, space);\n} : $stringify;\n\nvar fixIllFormedJSON = function (match, offset, string) {\n  var prev = charAt(string, offset - 1);\n  var next = charAt(string, offset + 1);\n  if (\n    (exec(leadingSurrogates, match) && !exec(trailingSurrogates, next)) ||\n    (exec(trailingSurrogates, match) && !exec(leadingSurrogates, prev))\n  ) {\n    return '\\\\u' + numberToString(charCodeAt(match, 0), 16);\n  } return match;\n};\n\n// `PropertyList` of `JSON.stringify`\n// https://tc39.es/ecma262/#sec-json.stringify\nvar getPropertyList = function (replacer) {\n  if (!isArray(replacer)) return;\n  var rawLength = replacer.length;\n  var propertyList = [];\n  // a null prototype object is used as a set of already added keys to keep the deduplication linear\n  var addedKeys = create(null);\n  for (var i = 0; i < rawLength; i++) {\n    var element = replacer[i];\n    var key;\n    if (typeof element == 'string') key = element;\n    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') key = toString(element);\n    else continue;\n    if (!hasOwn(addedKeys, key)) {\n      addedKeys[key] = true;\n      push(propertyList, key);\n    }\n  }\n  return propertyList;\n};\n\n// values with such an internal slot are unwrapped by `SerializeJSONProperty` instead of being serialized as objects\nvar hasInternalSlot = function (valueOf, it) {\n  try {\n    valueOf(it);\n    return true;\n  } catch (error) {\n    return false;\n  }\n};\n\n// the slot check is expensive, so it's performed only for the kind reported by the value itself -\n// a value lying about its kind via `Symbol.toStringTag` is serialized as an ordinary object\nvar isBoxedPrimitive = function (it) {\n  var kind = classof(it);\n  return (kind === 'Number' && hasInternalSlot(thisNumberValue, it))\n    || (kind === 'String' && hasInternalSlot(stringValueOf, it))\n    || (kind === 'Boolean' && hasInternalSlot(booleanValueOf, it))\n    || (!!bigIntValueOf && kind === 'BigInt' && hasInternalSlot(bigIntValueOf, it));\n};\n\n// only objects serialized by `SerializeJSONObject` are affected by the property list\nvar isSerializedAsObject = function (it) {\n  if (!isObject(it) || isCallable(it) || isArray(it)) return false;\n  try {\n    return !isBoxedPrimitive(it);\n  // `classof` reads `Symbol.toStringTag`, so a proxy could throw - it has no internal slots anyway\n  } catch (error) {\n    return true;\n  }\n};\n\n// the engine unwraps it in the same order as it would read the original property,\n// so the property is read lazily and `toJSON` is called once and with the original key\nvar createElementHolder = function (holder, key) {\n  return {\n    toJSON: function () {\n      var element = holder[key];\n      if (isObject(element) || typeof element == 'bigint') {\n        var elementToJSON = element.toJSON;\n        if (isCallable(elementToJSON)) element = call(elementToJSON, element, key);\n      } return element;\n    }\n  };\n};\n\n// own keys of objects are sorted - integer-like keys are moved to the beginning,\n// so such keys should be marked and restored in the serialized string\nvar getKeyPrefix = function (propertyList) {\n  for (var i = 0, length = propertyList.length; i < length; i++) {\n    if (exec(digits, propertyList[i])) return KEY_MARK;\n  } return '';\n};\n\n// `SerializeJSONObject` iterates the property list, so the value is replaced with an object with keys in this order\nvar createOrderedObject = function (value, propertyList, keyPrefix) {\n  // keys are not marked if the property list has no integer-like keys, so `Object.prototype`\n  // with a setter, a non-writable property or `__proto__` should not intercept the assignment\n  var ordered = create(null);\n  for (var i = 0, length = propertyList.length; i < length; i++) {\n    var key = propertyList[i];\n    ordered[keyPrefix + key] = createElementHolder(value, key);\n  }\n  ordered[END_MARK] = null;\n  return ordered;\n};\n\n// `JSON.stringify` method\n// https://tc39.es/ecma262/#sec-json.stringify\n// https://github.com/tc39/proposal-json-parse-with-source\nif ($stringify) $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON }, {\n  stringify: function stringify(text, replacer, space) {\n    var replacerFunction = isCallable(replacer) ? replacer : undefined;\n    var propertyList = replacerFunction ? undefined : getPropertyList(replacer);\n    var keyPrefix = propertyList && getKeyPrefix(propertyList);\n    var rawStrings = [];\n    var openObjects = [];\n    var parentOrdered = [];\n    var currentOrdered;\n    var marked = false;\n    var root = true;\n\n    var json = stringifyWithProperSymbolsConversion(text, function (key, value) {\n      // some old implementations (like WebKit) could pass numbers as keys\n      key = $String(key);\n\n      if (propertyList) {\n        if (key === END_MARK) {\n          pop(openObjects);\n          currentOrdered = pop(parentOrdered);\n          return;\n        }\n        if (root) root = false;\n        // the innermost reordered object already contains only keys of the property list and arrays are not\n        // affected by it, the rest of objects (like objects with a fake `Symbol.toStringTag`) are filtered here\n        else if (this !== currentOrdered && !isArray(this) && !includes(propertyList, key)) return;\n      } else if (replacerFunction) value = call(replacerFunction, this, key, value);\n\n      if (isRawJSONValue(value)) {\n        if (NATIVE_RAW_JSON) return value;\n        marked = true;\n        return RAW_MARK + (push(rawStrings, value.rawJSON) - 1);\n      }\n\n      if (propertyList && isSerializedAsObject(value)) {\n        // reordered objects are new each time, so cycles should be detected before the engine does it\n        if (includes(openObjects, value)) throw new $TypeError('Converting circular structure to JSON');\n        var ordered = createOrderedObject(value, propertyList, keyPrefix);\n        push(openObjects, value);\n        push(parentOrdered, currentOrdered);\n        currentOrdered = ordered;\n        if (keyPrefix) marked = true;\n        return ordered;\n      }\n\n      return value;\n    }, space);\n\n    if (typeof json != 'string') return json;\n\n    if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);\n\n    if (!marked) return json;\n\n    var result = '';\n    var length = json.length;\n\n    for (var i = 0; i < length; i++) {\n      var chr = charAt(json, i);\n      if (chr === '\"') {\n        var end = parseJSONString(json, ++i).end - 1;\n        var string = slice(json, i, end);\n        if (slice(string, 0, RAW_MARK_LENGTH) === RAW_MARK) result += rawStrings[slice(string, RAW_MARK_LENGTH)];\n        else if (slice(string, 0, KEY_MARK_LENGTH) === KEY_MARK) result += '\"' + slice(string, KEY_MARK_LENGTH) + '\"';\n        else result += '\"' + string + '\"';\n        i = end;\n      } else result += chr;\n    }\n\n    return result;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.json.stringify.js?");

/***/ })

}]);