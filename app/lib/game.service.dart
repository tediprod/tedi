import 'package:angular2/core.dart';

import 'package:tedi/services/player.service.dart';
import 'package:tedi/services/event.service.dart';
import 'package:tedi/services/card.service.dart';

@Injectable()
class GameService {
  String _gameTest;
  PlayerService _playerService;
  EventService _eventService;
  CardService _cardService;

  GameService(PlayerService this._playerService, EventService this._eventService, CardService this._cardService) {
    this._gameTest = "This is the game test";
  }

  String getGameTest(){
    return this._gameTest;
  }

  PlayerService getPlayerService() {
    return this._playerService;
  }

  EventService getEventService() {
    return this._eventService;
  }

  CardService getCardService() {
    return this._cardService;
  }
}