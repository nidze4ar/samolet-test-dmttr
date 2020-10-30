import React from 'react';
import { Input, Typography } from 'antd';

const { Title } = Typography;

export default function Region(props) {
  const currentRegionId = props.location.pathname.split('/')[2];
  const currentRegionData = props.data.find(item => Number(item.order) === Number(currentRegionId));
  if (!currentRegionData) {
    return 'Информация по региону пока отсутсвует.';
  }

  return (
    <div className='RegionPage'>
      <Title>{currentRegionData.territory}</Title>
        {Object.entries(currentRegionData).map(([key, value]) => (
          <Input
            key={key}
            addonBefore={key}
            id={key}
            value={value}
            disabled
          />
        ))}
    </div>
  )
}
