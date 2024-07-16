import useAuthButton from "@/hooks/useAuthButton";
import { ButtonProps } from "antd";

type ButtonComponent = React.FC<ButtonProps> | JSX.Element | null;
interface ButtonPerProps {
    btn: string;
    Comp: ButtonComponent
}
function ButtonPer({btn,Comp}: ButtonPerProps): JSX.Element | null {
    const {Buttons} = useAuthButton();
    // 如果btn为空
    if(!btn) {
        return <>{Comp}</>
    }
    // Buttons是否为空对象
    if(Object.keys(Buttons).length === 0) {
        return null
    }
    if(Buttons && Buttons.includes(btn) && Comp) {
        return <>{Comp}</>
    }
    return null;
}

export default ButtonPer;