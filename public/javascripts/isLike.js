isLike = function(list,id,tweetClass){
  var likeList = list.split(",")
  var isLike = likeList.indexOf(id)

  var colName = document.getElementById(tweetClass);
  if (isLike == -1){
    colName.style.color = "black";
  }else{
    colName.style.color = "red";
  }
}

whoLike = function(like,table_id,table_name){
  var likeList = like.split(",")
  var idList = table_id.split(",")
  var nameList = table_name.split(",")
  var res = "";
  for (var i = 0; i < likeList.length; i++) {
    if (idList.indexOf(likeList[i]) != -1){
      res += nameList[idList.indexOf(likeList[i])] + " ,";
    }
  }
  alert(res + "\nがいいねといっています");
}
