const { createClient } = require('@supabase/supabase-js');

// ЗАМЕНИТЕ НА ВАШИ РЕАЛЬНЫЕ ДАННЫЕ!
const supabaseUrl = 'https://xwixwihicipuwxeikoyo.supabase.co';
const supabaseKey = 'sb_publishable_ldtHmCD9oNdIbaMlzpYS1w_1SYaBC-r';

console.log('🔄 Подключаемся к Supabase...');
console.log('URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

// Тест подключения
supabase.from('schedule').select('*').limit(1)
  .then(result => {
    if (result.error) {
      console.error('❌ Ошибка подключения:', result.error.message);
    } else {
      console.log('✅ Подключение к Supabase установлено!');
    }
  })
  .catch(err => {
    console.error('❌ Критическая ошибка:', err.message);
  });

module.exports = supabase;