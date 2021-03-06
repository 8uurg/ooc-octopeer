/**
 * Contains special dependencies.
 */

// Cannot use let or const in global scope, using var instead.
var _global: any = global; // tslint:disable-line

import {Tracker} from "../main/js/trackers/RawDataTrackers/Tracker";
_global.Tracker = Tracker;

import {SemanticTracker} from "../main/js/trackers/SemanticTrackers/SemanticTracker";
_global.SemanticTracker = SemanticTracker;

import {Throttle} from "../main/js/trackers/throttles/Throttle";
_global.Throttle = Throttle;

import {MinDelayThrottle} from "../main/js/trackers/throttles/MinDelayThrottle";
_global.MinDelayThrottle = MinDelayThrottle;

import {LastMessageThrottle} from "../main/js/trackers/throttles/LastMessageThrottle";
_global.LastMessageThrottle = LastMessageThrottle;
