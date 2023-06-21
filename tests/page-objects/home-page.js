exports.HomePage = class HomePage {
constructor(page){
    this.page = page;
    this.accountDropdown = page.locator("//a//strong[contains(text(),'Account')]");
    this.loginLink = page.locator("//a[contains(text(),'Login')]");
    this.searchBox = page.locator(".ShowSearchBox");
    this.featuredHotelsSection = page.locator("section[class*='hotel-area'] .featured");
    this.featuredFlightsSection = page.locator("section[class*='round-trip-flight']");
    this.featuredToursSection = page.locator("div[class*='featured_tours']");
    this.recommendedCarsSection = page.locator("//*[text()='Recommended Transfer Cars']/ancestor::section[contains(@class,'hotel-area')]");
}

async clickAccountLink(){
    await this.accountDropdown.click();
}

async clickLoginLink(){
    await this.loginLink.click();
}

}