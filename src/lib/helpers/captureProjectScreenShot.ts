import { chromium } from 'playwright';

export const captureProjectScreenShot = async (url: string) => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url);
    await new Promise((r) => setTimeout(r, 2000)); // Wait for 2 seconds

    // Capture screenshot in JPEG format with reduced quality for smaller size
    const buffer = await page.screenshot({
        type: 'jpeg', // Use 'jpeg' format for smaller size
        quality: 60, // Set quality between 0-100 (lower means smaller size)
    });

    await browser.close();
    return buffer;
};
