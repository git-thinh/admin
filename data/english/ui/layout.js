
// Get data demo
var ___data_Demo = '';
var request = new XMLHttpRequest();
request.open('GET', '/demo.txt', false);
request.send(null);
if (request.status === 200) ___data_Demo = request.responseText;
function ___tree_FormatArticle(text) {
    var htm = '<div class="dx-article-content">';
    var a = text.split("\r\n");
    htm += '<h2>' + a[0] + '</h2>';
    var s, ai, _code, _isCode = false;
    for (var i = 1; i < a.length; i++) {
        s = a[i];
        if (s.trim() == '') continue;

        if (s.indexOf('LINK:') == 0) {
            htm += '<em>' + s + '</em>';
            continue;
        }

        if (s.indexOf('Note:') == 0) {
            htm += '<aside>' + s + '</aside>';
            continue;
        }

        switch (s) {
            case '//#':
                _isCode = true;
                _code = '';
                break;
            case '//.':
                htm += '<pre>' + _code + '</pre>';
                _isCode = false;
                break;
            default:
                if (_isCode) {
                    _code += s + '\r\n';
                } else {
                    ai = s.split(' ');
                    if (ai.length < 15)
                        htm += '<h3>' + s + '</h3>';
                    else
                        htm += '<p>' + s + '</p>';
                }
                break;
        }
    }
    return htm + '</div>';
}
var ___data_HTML = ___tree_FormatArticle(___data_Demo);

$('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'top', size: 50, hidden: true, resizable: true, style: 'border:none;padding:0;', content: '' },
        {
            type: 'left', size: 350, resizable: true,
            style: 'border:none;border-right:1px solid #ccc;padding:0 3px 0 0;background: #fff;',
            content: '<details id="tree_data"><summary do="___tree_LoadItems|">Document</summary></details>',
            tabs: {
                active: 'tab_document',
                tabs: [
                    { id: 'tab_document', caption: '<i class="glyphicon glyphicon-folder-open"/> Document' },
                    { id: 'tab_search', caption: '<i class="glyphicon glyphicon-search"/> Search' },
                    { id: 'tab_bookmark_document', caption: '<i class="glyphicon glyphicon-star"/> Bookmark' },
                ],
                onClick: function (event) {
                },
                onClose: function (event) {
                }
            },
            toolbar: {
                style: 'border:none;border-right:1px solid #ccc;padding:3px 0 0 0;',
                items: [
                    {
                        type: 'html', id: 'text_search',
                        html: function (item) {
                            var html =
                              '<div style="padding: 3px 10px;">' +
                              ' Search:' +
                              '    <input size="20" placeholder="Input search" onchange="var el = w2ui.toolbar.set(\'item5\', { value: this.value });" ' +
                              '         style="padding: 3px; border-radius: 2px; border: 1px solid silver" value="' + (item.value || '') + '"/>' +
                              '</div>';
                            return html;
                        }
                    },
                    { type: 'spacer' },
                    { type: 'radio', id: 'item3', group: '1', caption: '', img: 'glyphicon glyphicon-plus', hint: 'Add', checked: true },
                    { type: 'radio', id: 'item4', group: '1', caption: '', icon: 'glyphicon glyphicon-pencil', hint: 'Edit' },
                    { type: 'radio', id: 'item5', group: '1', caption: '', icon: 'glyphicon glyphicon-trash', hint: 'Remove' },
                    { type: 'radio', id: 'item6', group: '1', caption: '', icon: 'glyphicon glyphicon-star', hint: 'Bookmark', onClick: function (event) { this.refresh(); } },
                ],
                onClick: function (event) {
                    //this.owner.content('main', event);
                }
            }
        },
        {
            type: 'main', overflow: 'hidden', content: '<div id="ui_main_id"><div class="ui_tab_item" for="tab_home">' + ___data_HTML + '</div></div>',
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
            },
            toolbar: {
                style: 'border:none;border-right:1px solid #ccc;padding:3px 0 0 0;',
                items: [
                    {
                        type: 'html', id: 'text_search',
                        html: function (item) {
                            var html =
                              '<div style="padding: 3px 10px;">' +
                              ' Search:' +
                              '    <input size="20" placeholder="Input search" onchange="var el = w2ui.toolbar.set(\'item5\', { value: this.value });" ' +
                              '         style="padding: 3px; border-radius: 2px; border: 1px solid silver" value="' + (item.value || '') + '"/>' +
                              '</div>';
                            return html;
                        }
                    },
                    { type: 'spacer' },
                    { type: 'radio', id: 'item3', group: '1', caption: '', img: 'glyphicon glyphicon-plus', hint: 'Add', checked: true },
                    { type: 'radio', id: 'item4', group: '1', caption: '', icon: 'glyphicon glyphicon-pencil', hint: 'Edit' },
                    { type: 'radio', id: 'item5', group: '1', caption: '', icon: 'glyphicon glyphicon-trash', hint: 'Remove' },
                    { type: 'radio', id: 'item6', group: '1', caption: '', icon: 'glyphicon glyphicon-star', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'break' },
                    { type: 'radio', id: 'btn_article_content_player_fast-backward', group: '1', caption: '', icon: 'glyphicon glyphicon-fast-backward', hint: 'Bookmark', onClick: function (event) { } },
                    { type: 'radio', id: 'btn_article_content_player_backward', group: '1', caption: '', icon: 'glyphicon glyphicon-backward', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'radio', id: 'btn_article_content_player_stop', group: '1', caption: '', icon: 'glyphicon glyphicon-stop', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'radio', id: 'btn_article_content_player_play', group: '1', caption: '', icon: 'glyphicon glyphicon-play', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'radio', id: 'btn_article_content_player_pause', group: '1', caption: '', icon: 'glyphicon glyphicon-pause', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'radio', id: 'btn_article_content_player_forward', group: '1', caption: '', icon: 'glyphicon glyphicon-forward', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'radio', id: 'btn_article_content_player_fast-forward', group: '1', caption: '', icon: 'glyphicon glyphicon-fast-forward', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'break' },
                    { type: 'radio', id: 'btn_article_content_player_down', group: '1', caption: '', icon: 'glyphicon glyphicon-volume-down', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'radio', id: 'btn_article_content_player_up', group: '1', caption: '', icon: 'glyphicon glyphicon-volume-up', hint: 'Bookmark', onClick: function (event) {; } },
                    { type: 'radio', id: 'btn_article_content_player_off', group: '1', caption: '', icon: 'glyphicon glyphicon-volume-off', hint: 'Bookmark', onClick: function (event) {; } },
                ],
                onClick: function (event) {
                    //this.owner.content('main', event);
                }
            }
        },
        {
            type: 'preview', size: '30%', resizable: true, hidden: false,
            style: 'border:none;padding:0;background: #fff;', content: '',
            tabs: {
                active: 'tab_bookmark_listen',
                tabs: [
                    { id: 'tab_bookmark_listen', caption: '<i class="glyphicon glyphicon-star"/> Listen' },
                    { id: 'tab_bookmark_read', caption: '<i class="glyphicon glyphicon-star"/> Read' },
                    { id: 'tab_bookmark_write', caption: '<i class="glyphicon glyphicon-star"/> Write' },
                    { id: 'tab_bookmark_grammar', caption: '<i class="glyphicon glyphicon-star"/> Grammar' },
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
        { type: 'bottom', size: 44, resizable: true, hidden: true, style: 'border:none;padding:0;', content: '' }
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