/*global jQuery, unsafeWindow, GM_getValue, GM_setValue, GM_setClipboard, GM_openInTab, GM_info, GM_listValues, GM_getResourceURL, window, document, NodeFilter, Typo */

(function () {
    "use strict";

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- GLOBAL FUNCTIONS ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    function setValue(variable, val) {
        GM_setValue(variable, val);
    }

    function clipboardCopy(variable) {
        GM_setClipboard(variable, 'text');
    }

    function getValue(variable) {
        return GM_getValue(variable, false);
    }

    function programVariables() {
        return GM_listValues();
    }

    function openNewTab(openThis) {
        GM_openInTab(openThis);
    }

    function getResourceURL(resource) {
        return GM_getResourceURL(resource);
    }

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- Build container for toolbox ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    var QAtoolbox = {
            init: function () {
                this.createElements();
                this.cacheDOM();
                this.attachTools();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                QAtoolbox.config = {
                    $legendContainer: jQuery('<div>').attr({
                        class: 'legendContainer'
                    }),
                    $toolboxContainer: jQuery('<div>').attr({
                        class: 'toolboxContainer'
                    }),
                    // ----------------------------------------
                    // Toolbar Resources
                    // ----------------------------------------
                    $toolboxStyles: jQuery('<style>').attr({
                        id: 'qa_toolbox',
                        type: 'text/css'
                    }),
                    $myFont: jQuery('<link>').attr({
                        href: getResourceURL('font'),
                        rel: 'stylesheet',
                    }),
                    $jQueryUI: jQuery('<link>').attr({
                        href: getResourceURL('jqueryUI'),
                        rel: 'stylesheet'
                    }),
                    $fontAwe: jQuery('<script>').attr({
                        src: getResourceURL('fontAwe')
                    }),
                    $typo: jQuery('<script>').attr({
                        src: getResourceURL('typo')
                    }),
                    $toolStyles: jQuery('<link>').attr({
                        id: 'toolStyles',
                        href: getResourceURL('toolStyles'),
                        rel: 'stylesheet'
                    }),
                    $animate: jQuery('<link>').attr({
                        id: 'animate',
                        hred: getResourceURL('animate'),
                        rel: 'stylesheet'
                    })
                };
            },
            cacheDOM: function () {
                this.head = jQuery('head');
                this.body = jQuery('body');
                this.phoneWrapper = jQuery('body .phone-wrapper');
            },
            attachTools: function () {
                this.head.append(QAtoolbox.config.$toolboxStyles);
                this.head.append(QAtoolbox.config.$myFont);
                this.head.append(QAtoolbox.config.$fontAwe);
                this.head.append(QAtoolbox.config.$typo);
                this.head.append(QAtoolbox.config.$toolStyles);
                this.head.append(QAtoolbox.config.$animate);
                this.body.before(QAtoolbox.config.$toolboxContainer);
                this.body.before(QAtoolbox.config.$legendContainer);
            }
        },
        /* ************************************************************************************************************************ */
        /* **************************************** PAGE INFO TOOLS **************************************** */
        /* ************************************************************************************************************************ */

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Dealership Name ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        dealerName = {
            init: function () {
                this.createElements();
                this.buildTool();
                this.cacheDOM();
                this.displayData();
                // return finished tool
                return this.returnTool();
            },
            createElements: function () {
                dealerName.config = {
                    $dealerNameContainer: jQuery('<div>').attr({
                        id: 'dealerNameContainer'
                    }),
                    // dealership name title
                    $dealerNameTitle: jQuery('<label>').attr({
                        class: 'tbLabel'
                    }).text('Dealer Name'),
                    // dealership name display
                    $dealerName: jQuery('<div>').attr({
                        class: 'tbInfo',
                        title: 'Copy Dealership Name',
                        id: 'dealerName'
                    })
                };
            },
            buildTool: function () {
                dealerName.config.$dealerNameContainer.append(dealerName.config.$dealerNameTitle);
                dealerName.config.$dealerNameContainer.append(dealerName.config.$dealerName);
            },
            cacheDOM: function () {
                this.$cm = unsafeWindow.ContextManager;
                this.dealerName = this.$cm.getDealershipName();
            },
            displayData: function () {
                dealerName.config.$dealerName.html(this.dealerName);
            },
            returnTool: function () {
                var panel = dealerName.config.$dealerNameContainer;
                return panel;
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Web Id ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        webID = {
            init: function () {
                this.createElements();
                this.buildTool();
                this.cacheDOM();
                this.displayData();
                // return finished tool
                return this.returnTool();
            },
            createElements: function () {
                webID.config = {
                    $webIDContainer: jQuery('<div>').attr({
                        id: 'webIDContainer'
                    }),
                    // web id title
                    $webIDTitle: jQuery('<label>').attr({
                        class: 'tbLabel'
                    }).text('Web-Id'),
                    // web is display
                    $webID: jQuery('<div>').attr({
                        class: 'tbInfo',
                        title: 'Copy web-id',
                        id: 'webID'
                    })
                };
            },
            buildTool: function () {
                webID.config.$webIDContainer.append(webID.config.$webIDTitle);
                webID.config.$webIDContainer.append(webID.config.$webID);
            },
            cacheDOM: function () {
                this.$cm = unsafeWindow.ContextManager;
                this.webID = this.$cm.getWebId();
            },
            displayData: function () {
                webID.config.$webID.html(this.webID);
            },
            returnTool: function () {
                var panel = webID.config.$webIDContainer;
                return panel;
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Page Name ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        pageName = {
            init: function () {
                this.createElements();
                this.buildTool();
                this.cacheDOM();
                this.displayData();
                this.hide();
                // return finished tool
                return this.returnTool();
            },
            createElements: function () {
                pageName.config = {
                    $pageNameContainer: jQuery('<div>').attr({
                        id: 'pageNameContainer'
                    }),
                    // page name title
                    $pageNameTitle: jQuery('<label>').attr({
                        class: 'tbLabel'
                    }).text('Page Name'),
                    // pange name display
                    $pageName: jQuery('<div>').attr({
                        class: 'tbInfo',
                        title: 'Copy Page Name',
                        id: 'pageName'
                    }),
                    // page label title
                    $pageLabelTitle: jQuery('<label>').attr({
                        class: 'tbLabel'
                    }).text('Custom Page Name'),
                    // page label display
                    $pageLabel: jQuery('<div>').attr({
                        class: 'tbInfo',
                        title: 'Copy Page Label',
                        id: 'pageLabel'
                    })
                };
            },
            buildTool: function () {
                pageName.config.$pageNameContainer.append(pageName.config.$pageNameTitle);
                pageName.config.$pageNameContainer.append(pageName.config.$pageName);
                pageName.config.$pageNameContainer.append(pageName.config.$pageLabelTitle);
                pageName.config.$pageNameContainer.append(pageName.config.$pageLabel);
            },
            cacheDOM: function () {
                this.$cm = unsafeWindow.ContextManager;
                this.pageName = this.$cm.getPageName();
                this.pageLabel = this.$cm.getPageLabel();
            },
            displayData: function () {
                pageName.config.$pageName.html(this.pageName);
                pageName.config.$pageLabel.html(this.pageLabel);
            },
            hide: function () {
                // hide pagel label elements if name
                // is same as page name
                var name = this.pageName,
                    label = this.pageLabel;
                if (name === label) {
                    pageName.config.$pageLabelTitle.hide();
                    pageName.config.$pageLabel.hide();
                }
            },
            returnTool: function () {
                var panel = pageName.config.$pageNameContainer;
                return panel;
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- H Tags ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        hTags = {
            init: function () {
                this.createElements();
                this.cacheDOM();
                this.buildTool();
                this.displayData();
                this.tagDetails();
                this.bindEvents();
                // return finished tool
                return this.returnTool();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                hTags.config = {
                    $hTagsContainer: jQuery('<div>').attr({
                        id: 'hTagsContainer'
                    }),
                    $hTagsTitle: jQuery('<label>').attr({
                        class: 'tbLabel'
                    }).text('h tags'),
                    $hTags: jQuery('<div>').attr({
                        title: 'Click to show hTags on page',
                        class: 'hTags'
                    }),
                    hTagsTotal: {
                        h1: 0,
                        h2: 0,
                        h3: 0,
                        h4: 0
                    },
                    hTags: {},
                    $removeBut: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut removeDiv',
                        value: 'REMOVE'
                    }),
                    $hTagDisplay: jQuery('<div>').attr({
                        class: 'hTagDisplay'
                    }),
                    $hTagDisplayContainer: jQuery('<div>').attr({
                        class: 'hTagContainer'
                    }),
                };
            },
            cacheDOM: function () {
                var key, total, tags;
                for (key in hTags.config.hTagsTotal) {
                    tags = jQuery(key);
                    hTags.config.hTags[key] = tags; // save matches for later
                    total = tags.length;
                    hTags.config.hTagsTotal[key] = total;
                }
                this.$body = jQuery('body');
            },
            buildTool: function () {
                hTags.config.$hTagsContainer.append(hTags.config.$hTagsTitle);
                hTags.config.$hTagsContainer.append(hTags.config.$hTags);

                hTags.config.$hTagDisplayContainer.append(hTags.config.$hTagDisplay);
                hTags.config.$hTagDisplayContainer.append(hTags.config.$removeBut);
            },
            displayData: function () {
                var html = '',
                    key,
                    $hContainer,
                    $hCount = jQuery('<span>').attr({
                        class: 'count'
                    });

                for (key in hTags.config.hTagsTotal) {
                    $hContainer = jQuery('<div>').attr({
                        class: 'hCount',
                        id: key + 'Count'
                    }).text(key + ' : ');

                    $hCount.text(hTags.config.hTagsTotal[key]);

                    this.highlightZero($hContainer, $hCount);

                    $hContainer.append($hCount);

                    html += $hContainer.prop('outerHTML');
                }
                hTags.config.$hTags.html(html);
            },
            tagDetails: function () {
                var key, a = 0,
                    length, html = '';

                for (key in hTags.config.hTags) {
                    length = hTags.config.hTags[key].length;
                    html += '- ' + key + ' -<br>';

                    a = 0;
                    for (a; a < length; a += 1) {
                        html += hTags.config.hTags[key][a].innerHTML + '<br>';
                    }
                }
                hTags.config.$hTagDisplay.html(html);
            },
            bindEvents: function () {
                hTags.config.$hTagsContainer.on('click', this.showDetails.bind(this));
                hTags.config.$removeBut.on('click', this.removeDisplay);
            },
            returnTool: function () {
                var panel = hTags.config.$hTagsContainer;
                return panel;
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            highlightZero: function ($hContainer, hCount) {
                var count = jQuery(hCount).text();

                if (count === '0') {
                    $hContainer.attr({
                        class: 'zeroTotal'
                    });
                }
            },
            showDetails: function () {
                this.$body.append(hTags.config.$hTagDisplayContainer);
            },
            removeDisplay: function () {
                // remove display container
                hTags.config.$hTagDisplayContainer.detach();
            },
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Page Information Panel ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        pageInformation = {
            init: function () {
                // initialize module
                this.createElements();
                this.buildPanel();
                this.cacheDOM();
                this.addTool();
                this.bindEvents();
                this.displayPanel();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                // main panel container
                pageInformation.config = {
                    $pageInfoContainer: jQuery('<div>').attr({
                        class: 'toolBox',
                        id: 'pageInfoContainer'
                    }),
                    // panel title
                    $pageInfoTitle: jQuery('<div>').attr({
                        class: 'panelTitle',
                        id: 'pageInfoTitle',
                        title: 'Click to Minimize/Maximize'
                    }).text('Page Information'),
                    // tool panel
                    $pageInfo: jQuery('<div>').attr({
                        class: 'toolsPanel',
                        id: 'pageInfo'
                    })
                };
            },
            buildPanel: function () {
                // attach panel elements to container
                pageInformation.config.$pageInfo
                    .append(dealerName.init())
                    .append(webID.init())
                    .append(pageName.init())
                    .append(hTags.init());
                // attach to continer
                pageInformation.config.$pageInfoContainer
                    .append(pageInformation.config.$pageInfoTitle)
                    .append(pageInformation.config.$pageInfo);
            },
            cacheDOM: function () {
                // DOM elements
                this.$toolBoxContainer = jQuery('.toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.prepend(pageInformation.config.$pageInfoContainer);
            },
            bindEvents: function () {
                // minimize
                pageInformation.config.$pageInfoTitle.on('click', this.toggleFeature);
                pageInformation.config.$pageInfoTitle.on('click', this.saveState);
                // hover effect
                pageInformation.config.$pageInfo.on('mouseover mouseleave', '.tbInfo', this.hoverEffect);
                // click
                pageInformation.config.$pageInfo.on('click', '.tbInfo', this.copyToClipboard);
            },
            displayPanel: function () {
                // loop through variable list to find the panel title
                var variables = this.variableList,
                    state = '',
                    key = '';
                for (key in variables) {
                    if (key === 'pageInfo') {
                        state = variables[key] ? 'show' : 'hide';
                        this.setState(pageInformation.config.$pageInfo, state);
                    }
                }
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            programData: function () {
                var allVariables = programVariables(),
                    length = allVariables.length,
                    a = 0,
                    varList = {},
                    key = '',
                    value = '';
                // add variables to list
                for (a; a < length; a += 1) {
                    key = allVariables[a];
                    value = getValue(key);
                    varList[key] = value;
                }
                return varList;
            },
            toggleFeature: function () {
                return pageInformation.config.$pageInfo.slideToggle(500);
            },
            saveState: function (event) {
                // get current state
                var vName = jQuery(event.target).siblings('.toolsPanel').attr('id'),
                    currState = getValue(vName);
                // sets usingM4 value
                setValue(vName, !currState);
            },
            hoverEffect: function (event) {
                // apply hover effects
                var element = event.currentTarget;
                jQuery(element).toggleClass('highlight');
            },
            copyToClipboard: function (event) {
                // copy page info
                var copyThisText = event.currentTarget.innerHTML;
                clipboardCopy(copyThisText);
            },
            setState: function ($panel, state) {
                if (state === 'show') {
                    $panel.addClass('appear');
                } else if (state === 'hide') {
                    $panel.addClass('disappear');
                }
            }
        },

        /* ************************************************************************************************************************ */
        /* **************************************** QA TOOLS **************************************** */
        /* ************************************************************************************************************************ */

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- QA Tools Panel ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        qaTools = {
            init: function () {
                // initialize module
                this.createElements();
                this.buildPanel();
                this.cacheDOM();
                this.addTool();
                this.bindEvents();
                this.displayPanel();
            },
            createElements: function () {
                qaTools.config = {
                    // ----------------------------------------
                    // QA Tools Panel
                    // ----------------------------------------
                    $mainToolsContainer: jQuery('<div>').attr({
                        class: 'toolBox',
                        id: 'mainToolsContainer'
                    }),
                    $mainToolsPanel: jQuery('<div>').attr({
                        class: 'toolsPanel',
                        id: 'mainTools'
                    }),
                    $mainToolsTitle: jQuery('<div>').attr({
                        class: 'panelTitle',
                        id: 'mainToolsTitle',
                        title: 'Click to Minimize/Maximize'
                    }).text('QA Tools')
                };
            },
            buildPanel: function () {
                // attach to continer
                qaTools.config.$mainToolsContainer
                    .append(qaTools.config.$mainToolsTitle)
                    .append(qaTools.config.$mainToolsPanel);
            },
            cacheDOM: function () {
                // DOM elements
                this.$toolBoxContainer = jQuery('.toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(qaTools.config.$mainToolsContainer);
            },
            bindEvents: function () {
                // minimize
                qaTools.config.$mainToolsTitle.on('click', this.toggleFeature);
                qaTools.config.$mainToolsTitle.on('click', this.saveState);
            },
            displayPanel: function () {
                // loop through variable list to find the panel title
                var variables = this.variableList,
                    state = '',
                    key = '';
                for (key in variables) {
                    if (key === 'mainTools') {
                        state = variables[key] ? 'show' : 'hide';
                        this.setState(qaTools.config.$mainToolsPanel, state);
                    }
                }
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            programData: function () {
                var allVariables = programVariables(),
                    length = allVariables.length,
                    a = 0,
                    varList = {},
                    key = '',
                    value = '';
                // add variables to list
                for (a; a < length; a += 1) {
                    key = allVariables[a];
                    value = getValue(key);
                    varList[key] = value;
                }
                return varList;
            },
            toggleFeature: function () {
                return qaTools.config.$mainToolsPanel.slideToggle(500);
            },
            saveState: function (event) {
                // get current state
                var vName = jQuery(event.target).siblings('.toolsPanel').attr('id'),
                    currState = getValue(vName);
                // sets usingM4 value
                setValue(vName, !currState);
            },
            setState: function ($panel, state) {
                if (state === 'show') {
                    $panel.addClass('appear');
                } else if (state === 'hide') {
                    $panel.addClass('disappear');
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- image checker ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        imageChecker = {
            init: function (callingPanel) {
                this.createElements(callingPanel);
                this.buildLegend();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1
            // ----------------------------------------
            createElements: function (callingPanel) {
                imageChecker.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'imageChecker',
                        title: 'Image Alt Checker'
                    }).text('Image Alt Checker'),
                    $legend: jQuery('<div>').attr({
                        class: 'tbLegend imageChecker'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('Image Checker Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        'noAlt': 'No Alt Text',
                        'hasAlt': 'Has Alt Text'
                    },
                    $offButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut offButt',
                        value: 'Turn Off'
                    }),
                    $toolsPanel: jQuery(callingPanel),
                    $legendContainer: jQuery('.legendContainer')
                };
            },
            buildLegend: function () {
                imageChecker.config.$legend
                    // attach legend title
                    .append(imageChecker.config.$legendTitle)
                    // attach list
                    .append(imageChecker.config.$legendList)
                    // attach turn off button
                    .append(imageChecker.config.$offButt);
                // fill list
                this.buildLegendContent();
            },
            addTool: function () {
                imageChecker.config.$toolsPanel.append(imageChecker.config.$activateButt);
                imageChecker.config.$legendContainer.append(imageChecker.config.$legend);
            },
            bindEvents: function () {
                // main button
                imageChecker.config.$activateButt.on('click', function () {
                    jQuery('html, body').scrollTop(0);
                    jQuery('html, body').animate({
                        scrollTop: jQuery(document).height()
                    }, 2000).promise().done(function () {
                        jQuery('html, body').scrollTop(0);
                        imageChecker.highlightImages();
                        imageChecker.showLegend();
                        imageChecker.toggleDisable();
                    });
                });
                // off button
                imageChecker.config.$offButt.on('click', this.removeHighlights.bind(this));
                imageChecker.config.$offButt.on('click', this.showLegend);
                imageChecker.config.$offButt.on('click', this.toggleDisable);
            },
            // ----------------------------------------
            // tier 2
            // ----------------------------------------
            buildLegendContent: function () {
                var $contentArray = imageChecker.config.$legendContent,
                    key = '',
                    value = '';
                // loop through Legend Content list
                for (key in $contentArray) {
                    value = $contentArray[key];
                    // build listing element
                    this.$listItem = jQuery('<li>').attr({
                        class: 'legendContent ' + key
                    }).append(value);
                    // attach to legend list
                    imageChecker.config.$legendList.append(this.$listItem);
                }
            },
            highlightImages: function () {
                // cache data from page
                this.cacheDOM();
                // add tool styles
                var iaLength = this.imageArrayLength,
                    a = 0,
                    $this;
                // loop through allImages and check for alt text
                for (a; a < iaLength; a += 1) {
                    $this = jQuery(this.$allImages[a]);
                    // applies div overlay with same size as image
                    this.addDivOverlay($this);
                    // check for alt text
                    this.checkForAltText($this);
                }
            },
            showLegend: function () {
                imageChecker.config.$legend.slideToggle(500);
            },
            toggleDisable: function () {
                imageChecker.config.$activateButt.prop('disabled', function (index, value) {
                    return !value;
                });
            },
            removeHighlights: function () {
                var iaLength = this.imageArrayLength,
                    a = 0;
                // removes special overlay class on images
                for (a; a < iaLength; a += 1) {
                    this.toggleOverlayClass(this.$allImages[a]);
                }
                // remove highlight overlay
                jQuery('.imgOverlay').remove();
            },
            // ----------------------------------------
            // tier 3
            // ----------------------------------------
            cacheDOM: function () {
                this.$allImages = jQuery('body').find('img');
                this.imageArrayLength = this.$allImages.length;
            },
            addDivOverlay: function ($currentImage) {
                this.cacheDOMOverlayElements($currentImage);
                this.createOverlayElements();
                this.buildOverlayElements();
                this.attachToImage($currentImage);
            },
            checkForAltText: function (currentImage) {
                var $image = jQuery(currentImage);
                // find first case that returns true
                switch (true) {
                    // if alt is undefined
                    case ($image.attr('alt') === undefined):
                        this.togClass($image, 'noAlt');
                        break;
                        // if alt is empty
                    case ($image.attr('alt') === ''):
                        this.togClass($image, 'emptyAlt');
                        break;
                        // if alt IS NOT empty
                    case ($image.attr('alt') !== ''):
                        this.togClass($image, 'hasAlt');
                        break;
                        // log the image element that breaks the program
                    default:
                        console.log('image checker failure');
                        console.log(currentImage);
                }
            },
            // ----------------------------------------
            // tier 4
            // ----------------------------------------
            cacheDOMOverlayElements: function ($currentImage) {
                this.imageAlt = jQuery($currentImage).attr('alt');
                // gets sizing of images
                this.widthOfImage = jQuery($currentImage).width();
                this.heightOfImage = jQuery($currentImage).height();
            },
            createOverlayElements: function () {
                // create div overlay
                this.$divOverlay = jQuery('<div>').attr({
                    class: 'imgOverlay'
                });
            },
            buildOverlayElements: function () {
                // make the div overlay the same dimensions as the image
                this.$divOverlay.css({
                    width: this.widthOfImage + 'px',
                    height: this.heightOfImage + 'px',
                });
                // add image alt as text to div
                this.$divOverlay.append(this.imageAlt);
            },
            attachToImage: function ($currentImage) {
                // make parent image relative positioning
                this.toggleOverlayClass($currentImage);
                // place div overlay onto image
                $currentImage.before(this.$divOverlay);

                if (toolbar.nextGenCheck()) {
                    var parent = $currentImage.closest('figure');
                    this.$divOverlay.css({
                        left: parent.width() / 2 - this.$divOverlay.width() / 2 + 'px'
                    });
                }

            },
            togClass: function ($image, addClass) {
                $image.siblings('.imgOverlay').toggleClass(addClass);
            },
            // ----------------------------------------
            // tier 5
            // ----------------------------------------
            toggleOverlayClass: function (currentImage) {
                jQuery(currentImage).toggleClass('overlaid');
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- link checker ----------------------------------------
        //------------------------------------------------------------------------------------------------------------------------
        linkChecker = {
            init: function (callingPanel) {
                this.createElements(callingPanel);
                this.getData();
                this.buildLegend();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function (callingPanel) {
                linkChecker.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'linkChecker',
                        title: 'Check Links'
                    }).text('Link Checker'),
                    $legend: jQuery('<div>').attr({
                        class: 'tbLegend linkChecker'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('Link Checker Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        'noTitle': 'No Title Text',
                        'hasTitle': 'Has Title Text',
                        'opensWindow': 'Opens In A New Window',
                        'brokenURL': 'Empty URL',
                        'urlIssue': 'Check URL',
                        'absoluteURL': 'Absolute URL',
                        'unsupportedPageLink': 'Page Not Supported',
                        'buttonFlag': 'Button Element',
                        'linkChecked': 'Clicked Link'
                    },
                    $offButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut offButt',
                        value: 'Turn Off'
                    }),
                    $hint: jQuery('<div>').attr({
                        class: 'hint'
                    }).text('ctrl+left click to open link in a new tab'),
                    $toolsPanel: jQuery(callingPanel),
                    $legendContainer: jQuery('.legendContainer'),
                    datedPagesfileURL: 'https://cdn.rawgit.com/cirept/NextGen/a9b9d06f/resources/dated_pages.json',
                    unsupportedPages: {}
                };
            },
            getData: function () {
                jQuery.getJSON(linkChecker.config.datedPagesfileURL, function (data) {
                    linkChecker.config.unsupportedPages = data.datedPages;
                });
            },
            buildLegend: function () {
                linkChecker.config.$legend
                    // attach legend title
                    .append(linkChecker.config.$legendTitle)
                    // attach list
                    .append(linkChecker.config.$legendList)
                    // attach turn off button
                    .append(linkChecker.config.$offButt)
                    // attach hint
                    .append(linkChecker.config.$hint);
                // fill list
                this.buildLegendContent();
            },
            addTool: function () {
                linkChecker.config.$toolsPanel.append(linkChecker.config.$activateButt);
                linkChecker.config.$legendContainer.append(linkChecker.config.$legend);
            },
            bindEvents: function () {
                // main button
                linkChecker.config.$activateButt.on('click', function () {
                    jQuery('html, body').scrollTop(0);
                    jQuery('html, body').animate({
                        scrollTop: jQuery(document).height()
                    }, 2000).promise().done(function () {
                        jQuery('html, body').scrollTop(0);
                        linkChecker.checkLinks();
                        linkChecker.showLegend();
                        linkChecker.toggleDisable();
                    });
                });
                // off button
                linkChecker.config.$offButt.on('click', this.removeHighlights.bind(this));
                linkChecker.config.$offButt.on('click', this.showLegend);
                linkChecker.config.$offButt.on('click', this.toggleDisable);
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            buildLegendContent: function () {
                var $contentArray = linkChecker.config.$legendContent,
                    key = '',
                    value = '',
                    $listItem;
                // loop through Legend Content list
                for (key in $contentArray) {
                    value = $contentArray[key];

                    // if site is TETRA skip adding page not supported legend
                    if (value === 'Page Not Supported' || value === 'Button Element') {
                        if (!toolbar.nextGenCheck()) {
                            continue;
                        }
                    }

                    // build listing element
                    $listItem = jQuery('<li>').attr({
                        class: 'legendContent ' + key
                    }).append(value);
                    // attach to legend list
                    linkChecker.config.$legendList.append($listItem);
                }
            },
            checkLinks: function () {
                // dynamic loading of cached elements
                // have to load here to compensate for lazy loaded widgets
                this.cacheDOM();
                this.addStyles();
                var a = 0,
                    buttons = jQuery('body').find('button'),
                    length = buttons.length;

                // ----------------------------------------
                // NEXT GEN SITE LOGIC
                // ----------------------------------------
                if (toolbar.nextGenCheck()) {
                    this.nextGenSiteCheck();
                }

                // ----------------------------------------
                // TETRA SITE LOGIC
                // ----------------------------------------
                if (!toolbar.nextGenCheck()) {
                    this.tetraSiteCheck();
                }

                // ----------------------------------------
                // FLAG ALL BUTTONS AS A BUTTON ELEMENT
                // ----------------------------------------
                for (a; a < length; a += 1) {
                    jQuery(buttons[a]).addClass('buttonFlag');
                }

            },
            nextGenSiteCheck: function () {
                // ----------------------------------------
                // NEXT GEN SITE LOGIC
                // ----------------------------------------
                var $sections = this.$sections,
                    $otherLinks = this.$otherLinks,
                    len = $sections.length,
                    a = 0,
                    $currentLink,
                    $image = null,
                    $imagelink = null,
                    isImageLink = false,
                    $cardLinkContainer, $cardSEOContainer, $cardImageContainer, $cardLinks, $copyTextLinks, myLength, youLength, jLength, q, w, j, $currentCard, cardClass;

                // ----------------------------------------
                // TEST LINKS FOUND IN HEADER AND FOOTER OF SITE
                // TESTS TO BODY LINKS WILL BE HANDLED DIFFERENTLY
                jLength = $otherLinks.length;
                j = 0;
                for (j; j < jLength; j += 1) {
                    $currentLink = jQuery($otherLinks[j]);
                    // perform checks to link
                    // add flag class, check target, check title, check url
                    this.testLink($currentLink, isImageLink);
                }
                // ----------------------------------------

                // ----------------------------------------
                // TEST BODY LINKS
                // ASSUMPTION THAT ALL BODY LINKS WILL BE LOCATED INSIDE CARDS
                for (a; a < len; a += 1) {
                    // reset variables
                    $image = null;
                    $imagelink = null;
                    isImageLink = false;
                    $currentCard = jQuery($sections[a]);
                    $currentLink = null;

                    if ($currentCard.attr('class') !== undefined) {
                        cardClass = $currentCard.attr('class');
                    }

                    $cardLinkContainer = $currentCard.find('div.link');
                    $cardSEOContainer = $currentCard.find('div.copy');
                    $cardImageContainer = $currentCard.find('div.media');

                    switch (true) {
                        // ----------------------------------------
                        // card style is set to CTA links
                        case (cardClass.indexOf('link-clickable') > -1):
                            // THERE SHOULD BE NO NEED TO CHECK FOR IMAGES IN THIS STYLE OF CARD
                            // THE IMAGE WILL NEVER BE A LINK THUS NOT NEEDING TO BE CHECKED

                            // CHECK ALL LINKS DEFINED IN CARD SETTINGS
                            // get all links defined in card
                            // should include all primary, secondary, and tenary links
                            $cardLinks = $cardLinkContainer.find('a'); // this is an array
                            myLength = $cardLinks.length;
                            q = 0;

                            for (q; q < myLength; q += 1) {
                                $currentLink = jQuery($cardLinks[q]);
                                // perform checks to link
                                // add flag class, check target, check title, check url
                                this.testLink($currentLink, isImageLink);

                                // bind click event
                                // will change the color of link when user clicks
                                this.bindClickCallback($currentLink, isImageLink);
                            }

                            // CHECK ALL LINKS DEFINED IN SEO TEXT in COPY of RECORD
                            // get all text links in copy text of card
                            $copyTextLinks = $cardSEOContainer.find('a');
                            youLength = $copyTextLinks.length;

                            if (youLength > 0) {
                                w = 0;
                                for (w; w < youLength; w += 1) {
                                    $currentLink = jQuery($copyTextLinks[w]);
                                    // perform checks to link
                                    // add flag class, check target, check title, check url
                                    this.testLink($currentLink, isImageLink);

                                    // bind click event
                                    // will change the color of link when user clicks
                                    this.bindClickCallback($currentLink, isImageLink);
                                }
                            }
                            break;
                            // ----------------------------------------
                            // card style is set to whole card is clickable and has CTA links
                            // if card is made clickable text links will not be able to be reached.
                            // should this still be checked?
                        case (cardClass.indexOf('card-clickable-v2') > -1):
                            // check if card has an image
                            if ($cardImageContainer.is(':empty')) {
                                // this shouldn't happen as if the card is made to be clickable it should mean that the card will have an image as a 'best practice'
                                isImageLink = false;
                            } else {
                                // find image in the card and apply a div overlay
                                isImageLink = true;
                                // find FIRST PRIMARY text link
                                $currentLink = $cardLinkContainer.find('a[class*="primary"]:first');
                                $image = $cardImageContainer.find('img');
                                // add div overlay to image
                                this.addDivOverlay($currentLink, $image);

                                // THERE IS NO NEED TO TEST OTHER LINKS AS THEY WON'T MATTER
                                // THE CARD WILL ONLY LINK TO THE FIRST PRIMARY LINK IN THE CARD

                                // perform checks to link
                                // add flag class, check target, check title, check url
                                this.testLink($currentLink, isImageLink);

                                // TEST other Links defined in card Settings
                                // get all links defined in card
                                // should include all primary, secondary, and tenary links
                                $cardLinks = $cardLinkContainer.find('a'); // this is an array
                                myLength = $cardLinks.length;
                                q = 0;
                                for (q; q < myLength; q += 1) {
                                    $currentLink = jQuery($cardLinks[q]);
                                    // perform checks to link
                                    // add flag class, check target, check title, check url
                                    this.testLink($currentLink, isImageLink);

                                    // bind click event
                                    // will change the color of link when user clicks
                                    this.bindClickCallback($currentLink, isImageLink);
                                }
                            }
                            break;
                            // ----------------------------------------
                            // card style is set to whole card is clickable
                            // if card is made clickable text links will not be able to be reached.
                            // should this still be checked?
                        case (cardClass.indexOf('card-clickable') > -1):
                            // check if card has an image
                            if ($cardImageContainer.is(':empty')) {
                                // this shouldn't happen as if the card is made to be clickable it should mean that the card will have an image as a 'best practice'
                                isImageLink = false;
                            } else {
                                // find image in the card and apply a div overlay
                                isImageLink = true;
                                // find FIRST PRIMARY text link
                                $currentLink = $cardLinkContainer.find('a[class*="primary"]:first');
                                $image = $cardImageContainer.find('img');
                                // add div overlay to image
                                this.addDivOverlay($currentLink, $image);

                                // THERE IS NO NEED TO TEST OTHER LINKS AS THEY WON'T MATTER
                                // THE CARD WILL ONLY LINK TO THE FIRST PRIMARY LINK IN THE CARD

                                // perform checks to link
                                // add flag class, check target, check title, check url
                                this.testLink($currentLink, isImageLink);

                                // bind click event
                                // will change the color of link when user clicks
                                this.bindClickCallback($currentLink, isImageLink);
                            }
                            break;
                            // ----------------------------------------
                        default:
                            console.log('default switch statement reached');
                    }
                }
            },
            tetraSiteCheck: function () {
                var length = this.linksArrayLength,
                    a = 0,
                    $currentLink,
                    $image, isImageLink, isQLPlink;
                // ----------------------------------------
                // TETRA SITE LOGIC
                // ----------------------------------------
                // loop through all links on page
                for (a; a < length; a += 1) {
                    // reset variables
                    $image = null;
                    isImageLink = false;
                    isQLPlink = false;
                    $currentLink = jQuery(this.$allLinks[a]);

                    // skip main nav menu items
                    if ($currentLink.attr('class') !== undefined) {
                        if ($currentLink.attr('class').indexOf('main') > -1 && $currentLink.attr('class').indexOf('main') > -1) {
                            continue;
                        }
                    }
                    // ----------------------------------------
                    $image = $currentLink.find('img');
                    isImageLink = this.isImageLink($image);
                    // create check for links inside quick links widget
                    if ($currentLink.closest('.cell').attr('data-cell')) {
                        // check if link is within a quick links widget
                        if ($currentLink.closest('.cell').attr('data-cell').indexOf('Quick_Links_Plus') > -1) {
                            // checks if QLP is modified by modules

                            // IF LINK IS INSIDE A QUICK LINKS WIDGET MARK IT AS NOT AN IMAGE LINK
                            // PREPEND DIV OVERLAY INSIDE OF LINK.
                            if ($currentLink.parent().attr('class')) {
                                if ($currentLink.closest('li').attr('class').indexOf('co-card') > -1) {
                                    isQLPlink = true;
                                    $currentLink.addClass('QLPLink');
                                    $currentLink = $currentLink.closest('li').find('a:first');
                                    isImageLink = false;
                                }
                            }
                        }
                    }

                    // if image link add div overlay
                    if (isImageLink) {
                        this.addDivOverlay($currentLink, $image);
                    }

                    // if QLP link add div overlay
                    if (isQLPlink) {
                        // Only apply the div overlay if the image contained inside the QLP card has a width and a height
                        // if the width and height is 0 that means that there is no image
                        var height = jQuery($image).height();
                        var width = jQuery($image).width();

                        if (height !== 0 && width !== 0) {
                            this.addDivOverlay($currentLink, $image, isQLPlink);
                            //  MIIGHT NEED CUSTOM LOGIC TO CHECK ALL QLP WIDGET LINKS
                            // SETTING ISIMAGELINK TO TRUE TO SEE IF I CAN TRICK THE LOGIC TO STILL ADD CLASSES TO THE DIV OVERLAY
                            isImageLink = true;
                        }
                    }

                    // perform checks to link
                    // add flag class, check target, check title, check url
                    this.testLink($currentLink, isImageLink);

                    // bind click event
                    this.bindClickCallback($currentLink, isImageLink);
                }
            },
            bindClickCallback: function ($currentLink, isImageLink) {
                // bind click event
                if (isImageLink) {
                    return $currentLink.one('mousedown', this.linkChecked(this.$divOverlay));
                } else {
                    return $currentLink.one('mousedown', this.linkChecked($currentLink));
                }
            },
            testLink: function ($currentLink, isImageLink) {
                // add flagging class
                this.togClass($currentLink, 'siteLink');
                // check target of link
                this.checkTarget($currentLink, isImageLink);
                // check title of link
                this.checkForTitleText($currentLink, isImageLink);
                // check url of link
                this.checkURL($currentLink, isImageLink);
            },
            showLegend: function () {
                linkChecker.config.$legend.slideToggle(500);
            },
            toggleDisable: function () {
                linkChecker.config.$activateButt.prop('disabled', function (index, value) {
                    return !value;
                });
            },
            removeHighlights: function () {
                var key;
                // removes special overlay class on images
                for (key in linkChecker.config.$legendContent) {
                    this.removeClass(this.$allLinks, key);
                    this.removeClass(jQuery('body').find('button'), key);
                }
                // remove div overlay
                jQuery('.imgOverlay').remove();
                // remove overlaid class
                this.removeClass(this.$allImageLinks, 'overlaid');
                // turn off custom link class
                this.removeClass(this.$allLinks, 'siteLink');
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            cacheDOM: function () {
                this.$allLinks = jQuery('body').find('a');
                this.$allImageLinks = this.$allLinks.find('img');
                this.linksArrayLength = this.$allLinks.length;
                this.imageLinksArrayLength = this.$allImageLinks.length;
                this.$toolboxStyles = jQuery('#qa_toolbox');
                this.$sections = jQuery('main').find('section');
                this.$otherLinks = jQuery('header, footer').find('a');
            },
            addStyles: function () {
                // if site is TETRA do not add style
                if (toolbar.nextGenCheck()) {
                    this.$toolboxStyles
                        .append('.unsupportedPageLink { background: #00a6ff; }')
                        .append('.buttonFlag { background: linear-gradient(to right, #b2fefa, #0ed2f7) !important; color: #000000 !important; }');
                }
            },
            isImageLink: function ($image) {
                if ($image.length) {
                    return true;
                }
                return false;
            },
            togClass: function ($currentLink, addClass) {
                $currentLink.addClass(addClass);
            },
            addDivOverlay: function ($currentLink, $currentImage, isQLPlink) {
                this.cacheDOMOverlayElements($currentLink, $currentImage);
                this.createOverlayElements();
                this.buildOverlayElements();

                if (isQLPlink) {
                    this.attachToImage($currentImage, $currentLink, isQLPlink);
                } else {
                    this.attachToImage($currentImage);
                }
            },
            checkTarget: function ($currentLink, isImageLink) {
                // check if link opens in a new window
                if (this.verifyTarget($currentLink)) {
                    if (isImageLink) {
                        this.togClass(this.$divOverlay, 'opensWindow');
                    } else {
                        this.togClass($currentLink, 'opensWindow');
                    }
                }
            },
            checkForTitleText: function ($currentLink, isImageLink) {
                // text links
                if (!isImageLink) {
                    switch (true) {
                        case (($currentLink.attr('title') === undefined || $currentLink.attr('title') === '')):
                            // link has no title
                            this.togClass($currentLink, 'noTitle');
                            break;
                        case ($currentLink.attr('title') !== ''):
                            // link has a title
                            this.togClass($currentLink, 'hasTitle');
                            break;
                        default:
                            // link is good to go
                            console.log('title checker failure');
                            console.log($currentLink);
                    }
                }

                // image links
                if (isImageLink) {
                    switch (true) {
                        case (($currentLink.attr('title') === undefined || $currentLink.attr('title') === '')):
                            // image link has no title
                            this.togClass(this.$divOverlay, 'noTitle');
                            break;
                        case ($currentLink.attr('title') !== ''):
                            // image link has a title
                            this.togClass(this.$divOverlay, 'hasTitle');
                            break;
                        default:
                            // link is good to go
                            console.log('title checker failure');
                            console.log($currentLink);
                    }
                }
            },
            checkURL: function ($currentLink, isImageLink) {
                var href = $currentLink.attr('href');

                // regular text links
                if (!isImageLink) {
                    switch (true) {
                        case (href === undefined):
                            // link is undefined
                            this.togClass($currentLink, 'brokenURL');
                            break;
                        case (href === ''):
                            // link has an empty url
                            this.togClass($currentLink, 'brokenURL');
                            break;
                        case (this.checkHref(href)):
                            // link has a fishy url
                            this.togClass($currentLink, 'urlIssue');
                            break;
                        case (this.datedURL(href) && toolbar.nextGenCheck()):
                            // link leads to an out dated page
                            this.togClass($currentLink, 'unsupportedPageLink');
                            break;
                        case (this.checkAbsoluteURL(href)):
                            // link has a fishy url
                            this.togClass($currentLink, 'absoluteURL');
                            break;
                        default:
                            // url is good to go
                    }
                }

                // image links
                if (isImageLink) {
                    switch (true) {
                        case (href === undefined):
                            // image link is undefined
                            this.togClass(this.$divOverlay, 'brokenURL');
                            break;
                        case (href === ''):
                            // image link has an empty url
                            this.togClass(this.$divOverlay, 'brokenURL');
                            break;
                        case (this.checkHref(href)):
                            // image link has a fishy url
                            this.togClass(this.$divOverlay, 'urlIssue');
                            break;
                        case (this.datedURL(href)):
                            // image link leads to an out dated page
                            this.togClass(this.$divOverlay, 'unsupportedPageLink');
                            break;
                        case (this.checkAbsoluteURL(href)):
                            // image link has a fishy url
                            this.togClass(this.$divOverlay, 'absoluteURL');
                            break;
                        default:
                            // url is good to go
                    }
                }
            },
            linkChecked: function ($currentLink) {
                return function () {
                    $currentLink.addClass('linkChecked');
                };
            },
            removeClass: function (array, removeClass) {
                var arrlength = array.length,
                    a = 0,
                    $obj;
                for (a; a < arrlength; a += 1) {
                    $obj = jQuery(array[a]);
                    $obj.removeClass(removeClass);
                }
            },
            // ----------------------------------------
            // tier 4 functions
            // ----------------------------------------
            cacheDOMOverlayElements: function ($currentLink, $currentImage) {
                this.linkTitle = jQuery($currentLink).find('a').attr('title');
                // gets sizing of images
                this.widthOfImage = jQuery($currentImage).width();
                this.heightOfImage = jQuery($currentImage).height();
            },
            createOverlayElements: function () {
                // create div overlay
                this.$divOverlay = jQuery('<div>').attr({
                    class: 'imgOverlay'
                });
            },
            buildOverlayElements: function () {
                // make the div overlay the same dimensions as the image
                this.$divOverlay.attr({
                    class: 'imgOverlay'
                }).css({
                    width: this.widthOfImage + 'px',
                    height: this.heightOfImage + 'px',
                });

                // add content to div
                this.$divOverlay.append(this.linkTitle);
            },
            attachToImage: function ($currentImage, $currentLink, isQLPlink) {
                // ----------------------------------------
                // CUSTOM LOGIC FOR QLP WIDGET LINKS
                // IF QLP ATTACH DIV OVERLAY TO BEGINNING OF LINK CONTENTS
                // ----------------------------------------
                if (isQLPlink) {
                    $currentLink.prepend(this.$divOverlay);
                    return;
                }

                // center div overlay
                if (toolbar.nextGenCheck()) {
                    var parent = $currentImage.closest('figure');
                    this.$divOverlay.css({
                        left: parent.width() / 2 - this.$divOverlay.width() / 2 + 'px'
                    });
                }

                // make parent image relative positionin
                this.togClass($currentImage, 'overlaid');

                // place div overlay onto image
                jQuery($currentImage).before(this.$divOverlay);
            },
            verifyTarget: function ($currentLink) {
                if (($currentLink.attr('target') === '_blank') || ($currentLink.attr('target') === '_new') || ($currentLink.attr('target') === 'custom')) {
                    return true;
                }
            },
            // checks URL if its 'special'
            checkHref: function (elem) {
                if ((elem.indexOf('#') === 0) || (elem.indexOf('f_') === 0) || (elem.indexOf('//:') >= 0)) {
                    return true;
                }
                return false;
            },
            // check for absolute URL
            checkAbsoluteURL: function (elem) {
                if (elem.indexOf('www') >= 0 || elem.indexOf('http') >= 0 || elem.indexOf('://') >= 0) {
                    return true;
                }
                return false;
            },
            // check if leads to out dated page
            datedURL: function (elem) {
                var datedPages = linkChecker.config.unsupportedPages,
                    datedPagesLength = datedPages.length,
                    z = 0,
                    datedPage;

                for (z; z < datedPagesLength; z += 1) {
                    datedPage = datedPages[z];

                    // exception for Tire Basic Page
                    if (elem.indexOf('AboutSpecials?p=cca-tire-tips') > -1) {
                        continue;
                    }

                    if (elem.indexOf(datedPage) > -1) {
                        return true;
                    }
                }
                return false;
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Spell Check ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        spellCheck = {
            init: function (callingPanel) {
                this.createElements();
                this.buildLegend();
                this.cacheDOM(callingPanel);
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                spellCheck.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'spellCheck',
                        title: 'Check Spelling'
                    }).text('Spellcheck Page'),
                    $offButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut offButt',
                        value: 'Turn Off'
                    }),
                    $legend: jQuery('<div>').attr({
                        class: 'tbLegend spellCheck'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('Spell Check Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        'spell-check misspelled': 'word misspelled'
                    }
                };
            },
            buildLegend: function () {
                spellCheck.config.$legend
                    // attach legend title
                    .append(spellCheck.config.$legendTitle)
                    // attach list
                    .append(spellCheck.config.$legendList)
                    // attach turn off button
                    .append(spellCheck.config.$offButt)
                    // attach hint
                    .append(spellCheck.config.$hint);
                // fill list
                this.buildLegendContent();
            },
            cacheDOM: function (callingPanel) {
                this.$toolsPanel = jQuery(callingPanel);
                // DOM elements
                this.$legendContainer = jQuery('.legendContainer');
            },
            addTool: function () {
                this.$toolsPanel.append(spellCheck.config.$activateButt);
                this.$legendContainer.append(spellCheck.config.$legend);
            },
            bindEvents: function () {
                // activate button
                spellCheck.config.$activateButt.on('click', this.spellCheckPage.bind(this));
                spellCheck.config.$activateButt.on('click', this.showLegend);
                spellCheck.config.$activateButt.on('click', this.toggleDisable);
                // off button
                spellCheck.config.$offButt.on('click', this.removeHighlights.bind(this));
                spellCheck.config.$offButt.on('click', this.showLegend);
                spellCheck.config.$offButt.on('click', this.toggleDisable);
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            buildLegendContent: function () {
                var $contentArray = spellCheck.config.$legendContent,
                    key = '',
                    value = '',
                    $listItem;
                // loop through Legend Content list
                for (key in $contentArray) {
                    value = $contentArray[key];

                    // build listing element
                    $listItem = jQuery('<li>').attr({
                        class: 'legendContent ' + key
                    }).append(value);
                    // attach to legend list
                    spellCheck.config.$legendList.append($listItem);
                }
            },
            treeWalk: function () {
                var treeWalker = document.createTreeWalker(
                        document.body,
                        NodeFilter.SHOW_TEXT, {
                            acceptNode: function (node) {
                                // Logic to determine whether to accept, reject or skip node
                                // In this case, only accept nodes that have content
                                // other than whitespace
                                if (!/^\s*$/.test(node.data)) {
                                    return NodeFilter.FILTER_ACCEPT;
                                }
                            }
                        },
                        false),
                    wordArray = [];

                // create an array of all the text on the page.
                // create node list
                while (treeWalker.nextNode()) {
                    wordArray.push(treeWalker.currentNode);
                }

                return wordArray;
            },
            spellCheckPage: function () {
                // ----------------------------------------
                // spell check page test functions
                // ----------------------------------------
                // dictionary
                var dictionary = new Typo('en_US', false, false, {
                        dictionaryPath: 'https://raw.githubusercontent.com/cirept/Typo.js/master/typo/dictionaries/'
                    }),
                    wordList = [],
                    self = this,
                    pElm;

                wordList = this.treeWalk();

                wordList.forEach(function (n) {
                    var text = n.nodeValue,
                        words = text.match(/[’'\w]+/g),
                        elm = n.parentElement,
                        unmarked;

                    if (!words /*|| elm.matches(ignore)*/ ) {
                        return;
                    }

                    words.forEach(function (word) {
                        // check if word is in the dictionary AND if it IS NOT a number
                        if (!dictionary.check(self.clean(word)) && !/^\d+$/.test(word)) {
                            unmarked = new RegExp('\\b' + word + '(?!@##)\\b', 'g');
                            text = text.replace(unmarked, '~@$&@~');
                        }
                    });

                    n.nodeValue = text;

                    if (!pElm) {
                        pElm = elm;
                    } else if (!pElm.contains(elm)) {
                        self.replaceMarkers(pElm);
                        pElm = elm;
                    }
                });
            },
            showLegend: function () {
                spellCheck.config.$legend.slideToggle(500);
            },
            toggleDisable: function () {
                spellCheck.config.$activateButt.prop('disabled', function (index, value) {
                    return !value;
                });
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            clean: function (word) {
                return word.replace('’', '\'')
                    .replace(/^'*(.*?)'*$/, '$1')
                    .replace('_', '');
            },
            replaceMarkers: function (elm) {
                if (elm) {
                    elm.innerHTML = elm.innerHTML.replace(/~@(.*?)@~/g, '<span class="spell-check misspelled">$1</span>');
                }
            },
            removeHighlights: function () {
                // remove highlight overlay
                jQuery('span.spell-check').each(function () {
                    jQuery(this).replaceWith(function () {
                        return this.childNodes[0].nodeValue;
                    });
                });
            }
        },
        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Test WebPage ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        speedtestPage = {
            init: function (callingPanel) {
                this.createElements();
                this.cacheDOM(callingPanel);
                this.buildOptions();
                this.buildPanel();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                speedtestPage.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'testPage',
                        title: 'Queue up a Page Test'
                    }).text('Web Page Test'),
                    email: GM_getValue('email', 'your.name@cdk.com'),
                    $emailTitle: jQuery('<div>').text('Enter your email'),
                    $emailInput: jQuery('<input>').attr({
                        class: 'WPT email',
                        id: 'WPTemail',
                        type: 'text',
                        placeholder: 'your.name@cdk.com'
                    }),
                    $panelContainer: jQuery('<div>').attr({
                        class: 'WPT input'
                    }),
                    browserOptions: {
                        '_IE11': 'IE11',
                        ':Chrome': 'Chrome',
                        ':FireFox': 'Firefox'
                    },
                    $browserSelect: jQuery('<select>').attr({
                        class: 'WPT bSelect',
                        id: 'WPTbSelect'
                    }),
                    $browserTitle: jQuery('<div>').text('Choose a Browser'),
                    $keySelect: jQuery('<select>').attr({
                        class: 'WPT keySelect',
                        id: 'WPTkeySelect'
                    }),
                    keyOptions: {
                        key1: 'A.26fc3fe634ca1277825369f20eb25a90',
                        key2: 'A.1b40e6dc41916bd77b0541187ac9e74b',
                        key3: 'A.7389884c8e4af7e491458158a283dc7a',
                        key4: 'A.ad231acf8f2888abaff310981eab805f',
                        key5: 'A.50f3e84b941c37c0abf2132f3b989196',
                        key6: 'A.d78638331b63ece0ee419964818f8e8d',
                        key7: 'A.517503243d1253bf66ea52d153905c41',
                        key8: 'A.7987f0cf2ec2ac0dc644ec9e6b54f883',
                    },
                    $keyTitle: jQuery('<div>').text('Choose Key'),
                    testURL: 'http://www.webpagetest.org/runtest.php?',
                    $sendButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut offButt',
                        value: 'Send Test'
                    })
                };
            },
            cacheDOM: function (callingPanel) {
                this.$cm = unsafeWindow.ContextManager;
                this.siteURL = this.$cm.getUrl();
                this.pageName = this.$cm.getPageName();
                this.$toolsPanel = jQuery(callingPanel);
                this.nextGen = document.firstChild.data;
                this.isNextGenPlatform = this.nextGenVar(this.nextGen);
            },
            buildOptions: function () {
                var $listItem;

                jQuery.each(speedtestPage.config.browserOptions, function (key, text) {
                    $listItem = jQuery('<option>').val(key).html(text);
                    speedtestPage.config.$browserSelect.append($listItem);
                });

                jQuery.each(speedtestPage.config.keyOptions, function (key, text) {
                    $listItem = jQuery('<option>').val(text).html(key);
                    speedtestPage.config.$keySelect.append($listItem);
                });
            },
            buildPanel: function () {
                speedtestPage.config.$panelContainer
                    .append(speedtestPage.config.$emailTitle)
                    .append(speedtestPage.config.$emailInput)
                    .append(speedtestPage.config.$browserTitle)
                    .append(speedtestPage.config.$browserSelect)
                    .append(speedtestPage.config.$keyTitle)
                    .append(speedtestPage.config.$keySelect)
                    .append(speedtestPage.config.$sendButt);
                speedtestPage.config.$emailInput.val(speedtestPage.config.email);
            },
            addTool: function () {
                this.$toolsPanel.append(speedtestPage.config.$activateButt);
                this.$toolsPanel.append(speedtestPage.config.$panelContainer);
            },
            bindEvents: function () {
                speedtestPage.config.$activateButt.on('click', this.toggleFeature);
                speedtestPage.config.$sendButt.on('click', this.storeData);
                speedtestPage.config.$sendButt.on('click', this.sendPage.bind(this));
                speedtestPage.config.$sendButt.on('click', this.toggleFeature);
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            nextGenVar: function (nextGen) {
                if (nextGen) {
                    return nextGen.indexOf('Next Gen') === -1 ? false : true;
                } else {
                    return false;
                }
            },
            toggleFeature: function () {
                speedtestPage.config.$panelContainer.slideToggle(500);
            },
            storeData: function () {
                // save user input
                var userEmail = jQuery('#WPTemail').val();
                setValue('email', userEmail);
            },
            sendPage: function () {
                var browser = jQuery('#WPTbSelect option:selected').val(),
                    selectedKey = jQuery('#WPTkeySelect option:selected').val(),
                    browserName = jQuery('#WPTbSelect option:selected').text(),
                    email = getValue('email'),
                    params = {
                        k: selectedKey,
                        runs: '3',
                        fvonly: '1',
                        notify: email,
                        location: 'Dulles' + browser
                    },
                    newTab, desktopURL, mobileURL;

                // build url
                jQuery.each(params, function (index, value) {
                    speedtestPage.config.testURL += index + '=' + value + '&';
                });

                // alert user
                if (this.isNextGenPlatform) {
                    desktopURL = speedtestPage.config.testURL + 'url=' + this.siteURL + this.pageName + '?nextGen=true';

                    if (confirm('----------------------------------------\n' +
                            'Test the Desktop and Mobile site?\n' +
                            '----------------------------------------\n' +
                            'Browser : ' + browserName + '\n' +
                            'Send Results To : ' + email + '\n' +
                            '----------------------------------------') === true) {
                        newTab = openNewTab(desktopURL);
                    }
                } else {
                    desktopURL = speedtestPage.config.testURL + 'url=' + this.siteURL + this.pageName + '?device=immobile';
                    mobileURL = speedtestPage.config.testURL + 'url=' + this.siteURL + this.pageName + '?device=mobile';

                    if (confirm('----------------------------------------\n' +
                            'Test the Desktop and Mobile site?\n' +
                            '----------------------------------------\n' +
                            'Browser : ' + browserName + '\n' +
                            'Send Results To : ' + email + '\n' +
                            '----------------------------------------') === true) {
                        newTab = openNewTab(desktopURL);
                        newTab = openNewTab(mobileURL);
                    }
                }
            }
        },

        /* ************************************************************************************************************************ */
        /* **************************************** OTHER TOOLS **************************************** */
        /* ************************************************************************************************************************ */

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Other Tools Panel ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        otherTools = {
            init: function () {
                // initialize module
                this.createElements();
                this.buildPanel();
                this.cacheDOM();
                this.addTool();
                this.bindEvents();
                this.displayPanel();
            },
            createElements: function () {
                otherTools.config = {
                    // ----------------------------------------
                    // QA Tools Panel
                    // ----------------------------------------
                    $otherToolsContainer: jQuery('<div>').attr({
                        class: 'toolBox',
                        id: 'otherToolsContainer'
                    }),
                    $otherToolsPanel: jQuery('<div>').attr({
                        class: 'toolsPanel',
                        id: 'otherTools'
                    }),
                    $otherToolsTitle: jQuery('<div>').attr({
                        class: 'panelTitle',
                        id: 'otherToolsTitle',
                        title: 'Click to Minimize/Maximize'
                    }).text('Other Tools')
                };
            },
            buildPanel: function () {
                // attach to continer
                otherTools.config.$otherToolsContainer
                    .append(otherTools.config.$otherToolsTitle)
                    .append(otherTools.config.$otherToolsPanel);
            },
            cacheDOM: function () {
                // DOM elements
                this.$toolBoxContainer = jQuery('.toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(otherTools.config.$otherToolsContainer);
            },
            bindEvents: function () {
                // minimize
                otherTools.config.$otherToolsTitle.on('click', this.toggleFeature);
                otherTools.config.$otherToolsTitle.on('click', this.saveState);
            },
            displayPanel: function () {
                // loop through variable list to find the panel title
                var variables = this.variableList,
                    state = '',
                    key = '';
                for (key in variables) {
                    if (key === 'otherTools') {
                        state = variables[key] ? 'show' : 'hide';
                        this.setState(otherTools.config.$otherToolsPanel, state);
                    }
                }
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            programData: function () {
                var allVariables = programVariables(),
                    length = allVariables.length,
                    a = 0,
                    varList = {},
                    key = '',
                    value = '';
                // add variables to list
                for (a; a < length; a += 1) {
                    key = allVariables[a];
                    value = getValue(key);
                    varList[key] = value;
                }
                return varList;
            },
            toggleFeature: function () {
                return otherTools.config.$otherToolsPanel.slideToggle(500);
            },
            saveState: function (event) {
                // get current state
                var vName = jQuery(event.target).siblings('.toolsPanel').attr('id'),
                    currState = getValue(vName);
                // sets usingM4 value
                setValue(vName, !currState);
            },
            setState: function ($panel, state) {
                if (state === 'show') {
                    $panel.addClass('appear');
                } else if (state === 'hide') {
                    $panel.addClass('disappear');
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Show Navigation (highlight major pages) ----------------------------------------
        //------------------------------------------------------------------------------------------------------------------------
        showNavigation = {
            init: function (callingPanel) {
                this.createElements();
                this.cacheDOM(callingPanel);
                this.buildLegend();
                this.addTool();
                this.bindEvents();
                this.addStyles();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                showNavigation.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'showNavigation',
                        title: 'Show Navigation (Highlights Major Pages)'
                    }).text('Show Navigation'),
                    $offButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut offButt',
                        value: 'Turn Off'
                    }),
                    $legend: jQuery('<div>').attr({
                        class: 'tbLegend showNavigation'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('Show Navigation Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        majorPage: 'Major Page',
                        customPage: 'Landing Page',
                        linkChecked: 'Link Clicked'
                    },
                    $hint: jQuery('<div>').attr({
                        class: 'hint'
                    }).text('ctrl+left click to open link in a new tab')
                };
            },
            cacheDOM: function (callingPanel) {
                this.nextGen = document.firstChild.data;
                this.isNextGenPlatform = this.nextGenVar(this.nextGen);
                this.$toolsPanel = jQuery(callingPanel);
                this.$legendContainer = jQuery('.legendContainer');

                if (this.nextGenVar(this.nextGen)) {
                    this.$navTabs = jQuery('li[repeat*="mainNav"]');
                    this.$subNavMenuContainer = this.$navTabs.find('ul[if="cards.length"]');
                    this.$subNavItem = this.$subNavMenuContainer.find('li[repeat="cards"]');
                    this.$navTabsLinks = this.$subNavItem.find('a');
                } else {
                    this.$nav = jQuery('#pmenu');
                    this.$navTabs = this.$nav.find('ul');
                    this.$navTabsLinks = this.$navTabs.find('a');
                }
            },
            nextGenVar: function (nextGen) {
                if (nextGen) {
                    return nextGen.indexOf('Next Gen') === -1 ? false : true;
                } else {
                    return false;
                }
            },
            buildLegend: function () {
                showNavigation.config.$legend
                    // attach legend title
                    .append(showNavigation.config.$legendTitle)
                    // attach list
                    .append(showNavigation.config.$legendList)
                    // attach turn off button
                    .append(showNavigation.config.$offButt)
                    // attach hint
                    .append(showNavigation.config.$hint);
                // fill list
                this.buildLegendContent();
            },
            addTool: function () {
                this.$toolsPanel.append(showNavigation.config.$activateButt);
                this.$legendContainer.append(showNavigation.config.$legend);
            },
            bindEvents: function () {
                showNavigation.config.$activateButt.on('click', this.toggleFeatures.bind(this));
                showNavigation.config.$activateButt.on('click', this.toggleDisable);
                showNavigation.config.$activateButt.on('click', this.bindClicks.bind(this));
                showNavigation.config.$offButt.on('click', this.toggleFeatures.bind(this));
                showNavigation.config.$offButt.on('click', this.toggleDisable);
            },
            addStyles: function () {

            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            buildLegendContent: function () {
                var $contentArray = showNavigation.config.$legendContent,
                    key, value;
                // loop through Legend Content list
                for (key in $contentArray) {
                    value = $contentArray[key];
                    // build listing element

                    // if site is NEXTGEN skip adding major page
                    if (value === 'Major Page') {
                        if (this.isNextGenPlatform) {
                            continue;
                        }
                    }

                    this.$listItem = jQuery('<li>').attr({
                        class: 'legendContent ' + key
                    }).append(value);
                    // attach to legend list
                    showNavigation.config.$legendList.append(this.$listItem);
                }
            },
            toggleFeatures: function () {
                var isNextGen = this.isNextGenPlatform;
                if (isNextGen) {
                    this.$navTabs.toggleClass('showNav customAdd');
                    this.$subNavItem.toggleClass('showNav customAdd');
                    this.$subNavMenuContainer.toggleClass('showNav nextgenShowNav');
                    this.$navTabs.find('a[href*=LandingPage]').toggleClass('customPage');
                }
                if (!isNextGen) {
                    this.$navTabs.find('a[href*=Form], a[href*=ContactUs], a[href=HoursAndDirections], a[href*=VehicleSearchResults]').toggleClass('majorPage');
                    this.$navTabs.find('a[href*=LandingPage]').toggleClass('customPage');
                    this.$navTabs.toggle();
                }
                showNavigation.config.$legend.slideToggle(500);
                this.$navTabs.find('.linkChecked').removeClass('linkChecked');
            },
            toggleDisable: function () {
                showNavigation.config.$activateButt.prop('disabled', function (index, value) {
                    return !value;
                });
            },
            bindClicks: function () {
                var i = 0,
                    length = this.$navTabsLinks.length;

                for (i; i < length; i += 1) {
                    jQuery(this.$navTabsLinks[i]).one('mousedown', this.linkChecked(this.$navTabsLinks[i]));
                }

            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            linkChecked: function (currentLink) {
                return function () {
                    jQuery(currentLink).addClass('linkChecked');
                };
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- View Mobile Site ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        viewMobile = {
            init: function (callingPanel) {
                this.createElements();
                this.cacheDOM(callingPanel);
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                viewMobile.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'viewMobile',
                        title: 'View Mobile Site'
                    }).text('View Mobile Site')
                };
            },
            cacheDOM: function (callingPanel) {
                this.$otherToolsPanel = jQuery(callingPanel);
                this.$cm = unsafeWindow.ContextManager;
                this.siteURL = this.$cm.getUrl();
                this.pageName = this.$cm.getPageName();
            },
            addTool: function () {
                this.$otherToolsPanel.append(viewMobile.config.$activateButt);
            },
            bindEvents: function () {
                viewMobile.config.$activateButt.on('click', this.viewMobile.bind(this));
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            viewMobile: function () {
                var auto = '?device=mobile&nextGen=false',
                    openThis = this.siteURL + this.pageName + auto;
                openNewTab(openThis);
            },
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- SEO Simplify ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        seoSimplify = {
            init: function (callingPanel) {
                this.createElements();
                this.buildElements();
                this.getData();
                this.cacheDOM(callingPanel);
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                seoSimplify.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'simpleSEO',
                        title: 'Simplify My SEO Text'
                    }).text('SEO Simplify'),
                    $removeBut: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut removeDiv',
                        value: 'REMOVE',
                    }),
                    $seoDisplay: jQuery('<div>').attr({
                        class: 'inputDisplay'
                    }),
                    $seoContainer: jQuery('<div>').attr({
                        class: 'inputContainer'
                    }),
                    oems: ['Chevrolet', 'Buick', 'Cadillac', 'GMC', 'Hyundai', 'Volkswagen'],
                    vehicles: []
                };
            },
            buildElements: function () {
                // attach seo display and remove button to container
                seoSimplify.config.$seoContainer.append(seoSimplify.config.$seoDisplay);
                seoSimplify.config.$seoContainer.append(seoSimplify.config.$removeBut);
            },
            getData: function () {
                var filePath = '';
                jQuery(seoSimplify.config.oems).each(function (index, model) {
                    switch (model) {
                        case 'Chevrolet':
                            filePath = 'https://cdn.rawgit.com/cirept/NextGen/master/resources/Chevrolet.json';
                            seoSimplify.loadArray(filePath);
                            break;
                        case 'Buick':
                            filePath = 'https://cdn.rawgit.com/cirept/NextGen/master/resources/Buick.json';
                            seoSimplify.loadArray(filePath);
                            break;
                        case 'Cadillac':
                            filePath = 'https://cdn.rawgit.com/cirept/NextGen/master/resources/Cadillac.json';
                            seoSimplify.loadArray(filePath);
                            break;
                        case 'GMC':
                            filePath = 'https://cdn.rawgit.com/cirept/NextGen/master/resources/GMC.json';
                            seoSimplify.loadArray(filePath);
                            break;
                        case 'Hyundai':
                            filePath = 'https://cdn.rawgit.com/cirept/NextGen/master/resources/Hyundai.json';
                            seoSimplify.loadArray(filePath);
                            break;
                        case 'Volkswagen':
                            filePath = 'https://cdn.rawgit.com/cirept/NextGen/master/resources/Volkswagen.json';
                            seoSimplify.loadArray(filePath);
                            break;
                    }
                });
            },
            cacheDOM: function (callingPanel) {
                this.$otherToolsPanel = jQuery(callingPanel);
                this.body = jQuery('body');
            },
            addTool: function () {
                this.$otherToolsPanel.append(seoSimplify.config.$activateButt);
            },
            bindEvents: function () {
                seoSimplify.config.$activateButt.on('click', this.simplifySEO.bind(this));
                seoSimplify.config.$removeBut.on('click', this.removeDisplay.bind(this));
                // add change to text area function
                seoSimplify.config.$seoDisplay.on('click', this.changeToTextarea.bind(this));
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            loadArray: function (filePath) {
                jQuery.getJSON(filePath, function (data) {
                    seoSimplify.config.vehicles.push(data);
                });
            },
            simplifySEO: function () {
                var $input = this.getInput();

                // skip cleaning if input is empty
                if ($input === null || $input === '') {
                    return;
                }

                $input = this.cleanUpTags($input);
                $input = this.cleanUpLinks($input);
                this.attachDisplayArea();
                this.displayText($input);
            },
            removeDisplay: function () {
                // remove display container
                seoSimplify.config.$seoContainer.detach();
                seoSimplify.config.$seoDisplay.empty();
            },
            changeToTextarea: function (event) {
                var $this = jQuery(event.currentTarget),
                    input = seoSimplify.config.$seoDisplay.html(),
                    $seoTextArea = jQuery('<textarea>').attr({
                        class: 'inputDisplay'
                    });
                $seoTextArea.html(input);
                jQuery($this).replaceWith($seoTextArea);
                $seoTextArea.focus();
                $seoTextArea.blur(this.revertDiv.bind(this));
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            getInput: function () {
                var input = jQuery.trim(prompt('Enter Your SEO Text - HTML format')),
                    $input = jQuery('<div>');

                // checks if input is empty
                if (input === null || input === '') {
                    return '';
                }

                $input.append(input);

                return $input;
            },
            cleanUpTags: function ($input) {
                // remove all empty elements
                $input.find('*:empty').remove();
                $input.find('*').each(function (index, value) {
                    if (jQuery.trim(jQuery(value).html()) === '') {
                        jQuery(value).remove();
                    }
                });
                $input.find('style').remove();
                // remove all style attributes
                $input.find('*').removeAttr('style');

                // remove all br elements
                $input.find('br').remove();
                // remove all font tags
                $input.find('font').replaceWith(function () {
                    return jQuery(this).html();
                });
                // remove all &nbsp; with ' '
                $input.html($input.html().replace(/&nbsp;/gi, ' '));
                // remove all span tags
                $input.find('span').replaceWith(function () {
                    return jQuery(this).html();
                });
                // remove all u tags
                $input.find('u').replaceWith(function () {
                    return jQuery(this).html();
                });
                // remove all b tags
                $input.find('b').replaceWith(function () {
                    return jQuery(this).html();
                });
                // remove all strong tags
                $input.find('strong').replaceWith(function () {
                    return jQuery(this).html();
                });
                // remove all i tags
                $input.find('i').replaceWith(function () {
                    return jQuery(this).html();
                });
                // replace all div tags with p tags
                $input.find('center').replaceWith(function () {
                    return jQuery('<p/>').append(jQuery(this).html());
                });
                // return cleaner input
                return $input;

            },
            cleanUpLinks: function ($input) {
                var allLinks = $input.find('a'),
                    len = allLinks.length,
                    i = 0,
                    linkURL, $this, titleText;

                for (i; i < len; i += 1) {
                    $this = jQuery(allLinks[i]);
                    // check if title is empty or undefined
                    if (seoSimplify.isUndefined($this, 'title') || seoSimplify.isEmpty($this, 'title')) {
                        // sets title to link text
                        titleText = $this.text().toString().trim();
                        $this.attr('title', titleText.substr(0, 1).toUpperCase() + titleText.substr(1));
                    }
                    // check if href is empty or undefined
                    if (seoSimplify.isUndefined($this, 'href') || seoSimplify.isEmpty($this, 'href')) {
                        // sets href to # if none exists
                        $this.attr('href', '#');
                    }

                    linkURL = $this.attr('href');
                    $this.attr('href', seoSimplify.refineURL(linkURL));
                    seoSimplify.emptyTarget($this);
                }
                // return cleaner input
                return $input;
            },
            attachDisplayArea: function () {
                this.body.append(seoSimplify.config.$seoContainer);
            },
            displayText: function ($input) {
                // attach input to display
                seoSimplify.config.$seoDisplay.empty();
                seoSimplify.config.$seoDisplay.append($input.html());
            },
            revertDiv: function (event) {
                var $this = jQuery(event.target),
                    $thisText = jQuery(event.target).text(),
                    $replacementArea = seoSimplify.config.$seoDisplay;

                $replacementArea.html($thisText);

                jQuery($this).replaceWith($replacementArea);

                $replacementArea.click(this.changeToTextarea.bind(this));
            },
            // ----------------------------------------
            // tier 4 functions
            // ----------------------------------------
            isUndefined: function (elem, attr) {
                if (jQuery(elem).attr(attr) !== undefined) {
                    return false;
                } else {
                    return true;
                }
            },
            isEmpty: function (elem, attr) {
                if (jQuery(elem).attr(attr) === '') {
                    return true;
                } else {
                    return false;
                }
            },
            refineURL: function (url) {
                var ezURL = url.split('%'),
                    removeThese = ['LINKCONTEXTNAME', 'LINKPAGENAME'],
                    i = 0,
                    j = 0,
                    x = 0,
                    findThis = 'ModelDetails',
                    actualURL, nURL, len;

                ezURL = ezURL.filter(Boolean);
                nURL = ezURL[0].split('_');

                for (i; i < nURL.length; i += 1) {
                    for (j; j < removeThese.length; j += 1) {
                        if (nURL[i] === removeThese[j]) {
                            nURL.splice(i, 1);
                        }
                    }
                }

                len = nURL.length;

                for (x; x < len; x += 1) {
                    if (nURL[x] === findThis) {
                        actualURL = this.getURL(nURL[len - 1]);
                        return actualURL;
                    } else {
                        actualURL = nURL[0];
                        return actualURL;
                    }
                }
            },
            emptyTarget: function (elem) {
                var $this = elem;
                // if target is undefined or empty remove target attribute
                if (seoSimplify.isUndefined($this, 'target') || seoSimplify.isEmpty($this, 'target')) {
                    jQuery(elem).removeAttr('target');
                }
            },
            // ----------------------------------------
            // tier 5 functions
            // ----------------------------------------
            getURL: function (vehicle) {
                var vehicleArray = vehicle.split(' '),
                    make = 'no match found',
                    model = '',
                    oems = seoSimplify.config.oems,
                    oemsLen = oems.length,
                    x = 0,
                    b = 1,
                    detailsURL = '',
                    vehiclesArr = seoSimplify.config.vehicles;

                if (vehicleArray.length >= 3) {
                    for (b; b < vehicleArray.length; b += 1) {
                        model += vehicleArray[b];
                    }
                } else {
                    model = vehicleArray[vehicleArray.length - 1];
                }

                for (x; x < oemsLen; x += 1) {
                    if (vehicleArray[0].indexOf(oems[x]) >= 0) {
                        make = oems[x];
                        break;
                    }
                }

                model = model.trim();
                make = make.toLowerCase();

                // fix this if possible
                jQuery.each(vehiclesArr, function (index, oemArray) {
                    jQuery.each(oemArray, function (oem, vehiclesArray) {
                        if (oem === make) {
                            jQuery.each(vehiclesArray, function (index, vehicleArray) {
                                if (model === vehicleArray.name) {
                                    detailsURL = vehicleArray.url;
                                    return false; // break out of loop
                                }
                            });
                        }
                    });
                });
                return detailsURL;
            }
        };

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- add widget outlines ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    // disable on next gen sites.  dont work
    var $widgetOutlineButton = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'widgetOutline',
        title: 'Show Widget Outlines'
    }).text('Show Widgets');
    $widgetOutlineButton.click(function () {
        var $toolboxStyles = jQuery('#qa_toolbox');
        // made to you will be able to remove it later
        jQuery('.masonry-brick').addClass('outlineWidget');
        // made to you will be able to remove it later
        jQuery('div[class*=colorBlock]').addClass('hideColorblock');
        jQuery('body .cell .CobaltEditableWidget').each(function () {
            jQuery(this).addClass('showWidgetData');
            var widgetID = jQuery(this).attr('id');
            var w = jQuery(this).width(),
                h = jQuery(this).height();
            jQuery(this).on('click', copyWidgetID);
            jQuery(this).attr({
                title: 'Click to Copy Widget ID'
            });
            jQuery(this).append(function () {
                jQuery(this).attr({
                    'data-content': widgetID + ' ::: ' + w + 'px X ' + h + 'px'
                });
            });
            // dynamically adjust the data content
            $toolboxStyles
                .append('#' + widgetID + ':after { height: ' + h + 'px; width: ' + w + 'px; }');
        });
        jQuery('body .cell .CobaltWidget').each(function () {
            jQuery(this).addClass('showWidgetData');
            var widgetID = jQuery(this).attr('id');
            var w = jQuery(this).width(),
                h = jQuery(this).height();
            jQuery(this).on('click', copyWidgetID);
            jQuery(this).attr({
                title: 'Click to Copy Widget ID'
            });
            jQuery(this).append(function () {
                jQuery(this).attr({
                    'data-content': widgetID + ' :: ' + w + 'px X ' + h + 'px'
                });
            });
            // dynamically adjust the data content
            $toolboxStyles
                .append('#' + widgetID + ':after { height: ' + h + 'px; width: ' + w + 'px; }');
        });

        function copyWidgetID(event) {
            var $widget = jQuery(event.target),
                widgetID = $widget.attr('id');
            // make element blink for verification purposes
            $widget.fadeIn(300).fadeOut(300).fadeIn(300);
            clipboardCopy(widgetID);
        }
    });

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- broken link checker ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    var checkLinks = {
            init: function (callingPanel) {
                this.createElements();
                this.cacheDOM(callingPanel);
                this.buildLegend();
                this.addTool();
                this.bindEvents();
            },
            createElements: function () {
                checkLinks.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: '404checker',
                        title: '404 Checker'
                    }).text('404 Link Checker'),
                    $legend: jQuery('<div>').attr({
                        class: 'tbLegend checkLinks'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('404 Link Checker Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        'otherDomain': 'Absolute URL*',
                        'jumpLink': 'Jump Link or "#" URL',
                        'attention': 'URL Empty or Undefined',
                        'mobilePhoneLink': 'Mobile Link',
                        'success': 'Link is Real',
                        'error': '404 Link',
                    },
                    $offButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut offButt',
                        value: 'remove legend'
                    }),
                    $subText: jQuery('<div>').attr({
                        class: 'subText hint'
                    }).text('* Manually Check Link'),
                    $container: jQuery('<div>').attr({
                        class: 'checkContainer',
                    }),
                    $message: jQuery('<div>').attr({
                        class: 'checkMessage'
                    }),
                    $counter: jQuery('<div>').attr({
                        id: 'count404'
                    }),
                    $iconContainer: jQuery('<div>').attr({
                        id: 'iconContainer'
                    }),
                    $thinking: jQuery('<i id="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'),
                    $done: jQuery('<i class="fa fa-check-circle fa-3x fa-fw"></i>'),
                    $hint: jQuery('<div>').attr({
                        class: 'hint'
                    }).text('refresh page before running 404 checker again'),
                    count: 1,
                    totalTests: 0,
                    totalLinks: 0,
                    errors: 0
                };
            },
            cacheDOM: function (callingPanel) {
                this.cm = unsafeWindow.ContextManager;
                this.webID = this.cm.getWebId();
                this.siteID = this.cm.getSiteId();
                this.baseURL = this.cm.getUrl();
                this.host = window.location.hostname;
                this.wid = this.separateID(this.webID);
                this.$toolsPanel = jQuery(callingPanel);
                this.$legendContainer = jQuery('.legendContainer');
            },
            buildLegend: function () {
                checkLinks.config.$legend
                    .append(checkLinks.config.$legendTitle)
                    .append(checkLinks.config.$legendList)
                    .append(checkLinks.config.$subText)
                    .append(checkLinks.config.$offButt)
                    .append(checkLinks.config.$hint);
                // fill list
                this.buildLegendContent();
                // attach filled list
                this.$legendContainer.append(checkLinks.config.$legend);
                checkLinks.config.$legend.prepend(checkLinks.config.$container);
            },
            addTool: function () {
                this.$toolsPanel.append(checkLinks.config.$activateButt);
            },
            bindEvents: function () {
                // main button
                checkLinks.config.$activateButt.on('click', function () {
                    jQuery('html, body').scrollTop(0);
                    jQuery('html, body').animate({
                        scrollTop: jQuery(document).height()
                    }, 2000).promise().done(function () {
                        jQuery('html, body').scrollTop(0);
                        checkLinks.toggleDisable();
                        checkLinks.showLegend();
                        checkLinks.ajaxStart();
                        checkLinks.ajaxStop();
                        checkLinks.testLinks();
                    });
                });

                checkLinks.config.$offButt.on('click', this.showLegend);
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            testLinks: function () {
                var isNextGen = toolbar.nextGenCheck();
                if (!isNextGen) {
                    this.tetraTestLinks();
                } else if (isNextGen) {
                    this.nextgenTestLinks();
                }
            },
            tetraTestLinks: function () {
                var j = 0,
                    $currentLink,
                    passedChecks = false,
                    $pageLinks = jQuery('a'),
                    pageLinksLength = $pageLinks.length;

                // set total tests to number of links on page
                //                checkLinks.config.totalTests = $pageLinks.length;
                //                checkLinks.config.totalTests = $pageLinks.length;
                checkLinks.config.totalLinks = pageLinksLength;
                checkLinks.config.totalLinks = pageLinksLength;

                for (j; j < pageLinksLength; j += 1) {
                    $currentLink = jQuery($pageLinks[j]);
                    $currentLink.addClass('siteLink'); // add default flag class to links

                    // if URL's do not pass the checks skip iteration
                    // do not send to ajax function for testing
                    passedChecks = this.testURLs($currentLink);
                    if (!passedChecks) {
                        continue;
                    }

                    // test links
                    this.tetraAjaxTest($currentLink);
                }
            },
            // checks current window URL and if it contains nextGen parameter
            // add the same URL parameters to the link before testing.
            addURLParameter: function ($currentLink) {
                var curWindow = window.location.href,
                    linkURL = jQuery.trim($currentLink.attr('href'));
                // append nextGen
                if (curWindow.indexOf('nextGen=false') > -1) {
                    // apply nextGen=false
                    if (linkURL.indexOf('?') === -1) {
                        linkURL += '?nextGen=false';
                    } else {
                        linkURL += '&nextGen=false';
                    }
                } else if (curWindow.indexOf('nextGen=true') > -1) {
                    // apply nextGen=true
                    if (linkURL.indexOf('?') === -1) {
                        linkURL += '?nextGen=true';
                    } else {
                        linkURL += '&nextGen=true';
                    }
                }

                return linkURL;
            },
            testURLs: function ($currentLink) {
                var linkURL = jQuery.trim($currentLink.attr('href')),
                    isImageLink = $currentLink.find('img') ? true : false,
                    isNextGen = toolbar.nextGenCheck(),
                    $linkOverlay, $image;

                // check if link contains an image
                $image = $currentLink.find('img');
                isImageLink = this.isImageLink($image);

                // ----------------------------------------
                // TEST link URL
                // Add classes to $currentLink if link url does not pass tests
                // ----------------------------------------
                switch (true) {
                    // test for mobile specific links
                    case (linkURL.indexOf('tel') >= 0):
                        if (isImageLink) {
                            $linkOverlay = checkLinks.addDivOverlay(isNextGen, $currentLink);
                            $linkOverlay.addClass('mobilePhoneLink');
                        } else {
                            $currentLink.addClass('mobilePhoneLink');
                        }
                        // these links do not need to be sent to ajax testing,
                        // so minus this from the running total of links
                        checkLinks.config.totalTests = checkLinks.config.totalTests - 1;
                        checkLinks.config.totalLinks = checkLinks.config.totalLinks - 1;
                        return false;
                        // test for javascript links or Jump Links
                    case (linkURL.indexOf('javascript') >= 0 || (linkURL.indexOf('#') === 0 || linkURL.indexOf('#') === 1)):
                        $currentLink.addClass('jumpLink');
                        // these links do not need to be sent to ajax testing,
                        // so minus this from the running total of links
                        checkLinks.config.totalTests = checkLinks.config.totalTests - 1;
                        checkLinks.config.totalLinks = checkLinks.config.totalLinks - 1;
                        return false;
                        // test for undefined or empty URLs
                    case (typeof $currentLink === 'undefined' || linkURL === ''):
                        $currentLink.addClass('attention');
                        checkLinks.config.totalTests = checkLinks.config.totalTests - 1;
                        return false;
                        // test for absolute path URLs
                        // ** highlight for absolute URL but still test **
                    case (linkURL.indexOf('www') > -1 || linkURL.indexOf('://') > -1):
                        if (isImageLink) {
                            $linkOverlay = checkLinks.addDivOverlay(isNextGen, $currentLink);
                            $linkOverlay.addClass('otherDomain');
                        } else {
                            $currentLink.addClass('otherDomain');
                        }
                        return true; // TEST THE ABSOLUTE URL REGARDLESS
                    default:
                        // do nothing
                }
                return true;
            },
            nextgenTestLinks: function () {
                // ----------------------------------------
                // NEXT GEN SITE LOGIC
                // ----------------------------------------
                var $sections = jQuery('main').find('section'),
                    $otherLinks = jQuery('header, footer').find('a'),
                    len = $sections.length,
                    a = 0,
                    $currentLink,
                    $image = null,
                    $imagelink = null,
                    isImageLink = false,
                    $cardLinkContainer, $cardSEOContainer, $cardImageContainer, $cardLinks, $copyTextLinks, myLength, youLength, jLength, q, w, j, $currentCard, cardClass, passedChecks, $cardDeck;

                // set total tests to number of links on page
                checkLinks.config.totalTests = $otherLinks.length;
                checkLinks.config.totalLinks = $otherLinks.length;

                // ----------------------------------------
                // TEST LINKS FOUND IN HEADER AND FOOTER OF SITE
                // TESTS TO BODY LINKS WILL BE HANDLED DIFFERENTLY
                jLength = $otherLinks.length;
                j = 0;
                for (j; j < jLength; j += 1) {
                    $currentLink = jQuery($otherLinks[j]);
                    $currentLink.addClass('siteLink'); // add default flag class to links
                    // perform checks to link
                    // add flag class, check target, check title, check url
                    passedChecks = this.testURLs($currentLink);
                    if (!passedChecks) {
                        continue;
                    }

                    // USING TETRA AJAX TESTING BECAUSE ALL LINKS IN THE HEADER AND FOOTER EITHER TEXT LINKS or
                    // FONT IMAGE LINKS
                    // send link to ajx testing
                    this.tetraAjaxTest($currentLink);

                }
                // ----------------------------------------
                // ----------------------------------------
                // TEST BODY LINKS
                // ASSUMPTION THAT ALL BODY LINKS WILL BE LOCATED INSIDE CARDS
                for (a; a < len; a += 1) {
                    // reset variables
                    $image = null;
                    $imagelink = null;
                    isImageLink = false;
                    $currentCard = jQuery($sections[a]);
                    $currentLink = null;
                    $cardDeck = null;

                    if ($currentCard.attr('class') !== undefined) {
                        cardClass = $currentCard.attr('class');
                    }

                    $cardLinkContainer = $currentCard.find('div.link');
                    $cardSEOContainer = $currentCard.find('div.copy');
                    $cardImageContainer = $currentCard.find('div.media');
                    $cardDeck = $currentCard.find('div.deck');

                    //detect if the section element is a parent container
                    //check if the section class contains 'branchy'
                    if (cardClass.indexOf('branchy') > -1) {
                        continue;
                    }

                    //detect if the section element is a container
                    //check if the div.deck contains content
                    if ($cardDeck.is(':not(:empty)')) {
                        continue;
                    }

                    switch (true) {
                        // ----------------------------------------
                        // ----------------------------------------
                        // card style is set to CTA links
                        case (cardClass.indexOf('link-clickable') > -1):
                            // THERE SHOULD BE NO NEED TO CHECK FOR IMAGES IN THIS STYLE OF CARD
                            // THE IMAGE WILL NEVER BE A LINK THUS NOT NEEDING TO BE CHECKED

                            // CHECK ALL LINKS DEFINED IN CARD SETTINGS
                            // get all links defined in card
                            // should include all primary, secondary, and tenary links
                            $cardLinks = $cardLinkContainer.find('a'); // this is an array
                            myLength = $cardLinks.length;
                            q = 0;
                            isImageLink = false; // variable for ajax function

                            for (q; q < myLength; q += 1) {
                                $currentLink = jQuery($cardLinks[q]);
                                $currentLink.addClass('siteLink'); // add default flag class to links
                                // perform checks to link
                                // add flag class, check target, check title, check url
                                passedChecks = this.testURLs($currentLink);
                                if (!passedChecks) {
                                    continue;
                                }

                                // send link to ajx testing
                                this.nextGenAjaxTest($currentLink);
                            }

                            // CHECK ALL LINKS DEFINED IN SEO TEXT in COPY of RECORD
                            // get all text links in copy text of card
                            $copyTextLinks = $cardSEOContainer.find('a');
                            youLength = $copyTextLinks.length;

                            if (youLength > 0) {
                                w = 0;
                                for (w; w < youLength; w += 1) {
                                    $currentLink = jQuery($copyTextLinks[w]);
                                    $currentLink.addClass('siteLink'); // add default flag class to links
                                    // perform checks to link
                                    // add flag class, check target, check title, check url
                                    passedChecks = this.testURLs($currentLink);
                                    if (!passedChecks) {
                                        continue;
                                    }

                                    // send link to ajx testing
                                    this.nextGenAjaxTest($currentLink);
                                }
                            }
                            break;
                            // ----------------------------------------
                            // ----------------------------------------
                            // card style is set to CTA links
                        case (cardClass.indexOf('none-clickable') > -1):
                            // THERE SHOULD BE NO NEED TO CHECK FOR IMAGES IN THIS STYLE OF CARD
                            // THE IMAGE WILL NEVER BE A LINK THUS NOT NEEDING TO BE CHECKED

                            // CHECK ALL LINKS DEFINED IN CARD SETTINGS
                            // get all links defined in card
                            // should include all primary, secondary, and tenary links
                            $cardLinks = $cardLinkContainer.find('a'); // this is an array
                            myLength = $cardLinks.length;
                            q = 0;
                            isImageLink = false; // variable for ajax function

                            for (q; q < myLength; q += 1) {
                                $currentLink = jQuery($cardLinks[q]);
                                $currentLink.addClass('siteLink'); // add default flag class to links
                                // perform checks to link
                                // add flag class, check target, check title, check url
                                passedChecks = this.testURLs($currentLink);
                                if (!passedChecks) {
                                    continue;
                                }

                                // send link to ajx testing
                                this.nextGenAjaxTest($currentLink);
                            }

                            // CHECK ALL LINKS DEFINED IN SEO TEXT in COPY of RECORD
                            // get all text links in copy text of card
                            $copyTextLinks = $cardSEOContainer.find('a');
                            youLength = $copyTextLinks.length;

                            if (youLength > 0) {
                                w = 0;
                                for (w; w < youLength; w += 1) {
                                    $currentLink = jQuery($copyTextLinks[w]);
                                    $currentLink.addClass('siteLink'); // add default flag class to links
                                    // perform checks to link
                                    // add flag class, check target, check title, check url
                                    passedChecks = this.testURLs($currentLink);
                                    if (!passedChecks) {
                                        continue;
                                    }

                                    // send link to ajx testing
                                    this.nextGenAjaxTest($currentLink);
                                }
                            }
                            break;
                            // ----------------------------------------
                            // ----------------------------------------
                            // card style is set to whole card is clickable and has CTA links
                            // if card is made clickable text links will not be able to be reached.
                            // should this still be checked?

                        case (cardClass.indexOf('card-clickable-v2') > -1):
                            $cardLinkContainer = $currentCard.find('div.link');
                            $cardSEOContainer = $currentCard.find('div.copy');
                            $cardImageContainer = $currentCard.find('div.media');

                            // check if card has an image
                            if ($cardImageContainer.is(':empty')) {
                                // this shouldn't happen as if the card is made to be clickable it should mean that the card will have an image as a 'best practice'
                                isImageLink = false;
                            } else {
                                // find image in the card and apply a div overlay
                                isImageLink = true;
                                // find FIRST PRIMARY text link
                                $currentLink = $cardLinkContainer.find('a[class*="primary"]:first');
                                $currentLink.addClass('siteLink'); // add default flag class to links
                                $image = $cardImageContainer.find('img');
                                // add div overlay to image

                                // THERE IS NO NEED TO TEST OTHER LINKS AS THEY WON'T MATTER
                                // THE CARD WILL ONLY LINK TO THE FIRST PRIMARY LINK IN THE CARD
                                passedChecks = this.testURLs($currentLink);
                                if (!passedChecks) {
                                    continue;
                                }

                                // send link to ajx testing
                                // PASS $CURRENTCARD FOR OVERLAYING THE DIV PURPOSES.
                                this.nextGenAjaxTest($currentLink, isImageLink, $currentCard);

                                // TEST other Links defined in card Settings
                                // get all links defined in card
                                // should include all primary, secondary, and tenary links
                                $cardLinks = $cardLinkContainer.find('a'); // this is an array
                                myLength = $cardLinks.length;
                                q = 0;
                                for (q; q < myLength; q += 1) {
                                    $currentLink = jQuery($cardLinks[q]);
                                    $currentLink.addClass('siteLink'); // add default flag class to links
                                    // perform checks to link
                                    // add flag class, check target, check title, check url
                                    passedChecks = this.testURLs($currentLink);
                                    if (!passedChecks) {
                                        continue;
                                    }

                                    // send link to ajx testing
                                    // DOESN'T NEED TO SEND IN isImageLink AS THESE LINKS WILL ALMOST ALWAYS BE TEXT LINKS
                                    this.nextGenAjaxTest($currentLink);
                                }

                                // TEST TEXT LINKS IN THE COPY OF THE CARD
                                // check copy container and grab all links
                                $copyTextLinks = $cardSEOContainer.find('a');
                                youLength = $copyTextLinks.length;

                                if (youLength > 0) {
                                    w = 0;
                                    for (w; w < youLength; w += 1) {
                                        $currentLink = jQuery($copyTextLinks[w]);
                                        $currentLink.addClass('siteLink'); // add default flag class to links
                                        // perform checks to link
                                        // add flag class, check target, check title, check url
                                        passedChecks = this.testURLs($currentLink);
                                        if (!passedChecks) {
                                            continue;
                                        }

                                        // send link to ajx testing
                                        this.nextGenAjaxTest($currentLink);
                                    }
                                }
                            }
                            break;
                            // ----------------------------------------
                            // ----------------------------------------
                            // card style is set to whole card is clickable
                            // if card is made clickable text links will not be able to be reached.
                        case (cardClass.indexOf('card-clickable') > -1):
                            $cardLinkContainer = $currentCard.find('div.link');
                            $cardSEOContainer = $currentCard.find('div.copy');
                            $cardImageContainer = $currentCard.find('div.media');

                            // check if card has an image
                            if ($cardImageContainer.is(':empty')) {
                                // this shouldn't happen as if the card is made to be clickable it should mean that the card will have an image as a 'best practice'
                                isImageLink = false;
                            } else {
                                // find image in the card and apply a div overlay
                                isImageLink = true;
                                // find FIRST PRIMARY text link
                                $currentLink = $cardLinkContainer.find('a[class*="primary"]:first');
                                $currentLink.addClass('siteLink'); // add default flag class to links
                                $image = $cardImageContainer.find('img');

                                // THERE IS NO NEED TO TEST OTHER LINKS AS THEY WON'T MATTER
                                // THE CARD WILL ONLY LINK TO THE FIRST PRIMARY LINK IN THE CARD
                                passedChecks = this.testURLs($currentLink);
                                if (!passedChecks) {
                                    continue;
                                }

                                // send link to ajx testing
                                // PASS $CURRENTCARD FOR OVERLAYING THE DIV PURPOSES.
                                this.nextGenAjaxTest($currentLink, isImageLink, $currentCard);

                                // TEST other Links defined in card Settings
                                // get all links defined in card
                                // should include all primary, secondary, and tenary links
                                $cardLinks = $cardLinkContainer.find('a'); // this is an array
                                myLength = $cardLinks.length;
                                q = 0;
                                for (q; q < myLength; q += 1) {
                                    $currentLink = jQuery($cardLinks[q]);
                                    $currentLink.addClass('siteLink'); // add default flag class to links

                                    // perform checks to link
                                    // add flag class, check target, check title, check url
                                    passedChecks = this.testURLs($currentLink);
                                    if (!passedChecks) {
                                        continue;
                                    }

                                    // send link to ajx testing
                                    // DOESN'T NEED TO SEND IN isImageLink AS THESE LINKS WILL ALMOST ALWAYS BE TEXT LINKS
                                    this.nextGenAjaxTest($currentLink);
                                }

                                // TEST TEXT LINKS IN THE COPY OF THE CARD
                                // check copy container and grab all links
                                $copyTextLinks = $cardSEOContainer.find('a');
                                youLength = $copyTextLinks.length;

                                if (youLength > 0) {
                                    w = 0;
                                    for (w; w < youLength; w += 1) {
                                        $currentLink = jQuery($copyTextLinks[w]);
                                        $currentLink.addClass('siteLink'); // add default flag class to links

                                        // perform checks to link
                                        // add flag class, check target, check title, check url
                                        passedChecks = this.testURLs($currentLink);
                                        if (!passedChecks) {
                                            continue;
                                        }

                                        // send link to ajx testing
                                        this.nextGenAjaxTest($currentLink);
                                    }
                                }
                            }
                            break;
                        default:
                            console.log('default switch statement reached');
                            console.log($currentCard);
                    }
                }
            },
            // checks if $image has length
            // This is to verify that an image does exists inside the link
            isImageLink: function ($image) {
                if ($image.length) {
                    return true;
                }
                return false;
            },
            // checks the data returned for KEY 404 indentifiers
            // will return TRUE if a identifier is found
            // will return FALSE if no identifier is found
            checkFor404: function (data) {
                // checks the returned page for key 404 identifiers
                if (data.indexOf('pageNotFound') > -1 || data.indexOf('not currently a functioning page') > -1) {
                    return true;
                }
                return false;
            },
            // checks if the current link is within a QUICK LINKS PLUS WIDGET modified by EDO modules
            // Will return false if link is inside a QLP widget
            checkForQuickLinksWidget: function ($currentLink) {
                // create check for links inside quick links widget
                if ($currentLink.closest('.cell').attr('data-cell')) {
                    // check if link is within a quick links widget
                    if ($currentLink.closest('.cell').attr('data-cell').indexOf('Quick_Links_Plus') > -1) {
                        // checks if QLP is modified by modules
                        if ($currentLink.closest('section').attr('class').indexOf('customTemplate') === -1) {
                            return false;
                        }
                    }
                }
            },
            // adds classes to DOM element that the user will be able to see
            // classes will make it clear to the user via CSS that is already added to the site
            addFlagsToElements: function ($visualElement, pageError404) {
                switch (true) {
                    // if internal page 404
                    case (pageError404):
                        checkLinks.error($visualElement);
                        checkLinks.config.errors += 1;
                        break;

                        // if link IS legit
                    case (!pageError404):
                        checkLinks.success($visualElement);
                        break;

                    default:
                        // do nothing
                }
            },
            tetraAjaxTest: function ($currentLink) {
                var hasImage = 0,
                    isImageLink = false,
                    wrappedContents = false,
                    $linkOverlay, pageError404,
                    linkURL = checkLinks.addURLParameter($currentLink),
                    isNextGen = toolbar.nextGenCheck();

                // test each link
                jQuery.ajax({
                    url: linkURL, //be sure to check the right attribute
                    type: 'post',
                    crossDomain: true,
                    method: 'get',
                    dataType: 'html',
                    success: function (data) {

                        // checks to see if link is an image link
                        hasImage = $currentLink.has('img').length;
                        if (hasImage) {
                            isImageLink = true;
                            $linkOverlay = checkLinks.addDivOverlay(isNextGen, $currentLink);
                        }

                        // checks to see if the link has inline css
                        // if it does wrap contents in in span tag and add classes to that
                        wrappedContents = $currentLink.attr('style') ? true : false;
                        if (wrappedContents && !hasImage) {
                            $currentLink.wrapInner('<span></span>');
                            $linkOverlay = jQuery($currentLink.children('span'));
                        }

                        // If value is false all class modifications should be done to the link itself
                        pageError404 = checkLinks.checkFor404(data);

                        // if link is an image link
                        // ADD CLASS FLAGS TO DIV OVERLAY
                        // OTHERWISE ADD CLASS FLAGS TO LINK ELEMENT
                        if (isImageLink || wrappedContents) {
                            checkLinks.addFlagsToElements($linkOverlay, pageError404);
                        } else {
                            checkLinks.addFlagsToElements($currentLink, pageError404);
                        }

                    },
                    error: function (jqXHR) {
                        //set link in red if there is any errors with link
                        checkLinks.config.errors += 1;
                        if (jqXHR.status === 404) {

                            if (isImageLink) {
                                checkLinks.error($linkOverlay);
                            } else {
                                checkLinks.error($currentLink);
                            }

                        }
                    },
                    statusCode: {
                        404: function () {
                            $currentLink.addClass('fourOfour');

                            if (isImageLink) {
                                checkLinks.error($linkOverlay);
                            } else {
                                checkLinks.error($currentLink);
                            }

                            checkLinks.config.errors += 1;
                        }
                    },
                    complete: function () {
                        checkLinks.config.count += 1;
                        checkLinks.config.$counter.text(checkLinks.config.count + ' of ' + checkLinks.config.totalTests);
                    }
                });
            },
            nextGenAjaxTest: function ($currentLink, isImageLink, $currentCard) {
                // NEXT GEN NEEDS LINK AND PARENT CARD TO OVERLAY IMAGE
                var $linkOverlay, pageError404,
                    linkURL = checkLinks.addURLParameter($currentLink),
                    isNextGen = toolbar.nextGenCheck();

                //check if isImageLink is empty and check if $currentCard is empty
                //most likely because the parameter was not mentioned in the calling statement
                if (!isImageLink) {
                    isImageLink = false;
                } else if (!$currentCard) {
                    $currentCard = null;
                }

                // test each link
                jQuery.ajax({
                    url: linkURL, //be sure to check the right attribute
                    type: 'post',
                    crossDomain: true,
                    method: 'get',
                    dataType: 'html',
                    success: function (data) {

                        // check to see if the card has an image prior to startin the ajax testing
                        if (isImageLink) {
                            $linkOverlay = checkLinks.addDivOverlay(isNextGen, $currentLink, $currentCard);
                        }

                        // If value is false all class modifications should be done to the link itself
                        pageError404 = checkLinks.checkFor404(data);

                        // if link is an image link
                        // ADD CLASS FLAGS TO DIV OVERLAY
                        // OTHERWISE ADD CLASS FLAGS TO LINK ELEMENT
                        if (isImageLink) {
                            checkLinks.addFlagsToElements($linkOverlay, pageError404);
                        } else {
                            checkLinks.addFlagsToElements($currentLink, pageError404);
                        }

                    },
                    error: function (jqXHR) {
                        //set link in red if there is any errors with link
                        checkLinks.config.errors += 1;
                        if (jqXHR.status === 404) {

                            if (isImageLink) {
                                checkLinks.error($linkOverlay);
                            } else {
                                checkLinks.error($currentLink);
                            }

                        }
                    },
                    statusCode: {
                        404: function () {
                            $currentLink.addClass('fourOfour');

                            if (isImageLink) {
                                checkLinks.error($linkOverlay);
                            } else {
                                checkLinks.error($currentLink);
                            }

                            checkLinks.config.errors += 1;
                        }
                    },
                    complete: function () {
                        checkLinks.config.count += 1;
                        checkLinks.config.$counter.text(checkLinks.config.count + ' of ' + checkLinks.config.totalTests);
                    }
                });
            },
            toggleDisable: function () {
                checkLinks.config.$activateButt.prop('disabled', function (index, value) {
                    return !value;
                });
            },
            buildLegendContent: function () {
                var $contentArray = checkLinks.config.$legendContent,
                    key, value, $listItem;
                // loop through Legend Content list
                for (key in $contentArray) {
                    value = $contentArray[key];
                    // build listing element
                    $listItem = jQuery('<li>').attr({
                        class: 'legendContent ' + key
                    }).append(value);
                    // attach to legend list
                    checkLinks.config.$legendList.append($listItem);
                }
            },
            showLegend: function () {
                checkLinks.config.$legend.slideToggle(500);
            },
            separateID: function (webID) {
                var split = webID.split('-');
                return split[1];
            },
            ajaxStart: function () {
                jQuery(document).ajaxStart(function () {
                    checkLinks.config.$message.text('checking links').append(checkLinks.config.$counter);
                    checkLinks.config.$message.append(checkLinks.config.$iconContainer).append(checkLinks.config.$thinking);
                    checkLinks.config.$container.append(checkLinks.config.$message);
                });
            },
            ajaxStop: function () {
                jQuery(document).ajaxStop(function () {
                    checkLinks.config.$message.empty();
                    checkLinks.config.$thinking.remove();
                    checkLinks.config.$message.text('all links checked');
                    checkLinks.config.$iconContainer.append(checkLinks.config.$done);
                    checkLinks.config.$message.append(checkLinks.config.$iconContainer);
                    checkLinks.config.$message.delay(7000).fadeOut(2000, function () {
                        checkLinks.config.$container.remove();
                    });
                });
            },
            error: function ($this) {
                // ITS SUPPOSED TO ADD THE ERROR CLASS TO THE DIV OVERLAY IF THE LINK IS AN IMAGE LINK
                $this.addClass('error');
            },
            success: function ($this) {
                $this.addClass('success');
            },
            // ----------------------------------------
            // Tier 4
            // ----------------------------------------
            addDivOverlay: function (isNextGen, $currentLink, $currentCard) {
                // sets $currentCard to null for tetra site checks
                $currentCard = $currentCard ? $currentCard : null;
                this.cacheDOMOverlayElements($currentLink);
                this.createOverlayElements(isNextGen);
                this.buildOverlayElements(isNextGen);
                this.attachToImage(isNextGen, $currentLink, $currentCard);
                return this.$divOverlay;
            },
            cacheDOMOverlayElements: function ($currentLink /*, isNextGen*/ ) {
                // IF NEXTGEN SITE
                this.widthOfImage = $currentLink.find('img').width();
                this.heightOfImage = $currentLink.find('img').height();
                this.linkTitle = jQuery($currentLink).attr('title');
            },
            createOverlayElements: function (isNextGen) {
                // create div overlay
                if (isNextGen) {
                    this.$divOverlay = jQuery('<div>').attr({
                        class: 'cardOverlay'
                    });
                } else {
                    this.$divOverlay = jQuery('<div>').attr({
                        class: 'siteLink imgOverlay'
                    });
                }
            },
            buildOverlayElements: function (isNextGen) {
                if (!isNextGen) {
                    // make the div overlay the same dimensions as the image
                    this.$divOverlay.css({
                        width: this.widthOfImage + 'px',
                        height: this.heightOfImage + 'px',
                    });
                }
                // add content to div
                // ADD THE LINK TITLE
                this.$divOverlay.append(this.linkTitle);

            },
            attachToImage: function (isNextGen, $currentLink, $currentCard) {
                // center div overlay
                if (isNextGen) {
                    this.$divOverlay.attr({
                        class: 'imgOverlay myNextGen'
                    });
                    $currentCard.prepend(this.$divOverlay);
                } else {
                    $currentLink.prepend(this.$divOverlay);
                }
            }
        },

        /* ************************************************************************************************************************ */
        /* **************************************** URL MODIFIER TOOLS **************************************** */
        /* ************************************************************************************************************************ */

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- URL MODIFIER Panel ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        urlModifiers = {
            init: function () {
                // initialize module
                this.createElements();
                this.buildPanel();
                this.cacheDOM();
                this.setToggle();
                this.addTool();
                this.bindEvents();
                this.displayPanel();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                // main panel container
                urlModifiers.config = {
                    $urlModContainer: jQuery('<div>').attr({
                        class: 'toolBox',
                        id: 'urlModContainer'
                    }),
                    $urlModPanel: jQuery('<div>').attr({
                        class: 'toolsPanel',
                        id: 'urlModTools'
                    }),
                    $urlModTitle: jQuery('<div>').attr({
                        class: 'panelTitle',
                        id: 'urlModTitle',
                        title: 'Click to Minimize / Maximize'
                    }).text('URL Modifiers'),
                    $autoApplyContainer: jQuery('<div>').attr({
                        class: 'toggleTool autoApplyInput',
                        title: 'will auto apply URL modifiers to current URL\n*please reload the page to update the URL to current settings*'
                    }),
                    $autoApplyTitle: jQuery('<div>').attr({
                            class: 'autoApply'
                        })
                        .text('Auto Apply Modifiers?'),
                    $autoApplyIcon: jQuery('<div>').attr({
                        id: 'autoApplyIcon'
                    }),
                    $FAtoggle: jQuery('<i class="fa fa-toggle-off fa-lg"></i>'),
                };
            },
            buildPanel: function () {
                // attach panel elements to container
                urlModifiers.config.$urlModPanel
                    .append(nextGenToggle.init())
                    .append(m4Check.init())
                    .append(autofillToggle.init());

                urlModifiers.config.$autoApplyContainer.append(urlModifiers.config.$autoApplyTitle);
                urlModifiers.config.$autoApplyContainer.append(urlModifiers.config.$autoApplyIcon);
                urlModifiers.config.$autoApplyIcon.append(urlModifiers.config.$FAtoggle);
                urlModifiers.config.$urlModPanel.append(urlModifiers.config.$autoApplyContainer);

                // attach title and URL Mod panel to URL Mod container
                urlModifiers.config.$urlModContainer.append(urlModifiers.config.$urlModTitle);
                urlModifiers.config.$urlModContainer.append(urlModifiers.config.$urlModPanel);
            },
            cacheDOM: function () {
                // DOM elements
                this.variableList = this.programData();
                this.$cm = unsafeWindow.ContextManager;
                this.isLive = this.$cm.isLive();
                this.$toolBoxContainer = jQuery('.toolboxContainer');
            },
            setToggle: function () {
                // get value of custom variable and set toggles accordingly
                var currentToggle = getValue('autoApplyParameters');

                if (currentToggle) {
                    this.toggleOn();
                    this.applyParameters();
                } else {
                    this.toggleOff();
                }
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(urlModifiers.config.$urlModContainer);
            },
            bindEvents: function () {
                // minimize
                urlModifiers.config.$urlModTitle.on('click', this.toggleFeature);
                urlModifiers.config.$urlModTitle.on('click', this.saveState);
                urlModifiers.config.$autoApplyContainer.on('click', this.flipTheSwitch.bind(this));
            },
            displayPanel: function () {
                // loop through variable list to find the panel title
                var variables = this.variableList,
                    state = '',
                    key = '';
                for (key in variables) {
                    if (key === 'urlModTools') {
                        state = variables[key] ? 'show' : 'hide';
                        this.setState(urlModifiers.config.$urlModPanel, state);
                    }
                }
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            programData: function () {
                var allVariables = programVariables(),
                    length = allVariables.length,
                    a = 0,
                    varList = {},
                    key = '',
                    value = '';
                // add variables to list
                for (a; a < length; a += 1) {
                    key = allVariables[a];
                    value = getValue(key, false);
                    varList[key] = value;
                }
                return varList;
            },
            toggleOn: function () {
                // set toggle on image
                var $toggle = urlModifiers.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-off');
                $toggle.addClass('fa-toggle-on');
            },
            toggleOff: function () {
                // set toggle off image
                var $toggle = urlModifiers.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-on');
                $toggle.addClass('fa-toggle-off');
            },
            applyParameters: function () {
                var urlParameters2 = {
                        'nextGen=': nextGenToggle.returnParameters(),
                        'relative=': m4Check.returnParameters(),
                        'disableAutofill=': autofillToggle.returnParameters()
                    },
                    findThis = '',
                    url = window.location.href,
                    key = '',
                    matchesFound = [],
                    foundThis = false;
                for (key in urlParameters2) {
                    findThis = key;
                    // this works with current URL
                    // will check to see if current URL has all the variables with it
                    // ONE DOWNSIDE IS THAT IF THE URL DOESNT ALREADY HAVE A ? IN IT
                    // AN ERROR WILL BE THROWN
                    if (url.indexOf('?') === -1) {
                        url += '?';
                    }
                    // force the page to reload in DESKTOP SITE
                    // no downside to NEXT GEN SITES
                    if (url.indexOf('device=immobile') === -1) {
                        url += '&device=immobile';
                    }
                    // determine search term is empty
                    // this will mean that the toggle is turned off
                    if (findThis === undefined || findThis === '') {} else {
                        // search url for KEY
                        foundThis = this.searchURL(key, url);

                        //--------------------------------------------------------
                        //next gen searches
                        //--------------------------------------------------------
                        if (key === 'nextGen=' && foundThis && urlParameters2[key]) { // PARAMETER FOUND IN URL
                            // if 'searching for nextgen' AND 'found parameter in url' AND 'toggle is ON'
                            if (url.indexOf('nextGen=false') >= 0) {
                                // if 'parameter is set to false'
                                url = url.replace('nextGen=false', 'nextGen=true');
                                matchesFound.push(false);
                            } else if (url.indexOf('nextGen=true') >= 0) {
                                // if 'parameter is set to true'
                                // do nothing
                                matchesFound.push(true);
                            }
                        } else if (key === 'nextGen=' && foundThis && !urlParameters2[key]) { // PARAMETER FOUND IN URL
                            // if 'searching for nextgen' AND 'found parameter in url' AND 'toggle is OFF'
                            if (url.indexOf('nextGen=true') >= 0) {
                                // if 'parameter is set to true'
                                url = url.replace('nextGen=true', 'nextGen=false');
                                matchesFound.push(false);
                            } else if (url.indexOf('nextGen=false') >= 0) {
                                // if 'parameter is set to false'
                                // do nothing
                                matchesFound.push(true);
                            }
                        } else if (key === 'nextGen=' && !foundThis && urlParameters2[key]) { // PARAMETER NOT FOUND IN URL
                            // if 'searching for nextgen' AND 'parameter not found in url' AND 'toggle is ON'
                            // Add parameter to url string
                            url += '&nextGen=true';
                            matchesFound.push(false);
                        } else if (key === 'nextGen=' && !foundThis && !urlParameters2[key]) { // PARAMETER NOT FOUND IN URL
                            // if 'searching for nextgen' AND 'parameter not found in url' AND 'toggle is OFF'
                            // do nothing
                            matchesFound.push(true);
                        }

                        //--------------------------------------------------------
                        //autofill searches
                        //--------------------------------------------------------
                        if (key === 'disableAutofill=' && foundThis && urlParameters2[key]) { // PARAMETER FOUND IN URL
                            // if 'searching for disable autofill' AND 'found parameter in url' AND 'toggle is ON'
                            if (url.indexOf('disableAutofill=false') >= 0) {
                                // if 'parameter is set to false'
                                url = url.replace('disableAutofill=false', 'disableAutofill=true');
                                matchesFound.push(false);
                            } else if (url.indexOf('disableAutofill=true') >= 0) {
                                // if 'parameter is set to true'
                                // do nothing
                                matchesFound.push(true);
                            }
                        } else if (key === 'disableAutofill=' && foundThis && !urlParameters2[key]) { // PARAMETER FOUND IN URL
                            // if 'searching for disable autofill' AND 'found parameter in url' AND 'toggle is OFF'
                            if (url.indexOf('disableAutofill=true') >= 0) {
                                // if 'parameter is set to true'
                                url = url.replace('disableAutofill=true', 'disableAutofill=false');
                                matchesFound.push(false);
                            } else if (url.indexOf('disableAutofill=false') >= 0) {
                                // if 'parameter is set to false'
                                // do nothing
                                matchesFound.push(true);
                            }
                        } else if (key === 'disableAutofill=' && !foundThis && urlParameters2[key]) { // PARAMETER NOT FOUND IN URL
                            // if 'searching for disable autofill' AND 'parameter not found in url' AND 'toggle is ON'
                            // Add parameter to url string
                            url += '&disableAutofill=true';
                            matchesFound.push(false);
                        } else if (key === 'disableAutofill=' && !foundThis && !urlParameters2[key]) { // PARAMETER NOT FOUND IN URL
                            // if 'searching for nextgen' AND 'parameter not found in url' AND 'toggle is OFF'
                            // do nothing
                            matchesFound.push(true);
                        }

                        //--------------------------------------------------------
                        //m4 parameter searches
                        //--------------------------------------------------------
                        if (key === 'relative=' && foundThis && urlParameters2[key]) { // PARAMETER FOUND IN URL
                            // if 'searching for m4 parameter' AND 'found parameter in url' AND 'toggle is turned on'
                            // do nothing
                            matchesFound.push(true);
                        } else if (key === 'relative=' && foundThis && !urlParameters2[key]) { // PARAMETER FOUND IN URL
                            // if 'searching for m4 parameter' AND 'found parameter in url' AND 'toggle is off'
                            // remove ADDED parameter from URL
                            url = url.replace('&comments=true&relative=true', '');
                            matchesFound.push(false);
                        } else if (key === 'relative=' && !foundThis && urlParameters2[key]) { // PARAMETER NOT FOUND IN URL
                            // if 'searching for m4 parameter' AND 'parameter not found in url' AND 'toggle is ON'
                            // Add parameter to url string
                            url += '&comments=true&relative=true';
                            matchesFound.push(false);
                        } else if (key === 'relative=' && !foundThis && !urlParameters2[key]) { // PARAMETER NOT FOUND IN URL
                            // if 'searching for m4 parameter' AND 'parameter not found in url' AND 'toggle is OFF'
                            // do nothing
                            matchesFound.push(true);
                        }
                    }
                }
                // reloadPAge
                this.reloadPage(matchesFound, url);
            },
            flipTheSwitch: function () {
                var value = getValue('autoApplyParameters', false);
                // set saved variable to opposite of current value
                setValue('autoApplyParameters', !value);
                // set toggle
                this.setToggle();
            },
            toggleFeature: function () {
                return urlModifiers.config.$urlModPanel.slideToggle(500);
            },
            saveState: function (event) {
                // get current state
                var vName = jQuery(event.target).siblings('.toolsPanel').attr('id'),
                    currState = getValue(vName, false);
                // sets usingM4 value
                setValue(vName, !currState);
            },
            setState: function ($panel, state) {
                if (state === 'show') {
                    $panel.addClass('appear');
                } else if (state === 'hide') {
                    $panel.addClass('disappear');
                }
            },
            // ----------------------------------------
            // tier 3
            // ----------------------------------------
            searchURL: function (findThis, url) {
                if (url.indexOf(findThis) >= 0) {
                    return true;
                }
                return false;
            },
            reloadPage: function (matchesFound, url) {
                // determine if all parameters are found in the URL
                // will stop the page from reloading after initial build.
                var q = 0,
                    matchLength = matchesFound.length,
                    reloadPage = false;

                // loop through array to determine if page should reload
                for (q; q < matchLength; q += 1) {
                    // if a match isn't found, break out of loop and reload the page.
                    if (matchesFound[q]) {
                        reloadPage = false;
                    } else {
                        reloadPage = true;
                        break;
                    }
                }

                // if reloadPage is true reload page
                if (reloadPage) {
                    console.log('reloading page');
                    window.location.href = url;
                } else {
                    console.log('no reload needed');
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- next gen toggle ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        nextGenToggle = {
            init: function (callingPanel) {
                this.createElements();
                this.buildTool();
                this.cacheDOM(callingPanel);
                this.setToggle();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                nextGenToggle.config = {
                    $nextGenToggleContainer: jQuery('<div>').attr({
                        id: 'nextGenToggleInput',
                        class: 'toggleTool',
                        title: 'Apply NextGen=true'
                    }),
                    $nextGenToggleTitle: jQuery('<div>')
                        .text('nextGen parameters?'),
                    $nextGenToggleIcon: jQuery('<div>').attr({
                        id: 'nextGenToggleIcon'
                    }),
                    $FAtoggle: jQuery('<i class="fa fa-toggle-off fa-lg"></i>')
                };
            },
            buildTool: function () {
                nextGenToggle.config.$nextGenToggleIcon
                    .append(nextGenToggle.config.$FAtoggle);
                nextGenToggle.config.$nextGenToggleContainer
                    .append(nextGenToggle.config.$nextGenToggleTitle)
                    .append(nextGenToggle.config.$nextGenToggleIcon);
            },
            cacheDOM: function (callingPanel) {
                this.$toolsPanel = jQuery(callingPanel);
                this.cm = unsafeWindow.ContextManager;
                this.liveSite = this.cm.isLive();
            },
            setToggle: function () {
                if (this.getChecked()) { // if 'site is not live'
                    // if 'nextGen is turned on'
                    // set toggle and apply parameters
                    this.toggleOn();
                } else {
                    // if 'site is not live'
                    // set toggle and apply parameters
                    this.toggleOff();
                }
            },
            addTool: function () {
                // add to main toolbox
                this.$toolsPanel.append(nextGenToggle.config.$nextGenToggleContainer);
            },
            bindEvents: function () {
                // bind FA toggle with 'flipTheSwitch' action
                nextGenToggle.config.$nextGenToggleContainer.on('click', this.flipTheSwitch.bind(this));
            },
            returnParameters: function () {
                if (this.getChecked()) {
                    return true;
                }
                return false;
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            getChecked: function () {
                // grabs isNextGen value
                var a = getValue('isNextGen');
                return a;
            },
            toggleOn: function () {
                // set toggle on image
                var $toggle = nextGenToggle.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-off');
                $toggle.addClass('fa-toggle-on');
            },
            toggleOff: function () {
                // set toggle off image
                var $toggle = nextGenToggle.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-on');
                $toggle.addClass('fa-toggle-off');
            },
            flipTheSwitch: function () {
                // set saved variable to opposite of current value
                this.setChecked(!this.getChecked());
                // set toggle
                this.setToggle();
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            hasParameters: function () {
                // determine if site URL already has custom parameters
                if (window.location.href.indexOf('nextGen=') >= 0) {
                    return true;
                } else {
                    return false;
                }
            },
            siteState: function () {
                // return page variable
                return unsafeWindow.ContextManager.getVersion();
            },
            setChecked: function (bool) {
                // sets isNextGen value
                setValue('isNextGen', bool);
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- m4 checkbox toggle ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        m4Check = {
            init: function (callingPanel) {
                this.createElements();
                this.buildTool();
                this.cacheDOM(callingPanel);
                this.setToggle();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                m4Check.config = {
                    $m4Container: jQuery('<div>').attr({
                        id: 'm4Input',
                        class: 'toggleTool',
                        title: 'Apply relative and comments parameters'
                    }),
                    $m4CheckTitle: jQuery('<div>')
                        .text('M4 Parameters?'),
                    $m4Checkbox: jQuery('<div>').attr({
                        id: 'm4toggle'
                    }),
                    $FAtoggle: jQuery('<i class="fa fa-toggle-off fa-lg"></i>')
                };
            },
            buildTool: function () {
                m4Check.config.$m4Checkbox
                    .append(m4Check.config.$FAtoggle);
                m4Check.config.$m4Container
                    .append(m4Check.config.$m4CheckTitle)
                    .append(m4Check.config.$m4Checkbox);
            },
            setToggle: function () {
                if (this.getChecked()) { // if 'nextGen is turned on'
                    // set toggle and apply parameters
                    this.toggleOn();
                } else { // if 'site is not live'
                    // set toggle and apply parameters
                    this.toggleOff();
                }
            },
            cacheDOM: function (callingPanel) {
                this.$toolsPanel = jQuery(callingPanel);
                this.cm = unsafeWindow.ContextManager;
                this.liveSite = this.cm.isLive();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolsPanel.append(m4Check.config.$m4Container);
            },
            bindEvents: function () {
                // bind FA toggle with 'flipTheSwitch' action
                m4Check.config.$m4Container.on('click', this.flipTheSwitch.bind(this));
            },
            returnParameters: function () {
                if (this.getChecked()) {
                    return true;
                }
                return false;
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            getChecked: function () {
                // grabs usingM4 value
                var a = getValue('usingM4');
                return a;
            },
            toggleOn: function () {
                // set toggle on image
                var $toggle = m4Check.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-off');
                $toggle.addClass('fa-toggle-on');
            },
            toggleOff: function () {
                // set toggle off image
                var $toggle = m4Check.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-on');
                $toggle.addClass('fa-toggle-off');
            },
            flipTheSwitch: function () {
                // set saved variable to opposite of current value
                this.setChecked(!this.getChecked());
                // set toggle
                this.setToggle();
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            hasParameters: function () {
                // determine if site URL already has custom parameters
                if (window.location.href.indexOf('&comments=true&relative=true') >= 0) {
                    return true;
                } else {
                    return false;
                }
            },
            siteState: function () {
                // return page variable
                return unsafeWindow.ContextManager.getVersion();
            },
            setChecked: function (bool) {
                // sets usingM4 value
                setValue('usingM4', bool);
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- autofill toggle ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        autofillToggle = {
            init: function (callingPanel) {
                this.createElements();
                this.buildTool();
                this.cacheDOM(callingPanel);
                this.setToggle();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                autofillToggle.config = {
                    $autofillToggleContainer: jQuery('<div>').attr({
                        id: 'autofillToggleInput',
                        class: 'toggleTool',
                        title: 'Show all autofill tags on page'
                    }),
                    $autofillToggleTitle: jQuery('<div>')
                        .text('show autofill tags?'),
                    $autofillToggleIcon: jQuery('<div>').attr({
                        id: 'autofillToggleIcon'
                    }),
                    $FAtoggle: jQuery('<i class="fa fa-toggle-off fa-lg"></i>')
                };
            },
            buildTool: function () {
                autofillToggle.config.$autofillToggleIcon
                    .append(autofillToggle.config.$FAtoggle);
                autofillToggle.config.$autofillToggleContainer
                    .append(autofillToggle.config.$autofillToggleTitle)
                    .append(autofillToggle.config.$autofillToggleIcon);
            },
            setToggle: function () {
                if (this.getChecked()) { // if 'nextGen is turned on'
                    // set toggle and apply parameters
                    this.toggleOn();
                } else { // if 'site is not live'
                    // set toggle and apply parameters
                    this.toggleOff();
                }
            },
            cacheDOM: function (callingPanel) {
                this.$toolsPanel = jQuery(callingPanel);
                this.cm = unsafeWindow.ContextManager;
                this.liveSite = this.cm.isLive();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolsPanel.append(autofillToggle.config.$autofillToggleContainer);
            },
            bindEvents: function () {
                // bind FA toggle with 'flipTheSwitch' action
                autofillToggle.config.$autofillToggleContainer.on('click', this.flipTheSwitch.bind(this));
            },
            ifLive: function () {
                // remove tool if the site is live
                if (this.liveSite) {
                    jQuery(this).remove();
                }
            },
            returnParameters: function () {
                if (this.getChecked()) {
                    return true;
                }
                return false;
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            getChecked: function () {
                // grabs applyAutofill value
                var a = getValue('applyAutofill');
                return a;
            },
            toggleOn: function () {
                // set toggle on image
                var $toggle = autofillToggle.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-off');
                $toggle.addClass('fa-toggle-on');
            },
            toggleOff: function () {
                // set toggle off image
                var $toggle = autofillToggle.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-on');
                $toggle.addClass('fa-toggle-off');
            },
            flipTheSwitch: function () {
                // set saved variable to opposite of current value
                this.setChecked(!this.getChecked());
                // set toggle
                this.setToggle();
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            hasParameters: function () {
                if (window.location.href.indexOf('disableAutofill=') >= 0) {
                    return true;
                } else {
                    return false;
                }
            },
            siteState: function () {
                // return page variable
                return unsafeWindow.ContextManager.getVersion();
            },
            setChecked: function (bool) {
                // sets applyAutofill value
                setValue('applyAutofill', bool);
            }
        },

        /* ************************************************************************************************************************ */
        /* **************************************** TOGGLE TOOLS **************************************** */
        /* ************************************************************************************************************************ */

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Toggle Tools Panel ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        toggles = {
            init: function () {
                // initialize module
                this.createElements();
                this.buildPanel();
                this.cacheDOM();
                this.addTool();
                this.bindEvents();
                this.displayPanel();
            },
            createElements: function () {
                toggles.config = {
                    // ----------------------------------------
                    // Toggle Tools Panel
                    // ----------------------------------------
                    $togglesContainer: jQuery('<div>').attr({
                        class: 'toolBox',
                        id: 'togglesContainer'
                    }),
                    $togglesPanel: jQuery('<div>').attr({
                        class: 'toolsPanel',
                        id: 'toggleTools'
                    }),
                    $togglesTitle: jQuery('<div>').attr({
                        class: 'panelTitle',
                        id: 'togglesTitle',
                        title: 'Click to Minimize/Maximize'
                    }).text('Toggles')
                };
            },
            buildPanel: function () {
                // attach to continer
                toggles.config.$togglesContainer
                    .append(toggles.config.$togglesTitle)
                    .append(toggles.config.$togglesPanel);
            },
            cacheDOM: function () {
                // DOM elements
                this.$toolBoxContainer = jQuery('.toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(toggles.config.$togglesContainer);
            },
            bindEvents: function () {
                // minimize
                toggles.config.$togglesTitle.on('click', this.toggleFeature);
                toggles.config.$togglesTitle.on('click', this.saveState);
            },
            displayPanel: function () {
                // loop through variable list to find the panel title
                var variables = this.variableList,
                    state = '',
                    key = '';
                for (key in variables) {
                    if (key === 'toggleTools') {
                        state = variables[key] ? 'show' : 'hide';
                        this.setState(toggles.config.$togglesPanel, state);
                    }
                }
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            programData: function () {
                var allVariables = programVariables(),
                    length = allVariables.length,
                    a = 0,
                    varList = {},
                    key = '',
                    value = '';
                // add variables to list
                for (a; a < length; a += 1) {
                    key = allVariables[a];
                    value = getValue(key);
                    varList[key] = value;
                }
                return varList;
            },
            toggleFeature: function () {
                return toggles.config.$togglesPanel.slideToggle(500);
            },
            saveState: function (event) {
                // get current state
                var vName = jQuery(event.target).siblings('.toolsPanel').attr('id'),
                    currState = getValue(vName);
                // sets usingM4 value
                setValue(vName, !currState);
            },
            setState: function ($panel, state) {
                if (state === 'show') {
                    $panel.addClass('appear');
                } else if (state === 'hide') {
                    $panel.addClass('disappear');
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Refresh Page toggle ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        refreshPage = {
            init: function (callingPanel) {
                this.createElements();
                this.cacheDOM(callingPanel);
                this.buildTool();
                this.addTool();
                this.bindEvents();
                this.setToggle();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                refreshPage.config = {
                    $refreshContainer: jQuery('<div>').attr({
                        id: 'refreshMe',
                        class: 'toggleTool'
                    }),
                    $refreshButtContainer: jQuery('<div>').attr({
                        class: 'refreshPageContainer'
                    }),
                    $refreshButt: jQuery('<button>').attr({
                        class: 'myEDOBut refreshButt draggable ui-widget-content',
                        title: 'Refresh Page from Server '
                    }),
                    $refresh: jQuery('<i class="fa fa-undo fa-flip-horizontal fa-3x">&nbsp;</i>'),
                    $refreshTitle: jQuery('<div>').text('Refresh Button'),
                    $refreshCheckbox: jQuery('<div>').attr({
                        id: 'refreshMetoggle',
                        title: 'toggle refresh button'
                    }),
                    $FAtoggle: jQuery('<i class="fa fa-toggle-off fa-lg"></i>')
                };
            },
            cacheDOM: function (callingPanel) {
                this.$togglesPanel = jQuery(callingPanel);
                this.$togglesContainer = jQuery('.toolboxContainer');
            },
            buildTool: function () {
                refreshPage.config.$refreshButt.html(refreshPage.config.$refresh);
                refreshPage.config.$refreshButtContainer.html(refreshPage.config.$refreshButt);
                // add icon to mock button
                refreshPage.config.$refreshCheckbox.append(refreshPage.config.$FAtoggle);
                // add mock button to container
                refreshPage.config.$refreshContainer
                    .append(refreshPage.config.$refreshTitle)
                    .append(refreshPage.config.$refreshCheckbox);
            },
            addTool: function () {
                this.$togglesPanel.append(refreshPage.config.$refreshContainer);
                this.$togglesContainer.append(refreshPage.config.$refreshButtContainer);
            },
            bindEvents: function () {
                refreshPage.config.$refreshButt.on('click', this.reloadPage);
                refreshPage.config.$refreshContainer.on('click', this.flipTheSwitch.bind(this));
            },
            setToggle: function () {
                // get value of custom variable and set toggles accordingly
                if (this.getChecked()) {
                    this.toggleOn();
                    refreshPage.config.$refreshButtContainer.show();
                } else {
                    this.toggleOff();
                    refreshPage.config.$refreshButtContainer.hide();
                }
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            reloadPage: function () {
                window.location.reload(true);
            },
            flipTheSwitch: function () {
                // set saved variable to opposite of current value
                var toggle = this.getChecked();
                this.setChecked(!toggle);
                // set toggle
                this.setToggle();
            },
            toggleOn: function () {
                // set toggle on image
                var $toggle = refreshPage.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-off');
                $toggle.addClass('fa-toggle-on');
            },
            toggleOff: function () {
                // set toggle off image
                var $toggle = refreshPage.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-on');
                $toggle.addClass('fa-toggle-off');
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            getChecked: function () {
                // grabs useRefreshButton value
                var a = getValue('useRefreshButton');
                return a;
            },
            setChecked: function (bool) {
                // sets useRefreshButton value
                setValue('useRefreshButton', bool);
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- hide preview toolbar toggle ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        previewToolbarToggle = {
            init: function (callingPanel) {
                this.createElements();
                this.buildTool();
                this.cacheDOM(callingPanel);
                this.setToggle();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                previewToolbarToggle.config = {
                    $previewToolbarToggleContainer: jQuery('<div>').attr({
                        id: 'previewToolbarToggleInput',
                        class: 'toggleTool',
                        title: 'hides PCE toolbar'
                    }),
                    $previewToolbarToggleTitle: jQuery('<div>')
                        .text('hide preview toolbar?'),
                    $previewToolbarToggleIcon: jQuery('<div>').attr({
                        id: 'previewToolbarToggleIcon'
                    }),
                    $FAtoggle: jQuery('<i class="fa fa-toggle-off fa-lg"></i>'),
                    varName: 'hidePreviewToolbar'
                };
            },
            buildTool: function () {
                previewToolbarToggle.config.$previewToolbarToggleIcon
                    .append(previewToolbarToggle.config.$FAtoggle);
                previewToolbarToggle.config.$previewToolbarToggleContainer
                    .append(previewToolbarToggle.config.$previewToolbarToggleTitle)
                    .append(previewToolbarToggle.config.$previewToolbarToggleIcon);
            },
            setToggle: function () {
                // get value of custom variable and set toggles accordingly
                var varName = previewToolbarToggle.config.varName,
                    storedValue = getValue(varName);

                if (storedValue) {
                    this.toggleOn();
                    this.togglePreviewToolbar();
                } else {
                    this.toggleOff();
                    this.togglePreviewToolbar();
                }
            },
            cacheDOM: function (callingPanel) {
                this.$toolsPanel = jQuery(callingPanel);
                this.$toolboxStyles = jQuery('#qa_toolbox');
            },
            addTool: function () {
                // add to main toolbox
                this.$toolsPanel.append(previewToolbarToggle.config.$previewToolbarToggleContainer);
            },
            bindEvents: function () {
                // bind FA toggle with 'flipTheSwitch' action
                previewToolbarToggle.config.$previewToolbarToggleContainer.on('click', this.flipTheSwitch.bind(this));
                previewToolbarToggle.config.$previewToolbarToggleContainer.on('click', '#previewToolBarFrame', this.togglePreviewToolbar);
            },
            hideFeature: function () {
                // hides feature if viewing live site
                if (this.siteState() === 'LIVE') {
                    previewToolbarToggle.config.$previewToolbarToggleContainer.toggle();
                }
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            toggleOn: function () {
                // set toggle on image
                var $toggle = previewToolbarToggle.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-off');
                $toggle.addClass('fa-toggle-on');
            },
            togglePreviewToolbar: function () {
                var varName = previewToolbarToggle.config.varName,
                    hidePreviewToolbar = getValue(varName);

                // if 'hidePreviewToolbar is toggled ON'
                if (hidePreviewToolbar) {
                    this.$toolboxStyles.append(' #previewToolBarFrame { display: none; }');
                    this.$toolboxStyles.append(' .preview-wrapper { display: none; }');
                } else {
                    this.$toolboxStyles.append(' #previewToolBarFrame { display: block; }');
                    this.$toolboxStyles.append(' .preview-wrapper { display: block; }');
                }
            },
            toggleOff: function () {
                // set toggle off image
                var $toggle = previewToolbarToggle.config.$FAtoggle;
                $toggle.removeClass('fa-toggle-on');
                $toggle.addClass('fa-toggle-off');
            },
            flipTheSwitch: function () {
                var varName = previewToolbarToggle.config.varName,
                    storedValue = getValue(varName);
                // set saved variable to opposite of current value
                setValue(varName, !storedValue);
                // set toggle
                this.setToggle();
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- dynamic panel ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        dynamicDisplay = {
            init: function () {
                this.createElements();
                this.buildPanel();
                this.cacheDOM();
                this.addTool();
                this.modToolbar();
                this.bindEvents();
                this.displayPanel();
            },
            createElements: function () {
                // main panel container
                dynamicDisplay.config = {
                    $displayPanel: jQuery('<div>').attr({
                        class: 'toolBox',
                        id: 'displayPanel'
                    }),
                    // panel title
                    $displayTitle: jQuery('<div>').attr({
                        class: 'panelTitle'
                    }),
                    // display area
                    $displayArea: jQuery('<div>').attr({
                        id: 'displayArea'
                    }),
                    // toolbox version
                    $version: jQuery('<div>')
                        .text('version: ' + GM_info.script.version),
                    $changeLog: jQuery('<a>').attr({
                        href: 'https://github.com/cirept/NextGen/blob/master/guides/CHANGELOG.md',
                        title: 'The Latest changes will be mentioned here.'
                    }),
                    // toolbox show button
                    $showToolbox: jQuery('<div>').attr({
                        class: 'showToolbox',
                        title: 'Show Toolbox'
                    }),
                    // font awesome icon
                    $icon: jQuery('<i class="fa fa-power-off fa-2x"></i>'),
                    $hideToolbox: jQuery('<div>').attr({
                        class: 'hideToolbox',
                    }),
                    $minimizeIcon: jQuery('<span class="fa-stack fa-2x"><i class="fa fa-circle fa-stack-1x fa-inverse"></i><i class="fa fa-times-circle fa-stack-1x"></i></span>').attr({
                        title: 'Click to Hide Toolbox'
                    })
                };
            },
            buildPanel: function () {
                // attach panel elements to container
                dynamicDisplay.config.$version.append(dynamicDisplay.config.$changeLog);
                dynamicDisplay.config.$displayArea.append(dynamicDisplay.config.$version);
                dynamicDisplay.config.$displayPanel.append(dynamicDisplay.config.$displayArea);
                // attach icon to minimize tab
                dynamicDisplay.config.$showToolbox.append(dynamicDisplay.config.$icon);
                // attach icon to minimize tab
                dynamicDisplay.config.$hideToolbox.append(dynamicDisplay.config.$minimizeIcon);
            },
            cacheDOM: function () {
                // page info
                this.$toolBoxContainer = jQuery('.toolboxContainer');
                this.nextGenComment = document.firstChild.data;
                this.isNextGen = this.checkNextGen(this.nextGenComment);
                this.variableList = this.programData();
                // additions
                this.toolbox = jQuery('.toolBox');
                this.toolboxContain = jQuery('.toolboxContainer');
                this.edoButts = jQuery('.myEDOBut');
                this.lenendContainer = jQuery('.legendContainer');
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(dynamicDisplay.config.$displayPanel);
                this.$toolBoxContainer.before(dynamicDisplay.config.$showToolbox);
                this.$toolBoxContainer.append(dynamicDisplay.config.$hideToolbox);
            },
            modToolbar: function () {
                if (this.isNextGen === 'Tetra') {
                    this.toolbox.addClass('tetra');
                    this.edoButts.addClass('tetra');
                    this.lenendContainer.addClass('tetra');
                    dynamicDisplay.config.$hideToolbox.addClass('tetra');
                    dynamicDisplay.config.$showToolbox.addClass('tetra');
                    dynamicDisplay.config.$displayPanel.addClass('tetra');
                } else if (this.isNextGen === 'Next Gen') {
                    this.toolbox.addClass('nextgen');
                    this.$toolBoxContainer.addClass('nextgen');
                    this.edoButts.addClass('nextgen');
                    this.lenendContainer.addClass('nextgen');
                    dynamicDisplay.config.$hideToolbox.addClass('nextgen');
                    dynamicDisplay.config.$showToolbox.addClass('nextgen');
                    dynamicDisplay.config.$displayPanel.addClass('nextgen');
                }
            },
            bindEvents: function () {
                // click
                dynamicDisplay.config.$hideToolbox.on('click', this.toggleTools.bind(this));
                dynamicDisplay.config.$showToolbox.on('click', this.toggleTools.bind(this));
                dynamicDisplay.config.$hideToolbox.on('click', this.saveState);
                dynamicDisplay.config.$showToolbox.on('click', this.saveState);
            },
            displayPanel: function () {
                // loop through variable list to find the panel title
                var variables = this.variableList,
                    state = '',
                    key = '';
                for (key in variables) {
                    if (key === 'showToolbox') {
                        state = variables[key] ? 'show' : 'hide';
                        this.setState(this.$toolBoxContainer, state);
                        // set display of hide/show button to opposite of main toolbox
                        this.setState(dynamicDisplay.config.$showToolbox, !state);
                    }
                }
            },
            // ----------------------------------------
            // tier 2
            // ----------------------------------------
            checkNextGen: function (nextGenComment) {
                if (nextGenComment) {
                    return nextGenComment.indexOf('Next Gen') === -1 ? 'Tetra' : 'Next Gen';
                }
                return 'Tetra';
            },
            programData: function () {
                var allVariables = programVariables(),
                    length = allVariables.length,
                    a = 0,
                    varList = {},
                    key = '',
                    value = '';
                // add variables to list
                for (a; a < length; a += 1) {
                    key = allVariables[a];
                    value = getValue(key);
                    varList[key] = value;
                }
                return varList;
            },
            toggleTools: function () {
                // hide / show main tool box
                this.toggleBox();
                // hide / show toggle button
                dynamicDisplay.config.$showToolbox.toggle('fade', 500);
            },
            saveState: function () {
                // get current state
                var vName = 'showToolbox',
                    currState = getValue(vName, false);

                // sets usingM4 value
                setValue(vName, !currState);
            },
            setState: function ($panel, state) {
                if (state === 'show') {
                    $panel.addClass('appear');
                    dynamicDisplay.config.$showToolbox.hide();
                } else if (state === 'hide') {
                    $panel.addClass('disappear');
                    dynamicDisplay.config.$showToolbox.show();
                }
            },
            // ----------------------------------------
            // tier 3
            // ----------------------------------------
            toggleBox: function () {
                this.$toolBoxContainer.toggle('fade', 500);
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- MAIN ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        toolbar = {
            init: function () {
                this.cacheDOM();
                this.checkEnvironment();
                this.main();
                this.pageInfoPanel();
                this.qaToolsPanel();
                this.otherToolsPanel();
                this.togglesPanel();
                this.urlModPanel();
                this.dynamicPanel();
                this.stylePanels();
            },
            cacheDOM: function () {
                this.nextGen = document.firstChild.data;
                this.isNextGenPlatform = this.nextGenCheck();
                this.isCDKsite = this.isCDKsite();
                this.isMobile = this.isMobile();
                this.editMode = this.editMode();
                this.edoButts = jQuery('.myEDOBut');
            },
            checkEnvironment: function () {
                if (this.editMode || this.isCDKsite || !this.isMobile) {
                    // don't run toolbar if in edit mode OR not a CDK site OR is mobile site
                    // error throws will prevent the toolbar from running if environment isn't correct
                }
            },
            main: function () {
                QAtoolbox.init();
            },
            pageInfoPanel: function () {
                pageInformation.init();
            },
            qaToolsPanel: function () {
                var panelID = '#mainTools';
                qaTools.init();
                imageChecker.init(panelID);
                linkChecker.init(panelID);
                spellCheck.init(panelID);
                speedtestPage.init(panelID);
                checkLinks.init(panelID);
            },
            otherToolsPanel: function () {
                var panelID = '#otherTools';
                otherTools.init();
                showNavigation.init(panelID);
                seoSimplify.init(panelID);

                // add tetra specific tool to panel
                if (!this.isNextGenPlatform) {
                    jQuery('#otherTools').append($widgetOutlineButton);
                    viewMobile.init(panelID);
                }
            },
            togglesPanel: function () {
                var panelID = '#toggleTools';
                toggles.init();
                refreshPage.init(panelID);
                previewToolbarToggle.init(panelID);
            },
            urlModPanel: function () {
                var panelID = '#urlModTools';
                urlModifiers.init();
                nextGenToggle.init(panelID);
                autofillToggle.init(panelID);

                // add tetra specific tool to panel
                if (!this.isNextGenPlatform) {
                    m4Check.init(panelID);
                }
            },
            dynamicPanel: function () {
                dynamicDisplay.init();
            },
            stylePanels: function () {
                this.styleButtons(qaTools.config.$mainToolsPanel);
                this.styleButtons(otherTools.config.$otherToolsPanel);
                this.wrapText(QAtoolbox.config.$toolboxContainer);
            },
            // ----------------------------------------
            // tier 2
            // ----------------------------------------
            nextGenCheck: function () {
                if (this.nextGen) {
                    return this.nextGen.indexOf('Next Gen') === -1 ? false : true;
                } else {
                    return false;
                }
            },
            isCDKsite: function () {
                try {
                    var siteState = unsafeWindow.ContextManager.getVersion();
                    // determines which state of the site you are viewing (this variable should only exist on CDK sites)
                    return ((siteState === 'WIP') || (siteState === 'PROTO') || (siteState === 'LIVE'));
                } catch (e) {
                    throw 'Not a CDK site, shutting toolbar down';
                }
            },
            isMobile: function () {
                var phoneWrapper = jQuery('body .phone-wrapper');
                // determines if the page being viewed is meant for mobile
                if (phoneWrapper.length > 0) {
                    throw 'mobile site, shutting toolbar down';
                } else {
                    return false;
                }
            },
            editMode: function () {
                // determines if site is in edit mode in WSM (this variable should only exist on CDK sites)
                if (unsafeWindow.editMode === true) {
                    throw 'Edit Mode, shutting toolbar down';
                }
            },
            styleButtons: function ($toolPanel) {
                // wrapping interior text in order style text.
                // overrides the !important tags used by CDK bundles.css
                $toolPanel.children('.myEDOBut:even').addClass('evenEDObutts');
                $toolPanel.children('.myEDOBut:odd').addClass('oddEDObutts');
            },
            wrapText: function ($toolPanel) {
                $toolPanel.find('.myEDOBut').wrapInner('<span></span>');
            }
        };

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- initialize toolbox ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    toolbar.init();

})(); // end main function
