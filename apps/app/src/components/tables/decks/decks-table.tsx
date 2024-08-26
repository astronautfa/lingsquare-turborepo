"use client"
"use memo"

import * as React from "react"
// import { tasks, type Task } from "@/db/schema"
import { type DataTableFilterField } from "@lingsquare/ui/src/components/types"

import { useDataTable } from "@lingsquare/misc/hooks/use-data-table"
import { DataTable, DataTableToolbar, DataTableAdvancedToolbar } from "@ui/components"

import { type getTasks } from "../_lib/queries"
import { getColumns } from "./decks-table-columns"
// import { TasksTableFloatingBar } from "./tasks-table-floating-bar"
import { useDecksTable } from "./decks-table-provider"
// import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"

interface TasksTableProps {
  tasksPromise: ReturnType<typeof getTasks>
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useDecksTable()

  const { data, pageCount } = React.use(tasksPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  // const filterFields: DataTableFilterField<Task>[] = [
  //   {
  //     label: "Title",
  //     value: "title",
  //     placeholder: "Filter titles...",
  //   },
  //   {
  //     label: "Status",
  //     value: "status",
  //     options: tasks.status.enumValues.map((status) => ({
  //       label: status[0]?.toUpperCase() + status.slice(1),
  //       value: status,
  //       icon: getStatusIcon(status),
  //       withCount: true,
  //     })),
  //   },
  //   {
  //     label: "Priority",
  //     value: "priority",
  //     options: tasks.priority.enumValues.map((priority) => ({
  //       label: priority[0]?.toUpperCase() + priority.slice(1),
  //       value: priority,
  //       icon: getPriorityIcon(priority),
  //       withCount: true,
  //     })),
  //   },
  // ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    /* optional props */
    // filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    /* */
  })

  return (
    <DataTable
      table={table}
    // floatingBar={
    //   featureFlags.includes("floatingBar") ? (
    //     <TasksTableFloatingBar table={table} />
    //   ) : null
    // }
    >
      {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table}>
          {/* <TasksTableToolbarActions table={table} /> */}
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} >
          {/* <TasksTableToolbarActions table={table} /> */}
        </DataTableToolbar>
      )}
    </DataTable>
  )
}
