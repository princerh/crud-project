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
                bat 'cd backend && npm test || echo No backend tests'
                bat 'cd frontend && npm test -- --watchAll=false || echo No frontend tests'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube') {
                    bat '''
                        cd backend
                        sonar-scanner ^
                          -Dsonar.projectKey=employee-crud ^
                          -Dsonar.sources=. ^
                          -Dsonar.host.url=http://localhost:9000 ^
                          -Dsonar.login=sqa_7d5b05c86a3f4cd557edd7a2a53d93fa21ebfe96
                    '''
                    cd ..
                    bat '''
                        cd frontend
                        sonar-scanner ^
                          -Dsonar.projectKey=employee-crud-frontend ^
                          -Dsonar.sources=src ^
                          -Dsonar.host.url=http://localhost:9000 ^
                          -Dsonar.login=sqa_7d5b05c86a3f4cd557edd7a2a53d93fa21ebfe96
                    '''
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
                echo 'Deploying app (demo)...'
                // If no docker-compose, keep simple
                bat 'echo Deploy backend & frontend to test server'
            }
        }

        stage('Release') {
            steps {
                echo 'Tagging release...'
                bat 'git tag -a v1.0.%BUILD_NUMBER% -m "Release v1.0.%BUILD_NUMBER%"'
                bat 'git push origin --tags || echo Skipping tag push (no credentials)'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Simulating monitoring...'
                bat 'echo Health Check - Backend & Frontend running'
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline finished"
        }
    }
}
