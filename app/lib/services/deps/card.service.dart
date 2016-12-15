import 'package:angular2/core.dart';
import 'dart:html';
import 'dart:async';
import 'dart:convert';
import 'dart:math';

@Injectable()
class CardService {
  String test;
  Map allCards;

  List suspects;//Radomly choose suspects
  List weapons;//Randomly choose weapons
  List locations;//radomly choose locations

  CardService(){
    this.test = "This is the card test";
  }

  String getTestString(){
    return this.test;
  }

  Future preloadCards() async{
    allCards = await HttpRequest.getString("dataTest.json").then(onloaded);
  }

  Future getAllCard() async {
    if(allCards != null ){
      return allCards;
    }else{
      await preloadCards();
      return allCards;
    }
  }

  onloaded(String response) {
    Map list = JSON.decode(response);
    return list;
  }

  /// return a random list of suspects
  List getSuspects(){
    List suspects = randomPicker(allCards["suspects"], 3);
    return suspects;
  }
  /// return a random list of locations
  List getLocations(){
    List locations = randomPicker(allCards["locations"], 3);
    return locations;
  }
  /// return a random list of weapons
  List getWeapons(){
    List weapons = randomPicker(allCards["weapons"], 3);
    return weapons;
  }


  /// return a List of n elements radomly choose
  /// in the table(list)
  /// 
  /// exemple.
  ///   
  ///   List randomPicker([1,2,3,4,5,6,7] , 4 );
  ///   may return [1,6,2,4]
  /// 
  /// return the given list if the second argument is greater than the list length
  List randomPicker(List tab, int number){
    if(number < tab.length){
      Random rng = new Random();
      List tempList = [];
      for(var i = 0; i < number; i++){
        var index = rng.nextInt(tab.length);
        tempList.add(tab[index]);
        tab.removeAt(index);
      }
      return tempList;
    }else{
      return tab;
    }
  }

}