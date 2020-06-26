$(document).ready(function(){
	// Really similar to java OOP concept
	var instance = new Vue({
		el : "#personal_info",
		data : {
			first_name : "Nong",
			last_name : "Hieu"
		},
		methods : {
			full_name : function(){
				return this.first_name + " " + this.last_name
			}
		}
	})    
})
