import { useState } from "react";
import { useNavigate } from 'react-router-dom';
//import StudentRegister from './StudentRegister';


const MessRegister = () => {
    const navi = useNavigate();
  const [User, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const submitHandler = async(e) => {
    e.preventDefault();
    const {email,firstname,lastname,password} = User;
    const res = await fetch('http://localhost:8000/messregister',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,firstname,lastname,password
        })
    })
    const data = await res.json();
    if(res.status === 422 || !data){
        window.alert("invalid");
    }
    else{
        console.log("success");
        navi("/MessBoard");
    }
    console.log(User);
  };
  const Changefirstname = (event) => {
    setUser({ ...User, firstname: event.target.value });
  }

  const Changelastname = (event) => {
    setUser({ ...User, lastname: event.target.value });

  };
  const Changeemail = (event) => {
    setUser({ ...User, email: event.target.value });

  };
  const Changepassword = (event) => {
    setUser({ ...User, password: event.target.value });

  };
  

  return (
    <section>
      <form onSubmit={submitHandler} method="POST">
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            name="firstname"
            value={User.firstname}
            onChange={Changefirstname}
          />
        </div>
        <div>
          <label htmlFor="lastname">last Name</label>
          <input
            id="lastname"
            name="lastname"
            value={User.lastname}
            onChange={Changelastname}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            value={User.email}
            onChange={Changeemail}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            value={User.password}
            onChange={Changepassword}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
export default MessRegister;
