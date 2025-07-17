module.exports = [
  { 
    label: "[Terraform] Init", 
    command: "terraform init",
    category: "Terraform",
    favorite: false,
    tags: ["terraform", "init", "iac", "setup", "provider"]
  },
  { 
    label: "[Terraform] Plan", 
    command: "terraform plan",
    category: "Terraform",
    favorite: false,
    tags: ["terraform", "plan", "preview", "iac", "infra"]
  },
  { 
    label: "[Terraform] Apply", 
    command: "terraform apply -auto-approve",
    category: "Terraform",
    favorite: false,
    tags: ["terraform", "apply", "deploy", "iac", "cloud"]
  },
  { 
    label: "[Terraform] Destroy", 
    command: "terraform destroy -auto-approve",
    category: "Terraform",
    favorite: false,
    tags: ["terraform", "destroy", "teardown", "infra", "iac"]
  }
];
