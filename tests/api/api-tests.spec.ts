import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('GET /posts - Verify array length > 0', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.length).toBeGreaterThan(0);
  });

  test('GET /comments?postId={parameter} - Verify elements have correct postId', async ({ request }) => {
    const parameter = 1;
    const response = await request.get(`https://jsonplaceholder.typicode.com/comments?postId=${parameter}`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.length).toBeGreaterThan(0);
    data.forEach(comment => {
      expect(comment.postId).toBe(parameter);
    });
  });

  test('POST /posts - Verify created object matches expected data', async ({ request }) => {
    const postData = {
      title: 'test title',
      body: 'test body',
      userId: 1,
    };
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', { data: postData });
    expect(response.status()).toBe(201);
    const responseData = await response.json();
    expect(responseData).toEqual(expect.objectContaining(postData));
  });

  test('GraphQL /graphql - Verify episodes with substring "Rick"', async ({ request }) => {
    const query = `
      query {
        episodes(filter: { name: "Rick" }) {
          results {
            name
          }
        }
      }
    `;
    const response = await request.post('https://rickandmortyapi.com/graphql', {
      data: { query },
    });
    expect(response.status()).toBe(200);
    const { data } = await response.json();
    const episodes = data.episodes.results;
    expect(episodes.length).toBeGreaterThan(0);
    episodes.forEach(episode => {
      expect(episode.name.toLowerCase()).toContain('rick');
    });
  });
});
