import 'dart:async';
import 'package:angular2/core.dart';

import 'package:tedi/chat/message.dart';
import 'package:tedi/services/socket.service.dart';

@Component(
    selector: 'chat',
    templateUrl: 'chat.component.html',
    styleUrls: const ['chat.style.css'])
class ChatComponent implements OnInit {
  List<Message> messages = [];
  SocketIoClient io;
  NgZone zone;
  Timer timer;
  String pseudo;

  ChatComponent(@Inject(SocketIoClient) this.io, NgZone this.zone);

  void ngOnInit() {
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
      if(timer != null) timer.cancel();
    });
    io.on('initClient', (data)=> zone.run(() => pseudo = data['pseudo']) ); 

    io.on('playerJoin', (data) => zone.run(() => this.messages.add(new Message.system("i_PLAYERJOINED", data['user']))));

    io.on('playerLeft', (data) => zone.run(() => this.messages.add(new Message.system("i_PLAYERLEFT", data['user']))));
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
