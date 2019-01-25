const fs = require('fs');

let arr = new Array(20);
let buff = Buffer.from(arr);

fs.open('./testfile', 'a+', (err, fd) => {
	fs.read(fd, buff, 0, 5, 18, (err, bytes, buffer) => {
		console.log(buffer.toString('utf8'));
	})
})