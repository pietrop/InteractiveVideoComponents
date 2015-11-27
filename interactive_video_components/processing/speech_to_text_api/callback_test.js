// so if I understood it right, with a callback, if you have a `function a` and a `function b` and you want to run `a` and then `b` with the response of `a`.
// but `a` might take some time to run.
// what you need to do is to pass `b` as a callback to `a` (which in practice is as the last parameter of `function a`) and then call `b` inside `function a`. and pass to `b` whatever is the parameter that you were originally waiting for from `a`
// a bit of a convoluted explanation, but is this right? (if it makes any sense)


// /////////////////////////////
function a(callback) {
	console.log('this is a'); 
	callback();  
}

function b() { 
	console.log('this is b'); 
}


a(b);
// /////////////////////////////


/////////////////////////////
function a(input, callback) {
	console.log('this is a '+input); 
	var result = input +" manipulated";

	callback(result);  
}

function b(inB) { 
	console.log('this is b '+inB); 
}


a("someinput",b);
/////////////////////////////

//mock function to make a request from api
function fetchFromApi(url,callback){
	//mocking that the api would take a bit to respond
	setTimeout(function(){
		console.log(url);
	 	console.log("mock response form API"); 
	 	var response = url+"response"
	 	callback(response);
	}, 3000);
}


//function that parses response of api
function parseAPIresponse(res){
	console.log("parse  "+res)
}




fetchFromApi("url of API",parseAPIresponse);


function getListOfRecordings(){

}


// function someAction(x, y, someCallback) { 
//     console.log("x: "+x);
//     console.log("y: "+y);
// 	return someCallback(x, y);
// }

// function calcProduct(x, y) {
//     return x * y;
// }

// function calcSum(x, y) {
//     return x + y;
// }

// function printout(something, somethingElse){
// 	var result =  "something " +something+"somethingElse "+somethingElse;
// 	return result;
// }
// // alerts 75, the product of 5 and 15
// // console.log(someAction(5, 15, printout));
// console.log(someAction(5, 15, printout));
// // alerts 20, the sum of 5 and 15
// // console.log(someAction(5, 15, printout));