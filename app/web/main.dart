import 'package:angular2/platform/browser.dart';
import 'package:tedi/tedi.component.dart';

import 'package:angular2/core.dart';
import 'package:http/browser_client.dart';

BrowserClient HttpClientBackendServiceFactory() => new BrowserClient();


// Bootstrap Angular App
void main() {

  bootstrap(TediComponent, const [
    const Provider(BrowserClient, useFactory: HttpClientBackendServiceFactory, deps: const [])
  ]);
}
