# Actions Status

![Development](https://img.shields.io/badge/Development-8A2BE2?style=for-the-badge&color=ff9500&label=Status)

A dashboard to monitor the status of all GitHub Actions which have run on the default (main/master) branch of your repositories. This tool provides a centralized view of your repositories' CI/CD workflows, making it easier to track and debug issues.

## Table of Contents

- [Actions Status](#actions-status)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Development](#development)
  - [Contributing](#contributing)

## Features

- Monitor GitHub Actions across multiple repositories.
- View the status of workflows on the default branch.
- User-friendly dashboard interface.
- Supports authentication via personal access tokens.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JackPlowman/actions-status.git
   ```
2. Navigate to the project directory:
   ```bash
   cd actions-status/dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser at the URL provided by the development server.
2. Enter your GitHub personal access token to authenticate.
3. Add repositories to monitor their GitHub Actions status.

## Development

To contribute to the project, follow these steps:

1. Fork the repository and create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them:
   ```bash
   git commit -m "Add your commit message"
   ```
3. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a pull request to the `main` branch of the original repository.

## Contributing

We welcome contributions to the project. Please read the [Contributing Guidelines](docs/CONTRIBUTING.md) for more information.
