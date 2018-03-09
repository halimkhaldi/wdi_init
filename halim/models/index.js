var mongoose = require('mongoose');
/*add you connection somewhere here*/
mongoose.connect('mongodb://localhost/halim', {promiseLibrary: global.Promise});

