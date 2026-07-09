import type { CheatsheetData } from "@/data/types";

const data: CheatsheetData = {
  title: "🔧 Jenkins Command Reference",
  subtitle: "Remote CLI actions, Groovy console scripts, pipelines, and config-as-code",
  cards: [
    {
      title: "Jenkins CLI Basics",
      span: 1,
      blocks: [
        { type: "row", cmd: "java -jar jenkins-cli.jar -s http://localhost:8080/ help", desc: "List all commands" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL -auth user:pass CMD", desc: "Auth with credentials" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL -i /path/key CMD", desc: "Auth with SSH Key" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL who-am-i", desc: "Verify authentication" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL version", desc: "Show server version" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL safe-restart", desc: "Restart after builds finish" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL restart", desc: "Force immediate restart" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL shutdown", desc: "Shut down Jenkins server" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL quiet-down", desc: "Enter quiet mode (no new builds)" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL cancel-quiet-down", desc: "Cancel quiet mode" },
      ],
    },
    {
      title: "CLI Job & Build Management",
      span: 1,
      blocks: [
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL list-jobs", desc: "List all configured jobs" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL build JobName -p K=V", desc: "Build job with parameters" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL build JobName -s -v", desc: "Build, wait, stream logs" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL get-job JobName > job.xml", desc: "Export job configuration XML" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL create-job NewJob < job.xml", desc: "Create job from XML" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL update-job JobName < new.xml", desc: "Update job configuration XML" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL copy-job SrcJob NewJob", desc: "Copy an existing job" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL delete-job JobName", desc: "Delete a job configuration" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL enable-job JobName", desc: "Enable a disabled job" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL disable-job JobName", desc: "Disable a job" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL console JobName 10", desc: "Print console log for build 10" },
      ],
    },
    {
      title: "CLI Plugin & Node Operations",
      span: 1,
      blocks: [
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL list-plugins", desc: "List installed plugins" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL install-plugin git-plugin", desc: "Install plugin by ID" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL install-plugin /path/file.hpi", desc: "Install plugin from file" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL reload-configuration", desc: "Reload configuration from disk" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL create-node < node.xml", desc: "Create build agent node" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL delete-node AgentName", desc: "Delete build agent node" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL connect-node AgentName", desc: "Reconnect build agent" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL disconnect-node AgentName", desc: "Disconnect build agent" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL offline-node Agent -m \"msg\"", desc: "Set agent offline with message" },
        { type: "row", cmd: "java -jar jenkins-cli.jar -s URL online-node AgentName", desc: "Set agent online" },
      ],
    },
    {
      title: "Jenkins REST API Examples",
      span: 1,
      blocks: [
        { type: "row", cmd: "curl -u user:token URL/crumbIssuer/api/xml", desc: "Get CSRF protection crumb" },
        { type: "row", cmd: "curl -X POST -u u:t URL/job/J/build", desc: "Trigger standard build" },
        { type: "row", cmd: "curl -X POST -u u:t URL/job/J/buildWithParameters?K=V", desc: "Trigger parameterized build" },
        { type: "row", cmd: "curl -u u:t URL/job/J/api/json?pretty=true", desc: "Get job details in JSON" },
        { type: "row", cmd: "curl -u u:t URL/job/J/12/api/json", desc: "Get build 12 details" },
        { type: "row", cmd: "curl -u u:t URL/job/J/12/consoleText", desc: "Get plain text build logs" },
        { type: "row", cmd: "curl -X POST -u u:t URL/job/J/12/stop", desc: "Abort running build 12" },
        { type: "row", cmd: "curl -X POST -u u:t URL/job/J/config.xml", desc: "Fetch config XML" },
        { type: "row", cmd: "curl -u u:t URL/queue/api/json", desc: "View the build queue status" },
        { type: "row", cmd: "curl -X POST -u u:t URL/pluginManager/installNecessaryPlugins", desc: "Batch install plugins" },
      ],
    },
    {
      title: "Groovy Script Console Snippets",
      span: 1,
      blocks: [
        { type: "code", text: "// List all installed plugins\nJenkins.instance.pluginManager.plugins.each {\n  println \"${it.shortName}: ${it.version}\"\n}" },
        { type: "code", text: "// Cancel all items in the build queue\nJenkins.instance.queue.clear()" },
        { type: "code", text: "// Safely clean up workspace of all projects\nfor (item in Jenkins.instance.getAllItems(AbstractProject)) {\n  item.doWipeOutWorkspace()\n}" },
        { type: "code", text: "// Enable/Disable all jobs\nJenkins.instance.getAllItems(Job).each { job ->\n  job.disabled = true\n  job.save()\n}" },
      ],
    },
    {
      title: "Declarative Pipeline Basics",
      span: 1,
      blocks: [
        { type: "code", text: "pipeline {\n    agent any\n    environment {\n        APP_ENV = 'production'\n    }\n    options {\n        timeout(time: 1, unit: 'HOURS')\n        ansiColor('xterm')\n    }\n    stages {\n        stage('Build') {\n            steps {\n                echo 'Building...'\n            }\n        }\n    }\n    post {\n        always {\n            cleanWs()\n        }\n    }\n}" },
      ],
    },
    {
      title: "Scripted Pipeline & Steps",
      span: 1,
      blocks: [
        { type: "code", text: "node('linux-agent') {\n    try {\n        stage('Checkout') {\n            checkout scm\n        }\n        stage('Build') {\n            sh './gradlew build'\n        }\n    } catch(err) {\n        currentBuild.result = 'FAILURE'\n        throw err\n    } finally {\n        echo \"Cleaned up.\"\n    }\n}" },
      ],
    },
    {
      title: "Common Pipeline Steps",
      span: 1,
      blocks: [
        { type: "row", cmd: "sh './script.sh'", desc: "Execute Shell (Linux/Unix)" },
        { type: "row", cmd: "bat 'run.bat'", desc: "Execute Batch (Windows)" },
        { type: "row", cmd: "powershell 'Write-Host \"Hi\"'", desc: "Execute PowerShell script" },
        { type: "row", cmd: "git url: 'https://...', branch: 'main'", desc: "Clone Git repository" },
        { type: "row", cmd: "archiveArtifacts artifacts: '**/tar.gz'", desc: "Archive build artifacts" },
        { type: "row", cmd: "junit '**/build/test-results/*.xml'", desc: "Publish JUnit test results" },
        { type: "row", cmd: "publishHTML target: [allowMissing: false]", desc: "Publish static HTML reports" },
        { type: "row", cmd: "stash name: 'src', include: '**/*.java'", desc: "Save files for other stages" },
        { type: "row", cmd: "unstash 'src'", desc: "Retrieve stashed files" },
        { type: "row", cmd: "input message: 'Promote to prod?'", desc: "Prompt user for manual action" },
      ],
    },
    {
      title: "Credentials Management",
      span: 1,
      blocks: [
        { type: "code", text: "// Use Username/Password\nwithCredentials([usernamePassword(\n    credentialsId: 'my-credentials-id',\n    usernameVariable: 'USER',\n    passwordVariable: 'PASS')]) {\n    sh 'curl -u $USER:$PASS http://api.com'\n}" },
        { type: "code", text: "// Use Secret Text\nwithCredentials([string(\n    credentialsId: 'my-token-id',\n    variable: 'API_TOKEN')]) {\n    sh 'curl -H \"Auth: $API_TOKEN\" URL'\n}" },
      ],
    },
    {
      title: "Docker in Pipelines",
      span: 1,
      blocks: [
        { type: "code", text: "// Run inside a Docker container\nagent {\n    docker { image 'node:20-alpine' }\n}\n\n// Inline Docker usage (Scripted)\ndocker.image('maven:3-openjdk-17').inside {\n    sh 'mvn clean install'\n}" },
        { type: "code", text: "// Build & Push Docker Image\ndocker.withRegistry('https://ghcr.io', 'registry-creds') {\n    def img = docker.build(\"my-app:${env.BUILD_NUMBER}\")\n    img.push()\n}" },
      ],
    },
    {
      title: "Build Triggers & Parameters",
      span: 1,
      blocks: [
        { type: "code", text: "// Triggers block\ntriggers {\n    cron('H 4 * * 1-5') // Mon-Fri 4 AM\n    pollSCM('H/15 * * * *') // Poll SCM\n    upstream(upstreamProjects: 'BuildAll', threshold: hudson.model.Result.SUCCESS)\n}" },
        { type: "code", text: "// Parameters block\nparameters {\n    string(name: 'DEPLOY_ENV', defaultValue: 'dev', description: 'Target env')\n    booleanParam(name: 'RUN_TESTS', defaultValue: true)\n    choice(name: 'BROWSER', choices: ['Chrome', 'Firefox', 'Safari'])\n}" },
      ],
    },
    {
      title: "Troubleshooting & Maintenance",
      span: 1,
      blocks: [
        { type: "row", cmd: "java -XX:+UnlockDiagnosticVMOptions ...", desc: "JVM diagnostic options" },
        { type: "row", cmd: "export JENKINS_HOME=/var/jenkins_home", desc: "Define Jenkins home dir" },
        { type: "row", cmd: "Thread.getAllStackTraces().keySet()", desc: "Get Groovy thread dumps" },
        { type: "row", cmd: "System.setProperty(\"hudson.model.DirectoryBrowserSupport.CSP\", \"\")", desc: "Disable CSP (allow inline CSS)" },
        { type: "row", cmd: "ls $JENKINS_HOME/plugins", desc: "View installed plugins directly" },
        { type: "row", cmd: "tail -f /var/log/jenkins/jenkins.log", desc: "Monitor server master logs" },
        { type: "row", cmd: "/safeRestart", desc: "Append to URL for safe restart" },
        { type: "row", cmd: "/reload", desc: "Append to URL to reload config" },
      ],
    },
  ],
};

export default data;
