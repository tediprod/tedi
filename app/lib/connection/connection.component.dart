import 'package:angular2/core.dart';
import 'package:tedi/connection/gameList/gameList.component.dart';
import 'package:tedi/services/game.service.dart';
import 'package:tedi/services/socket.service.dart';

@Component(
    selector: 'connection',
    templateUrl: "connection.component.html",
    styleUrls: const ["connection.style.css"],
    directives: const [ GameListComponent ]
)
class ConnectionComponent implements OnInit {
  SocketIoClient _io;
  GameService _gameService;
  bool authenticated;
  String username;
  String roomname;

  ConnectionComponent(@Inject(SocketIoClient) this._io, @Inject(GameService) this._gameService) {
    authenticated = _gameService.getPlayerService().isAuthenticated();
    username = _gameService.getPlayerService().getUsername();
  }

  void ngOnInit() {
    print("hello");
    _io.emit("leaveRoom");
  }

  void selectRoom(roomname) {
    print("doing roomy things");
    print("username : " + this.username);
    print("roomname : " + roomname);

    _io.emit("initRoom", {"username": this.username, "roomname": roomname});
  }

  void authenticate(String username) {
    authenticated = _gameService.getPlayerService().authenticate(username).isAuthenticated();
    this.username = _gameService.getPlayerService().getUsername();
    print(this.username);
  }

}
