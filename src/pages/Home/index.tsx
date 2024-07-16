import ButtonPer from "@/components/ButtonPer";
import { Button } from "antd";
import {formConfig} from "./config"
import FormGenerator from "@/components/FormGenerator";

function Home() {
  return (
    <>
      <div>Home</div>
      <ButtonPer btn={"add"} Comp={<Button type="primary">添加</Button>} />
      <ButtonPer btn={"del"} Comp={<Button type="primary">删除</Button>} />

      <FormGenerator config={formConfig} />
    </>
  );
}

export default Home;
