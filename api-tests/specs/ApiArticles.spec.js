require('dotenv').config();

const { test, request, expect } = require('@playwright/test');

test.describe('GET /api/articles', { tag: '@getApiArticles' }, () => {
  test('should fetch articles with search, filter, and order parameters', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(`${process.env.API_BASE_URL}/api/articles`, {
      params: {
        search: 'Title and Content',
        filterBy: 'foryou,saved,solutionids=1,2&categoryids=1&technologyids=1&regionids=1',
        orderBy: 'id.asc',
        expand: 'categories,regions,solutions,technologies',
        skip: 0,
        take: 10,
        includeCount: true
      }
    });

    if (!response.ok()) {
      console.error('API request failed:', await response.text());
    }

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    // Validate response structure
    expect(responseBody).toHaveProperty('dataList');
    expect(responseBody).toHaveProperty('count');

    // Validate data content
    expect(Array.isArray(responseBody.dataList)).toBe(true);
    responseBody.dataList.forEach(article => {
      expect(article).toHaveProperty('id');
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('content');
    });
  });
});
