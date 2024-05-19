import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Button } from "@material-ui/core";

import employeeStore from "../store/employeeStore";
import ExpandableRowContent from "./Roles";
import AddEmployeeForm from "./AddEmployeeForm";

const ExpandableRowTable = observer(() => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState();
  //let employeeToEdit;
  const closeDialog = () => {
    employeeStore.requiredEmployee
      ? (employeeStore.requiredEmployee.roles = [])
      : (employeeStore.requiredEmployee = undefined);
    employeeStore.requiredEmployee = undefined;
    setAddEmployee(false);
  };
  function openDialog() {
    setAddEmployee(true);
  }

  const columns = [
    { name: "firstName" },
    { name: "lastName" },
    { name: "idNumber" },
    { name: "dateSartingWork" },
    {
      name: "",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <EditIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => handleEdit(tableMeta.rowData)}
              />
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(tableMeta.rowData)}
              />
            </>
          );
        },
      },
    },
  ];

  const data = toJS(employeeStore.employees);

  function handleEdit(rowData) {
    console.log(rowData[2]);
    const IDemployeeToEdit = employeeStore.getIdByIdnumber(rowData[2]);
    console.log(IDemployeeToEdit);
    employeeStore.getDataById(IDemployeeToEdit);
    //setEmployeeToEdit (employeeStore.requiredEmployee);
    console.log("Edit clicked for row:", employeeToEdit);
    openDialog();
  }

  const handleDelete = async (rowData) => {
    const idToDelete = employeeStore.getIdByIdnumber(rowData[2]);
    await employeeStore.daleteData(idToDelete);
  };

  // function getIdByIdnumber(idNumber) {
  //   return toJS(
  //     employeeStore.employees.find(e => e.idNumber == idNumber).id
  //   );
  // }

  const options = {
    filter: true,
    sort: false,
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    selectableRows: "single",
    filterType: "dropdown",
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <ExpandableRowContent
          roles={toJS(employeeStore.employees[rowMeta.dataIndex].roles)}
        />
      );
    },
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openDialog}>
        Add Employee
      </Button>
      {addEmployee && (
        <AddEmployeeForm
          handleClose={closeDialog}
          isOpen={addEmployee}
        ></AddEmployeeForm>
      )}
      <MUIDataTable
        title={"Your worker list:"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
});

export default ExpandableRowTable;
