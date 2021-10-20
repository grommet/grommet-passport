module.exports = {
  apps: [
    {
      name: "grommet-passport",
      script: "npm",
      args: "run passport-start",
      max_memory_restart: "45M",
      error_file: "/applog/grommet-passport/grommet-passport-err.log",
      out_file: "/applog/grommet-passport/grommet-passport-out.log",
      log_file: "/applog/grommet-passport/grommet-passport-combined.log",
      time: true,
    },
  ],
};
