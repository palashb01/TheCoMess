import {BrowserRouter as Router,Route,Routes,NavLink,useNavigate} from 'react-router-dom';
const StudentDash = ()=>{
    const navi = useNavigate();
    const st = ()=>{
        navi('/StudentLogin');
    }
    const sr = ()=>{
        navi('/StudentRegister');
    }
    return (
        <div>
        <button onClick={sr}>Student Register</button>
        <button onClick={st}>Student Login</button>
        </div>
    )
}

export default StudentDash;