// Простой сервер для HTML файла
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Разрешаем CORS (если нужно)
app.use(require('cors')());

// Раздаем статические файлы из папки client
app.use(express.static(path.join(__dirname, '../client')));

// Все запросы отправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log('🎳 Bowling Club Server запущен!');
  console.log(`📍 Адрес: http://localhost:${PORT}`);
  console.log('🚀 Откройте браузер и проверяйте!');
});