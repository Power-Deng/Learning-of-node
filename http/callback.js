function learn(something){
	console.log(something);
}
function callback (callback, some) {
	some += "is cool!";
	callback(some);
}
callback(learn,"Node");
callback(function(hello){console.log(hello)},"He");