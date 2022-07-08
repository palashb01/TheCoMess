import { useState } from "react";
import { useNavigate } from 'react-router-dom';
//import StudentRegister from './StudentRegister';


const StudentLogin = () => {
    const navi = useNavigate();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async(e) => {
    console.log(User)
    e.preventDefault();
    const {email,password} = User;
    const res = await fetch('http://localhost:8000/studentlogin',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,password
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
export default StudentLogin;
