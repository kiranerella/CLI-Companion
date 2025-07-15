module.exports = [
  // 🚀 Git Commands
  { label: "Git Init", command: "git init" },
  { label: "Git Clone", command: "git clone <repo_url>" },
  { label: "Git Commit", command: "git commit -m 'Your message'" },
  { label: "Git Push", command: "git push origin <branch>" },
  { label: "Git Pull", command: "git pull origin <branch>" },
  { label: "Git Branch (Create)", command: "git checkout -b <branch_name>" },
  { label: "Git Merge", command: "git merge <branch_name>" },
  { label: "Git Rebase", command: "git rebase <branch>" },
  { label: "Git Stash", command: "git stash && git stash pop" },
  { label: "Git: Clone Repository", command: "git clone <repo-url>" },
  { label: "Git: Create Branch", command: "git checkout -b <branch-name>" },
  { label: "Git: Stash Changes", command: "git stash" },
  { label: "Git: Rebase", command: "git rebase <branch>" },
  { label: "GitHub: Create Repo", command: "gh repo create" },
  { label: "GitHub: Clone Repo", command: "gh repo clone <owner>/<repo>" },
  { label: "GitHub: View PRs", command: "gh pr list" },

  // 🐳 Docker Commands
  { label: "Docker Build Image", command: "docker build -t your_image_name ." },
  { label: "Docker Run Container", command: "docker run -it your_image_name" },
  { label: "Docker Stop All Containers", command: "docker stop $(docker ps -aq)" },
  { label: "Docker Remove All Containers", command: "docker rm $(docker ps -aq)" },
  { label: "Docker Prune All", command: "docker system prune -a" },
  { label: "Docker: Run Container with port", command: "docker run -d -p 8080:80 <image-name>" },
  { label: "Docker: View Logs", command: "docker logs -f <container-id>" },

  // ☸️ Kubernetes Commands
  { label: "Kubectl Get Pods", command: "kubectl get pods" },
  { label: "Kubectl Apply", command: "kubectl apply -f deployment.yaml" },
  { label: "Kubectl Logs", command: "kubectl logs <pod_name>" },
  { label: "Kubectl Exec Into Pod", command: "kubectl exec -it <pod_name> -- /bin/bash" },
  { label: "K8s: Apply Manifest", command: "kubectl apply -f <file.yaml>" },
  { label: "K8s: Get All Pods", command: "kubectl get pods --all-namespaces" },
  { label: "K8s: Describe Pod", command: "kubectl describe pod <pod-name>" },

  // 📦 NPM Commands
  { label: "NPM Init", command: "npm init -y" },
  { label: "NPM Install Package", command: "npm install <package_name>" },
  { label: "NPM Run Script", command: "npm run <script>" },
  { label: "NPM Audit Fix", command: "npm audit fix" },
    // 📦 npm/yarn
  { label: "NPM: Install All Dependencies", command: "npm install" },
  { label: "Yarn: Install Package", command: "yarn add <package>" },
  { label: "NPM: Run Build", command: "npm run build" },

  // 🛠️ Terraform Commands
  { label: "Terraform Init", command: "terraform init" },
  { label: "Terraform Plan", command: "terraform plan" },
  { label: "Terraform Apply", command: "terraform apply -auto-approve" },
  { label: "Terraform Destroy", command: "terraform destroy -auto-approve" },

  // 🐍 Python Commands
  { label: "Python Create Venv", command: "python3 -m venv venv" },
  { label: "Python Activate Venv", command: "source venv/bin/activate" },
  { label: "Python Install Requirements", command: "pip install -r requirements.txt" },

  // 🧰 System Utilities
  { label: "Find Process by Port", command: "lsof -i :<port>" },
  { label: "Kill Process by PID", command: "kill -9 <pid>" },
  { label: "List All Env Vars", command: "printenv" },
  { label: "Clear DNS Cache (macOS)", command: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder" },

  // 📋 Ansible
  { label: "Ansible: Run Playbook", command: "ansible-playbook -i inventory site.yml" },
  { label: "Ansible: Ping Hosts", command: "ansible all -m ping -i inventory" },
  { label: "Ansible Ping", command: "ansible all -m ping -i inventory" },
  { label: "Ansible Playbook Run", command: "ansible-playbook -i inventory playbook.yml" }, 

  // ☁️ AWS CLI
  { label: "AWS: List EC2 Instances", command: "aws ec2 describe-instances" },
  { label: "AWS: Copy S3 Files", command: "aws s3 cp <src> <dest> --recursive" },
  { label: "AWS: Login ECR", command: "aws ecr get-login-password | docker login --username AWS --password-stdin <aws_account>.dkr.ecr.<region>.amazonaws.com" },

  // 🔒 Azure CLI
  { label: "Azure: Login", command: "az login" },
  { label: "Azure: List VMs", command: "az vm list -o table" },
  { label: "Azure: Set Subscription", command: "az account set --subscription <subscription-name>" },

  // 🧪 Python
  { label: "Python: Run Script", command: "python3 <script.py>" },
  { label: "Python: Create Virtual Env", command: "python3 -m venv venv" },
  { label: "Python: Activate Virtual Env", command: "source venv/bin/activate" },

  // 🖥️ Linux/Bash
  { label: "Bash: List Files", command: "ls -lah" },
  { label: "Bash: Disk Usage", command: "du -sh *" },
  { label: "Bash: Kill Port", command: "lsof -i :<port> | grep LISTEN | awk '{print $2}' | xargs kill -9" },

  // 🧰 Misc Utilities
  { label: "Curl: Test Endpoint", command: "curl -I https://example.com" },
  { label: "Node: Start App", command: "node index.js" },
  { label: "Nginx: Reload Config", command: "sudo nginx -s reload" },
];
