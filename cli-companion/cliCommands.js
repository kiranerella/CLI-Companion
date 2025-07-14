module.exports = [
    {
      label: "Git Commit (Message)",
      command: "git commit -m 'Your message here'"
    },
    {
      label: "Docker Build",
      command: "docker build -t your_image_name ."
    },
    {
      label: "Kubernetes Apply",
      command: "kubectl apply -f deployment.yaml"
    },
    {
      label: "Ansible Playbook",
      command: "ansible-playbook site.yml -i inventory"
    },
    {
      label: "Terraform Init",
      command: "terraform init"
    }
  ];
  