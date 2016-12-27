import 'dart:html';
import 'package:angular2/core.dart';
import 'package:tedi/services/socket.service.dart';

@Component(
    selector: 'game-list',
    templateUrl: "./gameList.component.html",
    styleUrls: const ['./gameList.style.css'])
class GameListComponent implements OnInit {
  SocketIoClient _io;
  NgZone _zone;
  List<String> rooms;
  bool noRooms;

  GameListComponent(@Inject(SocketIoClient) this._io, NgZone this._zone) {
    _io.emit("askForGameList");

    _io.on("gameList", (data) {
      _zone.run(() {
        rooms = data["rooms"];
        if (rooms.length > 0) {
          noRooms = false;
        } else {
          noRooms = true;
        }
      });
      window.console.log(rooms);
    });
  }

  void ngOnInit() {}

  void refresh() {
    _io.emit("askForGameList");
  }

  void joinRoom(String roomname){
    _io.emit("initRoom", {"username": "tiennou", "roomname": roomname});
  }
}
