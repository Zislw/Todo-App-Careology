import AddTaskButton from "../AddTaskButton/AddTaskButton";
import SearchBar from "../SearchBar/SearchBar";
import LogoutButton from "../LogoutButton/LogoutButton";
import './TodosPage.scss';
import MyTodoList from "../myTodoList/MyTodoList";

const TodosPage = () => {
  return (
    <div className="todos-page">
      <div className="todos-page-header">
        <h1>My Tasks for the next month</h1>
        <div className="header-actions">
          <SearchBar />
          <LogoutButton />
        </div>
      </div>
      <AddTaskButton />
      <MyTodoList showCompleted={false} />
      <MyTodoList showCompleted={true} />
    </div>
  );
};

export default TodosPage;
