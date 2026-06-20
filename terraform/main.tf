module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr = "10.0.0.0/16"
  environment = var.environment
}

module "iam" {
  source = "./modules/iam"
  
  environment = var.environment
}

module "ecr" {
  source = "./modules/ecr"
  
  environment = var.environment
}

module "eks" {
  source = "./modules/eks"
  
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  eks_role_arn    = module.iam.eks_cluster_role_arn
  environment     = var.environment
}

module "rds" {
  source = "./modules/rds"
  
  vpc_id             = module.vpc.vpc_id
  private_subnets    = module.vpc.private_subnets
  db_password        = var.db_password
  environment        = var.environment
}

module "s3" {
  source = "./modules/s3"
  
  environment = var.environment
}
