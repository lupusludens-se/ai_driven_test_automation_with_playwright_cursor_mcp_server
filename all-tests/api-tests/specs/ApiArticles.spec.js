require("dotenv").config();

const { test, request, expect } = require("@playwright/test");

test.describe("GET /api/articles", { tag: "@getApiArticles" }, () => {
  test("should fetch articles with search, filter, and order parameters", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(
      `${process.env.API_BASE_URL}/api/articles`,
      {
        params: {
          search: "Title and Content",
          filterBy:
            "foryou,saved,solutionids=1,2&categoryids=1&technologyids=1&regionids=1",
          orderBy: "id.asc",
          expand: "categories,regions,solutions,technologies",
          skip: 0,
          take: 10,
          includeCount: true,
        },
      }
    );

    if (!response.ok()) {
      console.error("API request failed:", await response.text());
    }

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    // Validate response structure
    expect(responseBody).toHaveProperty("dataList");
    expect(responseBody).toHaveProperty("count");

    // Validate data content
    expect(Array.isArray(responseBody.dataList)).toBe(true);
    responseBody.dataList.forEach((article) => {
      expect(article).toHaveProperty("id");
      expect(typeof article.id).toBe("number");

      expect(article).toHaveProperty("title");
      expect(typeof article.title).toBe("string");
      // Optionally check that title is not empty
      expect(article.title.length).toBeGreaterThan(0);

      expect(article).toHaveProperty("content");
      expect(typeof article.content).toBe("string");
      // Optionally check that content is not empty
      expect(article.content.length).toBeGreaterThan(0);
    });
  });

  test('should fetch articles with empty parameters', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(`${process.env.API_BASE_URL}/api/articles`, { params: {} });

    if (!response.ok()) {
      console.error('API request (empty params) failed:', await response.text());
    }

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('dataList');
  });

  test('should fetch articles with only search parameter', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(`${process.env.API_BASE_URL}/api/articles`, {
      params: {
        search: 'Title Only'
      }
    });

    if (!response.ok()) {
      console.error('API request (only search) failed:', await response.text());
    }

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('dataList');
  });

  test('should fetch articles with filter and order parameters only', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(`${process.env.API_BASE_URL}/api/articles`, {
      params: {
        filterBy: 'foryou,saved',
        orderBy: 'id.desc'
      }
    });

    if (!response.ok()) {
      console.error('API request (filter and order only) failed:', await response.text());
    }

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('dataList');
  });
});
