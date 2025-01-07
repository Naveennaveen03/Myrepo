import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Dashboard {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  groups: string[];
  embedLink: string;
}

interface Group {
  groupName: string;
  dashboards: Dashboard[];
}

interface DashboardState {
  groups: Group[];
}

const initialState: DashboardState = {
  groups: [
    { groupName: 'Group A', dashboards: [] },
    { groupName: 'Group B', dashboards: [] },
    { groupName: 'Group C', dashboards: [] },
    { groupName: 'Group D', dashboards: [] },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    addDashboard(
      state,
      action: PayloadAction<{ groups: string[]; dashboard: Dashboard }>
    ) {
      const { groups, dashboard } = action.payload;
      state.groups = state.groups.map((group) => {
        if (groups.includes(group.groupName)) {
          group.dashboards.push(dashboard);
        }
        return group;
      });
    },
    updateDashboard(
      state,
      action: PayloadAction<{ id: string; updatedDashboard: Dashboard }>
    ) {
      const { id, updatedDashboard } = action.payload;
      state.groups = state.groups.map((group) => {
        group.dashboards = group.dashboards.map((dashboard) =>
          dashboard.id === id ? updatedDashboard : dashboard
        );
        return group;
      });
    },
    removeDashboard(state, action: PayloadAction<string>) {
      const dashboardId = action.payload;
      state.groups = state.groups.map((group) => {
        group.dashboards = group.dashboards.filter(
          (dashboard) => dashboard.id !== dashboardId
        );
        return group;
      });
    },
    addGroup(state, action: PayloadAction<string>) {
      state.groups.push({ groupName: action.payload, dashboards: [] });
    },
    editGroup(
      state,
      action: PayloadAction<{ groupName: string; newName: string }>
    ) {
      const { groupName, newName } = action.payload;
      state.groups = state.groups.map((group) =>
        group.groupName === groupName
          ? { ...group, groupName: newName }
          : group
      );
    },
    deleteGroup(state, action: PayloadAction<string>) {
      const groupName = action.payload;
      state.groups = state.groups.filter((group) => group.groupName !== groupName);
    },
    reorderGroups(state, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
    },
    updateGroupDashboards(
      state,
      action: PayloadAction<{ groupName: string; dashboards: Dashboard[] }>
    ) {
      const { groupName, dashboards } = action.payload;
      state.groups = state.groups.map((group) => {
        if (group.groupName === groupName) {
          group.dashboards = dashboards;
        }
        return group;
      });
    },
  },
});

export const {
  addDashboard,
  updateDashboard,
  removeDashboard,
  addGroup,
  editGroup,
  deleteGroup,
  reorderGroups,
  updateGroupDashboards
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
