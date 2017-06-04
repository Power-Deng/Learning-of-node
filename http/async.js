var c = 0;
function plus  (callback) {
	setTimeout(function(){
		c += 1;
		callback(c);
	},1000)
}
function print () {
	console.log(c);
}
plus(print);