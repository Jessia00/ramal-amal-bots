module.exports = {
  apps: [
    {
      name: "MODERATION",
      namespace: "ramal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Main_Botlar/Botlar/Moderation"
    },
    {
      name: "GUARDI",
      namespace: "ramal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Main_Botlar/Botlar/Guard_I"
    },
    {
      name: "GUARDII",
      namespace: "ramal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Main_Botlar/Botlar/Guard_II"
    },
    {
      name: "GUARDIII",
      namespace: "ramal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Main_Botlar/Botlar/Guard_III"
    },
    {
      name: "GUARDIV",
      namespace: "ramal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Main_Botlar/Botlar/Guard_IV"
    }
  ]
};