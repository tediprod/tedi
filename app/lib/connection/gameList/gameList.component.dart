import 'dart:html';
import 'package:angular2/core.dart';
import 'package:tedi/services/socket.service.dart';
import 'package:tedi/connection/connection.component.dart';
import 'package:tedi/services/game.service.dart';

@Component(
    selector: 'game-list',
    templateUrl: "./gameList.component.html",
    styleUrls: const ['./gameList.style.css'],
    providers: const [ConnectionComponent]
    )

class GameListComponent implements OnInit {
  SocketIoClient _io;
  NgZone _zone;
  List<String> rooms;
  String _username;
  GameService _gameService;

  bool noRooms;

  GameListComponent(@Inject(SocketIoClient) this._io,@Inject(GameService) _gameService , NgZone this._zone) {
    _username = _gameService.getPlayerService().getUsername();
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
    _io.emit("initRoom", {"username": _username, "roomname": roomname});
  }
}
