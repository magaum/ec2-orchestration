output "ec2_public_ip_address" {
  description = "EC2 Public IP"
  value = aws_instance.ec2_terraform.public_ip
}

output "ec2_public_dns" {
  description = "EC2 Public DNS"
  value = aws_instance.ec2_terraform.public_dns
}
