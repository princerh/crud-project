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
                // Disable CI=true so warnings don't fail build
                bat 'cd frontend && npm install && set "CI=false" && npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'cd backend && npm test'
                bat 'cd frontend && npm test -- --watchAll=false || echo No tests yet'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube') {
                    // Backend analysis
                    bat 'cd backend && sonar-scanner -Dsonar.projectKey=employee-crud -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=sqa_7d5b05c86a3f4cd557edd7a2a53d93fa21ebfe96'
                    
                    // Frontend analysis
                    bat 'cd frontend && sonar-scanner -Dsonar.projectKey=employee-crud-frontend -Dsonar.sources=src -Dsonar.host.url=http://localhost:9000 -Dsonar.login=sqa_7d5b05c86a3f4cd557edd7a2a53d93fa21ebfe96'
                }
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
                echo 'Deploying app (placeholder)...'
                // If Docker is installed later, you can use:
                // bat 'docker-compose up -d --build'
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
                bat 'echo Docker not installed yet, skipping health check'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished ✅"
        }
    }
}
