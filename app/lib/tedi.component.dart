import 'package:angular2/core.dart';

import 'package:tedi/game.service.dart';
import 'package:tedi/example/example.component.dart';
import 'package:tedi/services/player.service.dart';
import 'package:tedi/services/event.service.dart';
import 'package:tedi/services/card.service.dart';
import 'package:tedi/socket.service.dart';

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
      this.hello = "connected";
      print("hello : " + this.hello);

      io.onDisconnect((){
        this.hello = "disconnected";
        print("disconnected");
      });
    });
  }
}
