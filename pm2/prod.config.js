module.exports = {
  apps: [{
    name: 'grommet-passport',
    script: 'npm',
    args: 'run passport-start',
    max_memory_restart: '100M',
    error_file: '/opt/mount1/grommet-passport-err.log',
    out_file: '/opt/mount1/grommet-passport-out.log',
    log_file: '/opt/mount1/grommet-passport-combined.log',
    time: true
  }]
};
