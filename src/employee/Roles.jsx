import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import AddEmployeeForm from "./AddEmployeeForm";

const ExpandableRowContent = ({ roles }) => {
  const [addEmployee, setAddEmployee] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell colSpan={5}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.name}>
                    <TableCell align="right">{role.name}</TableCell>
                    <TableCell align="right">
                      {/* {role.isAdministrative && <DoneIcon />} */}
                    </TableCell>
                    <TableCell align="right">{role.startDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ExpandableRowContent;
