import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { logout } from "../../store/actions/users";
import { searchTask } from "../../store/actions/MyToDoList";
import MyToDoList from "../myTodoList/MyToDoList";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import './TodosPage.scss';

const TodosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = () => {
    dispatch(searchTask(searchRef.current?.value || ""));
  };

  return (
    <div className="todos-page">
      <div className="todos-page-header">
        <h1>My Tasks for the next month</h1>
        <div className="header-actions">
          <div className="search-container">
            <i className="search icon"></i>
            <input 
              type="text" 
              placeholder="Search" 
              ref={searchRef}
              onKeyUp={handleSearch}
            />
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <i className="lock icon"></i>
            Logout
          </button>
        </div>
      </div>
      <AddTaskButton />
      <MyToDoList showCompleted={false} />
      <MyToDoList showCompleted={true} />
    </div>
  );
};

export default TodosPage;
