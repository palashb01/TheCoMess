import {BrowserRouter as Router,Route,Routes,NavLink,useNavigate} from 'react-router-dom';
const MessDash = ()=>{
    const navi = useNavigate();
    const mt = ()=>{
        navi('/MessLogin');
    }
    const mr = ()=>{
        navi('/MessRegister');
    }
    return (
        <div>
        <button onClick={mr}>MessRegister</button>
        <button onClick={mt}>Mess Login</button>
        </div>
    )
}

export default MessDash;