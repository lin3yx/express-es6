pipeline {
  agent any
  
  stages {
    stage("build") {
      steps {
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