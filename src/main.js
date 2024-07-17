import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';
import { handleImage } from './image.js';

console.log(
	chalk.green(
		'\n' + boxen('Rust Hardcore Map Image Converter', { padding: 1, borderColor: 'green', dimBorder: true, borderStyle: 'double' }) + '\n'
	)
);

const argv = await yargs(hideBin(process.argv))
	.option('i', { alias: 'input', describe: 'Image input', type: 'string', demandOption: true })
	.option('o', { alias: 'output', describe: 'Directory output', type: 'string', demandOption: true })
	.help(true).argv;

if ((argv.input == null && argv.i == null) || (argv.output == null && argv.o == null)) {
	console.log(chalk.yellow(figlet.textSync('RHMIC', { horizontalLayout: 'full' })));
	process.exit();
}

const input = argv.i || /** @type {string} */ (argv.input);

/** @type {string} */
const output = argv.o || /** @type {string} */ (argv.output);

await handleImage(input, output);
