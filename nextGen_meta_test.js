// ==UserScript==
// @name NextGen QA Toolbar
// @namespace www.cobaltgroup.com/
// @author Eric Tanaka
// @include http:*
// @include https:*
// @description NextGen Migration Toolbar
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require https://use.fontawesome.com/3953f47d82.js
// @require https://rawgit.com/cirept/NextGen/master/nextGen_ToolBox.js
// @run-at document-end
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_info
// @grant GM_listValues
// @noframes
// ==/UserScript==

// ----------------------------------------
// CHANGELOG
// ----------------------------------------

/*
v3.2.2 changes (3/7/2017)
----------------------------------------
- Added "Choose Key" option
-- Will address the "The test request will exceed the daily test limit for the given API key" that is received.

v3.2.1 change (3/3/2017)
----------------------------------------
- toolbar works on nextgen live sites
- Refresh button placement issue
- Re-worked NextGen toggle functionality
- Hid the NextGen toggle on live sites, shouldn't be needed
- Fixed 'autofill toggle' to work on live sites

v3.2 change (3/2/2017)
----------------------------------------
- Updated thickness of border around link checker "Verify URL"
- Moved "show navigation" and "link checker" tools closer together for easier use.
- Adjusted hints in the legends to mouse click
- Adjusted location of reload button
 */
