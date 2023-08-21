# CloudGuardian
Secure Cloud Backup API

# CloudGuardian API - Cloud Backup and Management System

This repository contains the implementation of the CloudGuardian API, a comprehensive cloud backup and management system designed to ensure data security and streamline storage and retrieval processes. Developed in response to the Backend Engineer Test assessment, this project offers a scalable solution catering to diverse user needs, from fundamental file storage to advanced content management.

## Key Features

- **Simple Mode:** Users can create accounts with essential credentials, upload files up to 200MB, download uploaded files, and organize content into folders.
- **Hard Mode:** Introduces an admin user type for content management, enabling the identification and removal of unsafe media files. Additionally, users gain the ability to stream videos and audio files.
- **Ultra Mode:** Incorporates advanced features like file compression and history tracking, enhancing data storage efficiency and user experience.
- **Bonus Features:** Improved security with revocable session management, multi-admin reviews prior to file deletion, and extensive unit testing.

## Technology Stack

- **Backend:** Implemented using Node.js (TypeScript) and Express framework, ensuring efficient request handling and data processing.
- **Database:** Utilizes Postgres for robust and structured data storage.
- **Caching:** Employs Redis for optimizing data retrieval and system performance.
- **Containerization:** The application is containerized using Docker, promoting portability and seamless deployment across various environments.
- **Cloud Storage:** Integrates with S3 or other cloud storage providers for reliable and scalable data storage.
- **Testing:** Adheres to industry best practices with comprehensive unit testing to ensure code reliability.

## Documentation and Submission

- API endpoints are meticulously documented using Postman, facilitating ease of use and integration.
- Codebase is hosted on GitHub for collaborative development and version control.
- The live API instance is hosted on a server, offering accessibility for evaluation and testing (e.g., Heroku).
- The entire application is encapsulated within Docker containers for simplified deployment.
- Submission includes the repository link, hosted API URL, Postman Collection, and an outline of additional tasks accomplished beyond the Simple Mode.
