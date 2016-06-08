/**
 * Contains special dependencies.
 */

// Cannot use let or const in global scope, using var instead.
var _global: any = global; // tslint:disable-line

import {Tracker} from "../main/js/trackers/Tracker";
_global.Tracker = Tracker;

import {Trottle} from "../main/js/trackers/trottles/Trottle";
_global.Trottle = Trottle;

import {MinDelayTrottle} from "../main/js/trackers/trottles/MinDelayTrottle";
_global.MinDelayTrottle = MinDelayTrottle;

import {LastMessageTrottle} from "../main/js/trackers/trottles/LastMessageTrottle";
_global.LastMessageTrottle = LastMessageTrottle;