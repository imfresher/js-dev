import { isObject } from './obj';

/**
 * Creates an element and applies properties, attributes, and inserts content.
 *
 * @param  {string} [tagName='div']
 *         Name of tag to be created.
 *
 * @param  {Object} [properties={}]
 *         Element properties to be applied.
 *
 * @param  {Object} [attributes={}]
 *         Element attributes to be applied.
 *
 * @param {module:dom~ContentDescriptor} content
 *        A content descriptor object.
 *
 * @return {Element}
 *         The element that was created.
 */
export function createEl(tagName = 'div', properties = {}, attributes = {}, content) {
  const el = document.createElement(tagName);

  Object.getOwnPropertyNames(properties).forEach(function(propName) {
    const val = properties[propName];

    // See #2176
    // We originally were accepting both properties and attributes in the
    // same object, but that doesn't work so well.
    if (propName.indexOf('aria-') !== -1 || propName === 'role' || propName === 'type') {
      log.warn('Setting attributes in the second argument of createEl()\n' +
               'has been deprecated. Use the third argument instead.\n' +
               `createEl(type, properties, attributes). Attempting to set ${propName} to ${val}.`);
      el.setAttribute(propName, val);

    // Handle textContent since it's not supported everywhere and we have a
    // method for it.
    } else if (propName === 'textContent') {
      textContent(el, val);
    } else if (el[propName] !== val || propName === 'tabIndex') {
      el[propName] = val;
    }
  });

  Object.getOwnPropertyNames(attributes).forEach(function(attrName) {
    el.setAttribute(attrName, attributes[attrName]);
  });

  if (content) {
    appendContent(el, content);
  }

  return el;
}

/**
 * Injects text into an element, replacing any existing contents entirely.
 *
 * @param  {Element} el
 *         The element to add text content into
 *
 * @param  {string} text
 *         The text content to add.
 *
 * @return {Element}
 *         The element with added text content.
 */
export function textContent(el, text) {
  if (typeof el.textContent === 'undefined') {
    el.innerText = text;
  } else {
    el.textContent = text;
  }
  return el;
}

/**
 * Normalizes and appends content to an element.
 *
 * @param  {Element} el
 *         Element to append normalized content to.
 *
 * @param {module:dom~ContentDescriptor} content
 *        A content descriptor value.
 *
 * @return {Element}
 *         The element with appended normalized content.
 */
export function appendContent(el, content) {
  normalizeContent(content).forEach(node => el.appendChild(node));
  return el;
}

/**
 * Normalizes content for eventual insertion into the DOM.
 *
 * This allows a wide range of content definition methods, but helps protect
 * from falling into the trap of simply writing to `innerHTML`, which could
 * be an XSS concern.
 *
 * The content for an element can be passed in multiple types and
 * combinations, whose behavior is as follows:
 *
 * @param {module:dom~ContentDescriptor} content
 *        A content descriptor value.
 *
 * @return {Array}
 *         All of the content that was passed in, normalized to an array of
 *         elements or text nodes.
 */
export function normalizeContent(content) {

  // First, invoke content if it is a function. If it produces an array,
  // that needs to happen before normalization.
  if (typeof content === 'function') {
    content = content();
  }

  // Next up, normalize to an array, so one or many items can be normalized,
  // filtered, and returned.
  return (Array.isArray(content) ? content : [content]).map(value => {

    // First, invoke value if it is a function to produce a new value,
    // which will be subsequently normalized to a Node of some kind.
    if (typeof value === 'function') {
      value = value();
    }

    if (isEl(value) || isTextNode(value)) {
      return value;
    }

    if (typeof value === 'string' && (/\S/).test(value)) {
      return document.createTextNode(value);
    }
  }).filter(value => value);
}

/**
 * Determines, via duck typing, whether or not a value is a text node.
 *
 * @param  {Mixed} value
 *         Check if this value is a text node.
 *
 * @return {boolean}
 *         Will be `true` if the value is a text node, `false` otherwise.
 */
export function isTextNode(value) {
  return isObject(value) && value.nodeType === 3;
}

/**
 * Determines, via duck typing, whether or not a value is a DOM element.
 *
 * @param  {Mixed} value
 *         The value to check.
 *
 * @return {boolean}
 *         Will be `true` if the value is a DOM element, `false` otherwise.
 */
export function isEl(value) {
  return isObject(value) && value.nodeType === 1;
}
