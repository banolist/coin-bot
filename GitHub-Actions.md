# GitHub Actions Setup

To use the provided GitHub Actions workflow, you'll need to set up repository secrets for container registry authentication.

## Required Secrets

Navigate to your repository's "Settings > Secrets and variables > Actions" to add these secrets:

1. `REGISTRY_URL` - Your container registry URL (e.g., `ghcr.io/username`, `docker.io/username`, etc.)
2. `IMAGE_NAME` - Name for your Docker image (e.g., `coin-bot`)
3. `REGISTRY_USERNAME` - Username for your container registry
4. `REGISTRY_PASSWORD` - Password or access token for your container registry

## Example for Different Registries

### GitHub Container Registry (GHCR)
- REGISTRY_URL: `ghcr.io/your-username`
- IMAGE_NAME: `coin-bot`
- REGISTRY_USERNAME: Your GitHub username
- REGISTRY_PASSWORD: GitHub personal access token with `write:packages` scope

### Docker Hub
- REGISTRY_URL: `docker.io/your-username`  
- IMAGE_NAME: `coin-bot`
- REGISTRY_USERNAME: Your Docker Hub username
- REGISTRY_PASSWORD: Docker Hub access token or password

## Branch Configuration

The workflow currently runs on pushes to the `main` branch. You can modify this by changing the `branches` section in `.github/workflows/build-and-deploy.yml`.

## Workflow Overview

The workflow:
1. Triggers on pushes to the configured branch
2. Builds the Docker image using the production target
3. Tags the image with both commit SHA and latest tags
4. Pushes the image to your configured registry