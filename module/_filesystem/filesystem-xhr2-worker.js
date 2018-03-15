self.requestFileSystemSync = self.webkitRequestFileSystemSync || self.requestFileSystemSync;

function makeRequest(url) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // Note: synchronous
        xhr.responseType = 'arraybuffer';
        xhr.send();
        return xhr.response;
    } catch (e) {
        return "XHR Error " + e.toString();
    }
}

function onError(e) {
    postMessage('ERROR: ' + e.toString());
}

onmessage = function (e) {
    var data = e.data;

    // Make sure we have the right parameters.
    if (!data.fileName || !data.url || !data.type) {
        return;
    }

    try {
        //var fs = requestFileSystemSync(TEMPORARY, 1024 * 1024 /*1MB*/);
        var fs = requestFileSystemSync('C:\_data', 1024 * 1024 /*1MB*/);

        postMessage('Got file system.');

        var fileEntry = fs.root.getFile(data.fileName, { create: true });

        postMessage('Got file entry.');

        var arrayBuffer = makeRequest(data.url);
        var blob = new Blob([new Uint8Array(arrayBuffer)], { type: data.type });

        try {
            postMessage('Begin writing');
            fileEntry.createWriter().write(blob);
            postMessage('Writing complete');
            postMessage(fileEntry.toURL());
        } catch (e) {
            onError(e);
        }

    } catch (e) {
        onError(e);
    }
};