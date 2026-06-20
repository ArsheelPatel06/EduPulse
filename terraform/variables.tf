variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "db_password" {
  description = "Master password for RDS (should be injected by Vault/Secrets Manager in pipeline)"
  type        = string
  sensitive   = true
  default     = "super_secure_placeholder"
}
