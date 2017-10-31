var test = require('./index');
var milight = test.create({ip: "192.168.1.56"});

if (process.argv[2] === 'on')
milight.on({
	zone: 0, 
	brightness: process.argv[3] || 0,
	callback: (err, data) => {
		console.log('results: ', {err, data: [data[0]||0, data[1]||0, data[2]||0 ]});
		process.exit(err ? 1 : 0);
	}
});
else
milight.off({
	zone: 0,
	callback: (err, data) => {
		console.log('results : ', {err, data: [data[0]||0, data[1]||0, data[2]||0 ]});
		process.exit(err ? 1 : 0);
	}
});