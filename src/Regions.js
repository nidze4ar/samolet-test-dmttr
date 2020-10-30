import React, { useState, useRef } from 'react';
import { Table, Input, Button, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';

const REGION_ATTRIBUTE = 'region';
const { Title } = Typography;

export default function Regions(props) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const inputNode = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const tableData = props.data.map(item => ({
    key: item.territory,
    order: item.order,
    region: item.territory,
    librariesCount: item.libraries,
  }));

  const columns = [
    {
      title: 'Регион',
      dataIndex: 'region',
      width: '60%',
      filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
      onFilter: (value, record) => record[REGION_ATTRIBUTE].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            inputNode.current.select();
          });
        }
      },
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
        <div style={{padding: 8}}>
          <Input
            ref={inputNode}
            placeholder='Введите название региона'
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, REGION_ATTRIBUTE)}
            style={{width: 250, marginBottom: 8, display: 'block'}}
          />
            <Button
              type='primary'
              onClick={() => handleSearch(selectedKeys, confirm, REGION_ATTRIBUTE)}
              size='small'
              style={{width: 90}}
            >
              Искать
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size='small' style={{width: 90}}>
              Сбросить
            </Button>
        </div>
      ),
      render: (text, allValues) => (
        <Link to={`/region/${allValues.order}`}>
          {searchedColumn === REGION_ATTRIBUTE && (
            <Highlighter
              highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) || text}
        </Link>
      )
    },
    {
      title: 'Количество библиотек',
      dataIndex: 'librariesCount',
      defaultSortOrder: 'descend',
      width: '38%',
      sorter: (a, b) => a.librariesCount - b.librariesCount,
    },
  ];

  return (
    <div className='RegionsPage'>
      <Title>Регионы</Title>
      <Table columns={columns} dataSource={tableData} />
    </div>
  )
}