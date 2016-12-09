import 'package:angular2/core.dart';

@Injectable()
class CardService {
  String test;

  CardService(){
    this.test = "This is the card test";
  }

  String getTestString(){
    return this.test;
  }
}