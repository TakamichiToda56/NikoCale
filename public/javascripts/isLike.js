isLike = function(list,id,tweetClass){
  likeList = list.split(",")
  var isLike = likeList.indexOf(id)

  var colName = document.getElementById(tweetClass);
  if (isLike == -1){
    colName.style.color = "black";
  }else{
    colName.style.color = "red";
  }
}
