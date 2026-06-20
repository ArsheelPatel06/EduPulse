variable "vpc_id" {}
variable "private_subnets" { type = list(string) }
variable "db_password" {}
variable "environment" {}

resource "aws_db_subnet_group" "main" {
  name       = "edupulse-${var.environment}-db-subnet"
  subnet_ids = var.private_subnets
}

resource "aws_db_instance" "postgres" {
  identifier           = "edupulse-${var.environment}-db"
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  username             = "edupulse_user"
  password             = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  
  # Crucial Disaster Recovery Features
  multi_az             = true
  storage_encrypted    = true
  backup_retention_period = 7
  skip_final_snapshot  = true
}

output "db_instance_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
