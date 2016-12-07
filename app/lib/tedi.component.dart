import 'package:angular2/core.dart';

import 'package:tedi/example/example.component.dart';

@Component(
  selector:"tedi",
  templateUrl:"tedi.component.html",
  styleUrls: const ["tedi.component.css"],
  directives: const [ExampleComponent]
)
class TediComponent {
  String hello = "Hello world !";
}