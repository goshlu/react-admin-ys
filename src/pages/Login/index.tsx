import { Button } from "antd";
import { setToken } from "@/redux/modules/global/action";
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setToken: typeof setToken
}

function Login (props: LoginProps) {
    const {setToken} = props;
    const navgaite = useNavigate();

    const handleLogin = () => {
        console.log('login');
        setToken('token')
        navgaite('/sys/home')
    }
    return <>
        <div>Login in my react app</div>
        <Button type="primary" onClick={handleLogin}>Login</Button>
    </>
}

// export default  Login;

// 映射dispatch到props中
const mapDispatchToProps = {setToken};

export default connect(null, mapDispatchToProps)(Login)