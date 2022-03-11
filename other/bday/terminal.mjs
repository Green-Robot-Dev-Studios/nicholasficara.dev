
import { input, type } from "./util/io.js";
import { toggleFullscreen } from "./util/screens.js";
import { registerHandlers } from "./util/ui.mjs";

async function onLoad() {
	toggleFullscreen(true);
	run();
}

async function run() {
	const { power } = await import("./util/power.js");

	// Turns on the screen
	power();

	await type("****CBM BASIC V2****\n3152 BYTES FREE\nREADY.")

	let command = "\n  _    _ _   _____                  _                                         \n | |  | (_) |  __ \\                | |                                        \n | |__| |_  | |__) |_ _ _ __   __ _| |                                        \n |  __  | | |  ___\/ _` | \'_ \\ \/ _` | |                                        \n | |  | | | | |  | (_| | |_) | (_| |_|                                        \n |_|  |_|_| |_|   \\__,_| .__\/ \\__,_(_)_  _      _   _         _             _ \n | |  | |              | |        |  _ \\(_)    | | | |       | |           | |\n | |__| | __ _ _ __  _ |_| _   _  | |_) |_ _ __| |_| |__   __| | __ _ _   _| |\n |  __  |\/ _` | \'_ \\| \'_ \\| | | | |  _ <| | \'__| __| \'_ \\ \/ _` |\/ _` | | | | |\n | |  | | (_| | |_) | |_) | |_| | | |_) | | |  | |_| | | | (_| | (_| | |_| |_|\n |_|  |_|\\__,_| .__\/| .__\/ \\__, | |____\/|_|_|   \\__|_| |_|\\__,_|\\__,_|\\__, (_)\n              | |   | |     __\/ |                                      __\/ |  \n              |_|   |_|    |___\/                                      |___\/   \n";
	await type("> " + command);

	while (true) {
		await type("> Enter the secret code to gain access (hint: your age today): ".toUpperCase())
		let age = await input(true);
		if (age == 49) {
			break;
		}
		await type("> Input failed! Try again!")
	}


	await type("> Executing program...".toUpperCase())
	await type("> Password Accepted! You have unlocked your message.".toUpperCase())
	await type("> I am so grateful for all that you have done for me. I treasure every great memory I have with you. Enjoy your special day! ".toUpperCase())
	await type("> ")
}

window.addEventListener("load", onLoad);