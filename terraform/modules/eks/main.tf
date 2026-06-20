variable "vpc_id" {}
variable "private_subnets" { type = list(string) }
variable "eks_role_arn" {}
variable "environment" {}

resource "aws_eks_cluster" "main" {
  name     = "edupulse-${var.environment}-cluster"
  role_arn = var.eks_role_arn

  vpc_config {
    subnet_ids = var.private_subnets
  }
}

resource "aws_eks_node_group" "workers" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "edupulse-workers"
  node_role_arn   = var.eks_role_arn
  subnet_ids      = var.private_subnets

  scaling_config {
    desired_size = 2
    max_size     = 4
    min_size     = 2
  }
}

output "cluster_name" {
  value = aws_eks_cluster.main.name
}
