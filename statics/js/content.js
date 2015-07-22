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

function selectWords(event) {
  var selected = WordApp.Selector.getSelected();
  if(/[a-zA-Z]/.test(selected)){
    console.log(selected);
  };
  console.log($(event.target));
}

$(document).ready(
    $(window).dblclick(selectWords)
)