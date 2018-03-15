var api = {
    utility: {
        GUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    },
    validate: {
        check_IP4: function () { },
        check_IP6: function () { },
    },
    log: {
        m_modalID: 'log_View',
        m_buttonID: 'log_Button',
        Write: function (_title, _item) { },
        Toggle: function () {
            $('#' + api.log.m_modalID).modal("toggle");
        },
        Open: function () {
            $('#' + api.log.m_modalID).modal();
        },
        ShowButton: function () {
            $('#' + api.log.m_buttonID).show();
        }
    },
    user: {
        m_ID: null,
        m_login_ModalID: 'login-001',
        m_register_ModalID: 'registry-001',
        Login: function () {

        },
        Register: function () {

        },
    },
    loading: {
        Hide: function () {
            var l = document.getElementById('loading');
            if (l != null)
                l.style.display = 'none';
        },
        Show: function () {
            var l = document.getElementById('loading');
            if (l != null)
                l.style.display = 'block';
        }
    },
    notification: {},
    cache: {
        m_ID: 'CACHE_STORE',
        Get: function (_key, _callback, _afterRemove) {
            if (_afterRemove == null) _afterRemove = false;
        },
        Set: function (_key, _value, _callback) { }
    },
    msg: {
        Process: function (_event) {
            var _clientID = _event.data.client;
            var _data = _event.data.message;
            //sessionStorage.id = _clientID;
            api.log.Write(_clientID, _data);
            if (_data != null && _data.length > 0 && _data[0] == '{' && _data[_data.length - 1] == '}') {
                var m = JSON.parse(_data);
                var _type = m.type, _name = m['name'], _rs = m['result'], _after_get_remove = m['after_get_remove'];
                switch (_type) {
                    case 'callback':
                        if (typeof window[_name] === 'function') {
                            api.cache.Get(_rs, function (_val) {
                                window[_name](_val);
                            }, _after_get_remove);
                        }
                        break;
                }
            }
        },
        SendToWorker: function (_msg) {
            // There isn't always a service worker to send a message to. This can happen
            // when the page is force reloaded.
            if (!navigator.serviceWorker.controller) // error: no controller';
                return;
            var _text = '';
            if (typeof _msg == 'string') _text = _msg;
            else _text = JSON.stringify(_msg);

            // Send the message to the service worker.
            navigator.serviceWorker.controller.postMessage(_text);
        },
        SendToClientID: function (_clientID, _data) {
        },
        SendToBroadCast: function (_data) {
        },
    },
    db: {
        m_open: false,
        m_writeFile: false,
        Query: function (_query) {
            if (typeof _query != 'object') return null;
            var id = api.utility.GUID();
            sessionStorage[id] = _callback;
            _query['query_id'] = id;
            api.msg.SendToWorker(_msg);
            return id;
        }
    },
    app: { 
        js_css: {
            m_header: null,
            m_LIB: [
                '/lib/w2ui/w2ui.min.js',
                '/lib/w2ui/w2ui.min.css'
            ],
            Load: function (_arrayFiles, _callback) {
                 
            },
            LoadScript: function(_url, _callback){
                if(!_url || !(typeof _url === 'string')){return};
                var script = document.createElement('script');
                //if this is IE8 and below, handle onload differently
                if(typeof document.attachEvent === "object"){
                    script.onreadystatechange = function(){
                        //once the script is loaded, run the callback
                        if (script.readyState === 'loaded') {
                            if (_callback){_callback()}
                        }
                    };  
                } else {
                    //this is not IE8 and below, so we can actually use onload
                    script.onload = function(){
                        //once the script is loaded, run the callback
                        if (_callback){_callback()}
                    }
                };
                //create the script and add it to the DOM
                script.src = _url;
                document.getElementsByTagName('head')[0].appendChild(script);
            },
            ImportSupportJSON: function(){
                /*! JSON for IE6/IE7 */
                if (!window.JSON) {
                    //document.write('<scr' + 'ipt src="http://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"><\/scr' + 'ipt>');
                    document.write('<scr' + 'ipt src="/lib/json3.min.js"><\/scr' + 'ipt>');
                } 
            }
        }
    },
    Ready: function () {
        //var pstyle = 'background-color:#000;border:none;padding:0;';
        //$('#layout').w2layout({
        //    name: 'layout',
        //    panels: [
        //        { type: 'top', size: 50, resizable: true, style: pstyle, content: '' },
        //        { type: 'left', size: 200, resizable: true, style: pstyle, content: '' },
        //        { type: 'main', style: pstyle, content: '' },
        //        { type: 'preview', size: '50%', resizable: true, hidden: false, style: pstyle, content: '' },
        //        { type: 'right', size: 200, resizable: true, hidden: false, style: pstyle, content: '' },
        //        { type: 'bottom', size: 50, resizable: true, hidden: false, style: pstyle, content: '' }
        //    ]
        //});
        api.loading.Hide();
        api.log.ShowButton();
        api.user.Login();
        api.log.Write('Page Ready ....');

    },
    Init: function (_head, _log_Func) {
        api.app.js_css.m_header = _head;
        if (_log_Func != null)
            api.log.Write = _log_Func;
            
        api.app.js_css.Load(api.app.js_css.m_LIB, function () {
            api.log.Write('Completed load library...', api.app.js_css.m_LIB);
            api.app.Ready();
        });

        //$('#registry-001').modal({ backdrop: 'static', keyboard: false });
        //$('#login-001').modal({ keyboard: false }); 
    }
}
};
