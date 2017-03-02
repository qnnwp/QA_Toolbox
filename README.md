# Toolbar Information
[Tampermonkey Install Instructions](#tampermonkey-install-instructions)

[Toolbar Instructions *coming soon*](#)

## Tampermonkey Install Instructions
*Need Tampermonkey Extension/Add-on*

[Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

[Tampermonkey for FireFox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

====

### 1. Click the add-on icon once you have installed it into your browser

![Click Addon Icon](https://cdn.rawgit.com/cirept/NextGen/master/images/clickIcon.png)

===

### 2. Click on 'Dashboard' to add a custom script

![Click Dashboard](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/clickDashboard.png)

===

### 3. Click the icon to add a new userscript

![Click New UserScript Icon](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/clickNewScript.png)

===

### 4. Paste the toolbar code into the text area

![Paste JS Code](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/pasteCode.png)

===

### 5. Click the floppy disk to save your changes

![Click Floppy Disk](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/clickSave.png)

===

**6. Done.  The toolbar will show up on any Proof/Live CDK site**

===

> If using the TETRA toolbar, you will need to turn it off as most of the features are not compatible with the Next Gen platform.
Features from the TETRA toolbar will rewritten for the NEXTGEN platform slowly.

<br>
<br>
----
----
----
<br>
<br>

## Tool Descriptions

### Show Navigation<br>

The navigation menu will display all all sub-navigation items.  This will allow for users to easily check out each sub-navigation items.

**Features**

1. When clicking on any subnavigation item, it will turn the link a different color.<br>
   * Added to help keep track of what links you have already checked.

#### TIP:<br>
*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*

----

### Link checker<br>
All links on the page will be highlighted with specific colors according to the validity of the link.

**Features**

*'HAS NO title text'*<br>
>All links that DO NOT HAVE title text in the link will be flagged<br>

*'HAS title text'*<br>
>All links that HAVE title text in the html code will be flagged<br>

*'OPENS IN A NEW WINDOW'*<br>
>All links that have 'targets' with these values will be flagged<br>
>_blank<br>
>_new<br>
>custom<br>

*'EMPTY OR UNDEFINED URL'*<br>
>All links that do not contain an href value will be flagged<br>

*'VERIFY URL'*<br>
>All links that have href these values will be flagged<br>
>#<br>
>f_<br>
>www<br>
>http

#### TIP:<br>
*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*

----

### Image Checker<br>
All images on the page will be highlighted in specific colors that tell the user, at a glance, what images have and do not have alt text

----

### Spellcheck Page<br>
This tool will send the current page to be spell checked via third party website.<br>

**Functionality**

A new tab will open with the page already queued up for spell checking.  Once the spell checking is complete the page will autofill with all the ***possible*** miss-spelled words.

----

### 404 Checker<br>
All the links on the page will be tested for validity and highlight the links according to the result.

**Functionality**

*'Link to be Tested'*
>All links will initially have this coloring and be subsequently over-written depending the results of validity testing for each link.

*'Link is Working'*
>All links that result in a working page will be flagged.

*'Verify Link Works'*
>In addition to links that result in a 404 error, these other situations will also be flagged<br>
>
>Links that off of the site, other domains, will be flagged<br>
>e.g. facebook.com, google.com, google map links<br>
>
>Links that do not contain an href
>
>Links that are meant for mobile devices
>e.g. tel:+18009098244

----

### Web Page Test<br>
Will send in a query to WebPageTest.org of the currently viewed page.

**Functionality**

A new tab will open with the page already queued up for speed testing.  Once the testing has been completed the results of the test will be displayed.

>If unfamiliar with the results page, please 

**Features**

In the "Advanced Settings" (below the button) you are able to enter an email address and change the browser you would like to test in.

This email address will recieve an email once the testing has been completed with a link that leads to the results page.  Simply leave it blank if this feature isn't desired.

By default the testing is set to IE11, please do not change this unless necessary.  IE11 would be the best test case as it is commonly the slowest amoungst all the 'popular' browsers.
