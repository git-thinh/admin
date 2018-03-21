var _cacheSendUI = new Array;
var _cacheSendAPI = new Array;
var _cacheSendAPI = new Array;
var _opend = false;
var _socket = null;

var window = self;

/* SPEECH */

importScripts('speakGenerator.js');

generateSpeech('hello', null)

////var ___const_Split_Sentence = ['.', ',', '(', ')', 'when', 'that'];
////var ___playRepeat = true;
////var ___playAll = true;
////var ___isSpeaking = false;
////var ___arraySpeak = new Array;
////var ___setTimeout = null;
////var ___speechText = new SpeechSynthesisUtterance();
////___speechText.lang = 'en-US';
////___speechText.rate = 1.0;

////function ___speakDo() {
////    ___isSpeaking = true;
////    var _text = ___arraySpeak[0];
////    ___arraySpeak.splice(0, 1);
////    console.log(_text);
////    ___speechText.text = _text;
////    ___speechText.onend = function () {
////        if (___arraySpeak.length == 0) {
////            ___isSpeaking = false;
////            clearTimeout(___setTimeout);
////            ___setTimeout = null;
////            ___speakComplete();
////        } else {
////            clearTimeout(___setTimeout);
////            ___setTimeout = setTimeout(___speakDo, 1000);
////        }
////    };
////    speechSynthesis.speak(___speechText);
////}

self.addEventListener('message', function (e) {
    var data = e.data;
    console.log(e);

    //_cacheSendAPI.push(data);
}, false);

/* TIMER */

setInterval(function () {
    if (_cacheSendUI.length > 0) {
        var data = _cacheSendUI[0];
        _cacheSendUI.splice(0, 1);
        self.postMessage(data);
    }
}, 1000);

setInterval(function () {
    if (_opend && _cacheSendAPI.length > 0) {
        var data = _cacheSendAPI[0];
        _cacheSendAPI.splice(0, 1);
        _socket.send(data);
    }
}, 1000);

/* SOCKET */
////function _socket_Init() {
////    _socket = new WebSocket('ws://localhost:8889');
////    _socket.onmessage = function (e) {
////        _cacheSendUI.push(JSON.parse(e.data));
////    };
////    _socket.onopen = function () {
////        _opend = true;
////        self.postMessage({ action: 'API_OPEN' });
////    };
////    _socket.onclose = function () {
////        _opend = false;
////        self.postMessage({ action: 'API_CLOSE' });
////    }
////}
////_socket_Init();
////setInterval(function () {
////    if (!_opend) {
////        //console.log('REOPEN SOCKET .....', new Date().toString());
////        _socket_Init();
////    }
////}, 5000);
