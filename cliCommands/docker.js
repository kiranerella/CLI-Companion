module.exports = [
    { 
        label: "[Docker] Build Image", 
        command: "docker build -t your_image_name .",
        category: "Docker"  
    },
    { 
        label: "[Docker] Run Container", 
        command: "docker run -it your_image_name",
        category: "Docker"  
    },
    { 
        label: "[Docker] Stop All Containers", 
        command: "docker stop $(docker ps -aq)",
        category: "Docker" 
    },
    { 
        label: "[Docker] Remove All Containers", 
        command: "docker rm $(docker ps -aq)",
        category: "Docker" 
    },
    { 
        label: "[Docker] Prune All", 
        command: "docker system prune -a",
        category: "Docker" 
    },
    { 
        label: "[Docker]: Run Container with port", 
        command: "docker run -d -p 8080:80 <image-name>",
        category: "Docker" 
    },
    { 
        label: "[Docker]: View Logs", 
        command: "docker logs -f <container-id>",
        category: "Docker" 
    },
];