# Tool Descriptions<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout.png"></p>

***click on the links to jump to the tool descriptions***<br>

## Page Information Panel :new:<br>
[Dealer Name](#dealer-name)<br>
[Web-ID](#web-id)<br>
[Page Name](#page-name)<br>
[H Tags](#h-tags)<br>

[Jump To Page Info Section](#page-information-panel)<br><br><br>

## QA Tools Panel :new:<br>
[Image Checker](#image-checker)<br>
[Link Checker](#link-checker) :sparkles:<br>
[Spell Checker](#spellcheck-page)<br>
[WebPageTest](#web-page-test)<br>
[404 Link Checker](#404-link-checker) :sparkles:<br>

[Jump To QA Tools Panel Section](#qa-tools-panel)<br><br><br>

## Other Tools Panel :new:<br>
[Show Navigation](#show-navigation)<br>
[SEO Simplify](#seo-simplify)<br>

[Jump To Other Tools Panel Section](#other-tools-panel)<br><br><br>

## Toggles Panel :new:<br>
[Refresh Button](#refresh-button)<br>
[Hide Preview Toolbar](#hide-preview-toolbar)<br>

[Jump To Toggles Panel Section](#toggles-panel)<br><br><br>

## URL Modifiers Panel<br>
[Auto Apply Modifiers](#auto-apply-modifiers)<br>
[NextGen Parameter](#nextgen-parameters)<br>
[Show Autofill Tags](#show-autofill-tags)<br>

[Jump To URL Modifiers Panel Section](#url-modifiers-panel)<br><br><br>

<a href="#page-information-panel-new">&nbsp;</a>

### Other Useful Links<br>
[Installation Instructions](https://github.com/cirept/NextGen/blob/master/guides/INSTALL.md)<br>
[Change Log](https://github.com/cirept/NextGen/blob/master/guides/CHANGELOG.md)<br>

<br>
<br>

---
---

<br>
<br>

# **Page Information Panel**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout_pageinformation.png">
</p>

- This panel shows all important information for the current CDK website you are viewing.<br>

### **Features**<br>

<p align="center"><br>
<img src ="https://github.com/cirept/NextGen/blob/master/gifs/pageInfoHighlight_paste.gif">
</p>

- Clicking on the info area will copy the text to your clipboard.<br>
***There will be no notification.***

<br>
<br>

[Back to Top](#page-information-panel-new)

---

<br>
<br>

## **Dealer Name**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/images/dealerNameFocus.png"><br>
</p>

- This area will display the current dealer's ***NAME*** of the CDK site you are viewing.<br>
- This dealer name should be the same name as the dealer's "Account" name in Salesforce.<br>

<br>
<br>

[Back to Top](#page-information-panel-new)

---

<br>
<br>

## **Web ID**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/images/webIDFocus.png"><br>
</p>

- This area will display the current dealer's ***WEB-ID*** of the CDK site you are viewing.<br>
- This web-id should be the same name as the dealer's "WebID" name in Salesforce.<br>
- This is also used to navigate to the dealer's site in WSM for editting.

<br>
<br>

[Back to Top](#page-information-panel-new)

---

<br>
<br>

## **Page Name**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/images/pageNameFocus.png"><br>
</p>

- This area will display the current ***PAGE NAME*** of the CDK site you are viewing.<br>
- This information is what the 'generic' page name of the page is called.<br>
- This will help navigate to a specific page while editting the site in WSM.<br>

*e.g. LandingPage, HoursAndDirections, MiscPage.*<br>

<br>
<br>

[Back to Top](#page-information-panel-new)

---

<br>
<br>

## **H Tags**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/images/hTagFocus.png"><br>
</p>

- This area will display the current h tags on the current page you are viewing.<br>
- Any h tags that have a Zero (0) value will be highlighted in orange.<br>

### ***Clicking on the area will bring a pop up with all the h tags displayed***<br>

<p align="center"><br>
<img src ="https://github.com/cirept/NextGen/blob/master/gifs/htagdisplay_DEMO.gif"><br>
</p>

<br>
<br>

[Back to Top](#page-information-panel-new)

---
---

<br>
<br>

# **QA Tools Panel**<br>

- This panel has the main QA tools for checking the site.<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout_qatools.png"><br>
</p>

<br>
<br>

[Back to Top](#qa-tools-panel-new)

---


<br>
<br>

## **Image Checker**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/gifs/imageAltCheckerDEMO.gif"><br>
</p>

- All images on the page will be highlighted in specific colors that will tell the user what images **have** and **do not have** alt text.<br>
- **If using this tool on a NEXTGEN site**, please scroll all the way to the bottom of the page to allow all images to load before running the tool.<br>
- Due to lazy loading, if the tool is run and some images do not have a box around the image please turn off the tool and rerun the tool with that image in view.<br>
***This tool works for both TETRA and NEXTGEN***<br>

### Turning the tool on:<br>

- Click the 'image alt checker' button inside the 'qa tools' panel.<br>

### Turning the tool off:<br>

- When you are done using the tool, simply click the "turn off" on the legend and the tool will turn itself off.<br>

### **Features**<br>

| Image Checker Functionality |
| ----------------------------- |
| <p align="center"><br><img src="https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/imageAltChecker.png"></p> |
| All images on the page will be highlighted with a green or red/pink box.  These colors will signify if the image **has** and **does not have** an alt text.<br>If the image has a green color on over the image, the ALT of the image will appear at the center. |


| Image Checker Legend |
| --- |
| <p align="center"><br><img src="https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/imageCheckerLegend.png"></p> |


<br>
<br>

[Back to Top](#qa-tools-panel-new)

---

<br>
<br>

## **Link checker**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/gifs/linkCheckerDEMO.gif"><br>
</p>

### **TIP:**<br>

>*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*

- All links on the page will be highlighted with specific colors according to the validity of the link.<br>
- There are various factors that the tool will use to categorize each link.<br>
- More detail on those factors are stated below.<br>
***This tool works for both TETRA and NEXTGEN***

### **Turning the tool on:**<br>

- Click the 'link checker' button inside the 'qa tools' panel.<br>

### **Turning the tool off:**<br>

- When you are done using the tool, simply click the "turn off" on the legend and the tool will turn itself off.<br>

### **Features**<br>

| Link Checker Legend |
|---|
| <p align="center"><br><img src="https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/linkCheckerLegend.png"><br></p> |
| ***'HAS NO title text'*** |
| All links that DO NOT HAVE title text in the link will be flagged |
| ***'HAS title text'*** |
| All links that HAVE title text in the html code will be flagged |
| ***'OPENS IN A NEW WINDOW'*** |
| All links that have 'targets' with these values will be flagged<br>_blank<br>_new<br>custom<br> |
| ***'EMPTY OR UNDEFINED URL'*** |
| All links that do not contain an href value will be flagged |
| ***'CHECK URL'*** |
| All links that have href these values will be flagged<br>&#35;<br>f_<br>>www<br>http |
| ***'PAGE NOT SUPPORTED'*** |
| All links that lead to a page that is no longer supported on NEXTGEN will have this border.<br>Please update the link to lead to a related page that is supported on NEXTGEN.<br><br>**Pages No Longer Supported on NEXTGEN**<br>1.	NewVehicleSearch<br>2.	PreOwnedVehicleSearch<br>3.	NewVehicleInfoForm<br>4.	PreOwnedVehicleInfoForm<br>5.	ExtendedProtection<br>6.	ExtendedProtectionDetails<br>7.	Affiliate<br>8.	AboutSpecials<br><br>***additional details to what page the links should be updated too will be coming soon***|


| Link Checker Functionality |
| --- |
| <p align="center"><br><img src="https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/linkChecker.png"></p> |
| The links will turn a highlighted color to signify that you have checked the link.  Added for ease of use when QA'ing |


<br>
<br>

[Back to Top](#qa-tools-panel-new)

---

<br>
<br>

## **Spellcheck Page**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/spellcheckDEMO.gif"></p>

- This tool will send the current page to be spell checked via third party website, W3.org.<br>

### **Features**<br>

- A new tab will open with the page already queued up for spell checking.<br>
- Once the spell checking is complete the page will autofill with all the ***possible*** miss-spelled words.<br>

| Spell Check Results Example |
| --- |
| <p align="center"><br><img src="https://cdn.rawgit.com/cirept/NextGen/367ce2a9/images/spellCheck.png"></p> |
| ***Please verify that all the words on the page is in fact spelt wrong*** |


<br>
<br>

[Back to Top](#qa-tools-panel-new)

---

<br>
<br>

## **Web Page Test**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/webpagetestDEMO.gif"></p>

- This tool will send in a query to WebPageTest.org of the currently viewed page.<br>
- When clicking 'Web Page Test' button, a submenu will appear with advanced settings. These default settings will result in a typical test and should only be changed under specific circumstances.<br>
***This tool works for both TETRA and NEXTGEN***<br>

### Turning the tool on:<br>

- Click the 'web page test' button inside the 'qa tools' panel.<br>

### **Features**<br>

###### Enter Email<br>

- Filling out this field with your work email (e.g. firstName.lastName@cdk.com) will send you an email when your tests have been completed.<br>

###### Choose Browser<br>

- This setting will change the browser that your tests will be conducted in.<br>
- The three (3) major browsers are available to choose from.<br>
- By default IE11 is the ideal test candidate and should always be set as the browser to test in.<br>
- The only scenario that the browser settings should be changed is in the event that the IE11 servers are down, at which point selecting any of the remaining two (2) browsers will be necessary.

###### Choose Key<br>

- This setting has been introduced to allow additional users to send in tests using this tool.<br>
**Each key is alotted a total of 200 tests per day.**<br>
***Every query request sent by this tool results in a total of three (3) tests*** to be made, so as you can see that reaching that 200 limit per day can be quite easy.<br>
- In the event that you receive an error message upon viewing the results page on WebPageTest.org mentioning the limit has been reached for the day, please choose a different key from the drop down and send in another test.<br>

## Results<br>

- Once the setting have been set up, hit the 'send test' button and your test will be sent in.<br>
- A new tab will open with the page already queued up for speed testing.<br>
- Once the testing has been completed the results of the test will be displayed.<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/webPageTestResults.jpg"></p>

>
>The results will show the page load times for the site. The results page will also help with determining what is causing slow load times if necessary.<br>
>
>Benchmark for desktop site = load time < 10 sec.
>


<br>
<br>

[Back to Top](#page-information-panel-new)

---

<br>
<br>

## **404 Link Checker**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/link404CheckerDEMO.gif"></p>

- This tool will check every link on the site and highlight the link according to what the results of the test is.<br>
- All the links on the page will be tested for validity and then will be highlighted accordingly.<br>
- For the most part only links that are internal links will be eligible to be flagged as 'Link is Real' due to security restrictions.<br>
***This tool works for both TETRA and NEXTGEN***<br>

### Turning the tool on:<br>

- Click the '404 link checker' button inside the 'qa tools' panel.<br>

### Turning the tool off:<br>

- When you are done using the tool, **please refresh the page** before running any other tool.<br>

### **Features**<br>

| 404 Link Checker Legend |
| --- |
| <p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/link404checkerLegend.png"></p> |
| ***'Absolute URL*'*** |
| All links that have a complete URL (e.g. http://nitra.wip.gmpsdealer.com/content15/VehicleSearchResults?search=new) as the link will be flagged.<br> All links that lead outside the site (e.g. https://confluence.cdk.com/display/DEV/CX+Innovation) will be flagged.<br> |
| ***'f_link'*** |
| All links that force the page to be framed in.<br>**This is more common on TETRA then in NEXTGEN** |
| ***'Empty URL'*** |
| All links that have an *empty* url.<br> All links that begin with a "#". *links are usually related to anchor links OR is meant to bring the user back to the homepage.*<br> All links that are meant for mobile. *phone number links on NEXTGEN that will. *e.g. phone link in the masthead on a NEXTGEN site* |
| ***'Link is Real'*** |
| All links that lead to an actual page will be flagged. |
| ***'404 Link'*** |
| All links that result in a 404 error (link leads to a page that doesn't exist) with be flagged and should be addressed. |


<br>
<br>

[Back to Top](#qa-tools-panel-new)

---
---

<br>
<br>


# **Other Tools Panel**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout_qatools.png"></p>

- These tools are here to ease the process of QA'ing a site.

<br>
<br>

[Back to Top](#other-tools-panel-new)

---

<br>
<br>

## **Show Navigation**<br>

<p align="center"><br>
<img src="https://github.com/cirept/NextGen/blob/master/gifs/showNavDEMO.gif"><br>
</p>

### **TIP:**<br>
>*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*

- This tool will allow the user to see all of the navigation menu without having to hover over the main navigation item.<br>
- All subnavigation items will display for easier QA checking.<br>
- When you are done using the tool, simply click the "turn off" on the legend and the tool will turn itself off.<br>
***This tool works for both TETRA and NEXTGEN***<br>

### **Turning the tool on:**<br>

- Click the 'show navigation' button inside the 'qa tools' panel.<br>

### **Turning the tool off:**<br>

- When you are done using the tool, simply click the "turn off" on the legend and the tool will turn itself off.<br>

| Show Navigation Legend |
| --- |
| <p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/showNavigationLegend.png"></p> |
| ***The "major page" color will only be applied when the tool is run on a TETRA site.  NEXTGEN has this feature disabled.*** |

### **Features**<br>

| Show Navigation Functionality |
| --- |
| <p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/showNavigation.png"></p> |
| When clicking on any subnavigation item, it will turn the link a different color to signify that you have checked the link.<br>***Added to help keep track of what links you have already checked.*** |

<br>
<br>

[Back to Top](#other-tools-panel-new)

---

<br>
<br>

## **SEO Simplify**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/seoSimplifyDEMO.gif"></p>

- This tool will aid in formatting SEO text that is taken from a live site that is formatted using css.<br>
- This tool will provide a simplified version of the code you input.  Ready for pasting into a NextGen card.<br>
***This tool works for both TETRA and NEXTGEN***<br>

### Turning the tool on:<br>

- Click the 'seo simplify' button inside the 'other tools' panel.<br>

### **Features**<br>

- After raw SEO text has been entered, a pop up will display with the 'simplified' SEO text.<br>
- All styles, italics, bold, center, underline, span tags will be removed.<br>
- The pop up will have display the SEO text according to the styles of the current page you are on.<br>
- Clicking in the text area will allow the user to copy all of the html code of the new SEO text.<br>

- To remove the pop up, click on the 'remove' button at the top of the pop up.<br>


<br>
<br>

[Back to Top](#other-tools-panel-new)

---

<br>
<br>


# **Toggles Panel**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout_toggles.png"></p>

- These tools are here to make for convenience's sake.<br>

<br><br>

[Back to Top](#toggles-panel-new)

---

<br><br>

## **Refresh Button**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/refreshButtonDEMO.gif"></p>

- This tool will allow access to a refresh button that will provide a similar functionality as using the keyboard shortcut ctrl+f5 on a webpage.<br>
- To hide/show the button, switch the control on/off.<br>
**This tool works for both TETRA and NEXTGEN.**


<br>
<br>

[Back to Top](#toggles-panel-new)

---

<br>
<br>


## **Hide Preview Toolbar**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/hidePreviewToolbarDEMO.gif"></p>

- This tool will hide the PCE toolbar that appears at the top of CDK sites.<br>
- To hide/show the button, switch the control on/off.<br>
**This tool works for both TETRA and NEXTGEN.**<br>


<br>
<br>

[Back to Top](#toggles-panel-new)

---
---

<br>
<br>


# **URL Modifiers Panel**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout_urlModifiers.png"></p>

<br><br>

[Back to Top](#url-modifiers-panel)

---

<br><br>

## **Auto Apply Modifiers**<br>

- This tool allows the tool to automatically apply the URL parameters of the URL modifications within this panel.<br>
- When switching this toggle on, it will determine if the current page you are viewing has the desired URL parameters added to it.<br>
- If the URL is missing a parameter the page will automatically refresh with the URL parameter added to it.<br>

Test Scenario<br>
- e.g. *current URL* = http://nitra.proof.gmpsdealer.com/content15<br>
    - I want to see the NEXTGEN version of my sandbox TETRA site and also want to make sure that all subsequent windows that I open are also the NEXTGEN version of my sandbox site.<br>
        1.   I switch the **'nextgen parameters?'** toggle **ON**<br>
        2.   Then I switch the **'auto apply modifiers?'** toggle **ON**.<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/nextgenToggleDEMO.gif"></p>

- This will cause the page to refresh and the NEXTGEN version of the site visible.<br>
- *new URL* = http://nitra.proof.gmpsdealer.com/content15?nextGen=true<br>
- These settings will also automatically apply 'nextGen=true' to all windows that I open from now on, until I turn the 'auto apply modifiers?' toggle ***off***<br>

### ***How To Use***<br>
1. Switch the toggles on for the URL parameters you want to add to the URL
    - Nextgen Parameters?  ON or OFF
    - Show Autofill Tags?  ON or OFF
2. Turn of 'Auto Apply Modifiers' switch

### ***How To Change Settings While 'Auto Apply Modifiers' Is Already Active***
1. Switch the toggles on/off for the URL parameters you want to add/remove to the URL
    - Nextgen Parameters?  ON or OFF
    - Show Autofill Tags?  ON or OFF
2. Refresh the page
    - Quickly toggle the "Auto Apply Modifiers" switch ON then OFF
    **OR**
    - If you have the "Refresh Button" turned on (in toggles panel), click that button
    **OR**
    - Do a manual refresh of the page


<br>
<br>

[Back to Top](#url-modifiers-panel)

---

<br>
<br>


## **Nextgen Parameters?**<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/nextgenToggleDEMO.gif"></p>

- This tool controls the logic of the 'auto apply modifiers' toggle.<br>
- When switching this toggle into the **ON** or **OFF** position will cause the main tool to act differently.<br>
- **This is also how you control which version of the tool you want to use.**<br>
***This tool works in both TETRA and NEXTGEN.***<br>

***If work is strictly related to NEXTGEN, please have this toggle always on to ensure that every page you view will be the NEXTGEN version of the page.***<br>

* There is an issue when going viewing a NEXTGEN site, you are suddenly shown the TETRA version.  This fixes that issue.<br>

---

### ON position<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/nextgenToggleON.png"></p>

- This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"nextGen=true"*** is present in the URL.<br>

- If the parameter is not detected the tool will refresh the page with the parameter added to it.<br>
     - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~<br>
     - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=true<br>
- If ***"nextGen=false"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.<br>
    - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?nextGen=false~~<br>
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=true<br>
- If  ***"nextGen=true"*** is detected in the URL, nothing will happen.  :]<br>
    - **URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=true<br>

---

### OFF position<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/nextgenparameterToggleOFF.png"></p>

This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"nextGen=false"*** is present in the URL.<br>
- If the parameter is not detected the tool will refresh the page with the parameter added to it.<br>
    - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~<br>
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=false<br>
- If ***"nextGen=true"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.<br>
     - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?nextGen=true~~<br>
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=false<br>
- If ***"nextGen=false"*** is detected in the URL, nothing will happen. :]<br>
    - http://nitra.proof.gmpsdealer.com/content15?nextGen=false<br>


<br>
<br>

[Back to Top](#url-modifiers-panel)

---

<br>
<br>


## Show Autofill Tags?<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/gifs/autofillToggleDEMO.gif"></p>

- This tool controls the logic of the 'auto apply modifiers' toggle.<br>
- When switching this toggle into the **ON** or **OFF** position will cause the main tool to act differently.<br>
**This tool works in both TETRA and NEXTGEN.**

---

### ON position<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/showautofillToggleON.png"></p>

- This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"disableAutofill=true"*** is present in the URL.<br>


- If the parameter is not detected the tool will refresh the page with the parameter added to it.<br>
     - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~<br>
     - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true<br>
- If ***"disableAutofill=false"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.<br>
    - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false~~<br>
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true<br>
- If  ***"disableAutofill=true"*** is detected in the URL, nothing will happen.  :]<br>
    - **URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true<br>

---

### OFF position<br>

<p align="center"><br><img src="https://github.com/cirept/NextGen/blob/master/images/showautofillToggleHighlightOFF.png"></p>


- This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"disableAutofill=false"*** is present in the URL.<br>
- If the parameter is not detected the tool will refresh the page with the parameter added to it.
    - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false
- If ***"disableAutofill=true"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.
     - **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false
- If ***"disableAutofill=false"*** is detected in the URL, nothing will happen. :]
    - http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false


<br>
<br>

[Back to Top](#url-modifiers-panel)

---

<br>
<br>

### Other Useful Links<br>
[Installation Instructions](https://github.com/cirept/NextGen/blob/master/guides/INSTALL.md)<br>
[Change Log](https://github.com/cirept/NextGen/blob/master/guides/CHANGELOG.md)<br>
