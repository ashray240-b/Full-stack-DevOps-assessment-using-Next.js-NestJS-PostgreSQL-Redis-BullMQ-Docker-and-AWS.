
import { Worker } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const worker = new Worker(
  'tasks',
  async (job) => {
    console.log('Processing job:', job.id);
    console.log('Task:', job.data.task);

    // Simulate background processing
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const result = {
      message: `Successfully processed: ${job.data.task}`,
      processedAt: new Date().toISOString(),
    };

    console.log('Job completed:', job.id);

    return result;
  },
  {
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT || 6379),
      maxRetriesPerRequest: null,
    },
  },
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, error) => {
  console.error(`Job ${job?.id} failed:`, error.message);
});

console.log('Background worker is listening for jobs...');
