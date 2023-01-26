(function() {
    if (window.hasOwnProperty("BlueshiftConnect")) {
        return false
    }
    var $ = null,
        _root = typeof(_BLUESHIFT_ROOT) != "undefined" ? _BLUESHIFT_ROOT : "https://blueshift-staging.quantinsti.com",
        _root_backend = "https://bs-poc.quantinsti.com",
        _cdn_url = "https://di206pkbrwro2.cloudfront.net/static-assets-prod/3rd-party-integration",
        _uri_login = "https://blueshift-staging.quantinsti.com/accounts",
        _uri_research = "/research",
        _uri_css = "https://di206pkbrwro2.cloudfront.net/static-assets-prod/3rd-party-integration/blueshift-3rd-party-prod-v4-minified.css",
        _fields = ["action", "name", "templateType", "isFolder", "editorType", "backtestBundleName", "backtestEndDate", "backtestStartDate", "backtestStartCapital", "strategyLink", "link", "buttonSize", "buttonTheme", "pwdPath", "entryPwdPath", "templateEntryFile"],
        _fields_exemption_list = ['buttonSize', 'buttonTheme'],
        loaded = false;

    function _redirectToLink(url, isPublic = false) {
        let redirectUrl = isPublic ? url : `${ _uri_login }?redirect=${encodeURIComponent(url)}`;
        window.open(redirectUrl)
    }

    function _goLive(dataParams) {
        return _createBlueshiftRedirectUrl(dataParams)
    }

    function _runBacktest(dataParams) {
        return _createBlueshiftRedirectUrl(dataParams)
    }

    function _createBlueshiftRedirectUrl(dataParams) {
        let url = _root + _uri_research + '/strategies' + _addUrlParams(dataParams);
        return url
    }

    function _addUrlParams(urlParams, exemptionList = _fields_exemption_list) {
        let paramsString = '';
        let paramsArray = [];
        if (urlParams) {
            Object.keys(urlParams).forEach(function(key) {
                if (exemptionList.indexOf(key) !== -1) {
                    return
                }
                let currentKeyValue = encodeURIComponent(urlParams[key]);
                if (currentKeyValue && currentKeyValue !== 'undefined') {
                    var str = key + '=' + encodeURIComponent(urlParams[key]);
                    paramsArray.push(str)
                }
            });
            paramsString = '?' + paramsArray.join('&')
        }
        return paramsString
    }
    window.BlueshiftConnect = function(dataParams) {
        var url = null;
        let me = this;
        this.generateBlueshiftLink = function() {
            switch (dataParams.action) {
                case 'go-live':
                    url = _goLive(dataParams);
                    return;
                case 'backtest':
                    url = _runBacktest(dataParams);
                    return;
                case 'backtest-widget':
                    url = dataParams.link;
                    return;
                default:
                    alert('No action defined')
            }
        };
        this.link = function(target) {
            if (typeof(target) == "string") {
                target = $(target)
            }
            if (!target || typeof(target) != "object") {
                return
            }
            target.click(function(e) {
                debugger;
                e.preventDefault();
                $(this).blur();
                _redirectToLink(url);
                return false
            })
        };
        this.renderButton = function(target) {
            if (typeof(target) == "string") {
                target = $(target)
            }
            if (!target || typeof(target) != "object") {
                return
            }
            let logoImg = dataParams.buttonTheme === 'light' ? `${ _cdn_url }/blueshift-logo-white.svg` : `${ _cdn_url }/blueshift-logo-black.svg`;
            let buttonClass = `blueshift-${dataParams.action } button-${dataParams.buttonTheme } button-${dataParams.buttonSize }`;
            let buttonText = dataParams.action === 'go-live' ? 'Live Trade' : 'Backtest';
            let elementId = 'button-' + new Date().getTime().toString();
            let buttonTemplete = `<iframe id=${ elementId } frameborder="0" allowfullscreen="true" style="width: 150px; height: 70px;"></iframe>`;
            target.html(buttonTemplete);
            me.link(target);
            document.querySelector('#' + elementId).contentDocument.write(`<html><head><meta content="width=device-width, initial-scale=1" name="viewport" /><link rel="stylesheet" href="${ _uri_css }"></head><body id="happy" style="margin: 0px"><div  class="${ buttonClass }"></script><img src="${ logoImg }"><span>${ buttonText }</span><div class="button-spon">Powered by Blueshift</div></div></body></html>`);
            document.querySelector('#' + elementId).contentWindow.document.body.onclick = function() {
                _redirectToLink(url)
            }
        };
        this.renderWidget = function(target) {
            if (typeof(target) == "string") {
                target = $(target)
            }
            if (!target || typeof(target) != "object") {
                return
            }
            let uri = obtainBacktestUrlFromPublicUrl(url);
            sendRequest(uri, 'GET', function(responseData) {
                responseData = JSON.parse(responseData);
                let totalReturn = Math.round(responseData.returns * 100, 2);
                let sharpRatio = parseInt(responseData.sharpe * 100) / 100;
                let drawdown = responseData.drawdown ? `${(responseData.drawdown*100).toFixed(2)} %` : '-';
                let elementId = 'widget-' + new Date().getTime().toString();
                let windowWidth = $(window).width();
                let windowHeight = '380px';
                if (windowWidth > 600) {
                    windowWidth = '430px'
                } else {
                    windowWidth = '100%';
                    windowHeight = '420px'
                }
                let widgetTemplate = `<iframe id=${ elementId } frameborder="0" scrolling="no" style="width: ${ windowWidth }; height: ${ windowHeight }"></iframe>`;
                target.html(widgetTemplate);
                let widgetTemplateContent = `<html><head><link rel="stylesheet" href="${ _uri_css }"></head><body style="margin:0px"><div class="blueshift-connect-widget-wrapper"><div class="blueshift-connect-widget-header"><div class="main-ins"><p class="blueshift-connect-details-font">${ totalReturn }%</p><p class="blueshift-connect-caption-font">Total Returns</p></div><div class="main-ins"><p class="blueshift-connect-details-font blueshift-connect-align-center">${ sharpRatio }</p><p class="blueshift-connect-caption-font blueshift-connect-align-center">Sharpe Ratio</p></div><div class="main-ins"><p class="blueshift-connect-details-font blueshift-connect-align-center ">${ drawdown }</p><p class="blueshift-connect-caption-font blueshift-connect-align-center ">Drawdown</p></div><div class="main-ins blueshift-connect-align-right"><img src="${ _cdn_url }/expand.svg"></div></div><div class="blueshift-connect-widget-image"><img src="${responseData.backtestImage }"></div><div class="blueshift-connect-widget-bottom"><div class="blueshift-connect-main-ins-bottom"><div class="square blueshift-connect-benchmark"></div><div class="blueshift-connect-caption-font">Benchmark</div></div><div class="blueshift-connect-main-ins-bottom"><div class="square strategy"></div><div class="blueshift-connect-caption-font">Portfolio Value</div></div><div class="blueshift-connect-main-ins-bottom"><div class="blueshift-connect-caption-font blueshift-connect-power-bs"><span class="pow-blueshift">Powered by</span><img src="${ _cdn_url }/../blueshift-logo.svg" alt="Blueshift Logo" class="blueshift-connect-blueshift-icon"></div></div></div></body></html>`;
                document.querySelector('#' + elementId).contentDocument.write(widgetTemplateContent);
                document.querySelector('#' + elementId).contentWindow.document.body.onclick = function() {
                    _redirectToLink(url, true)
                }
            })
        }
    };

    function obtainBacktestUrlFromPublicUrl(publicUrl) {
        try {
            let pathNameList = new URL(publicUrl).pathname.split('/');
            let backtestHash = pathNameList[pathNameList.length - 1];
            return `${ _root_backend }/research/api/share/${ backtestHash }`
        } catch (err) {
            console.log(err);
            return
        }
    }

    function sendRequest(url, method, cb, data) {
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                cb && cb(xhr.response)
            }
        };
        xhr.withCredentials = true;
        xhr.open(method, url, true);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(data))
        } else {
            xhr.send(null)
        }
    }

    function convertDataButtons() {
        var elems = $("*[data-blueshift]");
        elems.each(function(i, e) {
            e = $(e);
            if (e.data("blueshift-converted")) {
                return
            }
            e.data("blueshift-converted", 1);
            var params = {};
            for (var n = 0; n < _fields.length; n += 1) {
                params[_fields[n]] = e.data(_fields[n])
            }
            blueshift = new BlueshiftConnect(params);
            blueshift.generateBlueshiftLink();
            console.log('base obj', blueshift.url);
            if (e.prop("tagName").toUpperCase() == "BLUESHIFT-CONNECT-BUTTON") {
                blueshift.renderButton(e);
                blueshift.link(e)
            }
            if (e.prop("tagName").toUpperCase() == "BLUESHIFT-WIDGET") {
                blueshift.renderWidget(e);
                blueshift.link(e)
            }
        })
    }

    function initBlueshiftConnect(jq) {
        $ = jq;
        $(document).ready(function() {
            convertDataButtons();
            $(document).bind("DOMNodeInserted", function(e) {
                if ($(e.target).data("blueshift")) {
                    convertDataButtons()
                }
            })
        });
        loaded = true
    }
    var load_jq = true;
    if (window.hasOwnProperty("jQuery") && jQuery.hasOwnProperty("fn") && jQuery.fn.hasOwnProperty("jquery")) {
        var v = parseFloat(jQuery.fn.jquery);
        if (!isNaN(v) && v >= 1.6) {
            load_jq = false;
            initBlueshiftConnect(jQuery)
        }
    }
    if (load_jq) {
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
        var head = document.getElementsByTagName("head")[0],
            done = false;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initBlueshiftConnect(jQuery);
                script.onload = script.onreadystatechange = null;
                head.removeChild(script)
            }
        };
        head.appendChild(script)
    }
})();
