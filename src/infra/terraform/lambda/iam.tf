resource "aws_iam_role" "lambda_role" {
  name = "LambdaStartStopEC2InstancesRole"

  assume_role_policy = file("${path.module}/role.json")
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "CloudwatchLoggingTerraform"
  description = "IAM policy for logging from a lambda"

  policy = file("${path.module}/cloudwatch-policy.json")
}

resource "aws_iam_policy" "ec2_change_state" {
  name        = "StartStopEC2InstancesTerraform"
  description = "IAM policy for change ec2 instances state (on/off) with a lambda"

  policy = file("${path.module}/ec2-turn-on-off-policy.json")
}

resource "aws_iam_role_policy_attachment" "lambda_logging_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

resource "aws_iam_role_policy_attachment" "ec2_change_state_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.ec2_change_state.arn
}
