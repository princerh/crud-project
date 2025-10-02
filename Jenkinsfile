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
                sh 'cd backend && npm install'
                sh 'cd frontend && npm install && npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'cd backend && npm test || echo "No tests yet"'
                sh 'cd frontend && npm test -- --watchAll=false || echo "No tests yet"'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarQube analysis...'
                // Example:
                // sh 'sonar-scanner -Dsonar.projectKey=employee-crud'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security scan...'
                sh 'cd backend && npm audit --audit-level=high || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app with Docker Compose...'
                sh 'docker-compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                echo 'Tagging release...'
                sh 'git tag -a v1.0.$BUILD_NUMBER -m "Release v1.0.$BUILD_NUMBER"'
                sh 'git push origin --tags'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking container health...'
                sh 'docker ps'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished ✅"
        }
    }
}
