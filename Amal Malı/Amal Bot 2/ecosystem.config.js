module.exports = {
  apps: [
    {
      name: "Mainframe",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Voucher"
    },
    {
      name: "Requirements",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Requirements"
    },
    {
      name: "Statistics",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Statistics"
    },
    {
      name: "Security_I",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_I"
    },
    {
      name: "Security_II",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_II"
    },
    {
      name: "Security_III",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_III"
    },
    {
      name: "Security_IV",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_IV"
    },
    {
      name: "Distributors",
      namespace: "Warexial",
      script: 'main.seyfo',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Distributors"
    },
  ]
};