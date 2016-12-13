import 'dart:html';
import 'package:angular2/core.dart';
import 'dart:async';
import 'dart:convert';

import 'package:http/browser_client.dart';
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
      "tedi.style.css"
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
class TediComponent implements OnInit {
  SocketIoClient io;
  String pseudo = "ptitim";
  String partyName;
  NgZone zone;
  Map listEnquete;
  List suspects;
  List locations;
  List weapons;
  // BrowserClient _http;

  TediComponent(SocketIoClient this.io, NgZone this.zone) {
    getList();
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

    this.io.on('mytest', (data) {
      // this.zone.run(() => partyName = data["truc"] );
      // print(partyName);
    });
    this.io.on('allSocketsSent', (data) {
      window.console.warn('Getting all open sockets :');
      window.console.log(data);
    });
  }

  void getSockets() {
    this.io.emit('getAllSockets');
  }

  Future getList() async {
    // var test = _http.get("localhost:8080/dataTest.json");
    HttpRequest.getString("dataTest.json").then(onloaded);

    // print(data);
  }

  onloaded(String response) {
    listEnquete = JSON.decode(response);
    // print(listEnquete);
    partyName = listEnquete["suspects"][0]["name"];
    print("party :");
    print(partyName);
    suspects = listEnquete["suspects"];
    locations = listEnquete["locations"];
    weapons = listEnquete["weapons"];
  }
}
