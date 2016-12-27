import 'package:angular2/core.dart';
import 'package:tedi/services/game.service.dart';
import 'dart:async';

@Component(
  selector: "card",
  templateUrl: "card.template.html",
  styleUrls: const ["card.style.css"]
)

/**
* Class of card for the player
*/
class Card{
  GameService gameService;
  String text = "test";

  Card(@Inject(GameService) gameService){
    text = gameService.getPlayerService().getUsername();
  }

}