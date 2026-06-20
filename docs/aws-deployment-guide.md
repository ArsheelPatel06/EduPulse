# AWS Deployment Guide

This guide provides the exact workflow to transition the EduPulse infrastructure from Terraform provisioning into full operational status.

## 1. ECR Push Workflow
Before deploying to Kubernetes, the Docker images must be pushed to the Amazon ECR registry created by Terraform.
```bash
# 1. Authenticate Docker to Amazon ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# 2. Tag Local Images
docker tag edupulse-frontend:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/edupulse-frontend:v1
docker tag edupulse-backend:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/edupulse-backend:v1

# 3. Push to ECR
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/edupulse-frontend:v1
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/edupulse-backend:v1
```

## 2. EKS Cluster Setup
Connect your local `kubectl` to the newly provisioned Amazon EKS cluster.
```bash
aws eks update-kubeconfig --region us-east-1 --name edupulse-prod-cluster
kubectl get nodes # Verify worker nodes are active
```

## 3. Vault Deployment
Vault must be deployed to handle secrets before the applications boot up.
```bash
# Apply Vault configuration (assuming Vault is deployed via Helm or standalone pods)
kubectl apply -f security/vault/
# Run initialization script to populate secrets
./security/vault/init.sh
```

## 4. RDS & S3 Configuration
Terraform has already provisioned RDS and S3. 
- The **RDS Connection URL** has been injected into Vault.
- The **S3 Bucket Name** has been exported to the backend configuration.
Ensure that the Database Migrations script is run against the RDS endpoint before launching the backend pods.

## 5. Application Deployment (Frontend & Backend)
Deploy the core applications using the Kubernetes manifests.
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/config/
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
```

## 6. Observability Deployment (Prometheus, Grafana, ELK)
Deploy the monitoring and logging stacks.
```bash
# Deploy Prometheus & Grafana
kubectl apply -f monitoring/prometheus/
kubectl apply -f monitoring/grafana/

# Deploy ELK Stack & Filebeat
kubectl apply -f logging/elasticsearch/
kubectl apply -f logging/logstash/
kubectl apply -f logging/kibana/
kubectl apply -f logging/filebeat/
```

## 7. Ingress Setup & DNS Routing
Deploy the NGINX Ingress controller and route traffic.
```bash
# Apply Ingress Rules
kubectl apply -f k8s/ingress/ingress.yaml

# Extract the AWS Application Load Balancer DNS
kubectl get ingress -n edupulse
```
*Note: Create a CNAME record in Route53 pointing `edupulse.com` to the extracted ALB DNS name.*
