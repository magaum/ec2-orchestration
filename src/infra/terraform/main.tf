terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.region
}

module "ec2" {
  source = "./ec2"
}

module "lambda" {
  source = "./lambda"

  region = var.region
}
