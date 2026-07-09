export interface RosettaTask {
  id: string;
  category: string;
  task: string;
  aws?: string;
  azure?: string;
  gcloud?: string;
  kubectl?: string;
  notes?: string;
}

export const rosettaTasks: RosettaTask[] = [
  // ------------------------------------------------------------- Compute
  {
    id: "list-vms",
    category: "Compute",
    task: "List running VMs",
    aws: "aws ec2 describe-instances",
    azure: "az vm list -d -o table",
    gcloud: "gcloud compute instances list",
  },
  {
    id: "create-vm",
    category: "Compute",
    task: "Create a VM",
    aws: "aws ec2 run-instances --image-id ami-xxxx --instance-type t3.micro",
    azure: "az vm create --resource-group myRG --name myVM --image Ubuntu2204",
    gcloud: "gcloud compute instances create my-vm --zone=us-central1-a --machine-type=e2-medium",
  },
  {
    id: "stop-vm",
    category: "Compute",
    task: "Stop a VM",
    aws: "aws ec2 stop-instances --instance-ids i-xxxx",
    azure: "az vm stop --resource-group myRG --name myVM",
    gcloud: "gcloud compute instances stop my-vm --zone=us-central1-a",
  },
  {
    id: "delete-vm",
    category: "Compute",
    task: "Delete/terminate a VM",
    aws: "aws ec2 terminate-instances --instance-ids i-xxxx",
    azure: "az vm delete --resource-group myRG --name myVM",
    gcloud: "gcloud compute instances delete my-vm --zone=us-central1-a",
  },
  {
    id: "ssh-vm",
    category: "Compute",
    task: "SSH into a VM",
    aws: "aws ec2-instance-connect ssh --instance-id i-xxxx",
    azure: "az ssh vm --resource-group myRG --name myVM",
    gcloud: "gcloud compute ssh my-vm --zone=us-central1-a",
  },
  {
    id: "resize-vm",
    category: "Compute",
    task: "Resize/change VM instance type",
    aws: "aws ec2 modify-instance-attribute --instance-id i-xxxx --instance-type t3.large",
    azure: "az vm resize --resource-group myRG --name myVM --size Standard_D2s_v3",
    gcloud: "gcloud compute instances set-machine-type my-vm --machine-type=e2-standard-2",
    notes: "The VM must be stopped first on most providers.",
  },
  {
    id: "list-vm-images",
    category: "Compute",
    task: "List available OS images",
    aws: "aws ec2 describe-images --owners self amazon",
    azure: "az vm image list -o table",
    gcloud: "gcloud compute images list",
  },

  // ------------------------------------------------------------- Storage
  {
    id: "create-bucket",
    category: "Storage",
    task: "Create an object storage bucket",
    aws: "aws s3 mb s3://my-bucket",
    azure: "az storage container create --name my-container --account-name myaccount",
    gcloud: "gcloud storage buckets create gs://my-bucket",
  },
  {
    id: "list-buckets",
    category: "Storage",
    task: "List storage buckets",
    aws: "aws s3 ls",
    azure: "az storage account list -o table",
    gcloud: "gcloud storage buckets list",
  },
  {
    id: "upload-object",
    category: "Storage",
    task: "Upload a file to object storage",
    aws: "aws s3 cp ./file.txt s3://my-bucket/",
    azure: "az storage blob upload --container-name my-container --file ./file.txt --name file.txt",
    gcloud: "gcloud storage cp ./file.txt gs://my-bucket/",
  },
  {
    id: "sync-directory",
    category: "Storage",
    task: "Sync a local directory to a bucket",
    aws: "aws s3 sync ./dist s3://my-bucket/",
    azure: "az storage blob sync --container my-container --source ./dist",
    gcloud: "gcloud storage rsync ./dist gs://my-bucket/ --recursive",
  },
  {
    id: "delete-bucket",
    category: "Storage",
    task: "Delete a storage bucket",
    aws: "aws s3 rb s3://my-bucket --force",
    azure: "az storage container delete --name my-container --account-name myaccount",
    gcloud: "gcloud storage buckets delete gs://my-bucket",
  },
  {
    id: "set-bucket-public",
    category: "Storage",
    task: "Make a bucket/object publicly readable",
    aws: "aws s3api put-bucket-acl --bucket my-bucket --acl public-read",
    azure: "az storage container set-permission --name my-container --public-access blob --account-name myaccount",
    gcloud: "gcloud storage buckets add-iam-policy-binding gs://my-bucket --member=allUsers --role=roles/storage.objectViewer",
    notes: "Public buckets are a common misconfiguration source — double-check this is intentional.",
  },

  // ---------------------------------------------------------- Networking
  {
    id: "create-vpc",
    category: "Networking",
    task: "Create a virtual network (VPC/VNet)",
    aws: "aws ec2 create-vpc --cidr-block 10.0.0.0/16",
    azure: "az network vnet create --resource-group myRG --name myVNet --address-prefix 10.0.0.0/16",
    gcloud: "gcloud compute networks create my-vpc --subnet-mode=custom",
  },
  {
    id: "create-subnet",
    category: "Networking",
    task: "Create a subnet",
    aws: "aws ec2 create-subnet --vpc-id vpc-xxxx --cidr-block 10.0.1.0/24",
    azure: "az network vnet subnet create --resource-group myRG --vnet-name myVNet --name mySubnet --address-prefix 10.0.1.0/24",
    gcloud: "gcloud compute networks subnets create my-subnet --network=my-vpc --range=10.0.1.0/24 --region=us-central1",
  },
  {
    id: "create-firewall-rule",
    category: "Networking",
    task: "Open a firewall/security group port",
    aws: "aws ec2 authorize-security-group-ingress --group-id sg-xxxx --protocol tcp --port 443 --cidr 0.0.0.0/0",
    azure: "az network nsg rule create --resource-group myRG --nsg-name myNSG --name AllowHTTPS --priority 100 --destination-port-ranges 443",
    gcloud: "gcloud compute firewall-rules create allow-https --allow=tcp:443",
  },
  {
    id: "reserve-static-ip",
    category: "Networking",
    task: "Reserve a static public IP",
    aws: "aws ec2 allocate-address",
    azure: "az network public-ip create --resource-group myRG --name myIP --sku Standard",
    gcloud: "gcloud compute addresses create my-ip --region=us-central1",
  },
  {
    id: "create-load-balancer",
    category: "Networking",
    task: "Create a load balancer",
    aws: "aws elbv2 create-load-balancer --name my-lb --subnets subnet-xxxx",
    azure: "az network lb create --resource-group myRG --name myLB",
    gcloud: "gcloud compute forwarding-rules create my-lb --global",
  },

  // --------------------------------------------------------- IAM/Security
  {
    id: "create-service-account",
    category: "IAM & Security",
    task: "Create a service account / service principal",
    aws: "aws iam create-role --role-name my-role --assume-role-policy-document file://trust.json",
    azure: "az ad sp create-for-rbac --name my-sp",
    gcloud: "gcloud iam service-accounts create my-sa",
  },
  {
    id: "assign-role",
    category: "IAM & Security",
    task: "Assign a role/permission to a principal",
    aws: "aws iam attach-role-policy --role-name my-role --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess",
    azure: "az role assignment create --assignee <principal-id> --role Reader --scope /subscriptions/<sub-id>",
    gcloud: "gcloud projects add-iam-policy-binding my-project --member=serviceAccount:my-sa@my-project.iam.gserviceaccount.com --role=roles/viewer",
  },
  {
    id: "list-iam-users",
    category: "IAM & Security",
    task: "List users/identities",
    aws: "aws iam list-users",
    azure: "az ad user list -o table",
    gcloud: "gcloud iam service-accounts list",
  },
  {
    id: "generate-access-key",
    category: "IAM & Security",
    task: "Generate a programmatic access key",
    aws: "aws iam create-access-key --user-name my-user",
    azure: "az ad app credential reset --id <app-id>",
    gcloud: "gcloud iam service-accounts keys create key.json --iam-account=my-sa@my-project.iam.gserviceaccount.com",
    notes: "Rotate these regularly and never commit them to source control.",
  },
  {
    id: "current-identity",
    category: "IAM & Security",
    task: "Show the identity you're currently authenticated as",
    aws: "aws sts get-caller-identity",
    azure: "az account show",
    gcloud: "gcloud auth list",
  },

  // --------------------------------------------------------- Kubernetes
  {
    id: "create-k8s-cluster",
    category: "Kubernetes (managed)",
    task: "Create a managed Kubernetes cluster",
    aws: "aws eks create-cluster --name my-cluster --role-arn <role-arn> --resources-vpc-config subnetIds=<ids>",
    azure: "az aks create --resource-group myRG --name myAKS --node-count 3",
    gcloud: "gcloud container clusters create my-cluster --num-nodes=3 --zone=us-central1-a",
  },
  {
    id: "get-cluster-credentials",
    category: "Kubernetes (managed)",
    task: "Fetch cluster credentials for kubectl",
    aws: "aws eks update-kubeconfig --name my-cluster",
    azure: "az aks get-credentials --resource-group myRG --name myAKS",
    gcloud: "gcloud container clusters get-credentials my-cluster --zone=us-central1-a",
    notes: "After this, all kubectl commands below work identically regardless of cloud.",
  },
  {
    id: "list-clusters",
    category: "Kubernetes (managed)",
    task: "List managed clusters",
    aws: "aws eks list-clusters",
    azure: "az aks list -o table",
    gcloud: "gcloud container clusters list",
  },
  {
    id: "delete-cluster",
    category: "Kubernetes (managed)",
    task: "Delete a managed cluster",
    aws: "aws eks delete-cluster --name my-cluster",
    azure: "az aks delete --resource-group myRG --name myAKS",
    gcloud: "gcloud container clusters delete my-cluster --zone=us-central1-a",
  },
  {
    id: "k8s-list-pods",
    category: "Kubernetes (managed)",
    task: "List pods (cloud-agnostic, once connected)",
    kubectl: "kubectl get pods -A",
    notes: "Identical across AWS/Azure/GCP once kubeconfig is set — this is the point of kubectl.",
  },
  {
    id: "k8s-view-logs",
    category: "Kubernetes (managed)",
    task: "View pod logs (cloud-agnostic)",
    kubectl: "kubectl logs <pod> -f",
  },
  {
    id: "k8s-scale-deployment",
    category: "Kubernetes (managed)",
    task: "Scale a deployment (cloud-agnostic)",
    kubectl: "kubectl scale deployment my-app --replicas=5",
  },

  // ------------------------------------------------------- Serverless
  {
    id: "deploy-function",
    category: "Serverless",
    task: "Deploy a serverless function",
    aws: "aws lambda create-function --function-name my-fn --runtime nodejs20.x --handler index.handler --zip-file fileb://fn.zip --role <role-arn>",
    azure: "az functionapp create --resource-group myRG --name my-fn --consumption-plan-location eastus --runtime node",
    gcloud: "gcloud functions deploy my-fn --runtime=nodejs20 --trigger-http --entry-point=handler",
  },
  {
    id: "invoke-function",
    category: "Serverless",
    task: "Invoke a function manually",
    aws: "aws lambda invoke --function-name my-fn output.json",
    azure: "az functionapp function invoke --resource-group myRG --name my-fn --function-name my-fn",
    gcloud: "gcloud functions call my-fn",
  },
  {
    id: "function-logs",
    category: "Serverless",
    task: "View function logs",
    aws: "aws logs tail /aws/lambda/my-fn --follow",
    azure: "az functionapp logs tail --resource-group myRG --name my-fn",
    gcloud: "gcloud functions logs read my-fn",
  },

  // ------------------------------------------------------------ Databases
  {
    id: "create-managed-db",
    category: "Databases",
    task: "Create a managed relational database",
    aws: "aws rds create-db-instance --db-instance-identifier my-db --engine postgres --db-instance-class db.t3.micro --allocated-storage 20",
    azure: "az postgres flexible-server create --resource-group myRG --name my-db",
    gcloud: "gcloud sql instances create my-db --database-version=POSTGRES_15 --tier=db-f1-micro",
  },
  {
    id: "list-managed-dbs",
    category: "Databases",
    task: "List managed database instances",
    aws: "aws rds describe-db-instances",
    azure: "az postgres flexible-server list -o table",
    gcloud: "gcloud sql instances list",
  },
  {
    id: "db-connect-string",
    category: "Databases",
    task: "Get a database connection endpoint",
    aws: "aws rds describe-db-instances --query 'DBInstances[0].Endpoint'",
    azure: "az postgres flexible-server show --resource-group myRG --name my-db --query fullyQualifiedDomainName",
    gcloud: "gcloud sql instances describe my-db --format='value(connectionName)'",
  },

  // ------------------------------------------------------ Container Registry
  {
    id: "create-registry",
    category: "Container Registry",
    task: "Create a container image registry",
    aws: "aws ecr create-repository --repository-name my-app",
    azure: "az acr create --resource-group myRG --name myacr --sku Basic",
    gcloud: "gcloud artifacts repositories create my-repo --repository-format=docker --location=us-central1",
  },
  {
    id: "registry-login",
    category: "Container Registry",
    task: "Authenticate Docker to the registry",
    aws: "aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com",
    azure: "az acr login --name myacr",
    gcloud: "gcloud auth configure-docker us-central1-docker.pkg.dev",
  },
  {
    id: "push-image",
    category: "Container Registry",
    task: "Push a container image",
    aws: "docker push <account>.dkr.ecr.<region>.amazonaws.com/my-app:latest",
    azure: "docker push myacr.azurecr.io/my-app:latest",
    gcloud: "docker push us-central1-docker.pkg.dev/my-project/my-repo/my-app:latest",
  },

  // -------------------------------------------------------- Monitoring
  {
    id: "tail-logs",
    category: "Monitoring & Logs",
    task: "Tail application/service logs",
    aws: "aws logs tail /my/log/group --follow",
    azure: "az monitor log-analytics query -w <workspace-id> --analytics-query 'AppTraces | take 50'",
    gcloud: "gcloud logging read 'resource.type=cloud_run_revision' --limit 50",
  },
  {
    id: "list-alerts",
    category: "Monitoring & Logs",
    task: "List active monitoring alerts",
    aws: "aws cloudwatch describe-alarms",
    azure: "az monitor alert list -o table",
    gcloud: "gcloud alpha monitoring policies list",
  },
  {
    id: "create-alert",
    category: "Monitoring & Logs",
    task: "Create a metric alert",
    aws: "aws cloudwatch put-metric-alarm --alarm-name high-cpu --metric-name CPUUtilization --threshold 80 --comparison-operator GreaterThanThreshold --evaluation-periods 2 --period 300 --statistic Average --namespace AWS/EC2",
    azure: "az monitor metrics alert create --resource-group myRG --name high-cpu --scopes <resource-id> --condition 'avg Percentage CPU > 80'",
    gcloud: "gcloud alpha monitoring policies create --notification-channels=<channel-id> --display-name=high-cpu",
  },

  // ---------------------------------------------------------- Secrets
  {
    id: "create-secret",
    category: "Secrets Management",
    task: "Store a secret",
    aws: "aws secretsmanager create-secret --name my-secret --secret-string 'value'",
    azure: "az keyvault secret set --vault-name myVault --name my-secret --value 'value'",
    gcloud: "gcloud secrets create my-secret --data-file=./secret.txt",
    kubectl: "kubectl create secret generic my-secret --from-literal=key=value",
  },
  {
    id: "read-secret",
    category: "Secrets Management",
    task: "Read a secret value",
    aws: "aws secretsmanager get-secret-value --secret-id my-secret",
    azure: "az keyvault secret show --vault-name myVault --name my-secret",
    gcloud: "gcloud secrets versions access latest --secret=my-secret",
    kubectl: "kubectl get secret my-secret -o jsonpath='{.data.key}' | base64 -d",
  },
  {
    id: "rotate-secret",
    category: "Secrets Management",
    task: "Rotate/update a secret value",
    aws: "aws secretsmanager put-secret-value --secret-id my-secret --secret-string 'new-value'",
    azure: "az keyvault secret set --vault-name myVault --name my-secret --value 'new-value'",
    gcloud: "gcloud secrets versions add my-secret --data-file=./new-secret.txt",
  },

  // ------------------------------------------------------------ Billing/Cost
  {
    id: "estimate-cost",
    category: "Billing & Cost",
    task: "Get current month's cost/usage",
    aws: "aws ce get-cost-and-usage --time-period Start=2026-07-01,End=2026-07-31 --granularity MONTHLY --metrics BlendedCost",
    azure: "az consumption usage list",
    gcloud: "gcloud billing accounts list",
  },
  {
    id: "list-resources",
    category: "Billing & Cost",
    task: "List all resources in an account/project (for auditing)",
    aws: "aws resourcegroupstaggingapi get-resources",
    azure: "az resource list -o table",
    gcloud: "gcloud asset search-all-resources --scope=projects/my-project",
  },

  // ------------------------------------------------------------ DNS
  {
    id: "create-dns-zone",
    category: "DNS",
    task: "Create a DNS hosted zone",
    aws: "aws route53 create-hosted-zone --name example.com --caller-reference $(date +%s)",
    azure: "az network dns zone create --resource-group myRG --name example.com",
    gcloud: "gcloud dns managed-zones create my-zone --dns-name=example.com --description='example zone'",
  },
  {
    id: "add-dns-record",
    category: "DNS",
    task: "Add/update a DNS record",
    aws: "aws route53 change-resource-record-sets --hosted-zone-id ZXXX --change-batch file://record.json",
    azure: "az network dns record-set a add-record --resource-group myRG --zone-name example.com --record-set-name www --ipv4-address 1.2.3.4",
    gcloud: "gcloud dns record-sets create www.example.com --zone=my-zone --type=A --ttl=300 --rrdatas=1.2.3.4",
  },
];
