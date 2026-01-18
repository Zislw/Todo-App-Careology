import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AppStateDto } from "../../dtos/state.dto";
import { useEffect } from "react";
import { getAllTasks } from "../../store/actions/todoList";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableBody,
  Table,
  Icon,
} from 'semantic-ui-react'
import './MyTodoList.scss';
import { MyTodoListProps } from "./types";
import Todo from "../Todo/Todo";
import { TodoMode } from "../Todo/types";


const MyTodoList = ({ showCompleted }: MyTodoListProps) => {
  const currentUser = useSelector(({currentUser}: AppStateDto) => currentUser);
  const myTodoList = useSelector(({myTodoList}: AppStateDto) => myTodoList);
  const searchText = useSelector(({searchText}: AppStateDto) => searchText);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(getAllTasks(currentUser?.uid ?? null));
    }
  }, [currentUser, dispatch, navigate]);

  const filteredTasks = myTodoList?.filter((todo) => 
    todo.isCompleted === showCompleted && 
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="todo-list-section">
      <div className="todo-list-container">
        <h2 className="todo-list-title">
          {showCompleted ? 'Tasks done' : 'Tasks to do'}
          <Icon name="angle down" className="title-icon" />
        </h2>
        
        <div>
          <Table compact>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <Icon name="square outline" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="align left" /> Task name
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="calendar outline" /> Due date
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="tag" /> Tag
                </TableHeaderCell>
                <TableHeaderCell>
                  <Icon name="sticky note outline" /> Note
                </TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!showCompleted && <Outlet />}
              {filteredTasks.map((todo) => {
                return <Todo key={todo.uid} item={todo} mode={TodoMode.READ} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyTodoList;
