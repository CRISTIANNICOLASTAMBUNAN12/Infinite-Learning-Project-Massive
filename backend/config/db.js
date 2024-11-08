import mysql from 'mysql2';

let connection;

const connectDB = () => {
  return new Promise((resolve, reject) => {
    if (connection && connection.state === 'authenticated') {
      console.log('Database connection already established');
      resolve(connection);
      return;
    }

    connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'db_petani_pintar',
      port: process.env.DB_PORT || 3306,
    });

    connection.connect((err) => {
      if (err) {
        console.error('Unable to connect to the database:', err.message);
        reject(err);
      } else {
        console.log('Database connected successfully');
        resolve(connection);
      }
    });

    connection.on('error', (err) => {
      console.error('Database connection error:', err.message);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connectDB();
      }
    });
  });
};

const getDbConnection = async () => {
  if (!connection || connection.state !== 'authenticated') {
    console.log('Database connection is not established, attempting to connect...');
    await connectDB();  // Tunggu sampai koneksi selesai
  }
  return connection.promise();  // Pastikan return connection dengan Promise
};

export default { connectDB, getDbConnection };
