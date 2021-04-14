(function (global, factory) {
    global = global;
    global.Common = factory();
}(window, function () { 'use strict';
    var Common = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            win = window,
            $ = win.jQuery,
            doc = win.document;
        return {
            util : {
                youtube : {
                    apiLoaded : false,
                    apiCustomEl : $('<x>'),
                    hasApi : false
                },
                isRTL : function () {
                    return $('html').hasClass('rtl');
                },
                isSupportTransform : (function () {
                    return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
                })(),
                isSupportTransition : (function () {
                    return ('WebkitTransition' in doc.body.style || 'MozTransition' in doc.body.style || 'msTransition' in doc.body.style || 'OTransition' in doc.body.style || 'transition' in doc.body.style);
                })(),
                isSupportTransforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                    var div = document.createElement('div').style;
                    return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
                })(),
                isDevice : (function () {
                    var isDevice = ('ontouchstart' in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
                    isDevice ? $('html').addClass('isTouchDevice') : $('html').addClass('isNotTouchDevice');
                    return isDevice;
                })(),
                isIOS : (function () {
                    var isIOS = (/iPad|iPhone|iPod/.test(navigator.userAgent));
                    isIOS ? $('html').addClass('isIosDevice') : $('html').addClass('isNotIosDevice');
                    return isIOS;
                })(),
                isIEorEdge : (function () {
                    var word;
                    var agent = navigator.userAgent.toLowerCase();
                    if (navigator.appName == "Microsoft Internet Explorer") {
                        word = "msie ";
                    } else if (agent.search( "trident" ) > -1) {
                        word = "trident/.*rv:";
                    } else if (agent.search( "edge/" ) > -1) {
                        word = "edge/";
                    } else {
                        return -1;
                    }
                    var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
                    if (reg.exec(agent) != null) {
                        $('html').addClass('isIEorEdge');
                        return parseFloat(RegExp.$1 + RegExp.$2);
                    }
                    return -1;
                })(),
                isAemEditMode : function () {
                    var flag = false;
                    if (win.parent && win.frameElement && $(win.parent.document).find('.foundation-authoring-ui-mode').size()) {
                        flag = true;
                    }
                    return flag;
                },
                isObject: function (o) {
                    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
                },
                getBoundingClientRect : function (target) {
                    return target[0].getBoundingClientRect();
                },
                getTransitionCss : function (targetProperty, target) {
                    var propertys = target.css('transition-property'),
                        durations = target.css('transition-duration'),
                        delays = target.css('transition-delay');
                    var slicePropertys = propertys.split(',').map(function (val) {
                            return $.trim(val);
                        }),
                        sliceDurations = durations.split(',').map(function (val) {
                            return parseFloat($.trim(val)) * 1000;
                        }),
                        sliceDelays = delays.split(',').map(function (val) {
                            return parseFloat($.trim(val)) * 1000;
                        }),
                        hasIndex = $.inArray(targetProperty, slicePropertys);
                    return sliceDurations[hasIndex] + sliceDelays[hasIndex];
                },
                def : function () {
                    var args = [], len$1 = arguments.length;
                    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];
                    var to = Object(args[0]);
                    for (var i = 1; i < args.length; i += 1) {
                        var nextSource = args[i];
                        if (nextSource !== undefined && nextSource !== null) {
                            var keysArray = Object.keys(Object(nextSource));
                            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                                var nextKey = keysArray[nextIndex];
                                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                                if (desc !== undefined && desc.enumerable) {
                                    if (this.isObject(to[nextKey]) && this.isObject(nextSource[nextKey])) {
                                        this.def(to[nextKey], nextSource[nextKey]);
                                    } else if (!this.isObject(to[nextKey]) && this.isObject(nextSource[nextKey])) {
                                        to[nextKey] = {};
                                        this.def(to[nextKey], nextSource[nextKey]);
                                    } else {
                                        to[nextKey] = nextSource[nextKey];
                                    }
                                }
                            }
                        }
                    }
                    return to;
                },
                winSize : (function () {
                    var isWinSafari = (function () {
                        var appNetscape = (navigator.appName === "Netscape"),
                            appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                            userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                            userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                        return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                    })();
                    if (isWinSafari) {
                        return function () {
                            var win_wh = {
                                w : $(win).width(),
                                h : $(win).height()
                            };
                            return win_wh;
                        }
                    } else {
                        return function () {
                            var win_wh = {
                                w : win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
                                h : win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
                            };
                            return win_wh;
                        }
                    }
                })(),
                requestAFrame : (function () {
                    return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame ||
                        function (callback) {
                            return win.setTimeout(callback, 1000 / 60);
                        };
                })(),
                cancelAFrame : (function () {
                    return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.webkitCancelRequestAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame ||
                        function (id) {
                            win.clearTimeout(id);
                        };
                })(),
                imgLoaded : function (selector) {
                    var deferred = $.Deferred();
                    if (selector.length) {
                        var imgs = selector.find('img'),
                            imgs = selector[0].tagName === 'IMG' ? imgs.add(selector) : imgs,
                            minLength = 0,
                            maxLength = imgs.length,
                            data = {},
                            dataFunc = function (index, element) {
                                data[index] = {
                                    IMG : element
                                };
                            },
                            completeFunc = function () {
                                if (minLength === maxLength) {
                                    deferred.resolve(data);
                                }
                            };
                        if (!maxLength) {
                            completeFunc();
                        } else {
                            for (var i = 0, max = maxLength; i < max; i++) {
                                (function (index) {
                                    var img = imgs.eq(index),
                                        imgDOM = img[0];
                                    if (imgDOM.complete || img.height() > 0) {
                                        dataFunc(minLength, imgDOM);
                                        minLength++;
                                        completeFunc();
                                    } else {
                                        img.on('load error', function () {
                                            dataFunc(minLength, imgDOM);
                                            minLength++;
                                            completeFunc();
                                            img.off('load error');
                                        });
                                    }
                                })(i);
                            }
                        }
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise();
                },
                scrollMoveFunc : function (target) {
                    if (!target.length) return;
                    var deferred = $.Deferred();
                    var scrollTop = Math.ceil(target.offset().top),
                        winTop = $(win).scrollTop(),
                        totalMoveTop = scrollTop + 1;
                    if (totalMoveTop === winTop) {
                        deferred.resolve();
                    } else {
                        TweenLite.to($('html, body'), 1, {
                            ease : Power4.easeInOut,
                            scrollTop : totalMoveTop,
                            onComplete : $.proxy(function () {
                                deferred.resolve();
                            }, this)
                        });
                    }
                    return deferred.promise();
                },
                pageReposition : function () {
                    console.log('pageReposition');
                },
                findFocus : function (target) {
                    if (!target.length) return;
                    if (this.isIOS) {
                        target.attr({
                            'tabIndex' : -1
                        }).focus();
                    } else {
                        var focusClass = 'find-focus-element',
                            focusElements = '<span class="' + focusClass + '" style="position:fixed;left:0;right:0;width:1px;height:1px;font-size:1px;line-height:0;color:transparent;outline:none">&nbsp;</span>';
                        if (!target.find('>.' + focusClass).length) {
                            target.prepend(focusElements);
                        }
                        focusElements = target.find('>.' + focusClass);
                        focusElements.attr({
                            'tabIndex' : -1
                        }).focus();
                        focusElements.on('focusoutside', function (e) {
                            var _this = $(e.currentTarget);
                            _this.removeAttr('tabIndex').css('outline', '');
                            _this.off('focusoutside');
                            _this.remove();
                        });
                    }
                },
                objectLength : function (obj) {
                    var len = 0;
                    for (var key in obj) {
                        len++;
                    }
                    return len;
                },
                scrollParams : {
                    scrollLockType : true,
                    scrollLockClass : 'is-scroll-lock',
                    scrollLockOpts : {
                        scrollLocked : false,
                        lockElements : 'html',
                        appliedLock : {},
                        prevStyles : {},
                        prevScroll : {},
                        lockStyles : {
                            'position' : 'fixed',
                            'width' : '100%'
                        }
                    },
                },
                scrollMethods : {
                    saveStyles : function () {
                        var scrollParams = this.scrollParams,
                            styleStrs = [],
                            styleHash = {},
                            lockOpts = scrollParams.scrollLockOpts,
                            lockElements = $(lockOpts.lockElements),
                            styleAttr =  lockElements.attr('style');
                        if (!styleAttr) return;
                        styleStrs = styleAttr.split(';');
                        $.each(styleStrs, function styleProp (styleString) {
                            var styleString = styleStrs[styleString];
                            if (!styleString) return;
                            var keyValue = styleString.split(':');
                            if (keyValue.length < 2) return;
                            styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]);
                        });
                        $.extend(lockOpts.prevStyles, styleHash);
                    },
                    saveScrolls : function () {
                        var scrollParams = this.scrollParams,
                            lockOpts = scrollParams.scrollLockOpts;
                        lockOpts.prevScroll = {
                            scrollLeft : $(win).scrollLeft(),
                            scrollTop : $(win).scrollTop()
                        };
                    }
                },
                scrollLock : function (type) {
                    var scrollParams = this.scrollParams,
                        scrollMethods = this.scrollMethods;
                    if (!scrollParams.scrollLockType) return;
                    var lockClass = scrollParams.scrollLockClass,
                        lockOpts = scrollParams.scrollLockOpts,
                        lockElements = $(lockOpts.lockElements);
                    lockElements.toggleClass(lockClass, type);
                    if (type) {
                        if (this.isDevice && this.isIOS) {
                            if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                            lockOpts.appliedLock = {};
                            scrollMethods.saveStyles.call(this);
                            scrollMethods.saveScrolls.call(this);
                            $.extend(lockOpts.appliedLock, lockOpts.lockStyles, {
                                'left' : - lockOpts.prevScroll.scrollLeft,
                                'top' : - lockOpts.prevScroll.scrollTop
                            });
                            lockElements.css(lockOpts.appliedLock);
                            lockElements.data('lockScroll', {
                                'left' : lockOpts.prevScroll.scrollLeft,
                                'top' : lockOpts.prevScroll.scrollTop
                            });
                            lockOpts.scrollLocked = true;
                        }
                    } else {
                        if (this.isDevice && this.isIOS) {
                            if (!lockOpts.scrollLocked || (lockElements.data('lockScroll') == null)) return;
                            scrollMethods.saveStyles.call(this);
                            for (var key in lockOpts.appliedLock) {
                                delete lockOpts.prevStyles[key];
                            }
                            lockElements.attr('style', $('<x>').css(lockOpts.prevStyles).attr('style') || '');
                            lockElements.data('lockScroll', null);
                            $(win).scrollLeft(lockOpts.prevScroll.scrollLeft).scrollTop(lockOpts.prevScroll.scrollTop);
                            lockOpts.scrollLocked = false;
                        }
                    }
                },
                scrollExtend : function (obj) {
                    obj.scrollParams = this.scrollParams;
                    obj.scrollMethods = this.scrollMethods;
                    obj.scrollLock = this.scrollLock;
                }
            },
            RESPONSIVE : {
                MOBILE : {
                    NAME : 'mobile',
                    WIDTH : 767
                }
            }
        };
    })();
    return Common;
}));
