import 'package:angular2/core.dart';

@Injectable()
class PlayerService {
  String playerTest;

  PlayerService() {
    this.playerTest = "This is the player test";
  }

  String getPlayerTest(){
    return this.playerTest;
  }
}