![QA Tool](https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout.png)

# **Tool Descriptions**<br>
## Page Information Panel :new:
:one: [Dealer Name](#dealer-name)<br>
:two: [Web-ID](#web-id)<br>
:three: [Page Name](#page-name)<br>
:four: [H Tags](#h-tags)<br>

## QA Tools Panel :new:
:one: [Image Checker](#image-checker)<br>
:two: [Link Checker](#link-checker) :sparkles:<br>
:three: [Spell Checker](#spellcheck-page)<br>
:four: [WebPageTest](#web-page-test)<br>
:five: [404 Link Checker](#404-link-checker) :sparkles:<br>

## Other Tools Panel :new:
:one: [Show Navigation](#show-navigation)<br>
:two: [SEO Simplify](#seo-simplify)<br>

## Toggles Panel :new:
:one: [Refresh Button](#refresh-button)<br>
:two: [Hide Preview Toolbar](#hide-preview-toolbar)<br>

## URL Modifiers Panel :new:
:one: [Auto Apply Modifiers](#auto-apply-parameters)<br>
:two: [NextGen Parameter](#nextgen-parameter)<br>
:three: [Show Autofill Tags](#show-autofill-tags)<br>
 
<br>
<br>

---
---

<br>
<br>

![Page Information](https://github.com/cirept/NextGen/blob/master/images/QA_tool_layout_pageinformation.png)

# **Page Information Panel**<br>

This panel shows all important information for the current CDK website you are viewing.<br>

### Features<br>
Clicking on the info area will copy the text to your clipboard.  There will be no notification.

![Page Information Highlight Feature](https://github.com/cirept/NextGen/blob/master/videos/pageInfoHighlight_paste.gif)

<br>
<br>

---
---

<br>
<br>

## **Dealer Name**<br>

This area will display the current dealer's ***NAME*** of the CDK site you are viewing.  This dealer name should be the same name as the dealer's "Account" name in Salesforce.

![Dealer Name](https://github.com/cirept/NextGen/blob/master/images/dealerNameFocus.png)

<br>
<br>

---
---

<br>
<br>

## **Web ID**<br>

This area will display the current dealer's ***WEB-ID*** of the CDK site you are viewing.  This web-id should be the same name as the dealer's "WebID" name in Salesforce.  This is also used to navigate to the dealer's site in WSM for editting.

![Web ID](https://github.com/cirept/NextGen/blob/master/images/webIDFocus.png)

<br>
<br>

---
---

<br>
<br>

## **Page Name**<br>

This area will display the current ***PAGE NAME*** of the CDK site you are viewing.  This information is what the 'generic' page name of the page is called.  This will help navigate to a specific page while editting the site in WSM.<br>

*e.g. LandingPage, HoursAndDirections, MiscPage.*

![Page Name](https://github.com/cirept/NextGen/blob/master/images/pageNameFocus.png)

<br>
<br>

---
---

<br>
<br>

## **H Tags**<br>

This area will display the current h tags on the current page you are viewing.  Any h tags that have a Zero (0) value will be highlighted in orange.<br>

***Clicking on the area will bring a pop up with all the h tags displayed***

![H Tag](https://github.com/cirept/NextGen/blob/master/images/hTagFocus.png)

<br>
<br>

---
---

<br>
<br>

# **QA Tools Panel**<br>

This panel has the main QA tools for checking the site.

*pic of qa tools panel

## **Show Navigation**<br>

The navigation menu will display all sub-navigation items.  This will allow for users to easily check out each sub-navigation items.


### **Features**

1. When clicking on any subnavigation item, it will turn the link a different color.<br>
   * Added to help keep track of what links you have already checked.

Show Navigation Functionality | Show Navigation Legend
----------------------------- | ----------------------
![Show Navigation Functionality](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/showNavigation.png) | ![Show Navigation Legend](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/showNavigationLegend.png)


### TIP:<br>
>*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*


<br>
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>


## **Link checker**<br>
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

### TIP:<br>
>*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*


<br>
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>


## **Image Checker**<br>
All images on the page will be highlighted in specific colors that tell the user, at a glance, what images have and do not have alt text

Image Checker Functionality | Image Checker Legend
----------------------------- | ----------------------
![Show Navigation Functionality](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/imageAltChecker.png) | ![Show Navigation Legend](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/imageCheckerLegend.png)


<br>
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>


## **Spellcheck Page**<br>
This tool will send the current page to be spell checked via third party website.<br>


**Functionality**


A new tab will open with the page already queued up for spell checking.  Once the spell checking is complete the page will autofill with all the ***possible*** miss-spelled words.

Spell Check Results Example |
----------------------------- |
![Spell Check Results](https://cdn.rawgit.com/cirept/NextGen/367ce2a9/images/spellCheck.png) |


<br>
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>


## **404 Checker**<br>
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
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>


## **Web Page Test**<br>

This tool Will send in a query to WebPageTest.org of the currently viewed page.  When clicking 'Web Page Test' button, a submenu will appear with advanced settings.  You can set the settings to your liking or leave them alone.  The default settings will result in a typical test.  **This tool works for both TETRA and NEXTGEN.**

<br>
### Functionality

A new tab will open with the page already queued up for speed testing.  Once the testing has been completed the results of the test will be displayed.

>
>The results will show the page load times for the site. The results page will also help with determining what is causing slow load times if necessary.<br>
>
>Benchmark for desktop site = load time < 10 sec.
>

<br>
### Features
###### Enter Email

Filling out this field with your work email (e.g. firstName.lastName@cdk.com) will send you an email when your tests have been completed.  The email will have a link in there that will lead you to the results page.

###### Choose Browser

This setting will change the browser that your tests will be conducted in.  The three (3) major browsers are available to choose from if you so please.  By default IE11 is the ideal test candidate and should always be set as the browser to test in.  The only scenario that the browser settings should be changed is in the event that the IE11 servers are done, at which point selecting any of the remaining two (2) browsers will be necessary.  It is highly unlikely that all three (3) browser servers will be done at once.

###### Choose Key

This setting has been introduced to compensate for the ever increasing number of people that is using this tool.  **Each key is alotted a total of 200 tests per day.**  ***Every query request sent by this tool results in a total of three (3) tests*** to be made, so as you can see that reaching that 200 limit per day can be quite easy.  In the event that you receive an error message upon viewing the results page on WebPageTest.org mentioning the limit has been reached for the day, please choose a different key from the drop down and send in another test.






In the "Advanced Settings" (below the button) you are able to enter an email address and change the browser you would like to test in.

This email address will recieve an email once the testing has been completed with a link that leads to the results page.  Simply leave it blank if this feature isn't desired.

By default the testing is set to IE11, please do not change this unless necessary.  IE11 would be the best test case as it is commonly the slowest amoungst all the 'popular' browsers.

****update****<br>
Key Selection, if you ever recieve the error that is along the lines of "limit has been reached for day" please choose a different key and submit another test.


WebPageTest Settings | WebPageTest Prompt
----------------------------- | ----------------------
![WebPageTest Settings](https://cdn.rawgit.com/cirept/NextGen/e101c74d/images/webPageTestSettings.png) | ![WebPageTest Prompt](https://cdn.rawgit.com/cirept/NextGen/e101c74d/images/webPageTestPrompt.png)


<br>
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>


## **404 Link Checker**<br>
Will send in a query to WebPageTest.org of the currently viewed page.  **This tool works for both TETRA and NEXTGEN.**


**Functionality**

A new tab will open with the page already queued up for speed testing.  Once the testing has been completed the results of the test will be displayed.

>
>The results will show the page load times for the site. The results page will also help with determining what is causing slow load times if necessary.<br>
>Benchmark for desktop site = load time < 10 sec.
>

**Features**

In the "Advanced Settings" (below the button) you are able to enter an email address and change the browser you would like to test in.

This email address will recieve an email once the testing has been completed with a link that leads to the results page.  Simply leave it blank if this feature isn't desired.

By default the testing is set to IE11, please do not change this unless necessary.  IE11 would be the best test case as it is commonly the slowest amoungst all the 'popular' browsers.

****update****<br>
Key Selection, if you ever recieve the error that is along the lines of "limit has been reached for day" please choose a different key and submit another test.


WebPageTest Settings | WebPageTest Prompt
----------------------------- | ----------------------
![WebPageTest Settings](https://cdn.rawgit.com/cirept/NextGen/e101c74d/images/webPageTestSettings.png) | ![WebPageTest Prompt](https://cdn.rawgit.com/cirept/NextGen/e101c74d/images/webPageTestPrompt.png)


<br>
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>
 
 
# **Other Tools Panel**<br>


## **Show Navigation**<br>

The navigation menu will display all sub-navigation items.  This will allow for users to easily check out each sub-navigation items.  
**This tool works for both TETRA and NEXTGEN.**


**Features**

1. When clicking on any subnavigation item, it will turn the link a different color.<br>
   * Added to help keep track of what links you have already checked.

Show Navigation Functionality | Show Navigation Legend
----------------------------- | ----------------------
![Show Navigation Functionality](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/showNavigation.png) | ![Show Navigation Legend](https://cdn.rawgit.com/cirept/NextGen/5567c3d4/images/showNavigationLegend.png)


### TIP:<br>
>*Show Navigation + Link Checker can and should be used together to verify links in the navigation are correct.*


<br>
[Back to Top](#tool-descriptions)
<br>

---
---

<br>
<br>


## **SEO Simplify**<br>

This tool will aid in formatting SEO text that is taken from a live site that is formatted using css.  This tool will provide a simplified version of the code you input.  Ready for pasting into a NextGen card.<br>
**This tool works for both TETRA and NEXTGEN.**

*pic here

<br>
<br>

# **Toggles Panel**<br>

## **Refresh Button**<br>

This tool will allow access to a refresh button that will provide a similar functionality as using the keyboard shortcut ctrl+f5 on a webpage.

*pic here


<br>
<br>


## **Hide Preview Toolbar**<br>

This tool will hide the PCE toolbar that appears at the top of CDK sites.<br>
**This tool works for both TETRA and NEXTGEN.**


<br>
<br>

----
----

<br>
<br>


# **URL Modifiers Panel**<br>


## **Auto Apply Modifiers**<br>

This tool allows the tool to automatically apply the URL parameters of the URL modifications within this panel.  When switching this toggle on, it will determine if the current page you are viewing has the desired URL parameters added to it.  If the URL is missing a parameter the page will automatically refresh with the URL parameter added to it.

Test Scenario<br>
- e.g. *current URL* = http://nitra.proof.gmpsdealer.com/content15<br>
- I want to see the NEXTGEN version of my sandbox TETRA site and also want to make sure that all subsequent windows that I open are also the NEXTGEN version of my sandbox site.<br>
1.   I switch the **'nextgen parameters?'** toggle **ON**<br>
2.   Then I switch the **'auto apply modifiers?'** toggle **ON**.

- This will cause the page to refresh and the NEXTGEN version of the site visible.<br>
- *new URL* = http://nitra.proof.gmpsdealer.com/content15?nextGen=true<br>
- These settings will also automatically apply 'nextGen=true' to all windows that I open from now on, until I turn the 'auto apply modifiers?' toggle ***off***


<br>
<br>


## **Nextgen Parameters?**<br>

This tool controls the logic of the 'auto apply modifiers' toggle.  When switching this toggle into the **ON** or **OFF** position will cause the main tool to act differently.  **This tool works in both TETRA and NEXTGEN.  **This is also how you control which version of the tool you want touse.**

### ON position *pic here

This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"nextGen=true"*** is present in the URL.


- If the parameter is not detected the tool will refresh the page with the parameter added to it.
 	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~
 	- **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=true 
- If ***"nextGen=false"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.
	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?nextGen=false~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=true  
- If  ***"nextGen=true"*** is detected in the URL, nothing will happen.  :]
	- **URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=true

<br>
### OFF position *pic here

This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"nextGen=false"*** is present in the URL.
- If the parameter is not detected the tool will refresh the page with the parameter added to it.
	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=false 
- If ***"nextGen=true"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.
 	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?nextGen=true~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?nextGen=false 
- If ***"nextGen=false"*** is detected in the URL, nothing will happen. :]
	- http://nitra.proof.gmpsdealer.com/content15?nextGen=false


<br>
<br>


## Show Autofill Tags?<br>

This tool controls the logic of the 'auto apply modifiers' toggle.  When switching this toggle into the **ON** or **OFF** position will cause the main tool to act differently.  **This tool works in both TETRA and NEXTGEN.**

### ON position *pic here

This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"disableAutofill=true"*** is present in the URL.


- If the parameter is not detected the tool will refresh the page with the parameter added to it.
 	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~
 	- **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true 
- If ***"disableAutofill=false"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.
	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true  
- If  ***"disableAutofill=true"*** is detected in the URL, nothing will happen.  :]
	- **URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true

<br>
### OFF position *pic here

This will cause the 'auto apply modifiers' tool (when switched on) to search the current URL and see if ***"disableAutofill=false"*** is present in the URL.
- If the parameter is not detected the tool will refresh the page with the parameter added to it.
	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false 
- If ***"disableAutofill=true"*** is detected in the URL, the page will refresh with the parameter now having a ***false*** value.
 	- **OLD URL** = ~~http://nitra.proof.gmpsdealer.com/content15?disableAutofill=true~~
    - **NEW URL** = http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false 
- If ***"disableAutofill=false"*** is detected in the URL, nothing will happen. :]
	- http://nitra.proof.gmpsdealer.com/content15?disableAutofill=false
