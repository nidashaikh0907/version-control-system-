
# Version Control System

A full-stack Git-inspired Version Control System developed to understand and implement core version-control workflows through a web application.

The application provides repository management, file handling, staging, commits, branches, merging, push and pull operations, issue tracking, user authentication, and cloud-based file storage.

## Live Demo

https://version-control-system-1-a2ix.onrender.com/auth

## GitHub Repository

https://github.com/nidashaikh0907/version-control-system-

---

## Dashboard

The dashboard provides a centralized interface for managing repositories, viewing recent repositories, searching repositories, and accessing repository-related functionality.
  <img width="1535" height="772" alt="image" src="https://github.com/user-attachments/assets/560a58a7-2e57-4846-b8bd-fb339e098484" />

---

## Project Overview

This project focuses on understanding version control at the implementation level rather than simply using Git as a command-line tool.

The system implements a simplified Git-like workflow that allows users to work with repositories, stage files, create commits, manage branches, merge changes, and perform push and pull operations.

The application follows a full-stack architecture where the React frontend communicates with a Node.js and Express backend through REST APIs. MongoDB is used for application data management, while AWS S3 is used for file storage.

---

## Key Features

### Repository Management

- Create repositories
- Manage repository visibility
- View repository details
- View repository contents
- Search repositories
- Star repositories

### Version Control

- Repository initialization
- File staging
- Commit creation
- Commit history
- Branch creation
- Branch management
- Branch merging
- Push operations
- Pull operations

### Issue Management

- Create issues
- View repository issues
- Track issue status
- Associate issues with repositories
- Associate issues with users

### User Management

- User signup
- User login
- User profiles
- User-specific repositories

### File Management

- Upload repository files
- Manage repository content
- Handle uploaded files through the backend
- Store files using AWS S3

---

## Version Control Workflow

The application follows a simplified version-control workflow:

Working Directory → Staging → Commit → Branch → Push / Pull → Remote Repository

The workflow demonstrates how changes move from the working directory into the staging area, become part of repository history through commits, and can then be synchronized with remote repositories.

---

## Branching and Merging

The system supports branch-based development, allowing changes to be developed independently before being merged.

```text
              main
               |
        +------+------+
        |             |
        v             v
   feature-A      feature-B
        |             |
        v             v
     commits       commits
        |             |
        +------+------+
               |
               v
             merge
               |
               v
              main
````

---

## System Architecture

```text
                    React Frontend
                          |
                          |
                       REST API
                          |
                          v
                  Node.js + Express
                    /           \
                   /             \
                  v               v
              MongoDB           AWS S3
                  |               |
                  v               v
        Users / Repositories    File Storage
        Issues / Application
              Data
```

### Frontend

Responsible for the user interface, repository interaction, authentication screens, issue management, and communication with the backend APIs.

### Backend

Responsible for REST APIs, authentication, repository operations, version-control operations, file handling, and application business logic.

### MongoDB

Used for storing application data such as users, repositories, issues, and related relationships.

### AWS S3

Used for cloud-based file storage.

---

## Technology Stack

### Frontend

* React.js
* Material UI
* React Router
* Axios

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB

### Cloud Storage

* AWS S3

### Deployment

* Render

---

## Project Structure

```text
version-control-system/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.local
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── .hiddenGit/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── README.md
└── .gitignore
```

### Frontend Directory

* `components/` - Reusable UI components
* `pages/` - Application pages and views
* `services/` - API communication and service integration
* `context/` - Shared application state
* `hooks/` - Reusable React hooks
* `utils/` - Frontend utility functions
* `assets/` - Images and static assets

### Backend Directory

* `config/` - Configuration and database setup
* `controllers/` - Request handling and application operations
* `middleware/` - Authentication and request-processing middleware
* `models/` - MongoDB data models
* `routes/` - REST API route definitions
* `services/` - Backend business and external-service logic
* `utils/` - Reusable backend utilities
* `uploads/` - Temporary file handling
* `.hiddenGit/` - Project-specific version-control data

---

## Application Flow

```text
User
 |
 v
React Frontend
 |
 | HTTP Request
 v
Express REST API
 |
 +-------------------+
 |                   |
 v                   v
MongoDB             AWS S3
 |                   |
 v                   v
Application        Repository
Data               Files
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB
* AWS account with S3 access

### Clone the Repository

```bash
git clone https://github.com/nidashaikh0907/version-control-system-.git

cd version-control-system-
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create a backend `.env` file and configure the required variables.

```env
MONGO_URI=your_mongodb_connection_string
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
JWT_SECRET=your_jwt_secret
```

For the frontend:

```env
VITE_API_URL=your_backend_url
```

Never commit `.env` files or secret credentials to the repository.

---

## Running Locally

### Start Backend

```bash
cd backend
node index.js
```

Backend:

```text
http://localhost:3000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

---

## Deployment

The application is deployed using Render.

```text
React Frontend
      |
      v
    Render
      |
      v
Node.js / Express Backend
      |
      +-------> MongoDB
      |
      +-------> AWS S3
```

The frontend uses environment-based configuration to communicate with the deployed backend.

---

## Technical Concepts Demonstrated

* Full-stack application architecture
* REST API development
* Client-server communication
* Authentication
* MongoDB data modeling
* Database relationships
* File upload and handling
* AWS S3 integration
* Repository management
* Staging and commit workflows
* Branching and merging
* Push and pull synchronization
* Environment variable configuration
* Production deployment
* Frontend-backend debugging

---

## Key Learning Outcomes

This project provided practical experience in designing and integrating multiple layers of a software system.

The implementation required working with frontend interfaces, REST APIs, backend business logic, database operations, file storage, authentication, and deployment.

It also provided a deeper understanding of version-control concepts by implementing repository, staging, commit, branch, merge, push, and pull workflows at the application level.

---

## Future Improvements

* Pull request functionality
* Commit comparison and diff visualization
* Merge conflict handling
* Repository collaboration
* Role-based repository permissions
* Detailed file history
* Automated testing
* CI/CD integration
* Improved repository access control

---


```
```
