import { useNavigate } from "react-router-dom";
import './AddTaskButton.scss';

const AddTaskButton = () => {
  const navigate = useNavigate();

  const handleAddTodo = () => {
    navigate("/myTodoList/addTodo");
  }

  return (
    <div className="addTask">
      <button className="ui teal button" onClick={handleAddTodo} type="button">
        + Add task
      </button>
    </div>
  );
};

export default AddTaskButton;
