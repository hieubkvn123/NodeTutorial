$(document).ready(function(){
	var myObject = new Vue({
		el : "#intro",
		data : {
			message_1 : "This is my first Vue Task",
			message_2 : "Click button below to change message"
		}
	})

	var click_count = 0
	$("#button").click(function(){
		click_count ++ 
		console.log("Button clicked")

		if(click_count % 2 == 1){
			myObject.message_1 = "My name is Hieu Ahihi"
		}else{
			myObject.message_2 = "I am an A.I enthusiast"
		}
	})
})