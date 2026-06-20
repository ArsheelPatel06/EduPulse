# 9. Disaster Recovery Plan
## Backup Strategy
- RDS Automated Backups (Retention: 7 Days)
- S3 Versioning Enabled
- Terraform State Stored in S3 (DynamoDB State Locking)

## Recovery Scenarios
### Database Failure
- Restore latest RDS snapshot
- Redeploy backend pods
- Reconnect application

### Pod Failure
- Kubernetes self-healing
- ReplicaSet creates new pod
- Traffic automatically redirected

### Region Failure
- Infrastructure recreated using Terraform
- Docker images restored from ECR
- Data restored from RDS snapshots
