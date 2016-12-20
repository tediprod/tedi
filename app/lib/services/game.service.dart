import 'package:angular2/core.dart';

import 'package:tedi/services/deps/player.service.dart';
import 'package:tedi/services/deps/event.service.dart';
import 'package:tedi/services/deps/card.service.dart';

@Injectable()
/**
 * Service pour communiquer avec les composants du jeu
 */
class GameService {
  String _gameTest;
  PlayerService _playerService;
  EventService _eventService;
  CardService _cardService;
  var gameData;

  GameService(PlayerService this._playerService, EventService this._eventService, CardService this._cardService) {
    this._gameTest = "This is the game test";
  }

  void setgameData(Object data){
    gameData = data;
  }

  getgameData(){
    return gameData;
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