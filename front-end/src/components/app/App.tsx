import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import Login from '../login/Login';
import Register from '../register/register';
import TodosPage from '../TodosPage/TodosPage';
import Todo from '../Todo/Todo';
import { TodoMode } from '../Todo/types';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="myTodoList" element={<TodosPage />}>
          <Route path="addTodo" element={<Todo mode={TodoMode.CREATE} />} />
        </Route>
        <Route path="*" element={null} />
      </Routes>
    </div>
  );
};

export default App;
