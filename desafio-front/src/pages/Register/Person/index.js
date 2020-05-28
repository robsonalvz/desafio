import React from "react";
import {
  Input,
  Form,
  Drawer,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isCPF, toDigitsOnly, cpfMask } from "../../../utils/utils";
import moment from "moment";
const { Option } = Select;

export default function Register({ onClose, visible, setVisible, data, callback, inputTextButton, title}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.person.loading);
  const persons = useSelector((state) => state.person.persons);
  const onFinish = (values) => {
    values.dateOfBirth = values.dateOfBirth.format("DD/MM/YYYY");
    values.cpf = toDigitsOnly(values.cpf);
    if(!!data.id) {
      const person = persons.find(person => person.id === data.id);
      values = {...person,...values}
    }
    dispatch(callback(values));
    setVisible(false);
  };
  const validator = (rule, value, callback) => {
    try {
      if (!!value){
        if (!isCPF(value)) {
          throw new Error("CPF informado é inválido!");
        }
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };
  const handleCPF = (e) => {
    const cpfWithMask = cpfMask(e.target.value);
    form.setFieldsValue({
      cpf: cpfWithMask,
    });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button
              loading={loading}
              form="form"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              {inputTextButton}
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          id="form"
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                initialValue={data.name}
                rules={[{ required: true, message: "Nome é obrigatório" }]}
              >
                <Input placeholder="Informe o nome" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cpf"
                label="CPF"
                initialValue={data.cpf}
                onChange={(e) => handleCPF(e)}
                rules={[
                  { required: true, message: "CPF é obrigatório" },
                  {
                    validator: validator,
                  },
                ]}
              >
                <Input placeholder="CPF é obrigatório" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                initialValue={data.email}
                rules={[
                  { type: "email", message: "Por favor, digite seu email" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Sexo"
                initialValue={data.gender}
              >
                <Select placeholder="Por favor, insira seu sexo">
                  <Option value="male">Masculino</Option>
                  <Option value="female">Feminino</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateOfBirth"
                {...(!!data.dateOfBirth ? {initialValue: moment(data.dateOfBirth, "DD/MM/YYYY")} : undefined)} 
                label="Data de nascimento"
                rules={[
                  {
                    required: true,
                    message: "Por favor, informe sua data de nascimento",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="Por favor, informe sua data de nascimento"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nationality"
                initialValue={data.nationality}
                label="Nacionalidade"
              >
                <Input placeholder="Por favor, informe sua nacionalidade" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="naturalness"
                initialValue={data.naturalness}
                label="Naturalidade"
              >
                <Input placeholder="Por favor, informe sua naturalidade" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
