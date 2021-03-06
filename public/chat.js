﻿
		function send_message(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				}
			};
			var msg = encode(document.getElementById('msg').value);
			document.getElementById('msg').value = "";
			var usr = document.getElementById('usr').value;
			var chatroom_id = document.getElementById('chatroom_id').value;
			var d = new Date();
			var str = "msg=" + msg + "&usr=" + usr + "&d=" + d.toString() + "&chatroom_id=" + chatroom_id;
			xhttp.open("POST", "/snd", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(str);
		}

		function loadDoc() {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					formatChatbox(this.responseText);
				}
			};
			var chatroom_id = "chatroom_id=" + document.getElementById('chatroom_id').value;
			xhttp.open("POST", "/upd", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(chatroom_id); 
		}

		function formatChatbox(messages){
			var msgJSON = JSON.parse(messages);
			var txt = "";
			for(var row in msgJSON){
				if(msgJSON.hasOwnProperty(row)){
					txt += msgJSON[row].usr + ", " + msgJSON[row].d + " : " + decode(msgJSON[row].msg) + "<br>";
				}
			}
			document.getElementById("chatbox").innerHTML = txt;
		}

		function encode(msg){
			if(document.getElementById('key').value == "")
				return msg;
			var key = document.getElementById('key').value;
			var encoded_msg = "";
			var q = 0;
			for (var i = 0; i < msg.length; i++){
				encoded_msg += String.fromCharCode(msg.charCodeAt(i) + key.charCodeAt(q));
				q++;
				if(q >= key.length)
					q = 0;
			}

			return encoded_msg;
		}


		function decode(msg){
			var key = document.getElementById('key').value;
			var decoded_msg = "";
			var q = 0;
			for (var i = 0; i < msg.length; i++){
				decoded_msg += String.fromCharCode(msg.charCodeAt(i) - key.charCodeAt(q));
				q++;
				if(q >= key.length)
					q = 0;
			}

			return decoded_msg;
		}
					