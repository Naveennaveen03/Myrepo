import React from 'react';
import { useSelector } from 'react-redux';
import GroupItem from './GroupItem';
import { RootState } from '../redux/store';

const DashboardList: React.FC = () => {
  const groups = useSelector((state: RootState) => state.dashboards.groups);
  const dashboards = useSelector((state: RootState) => state.dashboards.dashboards);

  return (
    <div>
      {groups.map((group) => (
        <GroupItem key={group} groupName={group} dashboards={dashboards} />
      ))}
    </div>
  );
};

export default DashboardList;
