import 'package:angular2/core.dart';
import 'dart:js';

@Injectable()
/**
 * An injectable service used to communicate with the API via websockets.
 */
class SocketIoClient {
  JsObject _io;

  SocketIoClient(){
    const URL = "http://localhost:8000";
    _io = context.callMethod('io', [URL]);
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

  emit(String eventName, [data]) {
    if(data != null){
      if(data is Map || data is Iterable){
        this._io.callMethod('emit', [eventName, new JsObject.jsify(data)]);
      } else {
        this._io.callMethod('emit', [eventName, data]);
      }
    } else {
      this._io.callMethod('emit', [eventName]);
    }
  }
}