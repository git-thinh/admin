
var api = {
    validate: {
        check_IP4: function () { },
        check_IP6: function () { },
    },
    log: {
        m_modalID: 'log_View',
        Write: function (_title, _item) { },
        Toggle: function () {
            $('#' + api.log.m_modalID).modal("toggle");
        },
        Open: function () {
            $('#' + api.log.m_modalID).modal();
        },
    },
    user: {
        m_ID: null,
        m_login_ModalID: 'login-001',
        m_register_ModalID: 'registry-001',
        Login: function () { },
        Register: function () { },
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
    msg: {
        Process: function (_clientID, _data) {
            sessionStorage.id = _clientID;
            api.log.Write(_clientID, _data);
        },
        SendToClientID: function (_clientID, _data) {
        },
        SendToBroadCast: function (_data) {
        },
    },
    app: {
        js_css: {
            m_header: null,
            m_LIB: [
                '/lib/w2ui/w2ui.min.js',
                '/lib/w2ui/w2ui.min.css'
            ],
            Load: function (_arrayFiles, _callback) {
                api.app.js_css.m_header.load(_arrayFiles, _callback);
            }
        },
        Ready: function () {
            $('.___page_Ready').show();

            var pstyle = 'background-color:#000;border:none;padding:0;';
            $('#layout').w2layout({
                name: 'layout',
                panels: [
                    { type: 'top', size: 50, resizable: true, style: pstyle, content: '' },
                    { type: 'left', size: 200, resizable: true, style: pstyle, content: '' },
                    { type: 'main', style: pstyle, content: '' },
                    { type: 'preview', size: '50%', resizable: true, hidden: false, style: pstyle, content: '' },
                    { type: 'right', size: 200, resizable: true, hidden: false, style: pstyle, content: '' },
                    { type: 'bottom', size: 50, resizable: true, hidden: false, style: pstyle, content: '' }
                ]
            });
            api.loading.Hide();

            api.log.Write('Page Ready ....');
        },
        Init: function (_head, _log_Func) {
            api.app.js_css.m_header = _head;
            if (_log_Func != null)
                api.log.Write = _log_Func;

            // Listen for any messages from the service worker.
            navigator.serviceWorker.addEventListener('message', function (event) {
                api.msg.Process(event.data.client, event.data.message);
            });

            api.app.js_css.Load(api.app.js_css.m_LIB, function () {
                api.log.Write('Completed load library...', api.app.js_css.m_LIB);
                api.app.Ready();
            });

            //$('#registry-001').modal({ backdrop: 'static', keyboard: false });
            //$('#login-001').modal({ keyboard: false }); 
        }
    }
};
