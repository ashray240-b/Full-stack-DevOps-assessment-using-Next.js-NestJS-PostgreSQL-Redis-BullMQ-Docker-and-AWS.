

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob(@Body('task') task: string) {
    if (!task || typeof task !== 'string' || !task.trim()) {
      throw new BadRequestException('Task is required');
    }

    return this.jobsService.createJob(task.trim());
  }

  @Get(':id')
  async getJobStatus(@Param('id') id: string) {
    return this.jobsService.getJobStatus(id);
  }
}
