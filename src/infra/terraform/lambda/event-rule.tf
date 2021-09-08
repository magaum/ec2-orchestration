
resource "aws_cloudwatch_event_rule" "ec2_state_event_rule" {
  name                = "ChangeEC2State"
  description         = "ScheduledRule to 7 a.m. and 7 p.m. (GMT-3)"
  schedule_expression = "cron(0 11/10 * * ? *)"
}

resource "aws_cloudwatch_event_target" "lambda_trigger" {
  rule      = aws_cloudwatch_event_rule.ec2_state_event_rule.name
  target_id = "ChangeEC2StateTarget"
  arn       = aws_lambda_function.ec2_state_manager.arn
}
