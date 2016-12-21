import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'package:tedi/board/board.component.dart';
import 'package:tedi/connection/connection.component.dart';
import 'package:tedi/services/socket.service.dart';

@Component(
    selector: 'tedi',
    templateUrl: "tedi.component.html",
    styleUrls: const ["tedi.style.css"],
    directives: const [ROUTER_DIRECTIVES],
    providers: const [SocketIoClient, ROUTER_PROVIDERS])
@RouteConfig(const [
  const Route(path: '/game', name: 'Game', component: BoardComponent),
  const Route(path: '/', name: 'Connection', component: ConnectionComponent, useAsDefault: true)
])
/**
 * Base component of the app.
 * 
 * Handles all routes. Most routes are websocket event-based, fired by the server.
 */
class TediComponent implements OnInit {
  SocketIoClient _io;
  Router _router;

  TediComponent(SocketIoClient this._io, Router this._router);

  void ngOnInit() {
    _io.on("navigateTo", (data) {
      _router.navigate([data["routeName"], {}]);
    });
  }
}
