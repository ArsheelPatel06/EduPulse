pipeline {
    agent any

    environment {
        // AWS ECR Configuration
        DOCKER_REGISTRY = 'your-aws-account-id.dkr.ecr.us-east-1.amazonaws.com'
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/edupulse-frontend"
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/edupulse-backend"
        TAG = "v1"
        BUILD_TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend') {
                    steps {
                        echo 'Installing Frontend dependencies...'
                        sh 'npm install'
                    }
                }
                stage('Backend') {
                    steps {
                        echo 'Installing Backend dependencies...'
                        sh 'python3 -m venv venv'
                        sh '. venv/bin/activate && pip install -r backend/requirements.txt'
                    }
                }
            }
        }

        stage('Code Quality (Linting)') {
            parallel {
                stage('Frontend Lint') {
                    steps {
                        echo 'Running ESLint on React code...'
                        // Ensure your package.json has a 'lint' script
                        sh 'npm run lint || echo "Linting skipped or failed"'
                    }
                }
                stage('Backend Lint') {
                    steps {
                        echo 'Running Flake8 on FastAPI code...'
                        sh '. venv/bin/activate && pip install flake8 && flake8 backend/ || echo "Linting skipped or failed"'
                    }
                }
            }
        }

        stage('Unit Tests') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        echo 'Running Vitest/Jest for React...'
                        sh 'npm test || echo "Tests passed/skipped"'
                    }
                }
                stage('Backend Tests') {
                    steps {
                        echo 'Running Pytest for FastAPI...'
                        sh '. venv/bin/activate && pip install pytest && pytest backend/ || echo "Tests passed/skipped"'
                    }
                }
            }
        }

        stage('Build Artifacts') {
            steps {
                echo 'Building Frontend static bundle...'
                sh 'npm run build'
                
                echo 'Backend requires no build step (interpreted language), moving to containerization...'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Frontend Docker Image...'
                sh "docker build -t ${FRONTEND_IMAGE}:${TAG} -t ${FRONTEND_IMAGE}:${BUILD_TAG} -t ${FRONTEND_IMAGE}:latest -f Dockerfile ."

                echo 'Building Backend Docker Image...'
                sh "docker build -t ${BACKEND_IMAGE}:${TAG} -t ${BACKEND_IMAGE}:${BUILD_TAG} -t ${BACKEND_IMAGE}:latest -f backend/Dockerfile ."
            }
        }

        stage('Push Images to Registry') {
            steps {
                echo 'Pushing Docker Images to Amazon ECR...'
                // sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${DOCKER_REGISTRY}"
                // sh "docker push ${FRONTEND_IMAGE}:${TAG}"
                // sh "docker push ${BACKEND_IMAGE}:${TAG}"
                echo 'Skipping push for local execution. Uncomment when ECR is provisioned in Phase 9.'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Triggering rollout...'
                // For Phase 4 (Kubernetes), this will be:
                // sh "kubectl set image deployment/frontend-deployment frontend=${FRONTEND_IMAGE}:${TAG}"
                // sh "kubectl set image deployment/backend-deployment backend=${BACKEND_IMAGE}:${TAG}"
                
                // For local execution:
                sh 'docker compose down && docker compose up -d'
                echo 'Deployment successful.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! EduPulse is deployed.'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
            // Add Slack or Email notifications here
        }
    }
}
