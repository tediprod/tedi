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
    "i_CONNECT": "Welcome !",
    "i_DISCONNECT": "Goodbye !",
    "e_ERROR": "An error occured while sending your message.",
  };

  String author;
  String body;

  Message(this.author, this.body);

  Message.system(messageId) {
    author = "SYSTEM";
    body = SYSTEM_MESSAGES[messageId];
  }
}
