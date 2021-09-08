variable "ec2_ami" {
  description = "Amazon Linux 2 AMI (HVM)"
  default = "ami-087c17d1fe0178315"
}

variable "ec2_instance_type" {
  description = "EC2 instance type"
  default = "t2.micro"
}

variable "key_pair" {
  description = "key pair to access EC2"
  default = "ec2-lab"
}
