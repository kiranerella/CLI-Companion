module.exports = [
  {
    label: "[Kubernetes] Apply Config",
    command: "kubectl apply -f deployment.yaml",
    category: "Kubernetes",
    favorite: false,
    tags: ["k8s", "kubernetes", "pods", "deployment", "apply", "config", "namespace", "cluster"]
  },
  {
    label: "[Kubernetes] Get Pods",
    command: "kubectl get pods",
    category: "Kubernetes",
    favorite: false,
    tags: ["k8s", "kubernetes", "pods", "deployment", "apply", "config", "namespace", "cluster"]
  },
  {
    label: "[Kubernetes] Describe Pod",
    command: "kubectl describe pod <pod-name>",
    category: "Kubernetes",
    favorite: false,
    tags: ["k8s", "kubernetes", "pods", "deployment", "apply", "config", "namespace", "cluster"]
  },
  {
    label: "[Kubernetes] Delete Pod",
    command: "kubectl delete pod <pod-name>",
    category: "Kubernetes",
    favorite: false,
    tags: ["k8s", "kubernetes", "pods", "deployment", "apply", "config", "namespace", "cluster"]
  },
  {
    label: "[Kubernetes] Get Logs",
    command: "kubectl logs <pod-name>",
    category: "Kubernetes",
    favorite: false,
    tags: ["k8s", "kubernetes", "pods", "deployment", "apply", "config", "namespace", "cluster"]
  },
  {
    label: "[Kubernetes] Exec into Pod",
    command: "kubectl exec -it <pod-name> -- /bin/sh",
    category: "Kubernetes",
    favorite: false,
    tags: ["k8s", "kubernetes", "pods", "deployment", "apply", "config", "namespace", "cluster"]
  }
];
