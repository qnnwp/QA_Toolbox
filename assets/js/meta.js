// ==UserScript==
// @name QA Toolbox v3.3.1.2-testing
// @namespace www.cobaltgroup.com/
// @version 3.3.1.2-testing
// @author Eric Tanaka
// @include http:*
// @include https:*
// @downloadURL https://raw.githubusercontent.com/cirept/QA_Toolbox/master/assets/js/meta.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require https://use.fontawesome.com/3953f47d82.js
// @require https://raw.githubusercontent.com/cirept/Typo.js/master/typo/typo.js
// @require https://raw.githubusercontent.com/cirept/QA_Toolbox/3.3.1.1/assets/js/toolBox.js
// @resource toolboxStyles https://raw.githubusercontent.com/cirept/QA_Toolbox/3.3.1.1/assets/css/toolbox.css
// @run-at document-end
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_info
// @grant GM_listValues
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant resource
// @noframes
// ==/UserScript==

var cusCSS = GM_getResourceText('toolboxStyles');
GM_addStyle(cusCSS);
