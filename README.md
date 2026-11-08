# Full-stack-DevOps-assessment-using-Next.js-NestJS-PostgreSQL-Redis-BullMQ-Docker-and-AWS.

A containerized full-stack application demonstrating modern DevOps practices using **Next.js, NestJS, PostgreSQL, Redis, BullMQ, Docker, and GitHub Actions**.

The application allows users to submit background-processing jobs through a web interface, process them asynchronously using a worker, and retrieve their execution status and results.

## Architecture

The application consists of five main services:

1. **Frontend:** Next.js web application providing the user interface.
2. **Backend:** NestJS REST API responsible for accepting jobs and retrieving their status.
3. **Database:** PostgreSQL for persistent application data.
4. **Queue:** Redis for managing background jobs.
5. **Worker:** BullMQ worker that processes queued jobs asynchronously.

### Application workflow

1. A user submits a task through the Next.js frontend.
2. The frontend sends a request to the NestJS backend.
3. The backend adds the task to a BullMQ queue.
4. Redis stores the queued job.
5. The background worker retrieves and processes the job.
6. The frontend requests the job status from the backend.
7. The backend returns the job status and processing result.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js |
| Backend | NestJS |
| Database | PostgreSQL |
| Job Queue | BullMQ |
| Queue Storage | Redis |
| Runtime | Node.js |
| Containerization | Docker |
| Container Orchestration | Docker Compose |
| CI/CD | GitHub Actions |
| Cloud Platform | AWS (deployment configuration) |

## Project Structure

```text
vegha-assessment/
├── frontend/                 # Next.js application
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── backend/                  # NestJS REST API
│   ├── src/
│   ├── test/
│   └── Dockerfile
│
├── worker/                   # BullMQ background worker
│   ├── src/
│   └── Dockerfile
│
├── docker-compose.yml        # Multi-container configuration
├── .env.example              # Environment variable template
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

Ensure Docker Desktop is running before starting the containers.

## Run the Application Using Docker Compose

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

### 2. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a reference.

Do not commit real credentials or secrets to GitHub.

### 3. Build the Docker images

```bash
docker compose build
```

### 4. Start all services

```bash
docker compose up -d
```

### 5. Check container status

```bash
docker compose ps
```

### 6. View application logs

```bash
docker compose logs -f
```

To view individual service logs:

```bash
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f worker
```

### 7. Access the application

| Service | Local URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Backend Health Check | http://localhost:3001/health |

### 8. Stop the application

```bash
docker compose down
```

To remove containers and volumes (this also deletes persisted database and Redis data):

```bash
docker compose down -v
```

**Warning:** Do not use `-v` if you want to preserve your database data.

## API Endpoints

### Health Check

**GET** `/health`

Checks whether the backend API is running.

Example response:

```json
{
  "status": "healthy",
  "service": "backend"
}
```

### Submit a Background Job

**POST** `/jobs`

Request body:

```json
{
  "task": "Generate November report"
}
```

Example response:

```json
{
  "jobId": "1",
  "status": "waiting",
  "message": "Job added to queue"
}
```

### Retrieve Job Status

**GET** `/jobs/:id`

Returns the job's current status and result when processing is complete.

Possible job statuses include:

- Waiting
- Active
- Completed
- Failed

## Docker and Reliability

The Docker Compose configuration defines the application services and their dependencies.

Key features include:

- Separate Dockerfiles for the frontend, backend, and worker.
- Multi-stage Docker builds to reduce production image size.
- PostgreSQL persistent storage using Docker volumes.
- Redis persistence using append-only file storage.
- Health checks for PostgreSQL, Redis, backend, and frontend.
- Service dependencies to help ensure infrastructure services are ready before dependent services start.

## CI/CD Pipeline

The planned GitHub Actions pipeline will automate the following steps when changes are pushed to the `main` branch:

1. Check out the repository.
2. Install dependencies.
3. Run application checks and builds.
4. Build Docker images for the frontend, backend, and worker.
5. Push images to a container registry.
6. Deploy the updated application to the cloud environment.

Pipeline configuration and deployment details will be documented here once implemented and verified.

## Cloud Deployment

The target deployment platform for this assessment is **Amazon Web Services (AWS)**.

The deployment documentation will include:

- Cloud infrastructure and service configuration.
- Container image registry.
- Application deployment procedure.
- Environment variables and secret management.
- Persistent storage configuration.
- Application health monitoring and recovery.

The deployed application URL will be added here after deployment.

## Security Considerations

- Environment files containing credentials are excluded from version control.
- Production secrets should be stored using GitHub Actions Secrets or an appropriate cloud secrets service.
- Database credentials should be changed from local development defaults before production deployment.
- Production database schema changes should use migrations rather than relying on TypeORM's development synchronization setting.

## Future Improvements

- Add automated unit and integration tests.
- Add database migrations.
- Implement production-grade monitoring and centralized logging.
- Configure automated deployment and rollback.
- Add stronger authentication and authorization.

## Author

**Ashray**

GitHub: [ashray240-b](https://github.com/ashray240-b)

---

*Developed as part of the VEGAH DevOps / Cloud Engineering Intern Practical Assessment.*
