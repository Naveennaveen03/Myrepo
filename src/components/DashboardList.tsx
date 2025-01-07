import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { RootState } from "../redux/store";
import GroupItem from "./GroupItem";
import CustomDragOverlay from "./CustomDrag";
import { editGroup, deleteGroup, reorderGroups } from "../redux/dashboardSlice";

interface DashboardListProps {
  expandAll: boolean; // Add this prop
}

const DashboardList: React.FC<DashboardListProps> = ({ expandAll }) => {
  const groups = useSelector((state: RootState) => state.dashboards.groups);
  const [activeId, setActiveId] = useState<null | string>(null);
  const [dragWidth, setDragWidth] = useState<number | null>(null);
  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleDragStart = (event: any) => {
    const activeElement = document.querySelector(`[data-id='${event.active.id}']`);
    if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      setDragWidth(rect.width);
      setDragHeight(rect.height);
    }
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = groups.findIndex((group) => group.groupName === active.id);
      const newIndex = groups.findIndex((group) => group.groupName === over.id);
      const newGroups = arrayMove(groups, oldIndex, newIndex);
      dispatch(reorderGroups(newGroups));
    }
    setActiveId(null);
    setDragWidth(null);
    setDragHeight(null);
  };

  const handleRenameGroup = (groupName: string, newName: string) => {
    dispatch(editGroup({ groupName, newName }));
  };

  const handleDeleteGroup = (groupName: string) => {
    dispatch(deleteGroup(groupName));
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={groups.map((group) => group.groupName)}>
        {groups.map((group) => (
          <GroupItem
            key={group.groupName}
            groupName={group.groupName}
            dashboards={group.dashboards}
            onRenameGroup={handleRenameGroup}
            onDeleteGroup={handleDeleteGroup}
            expandAll={expandAll} // Pass the expandAll prop
          />
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <CustomDragOverlay
            groupName={activeId}
            width={dragWidth || 0}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DashboardList;
