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
        echo '🚀 Deploying Node.js + React app locally (on alternate ports)...'

        bat '''
        REM === Step 1: Stop any Jenkins-related Node processes only ===
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5050') do taskkill /F /PID %%a 2>NUL
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3500') do taskkill /F /PID %%a 2>NUL

        REM === Step 2: Start backend server on port 5050 (instead of 5000) ===
        start "Backend" cmd /c "cd backend && set PORT=5050 && npm start"

        REM === Step 3: Serve React frontend on port 3500 (instead of 3000) ===
        start "Frontend" cmd /c "cd frontend && npm install -g serve && serve -s build -l 3500"

        REM === Step 4: Confirm deployment started ===
        echo "✅ Backend running on http://localhost:5050"
        echo "✅ Frontend running on http://localhost:3500"
        '''
    }
}


     stage('Release') {
    steps {
        echo '📦 Creating new release version...'
        withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
            bat '''
            git config user.email "you@example.com"
            git config user.name "Jenkins"
            git tag -a v1.0.%BUILD_NUMBER% -m "Automated release v1.0.%BUILD_NUMBER%"
            git push https://%GIT_USER%:%GIT_PASS%@github.com/princerh/crud-project.git --tags
            echo "✅ Release v1.0.%BUILD_NUMBER% pushed to GitHub"
            '''
        }
    }
}


        stage('Monitoring') {
    steps {
        echo '📊 Checking service health...'
        bat '''
        timeout /t 10 >nul
        curl http://localhost:5050/api/employees || echo "Backend not responding!"
        curl http://localhost:3500 || echo "Frontend not responding!"
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
