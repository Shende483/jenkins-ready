pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-cred', url: 'https://github.com/Shende483/jenkins-ready.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        def commitHash = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                        def imageTag = "my-app-frontend:${commitHash}"
                        
                        def imageExists = sh(script: "docker image inspect ${imageTag} > /dev/null 2>&1 || echo 'no'", returnStdout: true).trim()
                        
                        if (imageExists == "no") {
                            echo "No existing image found. Building frontend..."
                            sh "docker build -t ${imageTag} ."
                            sh "docker tag ${imageTag} my-app-frontend:latest"
                        } else {
                            echo "Frontend image ${imageTag} already exists. Skipping build."
                        }
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        def commitHash = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                        def imageTag = "my-app-backend:${commitHash}"
                        
                        def imageExists = sh(script: "docker image inspect ${imageTag} > /dev/null 2>&1 || echo 'no'", returnStdout: true).trim()
                        
                        if (imageExists == "no") {
                            echo "No existing image found. Building backend..."
                            sh "docker build -t ${imageTag} ."
                            sh "docker tag ${imageTag} my-app-backend:latest"
                        } else {
                            echo "Backend image ${imageTag} already exists. Skipping build."
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }

        stage('Clean Up Old Docker Images') {
            steps {
                echo 'Cleaning dangling images...'
                sh 'docker image prune -f'

                echo 'Removing old frontend images (except latest)...'
                sh '''
                    docker images --filter=reference='my-app-frontend:*' --format "{{.Repository}}:{{.Tag}}" | grep -v latest | xargs -r docker rmi || true
                '''

                echo 'Removing old backend images (except latest)...'
                sh '''
                    docker images --filter=reference='my-app-backend:*' --format "{{.Repository}}:{{.Tag}}" | grep -v latest | xargs -r docker rmi || true
                '''
            }
        }
    }

    post {
        always {
            sh 'docker-compose logs'
        }
    }
}

