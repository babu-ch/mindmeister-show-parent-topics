// ==UserScript==
// @name         mindmister show-parent-topics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       babu-ch
// @match        https://www.mindmeister.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mindmeister.com
// @grant        none
// @updateURL    https://github.com/babu-ch/mindmeister-show-parent-topics/raw/main/main.user.js
// ==/UserScript==

(function() {
    'use strict';

    const infoEl = document.createElement('div')
    infoEl.id = 'infoEl'
    infoEl.style.position = 'fixed'
    infoEl.style.top = 0
    infoEl.style.left = 0
    infoEl.style['z-index'] = 999
    infoEl.style.background = 'white'
    document.body.append(infoEl)

    function getParentTopic(el) {
        if (!el) {
            return
        }
        const wrap = el.closest('.tk_children')
        if (!wrap) {
            return
        }
        const id = wrap.id.replace('tk_children_', '')
        const parentTopic = document.getElementById(id)
        if (!parentTopic || !parentTopic.classList.contains('tk_label')) {
           return null
        }
        return parentTopic
    }
    function getClickedTopic(el) {
        if (el.classList.contains('tk_label')) {
            return el.querySelector('.tk_title')
        }
        if (el.classList.contains('tk_title')) {
            return el
        }
    }
    document.addEventListener('click', function(e) {
        const topicTexts = []
        let topic = getClickedTopic(e.target)
        while( topic = getParentTopic(topic)) {
            topicTexts.unshift(topic.innerText)
        }
        infoEl.innerText = topicTexts.join('>')
    })
})();
