import 'dart:html';
import 'package:angular2/core.dart';
import 'package:tedi/services/socket.service.dart';

import 'dart:convert';

@Component(
    selector: 'connection',
    templateUrl: "connection.component.html",
    styleUrls: const ["connection.style.css"])
class ConnectionComponent implements OnInit {
  SocketIoClient io;
  String username;
  String roomname;

  ConnectionComponent(@Inject(SocketIoClient) this.io);

  void ngOnInit() {
    io.on("connectionSuccessful", (data) => window.console.log(data));
  }

  void selectRoom(username, roomname) {
    print("username : " + username);
    print("roomname : " + roomname);

    io.emit("initRoom", {"username": username, "roomname": roomname});
  }
}
