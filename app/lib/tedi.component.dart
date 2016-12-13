import 'package:angular2/core.dart';
import 'package:angular2/router.dart';

import 'package:tedi/board/board.component.dart';

@Component(
  selector:'tedi',
  templateUrl: "tedi.component.html",
  styleUrls: const ["tedi.style.css"],
  directives: const [ROUTER_DIRECTIVES],
  providers: const [ROUTER_PROVIDERS]
)
@RouteConfig( const [
  const Route(path: '/smm', name:'Game', component: BoardComponent)  
])
class TediComponent {
  
}
