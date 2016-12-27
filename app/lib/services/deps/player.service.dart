import 'package:angular2/core.dart';

@Injectable()
class PlayerService {
  bool _authenticated = false;
  String _username;

  PlayerService();

  PlayerService authenticate(String username) {
    _username = username;
    _authenticated = true;

    return this;
  }

  String getUsername() {
    return _username;
  }

  bool isAuthenticated() {
    return _authenticated;
  }
}