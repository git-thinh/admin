function loading_Hide() {
    var l = document.getElementById('loading');
    if (l != null)
        l.style.display = 'none';
}

function loading_Show() {
    var l = document.getElementById('loading');
    if (l != null)
        l.style.display = 'block';
}

function app_Init() {

    var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top', size: 50, resizable: true, style: pstyle, content: 'top' },
            { type: 'left', size: 200, resizable: true, style: pstyle, content: 'left' },
            { type: 'main', style: pstyle, content: 'main' },
            { type: 'preview', size: '50%', resizable: true, hidden: false, style: pstyle, content: 'preview' },
            { type: 'right', size: 200, resizable: true, hidden: false, style: pstyle, content: 'right' },
            { type: 'bottom', size: 50, resizable: true, hidden: false, style: pstyle, content: 'bottom' }
        ]
    });

    loading_Hide();
}