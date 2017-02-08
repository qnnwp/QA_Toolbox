// ==UserScript==
// @name QA Toolbox - Next Gen BETA
// @namespace www.cobaltgroup.com/
// @version 2.8.3
// @author Eric Tanaka
// @description Makes life easier... I hope.
// @updateURL http://media-dmg.assets-cdk.com/teams/repository/export/098/42dc8a0e0100581af0050568b5709/09842dc8a0e0100581af0050568b5709.js
// @downloadURL http://media-dmg.assets-cdk.com/teams/repository/export/098/42dc8a0e0100581af0050568b5709/09842dc8a0e0100581af0050568b5709.js
// @include http:*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
// @run-at document-end
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_info
// @noframes
// ==/UserScript==

/*global jQuery, unsafeWindow, GM_getValue, GM_setValue, GM_setClipboard, GM_openInTab, window, GM_info */

var cm = unsafeWindow.ContextManager,
    em = unsafeWindow.editMode,
    cmv = cm.getVersion(),
    sv = (cmv === 'WIP' || cmv === 'PROTO' || cmv === 'LIVE'),
    wID = cm.getWebId(),
    pn = cm.getPageName(),
    pw = ispw();

function applyParameters(isNextGen) {
    "use strict";
    if ((isNextGen) && (cmv !== 'LIVE')) {
        if (window.location.href.indexOf('nextGen=true') === -1) {
            window.location.search += '&nextGen=true';
        }
    }
}

function ispw() {
    "use strict";
    if (jQuery('body .phone-wrapper').length > 0) {
        return true;
    } else {
        return false;
    }
}

if (!em && sv && !pw) {

    var $tbs = jQuery('<style>').attr({
        id: 'qa_toolbox',
        type: 'text/css'
    });

    jQuery($tbs)
        .append('.myEDOBut { font-size: 11px; top: 15%; color: #ffffff; position: relative; width: 100%; height: 35px; margin: 1px 0px 0px -10px; border-radius: 5px; border: 2px solid rgb(0,0,0); }')
        .append('.myEDOBut:hover { background: black !important; color: white !important; }')
        .append('.showNav { display: block !important; }')
        .append('.linkOverlay { position: absolute; top: 0; left: 0; z-index: 1; }')
        .append('.imgOverlay { position: absolute; top: 0; left: 0; z-index: 1; }')
        .append('.hasTitle { background: rgba(146, 232, 66, .75) !important; color: white !important; }')
        .append('.noTitle { background: rgba(255, 124, 216, .75) !important; color: white !important; }')
        .append('.emptyTitle { background: rgba(255, 124, 216, .75) !important; color: white !important; }')
        .append('.hasAlt { background: rgba(146, 232, 66, .75) !important; }')
        .append('.noAlt { background: rgba(255, 124, 216, .75) !important; }')
        .append('.emptyAlt { background: rgba(255, 124, 216, .75) !important; }')
        .append('.brokenURL { background: rgba(255, 55, 60, .75) !important; }')
        .append('.urlIssue { -moz-box-shadow: inset 0px 0px 0px 1px rgb(255, 55, 60); -webkit-box-shadow: inset 0px 0px 0px 1px rgb(255, 55, 60); box-shadow: inset 0px 0px 0px 1px rgb(255, 55, 60); }')
        .append('.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 255, 255, 0) 26%, rgba(146, 232, 66, 0) 100%) !important; }')
        .append('.hasTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(146, 232, 66, 0.75) 26%, rgba(146, 232, 66, 0.75) 99%, rgba(146, 232, 66, 0.75) 100%) !important; }')
        .append('.noTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 124, 216, 0.75) 26%, rgba(255, 124, 216, 0.75) 100%) !important; }')
        .append('.emptyTitle.opensWindow { background: linear-gradient(to right, rgba(255, 165, 0, 0.75) 0%, rgba(255, 165, 0, 0.75) 25%, rgba(255, 124, 216, 0.75) 26%, rgba(255, 124, 216, 0.75) 100%) !important; }')
        .append('.siteLink.linkChecked { background: rgba(96, 223, 229, .75) !important; color: white !important; }')
        .append('.CobaltEditableWidget:after { content: attr(data-content); position: absolute; top: 0; bottom: 0; left: 0; z-index: 100; height: 20px; margin: auto; background: rgba(96, 223, 229, .75); color: white; font-weight: bold; font-size: 10px; }')
        .append('.CobaltWidget:after { content: attr(data-content); position: absolute; top: 0; bottom: 0; left: 0; z-index: 100; height: 20px; margin: auto; background: rgba(96, 223, 229, .75); color: white; font-weight: bold; font-size: 10px; }')
        .append('.legendContent { color: black !important; line-height: 1em; font-size: 1em; height: 10%; margin: 10px; }')
        .append('.overlayDiv { position: relative; }');

    // ---------------------------------------- web-id panel ----------------------------------------

    var $wid = jQuery('<div>').attr({
        title: 'Copy web-id'
    }).css({
        background: '#ffffff',
        'border-top': '1px solid #000000',
        'border-bottom': '1px solid #000000',
        clear: 'both',
        cursor: 'pointer',
        padding: '5px 0',
        color: '#000000'
    }).text(wID).hover(function () {
        "use strict";
        jQuery(this).css({
            background: '#f4f4f4'
        });
    }, function () {
        "use strict";
        jQuery(this).css({
            'background': '#ffffff'
        });
    });

    jQuery($wid).click(function () {
        "use strict";
        var webID = jQuery(this).html();
        new GM_setClipboard(webID, 'text');
    });

    var $pn = jQuery('<div>').attr({
        title: 'Copy page name'
    }).css({
        background: '#ffffff',
        'border-bottom': '1px solid #000000',
        clear: 'both',
        cursor: 'pointer',
        padding: '5px 0',
        color: '#000000'
    }).text(pn).hover(function () {
        "use strict";
        jQuery(this).css({
            background: '#f4f4f4'
        });
    }, function () {
        "use strict";
        jQuery(this).css({
            'background': '#ffffff'
        });
    });

    jQuery($pn).click(function () {
        "use strict";
        var pi = jQuery(this).html();
        new GM_setClipboard(pi, 'text');
    });

    // ---------------------------------------- m4 checkbox ----------------------------------------

    var $nextGenCheck = jQuery('<div>').attr({
            id: 'nextGenCheck'
        }).css({
            'padding': '7px 0 0 0'
        }),
        isNextGenSite = GM_getValue('isNextGen', false),
        $isNextGenLabel = jQuery("<label>").attr({
            for: 'isNextGenCheckbox'
        }).text('is a Next Gen Site?').css({
            display: 'inline-block',
            'vertical-align': 'super'
        }),
        $isNextGenCheckbox = jQuery('<input>').attr({
            type: 'checkbox',
            id: 'isNextGenCheckbox',
            name: 'isNextGenCheckbox',
            checked: isNextGenSite
        }).css({
            width: '20px',
            height: '20px'
        });

    applyParameters(isNextGenSite);
    jQuery($isNextGenCheckbox).click(function () {
        var checked = jQuery('#isNextGenCheckbox').attr('checked');
        GM_setValue('isNextGen', checked);
        applyParameters(checked);
    });

    $nextGenCheck.append($isNextGenLabel).append($isNextGenCheckbox);

    // ---------------------------------------- show nav ----------------------------------------

    var $sn_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'showNavigation',
        title: 'Show Navigation'
    }).text('Show Navigation');

    $sn_butt.click(function () {
        var $navItems = jQuery('.header .menu nav ul li'),
            $subNavMenuContainer = jQuery('.header .menu nav ul li > ul'),
            $subNavMenuItems = jQuery('.header .menu nav ul li > ul li'),
            corePages;

        $navItems.css({
            width: '200px',
            padding: '0'
        });

        // read data from file
        jQuery.get("http://media-dmg.assets-cdk.com/teams/repository/export/166/c0290a0c2100582d00050568ba825/166c0290a0c2100582d00050568ba825.txt", function (data) {
            // create array seperating each 'page' by the '-=-='
            data = data.replace(/\r?\n|\r/g, '');
            corePages = data.split('-=-=');

            // loop through each subnav item and compare href to core page value
            $subNavMenuItems.each(function (index, subnavItem) {
                var z = 0,
                    cpLength = corePages.length,
                    href = jQuery(subnavItem).find('a').attr('href');

                for (z; z < cpLength; z++) {
                    href = href.toLowerCase();
                    var corePage = corePages[z].toLowerCase();

                    // if match is found highlight sub nav item with pink
                    if (href.indexOf(corePage) > 0) {
                        jQuery(subnavItem).css({
                            background: 'pink'
                        });
                        continue;
                    }
                }
            });
        });

        // apply a green gradient once link is clicked
        $navItems.click(function () {
            jQuery(this).css({
                background: 'linear-gradient(to left, #A1FFCE , #FAFFD1)',
                color: 'black'
            });
        });

        // make sub navigation yellow
        $subNavMenuContainer.css({
            display: 'inline-block',
            position: 'fixed',
            background: 'yellow',
            margin: '0'
        });
    });

    // ---------------------------------------- image checker ----------------------------------------

    var $ic_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'imageChecker',
        title: 'Image Alt Checker'
    }).text('Image Alt Checker');

    $ic_butt.click(function () {
        var $icl = jQuery('<div>').attr({
                id: 'linkLegend'
            }).css({
                background: 'white',
                'border': '3px solid black',
                'width': '200px',
                'position': 'fixed',
                'bottom': '6%',
                'left': '6%',
                'z-index': '100000',
                'text-align': 'center',
                'padding': '10px'
            }),
            $iclt = jQuery('<div>').attr({
                id: 'linkLegendTitle'
            }).text('Image Checker Legend'),
            $iclna = jQuery('<div>').attr({
                class: 'legendContent noAlt'
            }).text('HAS NO alt text'),
            $iclha = jQuery('<div>').attr({
                class: 'legendContent hasAlt'
            }).text('HAS alt text'),
            $icrb = jQuery('<input>').attr({
                type: 'button',
                class: 'myButton',
                value: 'Remove'
            }).css({
                width: '90%',
                height: '50px'
            });

        $icrb.click(removeFeatures);

        var $ia = jQuery("body img"),
            iaLength = $ia.length,
            a = 0;
        for (a; a < iaLength; a++) {
            var isImageLink = true;
            var w = jQuery($ia[a]).width(),
                h = jQuery($ia[a]).height();
            addDivOverlay($ia[a], w, h);

            if (jQuery($ia[a]).attr("alt") !== undefined) {
                if (jQuery($ia[a]).attr("alt") === '') {
                    if (isImageLink) {
                        jQuery($ia[a])
                            .siblings(".imgOverlay")
                            .addClass("emptyAlt");
                    } else {
                        jQuery($ia[a]).addClass("emptyAlt");
                    }
                } else {
                    if (isImageLink) {
                        jQuery($ia[a])
                            .siblings(".imgOverlay")
                            .addClass("hasAlt");
                        jQuery($ia[a])
                            .siblings(".imgOverlay")
                            .attr("title", jQuery($ia[a])
                                .attr("alt"));
                    } else {
                        jQuery($ia[a]).addClass("hasAlt");
                    }
                }
            } else {
                if (isImageLink) {
                    jQuery($ia[a])
                        .siblings(".imgOverlay")
                        .addClass("noAlt");
                } else {
                    jQuery($ia[a]).addClass("noAlt");
                }
            }
        }

        jQuery($icl)
            .append($iclt)
            .append($iclna)
            .append($iclha)
            .append($icrb);

        jQuery("#content").append($icl);

        function removeFeatures() {
            $ia = jQuery("body img");
            iaLength = $ia.length;
            a = 0;
            for (a; a < iaLength; a++) {
                jQuery($ia[a])
                    .removeClass("opensWindow")
                    .removeClass("emptyAlt")
                    .removeClass("hasAlt")
                    .removeClass("noAlt")
                    .removeClass('overlayDiv');
            }
            jQuery("body").find(".imgOverlay").remove();
            $icl.remove();
            jQuery(this).remove();
        }

        function addDivOverlay(elem, width, height) {
            var $imageOverlay = jQuery('<div>').attr({
                    class: 'imgOverlay'
                }),
                imageAlt = jQuery(elem).attr('alt');
            jQuery($imageOverlay).css({
                width: width + 'px',
                height: height + 'px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'line-height': height + 'px',
                color: '#000000 !important',
                'font-weight': 'bold'
            }).append(imageAlt);
            jQuery($imageOverlay)
                .insertBefore(jQuery(elem)
                    .addClass('overlayDiv'));
        }
    });

    // ---------------------------------------- link checker ----------------------------------------

    var $lc_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'linkChecker',
        title: 'Check Links'
    }).text('Link Checker');

    $lc_butt.click(function () {
        var $lcc = jQuery('<span>').css({
                position: 'absolute',
                left: '5px',
                color: 'white'
            }),
            $cm = jQuery('<i>').attr({
                class: 'fa fa-check-circle fa-3x'
            }),
            $lcl = jQuery('<div>').attr({
                id: 'linkLegend;'
            }).css({
                background: 'white',
                border: '3px solid black',
                width: '200px',
                position: 'fixed',
                bottom: '6%',
                left: '6%',
                'z-index': '10000',
                'text-align': 'center',
                padding: '10px'
            }),
            $lclt = jQuery('<div>').attr({
                id: 'linkLegendTitle'
            }).text('Link Checker Legend'),
            $lclnt = jQuery('<div>').attr({
                class: 'legendContent noTitle'
            }).text('HAS NO title text'),
            $lclht = jQuery('<div>').attr({
                class: 'legendContent hasTitle'
            }).text('HAS title text'),
            $lclow = jQuery('<div>').attr({
                class: 'legendContent opensWindow'
            }).text('OPENS IN A NEW WINDOW'),
            $lclbl = jQuery('<div>').attr({
                class: 'legendContent brokenURL'
            }).text('EMPTY OR UNDEFINED URL'),
            $lclui = jQuery('<div>').attr({
                class: 'legendContent urlIssue'
            }).text('VERIFY URL'),
            $icr_butt = jQuery('<input>').attr({
                type: 'button',
                class: 'myButton',
                value: 'Remove'
            }).css({
                width: '90%',
                height: '50px'
            });

        jQuery($lcc).append($cm);

        function removeLCfeatures() {
            b = 0;
            for (b; b < laLength; b++) {
                jQuery($la[b])
                    .removeClass("siteLink")
                    .removeClass("opensWindow")
                    .removeClass("emptyTitle")
                    .removeClass("hasTitle")
                    .removeClass("noTitle")
                    .removeClass("brokenURL")
                    .removeClass('urlIssue')
                    .removeClass("linkChecked")
                    .removeClass('overlayDiv');
            }
            jQuery("body").find(".linkOverlay").remove();
            $lcl.remove();
            jQuery(this).remove();
        }

        function bindClickAction(isImage) {
            return function () {
                if (isImage) {
                    jQuery(this).find('.linkOverlay')
                        .addClass('linkChecked')
                        .append($lcc);
                } else {
                    jQuery(this).addClass('linkChecked');
                }
            };
        }

        function addLinkDiv(elem, width, height) {
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
                }),
                linkTitle = jQuery(elem).attr('title');
            jQuery($linkOverlay).append(linkTitle);
            jQuery(elem).addClass('overlayDiv').prepend($linkOverlay);
        }

        function checkTarget(elem) {
            if ((jQuery(elem).attr("target") === "_blank") || (jQuery(elem).attr("target") === "_new")) {
                return true;
            }
        }

        function checkHref(elem) {
            if ((jQuery(elem).attr('href').indexOf('#') === 0) ||
                (jQuery(elem).attr('href').indexOf('f_') === 0) ||
                (jQuery(elem).attr('href').indexOf('www') >= 0) ||
                (jQuery(elem).attr('href').indexOf('http') >= 0)) {
                return true;
            }
        }

        jQuery($icr_butt).click(removeLCfeatures);

        jQuery($lcl)
            .append($lclt)
            .append($lclnt)
            .append($lclht)
            .append($lclow)
            .append($lclbl)
            .append($lclui)
            .append($icr_butt);

        jQuery("#content").append($lcl);

        var $la = jQuery("body a"),
            laLength = $la.length,
            b = 0;
        for (b; b < laLength; b++) {
            var isImageLink = false;
            if ((jQuery($la[b]).has("img").length)) {
                var w = jQuery($la[b]).has("img").width(),
                    h = jQuery($la[b]).height();
                addLinkDiv($la[b], w, h);
                isImageLink = true;
            }
            jQuery($la[b]).click(bindClickAction(isImageLink));
            jQuery($la[b]).addClass('siteLink');
            if (checkTarget($la[b])) {
                if (isImageLink) {
                    jQuery($la[b])
                        .find(".linkOverlay")
                        .addClass("opensWindow");
                } else {
                    jQuery($la[b]).addClass("opensWindow");
                }
            }

            if ((jQuery($la[b]).attr("href"))) {
                if (checkHref($la[b])) {
                    if (isImageLink) {
                        jQuery($la[b])
                            .find(".linkOverlay")
                            .addClass("urlIssue");
                    } else {
                        jQuery($la[b]).addClass("urlIssue");
                    }
                }
            } else {
                if (isImageLink) {
                    jQuery($la[b])
                        .find(".linkOverlay")
                        .addClass("brokenURL");
                } else {
                    jQuery($la[b]).addClass("brokenURL");
                }
            }

            if (jQuery($la[b]).attr("title") !== undefined) {
                if (jQuery($la[b]).attr("title") === '') {
                    if (isImageLink) {
                        jQuery($la[b])
                            .find(".linkOverlay")
                            .addClass("emptyTitle");
                    } else {
                        jQuery($la[b]).addClass("emptyTitle");
                    }
                } else {
                    if (isImageLink) {
                        jQuery($la[b])
                            .find(".linkOverlay")
                            .addClass("hasTitle");
                    } else {
                        jQuery($la[b]).addClass("hasTitle");
                    }
                }
            } else {
                if (isImageLink) {
                    jQuery($la[b])
                        .find(".linkOverlay")
                        .addClass("noTitle");
                } else {
                    jQuery($la[b]).addClass("noTitle");
                }
            }
        }
    });

    // ---------------------------------------- Show Autofill Tags ----------------------------------------

    var $af_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'showAutofill',
        title: 'Show Autofill Tags'
    }).text('Show Autofill Tags');

    $af_butt.click(function () {
        "use strict";
        var x = "?disableAutofill=true",
            z = cm.getUrl(),
            newTab;
        newTab = new GM_openInTab(z + pn + x, 'active');
    });

    // ---------------------------------------- Spell Check ----------------------------------------

    var $sc_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'spellCheck',
        title: 'Check Spelling'
    }).text('Spellcheck Page');

    $sc_butt.click(function () {
        "use strict";
        var scSite = "https://www.w3.org/2002/01/spellchecker?",
            param = {
                uri: encodeURIComponent(cm.getUrl() + pn),
                lang: "en_US"
            },
            newTab;
        jQuery.each(param, function (index, value) {
            scSite += index + '=' + value + "&";
        });
        newTab = new GM_openInTab(scSite, 'insert');
    });

    // ----------------------------------------

    var pageInformation = {
        init: function () {
            // initialize module
            this.createElements();
            this.buildPanel();
            this.cacheDOM();
            this.addTool();
            this.displayData();
            this.hide();
            this.addStyles();
            this.bindEvents();
        },
        createElements: function () {
            // main panel container
            pageInformation.config = {
                $panelContainer: jQuery('<div>')
                    .attr({
                        class: 'toolBox',
                        id: 'pageInfoPanel'
                    }),
                // panel title
                $infoPanelTitle: jQuery('<div>')
                    .addClass('panelTitle')
                    .text('Page Information'),
                // dealership name title
                $dealerNameTitle: jQuery('<label>')
                    .addClass('tbLabel')
                    .text('Dealer Name'),
                // dealership name display
                $dealerName: jQuery('<div>')
                    .addClass('tbInfo')
                    .attr({
                        title: 'Dealership Name',
                        id: 'dealerName'
                    }),
                // web id title
                $webIDTitle: jQuery('<label>')
                    .addClass('tbLabel')
                    .text('Web-Id'),
                // web is display
                $webID: jQuery('<div>')
                    .addClass('tbInfo')
                    .attr({
                        title: 'Copy web-id',
                        id: 'webID'
                    }),
                // page name title
                $pageNameTitle: jQuery('<label>')
                    .addClass('tbLabel')
                    .text('Page Name'),
                // pange name display
                $pageName: jQuery('<div>')
                    .addClass('tbInfo')
                    .attr({
                        title: 'Copy Page Name',
                        id: 'pageName'
                    }),
                // page label title
                $pageLabelTitle: jQuery('<label>')
                    .addClass('tbLabel')
                    .text('Custom Page Name'),
                // page label display
                $pageLabel: jQuery('<div>')
                    .addClass('tbInfo')
                    .attr({
                        title: 'Copy Page Label',
                        id: 'pageLabel'
                    })
            };
        },
        buildPanel: function () {
            // attach panel elements to container
            jQuery(pageInformation.config.$panelContainer)
                .append(pageInformation.config.$infoPanelTitle)
                .append(pageInformation.config.$dealerNameTitle)
                .append(pageInformation.config.$dealerName)
                .append(pageInformation.config.$webIDTitle)
                .append(pageInformation.config.$webID)
                .append(pageInformation.config.$pageNameTitle)
                .append(pageInformation.config.$pageName)
                .append(pageInformation.config.$pageLabelTitle)
                .append(pageInformation.config.$pageLabel);
        },
        cacheDOM: function () {
            // page info
            this.$cm = unsafeWindow.ContextManager;
            this.dealerName = this.$cm.getDealershipName();
            this.webID = this.$cm.getWebId();
            this.pageName = this.$cm.getPageName();
            this.pageLabel = this.$cm.getPageLabel();
            // DOM elements
            this.$toolbarStyles = jQuery('#qa_toolbox');
            this.$toolBoxContainer = jQuery('#toolboxContainer');
        },
        addTool: function () {
            // add to main toolbox
            this.$toolBoxContainer.prepend(pageInformation.config.$panelContainer);
        },
        displayData: function () {
            // fill in page information
            pageInformation.config.$dealerName.html(this.dealerName);
            pageInformation.config.$webID.html(this.webID);
            pageInformation.config.$pageName.html(this.pageName);
            pageInformation.config.$pageLabel.html(this.pageLabel);
        },
        hide: function () {
            // hide pagel label elements if name
            // is same as page name
            var pageName = this.pageName;
            var pageLabel = this.pageLabel;
            if (pageName === pageLabel) {
                pageInformation.config.$pageLabelTitle.toggle();
                pageInformation.config.$pageLabel.toggle();
            }
        },
        addStyles: function () {
            // apply module styles to main tool bar style tag
            this.$toolbarStyles
                .append('.tbInfo { background: linear-gradient(to right, #ECE9E6 , #FFFFFF); clear: both; cursor: pointer; line-height: 15px; padding: 3px 0px; border-top: 1px solid #000000; border-bottom: 1px solid #000000; }')
                .append('.tbLabel { font-weight: bold; }')
                .append('.myEDOBut[disabled] { border: 2px outset ButtonFace; background: #ddd; background-color: #ddd; color: grey !important; cursor: default; }');
        },
        bindEvents: function () {
            // hover
            pageInformation.config.$panelContainer.on('mouseover mouseleave', '.tbInfo', this.hoverEffect);
            // click
            pageInformation.config.$panelContainer.on('click', '.tbInfo', this.copyToClipboard);
        },
        hoverEffect: function (event) {
            // apply hover effects
            var element = event.currentTarget;
            jQuery(element).toggleClass('highlight');

        },
        copyToClipboard: function (event) {
            // copy page info
            var copyThisText = event.currentTarget.innerHTML;
            GM_setClipboard(copyThisText, 'text');
        }
    };

    // ----------------------------------------

    var $tb = jQuery('<div>').attr({
            id: 'myToolbox'
        }).css({
            'text-align': 'center',
            background: 'linear-gradient(to right, #a8e063 0%, #56ab2f 100%)',
            position: 'fixed',
            top: '20%',
            right: '0%',
            width: '135px',
            border: '1px solid black',
            'font-size': '.85em',
            'z-index': '9999999'
        }),
        $tbt = jQuery('<div>').css({
            color: 'white',
            padding: '5px'
        }).text('QA Toolbox');

    var $version = jQuery('<div>').css({
        'font-size': '12px'
    }).text('version: ' + GM_info.script.version);

    $tbt.click(function () {
        $tb.toggle();
    });

    jQuery($tb)
        .append($tbt)
        .append($wid)
        .append($pn)
        .append($nextGenCheck)
        .append($sn_butt)
        .append($ic_butt)
        .append($lc_butt)
        .append($af_butt)
        .append($sc_butt)
        .append($version);

    jQuery($tb).children('.myEDOBut:even').css({
        background: 'linear-gradient(to left,#00d2ff 0,#3a7bd5 100%)'
    });

    jQuery($tb).children('.myEDOBut:odd').css({
        background: 'linear-gradient(to left, #4b6cb7 0px, #182848 100%)'
    });

    jQuery('head').append($tbs);
    jQuery('body').append($tb);
}
