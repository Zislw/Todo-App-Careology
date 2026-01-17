import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../store/actions/users";
import './register.scss';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const [errors, setErr] = useState<any>({});

  const navToDo = (): void => {
    navigate("/myToDoList");
  };

  const validate = () => {
    const err: any = {};
    let isValid = true;

    if (!userName.current?.value) {
      err.userName = { message: "User name is requiered" };
      isValid = false;
    } else if (userName.current.value.length < 4) {
      err.userName = { message: "User name should be at least 4 letters" };
      isValid = false;
    }

    if (!email.current?.value) {
      err.email = { message: "Email is requiered" };
      isValid = false;
    } else if (!/@/.test(email.current.value)) {
      err.email = { message: "Email is not correct" };
      isValid = false;
    }

    if (!password.current?.value) {
      err.password = { message: "Password is requiered" };
      isValid = false;
    } else if (password.current.value.length < 6) {
      err.password = { message: "Password should be at least 6 characters" };
      isValid = false;
    }

    if (!confirmPassword.current?.value) {
      err.confirmPassword = { message: "Confirm password is requiered" };
      isValid = false;
    } else if (confirmPassword.current?.value !== password.current?.value) {
      err.confirmPassword = { message: "Passwords do not match" };
      isValid = false;
    }

    setErr(err);
    return isValid;
  };

  const registerTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    } else {
      dispatch(
        register(
          {
            fullName: userName.current?.value,
            email: email.current?.value,
            password: password.current?.value,
          },
          navToDo
        )
      );
    }
  };

  return (
    <div className="register">
      <form className="ui form">
        <h1>Welcome!</h1>
        <h1>Sign up to</h1>
        <h3>get things done</h3>
        <div className="field">
          <label>Enter your email</label>
          <input placeholder="yours@example.com" ref={email} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="field">
          <label>Enter your user name</label>
          <input ref={userName} />
          {errors.userName && <span>{errors.userName.message}</span>}
        </div>
        <div className="field">
          <label>Enter your password</label>
          <input type="password" ref={password} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="field">
          <label>Confirm your password</label>
          <input type="password" ref={confirmPassword} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <button className="ui teal button" onClick={registerTodo} type="submit">
          Register
        </button>
      </form>
      <div>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};

export default Register;
