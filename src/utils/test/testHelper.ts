import supertest from 'supertest';
import app from '@/app';

export const setupTestApp = async () => app;

export const getTestClient = () => supertest(app);
