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
                    sh 'docker build -t my-app-frontend:latest .'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t my-app-backend:latest .'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        always {
            sh 'docker-compose logs'
        }
    }
}
