import puppeteer from 'puppeteer';
export const captureProjectScreenShot = async (url: string) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url);
    const buffer = await page.screenshot();
    await browser.close();
    return buffer;
};
