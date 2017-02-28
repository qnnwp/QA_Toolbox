// ==UserScript==
// @name NextGen Migration Toolbar
// @namespace www.cobaltgroup.com/
// @version 3.2
// @author Eric Tanaka
// @description NextGen Migration Toolbar
// @downloadURL https://cdn.rawgit.com/cirept/NextGen/master/nextGen_meta.js
// @match http://*/*/?*nextGen=true*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://use.fontawesome.com/3953f47d82.js
// @require https://cdn.rawgit.com/cirept/NextGen/v3.2/nextGen_ToolBox.js
// @run-at document-end
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_info
// @noframes
// ==/UserScript==


//// // @include http:*
//// // @downloadURL https://media-dmg.assets-cdk.com/teams/repository/export/1d6/e1310a29f100582550050568ba825/1d6e1310a29f100582550050568ba825.js
//// // @require https://media-dmg.assets-cdk.com/teams/repository/export/1d6/dd878a29f100580880050568bfc31/1d6dd878a29f100580880050568bfc31.js
// ----------------------------------------
// CHANGELOG
// ----------------------------------------
/*
v3.2 changes (2/28/2017)
----------------------------------------
- Moved files over to github for easier editting
-- Prepped meta tag for gitHub migration
---- require URL updated for future release v3.2
---- updated download URL to master meta URL
- Updated meta tag to only run toolbar on URL's that contain 'nextGen=true'

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
