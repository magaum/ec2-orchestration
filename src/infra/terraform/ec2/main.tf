resource "aws_instance" "ec2_terraform" {
  ami                         = var.ec2_ami
  instance_type               = var.ec2_instance_type
  associate_public_ip_address = true
  key_name                    = var.key_pair
  security_groups             = [module.ssh_security_group.security_group_name]
  tags = {
    "Name"     = "ec2_terraform"
    "Shutdown" = true
  }
}

resource "aws_default_vpc" "default_vpc" {
  tags = {
    Name = "Default VPC"
  }
}

module "ssh_security_group" {
  source              = "terraform-aws-modules/security-group/aws//modules/ssh"
  version             = "~> 4.0"
  vpc_id              = aws_default_vpc.default_vpc.id
  name                = "Allow_public_ssh"
  description         = "Allow public ssh"
  ingress_cidr_blocks = ["0.0.0.0/0"]
}
