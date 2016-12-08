import 'package:tedi/game.service.dart';
import 'package:tedi/gameplay/services/player.service.dart';

class Gameplay {
  GameService gameService;
  PlayerService playerService;

  Gameplay(this.gameService, this.playerService);
}