///<reference path="./KeystrokeTracker.ts" />
///<reference path="./mouseTracker.ts" />
///<reference path="./resizeTracker.ts" />
///<reference path="./UserIdTracker.ts" />
declare var KeystrokeTracker: any;
declare var MouseTracker: any;
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

// Register the mousetracker to the current document.
(new MouseTracker()).register();

// Register the resize tracker to the current document.
(new ResizeTracker()).register();

