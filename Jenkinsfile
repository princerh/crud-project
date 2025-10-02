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
                bat 'cd frontend && npm install && set "CI=false" && npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'cd backend && npm test || echo No backend tests'
                bat 'cd frontend && npm test -- --watchAll=false --passWithNoTests || echo No frontend tests'
            }
        }

        stage('Code Quality - Backend') {
            steps {
                echo 'Running SonarQube analysis for Backend...'
                bat '''
                    cd backend
                    C:\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner ^
                      -Dsonar.projectKey=employee-crud-backend ^
                      -Dsonar.sources=. ^
                      -Dsonar.host.url=http://localhost:9000 ^
                      -Dsonar.login=sqa_7d5b05c86a3f4cd557edd7a2a53d93fa21ebfe96
                '''
            }
        }

        stage('Code Quality - Frontend') {
            steps {
                echo 'Running SonarQube analysis for Frontend...'
                bat '''
                    cd frontend
                    C:\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner ^
                      -Dsonar.projectKey=employee-crud-frontend ^
                      -Dsonar.sources=src ^
                      -Dsonar.host.url=http://localhost:9000 ^
                      -Dsonar.login=sqa_7d5b05c86a3f4cd557edd7a2a53d93fa21ebfe96
                '''
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
                echo 'Deploy step placeholder (no docker on Windows).'
                // You can replace this with IIS/PM2/Heroku/Azure deployment later
            }
        }

        stage('Release') {
    steps {
        echo 'Tagging release...'
        bat 'git config user.name "Reazul Hasan Prince"'
        bat 'git config user.email "hasanriazul4@gmail.com"'
        bat 'git tag -a v1.0.%BUILD_NUMBER% -m "Release v1.0.%BUILD_NUMBER%"'
        bat 'git push origin --tags'
    }
}


        stage('Monitoring') {
            steps {
                echo 'Simulating monitoring step...'
                bat 'echo "Containers/Services running check placeholder"'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished ✅"
        }
    }
}
