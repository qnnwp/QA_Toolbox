/*global jQuery, unsafeWindow, GM_getValue, GM_setValue, GM_setClipboard, GM_openInTab, GM_info, GM_listValues, window, document */

// added 7th key to web page test tool

(function () {

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- GLOBAL FUNCTIONS ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    function setValue(variable, val) {
        console.log('"SET" value "' + variable + '" with "' + val + '"');
        GM_setValue(variable, val);
    }

    function clipboardCopy(variable) {
        console.log('copy clipboard ' + variable);
        GM_setClipboard(variable, 'text');
    }

    function getValue(variable) {
        //        console.log('"GET" value "' + variable);
        return GM_getValue(variable, false);
    }

    function programVariables() {
        return GM_listValues();
    }

    function openNewTab(openThis) {
        console.log('open ' + openThis);
        GM_openInTab(openThis);
    }

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- Build container for toolbox ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    var QAtoolbox = {
            init: function () {
                this.createElements();
                this.toolbarStyles();
                this.cacheDOM();
                this.attachTools();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                QAtoolbox.config = {
                    $legendContainer: jQuery('<div>').attr({
                        id: 'legendContainer'
                    }),
                    $toolbarContainer: jQuery('<div>').attr({
                        id: 'toolboxContainer'
                    }),
                    // ----------------------------------------
                    // Toolbar Resources
                    // ----------------------------------------
                    $toolbarStyles: jQuery('<style>').attr({
                        id: 'qa_toolbox',
                        type: 'text/css'
                    }),
                    $myFont: jQuery('<link>').attr({
                        href: 'https://fonts.googleapis.com/css?family=Montserrat',
                        rel: 'stylesheet'
                    }),
                    $jQueryUI: jQuery('<link>').attr({
                        href: 'ttps://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css',
                        rel: 'stylesheet'
                    })
                };
            },
            toolbarStyles: function () {
                QAtoolbox.config.$toolbarStyles
                    // general toolbox styles
                    .append('.toolBox { text-align: center; position: relative; border: 1px solid black; font-size: 9.5px; z-index: 50000; margin: 0 0 5px 0; }')
                    .append('#toolboxContainer { bottom: 20px; font-family: "Montserrat"; font-size: 9.5px; line-height: 20px; position: fixed; text-transform: lowercase; width: 120px; z-index: 99999999; }')
                    .append('.toolsPanel { display: none; }')
                    // panel title styles // padding: 5px;
                    .append('.panelTitle { border-bottom: 1px solid #000000; color: white; cursor: pointer; font-size: 11px; text-transform: lowercase; }')
                    // default highlight style
                    .append('#toolboxContainer .highlight { background: linear-gradient(to right, #83a4d4 , #b6fbff) !important; color: #ffffff;}')
                    // even button styles
                    .append('.evenEDObutts {background: linear-gradient(to left, #457fca , #5691c8);}')
                    // off button styles
                    .append('.oddEDObutts {background: linear-gradient(to left, #6190E8 , #A7BFE8);}')
                    // default button styles
                    .append('.myEDOBut { border: 2px solid rgb(0,0,0); border-radius: 5px; color: #ffffff !important; cursor: pointer; font-family: "Montserrat"; font-size: 11px; top: 15%; margin: 1px 0px 0px 10px; padding: 4px 0px; position: relative; text-transform: lowercase; width: 120px; }')
                    .append('.myEDOBut.notWorking { background: purple; }')
                    .append('.myEDOBut.offButt { width: 90%; height: 50px; }')
                    .append('.myEDOBut[disabled] { border: 2px outset ButtonFace; background: #ddd; background-color: #ddd; color: grey !important; cursor: not-allowed; }')
                    .append('.offButt { background: linear-gradient(to left, #085078 , #85D8CE) !important; }')
                    .append('.myEDOBut:hover { background: linear-gradient(to left, #141E30 , #243B55) !important; }')
                    // legend styles
                    .append('.legendTitle { font-weight: bold; }')
                    .append('.legendContent { padding: 5px; margin: 5px; }')
                    .append('.legendList { list-style-type: none; margin: 10px 0px; padding: 0px; }')
                    .append('#legendContainer { font-family: "Montserrat"; font-size: 12px; position: fixed; bottom: 20px; width: 260px; z-index: 99999999; }')
                    .append('.legend { background: white; border: 1px solid black; display: none; text-align: center; padding: 5px; margin: 5px 0; }')
                    .append('.hint { font-size: 10px; font-style: italic; line-height: 10px; margin: 10px 0 0 0; }')
                    // toggle style
                    .append('.toggleTool { background: linear-gradient(to right, rgb(236, 233, 230) , rgb(255, 255, 255)); border-top: 1px solid #999999; cursor: pointer; } '); // end
            },
            cacheDOM: function () {
                this.head = jQuery('head');
                this.body = jQuery('body');
                this.phoneWrapper = jQuery('body .phone-wrapper');
            },
            attachTools: function () {
                this.head.append(QAtoolbox.config.$toolbarStyles);
                this.head.append(QAtoolbox.config.$myFont);
                this.body.before(QAtoolbox.config.$toolbarContainer);
                this.body.before(QAtoolbox.config.$legendContainer);
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            styleTools: function ($toolPanel) {
                $toolPanel.children('.myEDOBut:even').addClass('evenEDObutts');
                $toolPanel.children('.myEDOBut:odd').addClass('oddEDObutts');
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
                this.highlightZero();
                //                this.buildDetails();
                //                this.bindEvents();
                // return finished tool
                return this.returnTool();
            },
            createElements: function () {
                hTags.config = {
                    $hTagsContainer: jQuery('<div>').attr({
                        id: 'hTagsContainer'
                    }),
                    $hTagsTitle: jQuery('<label>').attr({
                        class: 'tbLabel'
                    }).text('h tags'),
                    $hTags: jQuery('<div>').attr({
                        //                        class: 'tbInfo',
                        title: 'h tags on current page',
                        id: 'hTags'
                    }).css({
                        background: 'white',
                        'border-top': '1px solid #000000',
                        'font-size': '15px'
                    }),
                    $hTagDetails: jQuery('<div>').attr({
                        class: 'tbInfo',
                        title: 'h tags on page',
                        id: 'hTagDetails'
                    }).css({
                        display: 'none'
                    }),
                    hTagsTotal: {
                        h1: 0,
                        h2: 0,
                        h3: 0,
                        h4: 0
                    },
                    hTags: {}
                };
            },
            cacheDOM: function () {
                var key, total;
                for (key in hTags.config.hTagsTotal) {
                    hTags.config.hTags[key] = jQuery(key); // save matches for later
                    total = jQuery(key).length;
                    hTags.config.hTagsTotal[key] = total;
                }
            },
            buildTool: function () {
                hTags.config.$hTagsContainer.append(hTags.config.$hTagsTitle);
                hTags.config.$hTagsContainer.append(hTags.config.$hTags);
                //                hTags.config.$hTagsContainer.append(hTags.config.$hTagDetails);
            },
            displayData: function () {
                var html = '',
                    key,
                    $hContainer = jQuery('<div>').attr({
                        class: 'hCount'
                    }).css({
                        display: 'block'
                    }),
                    $hTag = jQuery('<span>'),
                    $hCount = jQuery('<span>');

                for (key in hTags.config.hTagsTotal) {
                    $hTag.attr({
                        class: key
                    }).text(key + ' : ');

                    $hCount.attr({
                        class: key + 'count'
                    }).text(hTags.config.hTagsTotal[key]);

                    $hContainer.append($hTag);
                    $hContainer.append($hCount);

                    console.log($hContainer.prop('outerHTML'));
                    html += $hContainer.prop('outerHTML');
                }
                hTags.config.$hTags.html(html);
            },
            // ----------------------------------------
            // FIND COUNTS = 0 and highlight ORANGE
            // ----------------------------------------
            highlightZero: function () {
                var html = hTags.config.$hTags.html(),
                    newHtml = html.replace('0', '<span style="background: orange;">0</span>');
                hTags.config.$hTags.html(newHtml);
            },
            buildDetails: function () {
                var html = '',
                    key,
                    a,
                    length;

                for (key in hTags.config.hTags) {
                    a = 0;
                    length = hTags.config.hTags[key].length;
                    console.log(hTags.config.hTags[key]);
                    console.log(length);
                    for (a; a < length; a += 1) {
                        console.log(hTags.config.hTags[key].text());
                        html += key + '=' + hTags.config.hTags[key].text() + '<br>';
                    }
                }
                hTags.config.$hTagDetails.html(html);
            },
            bindEvents: function () {
                hTags.config.$hTags.on('click', this.showPanel);
            },
            showPanel: function () {
                return hTags.config.$hTagDetails.slideToggle(500);
            },
            returnTool: function () {
                var panel = hTags.config.$hTagsContainer;
                return panel;
            }
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
                this.addStyles();
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
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.$toolBoxContainer = jQuery('#toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.prepend(pageInformation.config.$pageInfoContainer);
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; }')
                    .append('.tbLabel { font-weight: bold; font-size: inherit; }');
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
                    $panel.css({
                        display: 'block'
                    });
                } else if (state === 'hide') {
                    $panel.css({
                        display: 'none'
                    });
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
                this.addStyles();
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
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.$toolBoxContainer = jQuery('#toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(qaTools.config.$mainToolsContainer);
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; }')
                    .append('.tbLabel { font-weight: bold; }');
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
                    $panel.css({
                        display: 'block'
                    });
                } else if (state === 'hide') {
                    $panel.css({
                        display: 'none'
                    });
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- image checker ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        imageChecker = {
            init: function () {
                this.createElements();
                this.buildLegend();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1
            // ----------------------------------------
            createElements: function () {
                imageChecker.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'imageChecker',
                        title: 'Image Alt Checker'
                    }).text('Image Alt Checker'),
                    $legend: jQuery('<div>').attr({
                        class: 'legend'
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
                    $toolsPanel: jQuery('#mainTools'),
                    $legendContainer: jQuery('#legendContainer')
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
                imageChecker.config.$activateButt.on('click', this.highlightImages.bind(this));
                imageChecker.config.$activateButt.on('click', this.showLegend);
                imageChecker.config.$activateButt.on('click', this.toggleDisable);
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
                this.addStyles();
                var iaLength = this.imageArrayLength,
                    a = 0,
                    $this;
                // loop through allImages and check for alt text
                for (a; a < iaLength; a += 1) {
                    $this = this.$allImages[a];
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
                this.$toolbarStyles = jQuery('#qa_toolbox');
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.imageCheckerOverlay { color: #000000 !important; font-weight: bold; text-align: center; vertical-align: middle; }')
                    // allow proper displaying of color overlay on images
                    .append('.overlaid { position: relative; }')
                    // image overlay styles
                    .append('.imgOverlay { color: black; font-size: 15px; font-weight: bold; text-align: center; position: absolute; top: 0; left: 0; z-index: 1; }')
                    // image styles
                    .append('.hasAlt { background: rgba(146, 232, 66, .75) !important; }')
                    .append('.noAlt { background: rgba(255, 124, 216, .75) !important; }')
                    .append('.emptyAlt { background: rgba(255, 124, 216, .75) !important; }'); // end of addStyles
            },
            addDivOverlay: function (currentImage) {
                this.cacheDOMOverlayElements(currentImage);
                this.createOverlayElements();
                this.buildOverlayElements();
                this.attachToImage(currentImage);
            },
            checkForAltText: function (currentImage) {
                var $this = jQuery(currentImage);
                // find first case that returns true
                switch (true) {
                    // if alt is undefined
                case ($this.attr('alt') === undefined):
                    this.togClass($this, 'noAlt');
                    break;
                    // if alt is empty
                case ($this.attr('alt') === ''):
                    this.togClass($this, 'emptyAlt');
                    break;
                    // if alt IS NOT empty
                case ($this.attr('alt') !== ''):
                    this.togClass($this, 'hasAlt');
                    break;
                    // log the image element that breaks the program
                default:
                    console.log('image checker failure');
                    console.log(currentImage);
                    break;
                }
            },
            // ----------------------------------------
            // tier 4
            // ----------------------------------------
            cacheDOMOverlayElements: function (currentImage) {
                this.imageAlt = jQuery(currentImage).attr('alt');
                // gets sizing of images
                this.widthOfImage = jQuery(currentImage).width();
                this.heightOfImage = jQuery(currentImage).height();
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
                    'line-height': this.heightOfImage + 'px'
                });
                // add image alt as text to div
                this.$divOverlay.append(this.imageAlt);
            },
            attachToImage: function (currentImage) {
                // make parent image relative positioning
                this.toggleOverlayClass(currentImage);
                // place div overlay onto image
                jQuery(currentImage).before(this.$divOverlay);
            },
            togClass: function ($obj, addClass) {
                $obj.siblings('.imgOverlay').toggleClass(addClass);
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
            init: function () {
                this.createElements();
                this.buildLegend();
                this.addTool();
                this.bindEvents();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                linkChecker.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'linkChecker',
                        title: 'Check Links'
                    }).text('Link Checker'),
                    $legend: jQuery('<div>').attr({
                        class: 'legend'
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
                        'urlIssue': 'Double Check URL',
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
                    $toolsPanel: jQuery('#mainTools'),
                    $legendContainer: jQuery('#legendContainer')
                };
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
                linkChecker.config.$activateButt.on('click', this.checkLinks.bind(this));
                linkChecker.config.$activateButt.on('click', this.showLegend);
                linkChecker.config.$activateButt.on('click', this.toggleDisable);
                // off button
                linkChecker.config.$offButt.on('click', this.removeHighlights.bind(this));
                linkChecker.config.$offButt.on('click', this.showLegend);
                linkChecker.config.$offButt.on('click', this.toggleDisable);
                linkChecker.config.$offButt.on('click', this.unbindClicks.bind(this));
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
                var length = this.linksArrayLength,
                    a = 0,
                    $currentLink,
                    $image,
                    isImageLink;
                // verify all links
                for (a; a < length; a += 1) {
                    $currentLink = jQuery(this.$allLinks[a]);
                    $image = $currentLink.find('img');
                    isImageLink = this.isImageLink($image);
                    // add default class
                    this.togClass($currentLink, 'siteLink');
                    // if image link add div overlay
                    if (isImageLink) {
                        this.addDivOverlay($currentLink, $image);
                    }
                    this.checkTarget($currentLink, isImageLink);
                    this.checkForTitleText($currentLink, isImageLink);
                    this.checkURL($currentLink, isImageLink);
                    // bind click event
                    $currentLink.on('mousedown', this.linkChecked($currentLink));
                }
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
                }
                // remove div overlay
                jQuery('.imgOverlay').remove();
                // remove overlaid class
                this.removeClass(this.$allImageLinks, 'overlaid');
                // turn off custom link class
                this.removeClass(this.$allLinks, 'siteLink');
            },
            unbindClicks: function () {
                var i = 0,
                    length = this.linksArrayLength;
                for (i; i < length; i += 1) {
                    jQuery(this.$allLinks[i]).off('mousedown');
                }
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            cacheDOM: function () {
                this.$allLinks = jQuery('body').find('a');
                this.$allImageLinks = this.$allLinks.find('img');
                this.linksArrayLength = this.$allLinks.length;
                this.imageLinksArrayLength = this.$allImageLinks.length;
                this.$toolbarStyles = jQuery('#qa_toolbox');
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.imageCheckerOverlay { color: #000000 !important; font-weight: bold; text-align: center; vertical-align: middle; }')
                    // allow proper displaying of color overlay on images
                    .append('.overlaid { position: relative; }')
                    // image overlay styles
                    .append('.imgOverlay { color: black; font-size: 15px; font-weight: bold; text-align: center; position: absolute; top: 0; left: 0; z-index: 1; }')
                    // link styles
                    .append('.noTitle { background: rgba(255, 124, 216, .75) !important; }')
                    .append('.hasTitle { background: rgba(146, 232, 66, .75) !important; }')
                    .append('.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 255, 255, 0) 26%, rgba(146, 232, 66, 0) 100%) !important; }')
                    .append('.hasTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(146, 232, 66, 0.75) 26%, rgba(146, 232, 66, 0.75) 99%, rgba(146, 232, 66, 0.75) 100%) !important; }')
                    .append('.noTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 124, 216, 0.75) 26%, rgba(255, 124, 216, 0.75) 100%) !important; }')
                    .append('.emptyTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 124, 216, 0.75) 26%, rgba(255, 124, 216, 0.75) 100%) !important; }')
                    .append('.brokenURL { background: rgba(255, 55, 60, .75) !important; }')
                    .append('.urlIssue { -moz-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); -webkit-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); }')
                    .append('.siteLink.linkChecked, .imgOverlay.linkChecked { background: linear-gradient(to left, rgba(161, 255, 206, 0.75) , rgba(250, 255, 209, 0.75)) !important; color: #909090 !important; }'); // end of addStyles
            },
            isImageLink: function ($image) {
                if ($image.length) {
                    return true;
                }
                return false;
            },
            togClass: function ($obj, addClass) {
                $obj.toggleClass(addClass);
            },
            addDivOverlay: function ($currentLink, $currentImage) {
                this.cacheDOMOverlayElements($currentLink, $currentImage);
                this.createOverlayElements();
                this.buildOverlayElements();
                this.attachToImage($currentImage);
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
                // find first case that returns true
                switch (true) {
                    // undefined title or empty title
                case ($currentLink.attr('title') === undefined || $currentLink.attr('title') === ''):
                    if (isImageLink) {
                        this.togClass(this.$divOverlay, 'noTitle');
                    } else {
                        this.togClass($currentLink, 'noTitle');
                    }
                    break;
                    // has title
                case ($currentLink.attr('title') !== ''):
                    if (isImageLink) {
                        this.togClass(this.$divOverlay, 'hasTitle');
                    } else {
                        this.togClass($currentLink, 'hasTitle');
                    }
                    break;
                    // log the image element that breaks the program
                default:
                    console.log('title checker failure');
                    console.log($currentLink);
                    break;
                }
            },
            checkURL: function ($currentLink, isImageLink) {
                var href = $currentLink.attr('href');
                switch (true) {
                    // no href
                case (href === undefined):
                    if (isImageLink) {
                        this.togClass(this.$divOverlay, 'brokenURL');
                    } else {
                        this.togClass($currentLink, 'brokenURL');
                    }
                    break;
                    // empty href
                case (href === ''):
                    if (isImageLink) {
                        this.togClass(this.$divOverlay, 'brokenURL');
                    } else {
                        this.togClass($currentLink, 'brokenURL');
                    }
                    break;
                    // url issue
                case (this.checkHref(href)):
                    if (isImageLink) {
                        this.togClass(this.$divOverlay, 'urlIssue');
                    } else {
                        this.togClass($currentLink, 'urlIssue');
                    }
                    break;
                    // url is good to go
                default:
                    break;
                }
            },
            linkChecked: function ($currentLink) {
                return function () {
                    $currentLink.addClass('linkChecked');
                };
            },
            removeClass: function (array, removeClass) { // toggle custom class
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
                this.linkTitle = jQuery($currentLink).attr('title');
                // gets sizing of images
                this.widthOfImage = jQuery($currentImage).width();
                this.heightOfImage = jQuery($currentImage).height();
            },
            createOverlayElements: function () {
                // create div overlay
                this.$divOverlay = jQuery('<div>').attr({
                    class: 'imgOverlay'
                });
                this.$linkCheckmark = jQuery('<span>').css({
                    position: 'absolute',
                    left: '5px',
                    color: 'white'
                });
                this.$checkmark = jQuery('<i>').attr({
                    class: 'fa fa-check-circle fa-3x'
                });
            },
            buildOverlayElements: function () {
                this.sizeToImage();
                this.addContent();
                this.$divOverlay.on('click', this.linkChecked(this.$divOverlay));
            },
            attachToImage: function ($currentImage) {
                // make parent image relative positionin
                this.togClass($currentImage, 'overlaid');
                // place div overlay onto image
                jQuery($currentImage).before(this.$divOverlay);
            },
            verifyTarget: function ($currentLink) {
                if (($currentLink.attr('target') === '_blank') || ($currentLink.attr('target') === '_new')) {
                    return true;
                }
            },
            // checks URL if its 'special'
            checkHref: function (elem) {
                if ((elem.indexOf('#') === 0) || (elem.indexOf('f_') === 0) || (elem.indexOf('www') >= 0) || (elem.indexOf('http') >= 0) || (elem.indexOf('//:') >= 0)) {
                    return true;
                }
                return false;
            },
            // ----------------------------------------
            // tier 5 functions
            // ----------------------------------------
            sizeToImage: function () {
                // make the div overlay the same dimensions as the image
                this.$divOverlay.css({
                    width: this.widthOfImage + 'px',
                    height: this.heightOfImage + 'px',
                    'line-height': this.heightOfImage + 'px'
                });
            },
            addContent: function () {
                this.$divOverlay.append(this.linkTitle);
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Outdated Link Checker ----------------------------------------
        //------------------------------------------------------------------------------------------------------------------------
        outdatedLinks = {
            init: function () {
                this.createElements();
                this.cacheDOM();
                this.buildLegend();
                this.addTool();
                this.bindEvents();
                this.addStyles();
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            createElements: function () {
                outdatedLinks.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: 'outdatedLinks',
                        title: 'Outdated Links'
                    }).text('Outdated Links'),
                    $offButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut offButt',
                        value: 'Turn Off'
                    }),
                    $legend: jQuery('<div>').attr({
                        class: 'legend',
                        id: 'outdatedLinkLegend'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('Outdated Link Checker Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        'supportedPage': 'Supported Page',
                        'oldPage': 'Old Page'
                    }
                };
            },
            cacheDOM: function () {
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.$toolsPanel = jQuery('#mainTools');
                this.$legendContainer = jQuery('#legendContainer');
            },
            buildLegend: function () {
                outdatedLinks.config.$legend
                    // attach legend title
                    .append(outdatedLinks.config.$legendTitle)
                    // attach list
                    .append(outdatedLinks.config.$legendList)
                    // attach turn off button
                    .append(outdatedLinks.config.$offButt);
                // fill list
                this.buildLegendContent();
            },
            addTool: function () {
                this.$toolsPanel.append(outdatedLinks.config.$activateButt);
                this.$legendContainer.append(outdatedLinks.config.$legend);
                this.datedPagesDoc = 'https://cdn.rawgit.com/cirept/NextGen/master/resources/dated_pages.txt';
            },
            bindEvents: function () {
                outdatedLinks.config.$activateButt.on('click', this.highlightLinks.bind(this));
                outdatedLinks.config.$activateButt.on('click', this.toggleFeatures);
                outdatedLinks.config.$offButt.on('click', this.toggleFeatures);
                outdatedLinks.config.$offButt.on('click', this.removeDOMelements);
            },
            addStyles: function () {
                this.$toolbarStyles
                    .append('.supportedPage { background: rgba(146, 232, 66, .75) !important; color: black !important; }')
                    .append('.oldPage { background: rgba(255, 124, 216, .75) !important; }');
            },
            highlightLinks: function () {
                var self = this;
                jQuery.get(this.datedPagesDoc, function (data) {
                    self.searchLinks(data);
                });
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            buildLegendContent: function () {
                var $contentArray = outdatedLinks.config.$legendContent,
                    key, value;
                // loop through Legend Content list
                for (key in $contentArray) {
                    value = $contentArray[key];
                    // build listing element
                    this.$listItem = jQuery('<li>').attr({
                        class: 'legendContent ' + key
                    }).append(value);
                    // attach to legend list
                    outdatedLinks.config.$legendList.append(this.$listItem);
                }
            },
            toggleFeatures: function () {
                outdatedLinks.config.$activateButt.prop('disabled', function (index, value) {
                    return !value;
                });
                outdatedLinks.config.$legend.slideToggle(500);
            },
            searchLinkReturn: function (data) {
                this.searchLinks(data);
            },
            searchLinks: function (data) {
                var datedPages,
                    datedPagesLength,
                    count,
                    currPage,
                    z = 0; // datedPage links for loop counter

                datedPages = this.oldPages(data);
                datedPagesLength = datedPages.length;

                for (z; z < datedPagesLength; z += 1) {
                    currPage = datedPages[z];
                    count = this.highlightDatadPages(currPage);
                    console.log('matches found for ' + currPage + ' : ' + count);
                }
            },
            oldPages: function (data) {
                var datedPages;
                // create array seperating each 'page' by the '-=-='
                data = data.replace(/\r?\n|\r/g, '');
                datedPages = data.split('-=-=');
                return datedPages;
            },
            highlightDatadPages: function (currPage) {
                var pageLinks = jQuery('body a'),
                    pageLinksLength = pageLinks.length,
                    b = 0, // pageLinks links for loop counter;
                    counter = 0,
                    isImageLink, currLink, $currLink, h, w, href, findThis;

                // looping through all links on the page
                for (b; b < pageLinksLength; b += 1) {
                    isImageLink = false;
                    currLink = pageLinks[b];
                    $currLink = jQuery(currLink);

                    if (($currLink.has('img').length)) {
                        // grab width and height of image
                        w = $currLink.has('img').width();
                        h = $currLink.height();
                        // create a div overlay with the same height and width of the image
                        this.addLinkDiv(currLink, w, h);
                        isImageLink = true;
                    }

                    if (($currLink.attr('href'))) {
                        href = $currLink.attr('href').toLowerCase();
                        findThis = currPage.toLowerCase();
                        // if current link HAS an href
                        if (href.indexOf(findThis) >= 0) {
                            // if MATCH IS FOUND
                            if (isImageLink) {
                                // if the link has an IMAGE apply class to div overlay
                                $currLink
                                    .find('.linkOverlay')
                                    .addClass('oldPage');
                                counter += 1;
                            } else {
                                // if link does not have an image, apply directly to the link
                                $currLink.addClass('oldPage');
                                counter += 1;
                            }
                            continue;
                        } else {
                            if (isImageLink) {
                                // if the link has an IMAGE apply class to div overlay
                                $currLink
                                    .find('.linkOverlay')
                                    .addClass('supportedPage');
                            } else {
                                // if link does not have an image, apply directly to the link
                                $currLink.addClass('supportedPage');
                            }
                        }
                    }
                }
                return counter;
            },
            addLinkDiv: function (elem, width, height) {
                var $linkOverlay = jQuery('<div>').attr({
                    class: 'siteLink linkOverlay'
                }).css({
                    width: width + 'px',
                    height: height + 'px',
                    'text-align': 'center',
                    'vertical-align': 'middle',
                    'line-height': height + 'px',
                    'z-index': '2',
                    color: '#000000 !important',
                    'font-weight': 'bold'
                });
                jQuery(elem).addClass('overlayDiv').prepend($linkOverlay);
            },
            removeDOMelements: function () {
                var $pageLinks = jQuery('body a'),
                    iaLength = $pageLinks.length,
                    a = 0;

                for (a; a < iaLength; a += 1) {
                    jQuery($pageLinks[a])
                        .removeClass('oldPage')
                        .removeClass('supportedPage');
                }
                jQuery('body').find('.imgOverlay').remove();
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Show Navigation (highlight major pages) ----------------------------------------
        //------------------------------------------------------------------------------------------------------------------------
        showNavigation = {
            init: function () {
                this.createElements();
                this.cacheDOM();
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
                        class: 'legend'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('Show Navigation Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        'majorPage': 'Major Page',
                        'linkChecked': 'Link Clicked'
                    },
                    $hint: jQuery('<div>').attr({
                        class: 'hint'
                    }).text('ctrl+left click to open link in a new tab')
                };
            },
            cacheDOM: function () {
                this.$nav = jQuery('#pmenu');
                this.$navTabs = this.$nav.find('ul');
                this.$navTabsLinks = this.$navTabs.find('a[href]');
                this.nlLength = this.$navTabsLinks.length;
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.$toolsPanel = jQuery('#mainTools');
                this.$legendContainer = jQuery('#legendContainer');
                this.nextGen = document.firstChild.data;
                this.isNextGenPlatform = this.nextGenVar(this.nextGen);
                this.$navItems = jQuery('.header .menu nav ul li');
                this.$navItemsLinks = this.$navItems.find('a');
                this.navItemsLength = this.$navItemsLinks.length;
                this.$subNavMenuContainer = this.$navItems.find('ul');
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
                showNavigation.config.$offButt.on('click', this.unbindClicks.bind(this));
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.subNav { background: linear-gradient(to left, #000000 , #434343) !important; color: #ffffff !important; }')
                    .append('.majorPage { color: #ffffff !important; background: linear-gradient(to left, #ffb347 , #ffcc33) !important; }')
                    .append('.showNav { display: block !important; }')
                    .append('.linkChecked { background: linear-gradient(to left, rgba(161, 255, 206, 0.75) , rgba(250, 255, 209, 0.75)), #ffffff !important; color: #999999 !important; }')
                    .append('.showNav { display: inline-block !important; position: absolute !important; background: white !important; margin: 0 !important; width: 150px !important; }')
                    .append('.showNavAdd { width: 150px !important; padding: 0 !important; font-size: 15px !important; }'); // end of addStyles
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
                    this.$navItems.toggleClass('showNavAdd');
                    this.$subNavMenuContainer.toggleClass('showNav');
                }
                if (!isNextGen) {
                    this.$navTabsLinks.toggleClass('subNav');
                    this.$navTabs.find('a[href*=Form], a[href*=ContactUs], a[href=HoursAndDirections], a[href*=VehicleSearchResults]').toggleClass('majorPage');
                    this.$navTabs.toggleClass('showNav');
                }
                showNavigation.config.$legend.slideToggle(500);
            },
            toggleDisable: function () {
                showNavigation.config.$activateButt.prop('disabled', function (index, value) {
                    return !value;
                });
            },
            bindClicks: function () {
                var i = 0,
                    isNextGen = this.isNextGenPlatform;

                if (isNextGen) {
                    for (i; i < this.navItemsLength; i += 1) {
                        jQuery(this.$navItemsLinks[i]).on('mousedown', this.linkChecked(this.$navItemsLinks[i]));
                    }
                }
                if (!isNextGen) {
                    for (i; i < this.nlLength; i += 1) {
                        jQuery(this.$navTabsLinks[i]).on('mousedown', this.linkChecked(this.$navTabsLinks[i]));
                    }
                }
            },
            unbindClicks: function () {
                var i = 0;
                for (i; i < this.nlLength; i += 1) {
                    jQuery(this.$navTabsLinks[i]).off('click');
                }
                // remove link checked class
                this.$navTabs.find('.linkChecked').removeClass('linkChecked');
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
        // ---------------------------------------- Spell Check ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        spellCheck = {
            init: function () {
                this.createElements();
                this.cacheDOM();
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
                    }).text('Spellcheck Page')
                };
            },
            cacheDOM: function () {
                this.$toolsPanel = jQuery('#mainTools');
                this.$cm = unsafeWindow.ContextManager;
                this.siteURL = this.$cm.getUrl();
                this.pageName = this.$cm.getPageName();
            },
            addTool: function () {
                this.$toolsPanel.append(spellCheck.config.$activateButt);
            },
            bindEvents: function () {
                spellCheck.config.$activateButt.on('click', this.spellCheck.bind(this));
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            spellCheck: function () {
                var openThis = this.buildURL();
                openNewTab(openThis);
            },
            // ----------------------------------------
            // tier 3 functions
            // ----------------------------------------
            buildURL: function () {
                var URL = 'https://www.w3.org/2002/01/spellchecker?',
                    params = {
                        uri: encodeURIComponent(this.siteURL + this.pageName),
                        lang: 'en_US'
                    };
                jQuery.each(params, function (index, value) {
                    URL += index + '=' + value + '&';
                });
                return URL;
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Test WebPage ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        speedtestPage = {
            init: function () {
                this.createElements();
                this.cacheDOM();
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
                        id: 'email',
                        type: 'text',
                        placeholder: 'your.name@cdk.com'
                    }).css({
                        margin: '5px 0px',
                        width: '85%'
                    }),
                    $panelContainer: jQuery('<div>').attr({
                        id: 'wptInput'
                    }).css({
                        background: 'white',
                        'border': '1px solid black',
                        display: 'none',
                        'text-align': 'center',
                        'padding': '5px',
                        margin: '5px 0px'
                    }),
                    browserOptions: {
                        '_IE11': 'IE11',
                        ':Chrome': 'Chrome',
                        ':FireFox': 'Firefox'
                    },
                    $browserSelect: jQuery('<select>').attr({
                        id: 'bSelect'
                    }).css({
                        margin: '5px 0',
                        width: '90%'
                    }),
                    $browserTitle: jQuery('<div>').text('Choose a Browser'),
                    $keySelect: jQuery('<select>').attr({
                        id: 'keySelect'
                    }).css({
                        margin: '5px 0',
                        width: '90%'
                    }),
                    keyOptions: {
                        key_1: 'A.26fc3fe634ca1277825369f20eb25a90',
                        key_2: 'A.1b40e6dc41916bd77b0541187ac9e74b',
                        key_3: 'A.7389884c8e4af7e491458158a283dc7a',
                        key_4: 'A.ad231acf8f2888abaff310981eab805f',
                        key_5: 'A.50f3e84b941c37c0abf2132f3b989196',
                        key_6: 'A.d78638331b63ece0ee419964818f8e8d',
                        key_7: 'A.517503243d1253bf66ea52d153905c41',
                        key_8: 'A.7987f0cf2ec2ac0dc644ec9e6b54f883',
                    },
                    $keyTitle: jQuery('<div>').text('Choose Key'),
                    testURL: 'http://www.webpagetest.org/runtest.php?',
                    $sendButt: jQuery('<input>').attr({
                        type: 'button',
                        class: 'myEDOBut',
                        value: 'Send Test'
                    }).css({
                        width: '90%',
                        height: '50px'
                    })
                };
            },
            cacheDOM: function () {
                this.$cm = unsafeWindow.ContextManager;
                this.siteURL = this.$cm.getUrl();
                this.pageName = this.$cm.getPageName();
                this.$toolsPanel = jQuery('#mainTools');
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

                speedtestPage.config.$emailInput.text(speedtestPage.config.email);
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
                var userEmail = jQuery('#email').val();
                setValue('email', userEmail);
            },
            sendPage: function () {
                var browser = jQuery('#bSelect option:selected').val(),
                    selectedKey = jQuery('#keySelect option:selected').val(),
                    browserName = jQuery('#bSelect option:selected').text(),
                    email = getValue('email'),
                    params = {
                        k: selectedKey,
                        runs: '3',
                        fvonly: '1',
                        notify: email,
                        location: 'Dulles' + browser
                    },
                    newTab, desktopURL, mobileURL;

                console.log(selectedKey);

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
                this.addStyles();
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
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.$toolBoxContainer = jQuery('#toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(otherTools.config.$otherToolsContainer);
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; }')
                    .append('.tbLabel { font-weight: bold; }');
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
                    $panel.css({
                        display: 'block'
                    });
                } else if (state === 'hide') {
                    $panel.css({
                        display: 'none'
                    });
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- View Mobile Site ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        viewMobile = {
            init: function () {
                this.createElements();
                this.cacheDOM();
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
            cacheDOM: function () {
                this.$otherToolsPanel = jQuery('#otherTools');
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
            init: function () {
                this.createElements();
                this.buildElements();
                this.getData();
                this.cacheDOM();
                this.addStyles();
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
                        class: 'myEDOBut',
                        value: 'REMOVE',
                        id: 'removeDiv'
                    }).css({
                        background: 'inherit'
                    }),
                    $seoDisplay: jQuery('<div>').attr({
                        class: 'inputDisplay'
                    }),
                    $seoContainer: jQuery('<div>').attr({
                        id: 'inputContainer'
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
                        // vehicles/chevrolet.json
                        filePath = 'https://media-dmg.assets-cdk.com/teams/repository/export/e2e/45858a25d100580860050568bfc31/e2e45858a25d100580860050568bfc31.json';
                        seoSimplify.loadArray(filePath);
                        break;
                    case 'Buick':
                        // vehicles/buick.json
                        filePath = 'https://media-dmg.assets-cdk.com/teams/repository/export/e2e/3cfa0a25d100581330050568b6442/e2e3cfa0a25d100581330050568b6442.json';
                        seoSimplify.loadArray(filePath);
                        break;
                    case 'Cadillac':
                        // vehicles/cadillac.json
                        filePath = 'https://media-dmg.assets-cdk.com/teams/repository/export/e2e/421a8a25d100582540050568ba825/e2e421a8a25d100582540050568ba825.json';
                        seoSimplify.loadArray(filePath);
                        break;
                    case 'GMC':
                        // vehicles/gmc.json
                        filePath = 'https://media-dmg.assets-cdk.com/teams/repository/export/e2e/3a4a8a25d100584040050568b5709/e2e3a4a8a25d100584040050568b5709.json';
                        seoSimplify.loadArray(filePath);
                        break;
                    case 'Hyundai':
                        // vehicles/hyundai.json
                        filePath = 'https://media-dmg.assets-cdk.com/teams/repository/export/e2e/41208a25d100584040050568b5709/e2e41208a25d100584040050568b5709.json';
                        seoSimplify.loadArray(filePath);
                        break;
                    case 'Volkswagen':
                        // vehicles/volkswagen.json
                        filePath = 'https://media-dmg.assets-cdk.com/teams/repository/export/e2e/421a8a25d100584040050568b5709/e2e421a8a25d100584040050568b5709.json';
                        seoSimplify.loadArray(filePath);
                        break;
                    }
                });
            },
            cacheDOM: function () {
                this.$otherToolsPanel = jQuery('#otherTools');
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.body = jQuery('body');
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.inputDisplay { padding: 10px; position: absolute; top: 25%; left: 25%; width: 50%; height: 50%; background: rgb(180, 180, 180);}')
                    .append('#inputContainer { background: rgba(0, 0, 0, 0.75); color: rgb(0, 0, 0); z-index: 99999; position: fixed; top: 0%; left: 0%; width: 100%; height: 100%; font-size: 16px;}')
                    .append('#removeDiv { position: fixed; top: 15%; left: 25%; height: 5%; width: 50%;}')
                    // end of addStyles
                ; // end
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

                if (input.indexOf('<') === 0) {
                    $input = jQuery(input);
                } else {
                    $input.append(input);
                }
                return $input;
            },
            cleanUpTags: function ($input) { // get rid of repeat functionality
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
                seoSimplify.config.$seoDisplay.append(seoSimplify.config.seoText);
                seoSimplify.config.$seoDisplay.append($input);
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
    var $wo_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'widgetOutline',
        title: 'Show Widget Outlines'
    }).text('Show Widgets');
    $wo_butt.click(function () {
        var $toolbarStyles = jQuery('#qa_toolbox');
        $toolbarStyles
        // styles data content
            .append('.showWidgetData:after { content: attr(data-content); position: absolute; top: 0; bottom: 0; left: 0; text-align: center; z-index: 100; margin: auto; background: linear-gradient(to right, rgba(80, 201, 195, .85) , rgba(150, 222, 218, .85)); color: black; font-weight: bold; font-size: 15px; }')
            .append('.outlineWidget { border: 1px dotted pink; }')
            .append('.hideColorblock { z - index: -1 !important; }')
            // end of addStyles
        ; // end
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
            $toolbarStyles
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
            $toolbarStyles
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
            init: function () {
                this.createElements();
                this.cacheDOM();
                this.buildLegend();
                this.addTool();
                this.bindEvents();
                this.addStyles();
            },
            createElements: function () {
                checkLinks.config = {
                    $activateButt: jQuery('<button>').attr({
                        class: 'myEDOBut',
                        id: '404checker',
                        title: '404 Checker'
                    }).text('404 Link Checker'),
                    $legend: jQuery('<div>').attr({
                        class: 'legend'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('Image Checker Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        'otherDomain': 'Absolute URL*',
                        'framedIn': 'f_ link',
                        'brokenURL': 'Empty URL',
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
                        id: 'checkContainer',
                    }),
                    $message: jQuery('<div>').attr({
                        id: 'checkMessage'
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
                    count: 1
                };
            },
            cacheDOM: function () {
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.cm = unsafeWindow.ContextManager;
                this.webID = this.cm.getWebId();
                this.siteID = this.cm.getSiteId();
                this.baseURL = this.cm.getUrl();
                this.host = window.location.hostname;
                this.wid = this.separateID(this.webID);
                this.$toolsPanel = jQuery('#mainTools');
                this.$legendContainer = jQuery('#legendContainer');
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
                checkLinks.config.$activateButt.on('click', this.toggleDisable);
                checkLinks.config.$activateButt.on('click', this.showLegend);
                checkLinks.config.$activateButt.on('click', this.ajaxStart);
                checkLinks.config.$activateButt.on('click', this.testLinks.bind(this));
                checkLinks.config.$activateButt.on('click', this.ajaxStop);
                checkLinks.config.$offButt.on('click', this.showLegend);
            },
            addStyles: function () {
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.otherDomain { background: linear-gradient(to left, #00C9FF , #92FE9D) !important; -moz-box-shadow: inset 0px 0px 0px 1px rgb(255, 55, 60); -webkit-box-shadow: inset 0px 0px 0px 1px rgb(255, 55, 60); box-shadow: inset 0px 0px 0px 1px rgb(255, 55, 60); color: #000000 !important; }')
                    .append('.framedIn { background: linear-gradient(to left, #F7971E , #FFD200) !important; color: #000000 !important; }')
                    .append('.brokenURL { background: linear-gradient(to left, #FFAFBD , #ffc3a0) !important; color: #000000 !important; }')
                    .append('.success { background: linear-gradient(to left, rgba(161, 255, 206, 0.75), rgba(250, 255, 209, 0.75)) !important; color: #000000 !important; }')
                    .append('.error { background: linear-gradient(to left, #F00000 , #DC281E) !important; color: #ffffff !important; }')
                    .append('#checkMessage { margin: 5px auto; padding: 5px; }')
                    .append('#checkContainer { text-align: center; background: white; }'); // end of addStyles
            },
            // ----------------------------------------
            // tier 1 functions
            // ----------------------------------------
            testLinks: function () {
                var j = 0,
                    curLink,
                    $curLink,
                    curURL,
                    hrefLength,
                    findThis,
                    findThis2,
                    len,
                    curWindow,
                    $pageLinks = jQuery('a'),
                    pageLinksLength = $pageLinks.length;

                for (j; j < pageLinksLength; j += 1) {
                    curLink = $pageLinks[j];
                    $curLink = jQuery(curLink);
                    curURL = jQuery.trim($curLink.attr('href'));
                    hrefLength = curURL.length;

                    // skip javascript links
                    if (curURL.indexOf('javascript') >= 0) {
                        continue;
                    }
                    // test if URL is undefined
                    // skip checking link if not a web link
                    if (typeof curLink === 'undefined') {
                        $curLink.addClass('brokenURL');
                        continue;
                    } // test if URL is empty
                    // skip checking link if not a web link
                    if (curURL === '') {
                        $curLink.addClass('brokenURL');
                        continue;
                    }
                    // test if link is a complete URL
                    // eg. http://www.blahblah.com/
                    // skip iteration if not correct format
                    if ((curURL.indexOf('www') > -1) || (curURL.indexOf('http') > -1) || (curURL.indexOf('https') > -1)) {
                        $curLink.addClass('otherDomain');
                        continue;
                    }
                    // test if link if href contains f_ or //:
                    // f_ will frame in the URL which may cause viewing issues if URL is an interior page.
                    // skip iteration if not correct format
                    if ((curURL.indexOf('f_') > -1) || (curURL.indexOf('//:') > -1)) {
                        $curLink.addClass('framedIn');
                        continue;
                    }
                    curWindow = window.location.href;
                    if (curWindow.indexOf('nextGen=true') > -1) {
                        // check URL if using relative path
                        // NEXT GEN SPECIFIC
                        // add complete URL for testing purposes
                        findThis = '/' + this.siteID + '/';
                        findThis2 = '/' + this.wid + '/';
                        len = findThis.length + 1;
                        //                        if ((curURL.indexOf(findThis) >= 0) && (curURL.indexOf(findThis) < length)) {
                        //                        if ((curURL.indexOf(findThis) >= 0) && (curURL.indexOf(findThis) < len)) {
                        //                            curURL = curURL.replace(findThis, this.baseURL);
                        //                        }
                        //                        if ((curURL.indexOf(findThis2) >= 0) && (curURL.indexOf(findThis2) < length)) {
                        //                        if ((curURL.indexOf(findThis2) >= 0) && (curURL.indexOf(findThis2) < len)) {
                        //                            curURL = curURL.replace(findThis, this.baseURL);
                        //                        }

                        if (curURL.indexOf('/') >= 0) {
                            curURL = this.host + curURL;
                            //                            console.log('curURL : ' + curURL);
                        }

                        // apply nextGen=true
                        if (curURL.indexOf('?') >= 0) {
                            curURL += '&nextGen=true';
                            //                            console.log('curURL : ' + curURL);
                        } else {
                            curURL += '?nextGen=true';
                            //                            console.log('curURL : ' + curURL);
                        }
                    }
                    // check urls for '/'
                    if (curURL.indexOf('//') === 0) {
                        // check URL if it begins with /, signifying the link is a relative path URL
                        curURL = curURL.slice(2, hrefLength);
                    } else if (curURL.indexOf('/') === 0) {
                        //                        console.log('checked curURL : ' + curURL);
                        curURL = curURL.slice(1, hrefLength);
                        //                        console.log('fixed curURL : ' + curURL);
                    }

                    // test links
                    this.ajaxTest(curURL, $curLink, pageLinksLength);
                }
            },
            ajaxTest: function (linkURL, $curLink, totalTests) {
                console.log('testing this link : ' + linkURL);
                var hasImage = 0,
                    isImageLink = false,
                    $img,
                    w,
                    h,
                    $linkOverlay;

                // test each link
                jQuery.ajax({
                    url: linkURL, //be sure to check the right attribute
                    type: 'HEAD',
                    crossDomain: false,
                    method: 'get',
                    success: function () { //pass an anonymous callback function
                        // checks to see if link is an image link
                        // adds a div overlay if is an image link
                        hasImage = $curLink.has('img').length;
                        if (hasImage) {
                            isImageLink = true;
                        }
                        // if is an image link add class to div overlay
                        // else add class to a tag
                        if (isImageLink) {
                            $img = $curLink.find('img');
                            w = $img.width();
                            h = $img.height();
                            $linkOverlay = jQuery('<div>').attr({
                                class: 'siteLink linkOverlay'
                            }).css({
                                width: w + 'px',
                                height: h + 'px',
                                position: 'absolute',
                                'z-index': 1
                            });
                            $img.attr('style', 'position: relative;');
                            $curLink.prepend($linkOverlay);
                            checkLinks.success($linkOverlay, isImageLink);
                        } else {
                            $curLink.addClass('success');
                            checkLinks.success($curLink, isImageLink);
                        }
                    },
                    error: function () {
                        //set link in red if there is any errors with link
                        checkLinks.error($curLink, isImageLink);
                    },
                    statusCode: {
                        404: function () {
                            $curLink.addClass('error');
                            checkLinks.error($curLink, isImageLink);
                        }
                    },
                    complete: function () {
                        checkLinks.config.count += 1;
                        checkLinks.config.$counter.text(checkLinks.config.count + ' of ' + totalTests);
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
            error: function ($this, isImageLink) {
                var curClass = '';
                if (isImageLink) {
                    curClass = $this.attr('class');
                }
                $this.addClass('error');
            },
            success: function ($this, isImageLink) {
                var curClass = '';
                if (isImageLink) {
                    curClass = $this.attr('class');
                }
                $this.addClass('success');
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
                //                this.hidePanel();
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
                        id: 'autoApplyInput',
                        class: 'toggleTool',
                        title: 'will auto apply URL modifiers to current URL\n*please reload the page to update the URL to current settings*'
                    }).css({
                        background: 'linear-gradient(to bottom, rgb(255,255,255) 0%, rgb(171, 186, 171) 35%, rgb(171, 186, 171) 70%, rgb(255, 255, 255) 100%)'
                    }),
                    $autoApplyTitle: jQuery('<div>').css({
                        color: 'black',
                        'line-height': '15px',
                        'font-weight': 'bold'
                    }).text('Auto Apply Modifiers?'),
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
                this.$toolBoxContainer = jQuery('#toolboxContainer');
            },
            setToggle: function () {
                // get value of custom variable and set toggles accordingly
                //                var currentToggle = getValue('autoApplyParameters', false);
                var currentToggle = getValue('autoApplyParameters');

                //                if (currentToggle && !this.isLive) {
                if (currentToggle) {
                    this.toggleOn();
                    this.applyParameters();
                    //                } else if (!this.isLive) {
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
            hidePanel: function () {
                if (this.isLive) {
                    urlModifiers.config.$urlModContainer.remove();
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
                //                console.log(url);
                //                console.log('----------------------------------------');
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
                    if (findThis === undefined || findThis === '') {
                        console.log('value is empty : skip');
                    } else {
                        // search url for KEY
                        //
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
                    $panel.css({
                        display: 'block'
                    });
                } else if (state === 'hide') {
                    $panel.css({
                        display: 'none'
                    });
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
                    window.location.href = url;
                    console.log('reloading page');
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- next gen toggle ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        nextGenToggle = {
            init: function () {
                this.createElements();
                this.buildTool();
                this.cacheDOM();
                this.setToggle();
                this.addTool();
                this.bindEvents();
                //                this.ifLive();
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
                    $nextGenToggleTitle: jQuery('<div>').css({
                        color: 'black',
                        'line-height': '15px'
                    }).text('nextGen parameters?'),
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
            cacheDOM: function () {
                this.$toolsPanel = jQuery('#urlModTools');
                this.cm = unsafeWindow.ContextManager;
                this.liveSite = this.cm.isLive();
            },
            setToggle: function () {
                //                if (!this.liveSite) {
                if (this.getChecked()) { // if 'site is not live'
                    // if 'nextGen is turned on'
                    // set toggle and apply parameters
                    this.toggleOn();
                } else {
                    // if 'site is not live'
                    // set toggle and apply parameters
                    this.toggleOff();
                }
                //                }
            },
            addTool: function () {
                // add to main toolbox
                this.$toolsPanel.append(nextGenToggle.config.$nextGenToggleContainer);
            },
            bindEvents: function () {
                // bind FA toggle with 'flipTheSwitch' action
                nextGenToggle.config.$nextGenToggleContainer.on('click', this.flipTheSwitch.bind(this));
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
            init: function () {
                this.createElements();
                this.buildTool();
                this.cacheDOM();
                this.setToggle();
                this.addTool();
                this.bindEvents();
                //                this.ifLive();
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
                    $m4CheckTitle: jQuery('<div>').css({
                        color: 'black',
                        'line-height': '15px'
                    }).text('M4 Parameters?'),
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
                //                if (!this.liveSite) { // if 'site is not live'
                if (this.getChecked()) { // if 'nextGen is turned on'
                    // set toggle and apply parameters
                    this.toggleOn();
                } else { // if 'site is not live'
                    // set toggle and apply parameters
                    this.toggleOff();
                }
                //                }
            },
            cacheDOM: function () {
                this.$toolsPanel = jQuery('#urlModTools');
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
            ifLive: function () {
                if (this.liveSite) { // remove tool if the site is live
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
            init: function () {
                this.createElements();
                this.buildTool();
                this.cacheDOM();
                this.setToggle();
                this.addTool();
                this.bindEvents();
                //                this.ifLive();
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
                    $autofillToggleTitle: jQuery('<div>').css({
                        color: 'black',
                        'line-height': '15px'
                    }).text('show autofill tags?'),
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
                //                if (!this.liveSite) { // if 'site is not live'
                if (this.getChecked()) { // if 'nextGen is turned on'
                    // set toggle and apply parameters
                    this.toggleOn();
                } else { // if 'site is not live'
                    // set toggle and apply parameters
                    this.toggleOff();
                }
                //                }
            },
            cacheDOM: function () {
                this.$toolsPanel = jQuery('#urlModTools');
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
            reloadPage: function (type, newURL) {
                if (type === 'reload') {
                    console.log('reload page');
                    window.location.href = newURL;
                } else if (type === 'search') {
                    console.log('append then reload page');
                    window.location.search += newURL;
                }
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
                this.addStyles();
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
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.$toolBoxContainer = jQuery('#toolboxContainer');
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(toggles.config.$togglesContainer);
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; }')
                    .append('.tbLabel { font-weight: bold; }');
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
                    $panel.css({
                        display: 'block'
                    });
                } else if (state === 'hide') {
                    $panel.css({
                        display: 'none'
                    });
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- Refresh Page toggle ----------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------
        refreshPage = {
            init: function () {
                this.createElements();
                this.cacheDOM();
                this.buildTool();
                this.addTool();
                this.bindEvents();
                this.addStyles();
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
                    $refreshButt: jQuery('<button>').attr({
                        class: 'myEDOBut draggable ui-widget-content',
                        id: 'refreshPage',
                        title: 'Refresh Page from Server '
                    }).css({
                        background: 'linear-gradient(to left, #FBD3E9 , #BB377D)',
                        width: '75px',
                        //                        position: 'fixed',
                        position: 'absolute',
                        //                        position: 'relative',
                        left: '35px',
                        //                        left: '0px',
                        top: '-45px',
                        //                        top: '60px',
                        'z-index': '500000',
                        display: 'none'
                    }).draggable({
                        containment: "body",
                        scroll: false
                    }),
                    $refresh: jQuery('<i class="fa fa-undo fa-flip-horizontal fa-3x">&nbsp;</i>').css({
                        'margin-left': '-10px'
                    }),
                    $refreshTitle: jQuery('<div>').css({
                        color: 'black',
                        'line-height': '15px'
                    }).text('Refresh Button'),
                    $refreshCheckbox: jQuery('<div>').attr({
                        id: 'refreshMetoggle',
                        title: 'toggle refresh button'
                    }),
                    $FAtoggle: jQuery('<i class="fa fa-toggle-off fa-lg"></i>')
                };
            },
            cacheDOM: function () {
                this.$togglesPanel = jQuery('#toggleTools');
                //                this.$togglesContainer = jQuery('#togglesContainer');
                this.$togglesContainer = jQuery('#toolboxContainer');
                this.$toolbarStyles = jQuery('#qa_toolbox');
            },
            buildTool: function () {
                refreshPage.config.$refreshButt.html(refreshPage.config.$refresh);
                // add icon to mock button
                refreshPage.config.$refreshCheckbox.append(refreshPage.config.$FAtoggle);
                // add mock button to container
                refreshPage.config.$refreshContainer
                    .append(refreshPage.config.$refreshTitle)
                    .append(refreshPage.config.$refreshCheckbox);
            },
            addTool: function () {
                this.$togglesPanel.append(refreshPage.config.$refreshContainer);
                this.$togglesContainer.append(refreshPage.config.$refreshButt);
            },
            bindEvents: function () {
                refreshPage.config.$refreshButt.on('click', this.reloadPage);
                refreshPage.config.$refreshContainer.on('click', this.flipTheSwitch.bind(this));
            },
            addStyles: function () {
                this.$toolbarStyles
                    .append('#refreshPage:hover { color: #ffffff !important; background: linear-gradient(to left, #f4c4f3 , #fc67fa) !important; }');
            },
            setToggle: function () {
                // get value of custom variable and set toggles accordingly
                if (this.getChecked()) {
                    this.toggleOn();
                    refreshPage.config.$refreshButt.show();
                } else {
                    this.toggleOff();
                    refreshPage.config.$refreshButt.hide();
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
            init: function () {
                this.createElements();
                this.buildTool();
                this.cacheDOM();
                this.setToggle();
                this.addTool();
                this.bindEvents();
                //        this.hideFeature();
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
                    $previewToolbarToggleTitle: jQuery('<div>').css({
                        color: 'black',
                        'line-height': '15px'
                    }).text('hide preview toolbar?'),
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
            cacheDOM: function () {
                this.$toolsPanel = jQuery('#toggleTools');
                this.$toolbarStyles = jQuery('#qa_toolbox');
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
                    this.$toolbarStyles.append(' #previewToolBarFrame { display: none; }');
                    this.$toolbarStyles.append(' .preview-wrapper { display: none; }');
                } else {
                    this.$toolbarStyles.append(' #previewToolBarFrame { display: block; }');
                    this.$toolbarStyles.append(' .preview-wrapper { display: block; }');
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
                    }).css({
                        'font-size': '12px'
                    }),
                    // toolbox version
                    $version: jQuery('<div>').css({
                        'font-size': '12px'
                    }).text('version: ' + GM_info.script.version),
                    // hide toolbox button div
                    $hideToolbox: jQuery('<div>').attr({
                        id: 'hideToolbox',
                        title: 'Click to Hide Toolbox'
                    }).css({
                        background: 'linear-gradient(to left, #283048 , #859398)',
                        'border-bottom': '1px solid #000000',
                        'border-radius': '15px',
                        color: 'white',
                        cursor: 'pointer',
                        'font-weight': 'bold'
                    }).text('Hide Toolbox'),
                    // toolbox show button
                    $showToolbox: jQuery('<div>').attr({
                        id: 'showToolbox',
                        title: 'Show Toolbox'
                    }).css({
                        background: 'linear-gradient(to right, #a8e063 0%, #56ab2f 100%)',
                        bottom: '30px',
                        'border-radius': '5px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'none',
                        padding: '5px',
                        position: 'fixed',
                        width: '50px',
                        'z-index': '99999999'
                    }),
                    // font awesome icon
                    //                    $icon: jQuery('<i class="fa fa-fort-awesome fa-2x"></i>').css({
                    $icon: jQuery('<i class="fa fa-power-off fa-2x"></i>').css({
                        'margin-left': '12px'
                    }),
                    $hide: jQuery('<div>').attr({
                        id: 'hideContainer'
                    }).css({
                        'font-size': '12px',
                        position: 'absolute',
                        //                        right: '-25px',
                        top: '-20px',
                        'z-index': '500000'
                    }), // font awesome icon
                    $minimizeIcon: jQuery('<span class="fa-stack fa-2x"><i class="fa fa-circle fa-stack-1x fa-inverse" style="color: #ffffff"></i><i class="fa fa-times-circle fa-stack-1x"></i></span>').attr({
                        title: 'Click to Hide Toolbox',
                    })
                };
            },
            buildPanel: function () {
                // attach panel elements to container
                jQuery(dynamicDisplay.config.$displayPanel)
                    .append(dynamicDisplay.config.$displayArea)
                    .append(dynamicDisplay.config.$version);
                // attach icon to minimize tab
                jQuery(dynamicDisplay.config.$showToolbox)
                    .append(dynamicDisplay.config.$icon);
                // attach icon to minimize tab
                jQuery(dynamicDisplay.config.$hide)
                    .append(dynamicDisplay.config.$minimizeIcon);
            },
            cacheDOM: function () {
                // page info
                this.$toolBoxContainer = jQuery('#toolboxContainer');
                this.nextGenComment = document.firstChild.data;
                this.isNextGen = this.checkNextGen(this.nextGenComment);
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(dynamicDisplay.config.$displayPanel);
                this.$toolBoxContainer.before(dynamicDisplay.config.$showToolbox);
                this.$toolBoxContainer.append(dynamicDisplay.config.$hide);
            },
            modToolbar: function () {
                dynamicDisplay.config.$displayArea.text(this.isNextGen);

                if (this.isNextGen === 'Tetra') {
                    QAtoolbox.config.$toolbarStyles.append('.toolBox { background: linear-gradient(to left, #76b852 , #8DC26F) }'); // TETRA color
                    QAtoolbox.config.$toolbarStyles.append('.myEDOBut { margin: 1px 0px 0px 10px; }'); // button position
                    QAtoolbox.config.$toolbarStyles.append('#hideContainer { right: -25px; }'); // button position
                    QAtoolbox.config.$toolbarStyles.append('#legendContainer  { right: 115px; }'); // legend position
                } else if (this.isNextGen === 'Next Gen') {
                    QAtoolbox.config.$toolbarStyles.append('.toolBox { background: linear-gradient(to left, #02AAB0 , #00CDAC) }'); // NEXTGEN color
                    QAtoolbox.config.$toolbarStyles.append('#toolboxContainer { right: 0%; }'); // toolbox location
                    QAtoolbox.config.$toolbarStyles.append('.myEDOBut { margin: 1px 0px 0px -10px; }'); // button positions
                    QAtoolbox.config.$toolbarStyles.append('#hideContainer { left: -25px; }'); // button positions
                    QAtoolbox.config.$toolbarStyles.append('#legendContainer  { left: 115px; }'); // legend positions
                    QAtoolbox.config.$toolbarStyles.append('#showToolbox  { right: 0%; }'); // hide/unhide button positions
                }
            },
            bindEvents: function () {
                // click
                dynamicDisplay.config.$minimizeIcon.on('click', this.toggleTools.bind(this));
                dynamicDisplay.config.$showToolbox.on('click', this.toggleTools.bind(this));
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
            toggleTools: function () {
                // hide / show main tool box
                this.toggleBox();
                // hide / show toggle button
                dynamicDisplay.config.$showToolbox.toggle('fade', 500);
            },
            toggleBox: function () {
                this.$toolBoxContainer.toggle('fade', 500);
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- tetra toolbox ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        tetraToolbar = {
            init: function () {
                if (!this.editMode() && this.isCDKsite() && !this.isMobile()) {
                    QAtoolbox.init(); // initialize toolbox
                    pageInformation.init(); // initialize page Information tool

                    // ----- main tools ----- //
                    qaTools.init(); // initialize main qa tools
                    imageChecker.init(); // initialize image checker tool
                    linkChecker.init(); // initialize link checker tool
                    showNavigation.init(); // initialize show navigation tool
                    spellCheck.init(); // initialize spell check tool
                    speedtestPage.init(); // initialize page test tool
                    checkLinks.init(); // initialize 404 checker / check links tool

                    // ----- other tools ----- //
                    otherTools.init(); // initialize other tools
                    viewMobile.init(); // initialize view mobile tool
                    seoSimplify.init();
                    //                    jQuery('#otherTools').append($seo_butt);
                    jQuery('#otherTools').append($wo_butt);

                    // ----- toggle tools ----- //
                    toggles.init(); // initialize other tools
                    refreshPage.init(); // initialize refresh page
                    previewToolbarToggle.init(); // initialize desktop toggle

                    // ----- URL modifier tools ----- //
                    urlModifiers.init(); // initialize page Information tool
                    nextGenToggle.init(); // initialize nextGen toggle
                    m4Check.init(); // initialize milestone 4 module check box
                    autofillToggle.init(); // initialize autofill toggle

                    // ----- added features ----- //
                    dynamicDisplay.init(); // initialize display information tool

                    // style buttons in toolbox
                    QAtoolbox.styleTools(qaTools.config.$mainToolsPanel);
                    QAtoolbox.styleTools(otherTools.config.$otherToolsPanel);
                }
            },
            isCDKsite: function () {
                var siteState = unsafeWindow.ContextManager.getVersion();
                // determines which state of the site you are viewing (this variable should only exist on CDK sites)
                return ((siteState === 'WIP') || (siteState === 'PROTO') || (siteState === 'LIVE'));
            },
            isMobile: function () {
                var phoneWrapper = jQuery('body .phone-wrapper');
                // determines if the page being viewed is meant for mobile
                if (phoneWrapper.length > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            editMode: function () {
                // determines if site is in edit mode in WSM (this variable should only exist on CDK sites)
                return unsafeWindow.editMode;
            }
        },

        // ------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------- next gen toolbox ----------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------
        nextgenToolbar = {
            init: function () {
                //            if (!this.editMode() && this.isCDKsite() && !this.isMobile()) {
                if (!this.editMode() && this.isCDKsite()) {
                    QAtoolbox.init(); // initialize toolbox
                    pageInformation.init(); // initialize page Information tool

                    // ----- main tools ----- //
                    qaTools.init(); // initialize main qa tools
                    imageChecker.init(); // initialize image checker tool
                    linkChecker.init(); // initialize link checker tool
                    outdatedLinks.init(); // initialize outdated link checker tool
                    showNavigation.init(); // initialize show navigation tool
                    spellCheck.init(); // initialize spell check tool
                    speedtestPage.init(); // initialize page test tool
                    checkLinks.init(); // initialize 404 checker / check links tool

                    // ----- other tools ----- //
                    otherTools.init(); // initialize other tools
                    //                    viewMobile.init(); // initialize view mobile tool
                    seoSimplify.init();
                    //                    jQuery('#otherTools').append($seo_butt);
                    //                jQuery('#otherTools').append($wo_butt);

                    // ----- toggle tools ----- //
                    toggles.init(); // initialize other tools
                    refreshPage.init(); // initialize refresh page
                    previewToolbarToggle.init(); // initialize desktop toggle

                    // ----- URL modifier tools ----- //
                    urlModifiers.init(); // initialize page Information tool
                    nextGenToggle.init(); // initialize nextGen toggle
                    //                m4Check.init(); // initialize milestone 4 module check box
                    autofillToggle.init(); // initialize autofill toggle

                    // ----- added features ----- //
                    dynamicDisplay.init(); // initialize display information tool

                    // style buttons in toolbox
                    QAtoolbox.styleTools(qaTools.config.$mainToolsPanel);
                    QAtoolbox.styleTools(otherTools.config.$otherToolsPanel);
                }
            },
            isCDKsite: function () {
                var siteState = unsafeWindow.ContextManager.getVersion();
                // determines which state of the site you are viewing (this variable should only exist on CDK sites)
                return ((siteState === 'WIP') || (siteState === 'PROTO') || (siteState === 'LIVE'));
            },
            isMobile: function () {
                var phoneWrapper = jQuery('body .phone-wrapper');
                // determines if the page being viewed is meant for mobile
                if (phoneWrapper.length > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            editMode: function () {
                // determines if site is in edit mode in WSM (this variable should only exist on CDK sites)
                return unsafeWindow.editMode;
            }
        };

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- initialize toolbox ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    var nextGen = document.firstChild.data,
        isNextGenPlatform;

    if (nextGen) {
        console.log('next gen comment found');
        isNextGenPlatform = nextGen.indexOf('Next Gen') === -1 ? false : true;
    } else {
        isNextGenPlatform = false;
    }

    if (isNextGenPlatform) {
        nextgenToolbar.init();
    }
    if (!isNextGenPlatform) {
        tetraToolbar.init();
    }

})(); // end main function