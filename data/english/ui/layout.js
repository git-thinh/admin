

$('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'top', size: 50, hidden: true, resizable: true, style: 'border:none;padding:0;', content: '' },
        {
            type: 'left', size: 350, resizable: true,
            style: 'border:none;border-right:1px solid #ccc;padding:0;',
            content: '<details id="tree_data"><summary do="___tree_LoadItems|">Document</summary></details>',
            tabs: {
                active: 'tab_document',
                tabs: [
                    { id: 'tab_document', caption: '<i class="glyphicon glyphicon-folder-open"/> Document' },
                    { id: 'tab_search', caption: '<i class="glyphicon glyphicon-search"/> Search' },
                    { id: 'tab_bookmark_document', caption: '<i class="glyphicon glyphicon-star"/> Document' },
                ],
                onClick: function (event) { 
                },
                onClose: function (event) { 
                }
            }
        },
        {
            type: 'main', overflow: 'hidden', content: '<div id="ui_main_id"><div class="ui_tab_item" for="tab_home">tab_home</div></div>',
            style: 'border:none;padding:0;',
            tabs: {
                active: 'tab_home',
                tabs: [{ id: 'tab_home', caption: 'Home' }],
                onClick: function (event) {
                    //w2ui.layout.html('main', 'Active tab: ' + event.target);
                    var _tab_id = event.target;
                    $('.ui_tab_item').hide();
                    $('.ui_tab_item[for="' + _tab_id + '"]').show();
                },
                onClose: function (event) {
                    this.click('tab_home');
                }
            }
        },
        {
            type: 'preview', size: '30%', resizable: true, hidden: false, style: 'border:none;padding:0;', content: '',
            tabs: {
                active: 'tab_bookmark_document',
                tabs: [
                    { id: 'tab_bookmark_grammar', caption: '<i class="glyphicon glyphicon-star"/> Grammar' },
                    { id: 'tab_bookmark_listen', caption: '<i class="glyphicon glyphicon-star"/> Listen' },
                    { id: 'tab_bookmark_idom', caption: '<i class="glyphicon glyphicon-star"/> Idom' },
                    { id: 'tab_bookmark_word', caption: '<i class="glyphicon glyphicon-star"/> Words' },
                ],
                onClick: function (event) {
                },
                onClose: function (event) {
                }
            }
        },
        { type: 'right', size: 200, resizable: true, hidden: true, style: 'border:none;padding:0;', content: '' },
        { type: 'bottom', size: 44, resizable: true, hidden: false, style: 'border:none;padding:0;', content: '' }
    ]
});

function ___tree_LoadItems(ele, eventName, para) {
    if (para == null) para = '';
    console.log('ELEMENT: ', ele);
    console.log('EVENT: ', eventName);
    console.log('PARA: ', para);

    var _forID = '';
    if (ele.hasAttribute('for'))
        _forID = ele.getAttribute('for');

    if (_forID == '') {
        _forID = api.GUID();
        ele.setAttribute('for', _forID);
    }

    var _state = sessionStorage[_forID];
    switch (_state) {
        case 'opening':
            return;
        case 'opened':
            if (eventName == 'dblclick') {
                console.log('>>>>>>>>> refresh nodes ...');
            } else if (eventName == 'click') {

            }
            break;
        default:
            _state = 'opening';
            sessionStorage[_forID] = _state;
            break;
    }

    if (_state == 'opening') {
        var _loadingID = api.GUID();

        var p = document.createElement('P');
        p.id = _loadingID;
        p.className = 'loading';
        ele.parentElement.appendChild(p);

        var _text = ele.innerHTML;
        var m = {
            action: 'LOAD_SUB_DIR_FILE',
            callback: '___tree_BindResultQuery',
            config: {
                loading_id: _loadingID,
                for_id: _forID
            },
            data: {
                ext: 'txt',
                folder: _text,
                root: para
            }
        };
        var query_id = api.send(m);
    }
}

function ___tree_BindResultQuery(result) {
    console.log('___tree_BindResultQuery', result);
    var _config = result['config'];
    var _result = result['result'];
    var _ok = result['ok'];
    if (_ok == true && _result != true && _config != null) {
        var $loading = $('#' + _config['loading_id']);
        if ($loading)
            $loading.remove();

        var _forID = _config['for_id'];
        var ele = $('[for="' + _forID + '"]');
        if (ele != null) {
            var files = _result['files'];
            var dirs = _result['dirs'];
            var root = _result['root'];

            var s = '';
            dirs.forEach(function (it) {
                if (it.count > 0)
                    s += '<details><summary do="___tree_LoadItems|' + root + '\\' + it.name + '">' + it.name + '(' + it.count + ')' + '</summary></details>';
                else
                    s += '<details><summary>' + it.name + '(' + it.count + ')' + '</summary></details>';
            });
            files.forEach(function (it) {
                var id = api.GUID();
                it.id = id;
                it.root = root;
                sessionStorage[id] = JSON.stringify(it);
                s += '<p do="___tree_readFile|' + id + '">' + it.title + '</p>';
            });

            ele.parent().append(s);
            sessionStorage[_forID] = 'opened';
        }
    }
}

function ___tree_readFile(ele, eventName, para) {
    console.log('ELEMENT: ', ele);
    console.log('EVENT: ', eventName);
    console.log('PARA: ', para);
    if (para == null || para == '') return;

    var file = JSON.parse(sessionStorage[para]);
    console.log('PARA_FILE: ', file);
    var tab_id = file.id;

    var tabs = w2ui.layout_main_tabs;
    if (tabs.get(tab_id)) {
        tabs.select(tab_id);
        w2ui.layout.html('main', 'Content: ' + file.title);
    } else {
        var a = file.title.split(' ');
        var _tit = file.title;
        if (a.length > 4) _tit = a[0] + ' ' + a[1] + ' ' + a[2] + ' ' + a[3] + '...';

        tabs.add({ id: tab_id, caption: _tit, closable: true, tooltip: file.title });
        //w2ui.layout.html('main', 'Content: ' + file.title);
        $('.ui_tab_item').hide();
        $('#ui_main_id').append('<div class="ui_tab_item" for="' + tab_id + '">' + file.title + '</div>')
    }
}