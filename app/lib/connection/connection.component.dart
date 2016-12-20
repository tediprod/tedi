import 'package:angular2/core.dart';
import 'package:tedi/connection/gameList/gameList.component.dart';
import 'package:tedi/services/socket.service.dart';

import 'dart:convert';

@Component(
    selector: 'connection',
    templateUrl: "connection.component.html",
    styleUrls: const ["connection.style.css"],
    directives: const [ GameListComponent ]
)
class ConnectionComponent implements OnInit {
  SocketIoClient _io;
  String username;
  String roomname;

  ConnectionComponent(@Inject(SocketIoClient) this._io);

  void ngOnInit() {
    
  }

  void selectRoom(username, roomname) {
    print("username : " + username);
    print("roomname : " + roomname);

    _io.emit("initRoom", {"username": username, "roomname": roomname});
  }


}
