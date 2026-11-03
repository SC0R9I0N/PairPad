import { env_get } from "spacetime:sys@2.2";
import * as _syscalls2_0 from "spacetime:sys@2.0";
import { moduleHooks } from "spacetime:sys@2.0";
import * as _syscalls2_1 from "spacetime:sys@2.1";

//#region C:/Users/aidan/PairPad/spacetimedb/node_modules/headers-polyfill/lib/index.mjs
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS$1 = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var import_set_cookie_parser = __toESM$1(__commonJS$1({ "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
	"use strict";
	var defaultParseOptions = {
		decodeValues: true,
		map: false,
		silent: false
	};
	function isNonEmptyString(str) {
		return typeof str === "string" && !!str.trim();
	}
	function parseString(setCookieValue, options) {
		var parts = setCookieValue.split(";").filter(isNonEmptyString);
		var parsed = parseNameValuePair(parts.shift());
		var name = parsed.name;
		var value = parsed.value;
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		try {
			value = options.decodeValues ? decodeURIComponent(value) : value;
		} catch (e) {
			console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
		}
		var cookie = {
			name,
			value
		};
		parts.forEach(function(part) {
			var sides = part.split("=");
			var key = sides.shift().trimLeft().toLowerCase();
			var value2 = sides.join("=");
			if (key === "expires") cookie.expires = new Date(value2);
			else if (key === "max-age") cookie.maxAge = parseInt(value2, 10);
			else if (key === "secure") cookie.secure = true;
			else if (key === "httponly") cookie.httpOnly = true;
			else if (key === "samesite") cookie.sameSite = value2;
			else cookie[key] = value2;
		});
		return cookie;
	}
	function parseNameValuePair(nameValuePairStr) {
		var name = "";
		var value = "";
		var nameValueArr = nameValuePairStr.split("=");
		if (nameValueArr.length > 1) {
			name = nameValueArr.shift();
			value = nameValueArr.join("=");
		} else value = nameValuePairStr;
		return {
			name,
			value
		};
	}
	function parse(input, options) {
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!input) if (!options.map) return [];
		else return {};
		if (input.headers) if (typeof input.headers.getSetCookie === "function") input = input.headers.getSetCookie();
		else if (input.headers["set-cookie"]) input = input.headers["set-cookie"];
		else {
			var sch = input.headers[Object.keys(input.headers).find(function(key) {
				return key.toLowerCase() === "set-cookie";
			})];
			if (!sch && input.headers.cookie && !options.silent) console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
			input = sch;
		}
		if (!Array.isArray(input)) input = [input];
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!options.map) return input.filter(isNonEmptyString).map(function(str) {
			return parseString(str, options);
		});
		else return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
			var cookie = parseString(str, options);
			cookies2[cookie.name] = cookie;
			return cookies2;
		}, {});
	}
	function splitCookiesString2(cookiesString) {
		if (Array.isArray(cookiesString)) return cookiesString;
		if (typeof cookiesString !== "string") return [];
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	module.exports = parse;
	module.exports.parse = parse;
	module.exports.parseString = parseString;
	module.exports.splitCookiesString = splitCookiesString2;
} })());
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
	if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") throw new TypeError("Invalid character in header field name");
	return name.trim().toLowerCase();
}
var charCodesToRemove = [
	String.fromCharCode(10),
	String.fromCharCode(13),
	String.fromCharCode(9),
	String.fromCharCode(32)
];
var HEADER_VALUE_REMOVE_REGEXP = new RegExp(`(^[${charCodesToRemove.join("")}]|$[${charCodesToRemove.join("")}])`, "g");
function normalizeHeaderValue(value) {
	return value.replace(HEADER_VALUE_REMOVE_REGEXP, "");
}
function isValidHeaderName(value) {
	if (typeof value !== "string") return false;
	if (value.length === 0) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character > 127 || !isToken(character)) return false;
	}
	return true;
}
function isToken(value) {
	return ![
		127,
		32,
		"(",
		")",
		"<",
		">",
		"@",
		",",
		";",
		":",
		"\\",
		"\"",
		"/",
		"[",
		"]",
		"?",
		"=",
		"{",
		"}"
	].includes(value);
}
function isValidHeaderValue(value) {
	if (typeof value !== "string") return false;
	if (value.trim() !== value) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character === 0 || character === 10 || character === 13) return false;
	}
	return true;
}
var NORMALIZED_HEADERS = Symbol("normalizedHeaders");
var RAW_HEADER_NAMES = Symbol("rawHeaderNames");
var HEADER_VALUE_DELIMITER = ", ";
var _a, _b, _c;
var Headers = class _Headers {
	constructor(init) {
		this[_a] = {};
		this[_b] = /* @__PURE__ */ new Map();
		this[_c] = "Headers";
		if (["Headers", "HeadersPolyfill"].includes(init?.constructor.name) || init instanceof _Headers || typeof globalThis.Headers !== "undefined" && init instanceof globalThis.Headers) init.forEach((value, name) => {
			this.append(name, value);
		}, this);
		else if (Array.isArray(init)) init.forEach(([name, value]) => {
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
		else if (init) Object.getOwnPropertyNames(init).forEach((name) => {
			const value = init[name];
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
	}
	[(_a = NORMALIZED_HEADERS, _b = RAW_HEADER_NAMES, _c = Symbol.toStringTag, Symbol.iterator)]() {
		return this.entries();
	}
	*keys() {
		for (const [name] of this.entries()) yield name;
	}
	*values() {
		for (const [, value] of this.entries()) yield value;
	}
	*entries() {
		let sortedKeys = Object.keys(this[NORMALIZED_HEADERS]).sort((a, b) => a.localeCompare(b));
		for (const name of sortedKeys) if (name === "set-cookie") for (const value of this.getSetCookie()) yield [name, value];
		else yield [name, this.get(name)];
	}
	/**
	* Returns a boolean stating whether a `Headers` object contains a certain header.
	*/
	has(name) {
		if (!isValidHeaderName(name)) throw new TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
	}
	/**
	* Returns a `ByteString` sequence of all the values of a header with a given name.
	*/
	get(name) {
		if (!isValidHeaderName(name)) throw TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null;
	}
	/**
	* Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	set(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(normalizedValue);
		this[RAW_HEADER_NAMES].set(normalizedName, name);
	}
	/**
	* Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	append(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		let resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${normalizedValue}` : normalizedValue;
		this.set(name, resolvedValue);
	}
	/**
	* Deletes a header from the `Headers` object.
	*/
	delete(name) {
		if (!isValidHeaderName(name)) return;
		if (!this.has(name)) return;
		const normalizedName = normalizeHeaderName(name);
		delete this[NORMALIZED_HEADERS][normalizedName];
		this[RAW_HEADER_NAMES].delete(normalizedName);
	}
	/**
	* Traverses the `Headers` object,
	* calling the given callback for each header.
	*/
	forEach(callback, thisArg) {
		for (const [name, value] of this.entries()) callback.call(thisArg, value, name, this);
	}
	/**
	* Returns an array containing the values
	* of all Set-Cookie headers associated
	* with a response
	*/
	getSetCookie() {
		const setCookieHeader = this.get("set-cookie");
		if (setCookieHeader === null) return [];
		if (setCookieHeader === "") return [""];
		return (0, import_set_cookie_parser.splitCookiesString)(setCookieHeader);
	}
};

//#endregion
//#region C:/Users/aidan/PairPad/spacetimedb/node_modules/spacetimedb/dist/server/index.mjs
typeof globalThis !== "undefined" && (globalThis.global = globalThis.global || globalThis, globalThis.window = globalThis.window || globalThis);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
	return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(__defProp(target, "default", {
	value: mod,
	enumerable: true
}), mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var require_base64_js = __commonJS({ "../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
	exports.byteLength = byteLength;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray2;
	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (i = 0, len = code.length; i < len; ++i) {
		lookup[i] = code[i];
		revLookup[code.charCodeAt(i)] = i;
	}
	var i;
	var len;
	revLookup["-".charCodeAt(0)] = 62;
	revLookup["_".charCodeAt(0)] = 63;
	function getLens(b64) {
		var len2 = b64.length;
		if (len2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		if (validLen === -1) validLen = len2;
		var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen];
	}
	function byteLength(b64) {
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function _byteLength(b64, validLen, placeHoldersLen) {
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function toByteArray(b64) {
		var tmp;
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
		var curByte = 0;
		var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
		var i2;
		for (i2 = 0; i2 < len2; i2 += 4) {
			tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
			arr[curByte++] = tmp >> 16 & 255;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 2) {
			tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 1) {
			tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		return arr;
	}
	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
	}
	function encodeChunk(uint8, start, end) {
		var tmp;
		var output = [];
		for (var i2 = start; i2 < end; i2 += 3) {
			tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
			output.push(tripletToBase64(tmp));
		}
		return output.join("");
	}
	function fromByteArray2(uint8) {
		var tmp;
		var len2 = uint8.length;
		var extraBytes = len2 % 3;
		var parts = [];
		var maxChunkLength = 16383;
		for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
		if (extraBytes === 1) {
			tmp = uint8[len2 - 1];
			parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
		} else if (extraBytes === 2) {
			tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
			parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
		}
		return parts.join("");
	}
} });
var require_codes = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/codes.json"(exports, module) {
	module.exports = {
		"100": "Continue",
		"101": "Switching Protocols",
		"102": "Processing",
		"103": "Early Hints",
		"200": "OK",
		"201": "Created",
		"202": "Accepted",
		"203": "Non-Authoritative Information",
		"204": "No Content",
		"205": "Reset Content",
		"206": "Partial Content",
		"207": "Multi-Status",
		"208": "Already Reported",
		"226": "IM Used",
		"300": "Multiple Choices",
		"301": "Moved Permanently",
		"302": "Found",
		"303": "See Other",
		"304": "Not Modified",
		"305": "Use Proxy",
		"307": "Temporary Redirect",
		"308": "Permanent Redirect",
		"400": "Bad Request",
		"401": "Unauthorized",
		"402": "Payment Required",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"406": "Not Acceptable",
		"407": "Proxy Authentication Required",
		"408": "Request Timeout",
		"409": "Conflict",
		"410": "Gone",
		"411": "Length Required",
		"412": "Precondition Failed",
		"413": "Payload Too Large",
		"414": "URI Too Long",
		"415": "Unsupported Media Type",
		"416": "Range Not Satisfiable",
		"417": "Expectation Failed",
		"418": "I'm a Teapot",
		"421": "Misdirected Request",
		"422": "Unprocessable Entity",
		"423": "Locked",
		"424": "Failed Dependency",
		"425": "Too Early",
		"426": "Upgrade Required",
		"428": "Precondition Required",
		"429": "Too Many Requests",
		"431": "Request Header Fields Too Large",
		"451": "Unavailable For Legal Reasons",
		"500": "Internal Server Error",
		"501": "Not Implemented",
		"502": "Bad Gateway",
		"503": "Service Unavailable",
		"504": "Gateway Timeout",
		"505": "HTTP Version Not Supported",
		"506": "Variant Also Negotiates",
		"507": "Insufficient Storage",
		"508": "Loop Detected",
		"509": "Bandwidth Limit Exceeded",
		"510": "Not Extended",
		"511": "Network Authentication Required"
	};
} });
var require_statuses = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/index.js"(exports, module) {
	var codes = require_codes();
	module.exports = status2;
	status2.message = codes;
	status2.code = createMessageToStatusCodeMap(codes);
	status2.codes = createStatusCodeList(codes);
	status2.redirect = {
		300: true,
		301: true,
		302: true,
		303: true,
		305: true,
		307: true,
		308: true
	};
	status2.empty = {
		204: true,
		205: true,
		304: true
	};
	status2.retry = {
		502: true,
		503: true,
		504: true
	};
	function createMessageToStatusCodeMap(codes2) {
		var map = {};
		Object.keys(codes2).forEach(function forEachCode(code) {
			var message = codes2[code];
			var status3 = Number(code);
			map[message.toLowerCase()] = status3;
		});
		return map;
	}
	function createStatusCodeList(codes2) {
		return Object.keys(codes2).map(function mapCode(code) {
			return Number(code);
		});
	}
	function getStatusCode(message) {
		var msg = message.toLowerCase();
		if (!Object.prototype.hasOwnProperty.call(status2.code, msg)) throw new Error("invalid status message: \"" + message + "\"");
		return status2.code[msg];
	}
	function getStatusMessage(code) {
		if (!Object.prototype.hasOwnProperty.call(status2.message, code)) throw new Error("invalid status code: " + code);
		return status2.message[code];
	}
	function status2(code) {
		if (typeof code === "number") return getStatusMessage(code);
		if (typeof code !== "string") throw new TypeError("code must be a number or string");
		var n = parseInt(code, 10);
		if (!isNaN(n)) return getStatusMessage(n);
		return getStatusCode(code);
	}
} });
var util_stub_exports = {};
__export(util_stub_exports, { inspect: () => inspect });
var inspect;
var init_util_stub = __esm({ "src/util-stub.ts"() {
	inspect = {};
} });
var require_util_inspect = __commonJS({ "../../node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/util.inspect.js"(exports, module) {
	module.exports = (init_util_stub(), __toCommonJS(util_stub_exports)).inspect;
} });
var require_object_inspect = __commonJS({ "../../node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/index.js"(exports, module) {
	var hasMap = typeof Map === "function" && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === "function" && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var weakMapHas = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap.prototype.has : null;
	var weakSetHas = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet.prototype.has : null;
	var weakRefDeref = typeof WeakRef === "function" && WeakRef.prototype ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice = String.prototype.slice;
	var $replace = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor = Math.floor;
	var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
	var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
		return O.__proto__;
	} : null);
	function addNumericSeparator(num, str) {
		if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) return str;
		var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
		if (typeof num === "number") {
			var int = num < 0 ? -$floor(-num) : $floor(num);
			if (int !== num) {
				var intStr = String(int);
				var dec = $slice.call(str, intStr.length + 1);
				return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
			}
		}
		return $replace.call(str, sepRegex, "$&_");
	}
	var utilInspect = require_util_inspect();
	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
	var quotes = {
		__proto__: null,
		"double": "\"",
		single: "'"
	};
	var quoteREs = {
		__proto__: null,
		"double": /(["\\])/g,
		single: /(['\\])/g
	};
	module.exports = function inspect_(obj, options, depth, seen) {
		var opts = options || {};
		if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) throw new TypeError("option \"quoteStyle\" must be \"single\" or \"double\"");
		if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) throw new TypeError("option \"maxStringLength\", if provided, must be a positive integer, Infinity, or `null`");
		var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
		if (typeof customInspect !== "boolean" && customInspect !== "symbol") throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
		if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) throw new TypeError("option \"indent\" must be \"\\t\", an integer > 0, or `null`");
		if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") throw new TypeError("option \"numericSeparator\", if provided, must be `true` or `false`");
		var numericSeparator = opts.numericSeparator;
		if (typeof obj === "undefined") return "undefined";
		if (obj === null) return "null";
		if (typeof obj === "boolean") return obj ? "true" : "false";
		if (typeof obj === "string") return inspectString(obj, opts);
		if (typeof obj === "number") {
			if (obj === 0) return Infinity / obj > 0 ? "0" : "-0";
			var str = String(obj);
			return numericSeparator ? addNumericSeparator(obj, str) : str;
		}
		if (typeof obj === "bigint") {
			var bigIntStr = String(obj) + "n";
			return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
		}
		var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
		if (typeof depth === "undefined") depth = 0;
		if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") return isArray(obj) ? "[Array]" : "[Object]";
		var indent = getIndent(opts, depth);
		if (typeof seen === "undefined") seen = [];
		else if (indexOf(seen, obj) >= 0) return "[Circular]";
		function inspect3(value, from, noIndent) {
			if (from) {
				seen = $arrSlice.call(seen);
				seen.push(from);
			}
			if (noIndent) {
				var newOpts = { depth: opts.depth };
				if (has(opts, "quoteStyle")) newOpts.quoteStyle = opts.quoteStyle;
				return inspect_(value, newOpts, depth + 1, seen);
			}
			return inspect_(value, opts, depth + 1, seen);
		}
		if (typeof obj === "function" && !isRegExp(obj)) {
			var name = nameOf(obj);
			var keys = arrObjKeys(obj, inspect3);
			return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
		}
		if (isSymbol(obj)) {
			var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
			return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
		}
		if (isElement(obj)) {
			var s = "<" + $toLowerCase.call(String(obj.nodeName));
			var attrs = obj.attributes || [];
			for (var i = 0; i < attrs.length; i++) s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
			s += ">";
			if (obj.childNodes && obj.childNodes.length) s += "...";
			s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
			return s;
		}
		if (isArray(obj)) {
			if (obj.length === 0) return "[]";
			var xs = arrObjKeys(obj, inspect3);
			if (indent && !singleLineValues(xs)) return "[" + indentedJoin(xs, indent) + "]";
			return "[ " + $join.call(xs, ", ") + " ]";
		}
		if (isError(obj)) {
			var parts = arrObjKeys(obj, inspect3);
			if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect3(obj.cause), parts), ", ") + " }";
			if (parts.length === 0) return "[" + String(obj) + "]";
			return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
		}
		if (typeof obj === "object" && customInspect) {
			if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) return utilInspect(obj, { depth: maxDepth - depth });
			else if (customInspect !== "symbol" && typeof obj.inspect === "function") return obj.inspect();
		}
		if (isMap(obj)) {
			var mapParts = [];
			if (mapForEach) mapForEach.call(obj, function(value, key) {
				mapParts.push(inspect3(key, obj, true) + " => " + inspect3(value, obj));
			});
			return collectionOf("Map", mapSize.call(obj), mapParts, indent);
		}
		if (isSet(obj)) {
			var setParts = [];
			if (setForEach) setForEach.call(obj, function(value) {
				setParts.push(inspect3(value, obj));
			});
			return collectionOf("Set", setSize.call(obj), setParts, indent);
		}
		if (isWeakMap(obj)) return weakCollectionOf("WeakMap");
		if (isWeakSet(obj)) return weakCollectionOf("WeakSet");
		if (isWeakRef(obj)) return weakCollectionOf("WeakRef");
		if (isNumber(obj)) return markBoxed(inspect3(Number(obj)));
		if (isBigInt(obj)) return markBoxed(inspect3(bigIntValueOf.call(obj)));
		if (isBoolean(obj)) return markBoxed(booleanValueOf.call(obj));
		if (isString(obj)) return markBoxed(inspect3(String(obj)));
		if (typeof window !== "undefined" && obj === window) return "{ [object Window] }";
		if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) return "{ [object globalThis] }";
		if (!isDate(obj) && !isRegExp(obj)) {
			var ys = arrObjKeys(obj, inspect3);
			var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
			var protoTag = obj instanceof Object ? "" : "null prototype";
			var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
			var tag = (isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "") + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
			if (ys.length === 0) return tag + "{}";
			if (indent) return tag + "{" + indentedJoin(ys, indent) + "}";
			return tag + "{ " + $join.call(ys, ", ") + " }";
		}
		return String(obj);
	};
	function wrapQuotes(s, defaultStyle, opts) {
		var quoteChar = quotes[opts.quoteStyle || defaultStyle];
		return quoteChar + s + quoteChar;
	}
	function quote(s) {
		return $replace.call(String(s), /"/g, "&quot;");
	}
	function canTrustToString(obj) {
		return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
	}
	function isArray(obj) {
		return toStr(obj) === "[object Array]" && canTrustToString(obj);
	}
	function isDate(obj) {
		return toStr(obj) === "[object Date]" && canTrustToString(obj);
	}
	function isRegExp(obj) {
		return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
	}
	function isError(obj) {
		return toStr(obj) === "[object Error]" && canTrustToString(obj);
	}
	function isString(obj) {
		return toStr(obj) === "[object String]" && canTrustToString(obj);
	}
	function isNumber(obj) {
		return toStr(obj) === "[object Number]" && canTrustToString(obj);
	}
	function isBoolean(obj) {
		return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
	}
	function isSymbol(obj) {
		if (hasShammedSymbols) return obj && typeof obj === "object" && obj instanceof Symbol;
		if (typeof obj === "symbol") return true;
		if (!obj || typeof obj !== "object" || !symToString) return false;
		try {
			symToString.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	function isBigInt(obj) {
		if (!obj || typeof obj !== "object" || !bigIntValueOf) return false;
		try {
			bigIntValueOf.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	var hasOwn2 = Object.prototype.hasOwnProperty || function(key) {
		return key in this;
	};
	function has(obj, key) {
		return hasOwn2.call(obj, key);
	}
	function toStr(obj) {
		return objectToString.call(obj);
	}
	function nameOf(f) {
		if (f.name) return f.name;
		var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
		if (m) return m[1];
		return null;
	}
	function indexOf(xs, x) {
		if (xs.indexOf) return xs.indexOf(x);
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
	function isMap(x) {
		if (!mapSize || !x || typeof x !== "object") return false;
		try {
			mapSize.call(x);
			try {
				setSize.call(x);
			} catch (s) {
				return true;
			}
			return x instanceof Map;
		} catch (e) {}
		return false;
	}
	function isWeakMap(x) {
		if (!weakMapHas || !x || typeof x !== "object") return false;
		try {
			weakMapHas.call(x, weakMapHas);
			try {
				weakSetHas.call(x, weakSetHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakMap;
		} catch (e) {}
		return false;
	}
	function isWeakRef(x) {
		if (!weakRefDeref || !x || typeof x !== "object") return false;
		try {
			weakRefDeref.call(x);
			return true;
		} catch (e) {}
		return false;
	}
	function isSet(x) {
		if (!setSize || !x || typeof x !== "object") return false;
		try {
			setSize.call(x);
			try {
				mapSize.call(x);
			} catch (m) {
				return true;
			}
			return x instanceof Set;
		} catch (e) {}
		return false;
	}
	function isWeakSet(x) {
		if (!weakSetHas || !x || typeof x !== "object") return false;
		try {
			weakSetHas.call(x, weakSetHas);
			try {
				weakMapHas.call(x, weakMapHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakSet;
		} catch (e) {}
		return false;
	}
	function isElement(x) {
		if (!x || typeof x !== "object") return false;
		if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) return true;
		return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
	}
	function inspectString(str, opts) {
		if (str.length > opts.maxStringLength) {
			var remaining = str.length - opts.maxStringLength;
			var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
			return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
		}
		var quoteRE = quoteREs[opts.quoteStyle || "single"];
		quoteRE.lastIndex = 0;
		return wrapQuotes($replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte), "single", opts);
	}
	function lowbyte(c) {
		var n = c.charCodeAt(0);
		var x = {
			8: "b",
			9: "t",
			10: "n",
			12: "f",
			13: "r"
		}[n];
		if (x) return "\\" + x;
		return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
	}
	function markBoxed(str) {
		return "Object(" + str + ")";
	}
	function weakCollectionOf(type) {
		return type + " { ? }";
	}
	function collectionOf(type, size, entries, indent) {
		var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
		return type + " (" + size + ") {" + joinedEntries + "}";
	}
	function singleLineValues(xs) {
		for (var i = 0; i < xs.length; i++) if (indexOf(xs[i], "\n") >= 0) return false;
		return true;
	}
	function getIndent(opts, depth) {
		var baseIndent;
		if (opts.indent === "	") baseIndent = "	";
		else if (typeof opts.indent === "number" && opts.indent > 0) baseIndent = $join.call(Array(opts.indent + 1), " ");
		else return null;
		return {
			base: baseIndent,
			prev: $join.call(Array(depth + 1), baseIndent)
		};
	}
	function indentedJoin(xs, indent) {
		if (xs.length === 0) return "";
		var lineJoiner = "\n" + indent.prev + indent.base;
		return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
	}
	function arrObjKeys(obj, inspect3) {
		var isArr = isArray(obj);
		var xs = [];
		if (isArr) {
			xs.length = obj.length;
			for (var i = 0; i < obj.length; i++) xs[i] = has(obj, i) ? inspect3(obj[i], obj) : "";
		}
		var syms = typeof gOPS === "function" ? gOPS(obj) : [];
		var symMap;
		if (hasShammedSymbols) {
			symMap = {};
			for (var k = 0; k < syms.length; k++) symMap["$" + syms[k]] = syms[k];
		}
		for (var key in obj) {
			if (!has(obj, key)) continue;
			if (isArr && String(Number(key)) === key && key < obj.length) continue;
			if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) continue;
			else if ($test.call(/[^\w$]/, key)) xs.push(inspect3(key, obj) + ": " + inspect3(obj[key], obj));
			else xs.push(key + ": " + inspect3(obj[key], obj));
		}
		if (typeof gOPS === "function") {
			for (var j = 0; j < syms.length; j++) if (isEnumerable.call(obj, syms[j])) xs.push("[" + inspect3(syms[j]) + "]: " + inspect3(obj[syms[j]], obj));
		}
		return xs;
	}
} });
var textDecoder = new TextDecoder("utf-8");
var BinaryReader = class {
	/**
	* The DataView used to read values from the binary data.
	*
	* Note: The DataView's `byteOffset` is relative to the beginning of the
	* underlying ArrayBuffer, not the start of the provided Uint8Array input.
	* This `BinaryReader`'s `#offset` field is used to track the current read position
	* relative to the start of the provided Uint8Array input.
	*/
	view;
	/**
	* Represents the offset (in bytes) relative to the start of the DataView
	* and provided Uint8Array input.
	*
	* Note: This is *not* the absolute byte offset within the underlying ArrayBuffer.
	*/
	offset = 0;
	constructor(input) {
		this.view = input instanceof DataView ? input : new DataView(input.buffer, input.byteOffset, input.byteLength);
		this.offset = 0;
	}
	reset(input) {
		this.view = input instanceof DataView ? input : new DataView(input.buffer, input.byteOffset, input.byteLength);
		this.offset = 0;
	}
	get remaining() {
		return this.view.byteLength - this.offset;
	}
	/** Ensure we have at least `n` bytes left to read */
	#ensure(n) {
		if (this.offset + n > this.view.byteLength) throw new RangeError(`Tried to read ${n} byte(s) at relative offset ${this.offset}, but only ${this.remaining} byte(s) remain`);
	}
	readUInt8Array() {
		const length = this.readU32();
		this.#ensure(length);
		return this.readBytes(length).slice();
	}
	readBool() {
		const value = this.view.getUint8(this.offset);
		this.offset += 1;
		return value !== 0;
	}
	readByte() {
		const value = this.view.getUint8(this.offset);
		this.offset += 1;
		return value;
	}
	readBytes(length) {
		const array = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, length);
		this.offset += length;
		return array;
	}
	readI8() {
		const value = this.view.getInt8(this.offset);
		this.offset += 1;
		return value;
	}
	readU8() {
		return this.readByte();
	}
	readI16() {
		const value = this.view.getInt16(this.offset, true);
		this.offset += 2;
		return value;
	}
	readU16() {
		const value = this.view.getUint16(this.offset, true);
		this.offset += 2;
		return value;
	}
	readI32() {
		const value = this.view.getInt32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readU32() {
		const value = this.view.getUint32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readI64() {
		const value = this.view.getBigInt64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readU64() {
		const value = this.view.getBigUint64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readU128() {
		const lowerPart = this.view.getBigUint64(this.offset, true);
		const upperPart = this.view.getBigUint64(this.offset + 8, true);
		this.offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readI128() {
		const lowerPart = this.view.getBigUint64(this.offset, true);
		const upperPart = this.view.getBigInt64(this.offset + 8, true);
		this.offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readU256() {
		const p0 = this.view.getBigUint64(this.offset, true);
		const p1 = this.view.getBigUint64(this.offset + 8, true);
		const p2 = this.view.getBigUint64(this.offset + 16, true);
		const p3 = this.view.getBigUint64(this.offset + 24, true);
		this.offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readI256() {
		const p0 = this.view.getBigUint64(this.offset, true);
		const p1 = this.view.getBigUint64(this.offset + 8, true);
		const p2 = this.view.getBigUint64(this.offset + 16, true);
		const p3 = this.view.getBigInt64(this.offset + 24, true);
		this.offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readF32() {
		const value = this.view.getFloat32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readF64() {
		const value = this.view.getFloat64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readString() {
		const length = this.readU32();
		this.#ensure(length);
		const bytes = this.readBytes(length);
		return textDecoder.decode(bytes);
	}
};
var import_base64_js = __toESM(require_base64_js());
var textEncoder = new TextEncoder();
var ArrayBufferPrototypeTransfer = ArrayBuffer.prototype.transfer ?? function(newByteLength) {
	if (newByteLength === void 0) return this.slice();
	else if (newByteLength <= this.byteLength) return this.slice(0, newByteLength);
	else {
		const copy = new Uint8Array(newByteLength);
		copy.set(new Uint8Array(this));
		return copy.buffer;
	}
};
var ResizableBuffer = class {
	buffer;
	view;
	constructor(init) {
		this.buffer = typeof init === "number" ? new ArrayBuffer(init) : init;
		this.view = new DataView(this.buffer);
	}
	get capacity() {
		return this.buffer.byteLength;
	}
	grow(newSize) {
		if (newSize <= this.buffer.byteLength) return;
		this.buffer = ArrayBufferPrototypeTransfer.call(this.buffer, newSize);
		this.view = new DataView(this.buffer);
	}
};
var BinaryWriter = class {
	buffer;
	offset = 0;
	constructor(init) {
		this.buffer = typeof init === "number" ? new ResizableBuffer(init) : init;
	}
	clear() {
		this.offset = 0;
	}
	reset(buffer) {
		this.buffer = buffer;
		this.offset = 0;
	}
	expandBuffer(additionalCapacity) {
		const minCapacity = this.offset + additionalCapacity + 1;
		if (minCapacity <= this.buffer.capacity) return;
		let newCapacity = this.buffer.capacity * 2;
		if (newCapacity < minCapacity) newCapacity = minCapacity;
		this.buffer.grow(newCapacity);
	}
	toBase64() {
		return (0, import_base64_js.fromByteArray)(this.getBuffer());
	}
	getBuffer() {
		return new Uint8Array(this.buffer.buffer, 0, this.offset);
	}
	get view() {
		return this.buffer.view;
	}
	writeUInt8Array(value) {
		const length = value.length;
		this.expandBuffer(4 + length);
		this.writeU32(length);
		new Uint8Array(this.buffer.buffer, this.offset).set(value);
		this.offset += length;
	}
	writeBool(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value ? 1 : 0);
		this.offset += 1;
	}
	writeByte(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}
	writeBytes(value) {
		this.expandBuffer(value.length);
		new Uint8Array(this.buffer.buffer, this.offset, value.length).set(value);
		this.offset += value.length;
	}
	writeI8(value) {
		this.expandBuffer(1);
		this.view.setInt8(this.offset, value);
		this.offset += 1;
	}
	writeU8(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}
	writeI16(value) {
		this.expandBuffer(2);
		this.view.setInt16(this.offset, value, true);
		this.offset += 2;
	}
	writeU16(value) {
		this.expandBuffer(2);
		this.view.setUint16(this.offset, value, true);
		this.offset += 2;
	}
	writeI32(value) {
		this.expandBuffer(4);
		this.view.setInt32(this.offset, value, true);
		this.offset += 4;
	}
	writeU32(value) {
		this.expandBuffer(4);
		this.view.setUint32(this.offset, value, true);
		this.offset += 4;
	}
	writeI64(value) {
		this.expandBuffer(8);
		this.view.setBigInt64(this.offset, value, true);
		this.offset += 8;
	}
	writeU64(value) {
		this.expandBuffer(8);
		this.view.setBigUint64(this.offset, value, true);
		this.offset += 8;
	}
	writeU128(value) {
		this.expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.view.setBigUint64(this.offset, lowerPart, true);
		this.view.setBigUint64(this.offset + 8, upperPart, true);
		this.offset += 16;
	}
	writeI128(value) {
		this.expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.view.setBigInt64(this.offset, lowerPart, true);
		this.view.setBigInt64(this.offset + 8, upperPart, true);
		this.offset += 16;
	}
	writeU256(value) {
		this.expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.view.setBigUint64(this.offset + 0, p0, true);
		this.view.setBigUint64(this.offset + 8, p1, true);
		this.view.setBigUint64(this.offset + 16, p2, true);
		this.view.setBigUint64(this.offset + 24, p3, true);
		this.offset += 32;
	}
	writeI256(value) {
		this.expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.view.setBigUint64(this.offset + 0, p0, true);
		this.view.setBigUint64(this.offset + 8, p1, true);
		this.view.setBigUint64(this.offset + 16, p2, true);
		this.view.setBigInt64(this.offset + 24, p3, true);
		this.offset += 32;
	}
	writeF32(value) {
		this.expandBuffer(4);
		this.view.setFloat32(this.offset, value, true);
		this.offset += 4;
	}
	writeF64(value) {
		this.expandBuffer(8);
		this.view.setFloat64(this.offset, value, true);
		this.offset += 8;
	}
	writeString(value) {
		const len = value.length;
		this.expandBuffer(4 + len);
		const bytes = new Uint8Array(this.buffer.buffer);
		let offset = this.offset + 4;
		let i = 0;
		for (; i < len; i++) {
			const c = value.charCodeAt(i);
			if (c >= 128) break;
			bytes[offset++] = c;
		}
		if (i === len) {
			this.view.setUint32(this.offset, len, true);
			this.offset = offset;
			return;
		}
		this.writeUInt8Array(textEncoder.encode(value));
	}
};
function uint8ArrayToHexString(array) {
	return Array.prototype.map.call(array.reverse(), (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
function uint8ArrayToU128(array) {
	if (array.length != 16) throw new Error(`Uint8Array is not 16 bytes long: ${array}`);
	return new BinaryReader(array).readU128();
}
function uint8ArrayToU256(array) {
	if (array.length != 32) throw new Error(`Uint8Array is not 32 bytes long: [${array}]`);
	return new BinaryReader(array).readU256();
}
function hexStringToUint8Array(str) {
	if (str.startsWith("0x")) str = str.slice(2);
	const matches = str.match(/.{1,2}/g) || [];
	return Uint8Array.from(matches.map((byte) => parseInt(byte, 16))).reverse();
}
function hexStringToU128(str) {
	return uint8ArrayToU128(hexStringToUint8Array(str));
}
function hexStringToU256(str) {
	return uint8ArrayToU256(hexStringToUint8Array(str));
}
function u128ToUint8Array(data) {
	const writer = new BinaryWriter(16);
	writer.writeU128(data);
	return writer.getBuffer();
}
function u128ToHexString(data) {
	return uint8ArrayToHexString(u128ToUint8Array(data));
}
function u256ToUint8Array(data) {
	const writer = new BinaryWriter(32);
	writer.writeU256(data);
	return writer.getBuffer();
}
function u256ToHexString(data) {
	return uint8ArrayToHexString(u256ToUint8Array(data));
}
function coerceToBigInt(value, what) {
	if (typeof value === "bigint") return value;
	if (typeof value === "number") return BigInt(value);
	if (typeof value === "string" && value.trim() !== "") return BigInt(value);
	throw new TypeError(`Cannot convert ${typeof value} to ${what}: expected bigint, integer number, or decimal string`);
}
function toPascalCase(s) {
	const str = toCamelCase(s);
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function toCamelCase(s) {
	const str = s.replace(/[-_]+/g, "_").replace(/_([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
	return str.charAt(0).toLowerCase() + str.slice(1);
}
function bsatnBaseSize(typespace, ty) {
	const assumedArrayLength = 4;
	while (ty.tag === "Ref") ty = typespace.types[ty.value];
	if (ty.tag === "Product") {
		let sum = 0;
		for (const { algebraicType: elem } of ty.value.elements) sum += bsatnBaseSize(typespace, elem);
		return sum;
	} else if (ty.tag === "Sum") {
		let min = Infinity;
		for (const { algebraicType: vari } of ty.value.variants) {
			const vSize = bsatnBaseSize(typespace, vari);
			if (vSize < min) min = vSize;
		}
		if (min === Infinity) min = 0;
		return 4 + min;
	} else if (ty.tag == "Array") return 4 + assumedArrayLength * bsatnBaseSize(typespace, ty.value);
	return {
		String: 4 + assumedArrayLength,
		Sum: 1,
		Bool: 1,
		I8: 1,
		U8: 1,
		I16: 2,
		U16: 2,
		I32: 4,
		U32: 4,
		F32: 4,
		I64: 8,
		U64: 8,
		F64: 8,
		I128: 16,
		U128: 16,
		I256: 32,
		U256: 32
	}[ty.tag];
}
var hasOwn = Object.hasOwn;
var TimeDuration = class _TimeDuration {
	__time_duration_micros__;
	static MICROS_PER_MILLIS = 1000n;
	/**
	* Get the algebraic type representation of the {@link TimeDuration} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__time_duration_micros__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimeDuration(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__time_duration_micros__" && microsElement.algebraicType.tag === "I64";
	}
	get micros() {
		return this.__time_duration_micros__;
	}
	get millis() {
		return Number(this.micros / _TimeDuration.MICROS_PER_MILLIS);
	}
	constructor(micros) {
		this.__time_duration_micros__ = coerceToBigInt(micros, "TimeDuration");
	}
	static fromMillis(millis) {
		return new _TimeDuration(BigInt(millis) * _TimeDuration.MICROS_PER_MILLIS);
	}
	/** This outputs the same string format that we use in the host and in Rust modules */
	toString() {
		const micros = this.micros;
		const sign = micros < 0 ? "-" : "+";
		const pos = micros < 0 ? -micros : micros;
		const secs = pos / 1000000n;
		const micros_remaining = pos % 1000000n;
		return `${sign}${secs}.${String(micros_remaining).padStart(6, "0")}`;
	}
};
var Timestamp = class _Timestamp {
	__timestamp_micros_since_unix_epoch__;
	static MICROS_PER_MILLIS = 1000n;
	get microsSinceUnixEpoch() {
		return this.__timestamp_micros_since_unix_epoch__;
	}
	constructor(micros) {
		this.__timestamp_micros_since_unix_epoch__ = coerceToBigInt(micros, "Timestamp");
	}
	/**
	* Get the algebraic type representation of the {@link Timestamp} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__timestamp_micros_since_unix_epoch__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimestamp(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__timestamp_micros_since_unix_epoch__" && microsElement.algebraicType.tag === "I64";
	}
	/**
	* The Unix epoch, the midnight at the beginning of January 1, 1970, UTC.
	*/
	static UNIX_EPOCH = new _Timestamp(0n);
	/**
	* Get a `Timestamp` representing the execution environment's belief of the current moment in time.
	*/
	static now() {
		return _Timestamp.fromDate(/* @__PURE__ */ new Date());
	}
	/** Convert to milliseconds since Unix epoch. */
	toMillis() {
		return this.microsSinceUnixEpoch / 1000n;
	}
	/**
	* Get a `Timestamp` representing the same point in time as `date`.
	*/
	static fromDate(date) {
		const millis = date.getTime();
		return new _Timestamp(BigInt(millis) * _Timestamp.MICROS_PER_MILLIS);
	}
	/**
	* Get a `Date` representing approximately the same point in time as `this`.
	*
	* This method truncates to millisecond precision,
	* and throws `RangeError` if the `Timestamp` is outside the range representable as a `Date`.
	*/
	toDate() {
		const millis = this.__timestamp_micros_since_unix_epoch__ / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range of JS's Date");
		return new Date(Number(millis));
	}
	/**
	* Get an ISO 8601 / RFC 3339 formatted string representation of this timestamp with microsecond precision.
	*
	* This method preserves the full microsecond precision of the timestamp,
	* and throws `RangeError` if the `Timestamp` is outside the range representable in ISO format.
	*
	* @returns ISO 8601 formatted string with microsecond precision (e.g., '2025-02-17T10:30:45.123456Z')
	*/
	toISOString() {
		const micros = this.__timestamp_micros_since_unix_epoch__;
		const millis = micros / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range for ISO string formatting");
		const isoBase = new Date(Number(millis)).toISOString();
		const microsRemainder = Math.abs(Number(micros % 1000000n));
		const fractionalPart = String(microsRemainder).padStart(6, "0");
		return isoBase.replace(/\.\d{3}Z$/, `.${fractionalPart}Z`);
	}
	since(other) {
		return new TimeDuration(this.__timestamp_micros_since_unix_epoch__ - other.__timestamp_micros_since_unix_epoch__);
	}
};
var Uuid = class _Uuid {
	__uuid__;
	/**
	* The nil UUID (all zeros).
	*
	* @example
	* ```ts
	* const uuid = Uuid.NIL;
	* console.assert(
	*   uuid.toString() === "00000000-0000-0000-0000-000000000000"
	* );
	* ```
	*/
	static NIL = new _Uuid(0n);
	static MAX_UUID_BIGINT = 340282366920938463463374607431768211455n;
	/**
	* The max UUID (all ones).
	*
	* @example
	* ```ts
	* const uuid = Uuid.MAX;
	* console.assert(
	*   uuid.toString() === "ffffffff-ffff-ffff-ffff-ffffffffffff"
	* );
	* ```
	*/
	static MAX = new _Uuid(_Uuid.MAX_UUID_BIGINT);
	/**
	* Create a UUID from a raw 128-bit value.
	*
	* @param u - Unsigned 128-bit integer
	* @throws {Error} If the value is outside the valid UUID range
	*/
	constructor(u) {
		const v = coerceToBigInt(u, "Uuid");
		if (v < 0n || v > _Uuid.MAX_UUID_BIGINT) throw new Error("Invalid UUID: must be between 0 and `MAX_UUID_BIGINT`");
		this.__uuid__ = v;
	}
	/**
	* Create a UUID `v4` from explicit random bytes.
	*
	* This method assumes the bytes are already sufficiently random.
	* It only sets the appropriate bits for the UUID version and variant.
	*
	* @param bytes - Exactly 16 random bytes
	* @returns A UUID `v4`
	* @throws {Error} If `bytes.length !== 16`
	*
	* @example
	* ```ts
	* const randomBytes = new Uint8Array(16);
	* const uuid = Uuid.fromRandomBytesV4(randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "00000000-0000-4000-8000-000000000000"
	* );
	* ```
	*/
	static fromRandomBytesV4(bytes) {
		if (bytes.length !== 16) throw new Error("UUID v4 requires 16 bytes");
		const arr = new Uint8Array(bytes);
		arr[6] = arr[6] & 15 | 64;
		arr[8] = arr[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(arr));
	}
	/**
	* Generate a UUID `v7` using a monotonic counter from `0` to `2^31 - 1`,
	* a timestamp, and 4 random bytes.
	*
	* The counter wraps around on overflow.
	*
	* The UUID `v7` is structured as follows:
	*
	* ```ascii
	* ┌───────────────────────────────────────────────┬───────────────────┐
	* | B0  | B1  | B2  | B3  | B4  | B5              |         B6        |
	* ├───────────────────────────────────────────────┼───────────────────┤
	* |                 unix_ts_ms                    |      version 7    |
	* └───────────────────────────────────────────────┴───────────────────┘
	* ┌──────────────┬─────────┬──────────────────┬───────────────────────┐
	* | B7           | B8      | B9  | B10 | B11  | B12 | B13 | B14 | B15 |
	* ├──────────────┼─────────┼──────────────────┼───────────────────────┤
	* | counter_high | variant |    counter_low   |        random         |
	* └──────────────┴─────────┴──────────────────┴───────────────────────┘
	* ```
	*
	* @param counter - Mutable monotonic counter (31-bit)
	* @param now - Timestamp since the Unix epoch
	* @param randomBytes - Exactly 4 random bytes
	* @returns A UUID `v7`
	*
	* @throws {Error} If the `counter` is negative
	* @throws {Error} If the `timestamp` is before the Unix epoch
	* @throws {Error} If `randomBytes.length !== 4`
	*
	* @example
	* ```ts
	* const now = Timestamp.fromMillis(1_686_000_000_000n);
	* const counter = { value: 1 };
	* const randomBytes = new Uint8Array(4);
	*
	* const uuid = Uuid.fromCounterV7(counter, now, randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "0000647e-5180-7000-8000-000200000000"
	* );
	* ```
	*/
	static fromCounterV7(counter, now, randomBytes) {
		if (randomBytes.length !== 4) throw new Error("`fromCounterV7` requires `randomBytes.length == 4`");
		if (counter.value < 0) throw new Error("`fromCounterV7` uuid `counter` must be non-negative");
		if (now.__timestamp_micros_since_unix_epoch__ < 0) throw new Error("`fromCounterV7` `timestamp` before unix epoch");
		const counterVal = counter.value;
		counter.value = counterVal + 1 & 2147483647;
		const tsMs = now.toMillis() & 281474976710655n;
		const bytes = new Uint8Array(16);
		bytes[0] = Number(tsMs >> 40n & 255n);
		bytes[1] = Number(tsMs >> 32n & 255n);
		bytes[2] = Number(tsMs >> 24n & 255n);
		bytes[3] = Number(tsMs >> 16n & 255n);
		bytes[4] = Number(tsMs >> 8n & 255n);
		bytes[5] = Number(tsMs & 255n);
		bytes[7] = counterVal >>> 23 & 255;
		bytes[9] = counterVal >>> 15 & 255;
		bytes[10] = counterVal >>> 7 & 255;
		bytes[11] = (counterVal & 127) << 1 & 255;
		bytes[12] |= randomBytes[0] & 127;
		bytes[13] = randomBytes[1];
		bytes[14] = randomBytes[2];
		bytes[15] = randomBytes[3];
		bytes[6] = bytes[6] & 15 | 112;
		bytes[8] = bytes[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(bytes));
	}
	/**
	* Parse a UUID from a string representation.
	*
	* @param s - UUID string
	* @returns Parsed UUID
	* @throws {Error} If the string is not a valid UUID
	*
	* @example
	* ```ts
	* const s = "01888d6e-5c00-7000-8000-000000000000";
	* const uuid = Uuid.parse(s);
	*
	* console.assert(uuid.toString() === s);
	* ```
	*/
	static parse(s) {
		const hex = s.replace(/-/g, "");
		if (hex.length !== 32) throw new Error("Invalid hex UUID");
		let v = 0n;
		for (let i = 0; i < 32; i += 2) v = v << 8n | BigInt(parseInt(hex.slice(i, i + 2), 16));
		return new _Uuid(v);
	}
	/** Convert to hex string without a 0x prefix. */
	toHexString() {
		return u128ToHexString(this.asBigInt());
	}
	/** Convert to string (hyphenated form). */
	toString() {
		const hex = this.toHexString();
		return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
	}
	/** Convert to bigint (u128). */
	asBigInt() {
		return this.__uuid__;
	}
	/** Return a `Uint8Array` of 16 bytes. */
	toBytes() {
		return _Uuid.bigIntToBytes(this.__uuid__);
	}
	static bytesToBigInt(bytes) {
		let result = 0n;
		for (const b of bytes) result = result << 8n | BigInt(b);
		return result;
	}
	static bigIntToBytes(value) {
		const bytes = new Uint8Array(16);
		for (let i = 15; i >= 0; i--) {
			bytes[i] = Number(value & 255n);
			value >>= 8n;
		}
		return bytes;
	}
	/**
	* Returns the version of this UUID.
	*
	* This represents the algorithm used to generate the value.
	*
	* @returns A `UuidVersion`
	* @throws {Error} If the version field is not recognized
	*/
	getVersion() {
		const version = this.toBytes()[6] >> 4 & 15;
		switch (version) {
			case 4: return "V4";
			case 7: return "V7";
			default:
				if (this == _Uuid.NIL) return "Nil";
				if (this == _Uuid.MAX) return "Max";
				throw new Error(`Unsupported UUID version: ${version}`);
		}
	}
	/**
	* Extract the monotonic counter from a UUIDv7.
	*
	* Intended for testing and diagnostics.
	* Behavior is undefined if called on a non-V7 UUID.
	*
	* @returns 31-bit counter value
	*/
	getCounter() {
		const bytes = this.toBytes();
		const high = bytes[7];
		const mid1 = bytes[9];
		const mid2 = bytes[10];
		const low = bytes[11] >>> 1;
		return high << 23 | mid1 << 15 | mid2 << 7 | low | 0;
	}
	compareTo(other) {
		if (this.__uuid__ < other.__uuid__) return -1;
		if (this.__uuid__ > other.__uuid__) return 1;
		return 0;
	}
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__uuid__",
			algebraicType: AlgebraicType.U128
		}] });
	}
};
var ConnectionId = class _ConnectionId {
	__connection_id__;
	/**
	* Creates a new `ConnectionId`.
	*/
	constructor(data) {
		this.__connection_id__ = coerceToBigInt(data, "ConnectionId");
	}
	/**
	* Get the algebraic type representation of the {@link ConnectionId} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__connection_id__",
			algebraicType: AlgebraicType.U128
		}] });
	}
	isZero() {
		return this.__connection_id__ === BigInt(0);
	}
	static nullIfZero(addr) {
		if (addr.isZero()) return null;
		else return addr;
	}
	static random() {
		function randomU8() {
			return Math.floor(Math.random() * 255);
		}
		let result = BigInt(0);
		for (let i = 0; i < 16; i++) result = result << BigInt(8) | BigInt(randomU8());
		return new _ConnectionId(result);
	}
	/**
	* Compare two connection IDs for equality.
	*/
	isEqual(other) {
		return this.__connection_id__ == other.__connection_id__;
	}
	/**
	* Check if two connection IDs are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the connection ID as a hexadecimal string.
	*/
	toHexString() {
		return u128ToHexString(this.__connection_id__);
	}
	/**
	* Convert the connection ID to a Uint8Array.
	*/
	toUint8Array() {
		return u128ToUint8Array(this.__connection_id__);
	}
	/**
	* Parse a connection ID from a hexadecimal string.
	*/
	static fromString(str) {
		return new _ConnectionId(hexStringToU128(str));
	}
	static fromStringOrNull(str) {
		const addr = _ConnectionId.fromString(str);
		if (addr.isZero()) return null;
		else return addr;
	}
};
var Identity = class _Identity {
	__identity__;
	/**
	* Creates a new `Identity`.
	*
	* `data` can be a hexadecimal string or a `bigint`.
	*/
	constructor(data) {
		this.__identity__ = typeof data === "string" ? hexStringToU256(data) : coerceToBigInt(data, "Identity");
	}
	/**
	* Get the algebraic type representation of the {@link Identity} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__identity__",
			algebraicType: AlgebraicType.U256
		}] });
	}
	/**
	* Check if two identities are equal.
	*/
	isEqual(other) {
		return this.toHexString() === other.toHexString();
	}
	/**
	* Check if two identities are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the identity as a hexadecimal string.
	*/
	toHexString() {
		return u256ToHexString(this.__identity__);
	}
	/**
	* Convert the address to a Uint8Array.
	*/
	toUint8Array() {
		return u256ToUint8Array(this.__identity__);
	}
	/**
	* Parse an Identity from a hexadecimal string.
	*/
	static fromString(str) {
		return new _Identity(str);
	}
	/**
	* Zero identity (0x0000000000000000000000000000000000000000000000000000000000000000)
	*/
	static zero() {
		return new _Identity(0n);
	}
	toString() {
		return this.toHexString();
	}
};
var SERIALIZERS = /* @__PURE__ */ new Map();
var DESERIALIZERS = /* @__PURE__ */ new Map();
var AlgebraicType = {
	Ref: (value) => ({
		tag: "Ref",
		value
	}),
	Sum: (value) => ({
		tag: "Sum",
		value
	}),
	Product: (value) => ({
		tag: "Product",
		value
	}),
	Array: (value) => ({
		tag: "Array",
		value
	}),
	String: { tag: "String" },
	Bool: { tag: "Bool" },
	I8: { tag: "I8" },
	U8: { tag: "U8" },
	I16: { tag: "I16" },
	U16: { tag: "U16" },
	I32: { tag: "I32" },
	U32: { tag: "U32" },
	I64: { tag: "I64" },
	U64: { tag: "U64" },
	I128: { tag: "I128" },
	U128: { tag: "U128" },
	I256: { tag: "I256" },
	U256: { tag: "U256" },
	F32: { tag: "F32" },
	F64: { tag: "F64" },
	makeSerializer(ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot serialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.makeSerializer(ty.value, typespace);
			case "Sum": return SumType.makeSerializer(ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return serializeUint8Array;
			else {
				const serialize = AlgebraicType.makeSerializer(ty.value, typespace);
				return (writer, value) => {
					writer.writeU32(value.length);
					for (const elem of value) serialize(writer, elem);
				};
			}
			default: return primitiveSerializers[ty.tag];
		}
	},
	serializeValue(writer, ty, value, typespace) {
		AlgebraicType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot deserialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.makeDeserializer(ty.value, typespace);
			case "Sum": return SumType.makeDeserializer(ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return deserializeUint8Array;
			else {
				const deserialize = AlgebraicType.makeDeserializer(ty.value, typespace);
				return (reader) => {
					const length = reader.readU32();
					const result = Array(length);
					for (let i = 0; i < length; i++) result[i] = deserialize(reader);
					return result;
				};
			}
			default: return primitiveDeserializers[ty.tag];
		}
	},
	deserializeValue(reader, ty, typespace) {
		return AlgebraicType.makeDeserializer(ty, typespace)(reader);
	},
	intoMapKey: function(ty, value) {
		switch (ty.tag) {
			case "U8":
			case "U16":
			case "U32":
			case "U64":
			case "U128":
			case "U256":
			case "I8":
			case "I16":
			case "I32":
			case "I64":
			case "I128":
			case "I256":
			case "F32":
			case "F64":
			case "String":
			case "Bool": return value;
			case "Product": return ProductType.intoMapKey(ty.value, value);
			default: {
				const writer = new BinaryWriter(10);
				AlgebraicType.serializeValue(writer, ty, value);
				return writer.toBase64();
			}
		}
	}
};
function bindCall(f) {
	return Function.prototype.call.bind(f);
}
var primitiveSerializers = {
	Bool: bindCall(BinaryWriter.prototype.writeBool),
	I8: bindCall(BinaryWriter.prototype.writeI8),
	U8: bindCall(BinaryWriter.prototype.writeU8),
	I16: bindCall(BinaryWriter.prototype.writeI16),
	U16: bindCall(BinaryWriter.prototype.writeU16),
	I32: bindCall(BinaryWriter.prototype.writeI32),
	U32: bindCall(BinaryWriter.prototype.writeU32),
	I64: bindCall(BinaryWriter.prototype.writeI64),
	U64: bindCall(BinaryWriter.prototype.writeU64),
	I128: bindCall(BinaryWriter.prototype.writeI128),
	U128: bindCall(BinaryWriter.prototype.writeU128),
	I256: bindCall(BinaryWriter.prototype.writeI256),
	U256: bindCall(BinaryWriter.prototype.writeU256),
	F32: bindCall(BinaryWriter.prototype.writeF32),
	F64: bindCall(BinaryWriter.prototype.writeF64),
	String: bindCall(BinaryWriter.prototype.writeString)
};
Object.freeze(primitiveSerializers);
var serializeUint8Array = bindCall(BinaryWriter.prototype.writeUInt8Array);
var primitiveDeserializers = {
	Bool: bindCall(BinaryReader.prototype.readBool),
	I8: bindCall(BinaryReader.prototype.readI8),
	U8: bindCall(BinaryReader.prototype.readU8),
	I16: bindCall(BinaryReader.prototype.readI16),
	U16: bindCall(BinaryReader.prototype.readU16),
	I32: bindCall(BinaryReader.prototype.readI32),
	U32: bindCall(BinaryReader.prototype.readU32),
	I64: bindCall(BinaryReader.prototype.readI64),
	U64: bindCall(BinaryReader.prototype.readU64),
	I128: bindCall(BinaryReader.prototype.readI128),
	U128: bindCall(BinaryReader.prototype.readU128),
	I256: bindCall(BinaryReader.prototype.readI256),
	U256: bindCall(BinaryReader.prototype.readU256),
	F32: bindCall(BinaryReader.prototype.readF32),
	F64: bindCall(BinaryReader.prototype.readF64),
	String: bindCall(BinaryReader.prototype.readString)
};
Object.freeze(primitiveDeserializers);
var deserializeUint8Array = bindCall(BinaryReader.prototype.readUInt8Array);
var primitiveSizes = {
	Bool: 1,
	I8: 1,
	U8: 1,
	I16: 2,
	U16: 2,
	I32: 4,
	U32: 4,
	I64: 8,
	U64: 8,
	I128: 16,
	U128: 16,
	I256: 32,
	U256: 32,
	F32: 4,
	F64: 8
};
var fixedSizePrimitives = new Set(Object.keys(primitiveSizes));
var isFixedSizeProduct = (ty) => ty.elements.every(({ algebraicType }) => fixedSizePrimitives.has(algebraicType.tag));
var productSize = (ty) => ty.elements.reduce((acc, { algebraicType }) => acc + primitiveSizes[algebraicType.tag], 0);
var primitiveJSName = {
	Bool: "Uint8",
	I8: "Int8",
	U8: "Uint8",
	I16: "Int16",
	U16: "Uint16",
	I32: "Int32",
	U32: "Uint32",
	I64: "BigInt64",
	U64: "BigUint64",
	F32: "Float32",
	F64: "Float64"
};
var specialProductDeserializers = {
	__time_duration_micros__: (reader) => new TimeDuration(reader.readI64()),
	__timestamp_micros_since_unix_epoch__: (reader) => new Timestamp(reader.readI64()),
	__identity__: (reader) => new Identity(reader.readU256()),
	__connection_id__: (reader) => new ConnectionId(reader.readU128()),
	__uuid__: (reader) => new Uuid(reader.readU128())
};
Object.freeze(specialProductDeserializers);
var unitDeserializer = () => ({});
var getElementInitializer = (element) => {
	let init;
	switch (element.algebraicType.tag) {
		case "String":
			init = "''";
			break;
		case "Bool":
			init = "false";
			break;
		case "I8":
		case "U8":
		case "I16":
		case "U16":
		case "I32":
		case "U32":
			init = "0";
			break;
		case "I64":
		case "U64":
		case "I128":
		case "U128":
		case "I256":
		case "U256":
			init = "0n";
			break;
		case "F32":
		case "F64":
			init = "0.0";
			break;
		default: init = "undefined";
	}
	return `${element.name}: ${init}`;
};
var ProductType = {
	makeSerializer(ty, typespace) {
		let serializer = SERIALIZERS.get(ty);
		if (serializer != null) return serializer;
		if (isFixedSizeProduct(ty)) {
			const body2 = `"use strict";
writer.expandBuffer(${productSize(ty)});
const view = writer.view;
${ty.elements.map(({ name, algebraicType: { tag } }) => tag in primitiveJSName ? `view.set${primitiveJSName[tag]}(writer.offset, value.${name}, ${primitiveSizes[tag] > 1 ? "true" : ""});
writer.offset += ${primitiveSizes[tag]};` : `writer.write${tag}(value.${name});`).join("\n")}`;
			serializer = Function("writer", "value", body2);
			SERIALIZERS.set(ty, serializer);
			return serializer;
		}
		const serializers = {};
		const body = "\"use strict\";\n" + ty.elements.map((element) => `this.${element.name}(writer, value.${element.name});`).join("\n");
		serializer = Function("writer", "value", body).bind(serializers);
		SERIALIZERS.set(ty, serializer);
		for (const { name, algebraicType } of ty.elements) serializers[name] = AlgebraicType.makeSerializer(algebraicType, typespace);
		Object.freeze(serializers);
		return serializer;
	},
	serializeValue(writer, ty, value, typespace) {
		ProductType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		switch (ty.elements.length) {
			case 0: return unitDeserializer;
			case 1: {
				const fieldName = ty.elements[0].name;
				if (hasOwn(specialProductDeserializers, fieldName)) return specialProductDeserializers[fieldName];
			}
		}
		let deserializer = DESERIALIZERS.get(ty);
		if (deserializer != null) return deserializer;
		if (isFixedSizeProduct(ty)) {
			const body = `"use strict";
const result = { ${ty.elements.map(getElementInitializer).join(", ")} };
const view = reader.view;
${ty.elements.map(({ name, algebraicType: { tag } }) => tag in primitiveJSName ? tag === "Bool" ? `result.${name} = view.getUint8(reader.offset) !== 0;
reader.offset += 1;` : `result.${name} = view.get${primitiveJSName[tag]}(reader.offset, ${primitiveSizes[tag] > 1 ? "true" : ""});
reader.offset += ${primitiveSizes[tag]};` : `result.${name} = reader.read${tag}();`).join("\n")}
return result;`;
			deserializer = Function("reader", body);
			DESERIALIZERS.set(ty, deserializer);
			return deserializer;
		}
		const deserializers = {};
		deserializer = Function("reader", `"use strict";
const result = { ${ty.elements.map(getElementInitializer).join(", ")} };
${ty.elements.map(({ name }) => `result.${name} = this.${name}(reader);`).join("\n")}
return result;`).bind(deserializers);
		DESERIALIZERS.set(ty, deserializer);
		for (const { name, algebraicType } of ty.elements) deserializers[name] = AlgebraicType.makeDeserializer(algebraicType, typespace);
		Object.freeze(deserializers);
		return deserializer;
	},
	deserializeValue(reader, ty, typespace) {
		return ProductType.makeDeserializer(ty, typespace)(reader);
	},
	intoMapKey(ty, value) {
		if (ty.elements.length === 1) {
			const fieldName = ty.elements[0].name;
			if (hasOwn(specialProductDeserializers, fieldName)) return value[fieldName];
		}
		const writer = new BinaryWriter(10);
		AlgebraicType.serializeValue(writer, AlgebraicType.Product(ty), value);
		return writer.toBase64();
	}
};
var SumType = {
	makeSerializer(ty, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") {
			const serialize = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			return (writer, value) => {
				if (value !== null && value !== void 0) {
					writer.writeByte(0);
					serialize(writer, value);
				} else writer.writeByte(1);
			};
		} else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			const serializeOk = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			const serializeErr = AlgebraicType.makeSerializer(ty.variants[1].algebraicType, typespace);
			return (writer, value) => {
				if ("ok" in value) {
					writer.writeU8(0);
					serializeOk(writer, value.ok);
				} else if ("err" in value) {
					writer.writeU8(1);
					serializeErr(writer, value.err);
				} else throw new TypeError("could not serialize result: object had neither a `ok` nor an `err` field");
			};
		} else {
			let serializer = SERIALIZERS.get(ty);
			if (serializer != null) return serializer;
			const serializers = {};
			const body = `switch (value.tag) {
${ty.variants.map(({ name }, i) => `  case ${JSON.stringify(name)}:
    writer.writeByte(${i});
    return this.${name}(writer, value.value);`).join("\n")}
  default:
    throw new TypeError(
      \`Could not serialize sum type; unknown tag \${value.tag}\`
    )
}
`;
			serializer = Function("writer", "value", body).bind(serializers);
			SERIALIZERS.set(ty, serializer);
			for (const { name, algebraicType } of ty.variants) serializers[name] = AlgebraicType.makeSerializer(algebraicType, typespace);
			Object.freeze(serializers);
			return serializer;
		}
	},
	serializeValue(writer, ty, value, typespace) {
		SumType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") {
			const deserialize = AlgebraicType.makeDeserializer(ty.variants[0].algebraicType, typespace);
			return (reader) => {
				const tag = reader.readU8();
				if (tag === 0) return deserialize(reader);
				else if (tag === 1) return;
				else throw `Can't deserialize an option type, couldn't find ${tag} tag`;
			};
		} else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			const deserializeOk = AlgebraicType.makeDeserializer(ty.variants[0].algebraicType, typespace);
			const deserializeErr = AlgebraicType.makeDeserializer(ty.variants[1].algebraicType, typespace);
			return (reader) => {
				const tag = reader.readByte();
				if (tag === 0) return { ok: deserializeOk(reader) };
				else if (tag === 1) return { err: deserializeErr(reader) };
				else throw `Can't deserialize a result type, couldn't find ${tag} tag`;
			};
		} else {
			let deserializer = DESERIALIZERS.get(ty);
			if (deserializer != null) return deserializer;
			const deserializers = {};
			deserializer = Function("reader", `switch (reader.readU8()) {
${ty.variants.map(({ name }, i) => `case ${i}: return { tag: ${JSON.stringify(name)}, value: this.${name}(reader) };`).join("\n")} }`).bind(deserializers);
			DESERIALIZERS.set(ty, deserializer);
			for (const { name, algebraicType } of ty.variants) deserializers[name] = AlgebraicType.makeDeserializer(algebraicType, typespace);
			Object.freeze(deserializers);
			return deserializer;
		}
	},
	deserializeValue(reader, ty, typespace) {
		return SumType.makeDeserializer(ty, typespace)(reader);
	}
};
var Option = { getAlgebraicType(innerType) {
	return AlgebraicType.Sum({ variants: [{
		name: "some",
		algebraicType: innerType
	}, {
		name: "none",
		algebraicType: AlgebraicType.Product({ elements: [] })
	}] });
} };
var Result = { getAlgebraicType(okType, errType) {
	return AlgebraicType.Sum({ variants: [{
		name: "ok",
		algebraicType: okType
	}, {
		name: "err",
		algebraicType: errType
	}] });
} };
var ScheduleAt = {
	interval(value) {
		return Interval(value);
	},
	time(value) {
		return Time(value);
	},
	getAlgebraicType() {
		return AlgebraicType.Sum({ variants: [{
			name: "Interval",
			algebraicType: TimeDuration.getAlgebraicType()
		}, {
			name: "Time",
			algebraicType: Timestamp.getAlgebraicType()
		}] });
	},
	isScheduleAt(algebraicType) {
		if (algebraicType.tag !== "Sum") return false;
		const variants = algebraicType.value.variants;
		if (variants.length !== 2) return false;
		const intervalVariant = variants.find((v) => v.name === "Interval");
		const timeVariant = variants.find((v) => v.name === "Time");
		if (!intervalVariant || !timeVariant) return false;
		return TimeDuration.isTimeDuration(intervalVariant.algebraicType) && Timestamp.isTimestamp(timeVariant.algebraicType);
	}
};
var Interval = (micros) => ({
	tag: "Interval",
	value: new TimeDuration(micros)
});
var Time = (microsSinceUnixEpoch) => ({
	tag: "Time",
	value: new Timestamp(microsSinceUnixEpoch)
});
var schedule_at_default = ScheduleAt;
function set(x, t2) {
	return {
		...x,
		...t2
	};
}
var TypeBuilder = class {
	/**
	* The TypeScript phantom type. This is not stored at runtime,
	* but is visible to the compiler
	*/
	type;
	/**
	* The SpacetimeDB algebraic type (run‑time value). In addition to storing
	* the runtime representation of the `AlgebraicType`, it also captures
	* the TypeScript type information of the `AlgebraicType`. That is to say
	* the value is not merely an `AlgebraicType`, but is constructed to be
	* the corresponding concrete `AlgebraicType` for the TypeScript type `Type`.
	*
	* e.g. `string` corresponds to `AlgebraicType.String`
	*/
	algebraicType;
	constructor(algebraicType) {
		this.algebraicType = algebraicType;
	}
	optional() {
		return new OptionBuilder(this);
	}
	serialize(writer, value) {
		(this.serialize = AlgebraicType.makeSerializer(this.algebraicType))(writer, value);
	}
	deserialize(reader) {
		return (this.deserialize = AlgebraicType.makeDeserializer(this.algebraicType))(reader);
	}
};
var U8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U8);
	}
	index(algorithm = "btree") {
		return new U8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U16);
	}
	index(algorithm = "btree") {
		return new U16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U32);
	}
	index(algorithm = "btree") {
		return new U32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U64);
	}
	index(algorithm = "btree") {
		return new U64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U128);
	}
	index(algorithm = "btree") {
		return new U128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U256);
	}
	index(algorithm = "btree") {
		return new U256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I8);
	}
	index(algorithm = "btree") {
		return new I8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I16);
	}
	index(algorithm = "btree") {
		return new I16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I32);
	}
	index(algorithm = "btree") {
		return new I32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I64);
	}
	index(algorithm = "btree") {
		return new I64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I128);
	}
	index(algorithm = "btree") {
		return new I128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I256);
	}
	index(algorithm = "btree") {
		return new I256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F32);
	}
	default(value) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F64);
	}
	default(value) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var BoolBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Bool);
	}
	index(algorithm = "btree") {
		return new BoolColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var StringBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.String);
	}
	index(algorithm = "btree") {
		return new StringColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new StringColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new StringColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ArrayBuilder = class extends TypeBuilder {
	element;
	constructor(element) {
		super(AlgebraicType.Array(element.algebraicType));
		this.element = element;
	}
	default(value) {
		return new ArrayColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ArrayColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ByteArrayBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Array(AlgebraicType.U8));
	}
	default(value) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { name }));
	}
};
var OptionBuilder = class extends TypeBuilder {
	value;
	constructor(value) {
		super(Option.getAlgebraicType(value.algebraicType));
		this.value = value;
	}
	default(value) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ProductBuilder = class extends TypeBuilder {
	typeName;
	elements;
	constructor(elements, name) {
		function elementsArrayFromElementsObj(obj) {
			return Object.keys(obj).map((key) => ({
				name: key,
				get algebraicType() {
					return obj[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Product({ elements: elementsArrayFromElementsObj(elements) }));
		this.typeName = name;
		this.elements = elements;
	}
	default(value) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ResultBuilder = class extends TypeBuilder {
	ok;
	err;
	constructor(ok, err) {
		super(Result.getAlgebraicType(ok.algebraicType, err.algebraicType));
		this.ok = ok;
		this.err = err;
	}
	default(value) {
		return new ResultColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
};
var UnitBuilder = class extends TypeBuilder {
	constructor() {
		super({
			tag: "Product",
			value: { elements: [] }
		});
	}
};
var RowBuilder = class extends TypeBuilder {
	row;
	typeName;
	constructor(row, name) {
		const mappedRow = Object.fromEntries(Object.entries(row).map(([colName, builder]) => [colName, builder instanceof ColumnBuilder ? builder : new ColumnBuilder(builder, {})]));
		const elements = Object.keys(mappedRow).map((name2) => ({
			name: name2,
			get algebraicType() {
				return mappedRow[name2].typeBuilder.algebraicType;
			}
		}));
		super(AlgebraicType.Product({ elements }));
		this.row = mappedRow;
		this.typeName = name;
	}
};
var SumBuilderImpl = class extends TypeBuilder {
	variants;
	typeName;
	constructor(variants, name) {
		function variantsArrayFromVariantsObj(variants2) {
			return Object.keys(variants2).map((key) => ({
				name: key,
				get algebraicType() {
					return variants2[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Sum({ variants: variantsArrayFromVariantsObj(variants) }));
		this.variants = variants;
		this.typeName = name;
		for (const key of Object.keys(variants)) {
			const desc = Object.getOwnPropertyDescriptor(variants, key);
			const isAccessor = !!desc && (typeof desc.get === "function" || typeof desc.set === "function");
			let isUnit2 = false;
			if (!isAccessor) isUnit2 = variants[key] instanceof UnitBuilder;
			if (isUnit2) {
				const constant = this.create(key);
				Object.defineProperty(this, key, {
					value: constant,
					writable: false,
					enumerable: true,
					configurable: false
				});
			} else {
				const fn = ((value) => this.create(key, value));
				Object.defineProperty(this, key, {
					value: fn,
					writable: false,
					enumerable: true,
					configurable: false
				});
			}
		}
	}
	create(tag, value) {
		return value === void 0 ? { tag } : {
			tag,
			value
		};
	}
	default(value) {
		return new SumColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new SumColumnBuilder(this, set(defaultMetadata, { name }));
	}
	index(algorithm = "btree") {
		return new SumColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new SumColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
};
var SumBuilder = SumBuilderImpl;
var SimpleSumBuilderImpl = class extends SumBuilderImpl {
	index(algorithm = "btree") {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtBuilder = class extends TypeBuilder {
	constructor() {
		super(schedule_at_default.getAlgebraicType());
	}
	default(value) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var IdentityBuilder = class extends TypeBuilder {
	constructor() {
		super(Identity.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ConnectionIdBuilder = class extends TypeBuilder {
	constructor() {
		super(ConnectionId.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimestampBuilder = class extends TypeBuilder {
	constructor() {
		super(Timestamp.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimeDurationBuilder = class extends TypeBuilder {
	constructor() {
		super(TimeDuration.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var UuidBuilder = class extends TypeBuilder {
	constructor() {
		super(Uuid.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new UuidColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var defaultMetadata = {};
var ColumnBuilder = class {
	typeBuilder;
	columnMetadata;
	constructor(typeBuilder, metadata) {
		this.typeBuilder = typeBuilder;
		this.columnMetadata = metadata;
	}
	serialize(writer, value) {
		this.typeBuilder.serialize(writer, value);
	}
	deserialize(reader) {
		return this.typeBuilder.deserialize(reader);
	}
};
var U8ColumnBuilder = class _U8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U16ColumnBuilder = class _U16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U32ColumnBuilder = class _U32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U64ColumnBuilder = class _U64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U128ColumnBuilder = class _U128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U256ColumnBuilder = class _U256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I8ColumnBuilder = class _I8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I16ColumnBuilder = class _I16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I32ColumnBuilder = class _I32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I64ColumnBuilder = class _I64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I128ColumnBuilder = class _I128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I256ColumnBuilder = class _I256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F32ColumnBuilder = class _F32ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F64ColumnBuilder = class _F64ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var BoolColumnBuilder = class _BoolColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var StringColumnBuilder = class _StringColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ArrayColumnBuilder = class _ArrayColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ByteArrayColumnBuilder = class _ByteArrayColumnBuilder extends ColumnBuilder {
	constructor(metadata) {
		super(new TypeBuilder(AlgebraicType.Array(AlgebraicType.U8)), metadata);
	}
	default(value) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { name }));
	}
};
var OptionColumnBuilder = class _OptionColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ResultColumnBuilder = class _ResultColumnBuilder extends ColumnBuilder {
	constructor(typeBuilder, metadata) {
		super(typeBuilder, metadata);
	}
	default(value) {
		return new _ResultColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
};
var ProductColumnBuilder = class _ProductColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SumColumnBuilder = class _SumColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
	index(algorithm = "btree") {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
};
var SimpleSumColumnBuilder = class _SimpleSumColumnBuilder extends SumColumnBuilder {
	index(algorithm = "btree") {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtColumnBuilder = class _ScheduleAtColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var IdentityColumnBuilder = class _IdentityColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ConnectionIdColumnBuilder = class _ConnectionIdColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimestampColumnBuilder = class _TimestampColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimeDurationColumnBuilder = class _TimeDurationColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var UuidColumnBuilder = class _UuidColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var RefBuilder = class extends TypeBuilder {
	ref;
	/** The phantom type of the pointee of this ref. */
	__spacetimeType;
	constructor(ref) {
		super(AlgebraicType.Ref(ref));
		this.ref = ref;
	}
};
var enumImpl = ((nameOrObj, maybeObj) => {
	let obj = nameOrObj;
	let name = void 0;
	if (typeof nameOrObj === "string") {
		if (!maybeObj) throw new TypeError("When providing a name, you must also provide the variants object or array.");
		obj = maybeObj;
		name = nameOrObj;
	}
	if (Array.isArray(obj)) {
		const simpleVariantsObj = {};
		for (const variant of obj) simpleVariantsObj[variant] = new UnitBuilder();
		return new SimpleSumBuilderImpl(simpleVariantsObj, name);
	}
	return new SumBuilder(obj, name);
});
var t = {
	bool: () => new BoolBuilder(),
	string: () => new StringBuilder(),
	number: () => new F64Builder(),
	i8: () => new I8Builder(),
	u8: () => new U8Builder(),
	i16: () => new I16Builder(),
	u16: () => new U16Builder(),
	i32: () => new I32Builder(),
	u32: () => new U32Builder(),
	i64: () => new I64Builder(),
	u64: () => new U64Builder(),
	i128: () => new I128Builder(),
	u128: () => new U128Builder(),
	i256: () => new I256Builder(),
	u256: () => new U256Builder(),
	f32: () => new F32Builder(),
	f64: () => new F64Builder(),
	object: ((nameOrObj, maybeObj) => {
		if (typeof nameOrObj === "string") {
			if (!maybeObj) throw new TypeError("When providing a name, you must also provide the object.");
			return new ProductBuilder(maybeObj, nameOrObj);
		}
		return new ProductBuilder(nameOrObj, void 0);
	}),
	row: ((nameOrObj, maybeObj) => {
		const [obj, name] = typeof nameOrObj === "string" ? [maybeObj, nameOrObj] : [nameOrObj, void 0];
		return new RowBuilder(obj, name);
	}),
	array(e) {
		return new ArrayBuilder(e);
	},
	enum: enumImpl,
	unit() {
		return new UnitBuilder();
	},
	lazy(thunk) {
		let cached = null;
		const get = () => cached ??= thunk();
		return new Proxy({}, {
			get(_t, prop, recv) {
				const target = get();
				const val = Reflect.get(target, prop, recv);
				return typeof val === "function" ? val.bind(target) : val;
			},
			set(_t, prop, value, recv) {
				return Reflect.set(get(), prop, value, recv);
			},
			has(_t, prop) {
				return prop in get();
			},
			ownKeys() {
				return Reflect.ownKeys(get());
			},
			getOwnPropertyDescriptor(_t, prop) {
				return Object.getOwnPropertyDescriptor(get(), prop);
			},
			getPrototypeOf() {
				return Object.getPrototypeOf(get());
			}
		});
	},
	scheduleAt: () => {
		return new ScheduleAtBuilder();
	},
	option(value) {
		return new OptionBuilder(value);
	},
	result(ok, err) {
		return new ResultBuilder(ok, err);
	},
	identity: () => {
		return new IdentityBuilder();
	},
	connectionId: () => {
		return new ConnectionIdBuilder();
	},
	timestamp: () => {
		return new TimestampBuilder();
	},
	timeDuration: () => {
		return new TimeDurationBuilder();
	},
	uuid: () => {
		return new UuidBuilder();
	},
	byteArray: () => {
		return new ByteArrayBuilder();
	}
};
var MAX_ENV_KEY_BYTES = 256;
var MAX_ENV_VALUE_BYTES = 8 * 1024;
var MAX_ENV_VARS = 256;
var environment = new Proxy(Object.freeze(Object.assign(/* @__PURE__ */ Object.create(null), { get: (key) => env_get(key) })), { get(target, key) {
	if (key === "get") return target.get;
	if (typeof key !== "string") return void 0;
	return env_get(key) ?? void 0;
} });
function environmentDeclarations(schema2) {
	const entries = Object.entries(schema2);
	if (entries.length > MAX_ENV_VARS) throw new TypeError("Too many environment declarations");
	const bytes = new TextEncoder();
	return entries.map(([name, definition]) => {
		if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) || bytes.encode(name).length > MAX_ENV_KEY_BYTES) throw new TypeError("Invalid environment declaration name");
		const optional = definition instanceof OptionBuilder;
		const inner = optional ? definition.value : definition;
		let ty;
		if (inner instanceof StringBuilder) ty = { tag: "String" };
		else {
			const type = inner?.algebraicType;
			if (type?.tag !== "Sum" || !("variants" in inner)) throw new TypeError(`Environment '${name}' must be a string or simple enum`);
			const values = type.value.variants.map((variant) => {
				if (variant.algebraicType.tag !== "Product" || variant.algebraicType.value.elements.length !== 0) throw new TypeError(`Environment '${name}' cannot use an enum payload`);
				if (typeof variant.name !== "string") throw new TypeError(`Environment '${name}' enum cases must have names`);
				if (bytes.encode(variant.name).length > MAX_ENV_VALUE_BYTES) throw new TypeError(`Environment '${name}' literal is too long`);
				return variant.name;
			});
			if (values.length === 0 || new Set(values).size !== values.length) throw new TypeError(`Environment '${name}' needs a nonempty literal union`);
			ty = values.length === 1 ? {
				tag: "StringLiteral",
				value: values[0]
			} : {
				tag: "Union",
				value: values
			};
		}
		return {
			name,
			ty,
			optional
		};
	});
}
var AlgebraicType2 = t.enum("AlgebraicType", {
	Ref: t.u32(),
	get Sum() {
		return SumType2;
	},
	get Product() {
		return ProductType2;
	},
	get Array() {
		return AlgebraicType2;
	},
	String: t.unit(),
	Bool: t.unit(),
	I8: t.unit(),
	U8: t.unit(),
	I16: t.unit(),
	U16: t.unit(),
	I32: t.unit(),
	U32: t.unit(),
	I64: t.unit(),
	U64: t.unit(),
	I128: t.unit(),
	U128: t.unit(),
	I256: t.unit(),
	U256: t.unit(),
	F32: t.unit(),
	F64: t.unit()
});
var CaseConversionPolicy = t.enum("CaseConversionPolicy", {
	None: t.unit(),
	SnakeCase: t.unit()
});
var EnvVarType = t.enum("EnvVarType", {
	String: t.unit(),
	StringLiteral: t.string(),
	Union: t.array(t.string())
});
var EnvironmentDeclaration = t.object("EnvironmentDeclaration", {
	name: t.string(),
	get ty() {
		return EnvVarType;
	},
	optional: t.bool()
});
var ExplicitNameEntry = t.enum("ExplicitNameEntry", {
	get Table() {
		return NameMapping;
	},
	get Function() {
		return NameMapping;
	},
	get Index() {
		return NameMapping;
	},
	get Namespace() {
		return NameMapping;
	}
});
var ExplicitNames = t.object("ExplicitNames", { get entries() {
	return t.array(ExplicitNameEntry);
} });
var FunctionVisibility = t.enum("FunctionVisibility", {
	Private: t.unit(),
	ClientCallable: t.unit()
});
var HttpHeaderPair = t.object("HttpHeaderPair", {
	name: t.string(),
	value: t.byteArray()
});
var HttpHeaders = t.object("HttpHeaders", { get entries() {
	return t.array(HttpHeaderPair);
} });
var HttpMethod = t.enum("HttpMethod", {
	Get: t.unit(),
	Head: t.unit(),
	Post: t.unit(),
	Put: t.unit(),
	Delete: t.unit(),
	Connect: t.unit(),
	Options: t.unit(),
	Trace: t.unit(),
	Patch: t.unit(),
	Extension: t.string()
});
var HttpRequest = t.object("HttpRequest", {
	get method() {
		return HttpMethod;
	},
	get headers() {
		return HttpHeaders;
	},
	timeout: t.option(t.timeDuration()),
	uri: t.string(),
	get version() {
		return HttpVersion;
	}
});
var HttpResponse = t.object("HttpResponse", {
	get headers() {
		return HttpHeaders;
	},
	get version() {
		return HttpVersion;
	},
	code: t.u16()
});
var HttpVersion = t.enum("HttpVersion", {
	Http09: t.unit(),
	Http10: t.unit(),
	Http11: t.unit(),
	Http2: t.unit(),
	Http3: t.unit()
});
var IndexType = t.enum("IndexType", {
	BTree: t.unit(),
	Hash: t.unit()
});
var Lifecycle = t.enum("Lifecycle", {
	Init: t.unit(),
	OnConnect: t.unit(),
	OnDisconnect: t.unit()
});
var MethodOrAny = t.enum("MethodOrAny", {
	Any: t.unit(),
	get Method() {
		return HttpMethod;
	}
});
var MiscModuleExport = t.enum("MiscModuleExport", { get TypeAlias() {
	return TypeAlias;
} });
var NameMapping = t.object("NameMapping", {
	sourceName: t.string(),
	canonicalName: t.string()
});
var ProductType2 = t.object("ProductType", { get elements() {
	return t.array(ProductTypeElement);
} });
var ProductTypeElement = t.object("ProductTypeElement", {
	name: t.option(t.string()),
	get algebraicType() {
		return AlgebraicType2;
	}
});
var RawColumnDefV8 = t.object("RawColumnDefV8", {
	colName: t.string(),
	get colType() {
		return AlgebraicType2;
	}
});
var RawColumnDefaultValueV10 = t.object("RawColumnDefaultValueV10", {
	colId: t.u16(),
	value: t.byteArray()
});
var RawColumnDefaultValueV9 = t.object("RawColumnDefaultValueV9", {
	table: t.string(),
	colId: t.u16(),
	value: t.byteArray()
});
var RawConstraintDataV9 = t.enum("RawConstraintDataV9", { get Unique() {
	return RawUniqueConstraintDataV9;
} });
var RawConstraintDefV10 = t.object("RawConstraintDefV10", {
	sourceName: t.option(t.string()),
	get data() {
		return RawConstraintDataV9;
	}
});
var RawConstraintDefV8 = t.object("RawConstraintDefV8", {
	constraintName: t.string(),
	constraints: t.u8(),
	columns: t.array(t.u16())
});
var RawConstraintDefV9 = t.object("RawConstraintDefV9", {
	name: t.option(t.string()),
	get data() {
		return RawConstraintDataV9;
	}
});
var RawHttpHandlerDefV10 = t.object("RawHttpHandlerDefV10", { sourceName: t.string() });
var RawHttpRouteDefV10 = t.object("RawHttpRouteDefV10", {
	handlerFunction: t.string(),
	get method() {
		return MethodOrAny;
	},
	path: t.string()
});
var RawIndexAlgorithm = t.enum("RawIndexAlgorithm", {
	BTree: t.array(t.u16()),
	Hash: t.array(t.u16()),
	Direct: t.u16()
});
var RawIndexDefV10 = t.object("RawIndexDefV10", {
	sourceName: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return RawIndexAlgorithm;
	}
});
var RawIndexDefV8 = t.object("RawIndexDefV8", {
	indexName: t.string(),
	isUnique: t.bool(),
	get indexType() {
		return IndexType;
	},
	columns: t.array(t.u16())
});
var RawIndexDefV9 = t.object("RawIndexDefV9", {
	name: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return RawIndexAlgorithm;
	}
});
var RawLifeCycleReducerDefV10 = t.object("RawLifeCycleReducerDefV10", {
	get lifecycleSpec() {
		return Lifecycle;
	},
	functionName: t.string()
});
var RawMiscModuleExportV9 = t.enum("RawMiscModuleExportV9", {
	get ColumnDefaultValue() {
		return RawColumnDefaultValueV9;
	},
	get Procedure() {
		return RawProcedureDefV9;
	},
	get View() {
		return RawViewDefV9;
	}
});
var RawModuleDef = t.enum("RawModuleDef", {
	get V8BackCompat() {
		return RawModuleDefV8;
	},
	get V9() {
		return RawModuleDefV9;
	},
	get V10() {
		return RawModuleDefV10;
	}
});
var RawModuleDefV10 = t.object("RawModuleDefV10", { get sections() {
	return t.array(RawModuleDefV10Section);
} });
var RawModuleDefV10Section = t.enum("RawModuleDefV10Section", {
	get Typespace() {
		return Typespace;
	},
	get Types() {
		return t.array(RawTypeDefV10);
	},
	get Tables() {
		return t.array(RawTableDefV10);
	},
	get Reducers() {
		return t.array(RawReducerDefV10);
	},
	get Procedures() {
		return t.array(RawProcedureDefV10);
	},
	get Views() {
		return t.array(RawViewDefV10);
	},
	get Schedules() {
		return t.array(RawScheduleDefV10);
	},
	get LifeCycleReducers() {
		return t.array(RawLifeCycleReducerDefV10);
	},
	get RowLevelSecurity() {
		return t.array(RawRowLevelSecurityDefV9);
	},
	get CaseConversionPolicy() {
		return CaseConversionPolicy;
	},
	get ExplicitNames() {
		return ExplicitNames;
	},
	get HttpHandlers() {
		return t.array(RawHttpHandlerDefV10);
	},
	get HttpRoutes() {
		return t.array(RawHttpRouteDefV10);
	},
	get ViewPrimaryKeys() {
		return t.array(RawViewPrimaryKeyDefV10);
	},
	get Submodules() {
		return t.array(RawSubmoduleV10);
	},
	get Environment() {
		return t.array(EnvironmentDeclaration);
	}
});
var RawModuleDefV8 = t.object("RawModuleDefV8", {
	get typespace() {
		return Typespace;
	},
	get tables() {
		return t.array(TableDesc);
	},
	get reducers() {
		return t.array(ReducerDef);
	},
	get miscExports() {
		return t.array(MiscModuleExport);
	}
});
var RawModuleDefV9 = t.object("RawModuleDefV9", {
	get typespace() {
		return Typespace;
	},
	get tables() {
		return t.array(RawTableDefV9);
	},
	get reducers() {
		return t.array(RawReducerDefV9);
	},
	get types() {
		return t.array(RawTypeDefV9);
	},
	get miscExports() {
		return t.array(RawMiscModuleExportV9);
	},
	get rowLevelSecurity() {
		return t.array(RawRowLevelSecurityDefV9);
	}
});
var RawProcedureDefV10 = t.object("RawProcedureDefV10", {
	sourceName: t.string(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	},
	get visibility() {
		return FunctionVisibility;
	}
});
var RawProcedureDefV9 = t.object("RawProcedureDefV9", {
	name: t.string(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var RawReducerDefV10 = t.object("RawReducerDefV10", {
	sourceName: t.string(),
	get params() {
		return ProductType2;
	},
	get visibility() {
		return FunctionVisibility;
	},
	get okReturnType() {
		return AlgebraicType2;
	},
	get errReturnType() {
		return AlgebraicType2;
	}
});
var RawReducerDefV9 = t.object("RawReducerDefV9", {
	name: t.string(),
	get params() {
		return ProductType2;
	},
	get lifecycle() {
		return t.option(Lifecycle);
	}
});
var RawRowLevelSecurityDefV9 = t.object("RawRowLevelSecurityDefV9", { sql: t.string() });
var RawScheduleDefV10 = t.object("RawScheduleDefV10", {
	sourceName: t.option(t.string()),
	tableName: t.string(),
	scheduleAtCol: t.u16(),
	functionName: t.string()
});
var RawScheduleDefV9 = t.object("RawScheduleDefV9", {
	name: t.option(t.string()),
	reducerName: t.string(),
	scheduledAtColumn: t.u16()
});
var RawScopedTypeNameV10 = t.object("RawScopedTypeNameV10", {
	scope: t.array(t.string()),
	sourceName: t.string()
});
var RawScopedTypeNameV9 = t.object("RawScopedTypeNameV9", {
	scope: t.array(t.string()),
	name: t.string()
});
var RawSequenceDefV10 = t.object("RawSequenceDefV10", {
	sourceName: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var RawSequenceDefV8 = t.object("RawSequenceDefV8", {
	sequenceName: t.string(),
	colPos: t.u16(),
	increment: t.i128(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	allocated: t.i128()
});
var RawSequenceDefV9 = t.object("RawSequenceDefV9", {
	name: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var RawSubmoduleV10 = t.object("RawSubmoduleV10", {
	namespace: t.string(),
	get module() {
		return RawModuleDefV10;
	}
});
var RawTableDefV10 = t.object("RawTableDefV10", {
	sourceName: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(RawIndexDefV10);
	},
	get constraints() {
		return t.array(RawConstraintDefV10);
	},
	get sequences() {
		return t.array(RawSequenceDefV10);
	},
	get tableType() {
		return TableType;
	},
	get tableAccess() {
		return TableAccess;
	},
	get defaultValues() {
		return t.array(RawColumnDefaultValueV10);
	},
	isEvent: t.bool()
});
var RawTableDefV8 = t.object("RawTableDefV8", {
	tableName: t.string(),
	get columns() {
		return t.array(RawColumnDefV8);
	},
	get indexes() {
		return t.array(RawIndexDefV8);
	},
	get constraints() {
		return t.array(RawConstraintDefV8);
	},
	get sequences() {
		return t.array(RawSequenceDefV8);
	},
	tableType: t.string(),
	tableAccess: t.string(),
	scheduled: t.option(t.string())
});
var RawTableDefV9 = t.object("RawTableDefV9", {
	name: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(RawIndexDefV9);
	},
	get constraints() {
		return t.array(RawConstraintDefV9);
	},
	get sequences() {
		return t.array(RawSequenceDefV9);
	},
	get schedule() {
		return t.option(RawScheduleDefV9);
	},
	get tableType() {
		return TableType;
	},
	get tableAccess() {
		return TableAccess;
	}
});
var RawTypeDefV10 = t.object("RawTypeDefV10", {
	get sourceName() {
		return RawScopedTypeNameV10;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var RawTypeDefV9 = t.object("RawTypeDefV9", {
	get name() {
		return RawScopedTypeNameV9;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var RawUniqueConstraintDataV9 = t.object("RawUniqueConstraintDataV9", { columns: t.array(t.u16()) });
var RawViewDefV10 = t.object("RawViewDefV10", {
	sourceName: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var RawViewDefV9 = t.object("RawViewDefV9", {
	name: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var RawViewPrimaryKeyDefV10 = t.object("RawViewPrimaryKeyDefV10", {
	viewSourceName: t.string(),
	columns: t.array(t.string())
});
var ReducerDef = t.object("ReducerDef", {
	name: t.string(),
	get args() {
		return t.array(ProductTypeElement);
	}
});
var SumType2 = t.object("SumType", { get variants() {
	return t.array(SumTypeVariant);
} });
var SumTypeVariant = t.object("SumTypeVariant", {
	name: t.option(t.string()),
	get algebraicType() {
		return AlgebraicType2;
	}
});
var TableAccess = t.enum("TableAccess", {
	Public: t.unit(),
	Private: t.unit()
});
var TableDesc = t.object("TableDesc", {
	get schema() {
		return RawTableDefV8;
	},
	data: t.u32()
});
var TableType = t.enum("TableType", {
	System: t.unit(),
	User: t.unit()
});
var TypeAlias = t.object("TypeAlias", {
	name: t.string(),
	ty: t.u32()
});
var Typespace = t.object("Typespace", { get types() {
	return t.array(AlgebraicType2);
} });
var ViewResultHeader = t.enum("ViewResultHeader", {
	RowData: t.unit(),
	RawSql: t.string()
});
function tableToSchema(accName, schema2, tableDef) {
	const getColName = (i) => schema2.rowType.algebraicType.value.elements[i].name;
	const resolvedIndexes = tableDef.indexes.map((idx) => {
		const accessorName = idx.accessorName;
		if (typeof accessorName !== "string" || accessorName.length === 0) throw new TypeError(`Index '${idx.sourceName ?? "<unknown>"}' on table '${tableDef.sourceName}' is missing accessor name`);
		const columnIds = idx.algorithm.tag === "Direct" ? [idx.algorithm.value] : idx.algorithm.value;
		return {
			name: accessorName,
			unique: tableDef.constraints.some((c) => c.data.tag === "Unique" && c.data.value.columns.every((col) => columnIds.includes(col))),
			algorithm: {
				BTree: "btree",
				Hash: "hash",
				Direct: "direct"
			}[idx.algorithm.tag],
			columns: columnIds.map(getColName)
		};
	});
	return {
		sourceName: schema2.tableName || accName,
		accessorName: accName,
		columns: schema2.rowType.row,
		rowType: schema2.rowSpacetimeType,
		indexes: schema2.idxs,
		constraints: tableDef.constraints.map((c) => ({
			name: c.sourceName,
			constraint: "unique",
			columns: c.data.value.columns.map(getColName)
		})),
		resolvedIndexes,
		tableDef,
		...tableDef.isEvent ? { isEvent: true } : {}
	};
}
var ModuleContext = class {
	#compoundTypes = /* @__PURE__ */ new Map();
	/**
	* The global module definition that gets populated by calls to `reducer()` and lifecycle hooks.
	*/
	#moduleDef = {
		typespace: { types: [] },
		tables: [],
		reducers: [],
		types: [],
		rowLevelSecurity: [],
		schedules: [],
		procedures: [],
		views: [],
		viewPrimaryKeys: [],
		lifeCycleReducers: [],
		httpHandlers: [],
		httpRoutes: [],
		caseConversionPolicy: { tag: "SnakeCase" },
		explicitNames: { entries: [] },
		submodules: [],
		environment: []
	};
	get moduleDef() {
		return this.#moduleDef;
	}
	rawModuleDefV10() {
		const sections = [];
		const push = (s) => {
			if (s) sections.push(s);
		};
		const module = this.#moduleDef;
		push(module.typespace && {
			tag: "Typespace",
			value: module.typespace
		});
		push(module.types && {
			tag: "Types",
			value: module.types
		});
		push(module.tables && {
			tag: "Tables",
			value: module.tables
		});
		push(module.reducers && {
			tag: "Reducers",
			value: module.reducers
		});
		push(module.procedures && {
			tag: "Procedures",
			value: module.procedures
		});
		push(module.views && {
			tag: "Views",
			value: module.views
		});
		push(module.viewPrimaryKeys && {
			tag: "ViewPrimaryKeys",
			value: module.viewPrimaryKeys
		});
		push(module.schedules && {
			tag: "Schedules",
			value: module.schedules
		});
		push(module.lifeCycleReducers && {
			tag: "LifeCycleReducers",
			value: module.lifeCycleReducers
		});
		push(module.httpHandlers && {
			tag: "HttpHandlers",
			value: module.httpHandlers
		});
		push(module.httpRoutes && {
			tag: "HttpRoutes",
			value: module.httpRoutes
		});
		push(module.rowLevelSecurity && {
			tag: "RowLevelSecurity",
			value: module.rowLevelSecurity
		});
		push(module.explicitNames && {
			tag: "ExplicitNames",
			value: module.explicitNames
		});
		push(module.caseConversionPolicy && {
			tag: "CaseConversionPolicy",
			value: module.caseConversionPolicy
		});
		push(module.submodules && {
			tag: "Submodules",
			value: module.submodules
		});
		push({
			tag: "Environment",
			value: module.environment
		});
		return { sections };
	}
	addSubmodule(submodule) {
		this.#moduleDef.submodules.push(submodule);
	}
	/**
	* Set the case conversion policy for this module.
	* Called by the settings mechanism.
	*/
	setCaseConversionPolicy(policy) {
		this.#moduleDef.caseConversionPolicy = policy;
	}
	get typespace() {
		return this.#moduleDef.typespace;
	}
	/**
	* Resolves the actual type of a TypeBuilder by following its references until it reaches a non-ref type.
	* @param typespace The typespace to resolve types against.
	* @param typeBuilder The TypeBuilder to resolve.
	* @returns The resolved algebraic type.
	*/
	resolveType(typeBuilder) {
		let ty = typeBuilder.algebraicType;
		while (ty.tag === "Ref") ty = this.typespace.types[ty.value];
		return ty;
	}
	/**
	* Adds a type to the module definition's typespace as a `Ref` if it is a named compound type (Product or Sum).
	* Otherwise, returns the type as is.
	* @param name
	* @param ty
	* @returns
	*/
	registerTypesRecursively(typeBuilder) {
		if (typeBuilder instanceof ProductBuilder && !isUnit(typeBuilder) || typeBuilder instanceof SumBuilder || typeBuilder instanceof RowBuilder) return this.#registerCompoundTypeRecursively(typeBuilder);
		else if (typeBuilder instanceof OptionBuilder) return new OptionBuilder(this.registerTypesRecursively(typeBuilder.value));
		else if (typeBuilder instanceof ResultBuilder) return new ResultBuilder(this.registerTypesRecursively(typeBuilder.ok), this.registerTypesRecursively(typeBuilder.err));
		else if (typeBuilder instanceof ArrayBuilder) return new ArrayBuilder(this.registerTypesRecursively(typeBuilder.element));
		else return typeBuilder;
	}
	#registerCompoundTypeRecursively(typeBuilder) {
		const ty = typeBuilder.algebraicType;
		const name = typeBuilder.typeName;
		if (name === void 0) throw new Error(`Missing type name for ${typeBuilder.constructor.name ?? "TypeBuilder"} ${JSON.stringify(typeBuilder)}`);
		let r = this.#compoundTypes.get(ty);
		if (r != null) return r;
		const newTy = typeBuilder instanceof RowBuilder || typeBuilder instanceof ProductBuilder ? {
			tag: "Product",
			value: { elements: [] }
		} : {
			tag: "Sum",
			value: { variants: [] }
		};
		r = new RefBuilder(this.#moduleDef.typespace.types.length);
		this.#moduleDef.typespace.types.push(newTy);
		this.#compoundTypes.set(ty, r);
		if (typeBuilder instanceof RowBuilder) for (const [name2, elem] of Object.entries(typeBuilder.row)) newTy.value.elements.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(elem.typeBuilder).algebraicType
		});
		else if (typeBuilder instanceof ProductBuilder) for (const [name2, elem] of Object.entries(typeBuilder.elements)) newTy.value.elements.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(elem).algebraicType
		});
		else if (typeBuilder instanceof SumBuilder) for (const [name2, variant] of Object.entries(typeBuilder.variants)) newTy.value.variants.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(variant).algebraicType
		});
		this.#moduleDef.types.push({
			sourceName: splitName(name),
			ty: r.ref,
			customOrdering: true
		});
		return r;
	}
};
function isUnit(typeBuilder) {
	return typeBuilder.typeName == null && typeBuilder.algebraicType.value.elements.length === 0;
}
function splitName(name) {
	const scope = name.split(".");
	return {
		sourceName: scope.pop(),
		scope
	};
}
var textEncoder2 = new TextEncoder();
var textDecoder2 = new TextDecoder("utf-8");
function deserializeMethod(method) {
	switch (method.tag) {
		case "Get": return "GET";
		case "Head": return "HEAD";
		case "Post": return "POST";
		case "Put": return "PUT";
		case "Delete": return "DELETE";
		case "Connect": return "CONNECT";
		case "Options": return "OPTIONS";
		case "Trace": return "TRACE";
		case "Patch": return "PATCH";
		case "Extension": return method.value;
	}
}
var methods = /* @__PURE__ */ new Map([
	["GET", { tag: "Get" }],
	["HEAD", { tag: "Head" }],
	["POST", { tag: "Post" }],
	["PUT", { tag: "Put" }],
	["DELETE", { tag: "Delete" }],
	["CONNECT", { tag: "Connect" }],
	["OPTIONS", { tag: "Options" }],
	["TRACE", { tag: "Trace" }],
	["PATCH", { tag: "Patch" }]
]);
function serializeMethod(method) {
	return methods.get(method?.toUpperCase() ?? "GET") ?? {
		tag: "Extension",
		value: method
	};
}
function serializeHeaders(headers) {
	return { entries: Array.from(headers.entries(), ([name, value]) => ({
		name,
		value: textEncoder2.encode(value)
	})) };
}
function deserializeHeaders(headers) {
	return new Headers(headers.entries.map(({ name, value }) => [name, textDecoder2.decode(value)]));
}
var makeResponse = Symbol("makeResponse");
var SyncResponse = class _SyncResponse {
	#body;
	#inner;
	constructor(body, init) {
		if (body == null) this.#body = null;
		else if (typeof body === "string") this.#body = body;
		else this.#body = new Uint8Array(body).buffer;
		this.#inner = {
			headers: new Headers(init?.headers),
			status: init?.status ?? 200,
			statusText: init?.statusText ?? "",
			type: "default",
			url: null,
			aborted: false,
			version: init?.version ?? { tag: "Http11" }
		};
	}
	static [makeResponse](body, inner) {
		const me = new _SyncResponse(body);
		me.#inner = inner;
		return me;
	}
	get headers() {
		return this.#inner.headers;
	}
	get status() {
		return this.#inner.status;
	}
	get statusText() {
		return this.#inner.statusText;
	}
	get ok() {
		return 200 <= this.#inner.status && this.#inner.status <= 299;
	}
	get url() {
		return this.#inner.url ?? "";
	}
	get type() {
		return this.#inner.type;
	}
	get version() {
		return this.#inner.version;
	}
	arrayBuffer() {
		return this.bytes().buffer;
	}
	bytes() {
		if (this.#body == null) return new Uint8Array();
		else if (typeof this.#body === "string") return textEncoder2.encode(this.#body);
		else return new Uint8Array(this.#body);
	}
	json() {
		return JSON.parse(this.text());
	}
	text() {
		if (this.#body == null) return "";
		else if (typeof this.#body === "string") return this.#body;
		else return textDecoder2.decode(this.#body);
	}
};
var httpHandlerFn = Symbol("SpacetimeDB.httpHandlerFn");
var makeRequest = Symbol("makeRequest");
function coerceRequestBody(body) {
	if (body == null) return null;
	if (typeof body === "string") return body;
	return new Uint8Array(body);
}
function requestBodyToBytes(body) {
	if (body == null) return new Uint8Array();
	if (typeof body === "string") return textEncoder2.encode(body);
	return body;
}
function requestBodyToText(body) {
	if (body == null) return "";
	if (typeof body === "string") return body;
	return textDecoder2.decode(body);
}
var Request = class _Request {
	#body;
	#inner;
	constructor(url, init = {}) {
		this.#body = coerceRequestBody(init.body);
		this.#inner = {
			headers: new Headers(init.headers),
			method: init.method ?? "GET",
			uri: "" + url,
			version: init.version ?? { tag: "Http11" }
		};
	}
	static [makeRequest](body, inner) {
		const me = new _Request(inner.uri);
		me.#body = coerceRequestBody(body);
		me.#inner = inner;
		return me;
	}
	get headers() {
		return this.#inner.headers;
	}
	get method() {
		return this.#inner.method;
	}
	get uri() {
		return this.#inner.uri;
	}
	get url() {
		return this.#inner.uri;
	}
	get version() {
		return this.#inner.version;
	}
	arrayBuffer() {
		return this.bytes().buffer;
	}
	bytes() {
		return requestBodyToBytes(this.#body);
	}
	json() {
		return JSON.parse(this.text());
	}
	text() {
		return requestBodyToText(this.#body);
	}
};
var exportedHttpHandlerObjects = /* @__PURE__ */ new WeakSet();
function makeHttpHandlerExport(ctx, opts, fn) {
	const handlerExport = Object.assign((...args) => fn(...args), {
		[httpHandlerFn]: fn,
		[exportContext]: ctx,
		[registerExport](ctx2, exportName) {
			if (exportedHttpHandlerObjects.has(handlerExport)) throw new TypeError(`HTTP handler '${exportName}' was exported more than once`);
			exportedHttpHandlerObjects.add(handlerExport);
			registerHttpHandler(ctx2, exportName, fn, opts);
			ctx2.httpHandlerExports.set(handlerExport, exportName);
		}
	});
	return handlerExport;
}
function makeHttpRouterExport(ctx, router) {
	return {
		[exportContext]: ctx,
		[registerExport](ctx2) {
			ctx2.pendingHttpRoutes.push(...router.intoRoutes());
		}
	};
}
function registerHttpHandler(ctx, exportName, fn, opts) {
	ctx.defineHttpHandler(exportName);
	ctx.moduleDef.httpHandlers.push({ sourceName: exportName });
	if (opts?.name != null) ctx.moduleDef.explicitNames.entries.push({
		tag: "Function",
		value: {
			sourceName: exportName,
			canonicalName: opts.name
		}
	});
	if (!fn.name) Object.defineProperty(fn, "name", {
		value: exportName,
		writable: false
	});
	ctx.httpHandlers.push(fn);
}
var import_statuses = __toESM(require_statuses());
var Range = class {
	#from;
	#to;
	constructor(from, to) {
		this.#from = from ?? { tag: "unbounded" };
		this.#to = to ?? { tag: "unbounded" };
	}
	get from() {
		return this.#from;
	}
	get to() {
		return this.#to;
	}
};
function table(opts, row, ..._) {
	const { name, public: isPublic = false, indexes: userIndexes = [], scheduled, event: isEvent = false } = opts;
	const colIds = /* @__PURE__ */ new Map();
	const colNameList = [];
	if (!(row instanceof RowBuilder)) row = new RowBuilder(row);
	row.algebraicType.value.elements.forEach((elem, i) => {
		colIds.set(elem.name, i);
		colNameList.push(elem.name);
	});
	const pk = [];
	const indexes = [];
	const constraints = [];
	const sequences = [];
	let scheduleAtCol;
	const defaultValues = [];
	for (const [name2, builder] of Object.entries(row.row)) {
		const meta = builder.columnMetadata;
		if (meta.isPrimaryKey) pk.push(colIds.get(name2));
		const isUnique = meta.isUnique || meta.isPrimaryKey;
		if (meta.indexType || isUnique) {
			const algo = meta.indexType ?? "btree";
			const id = colIds.get(name2);
			let algorithm;
			switch (algo) {
				case "btree":
					algorithm = RawIndexAlgorithm.BTree([id]);
					break;
				case "hash":
					algorithm = RawIndexAlgorithm.Hash([id]);
					break;
				case "direct":
					algorithm = RawIndexAlgorithm.Direct(id);
					break;
			}
			indexes.push({
				sourceName: void 0,
				accessorName: name2,
				algorithm
			});
		}
		if (isUnique) constraints.push({
			sourceName: void 0,
			data: {
				tag: "Unique",
				value: { columns: [colIds.get(name2)] }
			}
		});
		if (meta.isAutoIncrement) sequences.push({
			sourceName: void 0,
			start: void 0,
			minValue: void 0,
			maxValue: void 0,
			column: colIds.get(name2),
			increment: 1n
		});
		if (Object.prototype.hasOwnProperty.call(meta, "defaultValue")) {
			const writer = new BinaryWriter(16);
			builder.serialize(writer, meta.defaultValue);
			defaultValues.push({
				colId: colIds.get(name2),
				value: writer.getBuffer()
			});
		}
		const algebraicType = builder.typeBuilder.algebraicType;
		if (schedule_at_default.isScheduleAt(algebraicType)) scheduleAtCol = colIds.get(name2);
	}
	for (const indexOpts of userIndexes ?? []) {
		const accessor = indexOpts.accessor;
		if (typeof accessor !== "string" || accessor.length === 0) {
			const tableLabel = name ?? "<unnamed>";
			const indexLabel = indexOpts.name ?? "<unnamed>";
			throw new TypeError(`Index '${indexLabel}' on table '${tableLabel}' must define a non-empty 'accessor'`);
		}
		let algorithm;
		switch (indexOpts.algorithm) {
			case "btree":
				algorithm = {
					tag: "BTree",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "hash":
				algorithm = {
					tag: "Hash",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "direct":
				algorithm = {
					tag: "Direct",
					value: colIds.get(indexOpts.column)
				};
				break;
		}
		indexes.push({
			sourceName: void 0,
			accessorName: accessor,
			algorithm,
			canonicalName: indexOpts.name
		});
	}
	for (const constraintOpts of opts.constraints ?? []) if (constraintOpts.constraint === "unique") {
		const data = {
			tag: "Unique",
			value: { columns: constraintOpts.columns.map((c) => colIds.get(c)) }
		};
		constraints.push({
			sourceName: constraintOpts.name,
			data
		});
		continue;
	}
	const productType = row.algebraicType.value;
	return {
		rowType: row,
		tableName: name,
		rowSpacetimeType: productType,
		tableDef: (ctx, accName) => {
			const tableName = name ?? accName;
			if (row.typeName === void 0) row.typeName = toPascalCase(tableName);
			for (const index of indexes) {
				const sourceName = index.sourceName = `${accName}_${(index.algorithm.tag === "Direct" ? [index.algorithm.value] : index.algorithm.value).map((i) => colNameList[i]).join("_")}_idx_${index.algorithm.tag.toLowerCase()}`;
				const { canonicalName } = index;
				if (canonicalName !== void 0) ctx.moduleDef.explicitNames.entries.push(ExplicitNameEntry.Index({
					sourceName,
					canonicalName
				}));
			}
			return {
				sourceName: accName,
				productTypeRef: ctx.registerTypesRecursively(row).ref,
				primaryKey: pk,
				indexes,
				constraints,
				sequences,
				tableType: { tag: "User" },
				tableAccess: { tag: isPublic ? "Public" : "Private" },
				defaultValues,
				isEvent
			};
		},
		idxs: userIndexes,
		constraints,
		scheduleAtCol,
		schedule: scheduled && scheduleAtCol !== void 0 ? {
			scheduleAtCol,
			reducer: scheduled
		} : void 0
	};
}
var QueryBrand = Symbol("QueryBrand");
var isRowTypedQuery = (val) => !!val && typeof val === "object" && QueryBrand in val;
function toSql(q) {
	return q.toSql();
}
var SemijoinImpl = class _SemijoinImpl {
	constructor(sourceQuery, filterQuery, joinCondition) {
		this.sourceQuery = sourceQuery;
		this.filterQuery = filterQuery;
		this.joinCondition = joinCondition;
		if (sourceQuery.table.sourceName === filterQuery.table.sourceName) throw new Error("Cannot semijoin a table to itself");
	}
	[QueryBrand] = true;
	type = "semijoin";
	build() {
		return this;
	}
	where(predicate) {
		return new _SemijoinImpl(this.sourceQuery.where(predicate), this.filterQuery, this.joinCondition);
	}
	toSql() {
		const left = this.filterQuery;
		const right = this.sourceQuery;
		const leftTable = quoteIdentifier(left.table.sourceName);
		const rightTable = quoteIdentifier(right.table.sourceName);
		let sql = `SELECT ${rightTable}.* FROM ${leftTable} JOIN ${rightTable} ON ${booleanExprToSql(this.joinCondition)}`;
		const clauses = [];
		if (left.whereClause) clauses.push(booleanExprToSql(left.whereClause));
		if (right.whereClause) clauses.push(booleanExprToSql(right.whereClause));
		if (clauses.length > 0) {
			const whereSql = clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ");
			sql += ` WHERE ${whereSql}`;
		}
		return sql;
	}
};
var FromBuilder = class _FromBuilder {
	constructor(table2, whereClause) {
		this.table = table2;
		this.whereClause = whereClause;
	}
	[QueryBrand] = true;
	where(predicate) {
		const newCondition = normalizePredicateExpr(predicate(this.table.cols));
		const nextWhere = this.whereClause ? this.whereClause.and(newCondition) : newCondition;
		return new _FromBuilder(this.table, nextWhere);
	}
	rightSemijoin(right, on) {
		const sourceQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(sourceQuery, this, joinCondition);
	}
	leftSemijoin(right, on) {
		const filterQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(this, filterQuery, joinCondition);
	}
	toSql() {
		return renderSelectSqlWithJoins(this.table, this.whereClause);
	}
	build() {
		return this;
	}
};
var TableRefImpl = class {
	[QueryBrand] = true;
	type = "table";
	sourceName;
	accessorName;
	cols;
	indexedCols;
	tableDef;
	get columns() {
		return this.tableDef.columns;
	}
	get indexes() {
		return this.tableDef.indexes;
	}
	get rowType() {
		return this.tableDef.rowType;
	}
	get constraints() {
		return this.tableDef.constraints;
	}
	constructor(tableDef) {
		this.sourceName = tableDef.sourceName;
		this.accessorName = tableDef.accessorName;
		this.cols = createRowExpr(tableDef);
		this.indexedCols = this.cols;
		this.tableDef = tableDef;
		Object.freeze(this);
	}
	asFrom() {
		return new FromBuilder(this);
	}
	rightSemijoin(other, on) {
		return this.asFrom().rightSemijoin(other, on);
	}
	leftSemijoin(other, on) {
		return this.asFrom().leftSemijoin(other, on);
	}
	build() {
		return this.asFrom().build();
	}
	toSql() {
		return this.asFrom().toSql();
	}
	where(predicate) {
		return this.asFrom().where(predicate);
	}
};
function createTableRefFromDef(tableDef) {
	return new TableRefImpl(tableDef);
}
function makeQueryBuilder(schema2) {
	const qb = /* @__PURE__ */ Object.create(null);
	for (const table2 of Object.values(schema2.tables)) {
		const ref = createTableRefFromDef(table2);
		qb[table2.accessorName] = ref;
	}
	return Object.freeze(qb);
}
function createRowExpr(tableDef) {
	const row = {};
	for (const columnName of Object.keys(tableDef.columns)) {
		const columnBuilder = tableDef.columns[columnName];
		const column = new ColumnExpression(tableDef.sourceName, columnName, columnBuilder.typeBuilder.algebraicType, columnBuilder.columnMetadata.name);
		row[columnName] = Object.freeze(column);
	}
	return Object.freeze(row);
}
function renderSelectSqlWithJoins(table2, where, extraClauses = []) {
	const sql = `SELECT * FROM ${quoteIdentifier(table2.sourceName)}`;
	const clauses = [];
	if (where) clauses.push(booleanExprToSql(where));
	clauses.push(...extraClauses);
	if (clauses.length === 0) return sql;
	return `${sql} WHERE ${clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ")}`;
}
var ColumnExpression = class {
	type = "column";
	column;
	columnName;
	table;
	tsValueType;
	spacetimeType;
	constructor(table2, column, spacetimeType, columnName) {
		this.table = table2;
		this.column = column;
		this.columnName = columnName || column;
		this.spacetimeType = spacetimeType;
	}
	eq(x) {
		return new BooleanExpr({
			type: "eq",
			left: this,
			right: normalizeValue(x)
		});
	}
	ne(x) {
		return new BooleanExpr({
			type: "ne",
			left: this,
			right: normalizeValue(x)
		});
	}
	lt(x) {
		return new BooleanExpr({
			type: "lt",
			left: this,
			right: normalizeValue(x)
		});
	}
	lte(x) {
		return new BooleanExpr({
			type: "lte",
			left: this,
			right: normalizeValue(x)
		});
	}
	gt(x) {
		return new BooleanExpr({
			type: "gt",
			left: this,
			right: normalizeValue(x)
		});
	}
	gte(x) {
		return new BooleanExpr({
			type: "gte",
			left: this,
			right: normalizeValue(x)
		});
	}
};
function literal(value) {
	return {
		type: "literal",
		value
	};
}
function normalizeValue(val) {
	if (val.type === "literal") return val;
	if (typeof val === "object" && val != null && "type" in val && val.type === "column") return val;
	return literal(val);
}
function normalizePredicateExpr(value) {
	if (value instanceof BooleanExpr) return value;
	if (typeof value === "boolean") return new BooleanExpr({
		type: "eq",
		left: literal(value),
		right: literal(true)
	});
	return new BooleanExpr({
		type: "eq",
		left: value,
		right: literal(true)
	});
}
var BooleanExpr = class _BooleanExpr {
	constructor(data) {
		this.data = data;
	}
	and(other) {
		return new _BooleanExpr({
			type: "and",
			clauses: [this.data, other.data]
		});
	}
	or(other) {
		return new _BooleanExpr({
			type: "or",
			clauses: [this.data, other.data]
		});
	}
	not() {
		return new _BooleanExpr({
			type: "not",
			clause: this.data
		});
	}
};
function booleanExprToSql(expr, tableAlias) {
	const data = expr instanceof BooleanExpr ? expr.data : expr;
	switch (data.type) {
		case "eq": return `${valueExprToSql(data.left)} = ${valueExprToSql(data.right)}`;
		case "ne": return `${valueExprToSql(data.left)} <> ${valueExprToSql(data.right)}`;
		case "gt": return `${valueExprToSql(data.left)} > ${valueExprToSql(data.right)}`;
		case "gte": return `${valueExprToSql(data.left)} >= ${valueExprToSql(data.right)}`;
		case "lt": return `${valueExprToSql(data.left)} < ${valueExprToSql(data.right)}`;
		case "lte": return `${valueExprToSql(data.left)} <= ${valueExprToSql(data.right)}`;
		case "and": return data.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" AND ");
		case "or": return data.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" OR ");
		case "not": return `NOT ${wrapInParens(booleanExprToSql(data.clause))}`;
	}
}
function wrapInParens(sql) {
	return `(${sql})`;
}
function valueExprToSql(expr, tableAlias) {
	if (isLiteralExpr(expr)) return literalValueToSql(expr.value);
	const table2 = expr.table;
	return `${quoteIdentifier(table2)}.${quoteIdentifier(expr.columnName)}`;
}
function literalValueToSql(value) {
	if (value === null || value === void 0) return "NULL";
	if (value instanceof Identity || value instanceof ConnectionId || value instanceof Uuid) return `0x${value.toHexString()}`;
	if (value instanceof Timestamp) return `'${value.toISOString()}'`;
	switch (typeof value) {
		case "number":
		case "bigint": return String(value);
		case "boolean": return value ? "TRUE" : "FALSE";
		case "string": return `'${value.replace(/'/g, "''")}'`;
		default: return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
	}
}
function quoteIdentifier(name) {
	return name.split(".").map((part) => `"${part.replace(/"/g, "\"\"")}"`).join(".");
}
function isLiteralExpr(expr) {
	return expr.type === "literal";
}
function makeViewExport(ctx, opts, params, ret, fn) {
	const viewExport = fn.bind();
	viewExport[exportContext] = ctx;
	viewExport[registerExport] = (ctx2, exportName) => {
		registerView(ctx2, opts, exportName, params, ret, fn);
	};
	return viewExport;
}
function makeAnonViewExport(ctx, opts, params, ret, fn) {
	const viewExport = fn.bind();
	viewExport[exportContext] = ctx;
	viewExport[registerExport] = (ctx2, exportName) => {
		registerAnonymousView(ctx2, opts, exportName, params, ret, fn);
	};
	return viewExport;
}
function registerView(ctx, opts, exportName, params, ret, fn) {
	const described = describeView(ctx, opts, exportName, false, params, ret);
	ctx.views.push(buildViewInfo(ctx, described, fn));
}
function registerAnonymousView(ctx, opts, exportName, params, ret, fn) {
	const described = describeView(ctx, opts, exportName, true, params, ret);
	ctx.anonViews.push(buildViewInfo(ctx, described, fn));
}
function describeView(ctx, opts, exportName, anon, params, ret) {
	ctx.defineFunction(exportName);
	const paramsBuilder = new RowBuilder(params, toPascalCase(exportName));
	let returnType = ctx.registerTypesRecursively(ret).algebraicType;
	const { value: paramType } = ctx.resolveType(ctx.registerTypesRecursively(paramsBuilder));
	ctx.moduleDef.views.push({
		sourceName: exportName,
		index: (anon ? ctx.anonViews : ctx.views).length,
		isPublic: opts.public,
		isAnonymous: anon,
		params: paramType,
		returnType
	});
	const primaryKeyColumns = viewPrimaryKeyColumns(ret);
	if (primaryKeyColumns.length > 1) throw new TypeError(`View '${exportName}' can have at most one primaryKey() column on its returned row type; found ${primaryKeyColumns.join(", ")}`);
	if (primaryKeyColumns.length === 1 && paramType.elements.length === 0) ctx.moduleDef.viewPrimaryKeys.push({
		viewSourceName: exportName,
		columns: primaryKeyColumns
	});
	if (opts.name != null) ctx.moduleDef.explicitNames.entries.push({
		tag: "Function",
		value: {
			sourceName: exportName,
			canonicalName: opts.name
		}
	});
	const wrapOption = returnType.tag == "Sum";
	if (returnType.tag == "Sum") returnType = AlgebraicType.Array(returnType.value.variants[0].algebraicType);
	return {
		paramType,
		returnType,
		wrapOption
	};
}
function buildViewInfo(ctx, { paramType, returnType, wrapOption }, fn) {
	const { typespace } = ctx;
	return {
		fn: wrapOption ? ((viewCtx, args) => {
			const ret = fn(viewCtx, args);
			return ret == null ? [] : [ret];
		}) : fn,
		deserializeParams: ProductType.makeDeserializer(paramType, typespace),
		serializeReturn: AlgebraicType.makeSerializer(returnType, typespace),
		returnTypeBaseSize: bsatnBaseSize(typespace, returnType)
	};
}
function viewPrimaryKeyColumns(ret) {
	const row = viewReturnRow(ret);
	if (row == null) return [];
	return Object.entries(row.row).filter((entry) => entry[1].columnMetadata.isPrimaryKey === true).map(([name]) => name);
}
function viewReturnRow(ret) {
	if (ret instanceof ArrayBuilder && ret.element instanceof RowBuilder) return ret.element;
	if (ret instanceof OptionBuilder && ret.value instanceof RowBuilder) return ret.value;
}
var SenderError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SenderError";
	}
};
var SpacetimeHostError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SpacetimeHostError";
	}
};
var errorData = {
	HostCallFailure: 1,
	NotInTransaction: 2,
	BsatnDecodeError: 3,
	NoSuchTable: 4,
	NoSuchIndex: 5,
	NoSuchIter: 6,
	NoSuchConsoleTimer: 7,
	NoSuchBytes: 8,
	NoSpace: 9,
	BufferTooSmall: 11,
	UniqueAlreadyExists: 12,
	ScheduleAtDelayTooLong: 13,
	IndexNotUnique: 14,
	NoSuchRow: 15,
	AutoIncOverflow: 16,
	WouldBlockTransaction: 17,
	TransactionNotAnonymous: 18,
	TransactionIsReadOnly: 19,
	TransactionIsMut: 20,
	HttpError: 21
};
function mapEntries(x, f) {
	return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, f(k, v)]));
}
var errnoToClass = /* @__PURE__ */ new Map();
var errors = Object.freeze(mapEntries(errorData, (name, code) => {
	const cls = Object.defineProperty(class extends SpacetimeHostError {
		get name() {
			return name;
		}
	}, "name", {
		value: name,
		writable: false
	});
	errnoToClass.set(code, cls);
	return cls;
}));
function getErrorConstructor(code) {
	return errnoToClass.get(code) ?? SpacetimeHostError;
}
var SBigInt = typeof BigInt !== "undefined" ? BigInt : void 0;
var One = typeof BigInt !== "undefined" ? BigInt(1) : void 0;
var ThirtyTwo = typeof BigInt !== "undefined" ? BigInt(32) : void 0;
var NumValues = typeof BigInt !== "undefined" ? BigInt(4294967296) : void 0;
function unsafeUniformBigIntDistribution(from, to, rng) {
	var diff = to - from + One;
	var FinalNumValues = NumValues;
	var NumIterations = 1;
	while (FinalNumValues < diff) {
		FinalNumValues <<= ThirtyTwo;
		++NumIterations;
	}
	var value = generateNext(NumIterations, rng);
	if (value < diff) return value + from;
	if (value + diff < FinalNumValues) return value % diff + from;
	var MaxAcceptedRandom = FinalNumValues - FinalNumValues % diff;
	while (value >= MaxAcceptedRandom) value = generateNext(NumIterations, rng);
	return value % diff + from;
}
function generateNext(NumIterations, rng) {
	var value = SBigInt(rng.unsafeNext() + 2147483648);
	for (var num = 1; num < NumIterations; ++num) {
		var out = rng.unsafeNext();
		value = (value << ThirtyTwo) + SBigInt(out + 2147483648);
	}
	return value;
}
function unsafeUniformIntDistributionInternal(rangeSize, rng) {
	var MaxAllowed = rangeSize > 2 ? ~~(4294967296 / rangeSize) * rangeSize : 4294967296;
	var deltaV = rng.unsafeNext() + 2147483648;
	while (deltaV >= MaxAllowed) deltaV = rng.unsafeNext() + 2147483648;
	return deltaV % rangeSize;
}
function fromNumberToArrayInt64(out, n) {
	if (n < 0) {
		var posN = -n;
		out.sign = -1;
		out.data[0] = ~~(posN / 4294967296);
		out.data[1] = posN >>> 0;
	} else {
		out.sign = 1;
		out.data[0] = ~~(n / 4294967296);
		out.data[1] = n >>> 0;
	}
	return out;
}
function substractArrayInt64(out, arrayIntA, arrayIntB) {
	var lowA = arrayIntA.data[1];
	var highA = arrayIntA.data[0];
	var signA = arrayIntA.sign;
	var lowB = arrayIntB.data[1];
	var highB = arrayIntB.data[0];
	var signB = arrayIntB.sign;
	out.sign = 1;
	if (signA === 1 && signB === -1) {
		var low_1 = lowA + lowB;
		var high = highA + highB + (low_1 > 4294967295 ? 1 : 0);
		out.data[0] = high >>> 0;
		out.data[1] = low_1 >>> 0;
		return out;
	}
	var lowFirst = lowA;
	var highFirst = highA;
	var lowSecond = lowB;
	var highSecond = highB;
	if (signA === -1) {
		lowFirst = lowB;
		highFirst = highB;
		lowSecond = lowA;
		highSecond = highA;
	}
	var reminderLow = 0;
	var low = lowFirst - lowSecond;
	if (low < 0) {
		reminderLow = 1;
		low = low >>> 0;
	}
	out.data[0] = highFirst - highSecond - reminderLow;
	out.data[1] = low;
	return out;
}
function unsafeUniformArrayIntDistributionInternal(out, rangeSize, rng) {
	var rangeLength = rangeSize.length;
	while (true) {
		for (var index = 0; index !== rangeLength; ++index) out[index] = unsafeUniformIntDistributionInternal(index === 0 ? rangeSize[0] + 1 : 4294967296, rng);
		for (var index = 0; index !== rangeLength; ++index) {
			var current = out[index];
			var currentInRange = rangeSize[index];
			if (current < currentInRange) return out;
			else if (current > currentInRange) break;
		}
	}
}
var safeNumberMaxSafeInteger = Number.MAX_SAFE_INTEGER;
var sharedA = {
	sign: 1,
	data: [0, 0]
};
var sharedB = {
	sign: 1,
	data: [0, 0]
};
var sharedC = {
	sign: 1,
	data: [0, 0]
};
var sharedData = [0, 0];
function uniformLargeIntInternal(from, to, rangeSize, rng) {
	var rangeSizeArrayIntValue = rangeSize <= safeNumberMaxSafeInteger ? fromNumberToArrayInt64(sharedC, rangeSize) : substractArrayInt64(sharedC, fromNumberToArrayInt64(sharedA, to), fromNumberToArrayInt64(sharedB, from));
	if (rangeSizeArrayIntValue.data[1] === 4294967295) {
		rangeSizeArrayIntValue.data[0] += 1;
		rangeSizeArrayIntValue.data[1] = 0;
	} else rangeSizeArrayIntValue.data[1] += 1;
	unsafeUniformArrayIntDistributionInternal(sharedData, rangeSizeArrayIntValue.data, rng);
	return sharedData[0] * 4294967296 + sharedData[1] + from;
}
function unsafeUniformIntDistribution(from, to, rng) {
	var rangeSize = to - from;
	if (rangeSize <= 4294967295) return unsafeUniformIntDistributionInternal(rangeSize + 1, rng) + from;
	return uniformLargeIntInternal(from, to, rangeSize, rng);
}
var XoroShiro128Plus = (function() {
	function XoroShiro128Plus2(s01, s00, s11, s10) {
		this.s01 = s01;
		this.s00 = s00;
		this.s11 = s11;
		this.s10 = s10;
	}
	XoroShiro128Plus2.prototype.clone = function() {
		return new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
	};
	XoroShiro128Plus2.prototype.next = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		return [nextRng.unsafeNext(), nextRng];
	};
	XoroShiro128Plus2.prototype.unsafeNext = function() {
		var out = this.s00 + this.s10 | 0;
		var a0 = this.s10 ^ this.s00;
		var a1 = this.s11 ^ this.s01;
		var s00 = this.s00;
		var s01 = this.s01;
		this.s00 = s00 << 24 ^ s01 >>> 8 ^ a0 ^ a0 << 16;
		this.s01 = s01 << 24 ^ s00 >>> 8 ^ a1 ^ (a1 << 16 | a0 >>> 16);
		this.s10 = a1 << 5 ^ a0 >>> 27;
		this.s11 = a0 << 5 ^ a1 >>> 27;
		return out;
	};
	XoroShiro128Plus2.prototype.jump = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		nextRng.unsafeJump();
		return nextRng;
	};
	XoroShiro128Plus2.prototype.unsafeJump = function() {
		var ns01 = 0;
		var ns00 = 0;
		var ns11 = 0;
		var ns10 = 0;
		var jump = [
			3639956645,
			3750757012,
			1261568508,
			386426335
		];
		for (var i = 0; i !== 4; ++i) for (var mask = 1; mask; mask <<= 1) {
			if (jump[i] & mask) {
				ns01 ^= this.s01;
				ns00 ^= this.s00;
				ns11 ^= this.s11;
				ns10 ^= this.s10;
			}
			this.unsafeNext();
		}
		this.s01 = ns01;
		this.s00 = ns00;
		this.s11 = ns11;
		this.s10 = ns10;
	};
	XoroShiro128Plus2.prototype.getState = function() {
		return [
			this.s01,
			this.s00,
			this.s11,
			this.s10
		];
	};
	return XoroShiro128Plus2;
})();
function fromState(state) {
	if (!(state.length === 4)) throw new Error("The state must have been produced by a xoroshiro128plus RandomGenerator");
	return new XoroShiro128Plus(state[0], state[1], state[2], state[3]);
}
var xoroshiro128plus = Object.assign(function(seed) {
	return new XoroShiro128Plus(-1, ~seed, seed | 0, 0);
}, { fromState });
var { asUintN } = BigInt;
function pcg32(state) {
	state = asUintN(64, state * 6364136223846793005n + 11634580027462260723n);
	const xorshifted = Number(asUintN(32, (state >> 18n ^ state) >> 27n));
	const rot = Number(asUintN(32, state >> 59n));
	return xorshifted >> rot | xorshifted << 32 - rot;
}
function generateFloat64(rng) {
	const g1 = unsafeUniformIntDistribution(0, (1 << 26) - 1, rng);
	const g2 = unsafeUniformIntDistribution(0, (1 << 27) - 1, rng);
	return (g1 * Math.pow(2, 27) + g2) * Math.pow(2, -53);
}
function makeRandomFromSeed(seed) {
	const rng = xoroshiro128plus(pcg32(seedToBigInt(seed)));
	const random = () => generateFloat64(rng);
	random.fill = (array) => {
		if (isBigIntArray(array)) {
			const upper = (1n << BigInt(array.BYTES_PER_ELEMENT * 8)) - 1n;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformBigIntDistribution(0n, upper, rng);
		} else {
			const upper = Math.pow(2, array.BYTES_PER_ELEMENT * 8) - 1;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformIntDistribution(0, upper, rng);
		}
		return array;
	};
	random.shuffle = (array) => {
		for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
			const swapIndex = random.integerInRange(0, currentIndex);
			[array[currentIndex], array[swapIndex]] = [array[swapIndex], array[currentIndex]];
		}
		return array;
	};
	random.uint32 = () => rng.unsafeNext();
	random.integerInRange = (min, max) => unsafeUniformIntDistribution(min, max, rng);
	random.bigintInRange = (min, max) => unsafeUniformBigIntDistribution(min, max, rng);
	return random;
}
function makeRandom(seed) {
	return makeRandomFromSeed(seed);
}
function seedToBigInt(seed) {
	if (typeof seed === "bigint") return seed;
	if (typeof seed === "number") return BigInt(seed);
	if (seed instanceof Uint8Array) {
		let value = 0n;
		const len = Math.min(seed.byteLength, 8);
		for (let i = 0; i < len; i++) value |= BigInt(seed[i]) << BigInt(i * 8);
		return value;
	}
	return seed.microsSinceUnixEpoch;
}
function isBigIntArray(array) {
	return array instanceof BigInt64Array || array instanceof BigUint64Array;
}
var sys = {
	..._syscalls2_0,
	..._syscalls2_1
};
var hostBackend = {
	identity: sys.identity,
	getJwtPayload: sys.get_jwt_payload,
	tableIdFromName: sys.table_id_from_name,
	indexIdFromName: sys.index_id_from_name,
	datastoreTableRowCount: sys.datastore_table_row_count,
	datastoreTableScanBsatn: sys.datastore_table_scan_bsatn,
	datastoreInsertBsatn: sys.datastore_insert_bsatn,
	datastoreDeleteAllByEqBsatn: sys.datastore_delete_all_by_eq_bsatn,
	datastoreIndexScanPointBsatn: sys.datastore_index_scan_point_bsatn,
	datastoreIndexScanRangeBsatn: sys.datastore_index_scan_range_bsatn,
	datastoreDeleteByIndexScanPointBsatn: sys.datastore_delete_by_index_scan_point_bsatn,
	datastoreDeleteByIndexScanRangeBsatn: sys.datastore_delete_by_index_scan_range_bsatn,
	datastoreUpdateBsatn: sys.datastore_update_bsatn,
	datastoreClear: sys.datastore_clear,
	rowIterBsatnAdvance: sys.row_iter_bsatn_advance,
	rowIterBsatnClose: sys.row_iter_bsatn_close,
	procedureStartMutTx: sys.procedure_start_mut_tx,
	procedureCommitMutTx: sys.procedure_commit_mut_tx,
	procedureAbortMutTx: sys.procedure_abort_mut_tx,
	procedureHttpRequest: sys.procedure_http_request
};
var { freeze } = Object;
var sys2 = {
	..._syscalls2_0,
	..._syscalls2_1
};
function isDatastoreBackend(value) {
	return value !== null && typeof value === "object" && "tableIdFromName" in value && "procedureStartMutTx" in value;
}
function requestFromWire(request, body) {
	return Request[makeRequest](body, {
		headers: deserializeHeaders(request.headers),
		method: deserializeMethod(request.method),
		uri: request.uri,
		version: request.version
	});
}
function responseIntoWire(response) {
	return [{
		headers: serializeHeaders(response.headers),
		version: response.version,
		code: response.status
	}, response.bytes()];
}
function parseJsonObject(json) {
	let value;
	try {
		value = JSON.parse(json);
	} catch {
		throw new Error("Invalid JSON: failed to parse string");
	}
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected a JSON object at the top level");
	return value;
}
var JwtClaimsImpl = class {
	/**
	* Creates a new JwtClaims instance.
	* @param rawPayload The JWT payload as a raw JSON string.
	* @param identity The identity for this JWT. We are only taking this because we don't have a blake3 implementation (which we need to compute it).
	*/
	constructor(rawPayload, identity) {
		this.rawPayload = rawPayload;
		this.fullPayload = parseJsonObject(rawPayload);
		this._identity = identity;
	}
	fullPayload;
	_identity;
	get identity() {
		return this._identity;
	}
	get subject() {
		return this.fullPayload["sub"];
	}
	get issuer() {
		return this.fullPayload["iss"];
	}
	get audience() {
		const aud = this.fullPayload["aud"];
		if (aud == null) return [];
		return typeof aud === "string" ? [aud] : aud;
	}
};
var AuthCtxImpl = class _AuthCtxImpl {
	isInternal;
	_jwtSource;
	_initializedJWT = false;
	_jwtClaims;
	_senderIdentity;
	constructor(opts) {
		this.isInternal = opts.isInternal;
		this._jwtSource = opts.jwtSource;
		this._senderIdentity = opts.senderIdentity;
	}
	_initializeJWT() {
		if (this._initializedJWT) return;
		this._initializedJWT = true;
		const token = this._jwtSource();
		if (!token) this._jwtClaims = null;
		else this._jwtClaims = new JwtClaimsImpl(token, this._senderIdentity);
		Object.freeze(this);
	}
	/** Lazily compute whether a JWT exists and is parseable. */
	get hasJWT() {
		this._initializeJWT();
		return this._jwtClaims !== null;
	}
	/** Lazily parse the JwtClaims only when accessed. */
	get jwt() {
		this._initializeJWT();
		return this._jwtClaims;
	}
	/** Create a context representing internal (non-user) requests. */
	static internal() {
		return new _AuthCtxImpl({
			isInternal: true,
			jwtSource: () => null,
			senderIdentity: Identity.zero()
		});
	}
	/** If there is a connection id, look up the JWT payload from the system tables. */
	static fromBackend(connectionId, sender, backend) {
		if (connectionId === null) return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => null,
			senderIdentity: sender
		});
		return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => {
				const payloadBuf = backend.getJwtPayload(connectionId.__connection_id__);
				if (payloadBuf.length === 0) return null;
				return new TextDecoder().decode(payloadBuf);
			},
			senderIdentity: sender
		});
	}
	/** If there is a connection id, look up the JWT payload from the host system tables. */
	static fromSystemTables(connectionId, sender) {
		return _AuthCtxImpl.fromBackend(connectionId, sender, hostBackend);
	}
};
var ReducerCtxImpl = class ReducerCtx {
	#identity;
	#senderAuth;
	#uuidCounter;
	#random;
	#backend;
	sender;
	timestamp;
	connectionId;
	db;
	env = environment;
	as;
	constructor(sender, timestamp, connectionId, dbView, backendOrAsViews = hostBackend, senderAuth, random, asViews = {}) {
		Object.seal(this);
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.db = dbView;
		if (isDatastoreBackend(backendOrAsViews)) {
			this.#backend = backendOrAsViews;
			this.#senderAuth = senderAuth;
			this.#random = random;
		} else {
			this.#backend = hostBackend;
			asViews = backendOrAsViews;
		}
		this.as = asViews;
	}
	/** Reset the `ReducerCtx` to be used for a new transaction */
	static resetHost(me, sender, timestamp, connectionId, dbView, asViews) {
		me.sender = sender;
		me.timestamp = timestamp;
		me.connectionId = connectionId;
		me.#backend = hostBackend;
		me.#senderAuth = void 0;
		me.#random = void 0;
		me.#uuidCounter = void 0;
		if (dbView !== void 0) me.db = dbView;
		if (asViews !== void 0) me.as = asViews;
	}
	/** Reset the `ReducerCtx` to be used with an injectable backend. */
	static reset(me, sender, timestamp, connectionId, backendOrDbView = hostBackend, senderAuth, random, dbView, asViews) {
		me.sender = sender;
		me.timestamp = timestamp;
		me.connectionId = connectionId;
		if (isDatastoreBackend(backendOrDbView)) {
			me.#backend = backendOrDbView;
			me.#senderAuth = senderAuth;
			me.#random = random;
		} else {
			me.#backend = hostBackend;
			me.#senderAuth = void 0;
			me.#random = void 0;
			dbView = backendOrDbView;
			asViews = senderAuth;
		}
		me.#uuidCounter = void 0;
		if (dbView !== void 0) me.db = dbView;
		if (asViews !== void 0) me.as = asViews;
	}
	get databaseIdentity() {
		return this.#identity ??= new Identity(this.#backend.identity());
	}
	get identity() {
		return this.databaseIdentity;
	}
	get senderAuth() {
		return this.#senderAuth ??= AuthCtxImpl.fromBackend(this.connectionId, this.sender, this.#backend);
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	/**
	* Create a new random {@link Uuid} `v4` using this `ReducerCtx`'s RNG.
	*/
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	/**
	* Create a new sortable {@link Uuid} `v7` using this `ReducerCtx`'s RNG, counter,
	* and timestamp.
	*/
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
var callUserFunction = function __spacetimedb_end_short_backtrace(fn, ...args) {
	return fn(...args);
};
function runWithTx(makeCtx, body, backend = hostBackend) {
	const run = () => {
		const timestamp = backend.procedureStartMutTx();
		try {
			return body(makeCtx(new Timestamp(timestamp)));
		} catch (e) {
			backend.procedureAbortMutTx();
			throw e;
		}
	};
	let res = run();
	try {
		backend.procedureCommitMutTx();
		return res;
	} catch {}
	console.warn("committing anonymous transaction failed");
	res = run();
	try {
		backend.procedureCommitMutTx();
		return res;
	} catch (e) {
		throw new Error("transaction retry failed again", { cause: e });
	}
}
function flattenSubmoduleDispatches(dispatches, parentPrefix = "") {
	const result = [];
	for (const d of dispatches) {
		const namePrefix = parentPrefix + d.namespace + ".";
		result.push({
			reducerFns: d.reducerFns,
			reducerDefs: d.reducerDefs,
			procedureFns: d.procedureFns,
			procedureDefs: d.procedureDefs,
			anonViewFns: d.anonViewFns,
			viewFns: d.viewFns,
			tables: d.tables,
			schemaTables: d.schemaTables,
			typespace: d.typespace,
			dbView_: void 0,
			queryBuilder_: void 0,
			namePrefix,
			subDispatches: d.subDispatches
		});
		result.push(...flattenSubmoduleDispatches(d.subDispatches, namePrefix));
	}
	return result;
}
var makeHooks = (schema2) => new ModuleHooksImpl(schema2);
var ModuleHooksImpl = class {
	#schema;
	#dbView_;
	#consumerAs_;
	#reducerArgsDeserializers;
	#consumerReducerCount;
	#consumerProcedureCount;
	#flatSubmodules;
	#consumerAnonViewCount;
	#consumerViewCount;
	/** Cache the `ReducerCtx` object to avoid allocating anew for every reducer call. */
	#reducerCtx_;
	/** Per-submodule alias ctx maps, cached lazily (parallel to #flatSubmodules). */
	#submoduleAsViews_ = [];
	constructor(schema2) {
		this.#schema = schema2;
		this.#consumerReducerCount = schema2.reducers.length;
		this.#consumerProcedureCount = schema2.procedures.length;
		this.#consumerAnonViewCount = schema2.anonViews.length;
		this.#consumerViewCount = schema2.views.length;
		this.#flatSubmodules = flattenSubmoduleDispatches(schema2.submoduleDispatchInfos);
		const consumerDeserializers = schema2.moduleDef.reducers.map(({ params }) => ProductType.makeDeserializer(params, schema2.typespace));
		const submoduleDeserializers = this.#flatSubmodules.flatMap(({ reducerDefs, typespace }) => reducerDefs.map(({ params }) => ProductType.makeDeserializer(params, typespace)));
		this.#reducerArgsDeserializers = [...consumerDeserializers, ...submoduleDeserializers];
	}
	get #dbView() {
		if (this.#dbView_ !== void 0) return this.#dbView_;
		const rootTables = Object.values(this.#schema.schemaType.tables).map((table2) => [table2.accessorName, makeTableView(this.#schema.typespace, table2.tableDef)]);
		const submoduleNs = this.#schema.submoduleDispatchInfos.map((dispatch) => [dispatch.namespace, buildDbViewForDispatch(dispatch, dispatch.namespace + ".")]);
		this.#dbView_ = freeze(Object.fromEntries([...rootTables, ...submoduleNs]));
		return this.#dbView_;
	}
	#getSubmoduleDbView(submoduleIdx) {
		const m = this.#flatSubmodules[submoduleIdx];
		return m.dbView_ ??= freeze(Object.fromEntries(m.tables.map(({ accessorName, tableDef }) => [accessorName, makeTableView(m.typespace, tableDef, m.namePrefix)])));
	}
	#getSubmoduleAsViews(submoduleIdx) {
		return this.#submoduleAsViews_[submoduleIdx] ??= buildAliasCtxMap(this.#reducerCtx, this.#flatSubmodules[submoduleIdx].subDispatches, this.#flatSubmodules[submoduleIdx].namePrefix);
	}
	/** Query builder scoped to the submodule's own tables, with namespace-prefixed
	*  source names so generated SQL targets the mounted table names. */
	#getSubmoduleQueryBuilder(submoduleIdx) {
		const m = this.#flatSubmodules[submoduleIdx];
		return m.queryBuilder_ ??= makeQueryBuilder({ tables: Object.fromEntries(Object.entries(m.schemaTables).map(([key, def]) => [key, {
			...def,
			sourceName: m.namePrefix + def.sourceName
		}])) });
	}
	get #reducerCtx() {
		return this.#reducerCtx_ ??= new ReducerCtxImpl(Identity.zero(), Timestamp.UNIX_EPOCH, null, this.#dbView);
	}
	get #consumerAs() {
		return this.#consumerAs_ ??= buildAliasCtxMap(this.#reducerCtx, this.#schema.submoduleDispatchInfos, "");
	}
	__describe_module__() {
		const writer = new BinaryWriter(128);
		RawModuleDef.serialize(writer, RawModuleDef.V10(this.#schema.rawModuleDefV10()));
		return writer.getBuffer();
	}
	__get_error_constructor__(code) {
		return getErrorConstructor(code);
	}
	get __sender_error_class__() {
		return SenderError;
	}
	__call_reducer__(reducerId, sender, connId, timestamp, argsBuf) {
		const deserializeArgs = this.#reducerArgsDeserializers[reducerId];
		BINARY_READER.reset(argsBuf);
		const args = deserializeArgs(BINARY_READER);
		const senderIdentity = new Identity(sender);
		let fn;
		let dbView;
		let asViews;
		if (reducerId < this.#consumerReducerCount) {
			fn = this.#schema.reducers[reducerId];
			dbView = this.#dbView;
			asViews = this.#consumerAs;
		} else {
			let offset = this.#consumerReducerCount;
			for (let i = 0; i < this.#flatSubmodules.length; i++) {
				const m = this.#flatSubmodules[i];
				if (reducerId < offset + m.reducerFns.length) {
					fn = m.reducerFns[reducerId - offset];
					dbView = this.#getSubmoduleDbView(i);
					asViews = this.#getSubmoduleAsViews(i);
					break;
				}
				offset += m.reducerFns.length;
			}
			if (fn === void 0) throw new RangeError(`unknown reducerId ${reducerId}`);
		}
		const ctx = this.#reducerCtx;
		ReducerCtxImpl.resetHost(ctx, senderIdentity, new Timestamp(timestamp), ConnectionId.nullIfZero(new ConnectionId(connId)), dbView, asViews);
		callUserFunction(fn, ctx, args);
	}
	__call_view__(id, sender, argsBuf) {
		const moduleCtx = this.#schema;
		let viewFns;
		let localId;
		let dbView;
		let from;
		if (id < this.#consumerViewCount) {
			viewFns = moduleCtx.views;
			localId = id;
			dbView = this.#dbView;
			from = makeQueryBuilder(moduleCtx.schemaType);
		} else {
			let offset = this.#consumerViewCount;
			let found = false;
			for (let i = 0; i < this.#flatSubmodules.length; i++) {
				const m = this.#flatSubmodules[i];
				if (id < offset + m.viewFns.length) {
					viewFns = m.viewFns;
					localId = id - offset;
					dbView = this.#getSubmoduleDbView(i);
					from = this.#getSubmoduleQueryBuilder(i);
					found = true;
					break;
				}
				offset += m.viewFns.length;
			}
			if (!found) throw new RangeError(`unknown viewId ${id}`);
		}
		const { fn, deserializeParams, serializeReturn, returnTypeBaseSize } = viewFns[localId];
		const ret = callUserFunction(fn, freeze({
			env: environment,
			sender: new Identity(sender),
			db: dbView,
			from
		}), deserializeParams(new BinaryReader(argsBuf)));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RawSql(query));
		} else {
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RowData);
			serializeReturn(retBuf, ret);
		}
		return { data: retBuf.getBuffer() };
	}
	__call_view_anon__(id, argsBuf) {
		const moduleCtx = this.#schema;
		let anonViewFns;
		let localId;
		let dbView;
		let from;
		if (id < this.#consumerAnonViewCount) {
			anonViewFns = moduleCtx.anonViews;
			localId = id;
			dbView = this.#dbView;
			from = makeQueryBuilder(moduleCtx.schemaType);
		} else {
			let offset = this.#consumerAnonViewCount;
			let found = false;
			for (let i = 0; i < this.#flatSubmodules.length; i++) {
				const m = this.#flatSubmodules[i];
				if (id < offset + m.anonViewFns.length) {
					anonViewFns = m.anonViewFns;
					localId = id - offset;
					dbView = this.#getSubmoduleDbView(i);
					from = this.#getSubmoduleQueryBuilder(i);
					found = true;
					break;
				}
				offset += m.anonViewFns.length;
			}
			if (!found) throw new RangeError(`unknown anonViewId ${id}`);
		}
		const { fn, deserializeParams, serializeReturn, returnTypeBaseSize } = anonViewFns[localId];
		const ret = callUserFunction(fn, freeze({
			env: environment,
			db: dbView,
			from
		}), deserializeParams(new BinaryReader(argsBuf)));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RawSql(query));
		} else {
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RowData);
			serializeReturn(retBuf, ret);
		}
		return { data: retBuf.getBuffer() };
	}
	__call_procedure__(id, sender, connection_id, timestamp, args) {
		const senderIdentity = new Identity(sender);
		const connId = ConnectionId.nullIfZero(new ConnectionId(connection_id));
		const ts = new Timestamp(timestamp);
		if (id < this.#consumerProcedureCount) return callProcedure(this.#schema.procedures, id, senderIdentity, connId, ts, args, () => this.#dbView, this.#schema.submoduleDispatchInfos);
		let offset = this.#consumerProcedureCount;
		for (let i = 0; i < this.#flatSubmodules.length; i++) {
			const m = this.#flatSubmodules[i];
			if (id < offset + m.procedureFns.length) return callProcedure(m.procedureFns, id - offset, senderIdentity, connId, ts, args, () => this.#getSubmoduleDbView(i), m.subDispatches, m.namePrefix);
			offset += m.procedureFns.length;
		}
		throw new RangeError(`unknown procedureId ${id}`);
	}
	__call_http_handler__(id, timestamp, request, body) {
		const moduleCtx = this.#schema;
		const handler = moduleCtx.httpHandlers[id];
		const [responseMetadata, responseBody] = responseIntoWire(callUserFunction(handler, new HandlerContextImpl(new Timestamp(timestamp), () => this.#dbView, this.#schema.submoduleDispatchInfos), requestFromWire(HttpRequest.deserialize(new BinaryReader(request)), body)));
		const responseBuf = new BinaryWriter(bsatnBaseSize(moduleCtx.typespace, HttpResponse.algebraicType));
		HttpResponse.serialize(responseBuf, responseMetadata);
		return [responseBuf.getBuffer(), responseBody];
	}
};
var BINARY_WRITER = new BinaryWriter(0);
var BINARY_READER = new BinaryReader(new Uint8Array());
var HandlerContextImpl = class {
	constructor(timestamp, dbView, dispatches = []) {
		this.timestamp = timestamp;
		this.#dbView = dbView;
		this.#dispatches = dispatches;
	}
	env = environment;
	#identity;
	#uuidCounter;
	#random;
	#dbView;
	#dispatches;
	#asViews;
	http = httpClient;
	get identity() {
		return this.#identity ??= new Identity(sys2.identity());
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	get as() {
		return this.#asViews ??= buildHandlerAliasCtxMap(this, this.#dispatches, "");
	}
	withTx(body) {
		const dispatches = this.#dispatches;
		return runWithTx((timestamp) => {
			const tx = new ReducerCtxImpl(Identity.zero(), timestamp, null, this.#dbView());
			if (dispatches.length > 0) tx.as = buildAliasCtxMap(tx, dispatches, "");
			return tx;
		}, body);
	}
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
function buildDbViewForDispatch(dispatch, namePrefix) {
	const tableEntries = dispatch.tables.map(({ accessorName, tableDef }) => [accessorName, makeTableView(dispatch.typespace, tableDef, namePrefix)]);
	const subNsEntries = dispatch.subDispatches.map((sub) => [sub.namespace, buildDbViewForDispatch(sub, namePrefix + sub.namespace + ".")]);
	return freeze(Object.fromEntries([...tableEntries, ...subNsEntries]));
}
function buildAliasCtx(parent, dispatch, namePrefix) {
	return {
		get sender() {
			return parent.sender;
		},
		get databaseIdentity() {
			return parent.databaseIdentity;
		},
		get identity() {
			return parent.identity;
		},
		get timestamp() {
			return parent.timestamp;
		},
		get connectionId() {
			return parent.connectionId;
		},
		get senderAuth() {
			return parent.senderAuth;
		},
		get random() {
			return parent.random;
		},
		newUuidV4() {
			return parent.newUuidV4();
		},
		newUuidV7() {
			return parent.newUuidV7();
		},
		db: buildDbViewForDispatch(dispatch, namePrefix),
		as: buildAliasCtxMap(parent, dispatch.subDispatches, namePrefix)
	};
}
function buildAliasCtxMap(parent, dispatches, parentPrefix) {
	return freeze(Object.fromEntries(dispatches.map((d) => [d.namespace, buildAliasCtx(parent, d, parentPrefix + d.namespace + ".")])));
}
function buildHandlerAliasCtx(parent, dispatch, namePrefix) {
	let nsDb_;
	return {
		get timestamp() {
			return parent.timestamp;
		},
		get http() {
			return parent.http;
		},
		get identity() {
			return parent.identity;
		},
		get random() {
			return parent.random;
		},
		as: buildHandlerAliasCtxMap(parent, dispatch.subDispatches, namePrefix),
		withTx(body) {
			return runWithTx((ts) => {
				const tx = new ReducerCtxImpl(Identity.zero(), ts, null, nsDb_ ??= buildDbViewForDispatch(dispatch, namePrefix));
				assignTxAliasViews(tx, dispatch.subDispatches, namePrefix);
				return tx;
			}, body);
		},
		newUuidV4() {
			return parent.newUuidV4();
		},
		newUuidV7() {
			return parent.newUuidV7();
		}
	};
}
function buildHandlerAliasCtxMap(parent, dispatches, parentPrefix) {
	return freeze(Object.fromEntries(dispatches.map((d) => [d.namespace, buildHandlerAliasCtx(parent, d, parentPrefix + d.namespace + ".")])));
}
function buildProcedureAliasCtx(parent, dispatch, namePrefix) {
	let nsDb_;
	return {
		get sender() {
			return parent.sender;
		},
		get databaseIdentity() {
			return parent.databaseIdentity;
		},
		get identity() {
			return parent.identity;
		},
		get timestamp() {
			return parent.timestamp;
		},
		get connectionId() {
			return parent.connectionId;
		},
		get http() {
			return parent.http;
		},
		get random() {
			return parent.random;
		},
		sleep(duration) {
			return parent.sleep(duration);
		},
		as: buildProcedureAliasCtxMap(parent, dispatch.subDispatches, namePrefix),
		withTx(body) {
			return runWithTx((ts) => {
				const tx = new ReducerCtxImpl(parent.sender, ts, parent.connectionId, nsDb_ ??= buildDbViewForDispatch(dispatch, namePrefix));
				assignTxAliasViews(tx, dispatch.subDispatches, namePrefix);
				return tx;
			}, body);
		},
		newUuidV4() {
			return parent.newUuidV4();
		},
		newUuidV7() {
			return parent.newUuidV7();
		}
	};
}
function buildProcedureAliasCtxMap(parent, dispatches, parentPrefix) {
	return freeze(Object.fromEntries(dispatches.map((d) => [d.namespace, buildProcedureAliasCtx(parent, d, parentPrefix + d.namespace + ".")])));
}
function assignTxAliasViews(tx, dispatches, parentPrefix = "") {
	if (dispatches.length > 0) tx.as = buildAliasCtxMap(tx, dispatches, parentPrefix);
}
function makeTableView(typespace, table2, backendOrNamePrefix = hostBackend, namePrefix = "") {
	const backend = isDatastoreBackend(backendOrNamePrefix) ? backendOrNamePrefix : hostBackend;
	if (typeof backendOrNamePrefix === "string") namePrefix = backendOrNamePrefix;
	const table_id = backend.tableIdFromName(namePrefix + table2.sourceName);
	const rowType = typespace.types[table2.productTypeRef];
	if (rowType.tag !== "Product") throw "impossible";
	const serializeRow = AlgebraicType.makeSerializer(rowType, typespace);
	const deserializeRow = AlgebraicType.makeDeserializer(rowType, typespace);
	const sequences = table2.sequences.map((seq) => {
		const col = rowType.value.elements[seq.column];
		const colType = col.algebraicType;
		let sequenceTrigger;
		switch (colType.tag) {
			case "U8":
			case "I8":
			case "U16":
			case "I16":
			case "U32":
			case "I32":
				sequenceTrigger = 0;
				break;
			case "U64":
			case "I64":
			case "U128":
			case "I128":
			case "U256":
			case "I256":
				sequenceTrigger = 0n;
				break;
			default: throw new TypeError("invalid sequence type");
		}
		return {
			colName: col.name,
			sequenceTrigger,
			deserialize: AlgebraicType.makeDeserializer(colType, typespace)
		};
	});
	const hasAutoIncrement = sequences.length > 0;
	const iter = () => tableIterator(backend.datastoreTableScanBsatn(table_id), deserializeRow, backend);
	const integrateGeneratedColumns = hasAutoIncrement ? (row, ret_buf) => {
		BINARY_READER.reset(ret_buf);
		for (const { colName, deserialize, sequenceTrigger } of sequences) if (row[colName] === sequenceTrigger) row[colName] = deserialize(BINARY_READER);
	} : null;
	const generatedColumnsView = (generated, fallback) => generated instanceof Uint8Array ? new DataView(generated.buffer, generated.byteOffset, generated.byteLength) : fallback;
	const tableMethods = {
		count: () => BigInt(backend.datastoreTableRowCount(table_id)),
		iter,
		[Symbol.iterator]: () => iter(),
		insert: (row) => {
			const buf = LEAF_BUF;
			BINARY_WRITER.reset(buf);
			serializeRow(BINARY_WRITER, row);
			const generated = backend.datastoreInsertBsatn(table_id, buf.buffer, BINARY_WRITER.offset);
			const ret = { ...row };
			integrateGeneratedColumns?.(ret, generatedColumnsView(generated, buf.view));
			return ret;
		},
		delete: (row) => {
			const buf = LEAF_BUF;
			BINARY_WRITER.reset(buf);
			BINARY_WRITER.writeU32(1);
			serializeRow(BINARY_WRITER, row);
			return backend.datastoreDeleteAllByEqBsatn(table_id, buf.buffer, BINARY_WRITER.offset) > 0;
		},
		clear: () => {
			const count = BigInt(backend.datastoreTableRowCount(table_id));
			backend.datastoreClear(table_id);
			return count;
		}
	};
	const tableView = Object.assign(/* @__PURE__ */ Object.create(null), tableMethods);
	for (const indexDef of table2.indexes) {
		const accessorName = indexDef.accessorName;
		const index_id = backend.indexIdFromName(namePrefix + indexDef.sourceName);
		let column_ids;
		let isHashIndex = false;
		switch (indexDef.algorithm.tag) {
			case "Hash":
				isHashIndex = true;
				column_ids = indexDef.algorithm.value;
				break;
			case "BTree":
				column_ids = indexDef.algorithm.value;
				break;
			case "Direct":
				column_ids = [indexDef.algorithm.value];
				break;
		}
		const numColumns = column_ids.length;
		const columnSet = new Set(column_ids);
		const isUnique = table2.constraints.filter((x) => x.data.tag === "Unique").some((x) => {
			const constraintColumns = new Set(x.data.value.columns);
			return [...columnSet].every((column) => constraintColumns.has(column));
		});
		const isPrimaryKey = isUnique && column_ids.length === table2.primaryKey.length && column_ids.every((id, i) => table2.primaryKey[i] === id);
		const indexSerializers = column_ids.map((id) => AlgebraicType.makeSerializer(rowType.value.elements[id].algebraicType, typespace));
		const serializePoint = (buffer, colVal) => {
			BINARY_WRITER.reset(buffer);
			for (let i = 0; i < numColumns; i++) indexSerializers[i](BINARY_WRITER, colVal[i]);
			return BINARY_WRITER.offset;
		};
		const serializeSingleElement = numColumns === 1 ? indexSerializers[0] : null;
		const serializeSinglePoint = serializeSingleElement && ((buffer, colVal) => {
			BINARY_WRITER.reset(buffer);
			serializeSingleElement(BINARY_WRITER, colVal);
			return BINARY_WRITER.offset;
		});
		let index;
		if (isUnique && serializeSinglePoint) {
			const base = {
				find: (colVal) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, colVal);
					return tableIterateOne(backend.datastoreIndexScanPointBsatn(index_id, buf.buffer, point_len), deserializeRow, backend);
				},
				delete: (colVal) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, colVal);
					return backend.datastoreDeleteByIndexScanPointBsatn(index_id, buf.buffer, point_len) > 0;
				}
			};
			if (isPrimaryKey) base.update = (row) => {
				const buf = LEAF_BUF;
				BINARY_WRITER.reset(buf);
				serializeRow(BINARY_WRITER, row);
				const generated = backend.datastoreUpdateBsatn(table_id, index_id, buf.buffer, BINARY_WRITER.offset);
				integrateGeneratedColumns?.(row, generatedColumnsView(generated, buf.view));
				return row;
			};
			index = base;
		} else if (isUnique) {
			const base = {
				find: (colVal) => {
					if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
					const buf = LEAF_BUF;
					const point_len = serializePoint(buf, colVal);
					return tableIterateOne(backend.datastoreIndexScanPointBsatn(index_id, buf.buffer, point_len), deserializeRow, backend);
				},
				delete: (colVal) => {
					if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
					const buf = LEAF_BUF;
					const point_len = serializePoint(buf, colVal);
					return backend.datastoreDeleteByIndexScanPointBsatn(index_id, buf.buffer, point_len) > 0;
				}
			};
			if (isPrimaryKey) base.update = (row) => {
				const buf = LEAF_BUF;
				BINARY_WRITER.reset(buf);
				serializeRow(BINARY_WRITER, row);
				const generated = backend.datastoreUpdateBsatn(table_id, index_id, buf.buffer, BINARY_WRITER.offset);
				integrateGeneratedColumns?.(row, generatedColumnsView(generated, buf.view));
				return row;
			};
			index = base;
		} else if (serializeSinglePoint) {
			const serializeSingleRange = !isHashIndex ? (buffer, range) => {
				BINARY_WRITER.reset(buffer);
				const writer = BINARY_WRITER;
				const writeBound = (bound) => {
					writer.writeU8({
						included: 0,
						excluded: 1,
						unbounded: 2
					}[bound.tag]);
					if (bound.tag !== "unbounded") serializeSingleElement(writer, bound.value);
				};
				writeBound(range.from);
				const rstartLen = writer.offset;
				writeBound(range.to);
				return [
					0,
					0,
					rstartLen,
					writer.offset - rstartLen
				];
			} : null;
			const rawIndex = {
				filter: (range) => {
					const buf = LEAF_BUF;
					if (serializeSingleRange && range instanceof Range) {
						const args = serializeSingleRange(buf, range);
						return tableIterator(backend.datastoreIndexScanRangeBsatn(index_id, buf.buffer, ...args), deserializeRow, backend);
					}
					const point_len = serializeSinglePoint(buf, range);
					return tableIterator(backend.datastoreIndexScanPointBsatn(index_id, buf.buffer, point_len), deserializeRow, backend);
				},
				delete: (range) => {
					const buf = LEAF_BUF;
					if (serializeSingleRange && range instanceof Range) {
						const args = serializeSingleRange(buf, range);
						return backend.datastoreDeleteByIndexScanRangeBsatn(index_id, buf.buffer, ...args);
					}
					const point_len = serializeSinglePoint(buf, range);
					return backend.datastoreDeleteByIndexScanPointBsatn(index_id, buf.buffer, point_len);
				}
			};
			if (isHashIndex) index = rawIndex;
			else index = rawIndex;
		} else if (isHashIndex) index = {
			filter: (range) => {
				const buf = LEAF_BUF;
				const point_len = serializePoint(buf, range);
				return tableIterator(backend.datastoreIndexScanPointBsatn(index_id, buf.buffer, point_len), deserializeRow, backend);
			},
			delete: (range) => {
				const buf = LEAF_BUF;
				const point_len = serializePoint(buf, range);
				return backend.datastoreDeleteByIndexScanPointBsatn(index_id, buf.buffer, point_len);
			}
		};
		else {
			const isCompleteScalarKey = (range) => {
				return range.length === numColumns && !(range[range.length - 1] instanceof Range);
			};
			const serializeRange = (buffer, range) => {
				if (range.length > numColumns) throw new TypeError("too many elements");
				BINARY_WRITER.reset(buffer);
				const writer = BINARY_WRITER;
				const prefix_elems = range.length - 1;
				for (let i = 0; i < prefix_elems; i++) indexSerializers[i](writer, range[i]);
				const rstartOffset = writer.offset;
				const term = range[range.length - 1];
				const serializeTerm = indexSerializers[range.length - 1];
				if (term instanceof Range) {
					const writeBound = (bound) => {
						writer.writeU8({
							included: 0,
							excluded: 1,
							unbounded: 2
						}[bound.tag]);
						if (bound.tag !== "unbounded") serializeTerm(writer, bound.value);
					};
					writeBound(term.from);
					const rstartLen = writer.offset - rstartOffset;
					writeBound(term.to);
					return [
						rstartOffset,
						prefix_elems,
						rstartLen,
						writer.offset - rstartOffset - rstartLen
					];
				} else {
					writer.writeU8(0);
					serializeTerm(writer, term);
					return [
						rstartOffset,
						prefix_elems,
						writer.offset - rstartOffset,
						0
					];
				}
			};
			index = {
				filter: (range) => {
					if (!Array.isArray(range)) range = [range];
					if (isCompleteScalarKey(range)) {
						const buf = LEAF_BUF;
						const point_len = serializePoint(buf, range);
						return tableIterator(backend.datastoreIndexScanPointBsatn(index_id, buf.buffer, point_len), deserializeRow, backend);
					} else {
						const buf = LEAF_BUF;
						const args = serializeRange(buf, range);
						return tableIterator(backend.datastoreIndexScanRangeBsatn(index_id, buf.buffer, ...args), deserializeRow, backend);
					}
				},
				delete: (range) => {
					if (!Array.isArray(range)) range = [range];
					if (isCompleteScalarKey(range)) {
						const buf = LEAF_BUF;
						const point_len = serializePoint(buf, range);
						return backend.datastoreDeleteByIndexScanPointBsatn(index_id, buf.buffer, point_len);
					} else {
						const buf = LEAF_BUF;
						const args = serializeRange(buf, range);
						return backend.datastoreDeleteByIndexScanRangeBsatn(index_id, buf.buffer, ...args);
					}
				}
			};
		}
		if (Object.hasOwn(tableView, accessorName)) freeze(Object.assign(tableView[accessorName], index));
		else tableView[accessorName] = freeze(index);
	}
	return freeze(tableView);
}
function* tableIterator(id, deserialize, backend = hostBackend) {
	const iter = new IteratorHandle(id, backend);
	const iterBuf = takeBuf();
	try {
		let amt;
		while (amt = iter.advance(iterBuf)) {
			const reader = new BinaryReader(iterBuf.view);
			while (reader.offset < amt) yield deserialize(reader);
		}
	} finally {
		iter[Symbol.dispose]();
		returnBuf(iterBuf);
	}
}
function tableIterateOne(id, deserialize, backend = hostBackend) {
	const buf = LEAF_BUF;
	if (advanceIterRaw(id, buf, backend) !== 0) {
		BINARY_READER.reset(buf.view);
		return deserialize(BINARY_READER);
	}
	return null;
}
function advanceIterRaw(id, buf, backend = hostBackend) {
	while (true) try {
		return 0 | backend.rowIterBsatnAdvance(id, buf.buffer);
	} catch (e) {
		if (e && typeof e === "object" && hasOwn(e, "__buffer_too_small__")) {
			buf.grow(e.__buffer_too_small__);
			continue;
		}
		throw e;
	}
}
var DEFAULT_BUFFER_CAPACITY = 32 * 1024 * 2;
var ITER_BUFS = [new ResizableBuffer(DEFAULT_BUFFER_CAPACITY)];
var ITER_BUF_COUNT = 1;
function takeBuf() {
	return ITER_BUF_COUNT ? ITER_BUFS[--ITER_BUF_COUNT] : new ResizableBuffer(DEFAULT_BUFFER_CAPACITY);
}
function returnBuf(buf) {
	ITER_BUFS[ITER_BUF_COUNT++] = buf;
}
var LEAF_BUF = new ResizableBuffer(DEFAULT_BUFFER_CAPACITY);
var IteratorHandle = class _IteratorHandle {
	#id;
	#backend;
	static #finalizationRegistry = new FinalizationRegistry(({ id, backend }) => backend.rowIterBsatnClose(id));
	constructor(id, backend = hostBackend) {
		this.#id = id;
		this.#backend = backend;
		_IteratorHandle.#finalizationRegistry.register(this, {
			id,
			backend
		}, this);
	}
	/** Unregister this object with the finalization registry and return the id */
	#detach() {
		const id = this.#id;
		this.#id = -1;
		_IteratorHandle.#finalizationRegistry.unregister(this);
		return id;
	}
	/** Call `row_iter_bsatn_advance`, returning 0 if this iterator has been exhausted. */
	advance(buf) {
		if (this.#id === -1) return 0;
		const ret = advanceIterRaw(this.#id, buf, this.#backend);
		if (ret <= 0) this.#detach();
		return ret < 0 ? -ret : ret;
	}
	[Symbol.dispose]() {
		if (this.#id >= 0) {
			const id = this.#detach();
			this.#backend.rowIterBsatnClose(id);
		}
	}
};
var { freeze: freeze2 } = Object;
var requestBaseSize = bsatnBaseSize({ types: [] }, HttpRequest.algebraicType);
function fetch(url, init = {}) {
	const method = serializeMethod(init.method);
	const headers = serializeHeaders(new Headers(init.headers));
	const uri = "" + url;
	const request = freeze2({
		method,
		headers,
		timeout: init.timeout,
		uri,
		version: { tag: "Http11" }
	});
	const requestBuf = new BinaryWriter(requestBaseSize);
	HttpRequest.serialize(requestBuf, request);
	const body = init.body == null ? new Uint8Array() : typeof init.body === "string" ? init.body : new Uint8Array(init.body);
	const [responseBuf, responseBody] = sys2.procedure_http_request(requestBuf.getBuffer(), body);
	const response = HttpResponse.deserialize(new BinaryReader(responseBuf));
	return SyncResponse[makeResponse](responseBody, {
		type: "basic",
		url: uri,
		status: response.code,
		statusText: import_statuses.default.message[response.code] ?? "",
		headers: deserializeHeaders(response.headers),
		aborted: false,
		version: response.version
	});
}
freeze2(fetch);
var httpClient = freeze2({ fetch });
function makeProcedureExport(ctx, opts, params, ret, fn) {
	const name = opts?.name;
	const procedureExport = (...args) => fn(...args);
	procedureExport[exportContext] = ctx;
	procedureExport[registerExport] = (ctx2, exportName) => {
		registerProcedure(ctx2, name ?? exportName, params, ret, fn);
		ctx2.functionExports.set(procedureExport, name ?? exportName);
		if (opts?.onSchedule !== void 0) ctx2.pendingSchedules.push({
			table: opts.onSchedule,
			functionName: name ?? exportName
		});
	};
	return procedureExport;
}
function registerProcedure(ctx, exportName, params, ret, fn, opts) {
	ctx.defineFunction(exportName);
	const paramsType = { elements: Object.entries(params).map(([n, c]) => ({
		name: n,
		algebraicType: ctx.registerTypesRecursively("typeBuilder" in c ? c.typeBuilder : c).algebraicType
	})) };
	const returnType = ctx.registerTypesRecursively(ret).algebraicType;
	ctx.moduleDef.procedures.push({
		sourceName: exportName,
		params: paramsType,
		returnType,
		visibility: FunctionVisibility.ClientCallable
	});
	const { typespace } = ctx;
	ctx.procedures.push({
		fn,
		deserializeArgs: ProductType.makeDeserializer(paramsType, typespace),
		serializeReturn: AlgebraicType.makeSerializer(returnType, typespace),
		returnTypeBaseSize: bsatnBaseSize(typespace, returnType)
	});
}
function callProcedure(procedures, id, sender, connectionId, timestamp, argsBuf, dbView, dispatches = [], parentPrefix = "") {
	const { fn, deserializeArgs, serializeReturn, returnTypeBaseSize } = procedures[id];
	const args = deserializeArgs(new BinaryReader(argsBuf));
	const ret = callUserFunction(fn, new ProcedureCtxImpl(sender, timestamp, connectionId, dbView, hostBackend, httpClient, void 0, void 0, void 0, dispatches, parentPrefix), args);
	const retBuf = new BinaryWriter(returnTypeBaseSize);
	serializeReturn(retBuf, ret);
	return retBuf.getBuffer();
}
var ProcedureCtxImpl = class ProcedureCtx {
	constructor(sender, timestamp, connectionId, dbView, backend = hostBackend, http = httpClient, sleep = () => {
		throw new Error("procedure sleep is not available in this runtime");
	}, random, childSeedRandom, dispatches = [], parentPrefix = "") {
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.#dbView = dbView;
		this.#backend = backend;
		this.#http = http;
		this.#sleep = sleep;
		this.#random = random;
		this.#childSeedRandom = childSeedRandom;
		this.#dispatches = dispatches;
		this.#parentPrefix = parentPrefix;
	}
	#identity;
	#uuidCounter;
	#random;
	#dbView;
	#backend;
	#http;
	#sleep;
	#childSeedRandom;
	env = environment;
	#dispatches;
	#parentPrefix;
	#asViews;
	get databaseIdentity() {
		return this.#identity ??= new Identity(this.#backend.identity());
	}
	get identity() {
		return this.databaseIdentity;
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	get http() {
		return this.#http;
	}
	sleep(duration) {
		this.#sleep(duration);
	}
	get as() {
		return this.#asViews ??= buildProcedureAliasCtxMap(this, this.#dispatches, this.#parentPrefix);
	}
	withTx(body) {
		const txSeed = this.#childSeedRandom?.bigintInRange(0n, (1n << 64n) - 1n);
		const dispatches = this.#dispatches;
		const parentPrefix = this.#parentPrefix;
		return runWithTx((timestamp) => {
			const tx = new ReducerCtxImpl(this.sender, timestamp, this.connectionId, this.#dbView(), this.#backend, void 0, txSeed == null ? void 0 : makeRandomFromSeed(txSeed));
			assignTxAliasViews(tx, dispatches, parentPrefix);
			return tx;
		}, body, this.#backend);
	}
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
function makeReducerExport(ctx, opts, params, fn, lifecycle) {
	const reducerExport = (...args) => fn(...args);
	reducerExport[exportContext] = ctx;
	reducerExport[registerExport] = (ctx2, exportName) => {
		registerReducer(ctx2, exportName, params, fn, opts, lifecycle);
		ctx2.functionExports.set(reducerExport, exportName);
		if (opts?.onSchedule !== void 0) ctx2.pendingSchedules.push({
			table: opts.onSchedule,
			functionName: exportName
		});
	};
	return reducerExport;
}
function registerReducer(ctx, exportName, params, fn, opts, lifecycle) {
	ctx.defineFunction(exportName);
	if (!(params instanceof RowBuilder)) params = new RowBuilder(params);
	if (params.typeName === void 0) params.typeName = toPascalCase(exportName);
	const ref = ctx.registerTypesRecursively(params);
	const paramsType = ctx.resolveType(ref).value;
	const isLifecycle = lifecycle != null;
	ctx.moduleDef.reducers.push({
		sourceName: exportName,
		params: paramsType,
		visibility: FunctionVisibility.ClientCallable,
		okReturnType: AlgebraicType.Product({ elements: [] }),
		errReturnType: AlgebraicType.String
	});
	if (opts?.name != null) ctx.moduleDef.explicitNames.entries.push({
		tag: "Function",
		value: {
			sourceName: exportName,
			canonicalName: opts.name
		}
	});
	if (isLifecycle) ctx.moduleDef.lifeCycleReducers.push({
		lifecycleSpec: lifecycle,
		functionName: exportName
	});
	if (!fn.name) Object.defineProperty(fn, "name", {
		value: exportName,
		writable: false
	});
	ctx.reducers.push(fn);
}
var SchemaInner = class extends ModuleContext {
	schemaType;
	exportsRegistered = false;
	schedulesResolved = false;
	existingFunctions = /* @__PURE__ */ new Set();
	existingHttpHandlers = /* @__PURE__ */ new Set();
	reducers = [];
	procedures = [];
	views = [];
	anonViews = [];
	httpHandlers = [];
	/**
	* Maps reducer/procedure export objects to their source names.
	* Used for resolving scheduled table targets.
	*/
	functionExports = /* @__PURE__ */ new Map();
	tableSourceNames = /* @__PURE__ */ new Map();
	httpHandlerExports = /* @__PURE__ */ new Map();
	pendingSchedules = [];
	pendingHttpRoutes = [];
	submoduleDispatchInfos = [];
	constructor(getSchemaType) {
		super();
		this.schemaType = getSchemaType(this);
	}
	defineFunction(name) {
		if (this.existingFunctions.has(name)) throw new TypeError(`There is already a reducer, procedure, or view with the name '${name}'`);
		this.existingFunctions.add(name);
	}
	defineHttpHandler(name) {
		if (this.existingHttpHandlers.has(name)) throw new TypeError(`There is already an HTTP handler with the name '${name}'`);
		this.existingHttpHandlers.add(name);
	}
	resolveSchedules() {
		if (this.schedulesResolved) return;
		this.schedulesResolved = true;
		const scheduledTables = /* @__PURE__ */ new Map();
		for (const { functionName: knownFunctionName, reducer, table: table2, tableName: knownTableName, scheduleAtCol: knownScheduleAtCol } of this.pendingSchedules) {
			let tableName = knownTableName;
			if (tableName === void 0) {
				const tableNames = this.tableSourceNames.get(table2);
				if (tableNames !== void 0 && tableNames.length > 1) throw new TypeError("Schedule target table is registered more than once in this schema. Use a distinct table handle for each scheduled table.");
				tableName = tableNames?.[0];
			}
			if (tableName === void 0) throw new TypeError("Schedule target table is not part of this schema.");
			const scheduleAtCol = knownScheduleAtCol ?? table2.scheduleAtCol;
			if (scheduleAtCol === void 0) throw new TypeError(`Table ${tableName} defines a schedule, but it does not have a ScheduleAt column.`);
			const functionName = knownFunctionName ?? (reducer === void 0 ? void 0 : this.functionExports.get(reducer()));
			if (functionName === void 0) {
				const msg = `Table ${tableName} defines a schedule, but it seems like the associated function was not exported.`;
				throw new TypeError(msg);
			}
			const existingFunctionName = scheduledTables.get(tableName);
			if (existingFunctionName !== void 0) throw new TypeError(`Table ${tableName} defines multiple schedules: ${existingFunctionName} and ${functionName}. A schedule table can only be used by one reducer or procedure.`);
			scheduledTables.set(tableName, functionName);
			this.moduleDef.schedules.push({
				sourceName: void 0,
				tableName,
				scheduleAtCol,
				functionName
			});
		}
	}
	resolveHttpRoutes() {
		for (const route of this.pendingHttpRoutes) {
			const handlerFunction = this.httpHandlerExports.get(route.handler);
			if (handlerFunction === void 0) throw new TypeError(`HTTP route for path '${route.path}' refers to a handler that was not exported.`);
			this.moduleDef.httpRoutes.push({
				handlerFunction,
				method: route.method,
				path: route.path
			});
		}
	}
};
var Schema = class {
	#ctx;
	constructor(ctx) {
		this.#ctx = ctx;
	}
	[moduleHooks](exports) {
		this.buildRawModuleDefV10(exports);
		this.#ctx.resolveHttpRoutes();
		return makeHooks(this.#ctx);
	}
	get schemaType() {
		return this.#ctx.schemaType;
	}
	get moduleDef() {
		return this.#ctx.moduleDef;
	}
	get typespace() {
		return this.#ctx.typespace;
	}
	get submoduleDispatchInfos() {
		return this.#ctx.submoduleDispatchInfos;
	}
	/** Internal: register exports and materialize the RawModuleDefV10 for upload. */
	buildRawModuleDefV10(exports, opts) {
		registerModuleExports(this.#ctx, exports, { ignoreNonModuleExports: opts?.ignoreNonModuleExports ?? false });
		this.#ctx.resolveSchedules();
		return this.#ctx.rawModuleDefV10();
	}
	/**
	* @internal – called by schema() when processing a submodule namespace entry.
	* Registers the library's exports and returns both the serialized module def
	* and the runtime dispatch info needed by ModuleHooksImpl for __call_reducer__.
	*/
	buildSubmoduleDispatch(exports) {
		const rawDef = this.buildRawModuleDefV10(exports, { ignoreNonModuleExports: true });
		if (this.#ctx.moduleDef.environment.length !== 0) throw new TypeError("Submodules cannot declare environment variables");
		this.#ctx.resolveHttpRoutes();
		return {
			rawDef,
			dispatch: {
				namespace: "",
				reducerFns: [...this.#ctx.reducers],
				reducerDefs: [...this.#ctx.moduleDef.reducers],
				procedureFns: [...this.#ctx.procedures],
				procedureDefs: [...this.#ctx.moduleDef.procedures],
				anonViewFns: [...this.#ctx.anonViews],
				viewFns: [...this.#ctx.views],
				typespace: this.#ctx.moduleDef.typespace,
				tables: Object.values(this.#ctx.schemaType.tables).map((t2) => ({
					accessorName: t2.accessorName,
					tableDef: t2.tableDef
				})),
				schemaTables: this.#ctx.schemaType.tables,
				subDispatches: [...this.#ctx.submoduleDispatchInfos]
			}
		};
	}
	reducer(...args) {
		let opts, params = {}, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2: {
				let arg1;
				[arg1, fn] = args;
				if (typeof arg1.name === "string") opts = arg1;
				else params = arg1;
				break;
			}
			case 3:
				[opts, params, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, params, fn);
	}
	init(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.Init);
	}
	clientConnected(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.OnConnect);
	}
	clientDisconnected(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.OnDisconnect);
	}
	view(opts, ...args) {
		let params = {}, ret, fn;
		switch (args.length) {
			case 2:
				[ret, fn] = args;
				break;
			case 3:
				[params, ret, fn] = args;
				break;
		}
		return makeViewExport(this.#ctx, opts, params, ret, fn);
	}
	anonymousView(opts, ...args) {
		let params = {}, ret, fn;
		switch (args.length) {
			case 2:
				[ret, fn] = args;
				break;
			case 3:
				[params, ret, fn] = args;
				break;
		}
		return makeAnonViewExport(this.#ctx, opts, params, ret, fn);
	}
	procedure(...args) {
		let opts, params = {}, ret, fn;
		switch (args.length) {
			case 2:
				[ret, fn] = args;
				break;
			case 3: {
				let arg1;
				[arg1, ret, fn] = args;
				if (typeof arg1.name === "string") opts = arg1;
				else params = arg1;
				break;
			}
			case 4:
				[opts, params, ret, fn] = args;
				break;
		}
		return makeProcedureExport(this.#ctx, opts, params, ret, fn);
	}
	httpHandler(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeHttpHandlerExport(this.#ctx, opts, fn);
	}
	httpRouter(router) {
		return makeHttpRouterExport(this.#ctx, router);
	}
	/**
	* Bundle multiple reducers, procedures, etc into one value to export.
	* The name they will be exported with is their corresponding key in the `exports` argument.
	*/
	exportGroup(exports) {
		return {
			[exportContext]: this.#ctx,
			[registerExport](ctx, _exportName) {
				for (const [exportName, moduleExport] of Object.entries(exports)) {
					checkExportContext(moduleExport, ctx);
					moduleExport[registerExport](ctx, exportName);
				}
			}
		};
	}
	clientVisibilityFilter = { sql: (filter) => ({
		[exportContext]: this.#ctx,
		[registerExport](ctx, _exportName) {
			ctx.moduleDef.rowLevelSecurity.push({ sql: filter });
		}
	}) };
};
var registerExport = Symbol("SpacetimeDB.registerExport");
var exportContext = Symbol("SpacetimeDB.exportContext");
function isModuleExport(x) {
	return (typeof x === "function" || typeof x === "object") && x !== null && registerExport in x;
}
function checkExportContext(exp, schema2) {
	if (exp[exportContext] != null && exp[exportContext] !== schema2) throw new TypeError("multiple schemas are not supported");
}
function isUntypedTableSchema(x) {
	return typeof x === "object" && x !== null && hasOwn(x, "tableDef");
}
function isSubmoduleNamespace(x) {
	return typeof x === "object" && x !== null && hasOwn(x, "default") && x.default instanceof Schema;
}
function isSubmoduleMount(x) {
	return typeof x === "object" && x !== null && hasOwn(x, "module") && !hasOwn(x, "default") && !hasOwn(x, "tableDef");
}
function defaultImportError(accName) {
	return /* @__PURE__ */ new TypeError(`schema entry '${accName}' looks like a default import; use \`import * as ${accName} from '...'\` so the submodule can see the library's named reducer exports.`);
}
function resolveSubmoduleEntry(accName, entry) {
	if (entry instanceof Schema) throw defaultImportError(accName);
	if (isSubmoduleNamespace(entry)) return { submodule: entry };
	if (!isSubmoduleMount(entry)) return;
	if (entry.module instanceof Schema) throw defaultImportError(accName);
	if (!isSubmoduleNamespace(entry.module)) throw new TypeError(`schema entry '${accName}' has a \`module\` that is not a submodule namespace object; pass the result of \`import * as ${accName} from '...'\`.`);
	if (entry.name === void 0) return { submodule: entry.module };
	if (typeof entry.name !== "string" || entry.name.length === 0) throw new TypeError(`schema entry '${accName}' has an invalid \`name\`; expected a non-empty string for the canonical namespace name.`);
	return {
		submodule: entry.module,
		canonicalName: entry.name
	};
}
function registerModuleExports(schema2, exports, opts) {
	if (schema2.exportsRegistered) return;
	schema2.exportsRegistered = true;
	for (const [name, moduleExport] of Object.entries(exports)) {
		if (name === "default") continue;
		if (!isModuleExport(moduleExport)) {
			if (opts?.ignoreNonModuleExports) continue;
			throw new TypeError("exporting something that is not a spacetime export");
		}
		checkExportContext(moduleExport, schema2);
		moduleExport[registerExport](schema2, name);
	}
}
function schema(entries, moduleSettings) {
	return new Schema(new SchemaInner((ctx2) => {
		ctx2.moduleDef.environment = environmentDeclarations(moduleSettings?.env ?? {});
		if (moduleSettings?.CASE_CONVERSION_POLICY != null) ctx2.setCaseConversionPolicy(moduleSettings.CASE_CONVERSION_POLICY);
		const tableSchemas = {};
		for (const [accName, entry] of Object.entries(entries)) {
			const mount = resolveSubmoduleEntry(accName, entry);
			if (mount !== void 0) {
				const { submodule, canonicalName } = mount;
				const { rawDef, dispatch } = submodule.default.buildSubmoduleDispatch(submodule);
				dispatch.namespace = accName;
				ctx2.addSubmodule({
					namespace: accName,
					module: rawDef
				});
				if (canonicalName !== void 0) ctx2.moduleDef.explicitNames.entries.push({
					tag: "Namespace",
					value: {
						sourceName: accName,
						canonicalName
					}
				});
				ctx2.submoduleDispatchInfos.push(dispatch);
				continue;
			}
			if (!isUntypedTableSchema(entry)) throw new TypeError(`schema entry '${accName}' must be a table, a submodule namespace object, or a \`{ name, module }\` submodule mount`);
			const table2 = entry;
			const tableDef = table2.tableDef(ctx2, accName);
			tableSchemas[accName] = tableToSchema(accName, table2, tableDef);
			const tableSourceNames = ctx2.tableSourceNames.get(table2);
			if (tableSourceNames === void 0) ctx2.tableSourceNames.set(table2, [tableDef.sourceName]);
			else tableSourceNames.push(tableDef.sourceName);
			ctx2.moduleDef.tables.push(tableDef);
			if (table2.schedule) ctx2.pendingSchedules.push({
				table: table2,
				tableName: tableDef.sourceName,
				scheduleAtCol: table2.schedule.scheduleAtCol,
				reducer: table2.schedule.reducer
			});
			if (table2.tableName) ctx2.moduleDef.explicitNames.entries.push({
				tag: "Table",
				value: {
					sourceName: accName,
					canonicalName: table2.tableName
				}
			});
		}
		return {
			tables: tableSchemas,
			env: moduleSettings?.env ?? {}
		};
	}));
}
var import_object_inspect = __toESM(require_object_inspect());
var fmtLog = (...data) => data.map((x) => typeof x === "string" ? x : (0, import_object_inspect.default)(x)).join(" ");
var console_level_error = 0;
var console_level_warn = 1;
var console_level_info = 2;
var console_level_debug = 3;
var console_level_trace = 4;
var timerMap = /* @__PURE__ */ new Map();
var console2 = {
	__proto__: {},
	[Symbol.toStringTag]: "console",
	assert: (condition = false, ...data) => {
		if (!condition) sys2.console_log(console_level_error, fmtLog(...data));
	},
	clear: () => {},
	debug: (...data) => {
		sys2.console_log(console_level_debug, fmtLog(...data));
	},
	error: (...data) => {
		sys2.console_log(console_level_error, fmtLog(...data));
	},
	info: (...data) => {
		sys2.console_log(console_level_info, fmtLog(...data));
	},
	log: (...data) => {
		sys2.console_log(console_level_info, fmtLog(...data));
	},
	table: (tabularData, _properties) => {
		sys2.console_log(console_level_info, fmtLog(tabularData));
	},
	trace: (...data) => {
		sys2.console_log(console_level_trace, fmtLog(...data));
	},
	warn: (...data) => {
		sys2.console_log(console_level_warn, fmtLog(...data));
	},
	dir: (_item, _options) => {},
	dirxml: (..._data) => {},
	count: (_label = "default") => {},
	countReset: (_label = "default") => {},
	group: (..._data) => {},
	groupCollapsed: (..._data) => {},
	groupEnd: () => {},
	time: (label = "default") => {
		if (timerMap.has(label)) {
			sys2.console_log(console_level_warn, `Timer '${label}' already exists.`);
			return;
		}
		timerMap.set(label, sys2.console_timer_start(label));
	},
	timeLog: (label = "default", ...data) => {
		sys2.console_log(console_level_info, fmtLog(label, ...data));
	},
	timeEnd: (label = "default") => {
		const spanId = timerMap.get(label);
		if (spanId === void 0) {
			sys2.console_log(console_level_warn, `Timer '${label}' does not exist.`);
			return;
		}
		sys2.console_timer_end(spanId);
		timerMap.delete(label);
	},
	timeStamp: () => {},
	profile: () => {},
	profileEnd: () => {}
};
globalThis.console = console2;

//#endregion
//#region C:/Users/aidan/PairPad/spacetimedb/src/index.ts
const MAX_NAME_LENGTH = 30;
const SESSION_ID_LENGTH = 8;
const SESSION_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
const spacetimedb = schema({
	sessions: table({ public: true }, {
		sessionID: t.string().primaryKey(),
		createdTime: t.timestamp(),
		owner: t.identity()
	}),
	members: table({ public: true }, {
		name: t.string(),
		isOwner: t.bool(),
		identity: t.identity(),
		sessionID: t.string(),
		id: t.u64().primaryKey().autoInc()
	})
});
const init = spacetimedb.init((_ctx) => {});
const onConnect = spacetimedb.clientConnected((_ctx) => {});
const onDisconnect = spacetimedb.clientDisconnected((_ctx) => {});
const generateSessionID = (randomInt) => {
	let sessionID = "";
	for (let i = 0; i < SESSION_ID_LENGTH; i++) {
		const index = randomInt(0, 35);
		sessionID += SESSION_ID_ALPHABET[index];
	}
	return sessionID;
};
const createSession = spacetimedb.reducer({ displayName: t.string() }, (ctx, { displayName }) => {
	displayName = displayName.trim();
	if (!(displayName.length <= MAX_NAME_LENGTH && displayName.length > 0)) throw new SenderError("invalid name");
	let sessionID = void 0;
	for (let i = 0; i < 5; i++) {
		const candidateID = generateSessionID((min, max) => ctx.random.integerInRange(min, max));
		if (!ctx.db.sessions.sessionID.find(candidateID)) {
			sessionID = candidateID;
			break;
		}
	}
	if (sessionID === void 0) throw new SenderError("Could not create a session, please try again.");
	ctx.db.sessions.insert({
		sessionID,
		createdTime: ctx.timestamp,
		owner: ctx.sender
	});
	ctx.db.members.insert({
		name: displayName,
		isOwner: true,
		identity: ctx.sender,
		sessionID,
		id: 0n
	});
});

//#endregion
export { createSession, spacetimedb as default, init, onConnect, onDisconnect };
//# debugId=4eb51259-7d47-4c8a-aeb9-4193cb808635
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibmFtZXMiOlsiX19jcmVhdGUiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2dldFByb3RvT2YiLCJfX2hhc093blByb3AiLCJfX2NvbW1vbkpTIiwiX19jb3B5UHJvcHMiLCJfX3RvRVNNIiwiI2Vuc3VyZSIsIiNtb2R1bGVEZWYiLCIjcmVnaXN0ZXJDb21wb3VuZFR5cGVSZWN1cnNpdmVseSIsIiNjb21wb3VuZFR5cGVzIiwiI2JvZHkiLCIjaW5uZXIiLCIjZnJvbSIsIiN0byIsIiNiYWNrZW5kIiwiI3NlbmRlckF1dGgiLCIjcmFuZG9tIiwiI3V1aWRDb3VudGVyIiwiI2lkZW50aXR5IiwiI3NjaGVtYSIsIiNjb25zdW1lclJlZHVjZXJDb3VudCIsIiNjb25zdW1lclByb2NlZHVyZUNvdW50IiwiI2NvbnN1bWVyQW5vblZpZXdDb3VudCIsIiNjb25zdW1lclZpZXdDb3VudCIsIiNmbGF0U3VibW9kdWxlcyIsIiNyZWR1Y2VyQXJnc0Rlc2VyaWFsaXplcnMiLCIjZGJWaWV3IiwiI2RiVmlld18iLCIjc3VibW9kdWxlQXNWaWV3c18iLCIjcmVkdWNlckN0eCIsIiNyZWR1Y2VyQ3R4XyIsIiNjb25zdW1lckFzIiwiI2NvbnN1bWVyQXNfIiwiI2dldFN1Ym1vZHVsZURiVmlldyIsIiNnZXRTdWJtb2R1bGVBc1ZpZXdzIiwiI2dldFN1Ym1vZHVsZVF1ZXJ5QnVpbGRlciIsIiNkaXNwYXRjaGVzIiwiI2FzVmlld3MiLCIjZmluYWxpemF0aW9uUmVnaXN0cnkiLCIjaWQiLCIjZGV0YWNoIiwiI2h0dHAiLCIjc2xlZXAiLCIjY2hpbGRTZWVkUmFuZG9tIiwiI3BhcmVudFByZWZpeCIsIiNjdHgiXSwic291cmNlcyI6WyJDOi9Vc2Vycy9haWRhbi9QYWlyUGFkL3NwYWNldGltZWRiL25vZGVfbW9kdWxlcy9oZWFkZXJzLXBvbHlmaWxsL2xpYi9pbmRleC5tanMiLCJDOi9Vc2Vycy9haWRhbi9QYWlyUGFkL3NwYWNldGltZWRiL25vZGVfbW9kdWxlcy9zcGFjZXRpbWVkYi9kaXN0L3NlcnZlci9pbmRleC5tanMiLCJDOi9Vc2Vycy9haWRhbi9QYWlyUGFkL3NwYWNldGltZWRiL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19jcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xyXG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xyXG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XHJcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xyXG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xyXG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxudmFyIF9fY29tbW9uSlMgPSAoY2IsIG1vZCkgPT4gZnVuY3Rpb24gX19yZXF1aXJlKCkge1xyXG4gIHJldHVybiBtb2QgfHwgKDAsIGNiW19fZ2V0T3duUHJvcE5hbWVzKGNiKVswXV0pKChtb2QgPSB7IGV4cG9ydHM6IHt9IH0pLmV4cG9ydHMsIG1vZCksIG1vZC5leHBvcnRzO1xyXG59O1xyXG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xyXG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcclxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcclxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XHJcbiAgfVxyXG4gIHJldHVybiB0bztcclxufTtcclxudmFyIF9fdG9FU00gPSAobW9kLCBpc05vZGVNb2RlLCB0YXJnZXQpID0+ICh0YXJnZXQgPSBtb2QgIT0gbnVsbCA/IF9fY3JlYXRlKF9fZ2V0UHJvdG9PZihtb2QpKSA6IHt9LCBfX2NvcHlQcm9wcyhcclxuICAvLyBJZiB0aGUgaW1wb3J0ZXIgaXMgaW4gbm9kZSBjb21wYXRpYmlsaXR5IG1vZGUgb3IgdGhpcyBpcyBub3QgYW4gRVNNXHJcbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cclxuICAvLyBjb21wYXRpYmxlIHRyYW5zZm9ybSAoaS5lLiBcIl9fZXNNb2R1bGVcIiBoYXMgbm90IGJlZW4gc2V0KSwgdGhlbiBzZXRcclxuICAvLyBcImRlZmF1bHRcIiB0byB0aGUgQ29tbW9uSlMgXCJtb2R1bGUuZXhwb3J0c1wiIGZvciBub2RlIGNvbXBhdGliaWxpdHkuXHJcbiAgaXNOb2RlTW9kZSB8fCAhbW9kIHx8ICFtb2QuX19lc01vZHVsZSA/IF9fZGVmUHJvcCh0YXJnZXQsIFwiZGVmYXVsdFwiLCB7IHZhbHVlOiBtb2QsIGVudW1lcmFibGU6IHRydWUgfSkgOiB0YXJnZXQsXHJcbiAgbW9kXHJcbikpO1xyXG5cclxuLy8gbm9kZV9tb2R1bGVzL3NldC1jb29raWUtcGFyc2VyL2xpYi9zZXQtY29va2llLmpzXHJcbnZhciByZXF1aXJlX3NldF9jb29raWUgPSBfX2NvbW1vbkpTKHtcclxuICBcIm5vZGVfbW9kdWxlcy9zZXQtY29va2llLXBhcnNlci9saWIvc2V0LWNvb2tpZS5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgZGVmYXVsdFBhcnNlT3B0aW9ucyA9IHtcclxuICAgICAgZGVjb2RlVmFsdWVzOiB0cnVlLFxyXG4gICAgICBtYXA6IGZhbHNlLFxyXG4gICAgICBzaWxlbnQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gaXNOb25FbXB0eVN0cmluZyhzdHIpIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgISFzdHIudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VTdHJpbmcoc2V0Q29va2llVmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgdmFyIHBhcnRzID0gc2V0Q29va2llVmFsdWUuc3BsaXQoXCI7XCIpLmZpbHRlcihpc05vbkVtcHR5U3RyaW5nKTtcclxuICAgICAgdmFyIG5hbWVWYWx1ZVBhaXJTdHIgPSBwYXJ0cy5zaGlmdCgpO1xyXG4gICAgICB2YXIgcGFyc2VkID0gcGFyc2VOYW1lVmFsdWVQYWlyKG5hbWVWYWx1ZVBhaXJTdHIpO1xyXG4gICAgICB2YXIgbmFtZSA9IHBhcnNlZC5uYW1lO1xyXG4gICAgICB2YXIgdmFsdWUgPSBwYXJzZWQudmFsdWU7XHJcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcnNlT3B0aW9ucywgb3B0aW9ucykgOiBkZWZhdWx0UGFyc2VPcHRpb25zO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhbHVlID0gb3B0aW9ucy5kZWNvZGVWYWx1ZXMgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpIDogdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgXCJzZXQtY29va2llLXBhcnNlciBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBkZWNvZGluZyBhIGNvb2tpZSB3aXRoIHZhbHVlICdcIiArIHZhbHVlICsgXCInLiBTZXQgb3B0aW9ucy5kZWNvZGVWYWx1ZXMgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGZlYXR1cmUuXCIsXHJcbiAgICAgICAgICBlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgY29va2llID0ge1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgdmFsdWVcclxuICAgICAgfTtcclxuICAgICAgcGFydHMuZm9yRWFjaChmdW5jdGlvbihwYXJ0KSB7XHJcbiAgICAgICAgdmFyIHNpZGVzID0gcGFydC5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgdmFyIGtleSA9IHNpZGVzLnNoaWZ0KCkudHJpbUxlZnQoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciB2YWx1ZTIgPSBzaWRlcy5qb2luKFwiPVwiKTtcclxuICAgICAgICBpZiAoa2V5ID09PSBcImV4cGlyZXNcIikge1xyXG4gICAgICAgICAgY29va2llLmV4cGlyZXMgPSBuZXcgRGF0ZSh2YWx1ZTIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1heC1hZ2VcIikge1xyXG4gICAgICAgICAgY29va2llLm1heEFnZSA9IHBhcnNlSW50KHZhbHVlMiwgMTApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNlY3VyZVwiKSB7XHJcbiAgICAgICAgICBjb29raWUuc2VjdXJlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJodHRwb25seVwiKSB7XHJcbiAgICAgICAgICBjb29raWUuaHR0cE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNhbWVzaXRlXCIpIHtcclxuICAgICAgICAgIGNvb2tpZS5zYW1lU2l0ZSA9IHZhbHVlMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29va2llW2tleV0gPSB2YWx1ZTI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGNvb2tpZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlTmFtZVZhbHVlUGFpcihuYW1lVmFsdWVQYWlyU3RyKSB7XHJcbiAgICAgIHZhciBuYW1lID0gXCJcIjtcclxuICAgICAgdmFyIHZhbHVlID0gXCJcIjtcclxuICAgICAgdmFyIG5hbWVWYWx1ZUFyciA9IG5hbWVWYWx1ZVBhaXJTdHIuc3BsaXQoXCI9XCIpO1xyXG4gICAgICBpZiAobmFtZVZhbHVlQXJyLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBuYW1lID0gbmFtZVZhbHVlQXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgdmFsdWUgPSBuYW1lVmFsdWVBcnIuam9pbihcIj1cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgPSBuYW1lVmFsdWVQYWlyU3RyO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IG5hbWUsIHZhbHVlIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZShpbnB1dCwgb3B0aW9ucykge1xyXG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJzZU9wdGlvbnMsIG9wdGlvbnMpIDogZGVmYXVsdFBhcnNlT3B0aW9ucztcclxuICAgICAgaWYgKCFpbnB1dCkge1xyXG4gICAgICAgIGlmICghb3B0aW9ucy5tYXApIHtcclxuICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoaW5wdXQuaGVhZGVycykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQuaGVhZGVycy5nZXRTZXRDb29raWUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgaW5wdXQgPSBpbnB1dC5oZWFkZXJzLmdldFNldENvb2tpZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuaGVhZGVyc1tcInNldC1jb29raWVcIl0pIHtcclxuICAgICAgICAgIGlucHV0ID0gaW5wdXQuaGVhZGVyc1tcInNldC1jb29raWVcIl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBzY2ggPSBpbnB1dC5oZWFkZXJzW09iamVjdC5rZXlzKGlucHV0LmhlYWRlcnMpLmZpbmQoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJzZXQtY29va2llXCI7XHJcbiAgICAgICAgICB9KV07XHJcbiAgICAgICAgICBpZiAoIXNjaCAmJiBpbnB1dC5oZWFkZXJzLmNvb2tpZSAmJiAhb3B0aW9ucy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgICAgIFwiV2FybmluZzogc2V0LWNvb2tpZS1wYXJzZXIgYXBwZWFycyB0byBoYXZlIGJlZW4gY2FsbGVkIG9uIGEgcmVxdWVzdCBvYmplY3QuIEl0IGlzIGRlc2lnbmVkIHRvIHBhcnNlIFNldC1Db29raWUgaGVhZGVycyBmcm9tIHJlc3BvbnNlcywgbm90IENvb2tpZSBoZWFkZXJzIGZyb20gcmVxdWVzdHMuIFNldCB0aGUgb3B0aW9uIHtzaWxlbnQ6IHRydWV9IHRvIHN1cHByZXNzIHRoaXMgd2FybmluZy5cIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5wdXQgPSBzY2g7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcclxuICAgICAgICBpbnB1dCA9IFtpbnB1dF07XHJcbiAgICAgIH1cclxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyc2VPcHRpb25zLCBvcHRpb25zKSA6IGRlZmF1bHRQYXJzZU9wdGlvbnM7XHJcbiAgICAgIGlmICghb3B0aW9ucy5tYXApIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQuZmlsdGVyKGlzTm9uRW1wdHlTdHJpbmcpLm1hcChmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICAgIHJldHVybiBwYXJzZVN0cmluZyhzdHIsIG9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb29raWVzID0ge307XHJcbiAgICAgICAgcmV0dXJuIGlucHV0LmZpbHRlcihpc05vbkVtcHR5U3RyaW5nKS5yZWR1Y2UoZnVuY3Rpb24oY29va2llczIsIHN0cikge1xyXG4gICAgICAgICAgdmFyIGNvb2tpZSA9IHBhcnNlU3RyaW5nKHN0ciwgb3B0aW9ucyk7XHJcbiAgICAgICAgICBjb29raWVzMltjb29raWUubmFtZV0gPSBjb29raWU7XHJcbiAgICAgICAgICByZXR1cm4gY29va2llczI7XHJcbiAgICAgICAgfSwgY29va2llcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNwbGl0Q29va2llc1N0cmluZzIoY29va2llc1N0cmluZykge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb29raWVzU3RyaW5nKSkge1xyXG4gICAgICAgIHJldHVybiBjb29raWVzU3RyaW5nO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgY29va2llc1N0cmluZyAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgY29va2llc1N0cmluZ3MgPSBbXTtcclxuICAgICAgdmFyIHBvcyA9IDA7XHJcbiAgICAgIHZhciBzdGFydDtcclxuICAgICAgdmFyIGNoO1xyXG4gICAgICB2YXIgbGFzdENvbW1hO1xyXG4gICAgICB2YXIgbmV4dFN0YXJ0O1xyXG4gICAgICB2YXIgY29va2llc1NlcGFyYXRvckZvdW5kO1xyXG4gICAgICBmdW5jdGlvbiBza2lwV2hpdGVzcGFjZSgpIHtcclxuICAgICAgICB3aGlsZSAocG9zIDwgY29va2llc1N0cmluZy5sZW5ndGggJiYgL1xccy8udGVzdChjb29raWVzU3RyaW5nLmNoYXJBdChwb3MpKSkge1xyXG4gICAgICAgICAgcG9zICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgICBmdW5jdGlvbiBub3RTcGVjaWFsQ2hhcigpIHtcclxuICAgICAgICBjaCA9IGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcyk7XHJcbiAgICAgICAgcmV0dXJuIGNoICE9PSBcIj1cIiAmJiBjaCAhPT0gXCI7XCIgJiYgY2ggIT09IFwiLFwiO1xyXG4gICAgICB9XHJcbiAgICAgIHdoaWxlIChwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aCkge1xyXG4gICAgICAgIHN0YXJ0ID0gcG9zO1xyXG4gICAgICAgIGNvb2tpZXNTZXBhcmF0b3JGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIHdoaWxlIChza2lwV2hpdGVzcGFjZSgpKSB7XHJcbiAgICAgICAgICBjaCA9IGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcyk7XHJcbiAgICAgICAgICBpZiAoY2ggPT09IFwiLFwiKSB7XHJcbiAgICAgICAgICAgIGxhc3RDb21tYSA9IHBvcztcclxuICAgICAgICAgICAgcG9zICs9IDE7XHJcbiAgICAgICAgICAgIHNraXBXaGl0ZXNwYWNlKCk7XHJcbiAgICAgICAgICAgIG5leHRTdGFydCA9IHBvcztcclxuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGNvb2tpZXNTdHJpbmcubGVuZ3RoICYmIG5vdFNwZWNpYWxDaGFyKCkpIHtcclxuICAgICAgICAgICAgICBwb3MgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9zIDwgY29va2llc1N0cmluZy5sZW5ndGggJiYgY29va2llc1N0cmluZy5jaGFyQXQocG9zKSA9PT0gXCI9XCIpIHtcclxuICAgICAgICAgICAgICBjb29raWVzU2VwYXJhdG9yRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHBvcyA9IG5leHRTdGFydDtcclxuICAgICAgICAgICAgICBjb29raWVzU3RyaW5ncy5wdXNoKGNvb2tpZXNTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0LCBsYXN0Q29tbWEpKTtcclxuICAgICAgICAgICAgICBzdGFydCA9IHBvcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBwb3MgPSBsYXN0Q29tbWEgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwb3MgKz0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb29raWVzU2VwYXJhdG9yRm91bmQgfHwgcG9zID49IGNvb2tpZXNTdHJpbmcubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjb29raWVzU3RyaW5ncy5wdXNoKGNvb2tpZXNTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0LCBjb29raWVzU3RyaW5nLmxlbmd0aCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY29va2llc1N0cmluZ3M7XHJcbiAgICB9XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xyXG4gICAgbW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcclxuICAgIG1vZHVsZS5leHBvcnRzLnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XHJcbiAgICBtb2R1bGUuZXhwb3J0cy5zcGxpdENvb2tpZXNTdHJpbmcgPSBzcGxpdENvb2tpZXNTdHJpbmcyO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBzcmMvSGVhZGVycy50c1xyXG52YXIgaW1wb3J0X3NldF9jb29raWVfcGFyc2VyID0gX190b0VTTShyZXF1aXJlX3NldF9jb29raWUoKSk7XHJcblxyXG4vLyBzcmMvdXRpbHMvbm9ybWFsaXplSGVhZGVyTmFtZS50c1xyXG52YXIgSEVBREVSU19JTlZBTElEX0NIQVJBQ1RFUlMgPSAvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+XS9pO1xyXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpIHtcclxuICBpZiAoSEVBREVSU19JTlZBTElEX0NIQVJBQ1RFUlMudGVzdChuYW1lKSB8fCBuYW1lLnRyaW0oKSA9PT0gXCJcIikge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lXCIpO1xyXG4gIH1cclxuICByZXR1cm4gbmFtZS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxuLy8gc3JjL3V0aWxzL25vcm1hbGl6ZUhlYWRlclZhbHVlLnRzXHJcbnZhciBjaGFyQ29kZXNUb1JlbW92ZSA9IFtcclxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDEwKSxcclxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDEzKSxcclxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDkpLFxyXG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoMzIpXHJcbl07XHJcbnZhciBIRUFERVJfVkFMVUVfUkVNT1ZFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXHJcbiAgYCheWyR7Y2hhckNvZGVzVG9SZW1vdmUuam9pbihcIlwiKX1dfCRbJHtjaGFyQ29kZXNUb1JlbW92ZS5qb2luKFwiXCIpfV0pYCxcclxuICBcImdcIlxyXG4pO1xyXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXJWYWx1ZSh2YWx1ZSkge1xyXG4gIGNvbnN0IG5leHRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoSEVBREVSX1ZBTFVFX1JFTU9WRV9SRUdFWFAsIFwiXCIpO1xyXG4gIHJldHVybiBuZXh0VmFsdWU7XHJcbn1cclxuXHJcbi8vIHNyYy91dGlscy9pc1ZhbGlkSGVhZGVyTmFtZS50c1xyXG5mdW5jdGlvbiBpc1ZhbGlkSGVhZGVyTmFtZSh2YWx1ZSkge1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xyXG4gICAgaWYgKGNoYXJhY3RlciA+IDEyNyB8fCAhaXNUb2tlbihjaGFyYWN0ZXIpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuZnVuY3Rpb24gaXNUb2tlbih2YWx1ZSkge1xyXG4gIHJldHVybiAhW1xyXG4gICAgMTI3LFxyXG4gICAgMzIsXHJcbiAgICBcIihcIixcclxuICAgIFwiKVwiLFxyXG4gICAgXCI8XCIsXHJcbiAgICBcIj5cIixcclxuICAgIFwiQFwiLFxyXG4gICAgXCIsXCIsXHJcbiAgICBcIjtcIixcclxuICAgIFwiOlwiLFxyXG4gICAgXCJcXFxcXCIsXHJcbiAgICAnXCInLFxyXG4gICAgXCIvXCIsXHJcbiAgICBcIltcIixcclxuICAgIFwiXVwiLFxyXG4gICAgXCI/XCIsXHJcbiAgICBcIj1cIixcclxuICAgIFwie1wiLFxyXG4gICAgXCJ9XCJcclxuICBdLmluY2x1ZGVzKHZhbHVlKTtcclxufVxyXG5cclxuLy8gc3JjL3V0aWxzL2lzVmFsaWRIZWFkZXJWYWx1ZS50c1xyXG5mdW5jdGlvbiBpc1ZhbGlkSGVhZGVyVmFsdWUodmFsdWUpIHtcclxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGlmICh2YWx1ZS50cmltKCkgIT09IHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGNoYXJhY3RlciA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIC8vIE5VTC5cclxuICAgICAgY2hhcmFjdGVyID09PSAwIHx8IC8vIEhUVFAgbmV3bGluZSBieXRlcy5cclxuICAgICAgY2hhcmFjdGVyID09PSAxMCB8fCBjaGFyYWN0ZXIgPT09IDEzXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLy8gc3JjL0hlYWRlcnMudHNcclxudmFyIE5PUk1BTElaRURfSEVBREVSUyA9IFN5bWJvbChcIm5vcm1hbGl6ZWRIZWFkZXJzXCIpO1xyXG52YXIgUkFXX0hFQURFUl9OQU1FUyA9IFN5bWJvbChcInJhd0hlYWRlck5hbWVzXCIpO1xyXG52YXIgSEVBREVSX1ZBTFVFX0RFTElNSVRFUiA9IFwiLCBcIjtcclxudmFyIF9hLCBfYiwgX2M7XHJcbnZhciBIZWFkZXJzID0gY2xhc3MgX0hlYWRlcnMge1xyXG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcclxuICAgIC8vIE5vcm1hbGl6ZWQgaGVhZGVyIHtcIm5hbWVcIjpcImEsIGJcIn0gc3RvcmFnZS5cclxuICAgIHRoaXNbX2FdID0ge307XHJcbiAgICAvLyBLZWVwcyB0aGUgbWFwcGluZyBiZXR3ZWVuIHRoZSByYXcgaGVhZGVyIG5hbWVcclxuICAgIC8vIGFuZCB0aGUgbm9ybWFsaXplZCBoZWFkZXIgbmFtZSB0byBlYXNlIHRoZSBsb29rdXAuXHJcbiAgICB0aGlzW19iXSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XHJcbiAgICB0aGlzW19jXSA9IFwiSGVhZGVyc1wiO1xyXG4gICAgaWYgKFtcIkhlYWRlcnNcIiwgXCJIZWFkZXJzUG9seWZpbGxcIl0uaW5jbHVkZXMoaW5pdD8uY29uc3RydWN0b3IubmFtZSkgfHwgaW5pdCBpbnN0YW5jZW9mIF9IZWFkZXJzIHx8IHR5cGVvZiBnbG9iYWxUaGlzLkhlYWRlcnMgIT09IFwidW5kZWZpbmVkXCIgJiYgaW5pdCBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuSGVhZGVycykge1xyXG4gICAgICBjb25zdCBpbml0aWFsSGVhZGVycyA9IGluaXQ7XHJcbiAgICAgIGluaXRpYWxIZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xyXG4gICAgICB9LCB0aGlzKTtcclxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpbml0KSkge1xyXG4gICAgICBpbml0LmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcclxuICAgICAgICB0aGlzLmFwcGVuZChcclxuICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oSEVBREVSX1ZBTFVFX0RFTElNSVRFUikgOiB2YWx1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChpbml0KSB7XHJcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQpLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGluaXRbbmFtZV07XHJcbiAgICAgICAgdGhpcy5hcHBlbmQoXHJcbiAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKEhFQURFUl9WQUxVRV9ERUxJTUlURVIpIDogdmFsdWVcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgWyhfYSA9IE5PUk1BTElaRURfSEVBREVSUywgX2IgPSBSQVdfSEVBREVSX05BTUVTLCBfYyA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLml0ZXJhdG9yKV0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XHJcbiAgfVxyXG4gICprZXlzKCkge1xyXG4gICAgZm9yIChjb25zdCBbbmFtZV0gb2YgdGhpcy5lbnRyaWVzKCkpIHtcclxuICAgICAgeWllbGQgbmFtZTtcclxuICAgIH1cclxuICB9XHJcbiAgKnZhbHVlcygpIHtcclxuICAgIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIHRoaXMuZW50cmllcygpKSB7XHJcbiAgICAgIHlpZWxkIHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuICAqZW50cmllcygpIHtcclxuICAgIGxldCBzb3J0ZWRLZXlzID0gT2JqZWN0LmtleXModGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdKS5zb3J0KFxyXG4gICAgICAoYSwgYikgPT4gYS5sb2NhbGVDb21wYXJlKGIpXHJcbiAgICApO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHNvcnRlZEtleXMpIHtcclxuICAgICAgaWYgKG5hbWUgPT09IFwic2V0LWNvb2tpZVwiKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB0aGlzLmdldFNldENvb2tpZSgpKSB7XHJcbiAgICAgICAgICB5aWVsZCBbbmFtZSwgdmFsdWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB5aWVsZCBbbmFtZSwgdGhpcy5nZXQobmFtZSldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBib29sZWFuIHN0YXRpbmcgd2hldGhlciBhIGBIZWFkZXJzYCBvYmplY3QgY29udGFpbnMgYSBjZXJ0YWluIGhlYWRlci5cclxuICAgKi9cclxuICBoYXMobmFtZSkge1xyXG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGhlYWRlciBuYW1lIFwiJHtuYW1lfVwiYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgYEJ5dGVTdHJpbmdgIHNlcXVlbmNlIG9mIGFsbCB0aGUgdmFsdWVzIG9mIGEgaGVhZGVyIHdpdGggYSBnaXZlbiBuYW1lLlxyXG4gICAqL1xyXG4gIGdldChuYW1lKSB7XHJcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihgSW52YWxpZCBoZWFkZXIgbmFtZSBcIiR7bmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXVtub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpXSA/PyBudWxsO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBTZXRzIGEgbmV3IHZhbHVlIGZvciBhbiBleGlzdGluZyBoZWFkZXIgaW5zaWRlIGEgYEhlYWRlcnNgIG9iamVjdCwgb3IgYWRkcyB0aGUgaGVhZGVyIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QuXHJcbiAgICovXHJcbiAgc2V0KG5hbWUsIHZhbHVlKSB7XHJcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpIHx8ICFpc1ZhbGlkSGVhZGVyVmFsdWUodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IG5vcm1hbGl6ZUhlYWRlclZhbHVlKHZhbHVlKTtcclxuICAgIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXVtub3JtYWxpemVkTmFtZV0gPSBub3JtYWxpemVIZWFkZXJWYWx1ZShub3JtYWxpemVkVmFsdWUpO1xyXG4gICAgdGhpc1tSQVdfSEVBREVSX05BTUVTXS5zZXQobm9ybWFsaXplZE5hbWUsIG5hbWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBcHBlbmRzIGEgbmV3IHZhbHVlIG9udG8gYW4gZXhpc3RpbmcgaGVhZGVyIGluc2lkZSBhIGBIZWFkZXJzYCBvYmplY3QsIG9yIGFkZHMgdGhlIGhlYWRlciBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxyXG4gICAqL1xyXG4gIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSB8fCAhaXNWYWxpZEhlYWRlclZhbHVlKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSBub3JtYWxpemVIZWFkZXJWYWx1ZSh2YWx1ZSk7XHJcbiAgICBsZXQgcmVzb2x2ZWRWYWx1ZSA9IHRoaXMuaGFzKG5vcm1hbGl6ZWROYW1lKSA/IGAke3RoaXMuZ2V0KG5vcm1hbGl6ZWROYW1lKX0sICR7bm9ybWFsaXplZFZhbHVlfWAgOiBub3JtYWxpemVkVmFsdWU7XHJcbiAgICB0aGlzLnNldChuYW1lLCByZXNvbHZlZFZhbHVlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogRGVsZXRlcyBhIGhlYWRlciBmcm9tIHRoZSBgSGVhZGVyc2Agb2JqZWN0LlxyXG4gICAqL1xyXG4gIGRlbGV0ZShuYW1lKSB7XHJcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5oYXMobmFtZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpO1xyXG4gICAgZGVsZXRlIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXVtub3JtYWxpemVkTmFtZV07XHJcbiAgICB0aGlzW1JBV19IRUFERVJfTkFNRVNdLmRlbGV0ZShub3JtYWxpemVkTmFtZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFRyYXZlcnNlcyB0aGUgYEhlYWRlcnNgIG9iamVjdCxcclxuICAgKiBjYWxsaW5nIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgZWFjaCBoZWFkZXIuXHJcbiAgICovXHJcbiAgZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZykge1xyXG4gICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIHRoaXMuZW50cmllcygpKSB7XHJcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHZhbHVlc1xyXG4gICAqIG9mIGFsbCBTZXQtQ29va2llIGhlYWRlcnMgYXNzb2NpYXRlZFxyXG4gICAqIHdpdGggYSByZXNwb25zZVxyXG4gICAqL1xyXG4gIGdldFNldENvb2tpZSgpIHtcclxuICAgIGNvbnN0IHNldENvb2tpZUhlYWRlciA9IHRoaXMuZ2V0KFwic2V0LWNvb2tpZVwiKTtcclxuICAgIGlmIChzZXRDb29raWVIZWFkZXIgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHNldENvb2tpZUhlYWRlciA9PT0gXCJcIikge1xyXG4gICAgICByZXR1cm4gW1wiXCJdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgwLCBpbXBvcnRfc2V0X2Nvb2tpZV9wYXJzZXIuc3BsaXRDb29raWVzU3RyaW5nKShzZXRDb29raWVIZWFkZXIpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIHNyYy9nZXRSYXdIZWFkZXJzLnRzXHJcbmZ1bmN0aW9uIGdldFJhd0hlYWRlcnMoaGVhZGVycykge1xyXG4gIGNvbnN0IHJhd0hlYWRlcnMgPSB7fTtcclxuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgaGVhZGVycy5lbnRyaWVzKCkpIHtcclxuICAgIHJhd0hlYWRlcnNbaGVhZGVyc1tSQVdfSEVBREVSX05BTUVTXS5nZXQobmFtZSldID0gdmFsdWU7XHJcbiAgfVxyXG4gIHJldHVybiByYXdIZWFkZXJzO1xyXG59XHJcblxyXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2hlYWRlcnNUb0xpc3QudHNcclxuZnVuY3Rpb24gaGVhZGVyc1RvTGlzdChoZWFkZXJzKSB7XHJcbiAgY29uc3QgaGVhZGVyc0xpc3QgPSBbXTtcclxuICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XHJcbiAgICBjb25zdCByZXNvbHZlZFZhbHVlID0gdmFsdWUuaW5jbHVkZXMoXCIsXCIpID8gdmFsdWUuc3BsaXQoXCIsXCIpLm1hcCgodmFsdWUyKSA9PiB2YWx1ZTIudHJpbSgpKSA6IHZhbHVlO1xyXG4gICAgaGVhZGVyc0xpc3QucHVzaChbbmFtZSwgcmVzb2x2ZWRWYWx1ZV0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiBoZWFkZXJzTGlzdDtcclxufVxyXG5cclxuLy8gc3JjL3RyYW5zZm9ybWVycy9oZWFkZXJzVG9TdHJpbmcudHNcclxuZnVuY3Rpb24gaGVhZGVyc1RvU3RyaW5nKGhlYWRlcnMpIHtcclxuICBjb25zdCBsaXN0ID0gaGVhZGVyc1RvTGlzdChoZWFkZXJzKTtcclxuICBjb25zdCBsaW5lcyA9IGxpc3QubWFwKChbbmFtZSwgdmFsdWVdKSA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpO1xyXG4gICAgcmV0dXJuIGAke25hbWV9OiAke3ZhbHVlcy5qb2luKFwiLCBcIil9YDtcclxuICB9KTtcclxuICByZXR1cm4gbGluZXMuam9pbihcIlxcclxcblwiKTtcclxufVxyXG5cclxuLy8gc3JjL3RyYW5zZm9ybWVycy9oZWFkZXJzVG9PYmplY3QudHNcclxudmFyIHNpbmdsZVZhbHVlSGVhZGVycyA9IFtcInVzZXItYWdlbnRcIl07XHJcbmZ1bmN0aW9uIGhlYWRlcnNUb09iamVjdChoZWFkZXJzKSB7XHJcbiAgY29uc3QgaGVhZGVyc09iamVjdCA9IHt9O1xyXG4gIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIG5hbWUpID0+IHtcclxuICAgIGNvbnN0IGlzTXVsdGlWYWx1ZSA9ICFzaW5nbGVWYWx1ZUhlYWRlcnMuaW5jbHVkZXMobmFtZS50b0xvd2VyQ2FzZSgpKSAmJiB2YWx1ZS5pbmNsdWRlcyhcIixcIik7XHJcbiAgICBoZWFkZXJzT2JqZWN0W25hbWVdID0gaXNNdWx0aVZhbHVlID8gdmFsdWUuc3BsaXQoXCIsXCIpLm1hcCgocykgPT4gcy50cmltKCkpIDogdmFsdWU7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGhlYWRlcnNPYmplY3Q7XHJcbn1cclxuXHJcbi8vIHNyYy90cmFuc2Zvcm1lcnMvc3RyaW5nVG9IZWFkZXJzLnRzXHJcbmZ1bmN0aW9uIHN0cmluZ1RvSGVhZGVycyhzdHIpIHtcclxuICBjb25zdCBsaW5lcyA9IHN0ci50cmltKCkuc3BsaXQoL1tcXHJcXG5dKy8pO1xyXG4gIHJldHVybiBsaW5lcy5yZWR1Y2UoKGhlYWRlcnMsIGxpbmUpID0+IHtcclxuICAgIGlmIChsaW5lLnRyaW0oKSA9PT0gXCJcIikge1xyXG4gICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdChcIjogXCIpO1xyXG4gICAgY29uc3QgbmFtZSA9IHBhcnRzLnNoaWZ0KCk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnRzLmpvaW4oXCI6IFwiKTtcclxuICAgIGhlYWRlcnMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH0sIG5ldyBIZWFkZXJzKCkpO1xyXG59XHJcblxyXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2xpc3RUb0hlYWRlcnMudHNcclxuZnVuY3Rpb24gbGlzdFRvSGVhZGVycyhsaXN0KSB7XHJcbiAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgbGlzdC5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpO1xyXG4gICAgdmFsdWVzLmZvckVhY2goKHZhbHVlMikgPT4ge1xyXG4gICAgICBoZWFkZXJzLmFwcGVuZChuYW1lLCB2YWx1ZTIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGhlYWRlcnM7XHJcbn1cclxuXHJcbi8vIHNyYy90cmFuc2Zvcm1lcnMvcmVkdWNlSGVhZGVyc09iamVjdC50c1xyXG5mdW5jdGlvbiByZWR1Y2VIZWFkZXJzT2JqZWN0KGhlYWRlcnMsIHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhoZWFkZXJzKS5yZWR1Y2UoKG5leHRIZWFkZXJzLCBuYW1lKSA9PiB7XHJcbiAgICByZXR1cm4gcmVkdWNlcihuZXh0SGVhZGVycywgbmFtZSwgaGVhZGVyc1tuYW1lXSk7XHJcbiAgfSwgaW5pdGlhbFN0YXRlKTtcclxufVxyXG5cclxuLy8gc3JjL3RyYW5zZm9ybWVycy9vYmplY3RUb0hlYWRlcnMudHNcclxuZnVuY3Rpb24gb2JqZWN0VG9IZWFkZXJzKGhlYWRlcnNPYmplY3QpIHtcclxuICByZXR1cm4gcmVkdWNlSGVhZGVyc09iamVjdChcclxuICAgIGhlYWRlcnNPYmplY3QsXHJcbiAgICAoaGVhZGVycywgbmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgY29uc3QgdmFsdWVzID0gW10uY29uY2F0KHZhbHVlKS5maWx0ZXIoQm9vbGVhbik7XHJcbiAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZTIpID0+IHtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChuYW1lLCB2YWx1ZTIpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9LFxyXG4gICAgbmV3IEhlYWRlcnMoKVxyXG4gICk7XHJcbn1cclxuXHJcbi8vIHNyYy90cmFuc2Zvcm1lcnMvZmxhdHRlbkhlYWRlcnNMaXN0LnRzXHJcbmZ1bmN0aW9uIGZsYXR0ZW5IZWFkZXJzTGlzdChsaXN0KSB7XHJcbiAgcmV0dXJuIGxpc3QubWFwKChbbmFtZSwgdmFsdWVzXSkgPT4ge1xyXG4gICAgcmV0dXJuIFtuYW1lLCBbXS5jb25jYXQodmFsdWVzKS5qb2luKFwiLCBcIildO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2ZsYXR0ZW5IZWFkZXJzT2JqZWN0LnRzXHJcbmZ1bmN0aW9uIGZsYXR0ZW5IZWFkZXJzT2JqZWN0KGhlYWRlcnNPYmplY3QpIHtcclxuICByZXR1cm4gcmVkdWNlSGVhZGVyc09iamVjdChcclxuICAgIGhlYWRlcnNPYmplY3QsXHJcbiAgICAoaGVhZGVycywgbmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgaGVhZGVyc1tuYW1lXSA9IFtdLmNvbmNhdCh2YWx1ZSkuam9pbihcIiwgXCIpO1xyXG4gICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH0sXHJcbiAgICB7fVxyXG4gICk7XHJcbn1cclxuZXhwb3J0IHtcclxuICBIZWFkZXJzLFxyXG4gIGZsYXR0ZW5IZWFkZXJzTGlzdCxcclxuICBmbGF0dGVuSGVhZGVyc09iamVjdCxcclxuICBnZXRSYXdIZWFkZXJzLFxyXG4gIGhlYWRlcnNUb0xpc3QsXHJcbiAgaGVhZGVyc1RvT2JqZWN0LFxyXG4gIGhlYWRlcnNUb1N0cmluZyxcclxuICBsaXN0VG9IZWFkZXJzLFxyXG4gIG9iamVjdFRvSGVhZGVycyxcclxuICByZWR1Y2VIZWFkZXJzT2JqZWN0LFxyXG4gIHN0cmluZ1RvSGVhZGVyc1xyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwIiwiaW1wb3J0IHsgZW52X2dldCB9IGZyb20gJ3NwYWNldGltZTpzeXNAMi4yJztcclxuaW1wb3J0ICogYXMgX3N5c2NhbGxzMl8wIGZyb20gJ3NwYWNldGltZTpzeXNAMi4wJztcclxuaW1wb3J0IHsgbW9kdWxlSG9va3MgfSBmcm9tICdzcGFjZXRpbWU6c3lzQDIuMCc7XHJcbmltcG9ydCB7IEhlYWRlcnMgfSBmcm9tICdoZWFkZXJzLXBvbHlmaWxsJztcclxuZXhwb3J0IHsgSGVhZGVycyB9IGZyb20gJ2hlYWRlcnMtcG9seWZpbGwnO1xyXG5pbXBvcnQgKiBhcyBfc3lzY2FsbHMyXzEgZnJvbSAnc3BhY2V0aW1lOnN5c0AyLjEnO1xyXG5cclxudHlwZW9mIGdsb2JhbFRoaXMhPT1cInVuZGVmaW5lZFwiJiYoKGdsb2JhbFRoaXMuZ2xvYmFsPWdsb2JhbFRoaXMuZ2xvYmFsfHxnbG9iYWxUaGlzKSwoZ2xvYmFsVGhpcy53aW5kb3c9Z2xvYmFsVGhpcy53aW5kb3d8fGdsb2JhbFRoaXMpKTtcclxudmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcclxudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcclxudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xyXG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcclxudmFyIF9fZ2V0UHJvdG9PZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcclxudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbnZhciBfX2VzbSA9IChmbiwgcmVzKSA9PiBmdW5jdGlvbiBfX2luaXQoKSB7XHJcbiAgcmV0dXJuIGZuICYmIChyZXMgPSAoMCwgZm5bX19nZXRPd25Qcm9wTmFtZXMoZm4pWzBdXSkoZm4gPSAwKSksIHJlcztcclxufTtcclxudmFyIF9fY29tbW9uSlMgPSAoY2IsIG1vZCkgPT4gZnVuY3Rpb24gX19yZXF1aXJlKCkge1xyXG4gIHJldHVybiBtb2QgfHwgKDAsIGNiW19fZ2V0T3duUHJvcE5hbWVzKGNiKVswXV0pKChtb2QgPSB7IGV4cG9ydHM6IHt9IH0pLmV4cG9ydHMsIG1vZCksIG1vZC5leHBvcnRzO1xyXG59O1xyXG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcclxuICBmb3IgKHZhciBuYW1lIGluIGFsbClcclxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XHJcbn07XHJcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XHJcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxyXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxyXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcclxuICB9XHJcbiAgcmV0dXJuIHRvO1xyXG59O1xyXG52YXIgX190b0VTTSA9IChtb2QsIGlzTm9kZU1vZGUsIHRhcmdldCkgPT4gKHRhcmdldCA9IG1vZCAhPSBudWxsID8gX19jcmVhdGUoX19nZXRQcm90b09mKG1vZCkpIDoge30sIF9fY29weVByb3BzKFxyXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cclxuICAvLyBmaWxlIHRoYXQgaGFzIGJlZW4gY29udmVydGVkIHRvIGEgQ29tbW9uSlMgZmlsZSB1c2luZyBhIEJhYmVsLVxyXG4gIC8vIGNvbXBhdGlibGUgdHJhbnNmb3JtIChpLmUuIFwiX19lc01vZHVsZVwiIGhhcyBub3QgYmVlbiBzZXQpLCB0aGVuIHNldFxyXG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cclxuICBfX2RlZlByb3AodGFyZ2V0LCBcImRlZmF1bHRcIiwgeyB2YWx1ZTogbW9kLCBlbnVtZXJhYmxlOiB0cnVlIH0pICxcclxuICBtb2RcclxuKSk7XHJcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Jhc2U2NC1qc0AxLjUuMS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXHJcbnZhciByZXF1aXJlX2Jhc2U2NF9qcyA9IF9fY29tbW9uSlMoe1xyXG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Jhc2U2NC1qc0AxLjUuMS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXCIoZXhwb3J0cykge1xyXG4gICAgZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aDtcclxuICAgIGV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheTtcclxuICAgIGV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXkyO1xyXG4gICAgdmFyIGxvb2t1cCA9IFtdO1xyXG4gICAgdmFyIHJldkxvb2t1cCA9IFtdO1xyXG4gICAgdmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiID8gVWludDhBcnJheSA6IEFycmF5O1xyXG4gICAgdmFyIGNvZGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcclxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgbG9va3VwW2ldID0gY29kZVtpXTtcclxuICAgICAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpO1xyXG4gICAgfVxyXG4gICAgdmFyIGk7XHJcbiAgICB2YXIgbGVuO1xyXG4gICAgcmV2TG9va3VwW1wiLVwiLmNoYXJDb2RlQXQoMCldID0gNjI7XHJcbiAgICByZXZMb29rdXBbXCJfXCIuY2hhckNvZGVBdCgwKV0gPSA2MztcclxuICAgIGZ1bmN0aW9uIGdldExlbnMoYjY0KSB7XHJcbiAgICAgIHZhciBsZW4yID0gYjY0Lmxlbmd0aDtcclxuICAgICAgaWYgKGxlbjIgJSA0ID4gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoXCI9XCIpO1xyXG4gICAgICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlbjI7XHJcbiAgICAgIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuMiA/IDAgOiA0IC0gdmFsaWRMZW4gJSA0O1xyXG4gICAgICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYnl0ZUxlbmd0aChiNjQpIHtcclxuICAgICAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NCk7XHJcbiAgICAgIHZhciB2YWxpZExlbiA9IGxlbnNbMF07XHJcbiAgICAgIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdO1xyXG4gICAgICByZXR1cm4gKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzTGVuO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XHJcbiAgICAgIHJldHVybiAodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQgLSBwbGFjZUhvbGRlcnNMZW47XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0b0J5dGVBcnJheShiNjQpIHtcclxuICAgICAgdmFyIHRtcDtcclxuICAgICAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NCk7XHJcbiAgICAgIHZhciB2YWxpZExlbiA9IGxlbnNbMF07XHJcbiAgICAgIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdO1xyXG4gICAgICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKTtcclxuICAgICAgdmFyIGN1ckJ5dGUgPSAwO1xyXG4gICAgICB2YXIgbGVuMiA9IHBsYWNlSG9sZGVyc0xlbiA+IDAgPyB2YWxpZExlbiAtIDQgOiB2YWxpZExlbjtcclxuICAgICAgdmFyIGkyO1xyXG4gICAgICBmb3IgKGkyID0gMDsgaTIgPCBsZW4yOyBpMiArPSA0KSB7XHJcbiAgICAgICAgdG1wID0gcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyKV0gPDwgMTggfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAxKV0gPDwgMTIgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAyKV0gPDwgNiB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDMpXTtcclxuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCA+PiAxNiAmIDI1NTtcclxuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCA+PiA4ICYgMjU1O1xyXG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMjU1O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcclxuICAgICAgICB0bXAgPSByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIpXSA8PCAyIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMSldID4+IDQ7XHJcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAyNTU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xyXG4gICAgICAgIHRtcCA9IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMildIDw8IDEwIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMSldIDw8IDQgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAyKV0gPj4gMjtcclxuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCA+PiA4ICYgMjU1O1xyXG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMjU1O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQobnVtKSB7XHJcbiAgICAgIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgNjNdICsgbG9va3VwW251bSA+PiAxMiAmIDYzXSArIGxvb2t1cFtudW0gPj4gNiAmIDYzXSArIGxvb2t1cFtudW0gJiA2M107XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBlbmNvZGVDaHVuayh1aW50OCwgc3RhcnQsIGVuZCkge1xyXG4gICAgICB2YXIgdG1wO1xyXG4gICAgICB2YXIgb3V0cHV0ID0gW107XHJcbiAgICAgIGZvciAodmFyIGkyID0gc3RhcnQ7IGkyIDwgZW5kOyBpMiArPSAzKSB7XHJcbiAgICAgICAgdG1wID0gKHVpbnQ4W2kyXSA8PCAxNiAmIDE2NzExNjgwKSArICh1aW50OFtpMiArIDFdIDw8IDggJiA2NTI4MCkgKyAodWludDhbaTIgKyAyXSAmIDI1NSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvdXRwdXQuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGZyb21CeXRlQXJyYXkyKHVpbnQ4KSB7XHJcbiAgICAgIHZhciB0bXA7XHJcbiAgICAgIHZhciBsZW4yID0gdWludDgubGVuZ3RoO1xyXG4gICAgICB2YXIgZXh0cmFCeXRlcyA9IGxlbjIgJSAzO1xyXG4gICAgICB2YXIgcGFydHMgPSBbXTtcclxuICAgICAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODM7XHJcbiAgICAgIGZvciAodmFyIGkyID0gMCwgbGVuMjIgPSBsZW4yIC0gZXh0cmFCeXRlczsgaTIgPCBsZW4yMjsgaTIgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcclxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpMiwgaTIgKyBtYXhDaHVua0xlbmd0aCA+IGxlbjIyID8gbGVuMjIgOiBpMiArIG1heENodW5rTGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcclxuICAgICAgICB0bXAgPSB1aW50OFtsZW4yIC0gMV07XHJcbiAgICAgICAgcGFydHMucHVzaChcclxuICAgICAgICAgIGxvb2t1cFt0bXAgPj4gMl0gKyBsb29rdXBbdG1wIDw8IDQgJiA2M10gKyBcIj09XCJcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcclxuICAgICAgICB0bXAgPSAodWludDhbbGVuMiAtIDJdIDw8IDgpICsgdWludDhbbGVuMiAtIDFdO1xyXG4gICAgICAgIHBhcnRzLnB1c2goXHJcbiAgICAgICAgICBsb29rdXBbdG1wID4+IDEwXSArIGxvb2t1cFt0bXAgPj4gNCAmIDYzXSArIGxvb2t1cFt0bXAgPDwgMiAmIDYzXSArIFwiPVwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFydHMuam9pbihcIlwiKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9jb2Rlcy5qc29uXHJcbnZhciByZXF1aXJlX2NvZGVzID0gX19jb21tb25KUyh7XHJcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc3RhdHVzZXNAMi4wLjIvbm9kZV9tb2R1bGVzL3N0YXR1c2VzL2NvZGVzLmpzb25cIihleHBvcnRzLCBtb2R1bGUpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgICBcIjEwMFwiOiBcIkNvbnRpbnVlXCIsXHJcbiAgICAgIFwiMTAxXCI6IFwiU3dpdGNoaW5nIFByb3RvY29sc1wiLFxyXG4gICAgICBcIjEwMlwiOiBcIlByb2Nlc3NpbmdcIixcclxuICAgICAgXCIxMDNcIjogXCJFYXJseSBIaW50c1wiLFxyXG4gICAgICBcIjIwMFwiOiBcIk9LXCIsXHJcbiAgICAgIFwiMjAxXCI6IFwiQ3JlYXRlZFwiLFxyXG4gICAgICBcIjIwMlwiOiBcIkFjY2VwdGVkXCIsXHJcbiAgICAgIFwiMjAzXCI6IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcclxuICAgICAgXCIyMDRcIjogXCJObyBDb250ZW50XCIsXHJcbiAgICAgIFwiMjA1XCI6IFwiUmVzZXQgQ29udGVudFwiLFxyXG4gICAgICBcIjIwNlwiOiBcIlBhcnRpYWwgQ29udGVudFwiLFxyXG4gICAgICBcIjIwN1wiOiBcIk11bHRpLVN0YXR1c1wiLFxyXG4gICAgICBcIjIwOFwiOiBcIkFscmVhZHkgUmVwb3J0ZWRcIixcclxuICAgICAgXCIyMjZcIjogXCJJTSBVc2VkXCIsXHJcbiAgICAgIFwiMzAwXCI6IFwiTXVsdGlwbGUgQ2hvaWNlc1wiLFxyXG4gICAgICBcIjMwMVwiOiBcIk1vdmVkIFBlcm1hbmVudGx5XCIsXHJcbiAgICAgIFwiMzAyXCI6IFwiRm91bmRcIixcclxuICAgICAgXCIzMDNcIjogXCJTZWUgT3RoZXJcIixcclxuICAgICAgXCIzMDRcIjogXCJOb3QgTW9kaWZpZWRcIixcclxuICAgICAgXCIzMDVcIjogXCJVc2UgUHJveHlcIixcclxuICAgICAgXCIzMDdcIjogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcclxuICAgICAgXCIzMDhcIjogXCJQZXJtYW5lbnQgUmVkaXJlY3RcIixcclxuICAgICAgXCI0MDBcIjogXCJCYWQgUmVxdWVzdFwiLFxyXG4gICAgICBcIjQwMVwiOiBcIlVuYXV0aG9yaXplZFwiLFxyXG4gICAgICBcIjQwMlwiOiBcIlBheW1lbnQgUmVxdWlyZWRcIixcclxuICAgICAgXCI0MDNcIjogXCJGb3JiaWRkZW5cIixcclxuICAgICAgXCI0MDRcIjogXCJOb3QgRm91bmRcIixcclxuICAgICAgXCI0MDVcIjogXCJNZXRob2QgTm90IEFsbG93ZWRcIixcclxuICAgICAgXCI0MDZcIjogXCJOb3QgQWNjZXB0YWJsZVwiLFxyXG4gICAgICBcIjQwN1wiOiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXHJcbiAgICAgIFwiNDA4XCI6IFwiUmVxdWVzdCBUaW1lb3V0XCIsXHJcbiAgICAgIFwiNDA5XCI6IFwiQ29uZmxpY3RcIixcclxuICAgICAgXCI0MTBcIjogXCJHb25lXCIsXHJcbiAgICAgIFwiNDExXCI6IFwiTGVuZ3RoIFJlcXVpcmVkXCIsXHJcbiAgICAgIFwiNDEyXCI6IFwiUHJlY29uZGl0aW9uIEZhaWxlZFwiLFxyXG4gICAgICBcIjQxM1wiOiBcIlBheWxvYWQgVG9vIExhcmdlXCIsXHJcbiAgICAgIFwiNDE0XCI6IFwiVVJJIFRvbyBMb25nXCIsXHJcbiAgICAgIFwiNDE1XCI6IFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiLFxyXG4gICAgICBcIjQxNlwiOiBcIlJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxyXG4gICAgICBcIjQxN1wiOiBcIkV4cGVjdGF0aW9uIEZhaWxlZFwiLFxyXG4gICAgICBcIjQxOFwiOiBcIkknbSBhIFRlYXBvdFwiLFxyXG4gICAgICBcIjQyMVwiOiBcIk1pc2RpcmVjdGVkIFJlcXVlc3RcIixcclxuICAgICAgXCI0MjJcIjogXCJVbnByb2Nlc3NhYmxlIEVudGl0eVwiLFxyXG4gICAgICBcIjQyM1wiOiBcIkxvY2tlZFwiLFxyXG4gICAgICBcIjQyNFwiOiBcIkZhaWxlZCBEZXBlbmRlbmN5XCIsXHJcbiAgICAgIFwiNDI1XCI6IFwiVG9vIEVhcmx5XCIsXHJcbiAgICAgIFwiNDI2XCI6IFwiVXBncmFkZSBSZXF1aXJlZFwiLFxyXG4gICAgICBcIjQyOFwiOiBcIlByZWNvbmRpdGlvbiBSZXF1aXJlZFwiLFxyXG4gICAgICBcIjQyOVwiOiBcIlRvbyBNYW55IFJlcXVlc3RzXCIsXHJcbiAgICAgIFwiNDMxXCI6IFwiUmVxdWVzdCBIZWFkZXIgRmllbGRzIFRvbyBMYXJnZVwiLFxyXG4gICAgICBcIjQ1MVwiOiBcIlVuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zXCIsXHJcbiAgICAgIFwiNTAwXCI6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXHJcbiAgICAgIFwiNTAxXCI6IFwiTm90IEltcGxlbWVudGVkXCIsXHJcbiAgICAgIFwiNTAyXCI6IFwiQmFkIEdhdGV3YXlcIixcclxuICAgICAgXCI1MDNcIjogXCJTZXJ2aWNlIFVuYXZhaWxhYmxlXCIsXHJcbiAgICAgIFwiNTA0XCI6IFwiR2F0ZXdheSBUaW1lb3V0XCIsXHJcbiAgICAgIFwiNTA1XCI6IFwiSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWRcIixcclxuICAgICAgXCI1MDZcIjogXCJWYXJpYW50IEFsc28gTmVnb3RpYXRlc1wiLFxyXG4gICAgICBcIjUwN1wiOiBcIkluc3VmZmljaWVudCBTdG9yYWdlXCIsXHJcbiAgICAgIFwiNTA4XCI6IFwiTG9vcCBEZXRlY3RlZFwiLFxyXG4gICAgICBcIjUwOVwiOiBcIkJhbmR3aWR0aCBMaW1pdCBFeGNlZWRlZFwiLFxyXG4gICAgICBcIjUxMFwiOiBcIk5vdCBFeHRlbmRlZFwiLFxyXG4gICAgICBcIjUxMVwiOiBcIk5ldHdvcmsgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIlxyXG4gICAgfTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9pbmRleC5qc1xyXG52YXIgcmVxdWlyZV9zdGF0dXNlcyA9IF9fY29tbW9uSlMoe1xyXG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9pbmRleC5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xyXG4gICAgdmFyIGNvZGVzID0gcmVxdWlyZV9jb2RlcygpO1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzdGF0dXMyO1xyXG4gICAgc3RhdHVzMi5tZXNzYWdlID0gY29kZXM7XHJcbiAgICBzdGF0dXMyLmNvZGUgPSBjcmVhdGVNZXNzYWdlVG9TdGF0dXNDb2RlTWFwKGNvZGVzKTtcclxuICAgIHN0YXR1czIuY29kZXMgPSBjcmVhdGVTdGF0dXNDb2RlTGlzdChjb2Rlcyk7XHJcbiAgICBzdGF0dXMyLnJlZGlyZWN0ID0ge1xyXG4gICAgICAzMDA6IHRydWUsXHJcbiAgICAgIDMwMTogdHJ1ZSxcclxuICAgICAgMzAyOiB0cnVlLFxyXG4gICAgICAzMDM6IHRydWUsXHJcbiAgICAgIDMwNTogdHJ1ZSxcclxuICAgICAgMzA3OiB0cnVlLFxyXG4gICAgICAzMDg6IHRydWVcclxuICAgIH07XHJcbiAgICBzdGF0dXMyLmVtcHR5ID0ge1xyXG4gICAgICAyMDQ6IHRydWUsXHJcbiAgICAgIDIwNTogdHJ1ZSxcclxuICAgICAgMzA0OiB0cnVlXHJcbiAgICB9O1xyXG4gICAgc3RhdHVzMi5yZXRyeSA9IHtcclxuICAgICAgNTAyOiB0cnVlLFxyXG4gICAgICA1MDM6IHRydWUsXHJcbiAgICAgIDUwNDogdHJ1ZVxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VUb1N0YXR1c0NvZGVNYXAoY29kZXMyKSB7XHJcbiAgICAgIHZhciBtYXAgPSB7fTtcclxuICAgICAgT2JqZWN0LmtleXMoY29kZXMyKS5mb3JFYWNoKGZ1bmN0aW9uIGZvckVhY2hDb2RlKGNvZGUpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGNvZGVzMltjb2RlXTtcclxuICAgICAgICB2YXIgc3RhdHVzMyA9IE51bWJlcihjb2RlKTtcclxuICAgICAgICBtYXBbbWVzc2FnZS50b0xvd2VyQ2FzZSgpXSA9IHN0YXR1czM7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbWFwO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlU3RhdHVzQ29kZUxpc3QoY29kZXMyKSB7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2RlczIpLm1hcChmdW5jdGlvbiBtYXBDb2RlKGNvZGUpIHtcclxuICAgICAgICByZXR1cm4gTnVtYmVyKGNvZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldFN0YXR1c0NvZGUobWVzc2FnZSkge1xyXG4gICAgICB2YXIgbXNnID0gbWVzc2FnZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdGF0dXMyLmNvZGUsIG1zZykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3RhdHVzIG1lc3NhZ2U6IFwiJyArIG1lc3NhZ2UgKyAnXCInKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RhdHVzMi5jb2RlW21zZ107XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0dXNNZXNzYWdlKGNvZGUpIHtcclxuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RhdHVzMi5tZXNzYWdlLCBjb2RlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgc3RhdHVzIGNvZGU6IFwiICsgY29kZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0YXR1czIubWVzc2FnZVtjb2RlXTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN0YXR1czIoY29kZSkge1xyXG4gICAgICBpZiAodHlwZW9mIGNvZGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U3RhdHVzTWVzc2FnZShjb2RlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGNvZGUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29kZSBtdXN0IGJlIGEgbnVtYmVyIG9yIHN0cmluZ1wiKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgbiA9IHBhcnNlSW50KGNvZGUsIDEwKTtcclxuICAgICAgaWYgKCFpc05hTihuKSkge1xyXG4gICAgICAgIHJldHVybiBnZXRTdGF0dXNNZXNzYWdlKG4pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBnZXRTdGF0dXNDb2RlKGNvZGUpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBzcmMvdXRpbC1zdHViLnRzXHJcbnZhciB1dGlsX3N0dWJfZXhwb3J0cyA9IHt9O1xyXG5fX2V4cG9ydCh1dGlsX3N0dWJfZXhwb3J0cywge1xyXG4gIGluc3BlY3Q6ICgpID0+IGluc3BlY3RcclxufSk7XHJcbnZhciBpbnNwZWN0O1xyXG52YXIgaW5pdF91dGlsX3N0dWIgPSBfX2VzbSh7XHJcbiAgXCJzcmMvdXRpbC1zdHViLnRzXCIoKSB7XHJcbiAgICBpbnNwZWN0ID0ge307XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaW5zcGVjdEAxLjEzLjQvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L3V0aWwuaW5zcGVjdC5qc1xyXG52YXIgcmVxdWlyZV91dGlsX2luc3BlY3QgPSBfX2NvbW1vbkpTKHtcclxuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaW5zcGVjdEAxLjEzLjQvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L3V0aWwuaW5zcGVjdC5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSAoaW5pdF91dGlsX3N0dWIoKSwgX190b0NvbW1vbkpTKHV0aWxfc3R1Yl9leHBvcnRzKSkuaW5zcGVjdDtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL29iamVjdC1pbnNwZWN0QDEuMTMuNC9ub2RlX21vZHVsZXMvb2JqZWN0LWluc3BlY3QvaW5kZXguanNcclxudmFyIHJlcXVpcmVfb2JqZWN0X2luc3BlY3QgPSBfX2NvbW1vbkpTKHtcclxuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaW5zcGVjdEAxLjEzLjQvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L2luZGV4LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XHJcbiAgICB2YXIgaGFzTWFwID0gdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiICYmIE1hcC5wcm90b3R5cGU7XHJcbiAgICB2YXIgbWFwU2l6ZURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIGhhc01hcCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTWFwLnByb3RvdHlwZSwgXCJzaXplXCIpIDogbnVsbDtcclxuICAgIHZhciBtYXBTaXplID0gaGFzTWFwICYmIG1hcFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBtYXBTaXplRGVzY3JpcHRvci5nZXQgPT09IFwiZnVuY3Rpb25cIiA/IG1hcFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XHJcbiAgICB2YXIgbWFwRm9yRWFjaCA9IGhhc01hcCAmJiBNYXAucHJvdG90eXBlLmZvckVhY2g7XHJcbiAgICB2YXIgaGFzU2V0ID0gdHlwZW9mIFNldCA9PT0gXCJmdW5jdGlvblwiICYmIFNldC5wcm90b3R5cGU7XHJcbiAgICB2YXIgc2V0U2l6ZURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIGhhc1NldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoU2V0LnByb3RvdHlwZSwgXCJzaXplXCIpIDogbnVsbDtcclxuICAgIHZhciBzZXRTaXplID0gaGFzU2V0ICYmIHNldFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBzZXRTaXplRGVzY3JpcHRvci5nZXQgPT09IFwiZnVuY3Rpb25cIiA/IHNldFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XHJcbiAgICB2YXIgc2V0Rm9yRWFjaCA9IGhhc1NldCAmJiBTZXQucHJvdG90eXBlLmZvckVhY2g7XHJcbiAgICB2YXIgaGFzV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSBcImZ1bmN0aW9uXCIgJiYgV2Vha01hcC5wcm90b3R5cGU7XHJcbiAgICB2YXIgd2Vha01hcEhhcyA9IGhhc1dlYWtNYXAgPyBXZWFrTWFwLnByb3RvdHlwZS5oYXMgOiBudWxsO1xyXG4gICAgdmFyIGhhc1dlYWtTZXQgPSB0eXBlb2YgV2Vha1NldCA9PT0gXCJmdW5jdGlvblwiICYmIFdlYWtTZXQucHJvdG90eXBlO1xyXG4gICAgdmFyIHdlYWtTZXRIYXMgPSBoYXNXZWFrU2V0ID8gV2Vha1NldC5wcm90b3R5cGUuaGFzIDogbnVsbDtcclxuICAgIHZhciBoYXNXZWFrUmVmID0gdHlwZW9mIFdlYWtSZWYgPT09IFwiZnVuY3Rpb25cIiAmJiBXZWFrUmVmLnByb3RvdHlwZTtcclxuICAgIHZhciB3ZWFrUmVmRGVyZWYgPSBoYXNXZWFrUmVmID8gV2Vha1JlZi5wcm90b3R5cGUuZGVyZWYgOiBudWxsO1xyXG4gICAgdmFyIGJvb2xlYW5WYWx1ZU9mID0gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZjtcclxuICAgIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB2YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcclxuICAgIHZhciAkbWF0Y2ggPSBTdHJpbmcucHJvdG90eXBlLm1hdGNoO1xyXG4gICAgdmFyICRzbGljZSA9IFN0cmluZy5wcm90b3R5cGUuc2xpY2U7XHJcbiAgICB2YXIgJHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XHJcbiAgICB2YXIgJHRvVXBwZXJDYXNlID0gU3RyaW5nLnByb3RvdHlwZS50b1VwcGVyQ2FzZTtcclxuICAgIHZhciAkdG9Mb3dlckNhc2UgPSBTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlO1xyXG4gICAgdmFyICR0ZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xyXG4gICAgdmFyICRjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xyXG4gICAgdmFyICRqb2luID0gQXJyYXkucHJvdG90eXBlLmpvaW47XHJcbiAgICB2YXIgJGFyclNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG4gICAgdmFyICRmbG9vciA9IE1hdGguZmxvb3I7XHJcbiAgICB2YXIgYmlnSW50VmFsdWVPZiA9IHR5cGVvZiBCaWdJbnQgPT09IFwiZnVuY3Rpb25cIiA/IEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZiA6IG51bGw7XHJcbiAgICB2YXIgZ09QUyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XHJcbiAgICB2YXIgc3ltVG9TdHJpbmcgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgOiBudWxsO1xyXG4gICAgdmFyIGhhc1NoYW1tZWRTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwib2JqZWN0XCI7XHJcbiAgICB2YXIgdG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLnRvU3RyaW5nVGFnICYmICh0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSBoYXNTaGFtbWVkU3ltYm9scyA/IFwib2JqZWN0XCIgOiBcInN5bWJvbFwiKSA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IG51bGw7XHJcbiAgICB2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcclxuICAgIHZhciBnUE8gPSAodHlwZW9mIFJlZmxlY3QgPT09IFwiZnVuY3Rpb25cIiA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiBPYmplY3QuZ2V0UHJvdG90eXBlT2YpIHx8IChbXS5fX3Byb3RvX18gPT09IEFycmF5LnByb3RvdHlwZSA/IGZ1bmN0aW9uKE8pIHtcclxuICAgICAgcmV0dXJuIE8uX19wcm90b19fO1xyXG4gICAgfSA6IG51bGwpO1xyXG4gICAgZnVuY3Rpb24gYWRkTnVtZXJpY1NlcGFyYXRvcihudW0sIHN0cikge1xyXG4gICAgICBpZiAobnVtID09PSBJbmZpbml0eSB8fCBudW0gPT09IC1JbmZpbml0eSB8fCBudW0gIT09IG51bSB8fCBudW0gJiYgbnVtID4gLTFlMyAmJiBudW0gPCAxZTMgfHwgJHRlc3QuY2FsbCgvZS8sIHN0cikpIHtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBzZXBSZWdleCA9IC9bMC05XSg/PSg/OlswLTldezN9KSsoPyFbMC05XSkpL2c7XHJcbiAgICAgIGlmICh0eXBlb2YgbnVtID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgdmFyIGludCA9IG51bSA8IDAgPyAtJGZsb29yKC1udW0pIDogJGZsb29yKG51bSk7XHJcbiAgICAgICAgaWYgKGludCAhPT0gbnVtKSB7XHJcbiAgICAgICAgICB2YXIgaW50U3RyID0gU3RyaW5nKGludCk7XHJcbiAgICAgICAgICB2YXIgZGVjID0gJHNsaWNlLmNhbGwoc3RyLCBpbnRTdHIubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChpbnRTdHIsIHNlcFJlZ2V4LCBcIiQmX1wiKSArIFwiLlwiICsgJHJlcGxhY2UuY2FsbCgkcmVwbGFjZS5jYWxsKGRlYywgLyhbMC05XXszfSkvZywgXCIkJl9cIiksIC9fJC8sIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChzdHIsIHNlcFJlZ2V4LCBcIiQmX1wiKTtcclxuICAgIH1cclxuICAgIHZhciB1dGlsSW5zcGVjdCA9IHJlcXVpcmVfdXRpbF9pbnNwZWN0KCk7XHJcbiAgICB2YXIgaW5zcGVjdEN1c3RvbSA9IHV0aWxJbnNwZWN0LmN1c3RvbTtcclxuICAgIHZhciBpbnNwZWN0U3ltYm9sID0gaXNTeW1ib2woaW5zcGVjdEN1c3RvbSkgPyBpbnNwZWN0Q3VzdG9tIDogbnVsbDtcclxuICAgIHZhciBxdW90ZXMgPSB7XHJcbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcclxuICAgICAgXCJkb3VibGVcIjogJ1wiJyxcclxuICAgICAgc2luZ2xlOiBcIidcIlxyXG4gICAgfTtcclxuICAgIHZhciBxdW90ZVJFcyA9IHtcclxuICAgICAgX19wcm90b19fOiBudWxsLFxyXG4gICAgICBcImRvdWJsZVwiOiAvKFtcIlxcXFxdKS9nLFxyXG4gICAgICBzaW5nbGU6IC8oWydcXFxcXSkvZ1xyXG4gICAgfTtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5zcGVjdF8ob2JqLCBvcHRpb25zLCBkZXB0aCwgc2Vlbikge1xyXG4gICAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgIGlmIChoYXMob3B0cywgXCJxdW90ZVN0eWxlXCIpICYmICFoYXMocXVvdGVzLCBvcHRzLnF1b3RlU3R5bGUpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwicXVvdGVTdHlsZVwiIG11c3QgYmUgXCJzaW5nbGVcIiBvciBcImRvdWJsZVwiJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGhhcyhvcHRzLCBcIm1heFN0cmluZ0xlbmd0aFwiKSAmJiAodHlwZW9mIG9wdHMubWF4U3RyaW5nTGVuZ3RoID09PSBcIm51bWJlclwiID8gb3B0cy5tYXhTdHJpbmdMZW5ndGggPCAwICYmIG9wdHMubWF4U3RyaW5nTGVuZ3RoICE9PSBJbmZpbml0eSA6IG9wdHMubWF4U3RyaW5nTGVuZ3RoICE9PSBudWxsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm1heFN0cmluZ0xlbmd0aFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIEluZmluaXR5LCBvciBgbnVsbGAnKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgY3VzdG9tSW5zcGVjdCA9IGhhcyhvcHRzLCBcImN1c3RvbUluc3BlY3RcIikgPyBvcHRzLmN1c3RvbUluc3BlY3QgOiB0cnVlO1xyXG4gICAgICBpZiAodHlwZW9mIGN1c3RvbUluc3BlY3QgIT09IFwiYm9vbGVhblwiICYmIGN1c3RvbUluc3BlY3QgIT09IFwic3ltYm9sXCIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9uIFxcXCJjdXN0b21JbnNwZWN0XFxcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYHRydWVgLCBgZmFsc2VgLCBvciBgJ3N5bWJvbCdgXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoYXMob3B0cywgXCJpbmRlbnRcIikgJiYgb3B0cy5pbmRlbnQgIT09IG51bGwgJiYgb3B0cy5pbmRlbnQgIT09IFwiXHRcIiAmJiAhKHBhcnNlSW50KG9wdHMuaW5kZW50LCAxMCkgPT09IG9wdHMuaW5kZW50ICYmIG9wdHMuaW5kZW50ID4gMCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJpbmRlbnRcIiBtdXN0IGJlIFwiXFxcXHRcIiwgYW4gaW50ZWdlciA+IDAsIG9yIGBudWxsYCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoYXMob3B0cywgXCJudW1lcmljU2VwYXJhdG9yXCIpICYmIHR5cGVvZiBvcHRzLm51bWVyaWNTZXBhcmF0b3IgIT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwibnVtZXJpY1NlcGFyYXRvclwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBgdHJ1ZWAgb3IgYGZhbHNlYCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBudW1lcmljU2VwYXJhdG9yID0gb3B0cy5udW1lcmljU2VwYXJhdG9yO1xyXG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvYmogPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gXCJudWxsXCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcob2JqLCBvcHRzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIGlmIChvYmogPT09IDApIHtcclxuICAgICAgICAgIHJldHVybiBJbmZpbml0eSAvIG9iaiA+IDAgPyBcIjBcIiA6IFwiLTBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0ciA9IFN0cmluZyhvYmopO1xyXG4gICAgICAgIHJldHVybiBudW1lcmljU2VwYXJhdG9yID8gYWRkTnVtZXJpY1NlcGFyYXRvcihvYmosIHN0cikgOiBzdHI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwiYmlnaW50XCIpIHtcclxuICAgICAgICB2YXIgYmlnSW50U3RyID0gU3RyaW5nKG9iaikgKyBcIm5cIjtcclxuICAgICAgICByZXR1cm4gbnVtZXJpY1NlcGFyYXRvciA/IGFkZE51bWVyaWNTZXBhcmF0b3Iob2JqLCBiaWdJbnRTdHIpIDogYmlnSW50U3RyO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBtYXhEZXB0aCA9IHR5cGVvZiBvcHRzLmRlcHRoID09PSBcInVuZGVmaW5lZFwiID8gNSA6IG9wdHMuZGVwdGg7XHJcbiAgICAgIGlmICh0eXBlb2YgZGVwdGggPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBkZXB0aCA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlcHRoID49IG1heERlcHRoICYmIG1heERlcHRoID4gMCAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/IFwiW0FycmF5XVwiIDogXCJbT2JqZWN0XVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBpbmRlbnQgPSBnZXRJbmRlbnQob3B0cywgZGVwdGgpO1xyXG4gICAgICBpZiAodHlwZW9mIHNlZW4gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBzZWVuID0gW107XHJcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXhPZihzZWVuLCBvYmopID49IDApIHtcclxuICAgICAgICByZXR1cm4gXCJbQ2lyY3VsYXJdXCI7XHJcbiAgICAgIH1cclxuICAgICAgZnVuY3Rpb24gaW5zcGVjdDModmFsdWUsIGZyb20sIG5vSW5kZW50KSB7XHJcbiAgICAgICAgaWYgKGZyb20pIHtcclxuICAgICAgICAgIHNlZW4gPSAkYXJyU2xpY2UuY2FsbChzZWVuKTtcclxuICAgICAgICAgIHNlZW4ucHVzaChmcm9tKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vSW5kZW50KSB7XHJcbiAgICAgICAgICB2YXIgbmV3T3B0cyA9IHtcclxuICAgICAgICAgICAgZGVwdGg6IG9wdHMuZGVwdGhcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBpZiAoaGFzKG9wdHMsIFwicXVvdGVTdHlsZVwiKSkge1xyXG4gICAgICAgICAgICBuZXdPcHRzLnF1b3RlU3R5bGUgPSBvcHRzLnF1b3RlU3R5bGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5zcGVjdF8odmFsdWUsIG5ld09wdHMsIGRlcHRoICsgMSwgc2Vlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnNwZWN0Xyh2YWx1ZSwgb3B0cywgZGVwdGggKyAxLCBzZWVuKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmICFpc1JlZ0V4cChvYmopKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lT2Yob2JqKTtcclxuICAgICAgICB2YXIga2V5cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0Myk7XHJcbiAgICAgICAgcmV0dXJuIFwiW0Z1bmN0aW9uXCIgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIiAoYW5vbnltb3VzKVwiKSArIFwiXVwiICsgKGtleXMubGVuZ3RoID4gMCA/IFwiIHsgXCIgKyAkam9pbi5jYWxsKGtleXMsIFwiLCBcIikgKyBcIiB9XCIgOiBcIlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNTeW1ib2wob2JqKSkge1xyXG4gICAgICAgIHZhciBzeW1TdHJpbmcgPSBoYXNTaGFtbWVkU3ltYm9scyA/ICRyZXBsYWNlLmNhbGwoU3RyaW5nKG9iaiksIC9eKFN5bWJvbFxcKC4qXFwpKV9bXildKiQvLCBcIiQxXCIpIDogc3ltVG9TdHJpbmcuY2FsbChvYmopO1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmICFoYXNTaGFtbWVkU3ltYm9scyA/IG1hcmtCb3hlZChzeW1TdHJpbmcpIDogc3ltU3RyaW5nO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc0VsZW1lbnQob2JqKSkge1xyXG4gICAgICAgIHZhciBzID0gXCI8XCIgKyAkdG9Mb3dlckNhc2UuY2FsbChTdHJpbmcob2JqLm5vZGVOYW1lKSk7XHJcbiAgICAgICAgdmFyIGF0dHJzID0gb2JqLmF0dHJpYnV0ZXMgfHwgW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgcyArPSBcIiBcIiArIGF0dHJzW2ldLm5hbWUgKyBcIj1cIiArIHdyYXBRdW90ZXMocXVvdGUoYXR0cnNbaV0udmFsdWUpLCBcImRvdWJsZVwiLCBvcHRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcyArPSBcIj5cIjtcclxuICAgICAgICBpZiAob2JqLmNoaWxkTm9kZXMgJiYgb2JqLmNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBzICs9IFwiLi4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHMgKz0gXCI8L1wiICsgJHRvTG93ZXJDYXNlLmNhbGwoU3RyaW5nKG9iai5ub2RlTmFtZSkpICsgXCI+XCI7XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIGlmIChvYmoubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gXCJbXVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgeHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdDMpO1xyXG4gICAgICAgIGlmIChpbmRlbnQgJiYgIXNpbmdsZUxpbmVWYWx1ZXMoeHMpKSB7XHJcbiAgICAgICAgICByZXR1cm4gXCJbXCIgKyBpbmRlbnRlZEpvaW4oeHMsIGluZGVudCkgKyBcIl1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiWyBcIiArICRqb2luLmNhbGwoeHMsIFwiLCBcIikgKyBcIiBdXCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzRXJyb3Iob2JqKSkge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0Myk7XHJcbiAgICAgICAgaWYgKCEoXCJjYXVzZVwiIGluIEVycm9yLnByb3RvdHlwZSkgJiYgXCJjYXVzZVwiIGluIG9iaiAmJiAhaXNFbnVtZXJhYmxlLmNhbGwob2JqLCBcImNhdXNlXCIpKSB7XHJcbiAgICAgICAgICByZXR1cm4gXCJ7IFtcIiArIFN0cmluZyhvYmopICsgXCJdIFwiICsgJGpvaW4uY2FsbCgkY29uY2F0LmNhbGwoXCJbY2F1c2VdOiBcIiArIGluc3BlY3QzKG9iai5jYXVzZSksIHBhcnRzKSwgXCIsIFwiKSArIFwiIH1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIFwiW1wiICsgU3RyaW5nKG9iaikgKyBcIl1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwieyBbXCIgKyBTdHJpbmcob2JqKSArIFwiXSBcIiArICRqb2luLmNhbGwocGFydHMsIFwiLCBcIikgKyBcIiB9XCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgY3VzdG9tSW5zcGVjdCkge1xyXG4gICAgICAgIGlmIChpbnNwZWN0U3ltYm9sICYmIHR5cGVvZiBvYmpbaW5zcGVjdFN5bWJvbF0gPT09IFwiZnVuY3Rpb25cIiAmJiB1dGlsSW5zcGVjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxJbnNwZWN0KG9iaiwgeyBkZXB0aDogbWF4RGVwdGggLSBkZXB0aCB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUluc3BlY3QgIT09IFwic3ltYm9sXCIgJiYgdHlwZW9mIG9iai5pbnNwZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgIHJldHVybiBvYmouaW5zcGVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNNYXAob2JqKSkge1xyXG4gICAgICAgIHZhciBtYXBQYXJ0cyA9IFtdO1xyXG4gICAgICAgIGlmIChtYXBGb3JFYWNoKSB7XHJcbiAgICAgICAgICBtYXBGb3JFYWNoLmNhbGwob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgIG1hcFBhcnRzLnB1c2goaW5zcGVjdDMoa2V5LCBvYmosIHRydWUpICsgXCIgPT4gXCIgKyBpbnNwZWN0Myh2YWx1ZSwgb2JqKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25PZihcIk1hcFwiLCBtYXBTaXplLmNhbGwob2JqKSwgbWFwUGFydHMsIGluZGVudCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzU2V0KG9iaikpIHtcclxuICAgICAgICB2YXIgc2V0UGFydHMgPSBbXTtcclxuICAgICAgICBpZiAoc2V0Rm9yRWFjaCkge1xyXG4gICAgICAgICAgc2V0Rm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgc2V0UGFydHMucHVzaChpbnNwZWN0Myh2YWx1ZSwgb2JqKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25PZihcIlNldFwiLCBzZXRTaXplLmNhbGwob2JqKSwgc2V0UGFydHMsIGluZGVudCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzV2Vha01hcChvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoXCJXZWFrTWFwXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc1dlYWtTZXQob2JqKSkge1xyXG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKFwiV2Vha1NldFwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNXZWFrUmVmKG9iaikpIHtcclxuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZihcIldlYWtSZWZcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzTnVtYmVyKG9iaikpIHtcclxuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QzKE51bWJlcihvYmopKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzQmlnSW50KG9iaikpIHtcclxuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QzKGJpZ0ludFZhbHVlT2YuY2FsbChvYmopKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzQm9vbGVhbihvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChib29sZWFuVmFsdWVPZi5jYWxsKG9iaikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc1N0cmluZyhvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0MyhTdHJpbmcob2JqKSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIG9iaiA9PT0gd2luZG93KSB7XHJcbiAgICAgICAgcmV0dXJuIFwieyBbb2JqZWN0IFdpbmRvd10gfVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvYmogPT09IGdsb2JhbFRoaXMgfHwgdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvYmogPT09IGdsb2JhbCkge1xyXG4gICAgICAgIHJldHVybiBcInsgW29iamVjdCBnbG9iYWxUaGlzXSB9XCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFpc0RhdGUob2JqKSAmJiAhaXNSZWdFeHAob2JqKSkge1xyXG4gICAgICAgIHZhciB5cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0Myk7XHJcbiAgICAgICAgdmFyIGlzUGxhaW5PYmplY3QgPSBnUE8gPyBnUE8ob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZSA6IG9iaiBpbnN0YW5jZW9mIE9iamVjdCB8fCBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcclxuICAgICAgICB2YXIgcHJvdG9UYWcgPSBvYmogaW5zdGFuY2VvZiBPYmplY3QgPyBcIlwiIDogXCJudWxsIHByb3RvdHlwZVwiO1xyXG4gICAgICAgIHZhciBzdHJpbmdUYWcgPSAhaXNQbGFpbk9iamVjdCAmJiB0b1N0cmluZ1RhZyAmJiBPYmplY3Qob2JqKSA9PT0gb2JqICYmIHRvU3RyaW5nVGFnIGluIG9iaiA/ICRzbGljZS5jYWxsKHRvU3RyKG9iaiksIDgsIC0xKSA6IHByb3RvVGFnID8gXCJPYmplY3RcIiA6IFwiXCI7XHJcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9yVGFnID0gaXNQbGFpbk9iamVjdCB8fCB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yICE9PSBcImZ1bmN0aW9uXCIgPyBcIlwiIDogb2JqLmNvbnN0cnVjdG9yLm5hbWUgPyBvYmouY29uc3RydWN0b3IubmFtZSArIFwiIFwiIDogXCJcIjtcclxuICAgICAgICB2YXIgdGFnID0gY29uc3RydWN0b3JUYWcgKyAoc3RyaW5nVGFnIHx8IHByb3RvVGFnID8gXCJbXCIgKyAkam9pbi5jYWxsKCRjb25jYXQuY2FsbChbXSwgc3RyaW5nVGFnIHx8IFtdLCBwcm90b1RhZyB8fCBbXSksIFwiOiBcIikgKyBcIl0gXCIgOiBcIlwiKTtcclxuICAgICAgICBpZiAoeXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFnICsgXCJ7fVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZW50KSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFnICsgXCJ7XCIgKyBpbmRlbnRlZEpvaW4oeXMsIGluZGVudCkgKyBcIn1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZyArIFwieyBcIiArICRqb2luLmNhbGwoeXMsIFwiLCBcIikgKyBcIiB9XCI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIHdyYXBRdW90ZXMocywgZGVmYXVsdFN0eWxlLCBvcHRzKSB7XHJcbiAgICAgIHZhciBzdHlsZSA9IG9wdHMucXVvdGVTdHlsZSB8fCBkZWZhdWx0U3R5bGU7XHJcbiAgICAgIHZhciBxdW90ZUNoYXIgPSBxdW90ZXNbc3R5bGVdO1xyXG4gICAgICByZXR1cm4gcXVvdGVDaGFyICsgcyArIHF1b3RlQ2hhcjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHF1b3RlKHMpIHtcclxuICAgICAgcmV0dXJuICRyZXBsYWNlLmNhbGwoU3RyaW5nKHMpLCAvXCIvZywgXCImcXVvdDtcIik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjYW5UcnVzdFRvU3RyaW5nKG9iaikge1xyXG4gICAgICByZXR1cm4gIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiAodG9TdHJpbmdUYWcgaW4gb2JqIHx8IHR5cGVvZiBvYmpbdG9TdHJpbmdUYWddICE9PSBcInVuZGVmaW5lZFwiKSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0FycmF5KG9iaikge1xyXG4gICAgICByZXR1cm4gdG9TdHIob2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzRGF0ZShvYmopIHtcclxuICAgICAgcmV0dXJuIHRvU3RyKG9iaikgPT09IFwiW29iamVjdCBEYXRlXVwiICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xyXG4gICAgICByZXR1cm4gdG9TdHIob2JqKSA9PT0gXCJbb2JqZWN0IFJlZ0V4cF1cIiAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0Vycm9yKG9iaikge1xyXG4gICAgICByZXR1cm4gdG9TdHIob2JqKSA9PT0gXCJbb2JqZWN0IEVycm9yXVwiICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xyXG4gICAgICByZXR1cm4gdG9TdHIob2JqKSA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIiAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc051bWJlcihvYmopIHtcclxuICAgICAgcmV0dXJuIHRvU3RyKG9iaikgPT09IFwiW29iamVjdCBOdW1iZXJdXCIgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNCb29sZWFuKG9iaikge1xyXG4gICAgICByZXR1cm4gdG9TdHIob2JqKSA9PT0gXCJbb2JqZWN0IEJvb2xlYW5dXCIgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNTeW1ib2wob2JqKSB7XHJcbiAgICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scykge1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBvYmogaW5zdGFuY2VvZiBTeW1ib2w7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3ltYm9sXCIpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiIHx8ICFzeW1Ub1N0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzQmlnSW50KG9iaikge1xyXG4gICAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiIHx8ICFiaWdJbnRWYWx1ZU9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYmlnSW50VmFsdWVPZi5jYWxsKG9iaik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgaGFzT3duMiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgfHwgZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgIHJldHVybiBrZXkgaW4gdGhpcztcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcclxuICAgICAgcmV0dXJuIGhhc093bjIuY2FsbChvYmosIGtleSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0b1N0cihvYmopIHtcclxuICAgICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG5hbWVPZihmKSB7XHJcbiAgICAgIGlmIChmLm5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZi5uYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBtID0gJG1hdGNoLmNhbGwoZnVuY3Rpb25Ub1N0cmluZy5jYWxsKGYpLCAvXmZ1bmN0aW9uXFxzKihbXFx3JF0rKS8pO1xyXG4gICAgICBpZiAobSkge1xyXG4gICAgICAgIHJldHVybiBtWzFdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xyXG4gICAgICBpZiAoeHMuaW5kZXhPZikge1xyXG4gICAgICAgIHJldHVybiB4cy5pbmRleE9mKHgpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHhzW2ldID09PSB4KSB7XHJcbiAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNNYXAoeCkge1xyXG4gICAgICBpZiAoIW1hcFNpemUgfHwgIXggfHwgdHlwZW9mIHggIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBtYXBTaXplLmNhbGwoeCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHNldFNpemUuY2FsbCh4KTtcclxuICAgICAgICB9IGNhdGNoIChzKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBNYXA7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xyXG4gICAgICBpZiAoIXdlYWtNYXBIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICB3ZWFrTWFwSGFzLmNhbGwoeCwgd2Vha01hcEhhcyk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHdlYWtTZXRIYXMuY2FsbCh4LCB3ZWFrU2V0SGFzKTtcclxuICAgICAgICB9IGNhdGNoIChzKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBXZWFrTWFwO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNXZWFrUmVmKHgpIHtcclxuICAgICAgaWYgKCF3ZWFrUmVmRGVyZWYgfHwgIXggfHwgdHlwZW9mIHggIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICB3ZWFrUmVmRGVyZWYuY2FsbCh4KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzU2V0KHgpIHtcclxuICAgICAgaWYgKCFzZXRTaXplIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc2V0U2l6ZS5jYWxsKHgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBtYXBTaXplLmNhbGwoeCk7XHJcbiAgICAgICAgfSBjYXRjaCAobSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgU2V0O1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcclxuICAgICAgaWYgKCF3ZWFrU2V0SGFzIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB3ZWFrTWFwSGFzLmNhbGwoeCwgd2Vha01hcEhhcyk7XHJcbiAgICAgICAgfSBjYXRjaCAocykge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgV2Vha1NldDtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudCh4KSB7XHJcbiAgICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIHggaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0eXBlb2YgeC5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeC5nZXRBdHRyaWJ1dGUgPT09IFwiZnVuY3Rpb25cIjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGluc3BlY3RTdHJpbmcoc3RyLCBvcHRzKSB7XHJcbiAgICAgIGlmIChzdHIubGVuZ3RoID4gb3B0cy5tYXhTdHJpbmdMZW5ndGgpIHtcclxuICAgICAgICB2YXIgcmVtYWluaW5nID0gc3RyLmxlbmd0aCAtIG9wdHMubWF4U3RyaW5nTGVuZ3RoO1xyXG4gICAgICAgIHZhciB0cmFpbGVyID0gXCIuLi4gXCIgKyByZW1haW5pbmcgKyBcIiBtb3JlIGNoYXJhY3RlclwiICsgKHJlbWFpbmluZyA+IDEgPyBcInNcIiA6IFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBpbnNwZWN0U3RyaW5nKCRzbGljZS5jYWxsKHN0ciwgMCwgb3B0cy5tYXhTdHJpbmdMZW5ndGgpLCBvcHRzKSArIHRyYWlsZXI7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHF1b3RlUkUgPSBxdW90ZVJFc1tvcHRzLnF1b3RlU3R5bGUgfHwgXCJzaW5nbGVcIl07XHJcbiAgICAgIHF1b3RlUkUubGFzdEluZGV4ID0gMDtcclxuICAgICAgdmFyIHMgPSAkcmVwbGFjZS5jYWxsKCRyZXBsYWNlLmNhbGwoc3RyLCBxdW90ZVJFLCBcIlxcXFwkMVwiKSwgL1tcXHgwMC1cXHgxZl0vZywgbG93Ynl0ZSk7XHJcbiAgICAgIHJldHVybiB3cmFwUXVvdGVzKHMsIFwic2luZ2xlXCIsIG9wdHMpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbG93Ynl0ZShjKSB7XHJcbiAgICAgIHZhciBuID0gYy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICB2YXIgeCA9IHtcclxuICAgICAgICA4OiBcImJcIixcclxuICAgICAgICA5OiBcInRcIixcclxuICAgICAgICAxMDogXCJuXCIsXHJcbiAgICAgICAgMTI6IFwiZlwiLFxyXG4gICAgICAgIDEzOiBcInJcIlxyXG4gICAgICB9W25dO1xyXG4gICAgICBpZiAoeCkge1xyXG4gICAgICAgIHJldHVybiBcIlxcXFxcIiArIHg7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIFwiXFxcXHhcIiArIChuIDwgMTYgPyBcIjBcIiA6IFwiXCIpICsgJHRvVXBwZXJDYXNlLmNhbGwobi50b1N0cmluZygxNikpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbWFya0JveGVkKHN0cikge1xyXG4gICAgICByZXR1cm4gXCJPYmplY3QoXCIgKyBzdHIgKyBcIilcIjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHdlYWtDb2xsZWN0aW9uT2YodHlwZSkge1xyXG4gICAgICByZXR1cm4gdHlwZSArIFwiIHsgPyB9XCI7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0aW9uT2YodHlwZSwgc2l6ZSwgZW50cmllcywgaW5kZW50KSB7XHJcbiAgICAgIHZhciBqb2luZWRFbnRyaWVzID0gaW5kZW50ID8gaW5kZW50ZWRKb2luKGVudHJpZXMsIGluZGVudCkgOiAkam9pbi5jYWxsKGVudHJpZXMsIFwiLCBcIik7XHJcbiAgICAgIHJldHVybiB0eXBlICsgXCIgKFwiICsgc2l6ZSArIFwiKSB7XCIgKyBqb2luZWRFbnRyaWVzICsgXCJ9XCI7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzaW5nbGVMaW5lVmFsdWVzKHhzKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoaW5kZXhPZih4c1tpXSwgXCJcXG5cIikgPj0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldEluZGVudChvcHRzLCBkZXB0aCkge1xyXG4gICAgICB2YXIgYmFzZUluZGVudDtcclxuICAgICAgaWYgKG9wdHMuaW5kZW50ID09PSBcIlx0XCIpIHtcclxuICAgICAgICBiYXNlSW5kZW50ID0gXCJcdFwiO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLmluZGVudCA9PT0gXCJudW1iZXJcIiAmJiBvcHRzLmluZGVudCA+IDApIHtcclxuICAgICAgICBiYXNlSW5kZW50ID0gJGpvaW4uY2FsbChBcnJheShvcHRzLmluZGVudCArIDEpLCBcIiBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBiYXNlOiBiYXNlSW5kZW50LFxyXG4gICAgICAgIHByZXY6ICRqb2luLmNhbGwoQXJyYXkoZGVwdGggKyAxKSwgYmFzZUluZGVudClcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGluZGVudGVkSm9pbih4cywgaW5kZW50KSB7XHJcbiAgICAgIGlmICh4cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgfVxyXG4gICAgICB2YXIgbGluZUpvaW5lciA9IFwiXFxuXCIgKyBpbmRlbnQucHJldiArIGluZGVudC5iYXNlO1xyXG4gICAgICByZXR1cm4gbGluZUpvaW5lciArICRqb2luLmNhbGwoeHMsIFwiLFwiICsgbGluZUpvaW5lcikgKyBcIlxcblwiICsgaW5kZW50LnByZXY7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdDMpIHtcclxuICAgICAgdmFyIGlzQXJyID0gaXNBcnJheShvYmopO1xyXG4gICAgICB2YXIgeHMgPSBbXTtcclxuICAgICAgaWYgKGlzQXJyKSB7XHJcbiAgICAgICAgeHMubGVuZ3RoID0gb2JqLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgeHNbaV0gPSBoYXMob2JqLCBpKSA/IGluc3BlY3QzKG9ialtpXSwgb2JqKSA6IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBzeW1zID0gdHlwZW9mIGdPUFMgPT09IFwiZnVuY3Rpb25cIiA/IGdPUFMob2JqKSA6IFtdO1xyXG4gICAgICB2YXIgc3ltTWFwO1xyXG4gICAgICBpZiAoaGFzU2hhbW1lZFN5bWJvbHMpIHtcclxuICAgICAgICBzeW1NYXAgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHN5bXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgIHN5bU1hcFtcIiRcIiArIHN5bXNba11dID0gc3ltc1trXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmICghaGFzKG9iaiwga2V5KSkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0FyciAmJiBTdHJpbmcoTnVtYmVyKGtleSkpID09PSBrZXkgJiYga2V5IDwgb2JqLmxlbmd0aCkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scyAmJiBzeW1NYXBbXCIkXCIgKyBrZXldIGluc3RhbmNlb2YgU3ltYm9sKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCR0ZXN0LmNhbGwoL1teXFx3JF0vLCBrZXkpKSB7XHJcbiAgICAgICAgICB4cy5wdXNoKGluc3BlY3QzKGtleSwgb2JqKSArIFwiOiBcIiArIGluc3BlY3QzKG9ialtrZXldLCBvYmopKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeHMucHVzaChrZXkgKyBcIjogXCIgKyBpbnNwZWN0MyhvYmpba2V5XSwgb2JqKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgZ09QUyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzeW1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAoaXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW1zW2pdKSkge1xyXG4gICAgICAgICAgICB4cy5wdXNoKFwiW1wiICsgaW5zcGVjdDMoc3ltc1tqXSkgKyBcIl06IFwiICsgaW5zcGVjdDMob2JqW3N5bXNbal1dLCBvYmopKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHhzO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBzcmMvbGliL2JpbmFyeV9yZWFkZXIudHNcclxudmFyIHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIik7XHJcbnZhciBCaW5hcnlSZWFkZXIgPSBjbGFzcyB7XHJcbiAgLyoqXHJcbiAgICogVGhlIERhdGFWaWV3IHVzZWQgdG8gcmVhZCB2YWx1ZXMgZnJvbSB0aGUgYmluYXJ5IGRhdGEuXHJcbiAgICpcclxuICAgKiBOb3RlOiBUaGUgRGF0YVZpZXcncyBgYnl0ZU9mZnNldGAgaXMgcmVsYXRpdmUgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGVcclxuICAgKiB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLCBub3QgdGhlIHN0YXJ0IG9mIHRoZSBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxyXG4gICAqIFRoaXMgYEJpbmFyeVJlYWRlcmAncyBgI29mZnNldGAgZmllbGQgaXMgdXNlZCB0byB0cmFjayB0aGUgY3VycmVudCByZWFkIHBvc2l0aW9uXHJcbiAgICogcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxyXG4gICAqL1xyXG4gIHZpZXc7XHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyB0aGUgb2Zmc2V0IChpbiBieXRlcykgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBEYXRhVmlld1xyXG4gICAqIGFuZCBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxyXG4gICAqXHJcbiAgICogTm90ZTogVGhpcyBpcyAqbm90KiB0aGUgYWJzb2x1dGUgYnl0ZSBvZmZzZXQgd2l0aGluIHRoZSB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLlxyXG4gICAqL1xyXG4gIG9mZnNldCA9IDA7XHJcbiAgY29uc3RydWN0b3IoaW5wdXQpIHtcclxuICAgIHRoaXMudmlldyA9IGlucHV0IGluc3RhbmNlb2YgRGF0YVZpZXcgPyBpbnB1dCA6IG5ldyBEYXRhVmlldyhpbnB1dC5idWZmZXIsIGlucHV0LmJ5dGVPZmZzZXQsIGlucHV0LmJ5dGVMZW5ndGgpO1xyXG4gICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gIH1cclxuICByZXNldChpbnB1dCkge1xyXG4gICAgdGhpcy52aWV3ID0gaW5wdXQgaW5zdGFuY2VvZiBEYXRhVmlldyA/IGlucHV0IDogbmV3IERhdGFWaWV3KGlucHV0LmJ1ZmZlciwgaW5wdXQuYnl0ZU9mZnNldCwgaW5wdXQuYnl0ZUxlbmd0aCk7XHJcbiAgICB0aGlzLm9mZnNldCA9IDA7XHJcbiAgfVxyXG4gIGdldCByZW1haW5pbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmJ5dGVMZW5ndGggLSB0aGlzLm9mZnNldDtcclxuICB9XHJcbiAgLyoqIEVuc3VyZSB3ZSBoYXZlIGF0IGxlYXN0IGBuYCBieXRlcyBsZWZ0IHRvIHJlYWQgKi9cclxuICAjZW5zdXJlKG4pIHtcclxuICAgIGlmICh0aGlzLm9mZnNldCArIG4gPiB0aGlzLnZpZXcuYnl0ZUxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcclxuICAgICAgICBgVHJpZWQgdG8gcmVhZCAke259IGJ5dGUocykgYXQgcmVsYXRpdmUgb2Zmc2V0ICR7dGhpcy5vZmZzZXR9LCBidXQgb25seSAke3RoaXMucmVtYWluaW5nfSBieXRlKHMpIHJlbWFpbmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVhZFVJbnQ4QXJyYXkoKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnJlYWRVMzIoKTtcclxuICAgIHRoaXMuI2Vuc3VyZShsZW5ndGgpO1xyXG4gICAgcmV0dXJuIHRoaXMucmVhZEJ5dGVzKGxlbmd0aCkuc2xpY2UoKTtcclxuICB9XHJcbiAgcmVhZEJvb2woKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRVaW50OCh0aGlzLm9mZnNldCk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAxO1xyXG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xyXG4gIH1cclxuICByZWFkQnl0ZSgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQ4KHRoaXMub2Zmc2V0KTtcclxuICAgIHRoaXMub2Zmc2V0ICs9IDE7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIHJlYWRCeXRlcyhsZW5ndGgpIHtcclxuICAgIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoXHJcbiAgICAgIHRoaXMudmlldy5idWZmZXIsXHJcbiAgICAgIHRoaXMudmlldy5ieXRlT2Zmc2V0ICsgdGhpcy5vZmZzZXQsXHJcbiAgICAgIGxlbmd0aFxyXG4gICAgKTtcclxuICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcbiAgcmVhZEk4KCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAxO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICByZWFkVTgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gIH1cclxuICByZWFkSTE2KCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50MTYodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gMjtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgcmVhZFUxNigpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAyO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICByZWFkSTMyKCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50MzIodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgcmVhZFUzMigpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSA0O1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICByZWFkSTY0KCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0QmlnSW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gODtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgcmVhZFU2NCgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSA4O1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICByZWFkVTEyOCgpIHtcclxuICAgIGNvbnN0IGxvd2VyUGFydCA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgY29uc3QgdXBwZXJQYXJ0ID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDgsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gMTY7XHJcbiAgICByZXR1cm4gKHVwcGVyUGFydCA8PCBCaWdJbnQoNjQpKSArIGxvd2VyUGFydDtcclxuICB9XHJcbiAgcmVhZEkxMjgoKSB7XHJcbiAgICBjb25zdCBsb3dlclBhcnQgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0LCB0cnVlKTtcclxuICAgIGNvbnN0IHVwcGVyUGFydCA9IHRoaXMudmlldy5nZXRCaWdJbnQ2NCh0aGlzLm9mZnNldCArIDgsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gMTY7XHJcbiAgICByZXR1cm4gKHVwcGVyUGFydCA8PCBCaWdJbnQoNjQpKSArIGxvd2VyUGFydDtcclxuICB9XHJcbiAgcmVhZFUyNTYoKSB7XHJcbiAgICBjb25zdCBwMCA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgY29uc3QgcDEgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBwMiA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyAxNiwgdHJ1ZSk7XHJcbiAgICBjb25zdCBwMyA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyAyNCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAzMjtcclxuICAgIHJldHVybiAocDMgPDwgQmlnSW50KDMgKiA2NCkpICsgKHAyIDw8IEJpZ0ludCgyICogNjQpKSArIChwMSA8PCBCaWdJbnQoMSAqIDY0KSkgKyBwMDtcclxuICB9XHJcbiAgcmVhZEkyNTYoKSB7XHJcbiAgICBjb25zdCBwMCA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xyXG4gICAgY29uc3QgcDEgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBwMiA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyAxNiwgdHJ1ZSk7XHJcbiAgICBjb25zdCBwMyA9IHRoaXMudmlldy5nZXRCaWdJbnQ2NCh0aGlzLm9mZnNldCArIDI0LCB0cnVlKTtcclxuICAgIHRoaXMub2Zmc2V0ICs9IDMyO1xyXG4gICAgcmV0dXJuIChwMyA8PCBCaWdJbnQoMyAqIDY0KSkgKyAocDIgPDwgQmlnSW50KDIgKiA2NCkpICsgKHAxIDw8IEJpZ0ludCgxICogNjQpKSArIHAwO1xyXG4gIH1cclxuICByZWFkRjMyKCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0RmxvYXQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSA0O1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICByZWFkRjY0KCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0RmxvYXQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSA4O1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICByZWFkU3RyaW5nKCkge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkVTMyKCk7XHJcbiAgICB0aGlzLiNlbnN1cmUobGVuZ3RoKTtcclxuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yZWFkQnl0ZXMobGVuZ3RoKTtcclxuICAgIHJldHVybiB0ZXh0RGVjb2Rlci5kZWNvZGUoYnl0ZXMpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIHNyYy9saWIvYmluYXJ5X3dyaXRlci50c1xyXG52YXIgaW1wb3J0X2Jhc2U2NF9qcyA9IF9fdG9FU00ocmVxdWlyZV9iYXNlNjRfanMoKSk7XHJcbnZhciB0ZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xyXG52YXIgQXJyYXlCdWZmZXJQcm90b3R5cGVUcmFuc2ZlciA9IEFycmF5QnVmZmVyLnByb3RvdHlwZS50cmFuc2ZlciA/PyBmdW5jdGlvbihuZXdCeXRlTGVuZ3RoKSB7XHJcbiAgaWYgKG5ld0J5dGVMZW5ndGggPT09IHZvaWQgMCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcclxuICB9IGVsc2UgaWYgKG5ld0J5dGVMZW5ndGggPD0gdGhpcy5ieXRlTGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBuZXdCeXRlTGVuZ3RoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgY29weSA9IG5ldyBVaW50OEFycmF5KG5ld0J5dGVMZW5ndGgpO1xyXG4gICAgY29weS5zZXQobmV3IFVpbnQ4QXJyYXkodGhpcykpO1xyXG4gICAgcmV0dXJuIGNvcHkuYnVmZmVyO1xyXG4gIH1cclxufTtcclxudmFyIFJlc2l6YWJsZUJ1ZmZlciA9IGNsYXNzIHtcclxuICBidWZmZXI7XHJcbiAgdmlldztcclxuICBjb25zdHJ1Y3Rvcihpbml0KSB7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IHR5cGVvZiBpbml0ID09PSBcIm51bWJlclwiID8gbmV3IEFycmF5QnVmZmVyKGluaXQpIDogaW5pdDtcclxuICAgIHRoaXMudmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcik7XHJcbiAgfVxyXG4gIGdldCBjYXBhY2l0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gIH1cclxuICBncm93KG5ld1NpemUpIHtcclxuICAgIGlmIChuZXdTaXplIDw9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpIHJldHVybjtcclxuICAgIHRoaXMuYnVmZmVyID0gQXJyYXlCdWZmZXJQcm90b3R5cGVUcmFuc2Zlci5jYWxsKHRoaXMuYnVmZmVyLCBuZXdTaXplKTtcclxuICAgIHRoaXMudmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcik7XHJcbiAgfVxyXG59O1xyXG52YXIgQmluYXJ5V3JpdGVyID0gY2xhc3Mge1xyXG4gIGJ1ZmZlcjtcclxuICBvZmZzZXQgPSAwO1xyXG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcclxuICAgIHRoaXMuYnVmZmVyID0gdHlwZW9mIGluaXQgPT09IFwibnVtYmVyXCIgPyBuZXcgUmVzaXphYmxlQnVmZmVyKGluaXQpIDogaW5pdDtcclxuICB9XHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLm9mZnNldCA9IDA7XHJcbiAgfVxyXG4gIHJlc2V0KGJ1ZmZlcikge1xyXG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XHJcbiAgICB0aGlzLm9mZnNldCA9IDA7XHJcbiAgfVxyXG4gIGV4cGFuZEJ1ZmZlcihhZGRpdGlvbmFsQ2FwYWNpdHkpIHtcclxuICAgIGNvbnN0IG1pbkNhcGFjaXR5ID0gdGhpcy5vZmZzZXQgKyBhZGRpdGlvbmFsQ2FwYWNpdHkgKyAxO1xyXG4gICAgaWYgKG1pbkNhcGFjaXR5IDw9IHRoaXMuYnVmZmVyLmNhcGFjaXR5KSByZXR1cm47XHJcbiAgICBsZXQgbmV3Q2FwYWNpdHkgPSB0aGlzLmJ1ZmZlci5jYXBhY2l0eSAqIDI7XHJcbiAgICBpZiAobmV3Q2FwYWNpdHkgPCBtaW5DYXBhY2l0eSkgbmV3Q2FwYWNpdHkgPSBtaW5DYXBhY2l0eTtcclxuICAgIHRoaXMuYnVmZmVyLmdyb3cobmV3Q2FwYWNpdHkpO1xyXG4gIH1cclxuICB0b0Jhc2U2NCgpIHtcclxuICAgIHJldHVybiAoMCwgaW1wb3J0X2Jhc2U2NF9qcy5mcm9tQnl0ZUFycmF5KSh0aGlzLmdldEJ1ZmZlcigpKTtcclxuICB9XHJcbiAgZ2V0QnVmZmVyKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLmJ1ZmZlciwgMCwgdGhpcy5vZmZzZXQpO1xyXG4gIH1cclxuICBnZXQgdmlldygpIHtcclxuICAgIHJldHVybiB0aGlzLmJ1ZmZlci52aWV3O1xyXG4gIH1cclxuICB3cml0ZVVJbnQ4QXJyYXkodmFsdWUpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcclxuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDQgKyBsZW5ndGgpO1xyXG4gICAgdGhpcy53cml0ZVUzMihsZW5ndGgpO1xyXG4gICAgbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIuYnVmZmVyLCB0aGlzLm9mZnNldCkuc2V0KHZhbHVlKTtcclxuICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcclxuICB9XHJcbiAgd3JpdGVCb29sKHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxKTtcclxuICAgIHRoaXMudmlldy5zZXRVaW50OCh0aGlzLm9mZnNldCwgdmFsdWUgPyAxIDogMCk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAxO1xyXG4gIH1cclxuICB3cml0ZUJ5dGUodmFsdWUpIHtcclxuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDEpO1xyXG4gICAgdGhpcy52aWV3LnNldFVpbnQ4KHRoaXMub2Zmc2V0LCB2YWx1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAxO1xyXG4gIH1cclxuICB3cml0ZUJ5dGVzKHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcih2YWx1ZS5sZW5ndGgpO1xyXG4gICAgbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIuYnVmZmVyLCB0aGlzLm9mZnNldCwgdmFsdWUubGVuZ3RoKS5zZXQodmFsdWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gdmFsdWUubGVuZ3RoO1xyXG4gIH1cclxuICB3cml0ZUk4KHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxKTtcclxuICAgIHRoaXMudmlldy5zZXRJbnQ4KHRoaXMub2Zmc2V0LCB2YWx1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAxO1xyXG4gIH1cclxuICB3cml0ZVU4KHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxKTtcclxuICAgIHRoaXMudmlldy5zZXRVaW50OCh0aGlzLm9mZnNldCwgdmFsdWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gMTtcclxuICB9XHJcbiAgd3JpdGVJMTYodmFsdWUpIHtcclxuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDIpO1xyXG4gICAgdGhpcy52aWV3LnNldEludDE2KHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAyO1xyXG4gIH1cclxuICB3cml0ZVUxNih2YWx1ZSkge1xyXG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMik7XHJcbiAgICB0aGlzLnZpZXcuc2V0VWludDE2KHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAyO1xyXG4gIH1cclxuICB3cml0ZUkzMih2YWx1ZSkge1xyXG4gICAgdGhpcy5leHBhbmRCdWZmZXIoNCk7XHJcbiAgICB0aGlzLnZpZXcuc2V0SW50MzIodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcclxuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XHJcbiAgfVxyXG4gIHdyaXRlVTMyKHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcig0KTtcclxuICAgIHRoaXMudmlldy5zZXRVaW50MzIodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcclxuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XHJcbiAgfVxyXG4gIHdyaXRlSTY0KHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcig4KTtcclxuICAgIHRoaXMudmlldy5zZXRCaWdJbnQ2NCh0aGlzLm9mZnNldCwgdmFsdWUsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gODtcclxuICB9XHJcbiAgd3JpdGVVNjQodmFsdWUpIHtcclxuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDgpO1xyXG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgdmFsdWUsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gODtcclxuICB9XHJcbiAgd3JpdGVVMTI4KHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxNik7XHJcbiAgICBjb25zdCBsb3dlclBhcnQgPSB2YWx1ZSAmIEJpZ0ludChcIjB4RkZGRkZGRkZGRkZGRkZGRlwiKTtcclxuICAgIGNvbnN0IHVwcGVyUGFydCA9IHZhbHVlID4+IEJpZ0ludCg2NCk7XHJcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0LCBsb3dlclBhcnQsIHRydWUpO1xyXG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDgsIHVwcGVyUGFydCwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAxNjtcclxuICB9XHJcbiAgd3JpdGVJMTI4KHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxNik7XHJcbiAgICBjb25zdCBsb3dlclBhcnQgPSB2YWx1ZSAmIEJpZ0ludChcIjB4RkZGRkZGRkZGRkZGRkZGRlwiKTtcclxuICAgIGNvbnN0IHVwcGVyUGFydCA9IHZhbHVlID4+IEJpZ0ludCg2NCk7XHJcbiAgICB0aGlzLnZpZXcuc2V0QmlnSW50NjQodGhpcy5vZmZzZXQsIGxvd2VyUGFydCwgdHJ1ZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0QmlnSW50NjQodGhpcy5vZmZzZXQgKyA4LCB1cHBlclBhcnQsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gMTY7XHJcbiAgfVxyXG4gIHdyaXRlVTI1Nih2YWx1ZSkge1xyXG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMzIpO1xyXG4gICAgY29uc3QgbG93XzY0X21hc2sgPSBCaWdJbnQoXCIweEZGRkZGRkZGRkZGRkZGRkZcIik7XHJcbiAgICBjb25zdCBwMCA9IHZhbHVlICYgbG93XzY0X21hc2s7XHJcbiAgICBjb25zdCBwMSA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDEpICYgbG93XzY0X21hc2s7XHJcbiAgICBjb25zdCBwMiA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDIpICYgbG93XzY0X21hc2s7XHJcbiAgICBjb25zdCBwMyA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDMpO1xyXG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAwLCBwMCwgdHJ1ZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDEsIHAxLCB0cnVlKTtcclxuICAgIHRoaXMudmlldy5zZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyA4ICogMiwgcDIsIHRydWUpO1xyXG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAzLCBwMywgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSAzMjtcclxuICB9XHJcbiAgd3JpdGVJMjU2KHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigzMik7XHJcbiAgICBjb25zdCBsb3dfNjRfbWFzayA9IEJpZ0ludChcIjB4RkZGRkZGRkZGRkZGRkZGRlwiKTtcclxuICAgIGNvbnN0IHAwID0gdmFsdWUgJiBsb3dfNjRfbWFzaztcclxuICAgIGNvbnN0IHAxID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMSkgJiBsb3dfNjRfbWFzaztcclxuICAgIGNvbnN0IHAyID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMikgJiBsb3dfNjRfbWFzaztcclxuICAgIGNvbnN0IHAzID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMyk7XHJcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDAsIHAwLCB0cnVlKTtcclxuICAgIHRoaXMudmlldy5zZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyA4ICogMSwgcDEsIHRydWUpO1xyXG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAyLCBwMiwgdHJ1ZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0QmlnSW50NjQodGhpcy5vZmZzZXQgKyA4ICogMywgcDMsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gMzI7XHJcbiAgfVxyXG4gIHdyaXRlRjMyKHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcig0KTtcclxuICAgIHRoaXMudmlldy5zZXRGbG9hdDMyKHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgICB0aGlzLm9mZnNldCArPSA0O1xyXG4gIH1cclxuICB3cml0ZUY2NCh2YWx1ZSkge1xyXG4gICAgdGhpcy5leHBhbmRCdWZmZXIoOCk7XHJcbiAgICB0aGlzLnZpZXcuc2V0RmxvYXQ2NCh0aGlzLm9mZnNldCwgdmFsdWUsIHRydWUpO1xyXG4gICAgdGhpcy5vZmZzZXQgKz0gODtcclxuICB9XHJcbiAgd3JpdGVTdHJpbmcodmFsdWUpIHtcclxuICAgIGNvbnN0IGxlbiA9IHZhbHVlLmxlbmd0aDtcclxuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDQgKyBsZW4pO1xyXG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIpO1xyXG4gICAgbGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0ICsgNDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgIGlmIChjID49IDEyOCkgYnJlYWs7XHJcbiAgICAgIGJ5dGVzW29mZnNldCsrXSA9IGM7XHJcbiAgICB9XHJcbiAgICBpZiAoaSA9PT0gbGVuKSB7XHJcbiAgICAgIHRoaXMudmlldy5zZXRVaW50MzIodGhpcy5vZmZzZXQsIGxlbiwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLndyaXRlVUludDhBcnJheSh0ZXh0RW5jb2Rlci5lbmNvZGUodmFsdWUpKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBzcmMvbGliL3V0aWwudHNcclxuZnVuY3Rpb24gdWludDhBcnJheVRvSGV4U3RyaW5nKGFycmF5KSB7XHJcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhcnJheS5yZXZlcnNlKCksICh4KSA9PiAoXCIwMFwiICsgeC50b1N0cmluZygxNikpLnNsaWNlKC0yKSkuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiB1aW50OEFycmF5VG9VMTI4KGFycmF5KSB7XHJcbiAgaWYgKGFycmF5Lmxlbmd0aCAhPSAxNikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVaW50OEFycmF5IGlzIG5vdCAxNiBieXRlcyBsb25nOiAke2FycmF5fWApO1xyXG4gIH1cclxuICByZXR1cm4gbmV3IEJpbmFyeVJlYWRlcihhcnJheSkucmVhZFUxMjgoKTtcclxufVxyXG5mdW5jdGlvbiB1aW50OEFycmF5VG9VMjU2KGFycmF5KSB7XHJcbiAgaWYgKGFycmF5Lmxlbmd0aCAhPSAzMikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVaW50OEFycmF5IGlzIG5vdCAzMiBieXRlcyBsb25nOiBbJHthcnJheX1dYCk7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgQmluYXJ5UmVhZGVyKGFycmF5KS5yZWFkVTI1NigpO1xyXG59XHJcbmZ1bmN0aW9uIGhleFN0cmluZ1RvVWludDhBcnJheShzdHIpIHtcclxuICBpZiAoc3RyLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xyXG4gICAgc3RyID0gc3RyLnNsaWNlKDIpO1xyXG4gIH1cclxuICBjb25zdCBtYXRjaGVzID0gc3RyLm1hdGNoKC8uezEsMn0vZykgfHwgW107XHJcbiAgY29uc3QgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShcclxuICAgIG1hdGNoZXMubWFwKChieXRlKSA9PiBwYXJzZUludChieXRlLCAxNikpXHJcbiAgKTtcclxuICByZXR1cm4gZGF0YS5yZXZlcnNlKCk7XHJcbn1cclxuZnVuY3Rpb24gaGV4U3RyaW5nVG9VMTI4KHN0cikge1xyXG4gIHJldHVybiB1aW50OEFycmF5VG9VMTI4KGhleFN0cmluZ1RvVWludDhBcnJheShzdHIpKTtcclxufVxyXG5mdW5jdGlvbiBoZXhTdHJpbmdUb1UyNTYoc3RyKSB7XHJcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb1UyNTYoaGV4U3RyaW5nVG9VaW50OEFycmF5KHN0cikpO1xyXG59XHJcbmZ1bmN0aW9uIHUxMjhUb1VpbnQ4QXJyYXkoZGF0YSkge1xyXG4gIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMTYpO1xyXG4gIHdyaXRlci53cml0ZVUxMjgoZGF0YSk7XHJcbiAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcclxufVxyXG5mdW5jdGlvbiB1MTI4VG9IZXhTdHJpbmcoZGF0YSkge1xyXG4gIHJldHVybiB1aW50OEFycmF5VG9IZXhTdHJpbmcodTEyOFRvVWludDhBcnJheShkYXRhKSk7XHJcbn1cclxuZnVuY3Rpb24gdTI1NlRvVWludDhBcnJheShkYXRhKSB7XHJcbiAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigzMik7XHJcbiAgd3JpdGVyLndyaXRlVTI1NihkYXRhKTtcclxuICByZXR1cm4gd3JpdGVyLmdldEJ1ZmZlcigpO1xyXG59XHJcbmZ1bmN0aW9uIHUyNTZUb0hleFN0cmluZyhkYXRhKSB7XHJcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb0hleFN0cmluZyh1MjU2VG9VaW50OEFycmF5KGRhdGEpKTtcclxufVxyXG5mdW5jdGlvbiBjb2VyY2VUb0JpZ0ludCh2YWx1ZSwgd2hhdCkge1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYmlnaW50XCIpIHJldHVybiB2YWx1ZTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gQmlnSW50KHZhbHVlKTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSAhPT0gXCJcIikgcmV0dXJuIEJpZ0ludCh2YWx1ZSk7XHJcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgIGBDYW5ub3QgY29udmVydCAke3R5cGVvZiB2YWx1ZX0gdG8gJHt3aGF0fTogZXhwZWN0ZWQgYmlnaW50LCBpbnRlZ2VyIG51bWJlciwgb3IgZGVjaW1hbCBzdHJpbmdgXHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiB0b1Bhc2NhbENhc2Uocykge1xyXG4gIGNvbnN0IHN0ciA9IHRvQ2FtZWxDYXNlKHMpO1xyXG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcbn1cclxuZnVuY3Rpb24gdG9DYW1lbENhc2Uocykge1xyXG4gIGNvbnN0IHN0ciA9IHMucmVwbGFjZSgvWy1fXSsvZywgXCJfXCIpLnJlcGxhY2UoL18oW2EtekEtWjAtOV0pL2csIChfLCBjKSA9PiBjLnRvVXBwZXJDYXNlKCkpO1xyXG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcbn1cclxuZnVuY3Rpb24gYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIHR5KSB7XHJcbiAgY29uc3QgYXNzdW1lZEFycmF5TGVuZ3RoID0gNDtcclxuICB3aGlsZSAodHkudGFnID09PSBcIlJlZlwiKSB0eSA9IHR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XHJcbiAgaWYgKHR5LnRhZyA9PT0gXCJQcm9kdWN0XCIpIHtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgZm9yIChjb25zdCB7IGFsZ2VicmFpY1R5cGU6IGVsZW0gfSBvZiB0eS52YWx1ZS5lbGVtZW50cykge1xyXG4gICAgICBzdW0gKz0gYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIGVsZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9IGVsc2UgaWYgKHR5LnRhZyA9PT0gXCJTdW1cIikge1xyXG4gICAgbGV0IG1pbiA9IEluZmluaXR5O1xyXG4gICAgZm9yIChjb25zdCB7IGFsZ2VicmFpY1R5cGU6IHZhcmkgfSBvZiB0eS52YWx1ZS52YXJpYW50cykge1xyXG4gICAgICBjb25zdCB2U2l6ZSA9IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCB2YXJpKTtcclxuICAgICAgaWYgKHZTaXplIDwgbWluKSBtaW4gPSB2U2l6ZTtcclxuICAgIH1cclxuICAgIGlmIChtaW4gPT09IEluZmluaXR5KSBtaW4gPSAwO1xyXG4gICAgcmV0dXJuIDQgKyBtaW47XHJcbiAgfSBlbHNlIGlmICh0eS50YWcgPT0gXCJBcnJheVwiKSB7XHJcbiAgICByZXR1cm4gNCArIGFzc3VtZWRBcnJheUxlbmd0aCAqIGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCB0eS52YWx1ZSk7XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICBTdHJpbmc6IDQgKyBhc3N1bWVkQXJyYXlMZW5ndGgsXHJcbiAgICBTdW06IDEsXHJcbiAgICBCb29sOiAxLFxyXG4gICAgSTg6IDEsXHJcbiAgICBVODogMSxcclxuICAgIEkxNjogMixcclxuICAgIFUxNjogMixcclxuICAgIEkzMjogNCxcclxuICAgIFUzMjogNCxcclxuICAgIEYzMjogNCxcclxuICAgIEk2NDogOCxcclxuICAgIFU2NDogOCxcclxuICAgIEY2NDogOCxcclxuICAgIEkxMjg6IDE2LFxyXG4gICAgVTEyODogMTYsXHJcbiAgICBJMjU2OiAzMixcclxuICAgIFUyNTY6IDMyXHJcbiAgfVt0eS50YWddO1xyXG59XHJcbnZhciBoYXNPd24gPSBPYmplY3QuaGFzT3duO1xyXG5cclxuLy8gc3JjL2xpYi90aW1lX2R1cmF0aW9uLnRzXHJcbnZhciBUaW1lRHVyYXRpb24gPSBjbGFzcyBfVGltZUR1cmF0aW9uIHtcclxuICBfX3RpbWVfZHVyYXRpb25fbWljcm9zX187XHJcbiAgc3RhdGljIE1JQ1JPU19QRVJfTUlMTElTID0gMTAwMG47XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIFRpbWVEdXJhdGlvbn0gdHlwZS5cclxuICAgKiBAcmV0dXJucyBUaGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUuXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcclxuICAgICAgZWxlbWVudHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcIl9fdGltZV9kdXJhdGlvbl9taWNyb3NfX1wiLFxyXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5JNjRcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gIH1cclxuICBzdGF0aWMgaXNUaW1lRHVyYXRpb24oYWxnZWJyYWljVHlwZSkge1xyXG4gICAgaWYgKGFsZ2VicmFpY1R5cGUudGFnICE9PSBcIlByb2R1Y3RcIikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IGFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHM7XHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1pY3Jvc0VsZW1lbnQgPSBlbGVtZW50c1swXTtcclxuICAgIHJldHVybiBtaWNyb3NFbGVtZW50Lm5hbWUgPT09IFwiX190aW1lX2R1cmF0aW9uX21pY3Jvc19fXCIgJiYgbWljcm9zRWxlbWVudC5hbGdlYnJhaWNUeXBlLnRhZyA9PT0gXCJJNjRcIjtcclxuICB9XHJcbiAgZ2V0IG1pY3JvcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9fdGltZV9kdXJhdGlvbl9taWNyb3NfXztcclxuICB9XHJcbiAgZ2V0IG1pbGxpcygpIHtcclxuICAgIHJldHVybiBOdW1iZXIodGhpcy5taWNyb3MgLyBfVGltZUR1cmF0aW9uLk1JQ1JPU19QRVJfTUlMTElTKTtcclxuICB9XHJcbiAgY29uc3RydWN0b3IobWljcm9zKSB7XHJcbiAgICB0aGlzLl9fdGltZV9kdXJhdGlvbl9taWNyb3NfXyA9IGNvZXJjZVRvQmlnSW50KG1pY3JvcywgXCJUaW1lRHVyYXRpb25cIik7XHJcbiAgfVxyXG4gIHN0YXRpYyBmcm9tTWlsbGlzKG1pbGxpcykge1xyXG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uKEJpZ0ludChtaWxsaXMpICogX1RpbWVEdXJhdGlvbi5NSUNST1NfUEVSX01JTExJUyk7XHJcbiAgfVxyXG4gIC8qKiBUaGlzIG91dHB1dHMgdGhlIHNhbWUgc3RyaW5nIGZvcm1hdCB0aGF0IHdlIHVzZSBpbiB0aGUgaG9zdCBhbmQgaW4gUnVzdCBtb2R1bGVzICovXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBjb25zdCBtaWNyb3MgPSB0aGlzLm1pY3JvcztcclxuICAgIGNvbnN0IHNpZ24gPSBtaWNyb3MgPCAwID8gXCItXCIgOiBcIitcIjtcclxuICAgIGNvbnN0IHBvcyA9IG1pY3JvcyA8IDAgPyAtbWljcm9zIDogbWljcm9zO1xyXG4gICAgY29uc3Qgc2VjcyA9IHBvcyAvIDEwMDAwMDBuO1xyXG4gICAgY29uc3QgbWljcm9zX3JlbWFpbmluZyA9IHBvcyAlIDEwMDAwMDBuO1xyXG4gICAgcmV0dXJuIGAke3NpZ259JHtzZWNzfS4ke1N0cmluZyhtaWNyb3NfcmVtYWluaW5nKS5wYWRTdGFydCg2LCBcIjBcIil9YDtcclxuICB9XHJcbn07XHJcblxyXG4vLyBzcmMvbGliL3RpbWVzdGFtcC50c1xyXG52YXIgVGltZXN0YW1wID0gY2xhc3MgX1RpbWVzdGFtcCB7XHJcbiAgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXztcclxuICBzdGF0aWMgTUlDUk9TX1BFUl9NSUxMSVMgPSAxMDAwbjtcclxuICBnZXQgbWljcm9zU2luY2VVbml4RXBvY2goKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcihtaWNyb3MpIHtcclxuICAgIHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXyA9IGNvZXJjZVRvQmlnSW50KFxyXG4gICAgICBtaWNyb3MsXHJcbiAgICAgIFwiVGltZXN0YW1wXCJcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHtAbGluayBUaW1lc3RhbXB9IHR5cGUuXHJcbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xyXG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XHJcbiAgICAgIGVsZW1lbnRzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIsXHJcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLkk2NFxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBpc1RpbWVzdGFtcChhbGdlYnJhaWNUeXBlKSB7XHJcbiAgICBpZiAoYWxnZWJyYWljVHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cztcclxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggIT09IDEpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWljcm9zRWxlbWVudCA9IGVsZW1lbnRzWzBdO1xyXG4gICAgcmV0dXJuIG1pY3Jvc0VsZW1lbnQubmFtZSA9PT0gXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIgJiYgbWljcm9zRWxlbWVudC5hbGdlYnJhaWNUeXBlLnRhZyA9PT0gXCJJNjRcIjtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGhlIFVuaXggZXBvY2gsIHRoZSBtaWRuaWdodCBhdCB0aGUgYmVnaW5uaW5nIG9mIEphbnVhcnkgMSwgMTk3MCwgVVRDLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBVTklYX0VQT0NIID0gbmV3IF9UaW1lc3RhbXAoMG4pO1xyXG4gIC8qKlxyXG4gICAqIEdldCBhIGBUaW1lc3RhbXBgIHJlcHJlc2VudGluZyB0aGUgZXhlY3V0aW9uIGVudmlyb25tZW50J3MgYmVsaWVmIG9mIHRoZSBjdXJyZW50IG1vbWVudCBpbiB0aW1lLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBub3coKSB7XHJcbiAgICByZXR1cm4gX1RpbWVzdGFtcC5mcm9tRGF0ZSgvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSk7XHJcbiAgfVxyXG4gIC8qKiBDb252ZXJ0IHRvIG1pbGxpc2Vjb25kcyBzaW5jZSBVbml4IGVwb2NoLiAqL1xyXG4gIHRvTWlsbGlzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWljcm9zU2luY2VVbml4RXBvY2ggLyAxMDAwbjtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogR2V0IGEgYFRpbWVzdGFtcGAgcmVwcmVzZW50aW5nIHRoZSBzYW1lIHBvaW50IGluIHRpbWUgYXMgYGRhdGVgLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmcm9tRGF0ZShkYXRlKSB7XHJcbiAgICBjb25zdCBtaWxsaXMgPSBkYXRlLmdldFRpbWUoKTtcclxuICAgIGNvbnN0IG1pY3JvcyA9IEJpZ0ludChtaWxsaXMpICogX1RpbWVzdGFtcC5NSUNST1NfUEVSX01JTExJUztcclxuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcChtaWNyb3MpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBHZXQgYSBgRGF0ZWAgcmVwcmVzZW50aW5nIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgcG9pbnQgaW4gdGltZSBhcyBgdGhpc2AuXHJcbiAgICpcclxuICAgKiBUaGlzIG1ldGhvZCB0cnVuY2F0ZXMgdG8gbWlsbGlzZWNvbmQgcHJlY2lzaW9uLFxyXG4gICAqIGFuZCB0aHJvd3MgYFJhbmdlRXJyb3JgIGlmIHRoZSBgVGltZXN0YW1wYCBpcyBvdXRzaWRlIHRoZSByYW5nZSByZXByZXNlbnRhYmxlIGFzIGEgYERhdGVgLlxyXG4gICAqL1xyXG4gIHRvRGF0ZSgpIHtcclxuICAgIGNvbnN0IG1pY3JvcyA9IHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXztcclxuICAgIGNvbnN0IG1pbGxpcyA9IG1pY3JvcyAvIF9UaW1lc3RhbXAuTUlDUk9TX1BFUl9NSUxMSVM7XHJcbiAgICBpZiAobWlsbGlzID4gQmlnSW50KE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB8fCBtaWxsaXMgPCBCaWdJbnQoTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpKSB7XHJcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxyXG4gICAgICAgIFwiVGltZXN0YW1wIGlzIG91dHNpZGUgb2YgdGhlIHJlcHJlc2VudGFibGUgcmFuZ2Ugb2YgSlMncyBEYXRlXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgRGF0ZShOdW1iZXIobWlsbGlzKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEdldCBhbiBJU08gODYwMSAvIFJGQyAzMzM5IGZvcm1hdHRlZCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyB0aW1lc3RhbXAgd2l0aCBtaWNyb3NlY29uZCBwcmVjaXNpb24uXHJcbiAgICpcclxuICAgKiBUaGlzIG1ldGhvZCBwcmVzZXJ2ZXMgdGhlIGZ1bGwgbWljcm9zZWNvbmQgcHJlY2lzaW9uIG9mIHRoZSB0aW1lc3RhbXAsXHJcbiAgICogYW5kIHRocm93cyBgUmFuZ2VFcnJvcmAgaWYgdGhlIGBUaW1lc3RhbXBgIGlzIG91dHNpZGUgdGhlIHJhbmdlIHJlcHJlc2VudGFibGUgaW4gSVNPIGZvcm1hdC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIElTTyA4NjAxIGZvcm1hdHRlZCBzdHJpbmcgd2l0aCBtaWNyb3NlY29uZCBwcmVjaXNpb24gKGUuZy4sICcyMDI1LTAyLTE3VDEwOjMwOjQ1LjEyMzQ1NlonKVxyXG4gICAqL1xyXG4gIHRvSVNPU3RyaW5nKCkge1xyXG4gICAgY29uc3QgbWljcm9zID0gdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xyXG4gICAgY29uc3QgbWlsbGlzID0gbWljcm9zIC8gX1RpbWVzdGFtcC5NSUNST1NfUEVSX01JTExJUztcclxuICAgIGlmIChtaWxsaXMgPiBCaWdJbnQoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHx8IG1pbGxpcyA8IEJpZ0ludChOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikpIHtcclxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXHJcbiAgICAgICAgXCJUaW1lc3RhbXAgaXMgb3V0c2lkZSBvZiB0aGUgcmVwcmVzZW50YWJsZSByYW5nZSBmb3IgSVNPIHN0cmluZyBmb3JtYXR0aW5nXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShOdW1iZXIobWlsbGlzKSk7XHJcbiAgICBjb25zdCBpc29CYXNlID0gZGF0ZS50b0lTT1N0cmluZygpO1xyXG4gICAgY29uc3QgbWljcm9zUmVtYWluZGVyID0gTWF0aC5hYnMoTnVtYmVyKG1pY3JvcyAlIDEwMDAwMDBuKSk7XHJcbiAgICBjb25zdCBmcmFjdGlvbmFsUGFydCA9IFN0cmluZyhtaWNyb3NSZW1haW5kZXIpLnBhZFN0YXJ0KDYsIFwiMFwiKTtcclxuICAgIHJldHVybiBpc29CYXNlLnJlcGxhY2UoL1xcLlxcZHszfVokLywgYC4ke2ZyYWN0aW9uYWxQYXJ0fVpgKTtcclxuICB9XHJcbiAgc2luY2Uob3RoZXIpIHtcclxuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uKFxyXG4gICAgICB0aGlzLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX18gLSBvdGhlci5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIHNyYy9saWIvdXVpZC50c1xyXG52YXIgVXVpZCA9IGNsYXNzIF9VdWlkIHtcclxuICBfX3V1aWRfXztcclxuICAvKipcclxuICAgKiBUaGUgbmlsIFVVSUQgKGFsbCB6ZXJvcykuXHJcbiAgICpcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIGBgYHRzXHJcbiAgICogY29uc3QgdXVpZCA9IFV1aWQuTklMO1xyXG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxyXG4gICAqICAgdXVpZC50b1N0cmluZygpID09PSBcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiXHJcbiAgICogKTtcclxuICAgKiBgYGBcclxuICAgKi9cclxuICBzdGF0aWMgTklMID0gbmV3IF9VdWlkKDBuKTtcclxuICBzdGF0aWMgTUFYX1VVSURfQklHSU5UID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm47XHJcbiAgLyoqXHJcbiAgICogVGhlIG1heCBVVUlEIChhbGwgb25lcykuXHJcbiAgICpcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIGBgYHRzXHJcbiAgICogY29uc3QgdXVpZCA9IFV1aWQuTUFYO1xyXG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxyXG4gICAqICAgdXVpZC50b1N0cmluZygpID09PSBcImZmZmZmZmZmLWZmZmYtZmZmZi1mZmZmLWZmZmZmZmZmZmZmZlwiXHJcbiAgICogKTtcclxuICAgKiBgYGBcclxuICAgKi9cclxuICBzdGF0aWMgTUFYID0gbmV3IF9VdWlkKF9VdWlkLk1BWF9VVUlEX0JJR0lOVCk7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgVVVJRCBmcm9tIGEgcmF3IDEyOC1iaXQgdmFsdWUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdSAtIFVuc2lnbmVkIDEyOC1iaXQgaW50ZWdlclxyXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdmFsdWUgaXMgb3V0c2lkZSB0aGUgdmFsaWQgVVVJRCByYW5nZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHUpIHtcclxuICAgIGNvbnN0IHYgPSBjb2VyY2VUb0JpZ0ludCh1LCBcIlV1aWRcIik7XHJcbiAgICBpZiAodiA8IDBuIHx8IHYgPiBfVXVpZC5NQVhfVVVJRF9CSUdJTlQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBVVUlEOiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgYE1BWF9VVUlEX0JJR0lOVGBcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9fdXVpZF9fID0gdjtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgVVVJRCBgdjRgIGZyb20gZXhwbGljaXQgcmFuZG9tIGJ5dGVzLlxyXG4gICAqXHJcbiAgICogVGhpcyBtZXRob2QgYXNzdW1lcyB0aGUgYnl0ZXMgYXJlIGFscmVhZHkgc3VmZmljaWVudGx5IHJhbmRvbS5cclxuICAgKiBJdCBvbmx5IHNldHMgdGhlIGFwcHJvcHJpYXRlIGJpdHMgZm9yIHRoZSBVVUlEIHZlcnNpb24gYW5kIHZhcmlhbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYnl0ZXMgLSBFeGFjdGx5IDE2IHJhbmRvbSBieXRlc1xyXG4gICAqIEByZXR1cm5zIEEgVVVJRCBgdjRgXHJcbiAgICogQHRocm93cyB7RXJyb3J9IElmIGBieXRlcy5sZW5ndGggIT09IDE2YFxyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBgYGB0c1xyXG4gICAqIGNvbnN0IHJhbmRvbUJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xyXG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KHJhbmRvbUJ5dGVzKTtcclxuICAgKlxyXG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxyXG4gICAqICAgdXVpZC50b1N0cmluZygpID09PSBcIjAwMDAwMDAwLTAwMDAtNDAwMC04MDAwLTAwMDAwMDAwMDAwMFwiXHJcbiAgICogKTtcclxuICAgKiBgYGBcclxuICAgKi9cclxuICBzdGF0aWMgZnJvbVJhbmRvbUJ5dGVzVjQoYnl0ZXMpIHtcclxuICAgIGlmIChieXRlcy5sZW5ndGggIT09IDE2KSB0aHJvdyBuZXcgRXJyb3IoXCJVVUlEIHY0IHJlcXVpcmVzIDE2IGJ5dGVzXCIpO1xyXG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xyXG4gICAgYXJyWzZdID0gYXJyWzZdICYgMTUgfCA2NDtcclxuICAgIGFycls4XSA9IGFycls4XSAmIDYzIHwgMTI4O1xyXG4gICAgcmV0dXJuIG5ldyBfVXVpZChfVXVpZC5ieXRlc1RvQmlnSW50KGFycikpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBHZW5lcmF0ZSBhIFVVSUQgYHY3YCB1c2luZyBhIG1vbm90b25pYyBjb3VudGVyIGZyb20gYDBgIHRvIGAyXjMxIC0gMWAsXHJcbiAgICogYSB0aW1lc3RhbXAsIGFuZCA0IHJhbmRvbSBieXRlcy5cclxuICAgKlxyXG4gICAqIFRoZSBjb3VudGVyIHdyYXBzIGFyb3VuZCBvbiBvdmVyZmxvdy5cclxuICAgKlxyXG4gICAqIFRoZSBVVUlEIGB2N2AgaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzOlxyXG4gICAqXHJcbiAgICogYGBgYXNjaWlcclxuICAgKiDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcclxuICAgKiB8IEIwICB8IEIxICB8IEIyICB8IEIzICB8IEI0ICB8IEI1ICAgICAgICAgICAgICB8ICAgICAgICAgQjYgICAgICAgIHxcclxuICAgKiDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKRcclxuICAgKiB8ICAgICAgICAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICAgICAgICAgICB8ICAgICAgdmVyc2lvbiA3ICAgIHxcclxuICAgKiDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcclxuICAgKiDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcclxuICAgKiB8IEI3ICAgICAgICAgICB8IEI4ICAgICAgfCBCOSAgfCBCMTAgfCBCMTEgIHwgQjEyIHwgQjEzIHwgQjE0IHwgQjE1IHxcclxuICAgKiDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKRcclxuICAgKiB8IGNvdW50ZXJfaGlnaCB8IHZhcmlhbnQgfCAgICBjb3VudGVyX2xvdyAgIHwgICAgICAgIHJhbmRvbSAgICAgICAgIHxcclxuICAgKiDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcclxuICAgKiBgYGBcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb3VudGVyIC0gTXV0YWJsZSBtb25vdG9uaWMgY291bnRlciAoMzEtYml0KVxyXG4gICAqIEBwYXJhbSBub3cgLSBUaW1lc3RhbXAgc2luY2UgdGhlIFVuaXggZXBvY2hcclxuICAgKiBAcGFyYW0gcmFuZG9tQnl0ZXMgLSBFeGFjdGx5IDQgcmFuZG9tIGJ5dGVzXHJcbiAgICogQHJldHVybnMgQSBVVUlEIGB2N2BcclxuICAgKlxyXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgYGNvdW50ZXJgIGlzIG5lZ2F0aXZlXHJcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBgdGltZXN0YW1wYCBpcyBiZWZvcmUgdGhlIFVuaXggZXBvY2hcclxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYHJhbmRvbUJ5dGVzLmxlbmd0aCAhPT0gNGBcclxuICAgKlxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogYGBgdHNcclxuICAgKiBjb25zdCBub3cgPSBUaW1lc3RhbXAuZnJvbU1pbGxpcygxXzY4Nl8wMDBfMDAwXzAwMG4pO1xyXG4gICAqIGNvbnN0IGNvdW50ZXIgPSB7IHZhbHVlOiAxIH07XHJcbiAgICogY29uc3QgcmFuZG9tQnl0ZXMgPSBuZXcgVWludDhBcnJheSg0KTtcclxuICAgKlxyXG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLmZyb21Db3VudGVyVjcoY291bnRlciwgbm93LCByYW5kb21CeXRlcyk7XHJcbiAgICpcclxuICAgKiBjb25zb2xlLmFzc2VydChcclxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCIwMDAwNjQ3ZS01MTgwLTcwMDAtODAwMC0wMDAyMDAwMDAwMDBcIlxyXG4gICAqICk7XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21Db3VudGVyVjcoY291bnRlciwgbm93LCByYW5kb21CeXRlcykge1xyXG4gICAgaWYgKHJhbmRvbUJ5dGVzLmxlbmd0aCAhPT0gNCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgZnJvbUNvdW50ZXJWN2AgcmVxdWlyZXMgYHJhbmRvbUJ5dGVzLmxlbmd0aCA9PSA0YFwiKTtcclxuICAgIH1cclxuICAgIGlmIChjb3VudGVyLnZhbHVlIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgZnJvbUNvdW50ZXJWN2AgdXVpZCBgY291bnRlcmAgbXVzdCBiZSBub24tbmVnYXRpdmVcIik7XHJcbiAgICB9XHJcbiAgICBpZiAobm93Ll9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX18gPCAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImBmcm9tQ291bnRlclY3YCBgdGltZXN0YW1wYCBiZWZvcmUgdW5peCBlcG9jaFwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvdW50ZXJWYWwgPSBjb3VudGVyLnZhbHVlO1xyXG4gICAgY291bnRlci52YWx1ZSA9IGNvdW50ZXJWYWwgKyAxICYgMjE0NzQ4MzY0NztcclxuICAgIGNvbnN0IHRzTXMgPSBub3cudG9NaWxsaXMoKSAmIDB4ZmZmZmZmZmZmZmZmbjtcclxuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xyXG4gICAgYnl0ZXNbMF0gPSBOdW1iZXIodHNNcyA+PiA0MG4gJiAweGZmbik7XHJcbiAgICBieXRlc1sxXSA9IE51bWJlcih0c01zID4+IDMybiAmIDB4ZmZuKTtcclxuICAgIGJ5dGVzWzJdID0gTnVtYmVyKHRzTXMgPj4gMjRuICYgMHhmZm4pO1xyXG4gICAgYnl0ZXNbM10gPSBOdW1iZXIodHNNcyA+PiAxNm4gJiAweGZmbik7XHJcbiAgICBieXRlc1s0XSA9IE51bWJlcih0c01zID4+IDhuICYgMHhmZm4pO1xyXG4gICAgYnl0ZXNbNV0gPSBOdW1iZXIodHNNcyAmIDB4ZmZuKTtcclxuICAgIGJ5dGVzWzddID0gY291bnRlclZhbCA+Pj4gMjMgJiAyNTU7XHJcbiAgICBieXRlc1s5XSA9IGNvdW50ZXJWYWwgPj4+IDE1ICYgMjU1O1xyXG4gICAgYnl0ZXNbMTBdID0gY291bnRlclZhbCA+Pj4gNyAmIDI1NTtcclxuICAgIGJ5dGVzWzExXSA9IChjb3VudGVyVmFsICYgMTI3KSA8PCAxICYgMjU1O1xyXG4gICAgYnl0ZXNbMTJdIHw9IHJhbmRvbUJ5dGVzWzBdICYgMTI3O1xyXG4gICAgYnl0ZXNbMTNdID0gcmFuZG9tQnl0ZXNbMV07XHJcbiAgICBieXRlc1sxNF0gPSByYW5kb21CeXRlc1syXTtcclxuICAgIGJ5dGVzWzE1XSA9IHJhbmRvbUJ5dGVzWzNdO1xyXG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDE1IHwgMTEyO1xyXG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDYzIHwgMTI4O1xyXG4gICAgcmV0dXJuIG5ldyBfVXVpZChfVXVpZC5ieXRlc1RvQmlnSW50KGJ5dGVzKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFBhcnNlIGEgVVVJRCBmcm9tIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHMgLSBVVUlEIHN0cmluZ1xyXG4gICAqIEByZXR1cm5zIFBhcnNlZCBVVUlEXHJcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBzdHJpbmcgaXMgbm90IGEgdmFsaWQgVVVJRFxyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBgYGB0c1xyXG4gICAqIGNvbnN0IHMgPSBcIjAxODg4ZDZlLTVjMDAtNzAwMC04MDAwLTAwMDAwMDAwMDAwMFwiO1xyXG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLnBhcnNlKHMpO1xyXG4gICAqXHJcbiAgICogY29uc29sZS5hc3NlcnQodXVpZC50b1N0cmluZygpID09PSBzKTtcclxuICAgKiBgYGBcclxuICAgKi9cclxuICBzdGF0aWMgcGFyc2Uocykge1xyXG4gICAgY29uc3QgaGV4ID0gcy5yZXBsYWNlKC8tL2csIFwiXCIpO1xyXG4gICAgaWYgKGhleC5sZW5ndGggIT09IDMyKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGhleCBVVUlEXCIpO1xyXG4gICAgbGV0IHYgPSAwbjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkgKz0gMikge1xyXG4gICAgICB2ID0gdiA8PCA4biB8IEJpZ0ludChwYXJzZUludChoZXguc2xpY2UoaSwgaSArIDIpLCAxNikpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBfVXVpZCh2KTtcclxuICB9XHJcbiAgLyoqIENvbnZlcnQgdG8gaGV4IHN0cmluZyB3aXRob3V0IGEgMHggcHJlZml4LiAqL1xyXG4gIHRvSGV4U3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHUxMjhUb0hleFN0cmluZyh0aGlzLmFzQmlnSW50KCkpO1xyXG4gIH1cclxuICAvKiogQ29udmVydCB0byBzdHJpbmcgKGh5cGhlbmF0ZWQgZm9ybSkuICovXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBjb25zdCBoZXggPSB0aGlzLnRvSGV4U3RyaW5nKCk7XHJcbiAgICByZXR1cm4gaGV4LnNsaWNlKDAsIDgpICsgXCItXCIgKyBoZXguc2xpY2UoOCwgMTIpICsgXCItXCIgKyBoZXguc2xpY2UoMTIsIDE2KSArIFwiLVwiICsgaGV4LnNsaWNlKDE2LCAyMCkgKyBcIi1cIiArIGhleC5zbGljZSgyMCk7XHJcbiAgfVxyXG4gIC8qKiBDb252ZXJ0IHRvIGJpZ2ludCAodTEyOCkuICovXHJcbiAgYXNCaWdJbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fX3V1aWRfXztcclxuICB9XHJcbiAgLyoqIFJldHVybiBhIGBVaW50OEFycmF5YCBvZiAxNiBieXRlcy4gKi9cclxuICB0b0J5dGVzKCkge1xyXG4gICAgcmV0dXJuIF9VdWlkLmJpZ0ludFRvQnl0ZXModGhpcy5fX3V1aWRfXyk7XHJcbiAgfVxyXG4gIHN0YXRpYyBieXRlc1RvQmlnSW50KGJ5dGVzKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gMG47XHJcbiAgICBmb3IgKGNvbnN0IGIgb2YgYnl0ZXMpIHJlc3VsdCA9IHJlc3VsdCA8PCA4biB8IEJpZ0ludChiKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIHN0YXRpYyBiaWdJbnRUb0J5dGVzKHZhbHVlKSB7XHJcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2KTtcclxuICAgIGZvciAobGV0IGkgPSAxNTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgYnl0ZXNbaV0gPSBOdW1iZXIodmFsdWUgJiAweGZmbik7XHJcbiAgICAgIHZhbHVlID4+PSA4bjtcclxuICAgIH1cclxuICAgIHJldHVybiBieXRlcztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdmVyc2lvbiBvZiB0aGlzIFVVSUQuXHJcbiAgICpcclxuICAgKiBUaGlzIHJlcHJlc2VudHMgdGhlIGFsZ29yaXRobSB1c2VkIHRvIGdlbmVyYXRlIHRoZSB2YWx1ZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIEEgYFV1aWRWZXJzaW9uYFxyXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdmVyc2lvbiBmaWVsZCBpcyBub3QgcmVjb2duaXplZFxyXG4gICAqL1xyXG4gIGdldFZlcnNpb24oKSB7XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gdGhpcy50b0J5dGVzKClbNl0gPj4gNCAmIDE1O1xyXG4gICAgc3dpdGNoICh2ZXJzaW9uKSB7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICByZXR1cm4gXCJWNFwiO1xyXG4gICAgICBjYXNlIDc6XHJcbiAgICAgICAgcmV0dXJuIFwiVjdcIjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBpZiAodGhpcyA9PSBfVXVpZC5OSUwpIHtcclxuICAgICAgICAgIHJldHVybiBcIk5pbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcyA9PSBfVXVpZC5NQVgpIHtcclxuICAgICAgICAgIHJldHVybiBcIk1heFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIFVVSUQgdmVyc2lvbjogJHt2ZXJzaW9ufWApO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBFeHRyYWN0IHRoZSBtb25vdG9uaWMgY291bnRlciBmcm9tIGEgVVVJRHY3LlxyXG4gICAqXHJcbiAgICogSW50ZW5kZWQgZm9yIHRlc3RpbmcgYW5kIGRpYWdub3N0aWNzLlxyXG4gICAqIEJlaGF2aW9yIGlzIHVuZGVmaW5lZCBpZiBjYWxsZWQgb24gYSBub24tVjcgVVVJRC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIDMxLWJpdCBjb3VudGVyIHZhbHVlXHJcbiAgICovXHJcbiAgZ2V0Q291bnRlcigpIHtcclxuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy50b0J5dGVzKCk7XHJcbiAgICBjb25zdCBoaWdoID0gYnl0ZXNbN107XHJcbiAgICBjb25zdCBtaWQxID0gYnl0ZXNbOV07XHJcbiAgICBjb25zdCBtaWQyID0gYnl0ZXNbMTBdO1xyXG4gICAgY29uc3QgbG93ID0gYnl0ZXNbMTFdID4+PiAxO1xyXG4gICAgcmV0dXJuIGhpZ2ggPDwgMjMgfCBtaWQxIDw8IDE1IHwgbWlkMiA8PCA3IHwgbG93IHwgMDtcclxuICB9XHJcbiAgY29tcGFyZVRvKG90aGVyKSB7XHJcbiAgICBpZiAodGhpcy5fX3V1aWRfXyA8IG90aGVyLl9fdXVpZF9fKSByZXR1cm4gLTE7XHJcbiAgICBpZiAodGhpcy5fX3V1aWRfXyA+IG90aGVyLl9fdXVpZF9fKSByZXR1cm4gMTtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuICBzdGF0aWMgZ2V0QWxnZWJyYWljVHlwZSgpIHtcclxuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xyXG4gICAgICBlbGVtZW50czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiX191dWlkX19cIixcclxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuVTEyOFxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL2xpYi9jb25uZWN0aW9uX2lkLnRzXHJcbnZhciBDb25uZWN0aW9uSWQgPSBjbGFzcyBfQ29ubmVjdGlvbklkIHtcclxuICBfX2Nvbm5lY3Rpb25faWRfXztcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBDb25uZWN0aW9uSWRgLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuX19jb25uZWN0aW9uX2lkX18gPSBjb2VyY2VUb0JpZ0ludChkYXRhLCBcIkNvbm5lY3Rpb25JZFwiKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIENvbm5lY3Rpb25JZH0gdHlwZS5cclxuICAgKiBAcmV0dXJucyBUaGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUuXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcclxuICAgICAgZWxlbWVudHM6IFtcclxuICAgICAgICB7IG5hbWU6IFwiX19jb25uZWN0aW9uX2lkX19cIiwgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5VMTI4IH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGlzWmVybygpIHtcclxuICAgIHJldHVybiB0aGlzLl9fY29ubmVjdGlvbl9pZF9fID09PSBCaWdJbnQoMCk7XHJcbiAgfVxyXG4gIHN0YXRpYyBudWxsSWZaZXJvKGFkZHIpIHtcclxuICAgIGlmIChhZGRyLmlzWmVybygpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFkZHI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRpYyByYW5kb20oKSB7XHJcbiAgICBmdW5jdGlvbiByYW5kb21VOCgpIHtcclxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVzdWx0ID0gQmlnSW50KDApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XHJcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCA8PCBCaWdJbnQoOCkgfCBCaWdJbnQocmFuZG9tVTgoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWQocmVzdWx0KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ29tcGFyZSB0d28gY29ubmVjdGlvbiBJRHMgZm9yIGVxdWFsaXR5LlxyXG4gICAqL1xyXG4gIGlzRXF1YWwob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9fY29ubmVjdGlvbl9pZF9fID09IG90aGVyLl9fY29ubmVjdGlvbl9pZF9fO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0d28gY29ubmVjdGlvbiBJRHMgYXJlIGVxdWFsLlxyXG4gICAqL1xyXG4gIGVxdWFscyhvdGhlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNFcXVhbChvdGhlcik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFByaW50IHRoZSBjb25uZWN0aW9uIElEIGFzIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxyXG4gICAqL1xyXG4gIHRvSGV4U3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHUxMjhUb0hleFN0cmluZyh0aGlzLl9fY29ubmVjdGlvbl9pZF9fKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ29udmVydCB0aGUgY29ubmVjdGlvbiBJRCB0byBhIFVpbnQ4QXJyYXkuXHJcbiAgICovXHJcbiAgdG9VaW50OEFycmF5KCkge1xyXG4gICAgcmV0dXJuIHUxMjhUb1VpbnQ4QXJyYXkodGhpcy5fX2Nvbm5lY3Rpb25faWRfXyk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFBhcnNlIGEgY29ubmVjdGlvbiBJRCBmcm9tIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmcm9tU3RyaW5nKHN0cikge1xyXG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkKGhleFN0cmluZ1RvVTEyOChzdHIpKTtcclxuICB9XHJcbiAgc3RhdGljIGZyb21TdHJpbmdPck51bGwoc3RyKSB7XHJcbiAgICBjb25zdCBhZGRyID0gX0Nvbm5lY3Rpb25JZC5mcm9tU3RyaW5nKHN0cik7XHJcbiAgICBpZiAoYWRkci5pc1plcm8oKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhZGRyO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIHNyYy9saWIvaWRlbnRpdHkudHNcclxudmFyIElkZW50aXR5ID0gY2xhc3MgX0lkZW50aXR5IHtcclxuICBfX2lkZW50aXR5X187XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBgSWRlbnRpdHlgLlxyXG4gICAqXHJcbiAgICogYGRhdGFgIGNhbiBiZSBhIGhleGFkZWNpbWFsIHN0cmluZyBvciBhIGBiaWdpbnRgLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuX19pZGVudGl0eV9fID0gdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgPyBoZXhTdHJpbmdUb1UyNTYoZGF0YSkgOiBjb2VyY2VUb0JpZ0ludChkYXRhLCBcIklkZW50aXR5XCIpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB7QGxpbmsgSWRlbnRpdHl9IHR5cGUuXHJcbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xyXG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XHJcbiAgICAgIGVsZW1lbnRzOiBbeyBuYW1lOiBcIl9faWRlbnRpdHlfX1wiLCBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLlUyNTYgfV1cclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0d28gaWRlbnRpdGllcyBhcmUgZXF1YWwuXHJcbiAgICovXHJcbiAgaXNFcXVhbChvdGhlcikge1xyXG4gICAgcmV0dXJuIHRoaXMudG9IZXhTdHJpbmcoKSA9PT0gb3RoZXIudG9IZXhTdHJpbmcoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdHdvIGlkZW50aXRpZXMgYXJlIGVxdWFsLlxyXG4gICAqL1xyXG4gIGVxdWFscyhvdGhlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNFcXVhbChvdGhlcik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFByaW50IHRoZSBpZGVudGl0eSBhcyBhIGhleGFkZWNpbWFsIHN0cmluZy5cclxuICAgKi9cclxuICB0b0hleFN0cmluZygpIHtcclxuICAgIHJldHVybiB1MjU2VG9IZXhTdHJpbmcodGhpcy5fX2lkZW50aXR5X18pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDb252ZXJ0IHRoZSBhZGRyZXNzIHRvIGEgVWludDhBcnJheS5cclxuICAgKi9cclxuICB0b1VpbnQ4QXJyYXkoKSB7XHJcbiAgICByZXR1cm4gdTI1NlRvVWludDhBcnJheSh0aGlzLl9faWRlbnRpdHlfXyk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFBhcnNlIGFuIElkZW50aXR5IGZyb20gYSBoZXhhZGVjaW1hbCBzdHJpbmcuXHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21TdHJpbmcoc3RyKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eShzdHIpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBaZXJvIGlkZW50aXR5ICgweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDApXHJcbiAgICovXHJcbiAgc3RhdGljIHplcm8oKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eSgwbik7XHJcbiAgfVxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9IZXhTdHJpbmcoKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBzcmMvbGliL2FsZ2VicmFpY190eXBlLnRzXHJcbnZhciBTRVJJQUxJWkVSUyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XHJcbnZhciBERVNFUklBTElaRVJTID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcclxudmFyIEFsZ2VicmFpY1R5cGUgPSB7XHJcbiAgUmVmOiAodmFsdWUpID0+ICh7IHRhZzogXCJSZWZcIiwgdmFsdWUgfSksXHJcbiAgU3VtOiAodmFsdWUpID0+ICh7XHJcbiAgICB0YWc6IFwiU3VtXCIsXHJcbiAgICB2YWx1ZVxyXG4gIH0pLFxyXG4gIFByb2R1Y3Q6ICh2YWx1ZSkgPT4gKHtcclxuICAgIHRhZzogXCJQcm9kdWN0XCIsXHJcbiAgICB2YWx1ZVxyXG4gIH0pLFxyXG4gIEFycmF5OiAodmFsdWUpID0+ICh7XHJcbiAgICB0YWc6IFwiQXJyYXlcIixcclxuICAgIHZhbHVlXHJcbiAgfSksXHJcbiAgU3RyaW5nOiB7IHRhZzogXCJTdHJpbmdcIiB9LFxyXG4gIEJvb2w6IHsgdGFnOiBcIkJvb2xcIiB9LFxyXG4gIEk4OiB7IHRhZzogXCJJOFwiIH0sXHJcbiAgVTg6IHsgdGFnOiBcIlU4XCIgfSxcclxuICBJMTY6IHsgdGFnOiBcIkkxNlwiIH0sXHJcbiAgVTE2OiB7IHRhZzogXCJVMTZcIiB9LFxyXG4gIEkzMjogeyB0YWc6IFwiSTMyXCIgfSxcclxuICBVMzI6IHsgdGFnOiBcIlUzMlwiIH0sXHJcbiAgSTY0OiB7IHRhZzogXCJJNjRcIiB9LFxyXG4gIFU2NDogeyB0YWc6IFwiVTY0XCIgfSxcclxuICBJMTI4OiB7IHRhZzogXCJJMTI4XCIgfSxcclxuICBVMTI4OiB7IHRhZzogXCJVMTI4XCIgfSxcclxuICBJMjU2OiB7IHRhZzogXCJJMjU2XCIgfSxcclxuICBVMjU2OiB7IHRhZzogXCJVMjU2XCIgfSxcclxuICBGMzI6IHsgdGFnOiBcIkYzMlwiIH0sXHJcbiAgRjY0OiB7IHRhZzogXCJGNjRcIiB9LFxyXG4gIG1ha2VTZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpIHtcclxuICAgIGlmICh0eS50YWcgPT09IFwiUmVmXCIpIHtcclxuICAgICAgaWYgKCF0eXBlc3BhY2UpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IHNlcmlhbGl6ZSByZWZzIHdpdGhvdXQgYSB0eXBlc3BhY2VcIik7XHJcbiAgICAgIHdoaWxlICh0eS50YWcgPT09IFwiUmVmXCIpIHR5ID0gdHlwZXNwYWNlLnR5cGVzW3R5LnZhbHVlXTtcclxuICAgIH1cclxuICAgIHN3aXRjaCAodHkudGFnKSB7XHJcbiAgICAgIGNhc2UgXCJQcm9kdWN0XCI6XHJcbiAgICAgICAgcmV0dXJuIFByb2R1Y3RUeXBlLm1ha2VTZXJpYWxpemVyKHR5LnZhbHVlLCB0eXBlc3BhY2UpO1xyXG4gICAgICBjYXNlIFwiU3VtXCI6XHJcbiAgICAgICAgcmV0dXJuIFN1bVR5cGUubWFrZVNlcmlhbGl6ZXIodHkudmFsdWUsIHR5cGVzcGFjZSk7XHJcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxyXG4gICAgICAgIGlmICh0eS52YWx1ZS50YWcgPT09IFwiVThcIikge1xyXG4gICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZVVpbnQ4QXJyYXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIodHkudmFsdWUsIHR5cGVzcGFjZSk7XHJcbiAgICAgICAgICByZXR1cm4gKHdyaXRlciwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgd3JpdGVyLndyaXRlVTMyKHZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbSBvZiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgIHNlcmlhbGl6ZSh3cml0ZXIsIGVsZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gcHJpbWl0aXZlU2VyaWFsaXplcnNbdHkudGFnXTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKiBAZGVwcmVjYXRlZCBVc2UgYG1ha2VTZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xyXG4gIHNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdHksIHZhbHVlLCB0eXBlc3BhY2UpIHtcclxuICAgIEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkod3JpdGVyLCB2YWx1ZSk7XHJcbiAgfSxcclxuICBtYWtlRGVzZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpIHtcclxuICAgIGlmICh0eS50YWcgPT09IFwiUmVmXCIpIHtcclxuICAgICAgaWYgKCF0eXBlc3BhY2UpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGRlc2VyaWFsaXplIHJlZnMgd2l0aG91dCBhIHR5cGVzcGFjZVwiKTtcclxuICAgICAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikgdHkgPSB0eXBlc3BhY2UudHlwZXNbdHkudmFsdWVdO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICh0eS50YWcpIHtcclxuICAgICAgY2FzZSBcIlByb2R1Y3RcIjpcclxuICAgICAgICByZXR1cm4gUHJvZHVjdFR5cGUubWFrZURlc2VyaWFsaXplcih0eS52YWx1ZSwgdHlwZXNwYWNlKTtcclxuICAgICAgY2FzZSBcIlN1bVwiOlxyXG4gICAgICAgIHJldHVybiBTdW1UeXBlLm1ha2VEZXNlcmlhbGl6ZXIodHkudmFsdWUsIHR5cGVzcGFjZSk7XHJcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxyXG4gICAgICAgIGlmICh0eS52YWx1ZS50YWcgPT09IFwiVThcIikge1xyXG4gICAgICAgICAgcmV0dXJuIGRlc2VyaWFsaXplVWludDhBcnJheTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXHJcbiAgICAgICAgICAgIHR5LnZhbHVlLFxyXG4gICAgICAgICAgICB0eXBlc3BhY2VcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm4gKHJlYWRlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSByZWFkZXIucmVhZFUzMigpO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0W2ldID0gZGVzZXJpYWxpemUocmVhZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZURlc2VyaWFsaXplcnNbdHkudGFnXTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKiBAZGVwcmVjYXRlZCBVc2UgYG1ha2VEZXNlcmlhbGl6ZXJgIGluc3RlYWQuICovXHJcbiAgZGVzZXJpYWxpemVWYWx1ZShyZWFkZXIsIHR5LCB0eXBlc3BhY2UpIHtcclxuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkocmVhZGVyKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgYSB2YWx1ZSBvZiB0aGUgYWxnZWJyYWljIHR5cGUgaW50byBzb21ldGhpbmcgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGtleSBpbiBhIG1hcC5cclxuICAgKiBUaGVyZSBhcmUgbm8gZ3VhcmFudGVlcyBhYm91dCBiZWluZyBhYmxlIHRvIG9yZGVyIGl0LlxyXG4gICAqIFRoaXMgaXMgb25seSBndWFyYW50ZWVkIHRvIGJlIGNvbXBhcmFibGUgdG8gb3RoZXIgdmFsdWVzIG9mIHRoZSBzYW1lIHR5cGUuXHJcbiAgICogQHBhcmFtIHZhbHVlIEEgdmFsdWUgb2YgdGhlIGFsZ2VicmFpYyB0eXBlXHJcbiAgICogQHJldHVybnMgU29tZXRoaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBrZXkgaW4gYSBtYXAuXHJcbiAgICovXHJcbiAgaW50b01hcEtleTogZnVuY3Rpb24odHksIHZhbHVlKSB7XHJcbiAgICBzd2l0Y2ggKHR5LnRhZykge1xyXG4gICAgICBjYXNlIFwiVThcIjpcclxuICAgICAgY2FzZSBcIlUxNlwiOlxyXG4gICAgICBjYXNlIFwiVTMyXCI6XHJcbiAgICAgIGNhc2UgXCJVNjRcIjpcclxuICAgICAgY2FzZSBcIlUxMjhcIjpcclxuICAgICAgY2FzZSBcIlUyNTZcIjpcclxuICAgICAgY2FzZSBcIkk4XCI6XHJcbiAgICAgIGNhc2UgXCJJMTZcIjpcclxuICAgICAgY2FzZSBcIkkzMlwiOlxyXG4gICAgICBjYXNlIFwiSTY0XCI6XHJcbiAgICAgIGNhc2UgXCJJMTI4XCI6XHJcbiAgICAgIGNhc2UgXCJJMjU2XCI6XHJcbiAgICAgIGNhc2UgXCJGMzJcIjpcclxuICAgICAgY2FzZSBcIkY2NFwiOlxyXG4gICAgICBjYXNlIFwiU3RyaW5nXCI6XHJcbiAgICAgIGNhc2UgXCJCb29sXCI6XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICBjYXNlIFwiUHJvZHVjdFwiOlxyXG4gICAgICAgIHJldHVybiBQcm9kdWN0VHlwZS5pbnRvTWFwS2V5KHR5LnZhbHVlLCB2YWx1ZSk7XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDEwKTtcclxuICAgICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdHksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gd3JpdGVyLnRvQmFzZTY0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn07XHJcbmZ1bmN0aW9uIGJpbmRDYWxsKGYpIHtcclxuICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwuYmluZChmKTtcclxufVxyXG52YXIgcHJpbWl0aXZlU2VyaWFsaXplcnMgPSB7XHJcbiAgQm9vbDogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUJvb2wpLFxyXG4gIEk4OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSTgpLFxyXG4gIFU4OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVTgpLFxyXG4gIEkxNjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUkxNiksXHJcbiAgVTE2OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVTE2KSxcclxuICBJMzI6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVJMzIpLFxyXG4gIFUzMjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVUzMiksXHJcbiAgSTY0OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSTY0KSxcclxuICBVNjQ6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVVNjQpLFxyXG4gIEkxMjg6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVJMTI4KSxcclxuICBVMTI4OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVTEyOCksXHJcbiAgSTI1NjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUkyNTYpLFxyXG4gIFUyNTY6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVVMjU2KSxcclxuICBGMzI6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVGMzIpLFxyXG4gIEY2NDogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUY2NCksXHJcbiAgU3RyaW5nOiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlU3RyaW5nKVxyXG59O1xyXG5PYmplY3QuZnJlZXplKHByaW1pdGl2ZVNlcmlhbGl6ZXJzKTtcclxudmFyIHNlcmlhbGl6ZVVpbnQ4QXJyYXkgPSBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVUludDhBcnJheSk7XHJcbnZhciBwcmltaXRpdmVEZXNlcmlhbGl6ZXJzID0ge1xyXG4gIEJvb2w6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEJvb2wpLFxyXG4gIEk4OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJOCksXHJcbiAgVTg6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFU4KSxcclxuICBJMTY6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEkxNiksXHJcbiAgVTE2OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVMTYpLFxyXG4gIEkzMjogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkSTMyKSxcclxuICBVMzI6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFUzMiksXHJcbiAgSTY0OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJNjQpLFxyXG4gIFU2NDogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVTY0KSxcclxuICBJMTI4OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJMTI4KSxcclxuICBVMTI4OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVMTI4KSxcclxuICBJMjU2OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJMjU2KSxcclxuICBVMjU2OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVMjU2KSxcclxuICBGMzI6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEYzMiksXHJcbiAgRjY0OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRGNjQpLFxyXG4gIFN0cmluZzogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkU3RyaW5nKVxyXG59O1xyXG5PYmplY3QuZnJlZXplKHByaW1pdGl2ZURlc2VyaWFsaXplcnMpO1xyXG52YXIgZGVzZXJpYWxpemVVaW50OEFycmF5ID0gYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVUludDhBcnJheSk7XHJcbnZhciBwcmltaXRpdmVTaXplcyA9IHtcclxuICBCb29sOiAxLFxyXG4gIEk4OiAxLFxyXG4gIFU4OiAxLFxyXG4gIEkxNjogMixcclxuICBVMTY6IDIsXHJcbiAgSTMyOiA0LFxyXG4gIFUzMjogNCxcclxuICBJNjQ6IDgsXHJcbiAgVTY0OiA4LFxyXG4gIEkxMjg6IDE2LFxyXG4gIFUxMjg6IDE2LFxyXG4gIEkyNTY6IDMyLFxyXG4gIFUyNTY6IDMyLFxyXG4gIEYzMjogNCxcclxuICBGNjQ6IDhcclxufTtcclxudmFyIGZpeGVkU2l6ZVByaW1pdGl2ZXMgPSBuZXcgU2V0KE9iamVjdC5rZXlzKHByaW1pdGl2ZVNpemVzKSk7XHJcbnZhciBpc0ZpeGVkU2l6ZVByb2R1Y3QgPSAodHkpID0+IHR5LmVsZW1lbnRzLmV2ZXJ5KFxyXG4gICh7IGFsZ2VicmFpY1R5cGUgfSkgPT4gZml4ZWRTaXplUHJpbWl0aXZlcy5oYXMoYWxnZWJyYWljVHlwZS50YWcpXHJcbik7XHJcbnZhciBwcm9kdWN0U2l6ZSA9ICh0eSkgPT4gdHkuZWxlbWVudHMucmVkdWNlKFxyXG4gIChhY2MsIHsgYWxnZWJyYWljVHlwZSB9KSA9PiBhY2MgKyBwcmltaXRpdmVTaXplc1thbGdlYnJhaWNUeXBlLnRhZ10sXHJcbiAgMFxyXG4pO1xyXG52YXIgcHJpbWl0aXZlSlNOYW1lID0ge1xyXG4gIEJvb2w6IFwiVWludDhcIixcclxuICBJODogXCJJbnQ4XCIsXHJcbiAgVTg6IFwiVWludDhcIixcclxuICBJMTY6IFwiSW50MTZcIixcclxuICBVMTY6IFwiVWludDE2XCIsXHJcbiAgSTMyOiBcIkludDMyXCIsXHJcbiAgVTMyOiBcIlVpbnQzMlwiLFxyXG4gIEk2NDogXCJCaWdJbnQ2NFwiLFxyXG4gIFU2NDogXCJCaWdVaW50NjRcIixcclxuICBGMzI6IFwiRmxvYXQzMlwiLFxyXG4gIEY2NDogXCJGbG9hdDY0XCJcclxufTtcclxudmFyIHNwZWNpYWxQcm9kdWN0RGVzZXJpYWxpemVycyA9IHtcclxuICBfX3RpbWVfZHVyYXRpb25fbWljcm9zX186IChyZWFkZXIpID0+IG5ldyBUaW1lRHVyYXRpb24ocmVhZGVyLnJlYWRJNjQoKSksXHJcbiAgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXzogKHJlYWRlcikgPT4gbmV3IFRpbWVzdGFtcChyZWFkZXIucmVhZEk2NCgpKSxcclxuICBfX2lkZW50aXR5X186IChyZWFkZXIpID0+IG5ldyBJZGVudGl0eShyZWFkZXIucmVhZFUyNTYoKSksXHJcbiAgX19jb25uZWN0aW9uX2lkX186IChyZWFkZXIpID0+IG5ldyBDb25uZWN0aW9uSWQocmVhZGVyLnJlYWRVMTI4KCkpLFxyXG4gIF9fdXVpZF9fOiAocmVhZGVyKSA9PiBuZXcgVXVpZChyZWFkZXIucmVhZFUxMjgoKSlcclxufTtcclxuT2JqZWN0LmZyZWV6ZShzcGVjaWFsUHJvZHVjdERlc2VyaWFsaXplcnMpO1xyXG52YXIgdW5pdERlc2VyaWFsaXplciA9ICgpID0+ICh7fSk7XHJcbnZhciBnZXRFbGVtZW50SW5pdGlhbGl6ZXIgPSAoZWxlbWVudCkgPT4ge1xyXG4gIGxldCBpbml0O1xyXG4gIHN3aXRjaCAoZWxlbWVudC5hbGdlYnJhaWNUeXBlLnRhZykge1xyXG4gICAgY2FzZSBcIlN0cmluZ1wiOlxyXG4gICAgICBpbml0ID0gXCInJ1wiO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJCb29sXCI6XHJcbiAgICAgIGluaXQgPSBcImZhbHNlXCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIkk4XCI6XHJcbiAgICBjYXNlIFwiVThcIjpcclxuICAgIGNhc2UgXCJJMTZcIjpcclxuICAgIGNhc2UgXCJVMTZcIjpcclxuICAgIGNhc2UgXCJJMzJcIjpcclxuICAgIGNhc2UgXCJVMzJcIjpcclxuICAgICAgaW5pdCA9IFwiMFwiO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJJNjRcIjpcclxuICAgIGNhc2UgXCJVNjRcIjpcclxuICAgIGNhc2UgXCJJMTI4XCI6XHJcbiAgICBjYXNlIFwiVTEyOFwiOlxyXG4gICAgY2FzZSBcIkkyNTZcIjpcclxuICAgIGNhc2UgXCJVMjU2XCI6XHJcbiAgICAgIGluaXQgPSBcIjBuXCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIkYzMlwiOlxyXG4gICAgY2FzZSBcIkY2NFwiOlxyXG4gICAgICBpbml0ID0gXCIwLjBcIjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpbml0ID0gXCJ1bmRlZmluZWRcIjtcclxuICB9XHJcbiAgcmV0dXJuIGAke2VsZW1lbnQubmFtZX06ICR7aW5pdH1gO1xyXG59O1xyXG52YXIgUHJvZHVjdFR5cGUgPSB7XHJcbiAgbWFrZVNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xyXG4gICAgbGV0IHNlcmlhbGl6ZXIgPSBTRVJJQUxJWkVSUy5nZXQodHkpO1xyXG4gICAgaWYgKHNlcmlhbGl6ZXIgIT0gbnVsbCkgcmV0dXJuIHNlcmlhbGl6ZXI7XHJcbiAgICBpZiAoaXNGaXhlZFNpemVQcm9kdWN0KHR5KSkge1xyXG4gICAgICBjb25zdCBzaXplID0gcHJvZHVjdFNpemUodHkpO1xyXG4gICAgICBjb25zdCBib2R5MiA9IGBcInVzZSBzdHJpY3RcIjtcclxud3JpdGVyLmV4cGFuZEJ1ZmZlcigke3NpemV9KTtcclxuY29uc3QgdmlldyA9IHdyaXRlci52aWV3O1xyXG4ke3R5LmVsZW1lbnRzLm1hcChcclxuICAgICAgICAoeyBuYW1lLCBhbGdlYnJhaWNUeXBlOiB7IHRhZyB9IH0pID0+IHRhZyBpbiBwcmltaXRpdmVKU05hbWUgPyBgdmlldy5zZXQke3ByaW1pdGl2ZUpTTmFtZVt0YWddfSh3cml0ZXIub2Zmc2V0LCB2YWx1ZS4ke25hbWV9LCAke3ByaW1pdGl2ZVNpemVzW3RhZ10gPiAxID8gXCJ0cnVlXCIgOiBcIlwifSk7XHJcbndyaXRlci5vZmZzZXQgKz0gJHtwcmltaXRpdmVTaXplc1t0YWddfTtgIDogYHdyaXRlci53cml0ZSR7dGFnfSh2YWx1ZS4ke25hbWV9KTtgXHJcbiAgICAgICkuam9pbihcIlxcblwiKX1gO1xyXG4gICAgICBzZXJpYWxpemVyID0gRnVuY3Rpb24oXCJ3cml0ZXJcIiwgXCJ2YWx1ZVwiLCBib2R5Mik7XHJcbiAgICAgIFNFUklBTElaRVJTLnNldCh0eSwgc2VyaWFsaXplcik7XHJcbiAgICAgIHJldHVybiBzZXJpYWxpemVyO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2VyaWFsaXplcnMgPSB7fTtcclxuICAgIGNvbnN0IGJvZHkgPSAnXCJ1c2Ugc3RyaWN0XCI7XFxuJyArIHR5LmVsZW1lbnRzLm1hcChcclxuICAgICAgKGVsZW1lbnQpID0+IGB0aGlzLiR7ZWxlbWVudC5uYW1lfSh3cml0ZXIsIHZhbHVlLiR7ZWxlbWVudC5uYW1lfSk7YFxyXG4gICAgKS5qb2luKFwiXFxuXCIpO1xyXG4gICAgc2VyaWFsaXplciA9IEZ1bmN0aW9uKFwid3JpdGVyXCIsIFwidmFsdWVcIiwgYm9keSkuYmluZChcclxuICAgICAgc2VyaWFsaXplcnNcclxuICAgICk7XHJcbiAgICBTRVJJQUxJWkVSUy5zZXQodHksIHNlcmlhbGl6ZXIpO1xyXG4gICAgZm9yIChjb25zdCB7IG5hbWUsIGFsZ2VicmFpY1R5cGUgfSBvZiB0eS5lbGVtZW50cykge1xyXG4gICAgICBzZXJpYWxpemVyc1tuYW1lXSA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIoXHJcbiAgICAgICAgYWxnZWJyYWljVHlwZSxcclxuICAgICAgICB0eXBlc3BhY2VcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIE9iamVjdC5mcmVlemUoc2VyaWFsaXplcnMpO1xyXG4gICAgcmV0dXJuIHNlcmlhbGl6ZXI7XHJcbiAgfSxcclxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlU2VyaWFsaXplcmAgaW5zdGVhZC4gKi9cclxuICBzZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHR5LCB2YWx1ZSwgdHlwZXNwYWNlKSB7XHJcbiAgICBQcm9kdWN0VHlwZS5tYWtlU2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSh3cml0ZXIsIHZhbHVlKTtcclxuICB9LFxyXG4gIG1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xyXG4gICAgc3dpdGNoICh0eS5lbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHJldHVybiB1bml0RGVzZXJpYWxpemVyO1xyXG4gICAgICBjYXNlIDE6IHtcclxuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSB0eS5lbGVtZW50c1swXS5uYW1lO1xyXG4gICAgICAgIGlmIChoYXNPd24oc3BlY2lhbFByb2R1Y3REZXNlcmlhbGl6ZXJzLCBmaWVsZE5hbWUpKVxyXG4gICAgICAgICAgcmV0dXJuIHNwZWNpYWxQcm9kdWN0RGVzZXJpYWxpemVyc1tmaWVsZE5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgZGVzZXJpYWxpemVyID0gREVTRVJJQUxJWkVSUy5nZXQodHkpO1xyXG4gICAgaWYgKGRlc2VyaWFsaXplciAhPSBudWxsKSByZXR1cm4gZGVzZXJpYWxpemVyO1xyXG4gICAgaWYgKGlzRml4ZWRTaXplUHJvZHVjdCh0eSkpIHtcclxuICAgICAgY29uc3QgYm9keSA9IGBcInVzZSBzdHJpY3RcIjtcclxuY29uc3QgcmVzdWx0ID0geyAke3R5LmVsZW1lbnRzLm1hcChnZXRFbGVtZW50SW5pdGlhbGl6ZXIpLmpvaW4oXCIsIFwiKX0gfTtcclxuY29uc3QgdmlldyA9IHJlYWRlci52aWV3O1xyXG4ke3R5LmVsZW1lbnRzLm1hcChcclxuICAgICAgICAoeyBuYW1lLCBhbGdlYnJhaWNUeXBlOiB7IHRhZyB9IH0pID0+IHRhZyBpbiBwcmltaXRpdmVKU05hbWUgPyB0YWcgPT09IFwiQm9vbFwiID8gYHJlc3VsdC4ke25hbWV9ID0gdmlldy5nZXRVaW50OChyZWFkZXIub2Zmc2V0KSAhPT0gMDtcclxucmVhZGVyLm9mZnNldCArPSAxO2AgOiBgcmVzdWx0LiR7bmFtZX0gPSB2aWV3LmdldCR7cHJpbWl0aXZlSlNOYW1lW3RhZ119KHJlYWRlci5vZmZzZXQsICR7cHJpbWl0aXZlU2l6ZXNbdGFnXSA+IDEgPyBcInRydWVcIiA6IFwiXCJ9KTtcclxucmVhZGVyLm9mZnNldCArPSAke3ByaW1pdGl2ZVNpemVzW3RhZ119O2AgOiBgcmVzdWx0LiR7bmFtZX0gPSByZWFkZXIucmVhZCR7dGFnfSgpO2BcclxuICAgICAgKS5qb2luKFwiXFxuXCIpfVxyXG5yZXR1cm4gcmVzdWx0O2A7XHJcbiAgICAgIGRlc2VyaWFsaXplciA9IEZ1bmN0aW9uKFwicmVhZGVyXCIsIGJvZHkpO1xyXG4gICAgICBERVNFUklBTElaRVJTLnNldCh0eSwgZGVzZXJpYWxpemVyKTtcclxuICAgICAgcmV0dXJuIGRlc2VyaWFsaXplcjtcclxuICAgIH1cclxuICAgIGNvbnN0IGRlc2VyaWFsaXplcnMgPSB7fTtcclxuICAgIGRlc2VyaWFsaXplciA9IEZ1bmN0aW9uKFxyXG4gICAgICBcInJlYWRlclwiLFxyXG4gICAgICBgXCJ1c2Ugc3RyaWN0XCI7XHJcbmNvbnN0IHJlc3VsdCA9IHsgJHt0eS5lbGVtZW50cy5tYXAoZ2V0RWxlbWVudEluaXRpYWxpemVyKS5qb2luKFwiLCBcIil9IH07XHJcbiR7dHkuZWxlbWVudHMubWFwKCh7IG5hbWUgfSkgPT4gYHJlc3VsdC4ke25hbWV9ID0gdGhpcy4ke25hbWV9KHJlYWRlcik7YCkuam9pbihcIlxcblwiKX1cclxucmV0dXJuIHJlc3VsdDtgXHJcbiAgICApLmJpbmQoZGVzZXJpYWxpemVycyk7XHJcbiAgICBERVNFUklBTElaRVJTLnNldCh0eSwgZGVzZXJpYWxpemVyKTtcclxuICAgIGZvciAoY29uc3QgeyBuYW1lLCBhbGdlYnJhaWNUeXBlIH0gb2YgdHkuZWxlbWVudHMpIHtcclxuICAgICAgZGVzZXJpYWxpemVyc1tuYW1lXSA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihcclxuICAgICAgICBhbGdlYnJhaWNUeXBlLFxyXG4gICAgICAgIHR5cGVzcGFjZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmZyZWV6ZShkZXNlcmlhbGl6ZXJzKTtcclxuICAgIHJldHVybiBkZXNlcmlhbGl6ZXI7XHJcbiAgfSxcclxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlRGVzZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xyXG4gIGRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0eSwgdHlwZXNwYWNlKSB7XHJcbiAgICByZXR1cm4gUHJvZHVjdFR5cGUubWFrZURlc2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKShyZWFkZXIpO1xyXG4gIH0sXHJcbiAgaW50b01hcEtleSh0eSwgdmFsdWUpIHtcclxuICAgIGlmICh0eS5lbGVtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgY29uc3QgZmllbGROYW1lID0gdHkuZWxlbWVudHNbMF0ubmFtZTtcclxuICAgICAgaWYgKGhhc093bihzcGVjaWFsUHJvZHVjdERlc2VyaWFsaXplcnMsIGZpZWxkTmFtZSkpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWVbZmllbGROYW1lXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigxMCk7XHJcbiAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHR5KSwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHdyaXRlci50b0Jhc2U2NCgpO1xyXG4gIH1cclxufTtcclxudmFyIFN1bVR5cGUgPSB7XHJcbiAgbWFrZVNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xyXG4gICAgaWYgKHR5LnZhcmlhbnRzLmxlbmd0aCA9PSAyICYmIHR5LnZhcmlhbnRzWzBdLm5hbWUgPT09IFwic29tZVwiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwibm9uZVwiKSB7XHJcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIoXHJcbiAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcclxuICAgICAgICB0eXBlc3BhY2VcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuICh3cml0ZXIsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICAgIHdyaXRlci53cml0ZUJ5dGUoMCk7XHJcbiAgICAgICAgICBzZXJpYWxpemUod3JpdGVyLCB2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdyaXRlci53cml0ZUJ5dGUoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0eS52YXJpYW50cy5sZW5ndGggPT0gMiAmJiB0eS52YXJpYW50c1swXS5uYW1lID09PSBcIm9rXCIgJiYgdHkudmFyaWFudHNbMV0ubmFtZSA9PT0gXCJlcnJcIikge1xyXG4gICAgICBjb25zdCBzZXJpYWxpemVPayA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIoXHJcbiAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcclxuICAgICAgICB0eXBlc3BhY2VcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgc2VyaWFsaXplRXJyID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcclxuICAgICAgICB0eS52YXJpYW50c1sxXS5hbGdlYnJhaWNUeXBlLFxyXG4gICAgICAgIHR5cGVzcGFjZVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gKHdyaXRlciwgdmFsdWUpID0+IHtcclxuICAgICAgICBpZiAoXCJva1wiIGluIHZhbHVlKSB7XHJcbiAgICAgICAgICB3cml0ZXIud3JpdGVVOCgwKTtcclxuICAgICAgICAgIHNlcmlhbGl6ZU9rKHdyaXRlciwgdmFsdWUub2spO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXCJlcnJcIiBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgd3JpdGVyLndyaXRlVTgoMSk7XHJcbiAgICAgICAgICBzZXJpYWxpemVFcnIod3JpdGVyLCB2YWx1ZS5lcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgICAgICBcImNvdWxkIG5vdCBzZXJpYWxpemUgcmVzdWx0OiBvYmplY3QgaGFkIG5laXRoZXIgYSBgb2tgIG5vciBhbiBgZXJyYCBmaWVsZFwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBzZXJpYWxpemVyID0gU0VSSUFMSVpFUlMuZ2V0KHR5KTtcclxuICAgICAgaWYgKHNlcmlhbGl6ZXIgIT0gbnVsbCkgcmV0dXJuIHNlcmlhbGl6ZXI7XHJcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZXJzID0ge307XHJcbiAgICAgIGNvbnN0IGJvZHkgPSBgc3dpdGNoICh2YWx1ZS50YWcpIHtcclxuJHt0eS52YXJpYW50cy5tYXAoXHJcbiAgICAgICAgKHsgbmFtZSB9LCBpKSA9PiBgICBjYXNlICR7SlNPTi5zdHJpbmdpZnkobmFtZSl9OlxyXG4gICAgd3JpdGVyLndyaXRlQnl0ZSgke2l9KTtcclxuICAgIHJldHVybiB0aGlzLiR7bmFtZX0od3JpdGVyLCB2YWx1ZS52YWx1ZSk7YFxyXG4gICAgICApLmpvaW4oXCJcXG5cIil9XHJcbiAgZGVmYXVsdDpcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgIFxcYENvdWxkIG5vdCBzZXJpYWxpemUgc3VtIHR5cGU7IHVua25vd24gdGFnIFxcJHt2YWx1ZS50YWd9XFxgXHJcbiAgICApXHJcbn1cclxuYDtcclxuICAgICAgc2VyaWFsaXplciA9IEZ1bmN0aW9uKFwid3JpdGVyXCIsIFwidmFsdWVcIiwgYm9keSkuYmluZChcclxuICAgICAgICBzZXJpYWxpemVyc1xyXG4gICAgICApO1xyXG4gICAgICBTRVJJQUxJWkVSUy5zZXQodHksIHNlcmlhbGl6ZXIpO1xyXG4gICAgICBmb3IgKGNvbnN0IHsgbmFtZSwgYWxnZWJyYWljVHlwZSB9IG9mIHR5LnZhcmlhbnRzKSB7XHJcbiAgICAgICAgc2VyaWFsaXplcnNbbmFtZV0gPSBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKFxyXG4gICAgICAgICAgYWxnZWJyYWljVHlwZSxcclxuICAgICAgICAgIHR5cGVzcGFjZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgT2JqZWN0LmZyZWV6ZShzZXJpYWxpemVycyk7XHJcbiAgICAgIHJldHVybiBzZXJpYWxpemVyO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqIEBkZXByZWNhdGVkIFVzZSBgbWFrZVNlcmlhbGl6ZXJgIGluc3RlYWQuICovXHJcbiAgc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUsIHR5cGVzcGFjZSkge1xyXG4gICAgU3VtVHlwZS5tYWtlU2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSh3cml0ZXIsIHZhbHVlKTtcclxuICB9LFxyXG4gIG1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xyXG4gICAgaWYgKHR5LnZhcmlhbnRzLmxlbmd0aCA9PSAyICYmIHR5LnZhcmlhbnRzWzBdLm5hbWUgPT09IFwic29tZVwiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwibm9uZVwiKSB7XHJcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplID0gQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKFxyXG4gICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXHJcbiAgICAgICAgdHlwZXNwYWNlXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiAocmVhZGVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFnID0gcmVhZGVyLnJlYWRVOCgpO1xyXG4gICAgICAgIGlmICh0YWcgPT09IDApIHtcclxuICAgICAgICAgIHJldHVybiBkZXNlcmlhbGl6ZShyZWFkZXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFnID09PSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdm9pZCAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBgQ2FuJ3QgZGVzZXJpYWxpemUgYW4gb3B0aW9uIHR5cGUsIGNvdWxkbid0IGZpbmQgJHt0YWd9IHRhZ2A7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0eS52YXJpYW50cy5sZW5ndGggPT0gMiAmJiB0eS52YXJpYW50c1swXS5uYW1lID09PSBcIm9rXCIgJiYgdHkudmFyaWFudHNbMV0ubmFtZSA9PT0gXCJlcnJcIikge1xyXG4gICAgICBjb25zdCBkZXNlcmlhbGl6ZU9rID0gQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKFxyXG4gICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXHJcbiAgICAgICAgdHlwZXNwYWNlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplRXJyID0gQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKFxyXG4gICAgICAgIHR5LnZhcmlhbnRzWzFdLmFsZ2VicmFpY1R5cGUsXHJcbiAgICAgICAgdHlwZXNwYWNlXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiAocmVhZGVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFnID0gcmVhZGVyLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgaWYgKHRhZyA9PT0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHsgb2s6IGRlc2VyaWFsaXplT2socmVhZGVyKSB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFnID09PSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4geyBlcnI6IGRlc2VyaWFsaXplRXJyKHJlYWRlcikgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgYENhbid0IGRlc2VyaWFsaXplIGEgcmVzdWx0IHR5cGUsIGNvdWxkbid0IGZpbmQgJHt0YWd9IHRhZ2A7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGRlc2VyaWFsaXplciA9IERFU0VSSUFMSVpFUlMuZ2V0KHR5KTtcclxuICAgICAgaWYgKGRlc2VyaWFsaXplciAhPSBudWxsKSByZXR1cm4gZGVzZXJpYWxpemVyO1xyXG4gICAgICBjb25zdCBkZXNlcmlhbGl6ZXJzID0ge307XHJcbiAgICAgIGRlc2VyaWFsaXplciA9IEZ1bmN0aW9uKFxyXG4gICAgICAgIFwicmVhZGVyXCIsXHJcbiAgICAgICAgYHN3aXRjaCAocmVhZGVyLnJlYWRVOCgpKSB7XHJcbiR7dHkudmFyaWFudHMubWFwKFxyXG4gICAgICAgICAgKHsgbmFtZSB9LCBpKSA9PiBgY2FzZSAke2l9OiByZXR1cm4geyB0YWc6ICR7SlNPTi5zdHJpbmdpZnkobmFtZSl9LCB2YWx1ZTogdGhpcy4ke25hbWV9KHJlYWRlcikgfTtgXHJcbiAgICAgICAgKS5qb2luKFwiXFxuXCIpfSB9YFxyXG4gICAgICApLmJpbmQoZGVzZXJpYWxpemVycyk7XHJcbiAgICAgIERFU0VSSUFMSVpFUlMuc2V0KHR5LCBkZXNlcmlhbGl6ZXIpO1xyXG4gICAgICBmb3IgKGNvbnN0IHsgbmFtZSwgYWxnZWJyYWljVHlwZSB9IG9mIHR5LnZhcmlhbnRzKSB7XHJcbiAgICAgICAgZGVzZXJpYWxpemVyc1tuYW1lXSA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihcclxuICAgICAgICAgIGFsZ2VicmFpY1R5cGUsXHJcbiAgICAgICAgICB0eXBlc3BhY2VcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIE9iamVjdC5mcmVlemUoZGVzZXJpYWxpemVycyk7XHJcbiAgICAgIHJldHVybiBkZXNlcmlhbGl6ZXI7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlRGVzZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xyXG4gIGRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0eSwgdHlwZXNwYWNlKSB7XHJcbiAgICByZXR1cm4gU3VtVHlwZS5tYWtlRGVzZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpKHJlYWRlcik7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL2xpYi9vcHRpb24udHNcclxudmFyIE9wdGlvbiA9IHtcclxuICBnZXRBbGdlYnJhaWNUeXBlKGlubmVyVHlwZSkge1xyXG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuU3VtKHtcclxuICAgICAgdmFyaWFudHM6IFtcclxuICAgICAgICB7IG5hbWU6IFwic29tZVwiLCBhbGdlYnJhaWNUeXBlOiBpbm5lclR5cGUgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcIm5vbmVcIixcclxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7IGVsZW1lbnRzOiBbXSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL2xpYi9yZXN1bHQudHNcclxudmFyIFJlc3VsdCA9IHtcclxuICBnZXRBbGdlYnJhaWNUeXBlKG9rVHlwZSwgZXJyVHlwZSkge1xyXG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuU3VtKHtcclxuICAgICAgdmFyaWFudHM6IFtcclxuICAgICAgICB7IG5hbWU6IFwib2tcIiwgYWxnZWJyYWljVHlwZTogb2tUeXBlIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcImVyclwiLCBhbGdlYnJhaWNUeXBlOiBlcnJUeXBlIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL2xpYi9zY2hlZHVsZV9hdC50c1xyXG52YXIgU2NoZWR1bGVBdCA9IHtcclxuICBpbnRlcnZhbCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIEludGVydmFsKHZhbHVlKTtcclxuICB9LFxyXG4gIHRpbWUodmFsdWUpIHtcclxuICAgIHJldHVybiBUaW1lKHZhbHVlKTtcclxuICB9LFxyXG4gIGdldEFsZ2VicmFpY1R5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5TdW0oe1xyXG4gICAgICB2YXJpYW50czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiSW50ZXJ2YWxcIixcclxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IFRpbWVEdXJhdGlvbi5nZXRBbGdlYnJhaWNUeXBlKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJUaW1lXCIsIGFsZ2VicmFpY1R5cGU6IFRpbWVzdGFtcC5nZXRBbGdlYnJhaWNUeXBlKCkgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGlzU2NoZWR1bGVBdChhbGdlYnJhaWNUeXBlKSB7XHJcbiAgICBpZiAoYWxnZWJyYWljVHlwZS50YWcgIT09IFwiU3VtXCIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmFyaWFudHMgPSBhbGdlYnJhaWNUeXBlLnZhbHVlLnZhcmlhbnRzO1xyXG4gICAgaWYgKHZhcmlhbnRzLmxlbmd0aCAhPT0gMikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnRlcnZhbFZhcmlhbnQgPSB2YXJpYW50cy5maW5kKCh2KSA9PiB2Lm5hbWUgPT09IFwiSW50ZXJ2YWxcIik7XHJcbiAgICBjb25zdCB0aW1lVmFyaWFudCA9IHZhcmlhbnRzLmZpbmQoKHYpID0+IHYubmFtZSA9PT0gXCJUaW1lXCIpO1xyXG4gICAgaWYgKCFpbnRlcnZhbFZhcmlhbnQgfHwgIXRpbWVWYXJpYW50KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBUaW1lRHVyYXRpb24uaXNUaW1lRHVyYXRpb24oaW50ZXJ2YWxWYXJpYW50LmFsZ2VicmFpY1R5cGUpICYmIFRpbWVzdGFtcC5pc1RpbWVzdGFtcCh0aW1lVmFyaWFudC5hbGdlYnJhaWNUeXBlKTtcclxuICB9XHJcbn07XHJcbnZhciBJbnRlcnZhbCA9IChtaWNyb3MpID0+ICh7XHJcbiAgdGFnOiBcIkludGVydmFsXCIsXHJcbiAgdmFsdWU6IG5ldyBUaW1lRHVyYXRpb24obWljcm9zKVxyXG59KTtcclxudmFyIFRpbWUgPSAobWljcm9zU2luY2VVbml4RXBvY2gpID0+ICh7XHJcbiAgdGFnOiBcIlRpbWVcIixcclxuICB2YWx1ZTogbmV3IFRpbWVzdGFtcChtaWNyb3NTaW5jZVVuaXhFcG9jaClcclxufSk7XHJcbnZhciBzY2hlZHVsZV9hdF9kZWZhdWx0ID0gU2NoZWR1bGVBdDtcclxuXHJcbi8vIHNyYy9saWIvdHlwZV91dGlsLnRzXHJcbmZ1bmN0aW9uIHNldCh4LCB0Mikge1xyXG4gIHJldHVybiB7IC4uLngsIC4uLnQyIH07XHJcbn1cclxuXHJcbi8vIHNyYy9saWIvdHlwZV9idWlsZGVycy50c1xyXG52YXIgVHlwZUJ1aWxkZXIgPSBjbGFzcyB7XHJcbiAgLyoqXHJcbiAgICogVGhlIFR5cGVTY3JpcHQgcGhhbnRvbSB0eXBlLiBUaGlzIGlzIG5vdCBzdG9yZWQgYXQgcnVudGltZSxcclxuICAgKiBidXQgaXMgdmlzaWJsZSB0byB0aGUgY29tcGlsZXJcclxuICAgKi9cclxuICB0eXBlO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBTcGFjZXRpbWVEQiBhbGdlYnJhaWMgdHlwZSAocnVu4oCRdGltZSB2YWx1ZSkuIEluIGFkZGl0aW9uIHRvIHN0b3JpbmdcclxuICAgKiB0aGUgcnVudGltZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgYEFsZ2VicmFpY1R5cGVgLCBpdCBhbHNvIGNhcHR1cmVzXHJcbiAgICogdGhlIFR5cGVTY3JpcHQgdHlwZSBpbmZvcm1hdGlvbiBvZiB0aGUgYEFsZ2VicmFpY1R5cGVgLiBUaGF0IGlzIHRvIHNheVxyXG4gICAqIHRoZSB2YWx1ZSBpcyBub3QgbWVyZWx5IGFuIGBBbGdlYnJhaWNUeXBlYCwgYnV0IGlzIGNvbnN0cnVjdGVkIHRvIGJlXHJcbiAgICogdGhlIGNvcnJlc3BvbmRpbmcgY29uY3JldGUgYEFsZ2VicmFpY1R5cGVgIGZvciB0aGUgVHlwZVNjcmlwdCB0eXBlIGBUeXBlYC5cclxuICAgKlxyXG4gICAqIGUuZy4gYHN0cmluZ2AgY29ycmVzcG9uZHMgdG8gYEFsZ2VicmFpY1R5cGUuU3RyaW5nYFxyXG4gICAqL1xyXG4gIGFsZ2VicmFpY1R5cGU7XHJcbiAgY29uc3RydWN0b3IoYWxnZWJyYWljVHlwZSkge1xyXG4gICAgdGhpcy5hbGdlYnJhaWNUeXBlID0gYWxnZWJyYWljVHlwZTtcclxuICB9XHJcbiAgb3B0aW9uYWwoKSB7XHJcbiAgICByZXR1cm4gbmV3IE9wdGlvbkJ1aWxkZXIodGhpcyk7XHJcbiAgfVxyXG4gIHNlcmlhbGl6ZSh3cml0ZXIsIHZhbHVlKSB7XHJcbiAgICBjb25zdCBzZXJpYWxpemUgPSB0aGlzLnNlcmlhbGl6ZSA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIoXHJcbiAgICAgIHRoaXMuYWxnZWJyYWljVHlwZVxyXG4gICAgKTtcclxuICAgIHNlcmlhbGl6ZSh3cml0ZXIsIHZhbHVlKTtcclxuICB9XHJcbiAgZGVzZXJpYWxpemUocmVhZGVyKSB7XHJcbiAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IHRoaXMuZGVzZXJpYWxpemUgPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXHJcbiAgICAgIHRoaXMuYWxnZWJyYWljVHlwZVxyXG4gICAgKTtcclxuICAgIHJldHVybiBkZXNlcmlhbGl6ZShyZWFkZXIpO1xyXG4gIH1cclxufTtcclxudmFyIFU4QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VOCk7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgVTE2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMTYpO1xyXG4gIH1cclxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcclxuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgYXV0b0luYygpIHtcclxuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIFUzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTMyKTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBVNjRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlU2NCk7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IFU2NENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IFU2NENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgVTEyOEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTEyOCk7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFUxMjhDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgVTI1NkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTI1Nik7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgVTI1NkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgVTI1NkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgSThCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkk4KTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBJMTZCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkxNik7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgSTMyQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMzIpO1xyXG4gIH1cclxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcclxuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgYXV0b0luYygpIHtcclxuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIEk2NEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuSTY0KTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgSTY0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgSTY0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBJMTI4QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMTI4KTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgSTEyOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBJMjU2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMjU2KTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBJMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBJMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBGMzJCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkYzMik7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgRjMyQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgRjMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIEY2NEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuRjY0KTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgQm9vbEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuQm9vbCk7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgQm9vbENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIFN0cmluZ0J1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuU3RyaW5nKTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgU3RyaW5nQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgU3RyaW5nQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgU3RyaW5nQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgU3RyaW5nQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIEFycmF5QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5BcnJheShlbGVtZW50LmFsZ2VicmFpY1R5cGUpKTtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgQXJyYXlDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBBcnJheUNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBCeXRlQXJyYXlCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkFycmF5KEFsZ2VicmFpY1R5cGUuVTgpKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBCeXRlQXJyYXlDb2x1bW5CdWlsZGVyKFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBCeXRlQXJyYXlDb2x1bW5CdWlsZGVyKHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgT3B0aW9uQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIHZhbHVlO1xyXG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICBzdXBlcihPcHRpb24uZ2V0QWxnZWJyYWljVHlwZSh2YWx1ZS5hbGdlYnJhaWNUeXBlKSk7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgT3B0aW9uQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgT3B0aW9uQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIFByb2R1Y3RCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgdHlwZU5hbWU7XHJcbiAgZWxlbWVudHM7XHJcbiAgY29uc3RydWN0b3IoZWxlbWVudHMsIG5hbWUpIHtcclxuICAgIGZ1bmN0aW9uIGVsZW1lbnRzQXJyYXlGcm9tRWxlbWVudHNPYmoob2JqKSB7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiAoe1xyXG4gICAgICAgIG5hbWU6IGtleSxcclxuICAgICAgICAvLyBMYXppbHkgcmVzb2x2ZSB0aGUgdW5kZXJseWluZyBvYmplY3QncyBhbGdlYnJhaWNUeXBlLlxyXG4gICAgICAgIC8vIFRoaXMgd2lsbCBjYWxsIG9ialtrZXldLmFsZ2VicmFpY1R5cGUgb25seSB3aGVuIHNvbWVvbmVcclxuICAgICAgICAvLyBhY3R1YWxseSByZWFkcyB0aGlzIHByb3BlcnR5LlxyXG4gICAgICAgIGdldCBhbGdlYnJhaWNUeXBlKCkge1xyXG4gICAgICAgICAgcmV0dXJuIG9ialtrZXldLmFsZ2VicmFpY1R5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICBzdXBlcihcclxuICAgICAgQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcclxuICAgICAgICBlbGVtZW50czogZWxlbWVudHNBcnJheUZyb21FbGVtZW50c09iaihlbGVtZW50cylcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLnR5cGVOYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9kdWN0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvZHVjdENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBSZXN1bHRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgb2s7XHJcbiAgZXJyO1xyXG4gIGNvbnN0cnVjdG9yKG9rLCBlcnIpIHtcclxuICAgIHN1cGVyKFJlc3VsdC5nZXRBbGdlYnJhaWNUeXBlKG9rLmFsZ2VicmFpY1R5cGUsIGVyci5hbGdlYnJhaWNUeXBlKSk7XHJcbiAgICB0aGlzLm9rID0gb2s7XHJcbiAgICB0aGlzLmVyciA9IGVycjtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBSZXN1bHRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgVW5pdEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKHsgdGFnOiBcIlByb2R1Y3RcIiwgdmFsdWU6IHsgZWxlbWVudHM6IFtdIH0gfSk7XHJcbiAgfVxyXG59O1xyXG52YXIgUm93QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIHJvdztcclxuICB0eXBlTmFtZTtcclxuICBjb25zdHJ1Y3Rvcihyb3csIG5hbWUpIHtcclxuICAgIGNvbnN0IG1hcHBlZFJvdyA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgT2JqZWN0LmVudHJpZXMocm93KS5tYXAoKFtjb2xOYW1lLCBidWlsZGVyXSkgPT4gW1xyXG4gICAgICAgIGNvbE5hbWUsXHJcbiAgICAgICAgYnVpbGRlciBpbnN0YW5jZW9mIENvbHVtbkJ1aWxkZXIgPyBidWlsZGVyIDogbmV3IENvbHVtbkJ1aWxkZXIoYnVpbGRlciwge30pXHJcbiAgICAgIF0pXHJcbiAgICApO1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhtYXBwZWRSb3cpLm1hcCgobmFtZTIpID0+ICh7XHJcbiAgICAgIG5hbWU6IG5hbWUyLFxyXG4gICAgICBnZXQgYWxnZWJyYWljVHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gbWFwcGVkUm93W25hbWUyXS50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlByb2R1Y3QoeyBlbGVtZW50cyB9KSk7XHJcbiAgICB0aGlzLnJvdyA9IG1hcHBlZFJvdztcclxuICAgIHRoaXMudHlwZU5hbWUgPSBuYW1lO1xyXG4gIH1cclxufTtcclxudmFyIFN1bUJ1aWxkZXJJbXBsID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgdmFyaWFudHM7XHJcbiAgdHlwZU5hbWU7XHJcbiAgY29uc3RydWN0b3IodmFyaWFudHMsIG5hbWUpIHtcclxuICAgIGZ1bmN0aW9uIHZhcmlhbnRzQXJyYXlGcm9tVmFyaWFudHNPYmoodmFyaWFudHMyKSB7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh2YXJpYW50czIpLm1hcCgoa2V5KSA9PiAoe1xyXG4gICAgICAgIG5hbWU6IGtleSxcclxuICAgICAgICAvLyBMYXppbHkgcmVzb2x2ZSB0aGUgdW5kZXJseWluZyBvYmplY3QncyBhbGdlYnJhaWNUeXBlLlxyXG4gICAgICAgIC8vIFRoaXMgd2lsbCBjYWxsIG9ialtrZXldLmFsZ2VicmFpY1R5cGUgb25seSB3aGVuIHNvbWVvbmVcclxuICAgICAgICAvLyBhY3R1YWxseSByZWFkcyB0aGlzIHByb3BlcnR5LlxyXG4gICAgICAgIGdldCBhbGdlYnJhaWNUeXBlKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHZhcmlhbnRzMltrZXldLmFsZ2VicmFpY1R5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICBzdXBlcihcclxuICAgICAgQWxnZWJyYWljVHlwZS5TdW0oe1xyXG4gICAgICAgIHZhcmlhbnRzOiB2YXJpYW50c0FycmF5RnJvbVZhcmlhbnRzT2JqKHZhcmlhbnRzKVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHRoaXMudmFyaWFudHMgPSB2YXJpYW50cztcclxuICAgIHRoaXMudHlwZU5hbWUgPSBuYW1lO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModmFyaWFudHMpKSB7XHJcbiAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhcmlhbnRzLCBrZXkpO1xyXG4gICAgICBjb25zdCBpc0FjY2Vzc29yID0gISFkZXNjICYmICh0eXBlb2YgZGVzYy5nZXQgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgZGVzYy5zZXQgPT09IFwiZnVuY3Rpb25cIik7XHJcbiAgICAgIGxldCBpc1VuaXQyID0gZmFsc2U7XHJcbiAgICAgIGlmICghaXNBY2Nlc3Nvcikge1xyXG4gICAgICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50c1trZXldO1xyXG4gICAgICAgIGlzVW5pdDIgPSB2YXJpYW50IGluc3RhbmNlb2YgVW5pdEJ1aWxkZXI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzVW5pdDIpIHtcclxuICAgICAgICBjb25zdCBjb25zdGFudCA9IHRoaXMuY3JlYXRlKGtleSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xyXG4gICAgICAgICAgdmFsdWU6IGNvbnN0YW50LFxyXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBmbiA9ICgodmFsdWUpID0+IHRoaXMuY3JlYXRlKGtleSwgdmFsdWUpKTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XHJcbiAgICAgICAgICB2YWx1ZTogZm4sXHJcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNyZWF0ZSh0YWcsIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgPT09IHZvaWQgMCA/IHsgdGFnIH0gOiB7IHRhZywgdmFsdWUgfTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBTdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBTdW1Db2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBTdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBTdW1CdWlsZGVyID0gU3VtQnVpbGRlckltcGw7XHJcbnZhciBTaW1wbGVTdW1CdWlsZGVySW1wbCA9IGNsYXNzIGV4dGVuZHMgU3VtQnVpbGRlckltcGwge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBTaW1wbGVTdW1CdWlsZGVyID0gU2ltcGxlU3VtQnVpbGRlckltcGw7XHJcbnZhciBTY2hlZHVsZUF0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoc2NoZWR1bGVfYXRfZGVmYXVsdC5nZXRBbGdlYnJhaWNUeXBlKCkpO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIElkZW50aXR5QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoSWRlbnRpdHkuZ2V0QWxnZWJyYWljVHlwZSgpKTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBDb25uZWN0aW9uSWRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihDb25uZWN0aW9uSWQuZ2V0QWxnZWJyYWljVHlwZSgpKTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBUaW1lc3RhbXBCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihUaW1lc3RhbXAuZ2V0QWxnZWJyYWljVHlwZSgpKTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBUaW1lRHVyYXRpb25CdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihUaW1lRHVyYXRpb24uZ2V0QWxnZWJyYWljVHlwZSgpKTtcclxuICB9XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcyxcclxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcclxuICB9XHJcbn07XHJcbnZhciBVdWlkQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoVXVpZC5nZXRBbGdlYnJhaWNUeXBlKCkpO1xyXG4gIH1cclxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcclxuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgYXV0b0luYygpIHtcclxuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xyXG4gIH1cclxufTtcclxudmFyIGRlZmF1bHRNZXRhZGF0YSA9IHt9O1xyXG52YXIgQ29sdW1uQnVpbGRlciA9IGNsYXNzIHtcclxuICB0eXBlQnVpbGRlcjtcclxuICBjb2x1bW5NZXRhZGF0YTtcclxuICBjb25zdHJ1Y3Rvcih0eXBlQnVpbGRlciwgbWV0YWRhdGEpIHtcclxuICAgIHRoaXMudHlwZUJ1aWxkZXIgPSB0eXBlQnVpbGRlcjtcclxuICAgIHRoaXMuY29sdW1uTWV0YWRhdGEgPSBtZXRhZGF0YTtcclxuICB9XHJcbiAgc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpIHtcclxuICAgIHRoaXMudHlwZUJ1aWxkZXIuc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpO1xyXG4gIH1cclxuICBkZXNlcmlhbGl6ZShyZWFkZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnR5cGVCdWlsZGVyLmRlc2VyaWFsaXplKHJlYWRlcik7XHJcbiAgfVxyXG59O1xyXG52YXIgVThDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1U4Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBVMTZDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1UxNkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcclxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcclxuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgYXV0b0luYygpIHtcclxuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgVTMyQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMzJDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIFU2NENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVTY0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBVMTI4Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMTI4Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBVMjU2Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMjU2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBJOENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSThDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIEkxNkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTE2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBhdXRvSW5jKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBJMzJDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kzMkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcclxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcclxuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgYXV0b0luYygpIHtcclxuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgSTY0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JNjRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIEkxMjhDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kxMjhDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIEkyNTZDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kyNTZDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGF1dG9JbmMoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIEYzMkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfRjMyQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX0YzMkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9GMzJDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIEY2NENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfRjY0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX0Y2NENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9GNjRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIEJvb2xDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0Jvb2xDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9Cb29sQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgU3RyaW5nQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9TdHJpbmdDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIEFycmF5Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9BcnJheUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9BcnJheUNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9BcnJheUNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgQnl0ZUFycmF5Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9CeXRlQXJyYXlDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IobWV0YWRhdGEpIHtcclxuICAgIHN1cGVyKG5ldyBUeXBlQnVpbGRlcihBbGdlYnJhaWNUeXBlLkFycmF5KEFsZ2VicmFpY1R5cGUuVTgpKSwgbWV0YWRhdGEpO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9CeXRlQXJyYXlDb2x1bW5CdWlsZGVyKFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX0J5dGVBcnJheUNvbHVtbkJ1aWxkZXIoc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KSk7XHJcbiAgfVxyXG59O1xyXG52YXIgT3B0aW9uQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9PcHRpb25Db2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfT3B0aW9uQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX09wdGlvbkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgUmVzdWx0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9SZXN1bHRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IodHlwZUJ1aWxkZXIsIG1ldGFkYXRhKSB7XHJcbiAgICBzdXBlcih0eXBlQnVpbGRlciwgbWV0YWRhdGEpO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9SZXN1bHRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgUHJvZHVjdENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfUHJvZHVjdENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9Qcm9kdWN0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9Qcm9kdWN0Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBTdW1Db2x1bW5CdWlsZGVyID0gY2xhc3MgX1N1bUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9TdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX1N1bUNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfU3VtQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9TdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgU2ltcGxlU3VtQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9TaW1wbGVTdW1Db2x1bW5CdWlsZGVyIGV4dGVuZHMgU3VtQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9TaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX1NpbXBsZVN1bUNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9TY2hlZHVsZUF0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX1NjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX1NjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIElkZW50aXR5Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcclxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcclxuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcclxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcclxuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpbWFyeUtleSgpIHtcclxuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgZGVmYXVsdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxudmFyIFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBwcmltYXJ5S2V5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBuYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG52YXIgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XHJcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XHJcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgdW5pcXVlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxyXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxyXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlZmF1bHQodmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBVdWlkQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9VdWlkQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xyXG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xyXG4gICAgcmV0dXJuIG5ldyBfVXVpZENvbHVtbkJ1aWxkZXIoXHJcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXHJcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICB1bmlxdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaW1hcnlLZXkoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcclxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcclxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcbnZhciBSZWZCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XHJcbiAgcmVmO1xyXG4gIC8qKiBUaGUgcGhhbnRvbSB0eXBlIG9mIHRoZSBwb2ludGVlIG9mIHRoaXMgcmVmLiAqL1xyXG4gIF9fc3BhY2V0aW1lVHlwZTtcclxuICBjb25zdHJ1Y3RvcihyZWYpIHtcclxuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuUmVmKHJlZikpO1xyXG4gICAgdGhpcy5yZWYgPSByZWY7XHJcbiAgfVxyXG59O1xyXG52YXIgZW51bUltcGwgPSAoKG5hbWVPck9iaiwgbWF5YmVPYmopID0+IHtcclxuICBsZXQgb2JqID0gbmFtZU9yT2JqO1xyXG4gIGxldCBuYW1lID0gdm9pZCAwO1xyXG4gIGlmICh0eXBlb2YgbmFtZU9yT2JqID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBpZiAoIW1heWJlT2JqKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgXCJXaGVuIHByb3ZpZGluZyBhIG5hbWUsIHlvdSBtdXN0IGFsc28gcHJvdmlkZSB0aGUgdmFyaWFudHMgb2JqZWN0IG9yIGFycmF5LlwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBvYmogPSBtYXliZU9iajtcclxuICAgIG5hbWUgPSBuYW1lT3JPYmo7XHJcbiAgfVxyXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgIGNvbnN0IHNpbXBsZVZhcmlhbnRzT2JqID0ge307XHJcbiAgICBmb3IgKGNvbnN0IHZhcmlhbnQgb2Ygb2JqKSB7XHJcbiAgICAgIHNpbXBsZVZhcmlhbnRzT2JqW3ZhcmlhbnRdID0gbmV3IFVuaXRCdWlsZGVyKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFNpbXBsZVN1bUJ1aWxkZXJJbXBsKHNpbXBsZVZhcmlhbnRzT2JqLCBuYW1lKTtcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBTdW1CdWlsZGVyKG9iaiwgbmFtZSk7XHJcbn0pO1xyXG52YXIgdCA9IHtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBCb29sYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBib29sZWFuYCBpbiBUeXBlU2NyaXB0LlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBCb29sQnVpbGRlcn0gaW5zdGFuY2VcclxuICAgKi9cclxuICBib29sOiAoKSA9PiBuZXcgQm9vbEJ1aWxkZXIoKSxcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBTdHJpbmdgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXHJcbiAgICogUmVwcmVzZW50ZWQgYXMgYHN0cmluZ2AgaW4gVHlwZVNjcmlwdC5cclxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgU3RyaW5nQnVpbGRlcn0gaW5zdGFuY2VcclxuICAgKi9cclxuICBzdHJpbmc6ICgpID0+IG5ldyBTdHJpbmdCdWlsZGVyKCksXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBgRjY0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEY2NEJ1aWxkZXJ9IGluc3RhbmNlXHJcbiAgICovXHJcbiAgbnVtYmVyOiAoKSA9PiBuZXcgRjY0QnVpbGRlcigpLFxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYEk4YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEk4QnVpbGRlcn0gaW5zdGFuY2VcclxuICAgKi9cclxuICBpODogKCkgPT4gbmV3IEk4QnVpbGRlcigpLFxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYFU4YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFU4QnVpbGRlcn0gaW5zdGFuY2VcclxuICAgKi9cclxuICB1ODogKCkgPT4gbmV3IFU4QnVpbGRlcigpLFxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYEkxNmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcclxuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJMTZCdWlsZGVyfSBpbnN0YW5jZVxyXG4gICAqL1xyXG4gIGkxNjogKCkgPT4gbmV3IEkxNkJ1aWxkZXIoKSxcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBVMTZgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXHJcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cclxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTE2QnVpbGRlcn0gaW5zdGFuY2VcclxuICAgKi9cclxuICB1MTY6ICgpID0+IG5ldyBVMTZCdWlsZGVyKCksXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTMyYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEkzMkJ1aWxkZXJ9IGluc3RhbmNlXHJcbiAgICovXHJcbiAgaTMyOiAoKSA9PiBuZXcgSTMyQnVpbGRlcigpLFxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYFUzMmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcclxuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVMzJCdWlsZGVyfSBpbnN0YW5jZVxyXG4gICAqL1xyXG4gIHUzMjogKCkgPT4gbmV3IFUzMkJ1aWxkZXIoKSxcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBJNjRgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXHJcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cclxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTY0QnVpbGRlcn0gaW5zdGFuY2VcclxuICAgKi9cclxuICBpNjQ6ICgpID0+IG5ldyBJNjRCdWlsZGVyKCksXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTY0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFU2NEJ1aWxkZXJ9IGluc3RhbmNlXHJcbiAgICovXHJcbiAgdTY0OiAoKSA9PiBuZXcgVTY0QnVpbGRlcigpLFxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYEkxMjhgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXHJcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cclxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTEyOEJ1aWxkZXJ9IGluc3RhbmNlXHJcbiAgICovXHJcbiAgaTEyODogKCkgPT4gbmV3IEkxMjhCdWlsZGVyKCksXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTEyOGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcclxuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVMTI4QnVpbGRlcn0gaW5zdGFuY2VcclxuICAgKi9cclxuICB1MTI4OiAoKSA9PiBuZXcgVTEyOEJ1aWxkZXIoKSxcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBJMjU2YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEkyNTZCdWlsZGVyfSBpbnN0YW5jZVxyXG4gICAqL1xyXG4gIGkyNTY6ICgpID0+IG5ldyBJMjU2QnVpbGRlcigpLFxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYFUyNTZgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXHJcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cclxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTI1NkJ1aWxkZXJ9IGluc3RhbmNlXHJcbiAgICovXHJcbiAgdTI1NjogKCkgPT4gbmV3IFUyNTZCdWlsZGVyKCksXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBgRjMyYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xyXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEYzMkJ1aWxkZXJ9IGluc3RhbmNlXHJcbiAgICovXHJcbiAgZjMyOiAoKSA9PiBuZXcgRjMyQnVpbGRlcigpLFxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYEY2NGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcclxuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBGNjRCdWlsZGVyfSBpbnN0YW5jZVxyXG4gICAqL1xyXG4gIGY2NDogKCkgPT4gbmV3IEY2NEJ1aWxkZXIoKSxcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBQcm9kdWN0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9ucy4gUHJvZHVjdCB0eXBlcyBpbiBTcGFjZXRpbWVEQlxyXG4gICAqIGFyZSBlc3NlbnRpYWxseSB0aGUgc2FtZSBhcyBvYmplY3RzIGluIEphdmFTY3JpcHQvVHlwZVNjcmlwdC5cclxuICAgKiBQcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3QgbXVzdCBhbHNvIGJlIHtAbGluayBUeXBlQnVpbGRlcn1zLlxyXG4gICAqIFJlcHJlc2VudGVkIGFzIGFuIG9iamVjdCB3aXRoIHNwZWNpZmljIHByb3BlcnRpZXMgaW4gVHlwZVNjcmlwdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBuYW1lIChvcHRpb25hbCkgQSBkaXNwbGF5IG5hbWUgZm9yIHRoZSBwcm9kdWN0IHR5cGUuIElmIG9taXR0ZWQsIGFuIGFub255bW91cyBwcm9kdWN0IHR5cGUgaXMgY3JlYXRlZC5cclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgZGVmaW5pbmcgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHR5cGUsIHdob3NlIHByb3BlcnR5XHJcbiAgICogdmFsdWVzIG11c3QgYmUge0BsaW5rIFR5cGVCdWlsZGVyfXMuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFByb2R1Y3RCdWlsZGVyfSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBvYmplY3Q6ICgobmFtZU9yT2JqLCBtYXliZU9iaikgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JPYmogPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKCFtYXliZU9iaikge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICBcIldoZW4gcHJvdmlkaW5nIGEgbmFtZSwgeW91IG11c3QgYWxzbyBwcm92aWRlIHRoZSBvYmplY3QuXCJcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgUHJvZHVjdEJ1aWxkZXIobWF5YmVPYmosIG5hbWVPck9iaik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb2R1Y3RCdWlsZGVyKG5hbWVPck9iaiwgdm9pZCAwKTtcclxuICB9KSxcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IGBSb3dgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zLiBSb3cgdHlwZXMgaW4gU3BhY2V0aW1lREJcclxuICAgKiBhcmUgc2ltaWxhciB0byBgUHJvZHVjdGAgdHlwZXMsIGJ1dCBhcmUgc3BlY2lmaWNhbGx5IHVzZWQgdG8gZGVmaW5lIHRoZSBzY2hlbWEgb2YgYSB0YWJsZSByb3cuXHJcbiAgICogUHJvcGVydGllcyBvZiB0aGUgb2JqZWN0IG11c3QgYWxzbyBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9IG9yIHtAbGluayBDb2x1bW5CdWlsZGVyfXMuXHJcbiAgICpcclxuICAgKiBZb3UgY2FuIHJlcHJlc2VudCBhIGBSb3dgIGFzIGVpdGhlciBhIHtAbGluayBSb3dPYmp9IG9yIGFuIHtAbGluayBSb3dCdWlsZGVyfSB0eXBlIHdoZW5cclxuICAgKiBkZWZpbmluZyBhIHRhYmxlIHNjaGVtYS5cclxuICAgKlxyXG4gICAqIFRoZSB7QGxpbmsgUm93QnVpbGRlcn0gdHlwZSBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBjcmVhdGUgYSB0eXBlIHdoaWNoIGNhbiBiZSB1c2VkIGFueXdoZXJlXHJcbiAgICogYSB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGlzIGFjY2VwdGVkLCBzdWNoIGFzIGluIG5lc3RlZCBvYmplY3RzIG9yIGFycmF5cywgb3IgYXMgdGhlIGFyZ3VtZW50XHJcbiAgICogdG8gYSBzY2hlZHVsZWQgZnVuY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgZGVmaW5pbmcgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHJvdywgd2hvc2UgcHJvcGVydHlcclxuICAgKiB2YWx1ZXMgbXVzdCBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9cyBvciB7QGxpbmsgQ29sdW1uQnVpbGRlcn1zLlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBSb3dCdWlsZGVyfSBpbnN0YW5jZVxyXG4gICAqL1xyXG4gIHJvdzogKChuYW1lT3JPYmosIG1heWJlT2JqKSA9PiB7XHJcbiAgICBjb25zdCBbb2JqLCBuYW1lXSA9IHR5cGVvZiBuYW1lT3JPYmogPT09IFwic3RyaW5nXCIgPyBbbWF5YmVPYmosIG5hbWVPck9ial0gOiBbbmFtZU9yT2JqLCB2b2lkIDBdO1xyXG4gICAgcmV0dXJuIG5ldyBSb3dCdWlsZGVyKG9iaiwgbmFtZSk7XHJcbiAgfSksXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zLlxyXG4gICAqIFJlcHJlc2VudGVkIGFzIGFuIGFycmF5IGluIFR5cGVTY3JpcHQuXHJcbiAgICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgdHlwZSBvZiB0aGUgYXJyYXksIHdoaWNoIG11c3QgYmUgYSBgVHlwZUJ1aWxkZXJgLlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBBcnJheUJ1aWxkZXJ9IGluc3RhbmNlXHJcbiAgICovXHJcbiAgYXJyYXkoZSkge1xyXG4gICAgcmV0dXJuIG5ldyBBcnJheUJ1aWxkZXIoZSk7XHJcbiAgfSxcclxuICBlbnVtOiBlbnVtSW1wbCxcclxuICAvKipcclxuICAgKiBUaGlzIGlzIGEgc3BlY2lhbCBoZWxwZXIgZnVuY3Rpb24gZm9yIGNvbnZlbmllbnRseSBjcmVhdGluZyBgUHJvZHVjdGAgdHlwZSBjb2x1bW5zIHdpdGggbm8gZmllbGRzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFByb2R1Y3RCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIG5vIGZpZWxkcy5cclxuICAgKi9cclxuICB1bml0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBVbml0QnVpbGRlcigpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGxhemlseS1ldmFsdWF0ZWQge0BsaW5rIFR5cGVCdWlsZGVyfS4gVGhpcyBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nXHJcbiAgICogcmVjdXJzaXZlIHR5cGVzLCBzdWNoIGFzIGEgdHJlZSBvciBsaW5rZWQgbGlzdC5cclxuICAgKiBAcGFyYW0gdGh1bmsgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSB7QGxpbmsgVHlwZUJ1aWxkZXJ9LlxyXG4gICAqIEByZXR1cm5zIEEgcHJveHkge0BsaW5rIFR5cGVCdWlsZGVyfSB0aGF0IGV2YWx1YXRlcyB0aGUgdGh1bmsgb24gZmlyc3QgYWNjZXNzLlxyXG4gICAqL1xyXG4gIGxhenkodGh1bmspIHtcclxuICAgIGxldCBjYWNoZWQgPSBudWxsO1xyXG4gICAgY29uc3QgZ2V0ID0gKCkgPT4gY2FjaGVkID8/PSB0aHVuaygpO1xyXG4gICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF90LCBwcm9wLCByZWN2KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZ2V0KCk7XHJcbiAgICAgICAgY29uc3QgdmFsID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wLCByZWN2KTtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiID8gdmFsLmJpbmQodGFyZ2V0KSA6IHZhbDtcclxuICAgICAgfSxcclxuICAgICAgc2V0KF90LCBwcm9wLCB2YWx1ZSwgcmVjdikge1xyXG4gICAgICAgIHJldHVybiBSZWZsZWN0LnNldChnZXQoKSwgcHJvcCwgdmFsdWUsIHJlY3YpO1xyXG4gICAgICB9LFxyXG4gICAgICBoYXMoX3QsIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCBpbiBnZXQoKTtcclxuICAgICAgfSxcclxuICAgICAgb3duS2V5cygpIHtcclxuICAgICAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKGdldCgpKTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKF90LCBwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2V0KCksIHByb3ApO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRQcm90b3R5cGVPZigpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKGdldCgpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBUaGlzIGlzIGEgc3BlY2lhbCBoZWxwZXIgZnVuY3Rpb24gZm9yIGNvbnZlbmllbnRseSBjcmVhdGluZyB7QGxpbmsgU2NoZWR1bGVBdH0gdHlwZSBjb2x1bW5zLlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IENvbHVtbkJ1aWxkZXIgaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFNjaGVkdWxlQXR9IHR5cGUuXHJcbiAgICovXHJcbiAgc2NoZWR1bGVBdDogKCkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBTY2hlZHVsZUF0QnVpbGRlcigpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIE9wdGlvbn0gdHlwZS5cclxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBlbnVtIHdpdGggYSBgc29tZWAgYW5kIGBub25lYCB2YXJpYW50LlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdHlwZSBvZiB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBgc29tZWAgdmFyaWFudCBvZiB0aGUgYE9wdGlvbmAuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIE9wdGlvbkJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBPcHRpb259IHR5cGUuXHJcbiAgICovXHJcbiAgb3B0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IE9wdGlvbkJ1aWxkZXIodmFsdWUpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFJlc3VsdH0gdHlwZS5cclxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBlbnVtIHdpdGggYW4gYG9rYCBhbmQgYGVycmAgdmFyaWFudC5cclxuICAgKiBAcGFyYW0gb2sgVGhlIHR5cGUgb2YgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgYG9rYCB2YXJpYW50IG9mIHRoZSBgUmVzdWx0YC5cclxuICAgKiBAcGFyYW0gZXJyIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIGBlcnJgIHZhcmlhbnQgb2YgdGhlIGBSZXN1bHRgLlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBSZXN1bHRCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgUmVzdWx0fSB0eXBlLlxyXG4gICAqL1xyXG4gIHJlc3VsdChvaywgZXJyKSB7XHJcbiAgICByZXR1cm4gbmV3IFJlc3VsdEJ1aWxkZXIob2ssIGVycik7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgSWRlbnRpdHl9IHR5cGUuXHJcbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX19pZGVudGl0eV9fYCBlbGVtZW50LlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIElkZW50aXR5fSB0eXBlLlxyXG4gICAqL1xyXG4gIGlkZW50aXR5OiAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IElkZW50aXR5QnVpbGRlcigpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIENvbm5lY3Rpb25JZH0gdHlwZS5cclxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX2Nvbm5lY3Rpb25faWRfX2AgZWxlbWVudC5cclxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBDb25uZWN0aW9uSWR9IHR5cGUuXHJcbiAgICovXHJcbiAgY29ubmVjdGlvbklkOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZEJ1aWxkZXIoKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBUaW1lc3RhbXB9IHR5cGUuXHJcbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX2AgZWxlbWVudC5cclxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBUaW1lc3RhbXB9IHR5cGUuXHJcbiAgICovXHJcbiAgdGltZXN0YW1wOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcEJ1aWxkZXIoKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBUaW1lRHVyYXRpb259IHR5cGUuXHJcbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX190aW1lX2R1cmF0aW9uX21pY3Jvc19fYCBlbGVtZW50LlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFRpbWVEdXJhdGlvbn0gdHlwZS5cclxuICAgKi9cclxuICB0aW1lRHVyYXRpb246ICgpID0+IHtcclxuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQnVpbGRlcigpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFV1aWR9IHR5cGUuXHJcbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX191dWlkX19gIGVsZW1lbnQuXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFR5cGVCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgVXVpZH0gdHlwZS5cclxuICAgKi9cclxuICB1dWlkOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFV1aWRCdWlsZGVyKCk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSBgQnl0ZUFycmF5YCB0eXBlLlxyXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBhcnJheWAgb2YgYHU4YC5cclxuICAgKiBUaGUgVHlwZVNjcmlwdCByZXByZXNlbnRhdGlvbiBpcyB7QGxpbmsgVWludDhBcnJheX0uXHJcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEJ5dGVBcnJheUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIGBCeXRlQXJyYXlgIHR5cGUuXHJcbiAgICovXHJcbiAgYnl0ZUFycmF5OiAoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IEJ5dGVBcnJheUJ1aWxkZXIoKTtcclxuICB9XHJcbn07XHJcbnZhciBNQVhfRU5WX0tFWV9CWVRFUyA9IDI1NjtcclxudmFyIE1BWF9FTlZfVkFMVUVfQllURVMgPSA4ICogMTAyNDtcclxudmFyIE1BWF9FTlZfVkFSUyA9IDI1NjtcclxudmFyIGVudmlyb25tZW50ID0gbmV3IFByb3h5KFxyXG4gIE9iamVjdC5mcmVlemUoXHJcbiAgICBPYmplY3QuYXNzaWduKC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLCB7IGdldDogKGtleSkgPT4gZW52X2dldChrZXkpIH0pXHJcbiAgKSxcclxuICB7XHJcbiAgICBnZXQodGFyZ2V0LCBrZXkpIHtcclxuICAgICAgaWYgKGtleSA9PT0gXCJnZXRcIikgcmV0dXJuIHRhcmdldC5nZXQ7XHJcbiAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdm9pZCAwO1xyXG4gICAgICByZXR1cm4gZW52X2dldChrZXkpID8/IHZvaWQgMDtcclxuICAgIH1cclxuICB9XHJcbik7XHJcbmZ1bmN0aW9uIGVudmlyb25tZW50RGVjbGFyYXRpb25zKHNjaGVtYTIpIHtcclxuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc2NoZW1hMik7XHJcbiAgaWYgKGVudHJpZXMubGVuZ3RoID4gTUFYX0VOVl9WQVJTKVxyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRvbyBtYW55IGVudmlyb25tZW50IGRlY2xhcmF0aW9uc1wiKTtcclxuICBjb25zdCBieXRlcyA9IG5ldyBUZXh0RW5jb2RlcigpO1xyXG4gIHJldHVybiBlbnRyaWVzLm1hcCgoW25hbWUsIGRlZmluaXRpb25dKSA9PiB7XHJcbiAgICBpZiAoIS9eW0EtWmEtel9dW0EtWmEtejAtOV9dKiQvLnRlc3QobmFtZSkgfHwgYnl0ZXMuZW5jb2RlKG5hbWUpLmxlbmd0aCA+IE1BWF9FTlZfS0VZX0JZVEVTKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGVudmlyb25tZW50IGRlY2xhcmF0aW9uIG5hbWVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvcHRpb25hbCA9IGRlZmluaXRpb24gaW5zdGFuY2VvZiBPcHRpb25CdWlsZGVyO1xyXG4gICAgY29uc3QgaW5uZXIgPSBvcHRpb25hbCA/IGRlZmluaXRpb24udmFsdWUgOiBkZWZpbml0aW9uO1xyXG4gICAgbGV0IHR5O1xyXG4gICAgaWYgKGlubmVyIGluc3RhbmNlb2YgU3RyaW5nQnVpbGRlcikge1xyXG4gICAgICB0eSA9IHsgdGFnOiBcIlN0cmluZ1wiIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB0eXBlID0gaW5uZXI/LmFsZ2VicmFpY1R5cGU7XHJcbiAgICAgIGlmICh0eXBlPy50YWcgIT09IFwiU3VtXCIgfHwgIShcInZhcmlhbnRzXCIgaW4gaW5uZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgIGBFbnZpcm9ubWVudCAnJHtuYW1lfScgbXVzdCBiZSBhIHN0cmluZyBvciBzaW1wbGUgZW51bWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHR5cGUudmFsdWUudmFyaWFudHMubWFwKCh2YXJpYW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHZhcmlhbnQuYWxnZWJyYWljVHlwZS50YWcgIT09IFwiUHJvZHVjdFwiIHx8IHZhcmlhbnQuYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAgIGBFbnZpcm9ubWVudCAnJHtuYW1lfScgY2Fubm90IHVzZSBhbiBlbnVtIHBheWxvYWRgXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHZhcmlhbnQubmFtZSAhPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAgIGBFbnZpcm9ubWVudCAnJHtuYW1lfScgZW51bSBjYXNlcyBtdXN0IGhhdmUgbmFtZXNgXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIGlmIChieXRlcy5lbmNvZGUodmFyaWFudC5uYW1lKS5sZW5ndGggPiBNQVhfRU5WX1ZBTFVFX0JZVEVTKVxyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRW52aXJvbm1lbnQgJyR7bmFtZX0nIGxpdGVyYWwgaXMgdG9vIGxvbmdgKTtcclxuICAgICAgICByZXR1cm4gdmFyaWFudC5uYW1lO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDAgfHwgbmV3IFNldCh2YWx1ZXMpLnNpemUgIT09IHZhbHVlcy5sZW5ndGgpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgIGBFbnZpcm9ubWVudCAnJHtuYW1lfScgbmVlZHMgYSBub25lbXB0eSBsaXRlcmFsIHVuaW9uYFxyXG4gICAgICAgICk7XHJcbiAgICAgIHR5ID0gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHsgdGFnOiBcIlN0cmluZ0xpdGVyYWxcIiwgdmFsdWU6IHZhbHVlc1swXSB9IDogeyB0YWc6IFwiVW5pb25cIiwgdmFsdWU6IHZhbHVlcyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgbmFtZSwgdHksIG9wdGlvbmFsIH07XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIHNyYy9saWIvYXV0b2dlbi90eXBlcy50c1xyXG52YXIgQWxnZWJyYWljVHlwZTIgPSB0LmVudW0oXCJBbGdlYnJhaWNUeXBlXCIsIHtcclxuICBSZWY6IHQudTMyKCksXHJcbiAgZ2V0IFN1bSgpIHtcclxuICAgIHJldHVybiBTdW1UeXBlMjtcclxuICB9LFxyXG4gIGdldCBQcm9kdWN0KCkge1xyXG4gICAgcmV0dXJuIFByb2R1Y3RUeXBlMjtcclxuICB9LFxyXG4gIGdldCBBcnJheSgpIHtcclxuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcclxuICB9LFxyXG4gIFN0cmluZzogdC51bml0KCksXHJcbiAgQm9vbDogdC51bml0KCksXHJcbiAgSTg6IHQudW5pdCgpLFxyXG4gIFU4OiB0LnVuaXQoKSxcclxuICBJMTY6IHQudW5pdCgpLFxyXG4gIFUxNjogdC51bml0KCksXHJcbiAgSTMyOiB0LnVuaXQoKSxcclxuICBVMzI6IHQudW5pdCgpLFxyXG4gIEk2NDogdC51bml0KCksXHJcbiAgVTY0OiB0LnVuaXQoKSxcclxuICBJMTI4OiB0LnVuaXQoKSxcclxuICBVMTI4OiB0LnVuaXQoKSxcclxuICBJMjU2OiB0LnVuaXQoKSxcclxuICBVMjU2OiB0LnVuaXQoKSxcclxuICBGMzI6IHQudW5pdCgpLFxyXG4gIEY2NDogdC51bml0KClcclxufSk7XHJcbnZhciBDYXNlQ29udmVyc2lvblBvbGljeSA9IHQuZW51bShcIkNhc2VDb252ZXJzaW9uUG9saWN5XCIsIHtcclxuICBOb25lOiB0LnVuaXQoKSxcclxuICBTbmFrZUNhc2U6IHQudW5pdCgpXHJcbn0pO1xyXG52YXIgRW52VmFyVHlwZSA9IHQuZW51bShcIkVudlZhclR5cGVcIiwge1xyXG4gIFN0cmluZzogdC51bml0KCksXHJcbiAgU3RyaW5nTGl0ZXJhbDogdC5zdHJpbmcoKSxcclxuICBVbmlvbjogdC5hcnJheSh0LnN0cmluZygpKVxyXG59KTtcclxudmFyIEVudmlyb25tZW50RGVjbGFyYXRpb24gPSB0Lm9iamVjdChcIkVudmlyb25tZW50RGVjbGFyYXRpb25cIiwge1xyXG4gIG5hbWU6IHQuc3RyaW5nKCksXHJcbiAgZ2V0IHR5KCkge1xyXG4gICAgcmV0dXJuIEVudlZhclR5cGU7XHJcbiAgfSxcclxuICBvcHRpb25hbDogdC5ib29sKClcclxufSk7XHJcbnZhciBFeHBsaWNpdE5hbWVFbnRyeSA9IHQuZW51bShcIkV4cGxpY2l0TmFtZUVudHJ5XCIsIHtcclxuICBnZXQgVGFibGUoKSB7XHJcbiAgICByZXR1cm4gTmFtZU1hcHBpbmc7XHJcbiAgfSxcclxuICBnZXQgRnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gTmFtZU1hcHBpbmc7XHJcbiAgfSxcclxuICBnZXQgSW5kZXgoKSB7XHJcbiAgICByZXR1cm4gTmFtZU1hcHBpbmc7XHJcbiAgfSxcclxuICBnZXQgTmFtZXNwYWNlKCkge1xyXG4gICAgcmV0dXJuIE5hbWVNYXBwaW5nO1xyXG4gIH1cclxufSk7XHJcbnZhciBFeHBsaWNpdE5hbWVzID0gdC5vYmplY3QoXCJFeHBsaWNpdE5hbWVzXCIsIHtcclxuICBnZXQgZW50cmllcygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KEV4cGxpY2l0TmFtZUVudHJ5KTtcclxuICB9XHJcbn0pO1xyXG52YXIgRnVuY3Rpb25WaXNpYmlsaXR5ID0gdC5lbnVtKFwiRnVuY3Rpb25WaXNpYmlsaXR5XCIsIHtcclxuICBQcml2YXRlOiB0LnVuaXQoKSxcclxuICBDbGllbnRDYWxsYWJsZTogdC51bml0KClcclxufSk7XHJcbnZhciBIdHRwSGVhZGVyUGFpciA9IHQub2JqZWN0KFwiSHR0cEhlYWRlclBhaXJcIiwge1xyXG4gIG5hbWU6IHQuc3RyaW5nKCksXHJcbiAgdmFsdWU6IHQuYnl0ZUFycmF5KClcclxufSk7XHJcbnZhciBIdHRwSGVhZGVycyA9IHQub2JqZWN0KFwiSHR0cEhlYWRlcnNcIiwge1xyXG4gIGdldCBlbnRyaWVzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoSHR0cEhlYWRlclBhaXIpO1xyXG4gIH1cclxufSk7XHJcbnZhciBIdHRwTWV0aG9kID0gdC5lbnVtKFwiSHR0cE1ldGhvZFwiLCB7XHJcbiAgR2V0OiB0LnVuaXQoKSxcclxuICBIZWFkOiB0LnVuaXQoKSxcclxuICBQb3N0OiB0LnVuaXQoKSxcclxuICBQdXQ6IHQudW5pdCgpLFxyXG4gIERlbGV0ZTogdC51bml0KCksXHJcbiAgQ29ubmVjdDogdC51bml0KCksXHJcbiAgT3B0aW9uczogdC51bml0KCksXHJcbiAgVHJhY2U6IHQudW5pdCgpLFxyXG4gIFBhdGNoOiB0LnVuaXQoKSxcclxuICBFeHRlbnNpb246IHQuc3RyaW5nKClcclxufSk7XHJcbnZhciBIdHRwUmVxdWVzdCA9IHQub2JqZWN0KFwiSHR0cFJlcXVlc3RcIiwge1xyXG4gIGdldCBtZXRob2QoKSB7XHJcbiAgICByZXR1cm4gSHR0cE1ldGhvZDtcclxuICB9LFxyXG4gIGdldCBoZWFkZXJzKCkge1xyXG4gICAgcmV0dXJuIEh0dHBIZWFkZXJzO1xyXG4gIH0sXHJcbiAgdGltZW91dDogdC5vcHRpb24odC50aW1lRHVyYXRpb24oKSksXHJcbiAgdXJpOiB0LnN0cmluZygpLFxyXG4gIGdldCB2ZXJzaW9uKCkge1xyXG4gICAgcmV0dXJuIEh0dHBWZXJzaW9uO1xyXG4gIH1cclxufSk7XHJcbnZhciBIdHRwUmVzcG9uc2UgPSB0Lm9iamVjdChcIkh0dHBSZXNwb25zZVwiLCB7XHJcbiAgZ2V0IGhlYWRlcnMoKSB7XHJcbiAgICByZXR1cm4gSHR0cEhlYWRlcnM7XHJcbiAgfSxcclxuICBnZXQgdmVyc2lvbigpIHtcclxuICAgIHJldHVybiBIdHRwVmVyc2lvbjtcclxuICB9LFxyXG4gIGNvZGU6IHQudTE2KClcclxufSk7XHJcbnZhciBIdHRwVmVyc2lvbiA9IHQuZW51bShcIkh0dHBWZXJzaW9uXCIsIHtcclxuICBIdHRwMDk6IHQudW5pdCgpLFxyXG4gIEh0dHAxMDogdC51bml0KCksXHJcbiAgSHR0cDExOiB0LnVuaXQoKSxcclxuICBIdHRwMjogdC51bml0KCksXHJcbiAgSHR0cDM6IHQudW5pdCgpXHJcbn0pO1xyXG52YXIgSW5kZXhUeXBlID0gdC5lbnVtKFwiSW5kZXhUeXBlXCIsIHtcclxuICBCVHJlZTogdC51bml0KCksXHJcbiAgSGFzaDogdC51bml0KClcclxufSk7XHJcbnZhciBMaWZlY3ljbGUgPSB0LmVudW0oXCJMaWZlY3ljbGVcIiwge1xyXG4gIEluaXQ6IHQudW5pdCgpLFxyXG4gIE9uQ29ubmVjdDogdC51bml0KCksXHJcbiAgT25EaXNjb25uZWN0OiB0LnVuaXQoKVxyXG59KTtcclxudmFyIE1ldGhvZE9yQW55ID0gdC5lbnVtKFwiTWV0aG9kT3JBbnlcIiwge1xyXG4gIEFueTogdC51bml0KCksXHJcbiAgZ2V0IE1ldGhvZCgpIHtcclxuICAgIHJldHVybiBIdHRwTWV0aG9kO1xyXG4gIH1cclxufSk7XHJcbnZhciBNaXNjTW9kdWxlRXhwb3J0ID0gdC5lbnVtKFwiTWlzY01vZHVsZUV4cG9ydFwiLCB7XHJcbiAgZ2V0IFR5cGVBbGlhcygpIHtcclxuICAgIHJldHVybiBUeXBlQWxpYXM7XHJcbiAgfVxyXG59KTtcclxudmFyIE5hbWVNYXBwaW5nID0gdC5vYmplY3QoXCJOYW1lTWFwcGluZ1wiLCB7XHJcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKSxcclxuICBjYW5vbmljYWxOYW1lOiB0LnN0cmluZygpXHJcbn0pO1xyXG52YXIgUHJvZHVjdFR5cGUyID0gdC5vYmplY3QoXCJQcm9kdWN0VHlwZVwiLCB7XHJcbiAgZ2V0IGVsZW1lbnRzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUHJvZHVjdFR5cGVFbGVtZW50KTtcclxuICB9XHJcbn0pO1xyXG52YXIgUHJvZHVjdFR5cGVFbGVtZW50ID0gdC5vYmplY3QoXCJQcm9kdWN0VHlwZUVsZW1lbnRcIiwge1xyXG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxyXG4gIGdldCBhbGdlYnJhaWNUeXBlKCkge1xyXG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xyXG4gIH1cclxufSk7XHJcbnZhciBSYXdDb2x1bW5EZWZWOCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmVjhcIiwge1xyXG4gIGNvbE5hbWU6IHQuc3RyaW5nKCksXHJcbiAgZ2V0IGNvbFR5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVYxMCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmYXVsdFZhbHVlVjEwXCIsIHtcclxuICBjb2xJZDogdC51MTYoKSxcclxuICB2YWx1ZTogdC5ieXRlQXJyYXkoKVxyXG59KTtcclxudmFyIFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVY5ID0gdC5vYmplY3QoXCJSYXdDb2x1bW5EZWZhdWx0VmFsdWVWOVwiLCB7XHJcbiAgdGFibGU6IHQuc3RyaW5nKCksXHJcbiAgY29sSWQ6IHQudTE2KCksXHJcbiAgdmFsdWU6IHQuYnl0ZUFycmF5KClcclxufSk7XHJcbnZhciBSYXdDb25zdHJhaW50RGF0YVY5ID0gdC5lbnVtKFwiUmF3Q29uc3RyYWludERhdGFWOVwiLCB7XHJcbiAgZ2V0IFVuaXF1ZSgpIHtcclxuICAgIHJldHVybiBSYXdVbmlxdWVDb25zdHJhaW50RGF0YVY5O1xyXG4gIH1cclxufSk7XHJcbnZhciBSYXdDb25zdHJhaW50RGVmVjEwID0gdC5vYmplY3QoXCJSYXdDb25zdHJhaW50RGVmVjEwXCIsIHtcclxuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcclxuICBnZXQgZGF0YSgpIHtcclxuICAgIHJldHVybiBSYXdDb25zdHJhaW50RGF0YVY5O1xyXG4gIH1cclxufSk7XHJcbnZhciBSYXdDb25zdHJhaW50RGVmVjggPSB0Lm9iamVjdChcIlJhd0NvbnN0cmFpbnREZWZWOFwiLCB7XHJcbiAgY29uc3RyYWludE5hbWU6IHQuc3RyaW5nKCksXHJcbiAgY29uc3RyYWludHM6IHQudTgoKSxcclxuICBjb2x1bW5zOiB0LmFycmF5KHQudTE2KCkpXHJcbn0pO1xyXG52YXIgUmF3Q29uc3RyYWludERlZlY5ID0gdC5vYmplY3QoXCJSYXdDb25zdHJhaW50RGVmVjlcIiwge1xyXG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxyXG4gIGdldCBkYXRhKCkge1xyXG4gICAgcmV0dXJuIFJhd0NvbnN0cmFpbnREYXRhVjk7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd0h0dHBIYW5kbGVyRGVmVjEwID0gdC5vYmplY3QoXCJSYXdIdHRwSGFuZGxlckRlZlYxMFwiLCB7XHJcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKVxyXG59KTtcclxudmFyIFJhd0h0dHBSb3V0ZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3SHR0cFJvdXRlRGVmVjEwXCIsIHtcclxuICBoYW5kbGVyRnVuY3Rpb246IHQuc3RyaW5nKCksXHJcbiAgZ2V0IG1ldGhvZCgpIHtcclxuICAgIHJldHVybiBNZXRob2RPckFueTtcclxuICB9LFxyXG4gIHBhdGg6IHQuc3RyaW5nKClcclxufSk7XHJcbnZhciBSYXdJbmRleEFsZ29yaXRobSA9IHQuZW51bShcIlJhd0luZGV4QWxnb3JpdGhtXCIsIHtcclxuICBCVHJlZTogdC5hcnJheSh0LnUxNigpKSxcclxuICBIYXNoOiB0LmFycmF5KHQudTE2KCkpLFxyXG4gIERpcmVjdDogdC51MTYoKVxyXG59KTtcclxudmFyIFJhd0luZGV4RGVmVjEwID0gdC5vYmplY3QoXCJSYXdJbmRleERlZlYxMFwiLCB7XHJcbiAgc291cmNlTmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXHJcbiAgYWNjZXNzb3JOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcclxuICBnZXQgYWxnb3JpdGhtKCkge1xyXG4gICAgcmV0dXJuIFJhd0luZGV4QWxnb3JpdGhtO1xyXG4gIH1cclxufSk7XHJcbnZhciBSYXdJbmRleERlZlY4ID0gdC5vYmplY3QoXCJSYXdJbmRleERlZlY4XCIsIHtcclxuICBpbmRleE5hbWU6IHQuc3RyaW5nKCksXHJcbiAgaXNVbmlxdWU6IHQuYm9vbCgpLFxyXG4gIGdldCBpbmRleFR5cGUoKSB7XHJcbiAgICByZXR1cm4gSW5kZXhUeXBlO1xyXG4gIH0sXHJcbiAgY29sdW1uczogdC5hcnJheSh0LnUxNigpKVxyXG59KTtcclxudmFyIFJhd0luZGV4RGVmVjkgPSB0Lm9iamVjdChcIlJhd0luZGV4RGVmVjlcIiwge1xyXG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxyXG4gIGFjY2Vzc29yTmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXHJcbiAgZ2V0IGFsZ29yaXRobSgpIHtcclxuICAgIHJldHVybiBSYXdJbmRleEFsZ29yaXRobTtcclxuICB9XHJcbn0pO1xyXG52YXIgUmF3TGlmZUN5Y2xlUmVkdWNlckRlZlYxMCA9IHQub2JqZWN0KFxyXG4gIFwiUmF3TGlmZUN5Y2xlUmVkdWNlckRlZlYxMFwiLFxyXG4gIHtcclxuICAgIGdldCBsaWZlY3ljbGVTcGVjKCkge1xyXG4gICAgICByZXR1cm4gTGlmZWN5Y2xlO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uTmFtZTogdC5zdHJpbmcoKVxyXG4gIH1cclxuKTtcclxudmFyIFJhd01pc2NNb2R1bGVFeHBvcnRWOSA9IHQuZW51bShcIlJhd01pc2NNb2R1bGVFeHBvcnRWOVwiLCB7XHJcbiAgZ2V0IENvbHVtbkRlZmF1bHRWYWx1ZSgpIHtcclxuICAgIHJldHVybiBSYXdDb2x1bW5EZWZhdWx0VmFsdWVWOTtcclxuICB9LFxyXG4gIGdldCBQcm9jZWR1cmUoKSB7XHJcbiAgICByZXR1cm4gUmF3UHJvY2VkdXJlRGVmVjk7XHJcbiAgfSxcclxuICBnZXQgVmlldygpIHtcclxuICAgIHJldHVybiBSYXdWaWV3RGVmVjk7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd01vZHVsZURlZiA9IHQuZW51bShcIlJhd01vZHVsZURlZlwiLCB7XHJcbiAgZ2V0IFY4QmFja0NvbXBhdCgpIHtcclxuICAgIHJldHVybiBSYXdNb2R1bGVEZWZWODtcclxuICB9LFxyXG4gIGdldCBWOSgpIHtcclxuICAgIHJldHVybiBSYXdNb2R1bGVEZWZWOTtcclxuICB9LFxyXG4gIGdldCBWMTAoKSB7XHJcbiAgICByZXR1cm4gUmF3TW9kdWxlRGVmVjEwO1xyXG4gIH1cclxufSk7XHJcbnZhciBSYXdNb2R1bGVEZWZWMTAgPSB0Lm9iamVjdChcIlJhd01vZHVsZURlZlYxMFwiLCB7XHJcbiAgZ2V0IHNlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3TW9kdWxlRGVmVjEwU2VjdGlvbik7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd01vZHVsZURlZlYxMFNlY3Rpb24gPSB0LmVudW0oXCJSYXdNb2R1bGVEZWZWMTBTZWN0aW9uXCIsIHtcclxuICBnZXQgVHlwZXNwYWNlKCkge1xyXG4gICAgcmV0dXJuIFR5cGVzcGFjZTtcclxuICB9LFxyXG4gIGdldCBUeXBlcygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd1R5cGVEZWZWMTApO1xyXG4gIH0sXHJcbiAgZ2V0IFRhYmxlcygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd1RhYmxlRGVmVjEwKTtcclxuICB9LFxyXG4gIGdldCBSZWR1Y2VycygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd1JlZHVjZXJEZWZWMTApO1xyXG4gIH0sXHJcbiAgZ2V0IFByb2NlZHVyZXMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShSYXdQcm9jZWR1cmVEZWZWMTApO1xyXG4gIH0sXHJcbiAgZ2V0IFZpZXdzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Vmlld0RlZlYxMCk7XHJcbiAgfSxcclxuICBnZXQgU2NoZWR1bGVzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3U2NoZWR1bGVEZWZWMTApO1xyXG4gIH0sXHJcbiAgZ2V0IExpZmVDeWNsZVJlZHVjZXJzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3TGlmZUN5Y2xlUmVkdWNlckRlZlYxMCk7XHJcbiAgfSxcclxuICBnZXQgUm93TGV2ZWxTZWN1cml0eSgpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd1Jvd0xldmVsU2VjdXJpdHlEZWZWOSk7XHJcbiAgfSxcclxuICBnZXQgQ2FzZUNvbnZlcnNpb25Qb2xpY3koKSB7XHJcbiAgICByZXR1cm4gQ2FzZUNvbnZlcnNpb25Qb2xpY3k7XHJcbiAgfSxcclxuICBnZXQgRXhwbGljaXROYW1lcygpIHtcclxuICAgIHJldHVybiBFeHBsaWNpdE5hbWVzO1xyXG4gIH0sXHJcbiAgZ2V0IEh0dHBIYW5kbGVycygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd0h0dHBIYW5kbGVyRGVmVjEwKTtcclxuICB9LFxyXG4gIGdldCBIdHRwUm91dGVzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3SHR0cFJvdXRlRGVmVjEwKTtcclxuICB9LFxyXG4gIGdldCBWaWV3UHJpbWFyeUtleXMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShSYXdWaWV3UHJpbWFyeUtleURlZlYxMCk7XHJcbiAgfSxcclxuICBnZXQgU3VibW9kdWxlcygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd1N1Ym1vZHVsZVYxMCk7XHJcbiAgfSxcclxuICBnZXQgRW52aXJvbm1lbnQoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShFbnZpcm9ubWVudERlY2xhcmF0aW9uKTtcclxuICB9XHJcbn0pO1xyXG52YXIgUmF3TW9kdWxlRGVmVjggPSB0Lm9iamVjdChcIlJhd01vZHVsZURlZlY4XCIsIHtcclxuICBnZXQgdHlwZXNwYWNlKCkge1xyXG4gICAgcmV0dXJuIFR5cGVzcGFjZTtcclxuICB9LFxyXG4gIGdldCB0YWJsZXMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShUYWJsZURlc2MpO1xyXG4gIH0sXHJcbiAgZ2V0IHJlZHVjZXJzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmVkdWNlckRlZik7XHJcbiAgfSxcclxuICBnZXQgbWlzY0V4cG9ydHMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShNaXNjTW9kdWxlRXhwb3J0KTtcclxuICB9XHJcbn0pO1xyXG52YXIgUmF3TW9kdWxlRGVmVjkgPSB0Lm9iamVjdChcIlJhd01vZHVsZURlZlY5XCIsIHtcclxuICBnZXQgdHlwZXNwYWNlKCkge1xyXG4gICAgcmV0dXJuIFR5cGVzcGFjZTtcclxuICB9LFxyXG4gIGdldCB0YWJsZXMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShSYXdUYWJsZURlZlY5KTtcclxuICB9LFxyXG4gIGdldCByZWR1Y2VycygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd1JlZHVjZXJEZWZWOSk7XHJcbiAgfSxcclxuICBnZXQgdHlwZXMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShSYXdUeXBlRGVmVjkpO1xyXG4gIH0sXHJcbiAgZ2V0IG1pc2NFeHBvcnRzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3TWlzY01vZHVsZUV4cG9ydFY5KTtcclxuICB9LFxyXG4gIGdldCByb3dMZXZlbFNlY3VyaXR5KCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Um93TGV2ZWxTZWN1cml0eURlZlY5KTtcclxuICB9XHJcbn0pO1xyXG52YXIgUmF3UHJvY2VkdXJlRGVmVjEwID0gdC5vYmplY3QoXCJSYXdQcm9jZWR1cmVEZWZWMTBcIiwge1xyXG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXHJcbiAgZ2V0IHBhcmFtcygpIHtcclxuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XHJcbiAgfSxcclxuICBnZXQgcmV0dXJuVHlwZSgpIHtcclxuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcclxuICB9LFxyXG4gIGdldCB2aXNpYmlsaXR5KCkge1xyXG4gICAgcmV0dXJuIEZ1bmN0aW9uVmlzaWJpbGl0eTtcclxuICB9XHJcbn0pO1xyXG52YXIgUmF3UHJvY2VkdXJlRGVmVjkgPSB0Lm9iamVjdChcIlJhd1Byb2NlZHVyZURlZlY5XCIsIHtcclxuICBuYW1lOiB0LnN0cmluZygpLFxyXG4gIGdldCBwYXJhbXMoKSB7XHJcbiAgICByZXR1cm4gUHJvZHVjdFR5cGUyO1xyXG4gIH0sXHJcbiAgZ2V0IHJldHVyblR5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd1JlZHVjZXJEZWZWMTAgPSB0Lm9iamVjdChcIlJhd1JlZHVjZXJEZWZWMTBcIiwge1xyXG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXHJcbiAgZ2V0IHBhcmFtcygpIHtcclxuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XHJcbiAgfSxcclxuICBnZXQgdmlzaWJpbGl0eSgpIHtcclxuICAgIHJldHVybiBGdW5jdGlvblZpc2liaWxpdHk7XHJcbiAgfSxcclxuICBnZXQgb2tSZXR1cm5UeXBlKCkge1xyXG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xyXG4gIH0sXHJcbiAgZ2V0IGVyclJldHVyblR5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd1JlZHVjZXJEZWZWOSA9IHQub2JqZWN0KFwiUmF3UmVkdWNlckRlZlY5XCIsIHtcclxuICBuYW1lOiB0LnN0cmluZygpLFxyXG4gIGdldCBwYXJhbXMoKSB7XHJcbiAgICByZXR1cm4gUHJvZHVjdFR5cGUyO1xyXG4gIH0sXHJcbiAgZ2V0IGxpZmVjeWNsZSgpIHtcclxuICAgIHJldHVybiB0Lm9wdGlvbihMaWZlY3ljbGUpO1xyXG4gIH1cclxufSk7XHJcbnZhciBSYXdSb3dMZXZlbFNlY3VyaXR5RGVmVjkgPSB0Lm9iamVjdChcIlJhd1Jvd0xldmVsU2VjdXJpdHlEZWZWOVwiLCB7XHJcbiAgc3FsOiB0LnN0cmluZygpXHJcbn0pO1xyXG52YXIgUmF3U2NoZWR1bGVEZWZWMTAgPSB0Lm9iamVjdChcIlJhd1NjaGVkdWxlRGVmVjEwXCIsIHtcclxuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcclxuICB0YWJsZU5hbWU6IHQuc3RyaW5nKCksXHJcbiAgc2NoZWR1bGVBdENvbDogdC51MTYoKSxcclxuICBmdW5jdGlvbk5hbWU6IHQuc3RyaW5nKClcclxufSk7XHJcbnZhciBSYXdTY2hlZHVsZURlZlY5ID0gdC5vYmplY3QoXCJSYXdTY2hlZHVsZURlZlY5XCIsIHtcclxuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcclxuICByZWR1Y2VyTmFtZTogdC5zdHJpbmcoKSxcclxuICBzY2hlZHVsZWRBdENvbHVtbjogdC51MTYoKVxyXG59KTtcclxudmFyIFJhd1Njb3BlZFR5cGVOYW1lVjEwID0gdC5vYmplY3QoXCJSYXdTY29wZWRUeXBlTmFtZVYxMFwiLCB7XHJcbiAgc2NvcGU6IHQuYXJyYXkodC5zdHJpbmcoKSksXHJcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKVxyXG59KTtcclxudmFyIFJhd1Njb3BlZFR5cGVOYW1lVjkgPSB0Lm9iamVjdChcIlJhd1Njb3BlZFR5cGVOYW1lVjlcIiwge1xyXG4gIHNjb3BlOiB0LmFycmF5KHQuc3RyaW5nKCkpLFxyXG4gIG5hbWU6IHQuc3RyaW5nKClcclxufSk7XHJcbnZhciBSYXdTZXF1ZW5jZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3U2VxdWVuY2VEZWZWMTBcIiwge1xyXG4gIHNvdXJjZU5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxyXG4gIGNvbHVtbjogdC51MTYoKSxcclxuICBzdGFydDogdC5vcHRpb24odC5pMTI4KCkpLFxyXG4gIG1pblZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXHJcbiAgbWF4VmFsdWU6IHQub3B0aW9uKHQuaTEyOCgpKSxcclxuICBpbmNyZW1lbnQ6IHQuaTEyOCgpXHJcbn0pO1xyXG52YXIgUmF3U2VxdWVuY2VEZWZWOCA9IHQub2JqZWN0KFwiUmF3U2VxdWVuY2VEZWZWOFwiLCB7XHJcbiAgc2VxdWVuY2VOYW1lOiB0LnN0cmluZygpLFxyXG4gIGNvbFBvczogdC51MTYoKSxcclxuICBpbmNyZW1lbnQ6IHQuaTEyOCgpLFxyXG4gIHN0YXJ0OiB0Lm9wdGlvbih0LmkxMjgoKSksXHJcbiAgbWluVmFsdWU6IHQub3B0aW9uKHQuaTEyOCgpKSxcclxuICBtYXhWYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxyXG4gIGFsbG9jYXRlZDogdC5pMTI4KClcclxufSk7XHJcbnZhciBSYXdTZXF1ZW5jZURlZlY5ID0gdC5vYmplY3QoXCJSYXdTZXF1ZW5jZURlZlY5XCIsIHtcclxuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcclxuICBjb2x1bW46IHQudTE2KCksXHJcbiAgc3RhcnQ6IHQub3B0aW9uKHQuaTEyOCgpKSxcclxuICBtaW5WYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxyXG4gIG1heFZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXHJcbiAgaW5jcmVtZW50OiB0LmkxMjgoKVxyXG59KTtcclxudmFyIFJhd1N1Ym1vZHVsZVYxMCA9IHQub2JqZWN0KFwiUmF3U3VibW9kdWxlVjEwXCIsIHtcclxuICBuYW1lc3BhY2U6IHQuc3RyaW5nKCksXHJcbiAgZ2V0IG1vZHVsZSgpIHtcclxuICAgIHJldHVybiBSYXdNb2R1bGVEZWZWMTA7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd1RhYmxlRGVmVjEwID0gdC5vYmplY3QoXCJSYXdUYWJsZURlZlYxMFwiLCB7XHJcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKSxcclxuICBwcm9kdWN0VHlwZVJlZjogdC51MzIoKSxcclxuICBwcmltYXJ5S2V5OiB0LmFycmF5KHQudTE2KCkpLFxyXG4gIGdldCBpbmRleGVzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3SW5kZXhEZWZWMTApO1xyXG4gIH0sXHJcbiAgZ2V0IGNvbnN0cmFpbnRzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Q29uc3RyYWludERlZlYxMCk7XHJcbiAgfSxcclxuICBnZXQgc2VxdWVuY2VzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3U2VxdWVuY2VEZWZWMTApO1xyXG4gIH0sXHJcbiAgZ2V0IHRhYmxlVHlwZSgpIHtcclxuICAgIHJldHVybiBUYWJsZVR5cGU7XHJcbiAgfSxcclxuICBnZXQgdGFibGVBY2Nlc3MoKSB7XHJcbiAgICByZXR1cm4gVGFibGVBY2Nlc3M7XHJcbiAgfSxcclxuICBnZXQgZGVmYXVsdFZhbHVlcygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVYxMCk7XHJcbiAgfSxcclxuICBpc0V2ZW50OiB0LmJvb2woKVxyXG59KTtcclxudmFyIFJhd1RhYmxlRGVmVjggPSB0Lm9iamVjdChcIlJhd1RhYmxlRGVmVjhcIiwge1xyXG4gIHRhYmxlTmFtZTogdC5zdHJpbmcoKSxcclxuICBnZXQgY29sdW1ucygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd0NvbHVtbkRlZlY4KTtcclxuICB9LFxyXG4gIGdldCBpbmRleGVzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3SW5kZXhEZWZWOCk7XHJcbiAgfSxcclxuICBnZXQgY29uc3RyYWludHMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShSYXdDb25zdHJhaW50RGVmVjgpO1xyXG4gIH0sXHJcbiAgZ2V0IHNlcXVlbmNlcygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd1NlcXVlbmNlRGVmVjgpO1xyXG4gIH0sXHJcbiAgdGFibGVUeXBlOiB0LnN0cmluZygpLFxyXG4gIHRhYmxlQWNjZXNzOiB0LnN0cmluZygpLFxyXG4gIHNjaGVkdWxlZDogdC5vcHRpb24odC5zdHJpbmcoKSlcclxufSk7XHJcbnZhciBSYXdUYWJsZURlZlY5ID0gdC5vYmplY3QoXCJSYXdUYWJsZURlZlY5XCIsIHtcclxuICBuYW1lOiB0LnN0cmluZygpLFxyXG4gIHByb2R1Y3RUeXBlUmVmOiB0LnUzMigpLFxyXG4gIHByaW1hcnlLZXk6IHQuYXJyYXkodC51MTYoKSksXHJcbiAgZ2V0IGluZGV4ZXMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShSYXdJbmRleERlZlY5KTtcclxuICB9LFxyXG4gIGdldCBjb25zdHJhaW50cygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFJhd0NvbnN0cmFpbnREZWZWOSk7XHJcbiAgfSxcclxuICBnZXQgc2VxdWVuY2VzKCkge1xyXG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3U2VxdWVuY2VEZWZWOSk7XHJcbiAgfSxcclxuICBnZXQgc2NoZWR1bGUoKSB7XHJcbiAgICByZXR1cm4gdC5vcHRpb24oUmF3U2NoZWR1bGVEZWZWOSk7XHJcbiAgfSxcclxuICBnZXQgdGFibGVUeXBlKCkge1xyXG4gICAgcmV0dXJuIFRhYmxlVHlwZTtcclxuICB9LFxyXG4gIGdldCB0YWJsZUFjY2VzcygpIHtcclxuICAgIHJldHVybiBUYWJsZUFjY2VzcztcclxuICB9XHJcbn0pO1xyXG52YXIgUmF3VHlwZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3VHlwZURlZlYxMFwiLCB7XHJcbiAgZ2V0IHNvdXJjZU5hbWUoKSB7XHJcbiAgICByZXR1cm4gUmF3U2NvcGVkVHlwZU5hbWVWMTA7XHJcbiAgfSxcclxuICB0eTogdC51MzIoKSxcclxuICBjdXN0b21PcmRlcmluZzogdC5ib29sKClcclxufSk7XHJcbnZhciBSYXdUeXBlRGVmVjkgPSB0Lm9iamVjdChcIlJhd1R5cGVEZWZWOVwiLCB7XHJcbiAgZ2V0IG5hbWUoKSB7XHJcbiAgICByZXR1cm4gUmF3U2NvcGVkVHlwZU5hbWVWOTtcclxuICB9LFxyXG4gIHR5OiB0LnUzMigpLFxyXG4gIGN1c3RvbU9yZGVyaW5nOiB0LmJvb2woKVxyXG59KTtcclxudmFyIFJhd1VuaXF1ZUNvbnN0cmFpbnREYXRhVjkgPSB0Lm9iamVjdChcclxuICBcIlJhd1VuaXF1ZUNvbnN0cmFpbnREYXRhVjlcIixcclxuICB7XHJcbiAgICBjb2x1bW5zOiB0LmFycmF5KHQudTE2KCkpXHJcbiAgfVxyXG4pO1xyXG52YXIgUmF3Vmlld0RlZlYxMCA9IHQub2JqZWN0KFwiUmF3Vmlld0RlZlYxMFwiLCB7XHJcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKSxcclxuICBpbmRleDogdC51MzIoKSxcclxuICBpc1B1YmxpYzogdC5ib29sKCksXHJcbiAgaXNBbm9ueW1vdXM6IHQuYm9vbCgpLFxyXG4gIGdldCBwYXJhbXMoKSB7XHJcbiAgICByZXR1cm4gUHJvZHVjdFR5cGUyO1xyXG4gIH0sXHJcbiAgZ2V0IHJldHVyblR5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XHJcbiAgfVxyXG59KTtcclxudmFyIFJhd1ZpZXdEZWZWOSA9IHQub2JqZWN0KFwiUmF3Vmlld0RlZlY5XCIsIHtcclxuICBuYW1lOiB0LnN0cmluZygpLFxyXG4gIGluZGV4OiB0LnUzMigpLFxyXG4gIGlzUHVibGljOiB0LmJvb2woKSxcclxuICBpc0Fub255bW91czogdC5ib29sKCksXHJcbiAgZ2V0IHBhcmFtcygpIHtcclxuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XHJcbiAgfSxcclxuICBnZXQgcmV0dXJuVHlwZSgpIHtcclxuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcclxuICB9XHJcbn0pO1xyXG52YXIgUmF3Vmlld1ByaW1hcnlLZXlEZWZWMTAgPSB0Lm9iamVjdChcIlJhd1ZpZXdQcmltYXJ5S2V5RGVmVjEwXCIsIHtcclxuICB2aWV3U291cmNlTmFtZTogdC5zdHJpbmcoKSxcclxuICBjb2x1bW5zOiB0LmFycmF5KHQuc3RyaW5nKCkpXHJcbn0pO1xyXG52YXIgUmVkdWNlckRlZiA9IHQub2JqZWN0KFwiUmVkdWNlckRlZlwiLCB7XHJcbiAgbmFtZTogdC5zdHJpbmcoKSxcclxuICBnZXQgYXJncygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KFByb2R1Y3RUeXBlRWxlbWVudCk7XHJcbiAgfVxyXG59KTtcclxudmFyIFN1bVR5cGUyID0gdC5vYmplY3QoXCJTdW1UeXBlXCIsIHtcclxuICBnZXQgdmFyaWFudHMoKSB7XHJcbiAgICByZXR1cm4gdC5hcnJheShTdW1UeXBlVmFyaWFudCk7XHJcbiAgfVxyXG59KTtcclxudmFyIFN1bVR5cGVWYXJpYW50ID0gdC5vYmplY3QoXCJTdW1UeXBlVmFyaWFudFwiLCB7XHJcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXHJcbiAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XHJcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XHJcbiAgfVxyXG59KTtcclxudmFyIFRhYmxlQWNjZXNzID0gdC5lbnVtKFwiVGFibGVBY2Nlc3NcIiwge1xyXG4gIFB1YmxpYzogdC51bml0KCksXHJcbiAgUHJpdmF0ZTogdC51bml0KClcclxufSk7XHJcbnZhciBUYWJsZURlc2MgPSB0Lm9iamVjdChcIlRhYmxlRGVzY1wiLCB7XHJcbiAgZ2V0IHNjaGVtYSgpIHtcclxuICAgIHJldHVybiBSYXdUYWJsZURlZlY4O1xyXG4gIH0sXHJcbiAgZGF0YTogdC51MzIoKVxyXG59KTtcclxudmFyIFRhYmxlVHlwZSA9IHQuZW51bShcIlRhYmxlVHlwZVwiLCB7XHJcbiAgU3lzdGVtOiB0LnVuaXQoKSxcclxuICBVc2VyOiB0LnVuaXQoKVxyXG59KTtcclxudmFyIFR5cGVBbGlhcyA9IHQub2JqZWN0KFwiVHlwZUFsaWFzXCIsIHtcclxuICBuYW1lOiB0LnN0cmluZygpLFxyXG4gIHR5OiB0LnUzMigpXHJcbn0pO1xyXG52YXIgVHlwZXNwYWNlID0gdC5vYmplY3QoXCJUeXBlc3BhY2VcIiwge1xyXG4gIGdldCB0eXBlcygpIHtcclxuICAgIHJldHVybiB0LmFycmF5KEFsZ2VicmFpY1R5cGUyKTtcclxuICB9XHJcbn0pO1xyXG52YXIgVmlld1Jlc3VsdEhlYWRlciA9IHQuZW51bShcIlZpZXdSZXN1bHRIZWFkZXJcIiwge1xyXG4gIFJvd0RhdGE6IHQudW5pdCgpLFxyXG4gIFJhd1NxbDogdC5zdHJpbmcoKVxyXG59KTtcclxuXHJcbi8vIHNyYy9saWIvc2NoZW1hLnRzXHJcbmZ1bmN0aW9uIHRhYmxlVG9TY2hlbWEoYWNjTmFtZSwgc2NoZW1hMiwgdGFibGVEZWYpIHtcclxuICBjb25zdCBnZXRDb2xOYW1lID0gKGkpID0+IHNjaGVtYTIucm93VHlwZS5hbGdlYnJhaWNUeXBlLnZhbHVlLmVsZW1lbnRzW2ldLm5hbWU7XHJcbiAgY29uc3QgcmVzb2x2ZWRJbmRleGVzID0gdGFibGVEZWYuaW5kZXhlcy5tYXAoXHJcbiAgICAoaWR4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjY2Vzc29yTmFtZSA9IGlkeC5hY2Nlc3Nvck5hbWU7XHJcbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzb3JOYW1lICE9PSBcInN0cmluZ1wiIHx8IGFjY2Vzc29yTmFtZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgICAgYEluZGV4ICcke2lkeC5zb3VyY2VOYW1lID8/IFwiPHVua25vd24+XCJ9JyBvbiB0YWJsZSAnJHt0YWJsZURlZi5zb3VyY2VOYW1lfScgaXMgbWlzc2luZyBhY2Nlc3NvciBuYW1lYFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY29sdW1uSWRzID0gaWR4LmFsZ29yaXRobS50YWcgPT09IFwiRGlyZWN0XCIgPyBbaWR4LmFsZ29yaXRobS52YWx1ZV0gOiBpZHguYWxnb3JpdGhtLnZhbHVlO1xyXG4gICAgICBjb25zdCB1bmlxdWUgPSB0YWJsZURlZi5jb25zdHJhaW50cy5zb21lKFxyXG4gICAgICAgIChjKSA9PiBjLmRhdGEudGFnID09PSBcIlVuaXF1ZVwiICYmIGMuZGF0YS52YWx1ZS5jb2x1bW5zLmV2ZXJ5KChjb2wpID0+IGNvbHVtbklkcy5pbmNsdWRlcyhjb2wpKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBhbGdvcml0aG0gPSB7XHJcbiAgICAgICAgQlRyZWU6IFwiYnRyZWVcIixcclxuICAgICAgICBIYXNoOiBcImhhc2hcIixcclxuICAgICAgICBEaXJlY3Q6IFwiZGlyZWN0XCJcclxuICAgICAgfVtpZHguYWxnb3JpdGhtLnRhZ107XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogYWNjZXNzb3JOYW1lLFxyXG4gICAgICAgIHVuaXF1ZSxcclxuICAgICAgICBhbGdvcml0aG0sXHJcbiAgICAgICAgY29sdW1uczogY29sdW1uSWRzLm1hcChnZXRDb2xOYW1lKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICk7XHJcbiAgcmV0dXJuIHtcclxuICAgIC8vIEZvciBjbGllbnQsYHNjaGFtYS50YWJsZU5hbWVgIHdpbGwgYWx3YXlzIGJlIHRoZXJlIGFzIGNhbm9uaWNhbCBuYW1lLlxyXG4gICAgLy8gRm9yIG1vZHVsZSwgaWYgZXhwbGljaXQgbmFtZSBpcyBub3QgcHJvdmlkZWQgdmlhIGBuYW1lYCwgYWNjZXNzb3IgbmFtZSB3aWxsXHJcbiAgICAvLyBiZSB1c2VkLCBpdCBpcyBzdG9yZWQgYXMgYWxpYXMgaW4gZGF0YWJhc2UsIGhlbmNlIHdvcmtzIGluIHF1ZXJ5IGJ1aWxkZXIuXHJcbiAgICBzb3VyY2VOYW1lOiBzY2hlbWEyLnRhYmxlTmFtZSB8fCBhY2NOYW1lLFxyXG4gICAgYWNjZXNzb3JOYW1lOiBhY2NOYW1lLFxyXG4gICAgY29sdW1uczogc2NoZW1hMi5yb3dUeXBlLnJvdyxcclxuICAgIC8vIHR5cGVkIGFzIFRbaV1bJ3Jvd1R5cGUnXVsncm93J10gdW5kZXIgVGFibGVzVG9TY2hlbWE8VD5cclxuICAgIHJvd1R5cGU6IHNjaGVtYTIucm93U3BhY2V0aW1lVHlwZSxcclxuICAgIC8vIEtlZXAgZGVjbGFyYXRpdmUgaW5kZXhlcyBpbiB0aGVpciBvcmlnaW5hbCBzaGFwZSBmb3IgdHlwZS1sZXZlbCBjb25zdW1lcnMuXHJcbiAgICBpbmRleGVzOiBzY2hlbWEyLmlkeHMsXHJcbiAgICBjb25zdHJhaW50czogdGFibGVEZWYuY29uc3RyYWludHMubWFwKChjKSA9PiAoe1xyXG4gICAgICBuYW1lOiBjLnNvdXJjZU5hbWUsXHJcbiAgICAgIGNvbnN0cmFpbnQ6IFwidW5pcXVlXCIsXHJcbiAgICAgIGNvbHVtbnM6IGMuZGF0YS52YWx1ZS5jb2x1bW5zLm1hcChnZXRDb2xOYW1lKVxyXG4gICAgfSkpLFxyXG4gICAgLy8gRXhwb3NlIHJlc29sdmVkIHJ1bnRpbWUgaW5kZXhlcyBzZXBhcmF0ZWx5IHNvIHJ1bnRpbWUgdXNlcnMgZG9uJ3QgaGF2ZSB0b1xyXG4gICAgLy8gcmVpbnRlcnByZXQgYGluZGV4ZXNgIHdpdGggdW5zYWZlIGNhc3RzLlxyXG4gICAgcmVzb2x2ZWRJbmRleGVzLFxyXG4gICAgdGFibGVEZWYsXHJcbiAgICAuLi50YWJsZURlZi5pc0V2ZW50ID8geyBpc0V2ZW50OiB0cnVlIH0gOiB7fVxyXG4gIH07XHJcbn1cclxudmFyIE1vZHVsZUNvbnRleHQgPSBjbGFzcyB7XHJcbiAgI2NvbXBvdW5kVHlwZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBnbG9iYWwgbW9kdWxlIGRlZmluaXRpb24gdGhhdCBnZXRzIHBvcHVsYXRlZCBieSBjYWxscyB0byBgcmVkdWNlcigpYCBhbmQgbGlmZWN5Y2xlIGhvb2tzLlxyXG4gICAqL1xyXG4gICNtb2R1bGVEZWYgPSB7XHJcbiAgICB0eXBlc3BhY2U6IHsgdHlwZXM6IFtdIH0sXHJcbiAgICB0YWJsZXM6IFtdLFxyXG4gICAgcmVkdWNlcnM6IFtdLFxyXG4gICAgdHlwZXM6IFtdLFxyXG4gICAgcm93TGV2ZWxTZWN1cml0eTogW10sXHJcbiAgICBzY2hlZHVsZXM6IFtdLFxyXG4gICAgcHJvY2VkdXJlczogW10sXHJcbiAgICB2aWV3czogW10sXHJcbiAgICB2aWV3UHJpbWFyeUtleXM6IFtdLFxyXG4gICAgbGlmZUN5Y2xlUmVkdWNlcnM6IFtdLFxyXG4gICAgaHR0cEhhbmRsZXJzOiBbXSxcclxuICAgIGh0dHBSb3V0ZXM6IFtdLFxyXG4gICAgY2FzZUNvbnZlcnNpb25Qb2xpY3k6IHsgdGFnOiBcIlNuYWtlQ2FzZVwiIH0sXHJcbiAgICBleHBsaWNpdE5hbWVzOiB7XHJcbiAgICAgIGVudHJpZXM6IFtdXHJcbiAgICB9LFxyXG4gICAgc3VibW9kdWxlczogW10sXHJcbiAgICBlbnZpcm9ubWVudDogW11cclxuICB9O1xyXG4gIGdldCBtb2R1bGVEZWYoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jbW9kdWxlRGVmO1xyXG4gIH1cclxuICByYXdNb2R1bGVEZWZWMTAoKSB7XHJcbiAgICBjb25zdCBzZWN0aW9ucyA9IFtdO1xyXG4gICAgY29uc3QgcHVzaCA9IChzKSA9PiB7XHJcbiAgICAgIGlmIChzKSBzZWN0aW9ucy5wdXNoKHMpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG1vZHVsZSA9IHRoaXMuI21vZHVsZURlZjtcclxuICAgIHB1c2gobW9kdWxlLnR5cGVzcGFjZSAmJiB7IHRhZzogXCJUeXBlc3BhY2VcIiwgdmFsdWU6IG1vZHVsZS50eXBlc3BhY2UgfSk7XHJcbiAgICBwdXNoKG1vZHVsZS50eXBlcyAmJiB7IHRhZzogXCJUeXBlc1wiLCB2YWx1ZTogbW9kdWxlLnR5cGVzIH0pO1xyXG4gICAgcHVzaChtb2R1bGUudGFibGVzICYmIHsgdGFnOiBcIlRhYmxlc1wiLCB2YWx1ZTogbW9kdWxlLnRhYmxlcyB9KTtcclxuICAgIHB1c2gobW9kdWxlLnJlZHVjZXJzICYmIHsgdGFnOiBcIlJlZHVjZXJzXCIsIHZhbHVlOiBtb2R1bGUucmVkdWNlcnMgfSk7XHJcbiAgICBwdXNoKG1vZHVsZS5wcm9jZWR1cmVzICYmIHsgdGFnOiBcIlByb2NlZHVyZXNcIiwgdmFsdWU6IG1vZHVsZS5wcm9jZWR1cmVzIH0pO1xyXG4gICAgcHVzaChtb2R1bGUudmlld3MgJiYgeyB0YWc6IFwiVmlld3NcIiwgdmFsdWU6IG1vZHVsZS52aWV3cyB9KTtcclxuICAgIHB1c2goXHJcbiAgICAgIG1vZHVsZS52aWV3UHJpbWFyeUtleXMgJiYge1xyXG4gICAgICAgIHRhZzogXCJWaWV3UHJpbWFyeUtleXNcIixcclxuICAgICAgICB2YWx1ZTogbW9kdWxlLnZpZXdQcmltYXJ5S2V5c1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgcHVzaChtb2R1bGUuc2NoZWR1bGVzICYmIHsgdGFnOiBcIlNjaGVkdWxlc1wiLCB2YWx1ZTogbW9kdWxlLnNjaGVkdWxlcyB9KTtcclxuICAgIHB1c2goXHJcbiAgICAgIG1vZHVsZS5saWZlQ3ljbGVSZWR1Y2VycyAmJiB7XHJcbiAgICAgICAgdGFnOiBcIkxpZmVDeWNsZVJlZHVjZXJzXCIsXHJcbiAgICAgICAgdmFsdWU6IG1vZHVsZS5saWZlQ3ljbGVSZWR1Y2Vyc1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgcHVzaChcclxuICAgICAgbW9kdWxlLmh0dHBIYW5kbGVycyAmJiB7XHJcbiAgICAgICAgdGFnOiBcIkh0dHBIYW5kbGVyc1wiLFxyXG4gICAgICAgIHZhbHVlOiBtb2R1bGUuaHR0cEhhbmRsZXJzXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBwdXNoKFxyXG4gICAgICBtb2R1bGUuaHR0cFJvdXRlcyAmJiB7XHJcbiAgICAgICAgdGFnOiBcIkh0dHBSb3V0ZXNcIixcclxuICAgICAgICB2YWx1ZTogbW9kdWxlLmh0dHBSb3V0ZXNcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIHB1c2goXHJcbiAgICAgIG1vZHVsZS5yb3dMZXZlbFNlY3VyaXR5ICYmIHtcclxuICAgICAgICB0YWc6IFwiUm93TGV2ZWxTZWN1cml0eVwiLFxyXG4gICAgICAgIHZhbHVlOiBtb2R1bGUucm93TGV2ZWxTZWN1cml0eVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgcHVzaChcclxuICAgICAgbW9kdWxlLmV4cGxpY2l0TmFtZXMgJiYge1xyXG4gICAgICAgIHRhZzogXCJFeHBsaWNpdE5hbWVzXCIsXHJcbiAgICAgICAgdmFsdWU6IG1vZHVsZS5leHBsaWNpdE5hbWVzXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBwdXNoKFxyXG4gICAgICBtb2R1bGUuY2FzZUNvbnZlcnNpb25Qb2xpY3kgJiYge1xyXG4gICAgICAgIHRhZzogXCJDYXNlQ29udmVyc2lvblBvbGljeVwiLFxyXG4gICAgICAgIHZhbHVlOiBtb2R1bGUuY2FzZUNvbnZlcnNpb25Qb2xpY3lcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIHB1c2goXHJcbiAgICAgIG1vZHVsZS5zdWJtb2R1bGVzICYmIHtcclxuICAgICAgICB0YWc6IFwiU3VibW9kdWxlc1wiLFxyXG4gICAgICAgIHZhbHVlOiBtb2R1bGUuc3VibW9kdWxlc1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgcHVzaCh7IHRhZzogXCJFbnZpcm9ubWVudFwiLCB2YWx1ZTogbW9kdWxlLmVudmlyb25tZW50IH0pO1xyXG4gICAgcmV0dXJuIHsgc2VjdGlvbnMgfTtcclxuICB9XHJcbiAgYWRkU3VibW9kdWxlKHN1Ym1vZHVsZSkge1xyXG4gICAgdGhpcy4jbW9kdWxlRGVmLnN1Ym1vZHVsZXMucHVzaChzdWJtb2R1bGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGNhc2UgY29udmVyc2lvbiBwb2xpY3kgZm9yIHRoaXMgbW9kdWxlLlxyXG4gICAqIENhbGxlZCBieSB0aGUgc2V0dGluZ3MgbWVjaGFuaXNtLlxyXG4gICAqL1xyXG4gIHNldENhc2VDb252ZXJzaW9uUG9saWN5KHBvbGljeSkge1xyXG4gICAgdGhpcy4jbW9kdWxlRGVmLmNhc2VDb252ZXJzaW9uUG9saWN5ID0gcG9saWN5O1xyXG4gIH1cclxuICBnZXQgdHlwZXNwYWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI21vZHVsZURlZi50eXBlc3BhY2U7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlc29sdmVzIHRoZSBhY3R1YWwgdHlwZSBvZiBhIFR5cGVCdWlsZGVyIGJ5IGZvbGxvd2luZyBpdHMgcmVmZXJlbmNlcyB1bnRpbCBpdCByZWFjaGVzIGEgbm9uLXJlZiB0eXBlLlxyXG4gICAqIEBwYXJhbSB0eXBlc3BhY2UgVGhlIHR5cGVzcGFjZSB0byByZXNvbHZlIHR5cGVzIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIHR5cGVCdWlsZGVyIFRoZSBUeXBlQnVpbGRlciB0byByZXNvbHZlLlxyXG4gICAqIEByZXR1cm5zIFRoZSByZXNvbHZlZCBhbGdlYnJhaWMgdHlwZS5cclxuICAgKi9cclxuICByZXNvbHZlVHlwZSh0eXBlQnVpbGRlcikge1xyXG4gICAgbGV0IHR5ID0gdHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZTtcclxuICAgIHdoaWxlICh0eS50YWcgPT09IFwiUmVmXCIpIHtcclxuICAgICAgdHkgPSB0aGlzLnR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSB0eXBlIHRvIHRoZSBtb2R1bGUgZGVmaW5pdGlvbidzIHR5cGVzcGFjZSBhcyBhIGBSZWZgIGlmIGl0IGlzIGEgbmFtZWQgY29tcG91bmQgdHlwZSAoUHJvZHVjdCBvciBTdW0pLlxyXG4gICAqIE90aGVyd2lzZSwgcmV0dXJucyB0aGUgdHlwZSBhcyBpcy5cclxuICAgKiBAcGFyYW0gbmFtZVxyXG4gICAqIEBwYXJhbSB0eVxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyKSB7XHJcbiAgICBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBQcm9kdWN0QnVpbGRlciAmJiAhaXNVbml0KHR5cGVCdWlsZGVyKSB8fCB0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFN1bUJ1aWxkZXIgfHwgdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSb3dCdWlsZGVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlckNvbXBvdW5kVHlwZVJlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBPcHRpb25CdWlsZGVyKSB7XHJcbiAgICAgIHJldHVybiBuZXcgT3B0aW9uQnVpbGRlcihcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh0eXBlQnVpbGRlci52YWx1ZSlcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSZXN1bHRCdWlsZGVyKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUmVzdWx0QnVpbGRlcihcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh0eXBlQnVpbGRlci5vayksXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIuZXJyKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIEFycmF5QnVpbGRlcikge1xyXG4gICAgICByZXR1cm4gbmV3IEFycmF5QnVpbGRlcihcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh0eXBlQnVpbGRlci5lbGVtZW50KVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHR5cGVCdWlsZGVyO1xyXG4gICAgfVxyXG4gIH1cclxuICAjcmVnaXN0ZXJDb21wb3VuZFR5cGVSZWN1cnNpdmVseSh0eXBlQnVpbGRlcikge1xyXG4gICAgY29uc3QgdHkgPSB0eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlO1xyXG4gICAgY29uc3QgbmFtZSA9IHR5cGVCdWlsZGVyLnR5cGVOYW1lO1xyXG4gICAgaWYgKG5hbWUgPT09IHZvaWQgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYE1pc3NpbmcgdHlwZSBuYW1lIGZvciAke3R5cGVCdWlsZGVyLmNvbnN0cnVjdG9yLm5hbWUgPz8gXCJUeXBlQnVpbGRlclwifSAke0pTT04uc3RyaW5naWZ5KHR5cGVCdWlsZGVyKX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBsZXQgciA9IHRoaXMuI2NvbXBvdW5kVHlwZXMuZ2V0KHR5KTtcclxuICAgIGlmIChyICE9IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXdUeSA9IHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUm93QnVpbGRlciB8fCB0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFByb2R1Y3RCdWlsZGVyID8ge1xyXG4gICAgICB0YWc6IFwiUHJvZHVjdFwiLFxyXG4gICAgICB2YWx1ZTogeyBlbGVtZW50czogW10gfVxyXG4gICAgfSA6IHtcclxuICAgICAgdGFnOiBcIlN1bVwiLFxyXG4gICAgICB2YWx1ZTogeyB2YXJpYW50czogW10gfVxyXG4gICAgfTtcclxuICAgIHIgPSBuZXcgUmVmQnVpbGRlcih0aGlzLiNtb2R1bGVEZWYudHlwZXNwYWNlLnR5cGVzLmxlbmd0aCk7XHJcbiAgICB0aGlzLiNtb2R1bGVEZWYudHlwZXNwYWNlLnR5cGVzLnB1c2gobmV3VHkpO1xyXG4gICAgdGhpcy4jY29tcG91bmRUeXBlcy5zZXQodHksIHIpO1xyXG4gICAgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUm93QnVpbGRlcikge1xyXG4gICAgICBmb3IgKGNvbnN0IFtuYW1lMiwgZWxlbV0gb2YgT2JqZWN0LmVudHJpZXModHlwZUJ1aWxkZXIucm93KSkge1xyXG4gICAgICAgIG5ld1R5LnZhbHVlLmVsZW1lbnRzLnB1c2goe1xyXG4gICAgICAgICAgbmFtZTogbmFtZTIsXHJcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShlbGVtLnR5cGVCdWlsZGVyKS5hbGdlYnJhaWNUeXBlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBQcm9kdWN0QnVpbGRlcikge1xyXG4gICAgICBmb3IgKGNvbnN0IFtuYW1lMiwgZWxlbV0gb2YgT2JqZWN0LmVudHJpZXModHlwZUJ1aWxkZXIuZWxlbWVudHMpKSB7XHJcbiAgICAgICAgbmV3VHkudmFsdWUuZWxlbWVudHMucHVzaCh7XHJcbiAgICAgICAgICBuYW1lOiBuYW1lMixcclxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IHRoaXMucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KGVsZW0pLmFsZ2VicmFpY1R5cGVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFN1bUJ1aWxkZXIpIHtcclxuICAgICAgZm9yIChjb25zdCBbbmFtZTIsIHZhcmlhbnRdIG9mIE9iamVjdC5lbnRyaWVzKHR5cGVCdWlsZGVyLnZhcmlhbnRzKSkge1xyXG4gICAgICAgIG5ld1R5LnZhbHVlLnZhcmlhbnRzLnB1c2goe1xyXG4gICAgICAgICAgbmFtZTogbmFtZTIsXHJcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh2YXJpYW50KS5hbGdlYnJhaWNUeXBlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuI21vZHVsZURlZi50eXBlcy5wdXNoKHtcclxuICAgICAgc291cmNlTmFtZTogc3BsaXROYW1lKG5hbWUpLFxyXG4gICAgICB0eTogci5yZWYsXHJcbiAgICAgIGN1c3RvbU9yZGVyaW5nOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiByO1xyXG4gIH1cclxufTtcclxuZnVuY3Rpb24gaXNVbml0KHR5cGVCdWlsZGVyKSB7XHJcbiAgcmV0dXJuIHR5cGVCdWlsZGVyLnR5cGVOYW1lID09IG51bGwgJiYgdHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cy5sZW5ndGggPT09IDA7XHJcbn1cclxuZnVuY3Rpb24gc3BsaXROYW1lKG5hbWUpIHtcclxuICBjb25zdCBzY29wZSA9IG5hbWUuc3BsaXQoXCIuXCIpO1xyXG4gIHJldHVybiB7IHNvdXJjZU5hbWU6IHNjb3BlLnBvcCgpLCBzY29wZSB9O1xyXG59XHJcbnZhciB0ZXh0RW5jb2RlcjIgPSBuZXcgVGV4dEVuY29kZXIoKTtcclxudmFyIHRleHREZWNvZGVyMiA9IG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpO1xyXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZU1ldGhvZChtZXRob2QpIHtcclxuICBzd2l0Y2ggKG1ldGhvZC50YWcpIHtcclxuICAgIGNhc2UgXCJHZXRcIjpcclxuICAgICAgcmV0dXJuIFwiR0VUXCI7XHJcbiAgICBjYXNlIFwiSGVhZFwiOlxyXG4gICAgICByZXR1cm4gXCJIRUFEXCI7XHJcbiAgICBjYXNlIFwiUG9zdFwiOlxyXG4gICAgICByZXR1cm4gXCJQT1NUXCI7XHJcbiAgICBjYXNlIFwiUHV0XCI6XHJcbiAgICAgIHJldHVybiBcIlBVVFwiO1xyXG4gICAgY2FzZSBcIkRlbGV0ZVwiOlxyXG4gICAgICByZXR1cm4gXCJERUxFVEVcIjtcclxuICAgIGNhc2UgXCJDb25uZWN0XCI6XHJcbiAgICAgIHJldHVybiBcIkNPTk5FQ1RcIjtcclxuICAgIGNhc2UgXCJPcHRpb25zXCI6XHJcbiAgICAgIHJldHVybiBcIk9QVElPTlNcIjtcclxuICAgIGNhc2UgXCJUcmFjZVwiOlxyXG4gICAgICByZXR1cm4gXCJUUkFDRVwiO1xyXG4gICAgY2FzZSBcIlBhdGNoXCI6XHJcbiAgICAgIHJldHVybiBcIlBBVENIXCI7XHJcbiAgICBjYXNlIFwiRXh0ZW5zaW9uXCI6XHJcbiAgICAgIHJldHVybiBtZXRob2QudmFsdWU7XHJcbiAgfVxyXG59XHJcbnZhciBtZXRob2RzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoW1xyXG4gIFtcIkdFVFwiLCB7IHRhZzogXCJHZXRcIiB9XSxcclxuICBbXCJIRUFEXCIsIHsgdGFnOiBcIkhlYWRcIiB9XSxcclxuICBbXCJQT1NUXCIsIHsgdGFnOiBcIlBvc3RcIiB9XSxcclxuICBbXCJQVVRcIiwgeyB0YWc6IFwiUHV0XCIgfV0sXHJcbiAgW1wiREVMRVRFXCIsIHsgdGFnOiBcIkRlbGV0ZVwiIH1dLFxyXG4gIFtcIkNPTk5FQ1RcIiwgeyB0YWc6IFwiQ29ubmVjdFwiIH1dLFxyXG4gIFtcIk9QVElPTlNcIiwgeyB0YWc6IFwiT3B0aW9uc1wiIH1dLFxyXG4gIFtcIlRSQUNFXCIsIHsgdGFnOiBcIlRyYWNlXCIgfV0sXHJcbiAgW1wiUEFUQ0hcIiwgeyB0YWc6IFwiUGF0Y2hcIiB9XVxyXG5dKTtcclxuZnVuY3Rpb24gc2VyaWFsaXplTWV0aG9kKG1ldGhvZCkge1xyXG4gIHJldHVybiBtZXRob2RzLmdldChtZXRob2Q/LnRvVXBwZXJDYXNlKCkgPz8gXCJHRVRcIikgPz8ge1xyXG4gICAgdGFnOiBcIkV4dGVuc2lvblwiLFxyXG4gICAgdmFsdWU6IG1ldGhvZFxyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gc2VyaWFsaXplSGVhZGVycyhoZWFkZXJzKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVudHJpZXM6IEFycmF5LmZyb20oaGVhZGVycy5lbnRyaWVzKCksIChbbmFtZSwgdmFsdWVdKSA9PiAoe1xyXG4gICAgICBuYW1lLFxyXG4gICAgICB2YWx1ZTogdGV4dEVuY29kZXIyLmVuY29kZSh2YWx1ZSlcclxuICAgIH0pKVxyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gZGVzZXJpYWxpemVIZWFkZXJzKGhlYWRlcnMpIHtcclxuICByZXR1cm4gbmV3IEhlYWRlcnMoXHJcbiAgICBoZWFkZXJzLmVudHJpZXMubWFwKCh7IG5hbWUsIHZhbHVlIH0pID0+IFtcclxuICAgICAgbmFtZSxcclxuICAgICAgdGV4dERlY29kZXIyLmRlY29kZSh2YWx1ZSlcclxuICAgIF0pXHJcbiAgKTtcclxufVxyXG52YXIgbWFrZVJlc3BvbnNlID0gU3ltYm9sKFwibWFrZVJlc3BvbnNlXCIpO1xyXG52YXIgU3luY1Jlc3BvbnNlID0gY2xhc3MgX1N5bmNSZXNwb25zZSB7XHJcbiAgI2JvZHk7XHJcbiAgI2lubmVyO1xyXG4gIGNvbnN0cnVjdG9yKGJvZHksIGluaXQpIHtcclxuICAgIGlmIChib2R5ID09IG51bGwpIHtcclxuICAgICAgdGhpcy4jYm9keSA9IG51bGw7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHRoaXMuI2JvZHkgPSBib2R5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy4jYm9keSA9IG5ldyBVaW50OEFycmF5KGJvZHkpLmJ1ZmZlcjtcclxuICAgIH1cclxuICAgIHRoaXMuI2lubmVyID0ge1xyXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhpbml0Py5oZWFkZXJzKSxcclxuICAgICAgc3RhdHVzOiBpbml0Py5zdGF0dXMgPz8gMjAwLFxyXG4gICAgICBzdGF0dXNUZXh0OiBpbml0Py5zdGF0dXNUZXh0ID8/IFwiXCIsXHJcbiAgICAgIHR5cGU6IFwiZGVmYXVsdFwiLFxyXG4gICAgICB1cmw6IG51bGwsXHJcbiAgICAgIGFib3J0ZWQ6IGZhbHNlLFxyXG4gICAgICB2ZXJzaW9uOiBpbml0Py52ZXJzaW9uID8/IHsgdGFnOiBcIkh0dHAxMVwiIH1cclxuICAgIH07XHJcbiAgfVxyXG4gIHN0YXRpYyBbbWFrZVJlc3BvbnNlXShib2R5LCBpbm5lcikge1xyXG4gICAgY29uc3QgbWUgPSBuZXcgX1N5bmNSZXNwb25zZShib2R5KTtcclxuICAgIG1lLiNpbm5lciA9IGlubmVyO1xyXG4gICAgcmV0dXJuIG1lO1xyXG4gIH1cclxuICBnZXQgaGVhZGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLiNpbm5lci5oZWFkZXJzO1xyXG4gIH1cclxuICBnZXQgc3RhdHVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnN0YXR1cztcclxuICB9XHJcbiAgZ2V0IHN0YXR1c1RleHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIuc3RhdHVzVGV4dDtcclxuICB9XHJcbiAgZ2V0IG9rKCkge1xyXG4gICAgcmV0dXJuIDIwMCA8PSB0aGlzLiNpbm5lci5zdGF0dXMgJiYgdGhpcy4jaW5uZXIuc3RhdHVzIDw9IDI5OTtcclxuICB9XHJcbiAgZ2V0IHVybCgpIHtcclxuICAgIHJldHVybiB0aGlzLiNpbm5lci51cmwgPz8gXCJcIjtcclxuICB9XHJcbiAgZ2V0IHR5cGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudHlwZTtcclxuICB9XHJcbiAgZ2V0IHZlcnNpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudmVyc2lvbjtcclxuICB9XHJcbiAgYXJyYXlCdWZmZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ieXRlcygpLmJ1ZmZlcjtcclxuICB9XHJcbiAgYnl0ZXMoKSB7XHJcbiAgICBpZiAodGhpcy4jYm9keSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy4jYm9keSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICByZXR1cm4gdGV4dEVuY29kZXIyLmVuY29kZSh0aGlzLiNib2R5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh0aGlzLiNib2R5KTtcclxuICAgIH1cclxuICB9XHJcbiAganNvbigpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMudGV4dCgpKTtcclxuICB9XHJcbiAgdGV4dCgpIHtcclxuICAgIGlmICh0aGlzLiNib2R5ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLiNib2R5ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLiNib2R5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRleHREZWNvZGVyMi5kZWNvZGUodGhpcy4jYm9keSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL3NlcnZlci9odHRwX2hhbmRsZXJzLnRzXHJcbnZhciBodHRwSGFuZGxlckZuID0gU3ltYm9sKFwiU3BhY2V0aW1lREIuaHR0cEhhbmRsZXJGblwiKTtcclxudmFyIEFDQ0VQVEFCTEVfUk9VVEVfUEFUSF9DSEFSU19IVU1BTl9ERVNDUklQVElPTiA9IFwiQVNDSUkgbG93ZXJjYXNlIGxldHRlcnMsIGRpZ2l0cyBhbmQgYC1ffi9gXCI7XHJcbnZhciBtYWtlUmVxdWVzdCA9IFN5bWJvbChcIm1ha2VSZXF1ZXN0XCIpO1xyXG5mdW5jdGlvbiBjb2VyY2VSZXF1ZXN0Qm9keShib2R5KSB7XHJcbiAgaWYgKGJvZHkgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIGJvZHk7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgVWludDhBcnJheShib2R5KTtcclxufVxyXG5mdW5jdGlvbiByZXF1ZXN0Qm9keVRvQnl0ZXMoYm9keSkge1xyXG4gIGlmIChib2R5ID09IG51bGwpIHtcclxuICAgIHJldHVybiBuZXcgVWludDhBcnJheSgpO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiB0ZXh0RW5jb2RlcjIuZW5jb2RlKGJvZHkpO1xyXG4gIH1cclxuICByZXR1cm4gYm9keTtcclxufVxyXG5mdW5jdGlvbiByZXF1ZXN0Qm9keVRvVGV4dChib2R5KSB7XHJcbiAgaWYgKGJvZHkgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIGJvZHk7XHJcbiAgfVxyXG4gIHJldHVybiB0ZXh0RGVjb2RlcjIuZGVjb2RlKGJvZHkpO1xyXG59XHJcbmZ1bmN0aW9uIGNoYXJhY3RlcklzQWNjZXB0YWJsZUZvclJvdXRlUGF0aChjKSB7XHJcbiAgcmV0dXJuIGMgPj0gXCJhXCIgJiYgYyA8PSBcInpcIiB8fCBjID49IFwiMFwiICYmIGMgPD0gXCI5XCIgfHwgYyA9PT0gXCItXCIgfHwgYyA9PT0gXCJfXCIgfHwgYyA9PT0gXCJ+XCIgfHwgYyA9PT0gXCIvXCI7XHJcbn1cclxuZnVuY3Rpb24gYXNzZXJ0VmFsaWRQYXRoKHBhdGgpIHtcclxuICBpZiAocGF0aCAhPT0gXCJcIiAmJiAhcGF0aC5zdGFydHNXaXRoKFwiL1wiKSkge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUm91dGUgcGF0aHMgbXVzdCBzdGFydCB3aXRoIFxcYC9cXGA6ICR7cGF0aH1gKTtcclxuICB9XHJcbiAgaWYgKCFbLi4ucGF0aF0uZXZlcnkoY2hhcmFjdGVySXNBY2NlcHRhYmxlRm9yUm91dGVQYXRoKSkge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgYFJvdXRlIHBhdGhzIG1heSBjb250YWluIG9ubHkgJHtBQ0NFUFRBQkxFX1JPVVRFX1BBVEhfQ0hBUlNfSFVNQU5fREVTQ1JJUFRJT059OiAke3BhdGh9YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gcm91dGVzT3ZlcmxhcChhLCBiKSB7XHJcbiAgY29uc3QgbWV0aG9kc01hdGNoID0gKGxlZnQsIHJpZ2h0KSA9PiB7XHJcbiAgICBpZiAobGVmdC50YWcgIT09IHJpZ2h0LnRhZykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAobGVmdC50YWcgPT09IFwiRXh0ZW5zaW9uXCIgJiYgcmlnaHQudGFnID09PSBcIkV4dGVuc2lvblwiKSB7XHJcbiAgICAgIHJldHVybiBsZWZ0LnZhbHVlID09PSByaWdodC52YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcbiAgcmV0dXJuIGEucGF0aCA9PT0gYi5wYXRoICYmIChhLm1ldGhvZC50YWcgPT09IFwiQW55XCIgfHwgYi5tZXRob2QudGFnID09PSBcIkFueVwiIHx8IGEubWV0aG9kLnRhZyA9PT0gXCJNZXRob2RcIiAmJiBiLm1ldGhvZC50YWcgPT09IFwiTWV0aG9kXCIgJiYgbWV0aG9kc01hdGNoKGEubWV0aG9kLnZhbHVlLCBiLm1ldGhvZC52YWx1ZSkpO1xyXG59XHJcbmZ1bmN0aW9uIGpvaW5QYXRocyhwcmVmaXgsIHN1ZmZpeCkge1xyXG4gIGlmIChwcmVmaXggPT09IFwiL1wiKSB7XHJcbiAgICByZXR1cm4gc3VmZml4O1xyXG4gIH1cclxuICBpZiAoc3VmZml4ID09PSBcIi9cIikge1xyXG4gICAgcmV0dXJuIHByZWZpeDtcclxuICB9XHJcbiAgbGV0IHByZWZpeEVuZCA9IHByZWZpeC5sZW5ndGg7XHJcbiAgd2hpbGUgKHByZWZpeEVuZCA+IDAgJiYgcHJlZml4W3ByZWZpeEVuZCAtIDFdID09PSBcIi9cIikge1xyXG4gICAgcHJlZml4RW5kLS07XHJcbiAgfVxyXG4gIGxldCBzdWZmaXhTdGFydCA9IDA7XHJcbiAgd2hpbGUgKHN1ZmZpeFN0YXJ0IDwgc3VmZml4Lmxlbmd0aCAmJiBzdWZmaXhbc3VmZml4U3RhcnRdID09PSBcIi9cIikge1xyXG4gICAgc3VmZml4U3RhcnQrKztcclxuICB9XHJcbiAgY29uc3Qgam9pbmVkUHJlZml4ID0gcHJlZml4LnNsaWNlKDAsIHByZWZpeEVuZCk7XHJcbiAgY29uc3Qgam9pbmVkU3VmZml4ID0gc3VmZml4LnNsaWNlKHN1ZmZpeFN0YXJ0KTtcclxuICByZXR1cm4gYCR7am9pbmVkUHJlZml4fS8ke2pvaW5lZFN1ZmZpeH1gO1xyXG59XHJcbnZhciBSZXF1ZXN0ID0gY2xhc3MgX1JlcXVlc3Qge1xyXG4gICNib2R5O1xyXG4gICNpbm5lcjtcclxuICBjb25zdHJ1Y3Rvcih1cmwsIGluaXQgPSB7fSkge1xyXG4gICAgdGhpcy4jYm9keSA9IGNvZXJjZVJlcXVlc3RCb2R5KGluaXQuYm9keSk7XHJcbiAgICB0aGlzLiNpbm5lciA9IHtcclxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzKSxcclxuICAgICAgbWV0aG9kOiBpbml0Lm1ldGhvZCA/PyBcIkdFVFwiLFxyXG4gICAgICB1cmk6IFwiXCIgKyB1cmwsXHJcbiAgICAgIHZlcnNpb246IGluaXQudmVyc2lvbiA/PyB7IHRhZzogXCJIdHRwMTFcIiB9XHJcbiAgICB9O1xyXG4gIH1cclxuICBzdGF0aWMgW21ha2VSZXF1ZXN0XShib2R5LCBpbm5lcikge1xyXG4gICAgY29uc3QgbWUgPSBuZXcgX1JlcXVlc3QoaW5uZXIudXJpKTtcclxuICAgIG1lLiNib2R5ID0gY29lcmNlUmVxdWVzdEJvZHkoYm9keSk7XHJcbiAgICBtZS4jaW5uZXIgPSBpbm5lcjtcclxuICAgIHJldHVybiBtZTtcclxuICB9XHJcbiAgZ2V0IGhlYWRlcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIuaGVhZGVycztcclxuICB9XHJcbiAgZ2V0IG1ldGhvZCgpIHtcclxuICAgIHJldHVybiB0aGlzLiNpbm5lci5tZXRob2Q7XHJcbiAgfVxyXG4gIGdldCB1cmkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudXJpO1xyXG4gIH1cclxuICBnZXQgdXJsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnVyaTtcclxuICB9XHJcbiAgZ2V0IHZlcnNpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudmVyc2lvbjtcclxuICB9XHJcbiAgYXJyYXlCdWZmZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ieXRlcygpLmJ1ZmZlcjtcclxuICB9XHJcbiAgYnl0ZXMoKSB7XHJcbiAgICByZXR1cm4gcmVxdWVzdEJvZHlUb0J5dGVzKHRoaXMuI2JvZHkpO1xyXG4gIH1cclxuICBqc29uKCkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy50ZXh0KCkpO1xyXG4gIH1cclxuICB0ZXh0KCkge1xyXG4gICAgcmV0dXJuIHJlcXVlc3RCb2R5VG9UZXh0KHRoaXMuI2JvZHkpO1xyXG4gIH1cclxufTtcclxudmFyIGV4cG9ydGVkSHR0cEhhbmRsZXJPYmplY3RzID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrU2V0KCk7XHJcbnZhciBSb3V0ZXIgPSBjbGFzcyBfUm91dGVyIHtcclxuICAjcm91dGVzO1xyXG4gIGNvbnN0cnVjdG9yKHJvdXRlcyA9IFtdKSB7XHJcbiAgICB0aGlzLiNyb3V0ZXMgPSByb3V0ZXM7XHJcbiAgfVxyXG4gIGdldChwYXRoLCBoYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGRSb3V0ZShcclxuICAgICAgeyB0YWc6IFwiTWV0aG9kXCIsIHZhbHVlOiB7IHRhZzogXCJHZXRcIiB9IH0sXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGhhbmRsZXJcclxuICAgICk7XHJcbiAgfVxyXG4gIGhlYWQocGF0aCwgaGFuZGxlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkUm91dGUoXHJcbiAgICAgIHsgdGFnOiBcIk1ldGhvZFwiLCB2YWx1ZTogeyB0YWc6IFwiSGVhZFwiIH0gfSxcclxuICAgICAgcGF0aCxcclxuICAgICAgaGFuZGxlclxyXG4gICAgKTtcclxuICB9XHJcbiAgb3B0aW9ucyhwYXRoLCBoYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGRSb3V0ZShcclxuICAgICAgeyB0YWc6IFwiTWV0aG9kXCIsIHZhbHVlOiB7IHRhZzogXCJPcHRpb25zXCIgfSB9LFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBoYW5kbGVyXHJcbiAgICApO1xyXG4gIH1cclxuICBwdXQocGF0aCwgaGFuZGxlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkUm91dGUoXHJcbiAgICAgIHsgdGFnOiBcIk1ldGhvZFwiLCB2YWx1ZTogeyB0YWc6IFwiUHV0XCIgfSB9LFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBoYW5kbGVyXHJcbiAgICApO1xyXG4gIH1cclxuICBkZWxldGUocGF0aCwgaGFuZGxlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkUm91dGUoXHJcbiAgICAgIHsgdGFnOiBcIk1ldGhvZFwiLCB2YWx1ZTogeyB0YWc6IFwiRGVsZXRlXCIgfSB9LFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBoYW5kbGVyXHJcbiAgICApO1xyXG4gIH1cclxuICBwb3N0KHBhdGgsIGhhbmRsZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmFkZFJvdXRlKFxyXG4gICAgICB7IHRhZzogXCJNZXRob2RcIiwgdmFsdWU6IHsgdGFnOiBcIlBvc3RcIiB9IH0sXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGhhbmRsZXJcclxuICAgICk7XHJcbiAgfVxyXG4gIHBhdGNoKHBhdGgsIGhhbmRsZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmFkZFJvdXRlKFxyXG4gICAgICB7IHRhZzogXCJNZXRob2RcIiwgdmFsdWU6IHsgdGFnOiBcIlBhdGNoXCIgfSB9LFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBoYW5kbGVyXHJcbiAgICApO1xyXG4gIH1cclxuICBhbnkocGF0aCwgaGFuZGxlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkUm91dGUoeyB0YWc6IFwiQW55XCIgfSwgcGF0aCwgaGFuZGxlcik7XHJcbiAgfVxyXG4gIG5lc3QocGF0aCwgc3ViUm91dGVyKSB7XHJcbiAgICBhc3NlcnRWYWxpZFBhdGgocGF0aCk7XHJcbiAgICBpZiAodGhpcy4jcm91dGVzLnNvbWUoKHJvdXRlKSA9PiByb3V0ZS5wYXRoLnN0YXJ0c1dpdGgocGF0aCkpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgYENhbm5vdCBuZXN0IHJvdXRlciBhdCBcXGAke3BhdGh9XFxgOyBleGlzdGluZyByb3V0ZXMgb3ZlcmxhcCB3aXRoIG5lc3RlZCBwYXRoYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgbGV0IG1lcmdlZCA9IG5ldyBfUm91dGVyKHRoaXMuI3JvdXRlcyk7XHJcbiAgICBmb3IgKGNvbnN0IHJvdXRlIG9mIHN1YlJvdXRlci4jcm91dGVzKSB7XHJcbiAgICAgIG1lcmdlZCA9IG1lcmdlZC5hZGRSb3V0ZShcclxuICAgICAgICByb3V0ZS5tZXRob2QsXHJcbiAgICAgICAgam9pblBhdGhzKHBhdGgsIHJvdXRlLnBhdGgpLFxyXG4gICAgICAgIHJvdXRlLmhhbmRsZXJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXJnZWQ7XHJcbiAgfVxyXG4gIG1lcmdlKG90aGVyUm91dGVyKSB7XHJcbiAgICBsZXQgbWVyZ2VkID0gbmV3IF9Sb3V0ZXIodGhpcy4jcm91dGVzKTtcclxuICAgIGZvciAoY29uc3Qgcm91dGUgb2Ygb3RoZXJSb3V0ZXIuI3JvdXRlcykge1xyXG4gICAgICBtZXJnZWQgPSBtZXJnZWQuYWRkUm91dGUocm91dGUubWV0aG9kLCByb3V0ZS5wYXRoLCByb3V0ZS5oYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXJnZWQ7XHJcbiAgfVxyXG4gIGludG9Sb3V0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jcm91dGVzLnNsaWNlKCk7XHJcbiAgfVxyXG4gIGFkZFJvdXRlKG1ldGhvZCwgcGF0aCwgaGFuZGxlcikge1xyXG4gICAgYXNzZXJ0VmFsaWRQYXRoKHBhdGgpO1xyXG4gICAgY29uc3QgY2FuZGlkYXRlID0geyBtZXRob2QsIHBhdGgsIGhhbmRsZXIgfTtcclxuICAgIGlmICh0aGlzLiNyb3V0ZXMuc29tZSgocm91dGUpID0+IHJvdXRlc092ZXJsYXAocm91dGUsIGNhbmRpZGF0ZSkpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFJvdXRlIGNvbmZsaWN0IGZvciBcXGAke3BhdGh9XFxgYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IF9Sb3V0ZXIoWy4uLnRoaXMuI3JvdXRlcywgY2FuZGlkYXRlXSk7XHJcbiAgfVxyXG59O1xyXG5mdW5jdGlvbiBtYWtlSHR0cEhhbmRsZXJFeHBvcnQoY3R4LCBvcHRzLCBmbikge1xyXG4gIGNvbnN0IGhhbmRsZXJFeHBvcnQgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgKC4uLmFyZ3MpID0+IGZuKC4uLmFyZ3MpLFxyXG4gICAge1xyXG4gICAgICBbaHR0cEhhbmRsZXJGbl06IGZuLFxyXG4gICAgICBbZXhwb3J0Q29udGV4dF06IGN0eCxcclxuICAgICAgW3JlZ2lzdGVyRXhwb3J0XShjdHgyLCBleHBvcnROYW1lKSB7XHJcbiAgICAgICAgaWYgKGV4cG9ydGVkSHR0cEhhbmRsZXJPYmplY3RzLmhhcyhoYW5kbGVyRXhwb3J0KSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgYEhUVFAgaGFuZGxlciAnJHtleHBvcnROYW1lfScgd2FzIGV4cG9ydGVkIG1vcmUgdGhhbiBvbmNlYFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZWRIdHRwSGFuZGxlck9iamVjdHMuYWRkKGhhbmRsZXJFeHBvcnQpO1xyXG4gICAgICAgIHJlZ2lzdGVySHR0cEhhbmRsZXIoY3R4MiwgZXhwb3J0TmFtZSwgZm4sIG9wdHMpO1xyXG4gICAgICAgIGN0eDIuaHR0cEhhbmRsZXJFeHBvcnRzLnNldChcclxuICAgICAgICAgIGhhbmRsZXJFeHBvcnQsXHJcbiAgICAgICAgICBleHBvcnROYW1lXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICk7XHJcbiAgcmV0dXJuIGhhbmRsZXJFeHBvcnQ7XHJcbn1cclxuZnVuY3Rpb24gbWFrZUh0dHBSb3V0ZXJFeHBvcnQoY3R4LCByb3V0ZXIpIHtcclxuICByZXR1cm4ge1xyXG4gICAgW2V4cG9ydENvbnRleHRdOiBjdHgsXHJcbiAgICBbcmVnaXN0ZXJFeHBvcnRdKGN0eDIpIHtcclxuICAgICAgY3R4Mi5wZW5kaW5nSHR0cFJvdXRlcy5wdXNoKC4uLnJvdXRlci5pbnRvUm91dGVzKCkpO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gcmVnaXN0ZXJIdHRwSGFuZGxlcihjdHgsIGV4cG9ydE5hbWUsIGZuLCBvcHRzKSB7XHJcbiAgY3R4LmRlZmluZUh0dHBIYW5kbGVyKGV4cG9ydE5hbWUpO1xyXG4gIGN0eC5tb2R1bGVEZWYuaHR0cEhhbmRsZXJzLnB1c2goeyBzb3VyY2VOYW1lOiBleHBvcnROYW1lIH0pO1xyXG4gIGlmIChvcHRzPy5uYW1lICE9IG51bGwpIHtcclxuICAgIGN0eC5tb2R1bGVEZWYuZXhwbGljaXROYW1lcy5lbnRyaWVzLnB1c2goe1xyXG4gICAgICB0YWc6IFwiRnVuY3Rpb25cIixcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxyXG4gICAgICAgIGNhbm9uaWNhbE5hbWU6IG9wdHMubmFtZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKCFmbi5uYW1lKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwibmFtZVwiLCB7IHZhbHVlOiBleHBvcnROYW1lLCB3cml0YWJsZTogZmFsc2UgfSk7XHJcbiAgfVxyXG4gIGN0eC5odHRwSGFuZGxlcnMucHVzaChmbik7XHJcbn1cclxuXHJcbi8vIHNyYy9zZXJ2ZXIvaHR0cF9pbnRlcm5hbC50c1xyXG52YXIgaW1wb3J0X3N0YXR1c2VzID0gX190b0VTTShyZXF1aXJlX3N0YXR1c2VzKCkpO1xyXG5cclxuLy8gc3JjL3NlcnZlci9yYW5nZS50c1xyXG52YXIgUmFuZ2UgPSBjbGFzcyB7XHJcbiAgI2Zyb207XHJcbiAgI3RvO1xyXG4gIGNvbnN0cnVjdG9yKGZyb20sIHRvKSB7XHJcbiAgICB0aGlzLiNmcm9tID0gZnJvbSA/PyB7IHRhZzogXCJ1bmJvdW5kZWRcIiB9O1xyXG4gICAgdGhpcy4jdG8gPSB0byA/PyB7IHRhZzogXCJ1bmJvdW5kZWRcIiB9O1xyXG4gIH1cclxuICBnZXQgZnJvbSgpIHtcclxuICAgIHJldHVybiB0aGlzLiNmcm9tO1xyXG4gIH1cclxuICBnZXQgdG8oKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jdG87XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL2xpYi90YWJsZS50c1xyXG5mdW5jdGlvbiB0YWJsZShvcHRzLCByb3csIC4uLl8pIHtcclxuICBjb25zdCB7XHJcbiAgICBuYW1lLFxyXG4gICAgcHVibGljOiBpc1B1YmxpYyA9IGZhbHNlLFxyXG4gICAgaW5kZXhlczogdXNlckluZGV4ZXMgPSBbXSxcclxuICAgIHNjaGVkdWxlZCxcclxuICAgIGV2ZW50OiBpc0V2ZW50ID0gZmFsc2VcclxuICB9ID0gb3B0cztcclxuICBjb25zdCBjb2xJZHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xyXG4gIGNvbnN0IGNvbE5hbWVMaXN0ID0gW107XHJcbiAgaWYgKCEocm93IGluc3RhbmNlb2YgUm93QnVpbGRlcikpIHtcclxuICAgIHJvdyA9IG5ldyBSb3dCdWlsZGVyKHJvdyk7XHJcbiAgfVxyXG4gIHJvdy5hbGdlYnJhaWNUeXBlLnZhbHVlLmVsZW1lbnRzLmZvckVhY2goKGVsZW0sIGkpID0+IHtcclxuICAgIGNvbElkcy5zZXQoZWxlbS5uYW1lLCBpKTtcclxuICAgIGNvbE5hbWVMaXN0LnB1c2goZWxlbS5uYW1lKTtcclxuICB9KTtcclxuICBjb25zdCBwayA9IFtdO1xyXG4gIGNvbnN0IGluZGV4ZXMgPSBbXTtcclxuICBjb25zdCBjb25zdHJhaW50cyA9IFtdO1xyXG4gIGNvbnN0IHNlcXVlbmNlcyA9IFtdO1xyXG4gIGxldCBzY2hlZHVsZUF0Q29sO1xyXG4gIGNvbnN0IGRlZmF1bHRWYWx1ZXMgPSBbXTtcclxuICBmb3IgKGNvbnN0IFtuYW1lMiwgYnVpbGRlcl0gb2YgT2JqZWN0LmVudHJpZXMocm93LnJvdykpIHtcclxuICAgIGNvbnN0IG1ldGEgPSBidWlsZGVyLmNvbHVtbk1ldGFkYXRhO1xyXG4gICAgaWYgKG1ldGEuaXNQcmltYXJ5S2V5KSB7XHJcbiAgICAgIHBrLnB1c2goY29sSWRzLmdldChuYW1lMikpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNVbmlxdWUgPSBtZXRhLmlzVW5pcXVlIHx8IG1ldGEuaXNQcmltYXJ5S2V5O1xyXG4gICAgaWYgKG1ldGEuaW5kZXhUeXBlIHx8IGlzVW5pcXVlKSB7XHJcbiAgICAgIGNvbnN0IGFsZ28gPSBtZXRhLmluZGV4VHlwZSA/PyBcImJ0cmVlXCI7XHJcbiAgICAgIGNvbnN0IGlkID0gY29sSWRzLmdldChuYW1lMik7XHJcbiAgICAgIGxldCBhbGdvcml0aG07XHJcbiAgICAgIHN3aXRjaCAoYWxnbykge1xyXG4gICAgICAgIGNhc2UgXCJidHJlZVwiOlxyXG4gICAgICAgICAgYWxnb3JpdGhtID0gUmF3SW5kZXhBbGdvcml0aG0uQlRyZWUoW2lkXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaGFzaFwiOlxyXG4gICAgICAgICAgYWxnb3JpdGhtID0gUmF3SW5kZXhBbGdvcml0aG0uSGFzaChbaWRdKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkaXJlY3RcIjpcclxuICAgICAgICAgIGFsZ29yaXRobSA9IFJhd0luZGV4QWxnb3JpdGhtLkRpcmVjdChpZCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBpbmRleGVzLnB1c2goe1xyXG4gICAgICAgIHNvdXJjZU5hbWU6IHZvaWQgMCxcclxuICAgICAgICAvLyBVbm5hbWVkIGluZGV4ZXMgd2lsbCBiZSBhc3NpZ25lZCBhIGdsb2JhbGx5IHVuaXF1ZSBuYW1lXHJcbiAgICAgICAgYWNjZXNzb3JOYW1lOiBuYW1lMixcclxuICAgICAgICBhbGdvcml0aG1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNVbmlxdWUpIHtcclxuICAgICAgY29uc3RyYWludHMucHVzaCh7XHJcbiAgICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxyXG4gICAgICAgIGRhdGE6IHsgdGFnOiBcIlVuaXF1ZVwiLCB2YWx1ZTogeyBjb2x1bW5zOiBbY29sSWRzLmdldChuYW1lMildIH0gfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChtZXRhLmlzQXV0b0luY3JlbWVudCkge1xyXG4gICAgICBzZXF1ZW5jZXMucHVzaCh7XHJcbiAgICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxyXG4gICAgICAgIHN0YXJ0OiB2b2lkIDAsXHJcbiAgICAgICAgbWluVmFsdWU6IHZvaWQgMCxcclxuICAgICAgICBtYXhWYWx1ZTogdm9pZCAwLFxyXG4gICAgICAgIGNvbHVtbjogY29sSWRzLmdldChuYW1lMiksXHJcbiAgICAgICAgaW5jcmVtZW50OiAxblxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWV0YSwgXCJkZWZhdWx0VmFsdWVcIikpIHtcclxuICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigxNik7XHJcbiAgICAgIGJ1aWxkZXIuc2VyaWFsaXplKHdyaXRlciwgbWV0YS5kZWZhdWx0VmFsdWUpO1xyXG4gICAgICBkZWZhdWx0VmFsdWVzLnB1c2goe1xyXG4gICAgICAgIGNvbElkOiBjb2xJZHMuZ2V0KG5hbWUyKSxcclxuICAgICAgICB2YWx1ZTogd3JpdGVyLmdldEJ1ZmZlcigpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWxnZWJyYWljVHlwZSA9IGJ1aWxkZXIudHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZTtcclxuICAgIGlmIChzY2hlZHVsZV9hdF9kZWZhdWx0LmlzU2NoZWR1bGVBdChhbGdlYnJhaWNUeXBlKSkge1xyXG4gICAgICBzY2hlZHVsZUF0Q29sID0gY29sSWRzLmdldChuYW1lMik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoY29uc3QgaW5kZXhPcHRzIG9mIHVzZXJJbmRleGVzID8/IFtdKSB7XHJcbiAgICBjb25zdCBhY2Nlc3NvciA9IGluZGV4T3B0cy5hY2Nlc3NvcjtcclxuICAgIGlmICh0eXBlb2YgYWNjZXNzb3IgIT09IFwic3RyaW5nXCIgfHwgYWNjZXNzb3IubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IHRhYmxlTGFiZWwgPSBuYW1lID8/IFwiPHVubmFtZWQ+XCI7XHJcbiAgICAgIGNvbnN0IGluZGV4TGFiZWwgPSBpbmRleE9wdHMubmFtZSA/PyBcIjx1bm5hbWVkPlwiO1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgIGBJbmRleCAnJHtpbmRleExhYmVsfScgb24gdGFibGUgJyR7dGFibGVMYWJlbH0nIG11c3QgZGVmaW5lIGEgbm9uLWVtcHR5ICdhY2Nlc3NvcidgXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBsZXQgYWxnb3JpdGhtO1xyXG4gICAgc3dpdGNoIChpbmRleE9wdHMuYWxnb3JpdGhtKSB7XHJcbiAgICAgIGNhc2UgXCJidHJlZVwiOlxyXG4gICAgICAgIGFsZ29yaXRobSA9IHtcclxuICAgICAgICAgIHRhZzogXCJCVHJlZVwiLFxyXG4gICAgICAgICAgdmFsdWU6IGluZGV4T3B0cy5jb2x1bW5zLm1hcCgoYykgPT4gY29sSWRzLmdldChjKSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiaGFzaFwiOlxyXG4gICAgICAgIGFsZ29yaXRobSA9IHtcclxuICAgICAgICAgIHRhZzogXCJIYXNoXCIsXHJcbiAgICAgICAgICB2YWx1ZTogaW5kZXhPcHRzLmNvbHVtbnMubWFwKChjKSA9PiBjb2xJZHMuZ2V0KGMpKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJkaXJlY3RcIjpcclxuICAgICAgICBhbGdvcml0aG0gPSB7IHRhZzogXCJEaXJlY3RcIiwgdmFsdWU6IGNvbElkcy5nZXQoaW5kZXhPcHRzLmNvbHVtbikgfTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGluZGV4ZXMucHVzaCh7XHJcbiAgICAgIHNvdXJjZU5hbWU6IHZvaWQgMCxcclxuICAgICAgYWNjZXNzb3JOYW1lOiBhY2Nlc3NvcixcclxuICAgICAgYWxnb3JpdGhtLFxyXG4gICAgICBjYW5vbmljYWxOYW1lOiBpbmRleE9wdHMubmFtZVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZvciAoY29uc3QgY29uc3RyYWludE9wdHMgb2Ygb3B0cy5jb25zdHJhaW50cyA/PyBbXSkge1xyXG4gICAgaWYgKGNvbnN0cmFpbnRPcHRzLmNvbnN0cmFpbnQgPT09IFwidW5pcXVlXCIpIHtcclxuICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICB0YWc6IFwiVW5pcXVlXCIsXHJcbiAgICAgICAgdmFsdWU6IHsgY29sdW1uczogY29uc3RyYWludE9wdHMuY29sdW1ucy5tYXAoKGMpID0+IGNvbElkcy5nZXQoYykpIH1cclxuICAgICAgfTtcclxuICAgICAgY29uc3RyYWludHMucHVzaCh7IHNvdXJjZU5hbWU6IGNvbnN0cmFpbnRPcHRzLm5hbWUsIGRhdGEgfSk7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBwcm9kdWN0VHlwZSA9IHJvdy5hbGdlYnJhaWNUeXBlLnZhbHVlO1xyXG4gIGNvbnN0IHNjaGVkdWxlID0gc2NoZWR1bGVkICYmIHNjaGVkdWxlQXRDb2wgIT09IHZvaWQgMCA/IHsgc2NoZWR1bGVBdENvbCwgcmVkdWNlcjogc2NoZWR1bGVkIH0gOiB2b2lkIDA7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJvd1R5cGU6IHJvdyxcclxuICAgIHRhYmxlTmFtZTogbmFtZSxcclxuICAgIHJvd1NwYWNldGltZVR5cGU6IHByb2R1Y3RUeXBlLFxyXG4gICAgdGFibGVEZWY6IChjdHgsIGFjY05hbWUpID0+IHtcclxuICAgICAgY29uc3QgdGFibGVOYW1lID0gbmFtZSA/PyBhY2NOYW1lO1xyXG4gICAgICBpZiAocm93LnR5cGVOYW1lID09PSB2b2lkIDApIHtcclxuICAgICAgICByb3cudHlwZU5hbWUgPSB0b1Bhc2NhbENhc2UodGFibGVOYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGV4ZXMpIHtcclxuICAgICAgICBjb25zdCBjb2xzID0gaW5kZXguYWxnb3JpdGhtLnRhZyA9PT0gXCJEaXJlY3RcIiA/IFtpbmRleC5hbGdvcml0aG0udmFsdWVdIDogaW5kZXguYWxnb3JpdGhtLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGNvbFMgPSBjb2xzLm1hcCgoaSkgPT4gY29sTmFtZUxpc3RbaV0pLmpvaW4oXCJfXCIpO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZU5hbWUgPSBpbmRleC5zb3VyY2VOYW1lID0gYCR7YWNjTmFtZX1fJHtjb2xTfV9pZHhfJHtpbmRleC5hbGdvcml0aG0udGFnLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgICBjb25zdCB7IGNhbm9uaWNhbE5hbWUgfSA9IGluZGV4O1xyXG4gICAgICAgIGlmIChjYW5vbmljYWxOYW1lICE9PSB2b2lkIDApIHtcclxuICAgICAgICAgIGN0eC5tb2R1bGVEZWYuZXhwbGljaXROYW1lcy5lbnRyaWVzLnB1c2goXHJcbiAgICAgICAgICAgIEV4cGxpY2l0TmFtZUVudHJ5LkluZGV4KHsgc291cmNlTmFtZSwgY2Fub25pY2FsTmFtZSB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzb3VyY2VOYW1lOiBhY2NOYW1lLFxyXG4gICAgICAgIHByb2R1Y3RUeXBlUmVmOiBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJvdykucmVmLFxyXG4gICAgICAgIHByaW1hcnlLZXk6IHBrLFxyXG4gICAgICAgIGluZGV4ZXMsXHJcbiAgICAgICAgY29uc3RyYWludHMsXHJcbiAgICAgICAgc2VxdWVuY2VzLFxyXG4gICAgICAgIHRhYmxlVHlwZTogeyB0YWc6IFwiVXNlclwiIH0sXHJcbiAgICAgICAgdGFibGVBY2Nlc3M6IHsgdGFnOiBpc1B1YmxpYyA/IFwiUHVibGljXCIgOiBcIlByaXZhdGVcIiB9LFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZXMsXHJcbiAgICAgICAgaXNFdmVudFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vIFByZXNlcnZlIHRoZSBkZWNsYXJlZCBpbmRleCBvcHRpb25zIGFzIHJ1bnRpbWUgZGF0YSBzbyBgdGFibGVUb1NjaGVtYWBcclxuICAgIC8vIGNhbiBleHBvc2UgdGhlbSB3aXRob3V0IHR5cGUtc211Z2dsaW5nLlxyXG4gICAgaWR4czogdXNlckluZGV4ZXMsXHJcbiAgICBjb25zdHJhaW50cyxcclxuICAgIHNjaGVkdWxlQXRDb2wsXHJcbiAgICBzY2hlZHVsZVxyXG4gIH07XHJcbn1cclxuXHJcbi8vIHNyYy9saWIvcXVlcnkudHNcclxudmFyIFF1ZXJ5QnJhbmQgPSBTeW1ib2woXCJRdWVyeUJyYW5kXCIpO1xyXG52YXIgaXNSb3dUeXBlZFF1ZXJ5ID0gKHZhbCkgPT4gISF2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiBRdWVyeUJyYW5kIGluIHZhbDtcclxudmFyIGlzVHlwZWRRdWVyeSA9ICh2YWwpID0+ICEhdmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgUXVlcnlCcmFuZCBpbiB2YWw7XHJcbmZ1bmN0aW9uIHRvU3FsKHEpIHtcclxuICByZXR1cm4gcS50b1NxbCgpO1xyXG59XHJcbnZhciBTZW1pam9pbkltcGwgPSBjbGFzcyBfU2VtaWpvaW5JbXBsIHtcclxuICBjb25zdHJ1Y3Rvcihzb3VyY2VRdWVyeSwgZmlsdGVyUXVlcnksIGpvaW5Db25kaXRpb24pIHtcclxuICAgIHRoaXMuc291cmNlUXVlcnkgPSBzb3VyY2VRdWVyeTtcclxuICAgIHRoaXMuZmlsdGVyUXVlcnkgPSBmaWx0ZXJRdWVyeTtcclxuICAgIHRoaXMuam9pbkNvbmRpdGlvbiA9IGpvaW5Db25kaXRpb247XHJcbiAgICBpZiAoc291cmNlUXVlcnkudGFibGUuc291cmNlTmFtZSA9PT0gZmlsdGVyUXVlcnkudGFibGUuc291cmNlTmFtZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2VtaWpvaW4gYSB0YWJsZSB0byBpdHNlbGZcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFtRdWVyeUJyYW5kXSA9IHRydWU7XHJcbiAgdHlwZSA9IFwic2VtaWpvaW5cIjtcclxuICBidWlsZCgpIHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICB3aGVyZShwcmVkaWNhdGUpIHtcclxuICAgIGNvbnN0IG5leHRTb3VyY2VRdWVyeSA9IHRoaXMuc291cmNlUXVlcnkud2hlcmUocHJlZGljYXRlKTtcclxuICAgIHJldHVybiBuZXcgX1NlbWlqb2luSW1wbChcclxuICAgICAgbmV4dFNvdXJjZVF1ZXJ5LFxyXG4gICAgICB0aGlzLmZpbHRlclF1ZXJ5LFxyXG4gICAgICB0aGlzLmpvaW5Db25kaXRpb25cclxuICAgICk7XHJcbiAgfVxyXG4gIHRvU3FsKCkge1xyXG4gICAgY29uc3QgbGVmdCA9IHRoaXMuZmlsdGVyUXVlcnk7XHJcbiAgICBjb25zdCByaWdodCA9IHRoaXMuc291cmNlUXVlcnk7XHJcbiAgICBjb25zdCBsZWZ0VGFibGUgPSBxdW90ZUlkZW50aWZpZXIobGVmdC50YWJsZS5zb3VyY2VOYW1lKTtcclxuICAgIGNvbnN0IHJpZ2h0VGFibGUgPSBxdW90ZUlkZW50aWZpZXIocmlnaHQudGFibGUuc291cmNlTmFtZSk7XHJcbiAgICBsZXQgc3FsID0gYFNFTEVDVCAke3JpZ2h0VGFibGV9LiogRlJPTSAke2xlZnRUYWJsZX0gSk9JTiAke3JpZ2h0VGFibGV9IE9OICR7Ym9vbGVhbkV4cHJUb1NxbCh0aGlzLmpvaW5Db25kaXRpb24pfWA7XHJcbiAgICBjb25zdCBjbGF1c2VzID0gW107XHJcbiAgICBpZiAobGVmdC53aGVyZUNsYXVzZSkge1xyXG4gICAgICBjbGF1c2VzLnB1c2goYm9vbGVhbkV4cHJUb1NxbChsZWZ0LndoZXJlQ2xhdXNlKSk7XHJcbiAgICB9XHJcbiAgICBpZiAocmlnaHQud2hlcmVDbGF1c2UpIHtcclxuICAgICAgY2xhdXNlcy5wdXNoKGJvb2xlYW5FeHByVG9TcWwocmlnaHQud2hlcmVDbGF1c2UpKTtcclxuICAgIH1cclxuICAgIGlmIChjbGF1c2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3Qgd2hlcmVTcWwgPSBjbGF1c2VzLmxlbmd0aCA9PT0gMSA/IGNsYXVzZXNbMF0gOiBjbGF1c2VzLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgQU5EIFwiKTtcclxuICAgICAgc3FsICs9IGAgV0hFUkUgJHt3aGVyZVNxbH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNxbDtcclxuICB9XHJcbn07XHJcbnZhciBGcm9tQnVpbGRlciA9IGNsYXNzIF9Gcm9tQnVpbGRlciB7XHJcbiAgY29uc3RydWN0b3IodGFibGUyLCB3aGVyZUNsYXVzZSkge1xyXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlMjtcclxuICAgIHRoaXMud2hlcmVDbGF1c2UgPSB3aGVyZUNsYXVzZTtcclxuICB9XHJcbiAgW1F1ZXJ5QnJhbmRdID0gdHJ1ZTtcclxuICB3aGVyZShwcmVkaWNhdGUpIHtcclxuICAgIGNvbnN0IG5ld0NvbmRpdGlvbiA9IG5vcm1hbGl6ZVByZWRpY2F0ZUV4cHIocHJlZGljYXRlKHRoaXMudGFibGUuY29scykpO1xyXG4gICAgY29uc3QgbmV4dFdoZXJlID0gdGhpcy53aGVyZUNsYXVzZSA/IHRoaXMud2hlcmVDbGF1c2UuYW5kKG5ld0NvbmRpdGlvbikgOiBuZXdDb25kaXRpb247XHJcbiAgICByZXR1cm4gbmV3IF9Gcm9tQnVpbGRlcih0aGlzLnRhYmxlLCBuZXh0V2hlcmUpO1xyXG4gIH1cclxuICByaWdodFNlbWlqb2luKHJpZ2h0LCBvbikge1xyXG4gICAgY29uc3Qgc291cmNlUXVlcnkgPSBuZXcgX0Zyb21CdWlsZGVyKHJpZ2h0KTtcclxuICAgIGNvbnN0IGpvaW5Db25kaXRpb24gPSBvbihcclxuICAgICAgdGhpcy50YWJsZS5pbmRleGVkQ29scyxcclxuICAgICAgcmlnaHQuaW5kZXhlZENvbHNcclxuICAgICk7XHJcbiAgICByZXR1cm4gbmV3IFNlbWlqb2luSW1wbChzb3VyY2VRdWVyeSwgdGhpcywgam9pbkNvbmRpdGlvbik7XHJcbiAgfVxyXG4gIGxlZnRTZW1pam9pbihyaWdodCwgb24pIHtcclxuICAgIGNvbnN0IGZpbHRlclF1ZXJ5ID0gbmV3IF9Gcm9tQnVpbGRlcihyaWdodCk7XHJcbiAgICBjb25zdCBqb2luQ29uZGl0aW9uID0gb24oXHJcbiAgICAgIHRoaXMudGFibGUuaW5kZXhlZENvbHMsXHJcbiAgICAgIHJpZ2h0LmluZGV4ZWRDb2xzXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIG5ldyBTZW1pam9pbkltcGwodGhpcywgZmlsdGVyUXVlcnksIGpvaW5Db25kaXRpb24pO1xyXG4gIH1cclxuICB0b1NxbCgpIHtcclxuICAgIHJldHVybiByZW5kZXJTZWxlY3RTcWxXaXRoSm9pbnModGhpcy50YWJsZSwgdGhpcy53aGVyZUNsYXVzZSk7XHJcbiAgfVxyXG4gIGJ1aWxkKCkge1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59O1xyXG52YXIgVGFibGVSZWZJbXBsID0gY2xhc3Mge1xyXG4gIFtRdWVyeUJyYW5kXSA9IHRydWU7XHJcbiAgdHlwZSA9IFwidGFibGVcIjtcclxuICBzb3VyY2VOYW1lO1xyXG4gIGFjY2Vzc29yTmFtZTtcclxuICBjb2xzO1xyXG4gIGluZGV4ZWRDb2xzO1xyXG4gIHRhYmxlRGVmO1xyXG4gIC8vIERlbGVnYXRlIFVudHlwZWRUYWJsZURlZiBwcm9wZXJ0aWVzIGZyb20gdGFibGVEZWYgc28gdGhpcyBjYW4gYmUgdXNlZCBhcyBhIHRhYmxlIGRlZi5cclxuICBnZXQgY29sdW1ucygpIHtcclxuICAgIHJldHVybiB0aGlzLnRhYmxlRGVmLmNvbHVtbnM7XHJcbiAgfVxyXG4gIGdldCBpbmRleGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFibGVEZWYuaW5kZXhlcztcclxuICB9XHJcbiAgZ2V0IHJvd1R5cGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YWJsZURlZi5yb3dUeXBlO1xyXG4gIH1cclxuICBnZXQgY29uc3RyYWludHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YWJsZURlZi5jb25zdHJhaW50cztcclxuICB9XHJcbiAgY29uc3RydWN0b3IodGFibGVEZWYpIHtcclxuICAgIHRoaXMuc291cmNlTmFtZSA9IHRhYmxlRGVmLnNvdXJjZU5hbWU7XHJcbiAgICB0aGlzLmFjY2Vzc29yTmFtZSA9IHRhYmxlRGVmLmFjY2Vzc29yTmFtZTtcclxuICAgIHRoaXMuY29scyA9IGNyZWF0ZVJvd0V4cHIodGFibGVEZWYpO1xyXG4gICAgdGhpcy5pbmRleGVkQ29scyA9IHRoaXMuY29scztcclxuICAgIHRoaXMudGFibGVEZWYgPSB0YWJsZURlZjtcclxuICAgIE9iamVjdC5mcmVlemUodGhpcyk7XHJcbiAgfVxyXG4gIGFzRnJvbSgpIHtcclxuICAgIHJldHVybiBuZXcgRnJvbUJ1aWxkZXIodGhpcyk7XHJcbiAgfVxyXG4gIHJpZ2h0U2VtaWpvaW4ob3RoZXIsIG9uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS5yaWdodFNlbWlqb2luKG90aGVyLCBvbik7XHJcbiAgfVxyXG4gIGxlZnRTZW1pam9pbihvdGhlciwgb24pIHtcclxuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLmxlZnRTZW1pam9pbihvdGhlciwgb24pO1xyXG4gIH1cclxuICBidWlsZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLmJ1aWxkKCk7XHJcbiAgfVxyXG4gIHRvU3FsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkudG9TcWwoKTtcclxuICB9XHJcbiAgd2hlcmUocHJlZGljYXRlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS53aGVyZShwcmVkaWNhdGUpO1xyXG4gIH1cclxufTtcclxuZnVuY3Rpb24gY3JlYXRlVGFibGVSZWZGcm9tRGVmKHRhYmxlRGVmKSB7XHJcbiAgcmV0dXJuIG5ldyBUYWJsZVJlZkltcGwodGFibGVEZWYpO1xyXG59XHJcbmZ1bmN0aW9uIG1ha2VRdWVyeUJ1aWxkZXIoc2NoZW1hMikge1xyXG4gIGNvbnN0IHFiID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgZm9yIChjb25zdCB0YWJsZTIgb2YgT2JqZWN0LnZhbHVlcyhzY2hlbWEyLnRhYmxlcykpIHtcclxuICAgIGNvbnN0IHJlZiA9IGNyZWF0ZVRhYmxlUmVmRnJvbURlZihcclxuICAgICAgdGFibGUyXHJcbiAgICApO1xyXG4gICAgcWJbdGFibGUyLmFjY2Vzc29yTmFtZV0gPSByZWY7XHJcbiAgfVxyXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHFiKTtcclxufVxyXG5mdW5jdGlvbiBtYWtlRnJvbUJ1aWxkZXIodGFibGVzKSB7XHJcbiAgY29uc3QgcmVzdWx0ID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgY29uc3QgbmFtZXNwYWNlcyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKFxyXG4gICAgbnVsbFxyXG4gICk7XHJcbiAgZm9yIChjb25zdCB0YWJsZTIgb2YgT2JqZWN0LnZhbHVlcyh0YWJsZXMpKSB7XHJcbiAgICBjb25zdCBkb3RJZHggPSB0YWJsZTIuc291cmNlTmFtZS5pbmRleE9mKFwiLlwiKTtcclxuICAgIGlmIChkb3RJZHggPT09IC0xKSB7XHJcbiAgICAgIHJlc3VsdFt0YWJsZTIuYWNjZXNzb3JOYW1lXSA9IGNyZWF0ZVRhYmxlUmVmRnJvbURlZih0YWJsZTIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbnMgPSB0YWJsZTIuc291cmNlTmFtZS5zbGljZSgwLCBkb3RJZHgpO1xyXG4gICAgICBjb25zdCBrZXkgPSB0YWJsZTIuc291cmNlTmFtZS5zbGljZShkb3RJZHggKyAxKTtcclxuICAgICAgKG5hbWVzcGFjZXNbbnNdID8/PSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSlba2V5XSA9IGNyZWF0ZVRhYmxlUmVmRnJvbURlZihcclxuICAgICAgICB0YWJsZTJcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChjb25zdCBbbnMsIG5zVGFibGVzXSBvZiBPYmplY3QuZW50cmllcyhuYW1lc3BhY2VzKSkge1xyXG4gICAgcmVzdWx0W25zXSA9IE9iamVjdC5mcmVlemUobnNUYWJsZXMpO1xyXG4gIH1cclxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShyZXN1bHQpO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVJvd0V4cHIodGFibGVEZWYpIHtcclxuICBjb25zdCByb3cgPSB7fTtcclxuICBmb3IgKGNvbnN0IGNvbHVtbk5hbWUgb2YgT2JqZWN0LmtleXModGFibGVEZWYuY29sdW1ucykpIHtcclxuICAgIGNvbnN0IGNvbHVtbkJ1aWxkZXIgPSB0YWJsZURlZi5jb2x1bW5zW2NvbHVtbk5hbWVdO1xyXG4gICAgY29uc3QgY29sdW1uID0gbmV3IENvbHVtbkV4cHJlc3Npb24oXHJcbiAgICAgIHRhYmxlRGVmLnNvdXJjZU5hbWUsXHJcbiAgICAgIGNvbHVtbk5hbWUsXHJcbiAgICAgIGNvbHVtbkJ1aWxkZXIudHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZSxcclxuICAgICAgY29sdW1uQnVpbGRlci5jb2x1bW5NZXRhZGF0YS5uYW1lXHJcbiAgICApO1xyXG4gICAgcm93W2NvbHVtbk5hbWVdID0gT2JqZWN0LmZyZWV6ZShjb2x1bW4pO1xyXG4gIH1cclxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShyb3cpO1xyXG59XHJcbmZ1bmN0aW9uIHJlbmRlclNlbGVjdFNxbFdpdGhKb2lucyh0YWJsZTIsIHdoZXJlLCBleHRyYUNsYXVzZXMgPSBbXSkge1xyXG4gIGNvbnN0IHF1b3RlZFRhYmxlID0gcXVvdGVJZGVudGlmaWVyKHRhYmxlMi5zb3VyY2VOYW1lKTtcclxuICBjb25zdCBzcWwgPSBgU0VMRUNUICogRlJPTSAke3F1b3RlZFRhYmxlfWA7XHJcbiAgY29uc3QgY2xhdXNlcyA9IFtdO1xyXG4gIGlmICh3aGVyZSkgY2xhdXNlcy5wdXNoKGJvb2xlYW5FeHByVG9TcWwod2hlcmUpKTtcclxuICBjbGF1c2VzLnB1c2goLi4uZXh0cmFDbGF1c2VzKTtcclxuICBpZiAoY2xhdXNlcy5sZW5ndGggPT09IDApIHJldHVybiBzcWw7XHJcbiAgY29uc3Qgd2hlcmVTcWwgPSBjbGF1c2VzLmxlbmd0aCA9PT0gMSA/IGNsYXVzZXNbMF0gOiBjbGF1c2VzLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgQU5EIFwiKTtcclxuICByZXR1cm4gYCR7c3FsfSBXSEVSRSAke3doZXJlU3FsfWA7XHJcbn1cclxudmFyIENvbHVtbkV4cHJlc3Npb24gPSBjbGFzcyB7XHJcbiAgdHlwZSA9IFwiY29sdW1uXCI7XHJcbiAgLy8gVGhpcyBpcyB0aGUgY29sdW1uIGFjY2Vzc29yXHJcbiAgY29sdW1uO1xyXG4gIC8vIFRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gaW4gdGhlIGRhdGFiYXNlLlxyXG4gIGNvbHVtbk5hbWU7XHJcbiAgdGFibGU7XHJcbiAgLy8gcGhhbnRvbTogYWN0dWFsIHJ1bnRpbWUgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAgdHNWYWx1ZVR5cGU7XHJcbiAgc3BhY2V0aW1lVHlwZTtcclxuICBjb25zdHJ1Y3Rvcih0YWJsZTIsIGNvbHVtbiwgc3BhY2V0aW1lVHlwZSwgY29sdW1uTmFtZSkge1xyXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlMjtcclxuICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xyXG4gICAgdGhpcy5jb2x1bW5OYW1lID0gY29sdW1uTmFtZSB8fCBjb2x1bW47XHJcbiAgICB0aGlzLnNwYWNldGltZVR5cGUgPSBzcGFjZXRpbWVUeXBlO1xyXG4gIH1cclxuICBlcSh4KSB7XHJcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcclxuICAgICAgdHlwZTogXCJlcVwiLFxyXG4gICAgICBsZWZ0OiB0aGlzLFxyXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcclxuICAgIH0pO1xyXG4gIH1cclxuICBuZSh4KSB7XHJcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcclxuICAgICAgdHlwZTogXCJuZVwiLFxyXG4gICAgICBsZWZ0OiB0aGlzLFxyXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcclxuICAgIH0pO1xyXG4gIH1cclxuICBsdCh4KSB7XHJcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcclxuICAgICAgdHlwZTogXCJsdFwiLFxyXG4gICAgICBsZWZ0OiB0aGlzLFxyXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcclxuICAgIH0pO1xyXG4gIH1cclxuICBsdGUoeCkge1xyXG4gICAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XHJcbiAgICAgIHR5cGU6IFwibHRlXCIsXHJcbiAgICAgIGxlZnQ6IHRoaXMsXHJcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGd0KHgpIHtcclxuICAgIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xyXG4gICAgICB0eXBlOiBcImd0XCIsXHJcbiAgICAgIGxlZnQ6IHRoaXMsXHJcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGd0ZSh4KSB7XHJcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcclxuICAgICAgdHlwZTogXCJndGVcIixcclxuICAgICAgbGVmdDogdGhpcyxcclxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmZ1bmN0aW9uIGxpdGVyYWwodmFsdWUpIHtcclxuICByZXR1cm4geyB0eXBlOiBcImxpdGVyYWxcIiwgdmFsdWUgfTtcclxufVxyXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWwpIHtcclxuICBpZiAodmFsLnR5cGUgPT09IFwibGl0ZXJhbFwiKVxyXG4gICAgcmV0dXJuIHZhbDtcclxuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiB2YWwgIT0gbnVsbCAmJiBcInR5cGVcIiBpbiB2YWwgJiYgdmFsLnR5cGUgPT09IFwiY29sdW1uXCIpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG4gIHJldHVybiBsaXRlcmFsKHZhbCk7XHJcbn1cclxuZnVuY3Rpb24gbm9ybWFsaXplUHJlZGljYXRlRXhwcih2YWx1ZSkge1xyXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEJvb2xlYW5FeHByKSByZXR1cm4gdmFsdWU7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xyXG4gICAgICB0eXBlOiBcImVxXCIsXHJcbiAgICAgIGxlZnQ6IGxpdGVyYWwodmFsdWUpLFxyXG4gICAgICByaWdodDogbGl0ZXJhbCh0cnVlKVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xyXG4gICAgdHlwZTogXCJlcVwiLFxyXG4gICAgbGVmdDogdmFsdWUsXHJcbiAgICByaWdodDogbGl0ZXJhbCh0cnVlKVxyXG4gIH0pO1xyXG59XHJcbnZhciBCb29sZWFuRXhwciA9IGNsYXNzIF9Cb29sZWFuRXhwciB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICB9XHJcbiAgYW5kKG90aGVyKSB7XHJcbiAgICByZXR1cm4gbmV3IF9Cb29sZWFuRXhwcih7XHJcbiAgICAgIHR5cGU6IFwiYW5kXCIsXHJcbiAgICAgIGNsYXVzZXM6IFt0aGlzLmRhdGEsIG90aGVyLmRhdGFdXHJcbiAgICB9KTtcclxuICB9XHJcbiAgb3Iob3RoZXIpIHtcclxuICAgIHJldHVybiBuZXcgX0Jvb2xlYW5FeHByKHtcclxuICAgICAgdHlwZTogXCJvclwiLFxyXG4gICAgICBjbGF1c2VzOiBbdGhpcy5kYXRhLCBvdGhlci5kYXRhXVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG5vdCgpIHtcclxuICAgIHJldHVybiBuZXcgX0Jvb2xlYW5FeHByKHsgdHlwZTogXCJub3RcIiwgY2xhdXNlOiB0aGlzLmRhdGEgfSk7XHJcbiAgfVxyXG59O1xyXG5mdW5jdGlvbiBub3QoY2xhdXNlKSB7XHJcbiAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7IHR5cGU6IFwibm90XCIsIGNsYXVzZTogY2xhdXNlLmRhdGEgfSk7XHJcbn1cclxuZnVuY3Rpb24gYW5kKGZpcnN0LCBzZWNvbmQsIC4uLnJlc3QpIHtcclxuICBjb25zdCBjbGF1c2VzID0gW2ZpcnN0LCBzZWNvbmQsIC4uLnJlc3RdO1xyXG4gIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xyXG4gICAgdHlwZTogXCJhbmRcIixcclxuICAgIGNsYXVzZXM6IGNsYXVzZXMubWFwKChjKSA9PiBjLmRhdGEpXHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gb3IoZmlyc3QsIHNlY29uZCwgLi4ucmVzdCkge1xyXG4gIGNvbnN0IGNsYXVzZXMgPSBbZmlyc3QsIHNlY29uZCwgLi4ucmVzdF07XHJcbiAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XHJcbiAgICB0eXBlOiBcIm9yXCIsXHJcbiAgICBjbGF1c2VzOiBjbGF1c2VzLm1hcCgoYykgPT4gYy5kYXRhKVxyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGJvb2xlYW5FeHByVG9TcWwoZXhwciwgdGFibGVBbGlhcykge1xyXG4gIGNvbnN0IGRhdGEgPSBleHByIGluc3RhbmNlb2YgQm9vbGVhbkV4cHIgPyBleHByLmRhdGEgOiBleHByO1xyXG4gIHN3aXRjaCAoZGF0YS50eXBlKSB7XHJcbiAgICBjYXNlIFwiZXFcIjpcclxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGRhdGEubGVmdCl9ID0gJHt2YWx1ZUV4cHJUb1NxbChkYXRhLnJpZ2h0KX1gO1xyXG4gICAgY2FzZSBcIm5lXCI6XHJcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChkYXRhLmxlZnQpfSA8PiAke3ZhbHVlRXhwclRvU3FsKGRhdGEucmlnaHQpfWA7XHJcbiAgICBjYXNlIFwiZ3RcIjpcclxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGRhdGEubGVmdCl9ID4gJHt2YWx1ZUV4cHJUb1NxbChkYXRhLnJpZ2h0KX1gO1xyXG4gICAgY2FzZSBcImd0ZVwiOlxyXG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZGF0YS5sZWZ0KX0gPj0gJHt2YWx1ZUV4cHJUb1NxbChkYXRhLnJpZ2h0KX1gO1xyXG4gICAgY2FzZSBcImx0XCI6XHJcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChkYXRhLmxlZnQpfSA8ICR7dmFsdWVFeHByVG9TcWwoZGF0YS5yaWdodCl9YDtcclxuICAgIGNhc2UgXCJsdGVcIjpcclxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGRhdGEubGVmdCl9IDw9ICR7dmFsdWVFeHByVG9TcWwoZGF0YS5yaWdodCl9YDtcclxuICAgIGNhc2UgXCJhbmRcIjpcclxuICAgICAgcmV0dXJuIGRhdGEuY2xhdXNlcy5tYXAoKGMpID0+IGJvb2xlYW5FeHByVG9TcWwoYykpLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgQU5EIFwiKTtcclxuICAgIGNhc2UgXCJvclwiOlxyXG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLm1hcCgoYykgPT4gYm9vbGVhbkV4cHJUb1NxbChjKSkubWFwKHdyYXBJblBhcmVucykuam9pbihcIiBPUiBcIik7XHJcbiAgICBjYXNlIFwibm90XCI6XHJcbiAgICAgIHJldHVybiBgTk9UICR7d3JhcEluUGFyZW5zKGJvb2xlYW5FeHByVG9TcWwoZGF0YS5jbGF1c2UpKX1gO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiB3cmFwSW5QYXJlbnMoc3FsKSB7XHJcbiAgcmV0dXJuIGAoJHtzcWx9KWA7XHJcbn1cclxuZnVuY3Rpb24gdmFsdWVFeHByVG9TcWwoZXhwciwgdGFibGVBbGlhcykge1xyXG4gIGlmIChpc0xpdGVyYWxFeHByKGV4cHIpKSB7XHJcbiAgICByZXR1cm4gbGl0ZXJhbFZhbHVlVG9TcWwoZXhwci52YWx1ZSk7XHJcbiAgfVxyXG4gIGNvbnN0IHRhYmxlMiA9IGV4cHIudGFibGU7XHJcbiAgcmV0dXJuIGAke3F1b3RlSWRlbnRpZmllcih0YWJsZTIpfS4ke3F1b3RlSWRlbnRpZmllcihleHByLmNvbHVtbk5hbWUpfWA7XHJcbn1cclxuZnVuY3Rpb24gbGl0ZXJhbFZhbHVlVG9TcWwodmFsdWUpIHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCkge1xyXG4gICAgcmV0dXJuIFwiTlVMTFwiO1xyXG4gIH1cclxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJZGVudGl0eSB8fCB2YWx1ZSBpbnN0YW5jZW9mIENvbm5lY3Rpb25JZCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFV1aWQpIHtcclxuICAgIHJldHVybiBgMHgke3ZhbHVlLnRvSGV4U3RyaW5nKCl9YDtcclxuICB9XHJcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGltZXN0YW1wKSB7XHJcbiAgICByZXR1cm4gYCcke3ZhbHVlLnRvSVNPU3RyaW5nKCl9J2A7XHJcbiAgfVxyXG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICBjYXNlIFwibnVtYmVyXCI6XHJcbiAgICBjYXNlIFwiYmlnaW50XCI6XHJcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xyXG4gICAgY2FzZSBcImJvb2xlYW5cIjpcclxuICAgICAgcmV0dXJuIHZhbHVlID8gXCJUUlVFXCIgOiBcIkZBTFNFXCI7XHJcbiAgICBjYXNlIFwic3RyaW5nXCI6XHJcbiAgICAgIHJldHVybiBgJyR7dmFsdWUucmVwbGFjZSgvJy9nLCBcIicnXCIpfSdgO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIGAnJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvJy9nLCBcIicnXCIpfSdgO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBxdW90ZUlkZW50aWZpZXIobmFtZSkge1xyXG4gIHJldHVybiBuYW1lLnNwbGl0KFwiLlwiKS5tYXAoKHBhcnQpID0+IGBcIiR7cGFydC5yZXBsYWNlKC9cIi9nLCAnXCJcIicpfVwiYCkuam9pbihcIi5cIik7XHJcbn1cclxuZnVuY3Rpb24gaXNMaXRlcmFsRXhwcihleHByKSB7XHJcbiAgcmV0dXJuIGV4cHIudHlwZSA9PT0gXCJsaXRlcmFsXCI7XHJcbn1cclxuZnVuY3Rpb24gZXZhbHVhdGVCb29sZWFuRXhwcihleHByLCByb3cpIHtcclxuICByZXR1cm4gZXZhbHVhdGVEYXRhKGV4cHIuZGF0YSwgcm93KTtcclxufVxyXG5mdW5jdGlvbiBldmFsdWF0ZURhdGEoZGF0YSwgcm93KSB7XHJcbiAgc3dpdGNoIChkYXRhLnR5cGUpIHtcclxuICAgIGNhc2UgXCJlcVwiOlxyXG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSA9PT0gcmVzb2x2ZVZhbHVlKGRhdGEucmlnaHQsIHJvdyk7XHJcbiAgICBjYXNlIFwibmVcIjpcclxuICAgICAgcmV0dXJuIHJlc29sdmVWYWx1ZShkYXRhLmxlZnQsIHJvdykgIT09IHJlc29sdmVWYWx1ZShkYXRhLnJpZ2h0LCByb3cpO1xyXG4gICAgY2FzZSBcImd0XCI6XHJcbiAgICAgIHJldHVybiByZXNvbHZlVmFsdWUoZGF0YS5sZWZ0LCByb3cpID4gcmVzb2x2ZVZhbHVlKGRhdGEucmlnaHQsIHJvdyk7XHJcbiAgICBjYXNlIFwiZ3RlXCI6XHJcbiAgICAgIHJldHVybiByZXNvbHZlVmFsdWUoZGF0YS5sZWZ0LCByb3cpID49IHJlc29sdmVWYWx1ZShkYXRhLnJpZ2h0LCByb3cpO1xyXG4gICAgY2FzZSBcImx0XCI6XHJcbiAgICAgIHJldHVybiByZXNvbHZlVmFsdWUoZGF0YS5sZWZ0LCByb3cpIDwgcmVzb2x2ZVZhbHVlKGRhdGEucmlnaHQsIHJvdyk7XHJcbiAgICBjYXNlIFwibHRlXCI6XHJcbiAgICAgIHJldHVybiByZXNvbHZlVmFsdWUoZGF0YS5sZWZ0LCByb3cpIDw9IHJlc29sdmVWYWx1ZShkYXRhLnJpZ2h0LCByb3cpO1xyXG4gICAgY2FzZSBcImFuZFwiOlxyXG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLmV2ZXJ5KChjKSA9PiBldmFsdWF0ZURhdGEoYywgcm93KSk7XHJcbiAgICBjYXNlIFwib3JcIjpcclxuICAgICAgcmV0dXJuIGRhdGEuY2xhdXNlcy5zb21lKChjKSA9PiBldmFsdWF0ZURhdGEoYywgcm93KSk7XHJcbiAgICBjYXNlIFwibm90XCI6XHJcbiAgICAgIHJldHVybiAhZXZhbHVhdGVEYXRhKGRhdGEuY2xhdXNlLCByb3cpO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiByZXNvbHZlVmFsdWUoZXhwciwgcm93KSB7XHJcbiAgaWYgKGlzTGl0ZXJhbEV4cHIoZXhwcikpIHtcclxuICAgIHJldHVybiB0b0NvbXBhcmFibGVWYWx1ZShleHByLnZhbHVlKTtcclxuICB9XHJcbiAgcmV0dXJuIHRvQ29tcGFyYWJsZVZhbHVlKHJvd1tleHByLmNvbHVtbl0pO1xyXG59XHJcbmZ1bmN0aW9uIGlzSGV4U2VyaWFsaXphYmxlTGlrZSh2YWx1ZSkge1xyXG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUudG9IZXhTdHJpbmcgPT09IFwiZnVuY3Rpb25cIjtcclxufVxyXG5mdW5jdGlvbiBpc1RpbWVzdGFtcExpa2UodmFsdWUpIHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRpbWVzdGFtcCkgcmV0dXJuIHRydWU7XHJcbiAgY29uc3QgbWljcm9zID0gdmFsdWVbXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCJdO1xyXG4gIHJldHVybiB0eXBlb2YgbWljcm9zID09PSBcImJpZ2ludFwiO1xyXG59XHJcbmZ1bmN0aW9uIHRvQ29tcGFyYWJsZVZhbHVlKHZhbHVlKSB7XHJcbiAgaWYgKGlzSGV4U2VyaWFsaXphYmxlTGlrZSh2YWx1ZSkpIHtcclxuICAgIHJldHVybiB2YWx1ZS50b0hleFN0cmluZygpO1xyXG4gIH1cclxuICBpZiAoaXNUaW1lc3RhbXBMaWtlKHZhbHVlKSkge1xyXG4gICAgcmV0dXJuIHZhbHVlLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XHJcbiAgfVxyXG4gIHJldHVybiB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBnZXRRdWVyeVRhYmxlTmFtZShxdWVyeSkge1xyXG4gIGlmIChxdWVyeS50YWJsZSkgcmV0dXJuIHF1ZXJ5LnRhYmxlLm5hbWU7XHJcbiAgaWYgKHF1ZXJ5Lm5hbWUpIHJldHVybiBxdWVyeS5uYW1lO1xyXG4gIGlmIChxdWVyeS5zb3VyY2VRdWVyeSkgcmV0dXJuIHF1ZXJ5LnNvdXJjZVF1ZXJ5LnRhYmxlLm5hbWU7XHJcbiAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGV4dHJhY3QgdGFibGUgbmFtZSBmcm9tIHF1ZXJ5XCIpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFF1ZXJ5QWNjZXNzb3JOYW1lKHF1ZXJ5KSB7XHJcbiAgaWYgKHF1ZXJ5LnRhYmxlKSByZXR1cm4gcXVlcnkudGFibGUuYWNjZXNzb3JOYW1lO1xyXG4gIGlmIChxdWVyeS5hY2Nlc3Nvck5hbWUpIHJldHVybiBxdWVyeS5hY2Nlc3Nvck5hbWU7XHJcbiAgaWYgKHF1ZXJ5LnNvdXJjZVF1ZXJ5KSByZXR1cm4gcXVlcnkuc291cmNlUXVlcnkudGFibGUuYWNjZXNzb3JOYW1lO1xyXG4gIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBleHRyYWN0IGFjY2Vzc29yIG5hbWUgZnJvbSBxdWVyeVwiKTtcclxufVxyXG5mdW5jdGlvbiBnZXRRdWVyeVdoZXJlQ2xhdXNlKHF1ZXJ5KSB7XHJcbiAgaWYgKHF1ZXJ5LndoZXJlQ2xhdXNlKSByZXR1cm4gcXVlcnkud2hlcmVDbGF1c2U7XHJcbiAgcmV0dXJuIHZvaWQgMDtcclxufVxyXG5cclxuLy8gc3JjL3NlcnZlci92aWV3cy50c1xyXG5mdW5jdGlvbiBtYWtlVmlld0V4cG9ydChjdHgsIG9wdHMsIHBhcmFtcywgcmV0LCBmbikge1xyXG4gIGNvbnN0IHZpZXdFeHBvcnQgPSAoXHJcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHR5cGVzY3JpcHQgaW5jb3JyZWN0bHkgc2F5cyBGdW5jdGlvbiNiaW5kIHJlcXVpcmVzIGFuIGFyZ3VtZW50LlxyXG4gICAgZm4uYmluZCgpXHJcbiAgKTtcclxuICB2aWV3RXhwb3J0W2V4cG9ydENvbnRleHRdID0gY3R4O1xyXG4gIHZpZXdFeHBvcnRbcmVnaXN0ZXJFeHBvcnRdID0gKGN0eDIsIGV4cG9ydE5hbWUpID0+IHtcclxuICAgIHJlZ2lzdGVyVmlldyhjdHgyLCBvcHRzLCBleHBvcnROYW1lLCBwYXJhbXMsIHJldCwgZm4pO1xyXG4gIH07XHJcbiAgcmV0dXJuIHZpZXdFeHBvcnQ7XHJcbn1cclxuZnVuY3Rpb24gbWFrZUFub25WaWV3RXhwb3J0KGN0eCwgb3B0cywgcGFyYW1zLCByZXQsIGZuKSB7XHJcbiAgY29uc3Qgdmlld0V4cG9ydCA9IChcclxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdHlwZXNjcmlwdCBpbmNvcnJlY3RseSBzYXlzIEZ1bmN0aW9uI2JpbmQgcmVxdWlyZXMgYW4gYXJndW1lbnQuXHJcbiAgICBmbi5iaW5kKClcclxuICApO1xyXG4gIHZpZXdFeHBvcnRbZXhwb3J0Q29udGV4dF0gPSBjdHg7XHJcbiAgdmlld0V4cG9ydFtyZWdpc3RlckV4cG9ydF0gPSAoY3R4MiwgZXhwb3J0TmFtZSkgPT4ge1xyXG4gICAgcmVnaXN0ZXJBbm9ueW1vdXNWaWV3KGN0eDIsIG9wdHMsIGV4cG9ydE5hbWUsIHBhcmFtcywgcmV0LCBmbik7XHJcbiAgfTtcclxuICByZXR1cm4gdmlld0V4cG9ydDtcclxufVxyXG5mdW5jdGlvbiByZWdpc3RlclZpZXcoY3R4LCBvcHRzLCBleHBvcnROYW1lLCBwYXJhbXMsIHJldCwgZm4pIHtcclxuICBjb25zdCBkZXNjcmliZWQgPSBkZXNjcmliZVZpZXcoY3R4LCBvcHRzLCBleHBvcnROYW1lLCBmYWxzZSwgcGFyYW1zLCByZXQpO1xyXG4gIGN0eC52aWV3cy5wdXNoKGJ1aWxkVmlld0luZm8oY3R4LCBkZXNjcmliZWQsIGZuKSk7XHJcbn1cclxuZnVuY3Rpb24gcmVnaXN0ZXJBbm9ueW1vdXNWaWV3KGN0eCwgb3B0cywgZXhwb3J0TmFtZSwgcGFyYW1zLCByZXQsIGZuKSB7XHJcbiAgY29uc3QgZGVzY3JpYmVkID0gZGVzY3JpYmVWaWV3KGN0eCwgb3B0cywgZXhwb3J0TmFtZSwgdHJ1ZSwgcGFyYW1zLCByZXQpO1xyXG4gIGN0eC5hbm9uVmlld3MucHVzaChidWlsZFZpZXdJbmZvKGN0eCwgZGVzY3JpYmVkLCBmbikpO1xyXG59XHJcbmZ1bmN0aW9uIGRlc2NyaWJlVmlldyhjdHgsIG9wdHMsIGV4cG9ydE5hbWUsIGFub24sIHBhcmFtcywgcmV0KSB7XHJcbiAgY3R4LmRlZmluZUZ1bmN0aW9uKGV4cG9ydE5hbWUpO1xyXG4gIGNvbnN0IHBhcmFtc0J1aWxkZXIgPSBuZXcgUm93QnVpbGRlcihwYXJhbXMsIHRvUGFzY2FsQ2FzZShleHBvcnROYW1lKSk7XHJcbiAgbGV0IHJldHVyblR5cGUgPSBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJldCkuYWxnZWJyYWljVHlwZTtcclxuICBjb25zdCB7IHZhbHVlOiBwYXJhbVR5cGUgfSA9IGN0eC5yZXNvbHZlVHlwZShcclxuICAgIGN0eC5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkocGFyYW1zQnVpbGRlcilcclxuICApO1xyXG4gIGN0eC5tb2R1bGVEZWYudmlld3MucHVzaCh7XHJcbiAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxyXG4gICAgaW5kZXg6IChhbm9uID8gY3R4LmFub25WaWV3cyA6IGN0eC52aWV3cykubGVuZ3RoLFxyXG4gICAgaXNQdWJsaWM6IG9wdHMucHVibGljLFxyXG4gICAgaXNBbm9ueW1vdXM6IGFub24sXHJcbiAgICBwYXJhbXM6IHBhcmFtVHlwZSxcclxuICAgIHJldHVyblR5cGVcclxuICB9KTtcclxuICBjb25zdCBwcmltYXJ5S2V5Q29sdW1ucyA9IHZpZXdQcmltYXJ5S2V5Q29sdW1ucyhyZXQpO1xyXG4gIGlmIChwcmltYXJ5S2V5Q29sdW1ucy5sZW5ndGggPiAxKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICBgVmlldyAnJHtleHBvcnROYW1lfScgY2FuIGhhdmUgYXQgbW9zdCBvbmUgcHJpbWFyeUtleSgpIGNvbHVtbiBvbiBpdHMgcmV0dXJuZWQgcm93IHR5cGU7IGZvdW5kICR7cHJpbWFyeUtleUNvbHVtbnMuam9pbihcIiwgXCIpfWBcclxuICAgICk7XHJcbiAgfVxyXG4gIGlmIChwcmltYXJ5S2V5Q29sdW1ucy5sZW5ndGggPT09IDEgJiYgcGFyYW1UeXBlLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgY3R4Lm1vZHVsZURlZi52aWV3UHJpbWFyeUtleXMucHVzaCh7XHJcbiAgICAgIHZpZXdTb3VyY2VOYW1lOiBleHBvcnROYW1lLFxyXG4gICAgICBjb2x1bW5zOiBwcmltYXJ5S2V5Q29sdW1uc1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGlmIChvcHRzLm5hbWUgIT0gbnVsbCkge1xyXG4gICAgY3R4Lm1vZHVsZURlZi5leHBsaWNpdE5hbWVzLmVudHJpZXMucHVzaCh7XHJcbiAgICAgIHRhZzogXCJGdW5jdGlvblwiLFxyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIHNvdXJjZU5hbWU6IGV4cG9ydE5hbWUsXHJcbiAgICAgICAgY2Fub25pY2FsTmFtZTogb3B0cy5uYW1lXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBjb25zdCB3cmFwT3B0aW9uID0gcmV0dXJuVHlwZS50YWcgPT0gXCJTdW1cIjtcclxuICBpZiAocmV0dXJuVHlwZS50YWcgPT0gXCJTdW1cIikge1xyXG4gICAgcmV0dXJuVHlwZSA9IEFsZ2VicmFpY1R5cGUuQXJyYXkoXHJcbiAgICAgIHJldHVyblR5cGUudmFsdWUudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHsgcGFyYW1UeXBlLCByZXR1cm5UeXBlLCB3cmFwT3B0aW9uIH07XHJcbn1cclxuZnVuY3Rpb24gYnVpbGRWaWV3SW5mbyhjdHgsIHsgcGFyYW1UeXBlLCByZXR1cm5UeXBlLCB3cmFwT3B0aW9uIH0sIGZuKSB7XHJcbiAgY29uc3QgeyB0eXBlc3BhY2UgfSA9IGN0eDtcclxuICByZXR1cm4ge1xyXG4gICAgZm46IHdyYXBPcHRpb24gPyAoKHZpZXdDdHgsIGFyZ3MpID0+IHtcclxuICAgICAgY29uc3QgcmV0ID0gZm4odmlld0N0eCwgYXJncyk7XHJcbiAgICAgIHJldHVybiByZXQgPT0gbnVsbCA/IFtdIDogW3JldF07XHJcbiAgICB9KSA6IGZuLFxyXG4gICAgZGVzZXJpYWxpemVQYXJhbXM6IFByb2R1Y3RUeXBlLm1ha2VEZXNlcmlhbGl6ZXIocGFyYW1UeXBlLCB0eXBlc3BhY2UpLFxyXG4gICAgc2VyaWFsaXplUmV0dXJuOiBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKHJldHVyblR5cGUsIHR5cGVzcGFjZSksXHJcbiAgICByZXR1cm5UeXBlQmFzZVNpemU6IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCByZXR1cm5UeXBlKVxyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdmlld1ByaW1hcnlLZXlDb2x1bW5zKHJldCkge1xyXG4gIGNvbnN0IHJvdyA9IHZpZXdSZXR1cm5Sb3cocmV0KTtcclxuICBpZiAocm93ID09IG51bGwpIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHJvdy5yb3cpLmZpbHRlcihcclxuICAgIChlbnRyeSkgPT4gZW50cnlbMV0uY29sdW1uTWV0YWRhdGEuaXNQcmltYXJ5S2V5ID09PSB0cnVlXHJcbiAgKS5tYXAoKFtuYW1lXSkgPT4gbmFtZSk7XHJcbn1cclxuZnVuY3Rpb24gdmlld1JldHVyblJvdyhyZXQpIHtcclxuICBpZiAocmV0IGluc3RhbmNlb2YgQXJyYXlCdWlsZGVyICYmIHJldC5lbGVtZW50IGluc3RhbmNlb2YgUm93QnVpbGRlcikge1xyXG4gICAgcmV0dXJuIHJldC5lbGVtZW50O1xyXG4gIH1cclxuICBpZiAocmV0IGluc3RhbmNlb2YgT3B0aW9uQnVpbGRlciAmJiByZXQudmFsdWUgaW5zdGFuY2VvZiBSb3dCdWlsZGVyKSB7XHJcbiAgICByZXR1cm4gcmV0LnZhbHVlO1xyXG4gIH1cclxuICByZXR1cm4gdm9pZCAwO1xyXG59XHJcblxyXG4vLyBzcmMvbGliL2Vycm9ycy50c1xyXG52YXIgU2VuZGVyRXJyb3IgPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICBzdXBlcihtZXNzYWdlKTtcclxuICB9XHJcbiAgZ2V0IG5hbWUoKSB7XHJcbiAgICByZXR1cm4gXCJTZW5kZXJFcnJvclwiO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIHNyYy9zZXJ2ZXIvZXJyb3JzLnRzXHJcbnZhciBTcGFjZXRpbWVIb3N0RXJyb3IgPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICBzdXBlcihtZXNzYWdlKTtcclxuICB9XHJcbiAgZ2V0IG5hbWUoKSB7XHJcbiAgICByZXR1cm4gXCJTcGFjZXRpbWVIb3N0RXJyb3JcIjtcclxuICB9XHJcbn07XHJcbnZhciBlcnJvckRhdGEgPSB7XHJcbiAgLyoqXHJcbiAgICogQSBnZW5lcmljIGVycm9yIGNsYXNzIGZvciB1bmtub3duIGVycm9yIGNvZGVzLlxyXG4gICAqL1xyXG4gIEhvc3RDYWxsRmFpbHVyZTogMSxcclxuICAvKipcclxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYW4gQUJJIGNhbGwgd2FzIG1hZGUgb3V0c2lkZSBvZiBhIHRyYW5zYWN0aW9uLlxyXG4gICAqL1xyXG4gIE5vdEluVHJhbnNhY3Rpb246IDIsXHJcbiAgLyoqXHJcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IEJTQVROIGRlY29kaW5nIGZhaWxlZC5cclxuICAgKiBUaGlzIHR5cGljYWxseSBtZWFucyB0aGF0IHRoZSBkYXRhIGNvdWxkIG5vdCBiZSBkZWNvZGVkIHRvIHRoZSBleHBlY3RlZCB0eXBlLlxyXG4gICAqL1xyXG4gIEJzYXRuRGVjb2RlRXJyb3I6IDMsXHJcbiAgLyoqXHJcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIHRhYmxlIGRvZXMgbm90IGV4aXN0LlxyXG4gICAqL1xyXG4gIE5vU3VjaFRhYmxlOiA0LFxyXG4gIC8qKlxyXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhIHNwZWNpZmllZCBpbmRleCBkb2VzIG5vdCBleGlzdC5cclxuICAgKi9cclxuICBOb1N1Y2hJbmRleDogNSxcclxuICAvKipcclxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgcm93IGl0ZXJhdG9yIGlzIG5vdCB2YWxpZC5cclxuICAgKi9cclxuICBOb1N1Y2hJdGVyOiA2LFxyXG4gIC8qKlxyXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhIHNwZWNpZmllZCBjb25zb2xlIHRpbWVyIGRvZXMgbm90IGV4aXN0LlxyXG4gICAqL1xyXG4gIE5vU3VjaENvbnNvbGVUaW1lcjogNyxcclxuICAvKipcclxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgYnl0ZXMgc291cmNlIG9yIHNpbmsgaXMgbm90IHZhbGlkLlxyXG4gICAqL1xyXG4gIE5vU3VjaEJ5dGVzOiA4LFxyXG4gIC8qKlxyXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhIHByb3ZpZGVkIHNpbmsgaGFzIG5vIG1vcmUgc3BhY2UgbGVmdC5cclxuICAgKi9cclxuICBOb1NwYWNlOiA5LFxyXG4gIC8qKlxyXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCB0aGVyZSBpcyBubyBtb3JlIHNwYWNlIGluIHRoZSBkYXRhYmFzZS5cclxuICAgKi9cclxuICBCdWZmZXJUb29TbWFsbDogMTEsXHJcbiAgLyoqXHJcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgdmFsdWUgd2l0aCBhIGdpdmVuIHVuaXF1ZSBpZGVudGlmaWVyIGFscmVhZHkgZXhpc3RzLlxyXG4gICAqL1xyXG4gIFVuaXF1ZUFscmVhZHlFeGlzdHM6IDEyLFxyXG4gIC8qKlxyXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCB0aGUgc3BlY2lmaWVkIGRlbGF5IGluIHNjaGVkdWxpbmcgYSByb3cgd2FzIHRvbyBsb25nLlxyXG4gICAqL1xyXG4gIFNjaGVkdWxlQXREZWxheVRvb0xvbmc6IDEzLFxyXG4gIC8qKlxyXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhbiBpbmRleCB3YXMgbm90IHVuaXF1ZSB3aGVuIGl0IHdhcyBleHBlY3RlZCB0byBiZS5cclxuICAgKi9cclxuICBJbmRleE5vdFVuaXF1ZTogMTQsXHJcbiAgLyoqXHJcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGluZGV4IHdhcyBub3QgdW5pcXVlIHdoZW4gaXQgd2FzIGV4cGVjdGVkIHRvIGJlLlxyXG4gICAqL1xyXG4gIE5vU3VjaFJvdzogMTUsXHJcbiAgLyoqXHJcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGF1dG8taW5jcmVtZW50IHNlcXVlbmNlIGhhcyBvdmVyZmxvd2VkLlxyXG4gICAqL1xyXG4gIEF1dG9JbmNPdmVyZmxvdzogMTYsXHJcbiAgV291bGRCbG9ja1RyYW5zYWN0aW9uOiAxNyxcclxuICBUcmFuc2FjdGlvbk5vdEFub255bW91czogMTgsXHJcbiAgVHJhbnNhY3Rpb25Jc1JlYWRPbmx5OiAxOSxcclxuICBUcmFuc2FjdGlvbklzTXV0OiAyMCxcclxuICBIdHRwRXJyb3I6IDIxXHJcbn07XHJcbmZ1bmN0aW9uIG1hcEVudHJpZXMoeCwgZikge1xyXG4gIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICBPYmplY3QuZW50cmllcyh4KS5tYXAoKFtrLCB2XSkgPT4gW2ssIGYoaywgdildKVxyXG4gICk7XHJcbn1cclxudmFyIGVycm5vVG9DbGFzcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XHJcbnZhciBlcnJvcnMgPSBPYmplY3QuZnJlZXplKFxyXG4gIG1hcEVudHJpZXMoZXJyb3JEYXRhLCAobmFtZSwgY29kZSkgPT4ge1xyXG4gICAgY29uc3QgY2xzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KFxyXG4gICAgICBjbGFzcyBleHRlbmRzIFNwYWNldGltZUhvc3RFcnJvciB7XHJcbiAgICAgICAgZ2V0IG5hbWUoKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwibmFtZVwiLFxyXG4gICAgICB7IHZhbHVlOiBuYW1lLCB3cml0YWJsZTogZmFsc2UgfVxyXG4gICAgKTtcclxuICAgIGVycm5vVG9DbGFzcy5zZXQoY29kZSwgY2xzKTtcclxuICAgIHJldHVybiBjbHM7XHJcbiAgfSlcclxuKTtcclxuZnVuY3Rpb24gZ2V0RXJyb3JDb25zdHJ1Y3Rvcihjb2RlKSB7XHJcbiAgcmV0dXJuIGVycm5vVG9DbGFzcy5nZXQoY29kZSkgPz8gU3BhY2V0aW1lSG9zdEVycm9yO1xyXG59XHJcblxyXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9kaXN0cmlidXRpb24vVW5zYWZlVW5pZm9ybUJpZ0ludERpc3RyaWJ1dGlvbi5qc1xyXG52YXIgU0JpZ0ludCA9IHR5cGVvZiBCaWdJbnQgIT09IFwidW5kZWZpbmVkXCIgPyBCaWdJbnQgOiB2b2lkIDA7XHJcbnZhciBPbmUgPSB0eXBlb2YgQmlnSW50ICE9PSBcInVuZGVmaW5lZFwiID8gQmlnSW50KDEpIDogdm9pZCAwO1xyXG52YXIgVGhpcnR5VHdvID0gdHlwZW9mIEJpZ0ludCAhPT0gXCJ1bmRlZmluZWRcIiA/IEJpZ0ludCgzMikgOiB2b2lkIDA7XHJcbnZhciBOdW1WYWx1ZXMgPSB0eXBlb2YgQmlnSW50ICE9PSBcInVuZGVmaW5lZFwiID8gQmlnSW50KDQyOTQ5NjcyOTYpIDogdm9pZCAwO1xyXG5mdW5jdGlvbiB1bnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uKGZyb20sIHRvLCBybmcpIHtcclxuICB2YXIgZGlmZiA9IHRvIC0gZnJvbSArIE9uZTtcclxuICB2YXIgRmluYWxOdW1WYWx1ZXMgPSBOdW1WYWx1ZXM7XHJcbiAgdmFyIE51bUl0ZXJhdGlvbnMgPSAxO1xyXG4gIHdoaWxlIChGaW5hbE51bVZhbHVlcyA8IGRpZmYpIHtcclxuICAgIEZpbmFsTnVtVmFsdWVzIDw8PSBUaGlydHlUd287XHJcbiAgICArK051bUl0ZXJhdGlvbnM7XHJcbiAgfVxyXG4gIHZhciB2YWx1ZSA9IGdlbmVyYXRlTmV4dChOdW1JdGVyYXRpb25zLCBybmcpO1xyXG4gIGlmICh2YWx1ZSA8IGRpZmYpIHtcclxuICAgIHJldHVybiB2YWx1ZSArIGZyb207XHJcbiAgfVxyXG4gIGlmICh2YWx1ZSArIGRpZmYgPCBGaW5hbE51bVZhbHVlcykge1xyXG4gICAgcmV0dXJuIHZhbHVlICUgZGlmZiArIGZyb207XHJcbiAgfVxyXG4gIHZhciBNYXhBY2NlcHRlZFJhbmRvbSA9IEZpbmFsTnVtVmFsdWVzIC0gRmluYWxOdW1WYWx1ZXMgJSBkaWZmO1xyXG4gIHdoaWxlICh2YWx1ZSA+PSBNYXhBY2NlcHRlZFJhbmRvbSkge1xyXG4gICAgdmFsdWUgPSBnZW5lcmF0ZU5leHQoTnVtSXRlcmF0aW9ucywgcm5nKTtcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlICUgZGlmZiArIGZyb207XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVOZXh0KE51bUl0ZXJhdGlvbnMsIHJuZykge1xyXG4gIHZhciB2YWx1ZSA9IFNCaWdJbnQocm5nLnVuc2FmZU5leHQoKSArIDIxNDc0ODM2NDgpO1xyXG4gIGZvciAodmFyIG51bSA9IDE7IG51bSA8IE51bUl0ZXJhdGlvbnM7ICsrbnVtKSB7XHJcbiAgICB2YXIgb3V0ID0gcm5nLnVuc2FmZU5leHQoKTtcclxuICAgIHZhbHVlID0gKHZhbHVlIDw8IFRoaXJ0eVR3bykgKyBTQmlnSW50KG91dCArIDIxNDc0ODM2NDgpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdXJlLXJhbmRANy4wLjEvbm9kZV9tb2R1bGVzL3B1cmUtcmFuZC9saWIvZXNtL2Rpc3RyaWJ1dGlvbi9pbnRlcm5hbHMvVW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbkludGVybmFsLmpzXHJcbmZ1bmN0aW9uIHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbChyYW5nZVNpemUsIHJuZykge1xyXG4gIHZhciBNYXhBbGxvd2VkID0gcmFuZ2VTaXplID4gMiA/IH5+KDQyOTQ5NjcyOTYgLyByYW5nZVNpemUpICogcmFuZ2VTaXplIDogNDI5NDk2NzI5NjtcclxuICB2YXIgZGVsdGFWID0gcm5nLnVuc2FmZU5leHQoKSArIDIxNDc0ODM2NDg7XHJcbiAgd2hpbGUgKGRlbHRhViA+PSBNYXhBbGxvd2VkKSB7XHJcbiAgICBkZWx0YVYgPSBybmcudW5zYWZlTmV4dCgpICsgMjE0NzQ4MzY0ODtcclxuICB9XHJcbiAgcmV0dXJuIGRlbHRhViAlIHJhbmdlU2l6ZTtcclxufVxyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZGlzdHJpYnV0aW9uL2ludGVybmFscy9BcnJheUludDY0LmpzXHJcbmZ1bmN0aW9uIGZyb21OdW1iZXJUb0FycmF5SW50NjQob3V0LCBuKSB7XHJcbiAgaWYgKG4gPCAwKSB7XHJcbiAgICB2YXIgcG9zTiA9IC1uO1xyXG4gICAgb3V0LnNpZ24gPSAtMTtcclxuICAgIG91dC5kYXRhWzBdID0gfn4ocG9zTiAvIDQyOTQ5NjcyOTYpO1xyXG4gICAgb3V0LmRhdGFbMV0gPSBwb3NOID4+PiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBvdXQuc2lnbiA9IDE7XHJcbiAgICBvdXQuZGF0YVswXSA9IH5+KG4gLyA0Mjk0OTY3Mjk2KTtcclxuICAgIG91dC5kYXRhWzFdID0gbiA+Pj4gMDtcclxuICB9XHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5mdW5jdGlvbiBzdWJzdHJhY3RBcnJheUludDY0KG91dCwgYXJyYXlJbnRBLCBhcnJheUludEIpIHtcclxuICB2YXIgbG93QSA9IGFycmF5SW50QS5kYXRhWzFdO1xyXG4gIHZhciBoaWdoQSA9IGFycmF5SW50QS5kYXRhWzBdO1xyXG4gIHZhciBzaWduQSA9IGFycmF5SW50QS5zaWduO1xyXG4gIHZhciBsb3dCID0gYXJyYXlJbnRCLmRhdGFbMV07XHJcbiAgdmFyIGhpZ2hCID0gYXJyYXlJbnRCLmRhdGFbMF07XHJcbiAgdmFyIHNpZ25CID0gYXJyYXlJbnRCLnNpZ247XHJcbiAgb3V0LnNpZ24gPSAxO1xyXG4gIGlmIChzaWduQSA9PT0gMSAmJiBzaWduQiA9PT0gLTEpIHtcclxuICAgIHZhciBsb3dfMSA9IGxvd0EgKyBsb3dCO1xyXG4gICAgdmFyIGhpZ2ggPSBoaWdoQSArIGhpZ2hCICsgKGxvd18xID4gNDI5NDk2NzI5NSA/IDEgOiAwKTtcclxuICAgIG91dC5kYXRhWzBdID0gaGlnaCA+Pj4gMDtcclxuICAgIG91dC5kYXRhWzFdID0gbG93XzEgPj4+IDA7XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuICB2YXIgbG93Rmlyc3QgPSBsb3dBO1xyXG4gIHZhciBoaWdoRmlyc3QgPSBoaWdoQTtcclxuICB2YXIgbG93U2Vjb25kID0gbG93QjtcclxuICB2YXIgaGlnaFNlY29uZCA9IGhpZ2hCO1xyXG4gIGlmIChzaWduQSA9PT0gLTEpIHtcclxuICAgIGxvd0ZpcnN0ID0gbG93QjtcclxuICAgIGhpZ2hGaXJzdCA9IGhpZ2hCO1xyXG4gICAgbG93U2Vjb25kID0gbG93QTtcclxuICAgIGhpZ2hTZWNvbmQgPSBoaWdoQTtcclxuICB9XHJcbiAgdmFyIHJlbWluZGVyTG93ID0gMDtcclxuICB2YXIgbG93ID0gbG93Rmlyc3QgLSBsb3dTZWNvbmQ7XHJcbiAgaWYgKGxvdyA8IDApIHtcclxuICAgIHJlbWluZGVyTG93ID0gMTtcclxuICAgIGxvdyA9IGxvdyA+Pj4gMDtcclxuICB9XHJcbiAgb3V0LmRhdGFbMF0gPSBoaWdoRmlyc3QgLSBoaWdoU2Vjb25kIC0gcmVtaW5kZXJMb3c7XHJcbiAgb3V0LmRhdGFbMV0gPSBsb3c7XHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZGlzdHJpYnV0aW9uL2ludGVybmFscy9VbnNhZmVVbmlmb3JtQXJyYXlJbnREaXN0cmlidXRpb25JbnRlcm5hbC5qc1xyXG5mdW5jdGlvbiB1bnNhZmVVbmlmb3JtQXJyYXlJbnREaXN0cmlidXRpb25JbnRlcm5hbChvdXQsIHJhbmdlU2l6ZSwgcm5nKSB7XHJcbiAgdmFyIHJhbmdlTGVuZ3RoID0gcmFuZ2VTaXplLmxlbmd0aDtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCAhPT0gcmFuZ2VMZW5ndGg7ICsraW5kZXgpIHtcclxuICAgICAgdmFyIGluZGV4UmFuZ2VTaXplID0gaW5kZXggPT09IDAgPyByYW5nZVNpemVbMF0gKyAxIDogNDI5NDk2NzI5NjtcclxuICAgICAgdmFyIGcgPSB1bnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uSW50ZXJuYWwoaW5kZXhSYW5nZVNpemUsIHJuZyk7XHJcbiAgICAgIG91dFtpbmRleF0gPSBnO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCAhPT0gcmFuZ2VMZW5ndGg7ICsraW5kZXgpIHtcclxuICAgICAgdmFyIGN1cnJlbnQgPSBvdXRbaW5kZXhdO1xyXG4gICAgICB2YXIgY3VycmVudEluUmFuZ2UgPSByYW5nZVNpemVbaW5kZXhdO1xyXG4gICAgICBpZiAoY3VycmVudCA8IGN1cnJlbnRJblJhbmdlKSB7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50ID4gY3VycmVudEluUmFuZ2UpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZGlzdHJpYnV0aW9uL1Vuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24uanNcclxudmFyIHNhZmVOdW1iZXJNYXhTYWZlSW50ZWdlciA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG52YXIgc2hhcmVkQSA9IHsgc2lnbjogMSwgZGF0YTogWzAsIDBdIH07XHJcbnZhciBzaGFyZWRCID0geyBzaWduOiAxLCBkYXRhOiBbMCwgMF0gfTtcclxudmFyIHNoYXJlZEMgPSB7IHNpZ246IDEsIGRhdGE6IFswLCAwXSB9O1xyXG52YXIgc2hhcmVkRGF0YSA9IFswLCAwXTtcclxuZnVuY3Rpb24gdW5pZm9ybUxhcmdlSW50SW50ZXJuYWwoZnJvbSwgdG8sIHJhbmdlU2l6ZSwgcm5nKSB7XHJcbiAgdmFyIHJhbmdlU2l6ZUFycmF5SW50VmFsdWUgPSByYW5nZVNpemUgPD0gc2FmZU51bWJlck1heFNhZmVJbnRlZ2VyID8gZnJvbU51bWJlclRvQXJyYXlJbnQ2NChzaGFyZWRDLCByYW5nZVNpemUpIDogc3Vic3RyYWN0QXJyYXlJbnQ2NChzaGFyZWRDLCBmcm9tTnVtYmVyVG9BcnJheUludDY0KHNoYXJlZEEsIHRvKSwgZnJvbU51bWJlclRvQXJyYXlJbnQ2NChzaGFyZWRCLCBmcm9tKSk7XHJcbiAgaWYgKHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVsxXSA9PT0gNDI5NDk2NzI5NSkge1xyXG4gICAgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhWzBdICs9IDE7XHJcbiAgICByYW5nZVNpemVBcnJheUludFZhbHVlLmRhdGFbMV0gPSAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByYW5nZVNpemVBcnJheUludFZhbHVlLmRhdGFbMV0gKz0gMTtcclxuICB9XHJcbiAgdW5zYWZlVW5pZm9ybUFycmF5SW50RGlzdHJpYnV0aW9uSW50ZXJuYWwoc2hhcmVkRGF0YSwgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhLCBybmcpO1xyXG4gIHJldHVybiBzaGFyZWREYXRhWzBdICogNDI5NDk2NzI5NiArIHNoYXJlZERhdGFbMV0gKyBmcm9tO1xyXG59XHJcbmZ1bmN0aW9uIHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24oZnJvbSwgdG8sIHJuZykge1xyXG4gIHZhciByYW5nZVNpemUgPSB0byAtIGZyb207XHJcbiAgaWYgKHJhbmdlU2l6ZSA8PSA0Mjk0OTY3Mjk1KSB7XHJcbiAgICB2YXIgZyA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbChyYW5nZVNpemUgKyAxLCBybmcpO1xyXG4gICAgcmV0dXJuIGcgKyBmcm9tO1xyXG4gIH1cclxuICByZXR1cm4gdW5pZm9ybUxhcmdlSW50SW50ZXJuYWwoZnJvbSwgdG8sIHJhbmdlU2l6ZSwgcm5nKTtcclxufVxyXG5cclxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZ2VuZXJhdG9yL1hvcm9TaGlyby5qc1xyXG52YXIgWG9yb1NoaXJvMTI4UGx1cyA9IChmdW5jdGlvbigpIHtcclxuICBmdW5jdGlvbiBYb3JvU2hpcm8xMjhQbHVzMihzMDEsIHMwMCwgczExLCBzMTApIHtcclxuICAgIHRoaXMuczAxID0gczAxO1xyXG4gICAgdGhpcy5zMDAgPSBzMDA7XHJcbiAgICB0aGlzLnMxMSA9IHMxMTtcclxuICAgIHRoaXMuczEwID0gczEwO1xyXG4gIH1cclxuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgWG9yb1NoaXJvMTI4UGx1czIodGhpcy5zMDEsIHRoaXMuczAwLCB0aGlzLnMxMSwgdGhpcy5zMTApO1xyXG4gIH07XHJcbiAgWG9yb1NoaXJvMTI4UGx1czIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBuZXh0Um5nID0gbmV3IFhvcm9TaGlybzEyOFBsdXMyKHRoaXMuczAxLCB0aGlzLnMwMCwgdGhpcy5zMTEsIHRoaXMuczEwKTtcclxuICAgIHZhciBvdXQgPSBuZXh0Um5nLnVuc2FmZU5leHQoKTtcclxuICAgIHJldHVybiBbb3V0LCBuZXh0Um5nXTtcclxuICB9O1xyXG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS51bnNhZmVOZXh0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgb3V0ID0gdGhpcy5zMDAgKyB0aGlzLnMxMCB8IDA7XHJcbiAgICB2YXIgYTAgPSB0aGlzLnMxMCBeIHRoaXMuczAwO1xyXG4gICAgdmFyIGExID0gdGhpcy5zMTEgXiB0aGlzLnMwMTtcclxuICAgIHZhciBzMDAgPSB0aGlzLnMwMDtcclxuICAgIHZhciBzMDEgPSB0aGlzLnMwMTtcclxuICAgIHRoaXMuczAwID0gczAwIDw8IDI0IF4gczAxID4+PiA4IF4gYTAgXiBhMCA8PCAxNjtcclxuICAgIHRoaXMuczAxID0gczAxIDw8IDI0IF4gczAwID4+PiA4IF4gYTEgXiAoYTEgPDwgMTYgfCBhMCA+Pj4gMTYpO1xyXG4gICAgdGhpcy5zMTAgPSBhMSA8PCA1IF4gYTAgPj4+IDI3O1xyXG4gICAgdGhpcy5zMTEgPSBhMCA8PCA1IF4gYTEgPj4+IDI3O1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9O1xyXG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS5qdW1wID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmV4dFJuZyA9IG5ldyBYb3JvU2hpcm8xMjhQbHVzMih0aGlzLnMwMSwgdGhpcy5zMDAsIHRoaXMuczExLCB0aGlzLnMxMCk7XHJcbiAgICBuZXh0Um5nLnVuc2FmZUp1bXAoKTtcclxuICAgIHJldHVybiBuZXh0Um5nO1xyXG4gIH07XHJcbiAgWG9yb1NoaXJvMTI4UGx1czIucHJvdG90eXBlLnVuc2FmZUp1bXAgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBuczAxID0gMDtcclxuICAgIHZhciBuczAwID0gMDtcclxuICAgIHZhciBuczExID0gMDtcclxuICAgIHZhciBuczEwID0gMDtcclxuICAgIHZhciBqdW1wID0gWzM2Mzk5NTY2NDUsIDM3NTA3NTcwMTIsIDEyNjE1Njg1MDgsIDM4NjQyNjMzNV07XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSAhPT0gNDsgKytpKSB7XHJcbiAgICAgIGZvciAodmFyIG1hc2sgPSAxOyBtYXNrOyBtYXNrIDw8PSAxKSB7XHJcbiAgICAgICAgaWYgKGp1bXBbaV0gJiBtYXNrKSB7XHJcbiAgICAgICAgICBuczAxIF49IHRoaXMuczAxO1xyXG4gICAgICAgICAgbnMwMCBePSB0aGlzLnMwMDtcclxuICAgICAgICAgIG5zMTEgXj0gdGhpcy5zMTE7XHJcbiAgICAgICAgICBuczEwIF49IHRoaXMuczEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVuc2FmZU5leHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zMDEgPSBuczAxO1xyXG4gICAgdGhpcy5zMDAgPSBuczAwO1xyXG4gICAgdGhpcy5zMTEgPSBuczExO1xyXG4gICAgdGhpcy5zMTAgPSBuczEwO1xyXG4gIH07XHJcbiAgWG9yb1NoaXJvMTI4UGx1czIucHJvdG90eXBlLmdldFN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gW3RoaXMuczAxLCB0aGlzLnMwMCwgdGhpcy5zMTEsIHRoaXMuczEwXTtcclxuICB9O1xyXG4gIHJldHVybiBYb3JvU2hpcm8xMjhQbHVzMjtcclxufSkoKTtcclxuZnVuY3Rpb24gZnJvbVN0YXRlKHN0YXRlKSB7XHJcbiAgdmFyIHZhbGlkID0gc3RhdGUubGVuZ3RoID09PSA0O1xyXG4gIGlmICghdmFsaWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdGF0ZSBtdXN0IGhhdmUgYmVlbiBwcm9kdWNlZCBieSBhIHhvcm9zaGlybzEyOHBsdXMgUmFuZG9tR2VuZXJhdG9yXCIpO1xyXG4gIH1cclxuICByZXR1cm4gbmV3IFhvcm9TaGlybzEyOFBsdXMoc3RhdGVbMF0sIHN0YXRlWzFdLCBzdGF0ZVsyXSwgc3RhdGVbM10pO1xyXG59XHJcbnZhciB4b3Jvc2hpcm8xMjhwbHVzID0gT2JqZWN0LmFzc2lnbihmdW5jdGlvbihzZWVkKSB7XHJcbiAgcmV0dXJuIG5ldyBYb3JvU2hpcm8xMjhQbHVzKC0xLCB+c2VlZCwgc2VlZCB8IDAsIDApO1xyXG59LCB7IGZyb21TdGF0ZSB9KTtcclxuXHJcbi8vIHNyYy9zZXJ2ZXIvcm5nLnRzXHJcbnZhciB7IGFzVWludE4gfSA9IEJpZ0ludDtcclxuZnVuY3Rpb24gcGNnMzIoc3RhdGUpIHtcclxuICBjb25zdCBNVUwgPSA2MzY0MTM2MjIzODQ2NzkzMDA1bjtcclxuICBjb25zdCBJTkMgPSAxMTYzNDU4MDAyNzQ2MjI2MDcyM247XHJcbiAgc3RhdGUgPSBhc1VpbnROKDY0LCBzdGF0ZSAqIE1VTCArIElOQyk7XHJcbiAgY29uc3QgeG9yc2hpZnRlZCA9IE51bWJlcihhc1VpbnROKDMyLCAoc3RhdGUgPj4gMThuIF4gc3RhdGUpID4+IDI3bikpO1xyXG4gIGNvbnN0IHJvdCA9IE51bWJlcihhc1VpbnROKDMyLCBzdGF0ZSA+PiA1OW4pKTtcclxuICByZXR1cm4geG9yc2hpZnRlZCA+PiByb3QgfCB4b3JzaGlmdGVkIDw8IDMyIC0gcm90O1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlRmxvYXQ2NChybmcpIHtcclxuICBjb25zdCBnMSA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24oMCwgKDEgPDwgMjYpIC0gMSwgcm5nKTtcclxuICBjb25zdCBnMiA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24oMCwgKDEgPDwgMjcpIC0gMSwgcm5nKTtcclxuICBjb25zdCB2YWx1ZSA9IChnMSAqIE1hdGgucG93KDIsIDI3KSArIGcyKSAqIE1hdGgucG93KDIsIC01Myk7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIG1ha2VSYW5kb21Gcm9tU2VlZChzZWVkKSB7XHJcbiAgY29uc3Qgcm5nID0geG9yb3NoaXJvMTI4cGx1cyhwY2czMihzZWVkVG9CaWdJbnQoc2VlZCkpKTtcclxuICBjb25zdCByYW5kb20gPSAoKSA9PiBnZW5lcmF0ZUZsb2F0NjQocm5nKTtcclxuICByYW5kb20uZmlsbCA9IChhcnJheSkgPT4ge1xyXG4gICAgaWYgKGlzQmlnSW50QXJyYXkoYXJyYXkpKSB7XHJcbiAgICAgIGNvbnN0IHVwcGVyID0gKDFuIDw8IEJpZ0ludChhcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIDgpKSAtIDFuO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYXJyYXlbaV0gPSB1bnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uKDBuLCB1cHBlciwgcm5nKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdXBwZXIgPSBNYXRoLnBvdygyLCBhcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIDgpIC0gMTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5W2ldID0gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbigwLCB1cHBlciwgcm5nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG4gIH07XHJcbiAgcmFuZG9tLnNodWZmbGUgPSAoYXJyYXkpID0+IHtcclxuICAgIGZvciAobGV0IGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7IGN1cnJlbnRJbmRleCA+IDA7IGN1cnJlbnRJbmRleC0tKSB7XHJcbiAgICAgIGNvbnN0IHN3YXBJbmRleCA9IHJhbmRvbS5pbnRlZ2VySW5SYW5nZSgwLCBjdXJyZW50SW5kZXgpO1xyXG4gICAgICBbYXJyYXlbY3VycmVudEluZGV4XSwgYXJyYXlbc3dhcEluZGV4XV0gPSBbXHJcbiAgICAgICAgYXJyYXlbc3dhcEluZGV4XSxcclxuICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdXHJcbiAgICAgIF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbiAgfTtcclxuICByYW5kb20udWludDMyID0gKCkgPT4gcm5nLnVuc2FmZU5leHQoKTtcclxuICByYW5kb20uaW50ZWdlckluUmFuZ2UgPSAobWluLCBtYXgpID0+IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24obWluLCBtYXgsIHJuZyk7XHJcbiAgcmFuZG9tLmJpZ2ludEluUmFuZ2UgPSAobWluLCBtYXgpID0+IHVuc2FmZVVuaWZvcm1CaWdJbnREaXN0cmlidXRpb24obWluLCBtYXgsIHJuZyk7XHJcbiAgcmV0dXJuIHJhbmRvbTtcclxufVxyXG5mdW5jdGlvbiBtYWtlUmFuZG9tKHNlZWQpIHtcclxuICByZXR1cm4gbWFrZVJhbmRvbUZyb21TZWVkKHNlZWQpO1xyXG59XHJcbmZ1bmN0aW9uIHNlZWRUb0JpZ0ludChzZWVkKSB7XHJcbiAgaWYgKHR5cGVvZiBzZWVkID09PSBcImJpZ2ludFwiKSByZXR1cm4gc2VlZDtcclxuICBpZiAodHlwZW9mIHNlZWQgPT09IFwibnVtYmVyXCIpIHJldHVybiBCaWdJbnQoc2VlZCk7XHJcbiAgaWYgKHNlZWQgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XHJcbiAgICBsZXQgdmFsdWUgPSAwbjtcclxuICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKHNlZWQuYnl0ZUxlbmd0aCwgOCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHZhbHVlIHw9IEJpZ0ludChzZWVkW2ldKSA8PCBCaWdJbnQoaSAqIDgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICByZXR1cm4gc2VlZC5taWNyb3NTaW5jZVVuaXhFcG9jaDtcclxufVxyXG5mdW5jdGlvbiBpc0JpZ0ludEFycmF5KGFycmF5KSB7XHJcbiAgcmV0dXJuIGFycmF5IGluc3RhbmNlb2YgQmlnSW50NjRBcnJheSB8fCBhcnJheSBpbnN0YW5jZW9mIEJpZ1VpbnQ2NEFycmF5O1xyXG59XHJcbnZhciBzeXMgPSB7IC4uLl9zeXNjYWxsczJfMCwgLi4uX3N5c2NhbGxzMl8xIH07XHJcbnZhciBob3N0QmFja2VuZCA9IHtcclxuICAvLyBEaXJlY3QgcmVmZXJlbmNlcyBrZWVwIGJhY2tlbmQgaW5qZWN0aW9uIGZyb20gYWRkaW5nIGEgd3JhcHBlciBjYWxsIHRvIHRoZSBob3N0IGhvdCBwYXRoLlxyXG4gIGlkZW50aXR5OiBzeXMuaWRlbnRpdHksXHJcbiAgZ2V0Snd0UGF5bG9hZDogc3lzLmdldF9qd3RfcGF5bG9hZCxcclxuICB0YWJsZUlkRnJvbU5hbWU6IHN5cy50YWJsZV9pZF9mcm9tX25hbWUsXHJcbiAgaW5kZXhJZEZyb21OYW1lOiBzeXMuaW5kZXhfaWRfZnJvbV9uYW1lLFxyXG4gIGRhdGFzdG9yZVRhYmxlUm93Q291bnQ6IHN5cy5kYXRhc3RvcmVfdGFibGVfcm93X2NvdW50LFxyXG4gIGRhdGFzdG9yZVRhYmxlU2NhbkJzYXRuOiBzeXMuZGF0YXN0b3JlX3RhYmxlX3NjYW5fYnNhdG4sXHJcbiAgZGF0YXN0b3JlSW5zZXJ0QnNhdG46IHN5cy5kYXRhc3RvcmVfaW5zZXJ0X2JzYXRuLFxyXG4gIGRhdGFzdG9yZURlbGV0ZUFsbEJ5RXFCc2F0bjogc3lzLmRhdGFzdG9yZV9kZWxldGVfYWxsX2J5X2VxX2JzYXRuLFxyXG4gIGRhdGFzdG9yZUluZGV4U2NhblBvaW50QnNhdG46IHN5cy5kYXRhc3RvcmVfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bixcclxuICBkYXRhc3RvcmVJbmRleFNjYW5SYW5nZUJzYXRuOiBzeXMuZGF0YXN0b3JlX2luZGV4X3NjYW5fcmFuZ2VfYnNhdG4sXHJcbiAgZGF0YXN0b3JlRGVsZXRlQnlJbmRleFNjYW5Qb2ludEJzYXRuOiBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuLFxyXG4gIGRhdGFzdG9yZURlbGV0ZUJ5SW5kZXhTY2FuUmFuZ2VCc2F0bjogc3lzLmRhdGFzdG9yZV9kZWxldGVfYnlfaW5kZXhfc2Nhbl9yYW5nZV9ic2F0bixcclxuICBkYXRhc3RvcmVVcGRhdGVCc2F0bjogc3lzLmRhdGFzdG9yZV91cGRhdGVfYnNhdG4sXHJcbiAgZGF0YXN0b3JlQ2xlYXI6IHN5cy5kYXRhc3RvcmVfY2xlYXIsXHJcbiAgcm93SXRlckJzYXRuQWR2YW5jZTogc3lzLnJvd19pdGVyX2JzYXRuX2FkdmFuY2UsXHJcbiAgcm93SXRlckJzYXRuQ2xvc2U6IHN5cy5yb3dfaXRlcl9ic2F0bl9jbG9zZSxcclxuICBwcm9jZWR1cmVTdGFydE11dFR4OiBzeXMucHJvY2VkdXJlX3N0YXJ0X211dF90eCxcclxuICBwcm9jZWR1cmVDb21taXRNdXRUeDogc3lzLnByb2NlZHVyZV9jb21taXRfbXV0X3R4LFxyXG4gIHByb2NlZHVyZUFib3J0TXV0VHg6IHN5cy5wcm9jZWR1cmVfYWJvcnRfbXV0X3R4LFxyXG4gIHByb2NlZHVyZUh0dHBSZXF1ZXN0OiBzeXMucHJvY2VkdXJlX2h0dHBfcmVxdWVzdFxyXG59O1xyXG5cclxuLy8gc3JjL3NlcnZlci9ydW50aW1lLnRzXHJcbnZhciB7IGZyZWV6ZSB9ID0gT2JqZWN0O1xyXG52YXIgc3lzMiA9IHsgLi4uX3N5c2NhbGxzMl8wLCAuLi5fc3lzY2FsbHMyXzEgfTtcclxuZnVuY3Rpb24gaXNEYXRhc3RvcmVCYWNrZW5kKHZhbHVlKSB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBcInRhYmxlSWRGcm9tTmFtZVwiIGluIHZhbHVlICYmIFwicHJvY2VkdXJlU3RhcnRNdXRUeFwiIGluIHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIHJlcXVlc3RGcm9tV2lyZShyZXF1ZXN0LCBib2R5KSB7XHJcbiAgcmV0dXJuIFJlcXVlc3RbbWFrZVJlcXVlc3RdKGJvZHksIHtcclxuICAgIGhlYWRlcnM6IGRlc2VyaWFsaXplSGVhZGVycyhyZXF1ZXN0LmhlYWRlcnMpLFxyXG4gICAgbWV0aG9kOiBkZXNlcmlhbGl6ZU1ldGhvZChyZXF1ZXN0Lm1ldGhvZCksXHJcbiAgICB1cmk6IHJlcXVlc3QudXJpLFxyXG4gICAgdmVyc2lvbjogcmVxdWVzdC52ZXJzaW9uXHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gcmVzcG9uc2VJbnRvV2lyZShyZXNwb25zZSkge1xyXG4gIHJldHVybiBbXHJcbiAgICB7XHJcbiAgICAgIGhlYWRlcnM6IHNlcmlhbGl6ZUhlYWRlcnMocmVzcG9uc2UuaGVhZGVycyksXHJcbiAgICAgIHZlcnNpb246IHJlc3BvbnNlLnZlcnNpb24sXHJcbiAgICAgIGNvZGU6IHJlc3BvbnNlLnN0YXR1c1xyXG4gICAgfSxcclxuICAgIHJlc3BvbnNlLmJ5dGVzKClcclxuICBdO1xyXG59XHJcbmZ1bmN0aW9uIHBhcnNlSnNvbk9iamVjdChqc29uKSB7XHJcbiAgbGV0IHZhbHVlO1xyXG4gIHRyeSB7XHJcbiAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbik7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEpTT046IGZhaWxlZCB0byBwYXJzZSBzdHJpbmdcIik7XHJcbiAgfVxyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGEgSlNPTiBvYmplY3QgYXQgdGhlIHRvcCBsZXZlbFwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbnZhciBKd3RDbGFpbXNJbXBsID0gY2xhc3Mge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgSnd0Q2xhaW1zIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSByYXdQYXlsb2FkIFRoZSBKV1QgcGF5bG9hZCBhcyBhIHJhdyBKU09OIHN0cmluZy5cclxuICAgKiBAcGFyYW0gaWRlbnRpdHkgVGhlIGlkZW50aXR5IGZvciB0aGlzIEpXVC4gV2UgYXJlIG9ubHkgdGFraW5nIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIGEgYmxha2UzIGltcGxlbWVudGF0aW9uICh3aGljaCB3ZSBuZWVkIHRvIGNvbXB1dGUgaXQpLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJhd1BheWxvYWQsIGlkZW50aXR5KSB7XHJcbiAgICB0aGlzLnJhd1BheWxvYWQgPSByYXdQYXlsb2FkO1xyXG4gICAgdGhpcy5mdWxsUGF5bG9hZCA9IHBhcnNlSnNvbk9iamVjdChyYXdQYXlsb2FkKTtcclxuICAgIHRoaXMuX2lkZW50aXR5ID0gaWRlbnRpdHk7XHJcbiAgfVxyXG4gIGZ1bGxQYXlsb2FkO1xyXG4gIF9pZGVudGl0eTtcclxuICBnZXQgaWRlbnRpdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faWRlbnRpdHk7XHJcbiAgfVxyXG4gIGdldCBzdWJqZWN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZnVsbFBheWxvYWRbXCJzdWJcIl07XHJcbiAgfVxyXG4gIGdldCBpc3N1ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5mdWxsUGF5bG9hZFtcImlzc1wiXTtcclxuICB9XHJcbiAgZ2V0IGF1ZGllbmNlKCkge1xyXG4gICAgY29uc3QgYXVkID0gdGhpcy5mdWxsUGF5bG9hZFtcImF1ZFwiXTtcclxuICAgIGlmIChhdWQgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIGF1ZCA9PT0gXCJzdHJpbmdcIiA/IFthdWRdIDogYXVkO1xyXG4gIH1cclxufTtcclxudmFyIEF1dGhDdHhJbXBsID0gY2xhc3MgX0F1dGhDdHhJbXBsIHtcclxuICBpc0ludGVybmFsO1xyXG4gIC8vIFNvdXJjZSBvZiB0aGUgSldUIHBheWxvYWQgc3RyaW5nLCBpZiB0aGVyZSBpcyBvbmUuXHJcbiAgX2p3dFNvdXJjZTtcclxuICAvLyBXaGV0aGVyIHdlIGhhdmUgaW5pdGlhbGl6ZWQgdGhlIEpXVCBjbGFpbXMuXHJcbiAgX2luaXRpYWxpemVkSldUID0gZmFsc2U7XHJcbiAgX2p3dENsYWltcztcclxuICBfc2VuZGVySWRlbnRpdHk7XHJcbiAgY29uc3RydWN0b3Iob3B0cykge1xyXG4gICAgdGhpcy5pc0ludGVybmFsID0gb3B0cy5pc0ludGVybmFsO1xyXG4gICAgdGhpcy5fand0U291cmNlID0gb3B0cy5qd3RTb3VyY2U7XHJcbiAgICB0aGlzLl9zZW5kZXJJZGVudGl0eSA9IG9wdHMuc2VuZGVySWRlbnRpdHk7XHJcbiAgfVxyXG4gIF9pbml0aWFsaXplSldUKCkge1xyXG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkSldUKSByZXR1cm47XHJcbiAgICB0aGlzLl9pbml0aWFsaXplZEpXVCA9IHRydWU7XHJcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuX2p3dFNvdXJjZSgpO1xyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICB0aGlzLl9qd3RDbGFpbXMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fand0Q2xhaW1zID0gbmV3IEp3dENsYWltc0ltcGwodG9rZW4sIHRoaXMuX3NlbmRlcklkZW50aXR5KTtcclxuICAgIH1cclxuICAgIE9iamVjdC5mcmVlemUodGhpcyk7XHJcbiAgfVxyXG4gIC8qKiBMYXppbHkgY29tcHV0ZSB3aGV0aGVyIGEgSldUIGV4aXN0cyBhbmQgaXMgcGFyc2VhYmxlLiAqL1xyXG4gIGdldCBoYXNKV1QoKSB7XHJcbiAgICB0aGlzLl9pbml0aWFsaXplSldUKCk7XHJcbiAgICByZXR1cm4gdGhpcy5fand0Q2xhaW1zICE9PSBudWxsO1xyXG4gIH1cclxuICAvKiogTGF6aWx5IHBhcnNlIHRoZSBKd3RDbGFpbXMgb25seSB3aGVuIGFjY2Vzc2VkLiAqL1xyXG4gIGdldCBqd3QoKSB7XHJcbiAgICB0aGlzLl9pbml0aWFsaXplSldUKCk7XHJcbiAgICByZXR1cm4gdGhpcy5fand0Q2xhaW1zO1xyXG4gIH1cclxuICAvKiogQ3JlYXRlIGEgY29udGV4dCByZXByZXNlbnRpbmcgaW50ZXJuYWwgKG5vbi11c2VyKSByZXF1ZXN0cy4gKi9cclxuICBzdGF0aWMgaW50ZXJuYWwoKSB7XHJcbiAgICByZXR1cm4gbmV3IF9BdXRoQ3R4SW1wbCh7XHJcbiAgICAgIGlzSW50ZXJuYWw6IHRydWUsXHJcbiAgICAgIGp3dFNvdXJjZTogKCkgPT4gbnVsbCxcclxuICAgICAgc2VuZGVySWRlbnRpdHk6IElkZW50aXR5Lnplcm8oKVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKiBJZiB0aGVyZSBpcyBhIGNvbm5lY3Rpb24gaWQsIGxvb2sgdXAgdGhlIEpXVCBwYXlsb2FkIGZyb20gdGhlIHN5c3RlbSB0YWJsZXMuICovXHJcbiAgc3RhdGljIGZyb21CYWNrZW5kKGNvbm5lY3Rpb25JZCwgc2VuZGVyLCBiYWNrZW5kKSB7XHJcbiAgICBpZiAoY29ubmVjdGlvbklkID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBuZXcgX0F1dGhDdHhJbXBsKHtcclxuICAgICAgICBpc0ludGVybmFsOiBmYWxzZSxcclxuICAgICAgICBqd3RTb3VyY2U6ICgpID0+IG51bGwsXHJcbiAgICAgICAgc2VuZGVySWRlbnRpdHk6IHNlbmRlclxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgX0F1dGhDdHhJbXBsKHtcclxuICAgICAgaXNJbnRlcm5hbDogZmFsc2UsXHJcbiAgICAgIGp3dFNvdXJjZTogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWRCdWYgPSBiYWNrZW5kLmdldEp3dFBheWxvYWQoXHJcbiAgICAgICAgICBjb25uZWN0aW9uSWQuX19jb25uZWN0aW9uX2lkX19cclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChwYXlsb2FkQnVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZFN0ciA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShwYXlsb2FkQnVmKTtcclxuICAgICAgICByZXR1cm4gcGF5bG9hZFN0cjtcclxuICAgICAgfSxcclxuICAgICAgc2VuZGVySWRlbnRpdHk6IHNlbmRlclxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKiBJZiB0aGVyZSBpcyBhIGNvbm5lY3Rpb24gaWQsIGxvb2sgdXAgdGhlIEpXVCBwYXlsb2FkIGZyb20gdGhlIGhvc3Qgc3lzdGVtIHRhYmxlcy4gKi9cclxuICBzdGF0aWMgZnJvbVN5c3RlbVRhYmxlcyhjb25uZWN0aW9uSWQsIHNlbmRlcikge1xyXG4gICAgcmV0dXJuIF9BdXRoQ3R4SW1wbC5mcm9tQmFja2VuZChjb25uZWN0aW9uSWQsIHNlbmRlciwgaG9zdEJhY2tlbmQpO1xyXG4gIH1cclxufTtcclxudmFyIFJlZHVjZXJDdHhJbXBsID0gY2xhc3MgUmVkdWNlckN0eCB7XHJcbiAgI2lkZW50aXR5O1xyXG4gICNzZW5kZXJBdXRoO1xyXG4gICN1dWlkQ291bnRlcjtcclxuICAjcmFuZG9tO1xyXG4gICNiYWNrZW5kO1xyXG4gIHNlbmRlcjtcclxuICB0aW1lc3RhbXA7XHJcbiAgY29ubmVjdGlvbklkO1xyXG4gIGRiO1xyXG4gIGVudiA9IGVudmlyb25tZW50O1xyXG4gIGFzO1xyXG4gIGNvbnN0cnVjdG9yKHNlbmRlciwgdGltZXN0YW1wLCBjb25uZWN0aW9uSWQsIGRiVmlldywgYmFja2VuZE9yQXNWaWV3cyA9IGhvc3RCYWNrZW5kLCBzZW5kZXJBdXRoLCByYW5kb20sIGFzVmlld3MgPSB7fSkge1xyXG4gICAgT2JqZWN0LnNlYWwodGhpcyk7XHJcbiAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcclxuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgdGhpcy5jb25uZWN0aW9uSWQgPSBjb25uZWN0aW9uSWQ7XHJcbiAgICB0aGlzLmRiID0gZGJWaWV3O1xyXG4gICAgaWYgKGlzRGF0YXN0b3JlQmFja2VuZChiYWNrZW5kT3JBc1ZpZXdzKSkge1xyXG4gICAgICB0aGlzLiNiYWNrZW5kID0gYmFja2VuZE9yQXNWaWV3cztcclxuICAgICAgdGhpcy4jc2VuZGVyQXV0aCA9IHNlbmRlckF1dGg7XHJcbiAgICAgIHRoaXMuI3JhbmRvbSA9IHJhbmRvbTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuI2JhY2tlbmQgPSBob3N0QmFja2VuZDtcclxuICAgICAgYXNWaWV3cyA9IGJhY2tlbmRPckFzVmlld3M7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFzID0gYXNWaWV3cztcclxuICB9XHJcbiAgLyoqIFJlc2V0IHRoZSBgUmVkdWNlckN0eGAgdG8gYmUgdXNlZCBmb3IgYSBuZXcgdHJhbnNhY3Rpb24gKi9cclxuICBzdGF0aWMgcmVzZXRIb3N0KG1lLCBzZW5kZXIsIHRpbWVzdGFtcCwgY29ubmVjdGlvbklkLCBkYlZpZXcsIGFzVmlld3MpIHtcclxuICAgIG1lLnNlbmRlciA9IHNlbmRlcjtcclxuICAgIG1lLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcclxuICAgIG1lLmNvbm5lY3Rpb25JZCA9IGNvbm5lY3Rpb25JZDtcclxuICAgIG1lLiNiYWNrZW5kID0gaG9zdEJhY2tlbmQ7XHJcbiAgICBtZS4jc2VuZGVyQXV0aCA9IHZvaWQgMDtcclxuICAgIG1lLiNyYW5kb20gPSB2b2lkIDA7XHJcbiAgICBtZS4jdXVpZENvdW50ZXIgPSB2b2lkIDA7XHJcbiAgICBpZiAoZGJWaWV3ICE9PSB2b2lkIDApIHtcclxuICAgICAgbWUuZGIgPSBkYlZpZXc7XHJcbiAgICB9XHJcbiAgICBpZiAoYXNWaWV3cyAhPT0gdm9pZCAwKSB7XHJcbiAgICAgIG1lLmFzID0gYXNWaWV3cztcclxuICAgIH1cclxuICB9XHJcbiAgLyoqIFJlc2V0IHRoZSBgUmVkdWNlckN0eGAgdG8gYmUgdXNlZCB3aXRoIGFuIGluamVjdGFibGUgYmFja2VuZC4gKi9cclxuICBzdGF0aWMgcmVzZXQobWUsIHNlbmRlciwgdGltZXN0YW1wLCBjb25uZWN0aW9uSWQsIGJhY2tlbmRPckRiVmlldyA9IGhvc3RCYWNrZW5kLCBzZW5kZXJBdXRoLCByYW5kb20sIGRiVmlldywgYXNWaWV3cykge1xyXG4gICAgbWUuc2VuZGVyID0gc2VuZGVyO1xyXG4gICAgbWUudGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgbWUuY29ubmVjdGlvbklkID0gY29ubmVjdGlvbklkO1xyXG4gICAgaWYgKGlzRGF0YXN0b3JlQmFja2VuZChiYWNrZW5kT3JEYlZpZXcpKSB7XHJcbiAgICAgIG1lLiNiYWNrZW5kID0gYmFja2VuZE9yRGJWaWV3O1xyXG4gICAgICBtZS4jc2VuZGVyQXV0aCA9IHNlbmRlckF1dGg7XHJcbiAgICAgIG1lLiNyYW5kb20gPSByYW5kb207XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtZS4jYmFja2VuZCA9IGhvc3RCYWNrZW5kO1xyXG4gICAgICBtZS4jc2VuZGVyQXV0aCA9IHZvaWQgMDtcclxuICAgICAgbWUuI3JhbmRvbSA9IHZvaWQgMDtcclxuICAgICAgZGJWaWV3ID0gYmFja2VuZE9yRGJWaWV3O1xyXG4gICAgICBhc1ZpZXdzID0gc2VuZGVyQXV0aDtcclxuICAgIH1cclxuICAgIG1lLiN1dWlkQ291bnRlciA9IHZvaWQgMDtcclxuICAgIGlmIChkYlZpZXcgIT09IHZvaWQgMCkge1xyXG4gICAgICBtZS5kYiA9IGRiVmlldztcclxuICAgIH1cclxuICAgIGlmIChhc1ZpZXdzICE9PSB2b2lkIDApIHtcclxuICAgICAgbWUuYXMgPSBhc1ZpZXdzO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgZGF0YWJhc2VJZGVudGl0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLiNpZGVudGl0eSA/Pz0gbmV3IElkZW50aXR5KHRoaXMuI2JhY2tlbmQuaWRlbnRpdHkoKSk7XHJcbiAgfVxyXG4gIGdldCBpZGVudGl0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFiYXNlSWRlbnRpdHk7XHJcbiAgfVxyXG4gIGdldCBzZW5kZXJBdXRoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI3NlbmRlckF1dGggPz89IEF1dGhDdHhJbXBsLmZyb21CYWNrZW5kKFxyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25JZCxcclxuICAgICAgdGhpcy5zZW5kZXIsXHJcbiAgICAgIHRoaXMuI2JhY2tlbmRcclxuICAgICk7XHJcbiAgfVxyXG4gIGdldCByYW5kb20oKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jcmFuZG9tID8/PSBtYWtlUmFuZG9tKHRoaXMudGltZXN0YW1wKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IHJhbmRvbSB7QGxpbmsgVXVpZH0gYHY0YCB1c2luZyB0aGlzIGBSZWR1Y2VyQ3R4YCdzIFJORy5cclxuICAgKi9cclxuICBuZXdVdWlkVjQoKSB7XHJcbiAgICBjb25zdCBieXRlcyA9IHRoaXMucmFuZG9tLmZpbGwobmV3IFVpbnQ4QXJyYXkoMTYpKTtcclxuICAgIHJldHVybiBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KGJ5dGVzKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IHNvcnRhYmxlIHtAbGluayBVdWlkfSBgdjdgIHVzaW5nIHRoaXMgYFJlZHVjZXJDdHhgJ3MgUk5HLCBjb3VudGVyLFxyXG4gICAqIGFuZCB0aW1lc3RhbXAuXHJcbiAgICovXHJcbiAgbmV3VXVpZFY3KCkge1xyXG4gICAgY29uc3QgYnl0ZXMgPSB0aGlzLnJhbmRvbS5maWxsKG5ldyBVaW50OEFycmF5KDQpKTtcclxuICAgIGNvbnN0IGNvdW50ZXIgPSB0aGlzLiN1dWlkQ291bnRlciA/Pz0geyB2YWx1ZTogMCB9O1xyXG4gICAgcmV0dXJuIFV1aWQuZnJvbUNvdW50ZXJWNyhjb3VudGVyLCB0aGlzLnRpbWVzdGFtcCwgYnl0ZXMpO1xyXG4gIH1cclxufTtcclxudmFyIGNhbGxVc2VyRnVuY3Rpb24gPSBmdW5jdGlvbiBfX3NwYWNldGltZWRiX2VuZF9zaG9ydF9iYWNrdHJhY2UoZm4sIC4uLmFyZ3MpIHtcclxuICByZXR1cm4gZm4oLi4uYXJncyk7XHJcbn07XHJcbmZ1bmN0aW9uIHJ1bldpdGhUeChtYWtlQ3R4LCBib2R5LCBiYWNrZW5kID0gaG9zdEJhY2tlbmQpIHtcclxuICBjb25zdCBydW4gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBiYWNrZW5kLnByb2NlZHVyZVN0YXJ0TXV0VHgoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBib2R5KG1ha2VDdHgobmV3IFRpbWVzdGFtcCh0aW1lc3RhbXApKSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGJhY2tlbmQucHJvY2VkdXJlQWJvcnRNdXRUeCgpO1xyXG4gICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgbGV0IHJlcyA9IHJ1bigpO1xyXG4gIHRyeSB7XHJcbiAgICBiYWNrZW5kLnByb2NlZHVyZUNvbW1pdE11dFR4KCk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH0gY2F0Y2gge1xyXG4gIH1cclxuICBjb25zb2xlLndhcm4oXCJjb21taXR0aW5nIGFub255bW91cyB0cmFuc2FjdGlvbiBmYWlsZWRcIik7XHJcbiAgcmVzID0gcnVuKCk7XHJcbiAgdHJ5IHtcclxuICAgIGJhY2tlbmQucHJvY2VkdXJlQ29tbWl0TXV0VHgoKTtcclxuICAgIHJldHVybiByZXM7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidHJhbnNhY3Rpb24gcmV0cnkgZmFpbGVkIGFnYWluXCIsIHsgY2F1c2U6IGUgfSk7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGZsYXR0ZW5TdWJtb2R1bGVEaXNwYXRjaGVzKGRpc3BhdGNoZXMsIHBhcmVudFByZWZpeCA9IFwiXCIpIHtcclxuICBjb25zdCByZXN1bHQgPSBbXTtcclxuICBmb3IgKGNvbnN0IGQgb2YgZGlzcGF0Y2hlcykge1xyXG4gICAgY29uc3QgbmFtZVByZWZpeCA9IHBhcmVudFByZWZpeCArIGQubmFtZXNwYWNlICsgXCIuXCI7XHJcbiAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgIHJlZHVjZXJGbnM6IGQucmVkdWNlckZucyxcclxuICAgICAgcmVkdWNlckRlZnM6IGQucmVkdWNlckRlZnMsXHJcbiAgICAgIHByb2NlZHVyZUZuczogZC5wcm9jZWR1cmVGbnMsXHJcbiAgICAgIHByb2NlZHVyZURlZnM6IGQucHJvY2VkdXJlRGVmcyxcclxuICAgICAgYW5vblZpZXdGbnM6IGQuYW5vblZpZXdGbnMsXHJcbiAgICAgIHZpZXdGbnM6IGQudmlld0ZucyxcclxuICAgICAgdGFibGVzOiBkLnRhYmxlcyxcclxuICAgICAgc2NoZW1hVGFibGVzOiBkLnNjaGVtYVRhYmxlcyxcclxuICAgICAgdHlwZXNwYWNlOiBkLnR5cGVzcGFjZSxcclxuICAgICAgZGJWaWV3Xzogdm9pZCAwLFxyXG4gICAgICBxdWVyeUJ1aWxkZXJfOiB2b2lkIDAsXHJcbiAgICAgIG5hbWVQcmVmaXgsXHJcbiAgICAgIHN1YkRpc3BhdGNoZXM6IGQuc3ViRGlzcGF0Y2hlc1xyXG4gICAgfSk7XHJcbiAgICByZXN1bHQucHVzaCguLi5mbGF0dGVuU3VibW9kdWxlRGlzcGF0Y2hlcyhkLnN1YkRpc3BhdGNoZXMsIG5hbWVQcmVmaXgpKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG52YXIgbWFrZUhvb2tzID0gKHNjaGVtYTIpID0+IG5ldyBNb2R1bGVIb29rc0ltcGwoc2NoZW1hMik7XHJcbnZhciBNb2R1bGVIb29rc0ltcGwgPSBjbGFzcyB7XHJcbiAgI3NjaGVtYTtcclxuICAjZGJWaWV3XztcclxuICAjY29uc3VtZXJBc187XHJcbiAgI3JlZHVjZXJBcmdzRGVzZXJpYWxpemVycztcclxuICAjY29uc3VtZXJSZWR1Y2VyQ291bnQ7XHJcbiAgI2NvbnN1bWVyUHJvY2VkdXJlQ291bnQ7XHJcbiAgI2ZsYXRTdWJtb2R1bGVzO1xyXG4gICNjb25zdW1lckFub25WaWV3Q291bnQ7XHJcbiAgI2NvbnN1bWVyVmlld0NvdW50O1xyXG4gIC8qKiBDYWNoZSB0aGUgYFJlZHVjZXJDdHhgIG9iamVjdCB0byBhdm9pZCBhbGxvY2F0aW5nIGFuZXcgZm9yIGV2ZXJ5IHJlZHVjZXIgY2FsbC4gKi9cclxuICAjcmVkdWNlckN0eF87XHJcbiAgLyoqIFBlci1zdWJtb2R1bGUgYWxpYXMgY3R4IG1hcHMsIGNhY2hlZCBsYXppbHkgKHBhcmFsbGVsIHRvICNmbGF0U3VibW9kdWxlcykuICovXHJcbiAgI3N1Ym1vZHVsZUFzVmlld3NfID0gW107XHJcbiAgY29uc3RydWN0b3Ioc2NoZW1hMikge1xyXG4gICAgdGhpcy4jc2NoZW1hID0gc2NoZW1hMjtcclxuICAgIHRoaXMuI2NvbnN1bWVyUmVkdWNlckNvdW50ID0gc2NoZW1hMi5yZWR1Y2Vycy5sZW5ndGg7XHJcbiAgICB0aGlzLiNjb25zdW1lclByb2NlZHVyZUNvdW50ID0gc2NoZW1hMi5wcm9jZWR1cmVzLmxlbmd0aDtcclxuICAgIHRoaXMuI2NvbnN1bWVyQW5vblZpZXdDb3VudCA9IHNjaGVtYTIuYW5vblZpZXdzLmxlbmd0aDtcclxuICAgIHRoaXMuI2NvbnN1bWVyVmlld0NvdW50ID0gc2NoZW1hMi52aWV3cy5sZW5ndGg7XHJcbiAgICB0aGlzLiNmbGF0U3VibW9kdWxlcyA9IGZsYXR0ZW5TdWJtb2R1bGVEaXNwYXRjaGVzKFxyXG4gICAgICBzY2hlbWEyLnN1Ym1vZHVsZURpc3BhdGNoSW5mb3NcclxuICAgICk7XHJcbiAgICBjb25zdCBjb25zdW1lckRlc2VyaWFsaXplcnMgPSBzY2hlbWEyLm1vZHVsZURlZi5yZWR1Y2Vycy5tYXAoXHJcbiAgICAgICh7IHBhcmFtcyB9KSA9PiBQcm9kdWN0VHlwZS5tYWtlRGVzZXJpYWxpemVyKHBhcmFtcywgc2NoZW1hMi50eXBlc3BhY2UpXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc3VibW9kdWxlRGVzZXJpYWxpemVycyA9IHRoaXMuI2ZsYXRTdWJtb2R1bGVzLmZsYXRNYXAoXHJcbiAgICAgICh7IHJlZHVjZXJEZWZzLCB0eXBlc3BhY2UgfSkgPT4gcmVkdWNlckRlZnMubWFwKFxyXG4gICAgICAgICh7IHBhcmFtcyB9KSA9PiBQcm9kdWN0VHlwZS5tYWtlRGVzZXJpYWxpemVyKHBhcmFtcywgdHlwZXNwYWNlKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGhpcy4jcmVkdWNlckFyZ3NEZXNlcmlhbGl6ZXJzID0gW1xyXG4gICAgICAuLi5jb25zdW1lckRlc2VyaWFsaXplcnMsXHJcbiAgICAgIC4uLnN1Ym1vZHVsZURlc2VyaWFsaXplcnNcclxuICAgIF07XHJcbiAgfVxyXG4gIGdldCAjZGJWaWV3KCkge1xyXG4gICAgaWYgKHRoaXMuI2RiVmlld18gIT09IHZvaWQgMCkgcmV0dXJuIHRoaXMuI2RiVmlld187XHJcbiAgICBjb25zdCByb290VGFibGVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLiNzY2hlbWEuc2NoZW1hVHlwZS50YWJsZXMpLm1hcChcclxuICAgICAgKHRhYmxlMikgPT4gW1xyXG4gICAgICAgIHRhYmxlMi5hY2Nlc3Nvck5hbWUsXHJcbiAgICAgICAgbWFrZVRhYmxlVmlldyh0aGlzLiNzY2hlbWEudHlwZXNwYWNlLCB0YWJsZTIudGFibGVEZWYpXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgICBjb25zdCBzdWJtb2R1bGVOcyA9IHRoaXMuI3NjaGVtYS5zdWJtb2R1bGVEaXNwYXRjaEluZm9zLm1hcCgoZGlzcGF0Y2gpID0+IFtcclxuICAgICAgZGlzcGF0Y2gubmFtZXNwYWNlLFxyXG4gICAgICBidWlsZERiVmlld0ZvckRpc3BhdGNoKGRpc3BhdGNoLCBkaXNwYXRjaC5uYW1lc3BhY2UgKyBcIi5cIilcclxuICAgIF0pO1xyXG4gICAgdGhpcy4jZGJWaWV3XyA9IGZyZWV6ZShcclxuICAgICAgT2JqZWN0LmZyb21FbnRyaWVzKFsuLi5yb290VGFibGVzLCAuLi5zdWJtb2R1bGVOc10pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHRoaXMuI2RiVmlld187XHJcbiAgfVxyXG4gICNnZXRTdWJtb2R1bGVEYlZpZXcoc3VibW9kdWxlSWR4KSB7XHJcbiAgICBjb25zdCBtID0gdGhpcy4jZmxhdFN1Ym1vZHVsZXNbc3VibW9kdWxlSWR4XTtcclxuICAgIHJldHVybiBtLmRiVmlld18gPz89IGZyZWV6ZShcclxuICAgICAgT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICAgIG0udGFibGVzLm1hcCgoeyBhY2Nlc3Nvck5hbWUsIHRhYmxlRGVmIH0pID0+IFtcclxuICAgICAgICAgIGFjY2Vzc29yTmFtZSxcclxuICAgICAgICAgIG1ha2VUYWJsZVZpZXcobS50eXBlc3BhY2UsIHRhYmxlRGVmLCBtLm5hbWVQcmVmaXgpXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcbiAgI2dldFN1Ym1vZHVsZUFzVmlld3Moc3VibW9kdWxlSWR4KSB7XHJcbiAgICByZXR1cm4gdGhpcy4jc3VibW9kdWxlQXNWaWV3c19bc3VibW9kdWxlSWR4XSA/Pz0gYnVpbGRBbGlhc0N0eE1hcChcclxuICAgICAgdGhpcy4jcmVkdWNlckN0eCxcclxuICAgICAgdGhpcy4jZmxhdFN1Ym1vZHVsZXNbc3VibW9kdWxlSWR4XS5zdWJEaXNwYXRjaGVzLFxyXG4gICAgICB0aGlzLiNmbGF0U3VibW9kdWxlc1tzdWJtb2R1bGVJZHhdLm5hbWVQcmVmaXhcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKiBRdWVyeSBidWlsZGVyIHNjb3BlZCB0byB0aGUgc3VibW9kdWxlJ3Mgb3duIHRhYmxlcywgd2l0aCBuYW1lc3BhY2UtcHJlZml4ZWRcclxuICAgKiAgc291cmNlIG5hbWVzIHNvIGdlbmVyYXRlZCBTUUwgdGFyZ2V0cyB0aGUgbW91bnRlZCB0YWJsZSBuYW1lcy4gKi9cclxuICAjZ2V0U3VibW9kdWxlUXVlcnlCdWlsZGVyKHN1Ym1vZHVsZUlkeCkge1xyXG4gICAgY29uc3QgbSA9IHRoaXMuI2ZsYXRTdWJtb2R1bGVzW3N1Ym1vZHVsZUlkeF07XHJcbiAgICByZXR1cm4gbS5xdWVyeUJ1aWxkZXJfID8/PSBtYWtlUXVlcnlCdWlsZGVyKHtcclxuICAgICAgdGFibGVzOiBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMobS5zY2hlbWFUYWJsZXMpLm1hcCgoW2tleSwgZGVmXSkgPT4gW1xyXG4gICAgICAgICAga2V5LFxyXG4gICAgICAgICAgeyAuLi5kZWYsIHNvdXJjZU5hbWU6IG0ubmFtZVByZWZpeCArIGRlZi5zb3VyY2VOYW1lIH1cclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcbiAgZ2V0ICNyZWR1Y2VyQ3R4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI3JlZHVjZXJDdHhfID8/PSBuZXcgUmVkdWNlckN0eEltcGwoXHJcbiAgICAgIElkZW50aXR5Lnplcm8oKSxcclxuICAgICAgVGltZXN0YW1wLlVOSVhfRVBPQ0gsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIHRoaXMuI2RiVmlld1xyXG4gICAgKTtcclxuICB9XHJcbiAgZ2V0ICNjb25zdW1lckFzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2NvbnN1bWVyQXNfID8/PSBidWlsZEFsaWFzQ3R4TWFwKFxyXG4gICAgICB0aGlzLiNyZWR1Y2VyQ3R4LFxyXG4gICAgICB0aGlzLiNzY2hlbWEuc3VibW9kdWxlRGlzcGF0Y2hJbmZvcyxcclxuICAgICAgXCJcIlxyXG4gICAgKTtcclxuICB9XHJcbiAgX19kZXNjcmliZV9tb2R1bGVfXygpIHtcclxuICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMTI4KTtcclxuICAgIFJhd01vZHVsZURlZi5zZXJpYWxpemUoXHJcbiAgICAgIHdyaXRlcixcclxuICAgICAgUmF3TW9kdWxlRGVmLlYxMCh0aGlzLiNzY2hlbWEucmF3TW9kdWxlRGVmVjEwKCkpXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcclxuICB9XHJcbiAgX19nZXRfZXJyb3JfY29uc3RydWN0b3JfXyhjb2RlKSB7XHJcbiAgICByZXR1cm4gZ2V0RXJyb3JDb25zdHJ1Y3Rvcihjb2RlKTtcclxuICB9XHJcbiAgZ2V0IF9fc2VuZGVyX2Vycm9yX2NsYXNzX18oKSB7XHJcbiAgICByZXR1cm4gU2VuZGVyRXJyb3I7XHJcbiAgfVxyXG4gIF9fY2FsbF9yZWR1Y2VyX18ocmVkdWNlcklkLCBzZW5kZXIsIGNvbm5JZCwgdGltZXN0YW1wLCBhcmdzQnVmKSB7XHJcbiAgICBjb25zdCBkZXNlcmlhbGl6ZUFyZ3MgPSB0aGlzLiNyZWR1Y2VyQXJnc0Rlc2VyaWFsaXplcnNbcmVkdWNlcklkXTtcclxuICAgIEJJTkFSWV9SRUFERVIucmVzZXQoYXJnc0J1Zik7XHJcbiAgICBjb25zdCBhcmdzID0gZGVzZXJpYWxpemVBcmdzKEJJTkFSWV9SRUFERVIpO1xyXG4gICAgY29uc3Qgc2VuZGVySWRlbnRpdHkgPSBuZXcgSWRlbnRpdHkoc2VuZGVyKTtcclxuICAgIGxldCBmbjtcclxuICAgIGxldCBkYlZpZXc7XHJcbiAgICBsZXQgYXNWaWV3cztcclxuICAgIGlmIChyZWR1Y2VySWQgPCB0aGlzLiNjb25zdW1lclJlZHVjZXJDb3VudCkge1xyXG4gICAgICBmbiA9IHRoaXMuI3NjaGVtYS5yZWR1Y2Vyc1tyZWR1Y2VySWRdO1xyXG4gICAgICBkYlZpZXcgPSB0aGlzLiNkYlZpZXc7XHJcbiAgICAgIGFzVmlld3MgPSB0aGlzLiNjb25zdW1lckFzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IG9mZnNldCA9IHRoaXMuI2NvbnN1bWVyUmVkdWNlckNvdW50O1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuI2ZsYXRTdWJtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuI2ZsYXRTdWJtb2R1bGVzW2ldO1xyXG4gICAgICAgIGlmIChyZWR1Y2VySWQgPCBvZmZzZXQgKyBtLnJlZHVjZXJGbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmbiA9IG0ucmVkdWNlckZuc1tyZWR1Y2VySWQgLSBvZmZzZXRdO1xyXG4gICAgICAgICAgZGJWaWV3ID0gdGhpcy4jZ2V0U3VibW9kdWxlRGJWaWV3KGkpO1xyXG4gICAgICAgICAgYXNWaWV3cyA9IHRoaXMuI2dldFN1Ym1vZHVsZUFzVmlld3MoaSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ICs9IG0ucmVkdWNlckZucy5sZW5ndGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZuID09PSB2b2lkIDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgdW5rbm93biByZWR1Y2VySWQgJHtyZWR1Y2VySWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGN0eCA9IHRoaXMuI3JlZHVjZXJDdHg7XHJcbiAgICBSZWR1Y2VyQ3R4SW1wbC5yZXNldEhvc3QoXHJcbiAgICAgIGN0eCxcclxuICAgICAgc2VuZGVySWRlbnRpdHksXHJcbiAgICAgIG5ldyBUaW1lc3RhbXAodGltZXN0YW1wKSxcclxuICAgICAgQ29ubmVjdGlvbklkLm51bGxJZlplcm8obmV3IENvbm5lY3Rpb25JZChjb25uSWQpKSxcclxuICAgICAgZGJWaWV3LFxyXG4gICAgICBhc1ZpZXdzXHJcbiAgICApO1xyXG4gICAgY2FsbFVzZXJGdW5jdGlvbihmbiwgY3R4LCBhcmdzKTtcclxuICB9XHJcbiAgX19jYWxsX3ZpZXdfXyhpZCwgc2VuZGVyLCBhcmdzQnVmKSB7XHJcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XHJcbiAgICBsZXQgdmlld0ZucztcclxuICAgIGxldCBsb2NhbElkO1xyXG4gICAgbGV0IGRiVmlldztcclxuICAgIGxldCBmcm9tO1xyXG4gICAgaWYgKGlkIDwgdGhpcy4jY29uc3VtZXJWaWV3Q291bnQpIHtcclxuICAgICAgdmlld0ZucyA9IG1vZHVsZUN0eC52aWV3cztcclxuICAgICAgbG9jYWxJZCA9IGlkO1xyXG4gICAgICBkYlZpZXcgPSB0aGlzLiNkYlZpZXc7XHJcbiAgICAgIGZyb20gPSBtYWtlUXVlcnlCdWlsZGVyKG1vZHVsZUN0eC5zY2hlbWFUeXBlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBvZmZzZXQgPSB0aGlzLiNjb25zdW1lclZpZXdDb3VudDtcclxuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy4jZmxhdFN1Ym1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy4jZmxhdFN1Ym1vZHVsZXNbaV07XHJcbiAgICAgICAgaWYgKGlkIDwgb2Zmc2V0ICsgbS52aWV3Rm5zLmxlbmd0aCkge1xyXG4gICAgICAgICAgdmlld0ZucyA9IG0udmlld0ZucztcclxuICAgICAgICAgIGxvY2FsSWQgPSBpZCAtIG9mZnNldDtcclxuICAgICAgICAgIGRiVmlldyA9IHRoaXMuI2dldFN1Ym1vZHVsZURiVmlldyhpKTtcclxuICAgICAgICAgIGZyb20gPSB0aGlzLiNnZXRTdWJtb2R1bGVRdWVyeUJ1aWxkZXIoaSk7XHJcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ICs9IG0udmlld0Zucy5sZW5ndGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmb3VuZCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYHVua25vd24gdmlld0lkICR7aWR9YCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGZuLCBkZXNlcmlhbGl6ZVBhcmFtcywgc2VyaWFsaXplUmV0dXJuLCByZXR1cm5UeXBlQmFzZVNpemUgfSA9IHZpZXdGbnNbbG9jYWxJZF07XHJcbiAgICBjb25zdCBjdHggPSBmcmVlemUoe1xyXG4gICAgICBlbnY6IGVudmlyb25tZW50LFxyXG4gICAgICBzZW5kZXI6IG5ldyBJZGVudGl0eShzZW5kZXIpLFxyXG4gICAgICBkYjogZGJWaWV3LFxyXG4gICAgICBmcm9tXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGFyZ3MgPSBkZXNlcmlhbGl6ZVBhcmFtcyhuZXcgQmluYXJ5UmVhZGVyKGFyZ3NCdWYpKTtcclxuICAgIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XHJcbiAgICBjb25zdCByZXRCdWYgPSBuZXcgQmluYXJ5V3JpdGVyKHJldHVyblR5cGVCYXNlU2l6ZSk7XHJcbiAgICBpZiAoaXNSb3dUeXBlZFF1ZXJ5KHJldCkpIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSB0b1NxbChyZXQpO1xyXG4gICAgICBWaWV3UmVzdWx0SGVhZGVyLnNlcmlhbGl6ZShyZXRCdWYsIFZpZXdSZXN1bHRIZWFkZXIuUmF3U3FsKHF1ZXJ5KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBWaWV3UmVzdWx0SGVhZGVyLnNlcmlhbGl6ZShyZXRCdWYsIFZpZXdSZXN1bHRIZWFkZXIuUm93RGF0YSk7XHJcbiAgICAgIHNlcmlhbGl6ZVJldHVybihyZXRCdWYsIHJldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBkYXRhOiByZXRCdWYuZ2V0QnVmZmVyKCkgfTtcclxuICB9XHJcbiAgX19jYWxsX3ZpZXdfYW5vbl9fKGlkLCBhcmdzQnVmKSB7XHJcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XHJcbiAgICBsZXQgYW5vblZpZXdGbnM7XHJcbiAgICBsZXQgbG9jYWxJZDtcclxuICAgIGxldCBkYlZpZXc7XHJcbiAgICBsZXQgZnJvbTtcclxuICAgIGlmIChpZCA8IHRoaXMuI2NvbnN1bWVyQW5vblZpZXdDb3VudCkge1xyXG4gICAgICBhbm9uVmlld0ZucyA9IG1vZHVsZUN0eC5hbm9uVmlld3M7XHJcbiAgICAgIGxvY2FsSWQgPSBpZDtcclxuICAgICAgZGJWaWV3ID0gdGhpcy4jZGJWaWV3O1xyXG4gICAgICBmcm9tID0gbWFrZVF1ZXJ5QnVpbGRlcihtb2R1bGVDdHguc2NoZW1hVHlwZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy4jY29uc3VtZXJBbm9uVmlld0NvdW50O1xyXG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLiNmbGF0U3VibW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLiNmbGF0U3VibW9kdWxlc1tpXTtcclxuICAgICAgICBpZiAoaWQgPCBvZmZzZXQgKyBtLmFub25WaWV3Rm5zLmxlbmd0aCkge1xyXG4gICAgICAgICAgYW5vblZpZXdGbnMgPSBtLmFub25WaWV3Rm5zO1xyXG4gICAgICAgICAgbG9jYWxJZCA9IGlkIC0gb2Zmc2V0O1xyXG4gICAgICAgICAgZGJWaWV3ID0gdGhpcy4jZ2V0U3VibW9kdWxlRGJWaWV3KGkpO1xyXG4gICAgICAgICAgZnJvbSA9IHRoaXMuI2dldFN1Ym1vZHVsZVF1ZXJ5QnVpbGRlcihpKTtcclxuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvZmZzZXQgKz0gbS5hbm9uVmlld0Zucy5sZW5ndGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmb3VuZCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYHVua25vd24gYW5vblZpZXdJZCAke2lkfWApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBmbiwgZGVzZXJpYWxpemVQYXJhbXMsIHNlcmlhbGl6ZVJldHVybiwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBhbm9uVmlld0Zuc1tsb2NhbElkXTtcclxuICAgIGNvbnN0IGN0eCA9IGZyZWV6ZSh7XHJcbiAgICAgIGVudjogZW52aXJvbm1lbnQsXHJcbiAgICAgIGRiOiBkYlZpZXcsXHJcbiAgICAgIGZyb21cclxuICAgIH0pO1xyXG4gICAgY29uc3QgYXJncyA9IGRlc2VyaWFsaXplUGFyYW1zKG5ldyBCaW5hcnlSZWFkZXIoYXJnc0J1ZikpO1xyXG4gICAgY29uc3QgcmV0ID0gY2FsbFVzZXJGdW5jdGlvbihmbiwgY3R4LCBhcmdzKTtcclxuICAgIGNvbnN0IHJldEJ1ZiA9IG5ldyBCaW5hcnlXcml0ZXIocmV0dXJuVHlwZUJhc2VTaXplKTtcclxuICAgIGlmIChpc1Jvd1R5cGVkUXVlcnkocmV0KSkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IHRvU3FsKHJldCk7XHJcbiAgICAgIFZpZXdSZXN1bHRIZWFkZXIuc2VyaWFsaXplKHJldEJ1ZiwgVmlld1Jlc3VsdEhlYWRlci5SYXdTcWwocXVlcnkpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFZpZXdSZXN1bHRIZWFkZXIuc2VyaWFsaXplKHJldEJ1ZiwgVmlld1Jlc3VsdEhlYWRlci5Sb3dEYXRhKTtcclxuICAgICAgc2VyaWFsaXplUmV0dXJuKHJldEJ1ZiwgcmV0KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IGRhdGE6IHJldEJ1Zi5nZXRCdWZmZXIoKSB9O1xyXG4gIH1cclxuICBfX2NhbGxfcHJvY2VkdXJlX18oaWQsIHNlbmRlciwgY29ubmVjdGlvbl9pZCwgdGltZXN0YW1wLCBhcmdzKSB7XHJcbiAgICBjb25zdCBzZW5kZXJJZGVudGl0eSA9IG5ldyBJZGVudGl0eShzZW5kZXIpO1xyXG4gICAgY29uc3QgY29ubklkID0gQ29ubmVjdGlvbklkLm51bGxJZlplcm8obmV3IENvbm5lY3Rpb25JZChjb25uZWN0aW9uX2lkKSk7XHJcbiAgICBjb25zdCB0cyA9IG5ldyBUaW1lc3RhbXAodGltZXN0YW1wKTtcclxuICAgIGlmIChpZCA8IHRoaXMuI2NvbnN1bWVyUHJvY2VkdXJlQ291bnQpIHtcclxuICAgICAgcmV0dXJuIGNhbGxQcm9jZWR1cmUoXHJcbiAgICAgICAgdGhpcy4jc2NoZW1hLnByb2NlZHVyZXMsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgc2VuZGVySWRlbnRpdHksXHJcbiAgICAgICAgY29ubklkLFxyXG4gICAgICAgIHRzLFxyXG4gICAgICAgIGFyZ3MsXHJcbiAgICAgICAgKCkgPT4gdGhpcy4jZGJWaWV3LFxyXG4gICAgICAgIHRoaXMuI3NjaGVtYS5zdWJtb2R1bGVEaXNwYXRjaEluZm9zXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy4jY29uc3VtZXJQcm9jZWR1cmVDb3VudDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy4jZmxhdFN1Ym1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgbSA9IHRoaXMuI2ZsYXRTdWJtb2R1bGVzW2ldO1xyXG4gICAgICBpZiAoaWQgPCBvZmZzZXQgKyBtLnByb2NlZHVyZUZucy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gY2FsbFByb2NlZHVyZShcclxuICAgICAgICAgIG0ucHJvY2VkdXJlRm5zLFxyXG4gICAgICAgICAgaWQgLSBvZmZzZXQsXHJcbiAgICAgICAgICBzZW5kZXJJZGVudGl0eSxcclxuICAgICAgICAgIGNvbm5JZCxcclxuICAgICAgICAgIHRzLFxyXG4gICAgICAgICAgYXJncyxcclxuICAgICAgICAgICgpID0+IHRoaXMuI2dldFN1Ym1vZHVsZURiVmlldyhpKSxcclxuICAgICAgICAgIG0uc3ViRGlzcGF0Y2hlcyxcclxuICAgICAgICAgIG0ubmFtZVByZWZpeFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgb2Zmc2V0ICs9IG0ucHJvY2VkdXJlRm5zLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGB1bmtub3duIHByb2NlZHVyZUlkICR7aWR9YCk7XHJcbiAgfVxyXG4gIF9fY2FsbF9odHRwX2hhbmRsZXJfXyhpZCwgdGltZXN0YW1wLCByZXF1ZXN0LCBib2R5KSB7XHJcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gbW9kdWxlQ3R4Lmh0dHBIYW5kbGVyc1tpZF07XHJcbiAgICBjb25zdCBjdHggPSBuZXcgSGFuZGxlckNvbnRleHRJbXBsKFxyXG4gICAgICBuZXcgVGltZXN0YW1wKHRpbWVzdGFtcCksXHJcbiAgICAgICgpID0+IHRoaXMuI2RiVmlldyxcclxuICAgICAgdGhpcy4jc2NoZW1hLnN1Ym1vZHVsZURpc3BhdGNoSW5mb3NcclxuICAgICk7XHJcbiAgICBjb25zdCByZXF1ZXN0TWV0YWRhdGEgPSBIdHRwUmVxdWVzdC5kZXNlcmlhbGl6ZShuZXcgQmluYXJ5UmVhZGVyKHJlcXVlc3QpKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gY2FsbFVzZXJGdW5jdGlvbihcclxuICAgICAgaGFuZGxlcixcclxuICAgICAgY3R4LFxyXG4gICAgICByZXF1ZXN0RnJvbVdpcmUocmVxdWVzdE1ldGFkYXRhLCBib2R5KVxyXG4gICAgKTtcclxuICAgIGNvbnN0IFtyZXNwb25zZU1ldGFkYXRhLCByZXNwb25zZUJvZHldID0gcmVzcG9uc2VJbnRvV2lyZShyZXNwb25zZSk7XHJcbiAgICBjb25zdCByZXNwb25zZUJ1ZiA9IG5ldyBCaW5hcnlXcml0ZXIoXHJcbiAgICAgIGJzYXRuQmFzZVNpemUobW9kdWxlQ3R4LnR5cGVzcGFjZSwgSHR0cFJlc3BvbnNlLmFsZ2VicmFpY1R5cGUpXHJcbiAgICApO1xyXG4gICAgSHR0cFJlc3BvbnNlLnNlcmlhbGl6ZShyZXNwb25zZUJ1ZiwgcmVzcG9uc2VNZXRhZGF0YSk7XHJcbiAgICByZXR1cm4gW3Jlc3BvbnNlQnVmLmdldEJ1ZmZlcigpLCByZXNwb25zZUJvZHldO1xyXG4gIH1cclxufTtcclxudmFyIEJJTkFSWV9XUklURVIgPSBuZXcgQmluYXJ5V3JpdGVyKDApO1xyXG52YXIgQklOQVJZX1JFQURFUiA9IG5ldyBCaW5hcnlSZWFkZXIobmV3IFVpbnQ4QXJyYXkoKSk7XHJcbnZhciBIYW5kbGVyQ29udGV4dEltcGwgPSBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3IodGltZXN0YW1wLCBkYlZpZXcsIGRpc3BhdGNoZXMgPSBbXSkge1xyXG4gICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcbiAgICB0aGlzLiNkYlZpZXcgPSBkYlZpZXc7XHJcbiAgICB0aGlzLiNkaXNwYXRjaGVzID0gZGlzcGF0Y2hlcztcclxuICB9XHJcbiAgZW52ID0gZW52aXJvbm1lbnQ7XHJcbiAgI2lkZW50aXR5O1xyXG4gICN1dWlkQ291bnRlcjtcclxuICAjcmFuZG9tO1xyXG4gICNkYlZpZXc7XHJcbiAgI2Rpc3BhdGNoZXM7XHJcbiAgI2FzVmlld3M7XHJcbiAgaHR0cCA9IGh0dHBDbGllbnQ7XHJcbiAgZ2V0IGlkZW50aXR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2lkZW50aXR5ID8/PSBuZXcgSWRlbnRpdHkoc3lzMi5pZGVudGl0eSgpKTtcclxuICB9XHJcbiAgZ2V0IHJhbmRvbSgpIHtcclxuICAgIHJldHVybiB0aGlzLiNyYW5kb20gPz89IG1ha2VSYW5kb20odGhpcy50aW1lc3RhbXApO1xyXG4gIH1cclxuICBnZXQgYXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jYXNWaWV3cyA/Pz0gYnVpbGRIYW5kbGVyQWxpYXNDdHhNYXAoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMuI2Rpc3BhdGNoZXMsXHJcbiAgICAgIFwiXCJcclxuICAgICk7XHJcbiAgfVxyXG4gIHdpdGhUeChib2R5KSB7XHJcbiAgICBjb25zdCBkaXNwYXRjaGVzID0gdGhpcy4jZGlzcGF0Y2hlcztcclxuICAgIHJldHVybiBydW5XaXRoVHgoKHRpbWVzdGFtcCkgPT4ge1xyXG4gICAgICBjb25zdCB0eCA9IG5ldyBSZWR1Y2VyQ3R4SW1wbChcclxuICAgICAgICBJZGVudGl0eS56ZXJvKCksXHJcbiAgICAgICAgdGltZXN0YW1wLFxyXG4gICAgICAgIG51bGwsXHJcbiAgICAgICAgdGhpcy4jZGJWaWV3KClcclxuICAgICAgKTtcclxuICAgICAgaWYgKGRpc3BhdGNoZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHR4LmFzID0gYnVpbGRBbGlhc0N0eE1hcCh0eCwgZGlzcGF0Y2hlcywgXCJcIik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHR4O1xyXG4gICAgfSwgYm9keSk7XHJcbiAgfVxyXG4gIG5ld1V1aWRWNCgpIHtcclxuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSgxNikpO1xyXG4gICAgcmV0dXJuIFV1aWQuZnJvbVJhbmRvbUJ5dGVzVjQoYnl0ZXMpO1xyXG4gIH1cclxuICBuZXdVdWlkVjcoKSB7XHJcbiAgICBjb25zdCBieXRlcyA9IHRoaXMucmFuZG9tLmZpbGwobmV3IFVpbnQ4QXJyYXkoNCkpO1xyXG4gICAgY29uc3QgY291bnRlciA9IHRoaXMuI3V1aWRDb3VudGVyID8/PSB7IHZhbHVlOiAwIH07XHJcbiAgICByZXR1cm4gVXVpZC5mcm9tQ291bnRlclY3KGNvdW50ZXIsIHRoaXMudGltZXN0YW1wLCBieXRlcyk7XHJcbiAgfVxyXG59O1xyXG5mdW5jdGlvbiBidWlsZERiVmlld0ZvckRpc3BhdGNoKGRpc3BhdGNoLCBuYW1lUHJlZml4KSB7XHJcbiAgY29uc3QgdGFibGVFbnRyaWVzID0gZGlzcGF0Y2gudGFibGVzLm1hcCgoeyBhY2Nlc3Nvck5hbWUsIHRhYmxlRGVmIH0pID0+IFtcclxuICAgIGFjY2Vzc29yTmFtZSxcclxuICAgIG1ha2VUYWJsZVZpZXcoZGlzcGF0Y2gudHlwZXNwYWNlLCB0YWJsZURlZiwgbmFtZVByZWZpeClcclxuICBdKTtcclxuICBjb25zdCBzdWJOc0VudHJpZXMgPSBkaXNwYXRjaC5zdWJEaXNwYXRjaGVzLm1hcCgoc3ViKSA9PiBbXHJcbiAgICBzdWIubmFtZXNwYWNlLFxyXG4gICAgYnVpbGREYlZpZXdGb3JEaXNwYXRjaChzdWIsIG5hbWVQcmVmaXggKyBzdWIubmFtZXNwYWNlICsgXCIuXCIpXHJcbiAgXSk7XHJcbiAgcmV0dXJuIGZyZWV6ZShPYmplY3QuZnJvbUVudHJpZXMoWy4uLnRhYmxlRW50cmllcywgLi4uc3ViTnNFbnRyaWVzXSkpO1xyXG59XHJcbmZ1bmN0aW9uIGJ1aWxkQWxpYXNDdHgocGFyZW50LCBkaXNwYXRjaCwgbmFtZVByZWZpeCkge1xyXG4gIGNvbnN0IG5zRGIgPSBidWlsZERiVmlld0ZvckRpc3BhdGNoKGRpc3BhdGNoLCBuYW1lUHJlZml4KTtcclxuICBjb25zdCBzdWJBcyA9IGJ1aWxkQWxpYXNDdHhNYXAocGFyZW50LCBkaXNwYXRjaC5zdWJEaXNwYXRjaGVzLCBuYW1lUHJlZml4KTtcclxuICByZXR1cm4ge1xyXG4gICAgZ2V0IHNlbmRlcigpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC5zZW5kZXI7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRhdGFiYXNlSWRlbnRpdHkoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuZGF0YWJhc2VJZGVudGl0eTtcclxuICAgIH0sXHJcbiAgICBnZXQgaWRlbnRpdHkoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuaWRlbnRpdHk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHRpbWVzdGFtcCgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC50aW1lc3RhbXA7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGNvbm5lY3Rpb25JZCgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC5jb25uZWN0aW9uSWQ7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHNlbmRlckF1dGgoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuc2VuZGVyQXV0aDtcclxuICAgIH0sXHJcbiAgICBnZXQgcmFuZG9tKCkge1xyXG4gICAgICByZXR1cm4gcGFyZW50LnJhbmRvbTtcclxuICAgIH0sXHJcbiAgICBuZXdVdWlkVjQoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQubmV3VXVpZFY0KCk7XHJcbiAgICB9LFxyXG4gICAgbmV3VXVpZFY3KCkge1xyXG4gICAgICByZXR1cm4gcGFyZW50Lm5ld1V1aWRWNygpO1xyXG4gICAgfSxcclxuICAgIGRiOiBuc0RiLFxyXG4gICAgYXM6IHN1YkFzXHJcbiAgfTtcclxufVxyXG5mdW5jdGlvbiBidWlsZEFsaWFzQ3R4TWFwKHBhcmVudCwgZGlzcGF0Y2hlcywgcGFyZW50UHJlZml4KSB7XHJcbiAgcmV0dXJuIGZyZWV6ZShcclxuICAgIE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgZGlzcGF0Y2hlcy5tYXAoKGQpID0+IFtcclxuICAgICAgICBkLm5hbWVzcGFjZSxcclxuICAgICAgICBidWlsZEFsaWFzQ3R4KHBhcmVudCwgZCwgcGFyZW50UHJlZml4ICsgZC5uYW1lc3BhY2UgKyBcIi5cIilcclxuICAgICAgXSlcclxuICAgIClcclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIGJ1aWxkSGFuZGxlckFsaWFzQ3R4KHBhcmVudCwgZGlzcGF0Y2gsIG5hbWVQcmVmaXgpIHtcclxuICBsZXQgbnNEYl87XHJcbiAgY29uc3Qgc3ViQXMgPSBidWlsZEhhbmRsZXJBbGlhc0N0eE1hcChcclxuICAgIHBhcmVudCxcclxuICAgIGRpc3BhdGNoLnN1YkRpc3BhdGNoZXMsXHJcbiAgICBuYW1lUHJlZml4XHJcbiAgKTtcclxuICByZXR1cm4ge1xyXG4gICAgZ2V0IHRpbWVzdGFtcCgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC50aW1lc3RhbXA7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGh0dHAoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuaHR0cDtcclxuICAgIH0sXHJcbiAgICBnZXQgaWRlbnRpdHkoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuaWRlbnRpdHk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHJhbmRvbSgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC5yYW5kb207XHJcbiAgICB9LFxyXG4gICAgYXM6IHN1YkFzLFxyXG4gICAgd2l0aFR4KGJvZHkpIHtcclxuICAgICAgcmV0dXJuIHJ1bldpdGhUeCgodHMpID0+IHtcclxuICAgICAgICBjb25zdCB0eCA9IG5ldyBSZWR1Y2VyQ3R4SW1wbChcclxuICAgICAgICAgIElkZW50aXR5Lnplcm8oKSxcclxuICAgICAgICAgIHRzLFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIG5zRGJfID8/PSBidWlsZERiVmlld0ZvckRpc3BhdGNoKFxyXG4gICAgICAgICAgICBkaXNwYXRjaCxcclxuICAgICAgICAgICAgbmFtZVByZWZpeFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYXNzaWduVHhBbGlhc1ZpZXdzKHR4LCBkaXNwYXRjaC5zdWJEaXNwYXRjaGVzLCBuYW1lUHJlZml4KTtcclxuICAgICAgICByZXR1cm4gdHg7XHJcbiAgICAgIH0sIGJvZHkpO1xyXG4gICAgfSxcclxuICAgIG5ld1V1aWRWNCgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC5uZXdVdWlkVjQoKTtcclxuICAgIH0sXHJcbiAgICBuZXdVdWlkVjcoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQubmV3VXVpZFY3KCk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5mdW5jdGlvbiBidWlsZEhhbmRsZXJBbGlhc0N0eE1hcChwYXJlbnQsIGRpc3BhdGNoZXMsIHBhcmVudFByZWZpeCkge1xyXG4gIHJldHVybiBmcmVlemUoXHJcbiAgICBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgIGRpc3BhdGNoZXMubWFwKChkKSA9PiBbXHJcbiAgICAgICAgZC5uYW1lc3BhY2UsXHJcbiAgICAgICAgYnVpbGRIYW5kbGVyQWxpYXNDdHgocGFyZW50LCBkLCBwYXJlbnRQcmVmaXggKyBkLm5hbWVzcGFjZSArIFwiLlwiKVxyXG4gICAgICBdKVxyXG4gICAgKVxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gYnVpbGRQcm9jZWR1cmVBbGlhc0N0eChwYXJlbnQsIGRpc3BhdGNoLCBuYW1lUHJlZml4KSB7XHJcbiAgbGV0IG5zRGJfO1xyXG4gIGNvbnN0IHN1YkFzID0gYnVpbGRQcm9jZWR1cmVBbGlhc0N0eE1hcChcclxuICAgIHBhcmVudCxcclxuICAgIGRpc3BhdGNoLnN1YkRpc3BhdGNoZXMsXHJcbiAgICBuYW1lUHJlZml4XHJcbiAgKTtcclxuICByZXR1cm4ge1xyXG4gICAgZ2V0IHNlbmRlcigpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC5zZW5kZXI7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRhdGFiYXNlSWRlbnRpdHkoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuZGF0YWJhc2VJZGVudGl0eTtcclxuICAgIH0sXHJcbiAgICBnZXQgaWRlbnRpdHkoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuaWRlbnRpdHk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHRpbWVzdGFtcCgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC50aW1lc3RhbXA7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGNvbm5lY3Rpb25JZCgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC5jb25uZWN0aW9uSWQ7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGh0dHAoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQuaHR0cDtcclxuICAgIH0sXHJcbiAgICBnZXQgcmFuZG9tKCkge1xyXG4gICAgICByZXR1cm4gcGFyZW50LnJhbmRvbTtcclxuICAgIH0sXHJcbiAgICBzbGVlcChkdXJhdGlvbikge1xyXG4gICAgICByZXR1cm4gcGFyZW50LnNsZWVwKGR1cmF0aW9uKTtcclxuICAgIH0sXHJcbiAgICBhczogc3ViQXMsXHJcbiAgICB3aXRoVHgoYm9keSkge1xyXG4gICAgICByZXR1cm4gcnVuV2l0aFR4KCh0cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHR4ID0gbmV3IFJlZHVjZXJDdHhJbXBsKFxyXG4gICAgICAgICAgcGFyZW50LnNlbmRlcixcclxuICAgICAgICAgIHRzLFxyXG4gICAgICAgICAgcGFyZW50LmNvbm5lY3Rpb25JZCxcclxuICAgICAgICAgIG5zRGJfID8/PSBidWlsZERiVmlld0ZvckRpc3BhdGNoKFxyXG4gICAgICAgICAgICBkaXNwYXRjaCxcclxuICAgICAgICAgICAgbmFtZVByZWZpeFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYXNzaWduVHhBbGlhc1ZpZXdzKHR4LCBkaXNwYXRjaC5zdWJEaXNwYXRjaGVzLCBuYW1lUHJlZml4KTtcclxuICAgICAgICByZXR1cm4gdHg7XHJcbiAgICAgIH0sIGJvZHkpO1xyXG4gICAgfSxcclxuICAgIG5ld1V1aWRWNCgpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudC5uZXdVdWlkVjQoKTtcclxuICAgIH0sXHJcbiAgICBuZXdVdWlkVjcoKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQubmV3VXVpZFY3KCk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5mdW5jdGlvbiBidWlsZFByb2NlZHVyZUFsaWFzQ3R4TWFwKHBhcmVudCwgZGlzcGF0Y2hlcywgcGFyZW50UHJlZml4KSB7XHJcbiAgcmV0dXJuIGZyZWV6ZShcclxuICAgIE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgZGlzcGF0Y2hlcy5tYXAoKGQpID0+IFtcclxuICAgICAgICBkLm5hbWVzcGFjZSxcclxuICAgICAgICBidWlsZFByb2NlZHVyZUFsaWFzQ3R4KHBhcmVudCwgZCwgcGFyZW50UHJlZml4ICsgZC5uYW1lc3BhY2UgKyBcIi5cIilcclxuICAgICAgXSlcclxuICAgIClcclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIGFzc2lnblR4QWxpYXNWaWV3cyh0eCwgZGlzcGF0Y2hlcywgcGFyZW50UHJlZml4ID0gXCJcIikge1xyXG4gIGlmIChkaXNwYXRjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgIHR4LmFzID0gYnVpbGRBbGlhc0N0eE1hcCh0eCwgZGlzcGF0Y2hlcywgcGFyZW50UHJlZml4KTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gbWFrZVRhYmxlVmlldyh0eXBlc3BhY2UsIHRhYmxlMiwgYmFja2VuZE9yTmFtZVByZWZpeCA9IGhvc3RCYWNrZW5kLCBuYW1lUHJlZml4ID0gXCJcIikge1xyXG4gIGNvbnN0IGJhY2tlbmQgPSBpc0RhdGFzdG9yZUJhY2tlbmQoYmFja2VuZE9yTmFtZVByZWZpeCkgPyBiYWNrZW5kT3JOYW1lUHJlZml4IDogaG9zdEJhY2tlbmQ7XHJcbiAgaWYgKHR5cGVvZiBiYWNrZW5kT3JOYW1lUHJlZml4ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBuYW1lUHJlZml4ID0gYmFja2VuZE9yTmFtZVByZWZpeDtcclxuICB9XHJcbiAgY29uc3QgdGFibGVfaWQgPSBiYWNrZW5kLnRhYmxlSWRGcm9tTmFtZShuYW1lUHJlZml4ICsgdGFibGUyLnNvdXJjZU5hbWUpO1xyXG4gIGNvbnN0IHJvd1R5cGUgPSB0eXBlc3BhY2UudHlwZXNbdGFibGUyLnByb2R1Y3RUeXBlUmVmXTtcclxuICBpZiAocm93VHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XHJcbiAgICB0aHJvdyBcImltcG9zc2libGVcIjtcclxuICB9XHJcbiAgY29uc3Qgc2VyaWFsaXplUm93ID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihyb3dUeXBlLCB0eXBlc3BhY2UpO1xyXG4gIGNvbnN0IGRlc2VyaWFsaXplUm93ID0gQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKHJvd1R5cGUsIHR5cGVzcGFjZSk7XHJcbiAgY29uc3Qgc2VxdWVuY2VzID0gdGFibGUyLnNlcXVlbmNlcy5tYXAoKHNlcSkgPT4ge1xyXG4gICAgY29uc3QgY29sID0gcm93VHlwZS52YWx1ZS5lbGVtZW50c1tzZXEuY29sdW1uXTtcclxuICAgIGNvbnN0IGNvbFR5cGUgPSBjb2wuYWxnZWJyYWljVHlwZTtcclxuICAgIGxldCBzZXF1ZW5jZVRyaWdnZXI7XHJcbiAgICBzd2l0Y2ggKGNvbFR5cGUudGFnKSB7XHJcbiAgICAgIGNhc2UgXCJVOFwiOlxyXG4gICAgICBjYXNlIFwiSThcIjpcclxuICAgICAgY2FzZSBcIlUxNlwiOlxyXG4gICAgICBjYXNlIFwiSTE2XCI6XHJcbiAgICAgIGNhc2UgXCJVMzJcIjpcclxuICAgICAgY2FzZSBcIkkzMlwiOlxyXG4gICAgICAgIHNlcXVlbmNlVHJpZ2dlciA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJVNjRcIjpcclxuICAgICAgY2FzZSBcIkk2NFwiOlxyXG4gICAgICBjYXNlIFwiVTEyOFwiOlxyXG4gICAgICBjYXNlIFwiSTEyOFwiOlxyXG4gICAgICBjYXNlIFwiVTI1NlwiOlxyXG4gICAgICBjYXNlIFwiSTI1NlwiOlxyXG4gICAgICAgIHNlcXVlbmNlVHJpZ2dlciA9IDBuO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbnZhbGlkIHNlcXVlbmNlIHR5cGVcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjb2xOYW1lOiBjb2wubmFtZSxcclxuICAgICAgc2VxdWVuY2VUcmlnZ2VyLFxyXG4gICAgICBkZXNlcmlhbGl6ZTogQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKGNvbFR5cGUsIHR5cGVzcGFjZSlcclxuICAgIH07XHJcbiAgfSk7XHJcbiAgY29uc3QgaGFzQXV0b0luY3JlbWVudCA9IHNlcXVlbmNlcy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IGl0ZXIgPSAoKSA9PiB0YWJsZUl0ZXJhdG9yKFxyXG4gICAgYmFja2VuZC5kYXRhc3RvcmVUYWJsZVNjYW5Cc2F0bih0YWJsZV9pZCksXHJcbiAgICBkZXNlcmlhbGl6ZVJvdyxcclxuICAgIGJhY2tlbmRcclxuICApO1xyXG4gIGNvbnN0IGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnMgPSBoYXNBdXRvSW5jcmVtZW50ID8gKHJvdywgcmV0X2J1ZikgPT4ge1xyXG4gICAgQklOQVJZX1JFQURFUi5yZXNldChyZXRfYnVmKTtcclxuICAgIGZvciAoY29uc3QgeyBjb2xOYW1lLCBkZXNlcmlhbGl6ZSwgc2VxdWVuY2VUcmlnZ2VyIH0gb2Ygc2VxdWVuY2VzKSB7XHJcbiAgICAgIGlmIChyb3dbY29sTmFtZV0gPT09IHNlcXVlbmNlVHJpZ2dlcikge1xyXG4gICAgICAgIHJvd1tjb2xOYW1lXSA9IGRlc2VyaWFsaXplKEJJTkFSWV9SRUFERVIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSA6IG51bGw7XHJcbiAgY29uc3QgZ2VuZXJhdGVkQ29sdW1uc1ZpZXcgPSAoZ2VuZXJhdGVkLCBmYWxsYmFjaykgPT4gZ2VuZXJhdGVkIGluc3RhbmNlb2YgVWludDhBcnJheSA/IG5ldyBEYXRhVmlldyhcclxuICAgIGdlbmVyYXRlZC5idWZmZXIsXHJcbiAgICBnZW5lcmF0ZWQuYnl0ZU9mZnNldCxcclxuICAgIGdlbmVyYXRlZC5ieXRlTGVuZ3RoXHJcbiAgKSA6IGZhbGxiYWNrO1xyXG4gIGNvbnN0IHRhYmxlTWV0aG9kcyA9IHtcclxuICAgIGNvdW50OiAoKSA9PiBCaWdJbnQoYmFja2VuZC5kYXRhc3RvcmVUYWJsZVJvd0NvdW50KHRhYmxlX2lkKSksXHJcbiAgICBpdGVyLFxyXG4gICAgW1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IGl0ZXIoKSxcclxuICAgIGluc2VydDogKHJvdykgPT4ge1xyXG4gICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcclxuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xyXG4gICAgICBzZXJpYWxpemVSb3coQklOQVJZX1dSSVRFUiwgcm93KTtcclxuICAgICAgY29uc3QgZ2VuZXJhdGVkID0gYmFja2VuZC5kYXRhc3RvcmVJbnNlcnRCc2F0bihcclxuICAgICAgICB0YWJsZV9pZCxcclxuICAgICAgICBidWYuYnVmZmVyLFxyXG4gICAgICAgIEJJTkFSWV9XUklURVIub2Zmc2V0XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHJldCA9IHsgLi4ucm93IH07XHJcbiAgICAgIGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnM/LihcclxuICAgICAgICByZXQsXHJcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uc1ZpZXcoZ2VuZXJhdGVkLCBidWYudmlldylcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcbiAgICBkZWxldGU6IChyb3cpID0+IHtcclxuICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XHJcbiAgICAgIEJJTkFSWV9XUklURVIucmVzZXQoYnVmKTtcclxuICAgICAgQklOQVJZX1dSSVRFUi53cml0ZVUzMigxKTtcclxuICAgICAgc2VyaWFsaXplUm93KEJJTkFSWV9XUklURVIsIHJvdyk7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYmFja2VuZC5kYXRhc3RvcmVEZWxldGVBbGxCeUVxQnNhdG4oXHJcbiAgICAgICAgdGFibGVfaWQsXHJcbiAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICBCSU5BUllfV1JJVEVSLm9mZnNldFxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gY291bnQgPiAwO1xyXG4gICAgfSxcclxuICAgIGNsZWFyOiAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gQmlnSW50KGJhY2tlbmQuZGF0YXN0b3JlVGFibGVSb3dDb3VudCh0YWJsZV9pZCkpO1xyXG4gICAgICBiYWNrZW5kLmRhdGFzdG9yZUNsZWFyKHRhYmxlX2lkKTtcclxuICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgdGFibGVWaWV3ID0gT2JqZWN0LmFzc2lnbihcclxuICAgIC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLFxyXG4gICAgdGFibGVNZXRob2RzXHJcbiAgKTtcclxuICBmb3IgKGNvbnN0IGluZGV4RGVmIG9mIHRhYmxlMi5pbmRleGVzKSB7XHJcbiAgICBjb25zdCBhY2Nlc3Nvck5hbWUgPSBpbmRleERlZi5hY2Nlc3Nvck5hbWU7XHJcbiAgICBjb25zdCBpbmRleF9pZCA9IGJhY2tlbmQuaW5kZXhJZEZyb21OYW1lKG5hbWVQcmVmaXggKyBpbmRleERlZi5zb3VyY2VOYW1lKTtcclxuICAgIGxldCBjb2x1bW5faWRzO1xyXG4gICAgbGV0IGlzSGFzaEluZGV4ID0gZmFsc2U7XHJcbiAgICBzd2l0Y2ggKGluZGV4RGVmLmFsZ29yaXRobS50YWcpIHtcclxuICAgICAgY2FzZSBcIkhhc2hcIjpcclxuICAgICAgICBpc0hhc2hJbmRleCA9IHRydWU7XHJcbiAgICAgICAgY29sdW1uX2lkcyA9IGluZGV4RGVmLmFsZ29yaXRobS52YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIkJUcmVlXCI6XHJcbiAgICAgICAgY29sdW1uX2lkcyA9IGluZGV4RGVmLmFsZ29yaXRobS52YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIkRpcmVjdFwiOlxyXG4gICAgICAgIGNvbHVtbl9pZHMgPSBbaW5kZXhEZWYuYWxnb3JpdGhtLnZhbHVlXTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbnN0IG51bUNvbHVtbnMgPSBjb2x1bW5faWRzLmxlbmd0aDtcclxuICAgIGNvbnN0IGNvbHVtblNldCA9IG5ldyBTZXQoY29sdW1uX2lkcyk7XHJcbiAgICBjb25zdCBpc1VuaXF1ZSA9IHRhYmxlMi5jb25zdHJhaW50cy5maWx0ZXIoKHgpID0+IHguZGF0YS50YWcgPT09IFwiVW5pcXVlXCIpLnNvbWUoKHgpID0+IHtcclxuICAgICAgY29uc3QgY29uc3RyYWludENvbHVtbnMgPSBuZXcgU2V0KHguZGF0YS52YWx1ZS5jb2x1bW5zKTtcclxuICAgICAgcmV0dXJuIFsuLi5jb2x1bW5TZXRdLmV2ZXJ5KChjb2x1bW4pID0+IGNvbnN0cmFpbnRDb2x1bW5zLmhhcyhjb2x1bW4pKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgaXNQcmltYXJ5S2V5ID0gaXNVbmlxdWUgJiYgY29sdW1uX2lkcy5sZW5ndGggPT09IHRhYmxlMi5wcmltYXJ5S2V5Lmxlbmd0aCAmJiBjb2x1bW5faWRzLmV2ZXJ5KChpZCwgaSkgPT4gdGFibGUyLnByaW1hcnlLZXlbaV0gPT09IGlkKTtcclxuICAgIGNvbnN0IGluZGV4U2VyaWFsaXplcnMgPSBjb2x1bW5faWRzLm1hcChcclxuICAgICAgKGlkKSA9PiBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKFxyXG4gICAgICAgIHJvd1R5cGUudmFsdWUuZWxlbWVudHNbaWRdLmFsZ2VicmFpY1R5cGUsXHJcbiAgICAgICAgdHlwZXNwYWNlXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICBjb25zdCBzZXJpYWxpemVQb2ludCA9IChidWZmZXIsIGNvbFZhbCkgPT4ge1xyXG4gICAgICBCSU5BUllfV1JJVEVSLnJlc2V0KGJ1ZmZlcik7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29sdW1uczsgaSsrKSB7XHJcbiAgICAgICAgaW5kZXhTZXJpYWxpemVyc1tpXShCSU5BUllfV1JJVEVSLCBjb2xWYWxbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBCSU5BUllfV1JJVEVSLm9mZnNldDtcclxuICAgIH07XHJcbiAgICBjb25zdCBzZXJpYWxpemVTaW5nbGVFbGVtZW50ID0gbnVtQ29sdW1ucyA9PT0gMSA/IGluZGV4U2VyaWFsaXplcnNbMF0gOiBudWxsO1xyXG4gICAgY29uc3Qgc2VyaWFsaXplU2luZ2xlUG9pbnQgPSBzZXJpYWxpemVTaW5nbGVFbGVtZW50ICYmICgoYnVmZmVyLCBjb2xWYWwpID0+IHtcclxuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWZmZXIpO1xyXG4gICAgICBzZXJpYWxpemVTaW5nbGVFbGVtZW50KEJJTkFSWV9XUklURVIsIGNvbFZhbCk7XHJcbiAgICAgIHJldHVybiBCSU5BUllfV1JJVEVSLm9mZnNldDtcclxuICAgIH0pO1xyXG4gICAgbGV0IGluZGV4O1xyXG4gICAgaWYgKGlzVW5pcXVlICYmIHNlcmlhbGl6ZVNpbmdsZVBvaW50KSB7XHJcbiAgICAgIGNvbnN0IGJhc2UgPSB7XHJcbiAgICAgICAgZmluZDogKGNvbFZhbCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XHJcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVTaW5nbGVQb2ludChidWYsIGNvbFZhbCk7XHJcbiAgICAgICAgICBjb25zdCBpdGVyX2lkID0gYmFja2VuZC5kYXRhc3RvcmVJbmRleFNjYW5Qb2ludEJzYXRuKFxyXG4gICAgICAgICAgICBpbmRleF9pZCxcclxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICAgICAgcG9pbnRfbGVuXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0ZU9uZShpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdywgYmFja2VuZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGU6IChjb2xWYWwpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xyXG4gICAgICAgICAgY29uc3QgcG9pbnRfbGVuID0gc2VyaWFsaXplU2luZ2xlUG9pbnQoYnVmLCBjb2xWYWwpO1xyXG4gICAgICAgICAgY29uc3QgbnVtID0gYmFja2VuZC5kYXRhc3RvcmVEZWxldGVCeUluZGV4U2NhblBvaW50QnNhdG4oXHJcbiAgICAgICAgICAgIGluZGV4X2lkLFxyXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxyXG4gICAgICAgICAgICBwb2ludF9sZW5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm4gbnVtID4gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChpc1ByaW1hcnlLZXkpIHtcclxuICAgICAgICBiYXNlLnVwZGF0ZSA9IChyb3cpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xyXG4gICAgICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xyXG4gICAgICAgICAgc2VyaWFsaXplUm93KEJJTkFSWV9XUklURVIsIHJvdyk7XHJcbiAgICAgICAgICBjb25zdCBnZW5lcmF0ZWQgPSBiYWNrZW5kLmRhdGFzdG9yZVVwZGF0ZUJzYXRuKFxyXG4gICAgICAgICAgICB0YWJsZV9pZCxcclxuICAgICAgICAgICAgaW5kZXhfaWQsXHJcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXHJcbiAgICAgICAgICAgIEJJTkFSWV9XUklURVIub2Zmc2V0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaW50ZWdyYXRlR2VuZXJhdGVkQ29sdW1ucz8uKFxyXG4gICAgICAgICAgICByb3csXHJcbiAgICAgICAgICAgIGdlbmVyYXRlZENvbHVtbnNWaWV3KGdlbmVyYXRlZCwgYnVmLnZpZXcpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4ID0gYmFzZTtcclxuICAgIH0gZWxzZSBpZiAoaXNVbmlxdWUpIHtcclxuICAgICAgY29uc3QgYmFzZSA9IHtcclxuICAgICAgICBmaW5kOiAoY29sVmFsKSA9PiB7XHJcbiAgICAgICAgICBpZiAoY29sVmFsLmxlbmd0aCAhPT0gbnVtQ29sdW1ucykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGVsZW1lbnRzXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XHJcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIGNvbFZhbCk7XHJcbiAgICAgICAgICBjb25zdCBpdGVyX2lkID0gYmFja2VuZC5kYXRhc3RvcmVJbmRleFNjYW5Qb2ludEJzYXRuKFxyXG4gICAgICAgICAgICBpbmRleF9pZCxcclxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICAgICAgcG9pbnRfbGVuXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0ZU9uZShpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdywgYmFja2VuZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGU6IChjb2xWYWwpID0+IHtcclxuICAgICAgICAgIGlmIChjb2xWYWwubGVuZ3RoICE9PSBudW1Db2x1bW5zKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGVsZW1lbnRzXCIpO1xyXG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XHJcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIGNvbFZhbCk7XHJcbiAgICAgICAgICBjb25zdCBudW0gPSBiYWNrZW5kLmRhdGFzdG9yZURlbGV0ZUJ5SW5kZXhTY2FuUG9pbnRCc2F0bihcclxuICAgICAgICAgICAgaW5kZXhfaWQsXHJcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXHJcbiAgICAgICAgICAgIHBvaW50X2xlblxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJldHVybiBudW0gPiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgaWYgKGlzUHJpbWFyeUtleSkge1xyXG4gICAgICAgIGJhc2UudXBkYXRlID0gKHJvdykgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XHJcbiAgICAgICAgICBCSU5BUllfV1JJVEVSLnJlc2V0KGJ1Zik7XHJcbiAgICAgICAgICBzZXJpYWxpemVSb3coQklOQVJZX1dSSVRFUiwgcm93KTtcclxuICAgICAgICAgIGNvbnN0IGdlbmVyYXRlZCA9IGJhY2tlbmQuZGF0YXN0b3JlVXBkYXRlQnNhdG4oXHJcbiAgICAgICAgICAgIHRhYmxlX2lkLFxyXG4gICAgICAgICAgICBpbmRleF9pZCxcclxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICAgICAgQklOQVJZX1dSSVRFUi5vZmZzZXRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpbnRlZ3JhdGVHZW5lcmF0ZWRDb2x1bW5zPy4oXHJcbiAgICAgICAgICAgIHJvdyxcclxuICAgICAgICAgICAgZ2VuZXJhdGVkQ29sdW1uc1ZpZXcoZ2VuZXJhdGVkLCBidWYudmlldylcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXggPSBiYXNlO1xyXG4gICAgfSBlbHNlIGlmIChzZXJpYWxpemVTaW5nbGVQb2ludCkge1xyXG4gICAgICBjb25zdCBzZXJpYWxpemVTaW5nbGVSYW5nZSA9ICFpc0hhc2hJbmRleCA/IChidWZmZXIsIHJhbmdlKSA9PiB7XHJcbiAgICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWZmZXIpO1xyXG4gICAgICAgIGNvbnN0IHdyaXRlciA9IEJJTkFSWV9XUklURVI7XHJcbiAgICAgICAgY29uc3Qgd3JpdGVCb3VuZCA9IChib3VuZCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGFncyA9IHsgaW5jbHVkZWQ6IDAsIGV4Y2x1ZGVkOiAxLCB1bmJvdW5kZWQ6IDIgfTtcclxuICAgICAgICAgIHdyaXRlci53cml0ZVU4KHRhZ3NbYm91bmQudGFnXSk7XHJcbiAgICAgICAgICBpZiAoYm91bmQudGFnICE9PSBcInVuYm91bmRlZFwiKVxyXG4gICAgICAgICAgICBzZXJpYWxpemVTaW5nbGVFbGVtZW50KHdyaXRlciwgYm91bmQudmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgd3JpdGVCb3VuZChyYW5nZS5mcm9tKTtcclxuICAgICAgICBjb25zdCByc3RhcnRMZW4gPSB3cml0ZXIub2Zmc2V0O1xyXG4gICAgICAgIHdyaXRlQm91bmQocmFuZ2UudG8pO1xyXG4gICAgICAgIGNvbnN0IHJlbmRMZW4gPSB3cml0ZXIub2Zmc2V0IC0gcnN0YXJ0TGVuO1xyXG4gICAgICAgIHJldHVybiBbMCwgMCwgcnN0YXJ0TGVuLCByZW5kTGVuXTtcclxuICAgICAgfSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHJhd0luZGV4ID0ge1xyXG4gICAgICAgIGZpbHRlcjogKHJhbmdlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcclxuICAgICAgICAgIGlmIChzZXJpYWxpemVTaW5nbGVSYW5nZSAmJiByYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBzZXJpYWxpemVTaW5nbGVSYW5nZShidWYsIHJhbmdlKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlcl9pZDIgPSBiYWNrZW5kLmRhdGFzdG9yZUluZGV4U2NhblJhbmdlQnNhdG4oXHJcbiAgICAgICAgICAgICAgaW5kZXhfaWQsXHJcbiAgICAgICAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICAgICAgICAuLi5hcmdzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWJsZUl0ZXJhdG9yKGl0ZXJfaWQyLCBkZXNlcmlhbGl6ZVJvdywgYmFja2VuZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVTaW5nbGVQb2ludChidWYsIHJhbmdlKTtcclxuICAgICAgICAgIGNvbnN0IGl0ZXJfaWQgPSBiYWNrZW5kLmRhdGFzdG9yZUluZGV4U2NhblBvaW50QnNhdG4oXHJcbiAgICAgICAgICAgIGluZGV4X2lkLFxyXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxyXG4gICAgICAgICAgICBwb2ludF9sZW5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdywgYmFja2VuZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGU6IChyYW5nZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XHJcbiAgICAgICAgICBpZiAoc2VyaWFsaXplU2luZ2xlUmFuZ2UgJiYgcmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkge1xyXG4gICAgICAgICAgICBjb25zdCBhcmdzID0gc2VyaWFsaXplU2luZ2xlUmFuZ2UoYnVmLCByYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBiYWNrZW5kLmRhdGFzdG9yZURlbGV0ZUJ5SW5kZXhTY2FuUmFuZ2VCc2F0bihcclxuICAgICAgICAgICAgICBpbmRleF9pZCxcclxuICAgICAgICAgICAgICBidWYuYnVmZmVyLFxyXG4gICAgICAgICAgICAgIC4uLmFyZ3NcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVNpbmdsZVBvaW50KGJ1ZiwgcmFuZ2UpO1xyXG4gICAgICAgICAgcmV0dXJuIGJhY2tlbmQuZGF0YXN0b3JlRGVsZXRlQnlJbmRleFNjYW5Qb2ludEJzYXRuKFxyXG4gICAgICAgICAgICBpbmRleF9pZCxcclxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICAgICAgcG9pbnRfbGVuXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgaWYgKGlzSGFzaEluZGV4KSB7XHJcbiAgICAgICAgaW5kZXggPSByYXdJbmRleDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbmRleCA9IHJhd0luZGV4O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzSGFzaEluZGV4KSB7XHJcbiAgICAgIGluZGV4ID0ge1xyXG4gICAgICAgIGZpbHRlcjogKHJhbmdlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcclxuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVBvaW50KGJ1ZiwgcmFuZ2UpO1xyXG4gICAgICAgICAgY29uc3QgaXRlcl9pZCA9IGJhY2tlbmQuZGF0YXN0b3JlSW5kZXhTY2FuUG9pbnRCc2F0bihcclxuICAgICAgICAgICAgaW5kZXhfaWQsXHJcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXHJcbiAgICAgICAgICAgIHBvaW50X2xlblxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJldHVybiB0YWJsZUl0ZXJhdG9yKGl0ZXJfaWQsIGRlc2VyaWFsaXplUm93LCBiYWNrZW5kKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZTogKHJhbmdlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcclxuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVBvaW50KGJ1ZiwgcmFuZ2UpO1xyXG4gICAgICAgICAgcmV0dXJuIGJhY2tlbmQuZGF0YXN0b3JlRGVsZXRlQnlJbmRleFNjYW5Qb2ludEJzYXRuKFxyXG4gICAgICAgICAgICBpbmRleF9pZCxcclxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICAgICAgcG9pbnRfbGVuXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGlzQ29tcGxldGVTY2FsYXJLZXkgPSAocmFuZ2UpID0+IHtcclxuICAgICAgICByZXR1cm4gcmFuZ2UubGVuZ3RoID09PSBudW1Db2x1bW5zICYmICEocmFuZ2VbcmFuZ2UubGVuZ3RoIC0gMV0gaW5zdGFuY2VvZiBSYW5nZSk7XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZVJhbmdlID0gKGJ1ZmZlciwgcmFuZ2UpID0+IHtcclxuICAgICAgICBpZiAocmFuZ2UubGVuZ3RoID4gbnVtQ29sdW1ucykgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRvbyBtYW55IGVsZW1lbnRzXCIpO1xyXG4gICAgICAgIEJJTkFSWV9XUklURVIucmVzZXQoYnVmZmVyKTtcclxuICAgICAgICBjb25zdCB3cml0ZXIgPSBCSU5BUllfV1JJVEVSO1xyXG4gICAgICAgIGNvbnN0IHByZWZpeF9lbGVtcyA9IHJhbmdlLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhfZWxlbXM7IGkrKykge1xyXG4gICAgICAgICAgaW5kZXhTZXJpYWxpemVyc1tpXSh3cml0ZXIsIHJhbmdlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcnN0YXJ0T2Zmc2V0ID0gd3JpdGVyLm9mZnNldDtcclxuICAgICAgICBjb25zdCB0ZXJtID0gcmFuZ2VbcmFuZ2UubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplVGVybSA9IGluZGV4U2VyaWFsaXplcnNbcmFuZ2UubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKHRlcm0gaW5zdGFuY2VvZiBSYW5nZSkge1xyXG4gICAgICAgICAgY29uc3Qgd3JpdGVCb3VuZCA9IChib3VuZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YWdzID0geyBpbmNsdWRlZDogMCwgZXhjbHVkZWQ6IDEsIHVuYm91bmRlZDogMiB9O1xyXG4gICAgICAgICAgICB3cml0ZXIud3JpdGVVOCh0YWdzW2JvdW5kLnRhZ10pO1xyXG4gICAgICAgICAgICBpZiAoYm91bmQudGFnICE9PSBcInVuYm91bmRlZFwiKSBzZXJpYWxpemVUZXJtKHdyaXRlciwgYm91bmQudmFsdWUpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHdyaXRlQm91bmQodGVybS5mcm9tKTtcclxuICAgICAgICAgIGNvbnN0IHJzdGFydExlbiA9IHdyaXRlci5vZmZzZXQgLSByc3RhcnRPZmZzZXQ7XHJcbiAgICAgICAgICB3cml0ZUJvdW5kKHRlcm0udG8pO1xyXG4gICAgICAgICAgY29uc3QgcmVuZExlbiA9IHdyaXRlci5vZmZzZXQgLSByc3RhcnRPZmZzZXQgLSByc3RhcnRMZW47XHJcbiAgICAgICAgICByZXR1cm4gW3JzdGFydE9mZnNldCwgcHJlZml4X2VsZW1zLCByc3RhcnRMZW4sIHJlbmRMZW5dO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3cml0ZXIud3JpdGVVOCgwKTtcclxuICAgICAgICAgIHNlcmlhbGl6ZVRlcm0od3JpdGVyLCB0ZXJtKTtcclxuICAgICAgICAgIGNvbnN0IHJzdGFydExlbiA9IHdyaXRlci5vZmZzZXQgLSByc3RhcnRPZmZzZXQ7XHJcbiAgICAgICAgICBjb25zdCByZW5kTGVuID0gMDtcclxuICAgICAgICAgIHJldHVybiBbcnN0YXJ0T2Zmc2V0LCBwcmVmaXhfZWxlbXMsIHJzdGFydExlbiwgcmVuZExlbl07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBpbmRleCA9IHtcclxuICAgICAgICBmaWx0ZXI6IChyYW5nZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJhbmdlKSkgcmFuZ2UgPSBbcmFuZ2VdO1xyXG4gICAgICAgICAgaWYgKGlzQ29tcGxldGVTY2FsYXJLZXkocmFuZ2UpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIHJhbmdlKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlcl9pZCA9IGJhY2tlbmQuZGF0YXN0b3JlSW5kZXhTY2FuUG9pbnRCc2F0bihcclxuICAgICAgICAgICAgICBpbmRleF9pZCxcclxuICAgICAgICAgICAgICBidWYuYnVmZmVyLFxyXG4gICAgICAgICAgICAgIHBvaW50X2xlblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdywgYmFja2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcclxuICAgICAgICAgICAgY29uc3QgYXJncyA9IHNlcmlhbGl6ZVJhbmdlKGJ1ZiwgcmFuZ2UpO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVyX2lkID0gYmFja2VuZC5kYXRhc3RvcmVJbmRleFNjYW5SYW5nZUJzYXRuKFxyXG4gICAgICAgICAgICAgIGluZGV4X2lkLFxyXG4gICAgICAgICAgICAgIGJ1Zi5idWZmZXIsXHJcbiAgICAgICAgICAgICAgLi4uYXJnc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdywgYmFja2VuZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGU6IChyYW5nZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJhbmdlKSkgcmFuZ2UgPSBbcmFuZ2VdO1xyXG4gICAgICAgICAgaWYgKGlzQ29tcGxldGVTY2FsYXJLZXkocmFuZ2UpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIHJhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhY2tlbmQuZGF0YXN0b3JlRGVsZXRlQnlJbmRleFNjYW5Qb2ludEJzYXRuKFxyXG4gICAgICAgICAgICAgIGluZGV4X2lkLFxyXG4gICAgICAgICAgICAgIGJ1Zi5idWZmZXIsXHJcbiAgICAgICAgICAgICAgcG9pbnRfbGVuXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcclxuICAgICAgICAgICAgY29uc3QgYXJncyA9IHNlcmlhbGl6ZVJhbmdlKGJ1ZiwgcmFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gYmFja2VuZC5kYXRhc3RvcmVEZWxldGVCeUluZGV4U2NhblJhbmdlQnNhdG4oXHJcbiAgICAgICAgICAgICAgaW5kZXhfaWQsXHJcbiAgICAgICAgICAgICAgYnVmLmJ1ZmZlcixcclxuICAgICAgICAgICAgICAuLi5hcmdzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5oYXNPd24odGFibGVWaWV3LCBhY2Nlc3Nvck5hbWUpKSB7XHJcbiAgICAgIGZyZWV6ZShPYmplY3QuYXNzaWduKHRhYmxlVmlld1thY2Nlc3Nvck5hbWVdLCBpbmRleCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFibGVWaWV3W2FjY2Vzc29yTmFtZV0gPSBmcmVlemUoaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZnJlZXplKHRhYmxlVmlldyk7XHJcbn1cclxuZnVuY3Rpb24qIHRhYmxlSXRlcmF0b3IoaWQsIGRlc2VyaWFsaXplLCBiYWNrZW5kID0gaG9zdEJhY2tlbmQpIHtcclxuICBjb25zdCBpdGVyID0gbmV3IEl0ZXJhdG9ySGFuZGxlKGlkLCBiYWNrZW5kKTtcclxuICBjb25zdCBpdGVyQnVmID0gdGFrZUJ1ZigpO1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgYW10O1xyXG4gICAgd2hpbGUgKGFtdCA9IGl0ZXIuYWR2YW5jZShpdGVyQnVmKSkge1xyXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgQmluYXJ5UmVhZGVyKGl0ZXJCdWYudmlldyk7XHJcbiAgICAgIHdoaWxlIChyZWFkZXIub2Zmc2V0IDwgYW10KSB7XHJcbiAgICAgICAgeWllbGQgZGVzZXJpYWxpemUocmVhZGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZmluYWxseSB7XHJcbiAgICBpdGVyW1N5bWJvbC5kaXNwb3NlXSgpO1xyXG4gICAgcmV0dXJuQnVmKGl0ZXJCdWYpO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiB0YWJsZUl0ZXJhdGVPbmUoaWQsIGRlc2VyaWFsaXplLCBiYWNrZW5kID0gaG9zdEJhY2tlbmQpIHtcclxuICBjb25zdCBidWYgPSBMRUFGX0JVRjtcclxuICBjb25zdCByZXQgPSBhZHZhbmNlSXRlclJhdyhpZCwgYnVmLCBiYWNrZW5kKTtcclxuICBpZiAocmV0ICE9PSAwKSB7XHJcbiAgICBCSU5BUllfUkVBREVSLnJlc2V0KGJ1Zi52aWV3KTtcclxuICAgIHJldHVybiBkZXNlcmlhbGl6ZShCSU5BUllfUkVBREVSKTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuZnVuY3Rpb24gYWR2YW5jZUl0ZXJSYXcoaWQsIGJ1ZiwgYmFja2VuZCA9IGhvc3RCYWNrZW5kKSB7XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiAwIHwgYmFja2VuZC5yb3dJdGVyQnNhdG5BZHZhbmNlKGlkLCBidWYuYnVmZmVyKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKGUgJiYgdHlwZW9mIGUgPT09IFwib2JqZWN0XCIgJiYgaGFzT3duKGUsIFwiX19idWZmZXJfdG9vX3NtYWxsX19cIikpIHtcclxuICAgICAgICBidWYuZ3JvdyhlLl9fYnVmZmVyX3Rvb19zbWFsbF9fKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG52YXIgREVGQVVMVF9CVUZGRVJfQ0FQQUNJVFkgPSAzMiAqIDEwMjQgKiAyO1xyXG52YXIgSVRFUl9CVUZTID0gW1xyXG4gIG5ldyBSZXNpemFibGVCdWZmZXIoREVGQVVMVF9CVUZGRVJfQ0FQQUNJVFkpXHJcbl07XHJcbnZhciBJVEVSX0JVRl9DT1VOVCA9IDE7XHJcbmZ1bmN0aW9uIHRha2VCdWYoKSB7XHJcbiAgcmV0dXJuIElURVJfQlVGX0NPVU5UID8gSVRFUl9CVUZTWy0tSVRFUl9CVUZfQ09VTlRdIDogbmV3IFJlc2l6YWJsZUJ1ZmZlcihERUZBVUxUX0JVRkZFUl9DQVBBQ0lUWSk7XHJcbn1cclxuZnVuY3Rpb24gcmV0dXJuQnVmKGJ1Zikge1xyXG4gIElURVJfQlVGU1tJVEVSX0JVRl9DT1VOVCsrXSA9IGJ1ZjtcclxufVxyXG52YXIgTEVBRl9CVUYgPSBuZXcgUmVzaXphYmxlQnVmZmVyKERFRkFVTFRfQlVGRkVSX0NBUEFDSVRZKTtcclxudmFyIEl0ZXJhdG9ySGFuZGxlID0gY2xhc3MgX0l0ZXJhdG9ySGFuZGxlIHtcclxuICAjaWQ7XHJcbiAgI2JhY2tlbmQ7XHJcbiAgc3RhdGljICNmaW5hbGl6YXRpb25SZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoeyBpZCwgYmFja2VuZCB9KSA9PiBiYWNrZW5kLnJvd0l0ZXJCc2F0bkNsb3NlKGlkKSk7XHJcbiAgY29uc3RydWN0b3IoaWQsIGJhY2tlbmQgPSBob3N0QmFja2VuZCkge1xyXG4gICAgdGhpcy4jaWQgPSBpZDtcclxuICAgIHRoaXMuI2JhY2tlbmQgPSBiYWNrZW5kO1xyXG4gICAgX0l0ZXJhdG9ySGFuZGxlLiNmaW5hbGl6YXRpb25SZWdpc3RyeS5yZWdpc3Rlcih0aGlzLCB7IGlkLCBiYWNrZW5kIH0sIHRoaXMpO1xyXG4gIH1cclxuICAvKiogVW5yZWdpc3RlciB0aGlzIG9iamVjdCB3aXRoIHRoZSBmaW5hbGl6YXRpb24gcmVnaXN0cnkgYW5kIHJldHVybiB0aGUgaWQgKi9cclxuICAjZGV0YWNoKCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLiNpZDtcclxuICAgIHRoaXMuI2lkID0gLTE7XHJcbiAgICBfSXRlcmF0b3JIYW5kbGUuI2ZpbmFsaXphdGlvblJlZ2lzdHJ5LnVucmVnaXN0ZXIodGhpcyk7XHJcbiAgICByZXR1cm4gaWQ7XHJcbiAgfVxyXG4gIC8qKiBDYWxsIGByb3dfaXRlcl9ic2F0bl9hZHZhbmNlYCwgcmV0dXJuaW5nIDAgaWYgdGhpcyBpdGVyYXRvciBoYXMgYmVlbiBleGhhdXN0ZWQuICovXHJcbiAgYWR2YW5jZShidWYpIHtcclxuICAgIGlmICh0aGlzLiNpZCA9PT0gLTEpIHJldHVybiAwO1xyXG4gICAgY29uc3QgcmV0ID0gYWR2YW5jZUl0ZXJSYXcodGhpcy4jaWQsIGJ1ZiwgdGhpcy4jYmFja2VuZCk7XHJcbiAgICBpZiAocmV0IDw9IDApIHRoaXMuI2RldGFjaCgpO1xyXG4gICAgcmV0dXJuIHJldCA8IDAgPyAtcmV0IDogcmV0O1xyXG4gIH1cclxuICBbU3ltYm9sLmRpc3Bvc2VdKCkge1xyXG4gICAgaWYgKHRoaXMuI2lkID49IDApIHtcclxuICAgICAgY29uc3QgaWQgPSB0aGlzLiNkZXRhY2goKTtcclxuICAgICAgdGhpcy4jYmFja2VuZC5yb3dJdGVyQnNhdG5DbG9zZShpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL3NlcnZlci9odHRwX2ludGVybmFsLnRzXHJcbnZhciB7IGZyZWV6ZTogZnJlZXplMiB9ID0gT2JqZWN0O1xyXG52YXIgcmVxdWVzdEJhc2VTaXplID0gYnNhdG5CYXNlU2l6ZSh7IHR5cGVzOiBbXSB9LCBIdHRwUmVxdWVzdC5hbGdlYnJhaWNUeXBlKTtcclxuZnVuY3Rpb24gZmV0Y2godXJsLCBpbml0ID0ge30pIHtcclxuICBjb25zdCBtZXRob2QgPSBzZXJpYWxpemVNZXRob2QoaW5pdC5tZXRob2QpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzZXJpYWxpemVIZWFkZXJzKG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycykpO1xyXG4gIGNvbnN0IHVyaSA9IFwiXCIgKyB1cmw7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGZyZWV6ZTIoe1xyXG4gICAgbWV0aG9kLFxyXG4gICAgaGVhZGVycyxcclxuICAgIHRpbWVvdXQ6IGluaXQudGltZW91dCxcclxuICAgIHVyaSxcclxuICAgIHZlcnNpb246IHsgdGFnOiBcIkh0dHAxMVwiIH1cclxuICB9KTtcclxuICBjb25zdCByZXF1ZXN0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXF1ZXN0QmFzZVNpemUpO1xyXG4gIEh0dHBSZXF1ZXN0LnNlcmlhbGl6ZShyZXF1ZXN0QnVmLCByZXF1ZXN0KTtcclxuICBjb25zdCBib2R5ID0gaW5pdC5ib2R5ID09IG51bGwgPyBuZXcgVWludDhBcnJheSgpIDogdHlwZW9mIGluaXQuYm9keSA9PT0gXCJzdHJpbmdcIiA/IGluaXQuYm9keSA6IG5ldyBVaW50OEFycmF5KGluaXQuYm9keSk7XHJcbiAgY29uc3QgW3Jlc3BvbnNlQnVmLCByZXNwb25zZUJvZHldID0gc3lzMi5wcm9jZWR1cmVfaHR0cF9yZXF1ZXN0KFxyXG4gICAgcmVxdWVzdEJ1Zi5nZXRCdWZmZXIoKSxcclxuICAgIGJvZHlcclxuICApO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gSHR0cFJlc3BvbnNlLmRlc2VyaWFsaXplKG5ldyBCaW5hcnlSZWFkZXIocmVzcG9uc2VCdWYpKTtcclxuICByZXR1cm4gU3luY1Jlc3BvbnNlW21ha2VSZXNwb25zZV0ocmVzcG9uc2VCb2R5LCB7XHJcbiAgICB0eXBlOiBcImJhc2ljXCIsXHJcbiAgICB1cmw6IHVyaSxcclxuICAgIHN0YXR1czogcmVzcG9uc2UuY29kZSxcclxuICAgIC8vIGBzdGF0dXMoY29kZSlgIHRocm93cyBmb3IgY29kZXMgaXQgZG9lc24ndCBrbm93LCBsaWtlIENsb3VkZmxhcmUncyA1MzAuXHJcbiAgICBzdGF0dXNUZXh0OiBpbXBvcnRfc3RhdHVzZXMuZGVmYXVsdC5tZXNzYWdlW3Jlc3BvbnNlLmNvZGVdID8/IFwiXCIsXHJcbiAgICBoZWFkZXJzOiBkZXNlcmlhbGl6ZUhlYWRlcnMocmVzcG9uc2UuaGVhZGVycyksXHJcbiAgICBhYm9ydGVkOiBmYWxzZSxcclxuICAgIHZlcnNpb246IHJlc3BvbnNlLnZlcnNpb25cclxuICB9KTtcclxufVxyXG5mcmVlemUyKGZldGNoKTtcclxudmFyIGh0dHBDbGllbnQgPSBmcmVlemUyKHsgZmV0Y2ggfSk7XHJcblxyXG4vLyBzcmMvc2VydmVyL3Byb2NlZHVyZXMudHNcclxuZnVuY3Rpb24gbWFrZVByb2NlZHVyZUV4cG9ydChjdHgsIG9wdHMsIHBhcmFtcywgcmV0LCBmbikge1xyXG4gIGNvbnN0IG5hbWUgPSBvcHRzPy5uYW1lO1xyXG4gIGNvbnN0IHByb2NlZHVyZUV4cG9ydCA9ICguLi5hcmdzKSA9PiBmbiguLi5hcmdzKTtcclxuICBwcm9jZWR1cmVFeHBvcnRbZXhwb3J0Q29udGV4dF0gPSBjdHg7XHJcbiAgcHJvY2VkdXJlRXhwb3J0W3JlZ2lzdGVyRXhwb3J0XSA9IChjdHgyLCBleHBvcnROYW1lKSA9PiB7XHJcbiAgICByZWdpc3RlclByb2NlZHVyZShjdHgyLCBuYW1lID8/IGV4cG9ydE5hbWUsIHBhcmFtcywgcmV0LCBmbik7XHJcbiAgICBjdHgyLmZ1bmN0aW9uRXhwb3J0cy5zZXQoXHJcbiAgICAgIHByb2NlZHVyZUV4cG9ydCxcclxuICAgICAgbmFtZSA/PyBleHBvcnROYW1lXHJcbiAgICApO1xyXG4gICAgaWYgKG9wdHM/Lm9uU2NoZWR1bGUgIT09IHZvaWQgMCkge1xyXG4gICAgICBjdHgyLnBlbmRpbmdTY2hlZHVsZXMucHVzaCh7XHJcbiAgICAgICAgdGFibGU6IG9wdHMub25TY2hlZHVsZSxcclxuICAgICAgICBmdW5jdGlvbk5hbWU6IG5hbWUgPz8gZXhwb3J0TmFtZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiBwcm9jZWR1cmVFeHBvcnQ7XHJcbn1cclxuZnVuY3Rpb24gcmVnaXN0ZXJQcm9jZWR1cmUoY3R4LCBleHBvcnROYW1lLCBwYXJhbXMsIHJldCwgZm4sIG9wdHMpIHtcclxuICBjdHguZGVmaW5lRnVuY3Rpb24oZXhwb3J0TmFtZSk7XHJcbiAgY29uc3QgcGFyYW1zVHlwZSA9IHtcclxuICAgIGVsZW1lbnRzOiBPYmplY3QuZW50cmllcyhwYXJhbXMpLm1hcCgoW24sIGNdKSA9PiAoe1xyXG4gICAgICBuYW1lOiBuLFxyXG4gICAgICBhbGdlYnJhaWNUeXBlOiBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KFxyXG4gICAgICAgIFwidHlwZUJ1aWxkZXJcIiBpbiBjID8gYy50eXBlQnVpbGRlciA6IGNcclxuICAgICAgKS5hbGdlYnJhaWNUeXBlXHJcbiAgICB9KSlcclxuICB9O1xyXG4gIGNvbnN0IHJldHVyblR5cGUgPSBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJldCkuYWxnZWJyYWljVHlwZTtcclxuICBjdHgubW9kdWxlRGVmLnByb2NlZHVyZXMucHVzaCh7XHJcbiAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxyXG4gICAgcGFyYW1zOiBwYXJhbXNUeXBlLFxyXG4gICAgcmV0dXJuVHlwZSxcclxuICAgIHZpc2liaWxpdHk6IEZ1bmN0aW9uVmlzaWJpbGl0eS5DbGllbnRDYWxsYWJsZVxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgdHlwZXNwYWNlIH0gPSBjdHg7XHJcbiAgY3R4LnByb2NlZHVyZXMucHVzaCh7XHJcbiAgICBmbixcclxuICAgIGRlc2VyaWFsaXplQXJnczogUHJvZHVjdFR5cGUubWFrZURlc2VyaWFsaXplcihwYXJhbXNUeXBlLCB0eXBlc3BhY2UpLFxyXG4gICAgc2VyaWFsaXplUmV0dXJuOiBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKHJldHVyblR5cGUsIHR5cGVzcGFjZSksXHJcbiAgICByZXR1cm5UeXBlQmFzZVNpemU6IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCByZXR1cm5UeXBlKVxyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGNhbGxQcm9jZWR1cmUocHJvY2VkdXJlcywgaWQsIHNlbmRlciwgY29ubmVjdGlvbklkLCB0aW1lc3RhbXAsIGFyZ3NCdWYsIGRiVmlldywgZGlzcGF0Y2hlcyA9IFtdLCBwYXJlbnRQcmVmaXggPSBcIlwiKSB7XHJcbiAgY29uc3QgeyBmbiwgZGVzZXJpYWxpemVBcmdzLCBzZXJpYWxpemVSZXR1cm4sIHJldHVyblR5cGVCYXNlU2l6ZSB9ID0gcHJvY2VkdXJlc1tpZF07XHJcbiAgY29uc3QgYXJncyA9IGRlc2VyaWFsaXplQXJncyhuZXcgQmluYXJ5UmVhZGVyKGFyZ3NCdWYpKTtcclxuICBjb25zdCBjdHggPSBuZXcgUHJvY2VkdXJlQ3R4SW1wbChcclxuICAgIHNlbmRlcixcclxuICAgIHRpbWVzdGFtcCxcclxuICAgIGNvbm5lY3Rpb25JZCxcclxuICAgIGRiVmlldyxcclxuICAgIGhvc3RCYWNrZW5kLFxyXG4gICAgaHR0cENsaWVudCxcclxuICAgIHZvaWQgMCxcclxuICAgIHZvaWQgMCxcclxuICAgIHZvaWQgMCxcclxuICAgIGRpc3BhdGNoZXMsXHJcbiAgICBwYXJlbnRQcmVmaXhcclxuICApO1xyXG4gIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XHJcbiAgY29uc3QgcmV0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXR1cm5UeXBlQmFzZVNpemUpO1xyXG4gIHNlcmlhbGl6ZVJldHVybihyZXRCdWYsIHJldCk7XHJcbiAgcmV0dXJuIHJldEJ1Zi5nZXRCdWZmZXIoKTtcclxufVxyXG52YXIgUHJvY2VkdXJlQ3R4SW1wbCA9IGNsYXNzIFByb2NlZHVyZUN0eCB7XHJcbiAgY29uc3RydWN0b3Ioc2VuZGVyLCB0aW1lc3RhbXAsIGNvbm5lY3Rpb25JZCwgZGJWaWV3LCBiYWNrZW5kID0gaG9zdEJhY2tlbmQsIGh0dHAgPSBodHRwQ2xpZW50LCBzbGVlcCA9ICgpID0+IHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInByb2NlZHVyZSBzbGVlcCBpcyBub3QgYXZhaWxhYmxlIGluIHRoaXMgcnVudGltZVwiKTtcclxuICB9LCByYW5kb20sIGNoaWxkU2VlZFJhbmRvbSwgZGlzcGF0Y2hlcyA9IFtdLCBwYXJlbnRQcmVmaXggPSBcIlwiKSB7XHJcbiAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcclxuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgdGhpcy5jb25uZWN0aW9uSWQgPSBjb25uZWN0aW9uSWQ7XHJcbiAgICB0aGlzLiNkYlZpZXcgPSBkYlZpZXc7XHJcbiAgICB0aGlzLiNiYWNrZW5kID0gYmFja2VuZDtcclxuICAgIHRoaXMuI2h0dHAgPSBodHRwO1xyXG4gICAgdGhpcy4jc2xlZXAgPSBzbGVlcDtcclxuICAgIHRoaXMuI3JhbmRvbSA9IHJhbmRvbTtcclxuICAgIHRoaXMuI2NoaWxkU2VlZFJhbmRvbSA9IGNoaWxkU2VlZFJhbmRvbTtcclxuICAgIHRoaXMuI2Rpc3BhdGNoZXMgPSBkaXNwYXRjaGVzO1xyXG4gICAgdGhpcy4jcGFyZW50UHJlZml4ID0gcGFyZW50UHJlZml4O1xyXG4gIH1cclxuICAjaWRlbnRpdHk7XHJcbiAgI3V1aWRDb3VudGVyO1xyXG4gICNyYW5kb207XHJcbiAgI2RiVmlldztcclxuICAjYmFja2VuZDtcclxuICAjaHR0cDtcclxuICAjc2xlZXA7XHJcbiAgI2NoaWxkU2VlZFJhbmRvbTtcclxuICBlbnYgPSBlbnZpcm9ubWVudDtcclxuICAjZGlzcGF0Y2hlcztcclxuICAjcGFyZW50UHJlZml4O1xyXG4gICNhc1ZpZXdzO1xyXG4gIGdldCBkYXRhYmFzZUlkZW50aXR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2lkZW50aXR5ID8/PSBuZXcgSWRlbnRpdHkodGhpcy4jYmFja2VuZC5pZGVudGl0eSgpKTtcclxuICB9XHJcbiAgZ2V0IGlkZW50aXR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2VJZGVudGl0eTtcclxuICB9XHJcbiAgZ2V0IHJhbmRvbSgpIHtcclxuICAgIHJldHVybiB0aGlzLiNyYW5kb20gPz89IG1ha2VSYW5kb20odGhpcy50aW1lc3RhbXApO1xyXG4gIH1cclxuICBnZXQgaHR0cCgpIHtcclxuICAgIHJldHVybiB0aGlzLiNodHRwO1xyXG4gIH1cclxuICBzbGVlcChkdXJhdGlvbikge1xyXG4gICAgdGhpcy4jc2xlZXAoZHVyYXRpb24pO1xyXG4gIH1cclxuICBnZXQgYXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jYXNWaWV3cyA/Pz0gYnVpbGRQcm9jZWR1cmVBbGlhc0N0eE1hcChcclxuICAgICAgdGhpcyxcclxuICAgICAgdGhpcy4jZGlzcGF0Y2hlcyxcclxuICAgICAgdGhpcy4jcGFyZW50UHJlZml4XHJcbiAgICApO1xyXG4gIH1cclxuICB3aXRoVHgoYm9keSkge1xyXG4gICAgY29uc3QgdHhTZWVkID0gdGhpcy4jY2hpbGRTZWVkUmFuZG9tPy5iaWdpbnRJblJhbmdlKDBuLCAoMW4gPDwgNjRuKSAtIDFuKTtcclxuICAgIGNvbnN0IGRpc3BhdGNoZXMgPSB0aGlzLiNkaXNwYXRjaGVzO1xyXG4gICAgY29uc3QgcGFyZW50UHJlZml4ID0gdGhpcy4jcGFyZW50UHJlZml4O1xyXG4gICAgcmV0dXJuIHJ1bldpdGhUeChcclxuICAgICAgKHRpbWVzdGFtcCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHR4ID0gbmV3IFJlZHVjZXJDdHhJbXBsKFxyXG4gICAgICAgICAgdGhpcy5zZW5kZXIsXHJcbiAgICAgICAgICB0aW1lc3RhbXAsXHJcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCxcclxuICAgICAgICAgIHRoaXMuI2RiVmlldygpLFxyXG4gICAgICAgICAgdGhpcy4jYmFja2VuZCxcclxuICAgICAgICAgIHZvaWQgMCxcclxuICAgICAgICAgIHR4U2VlZCA9PSBudWxsID8gdm9pZCAwIDogbWFrZVJhbmRvbUZyb21TZWVkKHR4U2VlZClcclxuICAgICAgICApO1xyXG4gICAgICAgIGFzc2lnblR4QWxpYXNWaWV3cyh0eCwgZGlzcGF0Y2hlcywgcGFyZW50UHJlZml4KTtcclxuICAgICAgICByZXR1cm4gdHg7XHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHksXHJcbiAgICAgIHRoaXMuI2JhY2tlbmRcclxuICAgICk7XHJcbiAgfVxyXG4gIG5ld1V1aWRWNCgpIHtcclxuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSgxNikpO1xyXG4gICAgcmV0dXJuIFV1aWQuZnJvbVJhbmRvbUJ5dGVzVjQoYnl0ZXMpO1xyXG4gIH1cclxuICBuZXdVdWlkVjcoKSB7XHJcbiAgICBjb25zdCBieXRlcyA9IHRoaXMucmFuZG9tLmZpbGwobmV3IFVpbnQ4QXJyYXkoNCkpO1xyXG4gICAgY29uc3QgY291bnRlciA9IHRoaXMuI3V1aWRDb3VudGVyID8/PSB7IHZhbHVlOiAwIH07XHJcbiAgICByZXR1cm4gVXVpZC5mcm9tQ291bnRlclY3KGNvdW50ZXIsIHRoaXMudGltZXN0YW1wLCBieXRlcyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL3NlcnZlci9yZWR1Y2Vycy50c1xyXG5mdW5jdGlvbiBtYWtlUmVkdWNlckV4cG9ydChjdHgsIG9wdHMsIHBhcmFtcywgZm4sIGxpZmVjeWNsZSkge1xyXG4gIGNvbnN0IHJlZHVjZXJFeHBvcnQgPSAoLi4uYXJncykgPT4gZm4oLi4uYXJncyk7XHJcbiAgcmVkdWNlckV4cG9ydFtleHBvcnRDb250ZXh0XSA9IGN0eDtcclxuICByZWR1Y2VyRXhwb3J0W3JlZ2lzdGVyRXhwb3J0XSA9IChjdHgyLCBleHBvcnROYW1lKSA9PiB7XHJcbiAgICByZWdpc3RlclJlZHVjZXIoY3R4MiwgZXhwb3J0TmFtZSwgcGFyYW1zLCBmbiwgb3B0cywgbGlmZWN5Y2xlKTtcclxuICAgIGN0eDIuZnVuY3Rpb25FeHBvcnRzLnNldChcclxuICAgICAgcmVkdWNlckV4cG9ydCxcclxuICAgICAgZXhwb3J0TmFtZVxyXG4gICAgKTtcclxuICAgIGlmIChvcHRzPy5vblNjaGVkdWxlICE9PSB2b2lkIDApIHtcclxuICAgICAgY3R4Mi5wZW5kaW5nU2NoZWR1bGVzLnB1c2goe1xyXG4gICAgICAgIHRhYmxlOiBvcHRzLm9uU2NoZWR1bGUsXHJcbiAgICAgICAgZnVuY3Rpb25OYW1lOiBleHBvcnROYW1lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIHJlZHVjZXJFeHBvcnQ7XHJcbn1cclxuZnVuY3Rpb24gcmVnaXN0ZXJSZWR1Y2VyKGN0eCwgZXhwb3J0TmFtZSwgcGFyYW1zLCBmbiwgb3B0cywgbGlmZWN5Y2xlKSB7XHJcbiAgY3R4LmRlZmluZUZ1bmN0aW9uKGV4cG9ydE5hbWUpO1xyXG4gIGlmICghKHBhcmFtcyBpbnN0YW5jZW9mIFJvd0J1aWxkZXIpKSB7XHJcbiAgICBwYXJhbXMgPSBuZXcgUm93QnVpbGRlcihwYXJhbXMpO1xyXG4gIH1cclxuICBpZiAocGFyYW1zLnR5cGVOYW1lID09PSB2b2lkIDApIHtcclxuICAgIHBhcmFtcy50eXBlTmFtZSA9IHRvUGFzY2FsQ2FzZShleHBvcnROYW1lKTtcclxuICB9XHJcbiAgY29uc3QgcmVmID0gY3R4LnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShwYXJhbXMpO1xyXG4gIGNvbnN0IHBhcmFtc1R5cGUgPSBjdHgucmVzb2x2ZVR5cGUocmVmKS52YWx1ZTtcclxuICBjb25zdCBpc0xpZmVjeWNsZSA9IGxpZmVjeWNsZSAhPSBudWxsO1xyXG4gIGN0eC5tb2R1bGVEZWYucmVkdWNlcnMucHVzaCh7XHJcbiAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxyXG4gICAgcGFyYW1zOiBwYXJhbXNUeXBlLFxyXG4gICAgLy9Nb2R1bGVEZWYgdmFsaWRhdGlvbiBjb2RlIGlzIHJlc3BvbnNpYmxlIHRvIG1hcmsgcHJpdmF0ZSByZWR1Y2Vyc1xyXG4gICAgdmlzaWJpbGl0eTogRnVuY3Rpb25WaXNpYmlsaXR5LkNsaWVudENhbGxhYmxlLFxyXG4gICAgLy9IYXJkY29kZWQgZm9yIG5vdyAtIHJlZHVjZXJzIGRvIG5vdCByZXR1cm4gdmFsdWVzIHlldFxyXG4gICAgb2tSZXR1cm5UeXBlOiBBbGdlYnJhaWNUeXBlLlByb2R1Y3QoeyBlbGVtZW50czogW10gfSksXHJcbiAgICBlcnJSZXR1cm5UeXBlOiBBbGdlYnJhaWNUeXBlLlN0cmluZ1xyXG4gIH0pO1xyXG4gIGlmIChvcHRzPy5uYW1lICE9IG51bGwpIHtcclxuICAgIGN0eC5tb2R1bGVEZWYuZXhwbGljaXROYW1lcy5lbnRyaWVzLnB1c2goe1xyXG4gICAgICB0YWc6IFwiRnVuY3Rpb25cIixcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxyXG4gICAgICAgIGNhbm9uaWNhbE5hbWU6IG9wdHMubmFtZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKGlzTGlmZWN5Y2xlKSB7XHJcbiAgICBjdHgubW9kdWxlRGVmLmxpZmVDeWNsZVJlZHVjZXJzLnB1c2goe1xyXG4gICAgICBsaWZlY3ljbGVTcGVjOiBsaWZlY3ljbGUsXHJcbiAgICAgIGZ1bmN0aW9uTmFtZTogZXhwb3J0TmFtZVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGlmICghZm4ubmFtZSkge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcIm5hbWVcIiwgeyB2YWx1ZTogZXhwb3J0TmFtZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xyXG4gIH1cclxuICBjdHgucmVkdWNlcnMucHVzaChmbik7XHJcbn1cclxuXHJcbi8vIHNyYy9zZXJ2ZXIvc2NoZW1hLnRzXHJcbnZhciBTY2hlbWFJbm5lciA9IGNsYXNzIGV4dGVuZHMgTW9kdWxlQ29udGV4dCB7XHJcbiAgc2NoZW1hVHlwZTtcclxuICBleHBvcnRzUmVnaXN0ZXJlZCA9IGZhbHNlO1xyXG4gIHNjaGVkdWxlc1Jlc29sdmVkID0gZmFsc2U7XHJcbiAgZXhpc3RpbmdGdW5jdGlvbnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xyXG4gIGV4aXN0aW5nSHR0cEhhbmRsZXJzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcclxuICByZWR1Y2VycyA9IFtdO1xyXG4gIHByb2NlZHVyZXMgPSBbXTtcclxuICB2aWV3cyA9IFtdO1xyXG4gIGFub25WaWV3cyA9IFtdO1xyXG4gIGh0dHBIYW5kbGVycyA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIE1hcHMgcmVkdWNlci9wcm9jZWR1cmUgZXhwb3J0IG9iamVjdHMgdG8gdGhlaXIgc291cmNlIG5hbWVzLlxyXG4gICAqIFVzZWQgZm9yIHJlc29sdmluZyBzY2hlZHVsZWQgdGFibGUgdGFyZ2V0cy5cclxuICAgKi9cclxuICBmdW5jdGlvbkV4cG9ydHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xyXG4gIHRhYmxlU291cmNlTmFtZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xyXG4gIGh0dHBIYW5kbGVyRXhwb3J0cyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XHJcbiAgcGVuZGluZ1NjaGVkdWxlcyA9IFtdO1xyXG4gIHBlbmRpbmdIdHRwUm91dGVzID0gW107XHJcbiAgc3VibW9kdWxlRGlzcGF0Y2hJbmZvcyA9IFtdO1xyXG4gIGNvbnN0cnVjdG9yKGdldFNjaGVtYVR5cGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnNjaGVtYVR5cGUgPSBnZXRTY2hlbWFUeXBlKHRoaXMpO1xyXG4gIH1cclxuICBkZWZpbmVGdW5jdGlvbihuYW1lKSB7XHJcbiAgICBpZiAodGhpcy5leGlzdGluZ0Z1bmN0aW9ucy5oYXMobmFtZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICBgVGhlcmUgaXMgYWxyZWFkeSBhIHJlZHVjZXIsIHByb2NlZHVyZSwgb3IgdmlldyB3aXRoIHRoZSBuYW1lICcke25hbWV9J2BcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHRoaXMuZXhpc3RpbmdGdW5jdGlvbnMuYWRkKG5hbWUpO1xyXG4gIH1cclxuICBkZWZpbmVIdHRwSGFuZGxlcihuYW1lKSB7XHJcbiAgICBpZiAodGhpcy5leGlzdGluZ0h0dHBIYW5kbGVycy5oYXMobmFtZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICBgVGhlcmUgaXMgYWxyZWFkeSBhbiBIVFRQIGhhbmRsZXIgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfSdgXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmV4aXN0aW5nSHR0cEhhbmRsZXJzLmFkZChuYW1lKTtcclxuICB9XHJcbiAgcmVzb2x2ZVNjaGVkdWxlcygpIHtcclxuICAgIGlmICh0aGlzLnNjaGVkdWxlc1Jlc29sdmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2NoZWR1bGVzUmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgY29uc3Qgc2NoZWR1bGVkVGFibGVzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcclxuICAgIGZvciAoY29uc3Qge1xyXG4gICAgICBmdW5jdGlvbk5hbWU6IGtub3duRnVuY3Rpb25OYW1lLFxyXG4gICAgICByZWR1Y2VyLFxyXG4gICAgICB0YWJsZTogdGFibGUyLFxyXG4gICAgICB0YWJsZU5hbWU6IGtub3duVGFibGVOYW1lLFxyXG4gICAgICBzY2hlZHVsZUF0Q29sOiBrbm93blNjaGVkdWxlQXRDb2xcclxuICAgIH0gb2YgdGhpcy5wZW5kaW5nU2NoZWR1bGVzKSB7XHJcbiAgICAgIGxldCB0YWJsZU5hbWUgPSBrbm93blRhYmxlTmFtZTtcclxuICAgICAgaWYgKHRhYmxlTmFtZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgY29uc3QgdGFibGVOYW1lcyA9IHRoaXMudGFibGVTb3VyY2VOYW1lcy5nZXQodGFibGUyKTtcclxuICAgICAgICBpZiAodGFibGVOYW1lcyAhPT0gdm9pZCAwICYmIHRhYmxlTmFtZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgXCJTY2hlZHVsZSB0YXJnZXQgdGFibGUgaXMgcmVnaXN0ZXJlZCBtb3JlIHRoYW4gb25jZSBpbiB0aGlzIHNjaGVtYS4gVXNlIGEgZGlzdGluY3QgdGFibGUgaGFuZGxlIGZvciBlYWNoIHNjaGVkdWxlZCB0YWJsZS5cIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFibGVOYW1lID0gdGFibGVOYW1lcz8uWzBdO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0YWJsZU5hbWUgPT09IHZvaWQgMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICBcIlNjaGVkdWxlIHRhcmdldCB0YWJsZSBpcyBub3QgcGFydCBvZiB0aGlzIHNjaGVtYS5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc2NoZWR1bGVBdENvbCA9IGtub3duU2NoZWR1bGVBdENvbCA/PyB0YWJsZTIuc2NoZWR1bGVBdENvbDtcclxuICAgICAgaWYgKHNjaGVkdWxlQXRDb2wgPT09IHZvaWQgMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICBgVGFibGUgJHt0YWJsZU5hbWV9IGRlZmluZXMgYSBzY2hlZHVsZSwgYnV0IGl0IGRvZXMgbm90IGhhdmUgYSBTY2hlZHVsZUF0IGNvbHVtbi5gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSBrbm93bkZ1bmN0aW9uTmFtZSA/PyAocmVkdWNlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGhpcy5mdW5jdGlvbkV4cG9ydHMuZ2V0KHJlZHVjZXIoKSkpO1xyXG4gICAgICBpZiAoZnVuY3Rpb25OYW1lID09PSB2b2lkIDApIHtcclxuICAgICAgICBjb25zdCBtc2cgPSBgVGFibGUgJHt0YWJsZU5hbWV9IGRlZmluZXMgYSBzY2hlZHVsZSwgYnV0IGl0IHNlZW1zIGxpa2UgdGhlIGFzc29jaWF0ZWQgZnVuY3Rpb24gd2FzIG5vdCBleHBvcnRlZC5gO1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IobXNnKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBleGlzdGluZ0Z1bmN0aW9uTmFtZSA9IHNjaGVkdWxlZFRhYmxlcy5nZXQodGFibGVOYW1lKTtcclxuICAgICAgaWYgKGV4aXN0aW5nRnVuY3Rpb25OYW1lICE9PSB2b2lkIDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgICAgYFRhYmxlICR7dGFibGVOYW1lfSBkZWZpbmVzIG11bHRpcGxlIHNjaGVkdWxlczogJHtleGlzdGluZ0Z1bmN0aW9uTmFtZX0gYW5kICR7ZnVuY3Rpb25OYW1lfS4gQSBzY2hlZHVsZSB0YWJsZSBjYW4gb25seSBiZSB1c2VkIGJ5IG9uZSByZWR1Y2VyIG9yIHByb2NlZHVyZS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBzY2hlZHVsZWRUYWJsZXMuc2V0KHRhYmxlTmFtZSwgZnVuY3Rpb25OYW1lKTtcclxuICAgICAgdGhpcy5tb2R1bGVEZWYuc2NoZWR1bGVzLnB1c2goe1xyXG4gICAgICAgIHNvdXJjZU5hbWU6IHZvaWQgMCxcclxuICAgICAgICB0YWJsZU5hbWUsXHJcbiAgICAgICAgc2NoZWR1bGVBdENvbCxcclxuICAgICAgICBmdW5jdGlvbk5hbWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlc29sdmVIdHRwUm91dGVzKCkge1xyXG4gICAgZm9yIChjb25zdCByb3V0ZSBvZiB0aGlzLnBlbmRpbmdIdHRwUm91dGVzKSB7XHJcbiAgICAgIGNvbnN0IGhhbmRsZXJGdW5jdGlvbiA9IHRoaXMuaHR0cEhhbmRsZXJFeHBvcnRzLmdldChyb3V0ZS5oYW5kbGVyKTtcclxuICAgICAgaWYgKGhhbmRsZXJGdW5jdGlvbiA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgIGBIVFRQIHJvdXRlIGZvciBwYXRoICcke3JvdXRlLnBhdGh9JyByZWZlcnMgdG8gYSBoYW5kbGVyIHRoYXQgd2FzIG5vdCBleHBvcnRlZC5gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1vZHVsZURlZi5odHRwUm91dGVzLnB1c2goe1xyXG4gICAgICAgIGhhbmRsZXJGdW5jdGlvbixcclxuICAgICAgICBtZXRob2Q6IHJvdXRlLm1ldGhvZCxcclxuICAgICAgICBwYXRoOiByb3V0ZS5wYXRoXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxudmFyIFNjaGVtYSA9IGNsYXNzIHtcclxuICAjY3R4O1xyXG4gIGNvbnN0cnVjdG9yKGN0eCkge1xyXG4gICAgdGhpcy4jY3R4ID0gY3R4O1xyXG4gIH1cclxuICBbbW9kdWxlSG9va3NdKGV4cG9ydHMpIHtcclxuICAgIHRoaXMuYnVpbGRSYXdNb2R1bGVEZWZWMTAoZXhwb3J0cyk7XHJcbiAgICB0aGlzLiNjdHgucmVzb2x2ZUh0dHBSb3V0ZXMoKTtcclxuICAgIHJldHVybiBtYWtlSG9va3ModGhpcy4jY3R4KTtcclxuICB9XHJcbiAgZ2V0IHNjaGVtYVR5cGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jY3R4LnNjaGVtYVR5cGU7XHJcbiAgfVxyXG4gIGdldCBtb2R1bGVEZWYoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jY3R4Lm1vZHVsZURlZjtcclxuICB9XHJcbiAgZ2V0IHR5cGVzcGFjZSgpIHtcclxuICAgIHJldHVybiB0aGlzLiNjdHgudHlwZXNwYWNlO1xyXG4gIH1cclxuICBnZXQgc3VibW9kdWxlRGlzcGF0Y2hJbmZvcygpIHtcclxuICAgIHJldHVybiB0aGlzLiNjdHguc3VibW9kdWxlRGlzcGF0Y2hJbmZvcztcclxuICB9XHJcbiAgLyoqIEludGVybmFsOiByZWdpc3RlciBleHBvcnRzIGFuZCBtYXRlcmlhbGl6ZSB0aGUgUmF3TW9kdWxlRGVmVjEwIGZvciB1cGxvYWQuICovXHJcbiAgYnVpbGRSYXdNb2R1bGVEZWZWMTAoZXhwb3J0cywgb3B0cykge1xyXG4gICAgcmVnaXN0ZXJNb2R1bGVFeHBvcnRzKHRoaXMuI2N0eCwgZXhwb3J0cywge1xyXG4gICAgICBpZ25vcmVOb25Nb2R1bGVFeHBvcnRzOiBvcHRzPy5pZ25vcmVOb25Nb2R1bGVFeHBvcnRzID8/IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuI2N0eC5yZXNvbHZlU2NoZWR1bGVzKCk7XHJcbiAgICByZXR1cm4gdGhpcy4jY3R4LnJhd01vZHVsZURlZlYxMCgpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWwg4oCTIGNhbGxlZCBieSBzY2hlbWEoKSB3aGVuIHByb2Nlc3NpbmcgYSBzdWJtb2R1bGUgbmFtZXNwYWNlIGVudHJ5LlxyXG4gICAqIFJlZ2lzdGVycyB0aGUgbGlicmFyeSdzIGV4cG9ydHMgYW5kIHJldHVybnMgYm90aCB0aGUgc2VyaWFsaXplZCBtb2R1bGUgZGVmXHJcbiAgICogYW5kIHRoZSBydW50aW1lIGRpc3BhdGNoIGluZm8gbmVlZGVkIGJ5IE1vZHVsZUhvb2tzSW1wbCBmb3IgX19jYWxsX3JlZHVjZXJfXy5cclxuICAgKi9cclxuICBidWlsZFN1Ym1vZHVsZURpc3BhdGNoKGV4cG9ydHMpIHtcclxuICAgIGNvbnN0IHJhd0RlZiA9IHRoaXMuYnVpbGRSYXdNb2R1bGVEZWZWMTAoZXhwb3J0cywge1xyXG4gICAgICBpZ25vcmVOb25Nb2R1bGVFeHBvcnRzOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLiNjdHgubW9kdWxlRGVmLmVudmlyb25tZW50Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VibW9kdWxlcyBjYW5ub3QgZGVjbGFyZSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLiNjdHgucmVzb2x2ZUh0dHBSb3V0ZXMoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJhd0RlZixcclxuICAgICAgZGlzcGF0Y2g6IHtcclxuICAgICAgICBuYW1lc3BhY2U6IFwiXCIsXHJcbiAgICAgICAgcmVkdWNlckZuczogWy4uLnRoaXMuI2N0eC5yZWR1Y2Vyc10sXHJcbiAgICAgICAgcmVkdWNlckRlZnM6IFsuLi50aGlzLiNjdHgubW9kdWxlRGVmLnJlZHVjZXJzXSxcclxuICAgICAgICBwcm9jZWR1cmVGbnM6IFsuLi50aGlzLiNjdHgucHJvY2VkdXJlc10sXHJcbiAgICAgICAgcHJvY2VkdXJlRGVmczogWy4uLnRoaXMuI2N0eC5tb2R1bGVEZWYucHJvY2VkdXJlc10sXHJcbiAgICAgICAgYW5vblZpZXdGbnM6IFsuLi50aGlzLiNjdHguYW5vblZpZXdzXSxcclxuICAgICAgICB2aWV3Rm5zOiBbLi4udGhpcy4jY3R4LnZpZXdzXSxcclxuICAgICAgICB0eXBlc3BhY2U6IHRoaXMuI2N0eC5tb2R1bGVEZWYudHlwZXNwYWNlLFxyXG4gICAgICAgIHRhYmxlczogT2JqZWN0LnZhbHVlcyh0aGlzLiNjdHguc2NoZW1hVHlwZS50YWJsZXMpLm1hcCgodDIpID0+ICh7XHJcbiAgICAgICAgICBhY2Nlc3Nvck5hbWU6IHQyLmFjY2Vzc29yTmFtZSxcclxuICAgICAgICAgIHRhYmxlRGVmOiB0Mi50YWJsZURlZlxyXG4gICAgICAgIH0pKSxcclxuICAgICAgICBzY2hlbWFUYWJsZXM6IHRoaXMuI2N0eC5zY2hlbWFUeXBlLnRhYmxlcyxcclxuICAgICAgICBzdWJEaXNwYXRjaGVzOiBbLi4udGhpcy4jY3R4LnN1Ym1vZHVsZURpc3BhdGNoSW5mb3NdXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG4gIHJlZHVjZXIoLi4uYXJncykge1xyXG4gICAgbGV0IG9wdHMsIHBhcmFtcyA9IHt9LCBmbjtcclxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIFtmbl0gPSBhcmdzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IHtcclxuICAgICAgICBsZXQgYXJnMTtcclxuICAgICAgICBbYXJnMSwgZm5dID0gYXJncztcclxuICAgICAgICBpZiAodHlwZW9mIGFyZzEubmFtZSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgIG9wdHMgPSBhcmcxO1xyXG4gICAgICAgIGVsc2UgcGFyYW1zID0gYXJnMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgW29wdHMsIHBhcmFtcywgZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBtYWtlUmVkdWNlckV4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHBhcmFtcywgZm4pO1xyXG4gIH1cclxuICBpbml0KC4uLmFyZ3MpIHtcclxuICAgIGxldCBvcHRzLCBmbjtcclxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIFtmbl0gPSBhcmdzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgW29wdHMsIGZuXSA9IGFyZ3M7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFrZVJlZHVjZXJFeHBvcnQodGhpcy4jY3R4LCBvcHRzLCB7fSwgZm4sIExpZmVjeWNsZS5Jbml0KTtcclxuICB9XHJcbiAgY2xpZW50Q29ubmVjdGVkKC4uLmFyZ3MpIHtcclxuICAgIGxldCBvcHRzLCBmbjtcclxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIFtmbl0gPSBhcmdzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgW29wdHMsIGZuXSA9IGFyZ3M7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFrZVJlZHVjZXJFeHBvcnQodGhpcy4jY3R4LCBvcHRzLCB7fSwgZm4sIExpZmVjeWNsZS5PbkNvbm5lY3QpO1xyXG4gIH1cclxuICBjbGllbnREaXNjb25uZWN0ZWQoLi4uYXJncykge1xyXG4gICAgbGV0IG9wdHMsIGZuO1xyXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgW2ZuXSA9IGFyZ3M7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICBbb3B0cywgZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBtYWtlUmVkdWNlckV4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHt9LCBmbiwgTGlmZWN5Y2xlLk9uRGlzY29ubmVjdCk7XHJcbiAgfVxyXG4gIHZpZXcob3B0cywgLi4uYXJncykge1xyXG4gICAgbGV0IHBhcmFtcyA9IHt9LCByZXQsIGZuO1xyXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgW3JldCwgZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIFtwYXJhbXMsIHJldCwgZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBtYWtlVmlld0V4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHBhcmFtcywgcmV0LCBmbik7XHJcbiAgfVxyXG4gIGFub255bW91c1ZpZXcob3B0cywgLi4uYXJncykge1xyXG4gICAgbGV0IHBhcmFtcyA9IHt9LCByZXQsIGZuO1xyXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgW3JldCwgZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIFtwYXJhbXMsIHJldCwgZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBtYWtlQW5vblZpZXdFeHBvcnQoXHJcbiAgICAgIHRoaXMuI2N0eCxcclxuICAgICAgb3B0cyxcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICByZXQsXHJcbiAgICAgIGZuXHJcbiAgICApO1xyXG4gIH1cclxuICBwcm9jZWR1cmUoLi4uYXJncykge1xyXG4gICAgbGV0IG9wdHMsIHBhcmFtcyA9IHt9LCByZXQsIGZuO1xyXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgW3JldCwgZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiB7XHJcbiAgICAgICAgbGV0IGFyZzE7XHJcbiAgICAgICAgW2FyZzEsIHJldCwgZm5dID0gYXJncztcclxuICAgICAgICBpZiAodHlwZW9mIGFyZzEubmFtZSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgIG9wdHMgPSBhcmcxO1xyXG4gICAgICAgIGVsc2UgcGFyYW1zID0gYXJnMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgW29wdHMsIHBhcmFtcywgcmV0LCBmbl0gPSBhcmdzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ha2VQcm9jZWR1cmVFeHBvcnQodGhpcy4jY3R4LCBvcHRzLCBwYXJhbXMsIHJldCwgZm4pO1xyXG4gIH1cclxuICBodHRwSGFuZGxlciguLi5hcmdzKSB7XHJcbiAgICBsZXQgb3B0cywgZm47XHJcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICBbZm5dID0gYXJncztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIFtvcHRzLCBmbl0gPSBhcmdzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ha2VIdHRwSGFuZGxlckV4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIGZuKTtcclxuICB9XHJcbiAgaHR0cFJvdXRlcihyb3V0ZXIpIHtcclxuICAgIHJldHVybiBtYWtlSHR0cFJvdXRlckV4cG9ydCh0aGlzLiNjdHgsIHJvdXRlcik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEJ1bmRsZSBtdWx0aXBsZSByZWR1Y2VycywgcHJvY2VkdXJlcywgZXRjIGludG8gb25lIHZhbHVlIHRvIGV4cG9ydC5cclxuICAgKiBUaGUgbmFtZSB0aGV5IHdpbGwgYmUgZXhwb3J0ZWQgd2l0aCBpcyB0aGVpciBjb3JyZXNwb25kaW5nIGtleSBpbiB0aGUgYGV4cG9ydHNgIGFyZ3VtZW50LlxyXG4gICAqL1xyXG4gIGV4cG9ydEdyb3VwKGV4cG9ydHMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFtleHBvcnRDb250ZXh0XTogdGhpcy4jY3R4LFxyXG4gICAgICBbcmVnaXN0ZXJFeHBvcnRdKGN0eCwgX2V4cG9ydE5hbWUpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IFtleHBvcnROYW1lLCBtb2R1bGVFeHBvcnRdIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMpKSB7XHJcbiAgICAgICAgICBjaGVja0V4cG9ydENvbnRleHQobW9kdWxlRXhwb3J0LCBjdHgpO1xyXG4gICAgICAgICAgbW9kdWxlRXhwb3J0W3JlZ2lzdGVyRXhwb3J0XShjdHgsIGV4cG9ydE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgY2xpZW50VmlzaWJpbGl0eUZpbHRlciA9IHtcclxuICAgIHNxbDogKGZpbHRlcikgPT4gKHtcclxuICAgICAgW2V4cG9ydENvbnRleHRdOiB0aGlzLiNjdHgsXHJcbiAgICAgIFtyZWdpc3RlckV4cG9ydF0oY3R4LCBfZXhwb3J0TmFtZSkge1xyXG4gICAgICAgIGN0eC5tb2R1bGVEZWYucm93TGV2ZWxTZWN1cml0eS5wdXNoKHsgc3FsOiBmaWx0ZXIgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfTtcclxufTtcclxudmFyIHJlZ2lzdGVyRXhwb3J0ID0gU3ltYm9sKFwiU3BhY2V0aW1lREIucmVnaXN0ZXJFeHBvcnRcIik7XHJcbnZhciBleHBvcnRDb250ZXh0ID0gU3ltYm9sKFwiU3BhY2V0aW1lREIuZXhwb3J0Q29udGV4dFwiKTtcclxuZnVuY3Rpb24gaXNNb2R1bGVFeHBvcnQoeCkge1xyXG4gIHJldHVybiAodHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIikgJiYgeCAhPT0gbnVsbCAmJiByZWdpc3RlckV4cG9ydCBpbiB4O1xyXG59XHJcbmZ1bmN0aW9uIGNoZWNrRXhwb3J0Q29udGV4dChleHAsIHNjaGVtYTIpIHtcclxuICBpZiAoZXhwW2V4cG9ydENvbnRleHRdICE9IG51bGwgJiYgZXhwW2V4cG9ydENvbnRleHRdICE9PSBzY2hlbWEyKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibXVsdGlwbGUgc2NoZW1hcyBhcmUgbm90IHN1cHBvcnRlZFwiKTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gaXNVbnR5cGVkVGFibGVTY2hlbWEoeCkge1xyXG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiAmJiB4ICE9PSBudWxsICYmIGhhc093bih4LCBcInRhYmxlRGVmXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGlzU3VibW9kdWxlTmFtZXNwYWNlKHgpIHtcclxuICByZXR1cm4gdHlwZW9mIHggPT09IFwib2JqZWN0XCIgJiYgeCAhPT0gbnVsbCAmJiBoYXNPd24oeCwgXCJkZWZhdWx0XCIpICYmIHguZGVmYXVsdCBpbnN0YW5jZW9mIFNjaGVtYTtcclxufVxyXG5mdW5jdGlvbiBpc1N1Ym1vZHVsZU1vdW50KHgpIHtcclxuICByZXR1cm4gdHlwZW9mIHggPT09IFwib2JqZWN0XCIgJiYgeCAhPT0gbnVsbCAmJiBoYXNPd24oeCwgXCJtb2R1bGVcIikgJiYgIWhhc093bih4LCBcImRlZmF1bHRcIikgJiYgIWhhc093bih4LCBcInRhYmxlRGVmXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGRlZmF1bHRJbXBvcnRFcnJvcihhY2NOYW1lKSB7XHJcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXHJcbiAgICBgc2NoZW1hIGVudHJ5ICcke2FjY05hbWV9JyBsb29rcyBsaWtlIGEgZGVmYXVsdCBpbXBvcnQ7IHVzZSBcXGBpbXBvcnQgKiBhcyAke2FjY05hbWV9IGZyb20gJy4uLidcXGAgc28gdGhlIHN1Ym1vZHVsZSBjYW4gc2VlIHRoZSBsaWJyYXJ5J3MgbmFtZWQgcmVkdWNlciBleHBvcnRzLmBcclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIHJlc29sdmVTdWJtb2R1bGVFbnRyeShhY2NOYW1lLCBlbnRyeSkge1xyXG4gIGlmIChlbnRyeSBpbnN0YW5jZW9mIFNjaGVtYSkge1xyXG4gICAgdGhyb3cgZGVmYXVsdEltcG9ydEVycm9yKGFjY05hbWUpO1xyXG4gIH1cclxuICBpZiAoaXNTdWJtb2R1bGVOYW1lc3BhY2UoZW50cnkpKSB7XHJcbiAgICByZXR1cm4geyBzdWJtb2R1bGU6IGVudHJ5IH07XHJcbiAgfVxyXG4gIGlmICghaXNTdWJtb2R1bGVNb3VudChlbnRyeSkpIHtcclxuICAgIHJldHVybiB2b2lkIDA7XHJcbiAgfVxyXG4gIGlmIChlbnRyeS5tb2R1bGUgaW5zdGFuY2VvZiBTY2hlbWEpIHtcclxuICAgIHRocm93IGRlZmF1bHRJbXBvcnRFcnJvcihhY2NOYW1lKTtcclxuICB9XHJcbiAgaWYgKCFpc1N1Ym1vZHVsZU5hbWVzcGFjZShlbnRyeS5tb2R1bGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICBgc2NoZW1hIGVudHJ5ICcke2FjY05hbWV9JyBoYXMgYSBcXGBtb2R1bGVcXGAgdGhhdCBpcyBub3QgYSBzdWJtb2R1bGUgbmFtZXNwYWNlIG9iamVjdDsgcGFzcyB0aGUgcmVzdWx0IG9mIFxcYGltcG9ydCAqIGFzICR7YWNjTmFtZX0gZnJvbSAnLi4uJ1xcYC5gXHJcbiAgICApO1xyXG4gIH1cclxuICBpZiAoZW50cnkubmFtZSA9PT0gdm9pZCAwKSB7XHJcbiAgICByZXR1cm4geyBzdWJtb2R1bGU6IGVudHJ5Lm1vZHVsZSB9O1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGVudHJ5Lm5hbWUgIT09IFwic3RyaW5nXCIgfHwgZW50cnkubmFtZS5sZW5ndGggPT09IDApIHtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgIGBzY2hlbWEgZW50cnkgJyR7YWNjTmFtZX0nIGhhcyBhbiBpbnZhbGlkIFxcYG5hbWVcXGA7IGV4cGVjdGVkIGEgbm9uLWVtcHR5IHN0cmluZyBmb3IgdGhlIGNhbm9uaWNhbCBuYW1lc3BhY2UgbmFtZS5gXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4geyBzdWJtb2R1bGU6IGVudHJ5Lm1vZHVsZSwgY2Fub25pY2FsTmFtZTogZW50cnkubmFtZSB9O1xyXG59XHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlRXhwb3J0cyhzY2hlbWEyLCBleHBvcnRzLCBvcHRzKSB7XHJcbiAgaWYgKHNjaGVtYTIuZXhwb3J0c1JlZ2lzdGVyZWQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgc2NoZW1hMi5leHBvcnRzUmVnaXN0ZXJlZCA9IHRydWU7XHJcbiAgZm9yIChjb25zdCBbbmFtZSwgbW9kdWxlRXhwb3J0XSBvZiBPYmplY3QuZW50cmllcyhleHBvcnRzKSkge1xyXG4gICAgaWYgKG5hbWUgPT09IFwiZGVmYXVsdFwiKSBjb250aW51ZTtcclxuICAgIGlmICghaXNNb2R1bGVFeHBvcnQobW9kdWxlRXhwb3J0KSkge1xyXG4gICAgICBpZiAob3B0cz8uaWdub3JlTm9uTW9kdWxlRXhwb3J0cykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBvcnRpbmcgc29tZXRoaW5nIHRoYXQgaXMgbm90IGEgc3BhY2V0aW1lIGV4cG9ydFwiKTtcclxuICAgIH1cclxuICAgIGNoZWNrRXhwb3J0Q29udGV4dChtb2R1bGVFeHBvcnQsIHNjaGVtYTIpO1xyXG4gICAgbW9kdWxlRXhwb3J0W3JlZ2lzdGVyRXhwb3J0XShzY2hlbWEyLCBuYW1lKTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gc2NoZW1hKGVudHJpZXMsIG1vZHVsZVNldHRpbmdzKSB7XHJcbiAgY29uc3QgY3R4ID0gbmV3IFNjaGVtYUlubmVyKChjdHgyKSA9PiB7XHJcbiAgICBjdHgyLm1vZHVsZURlZi5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50RGVjbGFyYXRpb25zKFxyXG4gICAgICBtb2R1bGVTZXR0aW5ncz8uZW52ID8/IHt9XHJcbiAgICApO1xyXG4gICAgaWYgKG1vZHVsZVNldHRpbmdzPy5DQVNFX0NPTlZFUlNJT05fUE9MSUNZICE9IG51bGwpIHtcclxuICAgICAgY3R4Mi5zZXRDYXNlQ29udmVyc2lvblBvbGljeShtb2R1bGVTZXR0aW5ncy5DQVNFX0NPTlZFUlNJT05fUE9MSUNZKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhYmxlU2NoZW1hcyA9IHt9O1xyXG4gICAgZm9yIChjb25zdCBbYWNjTmFtZSwgZW50cnldIG9mIE9iamVjdC5lbnRyaWVzKGVudHJpZXMpKSB7XHJcbiAgICAgIGNvbnN0IG1vdW50ID0gcmVzb2x2ZVN1Ym1vZHVsZUVudHJ5KGFjY05hbWUsIGVudHJ5KTtcclxuICAgICAgaWYgKG1vdW50ICE9PSB2b2lkIDApIHtcclxuICAgICAgICBjb25zdCB7IHN1Ym1vZHVsZSwgY2Fub25pY2FsTmFtZSB9ID0gbW91bnQ7XHJcbiAgICAgICAgY29uc3QgeyByYXdEZWYsIGRpc3BhdGNoIH0gPSBzdWJtb2R1bGUuZGVmYXVsdC5idWlsZFN1Ym1vZHVsZURpc3BhdGNoKHN1Ym1vZHVsZSk7XHJcbiAgICAgICAgZGlzcGF0Y2gubmFtZXNwYWNlID0gYWNjTmFtZTtcclxuICAgICAgICBjdHgyLmFkZFN1Ym1vZHVsZSh7IG5hbWVzcGFjZTogYWNjTmFtZSwgbW9kdWxlOiByYXdEZWYgfSk7XHJcbiAgICAgICAgaWYgKGNhbm9uaWNhbE5hbWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgY3R4Mi5tb2R1bGVEZWYuZXhwbGljaXROYW1lcy5lbnRyaWVzLnB1c2goe1xyXG4gICAgICAgICAgICB0YWc6IFwiTmFtZXNwYWNlXCIsXHJcbiAgICAgICAgICAgIHZhbHVlOiB7IHNvdXJjZU5hbWU6IGFjY05hbWUsIGNhbm9uaWNhbE5hbWUgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eDIuc3VibW9kdWxlRGlzcGF0Y2hJbmZvcy5wdXNoKGRpc3BhdGNoKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWlzVW50eXBlZFRhYmxlU2NoZW1hKGVudHJ5KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICBgc2NoZW1hIGVudHJ5ICcke2FjY05hbWV9JyBtdXN0IGJlIGEgdGFibGUsIGEgc3VibW9kdWxlIG5hbWVzcGFjZSBvYmplY3QsIG9yIGEgXFxgeyBuYW1lLCBtb2R1bGUgfVxcYCBzdWJtb2R1bGUgbW91bnRgXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0YWJsZTIgPSBlbnRyeTtcclxuICAgICAgY29uc3QgdGFibGVEZWYgPSB0YWJsZTIudGFibGVEZWYoY3R4MiwgYWNjTmFtZSk7XHJcbiAgICAgIHRhYmxlU2NoZW1hc1thY2NOYW1lXSA9IHRhYmxlVG9TY2hlbWEoYWNjTmFtZSwgdGFibGUyLCB0YWJsZURlZik7XHJcbiAgICAgIGNvbnN0IHRhYmxlU291cmNlTmFtZXMgPSBjdHgyLnRhYmxlU291cmNlTmFtZXMuZ2V0KHRhYmxlMik7XHJcbiAgICAgIGlmICh0YWJsZVNvdXJjZU5hbWVzID09PSB2b2lkIDApIHtcclxuICAgICAgICBjdHgyLnRhYmxlU291cmNlTmFtZXMuc2V0KHRhYmxlMiwgW3RhYmxlRGVmLnNvdXJjZU5hbWVdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0YWJsZVNvdXJjZU5hbWVzLnB1c2godGFibGVEZWYuc291cmNlTmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgY3R4Mi5tb2R1bGVEZWYudGFibGVzLnB1c2godGFibGVEZWYpO1xyXG4gICAgICBpZiAodGFibGUyLnNjaGVkdWxlKSB7XHJcbiAgICAgICAgY3R4Mi5wZW5kaW5nU2NoZWR1bGVzLnB1c2goe1xyXG4gICAgICAgICAgdGFibGU6IHRhYmxlMixcclxuICAgICAgICAgIHRhYmxlTmFtZTogdGFibGVEZWYuc291cmNlTmFtZSxcclxuICAgICAgICAgIHNjaGVkdWxlQXRDb2w6IHRhYmxlMi5zY2hlZHVsZS5zY2hlZHVsZUF0Q29sLFxyXG4gICAgICAgICAgcmVkdWNlcjogdGFibGUyLnNjaGVkdWxlLnJlZHVjZXJcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGFibGUyLnRhYmxlTmFtZSkge1xyXG4gICAgICAgIGN0eDIubW9kdWxlRGVmLmV4cGxpY2l0TmFtZXMuZW50cmllcy5wdXNoKHtcclxuICAgICAgICAgIHRhZzogXCJUYWJsZVwiLFxyXG4gICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgc291cmNlTmFtZTogYWNjTmFtZSxcclxuICAgICAgICAgICAgY2Fub25pY2FsTmFtZTogdGFibGUyLnRhYmxlTmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0YWJsZXM6IHRhYmxlU2NoZW1hcyxcclxuICAgICAgZW52OiBtb2R1bGVTZXR0aW5ncz8uZW52ID8/IHt9XHJcbiAgICB9O1xyXG4gIH0pO1xyXG4gIHJldHVybiBuZXcgU2NoZW1hKGN0eCk7XHJcbn1cclxuXHJcbi8vIHNyYy9zZXJ2ZXIvY29uc29sZS50c1xyXG52YXIgaW1wb3J0X29iamVjdF9pbnNwZWN0ID0gX190b0VTTShyZXF1aXJlX29iamVjdF9pbnNwZWN0KCkpO1xyXG52YXIgZm10TG9nID0gKC4uLmRhdGEpID0+IGRhdGEubWFwKCh4KSA9PiB0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIiA/IHggOiAoMCwgaW1wb3J0X29iamVjdF9pbnNwZWN0LmRlZmF1bHQpKHgpKS5qb2luKFwiIFwiKTtcclxudmFyIGNvbnNvbGVfbGV2ZWxfZXJyb3IgPSAwO1xyXG52YXIgY29uc29sZV9sZXZlbF93YXJuID0gMTtcclxudmFyIGNvbnNvbGVfbGV2ZWxfaW5mbyA9IDI7XHJcbnZhciBjb25zb2xlX2xldmVsX2RlYnVnID0gMztcclxudmFyIGNvbnNvbGVfbGV2ZWxfdHJhY2UgPSA0O1xyXG52YXIgdGltZXJNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xyXG52YXIgY29uc29sZTIgPSB7XHJcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciB3ZSB3YW50IGEgYmxhbmsgcHJvdG90eXBlLCBidXQgdHlwZXNjcmlwdCBjb21wbGFpbnNcclxuICBfX3Byb3RvX186IHt9LFxyXG4gIFtTeW1ib2wudG9TdHJpbmdUYWddOiBcImNvbnNvbGVcIixcclxuICBhc3NlcnQ6IChjb25kaXRpb24gPSBmYWxzZSwgLi4uZGF0YSkgPT4ge1xyXG4gICAgaWYgKCFjb25kaXRpb24pIHtcclxuICAgICAgc3lzMi5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2Vycm9yLCBmbXRMb2coLi4uZGF0YSkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xlYXI6ICgpID0+IHtcclxuICB9LFxyXG4gIGRlYnVnOiAoLi4uZGF0YSkgPT4ge1xyXG4gICAgc3lzMi5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2RlYnVnLCBmbXRMb2coLi4uZGF0YSkpO1xyXG4gIH0sXHJcbiAgZXJyb3I6ICguLi5kYXRhKSA9PiB7XHJcbiAgICBzeXMyLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfZXJyb3IsIGZtdExvZyguLi5kYXRhKSk7XHJcbiAgfSxcclxuICBpbmZvOiAoLi4uZGF0YSkgPT4ge1xyXG4gICAgc3lzMi5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2luZm8sIGZtdExvZyguLi5kYXRhKSk7XHJcbiAgfSxcclxuICBsb2c6ICguLi5kYXRhKSA9PiB7XHJcbiAgICBzeXMyLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfaW5mbywgZm10TG9nKC4uLmRhdGEpKTtcclxuICB9LFxyXG4gIHRhYmxlOiAodGFidWxhckRhdGEsIF9wcm9wZXJ0aWVzKSA9PiB7XHJcbiAgICBzeXMyLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfaW5mbywgZm10TG9nKHRhYnVsYXJEYXRhKSk7XHJcbiAgfSxcclxuICB0cmFjZTogKC4uLmRhdGEpID0+IHtcclxuICAgIHN5czIuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF90cmFjZSwgZm10TG9nKC4uLmRhdGEpKTtcclxuICB9LFxyXG4gIHdhcm46ICguLi5kYXRhKSA9PiB7XHJcbiAgICBzeXMyLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfd2FybiwgZm10TG9nKC4uLmRhdGEpKTtcclxuICB9LFxyXG4gIGRpcjogKF9pdGVtLCBfb3B0aW9ucykgPT4ge1xyXG4gIH0sXHJcbiAgZGlyeG1sOiAoLi4uX2RhdGEpID0+IHtcclxuICB9LFxyXG4gIC8vIENvdW50aW5nXHJcbiAgY291bnQ6IChfbGFiZWwgPSBcImRlZmF1bHRcIikgPT4ge1xyXG4gIH0sXHJcbiAgY291bnRSZXNldDogKF9sYWJlbCA9IFwiZGVmYXVsdFwiKSA9PiB7XHJcbiAgfSxcclxuICAvLyBHcm91cGluZ1xyXG4gIGdyb3VwOiAoLi4uX2RhdGEpID0+IHtcclxuICB9LFxyXG4gIGdyb3VwQ29sbGFwc2VkOiAoLi4uX2RhdGEpID0+IHtcclxuICB9LFxyXG4gIGdyb3VwRW5kOiAoKSA9PiB7XHJcbiAgfSxcclxuICAvLyBUaW1pbmdcclxuICB0aW1lOiAobGFiZWwgPSBcImRlZmF1bHRcIikgPT4ge1xyXG4gICAgaWYgKHRpbWVyTWFwLmhhcyhsYWJlbCkpIHtcclxuICAgICAgc3lzMi5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX3dhcm4sIGBUaW1lciAnJHtsYWJlbH0nIGFscmVhZHkgZXhpc3RzLmApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aW1lck1hcC5zZXQobGFiZWwsIHN5czIuY29uc29sZV90aW1lcl9zdGFydChsYWJlbCkpO1xyXG4gIH0sXHJcbiAgdGltZUxvZzogKGxhYmVsID0gXCJkZWZhdWx0XCIsIC4uLmRhdGEpID0+IHtcclxuICAgIHN5czIuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2cobGFiZWwsIC4uLmRhdGEpKTtcclxuICB9LFxyXG4gIHRpbWVFbmQ6IChsYWJlbCA9IFwiZGVmYXVsdFwiKSA9PiB7XHJcbiAgICBjb25zdCBzcGFuSWQgPSB0aW1lck1hcC5nZXQobGFiZWwpO1xyXG4gICAgaWYgKHNwYW5JZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHN5czIuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF93YXJuLCBgVGltZXIgJyR7bGFiZWx9JyBkb2VzIG5vdCBleGlzdC5gKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3lzMi5jb25zb2xlX3RpbWVyX2VuZChzcGFuSWQpO1xyXG4gICAgdGltZXJNYXAuZGVsZXRlKGxhYmVsKTtcclxuICB9LFxyXG4gIC8vIEFkZGl0aW9uYWwgY29uc29sZSBtZXRob2RzIHRvIHNhdGlzZnkgdGhlIENvbnNvbGUgaW50ZXJmYWNlXHJcbiAgdGltZVN0YW1wOiAoKSA9PiB7XHJcbiAgfSxcclxuICBwcm9maWxlOiAoKSA9PiB7XHJcbiAgfSxcclxuICBwcm9maWxlRW5kOiAoKSA9PiB7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc3JjL3NlcnZlci9wb2x5ZmlsbHMudHNcclxuZ2xvYmFsVGhpcy5jb25zb2xlID0gY29uc29sZTI7XHJcbi8qISBCdW5kbGVkIGxpY2Vuc2UgaW5mb3JtYXRpb246XHJcblxyXG5zdGF0dXNlcy9pbmRleC5qczpcclxuICAoKiFcclxuICAgKiBzdGF0dXNlc1xyXG4gICAqIENvcHlyaWdodChjKSAyMDE0IEpvbmF0aGFuIE9uZ1xyXG4gICAqIENvcHlyaWdodChjKSAyMDE2IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXHJcbiAgICogTUlUIExpY2Vuc2VkXHJcbiAgICopXHJcbiovXHJcblxyXG5leHBvcnQgeyBBcnJheUJ1aWxkZXIsIEFycmF5Q29sdW1uQnVpbGRlciwgQm9vbEJ1aWxkZXIsIEJvb2xDb2x1bW5CdWlsZGVyLCBCb29sZWFuRXhwciwgQnl0ZUFycmF5QnVpbGRlciwgQnl0ZUFycmF5Q29sdW1uQnVpbGRlciwgQ2FzZUNvbnZlcnNpb25Qb2xpY3ksIENvbHVtbkJ1aWxkZXIsIENvbHVtbkV4cHJlc3Npb24sIENvbm5lY3Rpb25JZEJ1aWxkZXIsIENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIsIEYzMkJ1aWxkZXIsIEYzMkNvbHVtbkJ1aWxkZXIsIEY2NEJ1aWxkZXIsIEY2NENvbHVtbkJ1aWxkZXIsIEkxMjhCdWlsZGVyLCBJMTI4Q29sdW1uQnVpbGRlciwgSTE2QnVpbGRlciwgSTE2Q29sdW1uQnVpbGRlciwgSTI1NkJ1aWxkZXIsIEkyNTZDb2x1bW5CdWlsZGVyLCBJMzJCdWlsZGVyLCBJMzJDb2x1bW5CdWlsZGVyLCBJNjRCdWlsZGVyLCBJNjRDb2x1bW5CdWlsZGVyLCBJOEJ1aWxkZXIsIEk4Q29sdW1uQnVpbGRlciwgSWRlbnRpdHlCdWlsZGVyLCBJZGVudGl0eUNvbHVtbkJ1aWxkZXIsIE9wdGlvbkJ1aWxkZXIsIE9wdGlvbkNvbHVtbkJ1aWxkZXIsIFByb2R1Y3RCdWlsZGVyLCBQcm9kdWN0Q29sdW1uQnVpbGRlciwgUmFuZ2UsIFJlZkJ1aWxkZXIsIFJlcXVlc3QsIFJlc3VsdEJ1aWxkZXIsIFJlc3VsdENvbHVtbkJ1aWxkZXIsIFJvdXRlciwgUm93QnVpbGRlciwgU2NoZWR1bGVBdCwgU2NoZWR1bGVBdEJ1aWxkZXIsIFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyLCBTZW5kZXJFcnJvciwgU2ltcGxlU3VtQnVpbGRlciwgU2ltcGxlU3VtQ29sdW1uQnVpbGRlciwgU3BhY2V0aW1lSG9zdEVycm9yLCBTdHJpbmdCdWlsZGVyLCBTdHJpbmdDb2x1bW5CdWlsZGVyLCBTdW1CdWlsZGVyLCBTdW1Db2x1bW5CdWlsZGVyLCBTeW5jUmVzcG9uc2UsIFRpbWVEdXJhdGlvbkJ1aWxkZXIsIFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIsIFRpbWVzdGFtcEJ1aWxkZXIsIFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIsIFR5cGVCdWlsZGVyLCBVMTI4QnVpbGRlciwgVTEyOENvbHVtbkJ1aWxkZXIsIFUxNkJ1aWxkZXIsIFUxNkNvbHVtbkJ1aWxkZXIsIFUyNTZCdWlsZGVyLCBVMjU2Q29sdW1uQnVpbGRlciwgVTMyQnVpbGRlciwgVTMyQ29sdW1uQnVpbGRlciwgVTY0QnVpbGRlciwgVTY0Q29sdW1uQnVpbGRlciwgVThCdWlsZGVyLCBVOENvbHVtbkJ1aWxkZXIsIFV1aWRCdWlsZGVyLCBVdWlkQ29sdW1uQnVpbGRlciwgYW5kLCBjcmVhdGVUYWJsZVJlZkZyb21EZWYsIGVycm9ycywgZXZhbHVhdGVCb29sZWFuRXhwciwgZ2V0UXVlcnlBY2Nlc3Nvck5hbWUsIGdldFF1ZXJ5VGFibGVOYW1lLCBnZXRRdWVyeVdoZXJlQ2xhdXNlLCBpc1Jvd1R5cGVkUXVlcnksIGlzVHlwZWRRdWVyeSwgbGl0ZXJhbCwgbWFrZUZyb21CdWlsZGVyLCBtYWtlUXVlcnlCdWlsZGVyLCBub3QsIG9yLCBzY2hlbWEsIHQsIHRhYmxlLCB0b0NhbWVsQ2FzZSwgdG9Db21wYXJhYmxlVmFsdWUsIHRvU3FsIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsImltcG9ydCB7IHNjaGVtYSwgdGFibGUsIHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBTZW5kZXJFcnJvciB9IGZyb20gJ3NwYWNldGltZWRiL3NlcnZlcic7XHJcblxyXG5jb25zdCBNQVhfTkFNRV9MRU5HVEggPSAzMDtcclxuY29uc3QgU0VTU0lPTl9JRF9MRU5HVEggPSA4O1xyXG5jb25zdCBTRVNTSU9OX0lEX0FMUEhBQkVUID0gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuXHJcbmNvbnN0IHNwYWNldGltZWRiID0gc2NoZW1hKHtcclxuICBzZXNzaW9uczogdGFibGUoXHJcbiAgICB7IHB1YmxpYzogdHJ1ZSB9LFxyXG4gICAge1xyXG4gICAgICBzZXNzaW9uSUQ6IHQuc3RyaW5nKCkucHJpbWFyeUtleSgpLFxyXG4gICAgICBjcmVhdGVkVGltZTogdC50aW1lc3RhbXAoKSxcclxuICAgICAgb3duZXI6IHQuaWRlbnRpdHkoKSxcclxuICAgIH1cclxuICApLFxyXG4gIG1lbWJlcnM6IHRhYmxlKFxyXG4gICAge3B1YmxpYzogdHJ1ZX0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IHQuc3RyaW5nKCksXHJcbiAgICAgIGlzT3duZXI6IHQuYm9vbCgpLFxyXG4gICAgICBpZGVudGl0eTogdC5pZGVudGl0eSgpLFxyXG4gICAgICBzZXNzaW9uSUQ6IHQuc3RyaW5nKCksXHJcbiAgICAgIGlkOiB0LnU2NCgpLnByaW1hcnlLZXkoKS5hdXRvSW5jKCksXHJcbiAgICB9XHJcbiAgKVxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3BhY2V0aW1lZGI7XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdCA9IHNwYWNldGltZWRiLmluaXQoX2N0eCA9PiB7XHJcbiAgLy8gQ2FsbGVkIHdoZW4gdGhlIG1vZHVsZSBpcyBpbml0aWFsbHkgcHVibGlzaGVkXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9uQ29ubmVjdCA9IHNwYWNldGltZWRiLmNsaWVudENvbm5lY3RlZChfY3R4ID0+IHtcclxuICAvLyBDYWxsZWQgZXZlcnkgdGltZSBhIG5ldyBjbGllbnQgY29ubmVjdHNcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3Qgb25EaXNjb25uZWN0ID0gc3BhY2V0aW1lZGIuY2xpZW50RGlzY29ubmVjdGVkKF9jdHggPT4ge1xyXG4gIC8vIENhbGxlZCBldmVyeSB0aW1lIGEgY2xpZW50IGRpc2Nvbm5lY3RzXHJcbn0pO1xyXG5cclxuY29uc3QgZ2VuZXJhdGVTZXNzaW9uSUQgPSAocmFuZG9tSW50OiAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIGxldCBzZXNzaW9uSUQgPSBcIlwiO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgU0VTU0lPTl9JRF9MRU5HVEg7IGkrKykge1xyXG4gICAgY29uc3QgaW5kZXggPSByYW5kb21JbnQoMCwgU0VTU0lPTl9JRF9BTFBIQUJFVC5sZW5ndGggLSAxKTtcclxuICAgIHNlc3Npb25JRCArPSBTRVNTSU9OX0lEX0FMUEhBQkVUW2luZGV4XTtcclxuICB9XHJcbiAgcmV0dXJuIHNlc3Npb25JRDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb24gPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKFxyXG4gIHsgZGlzcGxheU5hbWU6IHQuc3RyaW5nKCkgfSxcclxuICAoY3R4LCB7IGRpc3BsYXlOYW1lIH0pID0+IHtcclxuICAgIGRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWUudHJpbSgpO1xyXG4gICAgY29uc3QgdHJpbW1lZE5hbWVWYWxpZCA9IGRpc3BsYXlOYW1lLmxlbmd0aCA8PSBNQVhfTkFNRV9MRU5HVEggJiYgZGlzcGxheU5hbWUubGVuZ3RoID4gMDtcclxuXHJcbiAgICBpZiAoIXRyaW1tZWROYW1lVmFsaWQpIHtcclxuICAgICAgdGhyb3cgbmV3IFNlbmRlckVycm9yKFwiaW52YWxpZCBuYW1lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzZXNzaW9uSUQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICBjb25zdCBjYW5kaWRhdGVJRCA9IGdlbmVyYXRlU2Vzc2lvbklEKChtaW4sIG1heCkgPT4gY3R4LnJhbmRvbS5pbnRlZ2VySW5SYW5nZShtaW4sIG1heCkpO1xyXG4gICAgICBjb25zdCBleGlzdGluZyA9IGN0eC5kYi5zZXNzaW9ucy5zZXNzaW9uSUQuZmluZChjYW5kaWRhdGVJRCk7XHJcbiAgICAgIGlmICghZXhpc3RpbmcpIHtcclxuICAgICAgICBzZXNzaW9uSUQgPSBjYW5kaWRhdGVJRFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2Vzc2lvbklEID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IFNlbmRlckVycm9yKFwiQ291bGQgbm90IGNyZWF0ZSBhIHNlc3Npb24sIHBsZWFzZSB0cnkgYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gICAgY3R4LmRiLnNlc3Npb25zLmluc2VydCh7IHNlc3Npb25JRCwgY3JlYXRlZFRpbWU6IGN0eC50aW1lc3RhbXAsIG93bmVyOiBjdHguc2VuZGVyIH0pO1xyXG4gICAgY3R4LmRiLm1lbWJlcnMuaW5zZXJ0KHsgbmFtZTogZGlzcGxheU5hbWUsIGlzT3duZXI6IHRydWUsIGlkZW50aXR5OiBjdHguc2VuZGVyLCBzZXNzaW9uSUQsIGlkOiAwbiB9KVxyXG4gIH1cclxuKTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFJQSxhQUFXLE9BQU87QUFDdEIsSUFBSUMsY0FBWSxPQUFPO0FBQ3ZCLElBQUlDLHFCQUFtQixPQUFPO0FBQzlCLElBQUlDLHNCQUFvQixPQUFPO0FBQy9CLElBQUlDLGlCQUFlLE9BQU87QUFD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