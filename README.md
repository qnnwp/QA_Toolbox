---
---
# Toolbar Information
---
---

<br>
<br>

## Table of Contents

[Tampermonkey Install Instructions](#tampermonkey-install-instructions)

[Toolbar Instructions](#tool-descriptions)

<br>
<br>

---
---
## Tampermonkey Install Instructions
---
---

<br>
<br>

*Need Tampermonkey Extension/Add-on*

[Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

[Tampermonkey for FireFox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

<br>

====

<br>

### 1. Click the add-on icon once you have installed it into your browser

![Click Addon Icon](https://cdn.rawgit.com/cirept/NextGen/master/images/clickIcon.png)

<br>

===

<br>

### 2. Click on 'Dashboard' to add a custom script

![Click Dashboard](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/clickDashboard.png)

<br>

===

<br>

### 3. Click the icon to add a new userscript

![Click New UserScript Icon](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/clickNewScript.png)

<br>

===

<br>

### 4. Paste the toolbar code into the text area

![Paste JS Code](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/pasteCode.png)

Link to Latest Toolbar Code:<br>
<a href="https://github.com/cirept/NextGen/blob/master/nextGen_meta.js" target="_blank">https://github.com/cirept/NextGen/blob/master/nextGen_meta.js *link will open in a new window*</a>

<br>

===

<br>

### 5. Click the floppy disk to save your changes

![Click Floppy Disk](https://cdn.rawgit.com/cirept/NextGen/23d750e3/images/clickSave.png)

<br>

===

<br>

**6. Done.  The toolbar will show up on any Proof/Live CDK site**

<br>

#### TIP:<br>
> If using the TETRA toolbar, you will need to turn it off as most of the features are not compatible with the Next Gen platform.
Features from the TETRA toolbar will rewritten for the NEXTGEN platform slowly.


<br>
<br>

---
---
## Tool Descriptions
---
---

<br>
<br>


### Show Navigation<br>


The navigation menu will display all all sub-navigation items.  This will allow for users to easily check out each sub-navigation items.


**Features**

1. When clicking on any subnavigation item, it will turn the link a different color.<br>
   * Added to help keep track of what links you have already checked.

Show Navigation Functionality | Show Navigation Legend
----------------------------- | ----------------------
![Show Navigation Functionality](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/showNavigation.png) | ![Show Navigation Legend](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/showNavigationLegend.png)


#### TIP:<br>
>*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*


<br>
<br>

===
===

<br>
<br>


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
>&#35;<br>
>f_<br>
>www<br>
>http<br>

Link Checker Functionality | Link Checker Legend
----------------------------- | ----------------------
![Link Checker Functionality](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/linkChecker.png) | ![Link Checker Legend](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/linkCheckerLegend.png)

#### TIP:<br>
>*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*


<br>
<br>

===
===

<br>
<br>


### Image Checker<br>
All images on the page will be highlighted in specific colors that tell the user, at a glance, what images have and do not have alt text

Image Checker Functionality | Image Checker Legend
----------------------------- | ----------------------
![Show Navigation Functionality](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/imageAltChecker.png) | ![Show Navigation Legend](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/imageCheckerLegend.png)


<br>
<br>

===
===

<br>
<br>


### Spellcheck Page<br>
This tool will send the current page to be spell checked via third party website.<br>


**Functionality**


A new tab will open with the page already queued up for spell checking.  Once the spell checking is complete the page will autofill with all the ***possible*** miss-spelled words.

Spell Check Results Example |
----------------------------- |
![Spell Check Results](https://cdn.rawgit.com/cirept/NextGen/367ce2a9/images/spellCheck.png) |


<br>
<br>

===
===

<br>
<br>


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


404 Checker Functionality | 404 Checker Legend
----------------------------- | ----------------------
![404 Checker Functionality](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/link404checker.png) | ![404 Checker Legend](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/link404checkerLegend.png)

<br>
<br>

===
===

<br>
<br>

### Web Page Test<br>
Will send in a query to WebPageTest.org of the currently viewed page.


**Functionality**

A new tab will open with the page already queued up for speed testing.  Once the testing has been completed the results of the test will be displayed.

>The results will show the page load times for the site. The results page will also help with determining what is causing slow load times if necessary.<br>
>Benchmark for desktop site = load time < 10 sec.


**Features**

In the "Advanced Settings" (below the button) you are able to enter an email address and change the browser you would like to test in.

This email address will recieve an email once the testing has been completed with a link that leads to the results page.  Simply leave it blank if this feature isn't desired.

By default the testing is set to IE11, please do not change this unless necessary.  IE11 would be the best test case as it is commonly the slowest amoungst all the 'popular' browsers.


WebPageTest Settings | WebPageTest Prompt
----------------------------- | ----------------------
![WebPageTest Settings](https://cdn.rawgit.com/cirept/NextGen/e101c74d/images/webPageTestSettings.png) | ![WebPageTest Prompt](https://cdn.rawgit.com/cirept/NextGen/e101c74d/images/webPageTestPrompt.png)
