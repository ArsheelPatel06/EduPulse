terraform {
  backend "s3" {
    bucket         = "edupulse-tf-state-backend"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
