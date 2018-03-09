var mongoose = require('mongoose');
/*add you connection somewhere here*/
mongoose.connect('mongodb://localhost/okay', {promiseLibrary: global.Promise});

