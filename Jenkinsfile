pipeline {
  agent {
    docker { 
      image 'node:16.13.1-alpine' 
    }
  }
  
  stages {
    stage("build") {
      steps {
        sh 'node --version'
        echo 'Installing required dependencies for the project...'
        sh 'yarn install'
        echo 'Building the application...'
        sh 'yarn build'
      }
    }

    stage("test") {
      steps {
        echo 'Running linting check for the application...'
        sh 'yarn lint'
        echo 'Running test suite for the application...'
        sh 'yarn test'
      }
    }
  }
}