import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PersonTable from "../Table";
import { useDispatch, useSelector } from "react-redux";
import { Creators as PersonActions } from "../../store/ducks/person";
import Register from "../Register/Person";
import "./style.css";

const { Content } = Layout;

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const persons = useSelector((state) => state.person.persons);
  const loading = useSelector((state) => state.person.loading);

  useEffect(() => {
    dispatch(PersonActions.listPersonRequest());
  }, [dispatch]);

  const showDrawer = (record) => {
    setData(record);
    setVisible(true);
  };

  const deleteRecord = (record) => {
    dispatch(PersonActions.deletePersonRequest(record));
  };
  const onClose = () => {
    setData({});
    setVisible(false);
  };

  return (
    <div>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Button type="primary" className="newButton" onClick={showDrawer}>
          <PlusOutlined /> Novo
        </Button>
        <PersonTable
          openModal={showDrawer}
          data={persons}
          deleteRecord={deleteRecord}
          loading={loading}
        />
      </Content>

      {visible ? (
        <Register
          title={!data.id ? "Cadastro" : "Atualização"}
          inputTextButton={!data.id ? "Cadastrar" : "Atualizar"}
          data={data}
          onClose={onClose}
          setVisible={setVisible}
          visible={visible}
          callback={
            !data.id
              ? PersonActions.registerPersonRequest
              : PersonActions.updatePersonRequest
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}
