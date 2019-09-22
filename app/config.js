var fs = require("fs");
const envFile = require("path").join(__dirname, "env.json");
let env = {};
if (process.env.NODE_ENV == "debug" && fs.existsSync(envFile)) {
	let envData = fs.readFileSync(envFile, "utf-8");
	env = JSON.parse(envData);
	Object.keys(env).forEach(key => (process.env[key] = env[key]));
} else {
	// console.log(process.env);
}

module.exports = {
	debug: process.env.NODE_ENV == "debug",
	fcmKey: process.env.FCM_KEY,
	db: process.env.MONGOLAB_URI,
	tokenSecret: process.env.TOKEN_SECRET
};
