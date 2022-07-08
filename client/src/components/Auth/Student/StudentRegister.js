import { useState } from "react";
import { useNavigate } from 'react-router-dom';
//import StudentRegister from './StudentRegister';


const StudentRegister = () => {
    const navi = useNavigate();
  const [User, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    rollnumber: "",
    password: "",
  });

  const submitHandler = async(e) => {
    e.preventDefault();
    const {email,firstname,lastname,password,rollnumber} = User;
    const res = await fetch('http://localhost:8000/studentregister',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,firstname,lastname,password,rollnumber
        })
    })
    const data = await res.json();
    if(res.status === 422 || !data){
        window.alert("invalid");
    }
    else{
        console.log("success");
        navi("/StudentBoard");
    }

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
  const Changerollnumber = (event) => {
    setUser({ ...User, rollnumber: event.target.value });

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
          <label htmlFor="rollnumber">roll number</label>
          <input
            id="rollnumber"
            name="rollnumber"
            value={User.rollnumber}
            onChange={Changerollnumber}
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
export default StudentRegister;
