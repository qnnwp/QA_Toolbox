// ==UserScript==
// @name NextGen Migration Toolbar
// @namespace www.cobaltgroup.com/
// @version 3.1.9
// @author Eric Tanaka
// @description NextGen Migration Toolbar
// @downloadURL https://media-dmg.assets-cdk.com/teams/repository/export/1d6/e1310a29f100582550050568ba825/1d6e1310a29f100582550050568ba825.js
// @include http:*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://use.fontawesome.com/3953f47d82.js
// @require https://media-dmg.assets-cdk.com/teams/repository/export/1d6/dd878a29f100580880050568bfc31/1d6dd878a29f100580880050568bfc31.js
// @run-at document-end
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_info
// @noframes
// ==/UserScript==

/* ---------------------------------------- */
/* CHANGELOG
2/23/2017
- Added "show autofill tags?" toggle
---- Removed autofill button

2/16/2017
- Added legend to Outdate links tool
---- Tool will highlight 'dated links' in pink
---- Tool will highlight 'good' links in green
- Legend will show this information
 - Added "Outdate Links" tool
 - Tool will highlight all dated links in Orange
 */
/* ---------------------------------------- */
