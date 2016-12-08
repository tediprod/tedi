import 'package:angular2/core.dart';

import 'package:tedi/game.service.dart';
import 'package:tedi/example/example.component.dart';
import 'package:tedi/gameplay/services/player.service.dart';
import 'package:tedi/gameplay/services/event.service.dart';
import 'package:tedi/gameplay/services/card.service.dart';

@Component(
  selector:"tedi",
  templateUrl:"tedi.component.html",
  styleUrls: const ["tedi.component.css"],
  providers: const [
    GameService,
    PlayerService,
    EventService,
    CardService
  ],
  directives: const [ExampleComponent]
)
class TediComponent {
  String hello = "Hello world !";
  GameService gameService;

  TediComponent(GameService gameService);
}