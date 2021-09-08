resource "aws_s3_bucket" "lambda_bucket" {
  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket_object" "lambda_zip_file" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "lambda.zip"
  source = "lambda.zip"

  etag = filemd5("lambda.zip")
}
