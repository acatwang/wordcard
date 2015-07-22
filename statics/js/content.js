//ToDo: add description on content.js

if (!window.WordApp){
  WordApp = {}
}

WordApp.Selector = {};
WordApp.Selector.getSelected = function(){
  var selectObj = '';
  if(window.getSelection){
    selectObj = window.getSelection();
  }
  else if(document.getSelection) {
    selectObj =document.getSelection();
  }
  else if(document.selection){
    selectObj = document.selection.createRange().text;
  }
  return selectObj.toString();
}

function define(voc){
  var DICT_API ="https://wordcard.herokuapp.com/api/v1/words/wnlookup.json?word=";
  var definition = {};
  var promise = $.ajax({
                  url: DICT_API+voc,
                  method: "GET"
                })
  return promise

}

function selectWords(event) {
  var selected = WordApp.Selector.getSelected();
  var definition = [];

  if(/[a-zA-Z]/.test(selected)){
    console.log(selected);
    define(selected).success(function(responce){
        console.log(responce);
        definition = responce;
    });
  };


  console.log($(event.target));
}

$(document).ready(
    $(window).dblclick(selectWords)
)