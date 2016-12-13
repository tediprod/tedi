import 'dart:async';
import 'package:angular2/core.dart';

import 'package:tedi/chat/message.dart';
import 'package:tedi/services/socket.service.dart';

@Component(
    selector: 'chat',
    templateUrl: 'chat.component.html',
    styleUrls: const ['chat.component.css'])
class ChatComponent {
  List<Message> messages = [];
  SocketIoClient io;
  NgZone zone;
  Timer timer;

  ChatComponent(@Inject(SocketIoClient) this.io, NgZone this.zone) {
    _init();
  }

  void _init() {
    io.onConnect(() =>
        this.zone.run(() => messages.add(new Message.system("i_CONNECT"))));

    io.onDisconnect(() =>
        this.zone.run(() => messages.add(new Message.system("i_DISCONNECT"))));

    // Receive a chat message
    io.on("newChatMessage", (data) {
      Message message = new Message(data["author"], data["body"]);
      this.zone.run(() => this.messages.add(message));
    });

    // Successfully sending a message
    io.on("sendMessageSuccess", (data) {
      Message message = new Message(data["author"], data["body"]);
      this.zone.run(() => this.messages.add(message));
      timer.cancel();
    });
  }

  void sendMessage(author, body) {
    Map<String, String> message = {
      "author": author,
      "body": body
    };

    timer = new Timer(const Duration(seconds: 5), () {
      this.zone.run(() =>
            this.messages.add(new Message.system("e_ERROR")));
    });

    this.io.emit("newChatMessage", message);
  }
}
