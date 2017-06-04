var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content': '我又w来啦~',
	'cid':348,

})

var options = {
	hostname:'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
		'Connection':'keep-alive',
		'Content-Length': postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=6decbfcf-d6b9-444d-b9b0-0bd8b0f42da2; imooc_isnew_ct=1486387072; mc_channel=banner; mc_marking=913bcde14fb30c231639f5f6e5e08975; PHPSESSID=me10uki7lrctsgsf99n20hp2q5; loginstate=1; apsid=Y3OTA1M2MwMDA1MmIxNzBkZDJiMGNjYzdmYjczYmUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTE5ODA0NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkbG13b3JkQDE2My5jb20AAAAAAAAAAAAAAAAAAAAAADlkNzkyOGRkMGUwMThmMTE1MmIzZDBkODI4N2ZlOWFlgUPzWIFD81g%3DOD; last_login_username=dlmword%40163.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1492246540,1492282567,1492316742,1492337485; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1492338443; IMCDNS=0; imooc_isnew=2; cvde=58f3434b92ec7-82',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/348',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'

	}
}


var req = http.request(options,function(res) {
	console.log('status:' + res.statusCode)
	console.log('headers:' + JSON.stringify(res.headers));

	res.on('data', function(chunk) {
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk);
	})

	res.on('end', function(){
		console.log('评论完毕！');
	})
	

})
req.on('error', function(e) {
		console.log('Error' +e.message);
	})

req.write(postData);
req.end();