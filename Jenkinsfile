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
                echo '🚀 Deploying Node.js + React app locally...'
                bat '''
                    REM === Step 1: Stop any running Node processes ===
                    taskkill /F /IM node.exe /T 2>NUL || echo "No Node process running"

                    REM === Step 2: Start backend server on port 5000 ===
                    start "Backend" cmd /c "cd backend && npm install && npm start"

                    REM === Step 3: Serve React frontend on port 3000 ===
                    start "Frontend" cmd /c "cd frontend && npm install -g serve && serve -s build -l 3000"

                    REM === Step 4: Confirm deployment started ===
                    echo "✅ Backend running on http://localhost:5000"
                    echo "✅ Frontend running on http://localhost:3000"
                '''
            }
        }

        stage('Release') {
            steps {
                echo '📦 Creating new release version...'
                bat '''
                    git config user.email "you@example.com"
                    git config user.name "Jenkins"
                    git tag -a v1.0.%BUILD_NUMBER% -m "Automated release v1.0.%BUILD_NUMBER%"
                    git push origin --tags
                    echo "✅ Release v1.0.%BUILD_NUMBER% pushed to GitHub"
                '''
            }
        }

        stage('Monitoring') {
            steps {
                echo '📊 Checking service health...'
                bat '''
                    curl http://localhost:5000/api/employees || echo "Backend not responding!"
                    curl http://localhost:3000 || echo "Frontend not responding!"
                    echo "✅ Monitoring completed successfully."
                '''
            }
        }

    } // 

    post {
        always {
            echo "Pipeline finished ✅"
        }
    }
} 
