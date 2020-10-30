import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import { getData } from "./api";
import { Switch, Route } from 'react-router-dom';
import Regions from './Regions';
import Region from './Region';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <Layout style={{minHeight: '100vh'}}>      
      <Content style={{ padding: '0 50px' }}>
        <Switch>
         <Route path='/' exact render={props => <Regions {...props} data={data} />} />
         <Route path='/region/:id' render={props => <Region {...props} data={data} />} />
       </Switch>
      </Content>
    </Layout>
  );
}
