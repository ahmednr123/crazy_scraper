const dm = require('./dm.js')

if (!dm.handleExists("handle2"))
	dm.createHandle("handle2", ["attr1", "attr2"]);
else
	console.log("Handle already present");