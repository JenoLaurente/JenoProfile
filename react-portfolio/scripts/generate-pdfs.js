import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    try {
        console.log("Launching Puppeteer...");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        const filesToConvert = [
            {
                input: path.join(__dirname, '..', 'public', 'Jeno_Aldrei_Laurente_CV.html'),
                output: path.join(__dirname, '..', 'public', 'Jeno_Aldrei_Laurente_Technical_CV.pdf')
            },
            {
                input: path.join(__dirname, '..', 'public', 'Jeno_Aldrei_Laurente_General_CV.html'),
                output: path.join(__dirname, '..', 'public', 'Jeno_Aldrei_Laurente_General_CV.pdf')
            }
        ];

        for (const file of filesToConvert) {
            console.log(`Converting ${path.basename(file.input)} to PDF...`);
            // We use file:// protocol to load the local html files
            await page.goto(pathToFileURL(file.input).href, { waitUntil: 'networkidle0' });
            
            // Generate PDF from the page
            await page.pdf({
                path: file.output,
                format: 'A4',
                printBackground: true,
                margin: { top: '0', right: '0', bottom: '0', left: '0' }
            });
            console.log(`Successfully created ${path.basename(file.output)}`);
        }

        await browser.close();
        console.log("PDF generation complete.");
    } catch (error) {
        console.error("Error generating PDFs:", error);
        process.exit(1);
    }
})();
