

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class JobsService {
  constructor(
    @InjectQueue('tasks')
    private readonly taskQueue: Queue,
  ) {}

  async createJob(task: string) {
    const job = await this.taskQueue.add('process-task', { task });

    return {
      jobId: job.id,
      status: 'waiting',
      message: 'Job added successfully',
    };
  }

  async getJobStatus(jobId: string) {
    const job = await this.taskQueue.getJob(jobId);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return {
      jobId: job.id,
      task: job.data.task,
      status: await job.getState(),
      result: job.returnvalue ?? null,
      progress: job.progress,
      failedReason: job.failedReason || null,
    };
  }
}

