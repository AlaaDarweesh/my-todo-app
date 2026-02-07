import { useEffect, useState } from 'react'

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('فشل جلب البيانات:', error);
    }
  };

  const clearAllTasks = async () => {
    if (window.confirm('هل أنت متأكد من حذف جميع المهام؟')) {
      try {
        await fetch('http://localhost:3000/tasks/all/clear', { method: 'DELETE' });
        fetchTasks();
      } catch (error) {
        console.error('فشل مسح القائمة:', error);
      }
    }
  };

  const toggleTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}/toggle`, { method: 'PATCH' });
      fetchTasks();
    } catch (error) {
      console.error('فشل تحديث المهمة:', error);
    }
  };

  const handleAddTask = async () => {
    if (!inputValue.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputValue }),
      });
      if (response.ok) {
        setInputValue(''); 
        fetchTasks(); 
      }
    } catch (error) {
      console.error('فشل إضافة المهمة:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error('فشل حذف المهمة:', error);
    }
  };

  return (
    /* الحاوية الخارجية لضمان التوسط الكامل في الصفحة */
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: '#f0f2f5', // لون خلفية هادئ للمتصفح
      margin: 0
    }}>
      
      {/* صندوق التطبيق الرئيسي */}
      <div style={{ 
        width: '90%', 
        maxWidth: '500px', 
        textAlign: 'center', 
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
        backgroundColor: '#ffffff', 
        padding: '30px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
      }}>
        
        <h2 style={{ color: '#1a73e8', marginBottom: '10px' }}>قائمة مهامي الذكية</h2>
        
        <p style={{ color: '#5f6368', fontSize: '15px', marginBottom: '25px' }}>
          لديك <strong style={{ color: '#1a73e8' }}>{tasks.filter(t => !t.completed).length}</strong> مهام متبقية
        </p>

        <div style={{ marginBottom: '25px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ما هي خطتك القادمة؟"
            style={{ 
              padding: '12px 15px', 
              flex: 1, 
              borderRadius: '10px', 
              border: '2px solid #e8eaed', 
              outline: 'none',
              fontSize: '16px'
            }}
          />
          <button 
            onClick={handleAddTask}
            style={{ 
              padding: '10px 25px', 
              backgroundColor: '#1a73e8', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              cursor: 'pointer', 
              fontWeight: '600',
              transition: '0.3s'
            }}
          >
            إضافة
          </button>
        </div>

        <div style={{ textAlign: 'right', direction: 'rtl', maxHeight: '400px', overflowY: 'auto', paddingLeft: '5px' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ 
              padding: '15px', 
              borderBottom: '1px solid #f1f3f4', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              backgroundColor: task.completed ? '#f8f9fa' : 'white', 
              marginBottom: '10px', 
              borderRadius: '12px',
              transition: '0.2s',
              border: '1px solid #f1f3f4'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span 
                  onClick={() => toggleTask(task.id)} 
                  style={{ cursor: 'pointer', fontSize: '22px', userSelect: 'none' }}
                >
                  {task.completed ? '✅' : '⏳'}
                </span>
                <span style={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#9aa0a6' : '#202124',
                  fontSize: '17px',
                  fontWeight: task.completed ? 'normal' : '500'
                }}>
                  {task.title}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#d93025', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  padding: '5px 10px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
        
        {tasks.length > 0 ? (
          <button 
            onClick={clearAllTasks}
            style={{ 
              marginTop: '25px', 
              background: 'none', 
              border: 'none', 
              color: '#d93025', 
              cursor: 'pointer', 
              textDecoration: 'none', 
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            🗑️ مسح القائمة بالكامل
          </button>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#dadce0', fontSize: '18px' }}>لا توجد مهام حالياً..</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;