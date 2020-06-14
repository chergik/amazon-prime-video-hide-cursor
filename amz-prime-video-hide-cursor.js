// ==UserScript==
// @name         Amazon-Prime-Video-hide-hand
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove annoying cursor hand while watching the video.
// @author       Andrey Chergik
// @include      /^https://www\.(amazon|primevideo)\.com/.*$/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var loggingPrefix = "Amazon-Prime-Video-hide-hand";
    var logging = false;

    var isUndefOrNull = function (o) {
        return (typeof o === 'undefined' || o === null);
    };
    var isEmpty = function(a) {
        return a.length === 0;
    };

    var getDeepNode = function (root, indices) {
        if (isUndefOrNull(root) || isUndefOrNull(indices) || isEmpty(indices)) return null;
        for (var i = 0; i < indices.length; ++i) {
            if (isUndefOrNull(root) || isUndefOrNull(root.childNodes) || indices[i] >= root.childNodes.length) return null;
            root = root.childNodes[indices[i]];
        }
        return root;
    };

    var log = function(msg) {
      if (isUndefOrNull(msg)) return;
      if (!logging) return;
      console.log(loggingPrefix + ": " + msg);
    };

    var interval = setInterval(function() {
        log("START");
        var webPlayerUiContainer = document.querySelectorAll(".webPlayerUIContainer")[0];
      	log("CONT: " + webPlayerUiContainer);
      	if (isUndefOrNull(webPlayerUiContainer)) return;
        log("CONT is not null");
        var movieScreen = getDeepNode(webPlayerUiContainer, [0,0,1,0,2]);
        log("MOVIE SCREEN:" + movieScreen);
        if (isUndefOrNull(movieScreen)) return;
        log("MOVIE SCREEN.style.cursor: " + movieScreen.style.cursor)
      	var cursor = window.getComputedStyle(movieScreen).getPropertyValue('cursor');
        log("CURSOR style: " + cursor);
        if (cursor !== "pointer") return;
        movieScreen.style.cursor = 'none';
        var controls = movieScreen.childNodes[0];
        if (isUndefOrNull(controls)) return;
        log("CONTROLS: " + controls);
        controls.style.cursor = 'auto';
        clearInterval(interval);
    }, 2000);
})();
