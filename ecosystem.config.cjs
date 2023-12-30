module.exports = {
    apps: [{
      name: "tour-api",
      script: "./src/server.js",
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_development: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
    }]
  }