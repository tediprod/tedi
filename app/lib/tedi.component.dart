import 'dart:html';
import 'package:angular2/core.dart';

import 'package:tedi/chat/chat.component.dart';
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
      ExampleComponent,
      ChatComponent
    ])
class TediComponent {
  String hello = "Hello world !";

  SocketIoClient io;

  TediComponent(SocketIoClient this.io) {
    _init();
  }

  void _init() {
    this.io.on('serverTestData', (data) {
      window.console.warn('Testing server sending data :');
      print(data["test"]);
      this.io.emit('testData',
          {'test': "randomData", 'ralouf': 'la moulle', 'celine': 'yoyo'});
    });

    this.io.on('testDataReceived', (data) {
      window.console.warn('Testing server sending data :');
      print(data["test"]);
    });

    this.io.on('allSocketsSent', (data) {
      window.console.warn('Getting all open sockets :');
      window.console.log(data);
    });
  }

  void getSockets() {
    this.io.emit('getAllSockets');
  }
}
