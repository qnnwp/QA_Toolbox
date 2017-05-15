/*global jQuery, unsafeWindow, GM_getValue, GM_setValue, GM_setClipboard, GM_openInTab, GM_info, GM_listValues, GM_getResourceURL, window, document, setInterval */

(function () {

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
                        href: getResourceURL('font'),
                        rel: 'stylesheet'
                    }),
                    $jQueryUI: jQuery('<link>').attr({
                        href: getResourceURL('jqueryUI'),
                        rel: 'stylesheet'
                    }),
                    $fontAwe: jQuery('<script>').attr({
                        src: getResourceURL('fontAwe')
                    })
                };
            },
            toolbarStyles: function () {
                QAtoolbox.config.$toolbarStyles
                    // general toolbox styles
                    .append('.toolBox { text-align: center; position: relative; border: 1px solid black; z-index: 50000; margin: 0 0 5px 0; }')
                    .append('#toolboxContainer { bottom: 20px; font-family: "Montserrat"; font-size: 12px; line-height: 20px; position: fixed; text-transform: lowercase; width: 140px; z-index: 99999999; }')
                    .append('.toolsPanel { display: none; }')
                    // panel title styles
                    .append('.panelTitle { border-bottom: 1px solid #000000; color: white; cursor: pointer; text-transform: lowercase; }')
                    // default highlight style
                    .append('#toolboxContainer .highlight { background: linear-gradient(to right, #83a4d4 , #b6fbff) !important; color: #ffffff;}')
                    // even button styles
                    .append('.evenEDObutts {background: linear-gradient(to left, #457fca , #5691c8);}')
                    // off button styles
                    .append('.oddEDObutts {background: linear-gradient(to left, #6190E8 , #A7BFE8);}')
                    // default button styles
                    .append('.myEDOBut { border: 2px solid rgb(0,0,0); border-radius: 5px; color: #ffffff !important; cursor: pointer; font-family: "Montserrat"; font-size: 12px; top: 15%; padding: 4px 0px; position: relative; text-transform: lowercase; width: 135px; }')
                    .append('.myEDOBut.notWorking { background: purple; }')
                    .append('.myEDOBut.offButt { width: 90%; height: 50px; margin: 0px; }')
                    .append('.myEDOBut[disabled] { border: 2px outset ButtonFace; background: #ddd; background-color: #ddd; color: grey !important; cursor: not-allowed; }')
                    .append('.offButt { background: linear-gradient(to left, #085078 , #85D8CE) !important; }')
                    .append('.myEDOBut:hover { background: linear-gradient(to left, #141E30 , #243B55) !important; border: 2px solid rgb(0,0,0); }')
                    // legend styles
                    .append('.legendTitle { font-weight: bold; font-size: 18px; }')
                    .append('.legendContent { padding: 5px; margin: 5px; }')
                    .append('.legendList { list-style-type: none; margin: 10px 0px; padding: 0px; }')
                    .append('#legendContainer { font-family: "Montserrat"; position: fixed; bottom: 20px; width: 260px; z-index: 99999999; }')
                    .append('.tbLegend { background: white; border: 1px solid black; display: none; text-align: center; padding: 5px; margin: 5px 0; }')
                    .append('.hint { font-style: italic; line-height: 10px; margin: 10px 0 0 0; }')
                    // toggle style
                    .append('.toggleTool { background: linear-gradient(to right, rgb(236, 233, 230) , rgb(255, 255, 255)); border-top: 1px solid #999999; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } '); // end
            },
            cacheDOM: function () {
                this.head = jQuery('head');
                this.body = jQuery('body');
                this.phoneWrapper = jQuery('body .phone-wrapper');
            },
            attachTools: function () {
                this.head.append(QAtoolbox.config.$toolbarStyles);
                this.head.append(QAtoolbox.config.$myFont);
                this.head.append(QAtoolbox.config.$fontAwe);
                this.body.before(QAtoolbox.config.$toolbarContainer);
                this.body.before(QAtoolbox.config.$legendContainer);
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            styleTools: function ($toolPanel) {
                $toolPanel.children('.myEDOBut:even').addClass('evenEDObutts');
                $toolPanel.children('.myEDOBut:odd').addClass('oddEDObutts');
            },
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
                this.addStyles();
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
                        id: 'hTags'
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
                    }).css({
                        background: 'inherit'
                    }),
                    $hTagDisplay: jQuery('<div>').attr({
                        class: 'hTagDisplay'
                    }),
                    $hTagDisplayContainer: jQuery('<div>').attr({
                        id: 'hTagContainer'
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
                this.$toolbarStyles = jQuery('#qa_toolbox');
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

                    //                    console.log('key : ' + key);
                    //                    console.log('hTags.config.hTagsTotal[key] : ' + hTags.config.hTagsTotal[key]);

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
                        //                        console.log('number : ' + a);
                        //                        console.log('tag : ' + jQuery.trim(hTags.config.hTags[key][a].html()));
                        //                        var x = hTags.config.hTags[key][a].innerHTML === 'text' ? 'text' : 'no text';
                        //                        console.log(jQuery(hTags.config.hTags[key][a]));
                        //                        console.log(jQuery(hTags.config.hTags[key][a]));
                        //                        console.log(hTags.config.hTags[key][a].childNodes);
                        //                        console.log('test');
                        //                        console.log(decodeURI(x));
                        //                        x = seoSimplify.cleanUpTags(x);
                        //                        x = x.trim();
                        //                        console.log(x);

                        //                        html += jQuery(hTags.config.hTags[key][a]).html() + '<br>';
                        //                        console.log(hTags.config.hTags[key][a].innerHTML);
                        html += hTags.config.hTags[key][a].innerHTML + '<br>';
                    }
                }
                hTags.config.$hTagDisplay.html(html);
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    .append('.hCount { display: block; }')
                    .append('#hTags { cursor: pointer; background: white; border-top: 1px solid #000000; }')
                    .append('.count { font-weight: bold; }')
                    .append('.zeroTotal { background: linear-gradient(to right, #F2994A , #F2C94C); }')
                    .append('.hTagDisplay { padding: 10px; position: absolute; top: 25%; left: 25%; width: 50%; height: 50%; overflow: auto; background: rgb(180, 180, 180);}')
                    .append('#hTagContainer { background: rgba(0, 0, 0, 0.75); color: rgb(0, 0, 0); z-index: 99999; position: fixed; top: 0%; left: 0%; width: 100%; height: 100%; font-size: 16px;}')
                    .append('.removeDiv { position: fixed; top: 15%; left: 25%; height: 5%; width: 50%;}'); // end of addStyles
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
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px; word-wrap: break-word; }')
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
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; word-wrap: break-word; }')
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
                        class: 'tbLegend'
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
                this.addStyles();
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
                    .append('.imgOverlay { color: black; font-size: 20px; font-weight: bold; text-align: center; position: absolute; z-index: 1; }') //top: 0; left: 0;
                    // image styles
                    .append('.hasAlt { background: rgba(146, 232, 66, .75) !important; }')
                    .append('.noAlt { background: rgba(255, 124, 216, .75) !important; }')
                    .append('.emptyAlt { background: rgba(255, 124, 216, .75) !important; }'); // end of addStyles
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
                    //                    'line-height': this.heightOfImage + 'px'  // testing removal
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
                    //                    var parent = $currentImage.parent();
                    var parent = $currentImage.closest('figure');
                    this.$divOverlay.css({
                        //                        top: parent.height() / 2 - this.$divOverlay.height() / 2 + 'px',  // testing removal
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
                        class: 'tbLegend'
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
                        //                        'otherDomain': 'Absolute URL',
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
                    $legendContainer: jQuery('#legendContainer'),
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
                            // ----------------------------------------

                            // ----------------------------------------
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
                            // ----------------------------------------

                            // ----------------------------------------
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
                            // ----------------------------------------

                        default:
                            console.log('default switch statement reached');
                    }
                }
                // ----------------------------------------
                // ----------------------------------------
            },
            tetraSiteCheck: function () {
                var length = this.linksArrayLength,
                    a = 0,
                    $currentLink,
                    $image = null,
                    isImageLink = false,
                    isQLPlink = false;
                // ----------------------------------------
                // TETRA SITE LOGIC
                // ----------------------------------------
                // loop through all links on page
                for (a; a < length; a += 1) {
                    $currentLink = jQuery(this.$allLinks[a]);

                    // ----------------------------------------
                    // ----------------------------------------
                    // skip main nav menu items
                    if ($currentLink.attr('class') !== undefined) {
                        if ($currentLink.attr('class').indexOf('main') > -1 && $currentLink.attr('class').indexOf('main') > -1) {
                            continue;
                        }
                    }
                    // ----------------------------------------
                    // ----------------------------------------

                    // ----------------------------------------
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
                            //                            var parent = $currentLink.parent();
                            //                            debugger;
                            if ($currentLink.parent().attr('class')) {
                                //                                if ($currentLink.parent().attr('class').indexOf('co-card') > -1) {
                                if ($currentLink.closest('li').attr('class').indexOf('co-card') > -1) {
                                    //                                    debugger;
                                                                        isQLPlink = true;
                                    $currentLink = $currentLink.closest('li').find('a:first');
                                    isImageLink = false;
                                }
                            }

                            /*
                            // original logic
                            if ($currentLink.closest('section').attr('class').indexOf('customTemplate') == -1) {
                                isImageLink = false;
                            }
                            */
                        }
                    }
                    // ----------------------------------------
                    // ----------------------------------------

                    // ----------------------------------------
                    // ----------------------------------------
                    // if image link add div overlay
                    if (isImageLink) {
                        this.addDivOverlay($currentLink, $image);
                    }
                    // ----------------------------------------
                    // ----------------------------------------

                    // ----------------------------------------
                    // ----------------------------------------
                    // if QLP link add div overlay
                    if (isQLPlink) {
                        // Only apply the div overlay if the image contained inside the QLP card has a width and a height
                        // if the width and height is 0 that means that there is no image
                        var height = jQuery($image).height();
                        var width = jQuery($image).width();

                        if (height !== 0 && width !== 0) {
                            this.addDivOverlay($currentLink, $image, isQLPlink);
                            //  MIIGHT NEED CUSOTM LOGIC TO CHECK ALL QLP WIDGET LINKS

                            // SETTING ISIMAGELINK TO TRUE TO SEE IF I CAN TRICK THE LOGIC TO STILL ADD CLASSES TO THE DIV OVERLAY
                            isImageLink = true;
                        }
                    }
                    // ----------------------------------------
                    // ----------------------------------------

                    // ----------------------------------------
                    // ----------------------------------------
                    // perform checks to link
                    // add flag class, check target, check title, check url
                    this.testLink($currentLink, isImageLink);

                    // bind click event
                    this.bindClickCallback($currentLink, isImageLink);
                    // ----------------------------------------
                    // ----------------------------------------

                }
            },
            bindClickCallback: function ($currentLink, isImageLink) {
                // bind click event
                if (isImageLink) {
                    return $currentLink.on('mousedown', this.linkChecked(this.$divOverlay));
                } else {
                    return $currentLink.on('mousedown', this.linkChecked($currentLink));
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
                    this.removeClass(jQuery('body').find('button'), key); // tester
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
                this.$sections = jQuery('main').find('section');
                this.$otherLinks = jQuery('header, footer').find('a');
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.imageCheckerOverlay { color: #000000 !important; font-weight: bold; text-align: center; vertical-align: middle; }')
                    // allow proper displaying of color overlay on images
                    .append('.overlaid { position: relative; }')
                    // image overlay styles
                    .append('.imgOverlay { color: black; font-size: 15px; font-weight: bold; text-align: center; position: absolute; z-index: 1; }') //top: 0; left: 0;
                    // link styles
                    .append('.noTitle { background: rgba(255, 124, 216, .75) !important; }')
                    .append('.hasTitle { background: rgba(146, 232, 66, .75) !important; }')
                    .append('.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 255, 255, 0) 26%, rgba(146, 232, 66, 0) 100%) !important; }')
                    .append('.hasTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(146, 232, 66, 0.75) 26%, rgba(146, 232, 66, 0.75) 99%, rgba(146, 232, 66, 0.75) 100%) !important; }')
                    .append('.noTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 124, 216, 0.75) 26%, rgba(255, 124, 216, 0.75) 100%) !important; }')
                    .append('.emptyTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 124, 216, 0.75) 26%, rgba(255, 124, 216, 0.75) 100%) !important; }')
                    .append('.brokenURL { background: linear-gradient(to right, rgba(253, 116, 108, .75), rgba(255, 144, 104, .75)) !important }')
                    .append('.urlIssue { -moz-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); -webkit-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); }')
                    .append('.absoluteURL { -moz-box-shadow: inset 0px 0px 0px 3px purple; -webkit-box-shadow: inset 0px 0px 0px 3px purple; box-shadow: inset 0px 0px 0px 3px purple; }')
                    .append('.siteLink.linkChecked, .imgOverlay.linkChecked { background: linear-gradient(to right, rgba(249,255,209,0.75) 0%, rgba(160,255,206,0.75) 100%) !important; color: #909090 !important; }'); // end of addStyles  #00a6ff

                // if site is TETRA do not add style
                if (toolbar.nextGenCheck()) {
                    this.$toolbarStyles
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
            // fix this switch statement TODO!
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
                        case (this.datedURL(href)):
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
                this.$divOverlay.css({
                    width: this.widthOfImage + 'px',
                    height: this.heightOfImage + 'px',
                    //                    'line-height': this.heightOfImage + 'px'
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

                // ---------------------------------------- test in TETRA
                // center div overlay
                if (toolbar.nextGenCheck()) {
                    //                    var parent = $currentImage.parent();
                    var parent = $currentImage.closest('figure');
                    this.$divOverlay.css({
                        //                        top: parent.height() / 2 - this.$divOverlay.height() / 2 + 'px',
                        left: parent.width() / 2 - this.$divOverlay.width() / 2 + 'px'
                    });
                }
                // ---------------------------------------- test

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
                //                console.log('checking url : ' + elem);
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
                    }).text('Spellcheck Page')
                };
            },
            cacheDOM: function (callingPanel) {
                this.$toolsPanel = jQuery(callingPanel);
                this.$cm = unsafeWindow.ContextManager;
                this.siteURL = this.$cm.getUrl();
                this.pageName = this.$cm.getPageName();
            },
            addTool: function () {
                this.$toolsPanel.append(spellCheck.config.$activateButt);
            },
            bindEvents: function () {
                //                spellCheck.config.$activateButt.on('click', this.spellCheck.bind(this));
                spellCheck.config.$activateButt.on('click', this.spellCheckPage.bind(this));
            },
            // ----------------------------------------
            // tier 2 functions
            // ----------------------------------------
            spellCheck: function () {
                var openThis = this.buildURL();
                openNewTab(openThis);
            },
            spellCheckPage: function () {
                document.designMode = "on";
                jQuery('body').focus();
                document.designMode = "off";
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
            },
            // ----------------------------------------
            // TESTER SPELL CHECK
            // ----------------------------------------
            spellCheck: function () {

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
                        class: 'myEDOBut offButt',
                        value: 'Send Test'
                    }).css({
                        width: '90%',
                        height: '50px'
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
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; word-wrap: break-word; }')
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
                        class: 'tbLegend'
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
            cacheDOM: function (callingPanel) {
                this.nextGen = document.firstChild.data;
                this.isNextGenPlatform = this.nextGenVar(this.nextGen);
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.$toolsPanel = jQuery(callingPanel);
                this.$legendContainer = jQuery('#legendContainer');

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
                showNavigation.config.$offButt.on('click', this.unbindClicks.bind(this));
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.majorPage { color: #ffffff; background: linear-gradient(to left, rgba(255, 179, 71, .75) , rgba(255, 204, 51, .75)) !important; }')
                    .append('.tetraShowNav { display: block !important; }')
                    .append('.linkChecked { background: linear-gradient(to right, rgba(249,255,209,0.75) 0%, rgba(160,255,206,0.75) 100%) !important; color: #999999 !important; }')
                    .append('.nextgenShowNav { display: inline-block !important; position: absolute !important; background: white !important; margin: 0 !important; width: 150px !important; z-index: 100; }')
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
                console.log(this.$navTabs);
                if (isNextGen) {
                    this.$navTabs.toggleClass('showNavAdd');
                    this.$subNavItem.toggleClass('showNavAdd');
                    this.$subNavMenuContainer.toggleClass('nextgenShowNav');
                }
                if (!isNextGen) {
                    this.$navTabs.find('a[href*=Form], a[href*=ContactUs], a[href=HoursAndDirections], a[href*=VehicleSearchResults]').toggleClass('majorPage');
                    this.$navTabs.toggleClass('tetraShowNav');
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
                    length = this.$navTabsLinks.length;

                for (i; i < length; i += 1) {
                    jQuery(this.$navTabsLinks[i]).on('mousedown', this.linkChecked(this.$navTabsLinks[i]));
                }

            },
            unbindClicks: function () {
                var i = 0,
                    length = this.$navTabsLinks.length;
                for (i; i < length; i += 1) {
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
                        class: 'myEDOBut removeDiv',
                        value: 'REMOVE',
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
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.body = jQuery('body');
            },
            addStyles: function () {
                // apply module styles to main tool bar style tag
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.inputDisplay { padding: 10px; position: absolute; top: 25%; left: 25%; width: 50%; height: 50%; overflow: auto; background: rgb(180, 180, 180);}')
                    .append('#inputContainer { background: rgba(0, 0, 0, 0.75); color: rgb(0, 0, 0); z-index: 99999; position: fixed; top: 0%; left: 0%; width: 100%; height: 100%; font-size: 16px;}')
                    .append('.removeDiv { position: fixed; top: 15%; left: 25%; height: 5%; width: 50%;}')
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

                $input.append(input);

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
            init: function (callingPanel) {
                this.createElements();
                this.cacheDOM(callingPanel);
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
                        class: 'tbLegend'
                    }),
                    $legendTitle: jQuery('<div>').attr({
                        class: 'legendTitle'
                    }).text('404 Link Checker Legend'),
                    $legendList: jQuery('<ul>').attr({
                        class: 'legendList'
                    }),
                    $legendContent: {
                        //                        'otherDomain': 'Absolute URL*',
                        'otherDomain': 'Leads Off Site',
                        'framedIn': 'f_link*',
                        //                        'brokenURL': 'URL Broken',
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
                    count: 1,
                    totalTests: 0,
                    totalLinks: 0,
                    errors: 0
                };
            },
            cacheDOM: function (callingPanel) {
                this.$toolbarStyles = jQuery('#qa_toolbox');
                this.cm = unsafeWindow.ContextManager;
                this.webID = this.cm.getWebId();
                this.siteID = this.cm.getSiteId();
                this.baseURL = this.cm.getUrl();
                this.host = window.location.hostname;
                this.wid = this.separateID(this.webID);
                this.$toolsPanel = jQuery(callingPanel);
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
                checkLinks.config.$activateButt.on('click', this.ajaxStop);
                checkLinks.config.$activateButt.on('click', this.testLinks.bind(this));
                //                checkLinks.config.$activateButt.on('click', this.tetraTestLinks.bind(this));
                checkLinks.config.$offButt.on('click', this.showLegend);
            },
            addStyles: function () {
                this.$toolbarStyles
                    // styles of colored overlay placed on images
                    .append('.framedIn { background: linear-gradient(to left, #F7971E , #FFD200) !important; color: #000000 !important; }')
                    .append('.attention { -moz-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); -webkit-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); }')
                    //                    .append('.brokenURL { background: linear-gradient(to left, #FFAFBD , #ffc3a0) !important; -moz-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); -webkit-box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); box-shadow: inset 0px 0px 0px 3px rgb(255, 55, 60); }')
                    .append('.jumpLink { background: linear-gradient(to left, #FFAFBD , #ffc3a0) !important; color: #000000 !important; }')
                    .append('.mobilePhoneLink { background: #005588 !important; color: #000000 !important; color: white !important; }')
                    .append('.success { background: linear-gradient(to right, rgba(86, 171, 47, .85) , rgba(168, 224, 99, .85)) !important; color: #000000 !important; }')
                    .append('.siteLink.success { background: linear-gradient(to right, rgba(86, 171, 47, .85) , rgba(168, 224, 99, .85)) !important; color: #000000 !important; }') // tester
                    .append('.error { background: linear-gradient(to left, #F00000 , #DC281E) !important; color: #ffffff !important; }')
                    .append('.otherDomain { background: linear-gradient(to left, #00C9FF , #92FE9D) !important; color: #000000 !important; }')
                    .append('.siteLink { color: black !important; border: none !important;}')
                    //                    .append('.fourOfour { background: linear-gradient(to left, #F00000 , #DC281E) !important; color: #ffffff !important; }')
                    .append('#checkMessage { margin: 5px auto; padding: 5px; }')
                    .append('#checkContainer { text-align: center; background: white; }'); // end of addStyles
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
                    currentLinkURL,

                    passedChecks = false,
                    $pageLinks = jQuery('a'),
                    pageLinksLength = $pageLinks.length;

                // set total tests to number of links on page
                checkLinks.config.totalTests = $pageLinks.length;
                checkLinks.config.totalLinks = $pageLinks.length;

                for (j; j < pageLinksLength; j += 1) {
                    $currentLink = jQuery($pageLinks[j]);
                    $currentLink.addClass('siteLink'); // add default flag class to links
                    //                    currentLinkURL = jQuery.trim($currentLink.attr('href'));

                    // if URL's do not pass the checks skip iteration
                    // do not send to ajax function for testing
                    passedChecks = this.testURLs($currentLink);
                    if (!passedChecks) {
                        continue;
                    }

                    // test links
                    //                    this.tetraAjaxTest(currentLinkURL, $currentLink);
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
                console.log('testURLS called');
                console.log('----------------------------------------');
                var linkURL = jQuery.trim($currentLink.attr('href'));
                // TEST linkURL
                // Add classes to $currentLink if link url does not pass tests
                console.log('url testing');
                console.log(linkURL);
                console.log($currentLink);
                switch (true) {
                    // test for mobile specific links
                    case (linkURL.indexOf('tel') >= 0):
                        $currentLink.addClass('mobilePhoneLink');
                        checkLinks.config.totalTests = checkLinks.config.totalTests - 1;
                        checkLinks.config.totalLinks = checkLinks.config.totalLinks - 1;
                        //                            continue;
                        return false;
                        //                        break;
                        // test for javascript links
                    case (linkURL.indexOf('javascript') >= 0 || (linkURL.indexOf('#') === 0 || linkURL.indexOf('#') === 1)):
                        $currentLink.addClass('jumpLink');
                        checkLinks.config.totalTests = checkLinks.config.totalTests - 1;
                        checkLinks.config.totalLinks = checkLinks.config.totalLinks - 1;
                        //                            continue;
                        return false;
                        //                        break;
                        // test for undefined or empty URLs
                    case (typeof $currentLink === 'undefined' || linkURL === ''):
                        $currentLink.addClass('attention');
                        checkLinks.config.totalTests = checkLinks.config.totalTests - 1;
                        return false;
                        //                        break;
                        //                            continue;
                        // test for absolute path URLs
                        // ** highlight for absolute URL but still test **
                        //                        case (linkURL.indexOf('www') > -1 || (linkURL.indexOf('http') > -1 || linkURL.indexOf('https') > -1)):
                    case (linkURL.indexOf('www') > -1 || linkURL.indexOf('://') > -1):
                        $currentLink.addClass('otherDomain');
                        return false;
                        //                        break;
                        // test for other special URLs
                        //                        case (linkURL.indexOf('f_') > -1 || linkURL.indexOf('//:') > -1):
                    case (linkURL.indexOf('f_') > -1 || linkChecker.verifyTarget($currentLink)):
                        $currentLink.addClass('framedIn');
                        checkLinks.config.totalTests = checkLinks.config.totalTests - 1;
                        return false;
                        //                            continue;
                        //                        break;
                    default:
                        // do nothing
                }
                return true;
            },
            nextgenTestLinks: function () {
                //                var j = 0,
                //                    curLink,
                //                    $curLink,
                //                    curURL,
                //                    curWindow,
                //                    $currentLink, $image, $imagelink, $sections, $otherLinks, len, a, $cardLinkContainer, $cardSEOContainer, $cardImageContainer, $cardLinks, $copyTextLinks, myLength, youLength, jLength, q, w, k, $currentCard, cardClass, isImageLink = false,
                //                    $pageLinks = jQuery('a'),
                //                    pageLinksLength = $pageLinks.length;


                // NEXT GEN LINKS SHOULD NOT DIFFER FROM TETRA LINKS'
                // 1 filter all links on the page
                // 2 only pass links to ajax testings if they pass all the checks.
                // 3 in the ajax testing that is where the div overlay gets applied to the link (prepend)
                // 4 classes are applied to the div overlay if any

                // create a for loop to check all the sections on the page.
                // loop through each card for links.

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
                    $cardLinkContainer, $cardSEOContainer, $cardImageContainer, $cardLinks, $copyTextLinks, myLength, youLength, jLength, q, w, j, $currentCard, cardClass, passedChecks;

                // ----------------------------------------
                // ----------------------------------------
                // TEST LINKS FOUND IN HEADER AND FOOTER OF SITE
                // TESTS TO BODY LINKS WILL BE HANDLED DIFFERENTLY
                jLength = $otherLinks.length;
                console.log(jLength);
                j = 0;
                for (j; j < jLength; j += 1) {
                    $currentLink = jQuery($otherLinks[j]);
                    // perform checks to link
                    // add flag class, check target, check title, check url
                    //                    this.testLink($currentLink, isImageLink);

                    this.testURLs($currentLink);
                    passedChecks = this.testURLs($currentLink);
                    if (!passedChecks) {
                        continue;
                    }

                    // USING TETRA AJAX TESTING BECAUSE ALL LINKS IN THE HEADER AND FOOTER EITHER TEXT LINKS or
                    // FONT IMAGE LINKS
                    // send link to ajx testing
                    //                    this.nextGenAjaxTest($currentLink);
                    this.tetraAjaxTest($currentLink);

                }
                // ----------------------------------------
                // ----------------------------------------
                return;
                // FIGURE OUT HOW TO TEST THE REST OF THE LINKS ON NEXT GEN SITES
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
                                //                                this.testLink($currentLink, isImageLink);
                                this.testURLs($currentLink);
                                passedChecks = this.testURLs($currentLink);
                                if (!passedChecks) {
                                    continue;
                                }

                                // send link to ajx testing
                                this.nextGenAjaxTest($currentLink);
                                // bind click event
                                // will change the color of link when user clicks
                                //                                this.bindClickCallback($currentLink, isImageLink);
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
                                    //                                    this.testLink($currentLink, isImageLink);

                                    this.testURLs($currentLink);
                                    passedChecks = this.testURLs($currentLink);
                                    if (!passedChecks) {
                                        continue;
                                    }

                                    // send link to ajx testing
                                    this.nextGenAjaxTest($currentLink);

                                    // bind click event
                                    // will change the color of link when user clicks
                                    //                                    this.bindClickCallback($currentLink, isImageLink);
                                }
                            }
                            break;
                            // ----------------------------------------
                            // ----------------------------------------

                            // ----------------------------------------
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
                                //                                this.addDivOverlay($currentLink, $image);

                                // THERE IS NO NEED TO TEST OTHER LINKS AS THEY WON'T MATTER
                                // THE CARD WILL ONLY LINK TO THE FIRST PRIMARY LINK IN THE CARD

                                this.testURLs($currentLink);
                                passedChecks = this.testURLs($currentLink);
                                if (!passedChecks) {
                                    continue;
                                }

                                // send link to ajx testing
                                this.nextGenAjaxTest($currentLink);

                                // perform checks to link
                                // add flag class, check target, check title, check url
                                //                                this.testLink($currentLink, isImageLink);

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
                                    //                                    this.testLink($currentLink, isImageLink);

                                    this.testURLs($currentLink);
                                    passedChecks = this.testURLs($currentLink);
                                    if (!passedChecks) {
                                        continue;
                                    }

                                    // send link to ajx testing
                                    this.nextGenAjaxTest($currentLink);

                                    // bind click event
                                    // will change the color of link when user clicks
                                    //                                    this.bindClickCallback($currentLink, isImageLink);
                                }
                            }
                            break;
                            // ----------------------------------------
                            // ----------------------------------------

                            // ----------------------------------------
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
                                //                                this.addDivOverlay($currentLink, $image);

                                // THERE IS NO NEED TO TEST OTHER LINKS AS THEY WON'T MATTER
                                // THE CARD WILL ONLY LINK TO THE FIRST PRIMARY LINK IN THE CARD

                                this.testURLs($currentLink);
                                passedChecks = this.testURLs($currentLink);
                                if (!passedChecks) {
                                    continue;
                                }

                                // send link to ajx testing
                                this.nextGenAjaxTest($currentLink);

                                // perform checks to link
                                // add flag class, check target, check title, check url
                                //                                this.testLink($currentLink, isImageLink);

                                // bind click event
                                // will change the color of link when user clicks
                                //                                this.bindClickCallback($currentLink, isImageLink);
                            }
                            break;
                            // ----------------------------------------
                            // ----------------------------------------

                        default:
                            console.log('default switch statement reached');
                    }

                    // ----------------------------------------
                    // ----------------------------------------


                    // FOR NEXT GEN LINK TESTING
                    // PERFORM PRE CHECKS TO WEED OUT LINKS TAHT DO NOT NEED TO BE CHECKEd

                    // MOVED DIV OVERLYAING AND CLASS ADDING TO THE AJAX TEST FUNCTION

                    // cache DOM depending on site type
                    // ----------------------------------------
                    // NEXT GEN SITE LOGIC
                    // ----------------------------------------
                    //                console.log('NEXTGEN 404 link function run');
                    //                $sections = jQuery('main').find('section');
                    //                $otherLinks = jQuery('header, footer').find('a');
                    //                len = $sections.length;
                    //                a = 0;
                    //                $image = null;
                    //                $imagelink = null;
                    //                isImageLink = false;
                    //
                    //                // ----------------------------------------
                    //                // ----------------------------------------
                    //                // TEST LINKS FOUND IN HEADER AND FOOTER OF SITE
                    //                // TESTS TO BODY LINKS WILL BE HANDLED DIFFERENTLY
                    //                jLength = $otherLinks.length;
                    //                k = 0;
                    //                for (k; k < jLength; k += 1) {
                    //                    $currentLink = jQuery($otherLinks[k]);
                    //
                    //                    console.log($currentLink.attr('href'));
                    //                    if ($currentLink.attr('href')) {
                    //                        curURL = jQuery.trim($currentLink.attr('href'));
                    //                    }

                    //                    }


                    // send in all links in the header and footer of the site.
                    // THESE LINKS ARE STYLED IN REGULARLY
                    //                    this.nextGenAjaxTest(curURL, $currentLink);
                }
                // ----------------------------------------
                // ----------------------------------------

                // AJAX FUNCTION WILL SET UP OVERLAYING DIVS ON IMAGES
                // NEED TO KEEP THAT LOCAL TO FUNCTION TO ALLOW DIRECT ACCESS TO DIV FOR CLASS MANIPULATION
                //                    this.ajaxTest(curURL, $curLink, $sections);
            },
            // adds a simple div over the image inside the the link
            // The div will have the same height and width of the image
            // The function returns the DIV OVERLAY
            addDivOverlaySimple: function ($currentLink) {
                console.log('add div overlay simple called');
                var $img, h, w, $linkOverlay;

                $img = $currentLink.find('img');
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
                $currentLink.prepend($linkOverlay);
                return $linkOverlay;
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
                        if ($currentLink.closest('section').attr('class').indexOf('customTemplate') == -1) {
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
                // MOVED ALL SECONDARY CHECKS TO FUNCTIONS
                // 5/14/2017
                // THIS AJAX TEST FUNCTION SHOULD BE USED AS BASE COPY FOR THE NEXT GEN 404 AJAX FUNCTION
                var hasImage = 0,
                    isImageLink = false,
                    $linkOverlay, pageError404,
                    linkURL = checkLinks.addURLParameter($currentLink);

                // test each link
                jQuery.ajax({
                    url: linkURL, //be sure to check the right attribute
                    type: 'post',
                    crossDomain: true,
                    method: 'get',
                    dataType: 'html',
                    success: function (data, textStatus, jqXHR) {

                        // checks to see if link is an image link
                        hasImage = $currentLink.has('img').length;
                        if (hasImage) {
                            isImageLink = true;
                            $linkOverlay = checkLinks.addDivOverlaySimple($currentLink);
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
                    error: function (jqXHR, textStatus, error) {
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
                        404: function (jqXHR, textStatus, error) {
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
            nextGenAjaxTest: function ($currentLink, $currentCard) {
                // NEXT GEN NEEDS LINK AND PARENT CARD TO OVERLAY IMAGE
                var hasImage = 0,
                    isImageLink = false,
                    $linkOverlay, pageError404,
                    linkURL = checkLinks.addURLParameter($currentLink),
                    $cardImageContainer,
                    cardClass, $cardLinkContainer, $image;

                // test each link
                jQuery.ajax({
                    url: linkURL, //be sure to check the right attribute
                    type: 'post',
                    crossDomain: true,
                    method: 'get',
                    dataType: 'html',
                    success: function (data, textStatus, jqXHR) {

                        console.log('ajax test');
                        console.log($currentCard);
                        // check if $currentCard parameter was provided
                        if ($currentCard) {

                            // check class of current card
                            if ($currentCard.attr('class') !== undefined) {
                                cardClass = $currentCard.attr('class');
                            }

                            // checks to see if card has image
                            $cardImageContainer = $currentCard.find('div.media');
                        }

                        // if media div is not empty
                        //                        $cardImageContainer = $currentCard.find('div.media');
                        if (!$cardImageContainer.is(':empty')) {
                            // ----------------------------------------
                            // ----------------------------------------
                            // card style is set to whole card is clickable and has CTA links
                            // if card is made clickable text links will not be able to be reached.
                            // should this still be checked?
                            if (cardClass.indexOf('card-clickable-v2') > -1) {
                                // find image in the card and apply a div overlay
                                isImageLink = true;
                                // find FIRST PRIMARY text link
                                $currentLink = $cardLinkContainer.find('a[class*="primary"]:first');
                                $image = $cardImageContainer.find('img');
                                // add div overlay to image
                                this.addDivOverlay($currentLink, $image);

                            }

                            // ----------------------------------------
                            // ----------------------------------------
                            // card style is set to whole card is clickable
                            // if card is made clickable text links will not be able to be reached.
                            // should this still be checked ?
                            if (cardClass.indexOf('card-clickable') > -1) {
                                // find image in the card and apply a div overlay
                                isImageLink = true;
                                // find FIRST PRIMARY text link
                                $currentLink = $cardLinkContainer.find('a[class*="primary"]:first');
                                $image = $cardImageContainer.find('img');
                                // add div overlay to image
                                this.addDivOverlay($currentLink, $image);

                            }
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
                    error: function (jqXHR, textStatus, error) {
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
                        404: function (jqXHR, textStatus, error) {
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
            /* ORIGINAL AJAX FUNCTION
            // HAD TO MAKE NEXTGEN AND TETRA AJAX TESTING TO AOID CONFUSION
                ajaxTest: function (linkURL, $curLink, $sections) {
                    console.log('----------------------------------------');
                    console.log('ajax test run ' + linkURL);
                    var hasImage = 0,
                        isImageLink = false,
                        isNextGen = toolbar.nextGenCheck(), // tester
                        $img,
                        w,
                        h,
                        $linkOverlay,
                        $currentLink, $image, $imagelink; //, isImageLink; // tester

                    //                debugger;

                    // test each link
                    jQuery.ajax({
                        url: linkURL, //be sure to check the right attribute
                        type: 'post',
                        crossDomain: true,
                        method: 'get',
                        dataType: 'html',
                        success: function (data, textStatus, jqXHR) {

                            // ---------------------------------------- tester
                            // ---------------------------------------- tester
                            // LOGIC FOR ADDING DIV OVERLAYS TO IMAGE LINKS
                            if (isNextGen) {


                            }
                            // ---------------------------------------- tester
                            // ---------------------------------------- tester

                            if (!isNextGen) {

                                // checks to see if link is an image link
                                // adds a div overlay if is an image link
                                hasImage = $curLink.has('img').length;

                                // if the link is an image
                                // ADD div overlay BEFORE the image
                                if (hasImage) {
                                    isImageLink = true;
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
                                    $curLink.prepend($linkOverlay);
                                }

                                // create check for links inside quick links widget
                                if ($curLink.closest('.cell').attr('data-cell')) {
                                    // check if link is within a quick links widget
                                    if ($curLink.closest('.cell').attr('data-cell').indexOf('Quick_Links_Plus') > -1) {
                                        // checks if QLP is modified by modules
                                        if ($curLink.closest('section').attr('class').indexOf('customTemplate') == -1) {
                                            isImageLink = false;
                                        }
                                    }
                                }

                                // unsupported page 404 checker
                                // had to include two checks for 404 page content to ensure that the page get flagged all the time
                                switch (true) {

                                    // if internal page 404 and link IS NOT an image link
                                    case (!isImageLink && (data.indexOf('pageNotFound') > -1 || data.indexOf('not currently a functioning page') > -1)):
                                        $curLink.addClass('fourOfour');
                                        checkLinks.error($curLink, isImageLink);
                                        checkLinks.config.errors += 1;
                                        break;

                                        // if internal page 404 and link IS an image link
                                    case (isImageLink && (data.indexOf('pageNotFound') > -1 || data.indexOf('not currently a functioning page') > -1)):
                                        $img.attr('style', 'position: relative;');
                                        //                                    $curLink.prepend($linkOverlay);
                                        checkLinks.error($curLink, isImageLink);
                                        checkLinks.config.errors += 1;
                                        break;

                                        // if link IS legit and NOT an image link
                                    case (!isImageLink && data.indexOf('pageNotFound') === -1):
                                        $curLink.addClass('success');
                                        checkLinks.success($curLink, isImageLink);
                                        break;

                                        // if link IS legit and an image link
                                    case (isImageLink && data.indexOf('pageNotFound') === -1):
                                        $img.attr('style', 'position: relative;');
                                        //                                    $curLink.prepend($linkOverlay);
                                        checkLinks.success($linkOverlay, isImageLink);
                                        break;

                                    default:
                                        // do nothing
                                }
                            }
                        },
                        error: function (jqXHR, textStatus, error) {
                            //set link in red if there is any errors with link
                            checkLinks.config.errors += 1;
                            if (jqXHR.status === 404) {
                                checkLinks.error($curLink, isImageLink);
                            }
                        },
                        statusCode: {
                            404: function (jqXHR, textStatus, error) {
                                $curLink.addClass('fourOfour');
                                checkLinks.error($curLink, isImageLink);
                                checkLinks.config.errors += 1;
                            }
                        },
                        complete: function () {
                            checkLinks.config.count += 1;
                            checkLinks.config.$counter.text(checkLinks.config.count + ' of ' + checkLinks.config.totalTests);
                        }
                    });
                },
            */
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

                    /* ---------------------------------------- tester
                    var x = checkLinks.config.totalLinks - checkLinks.config.totalTests + checkLinks.config.errors,
                        y = x * 100,
                        z = y / checkLinks.config.totalLinks;
                    console.log('----------------------------------------');
                    console.log('number of total links - (mobile specific links + links leading outside site + links that are anchor links) : ' + x);
                    console.log('number of issue links : ' + x);
                    console.log('total links = ' + checkLinks.config.totalLinks);
                    console.log('total links tested = ' + checkLinks.config.totalTests);
                    console.log('404 errors = ' + checkLinks.config.errors);
                    console.log(Math.round(z, -1) + '% of links require attention.  :]');
                    console.log('----------------------------------------');
                    ---------------------------------------- tester */
                });
            },
            error: function ($this, isImageLink) {
                //                var curClass = '';
                //                if (isImageLink) {
                //                    curClass = $this.attr('class');
                //                }
                //                console.log('inside error function');
                //                console.log(curClass);
                //                console.log($this);
                // NOT SURE IF THIS DOES WHAT ITS SUPPOSED TO DO
                // ITS SUPPOSED TO ADD THE ERROR CLASS TO THE DIV OVERLAY IF THE LINK IS AN IMAGE LINK
                $this.addClass('error');
            },
            success: function ($this, isImageLink) {
                //                var curClass = '';
                //                if (isImageLink) {
                //                    curClass = $this.attr('class');
                //                }
                $this.addClass('success');
            },
            // ----------------------------------------
            // Teir 4 -- tester functions
            // ----------------------------------------
            addDivOverlay: function ($currentLink, $currentImage) {
                this.cacheDOMOverlayElements($currentLink, $currentImage);
                this.createOverlayElements();
                this.buildOverlayElements();
                this.attachToImage($currentImage);
                //                imageChecker.attachToImage($currentImage);  // tester
            },
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
                //                this.$linkCheckmark = jQuery('<span>').css({
                //                    position: 'absolute',
                //                    left: '5px',
                //                    color: 'white'
                //                });
                //                this.$checkmark = jQuery('<i>').attr({
                //                    class: 'fa fa-check-circle fa-3x'
                //                });
            },
            buildOverlayElements: function () {
                //                this.sizeToImage();
                // make the div overlay the same dimensions as the image
                this.$divOverlay.css({
                    width: this.widthOfImage + 'px',
                    height: this.heightOfImage + 'px',
                    //                    'line-height': this.heightOfImage + 'px'
                });

                //                this.addContent();
                // add content to div
                this.$divOverlay.append(this.linkTitle);
                //                this.$divOverlay.on('mousedown', this.linkChecked(this.$divOverlay));
                //                this.$divOverlay.on('click', this.linkChecked(this.$divOverlay));
            },
            attachToImage: function ($currentImage) {
                // ---------------------------------------- test in TETRA
                // center div overlay
                if (toolbar.nextGenCheck()) {
                    //                    var parent = $currentImage.parent();
                    var parent = $currentImage.closest('figure');
                    this.$divOverlay.css({
                        //                        top: parent.height() / 2 - this.$divOverlay.height() / 2 + 'px',
                        left: parent.width() / 2 - this.$divOverlay.width() / 2 + 'px'
                    });
                }
                // ---------------------------------------- test

                // make parent image relative positionin
                this.togClass($currentImage, 'overlaid');

                // place div overlay onto image
                jQuery($currentImage).before(this.$divOverlay);

                // ---------------------------------------- test
                //                this.$divOverlay.on('mousedown', this.linkChecked(this.$divOverlay));
                // ---------------------------------------- test
            },
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
                            //                             do nothing
                            url += '&nextGen=false';
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
                    //                    console.log('reloading page');
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
                    .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); color: #000000 !important; clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; text-transform: none; border-top: 1px solid #000000; border-bottom: 1px solid #000000; word-wrap: break-word; }')
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
            init: function (callingPanel) {
                this.createElements();
                this.cacheDOM(callingPanel);
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
                        position: 'absolute',
                        right: '35px',
                        top: '-55px',
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
            cacheDOM: function (callingPanel) {
                this.$togglesPanel = jQuery(callingPanel);
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
            init: function (callingPanel) {
                this.createElements();
                this.buildTool();
                this.cacheDOM(callingPanel);
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
            cacheDOM: function (callingPanel) {
                this.$toolsPanel = jQuery(callingPanel);
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
                    $icon: jQuery('<i class="fa fa-power-off fa-2x"></i>').css({
                        'margin-left': '12px'
                    }),
                    $hide: jQuery('<div>').attr({
                        id: 'hideContainer'
                    }).css({
                        position: 'absolute',
                        top: '-20px',
                        'z-index': '500000'
                    }),
                    $minimizeIcon: jQuery('<span class="fa-stack fa-2x"><i class="fa fa-circle fa-stack-1x fa-inverse" style="color: #ffffff"></i><i class="fa fa-times-circle fa-stack-1x"></i></span>').attr({
                        title: 'Click to Hide Toolbox',
                        id: 'showToolbox'
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
                dynamicDisplay.config.$hide.append(dynamicDisplay.config.$minimizeIcon);
            },
            cacheDOM: function () {
                // page info
                this.$toolBoxContainer = jQuery('#toolboxContainer');
                this.nextGenComment = document.firstChild.data;
                this.isNextGen = this.checkNextGen(this.nextGenComment);
                this.variableList = this.programData();
            },
            addTool: function () {
                // add to main toolbox
                this.$toolBoxContainer.append(dynamicDisplay.config.$displayPanel);
                this.$toolBoxContainer.before(dynamicDisplay.config.$showToolbox);
                this.$toolBoxContainer.append(dynamicDisplay.config.$hide);
            },
            modToolbar: function () {
                if (this.isNextGen === 'Tetra') {
                    QAtoolbox.config.$toolbarStyles.append('.toolBox { background: linear-gradient(to left, #76b852 , #8DC26F) }'); // TETRA color
                    QAtoolbox.config.$toolbarStyles.append('.myEDOBut { margin: 1px 0px 0px 10px; }'); // button position
                    QAtoolbox.config.$toolbarStyles.append('#hideContainer { right: -25px; }'); // button position
                    QAtoolbox.config.$toolbarStyles.append('#legendContainer  { right: 115px; font-size: 11px; }'); // legend position
                } else if (this.isNextGen === 'Next Gen') {
                    QAtoolbox.config.$toolbarStyles.append('.toolBox { background: linear-gradient(to left, #02AAB0 , #00CDAC) }'); // NEXTGEN color
                    QAtoolbox.config.$toolbarStyles.append('#toolboxContainer { right: 0%; }'); // toolbox location
                    QAtoolbox.config.$toolbarStyles.append('.myEDOBut { margin: 1px 0px 0px -20px; }'); // button positions
                    QAtoolbox.config.$toolbarStyles.append('#hideContainer { left: -25px; }'); // button positions
                    QAtoolbox.config.$toolbarStyles.append('#legendContainer  { left: 115px; }'); // legend positions
                    QAtoolbox.config.$toolbarStyles.append('#showToolbox  { right: 0%; }'); // hide/unhide button positions
                }
            },
            bindEvents: function () {
                // click
                dynamicDisplay.config.$minimizeIcon.on('click', this.toggleTools.bind(this));
                dynamicDisplay.config.$showToolbox.on('click', this.toggleTools.bind(this));
                dynamicDisplay.config.$minimizeIcon.on('click', this.saveState);
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
            saveState: function (event) {
                // get current state
                var vName = jQuery(event.target).parent().attr('id'),
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
                    dynamicDisplay.config.$showToolbox.toggle();
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

                // removed if nextGen
                //                if (!this.isNextGenPlatform) {
                checkLinks.init(panelID);
                //                }

            },
            otherToolsPanel: function () {
                var panelID = '#otherTools';
                otherTools.init();
                showNavigation.init(panelID);
                seoSimplify.init(panelID);

                // add tetra specific tool to panel
                if (!this.isNextGenPlatform) {
                    jQuery('#otherTools').append($wo_butt);
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
                QAtoolbox.styleTools(qaTools.config.$mainToolsPanel);
                QAtoolbox.styleTools(otherTools.config.$otherToolsPanel);
            },
            // ----------------------------------------
            // tier 2
            // ----------------------------------------
            nextGenCheck: function () {
                //                console.log('main IS NEXTGEN CHECK'); // tester
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
            }
        };

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- initialize toolbox ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    toolbar.init();

})(); // end main function
