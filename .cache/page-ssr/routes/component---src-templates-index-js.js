exports.id = "component---src-templates-index-js";
exports.ids = ["component---src-templates-index-js"];
exports.modules = {

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const preserveCamelCase = string => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());

	return postProcess(input);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/consolidated-events/lib/index.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/consolidated-events/lib/index.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListener": () => (/* binding */ addEventListener)
/* harmony export */ });
var CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

// Adapted from Modernizr
// https://github.com/Modernizr/Modernizr/blob/acb3f0d9/feature-detects/dom/passiveeventlisteners.js#L26-L37
function testPassiveEventListeners() {
  if (!CAN_USE_DOM) {
    return false;
  }

  if (!window.addEventListener || !window.removeEventListener || !Object.defineProperty) {
    return false;
  }

  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: function () {
        function get() {
          supportsPassiveOption = true;
        }

        return get;
      }()
    });
    var noop = function noop() {};
    window.addEventListener('testPassiveEventSupport', noop, opts);
    window.removeEventListener('testPassiveEventSupport', noop, opts);
  } catch (e) {
    // do nothing
  }

  return supportsPassiveOption;
}

var memoized = void 0;

function canUsePassiveEventListeners() {
  if (memoized === undefined) {
    memoized = testPassiveEventListeners();
  }
  return memoized;
}

function normalizeEventOptions(eventOptions) {
  if (!eventOptions) {
    return undefined;
  }

  if (!canUsePassiveEventListeners()) {
    // If the browser does not support the passive option, then it is expecting
    // a boolean for the options argument to specify whether it should use
    // capture or not. In more modern browsers, this is passed via the `capture`
    // option, so let's just hoist that value up.
    return !!eventOptions.capture;
  }

  return eventOptions;
}

/* eslint-disable no-bitwise */

/**
 * Generate a unique key for any set of event options
 */
function eventOptionsKey(normalizedEventOptions) {
  if (!normalizedEventOptions) {
    return 0;
  }

  // If the browser does not support passive event listeners, the normalized
  // event options will be a boolean.
  if (normalizedEventOptions === true) {
    return 100;
  }

  // At this point, the browser supports passive event listeners, so we expect
  // the event options to be an object with possible properties of capture,
  // passive, and once.
  //
  // We want to consistently return the same value, regardless of the order of
  // these properties, so let's use binary maths to assign each property to a
  // bit, and then add those together (with an offset to account for the
  // booleans at the beginning of this function).
  var capture = normalizedEventOptions.capture << 0;
  var passive = normalizedEventOptions.passive << 1;
  var once = normalizedEventOptions.once << 2;
  return capture + passive + once;
}

function ensureCanMutateNextEventHandlers(eventHandlers) {
  if (eventHandlers.handlers === eventHandlers.nextHandlers) {
    // eslint-disable-next-line no-param-reassign
    eventHandlers.nextHandlers = eventHandlers.handlers.slice();
  }
}

function TargetEventHandlers(target) {
  this.target = target;
  this.events = {};
}

TargetEventHandlers.prototype.getEventHandlers = function () {
  function getEventHandlers(eventName, options) {
    var key = String(eventName) + ' ' + String(eventOptionsKey(options));

    if (!this.events[key]) {
      this.events[key] = {
        handlers: [],
        handleEvent: undefined
      };
      this.events[key].nextHandlers = this.events[key].handlers;
    }

    return this.events[key];
  }

  return getEventHandlers;
}();

TargetEventHandlers.prototype.handleEvent = function () {
  function handleEvent(eventName, options, event) {
    var eventHandlers = this.getEventHandlers(eventName, options);
    eventHandlers.handlers = eventHandlers.nextHandlers;
    eventHandlers.handlers.forEach(function (handler) {
      if (handler) {
        // We need to check for presence here because a handler function may
        // cause later handlers to get removed. This can happen if you for
        // instance have a waypoint that unmounts another waypoint as part of an
        // onEnter/onLeave handler.
        handler(event);
      }
    });
  }

  return handleEvent;
}();

TargetEventHandlers.prototype.add = function () {
  function add(eventName, listener, options) {
    var _this = this;

    // options has already been normalized at this point.
    var eventHandlers = this.getEventHandlers(eventName, options);

    ensureCanMutateNextEventHandlers(eventHandlers);

    if (eventHandlers.nextHandlers.length === 0) {
      eventHandlers.handleEvent = this.handleEvent.bind(this, eventName, options);

      this.target.addEventListener(eventName, eventHandlers.handleEvent, options);
    }

    eventHandlers.nextHandlers.push(listener);

    var isSubscribed = true;
    var unsubscribe = function () {
      function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        isSubscribed = false;

        ensureCanMutateNextEventHandlers(eventHandlers);
        var index = eventHandlers.nextHandlers.indexOf(listener);
        eventHandlers.nextHandlers.splice(index, 1);

        if (eventHandlers.nextHandlers.length === 0) {
          // All event handlers have been removed, so we want to remove the event
          // listener from the target node.

          if (_this.target) {
            // There can be a race condition where the target may no longer exist
            // when this function is called, e.g. when a React component is
            // unmounting. Guarding against this prevents the following error:
            //
            //   Cannot read property 'removeEventListener' of undefined
            _this.target.removeEventListener(eventName, eventHandlers.handleEvent, options);
          }

          eventHandlers.handleEvent = undefined;
        }
      }

      return unsubscribe;
    }();
    return unsubscribe;
  }

  return add;
}();

var EVENT_HANDLERS_KEY = '__consolidated_events_handlers__';

// eslint-disable-next-line import/prefer-default-export
function addEventListener(target, eventName, listener, options) {
  if (!target[EVENT_HANDLERS_KEY]) {
    // eslint-disable-next-line no-param-reassign
    target[EVENT_HANDLERS_KEY] = new TargetEventHandlers(target);
  }
  var normalizedEventOptions = normalizeEventOptions(options);
  return target[EVENT_HANDLERS_KEY].add(eventName, listener, normalizedEventOptions);
}




/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./src/assets/resume-EN.pdf":
/*!**********************************!*\
  !*** ./src/assets/resume-EN.pdf ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/resume-EN-4a336bc22ec0a4827e4b18a82781d563.pdf");

/***/ }),

/***/ "./src/assets/resume-FI.pdf":
/*!**********************************!*\
  !*** ./src/assets/resume-FI.pdf ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/resume-FI-f9685f5aa2dd96dcd61e9a73a00d7958.pdf");

/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js":
/*!****************************************************************************!*\
  !*** ./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.applyTrailingSlashOption = void 0;

const applyTrailingSlashOption = (input, option = `always`) => {
  const hasHtmlSuffix = input.endsWith(`.html`);
  const hasXmlSuffix = input.endsWith(`.xml`);
  const hasPdfSuffix = input.endsWith(`.pdf`);
  if (input === `/`) return input;

  if (hasHtmlSuffix || hasXmlSuffix || hasPdfSuffix) {
    option = `never`;
  }

  if (option === `always`) {
    return input.endsWith(`/`) ? input : `${input}/`;
  }

  if (option === `never`) {
    return input.endsWith(`/`) ? input.slice(0, -1) : input;
  }

  return input;
};

exports.applyTrailingSlashOption = applyTrailingSlashOption;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = exports.ScrollContext = void 0;

var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "./node_modules/gatsby-react-router-scroll/scroll-handler.js");

exports.ScrollContext = _scrollHandler.ScrollHandler;

var _useScrollRestoration = __webpack_require__(/*! ./use-scroll-restoration */ "./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js");

exports.useScrollRestoration = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/scroll-handler.js":
/*!*******************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/scroll-handler.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js"));

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _sessionStorage = __webpack_require__(/*! ./session-storage */ "./node_modules/gatsby-react-router-scroll/session-storage.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";

var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);

  function ScrollHandler() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();
    _this._isTicking = false;
    _this._latestKnownScrollY = 0;

    _this.scrollListener = function () {
      _this._latestKnownScrollY = window.scrollY;

      if (!_this._isTicking) {
        _this._isTicking = true;
        requestAnimationFrame(_this._saveScroll.bind((0, _assertThisInitialized2.default)(_this)));
      }
    };

    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };

    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));

      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };

    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;

      if (!shouldUpdateScroll) {
        return true;
      } // Hack to allow accessing this._stateStorage.


      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };

    return _this;
  }

  var _proto = ScrollHandler.prototype;

  _proto._saveScroll = function _saveScroll() {
    var key = this.props.location.key || null;

    if (key) {
      this._stateStorage.save(this.props.location, key, this._latestKnownScrollY);
    }

    this._isTicking = false;
  };

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
        key = _this$props$location.key,
        hash = _this$props$location.hash;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    } else if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
        hash = _this$props$location2.hash,
        key = _this$props$location2.key;
    var scrollPosition;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }
    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */


    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };

  return ScrollHandler;
}(React.Component);

exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/session-storage.js":
/*!********************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/session-storage.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";

var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}

  var _proto = SessionStorage.prototype;

  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);

    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (true) {
        console.warn("[gatsby-react-router-scroll] Unable to access sessionStorage; sessionStorage is not available.");
      }

      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }

      return 0;
    }
  };

  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);

    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }

      if (true) {
        console.warn("[gatsby-react-router-scroll] Unable to save state in sessionStorage; sessionStorage is not available.");
      }
    }
  };

  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };

  return SessionStorage;
}();

exports.SessionStorage = SessionStorage;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js":
/*!***************************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;

var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "./node_modules/gatsby-react-router-scroll/scroll-handler.js");

var _react = __webpack_require__(/*! react */ "react");

var _reachRouter = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");

function useScrollRestoration(identifier) {
  var location = (0, _reachRouter.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, [location.key]);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ "./.cache/context-utils.js":
/*!*********************************!*\
  !*** ./.cache/context-utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createServerOrClientContext": () => (/* binding */ createServerOrClientContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Ensure serverContext is not created more than once as React will throw when creating it more than once
// https://github.com/facebook/react/blob/dd2d6522754f52c70d02c51db25eb7cbd5d1c8eb/packages/react/src/ReactServerContext.js#L101
const createServerContext = (name, defaultValue = null) => {
  /* eslint-disable no-undef */
  if (!globalThis.__SERVER_CONTEXT) {
    globalThis.__SERVER_CONTEXT = {};
  }
  if (!globalThis.__SERVER_CONTEXT[name]) {
    globalThis.__SERVER_CONTEXT[name] = react__WEBPACK_IMPORTED_MODULE_0___default().createServerContext(name, defaultValue);
  }
  return globalThis.__SERVER_CONTEXT[name];
};
function createServerOrClientContext(name, defaultValue) {
  if ((react__WEBPACK_IMPORTED_MODULE_0___default().createServerContext)) {
    return createServerContext(name, defaultValue);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(defaultValue);
}


/***/ }),

/***/ "./.cache/emitter.js":
/*!***************************!*\
  !*** ./.cache/emitter.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.es.js");

const emitter = (0,mitt__WEBPACK_IMPORTED_MODULE_0__["default"])();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (emitter);

/***/ }),

/***/ "./.cache/find-path.js":
/*!*****************************!*\
  !*** ./.cache/find-path.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanPath": () => (/* binding */ cleanPath),
/* harmony export */   "findMatchPath": () => (/* binding */ findMatchPath),
/* harmony export */   "findPath": () => (/* binding */ findPath),
/* harmony export */   "grabMatchParams": () => (/* binding */ grabMatchParams),
/* harmony export */   "setMatchPaths": () => (/* binding */ setMatchPaths)
/* harmony export */ });
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
/* harmony import */ var _strip_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strip-prefix */ "./.cache/strip-prefix.js");
/* harmony import */ var _normalize_page_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normalize-page-path */ "./.cache/normalize-page-path.js");
/* harmony import */ var _redirect_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redirect-utils.js */ "./.cache/redirect-utils.js");




const pathCache = new Map();
let matchPaths = [];
const trimPathname = rawPathname => {
  let newRawPathname = rawPathname;
  const queryIndex = rawPathname.indexOf(`?`);
  if (queryIndex !== -1) {
    const [path, qs] = rawPathname.split(`?`);
    newRawPathname = `${path}?${encodeURIComponent(qs)}`;
  }
  const pathname = decodeURIComponent(newRawPathname);

  // Remove the pathPrefix from the pathname.
  const trimmedPathname = (0,_strip_prefix__WEBPACK_IMPORTED_MODULE_1__["default"])(pathname, decodeURIComponent(""))
  // Remove any hashfragment
  .split(`#`)[0];
  return trimmedPathname;
};
function absolutify(path) {
  // If it's already absolute, return as-is
  if (path.startsWith(`/`) || path.startsWith(`https://`) || path.startsWith(`http://`)) {
    return path;
  }
  // Calculate path relative to current location, adding a trailing slash to
  // match behavior of @reach/router
  return new URL(path, window.location.href + (window.location.href.endsWith(`/`) ? `` : `/`)).pathname;
}

/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */
const setMatchPaths = value => {
  matchPaths = value;
};

/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */
const findMatchPath = rawPathname => {
  const trimmedPathname = cleanPath(rawPathname);
  const pickPaths = matchPaths.map(({
    path,
    matchPath
  }) => {
    return {
      path: matchPath,
      originalPath: path
    };
  });
  const path = (0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__.pick)(pickPaths, trimmedPathname);
  if (path) {
    return (0,_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(path.route.originalPath);
  }
  return null;
};

/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */
const grabMatchParams = rawPathname => {
  const trimmedPathname = cleanPath(rawPathname);
  const pickPaths = matchPaths.map(({
    path,
    matchPath
  }) => {
    return {
      path: matchPath,
      originalPath: path
    };
  });
  const path = (0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__.pick)(pickPaths, trimmedPathname);
  if (path) {
    return path.params;
  }
  return {};
};

// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath = rawPathname => {
  const trimmedPathname = trimPathname(absolutify(rawPathname));
  if (pathCache.has(trimmedPathname)) {
    return pathCache.get(trimmedPathname);
  }
  const redirect = (0,_redirect_utils_js__WEBPACK_IMPORTED_MODULE_3__.maybeGetBrowserRedirect)(rawPathname);
  if (redirect) {
    return findPath(redirect.toPath);
  }
  let foundPath = findMatchPath(trimmedPathname);
  if (!foundPath) {
    foundPath = cleanPath(rawPathname);
  }
  pathCache.set(trimmedPathname, foundPath);
  return foundPath;
};

/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */
const cleanPath = rawPathname => {
  const trimmedPathname = trimPathname(absolutify(rawPathname));
  let foundPath = trimmedPathname;
  if (foundPath === `/index.html`) {
    foundPath = `/`;
  }
  foundPath = (0,_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(foundPath);
  return foundPath;
};

/***/ }),

/***/ "./.cache/gatsby-browser-entry.js":
/*!****************************************!*\
  !*** ./.cache/gatsby-browser-entry.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Link": () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.Link),
/* harmony export */   "PageRenderer": () => (/* reexport default from dynamic */ _public_page_renderer__WEBPACK_IMPORTED_MODULE_1___default.a),
/* harmony export */   "Script": () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.Script),
/* harmony export */   "ScriptStrategy": () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.ScriptStrategy),
/* harmony export */   "Slice": () => (/* reexport safe */ _slice__WEBPACK_IMPORTED_MODULE_5__.Slice),
/* harmony export */   "StaticQuery": () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.StaticQuery),
/* harmony export */   "StaticQueryContext": () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.StaticQueryContext),
/* harmony export */   "collectedScriptsByPage": () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.collectedScriptsByPage),
/* harmony export */   "graphql": () => (/* binding */ graphql),
/* harmony export */   "navigate": () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.navigate),
/* harmony export */   "parsePath": () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.parsePath),
/* harmony export */   "prefetchPathname": () => (/* binding */ prefetchPathname),
/* harmony export */   "scriptCache": () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.scriptCache),
/* harmony export */   "scriptCallbackCache": () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.scriptCallbackCache),
/* harmony export */   "useScrollRestoration": () => (/* reexport safe */ gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__.useScrollRestoration),
/* harmony export */   "useStaticQuery": () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.useStaticQuery),
/* harmony export */   "withAssetPrefix": () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.withAssetPrefix),
/* harmony export */   "withPrefix": () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.withPrefix)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ "./.cache/loader.js");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public-page-renderer */ "./.cache/public-page-renderer.js");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_page_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-react-router-scroll */ "./node_modules/gatsby-react-router-scroll/index.js");
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-link */ "./node_modules/gatsby-link/dist/index.modern.mjs");
/* harmony import */ var _static_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./static-query */ "./.cache/static-query.js");
/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slice */ "./.cache/slice.js");
/* harmony import */ var gatsby_script__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gatsby-script */ "./node_modules/gatsby-script/dist/index.modern.mjs");

const prefetchPathname = _loader__WEBPACK_IMPORTED_MODULE_0__["default"].enqueue;
function graphql() {
  throw new Error(`It appears like Gatsby is misconfigured. Gatsby related \`graphql\` calls ` + `are supposed to only be evaluated at compile time, and then compiled away. ` + `Unfortunately, something went wrong and the query was left in the compiled code.\n\n` + `Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.`);
}








/***/ }),

/***/ "./.cache/loader.js":
/*!**************************!*\
  !*** ./.cache/loader.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseLoader": () => (/* binding */ BaseLoader),
/* harmony export */   "PageResourceStatus": () => (/* binding */ PageResourceStatus),
/* harmony export */   "ProdLoader": () => (/* binding */ ProdLoader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getSliceResults": () => (/* binding */ getSliceResults),
/* harmony export */   "getStaticQueryResults": () => (/* binding */ getStaticQueryResults),
/* harmony export */   "publicLoader": () => (/* binding */ publicLoader),
/* harmony export */   "setLoader": () => (/* binding */ setLoader)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-server-dom-webpack */ "./node_modules/react-server-dom-webpack/index.js");
/* harmony import */ var _prefetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prefetch */ "./.cache/prefetch.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emitter */ "./.cache/emitter.js");
/* harmony import */ var _find_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./find-path */ "./.cache/find-path.js");





/**
 * Available resource loading statuses
 */
const PageResourceStatus = {
  /**
   * At least one of critical resources failed to load
   */
  Error: `error`,
  /**
   * Resources loaded successfully
   */
  Success: `success`
};
const preferDefault = m => m && m.default || m;
const stripSurroundingSlashes = s => {
  s = s[0] === `/` ? s.slice(1) : s;
  s = s.endsWith(`/`) ? s.slice(0, -1) : s;
  return s;
};
const createPageDataUrl = rawPath => {
  const [path, maybeSearch] = rawPath.split(`?`);
  const fixedPath = path === `/` ? `index` : stripSurroundingSlashes(path);
  return `${""}/page-data/${fixedPath}/page-data.json${maybeSearch ? `?${maybeSearch}` : ``}`;
};
function doFetch(url, method = `GET`) {
  return new Promise(resolve => {
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        resolve(req);
      }
    };
    req.send(null);
  });
}
const doesConnectionSupportPrefetch = () => {
  if (`connection` in navigator && typeof navigator.connection !== `undefined`) {
    if ((navigator.connection.effectiveType || ``).includes(`2g`)) {
      return false;
    }
    if (navigator.connection.saveData) {
      return false;
    }
  }
  return true;
};

// Regex that matches common search crawlers
const BOT_REGEX = /bot|crawler|spider|crawling/i;
const toPageResources = (pageData, component = null, head) => {
  var _pageData$slicesMap;
  const page = {
    componentChunkName: pageData.componentChunkName,
    path: pageData.path,
    webpackCompilationHash: pageData.webpackCompilationHash,
    matchPath: pageData.matchPath,
    staticQueryHashes: pageData.staticQueryHashes,
    getServerDataError: pageData.getServerDataError,
    slicesMap: (_pageData$slicesMap = pageData.slicesMap) !== null && _pageData$slicesMap !== void 0 ? _pageData$slicesMap : {}
  };
  return {
    component,
    head,
    json: pageData.result,
    page
  };
};
function waitForResponse(response) {
  return new Promise(resolve => {
    try {
      const result = response.readRoot();
      resolve(result);
    } catch (err) {
      if (Object.hasOwnProperty.call(err, `_response`) && Object.hasOwnProperty.call(err, `_status`)) {
        setTimeout(() => {
          waitForResponse(response).then(resolve);
        }, 200);
      } else {
        throw err;
      }
    }
  });
}
class BaseLoader {
  constructor(loadComponent, matchPaths) {
    this.inFlightNetworkRequests = new Map();
    // Map of pagePath -> Page. Where Page is an object with: {
    //   status: PageResourceStatus.Success || PageResourceStatus.Error,
    //   payload: PageResources, // undefined if PageResourceStatus.Error
    // }
    // PageResources is {
    //   component,
    //   json: pageData.result,
    //   page: {
    //     componentChunkName,
    //     path,
    //     webpackCompilationHash,
    //     staticQueryHashes
    //   },
    //   staticQueryResults
    // }
    this.pageDb = new Map();
    this.inFlightDb = new Map();
    this.staticQueryDb = {};
    this.pageDataDb = new Map();
    this.partialHydrationDb = new Map();
    this.slicesDataDb = new Map();
    this.sliceInflightDb = new Map();
    this.slicesDb = new Map();
    this.isPrefetchQueueRunning = false;
    this.prefetchQueued = [];
    this.prefetchTriggered = new Set();
    this.prefetchCompleted = new Set();
    this.loadComponent = loadComponent;
    (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.setMatchPaths)(matchPaths);
  }
  memoizedGet(url) {
    let inFlightPromise = this.inFlightNetworkRequests.get(url);
    if (!inFlightPromise) {
      inFlightPromise = doFetch(url, `GET`);
      this.inFlightNetworkRequests.set(url, inFlightPromise);
    }

    // Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
    return inFlightPromise.then(response => {
      this.inFlightNetworkRequests.delete(url);
      return response;
    }).catch(err => {
      this.inFlightNetworkRequests.delete(url);
      throw err;
    });
  }
  setApiRunner(apiRunner) {
    this.apiRunner = apiRunner;
    this.prefetchDisabled = apiRunner(`disableCorePrefetching`).some(a => a);
  }
  fetchPageDataJson(loadObj) {
    const {
      pagePath,
      retries = 0
    } = loadObj;
    const url = createPageDataUrl(pagePath);
    return this.memoizedGet(url).then(req => {
      const {
        status,
        responseText
      } = req;

      // Handle 200
      if (status === 200) {
        try {
          const jsonPayload = JSON.parse(responseText);
          if (jsonPayload.path === undefined) {
            throw new Error(`not a valid pageData response`);
          }
          const maybeSearch = pagePath.split(`?`)[1];
          if (maybeSearch && !jsonPayload.path.includes(maybeSearch)) {
            jsonPayload.path += `?${maybeSearch}`;
          }
          return Object.assign(loadObj, {
            status: PageResourceStatus.Success,
            payload: jsonPayload
          });
        } catch (err) {
          // continue regardless of error
        }
      }

      // Handle 404
      if (status === 404 || status === 200) {
        // If the request was for a 404/500 page and it doesn't exist, we're done
        if (pagePath === `/404.html` || pagePath === `/500.html`) {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Error
          });
        }

        // Need some code here to cache the 404 request. In case
        // multiple loadPageDataJsons result in 404s
        return this.fetchPageDataJson(Object.assign(loadObj, {
          pagePath: `/404.html`,
          notFound: true
        }));
      }

      // handle 500 response (Unrecoverable)
      if (status === 500) {
        return this.fetchPageDataJson(Object.assign(loadObj, {
          pagePath: `/500.html`,
          internalServerError: true
        }));
      }

      // Handle everything else, including status === 0, and 503s. Should retry
      if (retries < 3) {
        return this.fetchPageDataJson(Object.assign(loadObj, {
          retries: retries + 1
        }));
      }

      // Retried 3 times already, result is an error.
      return Object.assign(loadObj, {
        status: PageResourceStatus.Error
      });
    });
  }
  fetchPartialHydrationJson(loadObj) {
    const {
      pagePath,
      retries = 0
    } = loadObj;
    const url = createPageDataUrl(pagePath).replace(`.json`, `-rsc.json`);
    return this.memoizedGet(url).then(req => {
      const {
        status,
        responseText
      } = req;

      // Handle 200
      if (status === 200) {
        try {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Success,
            payload: responseText
          });
        } catch (err) {
          // continue regardless of error
        }
      }

      // Handle 404
      if (status === 404 || status === 200) {
        // If the request was for a 404/500 page and it doesn't exist, we're done
        if (pagePath === `/404.html` || pagePath === `/500.html`) {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Error
          });
        }

        // Need some code here to cache the 404 request. In case
        // multiple loadPageDataJsons result in 404s
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          pagePath: `/404.html`,
          notFound: true
        }));
      }

      // handle 500 response (Unrecoverable)
      if (status === 500) {
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          pagePath: `/500.html`,
          internalServerError: true
        }));
      }

      // Handle everything else, including status === 0, and 503s. Should retry
      if (retries < 3) {
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          retries: retries + 1
        }));
      }

      // Retried 3 times already, result is an error.
      return Object.assign(loadObj, {
        status: PageResourceStatus.Error
      });
    });
  }
  loadPageDataJson(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.pageDataDb.has(pagePath)) {
      const pageData = this.pageDataDb.get(pagePath);
      if (true) {
        return Promise.resolve(pageData);
      }
    }
    return this.fetchPageDataJson({
      pagePath
    }).then(pageData => {
      this.pageDataDb.set(pagePath, pageData);
      return pageData;
    });
  }
  loadPartialHydrationJson(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.partialHydrationDb.has(pagePath)) {
      const pageData = this.partialHydrationDb.get(pagePath);
      if (true) {
        return Promise.resolve(pageData);
      }
    }
    return this.fetchPartialHydrationJson({
      pagePath
    }).then(pageData => {
      this.partialHydrationDb.set(pagePath, pageData);
      return pageData;
    });
  }
  loadSliceDataJson(sliceName) {
    if (this.slicesDataDb.has(sliceName)) {
      const jsonPayload = this.slicesDataDb.get(sliceName);
      return Promise.resolve({
        sliceName,
        jsonPayload
      });
    }
    const url = `/slice-data/${sliceName}.json`;
    return doFetch(url, `GET`).then(res => {
      const jsonPayload = JSON.parse(res.responseText);
      this.slicesDataDb.set(sliceName, jsonPayload);
      return {
        sliceName,
        jsonPayload
      };
    });
  }
  findMatchPath(rawPath) {
    return (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findMatchPath)(rawPath);
  }

  // TODO check all uses of this and whether they use undefined for page resources not exist
  loadPage(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.pageDb.has(pagePath)) {
      const page = this.pageDb.get(pagePath);
      if (true) {
        if (page.error) {
          return {
            error: page.error,
            status: page.status
          };
        }
        return Promise.resolve(page.payload);
      }
    }
    if (this.inFlightDb.has(pagePath)) {
      return this.inFlightDb.get(pagePath);
    }
    const loadDataPromises = [this.loadAppData(), this.loadPageDataJson(pagePath)];
    if (false) {}
    const inFlightPromise = Promise.all(loadDataPromises).then(allData => {
      const [appDataResponse, pageDataResponse, rscDataResponse] = allData;
      if (pageDataResponse.status === PageResourceStatus.Error || (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.status) === PageResourceStatus.Error) {
        return {
          status: PageResourceStatus.Error
        };
      }
      let pageData = pageDataResponse.payload;
      const {
        componentChunkName,
        staticQueryHashes: pageStaticQueryHashes = [],
        slicesMap = {}
      } = pageData;
      const finalResult = {};
      const dedupedSliceNames = Array.from(new Set(Object.values(slicesMap)));
      const loadSlice = slice => {
        if (this.slicesDb.has(slice.name)) {
          return this.slicesDb.get(slice.name);
        } else if (this.sliceInflightDb.has(slice.name)) {
          return this.sliceInflightDb.get(slice.name);
        }
        const inFlight = this.loadComponent(slice.componentChunkName).then(component => {
          return {
            component: preferDefault(component),
            sliceContext: slice.result.sliceContext,
            data: slice.result.data
          };
        });
        this.sliceInflightDb.set(slice.name, inFlight);
        inFlight.then(results => {
          this.slicesDb.set(slice.name, results);
          this.sliceInflightDb.delete(slice.name);
        });
        return inFlight;
      };
      return Promise.all(dedupedSliceNames.map(sliceName => this.loadSliceDataJson(sliceName))).then(slicesData => {
        const slices = [];
        const dedupedStaticQueryHashes = [...pageStaticQueryHashes];
        for (const {
          jsonPayload,
          sliceName
        } of Object.values(slicesData)) {
          slices.push({
            name: sliceName,
            ...jsonPayload
          });
          for (const staticQueryHash of jsonPayload.staticQueryHashes) {
            if (!dedupedStaticQueryHashes.includes(staticQueryHash)) {
              dedupedStaticQueryHashes.push(staticQueryHash);
            }
          }
        }
        const loadChunkPromises = [Promise.all(slices.map(loadSlice)), this.loadComponent(componentChunkName, `head`)];
        if (true) {
          loadChunkPromises.push(this.loadComponent(componentChunkName));
        }

        // In develop we have separate chunks for template and Head components
        // to enable HMR (fast refresh requires single exports).
        // In production we have shared chunk with both exports. Double loadComponent here
        // will be deduped by webpack runtime resulting in single request and single module
        // being loaded for both `component` and `head`.
        // get list of components to get
        const componentChunkPromises = Promise.all(loadChunkPromises).then(components => {
          const [sliceComponents, headComponent, pageComponent] = components;
          finalResult.createdAt = new Date();
          for (const sliceComponent of sliceComponents) {
            if (!sliceComponent || sliceComponent instanceof Error) {
              finalResult.status = PageResourceStatus.Error;
              finalResult.error = sliceComponent;
            }
          }
          if ( true && (!pageComponent || pageComponent instanceof Error)) {
            finalResult.status = PageResourceStatus.Error;
            finalResult.error = pageComponent;
          }
          let pageResources;
          if (finalResult.status !== PageResourceStatus.Error) {
            finalResult.status = PageResourceStatus.Success;
            if (pageDataResponse.notFound === true || (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.notFound) === true) {
              finalResult.notFound = true;
            }
            pageData = Object.assign(pageData, {
              webpackCompilationHash: appDataResponse ? appDataResponse.webpackCompilationHash : ``
            });
            if (typeof (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.payload) === `string`) {
              pageResources = toPageResources(pageData, null, headComponent);
              pageResources.partialHydration = rscDataResponse.payload;
              const readableStream = new ReadableStream({
                start(controller) {
                  const te = new TextEncoder();
                  controller.enqueue(te.encode(rscDataResponse.payload));
                },
                pull(controller) {
                  // close on next read when queue is empty
                  controller.close();
                },
                cancel() {}
              });
              return waitForResponse((0,react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_0__.createFromReadableStream)(readableStream)).then(result => {
                pageResources.partialHydration = result;
                return pageResources;
              });
            } else {
              pageResources = toPageResources(pageData, pageComponent, headComponent);
            }
          }

          // undefined if final result is an error
          return pageResources;
        });

        // get list of static queries to get
        const staticQueryBatchPromise = Promise.all(dedupedStaticQueryHashes.map(staticQueryHash => {
          // Check for cache in case this static query result has already been loaded
          if (this.staticQueryDb[staticQueryHash]) {
            const jsonPayload = this.staticQueryDb[staticQueryHash];
            return {
              staticQueryHash,
              jsonPayload
            };
          }
          return this.memoizedGet(`${""}/page-data/sq/d/${staticQueryHash}.json`).then(req => {
            const jsonPayload = JSON.parse(req.responseText);
            return {
              staticQueryHash,
              jsonPayload
            };
          }).catch(() => {
            throw new Error(`We couldn't load "${""}/page-data/sq/d/${staticQueryHash}.json"`);
          });
        })).then(staticQueryResults => {
          const staticQueryResultsMap = {};
          staticQueryResults.forEach(({
            staticQueryHash,
            jsonPayload
          }) => {
            staticQueryResultsMap[staticQueryHash] = jsonPayload;
            this.staticQueryDb[staticQueryHash] = jsonPayload;
          });
          return staticQueryResultsMap;
        });
        return Promise.all([componentChunkPromises, staticQueryBatchPromise]).then(([pageResources, staticQueryResults]) => {
          let payload;
          if (pageResources) {
            payload = {
              ...pageResources,
              staticQueryResults
            };
            finalResult.payload = payload;
            _emitter__WEBPACK_IMPORTED_MODULE_2__["default"].emit(`onPostLoadPageResources`, {
              page: payload,
              pageResources: payload
            });
          }
          this.pageDb.set(pagePath, finalResult);
          if (finalResult.error) {
            return {
              error: finalResult.error,
              status: finalResult.status
            };
          }
          return payload;
        })
        // when static-query fail to load we throw a better error
        .catch(err => {
          return {
            error: err,
            status: PageResourceStatus.Error
          };
        });
      });
    });
    inFlightPromise.then(() => {
      this.inFlightDb.delete(pagePath);
    }).catch(error => {
      this.inFlightDb.delete(pagePath);
      throw error;
    });
    this.inFlightDb.set(pagePath, inFlightPromise);
    return inFlightPromise;
  }

  // returns undefined if the page does not exists in cache
  loadPageSync(rawPath, options = {}) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.pageDb.has(pagePath)) {
      const pageData = this.pageDb.get(pagePath);
      if (pageData.payload) {
        return pageData.payload;
      }
      if (options !== null && options !== void 0 && options.withErrorDetails) {
        return {
          error: pageData.error,
          status: pageData.status
        };
      }
    }
    return undefined;
  }
  shouldPrefetch(pagePath) {
    // Skip prefetching if we know user is on slow or constrained connection
    if (!doesConnectionSupportPrefetch()) {
      return false;
    }

    // Don't prefetch if this is a crawler bot
    if (navigator.userAgent && BOT_REGEX.test(navigator.userAgent)) {
      return false;
    }

    // Check if the page exists.
    if (this.pageDb.has(pagePath)) {
      return false;
    }
    return true;
  }
  prefetch(pagePath) {
    if (!this.shouldPrefetch(pagePath)) {
      return {
        then: resolve => resolve(false),
        abort: () => {}
      };
    }
    if (this.prefetchTriggered.has(pagePath)) {
      return {
        then: resolve => resolve(true),
        abort: () => {}
      };
    }
    const defer = {
      resolve: null,
      reject: null,
      promise: null
    };
    defer.promise = new Promise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });
    this.prefetchQueued.push([pagePath, defer]);
    const abortC = new AbortController();
    abortC.signal.addEventListener(`abort`, () => {
      const index = this.prefetchQueued.findIndex(([p]) => p === pagePath);
      // remove from the queue
      if (index !== -1) {
        this.prefetchQueued.splice(index, 1);
      }
    });
    if (!this.isPrefetchQueueRunning) {
      this.isPrefetchQueueRunning = true;
      setTimeout(() => {
        this._processNextPrefetchBatch();
      }, 3000);
    }
    return {
      then: (resolve, reject) => defer.promise.then(resolve, reject),
      abort: abortC.abort.bind(abortC)
    };
  }
  _processNextPrefetchBatch() {
    const idleCallback = window.requestIdleCallback || (cb => setTimeout(cb, 0));
    idleCallback(() => {
      const toPrefetch = this.prefetchQueued.splice(0, 4);
      const prefetches = Promise.all(toPrefetch.map(([pagePath, dPromise]) => {
        // Tell plugins with custom prefetching logic that they should start
        // prefetching this path.
        if (!this.prefetchTriggered.has(pagePath)) {
          this.apiRunner(`onPrefetchPathname`, {
            pathname: pagePath
          });
          this.prefetchTriggered.add(pagePath);
        }

        // If a plugin has disabled core prefetching, stop now.
        if (this.prefetchDisabled) {
          return dPromise.resolve(false);
        }
        return this.doPrefetch((0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(pagePath)).then(() => {
          if (!this.prefetchCompleted.has(pagePath)) {
            this.apiRunner(`onPostPrefetchPathname`, {
              pathname: pagePath
            });
            this.prefetchCompleted.add(pagePath);
          }
          dPromise.resolve(true);
        });
      }));
      if (this.prefetchQueued.length) {
        prefetches.then(() => {
          setTimeout(() => {
            this._processNextPrefetchBatch();
          }, 3000);
        });
      } else {
        this.isPrefetchQueueRunning = false;
      }
    });
  }
  doPrefetch(pagePath) {
    const pageDataUrl = createPageDataUrl(pagePath);
    if (false) {} else {
      return (0,_prefetch__WEBPACK_IMPORTED_MODULE_1__["default"])(pageDataUrl, {
        crossOrigin: `anonymous`,
        as: `fetch`
      }).then(() =>
      // This was just prefetched, so will return a response from
      // the cache instead of making another request to the server
      this.loadPageDataJson(pagePath));
    }
  }
  hovering(rawPath) {
    this.loadPage(rawPath);
  }
  getResourceURLsForPathname(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    const page = this.pageDataDb.get(pagePath);
    if (page) {
      const pageResources = toPageResources(page.payload);
      return [...createComponentUrls(pageResources.page.componentChunkName), createPageDataUrl(pagePath)];
    } else {
      return null;
    }
  }
  isPageNotFound(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    const page = this.pageDb.get(pagePath);
    return !page || page.notFound;
  }
  loadAppData(retries = 0) {
    return this.memoizedGet(`${""}/page-data/app-data.json`).then(req => {
      const {
        status,
        responseText
      } = req;
      let appData;
      if (status !== 200 && retries < 3) {
        // Retry 3 times incase of non-200 responses
        return this.loadAppData(retries + 1);
      }

      // Handle 200
      if (status === 200) {
        try {
          const jsonPayload = JSON.parse(responseText);
          if (jsonPayload.webpackCompilationHash === undefined) {
            throw new Error(`not a valid app-data response`);
          }
          appData = jsonPayload;
        } catch (err) {
          // continue regardless of error
        }
      }
      return appData;
    });
  }
}
const createComponentUrls = componentChunkName => (window.___chunkMapping[componentChunkName] || []).map(chunk => "" + chunk);
class ProdLoader extends BaseLoader {
  constructor(asyncRequires, matchPaths, pageData) {
    const loadComponent = (chunkName, exportType = `components`) => {
      if (true) {
        exportType = `components`;
      }
      if (!asyncRequires[exportType][chunkName]) {
        throw new Error(`We couldn't find the correct component chunk with the name "${chunkName}"`);
      }
      return asyncRequires[exportType][chunkName]()
      // loader will handle the case when component is error
      .catch(err => err);
    };
    super(loadComponent, matchPaths);
    if (pageData) {
      this.pageDataDb.set((0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(pageData.path), {
        pagePath: pageData.path,
        payload: pageData,
        status: `success`
      });
    }
  }
  doPrefetch(pagePath) {
    return super.doPrefetch(pagePath).then(result => {
      if (result.status !== PageResourceStatus.Success) {
        return Promise.resolve();
      }
      const pageData = result.payload;
      const chunkName = pageData.componentChunkName;
      const componentUrls = createComponentUrls(chunkName);
      return Promise.all(componentUrls.map(_prefetch__WEBPACK_IMPORTED_MODULE_1__["default"])).then(() => pageData);
    });
  }
  loadPageDataJson(rawPath) {
    return super.loadPageDataJson(rawPath).then(data => {
      if (data.notFound) {
        // check if html file exist using HEAD request:
        // if it does we should navigate to it instead of showing 404
        return doFetch(rawPath, `HEAD`).then(req => {
          if (req.status === 200) {
            // page (.html file) actually exist (or we asked for 404 )
            // returning page resources status as errored to trigger
            // regular browser navigation to given page
            return {
              status: PageResourceStatus.Error
            };
          }

          // if HEAD request wasn't 200, return notFound result
          // and show 404 page
          return data;
        });
      }
      return data;
    });
  }
  loadPartialHydrationJson(rawPath) {
    return super.loadPartialHydrationJson(rawPath).then(data => {
      if (data.notFound) {
        // check if html file exist using HEAD request:
        // if it does we should navigate to it instead of showing 404
        return doFetch(rawPath, `HEAD`).then(req => {
          if (req.status === 200) {
            // page (.html file) actually exist (or we asked for 404 )
            // returning page resources status as errored to trigger
            // regular browser navigation to given page
            return {
              status: PageResourceStatus.Error
            };
          }

          // if HEAD request wasn't 200, return notFound result
          // and show 404 page
          return data;
        });
      }
      return data;
    });
  }
}
let instance;
const setLoader = _loader => {
  instance = _loader;
};
const publicLoader = {
  enqueue: rawPath => instance.prefetch(rawPath),
  // Real methods
  getResourceURLsForPathname: rawPath => instance.getResourceURLsForPathname(rawPath),
  loadPage: rawPath => instance.loadPage(rawPath),
  // TODO add deprecation to v4 so people use withErrorDetails and then we can remove in v5 and change default behaviour
  loadPageSync: (rawPath, options = {}) => instance.loadPageSync(rawPath, options),
  prefetch: rawPath => instance.prefetch(rawPath),
  isPageNotFound: rawPath => instance.isPageNotFound(rawPath),
  hovering: rawPath => instance.hovering(rawPath),
  loadAppData: () => instance.loadAppData()
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (publicLoader);
function getStaticQueryResults() {
  if (instance) {
    return instance.staticQueryDb;
  } else {
    return {};
  }
}
function getSliceResults() {
  if (instance) {
    return instance.slicesDb;
  } else {
    return {};
  }
}

/***/ }),

/***/ "./.cache/normalize-page-path.js":
/*!***************************************!*\
  !*** ./.cache/normalize-page-path.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathAndSearch => {
  if (pathAndSearch === undefined) {
    return pathAndSearch;
  }
  let [path, search = ``] = pathAndSearch.split(`?`);
  if (search) {
    search = `?` + search;
  }
  if (path === `/`) {
    return `/` + search;
  }
  if (path.charAt(path.length - 1) === `/`) {
    return path.slice(0, -1) + search;
  }
  return path + search;
});

/***/ }),

/***/ "./.cache/prefetch.js":
/*!****************************!*\
  !*** ./.cache/prefetch.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const support = function (feature) {
  if (typeof document === `undefined`) {
    return false;
  }
  const fakeLink = document.createElement(`link`);
  try {
    if (fakeLink.relList && typeof fakeLink.relList.supports === `function`) {
      return fakeLink.relList.supports(feature);
    }
  } catch (err) {
    return false;
  }
  return false;
};
const linkPrefetchStrategy = function (url, options) {
  return new Promise((resolve, reject) => {
    if (typeof document === `undefined`) {
      reject();
      return;
    }
    const link = document.createElement(`link`);
    link.setAttribute(`rel`, `prefetch`);
    link.setAttribute(`href`, url);
    Object.keys(options).forEach(key => {
      link.setAttribute(key, options[key]);
    });
    link.onload = resolve;
    link.onerror = reject;
    const parentElement = document.getElementsByTagName(`head`)[0] || document.getElementsByName(`script`)[0].parentNode;
    parentElement.appendChild(link);
  });
};
const xhrPrefetchStrategy = function (url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(`GET`, url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve();
      } else {
        reject();
      }
    };
    req.send(null);
  });
};
const supportedPrefetchStrategy = support(`prefetch`) ? linkPrefetchStrategy : xhrPrefetchStrategy;
const preFetched = {};
const prefetch = function (url, options) {
  return new Promise(resolve => {
    if (preFetched[url]) {
      resolve();
      return;
    }
    supportedPrefetchStrategy(url, options).then(() => {
      resolve();
      preFetched[url] = true;
    }).catch(() => {}); // 404s are logged to the console anyway
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prefetch);

/***/ }),

/***/ "./.cache/public-page-renderer.js":
/*!****************************************!*\
  !*** ./.cache/public-page-renderer.js ***!
  \****************************************/
/***/ ((module) => {

const preferDefault = m => m && m.default || m;
if (false) {} else if (false) {} else {
  module.exports = () => null;
}

/***/ }),

/***/ "./.cache/redirect-utils.js":
/*!**********************************!*\
  !*** ./.cache/redirect-utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "maybeGetBrowserRedirect": () => (/* binding */ maybeGetBrowserRedirect)
/* harmony export */ });
/* harmony import */ var _redirects_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./redirects.json */ "./.cache/redirects.json");


// Convert to a map for faster lookup in maybeRedirect()

const redirectMap = new Map();
const redirectIgnoreCaseMap = new Map();
_redirects_json__WEBPACK_IMPORTED_MODULE_0__.forEach(redirect => {
  if (redirect.ignoreCase) {
    redirectIgnoreCaseMap.set(redirect.fromPath, redirect);
  } else {
    redirectMap.set(redirect.fromPath, redirect);
  }
});
function maybeGetBrowserRedirect(pathname) {
  let redirect = redirectMap.get(pathname);
  if (!redirect) {
    redirect = redirectIgnoreCaseMap.get(pathname.toLowerCase());
  }
  return redirect;
}

/***/ }),

/***/ "./.cache/slice.js":
/*!*************************!*\
  !*** ./.cache/slice.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Slice": () => (/* binding */ Slice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slice_server_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice/server-slice */ "./.cache/slice/server-slice.js");
/* harmony import */ var _slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice/inline-slice */ "./.cache/slice/inline-slice.js");
/* harmony import */ var _slice_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice/context */ "./.cache/slice/context.js");
"use client";





function Slice(props) {
  if (true) {
    // we use sliceName internally, so remap alias to sliceName
    const internalProps = {
      ...props,
      sliceName: props.alias
    };
    delete internalProps.alias;
    delete internalProps.__renderedByLocation;
    const slicesContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_slice_context__WEBPACK_IMPORTED_MODULE_3__.SlicesContext);

    // validate props
    const propErrors = validateSliceProps(props);
    if (Object.keys(propErrors).length) {
      throw new SlicePropsError(slicesContext.renderEnvironment === `browser`, internalProps.sliceName, propErrors, props.__renderedByLocation);
    }
    if (slicesContext.renderEnvironment === `server`) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_slice_server_slice__WEBPACK_IMPORTED_MODULE_1__.ServerSlice, internalProps);
    } else if (slicesContext.renderEnvironment === `browser`) {
      // in the browser, we'll just render the component as is
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__.InlineSlice, internalProps);
    } else if (slicesContext.renderEnvironment === `engines`) {
      // if we're in SSR, we'll just render the component as is
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__.InlineSlice, internalProps);
    } else if (slicesContext.renderEnvironment === `slices`) {
      // we are not yet supporting nested slices

      let additionalContextMessage = ``;

      // just in case generating additional contextual information fails, we still want the base message to show
      // and not show another cryptic error message
      try {
        additionalContextMessage = `\n\nSlice component "${slicesContext.sliceRoot.name}" (${slicesContext.sliceRoot.componentPath}) tried to render <Slice alias="${props.alias}"/>`;
      } catch {
        // don't need to handle it, we will just skip the additional context message if we fail to generate it
      }
      throw new Error(`Nested slices are not supported.${additionalContextMessage}\n\nSee https://v5.gatsbyjs.com/docs/reference/built-in-components/gatsby-slice#nested-slices`);
    } else {
      throw new Error(`Slice context "${slicesContext.renderEnvironment}" is not supported.`);
    }
  } else {}
}
class SlicePropsError extends Error {
  constructor(inBrowser, sliceName, propErrors, renderedByLocation) {
    const errors = Object.entries(propErrors).map(([key, value]) => `not serializable "${value}" type passed to "${key}" prop`).join(`, `);
    const name = `SlicePropsError`;
    let stack = ``;
    let message = ``;
    if (inBrowser) {
      // They're just (kinda) kidding, I promise... You can still work here <3
      //   https://www.gatsbyjs.com/careers/
      const fullStack = react__WEBPACK_IMPORTED_MODULE_0___default().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getCurrentStack();

      // remove the first line of the stack trace
      const stackLines = fullStack.trim().split(`\n`).slice(1);
      stackLines[0] = stackLines[0].trim();
      stack = `\n` + stackLines.join(`\n`);
      message = `Slice "${sliceName}" was passed props that are not serializable (${errors}).`;
    } else {
      // we can't really grab any extra info outside of the browser, so just print what we can
      message = `${name}: Slice "${sliceName}" was passed props that are not serializable (${errors}).`;
      const stackLines = new Error().stack.trim().split(`\n`).slice(2);
      stack = `${message}\n${stackLines.join(`\n`)}`;
    }
    super(message);
    this.name = name;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, SlicePropsError);
    }
    if (renderedByLocation) {
      this.forcedLocation = {
        ...renderedByLocation,
        functionName: `Slice`
      };
    }
  }
}
const validateSliceProps = (props, errors = {}, seenObjects = [], path = null) => {
  // recursively validate all props
  for (const [name, value] of Object.entries(props)) {
    if (value === undefined || value === null || !path && name === `children`) {
      continue;
    }
    const propPath = path ? `${path}.${name}` : name;
    if (typeof value === `function`) {
      errors[propPath] = typeof value;
    } else if (typeof value === `object` && seenObjects.indexOf(value) <= 0) {
      seenObjects.push(value);
      validateSliceProps(value, errors, seenObjects, propPath);
    }
  }
  return errors;
};

/***/ }),

/***/ "./.cache/slice/context.js":
/*!*********************************!*\
  !*** ./.cache/slice/context.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SlicesContext": () => (/* binding */ SlicesContext),
/* harmony export */   "SlicesMapContext": () => (/* binding */ SlicesMapContext),
/* harmony export */   "SlicesPropsContext": () => (/* binding */ SlicesPropsContext),
/* harmony export */   "SlicesResultsContext": () => (/* binding */ SlicesResultsContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SlicesResultsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesMapContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesPropsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});


/***/ }),

/***/ "./.cache/slice/inline-slice.js":
/*!**************************************!*\
  !*** ./.cache/slice/inline-slice.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InlineSlice": () => (/* binding */ InlineSlice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./.cache/slice/context.js");


const InlineSlice = ({
  sliceName,
  allowEmpty,
  children,
  ...sliceProps
}) => {
  const slicesMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__.SlicesMapContext);
  const slicesResultsMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__.SlicesResultsContext);
  const concreteSliceName = slicesMap[sliceName];
  const slice = slicesResultsMap.get(concreteSliceName);
  if (!slice) {
    if (allowEmpty) {
      return null;
    } else {
      throw new Error(`Slice "${concreteSliceName}" for "${sliceName}" slot not found`);
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(slice.component, Object.assign({
    sliceContext: slice.sliceContext,
    data: slice.data
  }, sliceProps), children);
};

/***/ }),

/***/ "./.cache/slice/server-slice-renderer.js":
/*!***********************************************!*\
  !*** ./.cache/slice/server-slice-renderer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerSliceRenderer": () => (/* binding */ ServerSliceRenderer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ServerSliceRenderer = ({
  sliceId,
  children
}) => {
  const contents = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-start`, {
    id: `${sliceId}-1`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-end`, {
    id: `${sliceId}-1`
  })];
  if (children) {
    // if children exist, we split the slice into a before and after piece
    // see renderSlices in render-html
    contents.push(children);
    contents.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-start`, {
      id: `${sliceId}-2`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-end`, {
      id: `${sliceId}-2`
    }));
  }
  return contents;
};

/***/ }),

/***/ "./.cache/slice/server-slice.js":
/*!**************************************!*\
  !*** ./.cache/slice/server-slice.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerSlice": () => (/* binding */ ServerSlice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_core_utils_create_content_digest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby-core-utils/create-content-digest */ "./node_modules/gatsby-core-utils/dist/create-content-digest.mjs");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "./.cache/slice/context.js");
/* harmony import */ var _server_slice_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server-slice-renderer */ "./.cache/slice/server-slice-renderer.js");




const getSliceId = (sliceName, sliceProps) => {
  if (!Object.keys(sliceProps).length) {
    return sliceName;
  }
  const propsString = (0,gatsby_core_utils_create_content_digest__WEBPACK_IMPORTED_MODULE_1__.createContentDigest)(sliceProps);
  return `${sliceName}-${propsString}`;
};
const ServerSlice = ({
  sliceName,
  allowEmpty,
  children,
  ...sliceProps
}) => {
  const slicesMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_2__.SlicesMapContext);
  const slicesProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_2__.SlicesPropsContext);
  const concreteSliceName = slicesMap[sliceName];
  if (!concreteSliceName) {
    if (allowEmpty) {
      return null;
    } else {
      throw new Error(`Slice "${concreteSliceName}" for "${sliceName}" slot not found`);
    }
  }
  const sliceId = getSliceId(concreteSliceName, sliceProps);

  // set props on context object for static-entry to return
  let sliceUsage = slicesProps[sliceId];
  if (!sliceUsage) {
    slicesProps[sliceId] = sliceUsage = {
      props: sliceProps,
      sliceName: concreteSliceName,
      hasChildren: !!children
    };
  } else {
    if (children) {
      sliceUsage.hasChildren = true;
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_server_slice_renderer__WEBPACK_IMPORTED_MODULE_3__.ServerSliceRenderer, {
    sliceId: sliceId
  }, children);
};

/***/ }),

/***/ "./.cache/static-query.js":
/*!********************************!*\
  !*** ./.cache/static-query.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StaticQuery": () => (/* binding */ StaticQuery),
/* harmony export */   "StaticQueryContext": () => (/* binding */ StaticQueryContext),
/* harmony export */   "useStaticQuery": () => (/* binding */ useStaticQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context-utils */ "./.cache/context-utils.js");



const StaticQueryContext = (0,_context_utils__WEBPACK_IMPORTED_MODULE_1__.createServerOrClientContext)(`StaticQuery`, {});
function StaticQueryDataRenderer({
  staticQueryData,
  data,
  query,
  render
}) {
  const finalData = data ? data.data : staticQueryData[query] && staticQueryData[query].data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, finalData && render(finalData), !finalData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading (StaticQuery)"));
}
let warnedAboutStaticQuery = false;

// TODO(v6): Remove completely
const StaticQuery = props => {
  const {
    data,
    query,
    render,
    children
  } = props;
  if ( true && !warnedAboutStaticQuery) {
    console.warn(`The <StaticQuery /> component is deprecated and will be removed in Gatsby v6. Use useStaticQuery instead. Refer to the migration guide for more information: https://gatsby.dev/migrating-4-to-5/#staticquery--is-deprecated`);
    warnedAboutStaticQuery = true;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StaticQueryContext.Consumer, null, staticQueryData => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StaticQueryDataRenderer, {
    data: data,
    query: query,
    render: render || children,
    staticQueryData: staticQueryData
  }));
};
StaticQuery.propTypes = {
  data: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  query: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
  render: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
const useStaticQuery = query => {
  var _context$query;
  if (typeof (react__WEBPACK_IMPORTED_MODULE_0___default().useContext) !== `function` && "development" === `development`) {
    // TODO(v5): Remove since we require React >= 18
    throw new Error(`You're likely using a version of React that doesn't support Hooks\n` + `Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.`);
  }
  const context = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(StaticQueryContext);

  // query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
  // to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
  // catch the misuse of the API and give proper direction
  if (isNaN(Number(query))) {
    throw new Error(`useStaticQuery was called with a string but expects to be called using \`graphql\`. Try this:

import { useStaticQuery, graphql } from 'gatsby';

useStaticQuery(graphql\`${query}\`);
`);
  }
  if ((_context$query = context[query]) !== null && _context$query !== void 0 && _context$query.data) {
    return context[query].data;
  } else {
    throw new Error(`The result of this StaticQuery could not be fetched.\n\n` + `This is likely a bug in Gatsby and if refreshing the page does not fix it, ` + `please open an issue in https://github.com/gatsbyjs/gatsby/issues`);
  }
};


/***/ }),

/***/ "./.cache/strip-prefix.js":
/*!********************************!*\
  !*** ./.cache/strip-prefix.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ stripPrefix)
/* harmony export */ });
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */

function stripPrefix(str, prefix = ``) {
  if (!prefix) {
    return str;
  }
  if (str === prefix) {
    return `/`;
  }
  if (str.startsWith(`${prefix}/`)) {
    return str.slice(prefix.length);
  }
  return str;
}

/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GatsbyImage": () => (/* binding */ B),
/* harmony export */   "MainImage": () => (/* binding */ z),
/* harmony export */   "Placeholder": () => (/* binding */ T),
/* harmony export */   "StaticImage": () => (/* binding */ V),
/* harmony export */   "generateImageData": () => (/* binding */ f),
/* harmony export */   "getImage": () => (/* binding */ M),
/* harmony export */   "getImageData": () => (/* binding */ x),
/* harmony export */   "getLowResolutionImageURL": () => (/* binding */ m),
/* harmony export */   "getSrc": () => (/* binding */ S),
/* harmony export */   "getSrcSet": () => (/* binding */ N),
/* harmony export */   "withArtDirection": () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




function n() {
  return n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, n.apply(this, arguments);
}
function o(e, t) {
  if (null == e) return {};
  var a,
    i,
    r = {},
    n = Object.keys(e);
  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);
  return r;
}
var s = [.25, .5, 1, 2],
  l = [750, 1080, 1366, 1920],
  u = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
  d = function (e) {
    return console.warn(e);
  },
  c = function (e, t) {
    return e - t;
  },
  h = function (e) {
    return e.map(function (e) {
      return e.src + " " + e.width + "w";
    }).join(",\n");
  };
function g(e) {
  var t = e.lastIndexOf(".");
  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}
function p(e) {
  var t = e.layout,
    i = void 0 === t ? "constrained" : t,
    r = e.width,
    o = e.height,
    s = e.sourceMetadata,
    l = e.breakpoints,
    u = e.aspectRatio,
    d = e.formats,
    c = void 0 === d ? ["auto", "webp"] : d;
  return c = c.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: c,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !u && (u = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (u || 1.3333333333333333))) : (r || (r = o && u ? o * u : s.width ? s.width : o ? Math.round(o / 1.3333333333333333) : 800), u && !o ? o = Math.round(r / u) : u || (u = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: u,
    layout: i,
    formats: c
  }));
}
function m(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = p(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}
function f(e) {
  var t,
    a = (e = p(e)).pluginName,
    i = e.sourceMetadata,
    r = e.generateImageSource,
    o = e.layout,
    u = e.fit,
    c = e.options,
    m = e.width,
    f = e.height,
    b = e.filename,
    k = e.reporter,
    E = void 0 === k ? {
      warn: d
    } : k,
    M = e.backgroundColor,
    S = e.placeholderURL;
  if (a || E.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = g(b)) : i = {
    width: m,
    height: f,
    format: (null == (t = i) ? void 0 : t.format) || g(b) || "auto"
  };
  var N = new Set(e.formats);
  (0 === N.size || N.has("auto") || N.has("")) && (N.delete("auto"), N.delete(""), N.add(i.format)), N.has("jpg") && N.has("png") && (E.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), N.delete("jpg" === i.format ? "png" : "jpg"));
  var x = function (e) {
      var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        u = void 0 === o ? {
          warn: d
        } : o,
        c = e.breakpoints,
        h = void 0 === c ? l : c,
        g = Object.entries({
          width: e.width,
          height: e.height
        }).filter(function (e) {
          var t = e[1];
          return "number" == typeof t && t < 1;
        });
      if (g.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + g.map(function (e) {
        return e.join(": ");
      }).join(", "));
      return "fixed" === i ? function (e) {
        var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          u = e.reporter,
          c = void 0 === u ? {
            warn: d
          } : u,
          h = a.width / a.height,
          g = v(void 0 === l ? s : l);
        if (i && r) {
          var p = y(a, {
            width: i,
            height: r,
            fit: o
          });
          i = p.width, r = p.height, h = p.aspectRatio;
        }
        i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : 800;
        var m = i;
        if (a.width < i || a.height < r) {
          var f = a.width < i ? "width" : "height";
          c.warn("\nThe requested " + f + ' "' + ("width" === f ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + f + " of " + a[f] + "px. If possible, replace the current image with a larger one."), "width" === f ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
        }
        return {
          sizes: g.filter(function (e) {
            return e >= 1;
          }).map(function (e) {
            return Math.round(e * i);
          }).filter(function (e) {
            return e <= a.width;
          }),
          aspectRatio: h,
          presentationWidth: m,
          presentationHeight: Math.round(m / h),
          unscaledWidth: i
        };
      }(e) : "constrained" === i ? w(e) : "fullWidth" === i ? w(n({
        breakpoints: h
      }, e)) : (u.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
        sizes: [r.width],
        presentationWidth: r.width,
        presentationHeight: r.height,
        aspectRatio: r.width / r.height,
        unscaledWidth: r.width
      });
    }(n({}, e, {
      sourceMetadata: i
    })),
    I = {
      sources: []
    },
    W = e.sizes;
  W || (W = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";
      case "fixed":
        return e + "px";
      case "fullWidth":
        return "100vw";
      default:
        return;
    }
  }(x.presentationWidth, o)), N.forEach(function (e) {
    var t = x.sizes.map(function (t) {
      var i = r(b, t, Math.round(t / x.aspectRatio), e, u, c);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      E.warn("[" + a + "] The resolver for image " + b + " returned an invalid value.");
    }).filter(Boolean);
    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === x.unscaledWidth;
      }) || t[0];
      i && (I.fallback = {
        src: i.src,
        srcSet: h(t),
        sizes: W
      });
    } else {
      var n;
      null == (n = I.sources) || n.push({
        srcSet: h(t),
        sizes: W,
        type: "image/" + e
      });
    }
  });
  var j = {
    images: I,
    layout: o,
    backgroundColor: M
  };
  switch (S && (j.placeholder = {
    fallback: S
  }), o) {
    case "fixed":
      j.width = x.presentationWidth, j.height = x.presentationHeight;
      break;
    case "fullWidth":
      j.width = 1, j.height = 1 / x.aspectRatio;
      break;
    case "constrained":
      j.width = e.width || x.presentationWidth || 1, j.height = (j.width || 1) / x.aspectRatio;
  }
  return j;
}
var v = function (e) {
  return Array.from(new Set([1].concat(e))).sort(c);
};
function w(e) {
  var t,
    a = e.sourceMetadata,
    i = e.width,
    r = e.height,
    n = e.fit,
    o = void 0 === n ? "cover" : n,
    l = e.outputPixelDensities,
    u = e.breakpoints,
    d = e.layout,
    h = a.width / a.height,
    g = v(void 0 === l ? s : l);
  if (i && r) {
    var p = y(a, {
      width: i,
      height: r,
      fit: o
    });
    i = p.width, r = p.height, h = p.aspectRatio;
  }
  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(800, a.width)) / h), i || (i = r * h);
  var m = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == u ? void 0 : u.length) > 0 ? (t = u.filter(function (e) {
    return e <= a.width;
  })).length < u.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== d || t.includes(i) || t.push(i), {
    sizes: t = t.sort(c),
    aspectRatio: h,
    presentationWidth: m,
    presentationHeight: Math.round(m / h),
    unscaledWidth: i
  };
}
function y(e, t) {
  var a = e.width / e.height,
    i = t.width,
    r = t.height;
  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;
    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
        o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;
    case "outside":
      var s = t.width ? t.width : 0,
        l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;
    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }
  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}
var b = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
  k = ["images", "placeholder"];
function E() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}
var M = function (e) {
    var t;
    return function (e) {
      var t, a;
      return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
    }(e) ? e : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImageData);
    }(e) ? e.gatsbyImageData : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImage);
    }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
  },
  S = function (e) {
    var t, a, i;
    return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
  },
  N = function (e) {
    var t, a, i;
    return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
  };
function x(e) {
  var t,
    a = e.baseUrl,
    i = e.urlBuilder,
    r = e.sourceWidth,
    s = e.sourceHeight,
    l = e.pluginName,
    d = void 0 === l ? "getImageData" : l,
    c = e.formats,
    h = void 0 === c ? ["auto"] : c,
    g = e.breakpoints,
    p = e.options,
    m = o(e, b);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = u), f(n({}, m, {
    pluginName: d,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}
function I(e, t) {
  var a,
    i,
    r,
    s = e.images,
    l = e.placeholder,
    u = n({}, o(e, k), {
      images: n({}, s, {
        sources: []
      }),
      placeholder: l && n({}, l, {
        sources: []
      })
    });
  return t.forEach(function (t) {
    var a,
      i = t.media,
      r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = u.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), u.placeholder && u.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = u.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = u.placeholder) || (r = i.sources).push.apply(r, l.sources)), u;
}
var W,
  j = ["src", "srcSet", "loading", "alt", "shouldLoad"],
  R = ["fallback", "sources", "shouldLoad"],
  _ = function (t) {
    var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      u = t.shouldLoad,
      d = o(t, j);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, d, {
      decoding: "async",
      loading: r,
      src: u ? a : void 0,
      "data-src": u ? void 0 : a,
      srcSet: u ? i : void 0,
      "data-srcset": u ? void 0 : i,
      alt: l
    }));
  },
  A = function (t) {
    var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      u = o(t, R),
      d = u.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_, n({}, u, a, {
        sizes: d,
        shouldLoad: l
      }));
    return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
      var a = t.media,
        i = t.srcSet,
        r = t.type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
        key: a + "-" + r + "-" + i,
        type: r,
        media: a,
        srcSet: l ? i : void 0,
        "data-srcset": l ? void 0 : i,
        sizes: d
      });
    }), c) : c;
  };
_.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, A.displayName = "Picture", A.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};
var O = ["fallback"],
  T = function (t) {
    var a = t.fallback,
      i = o(t, O);
    return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, i, {
      fallback: {
        src: a
      },
      "aria-hidden": !0,
      alt: ""
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
  };
T.displayName = "Placeholder", T.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (W = A.propTypes) ? void 0 : W.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};
var z = function (t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t, {
    shouldLoad: !0
  }))));
};
z.displayName = "MainImage", z.propTypes = A.propTypes;
var L = ["children"],
  q = function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
      type: "module",
      dangerouslySetInnerHTML: {
        __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
      }
    });
  },
  C = function (t) {
    var a = t.layout,
      i = t.width,
      r = t.height;
    return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "aria-hidden": !0,
      style: {
        paddingTop: r / i * 100 + "%"
      }
    }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        maxWidth: i,
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      alt: "",
      role: "presentation",
      "aria-hidden": "true",
      src: "data:image/svg+xml;charset=utf-8,%3Csvg height='" + r + "' width='" + i + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",
      style: {
        maxWidth: "100%",
        display: "block",
        position: "static"
      }
    })) : null;
  },
  D = function (a) {
    var i = a.children,
      r = o(a, L);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(q, null));
  },
  P = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
  H = ["style", "className"],
  F = function (e) {
    return e.replace(/\n/g, "");
  },
  B = function (t) {
    var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t.class,
      l = t.style,
      u = t.image,
      d = t.loading,
      c = void 0 === d ? "lazy" : d,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, P);
    if (!u) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
    s && (r = s), g = n({
      objectFit: m,
      objectPosition: f,
      backgroundColor: p
    }, g);
    var w = u.width,
      y = u.height,
      b = u.layout,
      k = u.images,
      M = u.placeholder,
      S = u.backgroundColor,
      N = function (e, t, a) {
        var i = {},
          r = "gatsby-image-wrapper";
        return E() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (E() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
          className: r,
          "data-gatsby-image-wrapper": "",
          style: i
        };
      }(w, y, b),
      x = N.style,
      I = N.className,
      W = o(N, H),
      j = {
        fallback: void 0,
        sources: []
      };
    return k.fallback && (j.fallback = n({}, k.fallback, {
      srcSet: k.fallback.srcSet ? F(k.fallback.srcSet) : void 0
    })), k.sources && (j.sources = k.sources.map(function (e) {
      return n({}, e, {
        srcSet: F(e.srcSet)
      });
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
      style: n({}, x, l, {
        backgroundColor: p
      }),
      className: I + (r ? " " + r : "")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, {
      layout: b,
      width: w,
      height: y
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(T, n({}, function (e, t, a, i, r, o, s, l) {
      var u = {};
      o && (u.backgroundColor = o, "fixed" === a ? (u.width = i, u.height = r, u.backgroundColor = o, u.position = "relative") : ("constrained" === a || "fullWidth" === a) && (u.position = "absolute", u.top = 0, u.left = 0, u.bottom = 0, u.right = 0)), s && (u.objectFit = s), l && (u.objectPosition = l);
      var d = n({}, e, {
        "aria-hidden": !0,
        "data-placeholder-image": "",
        style: n({
          opacity: 1,
          transition: "opacity 500ms linear"
        }, u)
      });
      return E() || (d.style = {
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      }), d;
    }(M, 0, b, w, y, S, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({
      "data-gatsby-image-ssr": "",
      className: h
    }, v, function (e, t, a, i, r) {
      return void 0 === r && (r = {}), E() || (r = n({
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        transform: "translateZ(0)",
        transition: "opacity 250ms linear",
        width: "100%",
        willChange: "opacity"
      }, r)), n({}, a, {
        loading: i,
        shouldLoad: e,
        "data-main-image": "",
        style: n({}, r, {
          opacity: 0
        })
      });
    }("eager" === c, 0, j, c, g)))));
  },
  G = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions", "breakpoints", "outputPixelDensities"],
  V = function (t) {
    return function (a) {
      var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, G);
      return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
        image: r
      }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
    };
  }(B),
  U = function (e, t) {
    return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
  },
  X = new Set(["fixed", "fullWidth", "constrained"]),
  Y = {
    src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
    alt: function (e, t, a) {
      return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
    },
    width: U,
    height: U,
    sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    layout: function (e) {
      if (void 0 !== e.layout && !X.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
    }
  };
V.displayName = "StaticImage", V.propTypes = Y;


/***/ }),

/***/ "./node_modules/gatsby-source-datocms/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/gatsby-source-datocms/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var React = __webpack_require__(/*! react */ "react");
var _require = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js"),
  Helmet = _require.Helmet;
var objectEntries = __webpack_require__(/*! object.entries */ "./node_modules/object.entries/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js");
var HelmetDatoCms = function HelmetDatoCms(_ref) {
  var seo = _ref.seo,
    favicon = _ref.favicon,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, ["seo", "favicon", "children"]);
  return React.createElement(Helmet, rest, (seo ? seo.tags : []).concat(favicon ? favicon.tags : []).map(function (item, i) {
    return React.createElement(item.tagName, objectAssign({
      key: "helmet-datocms-".concat(i)
    }, objectEntries(item.attributes || {}).reduce(function (acc, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        name = _ref3[0],
        value = _ref3[1];
      if (value) {
        acc[name] = value;
      }
      return acc;
    }, {})), item.content);
  }).concat(children));
};
module.exports = {
  HelmetDatoCms: HelmetDatoCms
};

/***/ }),

/***/ "./src/components/icons/arrow-back.jsx":
/*!*********************************************!*\
  !*** ./src/components/icons/arrow-back.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrowBack": () => (/* binding */ ArrowBack)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const ArrowBack = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/arrow-forward.jsx":
/*!************************************************!*\
  !*** ./src/components/icons/arrow-forward.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrowForward": () => (/* binding */ ArrowForward)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const ArrowForward = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/chevron-right.jsx":
/*!************************************************!*\
  !*** ./src/components/icons/chevron-right.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChevronRight": () => (/* binding */ ChevronRight)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const ChevronRight = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/clear.jsx":
/*!****************************************!*\
  !*** ./src/components/icons/clear.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Clear": () => (/* binding */ Clear)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const Clear = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/email.jsx":
/*!****************************************!*\
  !*** ./src/components/icons/email.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Email": () => (/* binding */ Email)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const Email = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22H17V20H12C7.66 20 4 16.34 4 12C4 7.66 7.66 4 12 4C16.34 4 20 7.66 20 12V13.43C20 14.22 19.29 15 18.5 15C17.71 15 17 14.22 17 13.43V12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C13.38 17 14.64 16.44 15.54 15.53C16.19 16.42 17.31 17 18.5 17C20.47 17 22 15.4 22 13.43V12C22 6.48 17.52 2 12 2ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/github.jsx":
/*!*****************************************!*\
  !*** ./src/components/icons/github.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Github": () => (/* binding */ Github)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from FontAwesome: https://fontawesome.com/search?o=r&f=brands
const Github = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M8.18255 17.6853C8.18255 17.7658 8.08991 17.8303 7.97309 17.8303C7.84017 17.8424 7.74752 17.7779 7.74752 17.6853C7.74752 17.6047 7.84017 17.5403 7.95698 17.5403C8.07782 17.5282 8.18255 17.5926 8.18255 17.6853ZM6.92983 17.504C6.90163 17.5846 6.98219 17.6772 7.10303 17.7014C7.20776 17.7417 7.3286 17.7014 7.35277 17.6208C7.37694 17.5403 7.30041 17.4476 7.17957 17.4114C7.07484 17.3832 6.95802 17.4234 6.92983 17.504ZM8.71023 17.4355C8.59341 17.4637 8.51285 17.5403 8.52494 17.6329C8.53702 17.7135 8.64175 17.7658 8.76259 17.7376C8.87941 17.7094 8.95997 17.6329 8.94788 17.5523C8.9358 17.4758 8.82704 17.4234 8.71023 17.4355ZM11.3607 2C5.77377 2 1.5 6.24155 1.5 11.8285C1.5 16.2956 4.31159 20.1182 8.32756 21.4636C8.84315 21.5562 9.02442 21.238 9.02442 20.9762C9.02442 20.7265 9.01233 19.3489 9.01233 18.503C9.01233 18.503 6.19269 19.1072 5.60057 17.3026C5.60057 17.3026 5.14137 16.1304 4.48076 15.8283C4.48076 15.8283 3.55834 15.1959 4.54521 15.208C4.54521 15.208 5.5482 15.2886 6.10004 16.2472C6.98219 17.8021 8.46049 17.355 9.0365 17.0891C9.12915 16.4446 9.39097 15.9975 9.68099 15.7317C7.4293 15.4819 5.15748 15.1556 5.15748 11.2807C5.15748 10.1729 5.46361 9.61706 6.1081 8.90812C6.00337 8.6463 5.66099 7.56678 6.21283 6.17307C7.0547 5.91125 8.99219 7.26065 8.99219 7.26065C9.7978 7.03508 10.6638 6.91826 11.5218 6.91826C12.3798 6.91826 13.2458 7.03508 14.0514 7.26065C14.0514 7.26065 15.9889 5.90722 16.8308 6.17307C17.3826 7.57081 17.0403 8.6463 16.9355 8.90812C17.58 9.62109 17.9748 10.177 17.9748 11.2807C17.9748 15.1677 15.6022 15.4779 13.3506 15.7317C13.7211 16.0499 14.0353 16.6541 14.0353 17.6007C14.0353 18.9581 14.0232 20.6378 14.0232 20.9681C14.0232 21.23 14.2085 21.5482 14.7201 21.4555C18.7482 20.1182 21.4792 16.2956 21.4792 11.8285C21.4792 6.24155 16.9476 2 11.3607 2ZM5.41527 15.8928C5.36291 15.9331 5.37499 16.0257 5.44347 16.1022C5.50792 16.1667 5.60057 16.1949 5.65293 16.1425C5.70529 16.1022 5.69321 16.0096 5.62473 15.9331C5.56028 15.8686 5.46764 15.8404 5.41527 15.8928ZM4.98024 15.5665C4.95205 15.6189 4.99233 15.6833 5.07289 15.7236C5.13734 15.7639 5.2179 15.7518 5.2461 15.6954C5.27429 15.643 5.23401 15.5786 5.15345 15.5383C5.07289 15.5141 5.00844 15.5262 4.98024 15.5665ZM6.28534 17.0005C6.22089 17.0529 6.24505 17.1737 6.3377 17.2502C6.43035 17.3429 6.54716 17.355 6.59952 17.2905C6.65189 17.2382 6.62772 17.1173 6.54716 17.0408C6.45854 16.9481 6.3377 16.936 6.28534 17.0005ZM5.82614 16.4084C5.76169 16.4487 5.76169 16.5534 5.82614 16.646C5.89059 16.7387 5.99934 16.779 6.05171 16.7387C6.11616 16.6863 6.11616 16.5816 6.05171 16.4889C5.99532 16.3963 5.89059 16.356 5.82614 16.4084Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/index.jsx":
/*!****************************************!*\
  !*** ./src/components/icons/index.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Icon": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _github__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./github */ "./src/components/icons/github.jsx");
/* harmony import */ var _linkedin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linkedin */ "./src/components/icons/linkedin.jsx");
/* harmony import */ var _phone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./phone */ "./src/components/icons/phone.jsx");
/* harmony import */ var _email__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./email */ "./src/components/icons/email.jsx");
/* harmony import */ var _public__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./public */ "./src/components/icons/public.jsx");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./palette */ "./src/components/icons/palette.jsx");
/* harmony import */ var _chevron_right__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chevron-right */ "./src/components/icons/chevron-right.jsx");
/* harmony import */ var _arrow_forward__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./arrow-forward */ "./src/components/icons/arrow-forward.jsx");
/* harmony import */ var _arrow_back__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./arrow-back */ "./src/components/icons/arrow-back.jsx");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./menu */ "./src/components/icons/menu.jsx");
/* harmony import */ var _clear__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./clear */ "./src/components/icons/clear.jsx");













const getIcon = (type, size, color) => {
  switch (type) {
    case 'github':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_github__WEBPACK_IMPORTED_MODULE_1__.Github, {
        size: size,
        color: color
      });
    case 'linkedin':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_linkedin__WEBPACK_IMPORTED_MODULE_2__.Linkedin, {
        size: size,
        color: color
      });
    case 'phone':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_phone__WEBPACK_IMPORTED_MODULE_3__.Phone, {
        size: size,
        color: color
      });
    case 'email':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_email__WEBPACK_IMPORTED_MODULE_4__.Email, {
        size: size,
        color: color
      });
    case 'public':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_public__WEBPACK_IMPORTED_MODULE_5__.Public, {
        size: size,
        color: color
      });
    case 'palette':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_palette__WEBPACK_IMPORTED_MODULE_6__.Palette, {
        size: size,
        color: color
      });
    case 'chevron-right':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chevron_right__WEBPACK_IMPORTED_MODULE_7__.ChevronRight, {
        size: size,
        color: color
      });
    case 'arrow-forward':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_arrow_forward__WEBPACK_IMPORTED_MODULE_8__.ArrowForward, {
        size: size,
        color: color
      });
    case 'arrow-back':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_arrow_back__WEBPACK_IMPORTED_MODULE_9__.ArrowBack, {
        size: size,
        color: color
      });
    case 'menu':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_menu__WEBPACK_IMPORTED_MODULE_10__.Menu, {
        size: size,
        color: color
      });
    case 'clear':
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_clear__WEBPACK_IMPORTED_MODULE_11__.Clear, {
        size: size,
        color: color
      });
    default:
      return undefined;
  }
};
const StyledIcon = styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "icons__StyledIcon"
})(["display:flex;justify-content:center;align-items:center;"]);
const Icon = ({
  type,
  size = '1.7rem',
  subTheme = 'UI',
  color = 'black',
  ...props
}) => {
  const theme = (0,styled_components__WEBPACK_IMPORTED_MODULE_12__.useTheme)();
  const icon = getIcon(type, size, theme[subTheme].colors[color], props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledIcon, props, icon);
};

/***/ }),

/***/ "./src/components/icons/linkedin.jsx":
/*!*******************************************!*\
  !*** ./src/components/icons/linkedin.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Linkedin": () => (/* binding */ Linkedin)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from FontAwesome: https://fontawesome.com/search?o=r&f=brands
const Linkedin = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M19.7143 3H4.2817C3.57455 3 3 3.58259 3 4.29777V19.7022C3 20.4174 3.57455 21 4.2817 21H19.7143C20.4214 21 21 20.4174 21 19.7022V4.29777C21 3.58259 20.4214 3 19.7143 3ZM8.44018 18.4286H5.77232V9.83839H8.4442V18.4286H8.44018ZM7.10625 8.66518C6.25045 8.66518 5.55937 7.97009 5.55937 7.1183C5.55937 6.26652 6.25045 5.57143 7.10625 5.57143C7.95804 5.57143 8.65312 6.26652 8.65312 7.1183C8.65312 7.97411 7.96205 8.66518 7.10625 8.66518V8.66518ZM18.4406 18.4286H15.7728V14.25C15.7728 13.2536 15.7527 11.9719 14.3866 11.9719C12.9964 11.9719 12.7835 13.0567 12.7835 14.1777V18.4286H10.1156V9.83839H12.675V11.0116H12.7112C13.0687 10.3366 13.9406 9.62545 15.2384 9.62545C17.9384 9.62545 18.4406 11.4054 18.4406 13.7196V18.4286V18.4286Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/menu.jsx":
/*!***************************************!*\
  !*** ./src/components/icons/menu.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const Menu = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/palette.jsx":
/*!******************************************!*\
  !*** ./src/components/icons/palette.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Palette": () => (/* binding */ Palette)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const Palette = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C12.83 21 13.5 20.33 13.5 19.5C13.5 19.11 13.35 18.76 13.11 18.49C12.88 18.23 12.73 17.88 12.73 17.5C12.73 16.67 13.4 16 14.23 16H16C18.76 16 21 13.76 21 11C21 6.58 16.97 3 12 3ZM6.5 12C5.67 12 5 11.33 5 10.5C5 9.67 5.67 9 6.5 9C7.33 9 8 9.67 8 10.5C8 11.33 7.33 12 6.5 12ZM9.5 8C8.67 8 8 7.33 8 6.5C8 5.67 8.67 5 9.5 5C10.33 5 11 5.67 11 6.5C11 7.33 10.33 8 9.5 8ZM14.5 8C13.67 8 13 7.33 13 6.5C13 5.67 13.67 5 14.5 5C15.33 5 16 5.67 16 6.5C16 7.33 15.33 8 14.5 8ZM17.5 12C16.67 12 16 11.33 16 10.5C16 9.67 16.67 9 17.5 9C18.33 9 19 9.67 19 10.5C19 11.33 18.33 12 17.5 12Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/phone.jsx":
/*!****************************************!*\
  !*** ./src/components/icons/phone.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Phone": () => (/* binding */ Phone)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const Phone = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/icons/public.jsx":
/*!*****************************************!*\
  !*** ./src/components/icons/public.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Public": () => (/* binding */ Public)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
const Public = ({
  size,
  color
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z",
    fill: color
  }));
};

/***/ }),

/***/ "./src/components/ui/about-me.jsx":
/*!****************************************!*\
  !*** ./src/components/ui/about-me.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _presentational_section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentational/section */ "./src/components/ui/presentational/section.jsx");
/* harmony import */ var _ui_introduction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/introduction */ "./src/components/ui/introduction.jsx");




const StyledAboutMe = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "about-me__StyledAboutMe",
  componentId: "sc-9605we-0"
})([""]);
const AboutMe = ({
  scrollRef,
  aboutMe,
  contacts
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledAboutMe, {
    ref: scrollRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_section__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: aboutMe.title
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_introduction__WEBPACK_IMPORTED_MODULE_2__["default"], {
    aboutMe: aboutMe,
    contacts: contacts
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AboutMe);

/***/ }),

/***/ "./src/components/ui/containers/console-icon.jsx":
/*!*******************************************************!*\
  !*** ./src/components/ui/containers/console-icon.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleIcon": () => (/* binding */ ConsoleIcon)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const StyledConsoleIcon = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].svg.withConfig({
  displayName: "console-icon__StyledConsoleIcon",
  componentId: "sc-1v6wukv-0"
})(["@keyframes blinker{0%{opacity:1;}50%{opacity:1;}100%{opacity:0;}}.blinking-line{animation:blinker 1s steps(1,start) infinite;}"]);
const ConsoleIcon = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledConsoleIcon, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "31",
    height: "26",
    viewBox: "0 0 31 26"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "31",
    height: "26",
    fill: "#D9D9D9",
    rx: "2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    cx: "4",
    cy: "3",
    r: "1",
    fill: "#E57272"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    cx: "8",
    cy: "3",
    r: "1",
    fill: "#75A968"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "25",
    height: "18",
    x: "3",
    y: "6",
    fill: "#3A3A3A"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    stroke: "#ABF099",
    points: "7 12 11 15.789 7 20"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "blinking-line",
    stroke: "#ABF099",
    d: "M15,19 L23,19"
  })));
};

/***/ }),

/***/ "./src/components/ui/containers/language-selector-small.jsx":
/*!******************************************************************!*\
  !*** ./src/components/ui/containers/language-selector-small.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _console_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./console-icon */ "./src/components/ui/containers/console-icon.jsx");




const StyledLanguageSelectorSmall = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "language-selector-small__StyledLanguageSelectorSmall",
  componentId: "sc-1nftzhr-0"
})(["position:absolute;top:0;left:0;z-index:2;display:flex;align-items:center;.lang{display:flex;align-items:center;margin:", " 0;cursor:pointer;font-family:", ";font-weight:", ";font-size:", ";color:", ";text-transform:none;span,a{padding:0 ", ";}&:not(:first-child):before{content:'';height:15px;width:1px;background:", ";display:inline-block;}&.selected{color:", ";}}"], ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.fontSizes.fontSizeDefault, ({
  theme
}) => theme.UI.colors.bluishGrey, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.UI.colors.black);
const LanguageSelectorSmall = ({
  onCloseMenu
}) => {
  const onClickLink = language => {
    onCloseMenu();
    localStorage.setItem('language', language);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledLanguageSelectorSmall, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    className: "lang",
    activeClassName: "selected",
    to: "/fi",
    onClick: () => onClickLink('fi')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Suomi")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    className: "lang",
    activeClassName: "selected",
    to: "/",
    onClick: () => onClickLink('en')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "English")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "lang"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/console",
    style: {
      height: '26px'
    },
    onClick: () => onCloseMenu()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_console_icon__WEBPACK_IMPORTED_MODULE_2__.ConsoleIcon, null))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LanguageSelectorSmall);

/***/ }),

/***/ "./src/components/ui/containers/language-selector.jsx":
/*!************************************************************!*\
  !*** ./src/components/ui/containers/language-selector.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _console_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./console-icon */ "./src/components/ui/containers/console-icon.jsx");




const StyledLanguageSelector = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "language-selector__StyledLanguageSelector",
  componentId: "sc-1hfgbkp-0"
})(["width:", ";flex-shrink:0;display:flex;flex-direction:column;justify-content:center;align-items:center;.lang{height:100px;cursor:pointer;text-transform:none;color:", ";font-family:", ";font-weight:", ";font-size:", ";position:relative;display:flex;width:100%;&:not(:first-child):before{content:\"\";height:1px;width:15px;background:", ";margin:0 auto;}&.selected{color:", ";}.text-wrapper{white-space:nowrap;position:absolute;left:50%;transform:translate(-50%,-50%) rotate(-90deg);top:50%;}}@media (max-width:", "){display:none;}"], ({
  theme
}) => theme.langSelectionWidth, ({
  theme
}) => theme.UI.colors.bluishGrey, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.fontSizes.fontSizeDefault, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.breakpoints.smSize);
const LanguageSelector = () => {
  const onClickLink = language => {
    localStorage.setItem('language', language);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledLanguageSelector, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    className: "lang",
    activeClassName: "selected",
    to: "/fi",
    replace: true,
    onClick: () => onClickLink('fi')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-wrapper"
  }, "Suomi")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    className: "lang",
    activeClassName: "selected",
    to: "/",
    replace: true,
    onClick: () => onClickLink('en')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-wrapper"
  }, "English")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "lang",
    style: {
      cursor: 'default'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    className: "text-wrapper",
    to: "/console"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_console_icon__WEBPACK_IMPORTED_MODULE_2__.ConsoleIcon, null))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LanguageSelector);

/***/ }),

/***/ "./src/components/ui/education.jsx":
/*!*****************************************!*\
  !*** ./src/components/ui/education.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _presentational_section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentational/section */ "./src/components/ui/presentational/section.jsx");
/* harmony import */ var _presentational_edu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presentational/edu-item */ "./src/components/ui/presentational/edu-item.jsx");
/* harmony import */ var _presentational_time_line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presentational/time-line */ "./src/components/ui/presentational/time-line.jsx");
/* harmony import */ var _presentational_time_bubble__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presentational/time-bubble */ "./src/components/ui/presentational/time-bubble.jsx");





const Education = ({
  scrollRef,
  education
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "education",
    ref: scrollRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_section__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: education.title,
    maxWidth: "1100px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_time_line__WEBPACK_IMPORTED_MODULE_3__["default"], null, education.educationList.map((eduItem, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_time_bubble__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: i,
      from: eduItem.startDate,
      to: eduItem.endDate,
      index: i
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_edu_item__WEBPACK_IMPORTED_MODULE_2__["default"], {
      data: eduItem
    }));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Education);

/***/ }),

/***/ "./src/components/ui/home.jsx":
/*!************************************!*\
  !*** ./src/components/ui/home.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _about_me__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about-me */ "./src/components/ui/about-me.jsx");
/* harmony import */ var _education__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./education */ "./src/components/ui/education.jsx");
/* harmony import */ var _interests__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interests */ "./src/components/ui/interests.jsx");
/* harmony import */ var _presentational_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presentational/header */ "./src/components/ui/presentational/header.jsx");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projects */ "./src/components/ui/projects.jsx");
/* harmony import */ var _skills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./skills */ "./src/components/ui/skills.jsx");
/* harmony import */ var _work_history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./work-history */ "./src/components/ui/work-history.jsx");








const SCROLL_OFFSET = 50;
class Home extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(props) {
    super(props);
    this.scrollRefs = {
      aboutMe: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef(),
      workHistory: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef(),
      education: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef(),
      skills: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef(),
      projects: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef(),
      interests: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef()
    };
  }
  onScrollToRef(section) {
    window.scrollTo({
      top: this.scrollRefs[section].current.offsetTop - SCROLL_OFFSET,
      left: 0,
      behavior: 'smooth'
    });
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_header__WEBPACK_IMPORTED_MODULE_4__["default"], {
      header: this.props.data.header,
      contacts: this.props.data.contacts,
      onScrollToRef: section => this.onScrollToRef(section)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_about_me__WEBPACK_IMPORTED_MODULE_1__["default"], {
      aboutMe: this.props.data.aboutMe,
      contacts: this.props.data.contacts,
      scrollRef: this.scrollRefs.aboutMe
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_work_history__WEBPACK_IMPORTED_MODULE_7__["default"], {
      workHistory: this.props.data.workHistory,
      scrollRef: this.scrollRefs.workHistory
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_education__WEBPACK_IMPORTED_MODULE_2__["default"], {
      education: this.props.data.education,
      scrollRef: this.scrollRefs.education
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_skills__WEBPACK_IMPORTED_MODULE_6__["default"], {
      skills: this.props.data.skills,
      scrollRef: this.scrollRefs.skills
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_projects__WEBPACK_IMPORTED_MODULE_5__["default"], {
      projects: this.props.data.projects,
      scrollRef: this.scrollRefs.projects
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_interests__WEBPACK_IMPORTED_MODULE_3__["default"], {
      interests: this.props.data.interests,
      scrollRef: this.scrollRefs.interests
    })));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

/***/ }),

/***/ "./src/components/ui/interests.jsx":
/*!*****************************************!*\
  !*** ./src/components/ui/interests.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _presentational_plane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentational/plane */ "./src/components/ui/presentational/plane.jsx");
/* harmony import */ var _presentational_section__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presentational/section */ "./src/components/ui/presentational/section.jsx");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");





const StyledInterests = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "interests__StyledInterests",
  componentId: "sc-aqe0q7-0"
})(["min-height:575px;.planet{position:relative;.gatsby-image-wrapper{position:absolute;height:1200px;width:1200px;top:-70px;left:-600px;z-index:-1;@media (min-width:", "){height:1400px;width:1400px;top:-270px;left:-700px;}@media (max-width:", "){height:800px;width:800px;top:20px;left:-400px;}@media (max-width:", "){height:700px;width:700px;top:0;left:-350px;}}}.interest-list{margin-left:50%;padding:", ";padding-top:0;color:", ";font-family:", ";font-size:", ";font-weight:", ";text-transform:uppercase;@media (max-width:", "){margin-left:0;}.interest{margin-bottom:", ";}}"], ({
  theme
}) => theme.breakpoints.xxlgSize, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.breakpoints.xsSize, ({
  theme
}) => theme.spaces.base(3), ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontSizes.fontSizeLarge, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.spaces.base(0.5));
const Interests = ({
  scrollRef,
  interests
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: scrollRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_section__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: interests.title
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledInterests, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "planet"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__.GatsbyImage, {
    image: interests.image.gatsbyImageData,
    alt: interests.image.alt
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_plane__WEBPACK_IMPORTED_MODULE_1__.TravelPlane, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "interest-list"
  }, interests.interests.map(interest => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "interest",
    key: interest.title
  }, interest.title))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Interests);

/***/ }),

/***/ "./src/components/ui/introduction.jsx":
/*!********************************************!*\
  !*** ./src/components/ui/introduction.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_resume_EN_pdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/resume-EN.pdf */ "./src/assets/resume-EN.pdf");
/* harmony import */ var _assets_resume_FI_pdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/resume-FI.pdf */ "./src/assets/resume-FI.pdf");
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _presentational_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presentational/button */ "./src/components/ui/presentational/button.jsx");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var _icons_github__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons/github */ "./src/components/icons/github.jsx");
/* harmony import */ var _icons_linkedin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/linkedin */ "./src/components/icons/linkedin.jsx");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../icons */ "./src/components/icons/index.jsx");










const ImageSize = '180px';
const StyledIntroduction = styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "introduction__StyledIntroduction",
  componentId: "sc-ytdl8b-0"
})(["position:relative;display:flex;max-width:860px;.summary{.summary-text{margin-top:0;margin-bottom:", ";p{", ";}}.links{margin-top:", ";margin-bottom:", ";a{display:inline-flex;align-items:center;letter-spacing:2px;margin-bottom:", ";&:hover span{text-decoration:underline;}svg{height:20px;width:20px;margin-right:", ";}.icon,i{margin-right:", ";text-decoration:none !important;display:inline-block;font-size:", ";font-weight:bold;}}}}.image-wrapper{padding-left:", ";@media (max-width:", "){padding-left:0;margin-bottom:", ";}}@media (max-width:", "){flex-direction:column-reverse;}"], ({
  theme
}) => theme.spaces.base(1), _theme_fonts__WEBPACK_IMPORTED_MODULE_3__.ParagraphStyle, ({
  theme
}) => theme.spaces.base(2), ({
  theme
}) => theme.spaces.base(1), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.fontSizes.fontSizeXXLarge, ({
  theme
}) => theme.spaces.base(4), ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.breakpoints.smSize);
const MyImage = (0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_9__.GatsbyImage).withConfig({
  displayName: "introduction__MyImage",
  componentId: "sc-ytdl8b-1"
})(["width:", ";height:", ";border-radius:50%;background-size:200px;background-position:left top;"], ImageSize, ImageSize);
const Introduction = ({
  aboutMe,
  contacts
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledIntroduction, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "summary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "summary-text",
    dangerouslySetInnerHTML: {
      __html: aboutMe.body
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "links"
  }, contacts.links.map(link => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: link.url,
    className: "link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "link-anchor",
    href: link.url,
    target: link.target,
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_7__.Icon, {
    type: link.icon,
    size: "2.2rem"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, link.title)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "image-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MyImage, {
    image: aboutMe.image.gatsbyImageData,
    alt: aboutMe.image.alt
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Introduction);

/***/ }),

/***/ "./src/components/ui/language-skills.jsx":
/*!***********************************************!*\
  !*** ./src/components/ui/language-skills.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../theme/fonts */ "./src/theme/fonts.js");



const StyledLangSkills = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "language-skills__StyledLangSkills",
  componentId: "sc-1u1t29r-0"
})(["", "{@media (max-width:", "){margin-top:", ";}}.lang-skills{display:flex;.language{width:33%;padding-right:", ";", "{text-align:left;color:", ";}.lang-title{display:flex;align-items:flex-end;margin-bottom:", ";.lang-name{font-size:", ";margin-right:", ";margin-bottom:0;}.lang-level{padding-bottom:6px;font-family:", ";font-size:", ";font-weight:", ";color:#B0B0B0;}}}}@media (max-width:", "){.lang-skills{flex-wrap:wrap;.language{width:100%;margin-top:", "/2;}}}"], _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, ({
  theme
}) => theme.breakpoints.xsSize, ({
  theme
}) => theme.spaces.base(2), ({
  theme
}) => theme.spaces.base(0.5), _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.Paragraph, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.fontSizes.fontSizeXXXLarge, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontSizes.fontSizeDefault, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.spaces.baseSize);
const LanguageSkills = ({
  title,
  languageSkills
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledLangSkills, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "lang-skills"
  }, languageSkills.map(language => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "language",
      key: language.title
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "lang-title"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H2, {
      className: "lang-name"
    }, language.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "lang-level"
    }, language.level)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.Paragraph, null, language.body));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LanguageSkills);

/***/ }),

/***/ "./src/components/ui/presentational/button.jsx":
/*!*****************************************************!*\
  !*** ./src/components/ui/presentational/button.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkButton": () => (/* binding */ LinkButton)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../theme/fonts */ "./src/theme/fonts.js");


const LinkButton = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].a.withConfig({
  displayName: "button__LinkButton"
})(["", ";background:", ";text-decoration:none;border:none;padding:", " ", ";user-select:none;cursor:pointer;display:inline-flex;align-items:center;.material-icons{font-size:", ";margin-right:", ";}&:hover{background:", ";}"], _theme_fonts__WEBPACK_IMPORTED_MODULE_0__.ButtonText, ({
  theme
}) => theme.UI.colors.lightestGrey, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.fontSizes.fontSizeLarge, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.UI.colors.lightestGreyAlt);

/***/ }),

/***/ "./src/components/ui/presentational/edu-item.jsx":
/*!*******************************************************!*\
  !*** ./src/components/ui/presentational/edu-item.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../theme/fonts */ "./src/theme/fonts.js");



const StyledEduItem = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "edu-item__StyledEduItem",
  componentId: "sc-5ydcep-0"
})([".degree{margin-top:", ";margin-bottom:0;}.program{margin-top:0;margin-bottom:", ";}p{", ";margin-top:", ";margin-bottom:0;}"], ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.ParagraphStyle, ({
  theme
}) => theme.spaces.base(0.25));
const EduItem = ({
  data
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledEduItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, null, data.school), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H4, {
    className: "degree"
  }, `${data.title}${data.program ? ',' : ''}`), data.program ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H4, {
    className: "program"
  }, data.program) : null, data.body ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    dangerouslySetInnerHTML: {
      __html: data.body
    }
  }) : null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EduItem);

/***/ }),

/***/ "./src/components/ui/presentational/header.jsx":
/*!*****************************************************!*\
  !*** ./src/components/ui/presentational/header.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _containers_language_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/language-selector */ "./src/components/ui/containers/language-selector.jsx");
/* harmony import */ var _hover_bubble__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hover-bubble */ "./src/components/ui/presentational/hover-bubble.jsx");
/* harmony import */ var _navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar */ "./src/components/ui/presentational/navbar.jsx");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons */ "./src/components/icons/index.jsx");








const StyledHeader = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "header__StyledHeader",
  componentId: "sc-8oh4yp-0"
})(["width:calc(100vw - ", ");height:100vh;position:relative;display:flex;justify-content:center;align-items:center;.name-titles{display:flex;flex-direction:column;padding:", ";position:relative;.title{", ";}.name{", ";}.subtitle{", ";}}.right-menu{background:", ";width:", ";height:100vh;position:absolute;top:0;right:-", ";display:flex;flex-direction:column;justify-content:space-between;align-items:center;.links{margin:", " 0;.link{position:relative;.link-anchor{display:block;padding:", ";color:rgba(white,0.75);font-size:1.7rem;font-family:", ";font-weight:", ";text-decoration:none;.material-icons{font-size:1.7rem;}}:hover{", "{display:flex;}}}}}@media (max-width:", "){width:100vw;.right-menu{display:none;}}"], ({
  theme
}) => theme.rightMenuWidth, ({
  theme
}) => theme.spaces.baseSize, _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.PageTitle, _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.PageName, _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.PageSubtitle, ({
  theme
}) => theme.UI.colors.white, ({
  theme
}) => theme.rightMenuWidth, ({
  theme
}) => theme.rightMenuWidth, ({
  theme
}) => theme.spaces.base(1), ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightBold, _hover_bubble__WEBPACK_IMPORTED_MODULE_3__.StyledHoverBubble, ({
  theme
}) => theme.breakpoints.smSize);
const HeaderImg = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__.GatsbyImage).withConfig({
  displayName: "header__HeaderImg",
  componentId: "sc-8oh4yp-1"
})(["position:absolute;top:0;left:0;right:0;bottom:0;img{object-position:", ";}"], ({
  $posX,
  $posY
}) => `${$posX * 100}% ${$posY * 100}%`);
const Header = ({
  onScrollToRef,
  contacts,
  header
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledHeader, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeaderImg, {
    image: header.image.gatsbyImageData,
    $posX: header.image.focalPoint.x,
    $posY: header.image.focalPoint.y,
    alt: header.image.alt
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_navbar__WEBPACK_IMPORTED_MODULE_4__["default"], {
    header: header,
    onScrollToRef: onScrollToRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "name-titles"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "title"
  }, header.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "name"
  }, header.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "subtitle"
  }, header.subtitle)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "right-menu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "links"
  }, contacts.links.map(link => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: link.url,
    className: "link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "link-anchor",
    href: link.url,
    target: link.target,
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_5__.Icon, {
    type: link.icon
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_containers_language_selector__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/ui/presentational/hover-bubble.jsx":
/*!***********************************************************!*\
  !*** ./src/components/ui/presentational/hover-bubble.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyledHoverBubble": () => (/* binding */ StyledHoverBubble),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const StyledHoverBubble = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "hover-bubble__StyledHoverBubble",
  componentId: "sc-11tkvty-0"
})(["position:absolute;top:50%;right:100%;transform:translateY(-50%);padding:", " ", ";border-radius:3px;background:", ";a{color:white;white-space:nowrap;font-family:", ";font-size:", ";font-weight:", ";text-transform:none;&:hover{text-decoration:underline;}}display:none;.arrow{position:absolute;top:50%;transform:translateY(-50%);left:100%;z-index:0;width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:10px solid ", ";}"], ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(1), ({
  theme
}) => theme.UI.colors.transparentBluishGrey, ({
  theme
}) => theme.fonts.fontOpenSans, ({
  theme
}) => theme.fontSizes.fontSizeDefault, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.UI.colors.transparentBluishGrey);
const HoverBubble = ({
  text,
  href,
  target
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledHoverBubble, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: href,
    target: target
  }, text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "arrow"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HoverBubble);

/***/ }),

/***/ "./src/components/ui/presentational/navbar.jsx":
/*!*****************************************************!*\
  !*** ./src/components/ui/presentational/navbar.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _containers_language_selector_small__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers/language-selector-small */ "./src/components/ui/containers/language-selector-small.jsx");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../icons */ "./src/components/icons/index.jsx");




const StyledNavbar = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].nav.withConfig({
  displayName: "navbar__StyledNavbar",
  componentId: "sc-qxtl7b-0"
})(["position:absolute;top:0;width:100%;height:", ";.nav-list{height:100%;list-style-type:none;display:flex;align-items:center;justify-content:space-around;padding:0;margin:0 ", ";.nav-item{font-size:", ";text-transform:uppercase;font-weight:", ";color:", ";text-align:center;cursor:pointer;}}@media (max-width:", "){.nav-list{display:none;}}"], ({
  theme
}) => theme.navBarHeight, ({
  theme
}) => theme.spaces.base(2), ({
  theme
}) => theme.fontSizes.fontSizeDefault, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.UI.colors.white, ({
  theme
}) => theme.breakpoints.smSize);
const StyledMobileNavbar = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "navbar__StyledMobileNavbar",
  componentId: "sc-qxtl7b-1"
})(["display:none;justify-content:flex-end;.home-icon{position:absolute;top:0;right:0;padding:", ";.material-icons{color:", ";font-size:", ";}}.mobile-nav-items{display:none;&.open{display:flex;}position:absolute;top:0;left:0;right:0;bottom:0;z-index:1;margin:0;padding:0;background:", ";flex-direction:column;justify-content:center;align-items:center;.mobile-nav-item{display:block;font-size:", ";margin-bottom:", ";color:", ";text-transform:uppercase;font-weight:", ";cursor:pointer;}.close{color:", ";padding:", ";position:absolute;top:0;right:0;cursor:pointer;font-size:", ";}.language-selector-small{.lang{color:", ";border-color:", ";&.selected{color:white;}}}}@media (max-width:", "){display:flex;}"], ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.UI.colors.white, ({
  theme
}) => theme.fontSizes.fontSizeXXLarge, ({
  theme
}) => theme.UI.colors.white, ({
  theme
}) => theme.fontSizes.fontSizeXLarge, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.fontSizes.fontSizeXXLarge, ({
  theme
}) => theme.UI.colors.lightGrey, ({
  theme
}) => theme.UI.colors.lightGrey, ({
  theme
}) => theme.breakpoints.smSize);
class Navbar extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };
  }
  setMobileMenuClass(setOpen) {
    if (!setOpen) {
      document.body.classList.remove('mobile-menu-open');
    } else {
      document.body.classList.add('mobile-menu-open');
    }
  }
  toggleMenu() {
    this.setMobileMenuClass(!this.state.openMenu);
    this.setState({
      openMenu: !this.state.openMenu
    });
  }
  onMobileNavItemClick(navItem) {
    this.toggleMenu();
    this.props.onScrollToRef(navItem);
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledNavbar, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      className: "nav-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "nav-item",
      onClick: () => this.props.onScrollToRef('workHistory')
    }, this.props.header.workhistory), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "nav-item",
      onClick: () => this.props.onScrollToRef('education')
    }, this.props.header.education), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "nav-item",
      onClick: () => this.props.onScrollToRef('skills')
    }, this.props.header.skills), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "nav-item",
      onClick: () => this.props.onScrollToRef('projects')
    }, this.props.header.projects), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "nav-item",
      onClick: () => this.props.onScrollToRef('interests')
    }, this.props.header.interests))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledMobileNavbar, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "home-icon",
      onClick: () => this.toggleMenu()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_2__.Icon, {
      type: "menu",
      size: "2.4rem",
      color: "white"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      className: `mobile-nav-items ${this.state.openMenu ? 'open' : ''}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "mobile-nav-item",
      onClick: () => this.onMobileNavItemClick('aboutMe')
    }, this.props.header.aboutme), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "mobile-nav-item",
      onClick: () => this.onMobileNavItemClick('workHistory')
    }, this.props.header.workhistory), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "mobile-nav-item",
      onClick: () => this.onMobileNavItemClick('education')
    }, this.props.header.education), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "mobile-nav-item",
      onClick: () => this.onMobileNavItemClick('skills')
    }, this.props.header.skills), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "mobile-nav-item",
      onClick: () => this.onMobileNavItemClick('projects')
    }, this.props.header.projects), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "mobile-nav-item",
      onClick: () => this.onMobileNavItemClick('interests')
    }, this.props.header.interests), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_containers_language_selector_small__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onCloseMenu: () => this.setMobileMenuClass(false)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "close",
      onClick: () => this.toggleMenu()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_2__.Icon, {
      type: "clear",
      size: "2.4rem"
    })))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

/***/ }),

/***/ "./src/components/ui/presentational/plane.jsx":
/*!****************************************************!*\
  !*** ./src/components/ui/presentational/plane.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TravelPlane": () => (/* binding */ TravelPlane)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const StyledConsoleIcon = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].svg.withConfig({
  displayName: "plane__StyledConsoleIcon",
  componentId: "sc-15wx2gj-0"
})(["position:absolute;height:1200px;top:-70px;left:-600px;z-index:-1;@media (min-width:", "){height:1400px;width:1400px;top:-270px;left:-700px;}@media (max-width:", "){height:800px;width:800px;top:20px;left:-400px;}@media (max-width:", "){height:700px;width:700px;top:0;left:-350px;}@keyframes rotating{from{transform:rotate(360deg);}to{transform:rotate(0deg);}}animation:rotating 7s linear infinite;will-change:transform;"], ({
  theme
}) => theme.breakpoints.xxlgSize, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.breakpoints.xsSize);
const TravelPlane = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledConsoleIcon, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1200",
    height: "1200",
    viewBox: "0 0 1200 1200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    transform: "translate(514 45)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "#F6F6F6",
    d: "M69.7470598,46.6420471 L96.8767123,59.5955056 L87.7301723,59.5955056 L46.4657534,46.6420471 C52.4401366,45.9293715 56.7286251,45.5730337 59.3312189,45.5730337 C61.9338127,45.5730337 65.4057596,45.9293715 69.7470598,46.6420471 Z",
    transform: "matrix(1 0 0 -1 0 105.169)"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#000",
    fillOpacity: ".039",
    points: "69.556 45.691 96.877 58.719 96.042 58.719 68.822 45.573",
    transform: "matrix(1 0 0 -1 0 104.292)"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#E3E3E3",
    points: "116.892 50.393 127.123 54.775 120.806 54.775 105.644 50.393",
    transform: "matrix(1 0 0 -1 0 105.169)"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "#FFF",
    d: "M116.299081,58.809169 C105.224004,64.4073838 94.7677333,67.2064912 84.9302693,67.2064912 C52.9108107,67.2064912 53.0455543,68.8149197 20.16594,67.2064912 C10.130886,66.7155892 5.26027397,65.2421937 5.26027397,62.9365714 C5.26027397,60.6309492 9.50583013,60.6045564 14.178864,57.1946636 C16.8907559,55.2158077 18.1920065,52.6650857 24.9410155,52.3074569 C46.9279435,51.1423732 69.3844819,51.1423732 92.3106309,52.3074569 L110.459876,49.7152638 L118.004545,39.8764045 L123.616438,39.8764045 L116.299081,58.809169 Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "#000",
    fillOpacity: ".029",
    d: "M116.60274,58.7191011 C105.497376,64.3726506 95.0125103,67.1994253 85.1481437,67.1994253 C53.0411211,67.1994253 53.1762332,68.8237521 20.2067027,67.1994253 C10.1442057,66.7036711 5.26027397,65.2157121 5.26027397,62.8873002 C5.26027397,61.7950092 21.6333905,65.3406335 58.3877833,64.4096385 C68.7064093,64.1482659 88.1113948,62.2514202 116.60274,58.7191011 Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#DFDFDF",
    points: "50.411 65.113 53.05 64.854 74.159 65.113 74.521 70.204 64.264 71.865 50.411 71.865"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#000",
    fillOpacity: ".029",
    points: "50.411 68.665 74.159 67.921 74.521 70.291 64.264 71.865 50.411 71.865"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#FBFBFB",
    points: "116.892 54.775 127.123 62.225 122.008 62.225 105.644 54.775"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ellipse", {
    cx: "50.411",
    cy: "68.579",
    fill: "#BBB",
    rx: "1",
    ry: "3.287"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "#F5F5F5",
    d: "M71.0621283,62.918428 L98.1917808,81.9438202 L89.0452408,81.9438202 L47.7808219,62.918428 C53.7552051,61.8716858 58.0436936,61.3483146 60.6462874,61.3483146 C63.2488812,61.3483146 66.7208281,61.8716858 71.0621283,62.918428 Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#000",
    fillOpacity: ".039",
    points: "71.108 62.892 98.192 81.944 97.219 81.944 70.137 62.663"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "28.493",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "42.521",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "56.548",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "70.575",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "84.603",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "32",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "46.027",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "60.055",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "74.082",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "88.11",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "35.507",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "49.534",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "63.562",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "77.589",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "91.616",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "39.014",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "53.041",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "67.068",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "81.096",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "1.753",
    height: "3.067",
    x: "95.123",
    y: "56.528",
    fill: "#D8D8D8",
    rx: ".877"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "#D8D8D8",
    d: "M17.9316159,56.5284962 C18.3225186,56.4935939 15.7964115,58.7191011 15.484654,58.7191011 C14.8387153,58.7191011 13.7865295,58.7191011 13.2127441,58.7191011 C12.7298453,58.7191011 15.2168808,56.6731252 15.4334419,56.6731252 C16.0884725,56.6731252 17.2900445,56.5857797 17.9316159,56.5284962 Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "#D8D8D8",
    d: "M20.1019694 56.5282879C20.5018974 56.5064795 18.8637579 58.2934852 18.4835628 58.3732753 17.9113331 58.493367 16.2940561 58.7191011 15.7902024 58.7191011 15.6098634 58.7191011 18.0872816 56.6933888 18.2752744 56.6775692 18.8515996 56.6290715 19.4925002 56.5615226 20.1019694 56.5282879zM22.3076322 56.0904523C22.5886353 56.0528976 21.5695108 57.9009052 21.2958685 57.9618903 20.884011 58.0536787 19.6585669 58.2808989 19.2959224 58.2808989 19.1661249 58.2808989 20.6087208 56.4858949 20.73931 56.4578597 21.1437814 56.3710266 21.9032607 56.1444946 22.3076322 56.0904523z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#37517C",
    points: "113.534 60.034 70.575 60.91 77.598 61.787 109.866 61.787"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polygon", {
    fill: "#37517C",
    points: "107.397 62.663 78.027 63.19 80.696 63.364 104.821 63.539"
  })));
};

/***/ }),

/***/ "./src/components/ui/presentational/project.jsx":
/*!******************************************************!*\
  !*** ./src/components/ui/presentational/project.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var simple_react_lightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simple-react-lightbox */ "./node_modules/simple-react-lightbox/dist/index.es.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme */ "./src/theme/index.js");
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _skill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./skill */ "./src/components/ui/presentational/skill.jsx");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons */ "./src/components/icons/index.jsx");








const IMAGE_WIDTH = 450;
const IMAGE_HEIGHT = 400;
const StyledProject = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "project__StyledProject",
  componentId: "sc-1v9n348-0"
})(["position:relative;padding-top:", ";margin-bottom:", ";display:flex;align-items:flex-start;@media (max-width:", "){padding-top:", ";flex-direction:column;}.project{margin-right:", ";.project-name{", ";.project-number{font-size:140px;font-family:", ";font-weight:", ";color:", ";line-height:120px;opacity:0.03;position:absolute;left:-50px;top:0;z-index:-1;@media (max-width:", "){font-size:70px;top:-45px;left:0;}}.links{display:flex;flex-wrap:wrap;margin-top:", ";a{display:inline-flex;align-items:center;margin-bottom:", ";&:hover span{text-decoration:underline;}svg{height:15px;width:15px;margin-right:", ";}i{margin-right:", ";text-decoration:none !important;display:inline-block;font-size:", ";}&:not(:last-of-type):after{content:'';border-left:1px solid ", ";height:", ";margin:0 ", ";}}}}.project-description{text-align:justify;}.project-skills{flex-shrink:0;flex-grow:1;margin-top:", ";display:flex;flex-wrap:wrap;align-content:flex-end;}}.project-images-wrapper{--imageWidth:", "px;--imageHeight:", "px;@media (max-width:", "){--imageWidth:", "px;--imageHeight:", "px;}@media (max-width:", "){--imageWidth:", "px;--imageHeight:", "px;}width:calc( var(--imageWidth) * 1.5 + ", " );overflow:hidden;flex-shrink:0;position:relative;@media (max-width:", "){margin-top:", ";width:100%;}@media (min-width:", "){width:calc( var(--imageWidth) * 2.5 + ", " );}.project-images{display:flex;position:relative;left:0;transition:left ease-in 0.5s;.project-image{height:var(--imageHeight);width:var(--imageWidth);background-size:cover;flex-shrink:0;margin-right:", ";}}.arrow{display:none;position:absolute;top:50%;transform:translateY(-50%);padding:", ";margin:0 ", ";color:", ";background:", ";border-radius:5px;&:hover{background:", ";}@media (max-width:", "){display:none !important;}}.arrow-back{left:0;}.arrow-forward{right:", ";@media (max-width:", "){right:0;}}&:hover{.arrow-back{display:", ";}.arrow-forward{display:", ";@media (min-width:", "){display:", ";}@media (min-width:", "){display:", ";}}}}"], ({
  theme
}) => theme.spaces.base(3), ({
  theme
}) => theme.spaces.base(3), ({
  theme
}) => theme.breakpoints.lgSize, ({
  theme
}) => theme.spaces.base(2), ({
  theme
}) => theme.spaces.base(1), _theme_fonts__WEBPACK_IMPORTED_MODULE_3__.H1, ({
  theme
}) => theme.fonts.fontOpenSans, ({
  theme
}) => theme.fontWeights.fontWeightBold, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.fontSizes.fontSizeDefault, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), IMAGE_WIDTH, IMAGE_HEIGHT, ({
  theme
}) => theme.breakpoints.xlgSize, IMAGE_WIDTH * 0.75, IMAGE_HEIGHT * 0.75, ({
  theme
}) => theme.breakpoints.xsSize, IMAGE_WIDTH * 0.6, IMAGE_HEIGHT * 0.6, ({
  theme
}) => theme.spaces.base(2), ({
  theme
}) => theme.breakpoints.lgSize, ({
  theme
}) => theme.spaces.base(1), ({
  theme
}) => theme.breakpoints.xxlgSize, ({
  theme
}) => theme.spaces.base(2), ({
  theme
}) => theme.spaces.base(1), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.UI.colors.white, ({
  theme
}) => `${theme.UI.colors.black}4D`, ({
  theme
}) => `${theme.UI.colors.black}66`, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.spaces.base(1), ({
  theme
}) => theme.breakpoints.lgSize, ({
  currentImageIndex
}) => currentImageIndex > 0 ? 'initial' : 'none', ({
  currentImageIndex,
  totalImages
}) => currentImageIndex < totalImages - 2 ? 'initial' : 'none', ({
  theme
}) => theme.breakpoints.xlgSize, ({
  currentImageIndex,
  totalImages
}) => currentImageIndex < totalImages - 1 ? 'initial' : 'none', ({
  theme
}) => theme.breakpoints.xxlgSize, ({
  currentImageIndex,
  totalImages
}) => currentImageIndex < totalImages - 2 ? 'initial' : 'none');
const lightBoxOptions = {
  settings: {
    autoplaySpeed: 0
  },
  buttons: {
    showThumbnailsButton: false,
    showDownloadButton: false
  },
  caption: {
    showCaption: false
  }
};
const Project = ({
  project,
  index
}) => {
  const {
    0: imageIndex,
    1: setImageIndex
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const images = project.images.map((image, i) => ({
    img: image.url,
    thumb: project.thumbnails[i].gatsbyImageData,
    alt: image.alt
  }));
  const onBack = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };
  const onForward = () => {
    if (imageIndex < project.images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };
  const imageLeft = -imageIndex * (IMAGE_WIDTH + _theme__WEBPACK_IMPORTED_MODULE_2__.theme.spaces.baseNumber(1));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledProject, {
    currentImageIndex: imageIndex,
    totalImages: images.length
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(simple_react_lightbox__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "project"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "project-name"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "project-number"
  }, `${index + 1 < 10 && '0'}${index + 1}`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    dangerouslySetInnerHTML: {
      __html: project.title
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "links"
  }, project.links.map(link => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    key: link.url,
    href: link.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_5__.Icon, {
    type: link.icon
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, link.title))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_3__.Paragraph, {
    className: "project-description"
  }, project.body), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "project-skills"
  }, project.peakSkills.map((skill, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_skill__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: i,
      skill: skill.name,
      isPeakSkill: true
    });
  }), project.skills.map((skill, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_skill__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: i,
      skill: skill.name
    });
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "project-images-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(simple_react_lightbox__WEBPACK_IMPORTED_MODULE_1__.SRLWrapper, {
    options: lightBoxOptions
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "project-images",
    style: {
      left: imageLeft
    }
  }, images.map(image => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    key: image.img,
    href: image.img,
    "data-attribute": "SRL"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__.GatsbyImage, {
    className: "project-image",
    image: image.thumb,
    alt: image.alt,
    srl_gallery_image: "true"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "arrow arrow-back",
    onClick: onBack
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_5__.Icon, {
    type: "arrow-back",
    color: "white",
    size: "2.4rem"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "arrow arrow-forward",
    onClick: onForward
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_5__.Icon, {
    type: "arrow-forward",
    color: "white",
    size: "2.4rem"
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/components/ui/presentational/section.jsx":
/*!******************************************************!*\
  !*** ./src/components/ui/presentational/section.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyledSection": () => (/* binding */ StyledSection),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const StyledSection = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "section__StyledSection",
  componentId: "sc-159qfol-0"
})(["position:relative;margin:20rem 2rem 25rem 2rem;margin-left:150px;.title{margin:0;color:", ";font-size:80px;text-transform:uppercase;font-family:", ";font-weight:", ";white-space:nowrap;position:absolute;top:0;right:100%;transform-origin:top right;transform:rotate(-90deg) translateY(-100%);}.section-body{position:relative;margin-left:10%;max-width:1400px;}@media (max-width:", "){margin:10rem 0;margin-left:", ";margin-right:", ";.title{font-size:45px;padding-bottom:", ";}.section-body{margin:0;margin-left:", ";}}@media (min-width:", "){margin-right:150px;.section-body{margin-left:auto !important;margin-right:auto !important;}}"], ({
  theme
}) => theme.UI.colors.darkGrey, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.spaces.base(2.5), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(0.2), ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.breakpoints.xxlgSize);
const Section = ({
  children,
  titleId,
  title,
  maxWidth,
  bodyStyle = {},
  ...props
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledSection, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section-body",
    style: {
      maxWidth,
      ...bodyStyle
    }
  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "title"
  }, title));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Section);

/***/ }),

/***/ "./src/components/ui/presentational/skill-meter.jsx":
/*!**********************************************************!*\
  !*** ./src/components/ui/presentational/skill-meter.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const MAX_RATE = 10;
const StyledSkillMeter = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "skill-meter__StyledSkillMeter",
  componentId: "sc-4rhqdz-0"
})(["position:relative;margin:0 ", ";margin-bottom:", ";display:flex;align-items:stretch;max-width:100%;min-width:300px;@media (max-width:", "){margin:0;}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;}@keyframes slideInLeft{from{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible;}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}}.slideInLeft{-webkit-animation-name:slideInLeft;animation-name:slideInLeft;}.icon{flex-shrink:0;height:60px;width:60px;background-position:center;background-size:contain;background-repeat:no-repeat;}.skill-bar-wrapper{flex-grow:1;position:relative;display:flex;flex-direction:column;justify-content:space-around;margin-left:", ";.skill-name{font-family:", ";font-weight:", ";color:", ";}.skill-rate{position:absolute;right:0;padding-right:5px;padding-bottom:3px;font-family:", ";font-weight:", ";font-size:", ";color:", ";}.skill-bar{position:relative;width:100%;height:15px;border-radius:15px;background:", ";box-shadow:", ";overflow:hidden;.fill{height:100%;animation-delay:0.3s;transform:translate3d(-100%,0,0);}}}"], ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.fonts.fontOpenSans, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.UI.colors.grey, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.fontSizes.fontSizeXXXSmall, ({
  theme
}) => theme.console.colors.grey, ({
  theme
}) => theme.UI.colors.superLightGrey, ({
  theme
}) => theme.UI.colors.insetShadow);
const SkillMeter = ({
  name,
  icon,
  color1,
  color2,
  rate,
  entered
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledSkillMeter, null, icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "icon",
    style: {
      backgroundImage: `url(${icon})`
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skill-bar-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skill-name"
  }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skill-rate"
  }, rate, "/10"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skill-bar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `fill ${entered ? 'animated slideInLeft' : ''}`,
    style: {
      width: `${rate / MAX_RATE * 100}%`,
      background: `linear-gradient(90deg, ${color1} 50%, ${color2} 100%)`
    }
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SkillMeter);

/***/ }),

/***/ "./src/components/ui/presentational/skill.jsx":
/*!****************************************************!*\
  !*** ./src/components/ui/presentational/skill.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_peakIcon_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/peakIcon.svg */ "./src/assets/peakIcon.svg");
/* harmony import */ var _assets_peakIcon_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_peakIcon_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme/fonts */ "./src/theme/fonts.js");




const StyledSkill = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "skill__StyledSkill",
  componentId: "sc-1bius3y-0"
})(["", ";display:flex;justify-content:center;align-items:center;padding:3px;margin-right:", ";margin-bottom:", ";border-radius:15px;height:30px;background:", ";box-shadow:0 2px 5px 0 rgba(33,41,32,0.17);.skill-wrapper{border:1px solid ", ";border-radius:15px;padding:4px 10px;display:flex;align-items:center;}"], _theme_fonts__WEBPACK_IMPORTED_MODULE_2__.TagText, ({
  theme
}) => theme.spaces.base(0.4), ({
  theme
}) => theme.spaces.base(0.4), ({
  theme
}) => theme.UI.colors.white, ({
  isPeakSkill,
  theme
}) => isPeakSkill ? theme.UI.colors.greenTransparent : 'transparent');
const StyledPeakIcon = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])((_assets_peakIcon_svg__WEBPACK_IMPORTED_MODULE_1___default())).withConfig({
  displayName: "skill__StyledPeakIcon",
  componentId: "sc-1bius3y-1"
})(["margin-right:", ";"], ({
  theme
}) => theme.spaces.base(0.25));
const Skill = ({
  skill,
  isPeakSkill = false
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledSkill, {
    isPeakSkill: isPeakSkill
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skill-wrapper"
  }, isPeakSkill && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledPeakIcon, null), skill));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Skill);

/***/ }),

/***/ "./src/components/ui/presentational/time-bubble.jsx":
/*!**********************************************************!*\
  !*** ./src/components/ui/presentational/time-bubble.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_waypoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-waypoint */ "./node_modules/react-waypoint/es/index.js");
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icons */ "./src/components/icons/index.jsx");





const StyledTimeBubble = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "time-bubble__StyledTimeBubble",
  componentId: "sc-1wd78iq-0"
})(["position:relative;.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;}@keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}}.fadeInUp{-webkit-animation-name:fadeInUp;animation-name:fadeInUp;}.content-box{flex:0 0 50%;width:50%;padding:1rem 4rem;opacity:0;transform:translate3d(0,100%,0);@media (max-width:", "){width:100%;padding:2rem 4rem;}@media (max-width:", "){width:100%;padding:2rem 0rem 2rem 2rem;}.time-range{display:inline-flex;align-items:center;}&.left{text-align:right;margin-right:50%;@media (max-width:", "){margin-right:0;text-align:left;}}&.right{margin-left:50%;margin-right:0;@media (max-width:", "){margin-left:0;}.details{order:2;}.time{order:1;}}}.dot{position:absolute;top:0;height:1rem;width:1rem;background:", ";border-radius:50%;z-index:1;&.left{right:calc(50% - 0.5rem);@media (max-width:", "){left:-0.5rem;}}&.right{left:calc(50% - 0.5rem);@media (max-width:", "){left:-0.5rem;}}}"], ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.breakpoints.xsSize, ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.breakpoints.mdSize);
const TimeBubble = ({
  from,
  to,
  index,
  children
}) => {
  const {
    0: entered,
    1: setEntered
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const side = index % 2 ? 'right' : 'left';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_waypoint__WEBPACK_IMPORTED_MODULE_1__.Waypoint, {
    bottomOffset: "100px",
    onEnter: () => {
      setEntered(true);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledTimeBubble, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `dot ${side}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `content-box ${side} ${entered ? 'animated fadeInUp' : ''}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "time-range"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_2__.H2, {
    className: "start"
  }, from), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_3__.Icon, {
    type: "chevron-right",
    color: "greyText",
    style: {
      margin: '0 0.5rem'
    }
  }), to ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_2__.H2, {
    className: "end"
  }, to) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "details"
  }, children))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeBubble);

/***/ }),

/***/ "./src/components/ui/presentational/time-line.jsx":
/*!********************************************************!*\
  !*** ./src/components/ui/presentational/time-line.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const StyledTimeLine = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "time-line__StyledTimeLine",
  componentId: "sc-w9e8h7-0"
})(["position:relative;margin:0 auto;@media (max-width:", "){max-width:700px;}.line-dot{height:0.8rem;width:0.8rem;background-color:", ";border-radius:50%;position:absolute;left:50%;transform:translateX(-50%);@media (max-width:", "){left:0;}}.end-dot{bottom:0;}.line{height:100%;width:4px;background-color:", ";position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:0;@media (max-width:", "){left:0;}}"], ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.breakpoints.mdSize);
const TimeLine = ({
  children
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledTimeLine, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "line"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "end-dot line-dot"
  }), children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLine);

/***/ }),

/***/ "./src/components/ui/presentational/work-item.jsx":
/*!********************************************************!*\
  !*** ./src/components/ui/presentational/work-item.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _skill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./skill */ "./src/components/ui/presentational/skill.jsx");




const StyledWorkItem = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "work-item__StyledWorkItem",
  componentId: "sc-1gd6ntk-0"
})([".company{color:", ";font-weight:", ";text-transform:uppercase;font-size:", ";font-family:", ";margin:", "/2 0 ", "/2 0;}.work-title{color:", ";font-family:", ";font-size:", ";margin:3*", "/4 0;}.wrapper{margin-top:", ";display:flex;flex-wrap:wrap;&.left{justify-content:flex-end;@media (max-width:", "){justify-content:flex-start;}}}"], ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.fontSizes.fontSizeXLarge, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontSizes.fontSizeLarge, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.breakpoints.mdSize);
const WorkItem = ({
  data,
  isOnLeft
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledWorkItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, null, data.company), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H4, null, data.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.Paragraph, null, data.body), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `wrapper ${isOnLeft ? 'left' : 'right'}`
  }, data.peakSkills ? data.peakSkills.map((skill, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_skill__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: i,
      skill: skill.name,
      isPeakSkill: true
    });
  }) : null, data.skills ? data.skills.map((skill, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_skill__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: i,
      skill: skill.name
    });
  }) : null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkItem);

/***/ }),

/***/ "./src/components/ui/projects.jsx":
/*!****************************************!*\
  !*** ./src/components/ui/projects.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _presentational_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentational/project */ "./src/components/ui/presentational/project.jsx");
/* harmony import */ var _presentational_section__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presentational/section */ "./src/components/ui/presentational/section.jsx");




const StyledProjects = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "projects__StyledProjects",
  componentId: "sc-1c4th9v-0"
})(["", "{.section-body{max-width:none;@media (min-width:", "){margin-left:13% !important;max-width:none;}}@media (min-width:", "){max-width:none;}}"], _presentational_section__WEBPACK_IMPORTED_MODULE_2__.StyledSection, ({
  theme
}) => theme.breakpoints.xxlgSize, ({
  theme
}) => theme.breakpoints.xxlgSize);
const Projects = ({
  scrollRef,
  projects
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledProjects, {
    ref: scrollRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_section__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: projects.title,
    style: {
      marginRight: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "projects"
  }, projects.projects.map((project, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_project__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: i,
      index: i,
      project: project
    });
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Projects);

/***/ }),

/***/ "./src/components/ui/rated-skills.jsx":
/*!********************************************!*\
  !*** ./src/components/ui/rated-skills.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_waypoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-waypoint */ "./node_modules/react-waypoint/es/index.js");
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _presentational_skill_meter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presentational/skill-meter */ "./src/components/ui/presentational/skill-meter.jsx");





const StyledRatedSkills = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "rated-skills__StyledRatedSkills",
  componentId: "sc-83ufrz-0"
})([".rated-skills{display:grid;padding-right:", ";grid-template-columns:repeat(auto-fit,minmax(300px,1fr));justify-items:center;}.first-skill-wrapper{.rated-skills{margin-bottom:0;}}.top-skills-wrapper{@media (max-width:", "){margin-bottom:", ";}}@media (max-width:", "){.first-skill-wrapper{.rated-skills{grid-template-columns:repeat(auto-fit,100%);}}.rated-skills{grid-template-columns:repeat(auto-fit,100%);padding:0;}}"], ({
  theme
}) => theme.spaces.baseSize, ({
  theme
}) => theme.breakpoints.xsSize, ({
  theme
}) => theme.spaces.base(2), ({
  theme
}) => theme.breakpoints.smSize);
class RatedSkills extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      topSkillsEntered: false,
      otherSkillsEntered: false
    };
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledRatedSkills, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_2__.H3, null, this.props.topSkillTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_2__.Paragraph, null, this.props.topSkillBody), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_waypoint__WEBPACK_IMPORTED_MODULE_1__.Waypoint, {
      onEnter: () => {
        this.setState({
          topSkillsEntered: true
        });
      },
      onLeave: () => {
        this.setState({
          topSkillsEntered: false
        });
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "top-skills-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "first-skill-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "rated-skills"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_skill_meter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      rate: this.props.topSkills[0].rate,
      icon: this.props.topSkills[0].image.url,
      name: this.props.topSkills[0].skill.name,
      color1: this.props.topSkills[0].color1.hex,
      color2: this.props.topSkills[0].color2.hex,
      entered: this.state.topSkillsEntered
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "rated-skills"
    }, this.props.topSkills.slice(1).map((skillItem, i) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_skill_meter__WEBPACK_IMPORTED_MODULE_3__["default"], {
        key: i,
        rate: skillItem.rate,
        icon: skillItem.image.url,
        name: skillItem.skill.name,
        color1: skillItem.color1.hex,
        color2: skillItem.color2.hex,
        entered: this.state.topSkillsEntered
      });
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_2__.H3, null, this.props.otherSkillTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_2__.Paragraph, null, this.props.otherSkillBody), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_waypoint__WEBPACK_IMPORTED_MODULE_1__.Waypoint, {
      onEnter: () => {
        this.setState({
          otherSkillsEntered: true
        });
      },
      onLeave: () => {
        this.setState({
          otherSkillsEntered: false
        });
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "rated-skills"
    }, this.props.otherSkills.map((skillItem, i) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_skill_meter__WEBPACK_IMPORTED_MODULE_3__["default"], {
        key: i,
        rate: skillItem.rate,
        icon: skillItem.image.url,
        color1: skillItem.color1.hex,
        color2: skillItem.color2.hex,
        name: skillItem.skill.name,
        entered: this.state.otherSkillsEntered
      });
    }))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RatedSkills);

/***/ }),

/***/ "./src/components/ui/rateless-skills.jsx":
/*!***********************************************!*\
  !*** ./src/components/ui/rateless-skills.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _presentational_skill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presentational/skill */ "./src/components/ui/presentational/skill.jsx");




const StyledRatelessSkills = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "rateless-skills__StyledRatelessSkills",
  componentId: "sc-qw2bgw-0"
})([".rateless-skills{display:flex;flex-wrap:wrap;align-content:flex-start;}", "{@media (max-width:", "){margin-top:", ";}}"], _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, ({
  theme
}) => theme.breakpoints.xsSize, ({
  theme
}) => theme.spaces.base(2));
const RatelessSkills = ({
  topSkillTitle,
  topSkillBody,
  otherSkillTitle,
  otherSkillBody,
  topSkills,
  otherSkills
}) => {
  console.log(topSkillTitle);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledRatelessSkills, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, null, topSkillTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.Paragraph, null, topSkillBody), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "rateless-skills"
  }, topSkills.map((skill, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_skill__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: i,
      skill: skill.name,
      isPeakSkill: true
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, null, otherSkillTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_fonts__WEBPACK_IMPORTED_MODULE_1__.Paragraph, null, otherSkillBody), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "rateless-skills"
  }, otherSkills.map((skill, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_skill__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: i,
      skill: skill.name
    });
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RatelessSkills);

/***/ }),

/***/ "./src/components/ui/skills.jsx":
/*!**************************************!*\
  !*** ./src/components/ui/skills.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _language_skills__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language-skills */ "./src/components/ui/language-skills.jsx");
/* harmony import */ var _presentational_section__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presentational/section */ "./src/components/ui/presentational/section.jsx");
/* harmony import */ var _rated_skills__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rated-skills */ "./src/components/ui/rated-skills.jsx");
/* harmony import */ var _rateless_skills__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rateless-skills */ "./src/components/ui/rateless-skills.jsx");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");








const StyledSkills = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "skills__StyledSkills",
  componentId: "sc-bmcqdl-0"
})(["", "{text-align:center;}", "{text-align:center;color:", ";}", "{@media (min-width:", ") and (max-width:", "){margin-right:0;}}.skills-wrapper{display:flex;.iceberg{width:50%;flex-shrink:0;margin-left:-90px;overflow:hidden;}@media (max-width:", "){flex-direction:row-reverse;.iceberg{margin-left:0;}}@media (max-width:", "){.iceberg{width:35%;.gatsby-image-wrapper{width:200%;}}}@media (max-width:", "){.iceberg{width:0;display:none;}}}"], _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.H3, _theme_fonts__WEBPACK_IMPORTED_MODULE_1__.Paragraph, ({
  theme
}) => theme.UI.colors.mediumGrey, _presentational_section__WEBPACK_IMPORTED_MODULE_3__.StyledSection, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.breakpoints.lgSize, ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.breakpoints.smSize);
const Skills = ({
  scrollRef,
  skills
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledSkills, {
    ref: scrollRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: skills.title,
    bodyStyle: {
      marginLeft: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skills-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "iceberg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_7__.GatsbyImage, {
    image: skills.image.gatsbyImageData,
    alt: skills.image.alt
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_rated_skills__WEBPACK_IMPORTED_MODULE_4__["default"], {
    topSkillTitle: skills.ratedTopSkillTitle,
    topSkillBody: skills.ratedTopSkillBody,
    otherSkillTitle: skills.ratedOtherSkillTitle,
    otherSkillBody: skills.ratedOtherSkillBody,
    topSkills: skills.ratedTopSkills,
    otherSkills: skills.ratedOtherSkills
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_rateless_skills__WEBPACK_IMPORTED_MODULE_5__["default"], {
    topSkillTitle: skills.ratelessTopSkillTitle,
    topSkillBody: skills.ratelessTopSkillBody,
    otherSkillTitle: skills.ratelessOtherSkillTitle,
    otherSkillBody: skills.ratelessOtherSkillBody,
    topSkills: skills.ratelessTopSkills,
    otherSkills: skills.ratelessOtherSkills
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_language_skills__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: skills.languageSkillTitle,
    languageSkills: skills.languageSkills
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Skills);

/***/ }),

/***/ "./src/components/ui/work-history.jsx":
/*!********************************************!*\
  !*** ./src/components/ui/work-history.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _presentational_section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentational/section */ "./src/components/ui/presentational/section.jsx");
/* harmony import */ var _presentational_time_bubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presentational/time-bubble */ "./src/components/ui/presentational/time-bubble.jsx");
/* harmony import */ var _presentational_time_line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presentational/time-line */ "./src/components/ui/presentational/time-line.jsx");
/* harmony import */ var _presentational_work_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presentational/work-item */ "./src/components/ui/presentational/work-item.jsx");





const WorkHistory = ({
  scrollRef,
  workHistory
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: scrollRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_section__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: workHistory.title,
    maxWidth: "1100px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_time_line__WEBPACK_IMPORTED_MODULE_3__["default"], null, workHistory.workHistoryList.map((workitem, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_time_bubble__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: i,
      from: workitem.startDate,
      to: workitem.endDate,
      index: i
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentational_work_item__WEBPACK_IMPORTED_MODULE_4__["default"], {
      data: workitem,
      isOnLeft: i % 2 === 0
    }));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkHistory);

/***/ }),

/***/ "./src/layout.jsx":
/*!************************!*\
  !*** ./src/layout.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalStyle": () => (/* binding */ GlobalStyle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_1942681338_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../public/page-data/sq/d/1942681338.json */ "./public/page-data/sq/d/1942681338.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var gatsby_source_datocms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-source-datocms */ "./node_modules/gatsby-source-datocms/index.js");
/* harmony import */ var gatsby_source_datocms__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gatsby_source_datocms__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _theme_fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./theme/fonts */ "./src/theme/fonts.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./theme */ "./src/theme/index.js");






const GlobalStyle = (0,styled_components__WEBPACK_IMPORTED_MODULE_5__.createGlobalStyle)(["body{font-family:\"Open Sans\",sans-serif;margin:0;font-size:1.5rem;@media (max-width:", "){&.mobile-menu-open{max-height:100vh;overflow:hidden;-webkit-overflow-scrolling:touch;}}}html{height:100%;font-size:62.5%;}a{", ";}button{border:none;outline:none;cursor:pointer;background:none;}*{box-sizing:border-box;font-family:inherit;}::selection{background:#9eaada;color:white;}::-moz-selection{background:#9eaada;color:white;}#root{overflow:hidden;}.white-box{background:white;box-shadow:2px 2px 6px 0px rgba(0,0,0,0.18);}"], ({
  theme
}) => theme.breakpoints.smSize, _theme_fonts__WEBPACK_IMPORTED_MODULE_3__.Anchor);
const Layout = ({
  children
}) => {
  const data = _public_page_data_sq_d_1942681338_json__WEBPACK_IMPORTED_MODULE_0__.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(styled_components__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, {
    theme: _theme__WEBPACK_IMPORTED_MODULE_4__.theme
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(GlobalStyle, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(gatsby_source_datocms__WEBPACK_IMPORTED_MODULE_2__.HelmetDatoCms, {
    favicon: data.site.faviconMetaTags
  }), children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/templates/index.js?export=default":
/*!***********************************************!*\
  !*** ./src/templates/index.js?export=default ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Head": () => (/* binding */ Head),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _components_ui_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ui/home */ "./src/components/ui/home.jsx");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../layout */ "./src/layout.jsx");




const IndexPage = ({
  data,
  pageContext
}) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const previousLang = localStorage.getItem('language');
    if (previousLang && previousLang !== pageContext.locale) {
      const prefix = pageContext.locale === 'en' ? '/fi' : '/';
      (0,gatsby__WEBPACK_IMPORTED_MODULE_1__.navigate)(prefix, {
        replace: true
      });
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_layout__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ui_home__WEBPACK_IMPORTED_MODULE_2__["default"], {
    data: data
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);
const Head = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, "tiina.dev");
const query = "2488437956";

/***/ }),

/***/ "./src/theme/colors.js":
/*!*****************************!*\
  !*** ./src/theme/colors.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "consoleColors": () => (/* binding */ consoleColors),
/* harmony export */   "uiColors": () => (/* binding */ uiColors)
/* harmony export */ });
const consoleColors = {
  magenta: '#ff2086',
  green: '#10ffd4',
  yellow: '#f4f700',
  grey: '#7d7d7d'
};
const uiColors = {
  white: '#ffffff',
  black: '#000000',
  almostBlack: '#222223',
  greyText: '#7694a7',
  green: '#457A64',
  greenDark: '#0E4C32',
  greenTransparent: '#457A6466',
  berry: '#BE5C85',
  // ~50 shades of grey:
  superLightGrey: '#f0f0f0',
  lightGrey: '#f2f2f2',
  lightestGrey: '#F7F7F7',
  lightestGreyAlt: '#F1F1F1',
  grey: '#7C7C7C',
  mediumGrey: '#818181',
  darkGrey: '#505050',
  insetShadow: 'inset 1px 1px 3px 0 #27332B40',
  bluishGrey: '#dce4ea',
  transparentBluishGrey: '#21272E66'
};

/***/ }),

/***/ "./src/theme/fonts.js":
/*!****************************!*\
  !*** ./src/theme/fonts.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Anchor": () => (/* binding */ Anchor),
/* harmony export */   "ButtonText": () => (/* binding */ ButtonText),
/* harmony export */   "H1": () => (/* binding */ H1),
/* harmony export */   "H2": () => (/* binding */ H2),
/* harmony export */   "H3": () => (/* binding */ H3),
/* harmony export */   "H4": () => (/* binding */ H4),
/* harmony export */   "PageName": () => (/* binding */ PageName),
/* harmony export */   "PageSubtitle": () => (/* binding */ PageSubtitle),
/* harmony export */   "PageTitle": () => (/* binding */ PageTitle),
/* harmony export */   "Paragraph": () => (/* binding */ Paragraph),
/* harmony export */   "ParagraphStyle": () => (/* binding */ ParagraphStyle),
/* harmony export */   "TagText": () => (/* binding */ TagText)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");

const PageTitle = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:", ";margin:", " 7rem;@media (max-width:", "){margin-left:0;margin-right:0;}@media (max-width:", "){font-size:", ";}"], ({
  theme
}) => theme.UI.colors.white, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.fontSizes.fontSizeXXXLarge, ({
  theme
}) => theme.spaces.base(0.25), ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.fontSizes.fontSizeXLarge);
const PageName = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:9.2rem;text-align:center;@media (max-width:", "){font-size:", ";text-align:left;}"], ({
  theme
}) => theme.UI.colors.white, ({
  theme
}) => theme.fonts.fontPTSerif, ({
  theme
}) => theme.fontWeights.fontWeightBold, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.fontSizes.fontSizeXXXLarge);
const PageSubtitle = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:", ";line-height:", ";text-transform:uppercase;letter-spacing:1.9px;text-align:center;margin:", " auto;max-width:500px;@media (max-width:", "){text-align:left;margin-left:", ";margin-right:", ";}@media (max-width:", "){font-size:", ";}"], ({
  theme
}) => theme.UI.colors.green, ({
  theme
}) => theme.fonts.fontOpenSans, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.fontSizes.fontSizeSmall, ({
  theme
}) => theme.fontSizes.fontSizeXXLarge, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.breakpoints.mdSize, ({
  theme
}) => theme.spaces.base(0.25), ({
  theme
}) => theme.spaces.base(0.25), ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.fontSizes.fontSizeXSmall);
const H1 = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:", ";letter-spacing:4.7px;text-transform:uppercase;"], ({
  theme
}) => theme.UI.colors.berry, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.fontSizes.fontSizeXXXLarge);
const H2 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h2.withConfig({
  displayName: "fonts__H2"
})(["color:", ";font-family:", ";font-weight:", ";font-size:", ";text-transform:capitalize;margin:", " 0;"], ({
  theme
}) => theme.UI.colors.berry, ({
  theme
}) => theme.fonts.fontOpenSans, ({
  theme
}) => theme.fontWeights.fontWeightMedium, ({
  theme
}) => theme.fontSizes.fontSizeXLarge, ({
  theme
}) => theme.spaces.base(0.5));
const H3 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h3.withConfig({
  displayName: "fonts__H3"
})(["color:", ";font-family:", ";font-weight:", ";font-size:", ";text-transform:uppercase;margin:", " 0;"], ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.fontSizes.fontSizeXXLarge, ({
  theme
}) => theme.spaces.base(0.5));
const H4 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h4.withConfig({
  displayName: "fonts__H4"
})(["color:", ";font-family:", ";font-weight:", ";font-size:", ";margin:", " 0;"], ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.fontSizes.fontSizeXLarge, ({
  theme
}) => theme.spaces.base(0.5));
const ParagraphStyle = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:", ";line-height:2.5rem;margin:", " 0 ", " 0;"], ({
  theme
}) => theme.UI.colors.darkGrey, ({
  theme
}) => theme.fonts.fontOpenSans, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.fontSizes.fontSizeDefault, ({
  theme
}) => theme.spaces.base(0.5), ({
  theme
}) => theme.spaces.base(1));
const Paragraph = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].p.withConfig({
  displayName: "fonts__Paragraph"
})(["", ";"], ParagraphStyle);
const ButtonText = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:", ";text-transform:uppercase;"], ({
  theme
}) => theme.UI.colors.green, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightBold, ({
  theme
}) => theme.fontSizes.fontSizeDefault);
const TagText = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:", ";text-transform:uppercase;"], ({
  theme
}) => theme.UI.colors.green, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightRegular, ({
  theme
}) => theme.fontSizes.fontSizeXSmall);
const Anchor = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["color:", ";font-family:", ";font-weight:", ";font-size:", ";text-transform:uppercase;text-decoration:none;@media (max-width:", "){font-size:", ";}"], ({
  theme
}) => theme.UI.colors.black, ({
  theme
}) => theme.fonts.fontLato, ({
  theme
}) => theme.fontWeights.fontWeightLight, ({
  theme
}) => theme.fontSizes.fontSizeXSmall, ({
  theme
}) => theme.breakpoints.smSize, ({
  theme
}) => theme.fontSizes.fontSizeXXSmall);

/***/ }),

/***/ "./src/theme/index.js":
/*!****************************!*\
  !*** ./src/theme/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "theme": () => (/* binding */ theme)
/* harmony export */ });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/theme/colors.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variables */ "./src/theme/variables.js");


const theme = {
  ..._variables__WEBPACK_IMPORTED_MODULE_1__.variables,
  UI: {
    colors: _colors__WEBPACK_IMPORTED_MODULE_0__.uiColors
  },
  console: {
    colors: _colors__WEBPACK_IMPORTED_MODULE_0__.consoleColors
  }
};

/***/ }),

/***/ "./src/theme/variables.js":
/*!********************************!*\
  !*** ./src/theme/variables.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "variables": () => (/* binding */ variables)
/* harmony export */ });
const variables = {
  breakpoints: {
    xxlgSize: '1900px',
    xlgSize: '1600px',
    lgSize: '1200px',
    mdSize: '999px',
    smSize: '799px',
    xsSize: '499px'
  },
  fonts: {
    fontLato: 'Lato, sans-serif',
    fontOpenSans: 'Open sans, sans-serif',
    fontPTSerif: 'PT Serif, serif',
    fontSourceCode: 'Source Code Pro, monospace'
  },
  fontWeights: {
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700'
  },
  fontSizes: {
    fontSizeXXXLarge: '3rem',
    fontSizeXXLarge: '2.2rem',
    fontSizeXLarge: '2.0rem',
    fontSizeLarge: '1.8rem',
    fontSizeDefault: '1.5rem',
    fontSizeSmall: '1.3rem',
    fontSizeXSmall: '1.2rem',
    fontSizeXXSmall: '1.1rem',
    fontSizeXXXSmall: '1rem'
  },
  spaces: {
    baseSize: '25px',
    base: x => `${x * 25}px`,
    baseNumber: x => x * 25
  },
  navBarHeight: '100px',
  rightMenuWidth: '100px',
  navBarHeightMobile: '55px',
  langSelectionWidth: '85px'
};

/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/mitt/dist/mitt.es.js":
/*!*******************************************!*\
  !*** ./node_modules/mitt/dist/mitt.es.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),

/***/ "./node_modules/node-fetch/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/node-fetch/lib/index.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__webpack_require__(/*! stream */ "stream"));
var http = _interopDefault(__webpack_require__(/*! http */ "http"));
var Url = _interopDefault(__webpack_require__(/*! url */ "url"));
var whatwgUrl = _interopDefault(__webpack_require__(/*! whatwg-url */ "./node_modules/whatwg-url/lib/public-api.js"));
var https = _interopDefault(__webpack_require__(/*! https */ "https"));
var zlib = _interopDefault(__webpack_require__(/*! zlib */ "zlib"));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'encoding'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');
const URL = Url.URL || whatwgUrl.URL;

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

/**
 * Wrapper around `new URL` to handle arbitrary URLs
 *
 * @param  {string} urlStr
 * @return {void}
 */
function parseURL(urlStr) {
	/*
 	Check whether the URL is absolute or not
 		Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
 	Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
 */
	if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(urlStr)) {
		urlStr = new URL(urlStr).toString();
	}

	// Fallback to old implementation for arbitrary URLs
	return parse_url(urlStr);
}

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parseURL(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parseURL(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parseURL(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

const URL$1 = Url.URL || whatwgUrl.URL;

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;

const isDomainOrSubdomain = function isDomainOrSubdomain(destination, original) {
	const orig = new URL$1(original).hostname;
	const dest = new URL$1(destination).hostname;

	return orig === dest || orig[orig.length - dest.length - 1] === '.' && orig.endsWith(dest);
};

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				let locationURL = null;
				try {
					locationURL = location === null ? null : new URL$1(location, request.url).toString();
				} catch (err) {
					// error here can only be invalid URL in Location: header
					// do not throw when options.redirect == manual
					// let the user extract the errorneous redirect URL
					if (request.redirect !== 'manual') {
						reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, 'invalid-redirect'));
						finalize();
						return;
					}
				}

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						if (!isDomainOrSubdomain(request.url, locationURL)) {
							for (const name of ['authorization', 'www-authenticate', 'cookie', 'cookie2']) {
								requestOpts.headers.delete(name);
							}
						}

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ "./node_modules/node-object-hash/dist/hasher.js":
/*!******************************************************!*\
  !*** ./node_modules/node-object-hash/dist/hasher.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var objectSorter_1 = __importDefault(__webpack_require__(/*! ./objectSorter */ "./node_modules/node-object-hash/dist/objectSorter.js"));
var crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "crypto"));
/**
 * Default hash algorithm
 */
var DEFAULT_ALG = 'sha256';
/**
 * Default hash string enoding
 */
var DEFAULT_ENC = 'hex';
/**
 * Hasher constructor
 * @param options hasher options
 * @return hasher instance
 */
function hasher(options) {
    if (options === void 0) { options = {}; }
    var sortObject = (0, objectSorter_1.default)(options);
    /**
     * Object hash function
     * @param obj object to hash
     * @param opts hasher options
     * @returns hash string
     */
    function hashObject(obj, opts) {
        if (opts === void 0) { opts = {}; }
        var alg = opts.alg || options.alg || DEFAULT_ALG;
        var enc = opts.enc || options.enc || DEFAULT_ENC;
        var sorted = sortObject(obj);
        return crypto_1.default.createHash(alg).update(sorted).digest(enc);
    }
    return {
        hash: hashObject,
        sort: sortObject,
        sortObject: sortObject,
    };
}
module.exports = hasher;
//# sourceMappingURL=hasher.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/objectSorter.js":
/*!************************************************************!*\
  !*** ./node_modules/node-object-hash/dist/objectSorter.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var typeGuess_1 = __webpack_require__(/*! ./typeGuess */ "./node_modules/node-object-hash/dist/typeGuess.js");
var str = __importStar(__webpack_require__(/*! ./stringifiers */ "./node_modules/node-object-hash/dist/stringifiers.js"));
/**
 * Object sorter consturctor
 * @param options object transformation options
 * @return function that transforms object to strings
 */
function objectSorter(options) {
    if (options === void 0) { options = {}; }
    var _a = __assign({ sort: true, coerce: true, trim: false }, options), sort = _a.sort, coerce = _a.coerce, trim = _a.trim;
    var stringifiers = {
        unknown: function _unknown(obj) {
            var _a, _b;
            // `unknonw` - is a typo, saved for backward compatibility
            var constructorName = (_b = (_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'unknonw';
            var objectName = typeof obj.toString === 'function' ? obj.toString() : 'unknown';
            return "<:" + constructorName + ">:" + objectName;
        },
    };
    var sortOptions = {
        array: typeof sort === 'boolean' ? sort : sort.array,
        typedArray: typeof sort === 'boolean' ? false : sort.typedArray,
        object: typeof sort === 'boolean' ? sort : sort.object,
        set: typeof sort === 'boolean' ? sort : sort.set,
        map: typeof sort === 'boolean' ? sort : sort.map,
    };
    var coerceOptions = {
        boolean: typeof coerce === 'boolean' ? coerce : coerce.boolean,
        number: typeof coerce === 'boolean' ? coerce : coerce.number,
        bigint: typeof coerce === 'boolean' ? coerce : coerce.bigint,
        string: typeof coerce === 'boolean' ? coerce : coerce.string,
        undefined: typeof coerce === 'boolean' ? coerce : coerce.undefined,
        null: typeof coerce === 'boolean' ? coerce : coerce.null,
        symbol: typeof coerce === 'boolean' ? coerce : coerce.symbol,
        function: typeof coerce === 'boolean' ? coerce : coerce.function,
        date: typeof coerce === 'boolean' ? coerce : coerce.date,
        set: typeof coerce === 'boolean' ? coerce : coerce.set,
    };
    var trimOptions = {
        string: typeof trim === 'boolean' ? trim : trim.string,
        function: typeof trim === 'boolean' ? trim : trim.function,
    };
    stringifiers.hashable = str._hashable.bind(stringifiers);
    if (trimOptions.string) {
        stringifiers.string = coerceOptions.string
            ? str._stringTrimCoerce.bind(stringifiers)
            : str._stringTrim.bind(stringifiers);
    }
    else {
        stringifiers.string = coerceOptions.string
            ? str._stringCoerce.bind(stringifiers)
            : str._string.bind(stringifiers);
    }
    stringifiers.number = coerceOptions.number
        ? str._numberCoerce.bind(stringifiers)
        : str._number.bind(stringifiers);
    stringifiers.bigint = coerceOptions.bigint
        ? str._bigIntCoerce.bind(stringifiers)
        : str._bigInt.bind(stringifiers);
    stringifiers.boolean = coerceOptions.boolean
        ? str._booleanCoerce.bind(stringifiers)
        : str._boolean.bind(stringifiers);
    stringifiers.symbol = coerceOptions.symbol
        ? str._symbolCoerce.bind(stringifiers)
        : str._symbol.bind(stringifiers);
    stringifiers.undefined = coerceOptions.undefined
        ? str._undefinedCoerce.bind(stringifiers)
        : str._undefined.bind(stringifiers);
    stringifiers.null = coerceOptions.null
        ? str._nullCoerce.bind(stringifiers)
        : str._null.bind(stringifiers);
    if (trimOptions.function) {
        stringifiers.function = coerceOptions.function
            ? str._functionTrimCoerce.bind(stringifiers)
            : str._functionTrim.bind(stringifiers);
    }
    else {
        stringifiers.function = coerceOptions.function
            ? str._functionCoerce.bind(stringifiers)
            : str._function.bind(stringifiers);
    }
    stringifiers.date = coerceOptions.date
        ? str._dateCoerce.bind(stringifiers)
        : str._date.bind(stringifiers);
    stringifiers.array = sortOptions.array
        ? str._arraySort.bind(stringifiers)
        : str._array.bind(stringifiers);
    stringifiers.typedarray = sortOptions.typedArray
        ? str._typedArraySort.bind(stringifiers)
        : str._typedArray.bind(stringifiers);
    if (sortOptions.set) {
        stringifiers.set = coerceOptions.set
            ? str._setSortCoerce.bind(stringifiers)
            : str._setSort.bind(stringifiers);
    }
    else {
        stringifiers.set = coerceOptions.set
            ? str._setCoerce.bind(stringifiers)
            : str._set.bind(stringifiers);
    }
    stringifiers.object = sortOptions.object
        ? str._objectSort.bind(stringifiers)
        : str._object.bind(stringifiers);
    stringifiers.map = sortOptions.map
        ? str._mapSort.bind(stringifiers)
        : str._map.bind(stringifiers);
    /**
     * Serializes object to string
     * @param obj object
     */
    function objectToString(obj) {
        return stringifiers[(0, typeGuess_1.guessType)(obj)](obj);
    }
    return objectToString;
}
module.exports = objectSorter;
//# sourceMappingURL=objectSorter.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/stringifiers.js":
/*!************************************************************!*\
  !*** ./node_modules/node-object-hash/dist/stringifiers.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @private
 * @inner
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._mapSort = exports._map = exports._objectSort = exports._object = exports._setCoerce = exports._set = exports._setSort = exports._setSortCoerce = exports._typedArray = exports._typedArraySort = exports._array = exports._arraySort = exports._date = exports._dateCoerce = exports._functionTrim = exports._functionTrimCoerce = exports._function = exports._functionCoerce = exports._null = exports._nullCoerce = exports._undefined = exports._undefinedCoerce = exports._symbol = exports._symbolCoerce = exports._boolean = exports._booleanCoerce = exports._bigInt = exports._bigIntCoerce = exports._number = exports._numberCoerce = exports._stringTrim = exports._stringTrimCoerce = exports._string = exports._stringCoerce = exports._hashable = exports.PREFIX = void 0;
var typeGuess_1 = __webpack_require__(/*! ./typeGuess */ "./node_modules/node-object-hash/dist/typeGuess.js");
/**
 * Prefixes that used when type coercion is disabled
 */
exports.PREFIX = {
    string: '<:s>',
    number: '<:n>',
    bigint: '<:bi>',
    boolean: '<:b>',
    symbol: '<:smbl>',
    undefined: '<:undf>',
    null: '<:null>',
    function: '<:func>',
    array: '',
    date: '<:date>',
    set: '<:set>',
    map: '<:map>',
};
/**
 * Converts Hashable to string
 * @private
 * @param obj object to convert
 * @returns object string representation
 */
function _hashable(obj) {
    return obj.toHashableString();
}
exports._hashable = _hashable;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringCoerce(obj) {
    return obj;
}
exports._stringCoerce = _stringCoerce;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _string(obj) {
    return exports.PREFIX.string + ':' + obj;
}
exports._string = _string;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringTrimCoerce(obj) {
    return obj.replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ').trim();
}
exports._stringTrimCoerce = _stringTrimCoerce;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringTrim(obj) {
    return exports.PREFIX.string + ':' + obj.replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ').trim();
}
exports._stringTrim = _stringTrim;
/**
 * Converts number to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _numberCoerce(obj) {
    return obj.toString();
}
exports._numberCoerce = _numberCoerce;
/**
 * Converts number to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _number(obj) {
    return exports.PREFIX.number + ":" + obj;
}
exports._number = _number;
/**
 * Converts BigInt to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _bigIntCoerce(obj) {
    return obj.toString();
}
exports._bigIntCoerce = _bigIntCoerce;
/**
 * Converts BigInt to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _bigInt(obj) {
    return exports.PREFIX.bigint + ":" + obj.toString();
}
exports._bigInt = _bigInt;
/**
 * Converts boolean to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _booleanCoerce(obj) {
    return obj ? '1' : '0';
}
exports._booleanCoerce = _booleanCoerce;
/**
 * Converts boolean to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _boolean(obj) {
    return exports.PREFIX.boolean + ':' + obj.toString();
}
exports._boolean = _boolean;
/**
 * Converts symbol to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _symbolCoerce() {
    return exports.PREFIX.symbol;
}
exports._symbolCoerce = _symbolCoerce;
/**
 * Converts symbol to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _symbol(obj) {
    return exports.PREFIX.symbol + ':' + obj.toString();
}
exports._symbol = _symbol;
/**
 * Converts undefined to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _undefinedCoerce() {
    return '';
}
exports._undefinedCoerce = _undefinedCoerce;
/**
 * Converts undefined to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _undefined() {
    return exports.PREFIX.undefined;
}
exports._undefined = _undefined;
/**
 * Converts null to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _nullCoerce() {
    return '';
}
exports._nullCoerce = _nullCoerce;
/**
 * Converts null to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _null() {
    return exports.PREFIX.null;
}
exports._null = _null;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionCoerce(obj) {
    return obj.name + '=>' + obj.toString();
}
exports._functionCoerce = _functionCoerce;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _function(obj) {
    return exports.PREFIX.function + ':' + obj.name + '=>' + obj.toString();
}
exports._function = _function;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionTrimCoerce(obj) {
    return (obj.name +
        '=>' +
        obj
            .toString()
            .replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ')
            .trim());
}
exports._functionTrimCoerce = _functionTrimCoerce;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionTrim(obj) {
    return (exports.PREFIX.function +
        ':' +
        obj.name +
        '=>' +
        obj
            .toString()
            .replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ')
            .trim());
}
exports._functionTrim = _functionTrim;
/**
 * Converts date to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _dateCoerce(obj) {
    return obj.toISOString();
}
exports._dateCoerce = _dateCoerce;
/**
 * Converts date to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _date(obj) {
    return exports.PREFIX.date + ':' + obj.toISOString();
}
exports._date = _date;
/**
 * Converts array to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _arraySort(obj) {
    var stringifiers = this;
    return ('[' +
        obj
            .map(function (item) {
            return stringifiers[(0, typeGuess_1.guessType)(item)](item);
        })
            .sort()
            .toString() +
        ']');
}
exports._arraySort = _arraySort;
/**
 * Converts array to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _array(obj) {
    var stringifiers = this;
    return ('[' +
        obj
            .map(function (item) {
            return stringifiers[(0, typeGuess_1.guessType)(item)](item);
        })
            .toString() +
        ']');
}
exports._array = _array;
/**
 * Converts TypedArray to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _typedArraySort(obj) {
    var stringifiers = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var values = Array.prototype.slice.call(obj);
    return ('[' +
        values
            .map(function (num) {
            return stringifiers[(0, typeGuess_1.guessType)(num)](num);
        })
            .sort()
            .toString() +
        ']');
}
exports._typedArraySort = _typedArraySort;
/**
 * Converts TypedArray to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _typedArray(obj) {
    var stringifiers = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var values = Array.prototype.slice.call(obj);
    return ('[' +
        values
            .map(function (num) {
            return stringifiers[(0, typeGuess_1.guessType)(num)](num);
        })
            .toString() +
        ']');
}
exports._typedArray = _typedArray;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setSortCoerce(obj) {
    return _arraySort.call(this, Array.from(obj));
}
exports._setSortCoerce = _setSortCoerce;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setSort(obj) {
    return exports.PREFIX.set + ":" + _arraySort.call(this, Array.from(obj));
}
exports._setSort = _setSort;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _set(obj) {
    return exports.PREFIX.set + ":" + _array.call(this, Array.from(obj));
}
exports._set = _set;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setCoerce(obj) {
    return _array.call(this, Array.from(obj));
}
exports._setCoerce = _setCoerce;
/**
 * Converts object to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _object(obj) {
    var stringifiers = this;
    var keys = Object.keys(obj);
    var objArray = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var val = obj[key];
        var valT = (0, typeGuess_1.guessType)(val);
        objArray.push(key + ':' + stringifiers[valT](val));
    }
    return '{' + objArray.toString() + '}';
}
exports._object = _object;
/**
 * Converts object to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _objectSort(obj) {
    var stringifiers = this;
    var keys = Object.keys(obj).sort();
    var objArray = [];
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var val = obj[key];
        var valT = (0, typeGuess_1.guessType)(val);
        objArray.push(key + ':' + stringifiers[valT](val));
    }
    return '{' + objArray.toString() + '}';
}
exports._objectSort = _objectSort;
/**
 * Converts map to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _map(obj) {
    var stringifiers = this;
    var arr = Array.from(obj);
    var mapped = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        var _a = item, key = _a[0], value = _a[1];
        mapped.push([
            stringifiers[(0, typeGuess_1.guessType)(key)](key),
            stringifiers[(0, typeGuess_1.guessType)(value)](value),
        ]);
    }
    return '[' + mapped.join(';') + ']';
}
exports._map = _map;
/**
 * Converts map to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _mapSort(obj) {
    var stringifiers = this;
    var arr = Array.from(obj);
    var mapped = [];
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var item = arr_2[_i];
        var _a = item, key = _a[0], value = _a[1];
        mapped.push([
            stringifiers[(0, typeGuess_1.guessType)(key)](key),
            stringifiers[(0, typeGuess_1.guessType)(value)](value),
        ]);
    }
    return '[' + mapped.sort().join(';') + ']';
}
exports._mapSort = _mapSort;
//# sourceMappingURL=stringifiers.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/typeGuess.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-object-hash/dist/typeGuess.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guessType = exports.guessObjectType = exports.TYPE_MAP = void 0;
/**
 * Type mapping rules.
 */
exports.TYPE_MAP = {
    Array: 'array',
    Int8Array: 'typedarray',
    Uint8Array: 'typedarray',
    Uint8ClampedArray: 'typedarray',
    Int16Array: 'typedarray',
    Uint16Array: 'typedarray',
    Int32Array: 'typedarray',
    Uint32Array: 'typedarray',
    Float32Array: 'typedarray',
    Float64Array: 'typedarray',
    BigUint64Array: 'typedarray',
    BigInt64Array: 'typedarray',
    Buffer: 'typedarray',
    Map: 'map',
    Set: 'set',
    Date: 'date',
    String: 'string',
    Number: 'number',
    BigInt: 'bigint',
    Boolean: 'boolean',
    Object: 'object',
};
/**
 * Guess object type
 * @param obj analyzed object
 * @return object type
 */
function guessObjectType(obj) {
    var _a, _b;
    if (obj === null) {
        return 'null';
    }
    if (instanceOfHashable(obj)) {
        return 'hashable';
    }
    var type = (_b = (_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'unknown';
    return exports.TYPE_MAP[type] || 'unknown';
}
exports.guessObjectType = guessObjectType;
/**
 * Guess variable type
 * @param obj analyzed variable
 * @return variable type
 */
function guessType(obj) {
    var type = typeof obj;
    return type !== 'object' ? type : guessObjectType(obj);
}
exports.guessType = guessType;
/**
 * Identify if object is instance of Hashable interface
 * @param object analyzed variable
 * @return true if object has toHashableString property and this property is function
 * otherwise return false
 */
function instanceOfHashable(object) {
    return typeof object.toHashableString === 'function';
}
//# sourceMappingURL=typeGuess.js.map

/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/object.entries/implementation.js":
/*!*******************************************************!*\
  !*** ./node_modules/object.entries/implementation.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var RequireObjectCoercible = __webpack_require__(/*! es-abstract/2022/RequireObjectCoercible */ "./node_modules/es-abstract/2022/RequireObjectCoercible.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $push = callBound('Array.prototype.push');

module.exports = function entries(O) {
	var obj = RequireObjectCoercible(O);
	var entrys = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			$push(entrys, [key, obj[key]]);
		}
	}
	return entrys;
};


/***/ }),

/***/ "./node_modules/object.entries/index.js":
/*!**********************************************!*\
  !*** ./node_modules/object.entries/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object.entries/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object.entries/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object.entries/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object.entries/polyfill.js":
/*!*************************************************!*\
  !*** ./node_modules/object.entries/polyfill.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object.entries/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.entries === 'function' ? Object.entries : implementation;
};


/***/ }),

/***/ "./node_modules/object.entries/shim.js":
/*!*********************************************!*\
  !*** ./node_modules/object.entries/shim.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object.entries/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimEntries() {
	var polyfill = getPolyfill();
	define(Object, { entries: polyfill }, {
		entries: function testEntries() {
			return Object.entries !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/react-fast-compare/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-fast-compare/index.js ***!
  \**************************************************/
/***/ ((module) => {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/react-helmet/es/Helmet.js":
/*!************************************************!*\
  !*** ./node_modules/react-helmet/es/Helmet.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helmet": () => (/* binding */ HelmetExport),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/react-helmet/node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-side-effect */ "./node_modules/react-side-effect/lib/index.js");
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_side_effect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fast-compare */ "./node_modules/react-fast-compare/index.js");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! object-assign */ "./node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_4__);






var ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src",
    TARGET: "target"
};

var REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = "data-react-helmet";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
        bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [react__WEBPACK_IMPORTED_MODULE_3___default().createElement(TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case ATTRIBUTE_NAMES.BODY:
        case ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            classCallCheck(this, HelmetWrapper);
            return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default()(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case TAG_NAMES.SCRIPT:
                case TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _babelHelpers$extends;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _babelHelpers$extends2, _babelHelpers$extends3;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));

                case TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _babelHelpers$extends4;

                newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (true) {
                if (!VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return warn("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return warn("Only elements types " + VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            react__WEBPACK_IMPORTED_MODULE_3___default().Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = convertReactPropstoHtmlAttributes(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case TAG_NAMES.LINK:
                    case TAG_NAMES.META:
                    case TAG_NAMES.NOSCRIPT:
                    case TAG_NAMES.SCRIPT:
                    case TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Component, newProps);
        };

        createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} defer: true
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set$$1(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);
        return HelmetWrapper;
    }((react__WEBPACK_IMPORTED_MODULE_3___default().Component)), _class.propTypes = {
        base: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        bodyAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        children: prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)]),
        defaultTitle: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
        defer: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool),
        encodeSpecialCharacters: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool),
        htmlAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        link: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        meta: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        noscript: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        onChangeClientState: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().func),
        script: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        style: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        title: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
        titleAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        titleTemplate: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = react_side_effect__WEBPACK_IMPORTED_MODULE_1___default()(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelmetExport);



/***/ }),

/***/ "./node_modules/react-helmet/node_modules/prop-types/checkPropTypes.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-helmet/node_modules/prop-types/checkPropTypes.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/react-helmet/node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/react-helmet/node_modules/prop-types/factoryWithTypeCheckers.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/react-helmet/node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/react-helmet/node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/react-helmet/node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/react-helmet/node_modules/prop-types/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-helmet/node_modules/prop-types/index.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/react-helmet/node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/react-helmet/node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-helmet/node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack.development.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack.development.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-server-dom-webpack.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

function createStringDecoder() {
  return new TextDecoder();
}
var decoderOptions = {
  stream: true
};
function readPartialStringChunk(decoder, buffer) {
  return decoder.decode(buffer, decoderOptions);
}
function readFinalStringChunk(decoder, buffer) {
  return decoder.decode(buffer);
}

function parseModel(response, json) {
  return JSON.parse(json, response._fromJSON);
}

// eslint-disable-next-line no-unused-vars
function resolveModuleReference(bundlerConfig, moduleData) {
  if (bundlerConfig) {
    return bundlerConfig[moduleData.id][moduleData.name];
  }

  return moduleData;
} // The chunk cache contains all the chunks we've preloaded so far.
// If they're still pending they're a thenable. This map also exists
// in Webpack but unfortunately it's not exposed so we have to
// replicate it in user space. null means that it has already loaded.

var chunkCache = new Map(); // Start preloading the modules since we might need them soon.
// This function doesn't suspend.

function preloadModule(moduleData) {
  var chunks = moduleData.chunks;

  for (var i = 0; i < chunks.length; i++) {
    var chunkId = chunks[i];
    var entry = chunkCache.get(chunkId);

    if (entry === undefined) {
      var thenable = __webpack_require__.e(chunkId);

      var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
      var reject = chunkCache.set.bind(chunkCache, chunkId);
      thenable.then(resolve, reject);
      chunkCache.set(chunkId, thenable);
    }
  }
} // Actually require the module or suspend if it's not yet ready.
// Increase priority if necessary.

function requireModule(moduleData) {
  var chunks = moduleData.chunks;

  for (var i = 0; i < chunks.length; i++) {
    var chunkId = chunks[i];
    var entry = chunkCache.get(chunkId);

    if (entry !== null) {
      // We assume that preloadModule has been called before.
      // So we don't expect to see entry being undefined here, that's an error.
      // Let's throw either an error or the Promise.
      throw entry;
    }
  }

  var moduleExports = __webpack_require__(moduleData.id);

  if (moduleData.name === '*') {
    // This is a placeholder value that represents that the caller imported this
    // as a CommonJS module as is.
    return moduleExports;
  }

  if (moduleData.name === '') {
    // This is a placeholder value that represents that the caller accessed the
    // default property of this if it was an ESM interop module.
    return moduleExports.__esModule ? moduleExports.default : moduleExports;
  }

  return moduleExports[moduleData.name];
}

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for('react.default_value');

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ContextRegistry = ReactSharedInternals.ContextRegistry;
function getOrCreateServerContext(globalName) {
  if (!ContextRegistry[globalName]) {
    ContextRegistry[globalName] = React.createServerContext(globalName, REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED);
  }

  return ContextRegistry[globalName];
}

var PENDING = 0;
var RESOLVED_MODEL = 1;
var RESOLVED_MODULE = 2;
var INITIALIZED = 3;
var ERRORED = 4;

function Chunk(status, value, response) {
  this._status = status;
  this._value = value;
  this._response = response;
}

Chunk.prototype.then = function (resolve) {
  var chunk = this;

  if (chunk._status === PENDING) {
    if (chunk._value === null) {
      chunk._value = [];
    }

    chunk._value.push(resolve);
  } else {
    resolve();
  }
};

function readChunk(chunk) {
  switch (chunk._status) {
    case INITIALIZED:
      return chunk._value;

    case RESOLVED_MODEL:
      return initializeModelChunk(chunk);

    case RESOLVED_MODULE:
      return initializeModuleChunk(chunk);

    case PENDING:
      // eslint-disable-next-line no-throw-literal
      throw chunk;

    default:
      throw chunk._value;
  }
}

function readRoot() {
  var response = this;
  var chunk = getChunk(response, 0);
  return readChunk(chunk);
}

function createPendingChunk(response) {
  return new Chunk(PENDING, null, response);
}

function createErrorChunk(response, error) {
  return new Chunk(ERRORED, error, response);
}

function createInitializedChunk(response, value) {
  return new Chunk(INITIALIZED, value, response);
}

function wakeChunk(listeners) {
  if (listeners !== null) {
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
  }
}

function triggerErrorOnChunk(chunk, error) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var erroredChunk = chunk;
  erroredChunk._status = ERRORED;
  erroredChunk._value = error;
  wakeChunk(listeners);
}

function createResolvedModelChunk(response, value) {
  return new Chunk(RESOLVED_MODEL, value, response);
}

function createResolvedModuleChunk(response, value) {
  return new Chunk(RESOLVED_MODULE, value, response);
}

function resolveModelChunk(chunk, value) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var resolvedChunk = chunk;
  resolvedChunk._status = RESOLVED_MODEL;
  resolvedChunk._value = value;
  wakeChunk(listeners);
}

function resolveModuleChunk(chunk, value) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var resolvedChunk = chunk;
  resolvedChunk._status = RESOLVED_MODULE;
  resolvedChunk._value = value;
  wakeChunk(listeners);
}

function initializeModelChunk(chunk) {
  var value = parseModel(chunk._response, chunk._value);
  var initializedChunk = chunk;
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}

function initializeModuleChunk(chunk) {
  var value = requireModule(chunk._value);
  var initializedChunk = chunk;
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
} // Report that any missing chunks in the model is now going to throw this
// error upon read. Also notify any pending promises.


function reportGlobalError(response, error) {
  response._chunks.forEach(function (chunk) {
    // If this chunk was already resolved or errored, it won't
    // trigger an error but if it wasn't then we need to
    // because we won't be getting any new data to resolve it.
    triggerErrorOnChunk(chunk, error);
  });
}

function createElement(type, key, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: null,
    props: props,
    // Record the component responsible for creating this element.
    _owner: null
  };

  {
    // We don't really need to add any of these but keeping them for good measure.
    // Unfortunately, _store is enumerable in jest matchers so for equality to
    // work, I need to keep it or make _store non-enumerable in the other file.
    element._store = {};
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: true // This element has already been validated on the server.

    });
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: null
    });
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: null
    });
  }

  return element;
}

function createLazyChunkWrapper(chunk) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: chunk,
    _init: readChunk
  };
  return lazyType;
}

function getChunk(response, id) {
  var chunks = response._chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunk = createPendingChunk(response);
    chunks.set(id, chunk);
  }

  return chunk;
}

function parseModelString(response, parentObject, value) {
  switch (value[0]) {
    case '$':
      {
        if (value === '$') {
          return REACT_ELEMENT_TYPE;
        } else if (value[1] === '$' || value[1] === '@') {
          // This was an escaped string value.
          return value.substring(1);
        } else {
          var id = parseInt(value.substring(1), 16);
          var chunk = getChunk(response, id);
          return readChunk(chunk);
        }
      }

    case '@':
      {
        var _id = parseInt(value.substring(1), 16);

        var _chunk = getChunk(response, _id); // We create a React.lazy wrapper around any lazy values.
        // When passed into React, we'll know how to suspend on this.


        return createLazyChunkWrapper(_chunk);
      }
  }

  return value;
}
function parseModelTuple(response, value) {
  var tuple = value;

  if (tuple[0] === REACT_ELEMENT_TYPE) {
    // TODO: Consider having React just directly accept these arrays as elements.
    // Or even change the ReactElement type to be an array.
    return createElement(tuple[1], tuple[2], tuple[3]);
  }

  return value;
}
function createResponse(bundlerConfig) {
  var chunks = new Map();
  var response = {
    _bundlerConfig: bundlerConfig,
    _chunks: chunks,
    readRoot: readRoot
  };
  return response;
}
function resolveModel(response, id, model) {
  var chunks = response._chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createResolvedModelChunk(response, model));
  } else {
    resolveModelChunk(chunk, model);
  }
}
function resolveProvider(response, id, contextName) {
  var chunks = response._chunks;
  chunks.set(id, createInitializedChunk(response, getOrCreateServerContext(contextName).Provider));
}
function resolveModule(response, id, model) {
  var chunks = response._chunks;
  var chunk = chunks.get(id);
  var moduleMetaData = parseModel(response, model);
  var moduleReference = resolveModuleReference(response._bundlerConfig, moduleMetaData); // TODO: Add an option to encode modules that are lazy loaded.
  // For now we preload all modules as early as possible since it's likely
  // that we'll need them.

  preloadModule(moduleReference);

  if (!chunk) {
    chunks.set(id, createResolvedModuleChunk(response, moduleReference));
  } else {
    resolveModuleChunk(chunk, moduleReference);
  }
}
function resolveSymbol(response, id, name) {
  var chunks = response._chunks; // We assume that we'll always emit the symbol before anything references it
  // to save a few bytes.

  chunks.set(id, createInitializedChunk(response, Symbol.for(name)));
}
function resolveError(response, id, message, stack) {
  // eslint-disable-next-line react-internal/prod-error-codes
  var error = new Error(message);
  error.stack = stack;
  var chunks = response._chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createErrorChunk(response, error));
  } else {
    triggerErrorOnChunk(chunk, error);
  }
}
function close(response) {
  // In case there are any remaining unresolved chunks, they won't
  // be resolved now. So we need to issue an error to those.
  // Ideally we should be able to early bail out if we kept a
  // ref count of pending chunks.
  reportGlobalError(response, new Error('Connection closed.'));
}

function processFullRow(response, row) {
  if (row === '') {
    return;
  }

  var tag = row[0]; // When tags that are not text are added, check them here before
  // parsing the row as text.
  // switch (tag) {
  // }

  var colon = row.indexOf(':', 1);
  var id = parseInt(row.substring(1, colon), 16);
  var text = row.substring(colon + 1);

  switch (tag) {
    case 'J':
      {
        resolveModel(response, id, text);
        return;
      }

    case 'M':
      {
        resolveModule(response, id, text);
        return;
      }

    case 'P':
      {
        resolveProvider(response, id, text);
        return;
      }

    case 'S':
      {
        resolveSymbol(response, id, JSON.parse(text));
        return;
      }

    case 'E':
      {
        var errorInfo = JSON.parse(text);
        resolveError(response, id, errorInfo.message, errorInfo.stack);
        return;
      }

    default:
      {
        throw new Error("Error parsing the data. It's probably an error code or network corruption.");
      }
  }
}

function processStringChunk(response, chunk, offset) {
  var linebreak = chunk.indexOf('\n', offset);

  while (linebreak > -1) {
    var fullrow = response._partialRow + chunk.substring(offset, linebreak);
    processFullRow(response, fullrow);
    response._partialRow = '';
    offset = linebreak + 1;
    linebreak = chunk.indexOf('\n', offset);
  }

  response._partialRow += chunk.substring(offset);
}
function processBinaryChunk(response, chunk) {

  var stringDecoder = response._stringDecoder;
  var linebreak = chunk.indexOf(10); // newline

  while (linebreak > -1) {
    var fullrow = response._partialRow + readFinalStringChunk(stringDecoder, chunk.subarray(0, linebreak));
    processFullRow(response, fullrow);
    response._partialRow = '';
    chunk = chunk.subarray(linebreak + 1);
    linebreak = chunk.indexOf(10); // newline
  }

  response._partialRow += readPartialStringChunk(stringDecoder, chunk);
}

function createFromJSONCallback(response) {
  return function (key, value) {
    if (typeof value === 'string') {
      // We can't use .bind here because we need the "this" value.
      return parseModelString(response, this, value);
    }

    if (typeof value === 'object' && value !== null) {
      return parseModelTuple(response, value);
    }

    return value;
  };
}

function createResponse$1(bundlerConfig) {
  // NOTE: CHECK THE COMPILER OUTPUT EACH TIME YOU CHANGE THIS.
  // It should be inlined to one object literal but minor changes can break it.
  var stringDecoder =  createStringDecoder() ;
  var response = createResponse(bundlerConfig);
  response._partialRow = '';

  {
    response._stringDecoder = stringDecoder;
  } // Don't inline this call because it causes closure to outline the call above.


  response._fromJSON = createFromJSONCallback(response);
  return response;
}

function startReadingFromStream(response, stream) {
  var reader = stream.getReader();

  function progress(_ref) {
    var done = _ref.done,
        value = _ref.value;

    if (done) {
      close(response);
      return;
    }

    var buffer = value;
    processBinaryChunk(response, buffer);
    return reader.read().then(progress, error);
  }

  function error(e) {
    reportGlobalError(response, e);
  }

  reader.read().then(progress, error);
}

function createFromReadableStream(stream, options) {
  var response = createResponse$1(options && options.moduleMap ? options.moduleMap : null);
  startReadingFromStream(response, stream);
  return response;
}

function createFromFetch(promiseForResponse, options) {
  var response = createResponse$1(options && options.moduleMap ? options.moduleMap : null);
  promiseForResponse.then(function (r) {
    startReadingFromStream(response, r.body);
  }, function (e) {
    reportGlobalError(response, e);
  });
  return response;
}

function createFromXHR(request, options) {
  var response = createResponse$1(options && options.moduleMap ? options.moduleMap : null);
  var processedLength = 0;

  function progress(e) {
    var chunk = request.responseText;
    processStringChunk(response, chunk, processedLength);
    processedLength = chunk.length;
  }

  function load(e) {
    progress();
    close(response);
  }

  function error(e) {
    reportGlobalError(response, new TypeError('Network error'));
  }

  request.addEventListener('progress', progress);
  request.addEventListener('load', load);
  request.addEventListener('error', error);
  request.addEventListener('abort', error);
  request.addEventListener('timeout', error);
  return response;
}

exports.createFromFetch = createFromFetch;
exports.createFromReadableStream = createFromReadableStream;
exports.createFromXHR = createFromXHR;
  })();
}


/***/ }),

/***/ "./node_modules/react-server-dom-webpack/index.js":
/*!********************************************************!*\
  !*** ./node_modules/react-server-dom-webpack/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-server-dom-webpack.development.js */ "./node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack.development.js");
}


/***/ }),

/***/ "./node_modules/react-side-effect/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-side-effect/lib/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(/*! react */ "react");
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect =
    /*#__PURE__*/
    function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it
      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.PureComponent);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;


/***/ }),

/***/ "./node_modules/react-waypoint/es/index.js":
/*!*************************************************!*\
  !*** ./node_modules/react-waypoint/es/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Waypoint": () => (/* binding */ Waypoint)
/* harmony export */ });
/* harmony import */ var consolidated_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! consolidated-events */ "./node_modules/consolidated-events/lib/index.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/react-waypoint/node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");





function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

/**
 * Attempts to parse the offset provided as a prop as a percentage. For
 * instance, if the component has been provided with the string "20%" as
 * a value of one of the offset props. If the value matches, then it returns
 * a numeric version of the prop. For instance, "20%" would become `0.2`.
 * If `str` isn't a percentage, then `undefined` will be returned.
 *
 * @param {string} str The value of an offset prop to be converted to a
 *   number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was not a percentage.
 */
function parseOffsetAsPercentage(str) {
  if (str.slice(-1) === '%') {
    return parseFloat(str.slice(0, -1)) / 100;
  }

  return undefined;
}

/**
 * Attempts to parse the offset provided as a prop as a pixel value. If
 * parsing fails, then `undefined` is returned. Three examples of values that
 * will be successfully parsed are:
 * `20`
 * "20px"
 * "20"
 *
 * @param {string|number} str A string of the form "{number}" or "{number}px",
 *   or just a number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was neither a number nor string ending in "px".
 */
function parseOffsetAsPixels(str) {
  if (!isNaN(parseFloat(str)) && isFinite(str)) {
    return parseFloat(str);
  }

  if (str.slice(-2) === 'px') {
    return parseFloat(str.slice(0, -2));
  }

  return undefined;
}

/**
 * @param {string|number} offset
 * @param {number} contextHeight
 * @return {number} A number representing `offset` converted into pixels.
 */

function computeOffsetPixels(offset, contextHeight) {
  var pixelOffset = parseOffsetAsPixels(offset);

  if (typeof pixelOffset === 'number') {
    return pixelOffset;
  }

  var percentOffset = parseOffsetAsPercentage(offset);

  if (typeof percentOffset === 'number') {
    return percentOffset * contextHeight;
  }

  return undefined;
}

var ABOVE = 'above';
var INSIDE = 'inside';
var BELOW = 'below';
var INVISIBLE = 'invisible';

function debugLog() {
  if (true) {
    var _console;

    (_console = console).log.apply(_console, arguments); // eslint-disable-line no-console

  }
}

/**
 * When an element's type is a string, it represents a DOM node with that tag name
 * https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements
 *
 * @param {React.element} Component
 * @return {bool} Whether the component is a DOM Element
 */
function isDOMElement(Component) {
  return typeof Component.type === 'string';
}

var errorMessage = '<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a ' + 'DOM element (e.g. <div>) nor does it use the innerRef prop.\n\n' + 'See https://goo.gl/LrBNgw for more info.';
/**
 * Raise an error if "children" is not a DOM Element and there is no ref provided to Waypoint
 *
 * @param {?React.element} children
 * @param {?HTMLElement} ref
 * @return {undefined}
 */

function ensureRefIsProvidedByChild(children, ref) {
  if (children && !isDOMElement(children) && !ref) {
    throw new Error(errorMessage);
  }
}

/**
 * @param {object} bounds An object with bounds data for the waypoint and
 *   scrollable parent
 * @return {string} The current position of the waypoint in relation to the
 *   visible portion of the scrollable parent. One of the constants `ABOVE`,
 *   `BELOW`, `INSIDE` or `INVISIBLE`.
 */

function getCurrentPosition(bounds) {
  if (bounds.viewportBottom - bounds.viewportTop === 0) {
    return INVISIBLE;
  } // top is within the viewport


  if (bounds.viewportTop <= bounds.waypointTop && bounds.waypointTop <= bounds.viewportBottom) {
    return INSIDE;
  } // bottom is within the viewport


  if (bounds.viewportTop <= bounds.waypointBottom && bounds.waypointBottom <= bounds.viewportBottom) {
    return INSIDE;
  } // top is above the viewport and bottom is below the viewport


  if (bounds.waypointTop <= bounds.viewportTop && bounds.viewportBottom <= bounds.waypointBottom) {
    return INSIDE;
  }

  if (bounds.viewportBottom < bounds.waypointTop) {
    return BELOW;
  }

  if (bounds.waypointTop < bounds.viewportTop) {
    return ABOVE;
  }

  return INVISIBLE;
}

var timeout;
var timeoutQueue = [];
function onNextTick(cb) {
  timeoutQueue.push(cb);

  if (!timeout) {
    timeout = setTimeout(function () {
      timeout = null; // Drain the timeoutQueue

      var item; // eslint-disable-next-line no-cond-assign

      while (item = timeoutQueue.shift()) {
        item();
      }
    }, 0);
  }

  var isSubscribed = true;
  return function unsubscribe() {
    if (!isSubscribed) {
      return;
    }

    isSubscribed = false;
    var index = timeoutQueue.indexOf(cb);

    if (index === -1) {
      return;
    }

    timeoutQueue.splice(index, 1);

    if (!timeoutQueue.length && timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
}

function resolveScrollableAncestorProp(scrollableAncestor) {
  // When Waypoint is rendered on the server, `window` is not available.
  // To make Waypoint easier to work with, we allow this to be specified in
  // string form and safely convert to `window` here.
  if (scrollableAncestor === 'window') {
    return global.window;
  }

  return scrollableAncestor;
}

var defaultProps = {
  debug: false,
  scrollableAncestor: undefined,
  children: undefined,
  topOffset: '0px',
  bottomOffset: '0px',
  horizontal: false,
  onEnter: function onEnter() {},
  onLeave: function onLeave() {},
  onPositionChange: function onPositionChange() {},
  fireOnRapidScroll: true
}; // Calls a function when you scroll to the element.

var Waypoint = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Waypoint, _React$PureComponent);

  var _super = _createSuper(Waypoint);

  function Waypoint(props) {
    var _this;

    _classCallCheck(this, Waypoint);

    _this = _super.call(this, props);

    _this.refElement = function (e) {
      _this._ref = e;
    };

    return _this;
  }

  _createClass(Waypoint, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!Waypoint.getWindow()) {
        return;
      } // this._ref may occasionally not be set at this time. To help ensure that
      // this works smoothly and to avoid layout thrashing, we want to delay the
      // initial execution until the next tick.


      this.cancelOnNextTick = onNextTick(function () {
        _this2.cancelOnNextTick = null;
        var _this2$props = _this2.props,
            children = _this2$props.children,
            debug = _this2$props.debug; // Berofe doing anything, we want to check that this._ref is avaliable in Waypoint

        ensureRefIsProvidedByChild(children, _this2._ref);
        _this2._handleScroll = _this2._handleScroll.bind(_this2);
        _this2.scrollableAncestor = _this2._findScrollableAncestor();

        if ( true && debug) {
          debugLog('scrollableAncestor', _this2.scrollableAncestor);
        }

        _this2.scrollEventListenerUnsubscribe = (0,consolidated_events__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(_this2.scrollableAncestor, 'scroll', _this2._handleScroll, {
          passive: true
        });
        _this2.resizeEventListenerUnsubscribe = (0,consolidated_events__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(window, 'resize', _this2._handleScroll, {
          passive: true
        });

        _this2._handleScroll(null);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      if (!Waypoint.getWindow()) {
        return;
      }

      if (!this.scrollableAncestor) {
        // The Waypoint has not yet initialized.
        return;
      } // The element may have moved, so we need to recompute its position on the
      // page. This happens via handleScroll in a way that forces layout to be
      // computed.
      //
      // We want this to be deferred to avoid forcing layout during render, which
      // causes layout thrashing. And, if we already have this work enqueued, we
      // can just wait for that to happen instead of enqueueing again.


      if (this.cancelOnNextTick) {
        return;
      }

      this.cancelOnNextTick = onNextTick(function () {
        _this3.cancelOnNextTick = null;

        _this3._handleScroll(null);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!Waypoint.getWindow()) {
        return;
      }

      if (this.scrollEventListenerUnsubscribe) {
        this.scrollEventListenerUnsubscribe();
      }

      if (this.resizeEventListenerUnsubscribe) {
        this.resizeEventListenerUnsubscribe();
      }

      if (this.cancelOnNextTick) {
        this.cancelOnNextTick();
      }
    }
    /**
     * Traverses up the DOM to find an ancestor container which has an overflow
     * style that allows for scrolling.
     *
     * @return {Object} the closest ancestor element with an overflow style that
     *   allows for scrolling. If none is found, the `window` object is returned
     *   as a fallback.
     */

  }, {
    key: "_findScrollableAncestor",
    value: function _findScrollableAncestor() {
      var _this$props = this.props,
          horizontal = _this$props.horizontal,
          scrollableAncestor = _this$props.scrollableAncestor;

      if (scrollableAncestor) {
        return resolveScrollableAncestorProp(scrollableAncestor);
      }

      var node = this._ref;

      while (node.parentNode) {
        node = node.parentNode;

        if (node === document.body) {
          // We've reached all the way to the root node.
          return window;
        }

        var style = window.getComputedStyle(node);
        var overflowDirec = horizontal ? style.getPropertyValue('overflow-x') : style.getPropertyValue('overflow-y');
        var overflow = overflowDirec || style.getPropertyValue('overflow');

        if (overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay') {
          return node;
        }
      } // A scrollable ancestor element was not found, which means that we need to
      // do stuff on window.


      return window;
    }
    /**
     * @param {Object} event the native scroll event coming from the scrollable
     *   ancestor, or resize event coming from the window. Will be undefined if
     *   called by a React lifecyle method
     */

  }, {
    key: "_handleScroll",
    value: function _handleScroll(event) {
      if (!this._ref) {
        // There's a chance we end up here after the component has been unmounted.
        return;
      }

      var bounds = this._getBounds();

      var currentPosition = getCurrentPosition(bounds);
      var previousPosition = this._previousPosition;
      var _this$props2 = this.props,
          debug = _this$props2.debug,
          onPositionChange = _this$props2.onPositionChange,
          onEnter = _this$props2.onEnter,
          onLeave = _this$props2.onLeave,
          fireOnRapidScroll = _this$props2.fireOnRapidScroll;

      if ( true && debug) {
        debugLog('currentPosition', currentPosition);
        debugLog('previousPosition', previousPosition);
      } // Save previous position as early as possible to prevent cycles


      this._previousPosition = currentPosition;

      if (previousPosition === currentPosition) {
        // No change since last trigger
        return;
      }

      var callbackArg = {
        currentPosition: currentPosition,
        previousPosition: previousPosition,
        event: event,
        waypointTop: bounds.waypointTop,
        waypointBottom: bounds.waypointBottom,
        viewportTop: bounds.viewportTop,
        viewportBottom: bounds.viewportBottom
      };
      onPositionChange.call(this, callbackArg);

      if (currentPosition === INSIDE) {
        onEnter.call(this, callbackArg);
      } else if (previousPosition === INSIDE) {
        onLeave.call(this, callbackArg);
      }

      var isRapidScrollDown = previousPosition === BELOW && currentPosition === ABOVE;
      var isRapidScrollUp = previousPosition === ABOVE && currentPosition === BELOW;

      if (fireOnRapidScroll && (isRapidScrollDown || isRapidScrollUp)) {
        // If the scroll event isn't fired often enough to occur while the
        // waypoint was visible, we trigger both callbacks anyway.
        onEnter.call(this, {
          currentPosition: INSIDE,
          previousPosition: previousPosition,
          event: event,
          waypointTop: bounds.waypointTop,
          waypointBottom: bounds.waypointBottom,
          viewportTop: bounds.viewportTop,
          viewportBottom: bounds.viewportBottom
        });
        onLeave.call(this, {
          currentPosition: currentPosition,
          previousPosition: INSIDE,
          event: event,
          waypointTop: bounds.waypointTop,
          waypointBottom: bounds.waypointBottom,
          viewportTop: bounds.viewportTop,
          viewportBottom: bounds.viewportBottom
        });
      }
    }
  }, {
    key: "_getBounds",
    value: function _getBounds() {
      var _this$props3 = this.props,
          horizontal = _this$props3.horizontal,
          debug = _this$props3.debug;

      var _this$_ref$getBoundin = this._ref.getBoundingClientRect(),
          left = _this$_ref$getBoundin.left,
          top = _this$_ref$getBoundin.top,
          right = _this$_ref$getBoundin.right,
          bottom = _this$_ref$getBoundin.bottom;

      var waypointTop = horizontal ? left : top;
      var waypointBottom = horizontal ? right : bottom;
      var contextHeight;
      var contextScrollTop;

      if (this.scrollableAncestor === window) {
        contextHeight = horizontal ? window.innerWidth : window.innerHeight;
        contextScrollTop = 0;
      } else {
        contextHeight = horizontal ? this.scrollableAncestor.offsetWidth : this.scrollableAncestor.offsetHeight;
        contextScrollTop = horizontal ? this.scrollableAncestor.getBoundingClientRect().left : this.scrollableAncestor.getBoundingClientRect().top;
      }

      if ( true && debug) {
        debugLog('waypoint top', waypointTop);
        debugLog('waypoint bottom', waypointBottom);
        debugLog('scrollableAncestor height', contextHeight);
        debugLog('scrollableAncestor scrollTop', contextScrollTop);
      }

      var _this$props4 = this.props,
          bottomOffset = _this$props4.bottomOffset,
          topOffset = _this$props4.topOffset;
      var topOffsetPx = computeOffsetPixels(topOffset, contextHeight);
      var bottomOffsetPx = computeOffsetPixels(bottomOffset, contextHeight);
      var contextBottom = contextScrollTop + contextHeight;
      return {
        waypointTop: waypointTop,
        waypointBottom: waypointBottom,
        viewportTop: contextScrollTop + topOffsetPx,
        viewportBottom: contextBottom - bottomOffsetPx
      };
    }
    /**
     * @return {Object}
     */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var children = this.props.children;

      if (!children) {
        // We need an element that we can locate in the DOM to determine where it is
        // rendered relative to the top of its context.
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
          ref: this.refElement,
          style: {
            fontSize: 0
          }
        });
      }

      if (isDOMElement(children) || (0,react_is__WEBPACK_IMPORTED_MODULE_3__.isForwardRef)(children)) {
        var ref = function ref(node) {
          _this4.refElement(node);

          if (children.ref) {
            if (typeof children.ref === 'function') {
              children.ref(node);
            } else {
              children.ref.current = node;
            }
          }
        };

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().cloneElement(children, {
          ref: ref
        });
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().cloneElement(children, {
        innerRef: this.refElement
      });
    }
  }]);

  return Waypoint;
}((react__WEBPACK_IMPORTED_MODULE_2___default().PureComponent));

if (true) {
  Waypoint.propTypes = {
    children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().element),
    debug: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
    onEnter: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
    onLeave: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
    onPositionChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
    fireOnRapidScroll: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
    // eslint-disable-next-line react/forbid-prop-types
    scrollableAncestor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().any),
    horizontal: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
    // `topOffset` can either be a number, in which case its a distance from the
    // top of the container in pixels, or a string value. Valid string values are
    // of the form "20px", which is parsed as pixels, or "20%", which is parsed
    // as a percentage of the height of the containing element.
    // For instance, if you pass "-20%", and the containing element is 100px tall,
    // then the waypoint will be triggered when it has been scrolled 20px beyond
    // the top of the containing element.
    topOffset: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)]),
    // `bottomOffset` is like `topOffset`, but for the bottom of the container.
    bottomOffset: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)])
  };
}

Waypoint.above = ABOVE;
Waypoint.below = BELOW;
Waypoint.inside = INSIDE;
Waypoint.invisible = INVISIBLE;

Waypoint.getWindow = function () {
  if (typeof window !== 'undefined') {
    return window;
  }

  return undefined;
};

Waypoint.defaultProps = defaultProps;
Waypoint.displayName = 'Waypoint';




/***/ }),

/***/ "./node_modules/react-waypoint/node_modules/prop-types/checkPropTypes.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-waypoint/node_modules/prop-types/checkPropTypes.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/react-waypoint/node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/react-waypoint/node_modules/prop-types/factoryWithTypeCheckers.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/react-waypoint/node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/react-waypoint/node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/react-waypoint/node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/react-waypoint/node_modules/prop-types/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-waypoint/node_modules/prop-types/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/react-waypoint/node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/react-waypoint/node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/react-waypoint/node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/simple-react-lightbox/dist/index.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/simple-react-lightbox/dist/index.es.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SRLWrapper": () => (/* binding */ In),
/* harmony export */   "default": () => (/* binding */ sd),
/* harmony export */   "useLightbox": () => (/* binding */ Ol)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! process */ "process");
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* provided dependency */ var fetch = __webpack_require__(/*! ./node_modules/node-fetch/lib/index.js */ "./node_modules/node-fetch/lib/index.js");
var x="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},S={exports:{}},_={exports:{}},E={},T="function"==typeof Symbol&&Symbol.for,P=T?Symbol.for("react.element"):60103,C=T?Symbol.for("react.portal"):60106,A=T?Symbol.for("react.fragment"):60107,L=T?Symbol.for("react.strict_mode"):60108,O=T?Symbol.for("react.profiler"):60114,k=T?Symbol.for("react.provider"):60109,R=T?Symbol.for("react.context"):60110,N=T?Symbol.for("react.async_mode"):60111,z=T?Symbol.for("react.concurrent_mode"):60111,I=T?Symbol.for("react.forward_ref"):60112,D=T?Symbol.for("react.suspense"):60113,j=T?Symbol.for("react.suspense_list"):60120,M=T?Symbol.for("react.memo"):60115,B=T?Symbol.for("react.lazy"):60116,V=T?Symbol.for("react.block"):60121,F=T?Symbol.for("react.fundamental"):60117,W=T?Symbol.for("react.responder"):60118,Y=T?Symbol.for("react.scope"):60119;function H(n){if("object"==typeof n&&null!==n){var t=n.$$typeof;switch(t){case P:switch(n=n.type){case N:case z:case A:case O:case L:case D:return n;default:switch(n=n&&n.$$typeof){case R:case I:case B:case M:case k:return n;default:return t}}case C:return t}}}function U(n){return H(n)===z}E.AsyncMode=N,E.ConcurrentMode=z,E.ContextConsumer=R,E.ContextProvider=k,E.Element=P,E.ForwardRef=I,E.Fragment=A,E.Lazy=B,E.Memo=M,E.Portal=C,E.Profiler=O,E.StrictMode=L,E.Suspense=D,E.isAsyncMode=function(n){return U(n)||H(n)===N},E.isConcurrentMode=U,E.isContextConsumer=function(n){return H(n)===R},E.isContextProvider=function(n){return H(n)===k},E.isElement=function(n){return"object"==typeof n&&null!==n&&n.$$typeof===P},E.isForwardRef=function(n){return H(n)===I},E.isFragment=function(n){return H(n)===A},E.isLazy=function(n){return H(n)===B},E.isMemo=function(n){return H(n)===M},E.isPortal=function(n){return H(n)===C},E.isProfiler=function(n){return H(n)===O},E.isStrictMode=function(n){return H(n)===L},E.isSuspense=function(n){return H(n)===D},E.isValidElementType=function(n){return"string"==typeof n||"function"==typeof n||n===A||n===z||n===O||n===L||n===D||n===j||"object"==typeof n&&null!==n&&(n.$$typeof===B||n.$$typeof===M||n.$$typeof===k||n.$$typeof===R||n.$$typeof===I||n.$$typeof===F||n.$$typeof===W||n.$$typeof===Y||n.$$typeof===V)},E.typeOf=H;var $={};"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&function(){var n="function"==typeof Symbol&&Symbol.for,t=n?Symbol.for("react.element"):60103,e=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,o=n?Symbol.for("react.strict_mode"):60108,i=n?Symbol.for("react.profiler"):60114,a=n?Symbol.for("react.provider"):60109,u=n?Symbol.for("react.context"):60110,s=n?Symbol.for("react.async_mode"):60111,c=n?Symbol.for("react.concurrent_mode"):60111,l=n?Symbol.for("react.forward_ref"):60112,f=n?Symbol.for("react.suspense"):60113,p=n?Symbol.for("react.suspense_list"):60120,d=n?Symbol.for("react.memo"):60115,h=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,m=n?Symbol.for("react.fundamental"):60117,g=n?Symbol.for("react.responder"):60118,y=n?Symbol.for("react.scope"):60119;function b(n){if("object"==typeof n&&null!==n){var p=n.$$typeof;switch(p){case t:var v=n.type;switch(v){case s:case c:case r:case i:case o:case f:return v;default:var m=v&&v.$$typeof;switch(m){case u:case l:case h:case d:case a:return m;default:return p}}case e:return p}}}var w=s,x=c,S=u,_=a,E=t,T=l,P=r,C=h,A=d,L=e,O=i,k=o,R=f,N=!1;function z(n){return b(n)===c}$.AsyncMode=w,$.ConcurrentMode=x,$.ContextConsumer=S,$.ContextProvider=_,$.Element=E,$.ForwardRef=T,$.Fragment=P,$.Lazy=C,$.Memo=A,$.Portal=L,$.Profiler=O,$.StrictMode=k,$.Suspense=R,$.isAsyncMode=function(n){return N||(N=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),z(n)||b(n)===s},$.isConcurrentMode=z,$.isContextConsumer=function(n){return b(n)===u},$.isContextProvider=function(n){return b(n)===a},$.isElement=function(n){return"object"==typeof n&&null!==n&&n.$$typeof===t},$.isForwardRef=function(n){return b(n)===l},$.isFragment=function(n){return b(n)===r},$.isLazy=function(n){return b(n)===h},$.isMemo=function(n){return b(n)===d},$.isPortal=function(n){return b(n)===e},$.isProfiler=function(n){return b(n)===i},$.isStrictMode=function(n){return b(n)===o},$.isSuspense=function(n){return b(n)===f},$.isValidElementType=function(n){return"string"==typeof n||"function"==typeof n||n===r||n===c||n===i||n===o||n===f||n===p||"object"==typeof n&&null!==n&&(n.$$typeof===h||n.$$typeof===d||n.$$typeof===a||n.$$typeof===u||n.$$typeof===l||n.$$typeof===m||n.$$typeof===g||n.$$typeof===y||n.$$typeof===v)},$.typeOf=b}(),"production"===(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)?_.exports=E:_.exports=$
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/;var X=Object.getOwnPropertySymbols,q=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;function K(n){if(null==n)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(n)}var Z=function(){try{if(!Object.assign)return!1;var n=new String("abc");if(n[5]="de","5"===Object.getOwnPropertyNames(n)[0])return!1;for(var t={},e=0;e<10;e++)t["_"+String.fromCharCode(e)]=e;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(n){return t[n]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(n){r[n]=n})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(n){return!1}}()?Object.assign:function(n,t){for(var e,r,o=K(n),i=1;i<arguments.length;i++){for(var a in e=Object(arguments[i]))q.call(e,a)&&(o[a]=e[a]);if(X){r=X(e);for(var u=0;u<r.length;u++)G.call(e,r[u])&&(o[r[u]]=e[r[u]])}}return o},J="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Q=function(){};if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)){var nn=J,tn={},en=Function.call.bind(Object.prototype.hasOwnProperty);Q=function(n){var t="Warning: "+n;"undefined"!=typeof console&&console.error(t);try{throw new Error(t)}catch(n){}}}function rn(n,t,e,r,o){if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV))for(var i in n)if(en(n,i)){var a;try{if("function"!=typeof n[i]){var u=Error((r||"React class")+": "+e+" type `"+i+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof n[i]+"`.");throw u.name="Invariant Violation",u}a=n[i](t,i,r,e,null,nn)}catch(n){a=n}if(!a||a instanceof Error||Q((r||"React class")+": type specification of "+e+" `"+i+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof a+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),a instanceof Error&&!(a.message in tn)){tn[a.message]=!0;var s=o?o():"";Q("Failed "+e+" type: "+a.message+(null!=s?s:""))}}}rn.resetWarningCache=function(){"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(tn={})};var on=rn,an=_.exports,un=Z,sn=J,cn=on,ln=Function.call.bind(Object.prototype.hasOwnProperty),fn=function(){};function pn(){return null}"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(fn=function(n){var t="Warning: "+n;"undefined"!=typeof console&&console.error(t);try{throw new Error(t)}catch(n){}});function dn(){}function hn(){}hn.resetWarningCache=dn;if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)){var vn=_.exports;S.exports=function(n,t){var e="function"==typeof Symbol&&Symbol.iterator,r="<<anonymous>>",o={array:s("array"),bool:s("boolean"),func:s("function"),number:s("number"),object:s("object"),string:s("string"),symbol:s("symbol"),any:u(pn),arrayOf:function(n){return u((function(t,e,r,o,i){if("function"!=typeof n)return new a("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=t[e];if(!Array.isArray(u))return new a("Invalid "+o+" `"+i+"` of type `"+l(u)+"` supplied to `"+r+"`, expected an array.");for(var s=0;s<u.length;s++){var c=n(u,s,r,o,i+"["+s+"]",sn);if(c instanceof Error)return c}return null}))},element:u((function(t,e,r,o,i){var u=t[e];return n(u)?null:new a("Invalid "+o+" `"+i+"` of type `"+l(u)+"` supplied to `"+r+"`, expected a single ReactElement.")})),elementType:u((function(n,t,e,r,o){var i=n[t];return an.isValidElementType(i)?null:new a("Invalid "+r+" `"+o+"` of type `"+l(i)+"` supplied to `"+e+"`, expected a single ReactElement type.")})),instanceOf:function(n){return u((function(t,e,o,i,u){if(!(t[e]instanceof n)){var s=n.name||r;return new a("Invalid "+i+" `"+u+"` of type `"+((c=t[e]).constructor&&c.constructor.name?c.constructor.name:r)+"` supplied to `"+o+"`, expected instance of `"+s+"`.")}var c;return null}))},node:u((function(n,t,e,r,o){return c(n[t])?null:new a("Invalid "+r+" `"+o+"` supplied to `"+e+"`, expected a ReactNode.")})),objectOf:function(n){return u((function(t,e,r,o,i){if("function"!=typeof n)return new a("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var u=t[e],s=l(u);if("object"!==s)return new a("Invalid "+o+" `"+i+"` of type `"+s+"` supplied to `"+r+"`, expected an object.");for(var c in u)if(ln(u,c)){var f=n(u,c,r,o,i+"."+c,sn);if(f instanceof Error)return f}return null}))},oneOf:function(n){if(!Array.isArray(n))return"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&fn(arguments.length>1?"Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).":"Invalid argument supplied to oneOf, expected an array."),pn;function t(t,e,r,o,u){for(var s=t[e],c=0;c<n.length;c++)if(i(s,n[c]))return null;var l=JSON.stringify(n,(function(n,t){return"symbol"===f(t)?String(t):t}));return new a("Invalid "+o+" `"+u+"` of value `"+String(s)+"` supplied to `"+r+"`, expected one of "+l+".")}return u(t)},oneOfType:function(n){if(!Array.isArray(n))return"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&fn("Invalid argument supplied to oneOfType, expected an instance of array."),pn;for(var t=0;t<n.length;t++){var e=n[t];if("function"!=typeof e)return fn("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+p(e)+" at index "+t+"."),pn}return u((function(t,e,r,o,i){for(var u=0;u<n.length;u++)if(null==(0,n[u])(t,e,r,o,i,sn))return null;return new a("Invalid "+o+" `"+i+"` supplied to `"+r+"`.")}))},shape:function(n){return u((function(t,e,r,o,i){var u=t[e],s=l(u);if("object"!==s)return new a("Invalid "+o+" `"+i+"` of type `"+s+"` supplied to `"+r+"`, expected `object`.");for(var c in n){var f=n[c];if(f){var p=f(u,c,r,o,i+"."+c,sn);if(p)return p}}return null}))},exact:function(n){return u((function(t,e,r,o,i){var u=t[e],s=l(u);if("object"!==s)return new a("Invalid "+o+" `"+i+"` of type `"+s+"` supplied to `"+r+"`, expected `object`.");var c=un({},t[e],n);for(var f in c){var p=n[f];if(!p)return new a("Invalid "+o+" `"+i+"` key `"+f+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(t[e],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(n),null,"  "));var d=p(u,f,r,o,i+"."+f,sn);if(d)return d}return null}))}};function i(n,t){return n===t?0!==n||1/n==1/t:n!=n&&t!=t}function a(n){this.message=n,this.stack=""}function u(n){if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV))var e={},o=0;function i(i,u,s,c,l,f,p){if(c=c||r,f=f||s,p!==sn){if(t){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&"undefined"!=typeof console){var h=c+":"+s;!e[h]&&o<3&&(fn("You are manually calling a React.PropTypes validation function for the `"+f+"` prop on `"+c+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),e[h]=!0,o++)}}return null==u[s]?i?null===u[s]?new a("The "+l+" `"+f+"` is marked as required in `"+c+"`, but its value is `null`."):new a("The "+l+" `"+f+"` is marked as required in `"+c+"`, but its value is `undefined`."):null:n(u,s,c,l,f)}var u=i.bind(null,!1);return u.isRequired=i.bind(null,!0),u}function s(n){return u((function(t,e,r,o,i,u){var s=t[e];return l(s)!==n?new a("Invalid "+o+" `"+i+"` of type `"+f(s)+"` supplied to `"+r+"`, expected `"+n+"`."):null}))}function c(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(c);if(null===t||n(t))return!0;var r=function(n){var t=n&&(e&&n[e]||n["@@iterator"]);if("function"==typeof t)return t}(t);if(!r)return!1;var o,i=r.call(t);if(r!==t.entries){for(;!(o=i.next()).done;)if(!c(o.value))return!1}else for(;!(o=i.next()).done;){var a=o.value;if(a&&!c(a[1]))return!1}return!0;default:return!1}}function l(n){var t=typeof n;return Array.isArray(n)?"array":n instanceof RegExp?"object":function(n,t){return"symbol"===n||!!t&&("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}(t,n)?"symbol":t}function f(n){if(null==n)return""+n;var t=l(n);if("object"===t){if(n instanceof Date)return"date";if(n instanceof RegExp)return"regexp"}return t}function p(n){var t=f(n);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}return a.prototype=Error.prototype,o.checkPropTypes=cn,o.resetWarningCache=cn.resetWarningCache,o.PropTypes=o,o}(vn.isElement,!0)}else S.exports=function(){function n(n,t,e,r,o,i){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==i){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return n}n.isRequired=n;var e={array:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:t,element:n,elementType:n,instanceOf:t,node:n,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:hn,resetWarningCache:dn};return e.PropTypes=e,e}();var mn=S.exports;function gn(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function yn(n,t){if(n){if("string"==typeof n)return gn(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?gn(n,t):void 0}}function bn(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,i=[],a=!0,u=!1;try{for(e=e.call(n);!(a=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(n){u=!0,o=n}finally{try{a||null==e.return||e.return()}finally{if(u)throw o}}return i}}(n,t)||yn(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function wn(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function xn(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function Sn(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?xn(Object(e),!0).forEach((function(t){wn(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):xn(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}var _n={elements:[],isOpened:!1,isLoaded:!1,options:{buttons:{backgroundColor:"rgba(30,30,36,0.8)",iconColor:"rgba(255, 255, 255, 0.8)",iconPadding:"10px",showAutoplayButton:!0,showCloseButton:!0,showDownloadButton:!0,showFullscreenButton:!0,showNextButton:!0,showPrevButton:!0,size:"40px"},settings:{autoplaySpeed:3e3,boxShadow:"none",disableKeyboardControls:!1,disablePanzoom:!1,disableWheelControls:!1,downloadedFileName:"SRL-image",hideControlsAfter:!1,lightboxTransitionSpeed:.3,lightboxTransitionTimingFunction:"linear",overlayColor:"rgba(30, 30, 30, 0.9)",slideAnimationType:"fade",slideSpringValues:[300,50],slideTransitionSpeed:.6,slideTransitionTimingFunction:"linear",usingPreact:!1},caption:{captionAlignment:"start",captionColor:"#FFFFFF",captionFontFamily:"inherit",captionFontSize:"inherit",captionFontStyle:"inherit",captionFontWeight:"inherit",captionContainerPadding:"20px 0 30px 0",captionTextTransform:"inherit",showCaption:!0},thumbnails:{showThumbnails:!0,thumbnailsAlignment:"center",thumbnailsContainerPadding:"0",thumbnailsContainerBackgroundColor:"transparent",thumbnailsGap:"0 1px",thumbnailsIconColor:"#ffffff",thumbnailsPosition:"bottom",thumbnailsOpacity:.4,thumbnailsSize:["100px","80px"]},progressBar:{backgroundColor:"#f2f2f2",fillColor:"#000000",height:"3px",showProgressBar:!0}},selectedElement:{caption:"",height:0,id:0,source:"",thumbnail:"",width:0},callbacks:{onCountSlides:function(){},onSlideChange:function(){},onLightboxClosed:function(){},onLightboxOpened:function(){}}},En=react__WEBPACK_IMPORTED_MODULE_0___default().createContext(_n),Tn=function(n){var r=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)((function(n,t){switch(t.type){case"READY_LIGHTBOX":return Sn(Sn(Sn({},n),t.mergedSettings),{},{elements:t.elements,isLoaded:!0});case"RESET_LIGHTBOX":return Sn({},_n);case"HANDLE_ELEMENT":return Sn(Sn({},n),{},{isOpened:!0,selectedElement:Sn({},t.element)});case"OPEN_AT_INDEX":return Sn(Sn({},n),{},{isOpened:!0,selectedElement:Sn({},n.elements[t.index])});case"CLOSE_LIGHTBOX":return Sn(Sn({},n),{},{isOpened:!1});default:return n}}),_n),2),o=r[0],i=r[1];return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(En.Provider,{value:Sn(Sn({},o),{},{dispatch:i})},n.children)};function Pn(n){return function(n){if(Array.isArray(n))return gn(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||yn(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Cn(n,t,e){n.addEventListener("click",(function(){if(e)return e(t)}))}function An(n){var t=[].map.call(n,(function(n){return(t=n,e=new Promise((function(n,e){function r(){"lazy"===t.loading||0!==t.naturalWidth?n(t):e(void 0),t.removeEventListener("load",r),t.removeEventListener("error",r)}"lazy"===t.loading||0!==t.naturalWidth?n(t):t.complete?e(void 0):(t.addEventListener("load",r),t.addEventListener("error",r))})),Object.assign(e,{image:t})).catch((function(n){return n}));var t,e}));return Promise.all(t).then((function(n){return Promise.resolve(n.filter((function(n){return n})))}))}Tn.propTypes={children:mn.oneOfType([mn.arrayOf(mn.node),mn.node]).isRequired};function Ln(n){console.error(n),console.warn("An error as occurred with Simple React Lightbox. Make sure you wrapped your App with the <SimpleReactLightbox> component and then use the <SRLWrapper> component.")}var On,kn,Rn={exports:{}};
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */function Nn(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function zn(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Nn(Object(e),!0).forEach((function(t){wn(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):Nn(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}On=Rn,kn=Rn.exports,function(){var n,t="Expected a function",e="__lodash_hash_undefined__",r="__lodash_placeholder__",o=16,i=32,a=64,u=128,s=256,c=1/0,l=9007199254740991,f=NaN,p=4294967295,d=[["ary",u],["bind",1],["bindKey",2],["curry",8],["curryRight",o],["flip",512],["partial",i],["partialRight",a],["rearg",s]],h="[object Arguments]",v="[object Array]",m="[object Boolean]",g="[object Date]",y="[object Error]",b="[object Function]",w="[object GeneratorFunction]",S="[object Map]",_="[object Number]",E="[object Object]",T="[object Promise]",P="[object RegExp]",C="[object Set]",A="[object String]",L="[object Symbol]",O="[object WeakMap]",k="[object ArrayBuffer]",R="[object DataView]",N="[object Float32Array]",z="[object Float64Array]",I="[object Int8Array]",D="[object Int16Array]",j="[object Int32Array]",M="[object Uint8Array]",B="[object Uint8ClampedArray]",V="[object Uint16Array]",F="[object Uint32Array]",W=/\b__p \+= '';/g,Y=/\b(__p \+=) '' \+/g,H=/(__e\(.*?\)|\b__t\)) \+\n'';/g,U=/&(?:amp|lt|gt|quot|#39);/g,$=/[&<>"']/g,X=RegExp(U.source),q=RegExp($.source),G=/<%-([\s\S]+?)%>/g,K=/<%([\s\S]+?)%>/g,Z=/<%=([\s\S]+?)%>/g,J=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Q=/^\w*$/,nn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,tn=/[\\^$.*+?()[\]{}|]/g,en=RegExp(tn.source),rn=/^\s+/,on=/\s/,an=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,un=/\{\n\/\* \[wrapped with (.+)\] \*/,sn=/,? & /,cn=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,ln=/[()=,{}\[\]\/\s]/,fn=/\\(\\)?/g,pn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,dn=/\w*$/,hn=/^[-+]0x[0-9a-f]+$/i,vn=/^0b[01]+$/i,mn=/^\[object .+?Constructor\]$/,gn=/^0o[0-7]+$/i,yn=/^(?:0|[1-9]\d*)$/,bn=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,wn=/($^)/,xn=/['\n\r\u2028\u2029\\]/g,Sn="\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",_n="\\u2700-\\u27bf",En="a-z\\xdf-\\xf6\\xf8-\\xff",Tn="A-Z\\xc0-\\xd6\\xd8-\\xde",Pn="\\ufe0e\\ufe0f",Cn="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",An="['’]",Ln="[\\ud800-\\udfff]",Rn="["+Cn+"]",Nn="["+Sn+"]",zn="\\d+",In="[\\u2700-\\u27bf]",Dn="["+En+"]",jn="[^\\ud800-\\udfff"+Cn+zn+_n+En+Tn+"]",Mn="\\ud83c[\\udffb-\\udfff]",Bn="[^\\ud800-\\udfff]",Vn="(?:\\ud83c[\\udde6-\\uddff]){2}",Fn="[\\ud800-\\udbff][\\udc00-\\udfff]",Wn="["+Tn+"]",Yn="(?:"+Dn+"|"+jn+")",Hn="(?:"+Wn+"|"+jn+")",Un="(?:['’](?:d|ll|m|re|s|t|ve))?",$n="(?:['’](?:D|LL|M|RE|S|T|VE))?",Xn="(?:"+Nn+"|"+Mn+")?",qn="[\\ufe0e\\ufe0f]?",Gn=qn+Xn+"(?:\\u200d(?:"+[Bn,Vn,Fn].join("|")+")"+qn+Xn+")*",Kn="(?:"+[In,Vn,Fn].join("|")+")"+Gn,Zn="(?:"+[Bn+Nn+"?",Nn,Vn,Fn,Ln].join("|")+")",Jn=RegExp(An,"g"),Qn=RegExp(Nn,"g"),nt=RegExp(Mn+"(?="+Mn+")|"+Zn+Gn,"g"),tt=RegExp([Wn+"?"+Dn+"+"+Un+"(?="+[Rn,Wn,"$"].join("|")+")",Hn+"+"+$n+"(?="+[Rn,Wn+Yn,"$"].join("|")+")",Wn+"?"+Yn+"+"+Un,Wn+"+"+$n,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",zn,Kn].join("|"),"g"),et=RegExp("[\\u200d\\ud800-\\udfff"+Sn+Pn+"]"),rt=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,ot=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],it=-1,at={};at[N]=at[z]=at[I]=at[D]=at[j]=at[M]=at[B]=at[V]=at[F]=!0,at[h]=at[v]=at[k]=at[m]=at[R]=at[g]=at[y]=at[b]=at[S]=at[_]=at[E]=at[P]=at[C]=at[A]=at[O]=!1;var ut={};ut[h]=ut[v]=ut[k]=ut[R]=ut[m]=ut[g]=ut[N]=ut[z]=ut[I]=ut[D]=ut[j]=ut[S]=ut[_]=ut[E]=ut[P]=ut[C]=ut[A]=ut[L]=ut[M]=ut[B]=ut[V]=ut[F]=!0,ut[y]=ut[b]=ut[O]=!1;var st={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},ct=parseFloat,lt=parseInt,ft="object"==typeof x&&x&&x.Object===Object&&x,pt="object"==typeof self&&self&&self.Object===Object&&self,dt=ft||pt||Function("return this")(),ht=kn&&!kn.nodeType&&kn,vt=ht&&On&&!On.nodeType&&On,mt=vt&&vt.exports===ht,gt=mt&&ft.process,yt=function(){try{var n=vt&&vt.require&&vt.require("util").types;return n||gt&&gt.binding&&gt.binding("util")}catch(n){}}(),bt=yt&&yt.isArrayBuffer,wt=yt&&yt.isDate,xt=yt&&yt.isMap,St=yt&&yt.isRegExp,_t=yt&&yt.isSet,Et=yt&&yt.isTypedArray;function Tt(n,t,e){switch(e.length){case 0:return n.call(t);case 1:return n.call(t,e[0]);case 2:return n.call(t,e[0],e[1]);case 3:return n.call(t,e[0],e[1],e[2])}return n.apply(t,e)}function Pt(n,t,e,r){for(var o=-1,i=null==n?0:n.length;++o<i;){var a=n[o];t(r,a,e(a),n)}return r}function Ct(n,t){for(var e=-1,r=null==n?0:n.length;++e<r&&!1!==t(n[e],e,n););return n}function At(n,t){for(var e=null==n?0:n.length;e--&&!1!==t(n[e],e,n););return n}function Lt(n,t){for(var e=-1,r=null==n?0:n.length;++e<r;)if(!t(n[e],e,n))return!1;return!0}function Ot(n,t){for(var e=-1,r=null==n?0:n.length,o=0,i=[];++e<r;){var a=n[e];t(a,e,n)&&(i[o++]=a)}return i}function kt(n,t){return!(null==n||!n.length)&&Ft(n,t,0)>-1}function Rt(n,t,e){for(var r=-1,o=null==n?0:n.length;++r<o;)if(e(t,n[r]))return!0;return!1}function Nt(n,t){for(var e=-1,r=null==n?0:n.length,o=Array(r);++e<r;)o[e]=t(n[e],e,n);return o}function zt(n,t){for(var e=-1,r=t.length,o=n.length;++e<r;)n[o+e]=t[e];return n}function It(n,t,e,r){var o=-1,i=null==n?0:n.length;for(r&&i&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);return e}function Dt(n,t,e,r){var o=null==n?0:n.length;for(r&&o&&(e=n[--o]);o--;)e=t(e,n[o],o,n);return e}function jt(n,t){for(var e=-1,r=null==n?0:n.length;++e<r;)if(t(n[e],e,n))return!0;return!1}var Mt=Ut("length");function Bt(n,t,e){var r;return e(n,(function(n,e,o){if(t(n,e,o))return r=e,!1})),r}function Vt(n,t,e,r){for(var o=n.length,i=e+(r?1:-1);r?i--:++i<o;)if(t(n[i],i,n))return i;return-1}function Ft(n,t,e){return t==t?function(n,t,e){for(var r=e-1,o=n.length;++r<o;)if(n[r]===t)return r;return-1}(n,t,e):Vt(n,Yt,e)}function Wt(n,t,e,r){for(var o=e-1,i=n.length;++o<i;)if(r(n[o],t))return o;return-1}function Yt(n){return n!=n}function Ht(n,t){var e=null==n?0:n.length;return e?qt(n,t)/e:f}function Ut(t){return function(e){return null==e?n:e[t]}}function $t(t){return function(e){return null==t?n:t[e]}}function Xt(n,t,e,r,o){return o(n,(function(n,o,i){e=r?(r=!1,n):t(e,n,o,i)})),e}function qt(t,e){for(var r,o=-1,i=t.length;++o<i;){var a=e(t[o]);a!==n&&(r=r===n?a:r+a)}return r}function Gt(n,t){for(var e=-1,r=Array(n);++e<n;)r[e]=t(e);return r}function Kt(n){return n?n.slice(0,he(n)+1).replace(rn,""):n}function Zt(n){return function(t){return n(t)}}function Jt(n,t){return Nt(t,(function(t){return n[t]}))}function Qt(n,t){return n.has(t)}function ne(n,t){for(var e=-1,r=n.length;++e<r&&Ft(t,n[e],0)>-1;);return e}function te(n,t){for(var e=n.length;e--&&Ft(t,n[e],0)>-1;);return e}function ee(n,t){for(var e=n.length,r=0;e--;)n[e]===t&&++r;return r}var re=$t({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"}),oe=$t({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});function ie(n){return"\\"+st[n]}function ae(n){return et.test(n)}function ue(n){var t=-1,e=Array(n.size);return n.forEach((function(n,r){e[++t]=[r,n]})),e}function se(n,t){return function(e){return n(t(e))}}function ce(n,t){for(var e=-1,o=n.length,i=0,a=[];++e<o;){var u=n[e];u!==t&&u!==r||(n[e]=r,a[i++]=e)}return a}function le(n){var t=-1,e=Array(n.size);return n.forEach((function(n){e[++t]=n})),e}function fe(n){var t=-1,e=Array(n.size);return n.forEach((function(n){e[++t]=[n,n]})),e}function pe(n){return ae(n)?function(n){for(var t=nt.lastIndex=0;nt.test(n);)++t;return t}(n):Mt(n)}function de(n){return ae(n)?function(n){return n.match(nt)||[]}(n):function(n){return n.split("")}(n)}function he(n){for(var t=n.length;t--&&on.test(n.charAt(t)););return t}var ve=$t({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),me=function x(on){var Sn,_n=(on=null==on?dt:me.defaults(dt.Object(),on,me.pick(dt,ot))).Array,En=on.Date,Tn=on.Error,Pn=on.Function,Cn=on.Math,An=on.Object,Ln=on.RegExp,On=on.String,kn=on.TypeError,Rn=_n.prototype,Nn=Pn.prototype,zn=An.prototype,In=on["__core-js_shared__"],Dn=Nn.toString,jn=zn.hasOwnProperty,Mn=0,Bn=(Sn=/[^.]+$/.exec(In&&In.keys&&In.keys.IE_PROTO||""))?"Symbol(src)_1."+Sn:"",Vn=zn.toString,Fn=Dn.call(An),Wn=dt._,Yn=Ln("^"+Dn.call(jn).replace(tn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Hn=mt?on.Buffer:n,Un=on.Symbol,$n=on.Uint8Array,Xn=Hn?Hn.allocUnsafe:n,qn=se(An.getPrototypeOf,An),Gn=An.create,Kn=zn.propertyIsEnumerable,Zn=Rn.splice,nt=Un?Un.isConcatSpreadable:n,et=Un?Un.iterator:n,st=Un?Un.toStringTag:n,ft=function(){try{var n=hi(An,"defineProperty");return n({},"",{}),n}catch(n){}}(),pt=on.clearTimeout!==dt.clearTimeout&&on.clearTimeout,ht=En&&En.now!==dt.Date.now&&En.now,vt=on.setTimeout!==dt.setTimeout&&on.setTimeout,gt=Cn.ceil,yt=Cn.floor,Mt=An.getOwnPropertySymbols,$t=Hn?Hn.isBuffer:n,ge=on.isFinite,ye=Rn.join,be=se(An.keys,An),we=Cn.max,xe=Cn.min,Se=En.now,_e=on.parseInt,Ee=Cn.random,Te=Rn.reverse,Pe=hi(on,"DataView"),Ce=hi(on,"Map"),Ae=hi(on,"Promise"),Le=hi(on,"Set"),Oe=hi(on,"WeakMap"),ke=hi(An,"create"),Re=Oe&&new Oe,Ne={},ze=Fi(Pe),Ie=Fi(Ce),De=Fi(Ae),je=Fi(Le),Me=Fi(Oe),Be=Un?Un.prototype:n,Ve=Be?Be.valueOf:n,Fe=Be?Be.toString:n;function We(n){if(ou(n)&&!Xa(n)&&!(n instanceof $e)){if(n instanceof Ue)return n;if(jn.call(n,"__wrapped__"))return Wi(n)}return new Ue(n)}var Ye=function(){function t(){}return function(e){if(!ru(e))return{};if(Gn)return Gn(e);t.prototype=e;var r=new t;return t.prototype=n,r}}();function He(){}function Ue(t,e){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!e,this.__index__=0,this.__values__=n}function $e(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=p,this.__views__=[]}function Xe(n){var t=-1,e=null==n?0:n.length;for(this.clear();++t<e;){var r=n[t];this.set(r[0],r[1])}}function qe(n){var t=-1,e=null==n?0:n.length;for(this.clear();++t<e;){var r=n[t];this.set(r[0],r[1])}}function Ge(n){var t=-1,e=null==n?0:n.length;for(this.clear();++t<e;){var r=n[t];this.set(r[0],r[1])}}function Ke(n){var t=-1,e=null==n?0:n.length;for(this.__data__=new Ge;++t<e;)this.add(n[t])}function Ze(n){var t=this.__data__=new qe(n);this.size=t.size}function Je(n,t){var e=Xa(n),r=!e&&$a(n),o=!e&&!r&&Za(n),i=!e&&!r&&!o&&pu(n),a=e||r||o||i,u=a?Gt(n.length,On):[],s=u.length;for(var c in n)!t&&!jn.call(n,c)||a&&("length"==c||o&&("offset"==c||"parent"==c)||i&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||xi(c,s))||u.push(c);return u}function Qe(t){var e=t.length;return e?t[Kr(0,e-1)]:n}function nr(n,t){return Mi(Ro(n),cr(t,0,n.length))}function tr(n){return Mi(Ro(n))}function er(t,e,r){(r!==n&&!Ya(t[e],r)||r===n&&!(e in t))&&ur(t,e,r)}function rr(t,e,r){var o=t[e];jn.call(t,e)&&Ya(o,r)&&(r!==n||e in t)||ur(t,e,r)}function or(n,t){for(var e=n.length;e--;)if(Ya(n[e][0],t))return e;return-1}function ir(n,t,e,r){return hr(n,(function(n,o,i){t(r,n,e(n),i)})),r}function ar(n,t){return n&&No(t,zu(t),n)}function ur(n,t,e){"__proto__"==t&&ft?ft(n,t,{configurable:!0,enumerable:!0,value:e,writable:!0}):n[t]=e}function sr(t,e){for(var r=-1,o=e.length,i=_n(o),a=null==t;++r<o;)i[r]=a?n:Lu(t,e[r]);return i}function cr(t,e,r){return t==t&&(r!==n&&(t=t<=r?t:r),e!==n&&(t=t>=e?t:e)),t}function lr(t,e,r,o,i,a){var u,s=1&e,c=2&e,l=4&e;if(r&&(u=i?r(t,o,i,a):r(t)),u!==n)return u;if(!ru(t))return t;var f=Xa(t);if(f){if(u=function(n){var t=n.length,e=new n.constructor(t);return t&&"string"==typeof n[0]&&jn.call(n,"index")&&(e.index=n.index,e.input=n.input),e}(t),!s)return Ro(t,u)}else{var p=gi(t),d=p==b||p==w;if(Za(t))return Po(t,s);if(p==E||p==h||d&&!i){if(u=c||d?{}:bi(t),!s)return c?function(n,t){return No(n,mi(n),t)}(t,function(n,t){return n&&No(t,Iu(t),n)}(u,t)):function(n,t){return No(n,vi(n),t)}(t,ar(u,t))}else{if(!ut[p])return i?t:{};u=function(n,t,e){var r,o=n.constructor;switch(t){case k:return Co(n);case m:case g:return new o(+n);case R:return function(n,t){var e=t?Co(n.buffer):n.buffer;return new n.constructor(e,n.byteOffset,n.byteLength)}(n,e);case N:case z:case I:case D:case j:case M:case B:case V:case F:return Ao(n,e);case S:return new o;case _:case A:return new o(n);case P:return function(n){var t=new n.constructor(n.source,dn.exec(n));return t.lastIndex=n.lastIndex,t}(n);case C:return new o;case L:return r=n,Ve?An(Ve.call(r)):{}}}(t,p,s)}}a||(a=new Ze);var v=a.get(t);if(v)return v;a.set(t,u),cu(t)?t.forEach((function(n){u.add(lr(n,e,r,n,t,a))})):iu(t)&&t.forEach((function(n,o){u.set(o,lr(n,e,r,o,t,a))}));var y=f?n:(l?c?ui:ai:c?Iu:zu)(t);return Ct(y||t,(function(n,o){y&&(n=t[o=n]),rr(u,o,lr(n,e,r,o,t,a))})),u}function fr(t,e,r){var o=r.length;if(null==t)return!o;for(t=An(t);o--;){var i=r[o],a=e[i],u=t[i];if(u===n&&!(i in t)||!a(u))return!1}return!0}function pr(e,r,o){if("function"!=typeof e)throw new kn(t);return zi((function(){e.apply(n,o)}),r)}function dr(n,t,e,r){var o=-1,i=kt,a=!0,u=n.length,s=[],c=t.length;if(!u)return s;e&&(t=Nt(t,Zt(e))),r?(i=Rt,a=!1):t.length>=200&&(i=Qt,a=!1,t=new Ke(t));n:for(;++o<u;){var l=n[o],f=null==e?l:e(l);if(l=r||0!==l?l:0,a&&f==f){for(var p=c;p--;)if(t[p]===f)continue n;s.push(l)}else i(t,f,r)||s.push(l)}return s}We.templateSettings={escape:G,evaluate:K,interpolate:Z,variable:"",imports:{_:We}},We.prototype=He.prototype,We.prototype.constructor=We,Ue.prototype=Ye(He.prototype),Ue.prototype.constructor=Ue,$e.prototype=Ye(He.prototype),$e.prototype.constructor=$e,Xe.prototype.clear=function(){this.__data__=ke?ke(null):{},this.size=0},Xe.prototype.delete=function(n){var t=this.has(n)&&delete this.__data__[n];return this.size-=t?1:0,t},Xe.prototype.get=function(t){var r=this.__data__;if(ke){var o=r[t];return o===e?n:o}return jn.call(r,t)?r[t]:n},Xe.prototype.has=function(t){var e=this.__data__;return ke?e[t]!==n:jn.call(e,t)},Xe.prototype.set=function(t,r){var o=this.__data__;return this.size+=this.has(t)?0:1,o[t]=ke&&r===n?e:r,this},qe.prototype.clear=function(){this.__data__=[],this.size=0},qe.prototype.delete=function(n){var t=this.__data__,e=or(t,n);return!(e<0||(e==t.length-1?t.pop():Zn.call(t,e,1),--this.size,0))},qe.prototype.get=function(t){var e=this.__data__,r=or(e,t);return r<0?n:e[r][1]},qe.prototype.has=function(n){return or(this.__data__,n)>-1},qe.prototype.set=function(n,t){var e=this.__data__,r=or(e,n);return r<0?(++this.size,e.push([n,t])):e[r][1]=t,this},Ge.prototype.clear=function(){this.size=0,this.__data__={hash:new Xe,map:new(Ce||qe),string:new Xe}},Ge.prototype.delete=function(n){var t=pi(this,n).delete(n);return this.size-=t?1:0,t},Ge.prototype.get=function(n){return pi(this,n).get(n)},Ge.prototype.has=function(n){return pi(this,n).has(n)},Ge.prototype.set=function(n,t){var e=pi(this,n),r=e.size;return e.set(n,t),this.size+=e.size==r?0:1,this},Ke.prototype.add=Ke.prototype.push=function(n){return this.__data__.set(n,e),this},Ke.prototype.has=function(n){return this.__data__.has(n)},Ze.prototype.clear=function(){this.__data__=new qe,this.size=0},Ze.prototype.delete=function(n){var t=this.__data__,e=t.delete(n);return this.size=t.size,e},Ze.prototype.get=function(n){return this.__data__.get(n)},Ze.prototype.has=function(n){return this.__data__.has(n)},Ze.prototype.set=function(n,t){var e=this.__data__;if(e instanceof qe){var r=e.__data__;if(!Ce||r.length<199)return r.push([n,t]),this.size=++e.size,this;e=this.__data__=new Ge(r)}return e.set(n,t),this.size=e.size,this};var hr=Do(Sr),vr=Do(_r,!0);function mr(n,t){var e=!0;return hr(n,(function(n,r,o){return e=!!t(n,r,o)})),e}function gr(t,e,r){for(var o=-1,i=t.length;++o<i;){var a=t[o],u=e(a);if(null!=u&&(s===n?u==u&&!fu(u):r(u,s)))var s=u,c=a}return c}function yr(n,t){var e=[];return hr(n,(function(n,r,o){t(n,r,o)&&e.push(n)})),e}function br(n,t,e,r,o){var i=-1,a=n.length;for(e||(e=wi),o||(o=[]);++i<a;){var u=n[i];t>0&&e(u)?t>1?br(u,t-1,e,r,o):zt(o,u):r||(o[o.length]=u)}return o}var wr=jo(),xr=jo(!0);function Sr(n,t){return n&&wr(n,t,zu)}function _r(n,t){return n&&xr(n,t,zu)}function Er(n,t){return Ot(t,(function(t){return nu(n[t])}))}function Tr(t,e){for(var r=0,o=(e=So(e,t)).length;null!=t&&r<o;)t=t[Vi(e[r++])];return r&&r==o?t:n}function Pr(n,t,e){var r=t(n);return Xa(n)?r:zt(r,e(n))}function Cr(t){return null==t?t===n?"[object Undefined]":"[object Null]":st&&st in An(t)?function(t){var e=jn.call(t,st),r=t[st];try{t[st]=n;var o=!0}catch(n){}var i=Vn.call(t);return o&&(e?t[st]=r:delete t[st]),i}(t):function(n){return Vn.call(n)}(t)}function Ar(n,t){return n>t}function Lr(n,t){return null!=n&&jn.call(n,t)}function Or(n,t){return null!=n&&t in An(n)}function kr(t,e,r){for(var o=r?Rt:kt,i=t[0].length,a=t.length,u=a,s=_n(a),c=1/0,l=[];u--;){var f=t[u];u&&e&&(f=Nt(f,Zt(e))),c=xe(f.length,c),s[u]=!r&&(e||i>=120&&f.length>=120)?new Ke(u&&f):n}f=t[0];var p=-1,d=s[0];n:for(;++p<i&&l.length<c;){var h=f[p],v=e?e(h):h;if(h=r||0!==h?h:0,!(d?Qt(d,v):o(l,v,r))){for(u=a;--u;){var m=s[u];if(!(m?Qt(m,v):o(t[u],v,r)))continue n}d&&d.push(v),l.push(h)}}return l}function Rr(t,e,r){var o=null==(t=Oi(t,e=So(e,t)))?t:t[Vi(Qi(e))];return null==o?n:Tt(o,t,r)}function Nr(n){return ou(n)&&Cr(n)==h}function zr(t,e,r,o,i){return t===e||(null==t||null==e||!ou(t)&&!ou(e)?t!=t&&e!=e:function(t,e,r,o,i,a){var u=Xa(t),s=Xa(e),c=u?v:gi(t),l=s?v:gi(e),f=(c=c==h?E:c)==E,p=(l=l==h?E:l)==E,d=c==l;if(d&&Za(t)){if(!Za(e))return!1;u=!0,f=!1}if(d&&!f)return a||(a=new Ze),u||pu(t)?oi(t,e,r,o,i,a):function(n,t,e,r,o,i,a){switch(e){case R:if(n.byteLength!=t.byteLength||n.byteOffset!=t.byteOffset)return!1;n=n.buffer,t=t.buffer;case k:return!(n.byteLength!=t.byteLength||!i(new $n(n),new $n(t)));case m:case g:case _:return Ya(+n,+t);case y:return n.name==t.name&&n.message==t.message;case P:case A:return n==t+"";case S:var u=ue;case C:var s=1&r;if(u||(u=le),n.size!=t.size&&!s)return!1;var c=a.get(n);if(c)return c==t;r|=2,a.set(n,t);var l=oi(u(n),u(t),r,o,i,a);return a.delete(n),l;case L:if(Ve)return Ve.call(n)==Ve.call(t)}return!1}(t,e,c,r,o,i,a);if(!(1&r)){var b=f&&jn.call(t,"__wrapped__"),w=p&&jn.call(e,"__wrapped__");if(b||w){var x=b?t.value():t,T=w?e.value():e;return a||(a=new Ze),i(x,T,r,o,a)}}return!!d&&(a||(a=new Ze),function(t,e,r,o,i,a){var u=1&r,s=ai(t),c=s.length,l=ai(e).length;if(c!=l&&!u)return!1;for(var f=c;f--;){var p=s[f];if(!(u?p in e:jn.call(e,p)))return!1}var d=a.get(t),h=a.get(e);if(d&&h)return d==e&&h==t;var v=!0;a.set(t,e),a.set(e,t);for(var m=u;++f<c;){var g=t[p=s[f]],y=e[p];if(o)var b=u?o(y,g,p,e,t,a):o(g,y,p,t,e,a);if(!(b===n?g===y||i(g,y,r,o,a):b)){v=!1;break}m||(m="constructor"==p)}if(v&&!m){var w=t.constructor,x=e.constructor;w==x||!("constructor"in t)||!("constructor"in e)||"function"==typeof w&&w instanceof w&&"function"==typeof x&&x instanceof x||(v=!1)}return a.delete(t),a.delete(e),v}(t,e,r,o,i,a))}(t,e,r,o,zr,i))}function Ir(t,e,r,o){var i=r.length,a=i,u=!o;if(null==t)return!a;for(t=An(t);i--;){var s=r[i];if(u&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){var c=(s=r[i])[0],l=t[c],f=s[1];if(u&&s[2]){if(l===n&&!(c in t))return!1}else{var p=new Ze;if(o)var d=o(l,f,c,t,e,p);if(!(d===n?zr(f,l,3,o,p):d))return!1}}return!0}function Dr(n){return!(!ru(n)||(t=n,Bn&&Bn in t))&&(nu(n)?Yn:mn).test(Fi(n));var t}function jr(n){return"function"==typeof n?n:null==n?as:"object"==typeof n?Xa(n)?Yr(n[0],n[1]):Wr(n):vs(n)}function Mr(n){if(!Pi(n))return be(n);var t=[];for(var e in An(n))jn.call(n,e)&&"constructor"!=e&&t.push(e);return t}function Br(n){if(!ru(n))return function(n){var t=[];if(null!=n)for(var e in An(n))t.push(e);return t}(n);var t=Pi(n),e=[];for(var r in n)("constructor"!=r||!t&&jn.call(n,r))&&e.push(r);return e}function Vr(n,t){return n<t}function Fr(n,t){var e=-1,r=Ga(n)?_n(n.length):[];return hr(n,(function(n,o,i){r[++e]=t(n,o,i)})),r}function Wr(n){var t=di(n);return 1==t.length&&t[0][2]?Ai(t[0][0],t[0][1]):function(e){return e===n||Ir(e,n,t)}}function Yr(t,e){return _i(t)&&Ci(e)?Ai(Vi(t),e):function(r){var o=Lu(r,t);return o===n&&o===e?Ou(r,t):zr(e,o,3)}}function Hr(t,e,r,o,i){t!==e&&wr(e,(function(a,u){if(i||(i=new Ze),ru(a))!function(t,e,r,o,i,a,u){var s=Ri(t,r),c=Ri(e,r),l=u.get(c);if(l)er(t,r,l);else{var f=a?a(s,c,r+"",t,e,u):n,p=f===n;if(p){var d=Xa(c),h=!d&&Za(c),v=!d&&!h&&pu(c);f=c,d||h||v?Xa(s)?f=s:Ka(s)?f=Ro(s):h?(p=!1,f=Po(c,!0)):v?(p=!1,f=Ao(c,!0)):f=[]:uu(c)||$a(c)?(f=s,$a(s)?f=wu(s):ru(s)&&!nu(s)||(f=bi(c))):p=!1}p&&(u.set(c,f),i(f,c,o,a,u),u.delete(c)),er(t,r,f)}}(t,e,u,r,Hr,o,i);else{var s=o?o(Ri(t,u),a,u+"",t,e,i):n;s===n&&(s=a),er(t,u,s)}}),Iu)}function Ur(t,e){var r=t.length;if(r)return xi(e+=e<0?r:0,r)?t[e]:n}function $r(n,t,e){t=t.length?Nt(t,(function(n){return Xa(n)?function(t){return Tr(t,1===n.length?n[0]:n)}:n})):[as];var r=-1;return t=Nt(t,Zt(fi())),function(n,t){var e=n.length;for(n.sort(t);e--;)n[e]=n[e].value;return n}(Fr(n,(function(n,e,o){return{criteria:Nt(t,(function(t){return t(n)})),index:++r,value:n}})),(function(n,t){return function(n,t,e){for(var r=-1,o=n.criteria,i=t.criteria,a=o.length,u=e.length;++r<a;){var s=Lo(o[r],i[r]);if(s)return r>=u?s:s*("desc"==e[r]?-1:1)}return n.index-t.index}(n,t,e)}))}function Xr(n,t,e){for(var r=-1,o=t.length,i={};++r<o;){var a=t[r],u=Tr(n,a);e(u,a)&&to(i,So(a,n),u)}return i}function qr(n,t,e,r){var o=r?Wt:Ft,i=-1,a=t.length,u=n;for(n===t&&(t=Ro(t)),e&&(u=Nt(n,Zt(e)));++i<a;)for(var s=0,c=t[i],l=e?e(c):c;(s=o(u,l,s,r))>-1;)u!==n&&Zn.call(u,s,1),Zn.call(n,s,1);return n}function Gr(n,t){for(var e=n?t.length:0,r=e-1;e--;){var o=t[e];if(e==r||o!==i){var i=o;xi(o)?Zn.call(n,o,1):ho(n,o)}}return n}function Kr(n,t){return n+yt(Ee()*(t-n+1))}function Zr(n,t){var e="";if(!n||t<1||t>l)return e;do{t%2&&(e+=n),(t=yt(t/2))&&(n+=n)}while(t);return e}function Jr(n,t){return Ii(Li(n,t,as),n+"")}function Qr(n){return Qe(Yu(n))}function no(n,t){var e=Yu(n);return Mi(e,cr(t,0,e.length))}function to(t,e,r,o){if(!ru(t))return t;for(var i=-1,a=(e=So(e,t)).length,u=a-1,s=t;null!=s&&++i<a;){var c=Vi(e[i]),l=r;if("__proto__"===c||"constructor"===c||"prototype"===c)return t;if(i!=u){var f=s[c];(l=o?o(f,c,s):n)===n&&(l=ru(f)?f:xi(e[i+1])?[]:{})}rr(s,c,l),s=s[c]}return t}var eo=Re?function(n,t){return Re.set(n,t),n}:as,ro=ft?function(n,t){return ft(n,"toString",{configurable:!0,enumerable:!1,value:rs(t),writable:!0})}:as;function oo(n){return Mi(Yu(n))}function io(n,t,e){var r=-1,o=n.length;t<0&&(t=-t>o?0:o+t),(e=e>o?o:e)<0&&(e+=o),o=t>e?0:e-t>>>0,t>>>=0;for(var i=_n(o);++r<o;)i[r]=n[r+t];return i}function ao(n,t){var e;return hr(n,(function(n,r,o){return!(e=t(n,r,o))})),!!e}function uo(n,t,e){var r=0,o=null==n?r:n.length;if("number"==typeof t&&t==t&&o<=2147483647){for(;r<o;){var i=r+o>>>1,a=n[i];null!==a&&!fu(a)&&(e?a<=t:a<t)?r=i+1:o=i}return o}return so(n,t,as,e)}function so(t,e,r,o){var i=0,a=null==t?0:t.length;if(0===a)return 0;for(var u=(e=r(e))!=e,s=null===e,c=fu(e),l=e===n;i<a;){var f=yt((i+a)/2),p=r(t[f]),d=p!==n,h=null===p,v=p==p,m=fu(p);if(u)var g=o||v;else g=l?v&&(o||d):s?v&&d&&(o||!h):c?v&&d&&!h&&(o||!m):!h&&!m&&(o?p<=e:p<e);g?i=f+1:a=f}return xe(a,4294967294)}function co(n,t){for(var e=-1,r=n.length,o=0,i=[];++e<r;){var a=n[e],u=t?t(a):a;if(!e||!Ya(u,s)){var s=u;i[o++]=0===a?0:a}}return i}function lo(n){return"number"==typeof n?n:fu(n)?f:+n}function fo(n){if("string"==typeof n)return n;if(Xa(n))return Nt(n,fo)+"";if(fu(n))return Fe?Fe.call(n):"";var t=n+"";return"0"==t&&1/n==-1/0?"-0":t}function po(n,t,e){var r=-1,o=kt,i=n.length,a=!0,u=[],s=u;if(e)a=!1,o=Rt;else if(i>=200){var c=t?null:Jo(n);if(c)return le(c);a=!1,o=Qt,s=new Ke}else s=t?[]:u;n:for(;++r<i;){var l=n[r],f=t?t(l):l;if(l=e||0!==l?l:0,a&&f==f){for(var p=s.length;p--;)if(s[p]===f)continue n;t&&s.push(f),u.push(l)}else o(s,f,e)||(s!==u&&s.push(f),u.push(l))}return u}function ho(n,t){return null==(n=Oi(n,t=So(t,n)))||delete n[Vi(Qi(t))]}function vo(n,t,e,r){return to(n,t,e(Tr(n,t)),r)}function mo(n,t,e,r){for(var o=n.length,i=r?o:-1;(r?i--:++i<o)&&t(n[i],i,n););return e?io(n,r?0:i,r?i+1:o):io(n,r?i+1:0,r?o:i)}function go(n,t){var e=n;return e instanceof $e&&(e=e.value()),It(t,(function(n,t){return t.func.apply(t.thisArg,zt([n],t.args))}),e)}function yo(n,t,e){var r=n.length;if(r<2)return r?po(n[0]):[];for(var o=-1,i=_n(r);++o<r;)for(var a=n[o],u=-1;++u<r;)u!=o&&(i[o]=dr(i[o]||a,n[u],t,e));return po(br(i,1),t,e)}function bo(t,e,r){for(var o=-1,i=t.length,a=e.length,u={};++o<i;){var s=o<a?e[o]:n;r(u,t[o],s)}return u}function wo(n){return Ka(n)?n:[]}function xo(n){return"function"==typeof n?n:as}function So(n,t){return Xa(n)?n:_i(n,t)?[n]:Bi(xu(n))}var _o=Jr;function Eo(t,e,r){var o=t.length;return r=r===n?o:r,!e&&r>=o?t:io(t,e,r)}var To=pt||function(n){return dt.clearTimeout(n)};function Po(n,t){if(t)return n.slice();var e=n.length,r=Xn?Xn(e):new n.constructor(e);return n.copy(r),r}function Co(n){var t=new n.constructor(n.byteLength);return new $n(t).set(new $n(n)),t}function Ao(n,t){var e=t?Co(n.buffer):n.buffer;return new n.constructor(e,n.byteOffset,n.length)}function Lo(t,e){if(t!==e){var r=t!==n,o=null===t,i=t==t,a=fu(t),u=e!==n,s=null===e,c=e==e,l=fu(e);if(!s&&!l&&!a&&t>e||a&&u&&c&&!s&&!l||o&&u&&c||!r&&c||!i)return 1;if(!o&&!a&&!l&&t<e||l&&r&&i&&!o&&!a||s&&r&&i||!u&&i||!c)return-1}return 0}function Oo(n,t,e,r){for(var o=-1,i=n.length,a=e.length,u=-1,s=t.length,c=we(i-a,0),l=_n(s+c),f=!r;++u<s;)l[u]=t[u];for(;++o<a;)(f||o<i)&&(l[e[o]]=n[o]);for(;c--;)l[u++]=n[o++];return l}function ko(n,t,e,r){for(var o=-1,i=n.length,a=-1,u=e.length,s=-1,c=t.length,l=we(i-u,0),f=_n(l+c),p=!r;++o<l;)f[o]=n[o];for(var d=o;++s<c;)f[d+s]=t[s];for(;++a<u;)(p||o<i)&&(f[d+e[a]]=n[o++]);return f}function Ro(n,t){var e=-1,r=n.length;for(t||(t=_n(r));++e<r;)t[e]=n[e];return t}function No(t,e,r,o){var i=!r;r||(r={});for(var a=-1,u=e.length;++a<u;){var s=e[a],c=o?o(r[s],t[s],s,r,t):n;c===n&&(c=t[s]),i?ur(r,s,c):rr(r,s,c)}return r}function zo(n,t){return function(e,r){var o=Xa(e)?Pt:ir,i=t?t():{};return o(e,n,fi(r,2),i)}}function Io(t){return Jr((function(e,r){var o=-1,i=r.length,a=i>1?r[i-1]:n,u=i>2?r[2]:n;for(a=t.length>3&&"function"==typeof a?(i--,a):n,u&&Si(r[0],r[1],u)&&(a=i<3?n:a,i=1),e=An(e);++o<i;){var s=r[o];s&&t(e,s,o,a)}return e}))}function Do(n,t){return function(e,r){if(null==e)return e;if(!Ga(e))return n(e,r);for(var o=e.length,i=t?o:-1,a=An(e);(t?i--:++i<o)&&!1!==r(a[i],i,a););return e}}function jo(n){return function(t,e,r){for(var o=-1,i=An(t),a=r(t),u=a.length;u--;){var s=a[n?u:++o];if(!1===e(i[s],s,i))break}return t}}function Mo(t){return function(e){var r=ae(e=xu(e))?de(e):n,o=r?r[0]:e.charAt(0),i=r?Eo(r,1).join(""):e.slice(1);return o[t]()+i}}function Bo(n){return function(t){return It(ns($u(t).replace(Jn,"")),n,"")}}function Vo(n){return function(){var t=arguments;switch(t.length){case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var e=Ye(n.prototype),r=n.apply(e,t);return ru(r)?r:e}}function Fo(t){return function(e,r,o){var i=An(e);if(!Ga(e)){var a=fi(r,3);e=zu(e),r=function(n){return a(i[n],n,i)}}var u=t(e,r,o);return u>-1?i[a?e[u]:u]:n}}function Wo(e){return ii((function(r){var o=r.length,i=o,a=Ue.prototype.thru;for(e&&r.reverse();i--;){var u=r[i];if("function"!=typeof u)throw new kn(t);if(a&&!s&&"wrapper"==ci(u))var s=new Ue([],!0)}for(i=s?i:o;++i<o;){var c=ci(u=r[i]),l="wrapper"==c?si(u):n;s=l&&Ei(l[0])&&424==l[1]&&!l[4].length&&1==l[9]?s[ci(l[0])].apply(s,l[3]):1==u.length&&Ei(u)?s[c]():s.thru(u)}return function(){var n=arguments,t=n[0];if(s&&1==n.length&&Xa(t))return s.plant(t).value();for(var e=0,i=o?r[e].apply(this,n):t;++e<o;)i=r[e].call(this,i);return i}}))}function Yo(t,e,r,o,i,a,s,c,l,f){var p=e&u,d=1&e,h=2&e,v=24&e,m=512&e,g=h?n:Vo(t);return function n(){for(var u=arguments.length,y=_n(u),b=u;b--;)y[b]=arguments[b];if(v)var w=li(n),x=ee(y,w);if(o&&(y=Oo(y,o,i,v)),a&&(y=ko(y,a,s,v)),u-=x,v&&u<f){var S=ce(y,w);return Ko(t,e,Yo,n.placeholder,r,y,S,c,l,f-u)}var _=d?r:this,E=h?_[t]:t;return u=y.length,c?y=ki(y,c):m&&u>1&&y.reverse(),p&&l<u&&(y.length=l),this&&this!==dt&&this instanceof n&&(E=g||Vo(E)),E.apply(_,y)}}function Ho(n,t){return function(e,r){return function(n,t,e,r){return Sr(n,(function(n,o,i){t(r,e(n),o,i)})),r}(e,n,t(r),{})}}function Uo(t,e){return function(r,o){var i;if(r===n&&o===n)return e;if(r!==n&&(i=r),o!==n){if(i===n)return o;"string"==typeof r||"string"==typeof o?(r=fo(r),o=fo(o)):(r=lo(r),o=lo(o)),i=t(r,o)}return i}}function $o(n){return ii((function(t){return t=Nt(t,Zt(fi())),Jr((function(e){var r=this;return n(t,(function(n){return Tt(n,r,e)}))}))}))}function Xo(t,e){var r=(e=e===n?" ":fo(e)).length;if(r<2)return r?Zr(e,t):e;var o=Zr(e,gt(t/pe(e)));return ae(e)?Eo(de(o),0,t).join(""):o.slice(0,t)}function qo(t){return function(e,r,o){return o&&"number"!=typeof o&&Si(e,r,o)&&(r=o=n),e=mu(e),r===n?(r=e,e=0):r=mu(r),function(n,t,e,r){for(var o=-1,i=we(gt((t-n)/(e||1)),0),a=_n(i);i--;)a[r?i:++o]=n,n+=e;return a}(e,r,o=o===n?e<r?1:-1:mu(o),t)}}function Go(n){return function(t,e){return"string"==typeof t&&"string"==typeof e||(t=bu(t),e=bu(e)),n(t,e)}}function Ko(t,e,r,o,u,s,c,l,f,p){var d=8&e;e|=d?i:a,4&(e&=~(d?a:i))||(e&=-4);var h=[t,e,u,d?s:n,d?c:n,d?n:s,d?n:c,l,f,p],v=r.apply(n,h);return Ei(t)&&Ni(v,h),v.placeholder=o,Di(v,t,e)}function Zo(n){var t=Cn[n];return function(n,e){if(n=bu(n),(e=null==e?0:xe(gu(e),292))&&ge(n)){var r=(xu(n)+"e").split("e");return+((r=(xu(t(r[0]+"e"+(+r[1]+e)))+"e").split("e"))[0]+"e"+(+r[1]-e))}return t(n)}}var Jo=Le&&1/le(new Le([,-0]))[1]==c?function(n){return new Le(n)}:fs;function Qo(n){return function(t){var e=gi(t);return e==S?ue(t):e==C?fe(t):function(n,t){return Nt(t,(function(t){return[t,n[t]]}))}(t,n(t))}}function ni(e,c,l,f,p,d,h,v){var m=2&c;if(!m&&"function"!=typeof e)throw new kn(t);var g=f?f.length:0;if(g||(c&=-97,f=p=n),h=h===n?h:we(gu(h),0),v=v===n?v:gu(v),g-=p?p.length:0,c&a){var y=f,b=p;f=p=n}var w=m?n:si(e),x=[e,c,l,f,p,y,b,d,h,v];if(w&&function(n,t){var e=n[1],o=t[1],i=e|o,a=i<131,c=o==u&&8==e||o==u&&e==s&&n[7].length<=t[8]||384==o&&t[7].length<=t[8]&&8==e;if(!a&&!c)return n;1&o&&(n[2]=t[2],i|=1&e?0:4);var l=t[3];if(l){var f=n[3];n[3]=f?Oo(f,l,t[4]):l,n[4]=f?ce(n[3],r):t[4]}(l=t[5])&&(f=n[5],n[5]=f?ko(f,l,t[6]):l,n[6]=f?ce(n[5],r):t[6]),(l=t[7])&&(n[7]=l),o&u&&(n[8]=null==n[8]?t[8]:xe(n[8],t[8])),null==n[9]&&(n[9]=t[9]),n[0]=t[0],n[1]=i}(x,w),e=x[0],c=x[1],l=x[2],f=x[3],p=x[4],!(v=x[9]=x[9]===n?m?0:e.length:we(x[9]-g,0))&&24&c&&(c&=-25),c&&1!=c)S=8==c||c==o?function(t,e,r){var o=Vo(t);return function i(){for(var a=arguments.length,u=_n(a),s=a,c=li(i);s--;)u[s]=arguments[s];var l=a<3&&u[0]!==c&&u[a-1]!==c?[]:ce(u,c);return(a-=l.length)<r?Ko(t,e,Yo,i.placeholder,n,u,l,n,n,r-a):Tt(this&&this!==dt&&this instanceof i?o:t,this,u)}}(e,c,v):c!=i&&33!=c||p.length?Yo.apply(n,x):function(n,t,e,r){var o=1&t,i=Vo(n);return function t(){for(var a=-1,u=arguments.length,s=-1,c=r.length,l=_n(c+u),f=this&&this!==dt&&this instanceof t?i:n;++s<c;)l[s]=r[s];for(;u--;)l[s++]=arguments[++a];return Tt(f,o?e:this,l)}}(e,c,l,f);else var S=function(n,t,e){var r=1&t,o=Vo(n);return function t(){return(this&&this!==dt&&this instanceof t?o:n).apply(r?e:this,arguments)}}(e,c,l);return Di((w?eo:Ni)(S,x),e,c)}function ti(t,e,r,o){return t===n||Ya(t,zn[r])&&!jn.call(o,r)?e:t}function ei(t,e,r,o,i,a){return ru(t)&&ru(e)&&(a.set(e,t),Hr(t,e,n,ei,a),a.delete(e)),t}function ri(t){return uu(t)?n:t}function oi(t,e,r,o,i,a){var u=1&r,s=t.length,c=e.length;if(s!=c&&!(u&&c>s))return!1;var l=a.get(t),f=a.get(e);if(l&&f)return l==e&&f==t;var p=-1,d=!0,h=2&r?new Ke:n;for(a.set(t,e),a.set(e,t);++p<s;){var v=t[p],m=e[p];if(o)var g=u?o(m,v,p,e,t,a):o(v,m,p,t,e,a);if(g!==n){if(g)continue;d=!1;break}if(h){if(!jt(e,(function(n,t){if(!Qt(h,t)&&(v===n||i(v,n,r,o,a)))return h.push(t)}))){d=!1;break}}else if(v!==m&&!i(v,m,r,o,a)){d=!1;break}}return a.delete(t),a.delete(e),d}function ii(t){return Ii(Li(t,n,qi),t+"")}function ai(n){return Pr(n,zu,vi)}function ui(n){return Pr(n,Iu,mi)}var si=Re?function(n){return Re.get(n)}:fs;function ci(n){for(var t=n.name+"",e=Ne[t],r=jn.call(Ne,t)?e.length:0;r--;){var o=e[r],i=o.func;if(null==i||i==n)return o.name}return t}function li(n){return(jn.call(We,"placeholder")?We:n).placeholder}function fi(){var n=We.iteratee||us;return n=n===us?jr:n,arguments.length?n(arguments[0],arguments[1]):n}function pi(n,t){var e,r,o=n.__data__;return("string"==(r=typeof(e=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==e:null===e)?o["string"==typeof t?"string":"hash"]:o.map}function di(n){for(var t=zu(n),e=t.length;e--;){var r=t[e],o=n[r];t[e]=[r,o,Ci(o)]}return t}function hi(t,e){var r=function(t,e){return null==t?n:t[e]}(t,e);return Dr(r)?r:n}var vi=Mt?function(n){return null==n?[]:(n=An(n),Ot(Mt(n),(function(t){return Kn.call(n,t)})))}:ys,mi=Mt?function(n){for(var t=[];n;)zt(t,vi(n)),n=qn(n);return t}:ys,gi=Cr;function yi(n,t,e){for(var r=-1,o=(t=So(t,n)).length,i=!1;++r<o;){var a=Vi(t[r]);if(!(i=null!=n&&e(n,a)))break;n=n[a]}return i||++r!=o?i:!!(o=null==n?0:n.length)&&eu(o)&&xi(a,o)&&(Xa(n)||$a(n))}function bi(n){return"function"!=typeof n.constructor||Pi(n)?{}:Ye(qn(n))}function wi(n){return Xa(n)||$a(n)||!!(nt&&n&&n[nt])}function xi(n,t){var e=typeof n;return!!(t=null==t?l:t)&&("number"==e||"symbol"!=e&&yn.test(n))&&n>-1&&n%1==0&&n<t}function Si(n,t,e){if(!ru(e))return!1;var r=typeof t;return!!("number"==r?Ga(e)&&xi(t,e.length):"string"==r&&t in e)&&Ya(e[t],n)}function _i(n,t){if(Xa(n))return!1;var e=typeof n;return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=n&&!fu(n))||Q.test(n)||!J.test(n)||null!=t&&n in An(t)}function Ei(n){var t=ci(n),e=We[t];if("function"!=typeof e||!(t in $e.prototype))return!1;if(n===e)return!0;var r=si(e);return!!r&&n===r[0]}(Pe&&gi(new Pe(new ArrayBuffer(1)))!=R||Ce&&gi(new Ce)!=S||Ae&&gi(Ae.resolve())!=T||Le&&gi(new Le)!=C||Oe&&gi(new Oe)!=O)&&(gi=function(t){var e=Cr(t),r=e==E?t.constructor:n,o=r?Fi(r):"";if(o)switch(o){case ze:return R;case Ie:return S;case De:return T;case je:return C;case Me:return O}return e});var Ti=In?nu:bs;function Pi(n){var t=n&&n.constructor;return n===("function"==typeof t&&t.prototype||zn)}function Ci(n){return n==n&&!ru(n)}function Ai(t,e){return function(r){return null!=r&&r[t]===e&&(e!==n||t in An(r))}}function Li(t,e,r){return e=we(e===n?t.length-1:e,0),function(){for(var n=arguments,o=-1,i=we(n.length-e,0),a=_n(i);++o<i;)a[o]=n[e+o];o=-1;for(var u=_n(e+1);++o<e;)u[o]=n[o];return u[e]=r(a),Tt(t,this,u)}}function Oi(n,t){return t.length<2?n:Tr(n,io(t,0,-1))}function ki(t,e){for(var r=t.length,o=xe(e.length,r),i=Ro(t);o--;){var a=e[o];t[o]=xi(a,r)?i[a]:n}return t}function Ri(n,t){if(("constructor"!==t||"function"!=typeof n[t])&&"__proto__"!=t)return n[t]}var Ni=ji(eo),zi=vt||function(n,t){return dt.setTimeout(n,t)},Ii=ji(ro);function Di(n,t,e){var r=t+"";return Ii(n,function(n,t){var e=t.length;if(!e)return n;var r=e-1;return t[r]=(e>1?"& ":"")+t[r],t=t.join(e>2?", ":" "),n.replace(an,"{\n/* [wrapped with "+t+"] */\n")}(r,function(n,t){return Ct(d,(function(e){var r="_."+e[0];t&e[1]&&!kt(n,r)&&n.push(r)})),n.sort()}(function(n){var t=n.match(un);return t?t[1].split(sn):[]}(r),e)))}function ji(t){var e=0,r=0;return function(){var o=Se(),i=16-(o-r);if(r=o,i>0){if(++e>=800)return arguments[0]}else e=0;return t.apply(n,arguments)}}function Mi(t,e){var r=-1,o=t.length,i=o-1;for(e=e===n?o:e;++r<e;){var a=Kr(r,i),u=t[a];t[a]=t[r],t[r]=u}return t.length=e,t}var Bi=function(n){var t=ja(n,(function(n){return 500===e.size&&e.clear(),n})),e=t.cache;return t}((function(n){var t=[];return 46===n.charCodeAt(0)&&t.push(""),n.replace(nn,(function(n,e,r,o){t.push(r?o.replace(fn,"$1"):e||n)})),t}));function Vi(n){if("string"==typeof n||fu(n))return n;var t=n+"";return"0"==t&&1/n==-1/0?"-0":t}function Fi(n){if(null!=n){try{return Dn.call(n)}catch(n){}try{return n+""}catch(n){}}return""}function Wi(n){if(n instanceof $e)return n.clone();var t=new Ue(n.__wrapped__,n.__chain__);return t.__actions__=Ro(n.__actions__),t.__index__=n.__index__,t.__values__=n.__values__,t}var Yi=Jr((function(n,t){return Ka(n)?dr(n,br(t,1,Ka,!0)):[]})),Hi=Jr((function(t,e){var r=Qi(e);return Ka(r)&&(r=n),Ka(t)?dr(t,br(e,1,Ka,!0),fi(r,2)):[]})),Ui=Jr((function(t,e){var r=Qi(e);return Ka(r)&&(r=n),Ka(t)?dr(t,br(e,1,Ka,!0),n,r):[]}));function $i(n,t,e){var r=null==n?0:n.length;if(!r)return-1;var o=null==e?0:gu(e);return o<0&&(o=we(r+o,0)),Vt(n,fi(t,3),o)}function Xi(t,e,r){var o=null==t?0:t.length;if(!o)return-1;var i=o-1;return r!==n&&(i=gu(r),i=r<0?we(o+i,0):xe(i,o-1)),Vt(t,fi(e,3),i,!0)}function qi(n){return null!=n&&n.length?br(n,1):[]}function Gi(t){return t&&t.length?t[0]:n}var Ki=Jr((function(n){var t=Nt(n,wo);return t.length&&t[0]===n[0]?kr(t):[]})),Zi=Jr((function(t){var e=Qi(t),r=Nt(t,wo);return e===Qi(r)?e=n:r.pop(),r.length&&r[0]===t[0]?kr(r,fi(e,2)):[]})),Ji=Jr((function(t){var e=Qi(t),r=Nt(t,wo);return(e="function"==typeof e?e:n)&&r.pop(),r.length&&r[0]===t[0]?kr(r,n,e):[]}));function Qi(t){var e=null==t?0:t.length;return e?t[e-1]:n}var na=Jr(ta);function ta(n,t){return n&&n.length&&t&&t.length?qr(n,t):n}var ea=ii((function(n,t){var e=null==n?0:n.length,r=sr(n,t);return Gr(n,Nt(t,(function(n){return xi(n,e)?+n:n})).sort(Lo)),r}));function ra(n){return null==n?n:Te.call(n)}var oa=Jr((function(n){return po(br(n,1,Ka,!0))})),ia=Jr((function(t){var e=Qi(t);return Ka(e)&&(e=n),po(br(t,1,Ka,!0),fi(e,2))})),aa=Jr((function(t){var e=Qi(t);return e="function"==typeof e?e:n,po(br(t,1,Ka,!0),n,e)}));function ua(n){if(!n||!n.length)return[];var t=0;return n=Ot(n,(function(n){if(Ka(n))return t=we(n.length,t),!0})),Gt(t,(function(t){return Nt(n,Ut(t))}))}function sa(t,e){if(!t||!t.length)return[];var r=ua(t);return null==e?r:Nt(r,(function(t){return Tt(e,n,t)}))}var ca=Jr((function(n,t){return Ka(n)?dr(n,t):[]})),la=Jr((function(n){return yo(Ot(n,Ka))})),fa=Jr((function(t){var e=Qi(t);return Ka(e)&&(e=n),yo(Ot(t,Ka),fi(e,2))})),pa=Jr((function(t){var e=Qi(t);return e="function"==typeof e?e:n,yo(Ot(t,Ka),n,e)})),da=Jr(ua),ha=Jr((function(t){var e=t.length,r=e>1?t[e-1]:n;return r="function"==typeof r?(t.pop(),r):n,sa(t,r)}));function va(n){var t=We(n);return t.__chain__=!0,t}function ma(n,t){return t(n)}var ga=ii((function(t){var e=t.length,r=e?t[0]:0,o=this.__wrapped__,i=function(n){return sr(n,t)};return!(e>1||this.__actions__.length)&&o instanceof $e&&xi(r)?((o=o.slice(r,+r+(e?1:0))).__actions__.push({func:ma,args:[i],thisArg:n}),new Ue(o,this.__chain__).thru((function(t){return e&&!t.length&&t.push(n),t}))):this.thru(i)})),ya=zo((function(n,t,e){jn.call(n,e)?++n[e]:ur(n,e,1)})),ba=Fo($i),wa=Fo(Xi);function xa(n,t){return(Xa(n)?Ct:hr)(n,fi(t,3))}function Sa(n,t){return(Xa(n)?At:vr)(n,fi(t,3))}var _a=zo((function(n,t,e){jn.call(n,e)?n[e].push(t):ur(n,e,[t])})),Ea=Jr((function(n,t,e){var r=-1,o="function"==typeof t,i=Ga(n)?_n(n.length):[];return hr(n,(function(n){i[++r]=o?Tt(t,n,e):Rr(n,t,e)})),i})),Ta=zo((function(n,t,e){ur(n,e,t)}));function Pa(n,t){return(Xa(n)?Nt:Fr)(n,fi(t,3))}var Ca=zo((function(n,t,e){n[e?0:1].push(t)}),(function(){return[[],[]]})),Aa=Jr((function(n,t){if(null==n)return[];var e=t.length;return e>1&&Si(n,t[0],t[1])?t=[]:e>2&&Si(t[0],t[1],t[2])&&(t=[t[0]]),$r(n,br(t,1),[])})),La=ht||function(){return dt.Date.now()};function Oa(t,e,r){return e=r?n:e,e=t&&null==e?t.length:e,ni(t,u,n,n,n,n,e)}function ka(e,r){var o;if("function"!=typeof r)throw new kn(t);return e=gu(e),function(){return--e>0&&(o=r.apply(this,arguments)),e<=1&&(r=n),o}}var Ra=Jr((function(n,t,e){var r=1;if(e.length){var o=ce(e,li(Ra));r|=i}return ni(n,r,t,e,o)})),Na=Jr((function(n,t,e){var r=3;if(e.length){var o=ce(e,li(Na));r|=i}return ni(t,r,n,e,o)}));function za(e,r,o){var i,a,u,s,c,l,f=0,p=!1,d=!1,h=!0;if("function"!=typeof e)throw new kn(t);function v(t){var r=i,o=a;return i=a=n,f=t,s=e.apply(o,r)}function m(n){return f=n,c=zi(y,r),p?v(n):s}function g(t){var e=t-l;return l===n||e>=r||e<0||d&&t-f>=u}function y(){var n=La();if(g(n))return b(n);c=zi(y,function(n){var t=r-(n-l);return d?xe(t,u-(n-f)):t}(n))}function b(t){return c=n,h&&i?v(t):(i=a=n,s)}function w(){var t=La(),e=g(t);if(i=arguments,a=this,l=t,e){if(c===n)return m(l);if(d)return To(c),c=zi(y,r),v(l)}return c===n&&(c=zi(y,r)),s}return r=bu(r)||0,ru(o)&&(p=!!o.leading,u=(d="maxWait"in o)?we(bu(o.maxWait)||0,r):u,h="trailing"in o?!!o.trailing:h),w.cancel=function(){c!==n&&To(c),f=0,i=l=a=c=n},w.flush=function(){return c===n?s:b(La())},w}var Ia=Jr((function(n,t){return pr(n,1,t)})),Da=Jr((function(n,t,e){return pr(n,bu(t)||0,e)}));function ja(n,e){if("function"!=typeof n||null!=e&&"function"!=typeof e)throw new kn(t);var r=function(){var t=arguments,o=e?e.apply(this,t):t[0],i=r.cache;if(i.has(o))return i.get(o);var a=n.apply(this,t);return r.cache=i.set(o,a)||i,a};return r.cache=new(ja.Cache||Ge),r}function Ma(n){if("function"!=typeof n)throw new kn(t);return function(){var t=arguments;switch(t.length){case 0:return!n.call(this);case 1:return!n.call(this,t[0]);case 2:return!n.call(this,t[0],t[1]);case 3:return!n.call(this,t[0],t[1],t[2])}return!n.apply(this,t)}}ja.Cache=Ge;var Ba=_o((function(n,t){var e=(t=1==t.length&&Xa(t[0])?Nt(t[0],Zt(fi())):Nt(br(t,1),Zt(fi()))).length;return Jr((function(r){for(var o=-1,i=xe(r.length,e);++o<i;)r[o]=t[o].call(this,r[o]);return Tt(n,this,r)}))})),Va=Jr((function(t,e){var r=ce(e,li(Va));return ni(t,i,n,e,r)})),Fa=Jr((function(t,e){var r=ce(e,li(Fa));return ni(t,a,n,e,r)})),Wa=ii((function(t,e){return ni(t,s,n,n,n,e)}));function Ya(n,t){return n===t||n!=n&&t!=t}var Ha=Go(Ar),Ua=Go((function(n,t){return n>=t})),$a=Nr(function(){return arguments}())?Nr:function(n){return ou(n)&&jn.call(n,"callee")&&!Kn.call(n,"callee")},Xa=_n.isArray,qa=bt?Zt(bt):function(n){return ou(n)&&Cr(n)==k};function Ga(n){return null!=n&&eu(n.length)&&!nu(n)}function Ka(n){return ou(n)&&Ga(n)}var Za=$t||bs,Ja=wt?Zt(wt):function(n){return ou(n)&&Cr(n)==g};function Qa(n){if(!ou(n))return!1;var t=Cr(n);return t==y||"[object DOMException]"==t||"string"==typeof n.message&&"string"==typeof n.name&&!uu(n)}function nu(n){if(!ru(n))return!1;var t=Cr(n);return t==b||t==w||"[object AsyncFunction]"==t||"[object Proxy]"==t}function tu(n){return"number"==typeof n&&n==gu(n)}function eu(n){return"number"==typeof n&&n>-1&&n%1==0&&n<=l}function ru(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function ou(n){return null!=n&&"object"==typeof n}var iu=xt?Zt(xt):function(n){return ou(n)&&gi(n)==S};function au(n){return"number"==typeof n||ou(n)&&Cr(n)==_}function uu(n){if(!ou(n)||Cr(n)!=E)return!1;var t=qn(n);if(null===t)return!0;var e=jn.call(t,"constructor")&&t.constructor;return"function"==typeof e&&e instanceof e&&Dn.call(e)==Fn}var su=St?Zt(St):function(n){return ou(n)&&Cr(n)==P},cu=_t?Zt(_t):function(n){return ou(n)&&gi(n)==C};function lu(n){return"string"==typeof n||!Xa(n)&&ou(n)&&Cr(n)==A}function fu(n){return"symbol"==typeof n||ou(n)&&Cr(n)==L}var pu=Et?Zt(Et):function(n){return ou(n)&&eu(n.length)&&!!at[Cr(n)]},du=Go(Vr),hu=Go((function(n,t){return n<=t}));function vu(n){if(!n)return[];if(Ga(n))return lu(n)?de(n):Ro(n);if(et&&n[et])return function(n){for(var t,e=[];!(t=n.next()).done;)e.push(t.value);return e}(n[et]());var t=gi(n);return(t==S?ue:t==C?le:Yu)(n)}function mu(n){return n?(n=bu(n))===c||n===-1/0?17976931348623157e292*(n<0?-1:1):n==n?n:0:0===n?n:0}function gu(n){var t=mu(n),e=t%1;return t==t?e?t-e:t:0}function yu(n){return n?cr(gu(n),0,p):0}function bu(n){if("number"==typeof n)return n;if(fu(n))return f;if(ru(n)){var t="function"==typeof n.valueOf?n.valueOf():n;n=ru(t)?t+"":t}if("string"!=typeof n)return 0===n?n:+n;n=Kt(n);var e=vn.test(n);return e||gn.test(n)?lt(n.slice(2),e?2:8):hn.test(n)?f:+n}function wu(n){return No(n,Iu(n))}function xu(n){return null==n?"":fo(n)}var Su=Io((function(n,t){if(Pi(t)||Ga(t))No(t,zu(t),n);else for(var e in t)jn.call(t,e)&&rr(n,e,t[e])})),_u=Io((function(n,t){No(t,Iu(t),n)})),Eu=Io((function(n,t,e,r){No(t,Iu(t),n,r)})),Tu=Io((function(n,t,e,r){No(t,zu(t),n,r)})),Pu=ii(sr),Cu=Jr((function(t,e){t=An(t);var r=-1,o=e.length,i=o>2?e[2]:n;for(i&&Si(e[0],e[1],i)&&(o=1);++r<o;)for(var a=e[r],u=Iu(a),s=-1,c=u.length;++s<c;){var l=u[s],f=t[l];(f===n||Ya(f,zn[l])&&!jn.call(t,l))&&(t[l]=a[l])}return t})),Au=Jr((function(t){return t.push(n,ei),Tt(ju,n,t)}));function Lu(t,e,r){var o=null==t?n:Tr(t,e);return o===n?r:o}function Ou(n,t){return null!=n&&yi(n,t,Or)}var ku=Ho((function(n,t,e){null!=t&&"function"!=typeof t.toString&&(t=Vn.call(t)),n[t]=e}),rs(as)),Ru=Ho((function(n,t,e){null!=t&&"function"!=typeof t.toString&&(t=Vn.call(t)),jn.call(n,t)?n[t].push(e):n[t]=[e]}),fi),Nu=Jr(Rr);function zu(n){return Ga(n)?Je(n):Mr(n)}function Iu(n){return Ga(n)?Je(n,!0):Br(n)}var Du=Io((function(n,t,e){Hr(n,t,e)})),ju=Io((function(n,t,e,r){Hr(n,t,e,r)})),Mu=ii((function(n,t){var e={};if(null==n)return e;var r=!1;t=Nt(t,(function(t){return t=So(t,n),r||(r=t.length>1),t})),No(n,ui(n),e),r&&(e=lr(e,7,ri));for(var o=t.length;o--;)ho(e,t[o]);return e})),Bu=ii((function(n,t){return null==n?{}:function(n,t){return Xr(n,t,(function(t,e){return Ou(n,e)}))}(n,t)}));function Vu(n,t){if(null==n)return{};var e=Nt(ui(n),(function(n){return[n]}));return t=fi(t),Xr(n,e,(function(n,e){return t(n,e[0])}))}var Fu=Qo(zu),Wu=Qo(Iu);function Yu(n){return null==n?[]:Jt(n,zu(n))}var Hu=Bo((function(n,t,e){return t=t.toLowerCase(),n+(e?Uu(t):t)}));function Uu(n){return Qu(xu(n).toLowerCase())}function $u(n){return(n=xu(n))&&n.replace(bn,re).replace(Qn,"")}var Xu=Bo((function(n,t,e){return n+(e?"-":"")+t.toLowerCase()})),qu=Bo((function(n,t,e){return n+(e?" ":"")+t.toLowerCase()})),Gu=Mo("toLowerCase"),Ku=Bo((function(n,t,e){return n+(e?"_":"")+t.toLowerCase()})),Zu=Bo((function(n,t,e){return n+(e?" ":"")+Qu(t)})),Ju=Bo((function(n,t,e){return n+(e?" ":"")+t.toUpperCase()})),Qu=Mo("toUpperCase");function ns(t,e,r){return t=xu(t),(e=r?n:e)===n?function(n){return rt.test(n)}(t)?function(n){return n.match(tt)||[]}(t):function(n){return n.match(cn)||[]}(t):t.match(e)||[]}var ts=Jr((function(t,e){try{return Tt(t,n,e)}catch(n){return Qa(n)?n:new Tn(n)}})),es=ii((function(n,t){return Ct(t,(function(t){t=Vi(t),ur(n,t,Ra(n[t],n))})),n}));function rs(n){return function(){return n}}var os=Wo(),is=Wo(!0);function as(n){return n}function us(n){return jr("function"==typeof n?n:lr(n,1))}var ss=Jr((function(n,t){return function(e){return Rr(e,n,t)}})),cs=Jr((function(n,t){return function(e){return Rr(n,e,t)}}));function ls(n,t,e){var r=zu(t),o=Er(t,r);null!=e||ru(t)&&(o.length||!r.length)||(e=t,t=n,n=this,o=Er(t,zu(t)));var i=!(ru(e)&&"chain"in e&&!e.chain),a=nu(n);return Ct(o,(function(e){var r=t[e];n[e]=r,a&&(n.prototype[e]=function(){var t=this.__chain__;if(i||t){var e=n(this.__wrapped__),o=e.__actions__=Ro(this.__actions__);return o.push({func:r,args:arguments,thisArg:n}),e.__chain__=t,e}return r.apply(n,zt([this.value()],arguments))})})),n}function fs(){}var ps=$o(Nt),ds=$o(Lt),hs=$o(jt);function vs(n){return _i(n)?Ut(Vi(n)):function(n){return function(t){return Tr(t,n)}}(n)}var ms=qo(),gs=qo(!0);function ys(){return[]}function bs(){return!1}var ws,xs=Uo((function(n,t){return n+t}),0),Ss=Zo("ceil"),_s=Uo((function(n,t){return n/t}),1),Es=Zo("floor"),Ts=Uo((function(n,t){return n*t}),1),Ps=Zo("round"),Cs=Uo((function(n,t){return n-t}),0);return We.after=function(n,e){if("function"!=typeof e)throw new kn(t);return n=gu(n),function(){if(--n<1)return e.apply(this,arguments)}},We.ary=Oa,We.assign=Su,We.assignIn=_u,We.assignInWith=Eu,We.assignWith=Tu,We.at=Pu,We.before=ka,We.bind=Ra,We.bindAll=es,We.bindKey=Na,We.castArray=function(){if(!arguments.length)return[];var n=arguments[0];return Xa(n)?n:[n]},We.chain=va,We.chunk=function(t,e,r){e=(r?Si(t,e,r):e===n)?1:we(gu(e),0);var o=null==t?0:t.length;if(!o||e<1)return[];for(var i=0,a=0,u=_n(gt(o/e));i<o;)u[a++]=io(t,i,i+=e);return u},We.compact=function(n){for(var t=-1,e=null==n?0:n.length,r=0,o=[];++t<e;){var i=n[t];i&&(o[r++]=i)}return o},We.concat=function(){var n=arguments.length;if(!n)return[];for(var t=_n(n-1),e=arguments[0],r=n;r--;)t[r-1]=arguments[r];return zt(Xa(e)?Ro(e):[e],br(t,1))},We.cond=function(n){var e=null==n?0:n.length,r=fi();return n=e?Nt(n,(function(n){if("function"!=typeof n[1])throw new kn(t);return[r(n[0]),n[1]]})):[],Jr((function(t){for(var r=-1;++r<e;){var o=n[r];if(Tt(o[0],this,t))return Tt(o[1],this,t)}}))},We.conforms=function(n){return function(n){var t=zu(n);return function(e){return fr(e,n,t)}}(lr(n,1))},We.constant=rs,We.countBy=ya,We.create=function(n,t){var e=Ye(n);return null==t?e:ar(e,t)},We.curry=function t(e,r,o){var i=ni(e,8,n,n,n,n,n,r=o?n:r);return i.placeholder=t.placeholder,i},We.curryRight=function t(e,r,i){var a=ni(e,o,n,n,n,n,n,r=i?n:r);return a.placeholder=t.placeholder,a},We.debounce=za,We.defaults=Cu,We.defaultsDeep=Au,We.defer=Ia,We.delay=Da,We.difference=Yi,We.differenceBy=Hi,We.differenceWith=Ui,We.drop=function(t,e,r){var o=null==t?0:t.length;return o?io(t,(e=r||e===n?1:gu(e))<0?0:e,o):[]},We.dropRight=function(t,e,r){var o=null==t?0:t.length;return o?io(t,0,(e=o-(e=r||e===n?1:gu(e)))<0?0:e):[]},We.dropRightWhile=function(n,t){return n&&n.length?mo(n,fi(t,3),!0,!0):[]},We.dropWhile=function(n,t){return n&&n.length?mo(n,fi(t,3),!0):[]},We.fill=function(t,e,r,o){var i=null==t?0:t.length;return i?(r&&"number"!=typeof r&&Si(t,e,r)&&(r=0,o=i),function(t,e,r,o){var i=t.length;for((r=gu(r))<0&&(r=-r>i?0:i+r),(o=o===n||o>i?i:gu(o))<0&&(o+=i),o=r>o?0:yu(o);r<o;)t[r++]=e;return t}(t,e,r,o)):[]},We.filter=function(n,t){return(Xa(n)?Ot:yr)(n,fi(t,3))},We.flatMap=function(n,t){return br(Pa(n,t),1)},We.flatMapDeep=function(n,t){return br(Pa(n,t),c)},We.flatMapDepth=function(t,e,r){return r=r===n?1:gu(r),br(Pa(t,e),r)},We.flatten=qi,We.flattenDeep=function(n){return null!=n&&n.length?br(n,c):[]},We.flattenDepth=function(t,e){return null!=t&&t.length?br(t,e=e===n?1:gu(e)):[]},We.flip=function(n){return ni(n,512)},We.flow=os,We.flowRight=is,We.fromPairs=function(n){for(var t=-1,e=null==n?0:n.length,r={};++t<e;){var o=n[t];r[o[0]]=o[1]}return r},We.functions=function(n){return null==n?[]:Er(n,zu(n))},We.functionsIn=function(n){return null==n?[]:Er(n,Iu(n))},We.groupBy=_a,We.initial=function(n){return null!=n&&n.length?io(n,0,-1):[]},We.intersection=Ki,We.intersectionBy=Zi,We.intersectionWith=Ji,We.invert=ku,We.invertBy=Ru,We.invokeMap=Ea,We.iteratee=us,We.keyBy=Ta,We.keys=zu,We.keysIn=Iu,We.map=Pa,We.mapKeys=function(n,t){var e={};return t=fi(t,3),Sr(n,(function(n,r,o){ur(e,t(n,r,o),n)})),e},We.mapValues=function(n,t){var e={};return t=fi(t,3),Sr(n,(function(n,r,o){ur(e,r,t(n,r,o))})),e},We.matches=function(n){return Wr(lr(n,1))},We.matchesProperty=function(n,t){return Yr(n,lr(t,1))},We.memoize=ja,We.merge=Du,We.mergeWith=ju,We.method=ss,We.methodOf=cs,We.mixin=ls,We.negate=Ma,We.nthArg=function(n){return n=gu(n),Jr((function(t){return Ur(t,n)}))},We.omit=Mu,We.omitBy=function(n,t){return Vu(n,Ma(fi(t)))},We.once=function(n){return ka(2,n)},We.orderBy=function(t,e,r,o){return null==t?[]:(Xa(e)||(e=null==e?[]:[e]),Xa(r=o?n:r)||(r=null==r?[]:[r]),$r(t,e,r))},We.over=ps,We.overArgs=Ba,We.overEvery=ds,We.overSome=hs,We.partial=Va,We.partialRight=Fa,We.partition=Ca,We.pick=Bu,We.pickBy=Vu,We.property=vs,We.propertyOf=function(t){return function(e){return null==t?n:Tr(t,e)}},We.pull=na,We.pullAll=ta,We.pullAllBy=function(n,t,e){return n&&n.length&&t&&t.length?qr(n,t,fi(e,2)):n},We.pullAllWith=function(t,e,r){return t&&t.length&&e&&e.length?qr(t,e,n,r):t},We.pullAt=ea,We.range=ms,We.rangeRight=gs,We.rearg=Wa,We.reject=function(n,t){return(Xa(n)?Ot:yr)(n,Ma(fi(t,3)))},We.remove=function(n,t){var e=[];if(!n||!n.length)return e;var r=-1,o=[],i=n.length;for(t=fi(t,3);++r<i;){var a=n[r];t(a,r,n)&&(e.push(a),o.push(r))}return Gr(n,o),e},We.rest=function(e,r){if("function"!=typeof e)throw new kn(t);return Jr(e,r=r===n?r:gu(r))},We.reverse=ra,We.sampleSize=function(t,e,r){return e=(r?Si(t,e,r):e===n)?1:gu(e),(Xa(t)?nr:no)(t,e)},We.set=function(n,t,e){return null==n?n:to(n,t,e)},We.setWith=function(t,e,r,o){return o="function"==typeof o?o:n,null==t?t:to(t,e,r,o)},We.shuffle=function(n){return(Xa(n)?tr:oo)(n)},We.slice=function(t,e,r){var o=null==t?0:t.length;return o?(r&&"number"!=typeof r&&Si(t,e,r)?(e=0,r=o):(e=null==e?0:gu(e),r=r===n?o:gu(r)),io(t,e,r)):[]},We.sortBy=Aa,We.sortedUniq=function(n){return n&&n.length?co(n):[]},We.sortedUniqBy=function(n,t){return n&&n.length?co(n,fi(t,2)):[]},We.split=function(t,e,r){return r&&"number"!=typeof r&&Si(t,e,r)&&(e=r=n),(r=r===n?p:r>>>0)?(t=xu(t))&&("string"==typeof e||null!=e&&!su(e))&&!(e=fo(e))&&ae(t)?Eo(de(t),0,r):t.split(e,r):[]},We.spread=function(n,e){if("function"!=typeof n)throw new kn(t);return e=null==e?0:we(gu(e),0),Jr((function(t){var r=t[e],o=Eo(t,0,e);return r&&zt(o,r),Tt(n,this,o)}))},We.tail=function(n){var t=null==n?0:n.length;return t?io(n,1,t):[]},We.take=function(t,e,r){return t&&t.length?io(t,0,(e=r||e===n?1:gu(e))<0?0:e):[]},We.takeRight=function(t,e,r){var o=null==t?0:t.length;return o?io(t,(e=o-(e=r||e===n?1:gu(e)))<0?0:e,o):[]},We.takeRightWhile=function(n,t){return n&&n.length?mo(n,fi(t,3),!1,!0):[]},We.takeWhile=function(n,t){return n&&n.length?mo(n,fi(t,3)):[]},We.tap=function(n,t){return t(n),n},We.throttle=function(n,e,r){var o=!0,i=!0;if("function"!=typeof n)throw new kn(t);return ru(r)&&(o="leading"in r?!!r.leading:o,i="trailing"in r?!!r.trailing:i),za(n,e,{leading:o,maxWait:e,trailing:i})},We.thru=ma,We.toArray=vu,We.toPairs=Fu,We.toPairsIn=Wu,We.toPath=function(n){return Xa(n)?Nt(n,Vi):fu(n)?[n]:Ro(Bi(xu(n)))},We.toPlainObject=wu,We.transform=function(n,t,e){var r=Xa(n),o=r||Za(n)||pu(n);if(t=fi(t,4),null==e){var i=n&&n.constructor;e=o?r?new i:[]:ru(n)&&nu(i)?Ye(qn(n)):{}}return(o?Ct:Sr)(n,(function(n,r,o){return t(e,n,r,o)})),e},We.unary=function(n){return Oa(n,1)},We.union=oa,We.unionBy=ia,We.unionWith=aa,We.uniq=function(n){return n&&n.length?po(n):[]},We.uniqBy=function(n,t){return n&&n.length?po(n,fi(t,2)):[]},We.uniqWith=function(t,e){return e="function"==typeof e?e:n,t&&t.length?po(t,n,e):[]},We.unset=function(n,t){return null==n||ho(n,t)},We.unzip=ua,We.unzipWith=sa,We.update=function(n,t,e){return null==n?n:vo(n,t,xo(e))},We.updateWith=function(t,e,r,o){return o="function"==typeof o?o:n,null==t?t:vo(t,e,xo(r),o)},We.values=Yu,We.valuesIn=function(n){return null==n?[]:Jt(n,Iu(n))},We.without=ca,We.words=ns,We.wrap=function(n,t){return Va(xo(t),n)},We.xor=la,We.xorBy=fa,We.xorWith=pa,We.zip=da,We.zipObject=function(n,t){return bo(n||[],t||[],rr)},We.zipObjectDeep=function(n,t){return bo(n||[],t||[],to)},We.zipWith=ha,We.entries=Fu,We.entriesIn=Wu,We.extend=_u,We.extendWith=Eu,ls(We,We),We.add=xs,We.attempt=ts,We.camelCase=Hu,We.capitalize=Uu,We.ceil=Ss,We.clamp=function(t,e,r){return r===n&&(r=e,e=n),r!==n&&(r=(r=bu(r))==r?r:0),e!==n&&(e=(e=bu(e))==e?e:0),cr(bu(t),e,r)},We.clone=function(n){return lr(n,4)},We.cloneDeep=function(n){return lr(n,5)},We.cloneDeepWith=function(t,e){return lr(t,5,e="function"==typeof e?e:n)},We.cloneWith=function(t,e){return lr(t,4,e="function"==typeof e?e:n)},We.conformsTo=function(n,t){return null==t||fr(n,t,zu(t))},We.deburr=$u,We.defaultTo=function(n,t){return null==n||n!=n?t:n},We.divide=_s,We.endsWith=function(t,e,r){t=xu(t),e=fo(e);var o=t.length,i=r=r===n?o:cr(gu(r),0,o);return(r-=e.length)>=0&&t.slice(r,i)==e},We.eq=Ya,We.escape=function(n){return(n=xu(n))&&q.test(n)?n.replace($,oe):n},We.escapeRegExp=function(n){return(n=xu(n))&&en.test(n)?n.replace(tn,"\\$&"):n},We.every=function(t,e,r){var o=Xa(t)?Lt:mr;return r&&Si(t,e,r)&&(e=n),o(t,fi(e,3))},We.find=ba,We.findIndex=$i,We.findKey=function(n,t){return Bt(n,fi(t,3),Sr)},We.findLast=wa,We.findLastIndex=Xi,We.findLastKey=function(n,t){return Bt(n,fi(t,3),_r)},We.floor=Es,We.forEach=xa,We.forEachRight=Sa,We.forIn=function(n,t){return null==n?n:wr(n,fi(t,3),Iu)},We.forInRight=function(n,t){return null==n?n:xr(n,fi(t,3),Iu)},We.forOwn=function(n,t){return n&&Sr(n,fi(t,3))},We.forOwnRight=function(n,t){return n&&_r(n,fi(t,3))},We.get=Lu,We.gt=Ha,We.gte=Ua,We.has=function(n,t){return null!=n&&yi(n,t,Lr)},We.hasIn=Ou,We.head=Gi,We.identity=as,We.includes=function(n,t,e,r){n=Ga(n)?n:Yu(n),e=e&&!r?gu(e):0;var o=n.length;return e<0&&(e=we(o+e,0)),lu(n)?e<=o&&n.indexOf(t,e)>-1:!!o&&Ft(n,t,e)>-1},We.indexOf=function(n,t,e){var r=null==n?0:n.length;if(!r)return-1;var o=null==e?0:gu(e);return o<0&&(o=we(r+o,0)),Ft(n,t,o)},We.inRange=function(t,e,r){return e=mu(e),r===n?(r=e,e=0):r=mu(r),function(n,t,e){return n>=xe(t,e)&&n<we(t,e)}(t=bu(t),e,r)},We.invoke=Nu,We.isArguments=$a,We.isArray=Xa,We.isArrayBuffer=qa,We.isArrayLike=Ga,We.isArrayLikeObject=Ka,We.isBoolean=function(n){return!0===n||!1===n||ou(n)&&Cr(n)==m},We.isBuffer=Za,We.isDate=Ja,We.isElement=function(n){return ou(n)&&1===n.nodeType&&!uu(n)},We.isEmpty=function(n){if(null==n)return!0;if(Ga(n)&&(Xa(n)||"string"==typeof n||"function"==typeof n.splice||Za(n)||pu(n)||$a(n)))return!n.length;var t=gi(n);if(t==S||t==C)return!n.size;if(Pi(n))return!Mr(n).length;for(var e in n)if(jn.call(n,e))return!1;return!0},We.isEqual=function(n,t){return zr(n,t)},We.isEqualWith=function(t,e,r){var o=(r="function"==typeof r?r:n)?r(t,e):n;return o===n?zr(t,e,n,r):!!o},We.isError=Qa,We.isFinite=function(n){return"number"==typeof n&&ge(n)},We.isFunction=nu,We.isInteger=tu,We.isLength=eu,We.isMap=iu,We.isMatch=function(n,t){return n===t||Ir(n,t,di(t))},We.isMatchWith=function(t,e,r){return r="function"==typeof r?r:n,Ir(t,e,di(e),r)},We.isNaN=function(n){return au(n)&&n!=+n},We.isNative=function(n){if(Ti(n))throw new Tn("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");return Dr(n)},We.isNil=function(n){return null==n},We.isNull=function(n){return null===n},We.isNumber=au,We.isObject=ru,We.isObjectLike=ou,We.isPlainObject=uu,We.isRegExp=su,We.isSafeInteger=function(n){return tu(n)&&n>=-9007199254740991&&n<=l},We.isSet=cu,We.isString=lu,We.isSymbol=fu,We.isTypedArray=pu,We.isUndefined=function(t){return t===n},We.isWeakMap=function(n){return ou(n)&&gi(n)==O},We.isWeakSet=function(n){return ou(n)&&"[object WeakSet]"==Cr(n)},We.join=function(n,t){return null==n?"":ye.call(n,t)},We.kebabCase=Xu,We.last=Qi,We.lastIndexOf=function(t,e,r){var o=null==t?0:t.length;if(!o)return-1;var i=o;return r!==n&&(i=(i=gu(r))<0?we(o+i,0):xe(i,o-1)),e==e?function(n,t,e){for(var r=e+1;r--;)if(n[r]===t)return r;return r}(t,e,i):Vt(t,Yt,i,!0)},We.lowerCase=qu,We.lowerFirst=Gu,We.lt=du,We.lte=hu,We.max=function(t){return t&&t.length?gr(t,as,Ar):n},We.maxBy=function(t,e){return t&&t.length?gr(t,fi(e,2),Ar):n},We.mean=function(n){return Ht(n,as)},We.meanBy=function(n,t){return Ht(n,fi(t,2))},We.min=function(t){return t&&t.length?gr(t,as,Vr):n},We.minBy=function(t,e){return t&&t.length?gr(t,fi(e,2),Vr):n},We.stubArray=ys,We.stubFalse=bs,We.stubObject=function(){return{}},We.stubString=function(){return""},We.stubTrue=function(){return!0},We.multiply=Ts,We.nth=function(t,e){return t&&t.length?Ur(t,gu(e)):n},We.noConflict=function(){return dt._===this&&(dt._=Wn),this},We.noop=fs,We.now=La,We.pad=function(n,t,e){n=xu(n);var r=(t=gu(t))?pe(n):0;if(!t||r>=t)return n;var o=(t-r)/2;return Xo(yt(o),e)+n+Xo(gt(o),e)},We.padEnd=function(n,t,e){n=xu(n);var r=(t=gu(t))?pe(n):0;return t&&r<t?n+Xo(t-r,e):n},We.padStart=function(n,t,e){n=xu(n);var r=(t=gu(t))?pe(n):0;return t&&r<t?Xo(t-r,e)+n:n},We.parseInt=function(n,t,e){return e||null==t?t=0:t&&(t=+t),_e(xu(n).replace(rn,""),t||0)},We.random=function(t,e,r){if(r&&"boolean"!=typeof r&&Si(t,e,r)&&(e=r=n),r===n&&("boolean"==typeof e?(r=e,e=n):"boolean"==typeof t&&(r=t,t=n)),t===n&&e===n?(t=0,e=1):(t=mu(t),e===n?(e=t,t=0):e=mu(e)),t>e){var o=t;t=e,e=o}if(r||t%1||e%1){var i=Ee();return xe(t+i*(e-t+ct("1e-"+((i+"").length-1))),e)}return Kr(t,e)},We.reduce=function(n,t,e){var r=Xa(n)?It:Xt,o=arguments.length<3;return r(n,fi(t,4),e,o,hr)},We.reduceRight=function(n,t,e){var r=Xa(n)?Dt:Xt,o=arguments.length<3;return r(n,fi(t,4),e,o,vr)},We.repeat=function(t,e,r){return e=(r?Si(t,e,r):e===n)?1:gu(e),Zr(xu(t),e)},We.replace=function(){var n=arguments,t=xu(n[0]);return n.length<3?t:t.replace(n[1],n[2])},We.result=function(t,e,r){var o=-1,i=(e=So(e,t)).length;for(i||(i=1,t=n);++o<i;){var a=null==t?n:t[Vi(e[o])];a===n&&(o=i,a=r),t=nu(a)?a.call(t):a}return t},We.round=Ps,We.runInContext=x,We.sample=function(n){return(Xa(n)?Qe:Qr)(n)},We.size=function(n){if(null==n)return 0;if(Ga(n))return lu(n)?pe(n):n.length;var t=gi(n);return t==S||t==C?n.size:Mr(n).length},We.snakeCase=Ku,We.some=function(t,e,r){var o=Xa(t)?jt:ao;return r&&Si(t,e,r)&&(e=n),o(t,fi(e,3))},We.sortedIndex=function(n,t){return uo(n,t)},We.sortedIndexBy=function(n,t,e){return so(n,t,fi(e,2))},We.sortedIndexOf=function(n,t){var e=null==n?0:n.length;if(e){var r=uo(n,t);if(r<e&&Ya(n[r],t))return r}return-1},We.sortedLastIndex=function(n,t){return uo(n,t,!0)},We.sortedLastIndexBy=function(n,t,e){return so(n,t,fi(e,2),!0)},We.sortedLastIndexOf=function(n,t){if(null!=n&&n.length){var e=uo(n,t,!0)-1;if(Ya(n[e],t))return e}return-1},We.startCase=Zu,We.startsWith=function(n,t,e){return n=xu(n),e=null==e?0:cr(gu(e),0,n.length),t=fo(t),n.slice(e,e+t.length)==t},We.subtract=Cs,We.sum=function(n){return n&&n.length?qt(n,as):0},We.sumBy=function(n,t){return n&&n.length?qt(n,fi(t,2)):0},We.template=function(t,e,r){var o=We.templateSettings;r&&Si(t,e,r)&&(e=n),t=xu(t),e=Eu({},e,o,ti);var i,a,u=Eu({},e.imports,o.imports,ti),s=zu(u),c=Jt(u,s),l=0,f=e.interpolate||wn,p="__p += '",d=Ln((e.escape||wn).source+"|"+f.source+"|"+(f===Z?pn:wn).source+"|"+(e.evaluate||wn).source+"|$","g"),h="//# sourceURL="+(jn.call(e,"sourceURL")?(e.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++it+"]")+"\n";t.replace(d,(function(n,e,r,o,u,s){return r||(r=o),p+=t.slice(l,s).replace(xn,ie),e&&(i=!0,p+="' +\n__e("+e+") +\n'"),u&&(a=!0,p+="';\n"+u+";\n__p += '"),r&&(p+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),l=s+n.length,n})),p+="';\n";var v=jn.call(e,"variable")&&e.variable;if(v){if(ln.test(v))throw new Tn("Invalid `variable` option passed into `_.template`")}else p="with (obj) {\n"+p+"\n}\n";p=(a?p.replace(W,""):p).replace(Y,"$1").replace(H,"$1;"),p="function("+(v||"obj")+") {\n"+(v?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(i?", __e = _.escape":"")+(a?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+p+"return __p\n}";var m=ts((function(){return Pn(s,h+"return "+p).apply(n,c)}));if(m.source=p,Qa(m))throw m;return m},We.times=function(n,t){if((n=gu(n))<1||n>l)return[];var e=p,r=xe(n,p);t=fi(t),n-=p;for(var o=Gt(r,t);++e<n;)t(e);return o},We.toFinite=mu,We.toInteger=gu,We.toLength=yu,We.toLower=function(n){return xu(n).toLowerCase()},We.toNumber=bu,We.toSafeInteger=function(n){return n?cr(gu(n),-9007199254740991,l):0===n?n:0},We.toString=xu,We.toUpper=function(n){return xu(n).toUpperCase()},We.trim=function(t,e,r){if((t=xu(t))&&(r||e===n))return Kt(t);if(!t||!(e=fo(e)))return t;var o=de(t),i=de(e);return Eo(o,ne(o,i),te(o,i)+1).join("")},We.trimEnd=function(t,e,r){if((t=xu(t))&&(r||e===n))return t.slice(0,he(t)+1);if(!t||!(e=fo(e)))return t;var o=de(t);return Eo(o,0,te(o,de(e))+1).join("")},We.trimStart=function(t,e,r){if((t=xu(t))&&(r||e===n))return t.replace(rn,"");if(!t||!(e=fo(e)))return t;var o=de(t);return Eo(o,ne(o,de(e))).join("")},We.truncate=function(t,e){var r=30,o="...";if(ru(e)){var i="separator"in e?e.separator:i;r="length"in e?gu(e.length):r,o="omission"in e?fo(e.omission):o}var a=(t=xu(t)).length;if(ae(t)){var u=de(t);a=u.length}if(r>=a)return t;var s=r-pe(o);if(s<1)return o;var c=u?Eo(u,0,s).join(""):t.slice(0,s);if(i===n)return c+o;if(u&&(s+=c.length-s),su(i)){if(t.slice(s).search(i)){var l,f=c;for(i.global||(i=Ln(i.source,xu(dn.exec(i))+"g")),i.lastIndex=0;l=i.exec(f);)var p=l.index;c=c.slice(0,p===n?s:p)}}else if(t.indexOf(fo(i),s)!=s){var d=c.lastIndexOf(i);d>-1&&(c=c.slice(0,d))}return c+o},We.unescape=function(n){return(n=xu(n))&&X.test(n)?n.replace(U,ve):n},We.uniqueId=function(n){var t=++Mn;return xu(n)+t},We.upperCase=Ju,We.upperFirst=Qu,We.each=xa,We.eachRight=Sa,We.first=Gi,ls(We,(ws={},Sr(We,(function(n,t){jn.call(We.prototype,t)||(ws[t]=n)})),ws),{chain:!1}),We.VERSION="4.17.21",Ct(["bind","bindKey","curry","curryRight","partial","partialRight"],(function(n){We[n].placeholder=We})),Ct(["drop","take"],(function(t,e){$e.prototype[t]=function(r){r=r===n?1:we(gu(r),0);var o=this.__filtered__&&!e?new $e(this):this.clone();return o.__filtered__?o.__takeCount__=xe(r,o.__takeCount__):o.__views__.push({size:xe(r,p),type:t+(o.__dir__<0?"Right":"")}),o},$e.prototype[t+"Right"]=function(n){return this.reverse()[t](n).reverse()}})),Ct(["filter","map","takeWhile"],(function(n,t){var e=t+1,r=1==e||3==e;$e.prototype[n]=function(n){var t=this.clone();return t.__iteratees__.push({iteratee:fi(n,3),type:e}),t.__filtered__=t.__filtered__||r,t}})),Ct(["head","last"],(function(n,t){var e="take"+(t?"Right":"");$e.prototype[n]=function(){return this[e](1).value()[0]}})),Ct(["initial","tail"],(function(n,t){var e="drop"+(t?"":"Right");$e.prototype[n]=function(){return this.__filtered__?new $e(this):this[e](1)}})),$e.prototype.compact=function(){return this.filter(as)},$e.prototype.find=function(n){return this.filter(n).head()},$e.prototype.findLast=function(n){return this.reverse().find(n)},$e.prototype.invokeMap=Jr((function(n,t){return"function"==typeof n?new $e(this):this.map((function(e){return Rr(e,n,t)}))})),$e.prototype.reject=function(n){return this.filter(Ma(fi(n)))},$e.prototype.slice=function(t,e){t=gu(t);var r=this;return r.__filtered__&&(t>0||e<0)?new $e(r):(t<0?r=r.takeRight(-t):t&&(r=r.drop(t)),e!==n&&(r=(e=gu(e))<0?r.dropRight(-e):r.take(e-t)),r)},$e.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},$e.prototype.toArray=function(){return this.take(p)},Sr($e.prototype,(function(t,e){var r=/^(?:filter|find|map|reject)|While$/.test(e),o=/^(?:head|last)$/.test(e),i=We[o?"take"+("last"==e?"Right":""):e],a=o||/^find/.test(e);i&&(We.prototype[e]=function(){var e=this.__wrapped__,u=o?[1]:arguments,s=e instanceof $e,c=u[0],l=s||Xa(e),f=function(n){var t=i.apply(We,zt([n],u));return o&&p?t[0]:t};l&&r&&"function"==typeof c&&1!=c.length&&(s=l=!1);var p=this.__chain__,d=!!this.__actions__.length,h=a&&!p,v=s&&!d;if(!a&&l){e=v?e:new $e(this);var m=t.apply(e,u);return m.__actions__.push({func:ma,args:[f],thisArg:n}),new Ue(m,p)}return h&&v?t.apply(this,u):(m=this.thru(f),h?o?m.value()[0]:m.value():m)})})),Ct(["pop","push","shift","sort","splice","unshift"],(function(n){var t=Rn[n],e=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",r=/^(?:pop|shift)$/.test(n);We.prototype[n]=function(){var n=arguments;if(r&&!this.__chain__){var o=this.value();return t.apply(Xa(o)?o:[],n)}return this[e]((function(e){return t.apply(Xa(e)?e:[],n)}))}})),Sr($e.prototype,(function(n,t){var e=We[t];if(e){var r=e.name+"";jn.call(Ne,r)||(Ne[r]=[]),Ne[r].push({name:t,func:e})}})),Ne[Yo(n,2).name]=[{name:"wrapper",func:n}],$e.prototype.clone=function(){var n=new $e(this.__wrapped__);return n.__actions__=Ro(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=Ro(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=Ro(this.__views__),n},$e.prototype.reverse=function(){if(this.__filtered__){var n=new $e(this);n.__dir__=-1,n.__filtered__=!0}else(n=this.clone()).__dir__*=-1;return n},$e.prototype.value=function(){var n=this.__wrapped__.value(),t=this.__dir__,e=Xa(n),r=t<0,o=e?n.length:0,i=function(n,t,e){for(var r=-1,o=e.length;++r<o;){var i=e[r],a=i.size;switch(i.type){case"drop":n+=a;break;case"dropRight":t-=a;break;case"take":t=xe(t,n+a);break;case"takeRight":n=we(n,t-a)}}return{start:n,end:t}}(0,o,this.__views__),a=i.start,u=i.end,s=u-a,c=r?u:a-1,l=this.__iteratees__,f=l.length,p=0,d=xe(s,this.__takeCount__);if(!e||!r&&o==s&&d==s)return go(n,this.__actions__);var h=[];n:for(;s--&&p<d;){for(var v=-1,m=n[c+=t];++v<f;){var g=l[v],y=g.iteratee,b=g.type,w=y(m);if(2==b)m=w;else if(!w){if(1==b)continue n;break n}}h[p++]=m}return h},We.prototype.at=ga,We.prototype.chain=function(){return va(this)},We.prototype.commit=function(){return new Ue(this.value(),this.__chain__)},We.prototype.next=function(){this.__values__===n&&(this.__values__=vu(this.value()));var t=this.__index__>=this.__values__.length;return{done:t,value:t?n:this.__values__[this.__index__++]}},We.prototype.plant=function(t){for(var e,r=this;r instanceof He;){var o=Wi(r);o.__index__=0,o.__values__=n,e?i.__wrapped__=o:e=o;var i=o;r=r.__wrapped__}return i.__wrapped__=t,e},We.prototype.reverse=function(){var t=this.__wrapped__;if(t instanceof $e){var e=t;return this.__actions__.length&&(e=new $e(this)),(e=e.reverse()).__actions__.push({func:ma,args:[ra],thisArg:n}),new Ue(e,this.__chain__)}return this.thru(ra)},We.prototype.toJSON=We.prototype.valueOf=We.prototype.value=function(){return go(this.__wrapped__,this.__actions__)},We.prototype.first=We.prototype.head,et&&(We.prototype[et]=function(){return this}),We}();vt?((vt.exports=me)._=me,ht._=me):dt._=me}.call(x);var In=function(n){var e=n.options,a=n.callbacks,u=n.elements,s=n.children,c=n.defaultOptions,l=n.defaultCallbacks,f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(En),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!0);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){try{f.dispatch({type:"RESET_LIGHTBOX"})}catch(n){Ln(n.message="SRL - ERROR WHEN RESETTING THE LIGHTBOX STATUS")}return function(){h.current=!1}}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){function n(n){if(n){var e=n.querySelectorAll("img");e.length>0?f.isLoaded||(An(e).then((function(n){return h.current?function(n){var e,o=[];n.forEach((function(n){o=function(n){var t,e,r,o;return n.getAttribute("srl_gallery_image")||"IMG"===n.nodeName&&("A"===(null===(t=n.offsetParent)||void 0===t?void 0:t.nodeName)||"A"===(null===(e=n.parentNode)||void 0===e?void 0:e.nodeName))||"IMG"===n.nodeName&&"PICTURE"===n.parentNode.nodeName&&"A"===(null===(r=n.offsetParent)||void 0===r?void 0:r.nodeName)||"A"===(null===(o=n.parentNode)||void 0===o?void 0:o.nodeName)}(n)||function(n){return"IMG"===n.nodeName&&"PICTURE"===n.parentNode.nodeName&&n.parentNode.parentNode.className.includes("gatsby-image-wrapper")&&"A"===n.parentNode.parentNode.parentNode.nodeName}(n)?[].concat(Pn(o),[{type:"GALLERY IMAGE",element:n}]):function(n){var t;return"IMG"===n.nodeName&&"A"!==(null===(t=n.parentNode)||void 0===t?void 0:t.nodeName)}(n)?[].concat(Pn(o),[{type:"IMAGE",element:n}]):Pn(o)})),e=0,r(o.map((function(n){var r,o,i,a,u,s,c=n.element,l=n.type;if(!c.ariaHidden){c.setAttribute("srl_elementid",e);var f=null===(r=c.src)||void 0===r?void 0:r.includes("base64"),p=null===(o=c.src)||void 0===o?void 0:o.includes("svg+xml"),d=null===(i=c.offsetParent)||void 0===i?void 0:i.className.includes("gatsby-image-wrapper"),h="picture"!==(null===(a=c.parentNode)||void 0===a?void 0:a.localName),v="presentation"===c.getAttribute("role"),m=(null===(u=c.src)||void 0===u?void 0:u.includes("data:image/gif"))||(null===(s=c.src)||void 0===s?void 0:s.includes("data:image/svg+xml;base64"));if(!(d&&(f||p)&&h||v||m))switch(e++,l){case"IMAGE":var g={id:c.getAttribute("srl_elementid"),source:c.src||c.currentSrc,caption:c.alt,thumbnail:c.src||c.currentSrc,width:c.naturalWidth,height:c.naturalHeight,type:"image"};return Cn(c,g,t),g;case"GALLERY IMAGE":var y={id:c.getAttribute("srl_elementid"),source:c.parentElement.href||c.offsetParent.parentElement.href||c.offsetParent.href||c.parentElement.parentElement.parentElement.href||c.src||c.currentSrc||null,caption:c.alt||c.textContent,thumbnail:c.parentElement.href||c.offsetParent.parentElement.href||c.offsetParent.href||c.parentElement.parentElement.parentElement.href||c.src||c.currentSrc,width:null,height:null,type:"gallery_image"};return Cn(c,y,t),y;default:return}}})).filter((function(n){return void 0!==n})))}(n):null})),Array.from(e).map((function(n){return n.addEventListener("click",(function(n){n.preventDefault()}))}))):u&&function(n){r(n.map((function(n,t){return function(n){return n.src}(n)?{id:t+"",source:n.src||null,caption:n.caption||null,thumbnail:n.thumbnail||n.src||null,type:"image"}:void 0})).filter((function(n){return n&&!n.src})))}(u)}}var t=function(n){if(!Rn.exports.isEqual(n,f.selectedElement))try{f.dispatch({type:"HANDLE_ELEMENT",element:n})}catch(n){Ln(n.message="SRL - ERROR WHEN HANDLING THE ELEMENT")}};function r(n){return function(n,t,e){var r={},o={};r=Rn.exports.isEmpty(n)?zn(zn({},c),{},{buttons:zn({},c.buttons),settings:zn({},c.settings),caption:zn({},c.caption),thumbnails:zn({},c.thumbnails),progressBar:zn({},c.progressBar)}):zn(zn(zn({},c),n),{},{buttons:zn(zn({},c.buttons),n.buttons),settings:zn(zn({},c.settings),n.settings),caption:zn(zn({},c.caption),n.caption),thumbnails:zn(zn({},c.thumbnails),n.thumbnails),progressBar:zn(zn({},c.progressBar),n.progressBar)}),o=Rn.exports.isEmpty(t)?zn({},l):zn(zn({},l),t);var i={options:zn({},r),callbacks:zn({},o)};if(!Rn.exports.isEqual(i.options,f.options)||!Rn.exports.isEqual(i.callbacks,f.callbacks)||!Rn.exports.isEqual(e,f.elements))try{f.dispatch({type:"READY_LIGHTBOX",mergedSettings:i,elements:e})}catch(n){Ln(n.message="SRL - ERROR GRABBING SETTINGS AND ELEMENTS")}}(e,a,n)}d.current=new MutationObserver((function(){n(p.current)})),d.current.observe(p.current,{childList:!0,subtree:!0,attributeFilter:["href","src"]}),n(p.current)}),[f,l,c,e,a,u]),react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{ref:p},s)};function Dn(){return(Dn=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n}).apply(this,arguments)}function jn(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}function Mn(n){var t=Object.create(null);return function(e){return void 0===t[e]&&(t[e]=n(e)),t[e]}}In.propTypes={defaultOptions:mn.shape({settings:mn.shape({autoplaySpeed:mn.number,boxShadow:mn.string,disableKeyboardControls:mn.bool,disablePanzoom:mn.bool,disableWheelControls:mn.bool,downloadedFileName:mn.string,hideControlsAfter:mn.oneOfType([mn.number,mn.bool]),lightboxTransitionSpeed:mn.number,lightboxTransitionTimingFunction:mn.oneOfType([mn.string,mn.array]),overlayColor:mn.string,slideAnimationType:mn.string,slideSpringValues:mn.array,slideTransitionSpeed:mn.number,slideTransitionTimingFunction:mn.oneOfType([mn.string,mn.array]),usingPreact:mn.bool}),buttons:mn.shape({backgroundColor:mn.string,iconColor:mn.string,iconPadding:mn.string,showAutoplayButton:mn.bool,showCloseButton:mn.bool,showDownloadButton:mn.bool,showFullscreenButton:mn.bool,showNextButton:mn.bool,showPrevButton:mn.bool,showThumbnailsButton:mn.bool,size:mn.string}),caption:mn.shape({captionColor:mn.string,captionAlignment:mn.string,captionFontFamily:mn.string,captionFontSize:mn.string,captionFontStyle:mn.string,captionFontWeight:mn.oneOfType([mn.number,mn.string]),captionContainerPadding:mn.string,captionTextTransform:mn.string,showCaption:mn.bool}),thumbnails:mn.shape({showThumbnails:mn.bool,thumbnailsAlignment:mn.string,thumbnailsContainerPadding:mn.string,thumbnailsContainerBackgroundColor:mn.string,thumbnailsGap:mn.string,thumbnailsIconColor:mn.string,thumbnailsOpacity:mn.number,thumbnailsPosition:mn.string,thumbnailsSize:mn.array}),progressBar:mn.shape({backgroundColor:mn.string,fillColor:mn.string,height:mn.string,showProgressBar:mn.bool})}),defaultCallbacks:mn.shape({onCountSlides:mn.func,onLightboxClosed:mn.func,onLightboxOpened:mn.func,onSlideChange:mn.func}),children:mn.oneOfType([mn.arrayOf(mn.node),mn.node]),options:mn.object,callbacks:mn.object,elements:mn.array},In.defaultProps={defaultOptions:{settings:{autoplaySpeed:3e3,boxShadow:"none",disableKeyboardControls:!1,disablePanzoom:!1,disableWheelControls:!1,downloadedFileName:"SRL-image",hideControlsAfter:!1,lightboxTransitionSpeed:.3,lightboxTransitionTimingFunction:"linear",overlayColor:"rgba(30, 30, 30, 0.9)",slideAnimationType:"fade",slideSpringValues:[300,50],slideTransitionSpeed:.6,slideTransitionTimingFunction:"linear",usingPreact:!1},buttons:{backgroundColor:"rgba(30,30,36,0.8)",iconColor:"rgba(255, 255, 255, 0.8)",iconPadding:"10px",showAutoplayButton:!0,showCloseButton:!0,showDownloadButton:!0,showFullscreenButton:!0,showNextButton:!0,showPrevButton:!0,showThumbnailsButton:!0,size:"40px"},caption:{captionAlignment:"start",captionColor:"#FFFFFF",captionContainerPadding:"20px 0 30px 0",captionFontFamily:"inherit",captionFontSize:"inherit",captionFontStyle:"inherit",captionFontWeight:"inherit",captionTextTransform:"inherit",showCaption:!0},thumbnails:{showThumbnails:!0,thumbnailsAlignment:"center",thumbnailsContainerBackgroundColor:"transparent",thumbnailsContainerPadding:"0",thumbnailsGap:"0 1px",thumbnailsIconColor:"#ffffff",thumbnailsOpacity:.4,thumbnailsPosition:"bottom",thumbnailsSize:["100px","80px"]},progressBar:{backgroundColor:"#f2f2f2",fillColor:"#000000",height:"3px",showProgressBar:!0}},defaultCallbacks:{onCountSlides:function(){},onSlideChange:function(){},onLightboxClosed:function(){},onLightboxOpened:function(){}}};var Bn=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Vn=Mn((function(n){return Bn.test(n)||111===n.charCodeAt(0)&&110===n.charCodeAt(1)&&n.charCodeAt(2)<91})),Fn="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};var Wn=function(){function n(n){var t=this;this._insertTag=function(n){var e;e=0===t.tags.length?t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(n,e),t.tags.push(n)},this.isSpeedy=void 0===n.speedy?"production"===(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV):n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.before=null}var t=n.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(n){var t=document.createElement("style");return t.setAttribute("data-emotion",n.key),void 0!==n.nonce&&t.setAttribute("nonce",n.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)){var e=64===n.charCodeAt(0)&&105===n.charCodeAt(1);e&&this._alreadyInsertedOrderInsensitiveRule&&console.error("You're attempting to insert the following rule:\n"+n+"\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."),this._alreadyInsertedOrderInsensitiveRule=this._alreadyInsertedOrderInsensitiveRule||!e}if(this.isSpeedy){var r=function(n){if(n.sheet)return n.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===n)return document.styleSheets[t]}(t);try{r.insertRule(n,r.cssRules.length)}catch(t){"production"===(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)||/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(n)||console.error('There was a problem inserting the following rule: "'+n+'"',t)}}else t.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach((function(n){return n.parentNode.removeChild(n)})),this.tags=[],this.ctr=0,"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(this._alreadyInsertedOrderInsensitiveRule=!1)},n}(),Yn="-ms-",Hn="-moz-",Un="-webkit-",$n=Math.abs,Xn=String.fromCharCode;function qn(n){return n.trim()}function Gn(n,t,e){return n.replace(t,e)}function Kn(n,t){return n.indexOf(t)}function Zn(n,t){return 0|n.charCodeAt(t)}function Jn(n,t,e){return n.slice(t,e)}function Qn(n){return n.length}function nt(n){return n.length}function tt(n,t){return t.push(n),n}var et=1,rt=1,ot=0,it=0,at=0,ut="";function st(n,t,e,r,o,i,a){return{value:n,root:t,parent:e,type:r,props:o,children:i,line:et,column:rt,length:a,return:""}}function ct(n,t,e){return st(n,t.root,t.parent,e,t.props,t.children,0)}function lt(){return at=it>0?Zn(ut,--it):0,rt--,10===at&&(rt=1,et--),at}function ft(){return at=it<ot?Zn(ut,it++):0,rt++,10===at&&(rt=1,et++),at}function pt(){return Zn(ut,it)}function dt(){return it}function ht(n,t){return Jn(ut,n,t)}function vt(n){switch(n){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function mt(n){return et=rt=1,ot=Qn(ut=n),it=0,[]}function gt(n){return ut="",n}function yt(n){return qn(ht(it-1,xt(91===n?n+2:40===n?n+1:n)))}function bt(n){for(;(at=pt())&&at<33;)ft();return vt(n)>2||vt(at)>3?"":" "}function wt(n,t){for(;--t&&ft()&&!(at<48||at>102||at>57&&at<65||at>70&&at<97););return ht(n,dt()+(t<6&&32==pt()&&32==ft()))}function xt(n){for(;ft();)switch(at){case n:return it;case 34:case 39:return xt(34===n||39===n?n:at);case 40:41===n&&xt(n);break;case 92:ft()}return it}function St(n,t){for(;ft()&&n+at!==57&&(n+at!==84||47!==pt()););return"/*"+ht(t,it-1)+"*"+Xn(47===n?n:ft())}function _t(n){for(;!vt(pt());)ft();return ht(n,it)}function Et(n){return gt(Tt("",null,null,null,[""],n=mt(n),0,[0],n))}function Tt(n,t,e,r,o,i,a,u,s){for(var c=0,l=0,f=a,p=0,d=0,h=0,v=1,m=1,g=1,y=0,b="",w=o,x=i,S=r,_=b;m;)switch(h=y,y=ft()){case 34:case 39:case 91:case 40:_+=yt(y);break;case 9:case 10:case 13:case 32:_+=bt(h);break;case 92:_+=wt(dt()-1,7);continue;case 47:switch(pt()){case 42:case 47:tt(Ct(St(ft(),dt()),t,e),s);break;default:_+="/"}break;case 123*v:u[c++]=Qn(_)*g;case 125*v:case 59:case 0:switch(y){case 0:case 125:m=0;case 59+l:d>0&&Qn(_)-f&&tt(d>32?At(_+";",r,e,f-1):At(Gn(_," ","")+";",r,e,f-2),s);break;case 59:_+=";";default:if(tt(S=Pt(_,t,e,c,l,o,u,b,w=[],x=[],f),i),123===y)if(0===l)Tt(_,t,S,S,w,i,f,u,x);else switch(p){case 100:case 109:case 115:Tt(n,S,S,r&&tt(Pt(n,S,S,0,0,o,u,b,o,w=[],f),x),o,x,f,u,r?w:x);break;default:Tt(_,S,S,S,[""],x,f,u,x)}}c=l=d=0,v=g=1,b=_="",f=a;break;case 58:f=1+Qn(_),d=h;default:if(v<1)if(123==y)--v;else if(125==y&&0==v++&&125==lt())continue;switch(_+=Xn(y),y*v){case 38:g=l>0?1:(_+="\f",-1);break;case 44:u[c++]=(Qn(_)-1)*g,g=1;break;case 64:45===pt()&&(_+=yt(ft())),p=pt(),l=Qn(b=_+=_t(dt())),y++;break;case 45:45===h&&2==Qn(_)&&(v=0)}}return i}function Pt(n,t,e,r,o,i,a,u,s,c,l){for(var f=o-1,p=0===o?i:[""],d=nt(p),h=0,v=0,m=0;h<r;++h)for(var g=0,y=Jn(n,f+1,f=$n(v=a[h])),b=n;g<d;++g)(b=qn(v>0?p[g]+" "+y:Gn(y,/&\f/g,p[g])))&&(s[m++]=b);return st(n,t,e,0===o?"rule":u,s,c,l)}function Ct(n,t,e){return st(n,t,e,"comm",Xn(at),Jn(n,2,-2),0)}function At(n,t,e,r){return st(n,t,e,"decl",Jn(n,0,r),Jn(n,r+1,-1),r)}function Lt(n,t){switch(function(n,t){return(((t<<2^Zn(n,0))<<2^Zn(n,1))<<2^Zn(n,2))<<2^Zn(n,3)}(n,t)){case 5103:return Un+"print-"+n+n;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Un+n+n;case 5349:case 4246:case 4810:case 6968:case 2756:return Un+n+Hn+n+Yn+n+n;case 6828:case 4268:return Un+n+Yn+n+n;case 6165:return Un+n+Yn+"flex-"+n+n;case 5187:return Un+n+Gn(n,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+n;case 5443:return Un+n+Yn+"flex-item-"+Gn(n,/flex-|-self/,"")+n;case 4675:return Un+n+Yn+"flex-line-pack"+Gn(n,/align-content|flex-|-self/,"")+n;case 5548:return Un+n+Yn+Gn(n,"shrink","negative")+n;case 5292:return Un+n+Yn+Gn(n,"basis","preferred-size")+n;case 6060:return Un+"box-"+Gn(n,"-grow","")+Un+n+Yn+Gn(n,"grow","positive")+n;case 4554:return Un+Gn(n,/([^-])(transform)/g,"$1-webkit-$2")+n;case 6187:return Gn(Gn(Gn(n,/(zoom-|grab)/,Un+"$1"),/(image-set)/,Un+"$1"),n,"")+n;case 5495:case 3959:return Gn(n,/(image-set\([^]*)/,Un+"$1$`$1");case 4968:return Gn(Gn(n,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+Un+n+n;case 4095:case 3583:case 4068:case 2532:return Gn(n,/(.+)-inline(.+)/,Un+"$1$2")+n;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Qn(n)-1-t>6)switch(Zn(n,t+1)){case 109:if(45!==Zn(n,t+4))break;case 102:return Gn(n,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1"+Hn+(108==Zn(n,t+3)?"$3":"$2-$3"))+n;case 115:return~Kn(n,"stretch")?Lt(Gn(n,"stretch","fill-available"),t)+n:n}break;case 4949:if(115!==Zn(n,t+1))break;case 6444:switch(Zn(n,Qn(n)-3-(~Kn(n,"!important")&&10))){case 107:return Gn(n,":",":"+Un)+n;case 101:return Gn(n,/(.+:)([^;!]+)(;|!.+)?/,"$1"+Un+(45===Zn(n,14)?"inline-":"")+"box$3$1"+Un+"$2$3$1"+Yn+"$2box$3")+n}break;case 5936:switch(Zn(n,t+11)){case 114:return Un+n+Yn+Gn(n,/[svh]\w+-[tblr]{2}/,"tb")+n;case 108:return Un+n+Yn+Gn(n,/[svh]\w+-[tblr]{2}/,"tb-rl")+n;case 45:return Un+n+Yn+Gn(n,/[svh]\w+-[tblr]{2}/,"lr")+n}return Un+n+Yn+n+n}return n}function Ot(n,t){for(var e="",r=nt(n),o=0;o<r;o++)e+=t(n[o],o,n,t)||"";return e}function kt(n,t,e,r){switch(n.type){case"@import":case"decl":return n.return=n.return||n.value;case"comm":return"";case"rule":n.value=n.props.join(",")}return Qn(e=Ot(n.children,r))?n.return=n.value+"{"+e+"}":""}function Rt(n){var t=nt(n);return function(e,r,o,i){for(var a="",u=0;u<t;u++)a+=n[u](e,r,o,i)||"";return a}}var Nt,zt,It=function(n,t){return gt(function(n,t){var e=-1,r=44;do{switch(vt(r)){case 0:38===r&&12===pt()&&(t[e]=1),n[e]+=_t(it-1);break;case 2:n[e]+=yt(r);break;case 4:if(44===r){n[++e]=58===pt()?"&\f":"",t[e]=n[e].length;break}default:n[e]+=Xn(r)}}while(r=ft());return n}(mt(n),t))},Dt=new WeakMap,jt=function(n){if("rule"===n.type&&n.parent&&n.length){for(var t=n.value,e=n.parent,r=n.column===e.column&&n.line===e.line;"rule"!==e.type;)if(!(e=e.parent))return;if((1!==n.props.length||58===t.charCodeAt(0)||Dt.get(e))&&!r){Dt.set(n,!0);for(var o=[],i=It(t,o),a=e.props,u=0,s=0;u<i.length;u++)for(var c=0;c<a.length;c++,s++)n.props[s]=o[u]?i[u].replace(/&\f/g,a[c]):a[c]+" "+i[u]}}},Mt=function(n){if("decl"===n.type){var t=n.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(n.return="",n.value="")}},Bt=function(n){return 105===n.type.charCodeAt(1)&&64===n.type.charCodeAt(0)},Vt=function(n){n.type="",n.value="",n.return="",n.children="",n.props=""},Ft=function(n,t,e){Bt(n)&&(n.parent?(console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."),Vt(n)):function(n,t){for(var e=n-1;e>=0;e--)if(!Bt(t[e]))return!0;return!1}(t,e)&&(console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."),Vt(n)))},Wt="undefined"!=typeof document,Yt=Wt?void 0:(Nt=function(){return Mn((function(){var n={};return function(t){return n[t]}}))},zt=new WeakMap,function(n){if(zt.has(n))return zt.get(n);var t=Nt(n);return zt.set(n,t),t}),Ht=[function(n,t,e,r){if(!n.return)switch(n.type){case"decl":n.return=Lt(n.value,n.length);break;case"@keyframes":return Ot([ct(Gn(n.value,"@","@"+Un),n,"")],r);case"rule":if(n.length)return function(n,t){return n.map(t).join("")}(n.props,(function(t){switch(function(n,t){return(n=t.exec(n))?n[0]:n}(t,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Ot([ct(Gn(t,/:(read-\w+)/,":-moz-$1"),n,"")],r);case"::placeholder":return Ot([ct(Gn(t,/:(plac\w+)/,":-webkit-input-$1"),n,""),ct(Gn(t,/:(plac\w+)/,":-moz-$1"),n,""),ct(Gn(t,/:(plac\w+)/,Yn+"input-$1"),n,"")],r)}return""}))}}],Ut=function(n){var t=n.key;if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&!t)throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");if(Wt&&"css"===t){var e=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(e,(function(n){-1!==n.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(n),n.setAttribute("data-s",""))}))}var r=n.stylisPlugins||Ht;if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&/[^a-z-]/.test(t))throw new Error('Emotion key must only contain lower case alphabetical characters and - but "'+t+'" was passed');var o,i,a={},u=[];Wt&&(o=n.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(n){for(var t=n.getAttribute("data-emotion").split(" "),e=1;e<t.length;e++)a[t[e]]=!0;u.push(n)})));var s,c=[jt,Mt];if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&c.push(function(n){return function(t,e,r){if("rule"===t.type){var o,i=t.value.match(/(:first|:nth|:nth-last)-child/g);if(i&&!0!==n.compat){var a=e>0?r[e-1]:null;if(a&&function(n){return!!n&&"comm"===n.type&&n.children.indexOf("emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason")>-1}((o=a.children).length?o[o.length-1]:null))return;i.forEach((function(n){console.error('The pseudo class "'+n+'" is potentially unsafe when doing server-side rendering. Try changing it to "'+n.split("-child")[0]+'-of-type".')}))}}}}({get compat(){return g.compat}}),Ft),Wt){var l,f=[kt,"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)?function(n){n.root||(n.return?l.insert(n.return):n.value&&"comm"!==n.type&&l.insert(n.value+"{}"))}:(s=function(n){l.insert(n)},function(n){n.root||(n=n.return)&&s(n)})],p=Rt(c.concat(r,f));i=function(n,t,e,r){l=e,"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0!==t.map&&(l={insert:function(n){e.insert(n+t.map)}}),function(n){Ot(Et(n),p)}(n?n+"{"+t.styles+"}":t.styles),r&&(g.inserted[t.name]=!0)}}else{var d=[kt],h=Rt(c.concat(r,d)),v=Yt(r)(t),m=function(n,t){var e=t.name;return void 0===v[e]&&(v[e]=function(n){return Ot(Et(n),h)}(n?n+"{"+t.styles+"}":t.styles)),v[e]};i=function(n,t,e,r){var o=t.name,i=m(n,t);return void 0===g.compat?(r&&(g.inserted[o]=!0),"development"===(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0!==t.map?i+t.map:i):r?void(g.inserted[o]=i):i}}var g={key:t,sheet:new Wn({key:t,container:o,nonce:n.nonce,speedy:n.speedy,prepend:n.prepend}),nonce:n.nonce,inserted:a,registered:{},insert:i};return g.sheet.hydrate(u),g},$t=_.exports,Xt={};Xt[$t.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Xt[$t.Memo]={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0};var qt="undefined"!=typeof document;function Gt(n,t,e){var r="";return e.split(" ").forEach((function(e){void 0!==n[e]?t.push(n[e]+";"):r+=e+" "})),r}var Kt=function(n,t,e){var r=n.key+"-"+t.name;if((!1===e||!1===qt&&void 0!==n.compat)&&void 0===n.registered[r]&&(n.registered[r]=t.styles),void 0===n.inserted[t.name]){var o="",i=t;do{var a=n.insert(t===i?"."+r:"",i,n.sheet,!0);qt||void 0===a||(o+=a),i=i.next}while(void 0!==i);if(!qt&&0!==o.length)return o}};var Zt={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Jt="You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",Qt="You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",ne=/[A-Z]|^ms/g,te=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ee=function(n){return 45===n.charCodeAt(1)},re=function(n){return null!=n&&"boolean"!=typeof n},oe=Mn((function(n){return ee(n)?n:n.replace(ne,"-$&").toLowerCase()})),ie=function(n,t){switch(n){case"animation":case"animationName":if("string"==typeof t)return t.replace(te,(function(n,t,e){return he={name:t,styles:e,next:he},t}))}return 1===Zt[n]||ee(n)||"number"!=typeof t||0===t?t:t+"px"};if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)){var ae=/(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,ue=["normal","none","initial","inherit","unset"],se=ie,ce=/^-ms-/,le=/-(.)/g,fe={};ie=function(n,t){if("content"===n&&("string"!=typeof t||-1===ue.indexOf(t)&&!ae.test(t)&&(t.charAt(0)!==t.charAt(t.length-1)||'"'!==t.charAt(0)&&"'"!==t.charAt(0))))throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\""+t+"\"'`");var e=se(n,t);return""===e||ee(n)||-1===n.indexOf("-")||void 0!==fe[n]||(fe[n]=!0,console.error("Using kebab-case for css properties in objects is not supported. Did you mean "+n.replace(ce,"ms-").replace(le,(function(n,t){return t.toUpperCase()}))+"?")),e}}function pe(n,t,e){if(null==e)return"";if(void 0!==e.__emotion_styles){if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&"NO_COMPONENT_SELECTOR"===e.toString())throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");return e}switch(typeof e){case"boolean":return"";case"object":if(1===e.anim)return he={name:e.name,styles:e.styles,next:he},e.name;if(void 0!==e.styles){var r=e.next;if(void 0!==r)for(;void 0!==r;)he={name:r.name,styles:r.styles,next:he},r=r.next;var o=e.styles+";";return"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0!==e.map&&(o+=e.map),o}return function(n,t,e){var r="";if(Array.isArray(e))for(var o=0;o<e.length;o++)r+=pe(n,t,e[o])+";";else for(var i in e){var a=e[i];if("object"!=typeof a)null!=t&&void 0!==t[a]?r+=i+"{"+t[a]+"}":re(a)&&(r+=oe(i)+":"+ie(i,a)+";");else{if("NO_COMPONENT_SELECTOR"===i&&"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV))throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");if(!Array.isArray(a)||"string"!=typeof a[0]||null!=t&&void 0!==t[a[0]]){var u=pe(n,t,a);switch(i){case"animation":case"animationName":r+=oe(i)+":"+u+";";break;default:"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&"undefined"===i&&console.error(Qt),r+=i+"{"+u+"}"}}else for(var s=0;s<a.length;s++)re(a[s])&&(r+=oe(i)+":"+ie(i,a[s])+";")}}return r}(n,t,e);case"function":if(void 0!==n){var i=he,a=e(n);return he=i,pe(n,t,a)}"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");break;case"string":if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)){var u=[],s=e.replace(te,(function(n,t,e){var r="animation"+u.length;return u.push("const "+r+" = keyframes`"+e.replace(/^@keyframes animation-\w+/,"")+"`"),"${"+r+"}"}));u.length&&console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n"+[].concat(u,["`"+s+"`"]).join("\n")+"\n\nYou should wrap it with `css` like this:\n\ncss`"+s+"`")}}if(null==t)return e;var c=t[e];return void 0!==c?c:e}var de,he,ve=/label:\s*([^\s;\n{]+)\s*(;|$)/g;"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(de=/\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);var me=function(n,t,e){if(1===n.length&&"object"==typeof n[0]&&null!==n[0]&&void 0!==n[0].styles)return n[0];var r=!0,o="";he=void 0;var i,a=n[0];null==a||void 0===a.raw?(r=!1,o+=pe(e,t,a)):("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0===a[0]&&console.error(Jt),o+=a[0]);for(var u=1;u<n.length;u++)o+=pe(e,t,n[u]),r&&("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0===a[u]&&console.error(Jt),o+=a[u]);"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(o=o.replace(de,(function(n){return i=n,""}))),ve.lastIndex=0;for(var s,c="";null!==(s=ve.exec(o));)c+="-"+s[1];var l=function(n){for(var t,e=0,r=0,o=n.length;o>=4;++r,o-=4)t=1540483477*(65535&(t=255&n.charCodeAt(r)|(255&n.charCodeAt(++r))<<8|(255&n.charCodeAt(++r))<<16|(255&n.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),e=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&e)+(59797*(e>>>16)<<16);switch(o){case 3:e^=(255&n.charCodeAt(r+2))<<16;case 2:e^=(255&n.charCodeAt(r+1))<<8;case 1:e=1540483477*(65535&(e^=255&n.charCodeAt(r)))+(59797*(e>>>16)<<16)}return(((e=1540483477*(65535&(e^=e>>>13))+(59797*(e>>>16)<<16))^e>>>15)>>>0).toString(36)}(o)+c;return"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)?{name:l,styles:o,map:i,next:he,toString:function(){return"You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."}}:{name:l,styles:o,next:he}},ge="undefined"!=typeof document,ye=Object.prototype.hasOwnProperty,be=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)("undefined"!=typeof HTMLElement?Ut({key:"css"}):null);"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(be.displayName="EmotionCacheContext"),be.Provider;var we=function(n){return (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((function(t,e){var o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(be);return n(t,o,e)}))};ge||(we=function(n){return function(t){var e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(be);return null===e?(e=Ut({key:"css"}),(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(be.Provider,{value:e},n(t,e))):n(t,e)}});var xe=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(xe.displayName="EmotionThemeContext");var Se=we((function(n,t,e){var o=n.css;"string"==typeof o&&void 0!==t.registered[o]&&(o=t.registered[o]);var i=n.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,a=[o],s="";"string"==typeof n.className?s=Gt(t.registered,a,n.className):null!=n.className&&(s=n.className+" ");var l=me(a,void 0,(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(xe));if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&-1===l.name.indexOf("-")){var f=n.__EMOTION_LABEL_PLEASE_DO_NOT_USE__;f&&(l=me([l,"label:"+f+";"]))}var p=Kt(t,l,"string"==typeof i);s+=t.key+"-"+l.name;var d={};for(var h in n)!ye.call(n,h)||"css"===h||"__EMOTION_TYPE_PLEASE_DO_NOT_USE__"===h||"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&"__EMOTION_LABEL_PLEASE_DO_NOT_USE__"===h||(d[h]=n[h]);d.ref=e,d.className=s;var v=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(i,d);if(!ge&&void 0!==p){for(var m,g=l.name,y=l.next;void 0!==y;)g+=" "+y.name,y=y.next;return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style",((m={})["data-emotion"]=t.key+" "+g,m.dangerouslySetInnerHTML={__html:p},m.nonce=t.sheet.nonce,m)),v)}return v}));"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(Se.displayName="EmotionCssPropInternal");var _e=!1,Ee=we((function(n,t){"production"===(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)||_e||!n.className&&!n.css||(console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"),_e=!0);var e=n.styles,i=me([e],void 0,(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(xe));if(!ge){for(var a,s=i.name,c=i.styles,f=i.next;void 0!==f;)s+=" "+f.name,c+=f.styles,f=f.next;var p=!0===t.compat,d=t.insert("",{name:s,styles:c},t.sheet,p);return p?null:(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style",((a={})["data-emotion"]=t.key+"-global "+s,a.dangerouslySetInnerHTML={__html:d},a.nonce=t.sheet.nonce,a))}var h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();return (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((function(){var n=t.key+"-global",e=new Wn({key:n,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),r=!1,o=document.querySelector('style[data-emotion="'+n+" "+i.name+'"]');return t.sheet.tags.length&&(e.before=t.sheet.tags[0]),null!==o&&(r=!0,o.setAttribute("data-emotion",n),e.hydrate([o])),h.current=[e,r],function(){e.flush()}}),[t]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((function(){var n=h.current,e=n[0];if(n[1])n[1]=!1;else{if(void 0!==i.next&&Kt(t,i.next,!0),e.tags.length){var r=e.tags[e.tags.length-1].nextElementSibling;e.before=r,e.flush()}t.insert("",i,e,!1)}}),[t,i.name]),null}));function Te(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return me(t)}"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(Ee.displayName="EmotionGlobal");var Pe=function n(t){for(var e=t.length,r=0,o="";r<e;r++){var i=t[r];if(null!=i){var a=void 0;switch(typeof i){case"boolean":break;case"object":if(Array.isArray(i))a=n(i);else for(var u in"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0!==i.styles&&void 0!==i.name&&console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component."),a="",i)i[u]&&u&&(a&&(a+=" "),a+=u);break;default:a=i}a&&(o&&(o+=" "),o+=a)}}return o};function Ce(n,t,e){var r=[],o=Gt(n,r,e);return r.length<2?e:o+t(r)}var Ae=we((function(n,t){var e,o="",i="",a=!1,s=function(){if(a&&"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV))throw new Error("css can only be used during render");for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];var u=me(e,t.registered);if(ge)Kt(t,u,!1);else{var s=Kt(t,u,!1);void 0!==s&&(o+=s)}return ge||(i+=" "+u.name),t.key+"-"+u.name},l={css:s,cx:function(){if(a&&"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV))throw new Error("cx can only be used during render");for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];return Ce(t.registered,s,Pe(e))},theme:(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(xe)},f=n.children(l);return a=!0,ge||0===o.length?f:(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style",((e={})["data-emotion"]=t.key+" "+i.substring(1),e.dangerouslySetInnerHTML={__html:o},e.nonce=t.sheet.nonce,e)),f)}));if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(Ae.displayName="EmotionClassNames"),"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)){var Le="undefined"!=typeof document,Oe="undefined"!=typeof jest;if(Le&&!Oe){var ke=Le?window:Fn,Re="__EMOTION_REACT_"+"11.4.1".split(".")[0]+"__";ke[Re]&&console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."),ke[Re]=!0}}var Ne=Vn,ze=function(n){return"theme"!==n},Ie=function(n){return"string"==typeof n&&n.charCodeAt(0)>96?Ne:ze},De=function(n,t,e){var r;if(t){var o=t.shouldForwardProp;r=n.__emotion_forwardProp&&o?function(t){return n.__emotion_forwardProp(t)&&o(t)}:o}return"function"!=typeof r&&e&&(r=n.__emotion_forwardProp),r},je="You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",Me="undefined"!=typeof document,Be=function n(t,e){if("production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0===t)throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");var o,i,a=t.__emotion_real===t,s=a&&t.__emotion_base||t;void 0!==e&&(o=e.label,i=e.target);var l=De(t,e,a),f=l||Ie(s),p=!f("as");return function(){var d=arguments,h=a&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==o&&h.push("label:"+o+";"),null==d[0]||void 0===d[0].raw)h.push.apply(h,d);else{"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0===d[0][0]&&console.error(je),h.push(d[0][0]);for(var v=d.length,m=1;m<v;m++)"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&void 0===d[0][m]&&console.error(je),h.push(d[m],d[0][m])}var g=we((function(n,t,e){var o=p&&n.as||s,a="",d=[],v=n;if(null==n.theme){for(var m in v={},n)v[m]=n[m];v.theme=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(xe)}"string"==typeof n.className?a=Gt(t.registered,d,n.className):null!=n.className&&(a=n.className+" ");var g=me(h.concat(d),t.registered,v),y=Kt(t,g,"string"==typeof o);a+=t.key+"-"+g.name,void 0!==i&&(a+=" "+i);var b=p&&void 0===l?Ie(o):f,w={};for(var x in n)p&&"as"===x||b(x)&&(w[x]=n[x]);w.className=a,w.ref=e;var S=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(o,w);if(!Me&&void 0!==y){for(var _,E=g.name,T=g.next;void 0!==T;)E+=" "+T.name,T=T.next;return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style",((_={})["data-emotion"]=t.key+" "+E,_.dangerouslySetInnerHTML={__html:y},_.nonce=t.sheet.nonce,_)),S)}return S}));return g.displayName=void 0!==o?o:"Styled("+("string"==typeof s?s:s.displayName||s.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=s,g.__emotion_styles=h,g.__emotion_forwardProp=l,Object.defineProperty(g,"toString",{value:function(){return void 0===i&&"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)?"NO_COMPONENT_SELECTOR":"."+i}}),g.withComponent=function(t,r){return n(t,Dn({},e,r,{shouldForwardProp:De(g,r,!0)})).apply(void 0,h)},g}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(n){Be[n]=Be(n)}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Ve=function(n,t){return(Ve=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)};function Fe(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=n}Ve(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}var We=function(){return(We=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++)for(var o in t=arguments[e])Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}).apply(this,arguments)};function Ye(n,t){var e={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.indexOf(r)<0&&(e[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(n);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(n,r[o])&&(e[r[o]]=n[r[o]])}return e}function He(n,t){var e="function"==typeof Symbol&&n[Symbol.iterator];if(!e)return n;var r,o,i=e.call(n),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(n){o={error:n}}finally{try{r&&!r.done&&(e=i.return)&&e.call(i)}finally{if(o)throw o.error}}return a}function Ue(n,t,e){if(e||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return n.concat(r||Array.prototype.slice.call(t))}var $e=function(n){return{isEnabled:function(t){return n.some((function(n){return!!t[n]}))}}},Xe={measureLayout:$e(["layout","layoutId","drag","_layoutResetTransform"]),animation:$e(["animate","exit","variants","whileHover","whileTap","whileFocus","whileDrag"]),exit:$e(["exit"]),drag:$e(["drag","dragControls"]),focus:$e(["whileFocus"]),hover:$e(["whileHover","onHoverStart","onHoverEnd"]),tap:$e(["whileTap","onTap","onTapStart","onTapCancel"]),pan:$e(["onPan","onPanStart","onPanSessionStart","onPanEnd"]),layoutAnimation:$e(["layout","layoutId"])};var qe=function(){},Ge=function(){};"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&(qe=function(n,t){n||"undefined"==typeof console||console.warn(t)},Ge=function(n,t){if(!n)throw new Error(t)});var Ke=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({strict:!1}),Ze=Object.keys(Xe),Je=Ze.length;var Qe=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({transformPagePoint:function(n){return n},isStatic:!1}),nr=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});var tr=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function er(n){var t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return null===t.current&&(t.current=n()),t.current}function rr(){var n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(tr);if(null===n)return[!0,null];var t=n.isPresent,e=n.onExitComplete,o=n.register,a=ar();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return o(a)}),[]);return!t&&e?[!1,function(){return null==e?void 0:e(a)}]:[!0]}var or=0,ir=function(){return or++},ar=function(){return er(ir)},ur=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null),sr="undefined"!=typeof window,cr=sr?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect;function lr(n,t,e,a){var u=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Qe),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Ke),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(nr).visualElement,l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(tr),f=function(n){var t=n.layoutId,e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ur);return e&&void 0!==t?e+"-"+t:t}(e),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);a||(a=s.renderer),!p.current&&a&&(p.current=a(n,{visualState:t,parent:c,props:We(We({},e),{layoutId:f}),presenceId:null==l?void 0:l.id,blockInitialAnimation:!1===(null==l?void 0:l.initial)}));var d=p.current;return cr((function(){var n;d&&(d.setProps(We(We(We({},u),e),{layoutId:f})),d.isPresent=null===(n=l)||n.isPresent,d.isPresenceRoot=!c||c.presenceId!==(null==l?void 0:l.id),d.syncRender())})),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var n;d&&(null===(n=d.animationState)||void 0===n||n.animateChanges())})),cr((function(){return function(){return null==d?void 0:d.notifyUnmount()}}),[]),d}function fr(n){return"object"==typeof n&&Object.prototype.hasOwnProperty.call(n,"current")}function pr(n){return Array.isArray(n)}function dr(n){return"string"==typeof n||pr(n)}function hr(n,t,e,r,o){var i;return void 0===r&&(r={}),void 0===o&&(o={}),"string"==typeof t&&(t=null===(i=n.variants)||void 0===i?void 0:i[t]),"function"==typeof t?t(null!=e?e:n.custom,r,o):t}function vr(n,t,e){var r=n.getProps();return hr(r,t,null!=e?e:r.custom,function(n){var t={};return n.forEachValue((function(n,e){return t[e]=n.get()})),t}(n),function(n){var t={};return n.forEachValue((function(n,e){return t[e]=n.getVelocity()})),t}(n))}function mr(n){var t;return"function"==typeof(null===(t=n.animate)||void 0===t?void 0:t.start)||dr(n.initial)||dr(n.animate)||dr(n.whileHover)||dr(n.whileDrag)||dr(n.whileTap)||dr(n.whileFocus)||dr(n.exit)}function gr(n){return Boolean(mr(n)||n.variants)}function yr(n,t){var e=function(n,t){if(mr(n)){var e=n.initial,r=n.animate;return{initial:!1===e||dr(e)?e:void 0,animate:dr(r)?r:void 0}}return!1!==n.inherit?t:{}}(n,(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(nr)),o=e.initial,i=e.animate;return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return{initial:o,animate:i}}),t?[br(o),br(i)]:[])}function br(n){return Array.isArray(n)?n.join(" "):n}function wr(t){var e=t.preloadedFeatures,o=t.createVisualElement,i=t.useRender,u=t.useVisualState,s=t.Component;return e&&function(n){for(var t in n){var e=n[t];null!==e&&(Xe[t].Component=e)}}(e),(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((function(t,a){var c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Qe).isStatic,l=null,p=yr(t,c),d=u(t,c);return!c&&sr&&(p.visualElement=lr(s,d,t,o),l=function(t,e,o){var i=[],a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Ke);if(!e)return null;"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&o&&a.strict&&Ge(!1,"You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");for(var u=0;u<Je;u++){var s=Ze[u],c=Xe[s],l=c.isEnabled,f=c.Component;l(t)&&f&&i.push(react__WEBPACK_IMPORTED_MODULE_0__.createElement(f,We({key:s},t,{visualElement:e})))}return i}(t,p.visualElement,e)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(nr.Provider,{value:p},i(s,t,function(n,t,e){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(r){var o;r&&(null===(o=n.mount)||void 0===o||o.call(n,r)),t&&(r?t.mount(r):t.unmount()),e&&("function"==typeof e?e(r):fr(e)&&(e.current=r))}),[t])}(d,p.visualElement,a),d,c)),l)}))}function xr(n){function t(t,e){return void 0===e&&(e={}),wr(n(t,e))}var e=new Map;return new Proxy(t,{get:function(n,r){return e.has(r)||e.set(r,t(r)),e.get(r)}})}var Sr=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","svg","switch","symbol","text","tspan","use","view"];function _r(n){return"string"==typeof n&&!n.includes("-")&&!!(Sr.indexOf(n)>-1||/[A-Z]/.test(n))}var Er={};var Tr=["","X","Y","Z"],Pr=["transformPerspective","x","y","z"];function Cr(n,t){return Pr.indexOf(n)-Pr.indexOf(t)}["translate","scale","rotate","skew"].forEach((function(n){return Tr.forEach((function(t){return Pr.push(n+t)}))}));var Ar=new Set(Pr);function Lr(n){return Ar.has(n)}var Or=new Set(["originX","originY","originZ"]);function kr(n){return Or.has(n)}function Rr(n,t){var e=t.layout,r=t.layoutId;return Lr(n)||kr(n)||(e||void 0!==r)&&(!!Er[n]||"opacity"===n)}var Nr=function(n){return null!==n&&"object"==typeof n&&n.getVelocity},zr={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"};function Ir(n){return n.startsWith("--")}var Dr=function(n,t){return t&&"number"==typeof n?t.transform(n):n},jr=function(n,t){return function(e){return Math.max(Math.min(e,t),n)}},Mr=function(n){return n%1?Number(n.toFixed(5)):n},Br=/(-)?([\d]*\.?[\d])+/g,Vr=/(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi,Fr=/^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;function Wr(n){return"string"==typeof n}var Yr={test:function(n){return"number"==typeof n},parse:parseFloat,transform:function(n){return n}},Hr=We(We({},Yr),{transform:jr(0,1)}),Ur=We(We({},Yr),{default:1}),$r=function(n){return{test:function(t){return Wr(t)&&t.endsWith(n)&&1===t.split(" ").length},parse:parseFloat,transform:function(t){return""+t+n}}},Xr=$r("deg"),qr=$r("%"),Gr=$r("px"),Kr=$r("vh"),Zr=$r("vw"),Jr=We(We({},qr),{parse:function(n){return qr.parse(n)/100},transform:function(n){return qr.transform(100*n)}}),Qr=function(n,t){return function(e){return Boolean(Wr(e)&&Fr.test(e)&&e.startsWith(n)||t&&Object.prototype.hasOwnProperty.call(e,t))}},no=function(n,t,e){return function(r){var o;if(!Wr(r))return r;var i=r.match(Br),a=i[0],u=i[1],s=i[2],c=i[3];return(o={})[n]=parseFloat(a),o[t]=parseFloat(u),o[e]=parseFloat(s),o.alpha=void 0!==c?parseFloat(c):1,o}},to={test:Qr("hsl","hue"),parse:no("hue","saturation","lightness"),transform:function(n){var t=n.hue,e=n.saturation,r=n.lightness,o=n.alpha,i=void 0===o?1:o;return"hsla("+Math.round(t)+", "+qr.transform(Mr(e))+", "+qr.transform(Mr(r))+", "+Mr(Hr.transform(i))+")"}},eo=jr(0,255),ro=We(We({},Yr),{transform:function(n){return Math.round(eo(n))}}),oo={test:Qr("rgb","red"),parse:no("red","green","blue"),transform:function(n){var t=n.red,e=n.green,r=n.blue,o=n.alpha,i=void 0===o?1:o;return"rgba("+ro.transform(t)+", "+ro.transform(e)+", "+ro.transform(r)+", "+Mr(Hr.transform(i))+")"}};var io={test:Qr("#"),parse:function(n){var t="",e="",r="",o="";return n.length>5?(t=n.substr(1,2),e=n.substr(3,2),r=n.substr(5,2),o=n.substr(7,2)):(t=n.substr(1,1),e=n.substr(2,1),r=n.substr(3,1),o=n.substr(4,1),t+=t,e+=e,r+=r,o+=o),{red:parseInt(t,16),green:parseInt(e,16),blue:parseInt(r,16),alpha:o?parseInt(o,16)/255:1}},transform:oo.transform},ao={test:function(n){return oo.test(n)||io.test(n)||to.test(n)},parse:function(n){return oo.test(n)?oo.parse(n):to.test(n)?to.parse(n):io.parse(n)},transform:function(n){return Wr(n)?n:n.hasOwnProperty("red")?oo.transform(n):to.transform(n)}};function uo(n){var t=[],e=0,r=n.match(Vr);r&&(e=r.length,n=n.replace(Vr,"${c}"),t.push.apply(t,r.map(ao.parse)));var o=n.match(Br);return o&&(n=n.replace(Br,"${n}"),t.push.apply(t,o.map(Yr.parse))),{values:t,numColors:e,tokenised:n}}function so(n){return uo(n).values}function co(n){var t=uo(n),e=t.values,r=t.numColors,o=t.tokenised,i=e.length;return function(n){for(var t=o,e=0;e<i;e++)t=t.replace(e<r?"${c}":"${n}",e<r?ao.transform(n[e]):Mr(n[e]));return t}}var lo=function(n){return"number"==typeof n?0:n};var fo={test:function(n){var t,e,r,o;return isNaN(n)&&Wr(n)&&(null!==(e=null===(t=n.match(Br))||void 0===t?void 0:t.length)&&void 0!==e?e:0)+(null!==(o=null===(r=n.match(Vr))||void 0===r?void 0:r.length)&&void 0!==o?o:0)>0},parse:so,createTransformer:co,getAnimatableNone:function(n){var t=so(n);return co(n)(t.map(lo))}},po=new Set(["brightness","contrast","saturate","opacity"]);function ho(n){var t=n.slice(0,-1).split("("),e=t[0],r=t[1];if("drop-shadow"===e)return n;var o=(r.match(Br)||[])[0];if(!o)return n;var i=r.replace(o,""),a=po.has(e)?1:0;return o!==r&&(a*=100),e+"("+a+i+")"}var vo=/([a-z-]*)\(.*?\)/g,mo=We(We({},fo),{getAnimatableNone:function(n){var t=n.match(vo);return t?t.map(ho).join(" "):n}}),go=We(We({},Yr),{transform:Math.round}),yo={borderWidth:Gr,borderTopWidth:Gr,borderRightWidth:Gr,borderBottomWidth:Gr,borderLeftWidth:Gr,borderRadius:Gr,radius:Gr,borderTopLeftRadius:Gr,borderTopRightRadius:Gr,borderBottomRightRadius:Gr,borderBottomLeftRadius:Gr,width:Gr,maxWidth:Gr,height:Gr,maxHeight:Gr,size:Gr,top:Gr,right:Gr,bottom:Gr,left:Gr,padding:Gr,paddingTop:Gr,paddingRight:Gr,paddingBottom:Gr,paddingLeft:Gr,margin:Gr,marginTop:Gr,marginRight:Gr,marginBottom:Gr,marginLeft:Gr,rotate:Xr,rotateX:Xr,rotateY:Xr,rotateZ:Xr,scale:Ur,scaleX:Ur,scaleY:Ur,scaleZ:Ur,skew:Xr,skewX:Xr,skewY:Xr,distance:Gr,translateX:Gr,translateY:Gr,translateZ:Gr,x:Gr,y:Gr,z:Gr,perspective:Gr,transformPerspective:Gr,opacity:Hr,originX:Jr,originY:Jr,originZ:Gr,zIndex:go,fillOpacity:Hr,strokeOpacity:Hr,numOctaves:go};function bo(n,t,e,r,o,i,a,u){var s,c=n.style,l=n.vars,f=n.transform,p=n.transformKeys,d=n.transformOrigin;p.length=0;var h=!1,v=!1,m=!0;for(var g in t){var y=t[g];if(Ir(g))l[g]=y;else{var b=yo[g],w=Dr(y,b);if(Lr(g)){if(h=!0,f[g]=w,p.push(g),!m)continue;y!==(null!==(s=b.default)&&void 0!==s?s:0)&&(m=!1)}else if(kr(g))d[g]=w,v=!0;else if((null==e?void 0:e.isHydrated)&&(null==r?void 0:r.isHydrated)&&Er[g]){var x=Er[g].process(y,r,e),S=Er[g].applyTo;if(S)for(var _=S.length,E=0;E<_;E++)c[S[E]]=x;else c[g]=x}else c[g]=w}}r&&e&&a&&u?(c.transform=a(r.deltaFinal,r.treeScale,h?f:void 0),i&&(c.transform=i(f,c.transform)),c.transformOrigin=u(r)):(h&&(c.transform=function(n,t,e,r){var o=n.transform,i=n.transformKeys,a=t.enableHardwareAcceleration,u=void 0===a||a,s=t.allowTransformNone,c=void 0===s||s,l="";i.sort(Cr);for(var f=!1,p=i.length,d=0;d<p;d++){var h=i[d];l+=(zr[h]||h)+"("+o[h]+") ","z"===h&&(f=!0)}return!f&&u?l+="translateZ(0)":l=l.trim(),r?l=r(o,e?"":l):c&&e&&(l="none"),l}(n,o,m,i)),v&&(c.transformOrigin=function(n){var t=n.originX,e=void 0===t?"50%":t,r=n.originY,o=void 0===r?"50%":r,i=n.originZ;return e+" "+o+" "+(void 0===i?0:i)}(d)))}var wo=function(){return{style:{},transform:{},transformKeys:[],transformOrigin:{},vars:{}}};function xo(n,t,e){for(var r in t)Nr(t[r])||Rr(r,e)||(n[r]=t[r])}function So(n,t,e){var r={};return xo(r,n.style||{},n),Object.assign(r,function(n,t,e){var r=n.transformTemplate;return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){var n={style:{},transform:{},transformKeys:[],transformOrigin:{},vars:{}};bo(n,t,void 0,void 0,{enableHardwareAcceleration:!e},r);var o=n.style;return We(We({},n.vars),o)}),[t])}(n,t,e)),n.transformValues&&(r=n.transformValues(r)),r}function _o(n,t,e){var r={},o=So(n,t,e);return Boolean(n.drag)&&(r.draggable=!1,o.userSelect=o.WebkitUserSelect=o.WebkitTouchCallout="none",o.touchAction=!0===n.drag?"none":"pan-"+("x"===n.drag?"y":"x")),r.style=o,r}var Eo=new Set(["initial","animate","exit","style","variants","transition","transformTemplate","transformValues","custom","inherit","layout","layoutId","_layoutResetTransform","onLayoutAnimationComplete","onViewportBoxUpdate","onLayoutMeasure","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","drag","dragControls","dragListener","dragConstraints","dragDirectionLock","_dragX","_dragY","dragElastic","dragMomentum","dragPropagation","dragTransition","whileDrag","onPan","onPanStart","onPanEnd","onPanSessionStart","onTap","onTapStart","onTapCancel","onHoverStart","onHoverEnd","whileFocus","whileTap","whileHover"]);function To(n){return Eo.has(n)}var Po=function(n){return!To(n)};try{var Co=(__webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js")["default"]);Po=function(n){return n.startsWith("on")?!To(n):Co(n)}}catch(n){}function Ao(n,t,e){return"string"==typeof n?n:Gr.transform(t+e*n)}var Lo=function(n,t){return Gr.transform(n*t)},Oo={offset:"stroke-dashoffset",array:"stroke-dasharray"},ko={offset:"strokeDashoffset",array:"strokeDasharray"};function Ro(n,t,e,r,o,i,a,u){var s=t.attrX,c=t.attrY,l=t.originX,f=t.originY,p=t.pathLength,d=t.pathSpacing,h=void 0===d?1:d,v=t.pathOffset,m=void 0===v?0:v;bo(n,Ye(t,["attrX","attrY","originX","originY","pathLength","pathSpacing","pathOffset"]),e,r,o,i,a,u),n.attrs=n.style,n.style={};var g=n.attrs,y=n.style,b=n.dimensions,w=n.totalPathLength;g.transform&&(b&&(y.transform=g.transform),delete g.transform),b&&(void 0!==l||void 0!==f||y.transform)&&(y.transformOrigin=function(n,t,e){return Ao(t,n.x,n.width)+" "+Ao(e,n.y,n.height)}(b,void 0!==l?l:.5,void 0!==f?f:.5)),void 0!==s&&(g.x=s),void 0!==c&&(g.y=c),void 0!==w&&void 0!==p&&function(n,t,e,r,o,i){void 0===r&&(r=1),void 0===o&&(o=0),void 0===i&&(i=!0);var a=i?Oo:ko;n[a.offset]=Lo(-o,t);var u=Lo(e,t),s=Lo(r,t);n[a.array]=u+" "+s}(g,w,p,h,m,!1)}var No=function(){return We(We({},{style:{},transform:{},transformKeys:[],transformOrigin:{},vars:{}}),{attrs:{}})};function zo(n,t){var e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){var e=No();return Ro(e,t,void 0,void 0,{enableHardwareAcceleration:!1},n.transformTemplate),We(We({},e.attrs),{style:We({},e.style)})}),[t]);if(n.style){var r={};xo(r,n.style,n),e.style=We(We({},r),e.style)}return e}function Io(n){void 0===n&&(n=!1);return function(t,e,r,o,i){var a=o.latestValues,s=(_r(t)?zo:_o)(e,a,i),c=function(n,t,e){var r={};for(var o in n)(Po(o)||!0===e&&To(o)||!t&&!To(o))&&(r[o]=n[o]);return r}(e,"string"==typeof t,n),l=We(We(We({},c),s),{ref:r});return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(t,l)}}var Do=/([a-z])([A-Z])/g,jo=function(n){return n.replace(Do,"$1-$2").toLowerCase()};function Mo(n,t){var e=t.style,r=t.vars;for(var o in Object.assign(n.style,e),r)n.style.setProperty(o,r[o])}var Bo=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform"]);function Vo(n,t){for(var e in Mo(n,t),t.attrs)n.setAttribute(Bo.has(e)?e:jo(e),t.attrs[e])}function Fo(n){var t=n.style,e={};for(var r in t)(Nr(t[r])||Rr(r,n))&&(e[r]=t[r]);return e}function Wo(n){var t=Fo(n);for(var e in n){if(Nr(n[e]))t["x"===e||"y"===e?"attr"+e.toUpperCase():e]=n[e]}return t}function Yo(n){return"object"==typeof n&&"function"==typeof n.start}var Ho=function(n){return Array.isArray(n)},Uo=function(n){return Ho(n)?n[n.length-1]||0:n};function $o(n){var t=Nr(n)?n.get():n;return function(n){return Boolean(n&&"object"==typeof n&&n.mix&&n.toValue)}(t)?t.toValue():t}function Xo(n,t,e,r){var o=n.scrapeMotionValuesFromProps,i=n.createRenderState,a=n.onMount,u={latestValues:Go(t,e,r,o),renderState:i()};return a&&(u.mount=function(n){return a(t,n,u)}),u}var qo=function(n){return function(t,e){var o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(nr),i=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(tr);return e?Xo(n,t,o,i):er((function(){return Xo(n,t,o,i)}))}};function Go(n,t,e,r){var o={},i=!1===(null==e?void 0:e.initial),a=r(n);for(var u in a)o[u]=$o(a[u]);var s=n.initial,c=n.animate,l=mr(n),f=gr(n);t&&f&&!l&&!1!==n.inherit&&(null!=s||(s=t.initial),null!=c||(c=t.animate));var p=i||!1===s?c:s;p&&"boolean"!=typeof p&&!Yo(p)&&(Array.isArray(p)?p:[p]).forEach((function(t){var e=hr(n,t);if(e){var r=e.transitionEnd;e.transition;var i=Ye(e,["transitionEnd","transition"]);for(var a in i)o[a]=i[a];for(var a in r)o[a]=r[a]}}));return o}var Ko={useVisualState:qo({scrapeMotionValuesFromProps:Wo,createRenderState:No,onMount:function(n,t,e){var r=e.renderState,o=e.latestValues;try{r.dimensions="function"==typeof t.getBBox?t.getBBox():t.getBoundingClientRect()}catch(n){r.dimensions={x:0,y:0,width:0,height:0}}"path"===t.tagName&&(r.totalPathLength=t.getTotalLength()),Ro(r,o,void 0,void 0,{enableHardwareAcceleration:!1},n.transformTemplate),Vo(t,r)}})};var Zo,Jo={useVisualState:qo({scrapeMotionValuesFromProps:Fo,createRenderState:wo})};function Qo(n,t,e,r){return n.addEventListener(t,e,r),function(){return n.removeEventListener(t,e,r)}}function ni(n,t,e,r){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var o=n.current;if(e&&o)return Qo(o,t,e,r)}),[n,t,e,r])}function ti(n){return"undefined"!=typeof PointerEvent&&n instanceof PointerEvent?!("mouse"!==n.pointerType):n instanceof MouseEvent}function ei(n){return!!n.touches}!function(n){n.Animate="animate",n.Hover="whileHover",n.Tap="whileTap",n.Drag="whileDrag",n.Focus="whileFocus",n.Exit="exit"}(Zo||(Zo={}));var ri={pageX:0,pageY:0};function oi(n,t){void 0===t&&(t="page");var e=n.touches[0]||n.changedTouches[0]||ri;return{x:e[t+"X"],y:e[t+"Y"]}}function ii(n,t){return void 0===t&&(t="page"),{x:n[t+"X"],y:n[t+"Y"]}}function ai(n,t){return void 0===t&&(t="page"),{point:ei(n)?oi(n,t):ii(n,t)}}var ui=function(n,t){void 0===t&&(t=!1);var e,r=function(t){return n(t,ai(t))};return t?(e=r,function(n){var t=n instanceof MouseEvent;(!t||t&&0===n.button)&&e(n)}):r},si={pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointercancel:"mousecancel",pointerover:"mouseover",pointerout:"mouseout",pointerenter:"mouseenter",pointerleave:"mouseleave"},ci={pointerdown:"touchstart",pointermove:"touchmove",pointerup:"touchend",pointercancel:"touchcancel"};function li(n){return sr&&null===window.onpointerdown?n:sr&&null===window.ontouchstart?ci[n]:sr&&null===window.onmousedown?si[n]:n}function fi(n,t,e,r){return Qo(n,li(t),ui(e,"pointerdown"===t),r)}function pi(n,t,e,r){return ni(n,li(t),e&&ui(e,"pointerdown"===t),r)}function di(n){var t=null;return function(){return null===t&&(t=n,function(){t=null})}}var hi=di("dragHorizontal"),vi=di("dragVertical");function mi(n){var t=!1;if("y"===n)t=vi();else if("x"===n)t=hi();else{var e=hi(),r=vi();e&&r?t=function(){e(),r()}:(e&&e(),r&&r())}return t}function gi(){var n=mi(!0);return!n||(n(),!1)}function yi(n,t,e){return function(r,o){var i;ti(r)&&!gi()&&(null==e||e(r,o),null===(i=n.animationState)||void 0===i||i.setActive(Zo.Hover,t))}}var bi=function(n,t){return!!t&&(n===t||bi(n,t.parentElement))};function wi(n){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return function(){return n()}}),[])}var xi=function(n,t,e){return Math.min(Math.max(e,n),t)};function Si(n){var t,e,r=n.duration,o=void 0===r?800:r,i=n.bounce,a=void 0===i?.25:i,u=n.velocity,s=void 0===u?0:u,c=n.mass,l=void 0===c?1:c;qe(o<=1e4,"Spring duration must be 10 seconds or less");var f=1-a;f=xi(.05,1,f),o=xi(.01,10,o/1e3),f<1?(t=function(n){var t=n*f,e=t*o;return.001-(t-s)/_i(n,f)*Math.exp(-e)},e=function(n){var e=n*f*o,r=e*s+s,i=Math.pow(f,2)*Math.pow(n,2)*o,a=Math.exp(-e),u=_i(Math.pow(n,2),f);return(.001-t(n)>0?-1:1)*((r-i)*a)/u}):(t=function(n){return Math.exp(-n*o)*((n-s)*o+1)-.001},e=function(n){return Math.exp(-n*o)*(o*o*(s-n))});var p=function(n,t,e){for(var r=e,o=1;o<12;o++)r-=n(r)/t(r);return r}(t,e,5/o);if(o*=1e3,isNaN(p))return{stiffness:100,damping:10,duration:o};var d=Math.pow(p,2)*l;return{stiffness:d,damping:2*f*Math.sqrt(l*d),duration:o}}function _i(n,t){return n*Math.sqrt(1-t*t)}var Ei=["duration","bounce"],Ti=["stiffness","damping","mass"];function Pi(n,t){return t.some((function(t){return void 0!==n[t]}))}function Ci(n){var t=n.from,e=void 0===t?0:t,r=n.to,o=void 0===r?1:r,i=n.restSpeed,a=void 0===i?2:i,u=n.restDelta,s=Ye(n,["from","to","restSpeed","restDelta"]),c={done:!1,value:e},l=function(n){var t=We({velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1},n);if(!Pi(n,Ti)&&Pi(n,Ei)){var e=Si(n);(t=We(We(We({},t),e),{velocity:0,mass:1})).isResolvedFromDuration=!0}return t}(s),f=l.stiffness,p=l.damping,d=l.mass,h=l.velocity,v=l.duration,m=l.isResolvedFromDuration,g=Ai,y=Ai;function b(){var n=h?-h/1e3:0,t=o-e,r=p/(2*Math.sqrt(f*d)),i=Math.sqrt(f/d)/1e3;if(null!=u||(u=Math.abs(o-e)<=1?.01:.4),r<1){var a=_i(i,r);g=function(e){var u=Math.exp(-r*i*e);return o-u*((n+r*i*t)/a*Math.sin(a*e)+t*Math.cos(a*e))},y=function(e){var o=Math.exp(-r*i*e);return r*i*o*(Math.sin(a*e)*(n+r*i*t)/a+t*Math.cos(a*e))-o*(Math.cos(a*e)*(n+r*i*t)-a*t*Math.sin(a*e))}}else if(1===r)g=function(e){return o-Math.exp(-i*e)*(t+(n+i*t)*e)};else{var s=i*Math.sqrt(r*r-1);g=function(e){var a=Math.exp(-r*i*e),u=Math.min(s*e,300);return o-a*((n+r*i*t)*Math.sinh(u)+s*t*Math.cosh(u))/s}}}return b(),{next:function(n){var t=g(n);if(m)c.done=n>=v;else{var e=1e3*y(n),r=Math.abs(e)<=a,i=Math.abs(o-t)<=u;c.done=r&&i}return c.value=c.done?o:t,c},flipTarget:function(){var n;h=-h,e=(n=[o,e])[0],o=n[1],b()}}}Ci.needsInterpolation=function(n,t){return"string"==typeof n||"string"==typeof t};var Ai=function(n){return 0},Li=function(n,t,e){var r=t-n;return 0===r?1:(e-n)/r},Oi=function(n,t,e){return-e*n+e*t+n},ki=function(n,t,e){var r=n*n,o=t*t;return Math.sqrt(Math.max(0,e*(o-r)+r))},Ri=[io,oo,to],Ni=function(n){return Ri.find((function(t){return t.test(n)}))},zi=function(n){return"'"+n+"' is not an animatable color. Use the equivalent color code instead."},Ii=function(n,t){var e=Ni(n),r=Ni(t);Ge(!!e,zi(n)),Ge(!!r,zi(t)),Ge(e.transform===r.transform,"Both colors must be hex/RGBA, OR both must be HSLA.");var o=e.parse(n),i=r.parse(t),a=We({},o),u=e===to?Oi:ki;return function(n){for(var t in a)"alpha"!==t&&(a[t]=u(o[t],i[t],n));return a.alpha=Oi(o.alpha,i.alpha,n),e.transform(a)}},Di=function(n){return"number"==typeof n},ji=function(n,t){return function(e){return t(n(e))}},Mi=function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return n.reduce(ji)};function Bi(n,t){return Di(n)?function(e){return Oi(n,t,e)}:ao.test(n)?Ii(n,t):Yi(n,t)}var Vi=function(n,t){var e=Ue([],n),r=e.length,o=n.map((function(n,e){return Bi(n,t[e])}));return function(n){for(var t=0;t<r;t++)e[t]=o[t](n);return e}},Fi=function(n,t){var e=We(We({},n),t),r={};for(var o in e)void 0!==n[o]&&void 0!==t[o]&&(r[o]=Bi(n[o],t[o]));return function(n){for(var t in r)e[t]=r[t](n);return e}};function Wi(n){for(var t=fo.parse(n),e=t.length,r=0,o=0,i=0,a=0;a<e;a++)r||"number"==typeof t[a]?r++:void 0!==t[a].hue?i++:o++;return{parsed:t,numNumbers:r,numRGB:o,numHSL:i}}var Yi=function(n,t){var e=fo.createTransformer(t),r=Wi(n),o=Wi(t);return Ge(r.numHSL===o.numHSL&&r.numRGB===o.numRGB&&r.numNumbers>=o.numNumbers,"Complex values '"+n+"' and '"+t+"' too different to mix. Ensure all colors are of the same type."),Mi(Vi(r.parsed,o.parsed),e)},Hi=function(n,t){return function(e){return Oi(n,t,e)}};function Ui(n,t,e){for(var r=[],o=e||function(n){return"number"==typeof n?Hi:"string"==typeof n?ao.test(n)?Ii:Yi:Array.isArray(n)?Vi:"object"==typeof n?Fi:void 0}(n[0]),i=n.length-1,a=0;a<i;a++){var u=o(n[a],n[a+1]);if(t){var s=Array.isArray(t)?t[a]:t;u=Mi(s,u)}r.push(u)}return r}function $i(n,t,e){var r=void 0===e?{}:e,o=r.clamp,i=void 0===o||o,a=r.ease,u=r.mixer,s=n.length;Ge(s===t.length,"Both input and output ranges must be the same length"),Ge(!a||!Array.isArray(a)||a.length===s-1,"Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values."),n[0]>n[s-1]&&(n=[].concat(n),t=[].concat(t),n.reverse(),t.reverse());var c=Ui(t,a,u),l=2===s?function(n,t){var e=n[0],r=n[1],o=t[0];return function(n){return o(Li(e,r,n))}}(n,c):function(n,t){var e=n.length,r=e-1;return function(o){var i=0,a=!1;if(o<=n[0]?a=!0:o>=n[r]&&(i=r-1,a=!0),!a){for(var u=1;u<e&&!(n[u]>o||u===r);u++);i=u-1}var s=Li(n[i],n[i+1],o);return t[i](s)}}(n,c);return i?function(t){return l(xi(n[0],n[s-1],t))}:l}var Xi,qi=function(n){return function(t){return 1-n(1-t)}},Gi=function(n){return function(t){return t<=.5?n(2*t)/2:(2-n(2*(1-t)))/2}},Ki=function(n){return function(t){return t*t*((n+1)*t-n)}},Zi=function(n){return n},Ji=(Xi=2,function(n){return Math.pow(n,Xi)}),Qi=qi(Ji),na=Gi(Ji),ta=function(n){return 1-Math.sin(Math.acos(n))},ea=qi(ta),ra=Gi(ea),oa=Ki(1.525),ia=qi(oa),aa=Gi(oa),ua=function(n){var t=Ki(n);return function(n){return(n*=2)<1?.5*t(n):.5*(2-Math.pow(2,-10*(n-1)))}}(1.525),sa=function(n){if(1===n||0===n)return n;var t=n*n;return n<.36363636363636365?7.5625*t:n<.7272727272727273?9.075*t-9.9*n+3.4:n<.9?12.066481994459833*t-19.63545706371191*n+8.898060941828255:10.8*n*n-20.52*n+10.72},ca=qi(sa);function la(n,t){return n.map((function(){return t||na})).splice(0,n.length-1)}function fa(n){var t=n.from,e=void 0===t?0:t,r=n.to,o=void 0===r?1:r,i=n.ease,a=n.offset,u=n.duration,s=void 0===u?300:u,c={done:!1,value:e},l=Array.isArray(o)?o:[e,o],f=function(n,t){return n.map((function(n){return n*t}))}(a&&a.length===l.length?a:function(n){var t=n.length;return n.map((function(n,e){return 0!==e?e/(t-1):0}))}(l),s);function p(){return $i(f,l,{ease:Array.isArray(i)?i:la(l,i)})}var d=p();return{next:function(n){return c.value=d(n),c.done=n>=s,c},flipTarget:function(){l.reverse(),d=p()}}}var pa={keyframes:fa,spring:Ci,decay:function(n){var t=n.velocity,e=void 0===t?0:t,r=n.from,o=void 0===r?0:r,i=n.power,a=void 0===i?.8:i,u=n.timeConstant,s=void 0===u?350:u,c=n.restDelta,l=void 0===c?.5:c,f=n.modifyTarget,p={done:!1,value:o},d=a*e,h=o+d,v=void 0===f?h:f(h);return v!==h&&(d=v-o),{next:function(n){var t=-d*Math.exp(-n/s);return p.done=!(t>l||t<-l),p.value=p.done?v:v+t,p},flipTarget:function(){}}}};var da="undefined"!=typeof performance?function(){return performance.now()}:function(){return Date.now()},ha="undefined"!=typeof window?function(n){return window.requestAnimationFrame(n)}:function(n){return setTimeout((function(){return n(da())}),16.666666666666668)};var va=!0,ma=!1,ga=!1,ya={delta:0,timestamp:0},ba=["read","update","preRender","render","postRender"],wa=ba.reduce((function(n,t){return n[t]=function(n){var t=[],e=[],r=0,o=!1,i=new WeakSet,a={schedule:function(n,a,u){void 0===a&&(a=!1),void 0===u&&(u=!1);var s=u&&o,c=s?t:e;return a&&i.add(n),-1===c.indexOf(n)&&(c.push(n),s&&o&&(r=t.length)),n},cancel:function(n){var t=e.indexOf(n);-1!==t&&e.splice(t,1),i.delete(n)},process:function(u){var s;if(o=!0,t=(s=[e,t])[0],(e=s[1]).length=0,r=t.length)for(var c=0;c<r;c++){var l=t[c];l(u),i.has(l)&&(a.schedule(l),n())}o=!1}};return a}((function(){return ma=!0})),n}),{}),xa=ba.reduce((function(n,t){var e=wa[t];return n[t]=function(n,t,r){return void 0===t&&(t=!1),void 0===r&&(r=!1),ma||Pa(),e.schedule(n,t,r)},n}),{}),Sa=ba.reduce((function(n,t){return n[t]=wa[t].cancel,n}),{}),_a=ba.reduce((function(n,t){return n[t]=function(){return wa[t].process(ya)},n}),{}),Ea=function(n){return wa[n].process(ya)},Ta=function(n){ma=!1,ya.delta=va?16.666666666666668:Math.max(Math.min(n-ya.timestamp,40),1),ya.timestamp=n,ga=!0,ba.forEach(Ea),ga=!1,ma&&(va=!1,ha(Ta))},Pa=function(){ma=!0,va=!0,ga||ha(Ta)},Ca=function(){return ya};function Aa(n,t,e){return void 0===e&&(e=0),n-t-e}var La=function(n){var t=function(t){var e=t.delta;return n(e)};return{start:function(){return xa.update(t,!0)},stop:function(){return Sa.update(t)}}};function Oa(n){var t,e,r,o,i,a=n.from,u=n.autoplay,s=void 0===u||u,c=n.driver,l=void 0===c?La:c,f=n.elapsed,p=void 0===f?0:f,d=n.repeat,h=void 0===d?0:d,v=n.repeatType,m=void 0===v?"loop":v,g=n.repeatDelay,y=void 0===g?0:g,b=n.onPlay,w=n.onStop,x=n.onComplete,S=n.onRepeat,_=n.onUpdate,E=Ye(n,["from","autoplay","driver","elapsed","repeat","repeatType","repeatDelay","onPlay","onStop","onComplete","onRepeat","onUpdate"]),T=E.to,P=0,C=E.duration,A=!1,L=!0,O=function(n){if(Array.isArray(n.to))return fa;if(pa[n.type])return pa[n.type];var t=new Set(Object.keys(n));return t.has("ease")||t.has("duration")&&!t.has("dampingRatio")?fa:t.has("dampingRatio")||t.has("stiffness")||t.has("mass")||t.has("damping")||t.has("restSpeed")||t.has("restDelta")?Ci:fa}(E);(null===(e=(t=O).needsInterpolation)||void 0===e?void 0:e.call(t,a,T))&&(i=$i([0,100],[a,T],{clamp:!1}),a=0,T=100);var k=O(We(We({},E),{from:a,to:T}));function R(){P++,"reverse"===m?p=function(n,t,e,r){return void 0===e&&(e=0),void 0===r&&(r=!0),r?Aa(t+-n,t,e):t-(n-t)+e}(p,C,y,L=P%2==0):(p=Aa(p,C,y),"mirror"===m&&k.flipTarget()),A=!1,S&&S()}function N(n){if(L||(n=-n),p+=n,!A){var t=k.next(Math.max(0,p));o=t.value,i&&(o=i(o)),A=L?t.done:p<=0}null==_||_(o),A&&(0===P&&(null!=C||(C=p)),P<h?function(n,t,e,r){return r?n>=t+e:n<=-e}(p,C,y,L)&&R():(r.stop(),x&&x()))}return s&&(null==b||b(),(r=l(N)).start()),{stop:function(){null==w||w(),r.stop()}}}function ka(n,t){return t?n*(1e3/t):0}var Ra=function(n){return n.hasOwnProperty("x")&&n.hasOwnProperty("y")},Na=function(n){return Ra(n)&&n.hasOwnProperty("z")},za=function(n,t){return Math.abs(n-t)};function Ia(n,t){if(Di(n)&&Di(t))return za(n,t);if(Ra(n)&&Ra(t)){var e=za(n.x,t.x),r=za(n.y,t.y),o=Na(n)&&Na(t)?za(n.z,t.z):0;return Math.sqrt(Math.pow(e,2)+Math.pow(r,2)+Math.pow(o,2))}}var Da=function(n,t){return 1-3*t+3*n},ja=function(n,t){return 3*t-6*n},Ma=function(n){return 3*n},Ba=function(n,t,e){return((Da(t,e)*n+ja(t,e))*n+Ma(t))*n},Va=function(n,t,e){return 3*Da(t,e)*n*n+2*ja(t,e)*n+Ma(t)};function Fa(n,t,e,r){if(n===t&&e===r)return Zi;for(var o=new Float32Array(11),i=0;i<11;++i)o[i]=Ba(.1*i,n,e);function a(t){for(var r=0,i=1;10!==i&&o[i]<=t;++i)r+=.1;--i;var a=r+.1*((t-o[i])/(o[i+1]-o[i])),u=Va(a,n,e);return u>=.001?function(n,t,e,r){for(var o=0;o<8;++o){var i=Va(t,e,r);if(0===i)return t;t-=(Ba(t,e,r)-n)/i}return t}(t,a,n,e):0===u?a:function(n,t,e,r,o){var i,a,u=0;do{(i=Ba(a=t+(e-t)/2,r,o)-n)>0?e=a:t=a}while(Math.abs(i)>1e-7&&++u<10);return a}(t,r,r+.1,n,e)}return function(n){return 0===n||1===n?n:Ba(a(n),t,r)}}var Wa=function(n){return function(t){return n(t),null}},Ya={tap:Wa((function(n){var t=n.onTap,e=n.onTapStart,r=n.onTapCancel,i=n.whileTap,a=n.visualElement,u=t||e||r||i,s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);function l(){var n;null===(n=c.current)||void 0===n||n.call(c),c.current=null}function f(){var n;return l(),s.current=!1,null===(n=a.animationState)||void 0===n||n.setActive(Zo.Tap,!1),!gi()}function p(n,e){f()&&(bi(a.getInstance(),n.target)?null==t||t(n,e):null==r||r(n,e))}function d(n,t){f()&&(null==r||r(n,t))}pi(a,"pointerdown",u?function(n,t){var r;l(),s.current||(s.current=!0,c.current=Mi(fi(window,"pointerup",p),fi(window,"pointercancel",d)),null==e||e(n,t),null===(r=a.animationState)||void 0===r||r.setActive(Zo.Tap,!0))}:void 0),wi(l)})),focus:Wa((function(n){var t=n.whileFocus,e=n.visualElement;ni(e,"focus",t?function(){var n;null===(n=e.animationState)||void 0===n||n.setActive(Zo.Focus,!0)}:void 0),ni(e,"blur",t?function(){var n;null===(n=e.animationState)||void 0===n||n.setActive(Zo.Focus,!1)}:void 0)})),hover:Wa((function(n){var t=n.onHoverStart,e=n.onHoverEnd,r=n.whileHover,o=n.visualElement;pi(o,"pointerenter",t||r?yi(o,!0,t):void 0),pi(o,"pointerleave",e||r?yi(o,!1,e):void 0)}))};function Ha(n,t){if(!Array.isArray(t))return!1;var e=t.length;if(e!==n.length)return!1;for(var r=0;r<e;r++)if(t[r]!==n[r])return!1;return!0}var Ua=function(n){return 1e3*n},$a={linear:Zi,easeIn:Ji,easeInOut:na,easeOut:Qi,circIn:ta,circInOut:ra,circOut:ea,backIn:oa,backInOut:aa,backOut:ia,anticipate:ua,bounceIn:ca,bounceInOut:function(n){return n<.5?.5*(1-sa(1-2*n)):.5*sa(2*n-1)+.5},bounceOut:sa},Xa=function(n){if(Array.isArray(n)){Ge(4===n.length,"Cubic bezier arrays must contain four numerical values.");var t=He(n,4);return Fa(t[0],t[1],t[2],t[3])}return"string"==typeof n?(Ge(void 0!==$a[n],"Invalid easing type '"+n+"'"),$a[n]):n},qa=function(n,t){return"zIndex"!==n&&(!("number"!=typeof t&&!Array.isArray(t))||!("string"!=typeof t||!fo.test(t)||t.startsWith("url(")))},Ga=function(){return{type:"spring",stiffness:500,damping:25,restDelta:.5,restSpeed:10}},Ka=function(n){return{type:"spring",stiffness:550,damping:0===n?2*Math.sqrt(550):30,restDelta:.01,restSpeed:10}},Za=function(){return{type:"keyframes",ease:"linear",duration:.3}},Ja=function(n){return{type:"keyframes",duration:.8,values:n}},Qa={x:Ga,y:Ga,z:Ga,rotate:Ga,rotateX:Ga,rotateY:Ga,rotateZ:Ga,scaleX:Ka,scaleY:Ka,scale:Ka,opacity:Za,backgroundColor:Za,color:Za,default:Ka},nu=We(We({},yo),{color:ao,backgroundColor:ao,outlineColor:ao,fill:ao,stroke:ao,borderColor:ao,borderTopColor:ao,borderRightColor:ao,borderBottomColor:ao,borderLeftColor:ao,filter:mo,WebkitFilter:mo}),tu=function(n){return nu[n]};function eu(n,t){var e,r=tu(n);return r!==mo&&(r=fo),null===(e=r.getAnimatableNone)||void 0===e?void 0:e.call(r,t)}var ru=!1;function ou(n){var t=n.ease,e=n.times,r=n.yoyo,o=n.flip,i=n.loop,a=Ye(n,["ease","times","yoyo","flip","loop"]),u=We({},a);return e&&(u.offset=e),a.duration&&(u.duration=Ua(a.duration)),a.repeatDelay&&(u.repeatDelay=Ua(a.repeatDelay)),t&&(u.ease=function(n){return Array.isArray(n)&&"number"!=typeof n[0]}(t)?t.map(Xa):Xa(t)),"tween"===a.type&&(u.type="keyframes"),(r||i||o)&&(qe(!ru,"yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options."),ru=!0,r?u.repeatType="reverse":i?u.repeatType="loop":o&&(u.repeatType="mirror"),u.repeat=i||r||o||a.repeat),"spring"!==a.type&&(u.type="keyframes"),u}function iu(n,t,e){var r,o,i,a;return Array.isArray(t.to)&&(null!==(r=n.duration)&&void 0!==r||(n.duration=.8)),function(n){Array.isArray(n.to)&&null===n.to[0]&&(n.to=Ue([],He(n.to)),n.to[0]=n.from)}(t),function(n){n.when,n.delay,n.delayChildren,n.staggerChildren,n.staggerDirection,n.repeat,n.repeatType,n.repeatDelay,n.from;var t=Ye(n,["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from"]);return!!Object.keys(t).length}(n)||(n=We(We({},n),(o=e,i=t.to,a=Ho(i)?Ja:Qa[o]||Qa.default,We({to:i},a(i))))),We(We({},t),ou(n))}function au(n,t,e,r,o){var i,a=cu(r,n),u=null!==(i=a.from)&&void 0!==i?i:t.get(),s=qa(n,e);"none"===u&&s&&"string"==typeof e?u=eu(n,e):uu(u)&&"string"==typeof e?u=su(e):!Array.isArray(e)&&uu(e)&&"string"==typeof u&&(e=su(u));var c=qa(n,u);return qe(c===s,"You are trying to animate "+n+' from "'+u+'" to "'+e+'". '+u+" is not an animatable value - to enable this animation set "+u+" to a value animatable to "+e+" via the `style` property."),c&&s&&!1!==a.type?function(){var r={from:u,to:e,velocity:t.getVelocity(),onComplete:o,onUpdate:function(n){return t.set(n)}};return"inertia"===a.type||"decay"===a.type?function(n){var t,e=n.from,r=void 0===e?0:e,o=n.velocity,i=void 0===o?0:o,a=n.min,u=n.max,s=n.power,c=void 0===s?.8:s,l=n.timeConstant,f=void 0===l?750:l,p=n.bounceStiffness,d=void 0===p?500:p,h=n.bounceDamping,v=void 0===h?10:h,m=n.restDelta,g=void 0===m?1:m,y=n.modifyTarget,b=n.driver,w=n.onUpdate,x=n.onComplete;function S(n){return void 0!==a&&n<a||void 0!==u&&n>u}function _(n){return void 0===a?u:void 0===u||Math.abs(a-n)<Math.abs(u-n)?a:u}function E(n){null==t||t.stop(),t=Oa(We(We({},n),{driver:b,onUpdate:function(t){var e;null==w||w(t),null===(e=n.onUpdate)||void 0===e||e.call(n,t)},onComplete:x}))}function T(n){E(We({type:"spring",stiffness:d,damping:v,restDelta:g},n))}if(S(r))T({from:r,velocity:i,to:_(r)});else{var P=c*i+r;void 0!==y&&(P=y(P));var C,A,L=_(P),O=L===a?-1:1;E({type:"decay",from:r,velocity:i,timeConstant:f,power:c,restDelta:g,modifyTarget:y,onUpdate:S(P)?function(n){C=A,A=n,i=ka(n-C,Ca().delta),(1===O&&n>L||-1===O&&n<L)&&T({from:n,to:L,velocity:i})}:void 0})}return{stop:function(){return null==t?void 0:t.stop()}}}(We(We({},r),a)):Oa(We(We({},iu(a,r,n)),{onUpdate:function(n){var t;r.onUpdate(n),null===(t=a.onUpdate)||void 0===t||t.call(a,n)},onComplete:function(){var n;r.onComplete(),null===(n=a.onComplete)||void 0===n||n.call(a)}}))}:function(){var n;return t.set(e),o(),null===(n=null==a?void 0:a.onComplete)||void 0===n||n.call(a),{stop:function(){}}}}function uu(n){return 0===n||"string"==typeof n&&0===parseFloat(n)&&-1===n.indexOf(" ")}function su(n){return"number"==typeof n?0:eu("",n)}function cu(n,t){return n[t]||n.default||n}function lu(n,t,e,r){return void 0===r&&(r={}),t.start((function(o){var i,a,u=au(n,t,e,r,o),s=function(n,t){var e;return null!==(e=(cu(n,t)||{}).delay)&&void 0!==e?e:0}(r,n),c=function(){return a=u()};return s?i=setTimeout(c,Ua(s)):c(),function(){clearTimeout(i),null==a||a.stop()}}))}var fu=function(n){return/^\-?\d*\.?\d+$/.test(n)};function pu(n,t){-1===n.indexOf(t)&&n.push(t)}function du(n,t){var e=n.indexOf(t);e>-1&&n.splice(e,1)}var hu=function(){function n(){this.subscriptions=[]}return n.prototype.add=function(n){var t=this;return pu(this.subscriptions,n),function(){return du(t.subscriptions,n)}},n.prototype.notify=function(n,t,e){var r=this.subscriptions.length;if(r)if(1===r)this.subscriptions[0](n,t,e);else for(var o=0;o<r;o++){var i=this.subscriptions[o];i&&i(n,t,e)}},n.prototype.getSize=function(){return this.subscriptions.length},n.prototype.clear=function(){this.subscriptions.length=0},n}(),vu=function(){function n(n){var t,e=this;this.timeDelta=0,this.lastUpdated=0,this.updateSubscribers=new hu,this.velocityUpdateSubscribers=new hu,this.renderSubscribers=new hu,this.canTrackVelocity=!1,this.updateAndNotify=function(n,t){void 0===t&&(t=!0),e.prev=e.current,e.current=n;var r=Ca(),o=r.delta,i=r.timestamp;e.lastUpdated!==i&&(e.timeDelta=o,e.lastUpdated=i,xa.postRender(e.scheduleVelocityCheck)),e.prev!==e.current&&e.updateSubscribers.notify(e.current),e.velocityUpdateSubscribers.getSize()&&e.velocityUpdateSubscribers.notify(e.getVelocity()),t&&e.renderSubscribers.notify(e.current)},this.scheduleVelocityCheck=function(){return xa.postRender(e.velocityCheck)},this.velocityCheck=function(n){n.timestamp!==e.lastUpdated&&(e.prev=e.current,e.velocityUpdateSubscribers.notify(e.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=n,this.canTrackVelocity=(t=this.current,!isNaN(parseFloat(t)))}return n.prototype.onChange=function(n){return this.updateSubscribers.add(n)},n.prototype.clearListeners=function(){this.updateSubscribers.clear()},n.prototype.onRenderRequest=function(n){return n(this.get()),this.renderSubscribers.add(n)},n.prototype.attach=function(n){this.passiveEffect=n},n.prototype.set=function(n,t){void 0===t&&(t=!0),t&&this.passiveEffect?this.passiveEffect(n,this.updateAndNotify):this.updateAndNotify(n,t)},n.prototype.get=function(){return this.current},n.prototype.getPrevious=function(){return this.prev},n.prototype.getVelocity=function(){return this.canTrackVelocity?ka(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0},n.prototype.start=function(n){var t=this;return this.stop(),new Promise((function(e){t.hasAnimated=!0,t.stopAnimation=n(e)})).then((function(){return t.clearAnimation()}))},n.prototype.stop=function(){this.stopAnimation&&this.stopAnimation(),this.clearAnimation()},n.prototype.isAnimating=function(){return!!this.stopAnimation},n.prototype.clearAnimation=function(){this.stopAnimation=null},n.prototype.destroy=function(){this.updateSubscribers.clear(),this.renderSubscribers.clear(),this.stop()},n}();function mu(n){return new vu(n)}var gu=function(n){return function(t){return t.test(n)}},yu=[Yr,Gr,qr,Xr,Zr,Kr,{test:function(n){return"auto"===n},parse:function(n){return n}}],bu=function(n){return yu.find(gu(n))},wu=Ue(Ue([],He(yu)),[ao,fo]),xu=function(n){return wu.find(gu(n))};function Su(n,t,e){n.hasValue(t)?n.getValue(t).set(e):n.addValue(t,mu(e))}function _u(n,t){if(t)return(t[n]||t.default||t).from}function Eu(n,t,e){var r;void 0===e&&(e={});var o=vr(n,t,e.custom),i=(o||{}).transition,a=void 0===i?n.getDefaultTransition()||{}:i;e.transitionOverride&&(a=e.transitionOverride);var u=o?function(){return Tu(n,o,e)}:function(){return Promise.resolve()},s=(null===(r=n.variantChildren)||void 0===r?void 0:r.size)?function(r){void 0===r&&(r=0);var o=a.delayChildren,i=void 0===o?0:o,u=a.staggerChildren,s=a.staggerDirection;return function(n,t,e,r,o,i){void 0===e&&(e=0);void 0===r&&(r=0);void 0===o&&(o=1);var a=[],u=(n.variantChildren.size-1)*r,s=1===o?function(n){return void 0===n&&(n=0),n*r}:function(n){return void 0===n&&(n=0),u-n*r};return Array.from(n.variantChildren).sort(Pu).forEach((function(n,r){a.push(Eu(n,t,We(We({},i),{delay:e+s(r)})).then((function(){return n.notifyAnimationComplete(t)})))})),Promise.all(a)}(n,t,i+r,u,s,e)}:function(){return Promise.resolve()},c=a.when;if(c){var l=He("beforeChildren"===c?[u,s]:[s,u],2),f=l[0],p=l[1];return f().then(p)}return Promise.all([u(),s(e.delay)])}function Tu(n,t,e){var r,o=void 0===e?{}:e,i=o.delay,a=void 0===i?0:i,u=o.transitionOverride,s=o.type,c=n.makeTargetAnimatable(t),l=c.transition,f=void 0===l?n.getDefaultTransition():l,p=c.transitionEnd,d=Ye(c,["transition","transitionEnd"]);u&&(f=u);var h=[],v=s&&(null===(r=n.animationState)||void 0===r?void 0:r.getState()[s]);for(var m in d){var g=n.getValue(m),y=d[m];if(!(!g||void 0===y||v&&Cu(v,m))){var b=lu(m,g,y,We({delay:a},f));h.push(b)}}return Promise.all(h).then((function(){p&&function(n,t){var e=vr(n,t),r=e?n.makeTargetAnimatable(e,!1):{},o=r.transitionEnd,i=void 0===o?{}:o;r.transition;var a=Ye(r,["transitionEnd","transition"]);for(var u in a=We(We({},a),i))Su(n,u,Uo(a[u]))}(n,p)}))}function Pu(n,t){return n.sortNodePosition(t)}function Cu(n,t){var e=n.protectedKeys,r=n.needsAnimating,o=e.hasOwnProperty(t)&&!0!==r[t];return r[t]=!1,o}var Au=[Zo.Animate,Zo.Hover,Zo.Tap,Zo.Drag,Zo.Focus,Zo.Exit],Lu=Ue([],He(Au)).reverse(),Ou=Au.length;function ku(n){return function(t){return Promise.all(t.map((function(t){var e=t.animation,r=t.options;return function(n,t,e){var r;if(void 0===e&&(e={}),n.notifyAnimationStart(),Array.isArray(t)){var o=t.map((function(t){return Eu(n,t,e)}));r=Promise.all(o)}else if("string"==typeof t)r=Eu(n,t,e);else{var i="function"==typeof t?vr(n,t,e.custom):t;r=Tu(n,i,e)}return r.then((function(){return n.notifyAnimationComplete(t)}))}(n,e,r)})))}}function Ru(n){var t,e=ku(n),r=((t={})[Zo.Animate]=Nu(!0),t[Zo.Hover]=Nu(),t[Zo.Tap]=Nu(),t[Zo.Drag]=Nu(),t[Zo.Focus]=Nu(),t[Zo.Exit]=Nu(),t),o={},i=!0,a=function(t,e){var r=vr(n,e);if(r){r.transition;var o=r.transitionEnd,i=Ye(r,["transition","transitionEnd"]);t=We(We(We({},t),i),o)}return t};function u(t,u){for(var s,c=n.getProps(),l=n.getVariantContext(!0)||{},f=[],p=new Set,d={},h=1/0,v=function(e){var o=Lu[e],v=r[o],m=null!==(s=c[o])&&void 0!==s?s:l[o],g=dr(m),y=o===u?v.isActive:null;!1===y&&(h=e);var b=m===l[o]&&m!==c[o]&&g;if(b&&i&&n.manuallyAnimateOnMount&&(b=!1),v.protectedKeys=We({},d),!v.isActive&&null===y||!m&&!v.prevProp||Yo(m)||"boolean"==typeof m)return"continue";var w=function(n,t){if("string"==typeof t)return t!==n;if(pr(t))return!Ha(t,n);return!1}(v.prevProp,m)||o===u&&v.isActive&&!b&&g||e>h&&g,x=Array.isArray(m)?m:[m],S=x.reduce(a,{});!1===y&&(S={});var _=v.prevResolvedValues,E=void 0===_?{}:_,T=We(We({},E),S),P=function(n){w=!0,p.delete(n),v.needsAnimating[n]=!0};for(var C in T){var A=S[C],L=E[C];d.hasOwnProperty(C)||(A!==L?Ho(A)&&Ho(L)?Ha(A,L)?v.protectedKeys[C]=!0:P(C):void 0!==A?P(C):p.add(C):void 0!==A&&p.has(C)?P(C):v.protectedKeys[C]=!0)}v.prevProp=m,v.prevResolvedValues=S,v.isActive&&(d=We(We({},d),S)),i&&n.blockInitialAnimation&&(w=!1),w&&!b&&f.push.apply(f,Ue([],He(x.map((function(n){return{animation:n,options:We({type:o},t)}})))))},m=0;m<Ou;m++)v(m);if(o=We({},d),p.size){var g={};p.forEach((function(t){var e=n.getBaseTarget(t);void 0!==e&&(g[t]=e)})),f.push({animation:g})}var y=Boolean(f.length);return i&&!1===c.initial&&!n.manuallyAnimateOnMount&&(y=!1),i=!1,y?e(f):Promise.resolve()}return{isAnimated:function(n){return void 0!==o[n]},animateChanges:u,setActive:function(t,e,o){var i;return r[t].isActive===e?Promise.resolve():(null===(i=n.variantChildren)||void 0===i||i.forEach((function(n){var r;return null===(r=n.animationState)||void 0===r?void 0:r.setActive(t,e)})),r[t].isActive=e,u(o,t))},setAnimateFunction:function(t){e=t(n)},getState:function(){return r}}}function Nu(n){return void 0===n&&(n=!1),{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}var zu={animation:Wa((function(n){var t=n.visualElement,e=n.animate;t.animationState||(t.animationState=Ru(t)),Yo(e)&&(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return e.subscribe(t)}),[e])})),exit:Wa((function(n){var t=n.custom,e=n.visualElement,o=He(rr(),2),a=o[0],u=o[1],s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(tr);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var n,r,o=null===(n=e.animationState)||void 0===n?void 0:n.setActive(Zo.Exit,!a,{custom:null!==(r=null==s?void 0:s.custom)&&void 0!==r?r:t});!a&&(null==o||o.then(u))}),[a])}))},Iu=function(){function n(n,t,e){var r=this,o=(void 0===e?{}:e).transformPagePoint;if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.updatePoint=function(){if(r.lastMoveEvent&&r.lastMoveEventInfo){var n=Mu(r.lastMoveEventInfo,r.history),t=null!==r.startEvent,e=Ia(n.offset,{x:0,y:0})>=3;if(t||e){var o=n.point,i=Ca().timestamp;r.history.push(We(We({},o),{timestamp:i}));var a=r.handlers,u=a.onStart,s=a.onMove;t||(u&&u(r.lastMoveEvent,n),r.startEvent=r.lastMoveEvent),s&&s(r.lastMoveEvent,n)}}},this.handlePointerMove=function(n,t){r.lastMoveEvent=n,r.lastMoveEventInfo=Du(t,r.transformPagePoint),ti(n)&&0===n.buttons?r.handlePointerUp(n,t):xa.update(r.updatePoint,!0)},this.handlePointerUp=function(n,t){r.end();var e=r.handlers,o=e.onEnd,i=e.onSessionEnd,a=Mu(Du(t,r.transformPagePoint),r.history);r.startEvent&&o&&o(n,a),i&&i(n,a)},!(ei(n)&&n.touches.length>1)){this.handlers=t,this.transformPagePoint=o;var i=Du(ai(n),this.transformPagePoint),a=i.point,u=Ca().timestamp;this.history=[We(We({},a),{timestamp:u})];var s=t.onSessionStart;s&&s(n,Mu(i,this.history)),this.removeListeners=Mi(fi(window,"pointermove",this.handlePointerMove),fi(window,"pointerup",this.handlePointerUp),fi(window,"pointercancel",this.handlePointerUp))}}return n.prototype.updateHandlers=function(n){this.handlers=n},n.prototype.end=function(){this.removeListeners&&this.removeListeners(),Sa.update(this.updatePoint)},n}();function Du(n,t){return t?{point:t(n.point)}:n}function ju(n,t){return{x:n.x-t.x,y:n.y-t.y}}function Mu(n,t){var e=n.point;return{point:e,delta:ju(e,Vu(t)),offset:ju(e,Bu(t)),velocity:Fu(t,.1)}}function Bu(n){return n[0]}function Vu(n){return n[n.length-1]}function Fu(n,t){if(n.length<2)return{x:0,y:0};for(var e=n.length-1,r=null,o=Vu(n);e>=0&&(r=n[e],!(o.timestamp-r.timestamp>Ua(t)));)e--;if(!r)return{x:0,y:0};var i=(o.timestamp-r.timestamp)/1e3;if(0===i)return{x:0,y:0};var a={x:(o.x-r.x)/i,y:(o.y-r.y)/i};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}function Wu(n){return n}function Yu(n){var t=n.top;return{x:{min:n.left,max:n.right},y:{min:t,max:n.bottom}}}var Hu={translate:0,scale:1,origin:0,originPoint:0};function Uu(){return{x:We({},Hu),y:We({},Hu)}}function $u(n){return[n("x"),n("y")]}function Xu(n,t,e){var r=t.min,o=t.max;return void 0!==r&&n<r?n=e?Oi(r,n,e.min):Math.max(n,r):void 0!==o&&n>o&&(n=e?Oi(o,n,e.max):Math.min(n,o)),n}function qu(n,t,e){return{min:void 0!==t?n.min+t:void 0,max:void 0!==e?n.max+e-(n.max-n.min):void 0}}function Gu(n,t){var e,r=t.min-n.min,o=t.max-n.max;return t.max-t.min<n.max-n.min&&(r=(e=He([o,r],2))[0],o=e[1]),{min:n.min+r,max:n.min+o}}function Ku(n,t,e){return{min:Zu(n,t),max:Zu(n,e)}}function Zu(n,t){var e;return"number"==typeof n?n:null!==(e=n[t])&&void 0!==e?e:0}function Ju(n,t){return Yu(function(n,t){var e=n.top,r=n.left,o=n.bottom,i=n.right;void 0===t&&(t=Wu);var a=t({x:r,y:e}),u=t({x:i,y:o});return{top:a.y,left:a.x,bottom:u.y,right:u.x}}(n.getBoundingClientRect(),t))}function Qu(n,t,e){return void 0===t&&(t=0),void 0===e&&(e=.01),Ia(n,t)<e}function ns(n){return n.max-n.min}function ts(n,t){var e=.5,r=ns(n),o=ns(t);return o>r?e=Li(t.min,t.max-r,n.min):r>o&&(e=Li(n.min,n.max-o,t.min)),function(n){return xi(0,1,n)}(e)}function es(n,t,e,r){void 0===r&&(r=.5),n.origin=r,n.originPoint=Oi(t.min,t.max,n.origin),n.scale=ns(e)/ns(t),Qu(n.scale,1,1e-4)&&(n.scale=1),n.translate=Oi(e.min,e.max,n.origin)-n.originPoint,Qu(n.translate)&&(n.translate=0)}function rs(n,t,e,r){es(n.x,t.x,e.x,os(r.originX)),es(n.y,t.y,e.y,os(r.originY))}function os(n){return"number"==typeof n?n:.5}function is(n,t,e){n.min=e.min+t.min,n.max=n.min+ns(t)}var as=function(n,t){return n.depth-t.depth};function us(n){return n.projection.isEnabled||n.shouldResetTransform()}function ss(n,t){void 0===t&&(t=[]);var e=n.parent;return e&&ss(e,t),us(n)&&t.push(n),t}function cs(n){if(!n.shouldResetTransform()){var t,e=n.getLayoutState();n.notifyBeforeLayoutMeasure(e.layout),e.isHydrated=!0,e.layout=n.measureViewportBox(),e.layoutCorrected=(t=e.layout,{x:We({},t.x),y:We({},t.y)}),n.notifyLayoutMeasure(e.layout,n.prevViewportBox||e.layout),xa.update((function(){return n.rebaseProjectionTarget()}))}}function ls(n,t){return{min:t.min-n.min,max:t.max-n.min}}function fs(n,t){return{x:ls(n.x,t.x),y:ls(n.y,t.y)}}function ps(n,t){var e=n.getLayoutId(),r=t.getLayoutId();return e!==r||void 0===r&&n!==t}function ds(n){var t=n.getProps(),e=t.drag,r=t._dragX;return e&&!r}function hs(n,t){n.min=t.min,n.max=t.max}function vs(n,t,e){return e+t*(n-e)}function ms(n,t,e,r,o){return void 0!==o&&(n=vs(n,o,r)),vs(n,e,r)+t}function gs(n,t,e,r,o){void 0===t&&(t=0),void 0===e&&(e=1),n.min=ms(n.min,t,e,r,o),n.max=ms(n.max,t,e,r,o)}function ys(n,t){var e=t.x,r=t.y;gs(n.x,e.translate,e.scale,e.originPoint),gs(n.y,r.translate,r.scale,r.originPoint)}function bs(n,t,e,r){var o=He(r,3),i=o[0],a=o[1],u=o[2];n.min=t.min,n.max=t.max;var s=void 0!==e[u]?e[u]:.5,c=Oi(t.min,t.max,s);gs(n,e[i],e[a],c,e.scale)}var ws=["x","scaleX","originX"],xs=["y","scaleY","originY"];function Ss(n,t,e){bs(n.x,t.x,e,ws),bs(n.y,t.y,e,xs)}function _s(n,t,e,r,o){return n=vs(n-=t,1/e,r),void 0!==o&&(n=vs(n,1/o,r)),n}function Es(n,t,e){var r=He(e,3),o=r[0],i=r[1],a=r[2];!function(n,t,e,r,o){void 0===t&&(t=0),void 0===e&&(e=1),void 0===r&&(r=.5);var i=Oi(n.min,n.max,r)-t;n.min=_s(n.min,t,e,i,o),n.max=_s(n.max,t,e,i,o)}(n,t[o],t[i],t[a],t.scale)}function Ts(n,t){Es(n.x,t,ws),Es(n.y,t,xs)}var Ps=new Set;function Cs(n,t,e){n[e]||(n[e]=[]),n[e].push(t)}function As(n){return Ps.add(n),function(){return Ps.delete(n)}}function Ls(){if(Ps.size){var n=0,t=[[]],e=[],r=function(e){return Cs(t,e,n)},o=function(t){Cs(e,t,n),n++};Ps.forEach((function(t){t(r,o),n=0})),Ps.clear();for(var i=e.length,a=0;a<=i;a++)t[a]&&t[a].forEach(ks),e[a]&&e[a].forEach(ks)}}var Os,ks=function(n){return n()},Rs=new WeakMap,Ns=function(){function n(n){var t=n.visualElement;this.isDragging=!1,this.currentDirection=null,this.constraints=!1,this.elastic={x:{min:0,max:1},y:{min:0,max:1}},this.props={},this.hasMutatedConstraints=!1,this.cursorProgress={x:.5,y:.5},this.originPoint={},this.openGlobalLock=null,this.panSession=null,this.visualElement=t,this.visualElement.enableLayoutProjection(),Rs.set(t,this)}return n.prototype.start=function(n,t){var e=this,r=void 0===t?{}:t,o=r.snapToCursor,i=void 0!==o&&o,a=r.cursorProgress,u=this.props.transformPagePoint;this.panSession=new Iu(n,{onSessionStart:function(n){var t;e.stopMotion();var r=function(n){return ai(n,"client")}(n).point;null===(t=e.cancelLayout)||void 0===t||t.call(e),e.cancelLayout=As((function(n,t){var o=ss(e.visualElement),u=function(n){var t=[],e=function(n){us(n)&&t.push(n),n.children.forEach(e)};return n.children.forEach(e),t.sort(as)}(e.visualElement),s=Ue(Ue([],He(o)),He(u)),c=!1;e.isLayoutDrag()&&e.visualElement.lockProjectionTarget(),t((function(){s.forEach((function(n){return n.resetTransform()}))})),n((function(){cs(e.visualElement),u.forEach(cs)})),t((function(){s.forEach((function(n){return n.restoreTransform()})),i&&(c=e.snapToCursor(r))})),n((function(){Boolean(e.getAxisMotionValue("x")&&!e.isExternalDrag())||e.visualElement.rebaseProjectionTarget(!0,e.visualElement.measureViewportBox(!1)),e.visualElement.scheduleUpdateLayoutProjection();var n=e.visualElement.projection;$u((function(t){if(!c){var o=n.target[t],i=o.min,u=o.max;e.cursorProgress[t]=a?a[t]:Li(i,u,r[t])}var s=e.getAxisMotionValue(t);s&&(e.originPoint[t]=s.get())}))})),t((function(){_a.update(),_a.preRender(),_a.render(),_a.postRender()})),n((function(){return e.resolveDragConstraints()}))}))},onStart:function(n,t){var r,o,i,a=e.props,u=a.drag,s=a.dragPropagation;(!u||s||(e.openGlobalLock&&e.openGlobalLock(),e.openGlobalLock=mi(u),e.openGlobalLock))&&(Ls(),e.isDragging=!0,e.currentDirection=null,null===(o=(r=e.props).onDragStart)||void 0===o||o.call(r,n,t),null===(i=e.visualElement.animationState)||void 0===i||i.setActive(Zo.Drag,!0))},onMove:function(n,t){var r,o,i,a,u=e.props,s=u.dragPropagation,c=u.dragDirectionLock;if(s||e.openGlobalLock){var l=t.offset;if(c&&null===e.currentDirection)return e.currentDirection=function(n,t){void 0===t&&(t=10);var e=null;Math.abs(n.y)>t?e="y":Math.abs(n.x)>t&&(e="x");return e}(l),void(null!==e.currentDirection&&(null===(o=(r=e.props).onDirectionLock)||void 0===o||o.call(r,e.currentDirection)));e.updateAxis("x",t.point,l),e.updateAxis("y",t.point,l),null===(a=(i=e.props).onDrag)||void 0===a||a.call(i,n,t),Os=n}},onSessionEnd:function(n,t){return e.stop(n,t)}},{transformPagePoint:u})},n.prototype.resolveDragConstraints=function(){var n=this,t=this.props,e=t.dragConstraints,r=t.dragElastic,o=this.visualElement.getLayoutState().layoutCorrected;this.constraints=!!e&&(fr(e)?this.resolveRefConstraints(o,e):function(n,t){var e=t.top,r=t.left,o=t.bottom,i=t.right;return{x:qu(n.x,r,i),y:qu(n.y,e,o)}}(o,e)),this.elastic=function(n){return!1===n?n=0:!0===n&&(n=.35),{x:Ku(n,"left","right"),y:Ku(n,"top","bottom")}}(r),this.constraints&&!this.hasMutatedConstraints&&$u((function(t){n.getAxisMotionValue(t)&&(n.constraints[t]=function(n,t){var e={};return void 0!==t.min&&(e.min=t.min-n.min),void 0!==t.max&&(e.max=t.max-n.min),e}(o[t],n.constraints[t]))}))},n.prototype.resolveRefConstraints=function(n,t){var e=this.props,r=e.onMeasureDragConstraints,o=e.transformPagePoint,i=t.current;Ge(null!==i,"If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."),this.constraintsBox=Ju(i,o);var a=function(n,t){return{x:Gu(n.x,t.x),y:Gu(n.y,t.y)}}(n,this.constraintsBox);if(r){var u=r(function(n){var t=n.x,e=n.y;return{top:e.min,bottom:e.max,left:t.min,right:t.max}}(a));this.hasMutatedConstraints=!!u,u&&(a=Yu(u))}return a},n.prototype.cancelDrag=function(){var n,t;this.visualElement.unlockProjectionTarget(),null===(n=this.cancelLayout)||void 0===n||n.call(this),this.isDragging=!1,this.panSession&&this.panSession.end(),this.panSession=null,!this.props.dragPropagation&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),null===(t=this.visualElement.animationState)||void 0===t||t.setActive(Zo.Drag,!1)},n.prototype.stop=function(n,t){var e,r,o;null===(e=this.panSession)||void 0===e||e.end(),this.panSession=null;var i=this.isDragging;if(this.cancelDrag(),i){var a=t.velocity;this.animateDragEnd(a),null===(o=(r=this.props).onDragEnd)||void 0===o||o.call(r,n,t)}},n.prototype.snapToCursor=function(n){var t=this;return $u((function(e){if(zs(e,t.props.drag,t.currentDirection)){var r=t.getAxisMotionValue(e);if(!r)return t.cursorProgress[e]=.5,!0;var o=t.visualElement.getLayoutState().layout,i=o[e].max-o[e].min,a=o[e].min+i/2,u=n[e]-a;t.originPoint[e]=n[e],r.set(u)}})).includes(!0)},n.prototype.updateAxis=function(n,t,e){if(zs(n,this.props.drag,this.currentDirection))return this.getAxisMotionValue(n)?this.updateAxisMotionValue(n,e):this.updateVisualElementAxis(n,t)},n.prototype.updateAxisMotionValue=function(n,t){var e=this.getAxisMotionValue(n);if(t&&e){var r=this.originPoint[n]+t[n],o=this.constraints?Xu(r,this.constraints[n],this.elastic[n]):r;e.set(o)}},n.prototype.updateVisualElementAxis=function(n,t){var e,r=this.visualElement.getLayoutState().layout[n],o=r.max-r.min,i=this.cursorProgress[n],a=function(n,t,e,r,o){var i=n-t*e;return r?Xu(i,r,o):i}(t[n],o,i,null===(e=this.constraints)||void 0===e?void 0:e[n],this.elastic[n]);this.visualElement.setProjectionTargetAxis(n,a,a+o)},n.prototype.setProps=function(n){var t=n.drag,e=void 0!==t&&t,r=n.dragDirectionLock,o=void 0!==r&&r,i=n.dragPropagation,a=void 0!==i&&i,u=n.dragConstraints,s=void 0!==u&&u,c=n.dragElastic,l=void 0===c?.35:c,f=n.dragMomentum,p=void 0===f||f,d=Ye(n,["drag","dragDirectionLock","dragPropagation","dragConstraints","dragElastic","dragMomentum"]);this.props=We({drag:e,dragDirectionLock:o,dragPropagation:a,dragConstraints:s,dragElastic:l,dragMomentum:p},d)},n.prototype.getAxisMotionValue=function(n){var t=this.props,e=t.layout,r=t.layoutId,o="_drag"+n.toUpperCase();return this.props[o]?this.props[o]:e||void 0!==r?void 0:this.visualElement.getValue(n,0)},n.prototype.isLayoutDrag=function(){return!this.getAxisMotionValue("x")},n.prototype.isExternalDrag=function(){var n=this.props,t=n._dragX,e=n._dragY;return t||e},n.prototype.animateDragEnd=function(n){var t=this,e=this.props,r=e.drag,o=e.dragMomentum,i=e.dragElastic,a=e.dragTransition,u=function(n,t){void 0===t&&(t=!0);var e,r=n.getProjectionParent();return!!r&&(t?Ts(e=fs(r.projection.target,n.projection.target),r.getLatestValues()):e=fs(r.getLayoutState().layout,n.getLayoutState().layout),$u((function(t){return n.setProjectionTargetAxis(t,e[t].min,e[t].max,!0)})),!0)}(this.visualElement,this.isLayoutDrag()&&!this.isExternalDrag()),s=this.constraints||{};if(u&&Object.keys(s).length&&this.isLayoutDrag()){var c=this.visualElement.getProjectionParent();if(c){var l=fs(c.projection.targetFinal,s);$u((function(n){var t=l[n],e=t.min,r=t.max;s[n]={min:isNaN(e)?void 0:e,max:isNaN(r)?void 0:r}}))}}var f=$u((function(e){var c;if(zs(e,r,t.currentDirection)){var l=null!==(c=null==s?void 0:s[e])&&void 0!==c?c:{},f=i?200:1e6,p=i?40:1e7,d=We(We({type:"inertia",velocity:o?n[e]:0,bounceStiffness:f,bounceDamping:p,timeConstant:750,restDelta:1,restSpeed:10},a),l);return t.getAxisMotionValue(e)?t.startAxisValueAnimation(e,d):t.visualElement.startLayoutAnimation(e,d,u)}}));return Promise.all(f).then((function(){var n,e;null===(e=(n=t.props).onDragTransitionEnd)||void 0===e||e.call(n)}))},n.prototype.stopMotion=function(){var n=this;$u((function(t){var e=n.getAxisMotionValue(t);e?e.stop():n.visualElement.stopLayoutAnimation()}))},n.prototype.startAxisValueAnimation=function(n,t){var e=this.getAxisMotionValue(n);if(e){var r=e.get();return e.set(r),e.set(r),lu(n,e,0,t)}},n.prototype.scalePoint=function(){var n=this,t=this.props,e=t.drag;if(fr(t.dragConstraints)&&this.constraintsBox){this.stopMotion();var r={x:0,y:0};$u((function(t){r[t]=ts(n.visualElement.projection.target[t],n.constraintsBox[t])})),this.updateConstraints((function(){$u((function(t){if(zs(t,e,null)){var o=function(n,t,e){var r=n.max-n.min,o=Oi(t.min,t.max-r,e);return{min:o,max:o+r}}(n.visualElement.projection.target[t],n.constraintsBox[t],r[t]),i=o.min,a=o.max;n.visualElement.setProjectionTargetAxis(t,i,a)}}))})),setTimeout(Ls,1)}},n.prototype.updateConstraints=function(n){var t=this;this.cancelLayout=As((function(e,r){var o=ss(t.visualElement);r((function(){return o.forEach((function(n){return n.resetTransform()}))})),e((function(){return cs(t.visualElement)})),r((function(){return o.forEach((function(n){return n.restoreTransform()}))})),e((function(){t.resolveDragConstraints()})),n&&r(n)}))},n.prototype.mount=function(n){var t=this,e=fi(n.getInstance(),"pointerdown",(function(n){var e=t.props,r=e.drag,o=e.dragListener;r&&(void 0===o||o)&&t.start(n)})),r=Qo(window,"resize",(function(){t.scalePoint()})),o=n.onLayoutUpdate((function(){t.isDragging&&t.resolveDragConstraints()})),i=n.prevDragCursor;return i&&this.start(Os,{cursorProgress:i}),function(){null==e||e(),null==r||r(),null==o||o(),t.cancelDrag()}},n}();function zs(n,t,e){return!(!0!==t&&t!==n||null!==e&&e!==n)}var Is,Ds,js={pan:Wa((function(n){var t=n.onPan,e=n.onPanStart,a=n.onPanEnd,u=n.onPanSessionStart,s=n.visualElement,c=t||e||a||u,l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Qe).transformPagePoint,p={onSessionStart:u,onStart:e,onMove:t,onEnd:function(n,t){l.current=null,a&&a(n,t)}};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){null!==l.current&&l.current.updateHandlers(p)})),pi(s,"pointerdown",c&&function(n){l.current=new Iu(n,p,{transformPagePoint:f})}),wi((function(){return l.current&&l.current.end()}))})),drag:Wa((function(n){var t=n.dragControls,e=n.visualElement,o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Qe).transformPagePoint,a=er((function(){return new Ns({visualElement:e})}));a.setProps(We(We({},n),{transformPagePoint:o})),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return t&&t.subscribe(a)}),[a]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return a.mount(e)}),[])}))};function Ms(n){return"string"==typeof n&&n.startsWith("var(--")}!function(n){n[n.Entering=0]="Entering",n[n.Present=1]="Present",n[n.Exiting=2]="Exiting"}(Is||(Is={})),function(n){n[n.Hide=0]="Hide",n[n.Show=1]="Show"}(Ds||(Ds={}));var Bs=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function Vs(n,t,e){void 0===e&&(e=1),Ge(e<=4,'Max CSS variable fallback depth detected in property "'+n+'". This may indicate a circular fallback dependency.');var r=He(function(n){var t=Bs.exec(n);if(!t)return[,];var e=He(t,3);return[e[1],e[2]]}(n),2),o=r[0],i=r[1];if(o){var a=window.getComputedStyle(t).getPropertyValue(o);return a?a.trim():Ms(i)?Vs(i,t,e+1):i}}function Fs(n,t){return n/(t.max-t.min)*100}var Ws={process:function(n,t,e){var r=e.target;if("string"==typeof n){if(!Gr.test(n))return n;n=parseFloat(n)}return Fs(n,r.x)+"% "+Fs(n,r.y)+"%"}},Ys={borderRadius:We(We({},Ws),{applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]}),borderTopLeftRadius:Ws,borderTopRightRadius:Ws,borderBottomLeftRadius:Ws,borderBottomRightRadius:Ws,boxShadow:{process:function(n,t){var e=t.delta,r=t.treeScale,o=n,i=n.includes("var("),a=[];i&&(n=n.replace(Bs,(function(n){return a.push(n),"_$css"})));var u=fo.parse(n);if(u.length>5)return o;var s=fo.createTransformer(n),c="number"!=typeof u[0]?1:0,l=e.x.scale*r.x,f=e.y.scale*r.y;u[0+c]/=l,u[1+c]/=f;var p=Oi(l,f,.5);"number"==typeof u[2+c]&&(u[2+c]/=p),"number"==typeof u[3+c]&&(u[3+c]/=p);var d=s(u);if(i){var h=0;d=d.replace("_$css",(function(){var n=a[h];return h++,n}))}return d}}},Hs=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.frameTarget={x:{min:0,max:1},y:{min:0,max:1}},t.currentAnimationTarget={x:{min:0,max:1},y:{min:0,max:1}},t.isAnimating={x:!1,y:!1},t.stopAxisAnimation={x:void 0,y:void 0},t.isAnimatingTree=!1,t.animate=function(n,e,r){void 0===r&&(r={});var o=r.originBox,i=r.targetBox,a=r.visibilityAction,u=r.shouldStackAnimate,s=r.onComplete,c=r.prevParent,l=Ye(r,["originBox","targetBox","visibilityAction","shouldStackAnimate","onComplete","prevParent"]),f=t.props,p=f.visualElement,d=f.layout;if(!1===u)return t.isAnimatingTree=!1,t.safeToRemove();if(!t.isAnimatingTree||!0===u){u&&(t.isAnimatingTree=!0),e=o||e,n=i||n;var h=!1,v=p.getProjectionParent();if(v){var m=v.prevViewportBox,g=v.getLayoutState().layout;c&&(i&&(g=c.getLayoutState().layout),o&&!ps(c,v)&&c.prevViewportBox&&(m=c.prevViewportBox)),m&&Ks(c,o,i)&&(h=!0,e=fs(m,e),n=fs(g,n))}var y=Us(e,n),b=$u((function(r){var o,i;if("position"===d){var u=n[r].max-n[r].min;e[r].max=e[r].min+u}if(!p.projection.isTargetLocked)return void 0===a?y?t.animateAxis(r,n[r],e[r],We(We({},l),{isRelative:h})):(null===(i=(o=t.stopAxisAnimation)[r])||void 0===i||i.call(o),p.setProjectionTargetAxis(r,n[r].min,n[r].max,h)):void p.setVisibility(a===Ds.Show)}));return p.syncRender(),Promise.all(b).then((function(){t.isAnimatingTree=!1,s&&s(),p.notifyLayoutAnimationComplete()}))}},t}return Fe(t,n),t.prototype.componentDidMount=function(){var n=this,t=this.props.visualElement;t.animateMotionValue=lu,t.enableLayoutProjection(),this.unsubLayoutReady=t.onLayoutUpdate(this.animate),t.layoutSafeToRemove=function(){return n.safeToRemove()},function(n){for(var t in n)Er[t]=n[t]}(Ys)},t.prototype.componentWillUnmount=function(){var n=this;this.unsubLayoutReady(),$u((function(t){var e,r;return null===(r=(e=n.stopAxisAnimation)[t])||void 0===r?void 0:r.call(e)}))},t.prototype.animateAxis=function(n,t,e,r){var o,i,a=this,u=void 0===r?{}:r,s=u.transition,c=u.isRelative;if(!this.isAnimating[n]||!qs(t,this.currentAnimationTarget[n])){null===(i=(o=this.stopAxisAnimation)[n])||void 0===i||i.call(o),this.isAnimating[n]=!0;var l=this.props.visualElement,f=this.frameTarget[n],p=l.getProjectionAnimationProgress()[n];p.clearListeners(),p.set(0),p.set(0);var d=function(){var r=p.get()/1e3;!function(n,t,e,r){n.min=Oi(t.min,e.min,r),n.max=Oi(t.max,e.max,r)}(f,e,t,r),l.setProjectionTargetAxis(n,f.min,f.max,c)};d();var h=p.onChange(d);this.stopAxisAnimation[n]=function(){a.isAnimating[n]=!1,p.stop(),h()},this.currentAnimationTarget[n]=t;var v=s||l.getDefaultTransition()||Gs;return lu("x"===n?"layoutX":"layoutY",p,1e3,v&&cu(v,"layout")).then(this.stopAxisAnimation[n])}},t.prototype.safeToRemove=function(){var n,t;null===(t=(n=this.props).safeToRemove)||void 0===t||t.call(n)},t.prototype.render=function(){return null},t}(react__WEBPACK_IMPORTED_MODULE_0__.Component);function Us(n,t){return!(Xs(n)||Xs(t)||qs(n.x,t.x)&&qs(n.y,t.y))}var $s={min:0,max:0};function Xs(n){return qs(n.x,$s)&&qs(n.y,$s)}function qs(n,t){return n.min===t.min&&n.max===t.max}var Gs={duration:.45,ease:[.4,0,.1,1]};function Ks(n,t,e){return n||!n&&!(t||e)}var Zs={layoutReady:function(n){return n.notifyLayoutReady()}};function Js(){var n=new Set;return{add:function(t){return n.add(t)},flush:function(t){var e=void 0===t?Zs:t,r=e.layoutReady,o=e.parent;As((function(t,e){var i=Array.from(n).sort(as),a=o?ss(o):[];e((function(){Ue(Ue([],He(a)),He(i)).forEach((function(n){return n.resetTransform()}))})),t((function(){i.forEach(cs)})),e((function(){a.forEach((function(n){return n.restoreTransform()})),i.forEach(r)})),t((function(){i.forEach((function(n){n.isPresent&&(n.presence=Is.Present)}))})),e((function(){_a.preRender(),_a.render()})),t((function(){xa.postRender((function(){return i.forEach(Qs)})),n.clear()}))})),Ls()}}}function Qs(n){n.prevViewportBox=n.projection.target}var nc=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(Js()),tc=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(Js());function ec(n){return!!n.forceUpdate}var rc=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return Fe(t,n),t.prototype.componentDidMount=function(){var n=this.props,t=n.syncLayout,e=n.framerSyncLayout,r=n.visualElement;ec(t)&&t.register(r),ec(e)&&e.register(r),r.onUnmount((function(){ec(t)&&t.remove(r),ec(e)&&e.remove(r)}))},t.prototype.getSnapshotBeforeUpdate=function(){var n=this.props,t=n.syncLayout,e=n.visualElement;return ec(t)?t.syncUpdate():(!function(n){n.shouldResetTransform()||(n.prevViewportBox=n.measureViewportBox(!1),n.rebaseProjectionTarget(!1,n.prevViewportBox))}(e),t.add(e)),null},t.prototype.componentDidUpdate=function(){var n=this.props.syncLayout;ec(n)||n.flush()},t.prototype.render=function(){return null},t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));var oc={measureLayout:function(n){var e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(nc),o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(tc);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(rc,We({},n,{syncLayout:e,framerSyncLayout:o}))},layoutAnimation:function(t){var e=He(rr(),2)[1];return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Hs,We({},t,{safeToRemove:e}))}};function ic(){return{isHydrated:!1,layout:{x:{min:0,max:1},y:{min:0,max:1}},layoutCorrected:{x:{min:0,max:1},y:{min:0,max:1}},treeScale:{x:1,y:1},delta:Uu(),deltaFinal:Uu(),deltaTransform:""}}var ac=ic();function uc(n,t,e){var r=n.x,o=n.y,i="translate3d("+r.translate/t.x+"px, "+o.translate/t.y+"px, 0) ";if(e){var a=e.rotate,u=e.rotateX,s=e.rotateY;a&&(i+="rotate("+a+") "),u&&(i+="rotateX("+u+") "),s&&(i+="rotateY("+s+") ")}return i+="scale("+r.scale+", "+o.scale+")",e||i!==cc?i:""}function sc(n){var t=n.deltaFinal;return 100*t.x.origin+"% "+100*t.y.origin+"% 0"}var cc=uc(ac.delta,ac.treeScale,{x:1,y:1}),lc=["LayoutMeasure","BeforeLayoutMeasure","LayoutUpdate","ViewportBoxUpdate","Update","Render","AnimationComplete","LayoutAnimationComplete","AnimationStart","SetAxisTarget","Unmount"];function fc(n,t,e,r){var o,i,a=n.delta,u=n.layout,s=n.layoutCorrected,c=n.treeScale,l=t.target;i=u,hs((o=s).x,i.x),hs(o.y,i.y),function(n,t,e){var r=e.length;if(r){var o,i;t.x=t.y=1;for(var a=0;a<r;a++)i=(o=e[a]).getLayoutState().delta,t.x*=i.x.scale,t.y*=i.y.scale,ys(n,i),ds(o)&&Ss(n,n,o.getLatestValues())}}(s,c,e),rs(a,s,l,r)}var pc=function(){function n(){this.children=[],this.isDirty=!1}return n.prototype.add=function(n){pu(this.children,n),this.isDirty=!0},n.prototype.remove=function(n){du(this.children,n),this.isDirty=!0},n.prototype.forEach=function(n){this.isDirty&&this.children.sort(as),this.isDirty=!1,this.children.forEach(n)},n}();var dc=function(n){var t=n.treeType,e=void 0===t?"":t,r=n.build,o=n.getBaseTarget,i=n.makeTargetAnimatable,a=n.measureViewportBox,u=n.render,s=n.readValueFromInstance,c=n.resetTransform,l=n.restoreTransform,f=n.removeValueFromRenderState,p=n.sortNodePosition,d=n.scrapeMotionValuesFromProps;return function(n,t){var h=n.parent,v=n.props,m=n.presenceId,g=n.blockInitialAnimation,y=n.visualState;void 0===t&&(t={});var b,w,x,S,_,E,T=y.latestValues,P=y.renderState,C=function(){var n=lc.map((function(){return new hu})),t={},e={clearAllListeners:function(){return n.forEach((function(n){return n.clear()}))},updatePropListeners:function(n){return lc.forEach((function(r){var o;null===(o=t[r])||void 0===o||o.call(t);var i="on"+r,a=n[i];a&&(t[r]=e[i](a))}))}};return n.forEach((function(n,t){e["on"+lc[t]]=function(t){return n.add(t)},e["notify"+lc[t]]=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return n.notify.apply(n,Ue([],He(t)))}})),e}(),A={isEnabled:!1,isHydrated:!1,isTargetLocked:!1,target:{x:{min:0,max:1},y:{min:0,max:1}},targetFinal:{x:{min:0,max:1},y:{min:0,max:1}}},L=A,O=T,k=ic(),R=!1,N=new Map,z=new Map,I={},D=We({},T);function j(){b&&($.isProjectionReady()&&(Ss(L.targetFinal,L.target,O),rs(k.deltaFinal,k.layoutCorrected,L.targetFinal,T)),M(),u(b,P))}function M(){var n=T;if(S&&S.isActive()){var e=S.getCrossfadeState($);e&&(n=e)}r($,P,n,L,k,t,v)}function B(){C.notifyUpdate(T)}function V(){$.layoutTree.forEach(vc)}var F=d(v);for(var W in F){var Y=F[W];void 0!==T[W]&&Nr(Y)&&Y.set(T[W],!1)}var H=mr(v),U=gr(v),$=We(We({treeType:e,current:null,depth:h?h.depth+1:0,parent:h,children:new Set,path:h?Ue(Ue([],He(h.path)),[h]):[],layoutTree:h?h.layoutTree:new pc,presenceId:m,projection:A,variantChildren:U?new Set:void 0,isVisible:void 0,manuallyAnimateOnMount:Boolean(null==h?void 0:h.isMounted()),blockInitialAnimation:g,isMounted:function(){return Boolean(b)},mount:function(n){b=$.current=n,$.pointTo($),U&&h&&!H&&(E=null==h?void 0:h.addVariantChild($)),null==h||h.children.add($)},unmount:function(){Sa.update(B),Sa.render(j),Sa.preRender($.updateLayoutProjection),z.forEach((function(n){return n()})),$.stopLayoutAnimation(),$.layoutTree.remove($),null==E||E(),null==h||h.children.delete($),null==x||x(),C.clearAllListeners()},addVariantChild:function(n){var t,e=$.getClosestVariantNode();if(e)return null===(t=e.variantChildren)||void 0===t||t.add(n),function(){return e.variantChildren.delete(n)}},sortNodePosition:function(n){return p&&e===n.treeType?p($.getInstance(),n.getInstance()):0},getClosestVariantNode:function(){return U?$:null==h?void 0:h.getClosestVariantNode()},scheduleUpdateLayoutProjection:h?h.scheduleUpdateLayoutProjection:function(){return xa.preRender($.updateTreeLayoutProjection,!1,!0)},getLayoutId:function(){return v.layoutId},getInstance:function(){return b},getStaticValue:function(n){return T[n]},setStaticValue:function(n,t){return T[n]=t},getLatestValues:function(){return T},setVisibility:function(n){$.isVisible!==n&&($.isVisible=n,$.scheduleRender())},makeTargetAnimatable:function(n,t){return void 0===t&&(t=!0),i($,n,v,t)},addValue:function(n,t){$.hasValue(n)&&$.removeValue(n),N.set(n,t),T[n]=t.get(),function(n,t){var e=t.onChange((function(t){T[n]=t,v.onUpdate&&xa.update(B,!1,!0)})),r=t.onRenderRequest($.scheduleRender);z.set(n,(function(){e(),r()}))}(n,t)},removeValue:function(n){var t;N.delete(n),null===(t=z.get(n))||void 0===t||t(),z.delete(n),delete T[n],f(n,P)},hasValue:function(n){return N.has(n)},getValue:function(n,t){var e=N.get(n);return void 0===e&&void 0!==t&&(e=mu(t),$.addValue(n,e)),e},forEachValue:function(n){return N.forEach(n)},readValue:function(n){var e;return null!==(e=T[n])&&void 0!==e?e:s(b,n,t)},setBaseTarget:function(n,t){D[n]=t},getBaseTarget:function(n){if(o){var t=o(v,n);if(void 0!==t&&!Nr(t))return t}return D[n]}},C),{build:function(){return M(),P},scheduleRender:function(){xa.render(j,!1,!0)},syncRender:j,setProps:function(n){v=n,C.updatePropListeners(n),I=function(n,t,e){var r;for(var o in t){var i=t[o],a=e[o];if(Nr(i))n.addValue(o,i);else if(Nr(a))n.addValue(o,mu(i));else if(a!==i)if(n.hasValue(o)){var u=n.getValue(o);!u.hasAnimated&&u.set(i)}else n.addValue(o,mu(null!==(r=n.getStaticValue(o))&&void 0!==r?r:i))}for(var o in e)void 0===t[o]&&n.removeValue(o);return t}($,d(v),I)},getProps:function(){return v},getVariant:function(n){var t;return null===(t=v.variants)||void 0===t?void 0:t[n]},getDefaultTransition:function(){return v.transition},getVariantContext:function(n){if(void 0===n&&(n=!1),n)return null==h?void 0:h.getVariantContext();if(!H){var t=(null==h?void 0:h.getVariantContext())||{};return void 0!==v.initial&&(t.initial=v.initial),t}for(var e={},r=0;r<yc;r++){var o=gc[r],i=v[o];(dr(i)||!1===i)&&(e[o]=i)}return e},enableLayoutProjection:function(){A.isEnabled=!0,$.layoutTree.add($)},lockProjectionTarget:function(){A.isTargetLocked=!0},unlockProjectionTarget:function(){$.stopLayoutAnimation(),A.isTargetLocked=!1},getLayoutState:function(){return k},setCrossfader:function(n){S=n},isProjectionReady:function(){return A.isEnabled&&A.isHydrated&&k.isHydrated},startLayoutAnimation:function(n,t,e){void 0===e&&(e=!1);var r=$.getProjectionAnimationProgress()[n],o=e?A.relativeTarget[n]:A.target[n],i=o.min,a=o.max-i;return r.clearListeners(),r.set(i),r.set(i),r.onChange((function(t){$.setProjectionTargetAxis(n,t,t+a,e)})),$.animateMotionValue(n,r,0,t)},stopLayoutAnimation:function(){$u((function(n){return $.getProjectionAnimationProgress()[n].stop()}))},measureViewportBox:function(n){void 0===n&&(n=!0);var e=a(b,t);return n||Ts(e,T),e},getProjectionAnimationProgress:function(){return _||(_={x:mu(0),y:mu(0)}),_},setProjectionTargetAxis:function(n,t,e,r){var o;void 0===r&&(r=!1),r?(A.relativeTarget||(A.relativeTarget={x:{min:0,max:1},y:{min:0,max:1}}),o=A.relativeTarget[n]):(A.relativeTarget=void 0,o=A.target[n]),A.isHydrated=!0,o.min=t,o.max=e,R=!0,C.notifySetAxisTarget()},rebaseProjectionTarget:function(n,t){void 0===t&&(t=k.layout);var e=$.getProjectionAnimationProgress(),r=e.x,o=e.y,i=!(A.relativeTarget||A.isTargetLocked||r.isAnimating()||o.isAnimating());(n||i)&&$u((function(n){var e=t[n],r=e.min,o=e.max;$.setProjectionTargetAxis(n,r,o)}))},notifyLayoutReady:function(n){!function(n){var t=n.getProjectionParent();if(t){var e=fs(t.getLayoutState().layout,n.getLayoutState().layout);$u((function(t){n.setProjectionTargetAxis(t,e[t].min,e[t].max,!0)}))}else n.rebaseProjectionTarget()}($),$.notifyLayoutUpdate(k.layout,$.prevViewportBox||k.layout,n)},resetTransform:function(){return c($,b,v)},restoreTransform:function(){return l(b,P)},updateLayoutProjection:function(){if($.isProjectionReady()){var n=k.delta,t=k.treeScale,e=t.x,r=t.y,o=k.deltaTransform;fc(k,L,$.path,T),R&&$.notifyViewportBoxUpdate(L.target,n),R=!1;var i=uc(n,t);i===o&&e===t.x&&r===t.y||$.scheduleRender(),k.deltaTransform=i}},updateTreeLayoutProjection:function(){$.layoutTree.forEach(hc),xa.preRender(V,!1,!0)},getProjectionParent:function(){if(void 0===w){for(var n=!1,t=$.path.length-1;t>=0;t--){var e=$.path[t];if(e.projection.isEnabled){n=e;break}}w=n}return w},resolveRelativeTargetBox:function(){var n=$.getProjectionParent();if(A.relativeTarget&&n&&(function(n,t){is(n.target.x,n.relativeTarget.x,t.target.x),is(n.target.y,n.relativeTarget.y,t.target.y)}(A,n.projection),ds(n))){var t=A.target;Ss(t,t,n.getLatestValues())}},shouldResetTransform:function(){return Boolean(v._layoutResetTransform)},pointTo:function(n){L=n.projection,O=n.getLatestValues(),null==x||x(),x=Mi(n.onSetAxisTarget($.scheduleUpdateLayoutProjection),n.onLayoutAnimationComplete((function(){var n;$.isPresent?$.presence=Is.Present:null===(n=$.layoutSafeToRemove)||void 0===n||n.call($)})))},isPresent:!0,presence:Is.Entering});return $}};function hc(n){n.resolveRelativeTargetBox()}function vc(n){n.updateLayoutProjection()}var mc,gc=Ue(["initial"],He(Au)),yc=gc.length,bc=new Set(["width","height","top","left","right","bottom","x","y"]),wc=function(n){return bc.has(n)},xc=function(n,t){n.set(t,!1),n.set(t)},Sc=function(n){return n===Yr||n===Gr};!function(n){n.width="width",n.height="height",n.left="left",n.right="right",n.top="top",n.bottom="bottom"}(mc||(mc={}));var _c=function(n,t){return parseFloat(n.split(", ")[t])},Ec=function(n,t){return function(e,r){var o=r.transform;if("none"===o||!o)return 0;var i=o.match(/^matrix3d\((.+)\)$/);if(i)return _c(i[1],t);var a=o.match(/^matrix\((.+)\)$/);return a?_c(a[1],n):0}},Tc=new Set(["x","y","z"]),Pc=Pr.filter((function(n){return!Tc.has(n)}));var Cc={width:function(n){var t=n.x;return t.max-t.min},height:function(n){var t=n.y;return t.max-t.min},top:function(n,t){var e=t.top;return parseFloat(e)},left:function(n,t){var e=t.left;return parseFloat(e)},bottom:function(n,t){var e=n.y,r=t.top;return parseFloat(r)+(e.max-e.min)},right:function(n,t){var e=n.x,r=t.left;return parseFloat(r)+(e.max-e.min)},x:Ec(4,13),y:Ec(5,14)},Ac=function(n,t,e,r){void 0===e&&(e={}),void 0===r&&(r={}),t=We({},t),r=We({},r);var o=Object.keys(t).filter(wc),i=[],a=!1,u=[];if(o.forEach((function(o){var s=n.getValue(o);if(n.hasValue(o)){var c,l=e[o],f=t[o],p=bu(l);if(Ho(f))for(var d=f.length,h=null===f[0]?1:0;h<d;h++)c?Ge(bu(f[h])===c,"All keyframes must be of the same type"):(c=bu(f[h]),Ge(c===p||Sc(p)&&Sc(c),"Keyframes must be of the same dimension as the current value"));else c=bu(f);if(p!==c)if(Sc(p)&&Sc(c)){var v=s.get();"string"==typeof v&&s.set(parseFloat(v)),"string"==typeof f?t[o]=parseFloat(f):Array.isArray(f)&&c===Gr&&(t[o]=f.map(parseFloat))}else(null==p?void 0:p.transform)&&(null==c?void 0:c.transform)&&(0===l||0===f)?0===l?s.set(c.transform(l)):t[o]=p.transform(f):(a||(i=function(n){var t=[];return Pc.forEach((function(e){var r=n.getValue(e);void 0!==r&&(t.push([e,r.get()]),r.set(e.startsWith("scale")?1:0))})),t.length&&n.syncRender(),t}(n),a=!0),u.push(o),r[o]=void 0!==r[o]?r[o]:t[o],xc(s,f))}})),u.length){var s=function(n,t,e){var r=t.measureViewportBox(),o=t.getInstance(),i=getComputedStyle(o),a=i.display,u={top:i.top,left:i.left,bottom:i.bottom,right:i.right,transform:i.transform};"none"===a&&t.setStaticValue("display",n.display||"block"),t.syncRender();var s=t.measureViewportBox();return e.forEach((function(e){var o=t.getValue(e);xc(o,Cc[e](r,u)),n[e]=Cc[e](s,i)})),n}(t,n,u);return i.length&&i.forEach((function(t){var e=He(t,2),r=e[0],o=e[1];n.getValue(r).set(o)})),n.syncRender(),{target:s,transitionEnd:r}}return{target:t,transitionEnd:r}};function Lc(n,t,e,r){return function(n){return Object.keys(n).some(wc)}(t)?Ac(n,t,e,r):{target:t,transitionEnd:r}}var Oc=function(n,t,e,r){var o=function(n,t,e){var r,o=Ye(t,[]),i=n.getInstance();if(!(i instanceof HTMLElement))return{target:o,transitionEnd:e};for(var a in e&&(e=We({},e)),n.forEachValue((function(n){var t=n.get();if(Ms(t)){var e=Vs(t,i);e&&n.set(e)}})),o){var u=o[a];if(Ms(u)){var s=Vs(u,i);s&&(o[a]=s,e&&(null!==(r=e[a])&&void 0!==r||(e[a]=u)))}}return{target:o,transitionEnd:e}}(n,t,r);return Lc(n,t=o.target,e,r=o.transitionEnd)};var kc={treeType:"dom",readValueFromInstance:function(n,t){if(Lr(t)){var e=tu(t);return e&&e.default||0}var r,o=(r=n,window.getComputedStyle(r));return(Ir(t)?o.getPropertyValue(t):o[t])||0},sortNodePosition:function(n,t){return 2&n.compareDocumentPosition(t)?1:-1},getBaseTarget:function(n,t){var e;return null===(e=n.style)||void 0===e?void 0:e[t]},measureViewportBox:function(n,t){return Ju(n,t.transformPagePoint)},resetTransform:function(n,t,e){var r=e.transformTemplate;t.style.transform=r?r({},""):"none",n.scheduleRender()},restoreTransform:function(n,t){n.style.transform=t.style.transform},removeValueFromRenderState:function(n,t){var e=t.vars,r=t.style;delete e[n],delete r[n]},makeTargetAnimatable:function(n,t,e,r){var o=e.transformValues;void 0===r&&(r=!0);var i=t.transition,a=t.transitionEnd,u=Ye(t,["transition","transitionEnd"]),s=function(n,t,e){var r,o,i={};for(var a in n)i[a]=null!==(r=_u(a,t))&&void 0!==r?r:null===(o=e.getValue(a))||void 0===o?void 0:o.get();return i}(u,i||{},n);if(o&&(a&&(a=o(a)),u&&(u=o(u)),s&&(s=o(s))),r){!function(n,t,e){var r,o,i,a,u=Object.keys(t).filter((function(t){return!n.hasValue(t)})),s=u.length;if(s)for(var c=0;c<s;c++){var l=u[c],f=t[l],p=null;Array.isArray(f)&&(p=f[0]),null===p&&(p=null!==(o=null!==(r=e[l])&&void 0!==r?r:n.readValue(l))&&void 0!==o?o:t[l]),null!=p&&("string"==typeof p&&fu(p)?p=parseFloat(p):!xu(p)&&fo.test(f)&&(p=eu(l,f)),n.addValue(l,mu(p)),null!==(i=(a=e)[l])&&void 0!==i||(a[l]=p),n.setBaseTarget(l,p))}}(n,u,s);var c=Oc(n,u,s,a);a=c.transitionEnd,u=c.target}return We({transition:i,transitionEnd:a},u)},scrapeMotionValuesFromProps:Fo,build:function(n,t,e,r,o,i,a){void 0!==n.isVisible&&(t.style.visibility=n.isVisible?"visible":"hidden");var u=r.isEnabled&&o.isHydrated;bo(t,e,r,o,i,a.transformTemplate,u?uc:void 0,u?sc:void 0)},render:Mo},Rc=dc(kc),Nc=dc(We(We({},kc),{getBaseTarget:function(n,t){return n[t]},readValueFromInstance:function(n,t){var e;return Lr(t)?(null===(e=tu(t))||void 0===e?void 0:e.default)||0:(t=Bo.has(t)?t:jo(t),n.getAttribute(t))},scrapeMotionValuesFromProps:Wo,build:function(n,t,e,r,o,i,a){var u=r.isEnabled&&o.isHydrated;Ro(t,e,r,o,i,a.transformTemplate,u?uc:void 0,u?sc:void 0)},render:Vo})),zc=function(n,t){return _r(n)?Nc(t,{enableHardwareAcceleration:!1}):Rc(t,{enableHardwareAcceleration:!0})},Ic=We(We(We(We({},zu),Ya),js),oc),Dc=xr((function(n,t){return function(n,t,e,r){var o=t.forwardMotionProps,i=void 0!==o&&o,a=_r(n)?Ko:Jo;return We(We({},a),{preloadedFeatures:e,useRender:Io(i),createVisualElement:r,Component:n})}(n,t,Ic,zc)}));var jc=0;function Mc(){var n=jc;return jc++,n}var Bc=function(t){var e=t.children,r=t.initial,o=t.isPresent,i=t.onExitComplete,a=t.custom,u=t.presenceAffectsLayout,s=er(Vc),c=er(Mc),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return{id:c,initial:r,isPresent:o,custom:a,onExitComplete:function(n){s.set(n,!0);var t=!0;s.forEach((function(n){n||(t=!1)})),t&&(null==i||i())},register:function(n){return s.set(n,!1),function(){return s.delete(n)}}}}),u?void 0:[o]);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){s.forEach((function(n,t){return s.set(t,!1)}))}),[o]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((function(){!o&&!s.size&&(null==i||i())}),[o]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(tr.Provider,{value:l},e)};function Vc(){return new Map}function Fc(n){return n.key||""}var Wc,Yc,Hc,Uc,$c,Xc,qc,Gc,Kc,Zc,Jc=function(t){var e=t.children,i=t.custom,a=t.initial,u=void 0===a||a,s=t.onExitComplete,c=t.exitBeforeEnter,l=t.presenceAffectsLayout,p=void 0===l||l,g=function(){var n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),t=He((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),2),e=t[0],r=t[1];return wi((function(){return n.current=!0})),(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){!n.current&&r(e+1)}),[e])}(),y=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(nc);ec(y)&&(g=y.forceUpdate);var w=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!0),x=function(n){var t=[];return react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(n,(function(n){(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(n)&&t.push(n)})),t}(e),S=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(x),_=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map).current,E=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set).current;if(function(n,t){var e="production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)?new Set:null;n.forEach((function(n){var r=Fc(n);"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&e&&(e.has(r)&&console.warn('Children of AnimatePresence require unique keys. "'+r+'" is a duplicate.'),e.add(r)),t.set(r,n)}))}(x,_),w.current)return w.current=!1,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,x.map((function(t){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Bc,{key:Fc(t),isPresent:!0,initial:!!u&&void 0,presenceAffectsLayout:p},t)})));for(var T=Ue([],He(x)),P=S.current.map(Fc),C=x.map(Fc),A=P.length,L=0;L<A;L++){var O=P[L];-1===C.indexOf(O)?E.add(O):E.delete(O)}return c&&E.size&&(T=[]),E.forEach((function(t){if(-1===C.indexOf(t)){var e=_.get(t);if(e){var r=P.indexOf(t);T.splice(r,0,react__WEBPACK_IMPORTED_MODULE_0__.createElement(Bc,{key:Fc(e),isPresent:!1,onExitComplete:function(){_.delete(t),E.delete(t);var n=S.current.findIndex((function(n){return n.key===t}));S.current.splice(n,1),E.size||(S.current=x,g(),s&&s())},custom:i,presenceAffectsLayout:p},e))}}})),T=T.map((function(t){var e=t.key;return E.has(e)?t:react__WEBPACK_IMPORTED_MODULE_0__.createElement(Bc,{key:Fc(t),isPresent:!0,presenceAffectsLayout:p},t)})),S.current=T,"production"!==(process__WEBPACK_IMPORTED_MODULE_1___default().env.NODE_ENV)&&c&&T.length>1&&console.warn("You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour."),react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,E.size?T:T.map((function(n){return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(n)})))},Qc=Be(Dc.div)(Wc||(Wc=jn(["\n  background-color: ",";\n  position: fixed;\n  width: 100%;\n  height: 100vh;\n  height: calc(var(--vh, 1vh) * 100);\n  top: 0;\n  left: 0;\n  z-index: 9999;\n"])),(function(n){return n.overlayColor})),nl={visible:{opacity:1},hidden:{opacity:0}},tl=function(n){var e=n.isOpened,o=n.children,i=n.className,a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(En).options,u=react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Qc,{id:"SRLLightbox",initial:"hidden",animate:"visible",exit:"hidden",variants:nl,overlayColor:a.settings.overlayColor,transition:{duration:a.settings.lightboxTransitionSpeed,ease:a.settings.lightboxTransitionTimingFunction},className:i},o);return e&&"undefined"!=typeof window?react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal(u,document.body):null};function el(n){return(el="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}tl.propTypes={selector:mn.string,isOpened:mn.bool,children:mn.oneOfType([mn.arrayOf(mn.node),mn.node]).isRequired};var rl=function(n){return Te(Yc||(Yc=jn(["\n  flex-direction: column;\n  -ms-grid-column: 2;\n  grid-column-start: 2;\n  -ms-grid-row: 1;\n  grid-row-start: 1;\n  -ms-grid-row-span: 2;\n  grid-row-end: 3;\n  height: 100%;\n  width: auto;\n\n  /* SAFARI HACK */\n  @media not all and (min-resolution: 0.001dpcm) {\n    @media {\n      height: 100vh;\n    }\n  }\n\n  /* IE 11 HACK **/\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    height: 100vh;\n  }\n"])))},ol=function(n){return Te(Hc||(Hc=jn(["\n  flex-direction: column;\n  -ms-grid-column: 1;\n  grid-column-start: 1;\n  -ms-grid-row: 1;\n  grid-row-start: 1;\n  -ms-grid-row-span: 2;\n  grid-row-end: 3;\n  height: 100%;\n  width: auto;\n\n  /* SAFARI HACK */\n  @media not all and (min-resolution: 0.001dpcm) {\n    @media {\n      height: 100vh;\n    }\n  }\n\n  /* IE 11 HACK **/\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    height: 100vh;\n  }\n"])))},il=Be.div(Uc||(Uc=jn(["\n  display: flex;\n  color: white;\n  height: auto;\n  width: 100vw;\n  justify-content: center;\n  overflow-x: hidden;\n  overflow-y: hidden;\n  -webkit-overflow-scrolling: touch;\n  opacity: 1;\n  transition: 0.3s ease;\n  will-change: transform, opacity;\n  position: relative;\n  z-index: 9997;\n  cursor: pointer;\n  padding: ",";\n  background-color: ",";\n\n  /* Thumbnails alignment */\n  ",";\n\n  ",";\n\n  ",";\n\n  ",";\n\n  /* Thumbnails aligned to the right */\n  ",";\n\n  /* Thumbnails aligned to the left */\n  ",";\n\n  /* if the body has a class of SRLIdle */\n  .SRLIdle & {\n    opacity: 0;\n  }\n\n  /* if the thumbnails are draggable */\n  &.SRLDraggable {\n    cursor: grabbing;\n  }\n\n  @media (max-width: 768px) {\n    justify-content: start;\n    overflow: scroll !important;\n    flex-direction: row;\n    width: 100vw !important;\n    height: auto;\n    grid-column: auto;\n    grid-row: auto;\n  }\n"])),(function(n){return n.thumbnailsContainerPadding?n.thumbnailsContainerPadding:"0"}),(function(n){return n.thumbnailsContainerBackgroundColor?n.thumbnailsContainerBackgroundColor:"transparent"}),(function(n){return"start"===n.thumbnailsAlignment&&Te($c||($c=jn(["\n      justify-content: flex-start;\n    "])))}),(function(n){return"end"===n.thumbnailsAlignment&&Te(Xc||(Xc=jn(["\n      justify-content: flex-end;\n    "])))}),(function(n){return"space-between"===n.thumbnailsAlignment&&Te(qc||(qc=jn(["\n      justify-content: space-between;\n    "])))}),(function(n){return"space-evenly"===n.thumbnailsAlignment&&Te(Gc||(Gc=jn(["\n      justify-content: space-evenly;\n    "])))}),(function(n){return"right"===n.thumbnailsPosition&&rl}),(function(n){return"left"===n.thumbnailsPosition&&ol})),al=Be.a(Kc||(Kc=jn(["\n  width: ",";\n  height: ",";\n  background-repeat: no-repeat;\n  background-size: cover;\n  margin: ",";\n  opacity: ",";\n  transition: 0.3s ease;\n  will-change: opacity;\n  display: block;\n  cursor: draggable;\n  flex: 0 0 auto;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  &.SRLThumbnailSelected {\n    opacity: 1;\n  }\n\n  @media (max-width: 768px) {\n    height: 60px;\n    width: 80px;\n  }\n"])),(function(n){return n.thumbnailsSize?n.thumbnailsSize[0]:"80px"}),(function(n){return n.thumbnailsSize?n.thumbnailsSize[1]:"80px"}),(function(n){return n.thumbnailsGap?n.thumbnailsGap:"1px"}),(function(n){return n.thumbnailsOpacity?n.thumbnailsOpacity:"0.4"})),ul=Be.svg(Zc||(Zc=jn(["\n  width: ",";\n  height: ",";\n  opacity: ",";\n"])),(function(n){return n.thumbnailsSize?n.thumbnailsSize[0]/2:"40px"}),(function(n){return n.thumbnailsSize?n.thumbnailsSize[1]/2:"40px"}),(function(n){return n.thumbnailsOpacity?n.thumbnailsOpacity:"0.4"}));function sl(n){var e=n.thumbnailsIconColor;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ul,{"aria-hidden":"true","data-prefix":"fas","data-icon":"play-circle",className:"SRLThumbIcon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{fill:e,className:"SRLThumbIcon",d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"}))}sl.propTypes={thumbnailsIconColor:mn.string};var cl,ll,fl,pl=function(n){var e=n.elements,r=n.currentId,a=n.handleCurrentElement,u=n.thumbnails,s=n.SRLThumbnailsRef,c=u.thumbnailsOpacity,l=u.thumbnailsSize,f=u.thumbnailsPosition,p=u.thumbnailsAlignment,d=u.thumbnailsContainerBackgroundColor,h=u.thumbnailsContainerPadding,v=u.thumbnailsGap,m=u.thumbnailsIconColor,g=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),y=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),w=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),x=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),S=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var n=s.current,t=document.querySelector(".SRLThumb".concat(r));if(t){var e=t.getBoundingClientRect();n.scrollWidth>n.offsetWidth||n.scrollHeight>n.offsetHeight?n.style.justifyContent="start":n.style.justifyContent=p||"center",n.scrollWidth>n.offsetWidth?"scrollBehavior"in document.documentElement.style?n.scrollBy({top:0,left:e.left,behavior:"smooth"}):n.scrollLeft=80*parseInt(r):n.scrollHeight>n.offsetHeight&&("scrollBehavior"in document.documentElement.style?n.scrollBy({top:e.top,left:0,behavior:"smooth"}):n.scrollTop=e.top)}function o(t,e){n.scrollWidth>n.offsetWidth?(g.current=!0,y.current=t-n.offsetLeft,w.current=n.scrollLeft,n.classList.add("SRLDraggable")):n.scrollHeight>n.offsetHeight&&(g.current=!0,b.current=e-n.offsetTop,x.current=n.scrollTop,n.classList.add("SRLDraggable"))}function i(){g.current=!1,n.classList.remove("SRLDraggable")}function u(t,e){if(g.current)if(n.scrollHeight>n.offsetHeight){var r=e-n.offsetTop-b.current;n.scrollTop=x.current-r}else{var o=t-n.offsetLeft-y.current;n.scrollLeft=w.current-o}}return S.current=function(t,e,o){(n.scrollWidth>n.offsetWidth||n.scrollHeight>n.offsetHeight)&&Math.trunc(t)!==Math.trunc(y.current)&&Math.trunc(e)!==Math.trunc(b.current)||a(o,r)},n.addEventListener("mousedown",(function(n){return o(n.pageX,n.pageY)})),n.addEventListener("mouseleave",(function(){return i()})),n.addEventListener("mouseup",(function(){return i()})),n.addEventListener("mousemove",(function(n){return u(n.pageX,n.pageY)})),function(){n.removeEventListener("mousedown",(function(n){return o(n.pageX)})),n.removeEventListener("mouseleave",(function(){return i()})),n.removeEventListener("mouseup",(function(){return i()})),n.removeEventListener("mousemove",(function(n){return u(n)}))}}),[r,a,s,p]),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(il,{ref:s,thumbnailsPosition:f,thumbnailsSize:l,thumbnailsAlignment:p,thumbnailsContainerBackgroundColor:d,thumbnailsContainerPadding:h,className:"SRLThumbnailsContainer"},e.map((function(n){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(al,{onClick:function(t){return S.current(t.pageX,t.pageY,n.id)},thumbnailsOpacity:c,thumbnailsSize:l,thumbnailsGap:v,key:n.id,id:n.id,className:"SRLThumb SRLThumb".concat(n.id," ").concat(r===n.id?"SRLThumbnailSelected":""),style:{backgroundImage:"url('".concat(n.thumbnail,"')")}},("video"===n.type||"embed_video"===n.type)&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(sl,{thumbnailsIconColor:m}))})))};pl.propTypes={elements:mn.array,handleCurrentElement:mn.func,currentId:mn.string,SRLThumbnailsRef:mn.object,thumbnails:mn.shape({thumbnailsAlignment:mn.string,thumbnailsContainerBackgroundColor:mn.string,thumbnailsContainerPadding:mn.string,thumbnailsGap:mn.string,thumbnailsIconColor:mn.string,thumbnailsOpacity:mn.number,thumbnailsPosition:mn.string,thumbnailsSize:mn.array})};var dl=Be.div(cl||(cl=jn(["\n  color: white;\n  font-family: inherit;\n  outline: none;\n  border: 0;\n  position: relative;\n  z-index: 9996;\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    width: 100vw;\n  }\n  width: 100%;\n  min-height: 50px;\n  box-sizing: border-box;\n  display: flex;\n  justify-content: center;\n  align-content: ",";\n  padding: ",";\n\n  ",";\n\n  /* Thumbnails aligned to the left */\n  ",";\n\n  @media (max-width: 768px) {\n    grid-column: auto;\n  }\n\n  /* Paragraph inside the caption container */\n  p {\n    margin: 0;\n    text-align: center;\n    font-weight: ",";\n    font-size: ",";\n    font-family: ",";\n    color: ",";\n    font-style: ",";\n    text-transform: ",";\n\n    @media (max-width: 768px) {\n      font-size: 14px;\n      padding: 0 15px;\n    }\n  }\n"])),(function(n){return n.captionAlignment}),(function(n){return n.captionStyle.captionContainerPadding?n.captionStyle.captionContainerPadding:"20px 0 30px 0"}),(function(n){return"right"===n.thumbnailsPosition&&Te(ll||(ll=jn(["\n      grid-column: 1/2;\n      -ms-grid-column: 1;\n      -ms-grid-column-span: 1;\n      align-items: start;\n    "])))}),(function(n){return"left"===n.thumbnailsPosition&&Te(fl||(fl=jn(["\n      grid-column: 2/2;\n      -ms-grid-column: 2;\n      align-items: start;\n    "])))}),(function(n){return n.captionStyle.captionFontWeight?n.captionStyle.captionFontWeight:"inherit"}),(function(n){return n.captionStyle.captionFontSize?n.captionStyle.captionFontSize:"inherit"}),(function(n){return n.captionStyle.captionColor?n.captionStyle.captionFontFamily:"inherit"}),(function(n){return n.captionStyle.captionColor?n.captionStyle.captionColor:"white"}),(function(n){return n.captionStyle.captionFontStyle?n.captionStyle.captionFontStyle:"inherit"}),(function(n){return n.captionStyle.captionTextTransform?n.captionStyle.captionTextTransform:"inherit"})),hl=function(n){var e=n.captionOptions,r=n.caption,o=n.thumbnailsPosition,i=n.SRLCaptionRef;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(dl,{captionStyle:e,thumbnailsPosition:o,className:"SRLCaptionContainer",ref:i},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",{className:"SRLCaptionText"},r))};function vl(){return(vl=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n}).apply(this,arguments)}hl.propTypes={captionOptions:mn.shape({showCaption:mn.bool,captionColor:mn.string,captionFontFamily:mn.string,captionFontSize:mn.string,captionFontStyle:mn.string,captionFontWeight:mn.oneOfType([mn.number,mn.string]),captionTextTransform:mn.string}),SRLCaptionRef:mn.object,thumbnailsPosition:mn.string,caption:mn.string};var ml={delta:10,preventDefaultTouchmoveEvent:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0},gl={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]};function yl(n,t){if(0===t)return n;var e=Math.PI/180*t;return[n[0]*Math.cos(e)+n[1]*Math.sin(e),n[1]*Math.cos(e)-n[0]*Math.sin(e)]}function bl(t){var e=t.trackMouse,r=react__WEBPACK_IMPORTED_MODULE_0__.useRef(vl({},gl)),o=react__WEBPACK_IMPORTED_MODULE_0__.useRef(vl({},ml));o.current=vl({},ml,t);var i=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return function(n,t){var e=function(t){t&&"touches"in t&&t.touches.length>1||n((function(n,e){e.trackMouse&&(document.addEventListener("mousemove",r),document.addEventListener("mouseup",a));var o="touches"in t?t.touches[0]:t,i=yl([o.clientX,o.clientY],e.rotationAngle);return vl({},n,gl,{initial:[].concat(i),xy:i,start:t.timeStamp||0})}))},r=function(t){n((function(n,e){if("touches"in t&&t.touches.length>1)return n;var r="touches"in t?t.touches[0]:t,o=yl([r.clientX,r.clientY],e.rotationAngle),i=o[0],a=o[1],u=i-n.xy[0],s=a-n.xy[1],c=Math.abs(u),l=Math.abs(s),f=(t.timeStamp||0)-n.start,p=Math.sqrt(c*c+l*l)/(f||1),d=[u/(f||1),s/(f||1)],h=function(n,t,e,r){return n>t?e>0?"Right":"Left":r>0?"Down":"Up"}(c,l,u,s),v="number"==typeof e.delta?e.delta:e.delta[h.toLowerCase()]||ml.delta;if(c<v&&l<v&&!n.swiping)return n;var m={absX:c,absY:l,deltaX:u,deltaY:s,dir:h,event:t,first:n.first,initial:n.initial,velocity:p,vxvy:d};m.first&&e.onSwipeStart&&e.onSwipeStart(m),e.onSwiping&&e.onSwiping(m);var g=!1;return(e.onSwiping||e.onSwiped||"onSwiped"+h in e)&&(g=!0),g&&e.preventDefaultTouchmoveEvent&&e.trackTouch&&t.cancelable&&t.preventDefault(),vl({},n,{first:!1,eventData:m,swiping:!0})}))},o=function(t){n((function(n,e){var r;if(n.swiping&&n.eventData){r=vl({},n.eventData,{event:t}),e.onSwiped&&e.onSwiped(r);var o=e["onSwiped"+r.dir];o&&o(r)}else e.onTap&&e.onTap({event:t});return vl({},n,gl,{eventData:r})}))},i=function(){document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",a)},a=function(n){i(),o(n)},u=function(n,t){var i=function(){};if(n&&n.addEventListener){var a=[["touchstart",e],["touchmove",r],["touchend",o]];a.forEach((function(e){var r=e[0],o=e[1];return n.addEventListener(r,o,{passive:t})})),i=function(){return a.forEach((function(t){var e=t[0],r=t[1];return n.removeEventListener(e,r)}))}}return i},s={ref:function(t){null!==t&&n((function(n,e){if(n.el===t)return n;var r={};return n.el&&n.el!==t&&n.cleanUpTouch&&(n.cleanUpTouch(),r.cleanUpTouch=void 0),e.trackTouch&&t&&(r.cleanUpTouch=u(t,!e.preventDefaultTouchmoveEvent)),vl({},n,{el:t},r)}))}};return t.trackMouse&&(s.onMouseDown=e),[s,u]}((function(n){return r.current=n(r.current,o.current)}),{trackMouse:e})}),[e]),a=i[0],u=i[1];return r.current=function(n,t,e){var r={};return!t.trackTouch&&n.cleanUpTouch?(n.cleanUpTouch(),r.cleanUpTouch=void 0):t.trackTouch&&!n.cleanUpTouch&&n.el&&(r.cleanUpTouch=e(n.el,!t.preventDefaultTouchmoveEvent)),vl({},n,r)}(r.current,o.current,u),a}function wl(n,t,e){var r=this,a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),u=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(n),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!0);d.current=n;var v=!t&&0!==t&&"undefined"!=typeof window;if("function"!=typeof n)throw new TypeError("Expected a function");t=+t||0;var m=!!(e=e||{}).leading,g=!("trailing"in e)||!!e.trailing,y="maxWait"in e,b=y?Math.max(+e.maxWait||0,t):null;return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return h.current=!0,function(){h.current=!1}}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){var n=function(n){var t=c.current,e=l.current;return c.current=l.current=null,u.current=n,f.current=d.current.apply(e,t)},e=function(n,t){v&&cancelAnimationFrame(s.current),s.current=v?requestAnimationFrame(n):setTimeout(n,t)},o=function(n){if(!h.current)return!1;var e=n-a.current,r=n-u.current;return!a.current||e>=t||e<0||y&&r>=b},i=function(t){return s.current=null,g&&c.current?n(t):(c.current=l.current=null,f.current)},p=function(){var n=Date.now();if(o(n))return i(n);if(h.current){var r=n-a.current,s=n-u.current,c=t-r,l=y?Math.min(c,b-s):c;e(p,l)}},w=function(){for(var i=[],d=0;d<arguments.length;d++)i[d]=arguments[d];var v=Date.now(),g=o(v);if(c.current=i,l.current=r,a.current=v,g){if(!s.current&&h.current)return u.current=a.current,e(p,t),m?n(a.current):f.current;if(y)return e(p,t),n(a.current)}return s.current||e(p,t),f.current};return w.cancel=function(){s.current&&(v?cancelAnimationFrame(s.current):clearTimeout(s.current)),u.current=0,c.current=a.current=l.current=s.current=null},w.isPending=function(){return!!s.current},w.flush=function(){return s.current?i(Date.now()):f.current},w}),[m,y,t,b,g,v])}var xl={exports:{}};!function(n,t){!function(){function t(n,t,e,r){var o="removeEventListener",i=function(){n[o](t,e)};return n.addEventListener?(n.addEventListener(t,e,r),i):n.attachEvent?(t="on"+t,n.attachEvent(t,e),o="detachEvent",i):n.on?(n.on(t,e),o="off",i):void 0}t.define=function(n,t){return function(e,r,o,i){return e[n](r,o,i),function(){e[t](r,o)}}},n.exports=t}()}(xl);var Sl,_l,El,Tl,Pl,Cl,Al,Ll=xl.exports;function Ol(){var n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(En);return{openLightbox:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;n.isLoaded&&n.dispatch({type:"OPEN_AT_INDEX",index:t})},closeLightbox:function(){n.isLoaded&&n.dispatch({type:"CLOSE_LIGHTBOX"})}}}function kl(n,t,e){var r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){r.current=n}),[n,e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(null!==t){var n=setInterval((function(){r.current()}),t);return function(){return clearInterval(n)}}}),[t,e])}function Rl(n){var t=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({x:0,y:0,width:0,height:0,top:0,left:0,bottom:0,right:0,scrollHeight:0,scrollWidth:0}),2),e=t[0],r=t[1],o="object"===("undefined"==typeof window?"undefined":el(window));return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(n.current||o)return n.current&&r(t()),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)};function t(){var t=n.current.getBoundingClientRect(),e=t.x,r=t.y,o=t.width,i=t.height,a=t.top,u=t.left,s=t.bottom,c=t.right;return{width:o,height:i,scrollWidth:n.current.scrollWidth,scrollHeight:n.current.scrollHeight,x:e,y:r,top:a,left:u,bottom:s,right:c}}function e(){n.current&&r(t())}}),[n,o]),[e]}var Nl=function(n){return Te(Sl||(Sl=jn(["\n  grid-column: 1/2;\n  -ms-grid-column: 1;\n  -ms-grid-column-span: 1;\n  width: 100%;\n  height: calc(100vh - ","px);\n"])),n.captionDivSizes.height)},zl=function(n){return Te(_l||(_l=jn(["\n  grid-column: 2/2;\n  -ms-grid-column: 2;\n  width: 100%;\n  height: calc(100vh - ","px);\n"])),n.captionDivSizes.height)},Il=Be.div(El||(El=jn(["\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  outline: none;\n  width: 100vw;\n  height: ",";\n\n  /* Thumbnails aligned to the right.\n  We need to exclude the height of the div containing the thumbnails this time */\n  ",";\n\n  /* Thumbnails aligned to the left.\n    We need to exclude the height of the div containing the thumbnails this time */\n  ",";\n  /* Thumbnails hidden */\n  ",";\n\n  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {\n    grid-column: auto;\n    width: 100vw;\n    height: ",";\n  }\n\n  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {\n    grid-column: auto;\n    width: 100vw;\n    height: ",";\n  }\n\n  @media (max-width: 768px) {\n    grid-column: auto;\n    width: 100vw;\n    height: ",";\n  }\n"])),(function(n){return n?"calc(100vh - ".concat(n.captionDivSizes.height+n.thumbnailsDivSizes.height,"px)"):"100%"}),(function(n){return"right"===n.thumbnailsPosition&&Nl}),(function(n){return"left"===n.thumbnailsPosition&&zl}),(function(n){return n.hideThumbnails&&"bottom"===n.thumbnailsPosition&&Te(Tl||(Tl=jn(["\n      height: calc(100vh - ","px);\n    "])),n.thumbnailsDivSizes.height)}),(function(n){return n?"calc((var(--vh, 1vh) * 100) - ".concat(n.captionDivSizes.height+n.thumbnailsDivSizes.height,"px)"):"100%"}),(function(n){return n?"calc((var(--vh, 1vh) * 100) - ".concat(n.captionDivSizes.height+n.thumbnailsDivSizes.height,"px)"):"100%"}),(function(n){return n?"calc((var(--vh, 1vh) * 100) - ".concat(n.captionDivSizes.height+n.thumbnailsDivSizes.height,"px)"):"100%"})),Dl=Be(Dc.div)(Pl||(Pl=jn(["\n  width: 100%;\n  height: 90%;\n  position: absolute;\n  /* IE 11 HACK **/\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    top: 5%;\n    left: 0;\n  }\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  outline: none;\n  border: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n\n  @keyframes spin {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n  .SRLLoadingIndicator {\n    animation: spin 1.2s linear infinite;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n  }\n\n  /* react-zoom-pan-pinch library styles overrides*/\n  .react-transform-component {\n    width: fit-content;\n    width: auto;\n    height: fit-content;\n    height: auto;\n    z-index: 9997;\n    overflow: inherit;\n    cursor: grab;\n  }\n  .react-transform-element {\n    width: fit-content;\n    width: auto;\n    height: fit-content;\n    height: auto;\n    top: 0;\n    left: 0;\n    position: relative;\n\n    z-index: 9997;\n    display: block;\n    max-width: 100%;\n    max-height: 100%;\n    width: auto;\n    height: auto;\n  }\n"]))),jl=Be(Dc.img)(Cl||(Cl=jn(["\n  background: transparent;\n  border: 0;\n  position: relative;\n  display: block;\n  max-width: 100%;\n  max-height: 100%;\n  width: auto;\n  height: auto;\n  outline: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  transition: all 200ms ease;\n  opacity: 1;\n  margin: auto;\n  z-index: 9997;\n  box-shadow: ",";\n  cursor: ",";\n"])),(function(n){return n.boxShadow}),(function(n){return n.disablePanzoom?"auto":"zoom-in"})),Ml=Be(Dc.img)(Al||(Al=jn(["\n  top: 0;\n  left: 0;\n  position: relative;\n  z-index: 9997;\n  display: block;\n  max-width: 100%;\n  max-height: 100%;\n  width: auto;\n  height: auto;\n"])));function Bl(){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"50px",height:"50px",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",className:"SRLLoadingIndicator"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle",{cx:"50",cy:"50",fill:"none",stroke:"#ffffff",strokeWidth:"10",r:"35",strokeDasharray:"164.93361431346415 56.97787143782138"}))}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var Vl=function(n,t){return(Vl=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)};var Fl=function(){return(Fl=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++)for(var o in t=arguments[e])Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}).apply(this,arguments)};function Wl(n,t,e){if(e||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return n.concat(r||t)}var Yl=function(n,t){return Number(n.toFixed(t))},Hl=function(n,t,e){e&&"function"==typeof e&&e(n,t)},Ul={easeOut:function(n){return-Math.cos(n*Math.PI)/2+.5},linear:function(n){return n},easeInQuad:function(n){return n*n},easeOutQuad:function(n){return n*(2-n)},easeInOutQuad:function(n){return n<.5?2*n*n:(4-2*n)*n-1},easeInCubic:function(n){return n*n*n},easeOutCubic:function(n){return--n*n*n+1},easeInOutCubic:function(n){return n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1},easeInQuart:function(n){return n*n*n*n},easeOutQuart:function(n){return 1- --n*n*n*n},easeInOutQuart:function(n){return n<.5?8*n*n*n*n:1-8*--n*n*n*n},easeInQuint:function(n){return n*n*n*n*n},easeOutQuint:function(n){return 1+--n*n*n*n*n},easeInOutQuint:function(n){return n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n}},$l=function(n){"number"==typeof n&&cancelAnimationFrame(n)},Xl=function(n){n.mounted&&($l(n.animation),n.animate=!1,n.animation=null,n.velocity=null)};function ql(n,t,e,r){if(n.mounted){var o=(new Date).getTime();Xl(n),n.animation=function(){if(!n.mounted)return $l(n.animation);var i=(new Date).getTime()-o,a=(0,Ul[t])(i/e);i>=e?(r(1),n.animation=null):n.animation&&(r(a),requestAnimationFrame(n.animation))},requestAnimationFrame(n.animation)}}function Gl(n,t,e,r){var o=function(n){var t=n.scale,e=n.positionX,r=n.positionY;if(isNaN(t)||isNaN(e)||isNaN(r))return!1;return!0}(t);if(n.mounted&&o){var i=n.setTransformState,a=n.transformState,u=a.scale,s=a.positionX,c=a.positionY,l=t.scale-u,f=t.positionX-s,p=t.positionY-c;0===e?i(t.scale,t.positionX,t.positionY):ql(n,r,e,(function(n){i(u+l*n,s+f*n,c+p*n)}))}}var Kl=function(n,t){var e=n.wrapperComponent,r=n.contentComponent,o=n.setup.centerZoomedOut;if(!e||!r)throw new Error("Components are not mounted");var i=function(n,t,e){var r=n.offsetWidth,o=n.offsetHeight,i=t.offsetWidth*e,a=t.offsetHeight*e;return{wrapperWidth:r,wrapperHeight:o,newContentWidth:i,newDiffWidth:r-i,newContentHeight:a,newDiffHeight:o-a}}(e,r,t),a=i.wrapperWidth,u=i.wrapperHeight;return function(n,t,e,r,o,i,a){var u=n>t?e*(a?1:.5):0,s=r>o?i*(a?1:.5):0;return{minPositionX:n-t-u,maxPositionX:u,minPositionY:r-o-s,maxPositionY:s}}(a,i.newContentWidth,i.newDiffWidth,u,i.newContentHeight,i.newDiffHeight,Boolean(o))},Zl=function(n,t){var e=Kl(n,t);return n.bounds=e,e};function Jl(n,t,e,r,o,i,a){var u=e.minPositionX,s=e.minPositionY,c=e.maxPositionX,l=e.maxPositionY,f=0,p=0;return a&&(f=o,p=i),{x:Ql(n,u-f,c+f,r),y:Ql(t,s-p,l+p,r)}}var Ql=function(n,t,e,r){return Yl(r?n<t?t:n>e?e:n:n,2)};function nf(n,t,e,r,o,i){var a=n.transformState,u=a.scale,s=a.positionX,c=a.positionY,l=r-u;return"number"!=typeof t||"number"!=typeof e?(console.error("Mouse X and Y position were not provided!"),{x:s,y:c}):Jl(s-t*l,c-e*l,o,i,0,0,null)}function tf(n,t,e,r,o){var i=t-(o?r:0);return!isNaN(e)&&n>=e?e:!isNaN(t)&&n<=i?i:n}var ef=function(n,t){var e=n.setup.panning.excluded,r=n.isInitialized,o=n.wrapperComponent,i=t.target,a=null==o?void 0:o.contains(i);return!!(r&&i&&a)&&!Of(i,e)},rf=function(n){var t=n.isInitialized,e=n.isPanning,r=n.setup.panning.disabled;return!(!t||!e||r)};var of=function(n,t){var e=n.setup,r=n.transformState.scale,o=e.minScale;return t>0&&r>=o?t:0};function af(n,t,e,r,o,i,a,u,s,c){if(o){var l;if(t>a&&e>a)return(l=a+(n-a)*c)>s?s:l<a?a:l;if(t<i&&e<i)return(l=i+(n-i)*c)<u?u:l>i?i:l}return r?t:Ql(n,i,a,o)}function uf(n,t){if(function(n){var t=n.mounted,e=n.setup,r=e.disabled,o=e.velocityAnimation,i=n.transformState.scale;return!(o.disabled&&!(i>1)&&r&&!t)}(n)){var e=n.lastMousePosition,r=n.velocityTime,o=n.setup,i=n.wrapperComponent,a=o.velocityAnimation.equalToMove,u=Date.now();if(e&&r&&i){var s=function(n,t){return t?Math.min(1,n.offsetWidth/window.innerWidth):1}(i,a),c=t.x-e.x,l=t.y-e.y,f=c/s,p=l/s,d=u-r,h=c*c+l*l,v=Math.sqrt(h)/d;n.velocity={velocityX:f,velocityY:p,total:v}}n.lastMousePosition=t,n.velocityTime=u}}function sf(n,t){var e=n.transformState.scale;Xl(n),Zl(n,e),t.touches?function(n,t){var e=t.touches,r=n.transformState,o=r.positionX,i=r.positionY;if(n.isPanning=!0,1===e.length){var a=e[0].clientX,u=e[0].clientY;n.startCoords={x:a-o,y:u-i}}}(n,t):function(n,t){var e=n.transformState,r=e.positionX,o=e.positionY;n.isPanning=!0;var i=t.clientX,a=t.clientY;n.startCoords={x:i-r,y:a-o}}(n,t)}function cf(n,t,e){var r=n.startCoords,o=n.setup.alignmentAnimation,i=o.sizeX,a=o.sizeY;if(r){var u=function(n,t,e){var r=n.startCoords,o=n.transformState,i=n.setup.panning,a=i.lockAxisX,u=i.lockAxisY,s=o.positionX,c=o.positionY;if(!r)return{x:s,y:c};var l=t-r.x,f=e-r.y;return{x:a?s:l,y:u?c:f}}(n,t,e),s=u.x,c=u.y,l=of(n,i),f=of(n,a);uf(n,{x:s,y:c}),function(n,t,e,r,o){var i=n.setup.limitToBounds,a=n.wrapperComponent,u=n.bounds,s=n.transformState,c=s.scale,l=s.positionX,f=s.positionY;if(a&&t!==l&&e!==f&&u){var p=Jl(t,e,u,i,r,o,a),d=p.x,h=p.y;n.setTransformState(c,d,h)}}(n,s,c,l,f)}}function lf(n){if(n.isPanning){var t=n.setup.panning.velocityDisabled,e=n.velocity,r=n.wrapperComponent,o=n.contentComponent;n.isPanning=!1,n.animate=!1,n.animation=null;var i=null==r?void 0:r.getBoundingClientRect(),a=null==o?void 0:o.getBoundingClientRect(),u=(null==i?void 0:i.width)||0,s=(null==i?void 0:i.height)||0,c=(null==a?void 0:a.width)||0,l=(null==a?void 0:a.height)||0,f=u<c||s<l;!t&&e&&(null==e?void 0:e.total)>.1&&f?function(n){var t=n.velocity,e=n.bounds,r=n.setup,o=n.wrapperComponent;if(function(n){var t=n.mounted,e=n.velocity,r=n.bounds,o=n.setup,i=o.disabled,a=o.velocityAnimation,u=n.transformState.scale;return!(a.disabled&&!(u>1)&&i&&!t||!e||!r)}(n)&&t&&e&&o){var i=t.velocityX,a=t.velocityY,u=t.total,s=e.maxPositionX,c=e.minPositionX,l=e.maxPositionY,f=e.minPositionY,p=r.limitToBounds,d=r.alignmentAnimation,h=r.zoomAnimation,v=r.panning,m=v.lockAxisY,g=v.lockAxisX,y=h.animationType,b=d.sizeX,w=d.sizeY,x=d.velocityAlignmentTime,S=function(n,t){var e=n.setup.velocityAnimation,r=e.equalToMove,o=e.animationTime,i=e.sensitivity;return r?o*t*i:o}(n,u),_=Math.max(S,x),E=of(n,b),T=of(n,w),P=E*o.offsetWidth/100,C=T*o.offsetHeight/100,A=s+P,L=c-P,O=l+C,k=f-C,R=n.transformState,N=(new Date).getTime();ql(n,y,_,(function(t){var e=n.transformState,r=e.scale,o=e.positionX,u=e.positionY,h=((new Date).getTime()-N)/x,v=1-(0,Ul[d.animationType])(Math.min(1,h)),y=1-t,b=o+i*y,w=u+a*y,S=af(b,R.positionX,o,g,p,c,s,L,A,v),_=af(w,R.positionY,u,m,p,f,l,k,O,v);o===b&&u===w||n.setTransformState(r,S,_)}))}}(n):ff(n)}}function ff(n){var t=n.transformState.scale,e=n.setup,r=e.minScale,o=e.alignmentAnimation,i=o.disabled,a=o.sizeX,u=o.sizeY,s=o.animationTime,c=o.animationType;if(!(i||t<r||!a&&!u)){var l=function(n){var t=n.transformState,e=t.positionX,r=t.positionY,o=t.scale,i=n.setup,a=i.disabled,u=i.limitToBounds,s=i.centerZoomedOut,c=n.wrapperComponent;if(!a&&c&&n.bounds){var l=n.bounds,f=l.maxPositionX,p=l.minPositionX,d=l.maxPositionY,h=l.minPositionY,v=e>f||e<p,m=r>d||r<h,g=nf(n,e>f?c.offsetWidth:n.setup.minPositionX||0,r>d?c.offsetHeight:n.setup.minPositionY||0,o,n.bounds,u||s),y=g.x,b=g.y;return{scale:o,positionX:v?y:e,positionY:m?b:r}}}(n);l&&Gl(n,l,s,c)}}function pf(n,t,e){var r=n.transformState.scale,o=n.wrapperComponent,i=n.setup,a=i.minScale,u=i.limitToBounds,s=i.zoomAnimation,c=s.disabled,l=s.animationTime,f=s.animationType,p=c||r>=a;if((r>=1||u)&&ff(n),!p&&o&&n.mounted){var d=df(n,a,t||o.offsetWidth/2,e||o.offsetHeight/2);d&&Gl(n,d,l,f)}}function df(n,t,e,r){var o=n.setup,i=o.minScale,a=o.maxScale,u=o.limitToBounds,s=tf(Yl(t,2),i,a,0,!1),c=nf(n,e,r,s,Zl(n,s),u);return{scale:s,positionX:c.x,positionY:c.y}}var hf={previousScale:1,scale:1,positionX:0,positionY:0},vf=Fl(Fl({},hf),{setComponents:function(){},contextInstance:null}),mf={disabled:!1,minPositionX:null,maxPositionX:null,minPositionY:null,maxPositionY:null,minScale:1,maxScale:8,limitToBounds:!0,centerZoomedOut:!1,centerOnInit:!1,wheel:{step:.2,disabled:!1,wheelDisabled:!1,touchPadDisabled:!1,activationKeys:[],excluded:[]},panning:{disabled:!1,velocityDisabled:!1,lockAxisX:!1,lockAxisY:!1,activationKeys:[],excluded:[]},pinch:{step:5,disabled:!1,excluded:[]},doubleClick:{disabled:!1,step:.7,mode:"zoomIn",animationType:"easeOut",animationTime:200,excluded:[]},zoomAnimation:{disabled:!1,size:.4,animationTime:200,animationType:"easeOut"},alignmentAnimation:{disabled:!1,sizeX:100,sizeY:100,animationTime:200,velocityAlignmentTime:400,animationType:"easeOut"},velocityAnimation:{disabled:!1,sensitivity:1,animationTime:400,animationType:"easeOut",equalToMove:!0}},gf=function(n){var t,e,r,o;return{previousScale:null!==(t=n.initialScale)&&void 0!==t?t:hf.scale,scale:null!==(e=n.initialScale)&&void 0!==e?e:hf.scale,positionX:null!==(r=n.initialPositionX)&&void 0!==r?r:hf.positionX,positionY:null!==(o=n.initialPositionY)&&void 0!==o?o:hf.positionY}},yf=function(n){var t=Fl({},mf);return Object.keys(n).forEach((function(e){var r=void 0!==n[e];if(void 0!==mf[e]&&r){var o=Object.prototype.toString.call(mf[e]),i="[object Object]"===o,a="[object Array]"===o;t[e]=i?Fl(Fl({},mf[e]),n[e]):a?Wl(Wl([],mf[e]),n[e]):n[e]}})),t},bf=function(n,t,e){var r=n.transformState.scale,o=n.wrapperComponent,i=n.setup,a=i.maxScale,u=i.minScale,s=i.zoomAnimation.size;if(!o)throw new Error("Wrapper is not mounted");var c=r*Math.exp(t*e);return tf(Yl(c,3),u,a,s,!1)};function wf(n,t,e,r,o){var i=n.wrapperComponent,a=n.transformState,u=a.scale,s=a.positionX,c=a.positionY;if(!i)return console.error("No WrapperComponent found");var l=(i.offsetWidth/2-s)/u,f=(i.offsetHeight/2-c)/u,p=df(n,bf(n,t,e),l,f);if(!p)return console.error("Error during zoom event. New transformation state was not calculated.");Gl(n,p,r,o)}function xf(n,t,e){var r=n.setup,o=n.wrapperComponent,i=r.limitToBounds,a=gf(n.props),u=n.transformState,s=u.scale,c=u.positionX,l=u.positionY;if(o){var f=Kl(n,a.scale),p=Jl(a.positionX,a.positionY,f,i,0,0,o),d={scale:a.scale,positionX:p.x,positionY:p.y};s===a.scale&&c===a.positionX&&l===a.positionY||Gl(n,d,t,e)}}var Sf=function(n){return function(t,e,r){void 0===t&&(t=.5),void 0===e&&(e=300),void 0===r&&(r="easeOut"),wf(n,1,t,e,r)}},_f=function(n){return function(t,e,r){void 0===t&&(t=.5),void 0===e&&(e=300),void 0===r&&(r="easeOut"),wf(n,-1,t,e,r)}},Ef=function(n){return function(t,e,r,o,i){void 0===o&&(o=300),void 0===i&&(i="easeOut");var a=n.transformState,u=a.positionX,s=a.positionY,c=a.scale,l=n.wrapperComponent,f=n.contentComponent;if(!n.setup.disabled&&l&&f){var p={positionX:isNaN(t)?u:t,positionY:isNaN(e)?s:e,scale:isNaN(r)?c:r};Gl(n,p,o,i)}}},Tf=function(n){return function(t,e){void 0===t&&(t=200),void 0===e&&(e="easeOut"),xf(n,t,e)}},Pf=function(n){return function(t,e,r){void 0===e&&(e=200),void 0===r&&(r="easeOut");var o=n.transformState,i=n.wrapperComponent,a=n.contentComponent;if(i&&a){var u=Nf(t||o.scale,i,a);Gl(n,u,e,r)}}},Cf=function(n){return function(t,e,r,o){void 0===r&&(r=600),void 0===o&&(o="easeOut"),Xl(n);var i=n.wrapperComponent,a="string"==typeof t?document.getElementById(t):t;if(i&&function(n){return n?void 0!==(null==n?void 0:n.offsetWidth)&&void 0!==(null==n?void 0:n.offsetHeight)||(console.error("Zoom node is not valid - it must contain offsetWidth and offsetHeight"),!1):(console.error("Zoom node not found"),!1)}(a)&&a&&i.contains(a)){var u=function(n,t,e){var r=n.wrapperComponent,o=n.setup,i=o.limitToBounds,a=o.minScale,u=o.maxScale;if(!r)return hf;var s=r.getBoundingClientRect(),c=function(n){for(var t=n,e=0,r=0;t;)e+=t.offsetLeft,r+=t.offsetTop,t=t.offsetParent;return{x:e,y:r}}(t),l=c.x,f=c.y,p=t.offsetWidth,d=t.offsetHeight,h=r.offsetWidth/p,v=r.offsetHeight/d,m=tf(e||Math.min(h,v),a,u,0,!1),g=(s.width-p*m)/2,y=(s.height-d*m)/2,b=Jl((s.left-l)*m+g,(s.top-f)*m+y,Kl(n,m),i,0,0,r);return{positionX:b.x,positionY:b.y,scale:m}}(n,a,e);Gl(n,u,r,o)}}},Af=function(n){return{instance:n,state:n.transformState,zoomIn:Sf(n),zoomOut:_f(n),setTransform:Ef(n),resetTransform:Tf(n),centerView:Pf(n),zoomToElement:Cf(n)}};function Lf(){try{return{get passive(){return!0,!1}}}catch(n){return!1}}var Of=function(n,t){var e=n.tagName.toUpperCase();return!!t.find((function(n){return n.toUpperCase()===e}))||!!t.find((function(t){return n.classList.contains(t)}))},kf=function(n){n&&clearTimeout(n)},Rf=function(n,t,e){return"translate3d("+n+"px, "+t+"px, 0) scale("+e+")"},Nf=function(n,t,e){var r=e.offsetWidth*n,o=e.offsetHeight*n;return{scale:n,positionX:(t.offsetWidth-r)/2,positionY:(t.offsetHeight-o)/2}},zf=function(n,t){var e=n.setup.wheel,r=e.disabled,o=e.wheelDisabled,i=e.touchPadDisabled,a=e.excluded,u=n.isInitialized,s=n.isPanning,c=t.target;return!(!u||s||r||!c)&&(!(o&&!t.ctrlKey)&&((!i||!t.ctrlKey)&&!Of(c,a)))};function If(n,t,e){var r=t.getBoundingClientRect(),o=0,i=0;if("clientX"in n)o=(n.clientX-r.left)/e,i=(n.clientY-r.top)/e;else{var a=n.touches[0];o=(a.clientX-r.left)/e,i=(a.clientY-r.top)/e}return(isNaN(o)||isNaN(i))&&console.error("No mouse or touch offset found"),{x:o,y:i}}var Df=function(n,t){var e=n.setup.pinch,r=e.disabled,o=e.excluded,i=n.isInitialized,a=t.target;return!(!i||r||!a)&&!Of(a,o)},jf=function(n){var t=n.setup.pinch.disabled,e=n.isInitialized,r=n.pinchStartDistance;return!(!e||t||!r)},Mf=function(n){return Math.sqrt(Math.pow(n.touches[0].pageX-n.touches[1].pageX,2)+Math.pow(n.touches[0].pageY-n.touches[1].pageY,2))},Bf=function(n,t){var e=n.props,r=e.onWheelStart,o=e.onZoomStart;n.wheelStopEventTimer||(Xl(n),Hl(Af(n),t,r),Hl(Af(n),t,o))},Vf=function(n,t){var e=n.props,r=e.onWheel,o=e.onZoom,i=n.contentComponent,a=n.setup,u=n.transformState.scale,s=a.limitToBounds,c=a.centerZoomedOut,l=a.zoomAnimation,f=a.wheel,p=l.size,d=l.disabled,h=f.step;if(!i)throw new Error("Component not mounted");t.preventDefault(),t.stopPropagation();var v=function(n,t,e,r,o){var i=n.transformState.scale,a=n.wrapperComponent,u=n.setup,s=u.maxScale,c=u.minScale,l=u.zoomAnimation,f=l.size,p=l.disabled;if(!a)throw new Error("Wrapper is not mounted");var d=i+t*(i-i*e)*e;if(o)return d;var h=!r&&!p;return tf(Yl(d,3),c,s,f,h)}(n,function(n,t){var e,r,o=n?n.deltaY<0?1:-1:0;return r=o,"number"==typeof(e=t)?e:r}(t,null),h,!t.ctrlKey);if(u!==v){var m=Zl(n,v),g=If(t,i,u),y=s&&(d||0===p||c),b=nf(n,g.x,g.y,v,m,y),w=b.x,x=b.y;n.previousWheelEvent=t,n.setTransformState(v,w,x),Hl(Af(n),t,r),Hl(Af(n),t,o)}},Ff=function(n,t){var e=n.props,r=e.onWheelStop,o=e.onZoomStop;kf(n.wheelAnimationTimer),n.wheelAnimationTimer=setTimeout((function(){n.mounted&&(pf(n,t.x,t.y),n.wheelAnimationTimer=null)}),100),function(n,t){var e=n.previousWheelEvent,r=n.transformState.scale,o=n.setup,i=o.maxScale,a=o.minScale;return!!e&&(r<i||r>a||Math.sign(e.deltaY)!==Math.sign(t.deltaY)||e.deltaY>0&&e.deltaY<t.deltaY||e.deltaY<0&&e.deltaY>t.deltaY||Math.sign(e.deltaY)!==Math.sign(t.deltaY))}(n,t)&&(kf(n.wheelStopEventTimer),n.wheelStopEventTimer=setTimeout((function(){n.mounted&&(n.wheelStopEventTimer=null,Hl(Af(n),t,r),Hl(Af(n),t,o))}),160))},Wf=function(n,t){var e=Mf(t);n.pinchStartDistance=e,n.lastDistance=e,n.pinchStartScale=n.transformState.scale,n.isPanning=!1,Xl(n)},Yf=function(n,t){var e=n.contentComponent,r=n.pinchStartDistance,o=n.transformState.scale,i=n.setup,a=i.limitToBounds,u=i.centerZoomedOut,s=i.zoomAnimation,c=s.disabled,l=s.size;if(null!==r&&e){var f=function(n,t,e){var r=e.getBoundingClientRect(),o=n.touches,i=Yl(o[0].clientX-r.left,5),a=Yl(o[0].clientY-r.top,5);return{x:(i+Yl(o[1].clientX-r.left,5))/2/t,y:(a+Yl(o[1].clientY-r.top,5))/2/t}}(t,o,e);if(isFinite(f.x)&&isFinite(f.y)){var p=Mf(t),d=function(n,t){var e=n.pinchStartScale,r=n.pinchStartDistance,o=n.setup,i=o.maxScale,a=o.minScale,u=o.zoomAnimation,s=u.size,c=u.disabled;if(!e||null===r||!t)throw new Error("Pinch touches distance was not provided");return t<0?n.transformState.scale:tf(Yl(t/r*e,2),a,i,s,!c)}(n,p);if(d!==o){var h=Zl(n,d),v=a&&(c||0===l||u),m=nf(n,f.x,f.y,d,h,v),g=m.x,y=m.y;n.pinchMidpoint=f,n.lastDistance=p,n.setTransformState(d,g,y)}}}},Hf=function(n){var t=n.pinchMidpoint;n.velocity=null,n.lastDistance=null,n.pinchMidpoint=null,n.pinchStartScale=null,n.pinchStartDistance=null,pf(n,null==t?void 0:t.x,null==t?void 0:t.y)};function Uf(n,t){var e=n.setup.doubleClick,r=e.disabled,o=e.mode,i=e.step,a=e.animationTime,u=e.animationType;if(!r){if("reset"===o)return xf(n,a,u);var s=n.transformState.scale,c=n.contentComponent;if(!c)return console.error("No ContentComponent found");var l=bf(n,"zoomOut"===o?-1:1,i),f=If(t,c,s),p=df(n,l,f.x,f.y);if(!p)return console.error("Error during zoom event. New transformation state was not calculated.");Gl(n,p,a,u)}}var $f=function(n,t){var e=n.isInitialized,r=n.setup,o=n.wrapperComponent,i=r.doubleClick,a=i.disabled,u=i.excluded,s=t.target,c=null==o?void 0:o.contains(s),l=e&&s&&c&&!a;return!!l&&(!Of(s,u)&&!!l)},Xf=react__WEBPACK_IMPORTED_MODULE_0___default().createContext(vf),qf=function(n){function e(){var t=null!==n&&n.apply(this,arguments)||this;return t.mounted=!0,t.transformState=gf(t.props),t.setup=yf(t.props),t.wrapperComponent=null,t.contentComponent=null,t.isInitialized=!1,t.bounds=null,t.previousWheelEvent=null,t.wheelStopEventTimer=null,t.wheelAnimationTimer=null,t.isPanning=!1,t.startCoords=null,t.lastTouch=null,t.distance=null,t.lastDistance=null,t.pinchStartDistance=null,t.pinchStartScale=null,t.pinchMidpoint=null,t.velocity=null,t.velocityTime=null,t.lastMousePosition=null,t.animate=!1,t.animation=null,t.maxBounds=null,t.pressedKeys={},t.handleInitializeWrapperEvents=function(n){var e=Lf();n.addEventListener("wheel",t.onWheelZoom,e),n.addEventListener("dblclick",t.onDoubleClick,e),n.addEventListener("touchstart",t.onTouchPanningStart,e),n.addEventListener("touchmove",t.onTouchPanning,e),n.addEventListener("touchend",t.onTouchPanningStop,e)},t.handleInitialize=function(){var n=t.setup.centerOnInit;t.applyTransformation(),t.forceUpdate(),n&&(setTimeout((function(){t.mounted&&t.setCenter()}),50),setTimeout((function(){t.mounted&&t.setCenter()}),100),setTimeout((function(){t.mounted&&t.setCenter()}),200))},t.onWheelZoom=function(n){t.setup.disabled||zf(t,n)&&t.isPressingKeys(t.setup.wheel.activationKeys)&&(Bf(t,n),Vf(t,n),Ff(t,n))},t.onPanningStart=function(n){var e=t.setup.disabled,r=t.props.onPanningStart;e||ef(t,n)&&t.isPressingKeys(t.setup.panning.activationKeys)&&(n.preventDefault(),n.stopPropagation(),Xl(t),sf(t,n),Hl(Af(t),n,r))},t.onPanning=function(n){var e=t.setup.disabled,r=t.props.onPanning;e||rf(t)&&t.isPressingKeys(t.setup.panning.activationKeys)&&(n.preventDefault(),n.stopPropagation(),cf(t,n.clientX,n.clientY),Hl(Af(t),n,r))},t.onPanningStop=function(n){var e=t.props.onPanningStop;t.isPanning&&(lf(t),Hl(Af(t),n,e))},t.onPinchStart=function(n){var e=t.setup.disabled,r=t.props,o=r.onPinchingStart,i=r.onZoomStart;e||Df(t,n)&&(Wf(t,n),Xl(t),Hl(Af(t),n,o),Hl(Af(t),n,i))},t.onPinch=function(n){var e=t.setup.disabled,r=t.props,o=r.onPinching,i=r.onZoom;e||jf(t)&&(n.preventDefault(),n.stopPropagation(),Yf(t,n),Hl(Af(t),n,o),Hl(Af(t),n,i))},t.onPinchStop=function(n){var e=t.props,r=e.onPinchingStop,o=e.onZoomStop;t.pinchStartScale&&(Hf(t),Hl(Af(t),n,r),Hl(Af(t),n,o))},t.onTouchPanningStart=function(n){var e=t.setup.disabled,r=t.props.onPanningStart;if(!e&&ef(t,n))if(t.lastTouch&&+new Date-t.lastTouch<200&&1===n.touches.length)t.onDoubleClick(n);else{t.lastTouch=+new Date,Xl(t);var o=n.touches,i=1===o.length,a=2===o.length;i&&(Xl(t),sf(t,n),Hl(Af(t),n,r)),a&&t.onPinchStart(n)}},t.onTouchPanning=function(n){var e=t.setup.disabled,r=t.props.onPanning;if(t.isPanning&&1===n.touches.length){if(e)return;if(!rf(t))return;n.preventDefault(),n.stopPropagation();var o=n.touches[0];cf(t,o.clientX,o.clientY),Hl(Af(t),n,r)}else n.touches.length>1&&t.onPinch(n)},t.onTouchPanningStop=function(n){t.onPanningStop(n),t.onPinchStop(n)},t.onDoubleClick=function(n){t.setup.disabled||$f(t,n)&&Uf(t,n)},t.clearPanning=function(n){t.isPanning&&t.onPanningStop(n)},t.setKeyPressed=function(n){t.pressedKeys[n.key]=!0},t.setKeyUnPressed=function(n){t.pressedKeys[n.key]=!1},t.isPressingKeys=function(n){return!n.length||Boolean(n.find((function(n){return t.pressedKeys[n]})))},t.setComponents=function(n,e){t.wrapperComponent=n,t.contentComponent=e,Zl(t,t.transformState.scale),t.handleInitializeWrapperEvents(n),t.handleInitialize(),t.handleRef(),t.isInitialized=!0,Hl(Af(t),void 0,t.props.onInit)},t.setTransformState=function(n,e,r){isNaN(n)||isNaN(e)||isNaN(r)?console.error("Detected NaN set state values"):(n!==t.transformState.scale&&(t.transformState.previousScale=t.transformState.scale,t.transformState.scale=n),t.transformState.positionX=e,t.transformState.positionY=r,t.applyTransformation())},t.setCenter=function(){if(t.wrapperComponent&&t.contentComponent){var n=Nf(t.transformState.scale,t.wrapperComponent,t.contentComponent);t.setTransformState(n.scale,n.positionX,n.positionY)}},t.applyTransformation=function(){if(t.mounted&&t.contentComponent){var n=t.transformState,e=n.scale,r=n.positionX,o=n.positionY,i=Rf(r,o,e);t.contentComponent.style.transform=i,t.handleRef()}},t.handleRef=function(){t.props.setRef(Af(t))},t}return function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=n}Vl(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}(e,n),e.prototype.componentDidMount=function(){var n=Lf();window.addEventListener("mousedown",this.onPanningStart,n),window.addEventListener("mousemove",this.onPanning,n),window.addEventListener("mouseup",this.onPanningStop,n),document.addEventListener("mouseleave",this.clearPanning,n),window.addEventListener("keyup",this.setKeyUnPressed,n),window.addEventListener("keydown",this.setKeyPressed,n),this.handleRef()},e.prototype.componentWillUnmount=function(){var n=Lf();window.removeEventListener("mousedown",this.onPanningStart,n),window.removeEventListener("mousemove",this.onPanning,n),window.removeEventListener("mouseup",this.onPanningStop,n),window.removeEventListener("keyup",this.setKeyUnPressed,n),window.removeEventListener("keydown",this.setKeyPressed,n),Xl(this)},e.prototype.componentDidUpdate=function(n){n!==this.props&&(Zl(this,this.transformState.scale),this.setup=yf(this.props))},e.prototype.render=function(){var n=Af(this),e=this.props.children,r="function"==typeof e?e(n):e;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Xf.Provider,{value:Fl(Fl({},this.transformState),{setComponents:this.setComponents,contextInstance:this})},r)},e}(react__WEBPACK_IMPORTED_MODULE_0__.Component),Gf=react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((function(n,e){var r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),o=r[0],i=r[1];return (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(e,(function(){return o}),[o]),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(qf,Fl({},n,{setRef:i}))}));var Kf="transform-component-module_wrapper__1_Fgj",Zf="transform-component-module_content__2jYgh";!function(n,t){void 0===t&&(t={});var e=t.insertAt;if(n&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===e&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=n:o.appendChild(document.createTextNode(n))}}(".transform-component-module_wrapper__1_Fgj {\n  position: relative;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  overflow: hidden;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none;\n  margin: 0;\n  padding: 0;\n}\n.transform-component-module_content__2jYgh {\n  display: flex;\n  flex-wrap: wrap;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  margin: 0;\n  padding: 0;\n  transform-origin: 0% 0%;\n}\n.transform-component-module_content__2jYgh img {\n  pointer-events: none;\n}\n");var Jf,Qf,np,tp,ep,rp=function(n){var e=n.children,a=n.wrapperClass,u=void 0===a?"":a,s=n.contentClass,c=void 0===s?"":s,l=n.wrapperStyle,f=n.contentStyle,p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Xf).setComponents,d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var n=d.current,t=h.current;null!==n&&null!==t&&p&&p(n,t)}),[]),react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{ref:d,className:"react-transform-wrapper "+Kf+" "+u,style:l},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{ref:h,className:"react-transform-component "+Zf+" "+c,style:f},e))},op=react__WEBPACK_IMPORTED_MODULE_0___default().memo((function(n){var e=n.src,r=n.caption,o=n.disablePanzoom,a=n.handlePanzoom,u=n.panzoomEnabled,s=n.boxShadow,c=n.imgHeight,l=n.imgWidth,f=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),2),p=f[0],h=f[1];function v(n){n.touches.length>1&&!u&&n.cancelable&&(n.preventDefault(),a(!0))}(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var n=new Image;n.src=e,n.onload=function(){h(!1)}}),[e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return document.addEventListener("touchstart",v,{passive:!1}),function(){document.addEventListener("touchstart",v,{passive:!1})}}),[]);var m=p?react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Bl,null):u?react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Gf,{maxScale:6,minScale:.5,wheel:{step:.5},zoomAnimation:{animationType:"easeInOutQuad"}},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(rp,null,react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Ml,{src:e,className:"SRLImage SRLImageZoomed",alt:r,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{ease:"easeInOut"}}))):react__WEBPACK_IMPORTED_MODULE_0___default().createElement(jl,{src:e,className:"SRLImage",disablePanzoom:o,onClick:function(){return a(!0)},alt:r,boxShadow:s,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{ease:"easeInOut"},width:l,height:c});return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Jc,null,m)}));op.displayName="ImageLoad",op.propTypes={handlePanzoom:mn.func,src:mn.string,caption:mn.string,disablePanzoom:mn.bool,boxShadow:mn.string,panzoomEnabled:mn.bool,containerRef:mn.any,imgWidth:mn.number,imgHeight:mn.number};var ip,ap,up,sp,cp,lp,fp,pp,dp,hp,vp,mp,gp,yp,bp,wp,xp,Sp,_p,Ep=Te(Jf||(Jf=jn(["\n  -ms-grid-columns: 1fr auto;\n  grid-template-columns: 1fr auto;\n  -ms-grid-rows: 90% auto;\n  grid-template-rows: 90% auto;\n\n  > *:nth-of-type(1) {\n    -ms-grid-row: 1;\n  }\n\n  > *:nth-of-type(2) {\n    -ms-grid-row: 2;\n  }\n\n  > *:nth-of-type(3) {\n    -ms-grid-row: 1;\n  }\n"]))),Tp=Te(Qf||(Qf=jn(["\n  -ms-grid-columns: auto 1fr;\n  grid-template-columns: auto 1fr;\n  -ms-grid-rows: 90% auto;\n  grid-template-rows: 90% auto;\n\n  > *:nth-of-type(1) {\n    -ms-grid-row: 1;\n  }\n\n  > *:nth-of-type(2) {\n    -ms-grid-row: 2;\n  }\n\n  > *:nth-of-type(3) {\n    -ms-grid-row: 1;\n  }\n"]))),Pp=Be.div(np||(np=jn(["\n  bottom: 0;\n  left: 0;\n  right: 0;\n  top: 0;\n  display: grid;\n  display: -ms-grid;\n  -ms-grid-rows: auto;\n  grid-template-rows: auto;\n  align-items: center;\n  justify-content: center;\n  justify-items: center;\n  width: 100vw;\n  height: 100vh;\n  height: calc(var(--vh, 1vh) * 100);\n\n  > *:nth-of-type(1) {\n    -ms-grid-row: 1;\n  }\n\n  > *:nth-of-type(2) {\n    -ms-grid-row: 2;\n  }\n\n  > *:nth-of-type(3) {\n    -ms-grid-row: 3;\n  }\n\n  /* Thumbnails aligned to the right */\n  ",";\n\n  /* Thumbnails aligned to the left */\n  ",";\n\n  ",";\n\n  ",";\n\n  @media (max-width: 768px) {\n    grid-template-columns: auto;\n    grid-template-rows: auto;\n  }\n"])),(function(n){return"right"===n.thumbnailsPosition&&Ep}),(function(n){return"left"===n.thumbnailsPosition&&Tp}),(function(n){return n.hideThumbnails&&Te(tp||(tp=jn(["\n      -ms-grid-rows: 90% auto;\n      grid-template-rows: 90% auto;\n    "])))}),(function(n){return!n.showCaption&&Te(ep||(ep=jn(["\n      -ms-grid-rows: auto;\n      grid-template-rows: auto;\n    "])))}));function Cp(n){var e,r,a=n.caption,u=n.direction,s=n.elements,c=n.handleCurrentElement,l=n.handleCloseLightbox,f=n.handleNextElement,p=n.handlePanzoom,d=n.handlePrevElement,h=n.height,v=n.hideThumbnails,m=n.id,g=n.options,y=n.panzoomEnabled,b=n.source,w=n.SRLThumbnailsRef,x=n.SRLCaptionRef,S=n.width,_=g.settings,E=g.thumbnails,T=g.caption,P=bn(Rl(x),1)[0],C=bn(Rl(w),1)[0],A=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),L=!!window.MSInputMethodContext&&!!document.documentMode,O=L?1e3:"100%",k=L?-1e3:"-100%",R={slideIn:function(n){return{x:void 0===n?0:"next"===n?O:k,transition:{ease:_.slideTransitionTimingFunction}}},slideOut:function(n){return{x:"previous"===n?O:k,transition:{ease:_.slideTransitionTimingFunction}}},fadeIn:{opacity:0,transition:{ease:_.slideTransitionTimingFunction}},fadeOut:{opacity:0,transition:{ease:_.slideTransitionTimingFunction}},bothIn:function(n){return{opacity:1,x:void 0===n?"0":"next"===n?1e3:-1e3,transition:{ease:_.slideTransitionTimingFunction}}},bothOut:function(n){return{opacity:0,x:"previous"===n?1e3:-1e3,transition:{ease:_.slideTransitionTimingFunction}}},center:{x:0,opacity:1}},N=bl({onSwipedLeft:function(){return f(m)},onSwipedRight:function(){return d(m)},delta:y?500:90,preventDefaultTouchmoveEvent:!0,trackTouch:!0,trackMouse:!1}),z=wl((function(n){n>0?f(m):n<0&&d(m)}),150);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(!y&&!_.disableWheelControls){var n=Ll(document,"wheel",(function(n){return z(n.deltaY)}));return function(){n()}}}),[z,y,_.disableWheelControls]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var n=function(n){!e.current||n.target.classList.contains("SRLImage")||n.target.classList.contains("SRLPanzoomImage")||n.target.classList.contains("SRLNextButton")||n.target.classList.contains("SRLPrevButton")||n.target.classList.contains("SRLCloseButton")||n.target.classList.contains("SRLAutoplayButton")||n.target.classList.contains("SRLExpandButton")||n.target.classList.contains("SRLZoomOutButton")||n.target.classList.contains("SRLDownloadButton")||n.target.classList.contains("SRLThumbnailsButton")||n.target.classList.contains("SRLCaptionContainer")||n.target.classList.contains("SRLCaptionText")||n.target.classList.contains("SRLCustomCaption")||n.target.classList.contains("SRLThumbnails")||n.target.classList.contains("SRLThumb")||n.target.classList.contains("SRLCaption")||n.target.classList.contains("react-transform-component")||n.target.classList.contains("react-transform-element")||"touchstart"===n.type||0!==n.button||r(n)};return"undefined"!=typeof window&&(document.addEventListener("mousedown",n),document.addEventListener("touchstart",n)),function(){"undefined"!=typeof window&&(document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n))}}),[e=A,r=function(){return l()}]);var I={captionAlignment:g.caption.captionAlignment,captionColor:g.caption.captionColor,captionContainerPadding:g.caption.captionContainerPadding,captionFontFamily:g.caption.captionFontFamily,captionFontSize:g.caption.captionFontSize,captionFontStyle:g.caption.captionFontStyle,captionFontWeight:g.caption.captionFontWeight,captionTextTransform:g.caption.captionTextTransform};return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Pp,{className:"SRLContainer",ref:A,thumbnailsPosition:E.thumbnailsPosition,showCaption:T.showCaption,hideThumbnails:v},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Il,Dn({thumbnailsPosition:E.thumbnailsPosition,showThumbnails:E.showThumbnails,hideThumbnails:v,showCaption:T.showCaption,className:"SRLElementContainer",captionDivSizes:P,thumbnailsDivSizes:C},N),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Jc,{className:"SRLAnimatePresence",custom:u},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Dl,{variants:R,custom:u,initial:"slide"===_.slideAnimationType?"slideIn":"both"===_.slideAnimationType?"bothIn":"fadeIn",animate:"center",exit:"slide"===_.slideAnimationType?"slideOut":"both"===_.slideAnimationType?"bothOut":"fadeOut",className:"SRLElementWrapper",key:m||0,transition:{x:{type:"spring",stiffness:_.slideSpringValues[0],damping:_.slideSpringValues[1]},opacity:{duration:_.slideTransitionSpeed}}},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(op,{disablePanzoom:_.disablePanzoom,panzoomEnabled:y,handlePanzoom:p,containerRef:A,imgHeight:h,imgWidth:S,src:b,caption:a,boxShadow:_.boxShadow})))),T.showCaption&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(hl,{id:m,thumbnailsPosition:E.thumbnailsPosition,captionOptions:I,caption:a,SRLCaptionRef:x}),E.showThumbnails&&!v&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(pl,{handleCurrentElement:c,thumbnails:E,currentId:m,elements:s||[],SRLThumbnailsRef:w}))}Cp.propTypes={caption:mn.string,direction:mn.string,elements:mn.array,handleCloseLightbox:mn.func,handleCurrentElement:mn.func,handleNextElement:mn.func,handlePanzoom:mn.func,handlePrevElement:mn.func,height:mn.oneOfType([mn.number,mn.string]),hideThumbnails:mn.bool,id:mn.string,options:mn.shape({settings:mn.shape({boxShadow:mn.string,disablePanzoom:mn.bool,disableWheelControls:mn.bool,slideAnimationType:mn.string,slideSpringValues:mn.array,slideTransitionSpeed:mn.number,slideTransitionTimingFunction:mn.oneOfType([mn.string,mn.array])}),caption:mn.shape({captionAlignment:mn.string,captionColor:mn.string,captionFontFamily:mn.string,captionFontSize:mn.string,captionFontStyle:mn.string,captionFontWeight:mn.oneOfType([mn.number,mn.string]),captionContainerPadding:mn.string,captionTextTransform:mn.string,showCaption:mn.bool}),thumbnails:mn.shape({showThumbnails:mn.bool,thumbnailsOpacity:mn.number,thumbnailsPosition:mn.string,thumbnailsSize:mn.array})}),panzoomEnabled:mn.bool,showControls:mn.bool,source:mn.oneOfType([mn.string,mn.object]),SRLCaptionRef:mn.object,SRLThumbnailsRef:mn.object,thumbnailsOpacity:mn.number,type:mn.string,width:mn.oneOfType([mn.number,mn.string])};var Ap,Lp,Op=Be.button(ip||(ip=jn(["\n  position: absolute;\n  height: ",";\n  width: ",";\n  transition: color 0.3s ease;\n  background-color: ",";\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n  cursor: pointer;\n  margin: 0;\n  padding: 0;\n  visibility: inherit;\n  z-index: 9998;\n  opacity: 1;\n  transition: opacity 0.3s ease;\n  display: flex;\n  align-items: center;\n  align-content: center;\n  justify-content: center;\n\n  .SRLIdle & {\n    opacity: 0;\n\n    @media (max-width: 768px) {\n      opacity: 1;\n    }\n\n    @media (max-width: 360px) {\n      opacity: 1;\n    }\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  @media (max-width: 768px) {\n    height: ",";\n    width: ",";\n\n    .SRLIdle & {\n      opacity: 1;\n    }\n  }\n\n  div {\n    height: ",";\n    width: ",";\n    padding: ",";\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n\n    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {\n      padding: 10px;\n      height: ",";\n      width: ",";\n    }\n\n    @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {\n      padding: 10px;\n      height: ",";\n      width: ",";\n    }\n\n    @media (max-width: 768px) {\n      padding: 10px;\n      height: ",";\n      width: ",";\n\n      .SRLIdle & {\n        opacity: 1;\n      }\n    }\n\n    svg {\n      display: block;\n      height: 100%;\n      width: 100%;\n      overflow: visible;\n      position: relative;\n      path {\n        transition: fill 0.3s ease;\n        fill: ",";\n      }\n    }\n    &:hover {\n      svg path {\n        fill: ",";\n      }\n    }\n  }\n"])),(function(n){return n.buttonsSize?n.buttonsSize:"30px"}),(function(n){return n.buttonsSize?n.buttonsSize:"30px"}),(function(n){return n.buttonsBackgroundColor?n.buttonsBackgroundColor:"rgba(30, 30, 36, 0.8)"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1.2)+"px":"30px"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1.2)+"px":"30px"}),(function(n){return n.buttonsSize?n.buttonsSize:"30px"}),(function(n){return n.buttonsSize?n.buttonsSize:"30px"}),(function(n){return n.buttonsIconPadding?n.buttonsIconPadding:"5px"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1)+"px":"30px"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1)+"px":"30px"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1)+"px":"30px"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1)+"px":"30px"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1.1)+"px":"30px"}),(function(n){return n.buttonsSize?Math.round(parseInt(n.buttonsSize,10)/1.1)+"px":"30px"}),(function(n){return n.buttonsIconColor?n.buttonsIconColor:"rgba(255, 255, 255, 0.8)"}),(function(n){return n.buttonsIconColor&&n.buttonsIconColor.replace(/[\d\.]+\)$/g,"1)")})),kp=Be.div(ap||(ap=jn(['\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  top: calc(env(safe-area-inset-top) + 5px);\n  right: calc(env(safe-area-inset-right) + 5px);\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  transition: 0.3s ease;\n  will-change: right;\n\n  /* Offset the buttons if the progress bar is active and the autoplay is "playing" */\n  ',";\n\n  /* Offset the buttons if the thumbnails are on the right */\n  ",";\n\n  /* Thumbnails on right are closed so we need to reset the position */\n  ",";\n\n  @media (max-width: 768px) {\n    right: 5px;\n    right: calc(env(safe-area-inset-right) + 5px) !important;\n  }\n"])),(function(n){return n.showProgressBar&&n.autoplay&&Te(up||(up=jn(["\n      top: ","px;\n      top: calc(\n        env(safe-area-inset-top) +\n          ","px\n      );\n    "])),2*Math.round(parseInt(n.buttonsOffsetFromProgressBar,10)),2*Math.round(parseInt(n.buttonsOffsetFromProgressBar,10)))}),(function(n){return"right"===n.thumbnailsPosition&&Te(sp||(sp=jn(["\n      right: ","px;\n      right: calc(\n        env(safe-area-inset-top) + ","px\n      );\n    "])),n.thumbnailsDivSizes.width+5,n.thumbnailsDivSizes.width+5)}),(function(n){return n.hideThumbnails&&"right"===n.thumbnailsPosition&&Te(cp||(cp=jn(["\n      right: 5px;\n      right: calc(env(safe-area-inset-right) + 5px);\n    "])))})),Rp=Be(Op)(lp||(lp=jn(["\n  position: relative;\n"]))),Np=Be(Op)(fp||(fp=jn(["\n  position: relative;\n  margin-right: 5px;\n\n  @media (max-width: 768px) {\n    display: none;\n  }\n"]))),zp=Be(Op)(pp||(pp=jn(["\n  position: relative;\n  margin-right: 5px;\n"]))),Ip=Be(Op)(dp||(dp=jn(["\n  position: relative;\n  margin-right: 5px;\n  display: ",";\n"])),(function(n){return 0===n.autoplaySpeed?"none":"flex"})),Dp=Be(Op)(hp||(hp=jn(["\n  position: relative;\n  margin-right: 5px;\n\n  ","\n\n  ","\n\n  @media (max-width: 768px) {\n    svg {\n      transform: rotate(0) !important;\n    }\n  }\n"])),(function(n){return"right"===n.thumbnailsPosition&&Te(vp||(vp=jn(["\n      svg {\n        transform: rotate(-90deg);\n      }\n    "])))}),(function(n){return"left"===n.thumbnailsPosition&&Te(mp||(mp=jn(["\n      svg {\n        transform: rotate(90deg);\n      }\n    "])))})),jp=Be(Op)(gp||(gp=jn(["\n  position: relative;\n  margin-right: 5px;\n"]))),Mp=Be(Op)(yp||(yp=jn(["\n  top: calc(50% - 50px);\n  right: 5px;\n  right: calc(env(safe-area-inset-right) + 5px);\n  transition: 0.3s ease;\n  will-change: right;\n\n  /* Offset the thumbnails with the width of the div of the thumbnails */\n  ",";\n\n  /* Thumbnails on right are closed so we need to reset the position */\n  ",";\n\n  @media (max-width: 768px) {\n    display: none;\n  }\n"])),(function(n){return"right"===n.thumbnailsPosition&&Te(bp||(bp=jn(["\n      right: ","px;\n      right: calc(\n        env(safe-area-inset-right) + ","px\n      );\n    "])),n.thumbnailsDivSizes.width+5,n.thumbnailsDivSizes.width+5)}),(function(n){return n.hideThumbnails&&"right"===n.thumbnailsPosition&&Te(wp||(wp=jn(["\n      right: 5px;\n      right: calc(env(safe-area-inset-right) + 5px);\n    "])))})),Bp=Be(Op)(xp||(xp=jn(["\n  top: calc(50% - 50px);\n  left: 5px;\n  left: calc(env(safe-area-inset-left) + 5px);\n  transition: 0.3s ease;\n  will-change: left;\n\n  /* Offset the thumbnails with the width of the div of the thumbnails */\n  ",";\n\n  /* Thumbnails on left are closed so we need to reset the position */\n  ",";\n\n  @media (max-width: 768px) {\n    display: none;\n  }\n"])),(function(n){return"left"===n.thumbnailsPosition&&Te(Sp||(Sp=jn(["\n      left: ","px;\n      left: calc(\n        env(safe-area-inset-right) + ","px\n      );\n    "])),n.thumbnailsDivSizes.width+5,n.thumbnailsDivSizes.width+5)}),(function(n){return n.hideThumbnails&&"left"===n.thumbnailsPosition&&Te(_p||(_p=jn(["\n      left: 5px;\n      left: calc(env(safe-area-inset-right) + 5px);\n    "])))})),Vp=function(n){var e=n.autoplay,r=n.buttons,o=n.buttonsOffsetFromProgressBar,i=n.currentElementID,a=n.handleCloseLightbox,u=n.handleFullScreen,s=n.handleImageDownload,c=n.handleNextElement,l=n.handlePanzoom,f=n.handlePrevElement,p=n.handleThumbnails,d=n.hideThumbnails,h=n.panzoomEnabled,v=n.setAutoplay,m=n.settings,g=n.showProgressBar,y=n.showThumbnails,b=n.SRLThumbnailsRef,w=n.thumbnailsPosition,x=n.thumbnailsSize,S=bn(Rl(b),1)[0];return react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment),null,react__WEBPACK_IMPORTED_MODULE_0___default().createElement(kp,{className:"SRLControls",autoplay:e,showProgressBar:g,buttonsOffsetFromProgressBar:o,thumbnailsPosition:w,thumbnailsDivSizes:S,thumbnailsSize:x,hideThumbnails:d},r.showAutoplayButton&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Ip,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,autoplaySpeed:m.autoplaySpeed,title:e?"Pause":"Play",className:"SRLAutoplayButton",onClick:function(){return v(!e)}},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLAutoplayButton"},e?react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLAutoplayButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLAutoplayButton",d:"M14.2 38.7h5.9c1.6 0 2.9-1.3 2.9-2.9V14.2c0-1.6-1.3-2.9-2.9-2.9h-5.9c-1.6 0-2.9 1.3-2.9 2.9v21.6c0 1.6 1.3 2.9 2.9 2.9zm-1-24.5c0-.5.4-1 1-1h5.9c.5 0 1 .4 1 1v21.6c0 .5-.4 1-1 1h-5.9c-.5 0-1-.4-1-1V14.2zm16.7 24.5h5.9c1.6 0 2.9-1.3 2.9-2.9V14.2c0-1.6-1.3-2.9-2.9-2.9h-5.9c-1.6 0-2.9 1.3-2.9 2.9v21.6c0 1.6 1.3 2.9 2.9 2.9zm-1-24.5c0-.5.4-1 1-1h5.9c.5 0 1 .4 1 1v21.6c0 .5-.4 1-1 1h-5.9c-.5 0-1-.4-1-1V14.2z"})):react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLAutoplayButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLAutoplayButton",d:"M35.7 22.8L16.9 11.6c-1.5-.9-3.9 0-3.9 2.2v22.3c0 2 2.2 3.2 3.9 2.2l18.9-11.1c1.6-1 1.6-3.4-.1-4.4zm-.8 2.9L16 36.9c-.6.3-1.3-.1-1.3-.7V13.8c0-.9.9-1 1.3-.7l18.9 11.1c.5.4.5 1.2 0 1.5z"})))),r.showThumbnailsButton&&y&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Dp,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,thumbnailsPosition:w,onClick:p,title:d?"Show Thumbnails":"Hide Thumbnails",className:"SRLThumbnailsButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLThumbnailsButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLThumbnailsButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g",{fill:"#fff",className:"SRLThumbnailsButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLThumbnailsButton",d:"M15.4 27.4h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm12 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm12 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4z",opacity:".4"}),react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLThumbnailsButton",d:"M39.4 13h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm-24 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm12 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4z"}))))),r.showDownloadButton&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(jp,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,title:"Download image",className:"SRLDownloadButton",onClick:s},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLDownloadButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLDownloadButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLDownloadButton",d:"M35.7 34.1c0 .6-.5 1-1.1 1-.6 0-1.1-.5-1.1-1s.5-1 1.1-1c.6 0 1.1.5 1.1 1zm-4.6-1c-.6 0-1.1.5-1.1 1s.5 1 1.1 1c.6 0 1.1-.5 1.1-1s-.5-1-1.1-1zm7.8-2.5V36c0 1.3-1.1 2.3-2.4 2.3h-23c-1.3 0-2.4-1-2.4-2.3v-5.4c0-1.3 1.1-2.3 2.4-2.3h5.4l-3.1-2.9c-1.4-1.3-.4-3.5 1.5-3.5h2.9v-8.1c0-1.1 1-2.1 2.2-2.1h5.2c1.2 0 2.2.9 2.2 2.1v8.1h2.9c1.9 0 2.9 2.2 1.5 3.5l-3.1 2.9h5.4c1.3 0 2.4 1 2.4 2.3zm-14.2.9c.2.2.4.2.6 0l7.6-7.3c.3-.3.1-.7-.3-.7H28v-9.7c0-.2-.2-.4-.4-.4h-5.2c-.2 0-.4.2-.4.4v9.7h-4.6c-.4 0-.6.4-.3.7l7.6 7.3zm12.5-.9c0-.3-.3-.6-.7-.6h-7.1l-2.8 2.7c-.8.8-2.2.8-3.1 0L20.6 30h-7.1c-.4 0-.7.3-.7.6V36c0 .3.3.6.7.6h23c.4 0 .7-.3.7-.6v-5.4z"})))),h?react__WEBPACK_IMPORTED_MODULE_0___default().createElement(zp,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,title:"Zoom out",className:"SRLZoomOutButton",onClick:function(){return l(!1)}},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLZoomOutButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLZoomOutButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLZoomOutButton",d:"M27.9 21.6v1.3c0 .4-.3.7-.7.7h-10c-.4 0-.7-.3-.7-.7v-1.3c0-.4.3-.7.7-.7h10c.4 0 .7.3.7.7zm10.7 15.8l-1.2 1.2c-.3.3-.7.3-.9 0L29.9 32c-.1-.1-.2-.3-.2-.5v-.7c-2 1.7-4.6 2.8-7.4 2.8C16 33.6 11 28.5 11 22.3s5-11.4 11.3-11.4S33.6 16 33.6 22.3c0 2.8-1 5.4-2.8 7.4h.7c.2 0 .3.1.5.2l6.6 6.6c.3.2.3.6 0 .9zM31 22.3c0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7 3.9 8.7 8.7 8.7 8.7-3.9 8.7-8.7z"})))):"",r.showFullscreenButton&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Np,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,title:"Enter fullscreen",className:"SRLExpandButton",onClick:u},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLExpandButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLExpandButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLExpandButton",d:"M11.22 20.66v-7.91a1.52 1.52 0 011.53-1.53h7.91a.76.76 0 01.76.76v1.53a.77.77 0 01-.76.77h-6.38v6.38a.77.77 0 01-.77.76H12a.76.76 0 01-.78-.76zM29.58 12v1.53a.78.78 0 00.77.77h6.38v6.38a.76.76 0 00.76.76H39a.77.77 0 00.77-.76v-7.93a1.52 1.52 0 00-1.53-1.53h-7.89a.77.77 0 00-.77.78zM39 29.58h-1.51a.77.77 0 00-.76.77v6.38h-6.38a.77.77 0 00-.77.76V39a.78.78 0 00.77.77h7.91a1.52 1.52 0 001.53-1.53v-7.89a.78.78 0 00-.79-.77zM21.42 39v-1.51a.76.76 0 00-.76-.76h-6.38v-6.38a.78.78 0 00-.77-.77H12a.77.77 0 00-.76.77v7.91a1.52 1.52 0 001.53 1.53h7.91a.77.77 0 00.74-.79z"})))),r.showCloseButton&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Rp,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,title:"Close",className:"SRLCloseButton",onClick:function(){return a()}},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLCloseButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLCloseButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLCloseButton",d:"M27.92 25l8.84-8.84 1.82-1.82c.27-.27.27-.71 0-.97l-1.95-1.95a.682.682 0 0 0-.97 0L25 22.08 14.34 11.42a.682.682 0 0 0-.97 0l-1.95 1.95c-.27.27-.27.71 0 .97L22.08 25 11.42 35.66c-.27.27-.27.71 0 .97l1.95 1.95c.27.27.71.27.97 0L25 27.92l8.84 8.84 1.82 1.82c.27.27.71.27.97 0l1.95-1.95c.27-.27.27-.71 0-.97L27.92 25z"}))))),r.showNextButton&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Mp,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,thumbnailsPosition:w,thumbnailsDivSizes:S,thumbnailsSize:x,hideThumbnails:d,title:"Next",className:"SRLNextButton",onClick:function(){return c(i)}},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLNextButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLNextButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLPrevButton",d:"M24.53 11.36l-.44.44c-.29.29-.29.76 0 1.05l11.09 11.09H11.83c-.41 0-.75.33-.75.75v.62c0 .41.33.75.75.75h23.35L24.09 37.14c-.29.29-.29.76 0 1.05l.44.44c.29.29.76.29 1.05 0l13.11-13.11c.29-.29.29-.76 0-1.05l-13.1-13.11a.754.754 0 0 0-1.06 0z"})))),r.showPrevButton&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Bp,{buttonsBackgroundColor:r.backgroundColor,buttonsIconColor:r.iconColor,buttonsSize:r.size,buttonsIconPadding:r.iconPadding,title:"Previous",className:"SRLPrevButton",thumbnailsPosition:w,thumbnailsDivSizes:S,thumbnailsSize:x,hideThumbnails:d,onClick:function(){return f(i)}},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"SRLPrevButton"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{className:"SRLPrevButton",xmlns:"http://www.w3.org/2000/svg",viewBox:"11 11 30 30"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path",{className:"SRLPrevButton",d:"M25.47 38.64l.44-.44c.29-.29.29-.76 0-1.05L14.82 26.06h23.35c.41 0 .75-.33.75-.75v-.62c0-.41-.33-.75-.75-.75H14.82l11.09-11.09c.29-.29.29-.76 0-1.05l-.44-.44a.742.742 0 0 0-1.05 0L11.31 24.47c-.29.29-.29.76 0 1.05l13.11 13.11c.29.3.76.3 1.05.01z"})))))};Vp.propTypes={autoplay:mn.bool,buttons:mn.shape({backgroundColor:mn.string,iconColor:mn.string,iconPadding:mn.string,showAutoplayButton:mn.bool,showCloseButton:mn.bool,showDownloadButton:mn.bool,showFullscreenButton:mn.bool,showNextButton:mn.bool,showPrevButton:mn.bool,showThumbnailsButton:mn.bool,size:mn.string}),hideThumbnails:mn.bool,buttonsOffsetFromProgressBar:mn.string,currentElementID:mn.string,handleCloseLightbox:mn.func,handleFullScreen:mn.func,handleImageDownload:mn.func,handleNextElement:mn.func,handlePanzoom:mn.func,handlePrevElement:mn.func,handleThumbnails:mn.func,panzoomEnabled:mn.bool,setAutoplay:mn.func,settings:mn.shape({autoplaySpeed:mn.number}),showProgressBar:mn.bool,showThumbnails:mn.bool,thumbnailsPosition:mn.string,SRLThumbnailsRef:mn.object,thumbnailsSize:mn.array};var Fp=Be.div(Ap||(Ap=jn(["\n  width: 100%;\n  height: ",";\n  background-color: ",";\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 9999;\n"])),(function(n){return n.barHeight}),(function(n){return n.backgroundColor})),Wp=Be.div(Lp||(Lp=jn(["\n  height: ",";\n  width: 100%;\n  background-color: ",";\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: scaleX(0);\n  transform-origin: 0;\n"])),(function(n){return n.barHeight}),(function(n){return n.fillColor})),Yp=function(n){var e=n.autoplay,r=n.autoplaySpeed,o=n.progressBar,a=n.currentElementID,u=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),s=u[0],c=u[1];return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){c(!1)}),[a]),kl((function(){c(!0)}),e?r/100:null,a),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Fp,{barHeight:o.height,backgroundColor:o.backgroundColor,className:"SRLProgressBar"},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Wp,{barHeight:o.height,fillColor:o.fillColor,style:{transform:"scaleX(".concat(s?1:0,")"),transitionDuration:"".concat(s?r+"ms":"0ms")}}))};function Hp(n){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];n&&n.addEventListener&&n.addEventListener.apply(n,t)}function Up(n){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];n&&n.removeEventListener&&n.removeEventListener.apply(n,t)}Yp.propTypes={autoplay:mn.bool,autoplaySpeed:mn.number,currentElementID:mn.string,progressBar:mn.shape({backgroundColor:mn.string,fillColor:mn.string,height:mn.string})};var $p=["mousemove","mousedown","resize","keydown","touchstart","wheel"],Xp=function(n,t,e){void 0===n&&(n=6e4),void 0===t&&(t=!1),void 0===e&&(e=$p);var r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(t),o=r[0],a=r[1];return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){for(var t,r=!0,i=o,u=function(n){r&&(i=n,a(n))},s=function(n,t,e,r){var o,i=!1,a=0;function u(){o&&clearTimeout(o)}function s(){for(var s=arguments.length,c=new Array(s),l=0;l<s;l++)c[l]=arguments[l];var f=this,p=Date.now()-a;function d(){a=Date.now(),e.apply(f,c)}function h(){o=void 0}i||(r&&!o&&d(),u(),void 0===r&&p>n?d():!0!==t&&(o=setTimeout(r?h:d,void 0===r?n-p:n)))}return"boolean"!=typeof t&&(r=e,e=t,t=void 0),s.cancel=function(){u(),i=!0},s}(50,(function(){i&&u(!1),clearTimeout(t),t=setTimeout((function(){return u(!0)}),n)})),c=function(){document.hidden||s()},l=0;l<e.length;l++)Hp(window,e[l],s);return Hp(document,"visibilitychange",c),t=setTimeout((function(){return u(!0)}),n),function(){r=!1;for(var n=0;n<e.length;n++)Up(window,e[n],s);Up(document,"visibilitychange",c)}}),[n,e]),o};var qp=!1;if("undefined"!=typeof window){var Gp={get passive(){qp=!0}};window.addEventListener("testPassive",null,Gp),window.removeEventListener("testPassive",null,Gp)}var Kp="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),Zp=[],Jp=!1,Qp=-1,nd=void 0,td=void 0,ed=function(n){return Zp.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(n))}))},rd=function(n){var t=n||window.event;return!!ed(t.target)||(t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1))},od=function(n,t){if(n){if(!Zp.some((function(t){return t.targetElement===n}))){var e={targetElement:n,options:t||{}};Zp=[].concat(function(n){if(Array.isArray(n)){for(var t=0,e=Array(n.length);t<n.length;t++)e[t]=n[t];return e}return Array.from(n)}(Zp),[e]),Kp?(n.ontouchstart=function(n){1===n.targetTouches.length&&(Qp=n.targetTouches[0].clientY)},n.ontouchmove=function(t){1===t.targetTouches.length&&function(n,t){var e=n.targetTouches[0].clientY-Qp;!ed(n.target)&&(t&&0===t.scrollTop&&e>0||function(n){return!!n&&n.scrollHeight-n.scrollTop<=n.clientHeight}(t)&&e<0?rd(n):n.stopPropagation())}(t,n)},Jp||(document.addEventListener("touchmove",rd,qp?{passive:!1}:void 0),Jp=!0)):function(n){if(void 0===td){var t=!!n&&!0===n.reserveScrollBarGap,e=window.innerWidth-document.documentElement.clientWidth;t&&e>0&&(td=document.body.style.paddingRight,document.body.style.paddingRight=e+"px")}void 0===nd&&(nd=document.body.style.overflow,document.body.style.overflow="hidden")}(t)}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},id=function(){Kp?(Zp.forEach((function(n){n.targetElement.ontouchstart=null,n.targetElement.ontouchmove=null})),Jp&&(document.removeEventListener("touchmove",rd,qp?{passive:!1}:void 0),Jp=!1),Qp=-1):(void 0!==td&&(document.body.style.paddingRight=td,td=void 0),void 0!==nd&&(document.body.style.overflow=nd,nd=void 0)),Zp=[]},ad=function(n){var e=n.options,a=n.callbacks,u=n.selectedElement,s=n.elements,c=n.dispatch,l=n.compensateForScrollbar,p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(En),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),v=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),m=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),g=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),y=e.buttons,b=e.settings,w=e.progressBar,x=e.thumbnails,S=a.onCountSlides,_=a.onSlideChange,E=a.onLightboxClosed,T=a.onLightboxOpened,P=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){if("function"==typeof _)return p.callbacks.onSlideChange(n);console.error('Simple React Lightbox error: you are not passing a function in your "onSlideChange" callback! You are passing a '.concat(el(_),"."))}),[p.callbacks,_]),C=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){"function"==typeof T?p.callbacks.onLightboxOpened(n):console.error('Simple React Lightbox error: you are not passing a function in your "onLightboxOpened" callback! You are passing a '.concat(el(T),"."))}),[p.callbacks,T]),A=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){"function"==typeof E?p.callbacks.onLightboxClosed(n):console.error('Simple React Lightbox error: you are not passing a function in your "onLightboxClosed" callback! You are passing a '.concat(el(E),"."))}),[p.callbacks,E]),L=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){"function"==typeof S?p.callbacks.onCountSlides(n):console.error('Simple React Lightbox error: you are not passing a function in your "onCountSlides" callback! You are passing a '.concat(el(S),"."))}),[p.callbacks,S]),O=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),k=O[0],R=O[1],N=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),z=N[0],I=N[1],D=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),2),j=D[0],M=D[1],B=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),V=B[0],F=B[1],W=Xp(b.hideControlsAfter<1e3?9999999:b.hideControlsAfter),Y=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){return Rn.exports.findIndex(s,(function(t){return t.id===n}))}),[s]),H=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n,t,e){M(e?"next"===e?"next":"previous"===e?"previous":void 0:n>t?"next":n<t?"previous":void 0)}),[]),U=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){F(!V)}),[V]),$=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){b.disablePanzoom||I(n)}),[b.disablePanzoom]),X=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n,t,e,r){$(!1),H(n,t,r),c({type:"HANDLE_ELEMENT",element:e})}),[H,$,c]);var q=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n,t){var e=Y(n),r=s[e];X(n,t,r),P({action:"selected",slides:{previous:s[e-1],current:r,next:s[e+1]},index:e})}),[s,Y,P,X]),G=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){var t=Y(n),e=s[t-1]||s[s.length-1];X(n,null,e,"previous");var r=t-1==-1?s.length-1:t-1;P({action:"left",slides:{previous:s[r-1],current:e,next:s[r+1]},index:r})}),[s,Y,P,X]),K=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(n){var t=Y(n),e=s[t+1]||s[0];X(n,null,e,"next");var r=t+1===s.length?0:t+1;P({action:"right",slides:{previous:s[r-1],current:e,next:s[r+1]},index:r})}),[s,Y,P,X]),Z=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){c({type:"CLOSE_LIGHTBOX"}),A({opened:!1,currentSlide:p.selectedElement})}),[c,A,p.selectedElement]);kl((function(){return K(u.id)}),k?b.autoplaySpeed:null,u.id);var J=wl((function(n){"ArrowRight"!==n&&"ArrowUp"!==n||K(u.id),"ArrowLeft"!==n&&"ArrowDown"!==n||G(u.id),"Escape"===n&&Z()}),300);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return C({opened:!0,currentSlide:p.selectedElement}),L({totalSlide:p.elements.length}),"undefined"!=typeof window&&(document.body.classList.add("SRLOpened"),document.body.style.marginRight=l+"px",od(document.getElementsByClassName(".SRLOpened"),{allowTouchMove:function(n){return n.className.includes("SRLThumbnailsContainer")||n.className.includes("SRLThumb")}})),function(){document.body.classList.remove("SRLOpened"),document.body.style.marginRight="0",id()}}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return 0===b.hideControlsAfter&&b.hideControlsAfter||(W?null!==m.current&&void 0!==m.current&&m.current.classList.add("SRLIdle"):null!==m.current&&void 0!==m.current&&m.current.classList.contains("SRLIdle")&&m.current.classList.remove("SRLIdle")),void 0===u.id&&c({type:"HANDLE_ELEMENT",element:{source:s[0].source,caption:s[0].caption,id:s[0].id,width:s[0].width,height:s[0].height,type:s[0].type,showControls:s[0].showControls,videoAutoplay:s[0].videoAutoplay,muted:s[0].muted}}),b.disableKeyboardControls||(g.current=Ll(document,"keydown",(function(n){return J(n.key)}),!1)),function(){b.disableKeyboardControls||g.current()}}),[u.id,s,b.disablePanzoom,b.disableKeyboardControls,z,b.hideControlsAfter,W,J,j,p,c,u]);var Q={autoplay:k,buttons:y,currentElementID:u.id,direction:j,handleCloseLightbox:Z,handleCurrentElement:q,handleFullScreen:function(){var n="";if("undefined"!=typeof window&&(n=document.querySelector("#SRLLightbox")),document.fullscreenElement)document.exitFullscreen();else if(R(!1),null!==n)try{-1!==navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome")?n.webkitRequestFullScreen():n.requestFullscreen()}catch(n){!function(n){console.error(n),console.warn("Sorry, your browser doesn't support this functionality!")}(n.message="SRL - ERROR WHEN USING FULLSCREEN API")}},handleImageDownload:function(){var n;(n=u.source,fetch(n).then((function(n){return n.blob()})).then((function(n){return new Promise((function(t,e){var r=new FileReader;r.onloadend=function(){return t(r.result)},r.onerror=e,r.readAsDataURL(n)}))}))).then((function(n){var t=document.createElement("a");t.href=n,t.download="".concat(p.options.settings.downloadedFileName,"-").concat(u.id),t.click()}))},handleNextElement:K,handlePanzoom:$,handlePrevElement:G,handleThumbnails:U,hideThumbnails:V,panzoomEnabled:z,setAutoplay:R,settings:b,SRLThumbnailsRef:h,SRLCaptionRef:v},nn={buttonsBackgroundColor:y.backgroundColor,buttonsIconColor:y.iconColor,buttonsSize:y.size,buttonsIconPadding:y.iconPadding,buttonsOffsetFromProgressBar:w.height,showProgressBar:w.showProgressBar,translations:p.options.translations,icons:p.options.icons};return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{ref:m,className:"SRLStage"},w.showProgressBar&&k&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Yp,{autoplay:k,autoplaySpeed:b.autoplaySpeed,progressBar:w,currentElementID:u.id}),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Vp,Dn({},nn,Q,{thumbnailsPosition:x.thumbnailsPosition,thumbnailsSize:x.thumbnailsSize,thumbnailsContainerPadding:x.thumbnailsContainerPadding,showThumbnails:x.showThumbnails,SRLThumbnailsRef:h})),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Cp,Dn({},u,Q,{elements:s,options:e})))};function ud(){var n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(En),e=n.isOpened,a=n.options.settings.usingPreact,u=bn((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),2),s=u[0],c=u[1],l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){function n(){"undefined"!=typeof window&&(l.current=.01*window.innerHeight,document.documentElement.style.setProperty("--vh","".concat(l.current,"px")))}return n(),window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)}}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){"undefined"!=typeof window&&document.body.scrollHeight>window.innerHeight&&c(window.innerWidth-document.documentElement.clientWidth)})),a?react__WEBPACK_IMPORTED_MODULE_0___default().createElement(tl,{selector:"SRLLightbox",isOpened:e},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ad,Dn({},n,{compensateForScrollbar:s}))):react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Jc,null,e&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(tl,{selector:"SRLLightbox",isOpened:e},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ad,Dn({},n,{compensateForScrollbar:s}))))}ad.propTypes={callbacks:mn.object,compensateForScrollbar:mn.number,elements:mn.array,isOpened:mn.bool,dispatch:mn.func,selectedElement:mn.object,options:mn.shape({thumbnails:mn.shape({thumbnailsContainerPadding:mn.string,thumbnailsPosition:mn.string,thumbnailsSize:mn.array,showThumbnails:mn.bool}),settings:mn.shape({overlayColor:mn.string,autoplaySpeed:mn.number,disableKeyboardControls:mn.bool,disablePanzoom:mn.bool,hideControlsAfter:mn.oneOfType([mn.number,mn.bool])}),buttons:mn.shape({backgroundColor:mn.string,iconColor:mn.string,iconPadding:mn.string,size:mn.string}),progressBar:mn.shape({showProgressBar:mn.bool,background:mn.string,height:mn.string})})},ud.propTypes={context:mn.object};var sd=function(n){var e=n.children;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Tn,null,e,react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ud,null))};sd.propTypes={children:mn.oneOfType([mn.arrayOf(mn.node),mn.node]).isRequired};


/***/ }),

/***/ "./src/assets/peakIcon.svg":
/*!*********************************!*\
  !*** ./src/assets/peakIcon.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function PeakIcon (props) {
    return React.createElement("svg",props,React.createElement("g",{"id":"2020_light","stroke":"none","strokeWidth":"1","fill":"none","fillRule":"evenodd"},React.createElement("g",{"id":"starred-box","transform":"translate(-9.000000, -8.000000)"},React.createElement("g",{"id":"Group","transform":"translate(10.000000, 8.002236)"},[React.createElement("polygon",{"id":"Triangle","fillOpacity":"0.204982517","fill":"#457A64","points":"6.99281329 9.9475983e-14 8.97991779 6.99598934 6.99281329 5.6505037 4.807928 8.47337636 2.9713999 6.99598934 1.3753014 7.94981965 2.9713999 3.50204139 4.807928 5.22022724","key":0}),React.createElement("polygon",{"id":"Triangle","stroke":"#457A64","strokeLinejoin":"round","points":"6.99281329 -6.66133815e-14 10.1538462 10.9981076 0 10.9981076 2.9713999 3.50204139 4.807928 5.22022724","key":1})]))));
}

PeakIcon.defaultProps = {"width":"12px","height":"12px","viewBox":"0 0 12 12","version":"1.1"};

module.exports = PeakIcon;

PeakIcon.default = PeakIcon;


/***/ }),

/***/ "./node_modules/tr46/index.js":
/*!************************************!*\
  !*** ./node_modules/tr46/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var punycode = __webpack_require__(/*! punycode */ "punycode");
var mappingTable = __webpack_require__(/*! ./lib/mappingTable.json */ "./node_modules/tr46/lib/mappingTable.json");

var PROCESSING_OPTIONS = {
  TRANSITIONAL: 0,
  NONTRANSITIONAL: 1
};

function normalize(str) { // fix bug in v8
  return str.split('\u0000').map(function (s) { return s.normalize('NFC'); }).join('\u0000');
}

function findStatus(val) {
  var start = 0;
  var end = mappingTable.length - 1;

  while (start <= end) {
    var mid = Math.floor((start + end) / 2);

    var target = mappingTable[mid];
    if (target[0][0] <= val && target[0][1] >= val) {
      return target;
    } else if (target[0][0] > val) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return null;
}

var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function countSymbols(string) {
  return string
    // replace every surrogate pair with a BMP symbol
    .replace(regexAstralSymbols, '_')
    // then get the length
    .length;
}

function mapChars(domain_name, useSTD3, processing_option) {
  var hasError = false;
  var processed = "";

  var len = countSymbols(domain_name);
  for (var i = 0; i < len; ++i) {
    var codePoint = domain_name.codePointAt(i);
    var status = findStatus(codePoint);

    switch (status[1]) {
      case "disallowed":
        hasError = true;
        processed += String.fromCodePoint(codePoint);
        break;
      case "ignored":
        break;
      case "mapped":
        processed += String.fromCodePoint.apply(String, status[2]);
        break;
      case "deviation":
        if (processing_option === PROCESSING_OPTIONS.TRANSITIONAL) {
          processed += String.fromCodePoint.apply(String, status[2]);
        } else {
          processed += String.fromCodePoint(codePoint);
        }
        break;
      case "valid":
        processed += String.fromCodePoint(codePoint);
        break;
      case "disallowed_STD3_mapped":
        if (useSTD3) {
          hasError = true;
          processed += String.fromCodePoint(codePoint);
        } else {
          processed += String.fromCodePoint.apply(String, status[2]);
        }
        break;
      case "disallowed_STD3_valid":
        if (useSTD3) {
          hasError = true;
        }

        processed += String.fromCodePoint(codePoint);
        break;
    }
  }

  return {
    string: processed,
    error: hasError
  };
}

var combiningMarksRegex = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDE2C-\uDE37\uDEDF-\uDEEA\uDF01-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDE30-\uDE40\uDEAB-\uDEB7]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]/;

function validateLabel(label, processing_option) {
  if (label.substr(0, 4) === "xn--") {
    label = punycode.toUnicode(label);
    processing_option = PROCESSING_OPTIONS.NONTRANSITIONAL;
  }

  var error = false;

  if (normalize(label) !== label ||
      (label[3] === "-" && label[4] === "-") ||
      label[0] === "-" || label[label.length - 1] === "-" ||
      label.indexOf(".") !== -1 ||
      label.search(combiningMarksRegex) === 0) {
    error = true;
  }

  var len = countSymbols(label);
  for (var i = 0; i < len; ++i) {
    var status = findStatus(label.codePointAt(i));
    if ((processing === PROCESSING_OPTIONS.TRANSITIONAL && status[1] !== "valid") ||
        (processing === PROCESSING_OPTIONS.NONTRANSITIONAL &&
         status[1] !== "valid" && status[1] !== "deviation")) {
      error = true;
      break;
    }
  }

  return {
    label: label,
    error: error
  };
}

function processing(domain_name, useSTD3, processing_option) {
  var result = mapChars(domain_name, useSTD3, processing_option);
  result.string = normalize(result.string);

  var labels = result.string.split(".");
  for (var i = 0; i < labels.length; ++i) {
    try {
      var validation = validateLabel(labels[i]);
      labels[i] = validation.label;
      result.error = result.error || validation.error;
    } catch(e) {
      result.error = true;
    }
  }

  return {
    string: labels.join("."),
    error: result.error
  };
}

module.exports.toASCII = function(domain_name, useSTD3, processing_option, verifyDnsLength) {
  var result = processing(domain_name, useSTD3, processing_option);
  var labels = result.string.split(".");
  labels = labels.map(function(l) {
    try {
      return punycode.toASCII(l);
    } catch(e) {
      result.error = true;
      return l;
    }
  });

  if (verifyDnsLength) {
    var total = labels.slice(0, labels.length - 1).join(".").length;
    if (total.length > 253 || total.length === 0) {
      result.error = true;
    }

    for (var i=0; i < labels.length; ++i) {
      if (labels.length > 63 || labels.length === 0) {
        result.error = true;
        break;
      }
    }
  }

  if (result.error) return null;
  return labels.join(".");
};

module.exports.toUnicode = function(domain_name, useSTD3) {
  var result = processing(domain_name, useSTD3, PROCESSING_OPTIONS.NONTRANSITIONAL);

  return {
    domain: result.string,
    error: result.error
  };
};

module.exports.PROCESSING_OPTIONS = PROCESSING_OPTIONS;


/***/ }),

/***/ "./node_modules/webidl-conversions/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webidl-conversions/lib/index.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


var conversions = {};
module.exports = conversions;

function sign(x) {
    return x < 0 ? -1 : 1;
}

function evenRound(x) {
    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.
    if ((x % 1) === 0.5 && (x & 1) === 0) { // [even number].5; round down (i.e. floor)
        return Math.floor(x);
    } else {
        return Math.round(x);
    }
}

function createNumberConversion(bitLength, typeOpts) {
    if (!typeOpts.unsigned) {
        --bitLength;
    }
    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);
    const upperBound = Math.pow(2, bitLength) - 1;

    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);
    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);

    return function(V, opts) {
        if (!opts) opts = {};

        let x = +V;

        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw new TypeError("Argument is not a finite number");
            }

            x = sign(x) * Math.floor(Math.abs(x));
            if (x < lowerBound || x > upperBound) {
                throw new TypeError("Argument is not in byte range");
            }

            return x;
        }

        if (!isNaN(x) && opts.clamp) {
            x = evenRound(x);

            if (x < lowerBound) x = lowerBound;
            if (x > upperBound) x = upperBound;
            return x;
        }

        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }

        x = sign(x) * Math.floor(Math.abs(x));
        x = x % moduloVal;

        if (!typeOpts.unsigned && x >= moduloBound) {
            return x - moduloVal;
        } else if (typeOpts.unsigned) {
            if (x < 0) {
              x += moduloVal;
            } else if (x === -0) { // don't return negative zero
              return 0;
            }
        }

        return x;
    }
}

conversions["void"] = function () {
    return undefined;
};

conversions["boolean"] = function (val) {
    return !!val;
};

conversions["byte"] = createNumberConversion(8, { unsigned: false });
conversions["octet"] = createNumberConversion(8, { unsigned: true });

conversions["short"] = createNumberConversion(16, { unsigned: false });
conversions["unsigned short"] = createNumberConversion(16, { unsigned: true });

conversions["long"] = createNumberConversion(32, { unsigned: false });
conversions["unsigned long"] = createNumberConversion(32, { unsigned: true });

conversions["long long"] = createNumberConversion(32, { unsigned: false, moduloBitLength: 64 });
conversions["unsigned long long"] = createNumberConversion(32, { unsigned: true, moduloBitLength: 64 });

conversions["double"] = function (V) {
    const x = +V;

    if (!Number.isFinite(x)) {
        throw new TypeError("Argument is not a finite floating-point value");
    }

    return x;
};

conversions["unrestricted double"] = function (V) {
    const x = +V;

    if (isNaN(x)) {
        throw new TypeError("Argument is NaN");
    }

    return x;
};

// not quite valid, but good enough for JS
conversions["float"] = conversions["double"];
conversions["unrestricted float"] = conversions["unrestricted double"];

conversions["DOMString"] = function (V, opts) {
    if (!opts) opts = {};

    if (opts.treatNullAsEmptyString && V === null) {
        return "";
    }

    return String(V);
};

conversions["ByteString"] = function (V, opts) {
    const x = String(V);
    let c = undefined;
    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
        if (c > 255) {
            throw new TypeError("Argument is not a valid bytestring");
        }
    }

    return x;
};

conversions["USVString"] = function (V) {
    const S = String(V);
    const n = S.length;
    const U = [];
    for (let i = 0; i < n; ++i) {
        const c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            if (i === n - 1) {
                U.push(String.fromCodePoint(0xFFFD));
            } else {
                const d = S.charCodeAt(i + 1);
                if (0xDC00 <= d && d <= 0xDFFF) {
                    const a = c & 0x3FF;
                    const b = d & 0x3FF;
                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));
                    ++i;
                } else {
                    U.push(String.fromCodePoint(0xFFFD));
                }
            }
        }
    }

    return U.join('');
};

conversions["Date"] = function (V, opts) {
    if (!(V instanceof Date)) {
        throw new TypeError("Argument is not a Date object");
    }
    if (isNaN(V)) {
        return undefined;
    }

    return V;
};

conversions["RegExp"] = function (V, opts) {
    if (!(V instanceof RegExp)) {
        V = new RegExp(V);
    }

    return V;
};


/***/ }),

/***/ "./node_modules/whatwg-url/lib/URL-impl.js":
/*!*************************************************!*\
  !*** ./node_modules/whatwg-url/lib/URL-impl.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const usm = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js");

exports.implementation = class URLImpl {
  constructor(constructorArgs) {
    const url = constructorArgs[0];
    const base = constructorArgs[1];

    let parsedBase = null;
    if (base !== undefined) {
      parsedBase = usm.basicURLParse(base);
      if (parsedBase === "failure") {
        throw new TypeError("Invalid base URL");
      }
    }

    const parsedURL = usm.basicURLParse(url, { baseURL: parsedBase });
    if (parsedURL === "failure") {
      throw new TypeError("Invalid URL");
    }

    this._url = parsedURL;

    // TODO: query stuff
  }

  get href() {
    return usm.serializeURL(this._url);
  }

  set href(v) {
    const parsedURL = usm.basicURLParse(v);
    if (parsedURL === "failure") {
      throw new TypeError("Invalid URL");
    }

    this._url = parsedURL;
  }

  get origin() {
    return usm.serializeURLOrigin(this._url);
  }

  get protocol() {
    return this._url.scheme + ":";
  }

  set protocol(v) {
    usm.basicURLParse(v + ":", { url: this._url, stateOverride: "scheme start" });
  }

  get username() {
    return this._url.username;
  }

  set username(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setTheUsername(this._url, v);
  }

  get password() {
    return this._url.password;
  }

  set password(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setThePassword(this._url, v);
  }

  get host() {
    const url = this._url;

    if (url.host === null) {
      return "";
    }

    if (url.port === null) {
      return usm.serializeHost(url.host);
    }

    return usm.serializeHost(url.host) + ":" + usm.serializeInteger(url.port);
  }

  set host(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "host" });
  }

  get hostname() {
    if (this._url.host === null) {
      return "";
    }

    return usm.serializeHost(this._url.host);
  }

  set hostname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "hostname" });
  }

  get port() {
    if (this._url.port === null) {
      return "";
    }

    return usm.serializeInteger(this._url.port);
  }

  set port(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    if (v === "") {
      this._url.port = null;
    } else {
      usm.basicURLParse(v, { url: this._url, stateOverride: "port" });
    }
  }

  get pathname() {
    if (this._url.cannotBeABaseURL) {
      return this._url.path[0];
    }

    if (this._url.path.length === 0) {
      return "";
    }

    return "/" + this._url.path.join("/");
  }

  set pathname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    this._url.path = [];
    usm.basicURLParse(v, { url: this._url, stateOverride: "path start" });
  }

  get search() {
    if (this._url.query === null || this._url.query === "") {
      return "";
    }

    return "?" + this._url.query;
  }

  set search(v) {
    // TODO: query stuff

    const url = this._url;

    if (v === "") {
      url.query = null;
      return;
    }

    const input = v[0] === "?" ? v.substring(1) : v;
    url.query = "";
    usm.basicURLParse(input, { url, stateOverride: "query" });
  }

  get hash() {
    if (this._url.fragment === null || this._url.fragment === "") {
      return "";
    }

    return "#" + this._url.fragment;
  }

  set hash(v) {
    if (v === "") {
      this._url.fragment = null;
      return;
    }

    const input = v[0] === "#" ? v.substring(1) : v;
    this._url.fragment = "";
    usm.basicURLParse(input, { url: this._url, stateOverride: "fragment" });
  }

  toJSON() {
    return this.href;
  }
};


/***/ }),

/***/ "./node_modules/whatwg-url/lib/URL.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-url/lib/URL.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(/*! webidl-conversions */ "./node_modules/webidl-conversions/lib/index.js");
const utils = __webpack_require__(/*! ./utils.js */ "./node_modules/whatwg-url/lib/utils.js");
const Impl = __webpack_require__(/*! .//URL-impl.js */ "./node_modules/whatwg-url/lib/URL-impl.js");

const impl = utils.implSymbol;

function URL(url) {
  if (!this || this[impl] || !(this instanceof URL)) {
    throw new TypeError("Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'URL': 1 argument required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }
  args[0] = conversions["USVString"](args[0]);
  if (args[1] !== undefined) {
  args[1] = conversions["USVString"](args[1]);
  }

  module.exports.setup(this, args);
}

URL.prototype.toJSON = function toJSON() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 0; ++i) {
    args[i] = arguments[i];
  }
  return this[impl].toJSON.apply(this[impl], args);
};
Object.defineProperty(URL.prototype, "href", {
  get() {
    return this[impl].href;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].href = V;
  },
  enumerable: true,
  configurable: true
});

URL.prototype.toString = function () {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this.href;
};

Object.defineProperty(URL.prototype, "origin", {
  get() {
    return this[impl].origin;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "protocol", {
  get() {
    return this[impl].protocol;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].protocol = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "username", {
  get() {
    return this[impl].username;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].username = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "password", {
  get() {
    return this[impl].password;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].password = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "host", {
  get() {
    return this[impl].host;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].host = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hostname", {
  get() {
    return this[impl].hostname;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hostname = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "port", {
  get() {
    return this[impl].port;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].port = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "pathname", {
  get() {
    return this[impl].pathname;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].pathname = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "search", {
  get() {
    return this[impl].search;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].search = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hash", {
  get() {
    return this[impl].hash;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hash = V;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(URL.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: URL,
  expose: {
    Window: { URL: URL },
    Worker: { URL: URL }
  }
};



/***/ }),

/***/ "./node_modules/whatwg-url/lib/public-api.js":
/*!***************************************************!*\
  !*** ./node_modules/whatwg-url/lib/public-api.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.URL = __webpack_require__(/*! ./URL */ "./node_modules/whatwg-url/lib/URL.js")["interface"];
exports.serializeURL = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").serializeURL;
exports.serializeURLOrigin = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").serializeURLOrigin;
exports.basicURLParse = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").basicURLParse;
exports.setTheUsername = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").setTheUsername;
exports.setThePassword = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").setThePassword;
exports.serializeHost = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").serializeHost;
exports.serializeInteger = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").serializeInteger;
exports.parseURL = __webpack_require__(/*! ./url-state-machine */ "./node_modules/whatwg-url/lib/url-state-machine.js").parseURL;


/***/ }),

/***/ "./node_modules/whatwg-url/lib/url-state-machine.js":
/*!**********************************************************!*\
  !*** ./node_modules/whatwg-url/lib/url-state-machine.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const punycode = __webpack_require__(/*! punycode */ "punycode");
const tr46 = __webpack_require__(/*! tr46 */ "./node_modules/tr46/index.js");

const specialSchemes = {
  ftp: 21,
  file: null,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

const failure = Symbol("failure");

function countSymbols(str) {
  return punycode.ucs2.decode(str).length;
}

function at(input, idx) {
  const c = input[idx];
  return isNaN(c) ? undefined : String.fromCodePoint(c);
}

function isASCIIDigit(c) {
  return c >= 0x30 && c <= 0x39;
}

function isASCIIAlpha(c) {
  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
}

function isASCIIAlphanumeric(c) {
  return isASCIIAlpha(c) || isASCIIDigit(c);
}

function isASCIIHex(c) {
  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
}

function isSingleDot(buffer) {
  return buffer === "." || buffer.toLowerCase() === "%2e";
}

function isDoubleDot(buffer) {
  buffer = buffer.toLowerCase();
  return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}

function isWindowsDriveLetterCodePoints(cp1, cp2) {
  return isASCIIAlpha(cp1) && (cp2 === 58 || cp2 === 124);
}

function isWindowsDriveLetterString(string) {
  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}

function isNormalizedWindowsDriveLetterString(string) {
  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}

function containsForbiddenHostCodePoint(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/) !== -1;
}

function containsForbiddenHostCodePointExcludingPercent(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/) !== -1;
}

function isSpecialScheme(scheme) {
  return specialSchemes[scheme] !== undefined;
}

function isSpecial(url) {
  return isSpecialScheme(url.scheme);
}

function defaultPort(scheme) {
  return specialSchemes[scheme];
}

function percentEncode(c) {
  let hex = c.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = "0" + hex;
  }

  return "%" + hex;
}

function utf8PercentEncode(c) {
  const buf = new Buffer(c);

  let str = "";

  for (let i = 0; i < buf.length; ++i) {
    str += percentEncode(buf[i]);
  }

  return str;
}

function utf8PercentDecode(str) {
  const input = new Buffer(str);
  const output = [];
  for (let i = 0; i < input.length; ++i) {
    if (input[i] !== 37) {
      output.push(input[i]);
    } else if (input[i] === 37 && isASCIIHex(input[i + 1]) && isASCIIHex(input[i + 2])) {
      output.push(parseInt(input.slice(i + 1, i + 3).toString(), 16));
      i += 2;
    } else {
      output.push(input[i]);
    }
  }
  return new Buffer(output).toString();
}

function isC0ControlPercentEncode(c) {
  return c <= 0x1F || c > 0x7E;
}

const extraPathPercentEncodeSet = new Set([32, 34, 35, 60, 62, 63, 96, 123, 125]);
function isPathPercentEncode(c) {
  return isC0ControlPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}

const extraUserinfoPercentEncodeSet =
  new Set([47, 58, 59, 61, 64, 91, 92, 93, 94, 124]);
function isUserinfoPercentEncode(c) {
  return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}

function percentEncodeChar(c, encodeSetPredicate) {
  const cStr = String.fromCodePoint(c);

  if (encodeSetPredicate(c)) {
    return utf8PercentEncode(cStr);
  }

  return cStr;
}

function parseIPv4Number(input) {
  let R = 10;

  if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
    input = input.substring(2);
    R = 16;
  } else if (input.length >= 2 && input.charAt(0) === "0") {
    input = input.substring(1);
    R = 8;
  }

  if (input === "") {
    return 0;
  }

  const regex = R === 10 ? /[^0-9]/ : (R === 16 ? /[^0-9A-Fa-f]/ : /[^0-7]/);
  if (regex.test(input)) {
    return failure;
  }

  return parseInt(input, R);
}

function parseIPv4(input) {
  const parts = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length > 1) {
      parts.pop();
    }
  }

  if (parts.length > 4) {
    return input;
  }

  const numbers = [];
  for (const part of parts) {
    if (part === "") {
      return input;
    }
    const n = parseIPv4Number(part);
    if (n === failure) {
      return input;
    }

    numbers.push(n);
  }

  for (let i = 0; i < numbers.length - 1; ++i) {
    if (numbers[i] > 255) {
      return failure;
    }
  }
  if (numbers[numbers.length - 1] >= Math.pow(256, 5 - numbers.length)) {
    return failure;
  }

  let ipv4 = numbers.pop();
  let counter = 0;

  for (const n of numbers) {
    ipv4 += n * Math.pow(256, 3 - counter);
    ++counter;
  }

  return ipv4;
}

function serializeIPv4(address) {
  let output = "";
  let n = address;

  for (let i = 1; i <= 4; ++i) {
    output = String(n % 256) + output;
    if (i !== 4) {
      output = "." + output;
    }
    n = Math.floor(n / 256);
  }

  return output;
}

function parseIPv6(input) {
  const address = [0, 0, 0, 0, 0, 0, 0, 0];
  let pieceIndex = 0;
  let compress = null;
  let pointer = 0;

  input = punycode.ucs2.decode(input);

  if (input[pointer] === 58) {
    if (input[pointer + 1] !== 58) {
      return failure;
    }

    pointer += 2;
    ++pieceIndex;
    compress = pieceIndex;
  }

  while (pointer < input.length) {
    if (pieceIndex === 8) {
      return failure;
    }

    if (input[pointer] === 58) {
      if (compress !== null) {
        return failure;
      }
      ++pointer;
      ++pieceIndex;
      compress = pieceIndex;
      continue;
    }

    let value = 0;
    let length = 0;

    while (length < 4 && isASCIIHex(input[pointer])) {
      value = value * 0x10 + parseInt(at(input, pointer), 16);
      ++pointer;
      ++length;
    }

    if (input[pointer] === 46) {
      if (length === 0) {
        return failure;
      }

      pointer -= length;

      if (pieceIndex > 6) {
        return failure;
      }

      let numbersSeen = 0;

      while (input[pointer] !== undefined) {
        let ipv4Piece = null;

        if (numbersSeen > 0) {
          if (input[pointer] === 46 && numbersSeen < 4) {
            ++pointer;
          } else {
            return failure;
          }
        }

        if (!isASCIIDigit(input[pointer])) {
          return failure;
        }

        while (isASCIIDigit(input[pointer])) {
          const number = parseInt(at(input, pointer));
          if (ipv4Piece === null) {
            ipv4Piece = number;
          } else if (ipv4Piece === 0) {
            return failure;
          } else {
            ipv4Piece = ipv4Piece * 10 + number;
          }
          if (ipv4Piece > 255) {
            return failure;
          }
          ++pointer;
        }

        address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;

        ++numbersSeen;

        if (numbersSeen === 2 || numbersSeen === 4) {
          ++pieceIndex;
        }
      }

      if (numbersSeen !== 4) {
        return failure;
      }

      break;
    } else if (input[pointer] === 58) {
      ++pointer;
      if (input[pointer] === undefined) {
        return failure;
      }
    } else if (input[pointer] !== undefined) {
      return failure;
    }

    address[pieceIndex] = value;
    ++pieceIndex;
  }

  if (compress !== null) {
    let swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      const temp = address[compress + swaps - 1];
      address[compress + swaps - 1] = address[pieceIndex];
      address[pieceIndex] = temp;
      --pieceIndex;
      --swaps;
    }
  } else if (compress === null && pieceIndex !== 8) {
    return failure;
  }

  return address;
}

function serializeIPv6(address) {
  let output = "";
  const seqResult = findLongestZeroSequence(address);
  const compress = seqResult.idx;
  let ignore0 = false;

  for (let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex) {
    if (ignore0 && address[pieceIndex] === 0) {
      continue;
    } else if (ignore0) {
      ignore0 = false;
    }

    if (compress === pieceIndex) {
      const separator = pieceIndex === 0 ? "::" : ":";
      output += separator;
      ignore0 = true;
      continue;
    }

    output += address[pieceIndex].toString(16);

    if (pieceIndex !== 7) {
      output += ":";
    }
  }

  return output;
}

function parseHost(input, isSpecialArg) {
  if (input[0] === "[") {
    if (input[input.length - 1] !== "]") {
      return failure;
    }

    return parseIPv6(input.substring(1, input.length - 1));
  }

  if (!isSpecialArg) {
    return parseOpaqueHost(input);
  }

  const domain = utf8PercentDecode(input);
  const asciiDomain = tr46.toASCII(domain, false, tr46.PROCESSING_OPTIONS.NONTRANSITIONAL, false);
  if (asciiDomain === null) {
    return failure;
  }

  if (containsForbiddenHostCodePoint(asciiDomain)) {
    return failure;
  }

  const ipv4Host = parseIPv4(asciiDomain);
  if (typeof ipv4Host === "number" || ipv4Host === failure) {
    return ipv4Host;
  }

  return asciiDomain;
}

function parseOpaqueHost(input) {
  if (containsForbiddenHostCodePointExcludingPercent(input)) {
    return failure;
  }

  let output = "";
  const decoded = punycode.ucs2.decode(input);
  for (let i = 0; i < decoded.length; ++i) {
    output += percentEncodeChar(decoded[i], isC0ControlPercentEncode);
  }
  return output;
}

function findLongestZeroSequence(arr) {
  let maxIdx = null;
  let maxLen = 1; // only find elements > 1
  let currStart = null;
  let currLen = 0;

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] !== 0) {
      if (currLen > maxLen) {
        maxIdx = currStart;
        maxLen = currLen;
      }

      currStart = null;
      currLen = 0;
    } else {
      if (currStart === null) {
        currStart = i;
      }
      ++currLen;
    }
  }

  // if trailing zeros
  if (currLen > maxLen) {
    maxIdx = currStart;
    maxLen = currLen;
  }

  return {
    idx: maxIdx,
    len: maxLen
  };
}

function serializeHost(host) {
  if (typeof host === "number") {
    return serializeIPv4(host);
  }

  // IPv6 serializer
  if (host instanceof Array) {
    return "[" + serializeIPv6(host) + "]";
  }

  return host;
}

function trimControlChars(url) {
  return url.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "");
}

function trimTabAndNewline(url) {
  return url.replace(/\u0009|\u000A|\u000D/g, "");
}

function shortenPath(url) {
  const path = url.path;
  if (path.length === 0) {
    return;
  }
  if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
    return;
  }

  path.pop();
}

function includesCredentials(url) {
  return url.username !== "" || url.password !== "";
}

function cannotHaveAUsernamePasswordPort(url) {
  return url.host === null || url.host === "" || url.cannotBeABaseURL || url.scheme === "file";
}

function isNormalizedWindowsDriveLetter(string) {
  return /^[A-Za-z]:$/.test(string);
}

function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
  this.pointer = 0;
  this.input = input;
  this.base = base || null;
  this.encodingOverride = encodingOverride || "utf-8";
  this.stateOverride = stateOverride;
  this.url = url;
  this.failure = false;
  this.parseError = false;

  if (!this.url) {
    this.url = {
      scheme: "",
      username: "",
      password: "",
      host: null,
      port: null,
      path: [],
      query: null,
      fragment: null,

      cannotBeABaseURL: false
    };

    const res = trimControlChars(this.input);
    if (res !== this.input) {
      this.parseError = true;
    }
    this.input = res;
  }

  const res = trimTabAndNewline(this.input);
  if (res !== this.input) {
    this.parseError = true;
  }
  this.input = res;

  this.state = stateOverride || "scheme start";

  this.buffer = "";
  this.atFlag = false;
  this.arrFlag = false;
  this.passwordTokenSeenFlag = false;

  this.input = punycode.ucs2.decode(this.input);

  for (; this.pointer <= this.input.length; ++this.pointer) {
    const c = this.input[this.pointer];
    const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);

    // exec state machine
    const ret = this["parse " + this.state](c, cStr);
    if (!ret) {
      break; // terminate algorithm
    } else if (ret === failure) {
      this.failure = true;
      break;
    }
  }
}

URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
  if (isASCIIAlpha(c)) {
    this.buffer += cStr.toLowerCase();
    this.state = "scheme";
  } else if (!this.stateOverride) {
    this.state = "no scheme";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
  if (isASCIIAlphanumeric(c) || c === 43 || c === 45 || c === 46) {
    this.buffer += cStr.toLowerCase();
  } else if (c === 58) {
    if (this.stateOverride) {
      if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
        return false;
      }

      if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
        return false;
      }

      if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
        return false;
      }

      if (this.url.scheme === "file" && (this.url.host === "" || this.url.host === null)) {
        return false;
      }
    }
    this.url.scheme = this.buffer;
    this.buffer = "";
    if (this.stateOverride) {
      return false;
    }
    if (this.url.scheme === "file") {
      if (this.input[this.pointer + 1] !== 47 || this.input[this.pointer + 2] !== 47) {
        this.parseError = true;
      }
      this.state = "file";
    } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
      this.state = "special relative or authority";
    } else if (isSpecial(this.url)) {
      this.state = "special authority slashes";
    } else if (this.input[this.pointer + 1] === 47) {
      this.state = "path or authority";
      ++this.pointer;
    } else {
      this.url.cannotBeABaseURL = true;
      this.url.path.push("");
      this.state = "cannot-be-a-base-URL path";
    }
  } else if (!this.stateOverride) {
    this.buffer = "";
    this.state = "no scheme";
    this.pointer = -1;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
  if (this.base === null || (this.base.cannotBeABaseURL && c !== 35)) {
    return failure;
  } else if (this.base.cannotBeABaseURL && c === 35) {
    this.url.scheme = this.base.scheme;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.url.cannotBeABaseURL = true;
    this.state = "fragment";
  } else if (this.base.scheme === "file") {
    this.state = "file";
    --this.pointer;
  } else {
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
  if (c === 47) {
    this.state = "authority";
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
  this.url.scheme = this.base.scheme;
  if (isNaN(c)) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
  } else if (c === 47) {
    this.state = "relative slash";
  } else if (c === 63) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = "";
    this.state = "query";
  } else if (c === 35) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.state = "fragment";
  } else if (isSpecial(this.url) && c === 92) {
    this.parseError = true;
    this.state = "relative slash";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice(0, this.base.path.length - 1);

    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
  if (isSpecial(this.url) && (c === 47 || c === 92)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "special authority ignore slashes";
  } else if (c === 47) {
    this.state = "authority";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "special authority ignore slashes";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
  if (c !== 47 && c !== 92) {
    this.state = "authority";
    --this.pointer;
  } else {
    this.parseError = true;
  }

  return true;
};

URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
  if (c === 64) {
    this.parseError = true;
    if (this.atFlag) {
      this.buffer = "%40" + this.buffer;
    }
    this.atFlag = true;

    // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
    const len = countSymbols(this.buffer);
    for (let pointer = 0; pointer < len; ++pointer) {
      const codePoint = this.buffer.codePointAt(pointer);

      if (codePoint === 58 && !this.passwordTokenSeenFlag) {
        this.passwordTokenSeenFlag = true;
        continue;
      }
      const encodedCodePoints = percentEncodeChar(codePoint, isUserinfoPercentEncode);
      if (this.passwordTokenSeenFlag) {
        this.url.password += encodedCodePoints;
      } else {
        this.url.username += encodedCodePoints;
      }
    }
    this.buffer = "";
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    if (this.atFlag && this.buffer === "") {
      this.parseError = true;
      return failure;
    }
    this.pointer -= countSymbols(this.buffer) + 1;
    this.buffer = "";
    this.state = "host";
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse hostname"] =
URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
  if (this.stateOverride && this.url.scheme === "file") {
    --this.pointer;
    this.state = "file host";
  } else if (c === 58 && !this.arrFlag) {
    if (this.buffer === "") {
      this.parseError = true;
      return failure;
    }

    const host = parseHost(this.buffer, isSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "port";
    if (this.stateOverride === "hostname") {
      return false;
    }
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    --this.pointer;
    if (isSpecial(this.url) && this.buffer === "") {
      this.parseError = true;
      return failure;
    } else if (this.stateOverride && this.buffer === "" &&
               (includesCredentials(this.url) || this.url.port !== null)) {
      this.parseError = true;
      return false;
    }

    const host = parseHost(this.buffer, isSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "path start";
    if (this.stateOverride) {
      return false;
    }
  } else {
    if (c === 91) {
      this.arrFlag = true;
    } else if (c === 93) {
      this.arrFlag = false;
    }
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
  if (isASCIIDigit(c)) {
    this.buffer += cStr;
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92) ||
             this.stateOverride) {
    if (this.buffer !== "") {
      const port = parseInt(this.buffer);
      if (port > Math.pow(2, 16) - 1) {
        this.parseError = true;
        return failure;
      }
      this.url.port = port === defaultPort(this.url.scheme) ? null : port;
      this.buffer = "";
    }
    if (this.stateOverride) {
      return false;
    }
    this.state = "path start";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

const fileOtherwiseCodePoints = new Set([47, 92, 63, 35]);

URLStateMachine.prototype["parse file"] = function parseFile(c) {
  this.url.scheme = "file";

  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file slash";
  } else if (this.base !== null && this.base.scheme === "file") {
    if (isNaN(c)) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = this.base.query;
    } else if (c === 63) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = "";
      this.state = "query";
    } else if (c === 35) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = this.base.query;
      this.url.fragment = "";
      this.state = "fragment";
    } else {
      if (this.input.length - this.pointer - 1 === 0 || // remaining consists of 0 code points
          !isWindowsDriveLetterCodePoints(c, this.input[this.pointer + 1]) ||
          (this.input.length - this.pointer - 1 >= 2 && // remaining has at least 2 code points
           !fileOtherwiseCodePoints.has(this.input[this.pointer + 2]))) {
        this.url.host = this.base.host;
        this.url.path = this.base.path.slice();
        shortenPath(this.url);
      } else {
        this.parseError = true;
      }

      this.state = "path";
      --this.pointer;
    }
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file host";
  } else {
    if (this.base !== null && this.base.scheme === "file") {
      if (isNormalizedWindowsDriveLetterString(this.base.path[0])) {
        this.url.path.push(this.base.path[0]);
      } else {
        this.url.host = this.base.host;
      }
    }
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
  if (isNaN(c) || c === 47 || c === 92 || c === 63 || c === 35) {
    --this.pointer;
    if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
      this.parseError = true;
      this.state = "path";
    } else if (this.buffer === "") {
      this.url.host = "";
      if (this.stateOverride) {
        return false;
      }
      this.state = "path start";
    } else {
      let host = parseHost(this.buffer, isSpecial(this.url));
      if (host === failure) {
        return failure;
      }
      if (host === "localhost") {
        host = "";
      }
      this.url.host = host;

      if (this.stateOverride) {
        return false;
      }

      this.buffer = "";
      this.state = "path start";
    }
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
  if (isSpecial(this.url)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "path";

    if (c !== 47 && c !== 92) {
      --this.pointer;
    }
  } else if (!this.stateOverride && c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (!this.stateOverride && c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (c !== undefined) {
    this.state = "path";
    if (c !== 47) {
      --this.pointer;
    }
  }

  return true;
};

URLStateMachine.prototype["parse path"] = function parsePath(c) {
  if (isNaN(c) || c === 47 || (isSpecial(this.url) && c === 92) ||
      (!this.stateOverride && (c === 63 || c === 35))) {
    if (isSpecial(this.url) && c === 92) {
      this.parseError = true;
    }

    if (isDoubleDot(this.buffer)) {
      shortenPath(this.url);
      if (c !== 47 && !(isSpecial(this.url) && c === 92)) {
        this.url.path.push("");
      }
    } else if (isSingleDot(this.buffer) && c !== 47 &&
               !(isSpecial(this.url) && c === 92)) {
      this.url.path.push("");
    } else if (!isSingleDot(this.buffer)) {
      if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
        if (this.url.host !== "" && this.url.host !== null) {
          this.parseError = true;
          this.url.host = "";
        }
        this.buffer = this.buffer[0] + ":";
      }
      this.url.path.push(this.buffer);
    }
    this.buffer = "";
    if (this.url.scheme === "file" && (c === undefined || c === 63 || c === 35)) {
      while (this.url.path.length > 1 && this.url.path[0] === "") {
        this.parseError = true;
        this.url.path.shift();
      }
    }
    if (c === 63) {
      this.url.query = "";
      this.state = "query";
    }
    if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += percentEncodeChar(c, isPathPercentEncode);
  }

  return true;
};

URLStateMachine.prototype["parse cannot-be-a-base-URL path"] = function parseCannotBeABaseURLPath(c) {
  if (c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else {
    // TODO: Add: not a URL code point
    if (!isNaN(c) && c !== 37) {
      this.parseError = true;
    }

    if (c === 37 &&
        (!isASCIIHex(this.input[this.pointer + 1]) ||
         !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    if (!isNaN(c)) {
      this.url.path[0] = this.url.path[0] + percentEncodeChar(c, isC0ControlPercentEncode);
    }
  }

  return true;
};

URLStateMachine.prototype["parse query"] = function parseQuery(c, cStr) {
  if (isNaN(c) || (!this.stateOverride && c === 35)) {
    if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
      this.encodingOverride = "utf-8";
    }

    const buffer = new Buffer(this.buffer); // TODO: Use encoding override instead
    for (let i = 0; i < buffer.length; ++i) {
      if (buffer[i] < 0x21 || buffer[i] > 0x7E || buffer[i] === 0x22 || buffer[i] === 0x23 ||
          buffer[i] === 0x3C || buffer[i] === 0x3E) {
        this.url.query += percentEncode(buffer[i]);
      } else {
        this.url.query += String.fromCodePoint(buffer[i]);
      }
    }

    this.buffer = "";
    if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
  if (isNaN(c)) { // do nothing
  } else if (c === 0x0) {
    this.parseError = true;
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.url.fragment += percentEncodeChar(c, isC0ControlPercentEncode);
  }

  return true;
};

function serializeURL(url, excludeFragment) {
  let output = url.scheme + ":";
  if (url.host !== null) {
    output += "//";

    if (url.username !== "" || url.password !== "") {
      output += url.username;
      if (url.password !== "") {
        output += ":" + url.password;
      }
      output += "@";
    }

    output += serializeHost(url.host);

    if (url.port !== null) {
      output += ":" + url.port;
    }
  } else if (url.host === null && url.scheme === "file") {
    output += "//";
  }

  if (url.cannotBeABaseURL) {
    output += url.path[0];
  } else {
    for (const string of url.path) {
      output += "/" + string;
    }
  }

  if (url.query !== null) {
    output += "?" + url.query;
  }

  if (!excludeFragment && url.fragment !== null) {
    output += "#" + url.fragment;
  }

  return output;
}

function serializeOrigin(tuple) {
  let result = tuple.scheme + "://";
  result += serializeHost(tuple.host);

  if (tuple.port !== null) {
    result += ":" + tuple.port;
  }

  return result;
}

module.exports.serializeURL = serializeURL;

module.exports.serializeURLOrigin = function (url) {
  // https://url.spec.whatwg.org/#concept-url-origin
  switch (url.scheme) {
    case "blob":
      try {
        return module.exports.serializeURLOrigin(module.exports.parseURL(url.path[0]));
      } catch (e) {
        // serializing an opaque origin returns "null"
        return "null";
      }
    case "ftp":
    case "gopher":
    case "http":
    case "https":
    case "ws":
    case "wss":
      return serializeOrigin({
        scheme: url.scheme,
        host: url.host,
        port: url.port
      });
    case "file":
      // spec says "exercise to the reader", chrome says "file://"
      return "file://";
    default:
      // serializing an opaque origin returns "null"
      return "null";
  }
};

module.exports.basicURLParse = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
  if (usm.failure) {
    return "failure";
  }

  return usm.url;
};

module.exports.setTheUsername = function (url, username) {
  url.username = "";
  const decoded = punycode.ucs2.decode(username);
  for (let i = 0; i < decoded.length; ++i) {
    url.username += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
  }
};

module.exports.setThePassword = function (url, password) {
  url.password = "";
  const decoded = punycode.ucs2.decode(password);
  for (let i = 0; i < decoded.length; ++i) {
    url.password += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
  }
};

module.exports.serializeHost = serializeHost;

module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;

module.exports.serializeInteger = function (integer) {
  return String(integer);
};

module.exports.parseURL = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  // We don't handle blobs, so this just delegates:
  return module.exports.basicURLParse(input, { baseURL: options.baseURL, encodingOverride: options.encodingOverride });
};


/***/ }),

/***/ "./node_modules/whatwg-url/lib/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/whatwg-url/lib/utils.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports.mixin = function mixin(target, source) {
  const keys = Object.getOwnPropertyNames(source);
  for (let i = 0; i < keys.length; ++i) {
    Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
  }
};

module.exports.wrapperSymbol = Symbol("wrapper");
module.exports.implSymbol = Symbol("impl");

module.exports.wrapperForImpl = function (impl) {
  return impl[module.exports.wrapperSymbol];
};

module.exports.implForWrapper = function (wrapper) {
  return wrapper[module.exports.implSymbol];
};



/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}
module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/es-abstract/2022/RequireObjectCoercible.js":
/*!*****************************************************************!*\
  !*** ./node_modules/es-abstract/2022/RequireObjectCoercible.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ../5/CheckObjectCoercible */ "./node_modules/es-abstract/5/CheckObjectCoercible.js");


/***/ }),

/***/ "./node_modules/es-abstract/5/CheckObjectCoercible.js":
/*!************************************************************!*\
  !*** ./node_modules/es-abstract/5/CheckObjectCoercible.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gatsby-core-utils/dist/create-content-digest.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/gatsby-core-utils/dist/create-content-digest.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createContentDigest": () => (/* binding */ createContentDigest)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var node_object_hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-object-hash */ "./node_modules/node-object-hash/dist/hasher.js");


const hasher = node_object_hash__WEBPACK_IMPORTED_MODULE_1__({
  coerce: false,
  alg: `md5`,
  enc: `hex`,
  sort: {
    map: true,
    object: true,
    array: false,
    set: false
  }
});

const hashPrimitive = input => crypto__WEBPACK_IMPORTED_MODULE_0__.createHash(`md5`).update(input).digest(`hex`);
/**
 * Hashes an input using md5 hash of hexadecimal digest.
 *
 * @param input The input to encrypt
 * @return The content digest
 */


const createContentDigest = input => {
  if (typeof input === `object` && !Buffer.isBuffer(input)) {
    return hasher.hash(input);
  }

  return hashPrimitive(input);
};

/***/ }),

/***/ "./node_modules/gatsby-link/dist/index.modern.mjs":
/*!********************************************************!*\
  !*** ./node_modules/gatsby-link/dist/index.modern.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Link": () => (/* binding */ P),
/* harmony export */   "navigate": () => (/* binding */ E),
/* harmony export */   "parsePath": () => (/* binding */ a),
/* harmony export */   "withAssetPrefix": () => (/* binding */ y),
/* harmony export */   "withPrefix": () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
/* harmony import */ var gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-page-utils/apply-trailing-slash-option */ "./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js");
"use client"
;function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}function a(t){let e=t||"/",n="",r="";const o=e.indexOf("#");-1!==o&&(r=e.slice(o),e=e.slice(0,o));const s=e.indexOf("?");return-1!==s&&(n=e.slice(s),e=e.slice(0,s)),{pathname:e,search:"?"===n?"":n,hash:"#"===r?"":r}}const c=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=t=>{if("string"==typeof t)return!(t=>c.test(t))(t)},p=()=> true? true?"":0:0;function h(t,e=(()=> true? true?"":0:0)()){var n;if(!l(t))return t;if(t.startsWith("./")||t.startsWith("../"))return t;const r=null!=(n=null!=e?e:p())?n:"/";return`${null!=r&&r.endsWith("/")?r.slice(0,-1):r}${t.startsWith("/")?t:`/${t}`}`}const f=t=>null==t?void 0:t.startsWith("/"),u=()=> true?"always":0;function _(t,e){const{pathname:n,search:r,hash:o}=a(t);return`${(0,gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__.applyTrailingSlashOption)(n,e)}${r}${o}`}const d=(t,e)=>"number"==typeof t?t:l(t)?f(t)?function(t){const e=h(t),n=u();return"always"===n||"never"===n?_(e,n):e}(t):function(t,e){if(f(t))return t;const r=u(),o=(0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.resolve)(t,e);return"always"===r||"never"===r?_(o,r):o}(t,e):t,m=["to","getProps","onClick","onMouseEnter","activeClassName","activeStyle","innerRef","partiallyActive","state","replace","_location"];function y(t){return h(t,p())}const v={activeClassName:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,activeStyle:prop_types__WEBPACK_IMPORTED_MODULE_3__.object,partiallyActive:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool};function b(t){/*#__PURE__*/return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Location,null,({location:n})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(w,i({},t,{_location:n})))}class w extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(t){super(t),this.defaultGetProps=({isPartiallyCurrent:t,isCurrent:e})=>(this.props.partiallyActive?t:e)?{className:[this.props.className,this.props.activeClassName].filter(Boolean).join(" "),style:i({},this.props.style,this.props.activeStyle)}:null;let e=!1;"undefined"!=typeof window&&window.IntersectionObserver&&(e=!0),this.state={IOSupported:e},this.abortPrefetch=null,this.handleRef=this.handleRef.bind(this)}_prefetch(){let t=window.location.pathname+window.location.search;this.props._location&&this.props._location.pathname&&(t=this.props._location.pathname+this.props._location.search);const e=a(d(this.props.to,t)),n=e.pathname+e.search;if(t!==n)return ___loader.enqueue(n)}componentWillUnmount(){if(!this.io)return;const{instance:t,el:e}=this.io;this.abortPrefetch&&this.abortPrefetch.abort(),t.unobserve(e),t.disconnect()}handleRef(t){this.props.innerRef&&Object.prototype.hasOwnProperty.call(this.props.innerRef,"current")?this.props.innerRef.current=t:this.props.innerRef&&this.props.innerRef(t),this.state.IOSupported&&t&&(this.io=((t,e)=>{const n=new window.IntersectionObserver(n=>{n.forEach(n=>{t===n.target&&e(n.isIntersecting||n.intersectionRatio>0)})});return n.observe(t),{instance:n,el:t}})(t,t=>{t?this.abortPrefetch=this._prefetch():this.abortPrefetch&&this.abortPrefetch.abort()}))}render(){const t=this.props,{to:n,getProps:r=this.defaultGetProps,onClick:s,onMouseEnter:c,state:p,replace:h,_location:f}=t,u=function(t,e){if(null==t)return{};var n,r,o={},s=Object.keys(t);for(r=0;r<s.length;r++)e.indexOf(n=s[r])>=0||(o[n]=t[n]);return o}(t,m); false||l(n)||console.warn(`External link ${n} was detected in a Link component. Use the Link component only for internal links. See: https://gatsby.dev/internal-links`);const _=d(n,f.pathname);return l(_)?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Link,i({to:_,state:p,getProps:r,innerRef:this.handleRef,onMouseEnter:t=>{c&&c(t);const e=a(_);___loader.hovering(e.pathname+e.search)},onClick:t=>{if(s&&s(t),!(0!==t.button||this.props.target||t.defaultPrevented||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)){t.preventDefault();let e=h;const n=encodeURI(_)===f.pathname;"boolean"!=typeof h&&n&&(e=!0),window.___navigate(_,{state:p,replace:e})}return!0}},u)):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",i({href:_},u))}}w.propTypes=i({},v,{onClick:prop_types__WEBPACK_IMPORTED_MODULE_3__.func,to:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,replace:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool,state:prop_types__WEBPACK_IMPORTED_MODULE_3__.object});const P=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((t,n)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(b,i({innerRef:n},t))),E=(t,e)=>{window.___navigate(d(t,window.location.pathname),e)};
//# sourceMappingURL=index.modern.mjs.map


/***/ }),

/***/ "./.cache/redirects.json":
/*!*******************************!*\
  !*** ./.cache/redirects.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = [];

/***/ }),

/***/ "./node_modules/tr46/lib/mappingTable.json":
/*!*************************************************!*\
  !*** ./node_modules/tr46/lib/mappingTable.json ***!
  \*************************************************/
/***/ ((module) => {

"use strict";

/***/ }),

/***/ "./public/page-data/sq/d/1942681338.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/1942681338.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"site":{"faviconMetaTags":{"tags":[{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"57x57","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=57&h=57"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"60x60","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=60&h=60"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"72x72","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=72&h=72"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"76x76","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=76&h=76"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"114x114","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=114&h=114"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"120x120","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=120&h=120"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"144x144","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=144&h=144"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"152x152","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=152&h=152"}},{"tagName":"link","attributes":{"rel":"apple-touch-icon","sizes":"180x180","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=180&h=180"}},{"tagName":"meta","attributes":{"name":"msapplication-square70x70","content":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=70&h=70"}},{"tagName":"meta","attributes":{"name":"msapplication-square150x150","content":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=150&h=150"}},{"tagName":"meta","attributes":{"name":"msapplication-square310x310","content":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=310&h=310"}},{"tagName":"meta","attributes":{"name":"msapplication-square310x150","content":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=310&h=150"}},{"tagName":"link","attributes":{"rel":"icon","sizes":"16x16","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=16&h=16","type":"image/png"}},{"tagName":"link","attributes":{"rel":"icon","sizes":"32x32","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=32&h=32","type":"image/png"}},{"tagName":"link","attributes":{"rel":"icon","sizes":"96x96","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=96&h=96","type":"image/png"}},{"tagName":"link","attributes":{"rel":"icon","sizes":"192x192","href":"https://www.datocms-assets.com/43054/1670322666-favicon.png?w=192&h=192","type":"image/png"}},{"tagName":"meta","attributes":{"name":"application-name","content":"Tiina-resume-site"}}]}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-templates-index-js.js.map