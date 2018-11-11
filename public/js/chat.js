window.onload=function(){
    var socket = io.connect('http://localhost:3000');
	socket.emit("join",<%=user.username%>);
	socket.on("connect",function(){
	document.getElementById("chat").style.display="block";
	socket.on("announcement",function(mes){
		var li =document.createElement("li");
		    li.className="announcement";
		    li.innerHTML=mes;
		    document.getElementById("messages").append(li);
	});
  });

function addMessage(who ,text){
	var li=document.createElement("li");
	li.className ="message";
	li.innerHTML="<b>"+who+"</b>:"+text;
	document.getElementById("messages").appendChild(li);
	return li;
}

var input=document.getElementById("input");
document.getElementById("form").onsubmit =function(){
   var li =addMessage("me",input.value);
   socket.emit("text",input.value,function(date){
   	var p=document.createElement("span");//时间戳
   	p.innerHTML="&nbsp;&nbsp==>"+date;
   	p.style.color="#f2f2f2de w2 ww";
 li.append(p);
   });

	//因为是广播，所以重置这个框
	input.value="";
    input.focus();
    return false;
};
 


socket.on("text",addMessage);
}