$('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'top', size: 50, resizable: true, style: 'border:none;padding:0;', content: '' },
        {
            type: 'left', size: 200, resizable: true, style: 'border:none;padding:0 0 0 3px;',
            content: '<details id="tree_data"><summary do="___tree_LoadRoot">English</summary></details>'
        },
        { type: 'main', style: 'border:none;padding:0;', content: '' },
        { type: 'preview', size: '50%', resizable: true, hidden: false, style: 'border:none;padding:0;', content: '' },
        { type: 'right', size: 200, resizable: true, hidden: false, style: 'border:none;padding:0;', content: '' },
        { type: 'bottom', size: 50, resizable: true, hidden: false, style: 'border:none;padding:0;', content: '' }
    ]
});

//$('#layout #tree_data summary, #layout #tree_data p').unbind('click');
//$('#layout #tree_data summary, #layout #tree_data p').bind('click', function () {
//    var _id = $(this).attr('id');
//    var text = $(this).text();
//    var id = api.GUID();
//    $('<p id="' + id + '" class="loading" />').appendTo($(this).parent());
//    api.send({ id: _id, data: { ext: 'txt', folder: text, root: '' }, action: 'LOAD_SUB_DIR_FILE', callback: 'layout_Callback_LoadSubTree', selector: '#' + id });
//});

function ___tree_LoadRoot(ele, eventName) {
    console.log(eventName, ele);
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
                root: ''
            }
        };
        var query_id = api.send(m);
    }
}

function ___tree_LoadSub(ele) {
    console.log(ele);
    //var _text = ele.innerHTML;
    //var _id = '';
    //if (ele.hasAttribute('id')) _id = ele.getAttribute('id');
    //var id = api.GUID();
    //var p = document.createElement('P');
    //p.id = id;
    //p.className = 'loading';
    //ele.parentElement.appendChild(p);
    //api.send({ id: _id, data: { ext: 'txt', folder: _text, root: '' }, action: 'LOAD_SUB_DIR_FILE', callback: '___tree_BindResultQuery', selector: '#' + id });
}

function ___tree_BindResultQuery(result) {
    console.log('___tree_BindResultQuery', result);
    var _config = result['config'];
    var _result = result['result'];
    var _ok = result['ok'];
    if (_ok == true && _result != true && _config != null)
    {
        var $loading = $('#' + _config['loading_id']);
        if ($loading)
            $loading.remove();

        var _forID = _config['for_id'];
        var ele = $('[for="' + _forID + '"]');
        if (ele != null) {
            var files = _result['files'];
            var dirs = _result['dirs'];

            var s = '';
            dirs.forEach(function (it) {
                if (it.count > 0)
                    s += '<details><summary do="___tree_LoadSub">' + it.name + '(' + it.count + ')' + '</summary></details>';
                else
                    s += '<details><summary>' + it.name + '(' + it.count + ')' + '</summary></details>';
            });
            files.forEach(function (it) {
                s += '<p>' + it + '</p>';
            });

            ele.parent().append(s);
            sessionStorage[_forID] = 'opened';
        }
    }
}