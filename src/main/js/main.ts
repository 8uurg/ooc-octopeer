///<reference path="./keystrokeTracker.ts" />
///<reference path="./mouseClickTracker.ts" />
///<reference path="./mousePositionTracker.ts" />
///<reference path="./resizeTracker.ts" />
///<reference path="./UserIdTracker.ts" />
declare var KeystrokeTracker: any;
declare var MouseClickTracker: any;
declare var MousePositionTracker: any;
declare var ResizeTracker: any;
declare var UserIdTracker: any;

/**
 * Created by larsstegman on 16-05-16.
 * This file is the starting point for each BitBucket page tracking.
 */
// Log the current user name and repository id.
(new UserIdTracker()).log();

// Create an instance of the keystroke tracker.
(new KeystrokeTracker).register();

// Register the mouse click tracker to the current document.
(new MouseClickTracker()).register();

// Register the mouse position tracker to the current document.
(new MousePositionTracker()).register();

// Register the resize tracker to the current document.
(new ResizeTracker()).register();

