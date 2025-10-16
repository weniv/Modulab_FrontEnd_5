import fs from 'fs'; // Node.js의 내장 파일 시스템 모듈
import sharp from 'sharp';

export function watermarkPlugin() {
    // 워터마크에 사용할 옵션들을 미리 정의
    const options = {
        text: 'Sample Text',
        x: '50%',
        y: '50%',
        color: '#ffffff',
        fontSize: 50
    };

    return {
        name: 'vite-plugin-image-watermark',
        async transform(src, id) {
            if (!/\.(png|jpeg|webp|svg)$/.test(id)) {
                return;
            }

            try {
                const imageBuffer = fs.readFileSync(id);
                const image = sharp(imageBuffer);
                const metadata = await image.metadata();

                const svgText = `
          <svg width="${metadata.width}" height="${metadata.height}">
            <text x='${options.x}' y='${options.y}' dominant-baseline="middle" text-anchor="middle"
                  font-size="${options.fontSize}" fill="${options.color}" font-family="sans-serif">
              ${options.text}
            </text>
          </svg>
        `;

                const processedImageBuffer = await image
                    .composite([{ input: Buffer.from(svgText) }])
                    .toBuffer();


                const base64Image = `data:image/${metadata.format};base64,${processedImageBuffer.toString('base64')}`;
                return `export default "${base64Image}"`;

            } catch (err) {
                console.error('워터마크 처리 오류:', err);
            }
        }
    };
}