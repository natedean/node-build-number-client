'use strict';

const fetch = require('node-fetch');
const exec = require('child_process').exec;
const fs = require('graceful-fs');

const majorMinorVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

console.log(process.env.BUILD_ENDPOINT);

fetch(process.env.BUILD_ENDPOINT)
	.then(res => res.json())
	.then((buildNumber) => {
		const fullVersionNumber = `${majorMinorVersion}.${buildNumber}`
		exec(`rm -rf dist && mkdir dist && webpack --env.prod --env.version ${fullVersionNumber} -p --progress`,
			(err, stdout, stderr) => {
				if (err) { console.log(err) }

				console.log(`stdout: ${stdout}`);
				console.log(`stderr: ${stderr}`)
			});
	});
