const express = require('express');
const cors = require('cors');
const path = require('path');
const PocketBase = require('pocketbase/cjs');

const app = express();
const PORT = 3000;

// Инициализируем PocketBase
const pb = new PocketBase('http://127.0.0.1:8090');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// API для бронирований
app.post('/api/booking', async (req, res) => {
    try {
        const { name, phone, date, time, people } = req.body;
        
        const record = await pb.collection('bookings').create({
            name,
            phone, 
            date,
            time,
            people: parseInt(people),
            status: 'pending'
        });
        
        res.json({ 
            success: true, 
            message: 'Бронирование сохранено!',
            id: record.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API для получения бронирований
app.get('/api/bookings', async (req, res) => {
    try {
        const records = await pb.collection('bookings').getFullList({
            sort: '-created'
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API для расписания
app.get('/api/schedule', async (req, res) => {
    try {
        const records = await pb.collection('schedule').getFullList({
            sort: 'day'
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Все остальные запросы отправляем на index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log('🎳 Bowling Club Server запущен!');
    console.log(`📍 Адрес: http://localhost:${PORT}`);
    console.log('🗄️  PocketBase: http://127.0.0.1:8090');
});