import 'package:angular2/core.dart';

@Injectable()
class EventService {
  String test;

  EventService() {
    this.test = "This is the event test";
  }

  String getTestString() {
    return this.test;
  }
}