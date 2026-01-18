import { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchTask } from "../../store/actions/todoList";
import './SearchBar.scss';

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    dispatch(searchTask(search.current?.value || ""));
  };

  return (
    <div className="search-container">
      <i className="search icon"></i>
      <input 
        type="text" 
        placeholder="Search" 
        ref={search}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
