const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Для локальной разработки - раздаем файлы из client
app.use(express.static(path.join(__dirname, '../client')));

// Для продакшена - раздаем из public (если есть)
app.use(express.static(path.join(__dirname, '../public')));

// Все запросы отправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log('🎳 Bowling Club Server запущен!');
  console.log(`📍 Локальный адрес: http://localhost:${PORT}`);
  console.log(`🌐 GitHub Pages: https://viktoria1.github.io/bowling-club`);
});