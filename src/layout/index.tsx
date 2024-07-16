import { store } from "@/redux";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Navigate, Outlet } from "react-router-dom";

function LayoutMain() {
  // 从store里面拿到token
  const userToken = store.getState().global.token;

  if (!userToken) {
    return <Navigate to="/login" />
  }
  
  return (
    <div className="container">
      <Sider collapsible width={220} theme="light">
        <div>Layout</div>
      </Sider>
      <Layout>
        <Layout.Header>
          <div>Header</div>
        </Layout.Header>
        <Layout.Content>
          <div>
            <Outlet />
          </div>
        </Layout.Content>
        <Layout.Footer>
          <div>Footer</div>
        </Layout.Footer>
      </Layout>
    </div>
  );
}

export default LayoutMain;


const tree = [
  {
    id:1,
    name:"Node1",
    parentId:null,
    children: [
      {
        id: 2,
        name: 'Node 2',
        parentId: 1,
        children: [
          { id: 4, name: 'Node 4', parentId: 2, children: [] },
          { id: 5, name: 'Node 5', parentId: 2, children: [] }
        ]
      },
      {
        id: 3,
        name: 'Node 3',
        parentId: 1,
        children: []
      }
    ]
  },
]

function listToTree(list) {
  const map = {};
  let tree = []

  list.forEach(item => {
    map[item.id] = {
      ...item,
      children: []
    }
  })

  // 遍历列表，将每个元素放入对应父元素的children中
  list.forEach(item => {
    if(item.parentId === null) {
      tree.push(map[item.id])

    } else {
      map[item.parentId].children.push(map[item.id])
    }
  })

  return tree;
}