import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import MessLogin from '../Auth/Mess/MessLogin';
import MessRegister from '../Auth/Mess/MessRegister';
import MessBoard from '../Auth/Mess/MessBoard';
import MessDash from '../Auth/Mess/MessDash';
import StudentRegister from '../Auth/Student/StudentRegister';
import StudentDash from '../Auth/Student/StudentDash';
import StudentLogin from '../Auth/Student/StudentLogin';
import StudentBoard from '../Auth/Student/StudentBoard';
 import { useState} from "react";

const Main=()=>{
    const st = localStorage.getItem('st');
    const [isStudentChosen,setStudentChosen] = useState(st);
    const studentoptionChosen = ()=>{
        setStudentChosen(true);
        localStorage.setItem('st',true);
    }
    return(
        // <div>
        //     {!isStudentChosen && !isMessChosen && <div><button onClick={student}>Student</button>
        //     <button onClick={Mess}>Mess</button></div>}
        //     {isStudentChosen && <StudentLogin/>}
        //     {isMessChosen && <MessLogin/>}
            
        // </div>
        <Router>
           {!isStudentChosen  && <div><Link to="/StudentDash" onClick={studentoptionChosen}>Student</Link>
            <br></br>
            <Link to="/MessDash" onClick={studentoptionChosen}>Mess</Link> </div>}
            <Routes>
                <Route path="/StudentDash" element={<StudentDash/>} />
                <Route path="/Studentlogin" element={<StudentLogin/>}/>
                <Route path="/StudentRegister" element={<StudentRegister/>}/>
                <Route path="/StudentBoard" element={<StudentBoard/>}/>
                <Route path="/MessDash" element={<MessDash/>} />
                <Route path="/Messlogin" element={<MessLogin/>}/>
                <Route path="/MessRegister" element={<MessRegister/>}/>
                <Route path="/MessBoard" element={<MessBoard/>}/>
            
            </Routes>
        </Router>
        
    )
       
}

export default Main;