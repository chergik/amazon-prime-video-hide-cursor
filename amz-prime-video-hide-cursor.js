// ==UserScript==
// @name         Amazon-Prime-Video-hide-hand
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove annoying cursor hand while watching the video.
// @author       Andrey Chergik
// @include      /^https://www\.amazon\.com/gp/video/.*$/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var isUndefOrNull = function (o) {
        return (typeof o === 'undefined' || o === null);
    };
    var isEmpty = function(a) {
        return a.length === 0;
    };

    var getDeepNode = function (root, indices) {
        if (isUndefOrNull(root) || isUndefOrNull(indices) || isEmpty(indices)) return null;
        var childNodes;
        for (var i = 0; i < indices.length; ++i) {
            if (isUndefOrNull(root) || isUndefOrNull(root.childNodes) || indices[i] >= root.childNodes.length) return null;
            root = root.childNodes[indices[i]];
        }
        return root;
    };

    var interval = setInterval(function() {
        var webPlayerUiContainer = document.querySelectorAll(".webPlayerUIContainer")[0];
        var movieScreen = getDeepNode(webPlayerUiContainer, [0,0,1,0,2]);
        if (isUndefOrNull(movieScreen)) return;
        movieScreen.style.cursor = 'none';
        var controls = movieScreen.childNodes[0];
        controls.style.cursor = 'auto';
        clearInterval(interval);
    }, 1000);
})();
