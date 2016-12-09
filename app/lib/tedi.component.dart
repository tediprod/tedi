import 'dart:html';
import 'package:angular2/core.dart';

import 'package:tedi/services/game.service.dart';
import 'package:tedi/services/socket.service.dart';

import 'package:tedi/services/dep/player.service.dart';
import 'package:tedi/services/dep/event.service.dart';
import 'package:tedi/services/dep/card.service.dart';

import 'package:tedi/example/example.component.dart';

@Component(
    selector: "tedi",
    templateUrl: "tedi.component.html",
    styleUrls: const [
      "tedi.component.css"
    ],
    providers: const [
      SocketIoClient,
      GameService,
      PlayerService,
      EventService,
      CardService
    ],
    directives: const [
      ExampleComponent
    ])
class TediComponent {
  String hello = "Hello world !";

  SocketIoClient io = new SocketIoClient("http://localhost:8000");

  TediComponent() {
    io.onConnect(() {
      this.io.on('server test', (data) {
        print(data["test"]);
        this.io.emit('client test', {'test': "randomData"});
      });

      this.io.on('received client test', (data){
        print(data["test"]);
      });

      this.io.onDisconnect(() {
        this.hello = "disconnected";
        print("disconnected");
      });
    });
  }

  void getSockets(){
      this.io.emit('get all sockets');

      this.io.on('here they are', (data){
        window.console.log(data);
      });
  }
}
