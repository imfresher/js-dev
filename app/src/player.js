import { assign } from './utils/obj';
import * as Dom from './utils/dom.js';
import * as Fn from './utils/fn.js';
import Set from './utils/set.js';

const TECH_EVENTS_RETRIGGER = [
  'progress',
  'abort',
  'suspend',
  'emptied',
  'stalled',
  'loadedmetadata',
  'loadeddata',
  'timeupdate',
  'resize',
  'volumechange',
  'texttrackchange'
];

const TECH_EVENTS_QUEUE = {
  canplay: 'CanPlay',
  canplaythrough: 'CanPlayThrough',
  playing: 'Playing',
  seeked: 'Seeked'
};

const BREAKPOINTS = [];

class Player {
  constructor(id, options) {
    console.log('Player constructor');

    options = assign({ id: id }, options);

    this.id_ = options.id;

    this.tag = id;

    this.el_ = this.createEl();

    this.setTimeoutIds_ = new Set();
    this.setIntervalIds_ = new Set();

    Player.players[this.id_] = this;
  }

  createEl() {
    let el;
    let tag = this.tag;

    el = this.el_ = Dom.createEl('div');
    tag = this.tag = document.createElement('video');

    el.appendChild(tag);

    this.el_ = el;

    return el;
  }

  ready(fn, sync = false) {
    if (sync) {
      fn.call(this);
    } else {
      // Call the function asynchronously by default for consistency
      this.setTimeout(fn, 1);
    }
  }

  setTimeout(fn, timeout) {
    // declare as variables so they are properly available in timeout function
    // eslint-disable-next-line
    var timeoutId, disposeFn;

    fn = Fn.bind(this, fn);

    timeoutId = window.setTimeout(() => {
      if (this.setTimeoutIds_.has(timeoutId)) {
        this.setTimeoutIds_.delete(timeoutId);
      }

      fn();
    }, timeout);

    this.setTimeoutIds_.add(timeoutId);

    return timeoutId;
  }
}

Player.players = {};

export default Player;
