import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Dashboard {
  title: string;
  shortTitle: string;
  description: string;
  groups: string[];
  embedLink: string;
}

interface DashboardState {
  dashboards: Dashboard[];
  groups: string[];
}

const initialState: DashboardState = {
  dashboards: [],
  groups: ['Group A', 'Group B', 'Group C', 'Group D'],
};

const dashboardSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    addDashboard(state, action: PayloadAction<Dashboard>) {
      state.dashboards.push(action.payload);
    },
    updateDashboard(state, action: PayloadAction<{ index: number; dashboard: Dashboard }>) {
      state.dashboards[action.payload.index] = action.payload.dashboard;
    },
    removeDashboard(state, action: PayloadAction<number>) {
      state.dashboards.splice(action.payload, 1);
    },
    addGroup(state, action: PayloadAction<string>) {
      if (!state.groups.includes(action.payload)) {
        state.groups.push(action.payload);
      }
    },
    editGroup(
      state,
      action: PayloadAction<{ oldGroup: string; newGroup: string }>
    ) {
      const { oldGroup, newGroup } = action.payload;
      const groupIndex = state.groups.indexOf(oldGroup);
      if (groupIndex !== -1) {
        state.groups[groupIndex] = newGroup;
      }
      state.dashboards.forEach((dashboard) => {
        const groupIdx = dashboard.groups.indexOf(oldGroup);
        if (groupIdx !== -1) {
          dashboard.groups[groupIdx] = newGroup;
        }
      });
    },
  updateGroupDashboards(
    state,
    action: PayloadAction<{ group: string; dashboards: Dashboard[] }>
  ) {
    const { group, dashboards } = action.payload;
  
    state.dashboards = state.dashboards.map((dashboard) => {
      if (dashboard.groups.includes(group)) {
        // Replace the specific dashboard for this group
        const updatedDashboard = dashboards.find(
          (d) => d.title === dashboard.title && d.groups.includes(group)
        );
        return updatedDashboard || dashboard;
      }
      return dashboard;
    });
  }
  
  },
});

export const { addDashboard, updateDashboard, removeDashboard, addGroup, editGroup,updateGroupDashboards } = dashboardSlice.actions;

export default dashboardSlice.reducer;
