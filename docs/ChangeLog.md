# v3.2.7 changes (4/5/2017)
* Fixed the 404 Link checker. :exclamation:
  * It was automatcially fixing the issues that was found by building out a completely new, WORKING link
* Moved 'Show Navigation' tool into the 'Other Tools' Panel
<br><br>  
----------------------------------------
<br><br>
# v3.2.6 changes (3/30/2017)
* Combined outdated link checker into the link checker tool. :exclamation:
  * Added an additional color to the legend for 'outdated' flagged links.
  * A teal border will appear around the link. instructions will get updated soon with pictures
* Disabled the 404 checker tool on NEXTGEN, there are some bugs that broke it during previous updates. Time is needed to discover what caused the issue. :exclamation:
<br><br>  
----------------------------------------
<br><br>
# v3.2.5.3 changes (3/30/2017)
* Update v3.2.5.2 has updates not worth mentioning.  :]
* Disabled 404 link checker for NEXTGEN :exclamation:
  * The tool was flagging links green even though it lead to a 404 page.  The tool works on TETRA.  Further investigation is needed to resolve the issue.  Removing feature until a fix has been made.
<br><br>  
----------------------------------------
<br><br>
# v3.2.5.1 changes (3/24/2017)
* Fixed issue with search criteria on VSR and modelshowroom pages :exclamation:
* Added h tag display function to 'H Tags' in Page Information Panel :new:
  * Click on the H Tag counts in Page Information Panel for additional information.
<br><br>  
----------------------------------------
<br><br>
# v3.2.5 changes (3/20/2017)
* Fixed issue with'link checker' tool not properly highlighting link that open in a new tab
  * Custom created NextGen links have a target='custom'.
    * Added this check to the tool decision structure
<br><br>  
----------------------------------------
<br><br>
# v3.2.4 changes (3/17/2017)
* Fixed issue with toolbar not working in FireFox
  * Web pages no longer have jQuery added to site
  * Web pages no longer have fontAwesome added to site ([ionIcons](http://ionicons.com/) is now being used)
    * Modified code to manually add files to site
<br><br>  
----------------------------------------
<br><br>
# v3.2.3 changes (3/17/2017)
* Combined TETRA and NEXTGEN toolbars into one. :new:
  * Toolbar will customize to the current site you are viewing, TETRA or NEXTGEN
    * Color theme will change
    * Position on page will change
    * Overall design has changed
  * Tools will be enabled/disabled; some tools not needed on NEXTGEN
## Tool Changes
* H Tags Display added to "Page Information" panel :new:
  * Will display all h Tag counts on currently viewed page
    * Will highlight in orange all h tag counts that equal 0
* SEO Simplify available on NEXTGEN and TETRA :exclamation:
  * Functionality changed
    * SEO output will now overlay on the page with the text inside.
## Misc Changes
* Toolbar now remembers if you closed the toolbar. :new:
  * e.g. User minimizes the toolbar (clicking the 'X' at the top of the toolbar), the user opens a new page.  The toolbar will remain minimized until the user chooses to restore the toolbar.<br>
* Added minimize function. :new:
  * Click the 'x' at the top
    * The toolbar will stay minimized until restored.
  
## Instructions Update
* [Coming Soon](https://github.com/cirept/NextGen/blob/master/README.md)<br>
<br><br>  
----------------------------------------
<br><br>
# v3.2.2 changes (3/7/2017)
- Added "Choose Key" option
- Will address the "The test request will exceed the daily test limit for the given API key" that is received.
<br><br>
----------------------------------------
<br><br>
# v3.2.1 change (3/3/2017)
- toolbar works on nextgen live sites
- Fixed refresh button placement issue
- Re-worked NextGen toggle functionality
- Hid the NextGen toggle on live sites, shouldn't be needed
- Fixed 'autofill toggle' to work on live sites
<br><br>
----------------------------------------
<br><br>
# v3.2 change (3/2/2017)
- Updated thickness of border around link checker "Verify URL"
- Moved "show navigation" and "link checker" tools closer together for easier use.
- Adjusted hints in the legends to mouse click
- Adjusted location of reload button
<br><br>
----------------------------------------
