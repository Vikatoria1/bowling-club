const { Pool } = require('pg');

// Railway автоматически предоставляет DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://username:password@localhost/bowling',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Создаем таблицы
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        date DATE NOT NULL,
        time TIME NOT NULL,
        people INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS schedule (
        id SERIAL PRIMARY KEY,
        day_of_week INTEGER NOT NULL,
        open_time TIME NOT NULL,
        close_time TIME NOT NULL,
        price_per_hour INTEGER NOT NULL
      )
    `);

    // Добавляем тестовое расписание
    await pool.query(`
      INSERT INTO schedule (day_of_week, open_time, close_time, price_per_hour) 
      VALUES 
        (1, '10:00', '23:00', 1000),
        (2, '10:00', '23:00', 1000),
        (3, '10:00', '23:00', 1000),
        (4, '10:00', '23:00', 1000),
        (5, '10:00', '00:00', 1200),
        (6, '10:00', '00:00', 1200),
        (0, '10:00', '23:00', 1200)
      ON CONFLICT (day_of_week) DO NOTHING
    `);

    console.log('✅ PostgreSQL база инициализирована');
  } catch (error) {
    console.error('❌ Ошибка инициализации базы:', error);
  }
}

initDatabase();

module.exports = pool;