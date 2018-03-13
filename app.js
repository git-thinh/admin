
var api = {
    loading_Hide: function () {
        var l = document.getElementById('loading');
        if (l != null)
            l.style.display = 'none';
    },
    loading_Show: function () {
        var l = document.getElementById('loading');
        if (l != null)
            l.style.display = 'block';
    },
    app_Init: function () {
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

        api.loading_Hide();

        //$('#registry-001').modal({ backdrop: 'static', keyboard: false });
        $('#login-001').modal({ keyboard: false });

    }
};
