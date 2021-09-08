resource "aws_lambda_function" "ec2_state_manager" {
  s3_bucket        = aws_s3_bucket.lambda_bucket.id
  s3_key           = aws_s3_bucket_object.lambda_zip_file.key
  function_name    = var.lambda_function_name
  source_code_hash = filebase64sha256("lambda.zip")
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  timeout          = 5
  runtime          = "nodejs14.x"

  environment {
    variables = {
      REGION   = var.region
      SHUTDOWN = true
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logging_attachment,
    aws_iam_role_policy_attachment.ec2_change_state_attachment,
    aws_cloudwatch_log_group.lambda_log_group,
  ]
}

resource "aws_lambda_permission" "allow_cloudwatch_event_rule" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ec2_state_manager.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.ec2_state_event_rule.arn
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = 1
}
