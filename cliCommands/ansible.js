module.exports = [
  {
    label: "[Ansible] Run Playbook",
    command: "ansible-playbook -i inventory site.yml",
    category: "Ansible"
  },
  {
    label: "[Ansible] Ping Hosts",
    command: "ansible all -m ping -i inventory",
    category: "Ansible"
  },
  {
    label: "[Ansible] Check Syntax",
    command: "ansible-playbook --syntax-check site.yml",
    category: "Ansible"
  },
  {
    label: "[Ansible] List Hosts",
    command: "ansible all --list-hosts -i inventory",
    category: "Ansible"
  }
];
