var app = {
    m_event: null,
    m_eventPreviousElement: null,
    _INIT: function () {
        //app.m_event = new EventEmitter();
        ////m_event.addListener(api.APP_CHECK_ONLINE, sendCreateRequest);
        ////m_event.addListener('request-complete', displayResponse);

        //app.m_event.defineEvents(['click-foo', 'click-bar', 'click-baz']);

        //document.body.addEventListener('click', function (evt) {
        //    app.m_event.emitEvent('click-' + evt.target.get('id'), [evt.target]);
        //});

        //app.m_event.addListener(/click\-\w+/, function (target) {
        //    if (app.m_eventPreviousElement) {
        //        //target is element current
        //    }

        //    app.m_eventPreviousElement = target;
        //});

        /*/////////////////////////////////*/

        var hidden, visibilityState, visibilityChange; // check the visiblility of the page

        if (typeof document.hidden !== "undefined") {
            hidden = "hidden"; visibilityChange = "visibilitychange"; visibilityState = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden"; visibilityChange = "mozvisibilitychange"; visibilityState = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden"; visibilityChange = "msvisibilitychange"; visibilityState = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden"; visibilityChange = "webkitvisibilitychange"; visibilityState = "webkitVisibilityState";
        }

        if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
            // not supported
        } else {
            document.addEventListener(visibilityChange, function () {
                switch (document[visibilityState]) {
                    case "visible":
                        app.BROWSER_TAB_BLUR();
                        break;
                    case "hidden":
                        app.BROWSER_TAB_FOCUS();
                        break;
                }
            }, false);
        }

        /*/////////////////////////////////*/

        if (!('localStorage' in window)) {
            window.localStorage = {
                _data: {},
                setItem: function (id, val) { return this._data[id] = String(val); },
                getItem: function (id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined; },
                removeItem: function (id) { return delete this._data[id]; },
                clear: function () { return this._data = {}; }
            };
        }

        /*/////////////////////////////////*/

        //// this is just for demonstration purposes
        //var originalConsoleLog = console.log;
        //function consoleLogProxy() {
        //    originalConsoleLog.apply(console, arguments);
        //    //var htmlConsole = document.getElementById('htmlConsole');
        //    //if (htmlConsole) {
        //    //    var message = Array.prototype.slice.apply(arguments, []).join(' ');
        //    //    htmlConsole.innerHTML += '<li>' + message + '</li>';
        //    //}
        //}
        //console.log = consoleLogProxy;

        /*/////////////////////////////////*/
    },
    /***********************************/
    CALL_EVENT: function (event_name) {

    },
    EVENT_DB_GET: function () { },
    EVENT_DB_SET: function () { },
    /***********************************/
    BROWSER_TAB_BLUR: function () { console.log('onTabBlur...'); },
    BROWSER_TAB_FOCUS: function () { console.log('onTabFocus...'); },
    APP_SUPPORT: function (Modernizr) {
        var _support = document.body.parentElement.className.toString();
        if (_support.indexOf('websocket') == -1) return 'Websocket not support.';
        return '';
    },
    APP_CHECK_ONLINE: function () { },
    /***********************************/
    TEST_POUCHDB_OPEN: function () {
        // Destroy and recreate the database every time the page is reloaded
        new PouchDB('testdb').destroy().then(function () {
            var db = new PouchDB('testdb');

            console.log('Open DB done. Put your test here!');
            new PouchDB('testdb').destroy();

        }).catch(function (err) {
            console.log(err);
        });
    },
    /***********************************/
    /***********************************/
};

head.load(['/assets/js/pouchdb-6.4.3.min.js', '/assets/js/eventemitter.js', '/assets/js/fastclick.js'], function () {
    //        var _chk = app.APP_SUPPORT();
    //        if (_chk == '') {
    // app._INIT();
    //        } else {
    //            alert('App does not support features HTML5, CSS3: ' + _chk);
    //        }
    app.TEST_POUCHDB_OPEN();
});