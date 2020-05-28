import React, { useState, useRef } from 'react'
import {Table, Space, Button, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default function PersonTable({data, deleteRecord, loading = false, openModal}) {
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState('')
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Filtrar por`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filtrar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      ...getColumnSearchProps('cpf'),
    },
    {
      title: 'Sexo',
      dataIndex: 'gender',
      key: 'gender',
      ...getColumnSearchProps('gender'),
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      ...getColumnSearchProps('dateOfBirth'),
    },
    {
      title: 'Nacionalidade',
      dataIndex: 'nationality',
      key: 'nationality',
      ...getColumnSearchProps('nationality'),
    },
    {
      title: 'Naturalidade',
      dataIndex: 'naturalness',
      key: 'naturalness',
      ...getColumnSearchProps('naturalness'),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (text, record) => {
        return <Space size="middle">
          <Button loading={loading} type="secondary" onClick={() => deleteRecord(record)}> Deletar</Button>
          <Button loading={loading} type="secondary" onClick={() => {openModal(record)}}> Editar</Button>
        </Space>
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} locale={{emptyText: "Nenhum dado encontrado"}} />
    </div>
  )
}
