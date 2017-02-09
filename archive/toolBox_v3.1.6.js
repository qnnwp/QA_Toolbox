/*global jQuery, unsafeWindow, GM_getValue, GM_setValue, GM_setClipboard, GM_openInTab, GM_info, window, document */
/*----------------------------------------
version: 3.1.6
----------------------------------------
CHANGE LOG
2/7/2017
- Created "Advanced Settings" for WebPageTest Settings
- Updated name of toolbar to "NextGen Migration Toolbar"
2/6/2017
- Removed Core Page highlight from Navigation Checker Tool
- Updated "Opens in a new window" code
    a. Site links now use a custom name to open in a new window
2/2/2017
- Removed mobile from web page test tool
- Updated core.txt file to only inlcude a select few pages
----------------------------------------*/

var cm = unsafeWindow.ContextManager,
    em = unsafeWindow.editMode,
    cmv = cm.getVersion(),
    sv = (cmv === 'WIP' || cmv === 'PROTO' || cmv === 'LIVE'),
    wID = cm.getWebId(),
    pn = cm.getPageName(),
    pw = ispw();

function ispw() {
    "use strict";
    if (jQuery('body .phone-wrapper').length > 0) {
        return true;
    } else {
        return false;
    }
}

//function applyParameters(isNextGen) {
//    "use strict";
//    if ((isNextGen) && (cmv !== 'LIVE')) {
//        if (window.location.href.indexOf('nextGen=true') === -1) {
//            window.location.search += '&nextGen=true';
//        }
//    }
//}

//function applyParameters(isNextGenSite) {
//    var x = '';
//    console.log('apply parameters : ', isNextGenSite);
//    if (isNextGenSite) { // if toggle is turned on
//        //  (if nextGEN parameter is set to FALSE) OR (if nextGen parameter DOESN'T exist in the URL)
//        if (window.location.href.indexOf('nextGen=false') >= 0) {
//            // nextGen parameter exists in URL
//            //            window.location.search += '&nextGen=true';
//            x = window.location.href;
//            x.replace('nextGen=false', 'nextGen=true');
//            console.log('new url :', x);
//            window.location.href = x;
//            //            var x = window.location.hostname;
//            //            x += '&nextGen=false';
//        } else if (window.location.href.indexOf('nextGen=') === -1) {
//            // nextGen parameter DOES NOT exist in URL
//            window.location.search += '&nextGen=true';
//        }
//    } else {
//        // if toggle is turned off
//        if (window.location.href.indexOf('nextGen=true') >= 0) {
//            // nextGen parameter exists in URL
//            x = window.location.href;
//            x.replace('nextGen=true', 'nextGen=false');
//            console.log('new url :', x);
//            window.location.href = x;
//
//        } else {
//            // nextGen parameter DOES NOT exist in URL
//            window.location.search += '&nextGen=false';
//        }
//    }
//}

function applyParameters(isNextGen) {
    "use strict";
    console.log('inside applyParameters');
    console.log(isNextGen);
    if ((isNextGen) && (cmv !== 'LIVE')) {
        if (window.location.href.indexOf('nextGen=true') === -1) {
            window.location.search += '&nextGen=true';
        }
    }
}

if (!em && sv && !pw) {

    // build toolbox
    var $tb = jQuery('<div>').attr({
            id: 'myToolbox'
        }).css({
            'text-align': 'center',
            background: 'linear-gradient(to right, #a8e063 0%, #56ab2f 100%)',
            position: 'fixed',
            color: 'black',
            bottom: '0%',
            right: '0%',
            width: '135px',
            border: '1px solid black',
            'font-size': '.85em',
            'z-index': '9999999'
        }),
        $tbt = jQuery('<div>').css({
            color: 'white',
            padding: '5px'
        }).text('QA Toolbox'),
        $legenContainer = jQuery('<div>').attr({
            id: 'legendContainer'
        }).css({
            'width': '230px',
            'position': 'fixed',
            'bottom': '6%',
            'left': '6%',
            'z-index': '100000'
        }),
        $tbt = jQuery('<div>').css({
            color: 'white',
            padding: '5px'
        }).text('QA Toolbox');

    var $tbs = jQuery('<style>').attr({
        id: 'qa_toolbox',
        type: 'text/css'
    });

    jQuery($tbs)
        .append('.myEDOBut { font-size: 11px; top: 15%; color: #ffffff; position: relative; width: 100%; height: 35px; margin: 1px 0px 0px -10px; border-radius: 5px; border: 2px solid rgb(0,0,0); }')
        .append('.myEDOBut:hover { background: black !important; color: white !important; }')
        .append('.showNav { display: inline-block !important; position: absolute !important; background: white !important; margin: 0 !important; width: 150px !important; }')
        .append('.showNavAdd { width: 150px !important; padding: 0 !important; font-size: 15px !important; }')
        .append('.linkOverlay { position: absolute; top: 0; left: 0; z-index: 1; }')
        .append('.imgOverlay { position: absolute; top: 0; left: 0; z-index: 1; }')
        .append('.hasTitle { background: rgba(146, 232, 66, .75) !important; color: white !important; }')
        .append('.noTitle { background: rgba(255, 124, 216, .75) !important; color: white !important; }')
        .append('.emptyTitle { background: rgba(255, 124, 216, .75) !important; color: white !important; }')
        .append('.hasAlt { background: rgba(146, 232, 66, .75) !important; }')
        .append('.noAlt { background: rgba(255, 124, 216, .75) !important; }')
        .append('.corePage { color: #ffffff !important; background: linear-gradient(to left, #ffb347 , #ffcc33) !important; }')
        .append('.checked {background: linear-gradient(to left, rgba(161, 255, 206, 0.75) , rgba(250, 255, 209, 0.75)), #ffffff !important; color: #999999 !important; }')
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
        .append('.legendContent { color: black !important; line-height: 1em; font-size: .85em; height: 10%; margin: 10px; }')
        .append('.overlayDiv { position: relative; }')
        .append('.tested { background: pink; }')
        .append('.linkLegend { background: white; border: 3px solid black; color: #000000; text-align: center; padding: 10px; }');

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

    // ---------------------------------------- nextGen checkbox ----------------------------------------

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
                //            checked: isNextGenSite
        }).css({
            width: '20px',
            height: '20px'
        });

    applyParameters(isNextGenSite);
    jQuery($isNextGenCheckbox).click(function () {
        var $checked = jQuery('#isNextGenCheckbox').prop('checked');
        console.log('checkbox checke, new value : ', $checked);

        if ($checked) {
            console.log('checked value is true');
            jQuery('#isNextGenCheckbox').prop('checked', true);

        } else {
            console.log('checked value is false');

            jQuery('#isNextGenCheckbox').prop('checked', false);
        }

        GM_setValue('isNextGen', $checked);
        var x = GM_getValue('isNextGen', false);
        console.log('new value of saved variable :', x);
        applyParameters($checked);
    });

    $nextGenCheck.append($isNextGenLabel).append($isNextGenCheckbox);
    // ----------------------------------------
    //    console.log('initial checked state : ', isNextGenSite);
    //    applyParameters(isNextGenSite);
    //    console.log('initial set up complete');
    //
    //    jQuery($isNextGenCheckbox).click(function () {
    //        var checked = jQuery('#isNextGenCheckbox').attr('checked');
    //        console.log('is check box checked? : ', checked);
    //        if (checked === 'checked') {
    //            checked = true;
    //        } else {
    //            checked = false;
    //        }
    //        console.log('save this to the isNExtGen variable : ', checked);
    //        GM_setValue('isNextGen', checked);
    //        applyParameters(checked);
    //    });
    // ----------------------------------------
    //    old code
    //        var $nextGenCheck = jQuery('<div>').attr({
    //            id: 'nextGenCheck'
    //        }).css({
    //            'padding': '7px 0 0 0'
    //        }),
    //        isNextGenSite = GM_getValue('isNextGen', false),
    //        $isNextGenLabel = jQuery("<label>").attr({
    //            for: 'isNextGenCheckbox'
    //        }).text('is a Next Gen Site?').css({
    //            display: 'inline-block',
    //            'vertical-align': 'super'
    //        }),
    //        $isNextGenCheckbox = jQuery('<input>').attr({
    //            type: 'checkbox',
    //            id: 'isNextGenCheckbox',
    //            name: 'isNextGenCheckbox',
    //            checked: isNextGenSite
    //        }).css({
    //            width: '20px',
    //            height: '20px'
    //        });
    //
    //    applyParameters(isNextGenSite);
    //    jQuery($isNextGenCheckbox).click(function () {
    //        var checked = jQuery('#isNextGenCheckbox').attr('checked');
    //        GM_setValue('isNextGen', checked);
    //        applyParameters(checked);
    //    });
    //
    //    $nextGenCheck.append($isNextGenLabel).append($isNextGenCheckbox);
    // ----------------------------------------
    //    if (isNextGenSite) { // if toggle is turned on
    //        //  (if nextGEN parameter is set to FALSE) OR (if nextGen parameter DOESN'T exist in the URL)
    //        if (window.location.href.indexOf('nextGen=false') >= 0) {
    //            // nextGen parameter exists in URL
    //            //            window.location.search += '&nextGen=true';
    //            var x = window.location.href;
    //            x.replace('nextGen=false', 'nextGen=true');
    //            console.log('new url :', x);
    //            window.location.href = x;
    //            //            var x = window.location.hostname;
    //            //            x += '&nextGen=false';
    //        } else if (window.location.href.indexOf('nextGen=') === -1) {
    //            // nextGen parameter DOES NOT exist in URL
    //            window.location.search += '&nextGen=true';
    //        }
    //    } else {
    //        // if toggle is turned off
    //        if (window.location.href.indexOf('nextGen=true') >= 0) {
    //            // nextGen parameter exists in URL
    //            var x = window.location.href;
    //            x.replace('nextGen=true', 'nextGen=false');
    //            console.log('new url :', x);
    //            window.location.href = x;
    //
    //        } else {
    //            // nextGen parameter DOES NOT exist in URL
    //            window.location.search += '&nextGen=false';
    //        }
    //    }

    if (isNextGenSite === false) {

        if (window.location.href.indexOf('nextGen=true') >= 0) {
            //            window.location.search += '&nextGen=true';
            var x = window.location.hostname;
            x += '&nextGen=false';
        }

    }

    $nextGenCheck.append($isNextGenLabel).append($isNextGenCheckbox);

    // ---------------------------------------- show nav ----------------------------------------

    var $sn_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'showNavigation',
        title: 'Show Navigation'
    }).text('Show Navigation');

    $sn_butt.click(function () {
        var $navItems = jQuery('.header .menu nav ul li'),
            $navItemsLinks = jQuery('.header .menu nav ul li > a'),
            $subNavMenuContainer = jQuery('.header .menu nav ul li > ul'),
            $subNavMenuItems = jQuery('.header .menu nav ul li > ul li'),
            corePages;

        // read data from file
        jQuery.get("https://media-dmg.assets-cdk.com/teams/repository/export/166/c0290a0c2100582d00050568ba825/166c0290a0c2100582d00050568ba825.txt", function (data) {
            // create array seperating each 'page' by the '-=-='
            data = data.replace(/\r?\n|\r/g, '');
            corePages = data.split('-=-=');

            /* ----------------------------------------
            // loop through each subnav item and compare href to core page value
            $subNavMenuItems.each(function (index, subnavItem) {
                var z = 0,
                    cpLength = corePages.length,
                    subNavLink = jQuery(subnavItem).find('a'),
                    href = jQuery(subnavItem).find('a').attr('href');


                for (z; z < cpLength; z++) {
                    href = href.toLowerCase();
                    var corePage = corePages[z].toLowerCase();

                    // if match is found highlight sub nav item
                    if (href.indexOf(corePage) >= 0) {
                        jQuery(subNavLink).addClass('corePage');
                        continue;
                    }
                }
            });
            ---------------------------------------- */
        });

        // apply a green gradient once link is clicked
        $navItemsLinks.on('mousedown', function () {
            jQuery(this).addClass('checked');
        });

        // add custom classes to show navigation
        $navItems.addClass('showNavAdd');
        $subNavMenuContainer.addClass('showNav');

        // legend stuff
        var $snl = jQuery('<div>').attr({
                class: 'linkLegend'
            }),
            $snlt = jQuery('<div>').attr({
                id: 'linkLegendTitle'
            }).text('Show Navigation Legend'),
            $sncp = jQuery('<div>').attr({
                class: 'legendContent corePage'
            }).text('Core Page'),
            $snch = jQuery('<div>').attr({
                class: 'legendContent checked'
            }).text('Checked'),
            $snrb = jQuery('<input>').attr({
                type: 'button',
                class: 'myButton',
                value: 'Remove'
            }).css({
                width: '90%',
                height: '50px'
            }),
            $snhint = jQuery('<div>').css({
                'font-size': '10px',
                margin: '10px 0 0 0'
            }).text('ctrl+left click to open link in a new window');

        // bind remove button
        $snrb.click(removeFeatures);

        jQuery($snl)
            .append($snlt)
            //            .append($sncp)
            .append($snch)
            .append($snrb)
            .append($snhint);

        jQuery("#legendContainer").append($snl);

        function removeFeatures() {
            //            jQuery('.corePage').removeClass();
            jQuery('.checked').removeClass();
            jQuery('.showNav').removeClass();
            jQuery('.showNavAdd').removeClass();
            $navItems.unbind('click');
            $snl.remove();
            jQuery(this).remove();
        }
    });

    // ---------------------------------------- image checker ----------------------------------------

    var $ic_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'imageChecker',
        title: 'Image Alt Checker'
    }).text('Image Alt Checker');

    $ic_butt.click(function () {
        var $icl = jQuery('<div>').attr({
                class: 'linkLegend'
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

        jQuery("#legendContainer").append($icl);

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
                class: 'linkLegend'
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
            if ((jQuery(elem).attr("target") === "_blank") || (jQuery(elem).attr("target") === "_new") || (jQuery(elem).attr("target") === "custom")) {
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

        jQuery("#legendContainer").append($lcl);

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


    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- refresh page button ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    var refreshPage = {
        init: function () {
            this.createElements();
            this.cacheDOM();
            this.buildTool();
            this.addTool();
            this.bindEvents();
            this.addStyles();
        },
        // tier 1 functions
        // ----------------------------------------
        createElements: function () {
            refreshPage.config = {
                $refreshContainer: jQuery('<div>').attr({
                    id: 'refreshMe'
                }).css({
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    'z-index': '1000000'
                }),
                $activateButt: jQuery('<button>').attr({
                    class: 'myEDOBut',
                    id: 'refreshPage',
                    title: 'Refresh Page from Server'
                }).css({
                    background: 'linear-gradient(to left, #FBD3E9 , #BB377D)',
                    width: '75px',
                    height: '50px'
                }),
                $refresh: jQuery('<i class="fa fa-undo fa-flip-horizontal fa-3x">&nbsp;</i>').css({
                    'margin-left': '-10px'
                })
            };
        },
        cacheDOM: function () {
            //            this.$otherToolsPanel = jQuery('#myToolbox');
            this.$toolbarStyles = jQuery('#qa_toolbox');
        },
        buildTool: function () {
            refreshPage.config.$activateButt.html(refreshPage.config.$refresh);
            refreshPage.config.$refreshContainer.append(refreshPage.config.$activateButt);
        },
        addTool: function () {
            //            this.$otherToolsPanel.append(refreshPage.config.$refreshContainer);
            $tb.append(refreshPage.config.$refreshContainer);
        },
        bindEvents: function () {
            refreshPage.config.$activateButt.on('click', this.reloadPage);
        },
        addStyles: function () {
            $tbs
                .append('#refreshPage:hover { color: #ffffff !important; background: linear-gradient(to left, #f4c4f3 , #fc67fa) !important; }');
        },
        // tier 2 functions
        // ----------------------------------------
        reloadPage: function () {
            window.location.reload(true);
        }
    };

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

    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------- 404 checker ----------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    // will show LIVE SITE functionality
    // on proof some links may result in 404 errors.
    // not sure why this is.
    // change up functionality to Cache once button is clicked

    var $404checker_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: '404checker',
        title: '404 Checker'
    }).text('404 Checker');

    $404checker_butt.on('click', function () {
        var cm = unsafeWindow.ContextManager,
            webID = cm.getWebId(),
            baseURL = cm.getUrl(),
            siteID = cm.getSiteId(),
            wid = z(webID),
            $pageLinks = jQuery('a'),
            $container = jQuery('<div>').attr({
                id: 'checkContainer'
            }),
            $message = jQuery('<div>').attr({
                id: 'checkMessage'
            }).css({
                margin: '5px auto',
                width: '90px'
            }),
            $thinking = jQuery('<i id="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'),
            $done = jQuery('<i class="fa fa-check-circle fa-3x fa-fw"></i>'),
            $refresh = jQuery('<div>').css({
                'line-height': '10px'
            }).text('refresh page before running checker again'),
            $404legend = jQuery('<div>').attr({
                class: 'linkLegend'
            }).css({
                background: 'white',
                border: '3px solid black',
                width: '200px',
                'z-index': '10000',
                'text-align': 'center',
                padding: '10px'
            }),
            $404legendt = jQuery('<div>').attr({
                id: 'four04LegendTitle'
            }).text('404 Checker Legend'),
            $404legendSuccess = jQuery('<div>').attr({
                class: 'legendContent'
            }).text('Link is Working').css({
                background: 'rgba(0, 128, 0, .75)'
            }),
            $404legendQueued = jQuery('<div>').attr({
                class: 'legendContent'
            }).text('Link to be Tested').css({
                background: 'pink'
            }),
            $404legendError = jQuery('<div>').attr({
                class: 'legendContent'
            }).text('Verify Link Works').css({
                background: 'rgba(255, 0, 0, .75)'
            });

        // build legend
        $404legend
            .append($404legendt)
            .append($404legendQueued)
            .append($404legendSuccess)
            .append($404legendError);

        jQuery("#legendContainer").append($404legend);

        // split web-id
        function z(webID) {
            var x = webID.split('-');
            return x[1];
        }
        // attach display area to tool box
        jQuery($404checker_butt).after($container);
        // show thinking icon
        jQuery(document).ajaxStart(function () {
            $message.text('checking links');
            jQuery($container).append($message).append($thinking);
        });

        // test each link on the page
        $pageLinks.each(function (index, value) {

            var $this = jQuery(value), //retain a reference to the current link
                linkURL = jQuery(value).attr('href'), //current link URL
                hasImage = 0,
                isImageLink = false;

            $this.addClass('tested');
            // test if URL is undefined
            // skip checking link if not a web link
            if (typeof linkURL === 'undefined') {
                $this.addClass('undefined');
                error($this, isImageLink);
                return true;
            }

            var curWindow = window.location.href;
            if (curWindow.indexOf('nextGen=true') > -1) {
                // check URL if using relative path
                // NEXT GEN SPECIFIC
                // add complete URL for testing purposes
                //                var findThis = '/' + wid + '/',
                var findThis = '/' + siteID + '/',
                    findThis2 = '/' + wid + '/',
                    length = findThis.length + 1;
                if ((linkURL.indexOf(findThis) >= 0) && (linkURL.indexOf(findThis) < length)) {
                    linkURL = linkURL.replace(findThis, baseURL);
                }
                if ((linkURL.indexOf(findThis2) >= 0) && (linkURL.indexOf(findThis2) < length)) {
                    linkURL = linkURL.replace(findThis, baseURL);
                }
            } else {
                // check URL if it begins with /, signifying the link is a relative path URL
                // check URL if it doesn't have the normal http://www, also signifying the link is a relative path URL
                // TETRA SPECIFIC
                // add complete URL for testing purposes
                if ((linkURL.indexOf('/') === 0) || !checkHref(linkURL)) {
                    linkURL = baseURL + linkURL;
                }
            }

            // test if link is correct format for URL
            // skip iteration if not correct format
            if (!checkHref(linkURL)) {
                $this.addClass('format');
                error($this, isImageLink);
                return true;
            }

            // test each link
            jQuery.ajax({
                url: linkURL, //be sure to check the right attribute
                type: 'text',
                method: 'get',
                context: document.body,
                success: function () { //pass an anonymous callback function

                    // checks to see if link is an image link
                    // adds a div overlay if is an image link
                    hasImage = $this.has('img').length;
                    if (hasImage) {
                        isImageLink = true;
                    }

                    // if is an image link add class to div overlay
                    // else add class to a tag
                    if (isImageLink) {
                        var $img = $this.find("img"),
                            w = $img.width(),
                            h = $img.height(),
                            $linkOverlay = jQuery('<div>').attr({
                                class: 'siteLink linkOverlay'
                            }).css({
                                width: w + 'px',
                                height: h + 'px',
                                position: 'absolute',
                                'z-index': 1
                            });

                        $img.attr('style', 'position: relative;');
                        $this.prepend($linkOverlay);
                        success($linkOverlay, isImageLink);
                    } else {
                        $this.addClass('success');
                        success($this, isImageLink);
                    }

                },
                error: function (jqXHR, status, er) {
                    //set link in red if there is any errors with link
                    error($this, isImageLink);
                },
                statusCode: {
                    404: function () {
                        $this.addClass('error');
                        error($this, isImageLink);
                    }
                }
            });
        });

        // fire after ALL ajax requests have been completed
        jQuery(document).ajaxStop(function () {
            jQuery('#checkMessage').empty();
            jQuery('#loading').hide();
            jQuery('#checkMessage').text('all links checked');
            jQuery('#checkMessage').append($done);
            jQuery('#checkMessage').append($refresh).delay('8000').fadeOut('3000');
        });

        function success($this, isImageLink) {
            var curStyle = '';
            if (isImageLink) {
                curStyle = $this.attr('style');
            }
            $this.attr('style', curStyle + ' background-color: rgba(0, 128, 0, .75) !important');
        }

        function error($this, isImageLink) {
            var curStyle = '';
            if (isImageLink) {
                curStyle = $this.attr('style');
            }
            $this.attr('style', curStyle + ' background-color: rgba(255, 0, 0, .75) !important');
        }

        function checkHref(linkURL) {
            if ((linkURL.indexOf('f_') === 0) ||
                (linkURL.indexOf('www') >= 0) ||
                (linkURL.indexOf('http') >= 0) ||
                (linkURL.indexOf('//:') >= 0)) {
                return true;
            }
        }
    });

    // ----------------------------------------
    // Test WebPage
    // ----------------------------------------

    var $wpt_butt = jQuery('<button>').attr({
        class: 'myEDOBut',
        id: 'testPage',
        title: 'Queue up a Page Test'
    }).text('Web Page Test');

    // create input for email
    var dEmail = GM_getValue('email', 'your.name@cdk.com'), //tampermonkey func(variableName, defaultValue)
        $emTitle = jQuery('<div>').text('Enter your email'),
        $em = jQuery('<input>').attr({
            id: 'email',
            type: 'text',
            value: dEmail
        }).css({
            margin: '5px 0px',
            width: '85%'
        }),
        $wptInput = jQuery('<div>').attr({
            id: 'wptInput'
        }).css({
            padding: '5px',
            display: 'none',
            'border-bottom': '1px solid #000000'
        }),
        myOptions = {
            '_IE11': 'IE11',
            ':Chrome': 'Chrome',
            ':FireFox': 'Firefox'
        };

    // ----------------------------------------
    // advanced settings
    var $settingsContainer = jQuery('<div>').attr({
            id: 'wptSettings'
        }),
        $toggleSettings = jQuery('<div>').attr({
            id: 'wptSettingToggle',
            title: 'click to view settings'
        }).css({
            cursor: 'pointer',
            padding: '5px',
            'font-style': 'italic',
            background: 'white',
            'font-size': '11px'
        }).text('Advanced Settings'),
        $wptSettingsTitle = jQuery('<div>').css({
            'font-weight': 'bold',
            'border-top': '1px solid #000000',
            'border-bottom': '1px solid #000000'
        }).text('WebPageTest Settings');

    //    $toggleSettings.before($wptInput);
    $settingsContainer.append($toggleSettings);

    $toggleSettings.on('click', function () {
        return $wptInput.slideToggle('2000');
    });
    // ----------------------------------------

    // create drop down menu for WPT
    var $browserOptions = jQuery('<select>').attr({
            id: 'bSelect'
        }).css({
            margin: '5px 0',
            width: '90%'
        }),
        $browserTitle = jQuery('<div>').text('Choose a Browser');

    jQuery.each(myOptions, function (val, text) {
        $browserOptions.append(jQuery('<option></option>').val(val).html(text));
    });

    // build input panel
    jQuery($wptInput)
        .append($wptSettingsTitle)
        .append($emTitle)
        .append($em)
        .append($browserTitle)
        .append($browserOptions);

    // WPT main function
    $wpt_butt.click(function () {
        GM_setValue('email', jQuery($em).val()); // tampermonkey (variableName, value)
        var browser = jQuery('#bSelect option:selected').val(), // get value from drop down
            bName = jQuery('#bSelect option:selected').text(),
            email = GM_getValue('email'),
            siteURL = cm.getUrl(),
            isNextGen = '?%26nextGen=true',
            pageName = cm.getPageName(),
            testURL = "http://www.webpagetest.org/runtest.php?",
            params = {
                k: "A.1b40e6dc41916bd77b0541187ac9e74b",
                runs: "3",
                fvonly: "1",
                notify: email,
                location: "Dulles" + browser
            },
            newTab, dURL;

        // build urls
        jQuery.each(params, function (index, value) {
            testURL += index + "=" + value + "&";
        });

        dURL = testURL + "url=" + siteURL + pageName + isNextGen + "&device=immobile";

        if (confirm('----------------------------------------\n' +
                'Test the Desktop site?\n' +
                '----------------------------------------\n' +
                'Browser : ' + bName + '\n' +
                'Send Results To : ' + email + '\n' +
                '----------------------------------------') === true) {
            newTab = GM_openInTab(dURL, true);
        }
    });

    // ----------------------------------------

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
        .append($404checker_butt)
        .append($wpt_butt)
        .append($toggleSettings) // new
        .append($wptInput)
        .append($version);

    // initialize refresh button tool
    refreshPage.init();

    jQuery($tb).children('.myEDOBut:even').css({
        background: 'linear-gradient(to left,#00d2ff 0,#3a7bd5 100%)'
    });

    jQuery($tb).children('.myEDOBut:odd').css({
        background: 'linear-gradient(to left, #4b6cb7 0px, #182848 100%)'
    });

    jQuery('head').append($tbs);
    jQuery('body').append($tb);
    jQuery('body').append($legenContainer);
}
