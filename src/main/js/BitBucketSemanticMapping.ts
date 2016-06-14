/// <reference path="./Main.d.ts" />
let trackAll: SemanticEnablingMapping = { 
    keystroke: true,
    click: true,
    hover: true, 
    scroll: true
};

main.declareSemanticMappings([
    {name: "Merge Pull Request", selector: "#fulfill-pullrequest", track: trackAll },
    {name: "Close Pull Request", selector: "#reject-pullrequest", track: trackAll },
    {name: "Cancel inline comment", selector: ".new-comment .aui-button-primary", track: trackAll },
    {name: "Comment inline comment", selector: ".new-comment .buttons a", track: trackAll },
    {name: "Inline Comment", selector: ".aui-iconfont-add-comment", track: trackAll },
    {name: "Edit comment", selector: ".comment-actions .edit-link", track: trackAll },
    {name: "Add reaction", selector: ".new-comment .buttons .aui-button-primary", track: trackAll },
    {name: "Inline comment textfield", selector: ".comment-thread-container #id_new_comment", track: trackAll },
    {name: "Comment textfield", selector: "#general-comments #id_new_comment", track: trackAll }
]);