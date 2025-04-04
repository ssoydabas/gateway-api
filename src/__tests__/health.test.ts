import { setupTestApp, getTestClient } from '@/utils/test/testHelper';

describe('Health Check API', () => {
  beforeAll(async () => {
    await setupTestApp();
  });

  describe('GET /health-check', () => {
    it('should return 200 status code', async () => {
      const response = await getTestClient()
        .get('/health-check');

      expect(response.status).toBe(200);
    });
  });
});
