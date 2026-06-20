variable "environment" {}

resource "aws_s3_bucket" "case_studies" {
  bucket = "edupulse-${var.environment}-case-studies"
}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.case_studies.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encryption" {
  bucket = aws_s3_bucket.case_studies.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

output "bucket_name" {
  value = aws_s3_bucket.case_studies.bucket
}
