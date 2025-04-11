class ExamplePage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(process.env.UI_BASE_URL);
  }

  async getTitle() {
    return this.page.title();
  }
}

module.exports = ExamplePage;
