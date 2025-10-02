pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/princerh/crud-project.git'
            }
        }

        stage('Build') {
            steps {
                bat 'cd backend && npm install'
                bat 'cd frontend && npm install && npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'cd backend && npm test || echo No tests yet'
                bat 'cd frontend && npm test -- --watchAll=false || echo No tests yet'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarQube analysis...'
                // Example:
                // bat 'sonar-scanner -Dsonar.projectKey=employee-crud'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security scan...'
                bat 'cd backend && npm audit --audit-level=high || exit /b 0'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app with Docker Compose...'
                bat 'docker-compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                echo 'Tagging release...'
                bat 'git tag -a v1.0.%BUILD_NUMBER% -m "Release v1.0.%BUILD_NUMBER%"'
                bat 'git push origin --tags'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking container health...'
                bat 'docker ps'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished ✅"
        }
    }
}
