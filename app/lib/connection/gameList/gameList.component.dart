import 'dart:html';
import 'package:angular2/core.dart';
import 'package:tedi/services/game.service.dart';
import 'package:tedi/services/socket.service.dart';
import 'package:tedi/services/game.service.dart';

@Component(
    selector: 'game-list',
    templateUrl: "./gameList.component.html",
    styleUrls: const ['./gameList.style.css'])
class GameListComponent {
  SocketIoClient _io;
  GameService _gameService;
  NgZone _zone;
  List<String> rooms;

  bool noRooms;

  GameListComponent(@Inject(SocketIoClient) this._io, NgZone this._zone, GameService this._gameService) {
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

  void refresh() {
    _io.emit("askForGameList");
  }

  void joinRoom(String roomname){
    String username = _gameService.getPlayerService().getUsername();
    _io.emit("initRoom", {"username": username, "roomname": roomname});
  }
}
