$('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'top', size: 50, resizable: true, style: 'border:none;padding:0;', content: '' },
        {
            type: 'left', size: 200, resizable: true, style: 'border:none;padding:0 0 0 3px;',
            content: '<details id="tree_data"><summary>English</summary></details>'
        },
        { type: 'main', style: 'border:none;padding:0;', content: '' },
        { type: 'preview', size: '50%', resizable: true, hidden: false, style: 'border:none;padding:0;', content: '' },
        { type: 'right', size: 200, resizable: true, hidden: false, style: 'border:none;padding:0;', content: '' },
        { type: 'bottom', size: 50, resizable: true, hidden: false, style: 'border:none;padding:0;', content: '' }
    ]
});

$('#layout #tree_data summary, #layout #tree_data p').unbind('click');
$('#layout #tree_data summary, #layout #tree_data p').bind('click', function () {
    var id = $(this).attr('id');
    var text = $(this).text();
    var it =  $(this).get(0);
    var selector = api.GUID();
    it.className = selector;
    api.send({ id: id, data: { ext: 'txt', folder: text, root: '' }, action: 'LOAD_SUB_DIR_FILE', callback: 'layout_Callback_LoadSubTree', selector: '.' + selector });
});

function layout_Callback_LoadSubTree(msg) {
    console.log('layout_Callback_LoadSubTree', msg);
}