import 'dart:html';
import 'package:angular2/core.dart';
import 'package:tedi/services/socket.service.dart';

@Component(
  selector: 'game-list',
  templateUrl: "./gameList.component.html",
  styleUrls: const ['./gameList.style.css']
)
class GameListComponent implements OnInit {
  SocketIoClient _io;
  List<String> rooms;

  GameListComponent(@Inject(SocketIoClient) this._io) {
    _io.emit("askForGameList");

    _io.on("gameList", (data){
      rooms = data["rooms"];
      window.console.log(rooms);
    });
  }

  void ngOnInit() {
  }

  void getRooms() {
    _io.emit("askForGameList");
  }
}