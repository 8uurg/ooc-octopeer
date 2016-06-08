/**
 * Created by larsstegman on 12-05-16.
 *
 * Constants that are used in the local storage for Octopeer.
 */
var OCTOPEER_CONSTANTS: any = { // tslint:disable-line
    "user_id_key":              "octopeer_user_id",
    "current_repo_id_key":      "octopeer_current_repo_id",
    "chrome_message_sender_id": "requestSender",

    // The permissions/preferences
    "track_mouse_position":         "checkboxMousePos",
    "track_mouse_clicks":           "checkboxMouseClicks",
    "track_page_resolution":        "checkboxPageRes",
    "track_key_strokes":            "checkboxKeystrokes",
    "track_semantic_events":        "checkboxSemanticEvents", // Up for deletion after refactor, still used in main.ts .
    "track_semantic_position":      "checkboxSemanticPos",
    "track_semantic_clicks":        "checkboxSemanticClicks",
    "track_semantic_key_strokes":   "checkboxSemanticKeystrokes",
    "track_semantic_scrolling":     "checkboxSemanticScrolling",
    "track_semantic_visibility":    "checkboxSemanticPRPageVisibility",
    "hash_username":                "hashUsername",
    "hash_pr_metadata":             "hashPRMetaData",
    "hash_browser_data":            "hashBrowserData",

    // The database constants
    "database_location_key":     "databaseLocation",
    "standard_database_location": "http://10.0.22.6/api/"
};
