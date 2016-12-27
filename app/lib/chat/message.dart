/**
 * The basic class of chat messages.
 * 
 * Two constructors :
 *  
 * - Message(author, body) for users
 * - Message.system(messageId) for system messages.
 * 
 * messageId is the String id of the message as found in SYSTEM_MESSAGES.
 */
class Message {
  // i - info
  // w - warn
  // e - error
  static const Map<String, String> SYSTEM_MESSAGES = const {
    "i_CONNECT": "Welcome ${AUTHOR} !",
    "i_DISCONNECT": "${AUTHOR} disconnected !",
    "i_PLAYERLEFT": "${AUTHOR} has left the game.",
    "i_PLAYERJOINED": "${AUTHOR} has joined the game.",
    "e_ERROR": "An error occured while sending your message.",
  };

  static const String AUTHOR = "%author%";

  String author;
  String body;

  Message(this.author, this.body);

  Message.system(String messageId, [String user]) {
    author = "SYSTEM";
    body = sysMessageBuilder(messageId, user);
  }

  String sysMessageBuilder(String messageId, [String user]){
    String message = SYSTEM_MESSAGES[messageId];

    if(message.contains(AUTHOR)) {
      if(user == null){
        user = "User";
      }

      message = message.replaceAll(AUTHOR, user);
    }

    return message;
  }
}
