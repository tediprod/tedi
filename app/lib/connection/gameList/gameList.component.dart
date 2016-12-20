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
    _io.on("receiveGameList", (data){
      rooms = data["rooms"];
      window.console.log(rooms);
    });
  }

  void ngOnInit() {
    _io.emit("askForGameList");
  }

  void getRooms() {
    _io.emit("askForGameList");
  }
}