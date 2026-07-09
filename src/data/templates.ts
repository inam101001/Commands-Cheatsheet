export interface ConfigTemplate {
  id: string;
  icon: string;
  name: string;
  description: string;
  title: string;
  code: string;
}

export const templates: ConfigTemplate[] = [
  {
    id: "compose",
    icon: "🐳",
    name: "Docker Compose",
    description: "Multi-service database + web stack setup",
    title: "Docker Compose Configuration",
    code: `version: '3.8'

services:
  web:
    image: node:20-alpine
    container_name: web_app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    container_name: db_postgres
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secretpass
      - POSTGRES_DB=app_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:`,
  },
  {
    id: "k8s-pod",
    icon: "☸️",
    name: "Kubernetes Pod",
    description: "Simple pod with Configmap/Secret specs",
    title: "Kubernetes YAML simple Pod template",
    code: `apiVersion: v1
kind: Pod
metadata:
  name: backend-service-pod
  labels:
    app: backend
    env: production
spec:
  containers:
  - name: server
    image: nginx:1.25-alpine
    ports:
    - containerPort: 80
    env:
    - name: API_SECRET_TOKEN
      valueFrom:
        secretKeyRef:
          name: app-secrets
          key: token
    volumeMounts:
    - name: data-storage
      mountPath: /usr/share/nginx/html
  volumes:
  - name: data-storage
    persistentVolumeClaim:
      claimName: static-pvc`,
  },
  {
    id: "gh-actions",
    icon: "⚡",
    name: "GitHub Actions",
    description: "Standard Node.js CI test/build pipeline",
    title: "GitHub Actions Workflows CI YAML template",
    code: `name: Node.js Continuous Integration

on:
  push:
    branches: [ "main", "develop" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Setup Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run ESLint checks
      run: npm run lint

    - name: Execute automated tests
      run: npm test`,
  },
];
