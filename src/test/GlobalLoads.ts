/**
 * Contains special dependencies.
 */

// Cannot use let or const in global scope, using var instead.
var _global: any = global; // tslint:disable-line

import {Tracker} from "../main/js/trackers/RawDataTrackers/Tracker";
_global.Tracker = Tracker;

import {SemanticTracker} from "../main/js/trackers/SemanticTrackers/SemanticTracker";
_global.SemanticTracker = SemanticTracker;