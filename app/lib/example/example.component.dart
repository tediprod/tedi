/**
 * Pour future référence, voici un exemple rapide d'implémentation de SVG avec Angular2.
 * 
 * Quelques trucs à se souvenir :
 * 
 *    - Etant donnée la nature du SVG qui n'accepte que des balises spécifiques (comme <circle></circle>), on est obligés d'utiliser des directives d'attribut (e.g. selector:"[example]" au lieu de selector: "example" dans votre @Component, ce qui donnera <g example></g> au lieu de <example></example> dans votre HTML)
 * 
 *    - Angular a besoin de savoir s'il traite du HTML ou du SVG. Si votre template ne commence pas par une balise <svg></svg> (Angular la reconnait automatiquement), il doit être spécificié qu'il s'agit de SVG (e.g. <svg:circle></svg:circle> au lieu de <circle></circle>)
 *    
 *    - Les attributs du SVG buguent un peu sous Angular2 - ils ne peuvent pas être nativement bound. Un workaround consiste à les déclarer explicitement en utilisant [attr] (e.g. <circle [attr.r]="myRadius"></circle> au lieu de <circle r="myRadius"></circle> qui donnera une erreur)
 * 
 */

import 'package:angular2/core.dart';
import 'package:tedi/services/game.service.dart';

@Component(
  selector: '[example]',
  templateUrl: 'example.component.html',
  styleUrls: const ['example.style.css'],
  providers: const [GameService]
)
class ExampleComponent {
  String myRadius = "50";
  GameService gameService;

  String gameTest;
  String playerTest;
  String eventTest;
  String cardTest;

  ExampleComponent(GameService this.gameService) {
    this.gameTest = this.gameService.getGameTest();
    this.playerTest = this.gameService.getPlayerService().getPlayerTest();
    this.eventTest = this.gameService.getEventService().getTestString();
    this.cardTest = this.gameService.getCardService().getTestString();
  }
}