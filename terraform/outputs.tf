output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "rds_endpoint" {
  value = module.rds.db_instance_endpoint
}

output "ecr_frontend_repository_url" {
  value = module.ecr.frontend_repo_url
}

output "ecr_backend_repository_url" {
  value = module.ecr.backend_repo_url
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}

output "vault_endpoint" {
  # In a full deployment, this would be an internal LB DNS pointing to Vault pods
  value = "vault.edupulse.internal"
}
