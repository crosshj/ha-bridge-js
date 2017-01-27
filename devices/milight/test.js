var test = require('./index');

if (process.argv[2] === 'on')
test.on('', 0, process.argv[3] || 0, (err, data) => {
	console.log('results: ', {err, data: [data[0]||0, data[1]||0, data[2]||0 ]});
	process.exit(err ? 1 : 0);
});
else
test.off('', 0, (err, data) => {
	console.log('results : ', {err, data: [data[0]||0, data[1]||0, data[2]||0 ]});
	process.exit(err ? 1 : 0);
});