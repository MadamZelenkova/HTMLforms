import puppetteer from "puppeteer";

import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Click to button shows tooltip", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8080";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    // await new Promise((resolve, reject) => {
    //   server.on("error", reject);
    //   server.on("message", (message) => {
    //     if (message === "ok") {
    //       resolve();
    //     }
    //   });
    // });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe("button should show and hide tooltip", () => {
    beforeEach(async () => {
      await page.goto(baseUrl);
    });
    test("should show tooltip", async () => {
      await page.click(".btn");
      const tooltip = await page.$(".popover");
      const tooltipDisplayStyle = await page.evaluate(
        (tooltip) => tooltip.style.display,
        tooltip,
      );
      expect(tooltipDisplayStyle).toBe("block");
    });

    test("should hide", async () => {
      await page.click(".btn");
      await page.click(".btn");
      const tooltip = await page.$(".popover");
      const tooltipDisplayStyle = await page.evaluate(
        (tooltip) => tooltip.style.display,
        tooltip,
      );
      expect(tooltipDisplayStyle).toBe("none");
    });
  });
});
