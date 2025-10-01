const mongoose = require('mongoose');

class Database {
  constructor({ dbURI, dbName, options = {} }) {
    this.dbURI = dbURI;
    this.dbName = dbName;
    this.options = {
      ...options,
    };
  }

  async connect() {
    try {
      await mongoose.connect(this.dbURI, {
        dbName: this.dbName,
        ...this.options,
      });

      console.info(`🔥 Connected to Database: ${this.dbName}`);
    } catch (error) {
      console.error('❌ Database connection error:', error);
      process.exit(1); // Exit the process on failure
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.info('🛑 Database disconnected');
    } catch (error) {
      console.error('❌ Error disconnecting Database:', error);
    }
  }
}

module.exports = Database;
