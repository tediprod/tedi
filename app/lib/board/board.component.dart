import 'dart:html';
import 'package:angular2/core.dart';
import 'dart:async';
import 'dart:convert';

import 'package:http/browser_client.dart';
import 'package:tedi/chat/chat.component.dart';
import 'package:tedi/services/game.service.dart';
import 'package:tedi/services/socket.service.dart';

import 'package:tedi/services/deps/player.service.dart';
import 'package:tedi/services/deps/event.service.dart';
import 'package:tedi/services/deps/card.service.dart';

import 'package:tedi/card/card.component.dart';

import 'package:tedi/example/example.component.dart';

@Component(
    selector: "board",
    templateUrl: "board.component.html",
    styleUrls: const [
      "board.style.css"
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
      ChatComponent,
      Card
    ])
class BoardComponent implements OnInit {
  SocketIoClient io;
  var room;
  GameService gameService;
  String pseudo = "ptitim";
  String partyName;
  NgZone zone;
  Map listEnquete;
  List suspects;
  List locations;
  List weapons;
  // BrowserClient _http;

  BoardComponent(SocketIoClient this.io, NgZone this.zone, GameService this.gameService) {
    // getClue();
  }

  void ngOnInit() {
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
    this.io.on('connected',(data){
      window.console.log("connected to room"+ data['room']);
      room = data['room'];
    });
  }

  void getSockets() {
    this.io.emit('getAllSockets');
  }



  // Future getClue() async{
  //   await gameService.getCardService().preloadCards();
  //   suspects = gameService.getCardService().getSuspects();
  //   print(suspects);
  //   locations = gameService.getCardService().getLocations();
  //   print(locations);
  //   weapons = gameService.getCardService().getWeapons();
  //   print(weapons);
  // }

}
