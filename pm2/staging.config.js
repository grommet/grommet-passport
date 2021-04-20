module.exports = {
  apps: [{
    name: 'grommet-passport',
    script: 'npm',
    args: 'run passport-start',
    max_memory_restart: '45M',
    error_file: '/opt/cloudhost/logs/brand-central/grommet-passport-err.log',
    out_file: '/opt/cloudhost/logs/brand-central/grommet-passport-out.log',
    log_file: '/opt/cloudhost/logs/brand-central/grommet-passport-combined.log',
    time: true
  }]
};
