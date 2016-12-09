import 'dart:js';

class SocketIoClient {
  JsObject _io;

  SocketIoClient(String url){
    _io = context.callMethod('io', [url]);
  }

  onConnect(callback()){
    this._io.callMethod('on', ['connect', callback]);
  }

  onDisconnect(callback()){
    this._io.callMethod('on', ['disconnect', callback]);
  }

  on(String eventName, callback(data)) {
    this._io.callMethod('on', [eventName, callback]);
  }

  emit(String eventName, [data]){
    if(data != null){
      if(data is Map || data is Iterable){
        this._io.callMethod('on', [eventName, new JsObject.jsify(data)]);
      } else {
        this._io.callMethod('on', [eventName, data]);
      }
    } else {
      this._io.callMethod('on', [eventName]);
    }
  }
}