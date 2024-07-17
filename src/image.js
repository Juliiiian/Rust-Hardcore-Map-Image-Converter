import fs from 'fs/promises';
import { Canvas, createCanvas, Image, CanvasRenderingContext2D, ImageData } from 'canvas';

/**
 *
 * @param {string} input
 * @param {string} output
 */
export async function handleImage(input, output) {
	const imageBuffer = await fs.readFile(input, {});

	const chunks = [2, 4, 6];

	/** @type {Canvas} */
	let canvas;
	/** @type {CanvasRenderingContext2D} */
	let ctx;

	const img = new Image();
	img.onload = () => {
		canvas = createCanvas(img.width, img.height);
		ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);

		for (let i = 0; i < chunks.length; i++) {
			const chunk_size = imageBuffer.byteLength / Math.pow(chunks[i], 2) / 1000 / 1000;
			//each chunk needs to be below 3.8
			if (chunk_size < 3.8) {
				console.log(chunks[i]);
				for (let h = 0; h < chunks[i]; h++) {
					for (let w = 0; w < chunks[i]; w++) {
						console.log(w * (img.width / chunks[i]), h * (img.height / chunks[i]), img.width / chunks[i], img.height / chunks[i]);
						const chunk_data = ctx.getImageData(
							w * (img.width / chunks[i]),
							h * (img.height / chunks[i]),
							img.width / chunks[i],
							img.height / chunks[i]
						);
						fs.writeFile(`${output}/chunk-${h * chunks[i] + w}.png`, imagedata_to_image(chunk_data));
					}
				}
				break;
			}
		}
	};
	img.onerror = (err) => {
		throw err;
	};
	img.src = imageBuffer;

	return true;
}

/**
 *
 * @param {ImageData} imagedata
 * @returns
 */
function imagedata_to_image(imagedata) {
	let canvas = createCanvas(imagedata.width, imagedata.height);
	let ctx = canvas.getContext('2d');
	ctx.putImageData(imagedata, 0, 0);
	return canvas.toBuffer('image/png');
}
