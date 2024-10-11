import puppeteer from 'puppeteer';
export const captureProjectScreenShot = async (url: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url);
    await new Promise((r) => setTimeout(r, 2000));
    const buffer = await page.screenshot();
    await browser.close();
    return buffer;
};
