/// <reference path="./interfaces/Message.ts" />
/// <reference path="./interfaces/SessionDataGatherer.ts" />
/// <reference path="./interfaces/TrackingCollector.ts" />
/// <reference path="./interfaces/JSON/SessionJSON.ts" />

/// <reference path="../../../typings/index.d.ts" />
/// <reference path="./OctopeerConstants.ts" />

/**
 * ChromeTrackingCollector
 * Collects all the tracking data and multiplexes it over a singular chrome port.
 */
export class ChromeTrackingCollector implements TrackingCollector {
    private session: SessionJSON;
    private port: chrome.runtime.Port;

    constructor (sc: SessionDataGatherer) {
        this.port = chrome.runtime.connect({
            name: OCTOPEER_CONSTANTS.chrome_message_sender_id
        });

        this.session = sc.getSessionData();
    }

    /**
     * Send a tracker message using the ChromeTrackingCollector.
     */
    public sendMessage(message: Message) {
        if (this.session != null) {
            message.data.session = this.session;
            this.port.postMessage(message);
        } else {
            throw new Error("Session was not initialized before sending data.");
        }
    }
}
