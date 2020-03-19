import { browser, by, element, protractor, ElementArrayFinder, ElementFinder } from "protractor";
// import { pageObject } from "../pageObject";

describe('something', () => {
    let EC = protractor.ExpectedConditions;

    let geolinkBtn = element(by.css('.geolink'));
    let input = element(by.id('city__front-input'));
    let citysList = element.all(by.css('.popup__items li')).first();
    let geolinkReg = element(by.css('.geolink__reg'));
    let homeTabs = element(by.css('.home-tabs'));
    let moreButton = homeTabs.element(by.css('.dropdown2__switcher'));
    let moreButtonList = element.all(by.css('.home-tabs__more a'));

    it('compare', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.get('https://yandex.ru/');

        await browser.wait(EC.presenceOf(geolinkBtn), 5000)
        await geolinkBtn.click();

        await browser.wait(EC.presenceOf(input), 5000);
        await input.clear();
        await input.sendKeys('Лондон');

        await browser.wait(EC.presenceOf(citysList), 5000);
        await citysList.click();

        await browser.wait(EC.presenceOf(geolinkReg), 5000);
        expect(await geolinkReg.getText()).toEqual('Лондон');

        await browser.wait(EC.presenceOf(moreButton), 5000);
        await moreButton.click();

        let londonList = await moreButtonList.getText();
        
        /// need to compare;

        await geolinkBtn.click();

        await browser.wait(EC.presenceOf(input), 5000);
        await input.clear();
        await browser.wait(EC.textToBePresentInElementValue(input, ''), 5000);
        await input.sendKeys('Париж');
        await browser.wait(EC.textToBePresentInElementValue(input, 'Париж'), 5000);

        await browser.wait(EC.visibilityOf(citysList), 5000);
        await browser.wait(EC.presenceOf(citysList), 5000);
        await citysList.click();

        await browser.wait(EC.presenceOf(geolinkReg), 5000);
        expect(await geolinkReg.getText()).toEqual('Париж');

        await browser.wait(EC.presenceOf(moreButton), 5000);
        await moreButton.click();

        let parisList = await moreButtonList.getText();

        expect(londonList).toEqual(parisList);
    });
});