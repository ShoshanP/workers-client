import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import Typography from "@mui/joy/Typography";
import FormLabel from "@mui/joy/FormLabel";
import Checkbox from "@mui/joy/Checkbox";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Alert from "@mui/material/Alert";
import {
  Button,
  Dialog,
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import employeeStore from "../store/employeeStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { keys, toJS } from "mobx";
import roleStore from "../store/roleStore";
const GENDER_ENUM = {
  MALE: 0,
  FEMALE: 1,
};
const AddEmployeeForm = observer(({ handleClose, isOpen }) => {
  var currentEmployee = employeeStore.requiredEmployee;
  currentEmployee?.roles?.map((role) => new Date(role.startDate));
  console.log(toJS(currentEmployee));
  const { register, handleSubmit, control, setValue, watch } = useForm();
  const keys = Object.keys(GENDER_ENUM);
  const [genderValue, setGenderValue] = useState();
  const [isReadyToSend, setIsReadyToSend] = useState(true);

  // const dialogContentRef = useRef(null);
  console.log(toJS(currentEmployee));

  useEffect(() => {
    setValue("firstName", currentEmployee?.firstName || "");
    setValue("lastName", currentEmployee?.lastName || "");
    setValue("idNumber", currentEmployee?.idNumber || "");
    setValue(
      "dateSartingWork",
      currentEmployee?.dateSartingWork.split("T")[0] || "",
    );
    setValue(
      "dateOfBirth",
      currentEmployee?.dateSartingWork.split("T")[0] || "",
    );
    setValue("gender", GENDER_ENUM.FEMALE);
    setValue("roles", currentEmployee?.roles || []);

    setGenderValue(GENDER_ENUM[keys[currentEmployee?.gender]]);
  }, [currentEmployee, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles",
  });
  function validateRole(value) {
    console.log(value);
    return true;
  }

  function onSubmit(data) {
    debugger;
    setIsReadyToSend(true);
    console.log("data to send", data);
    const roleNames = new Set();
    for (const role of data.roles) {
      if (roleNames.has(role.name)) {
        setIsReadyToSend(false);
        //  currentEmployee=data;
        console.log("send?", isReadyToSend);
      }
      roleNames.add(role.name);
    }
    console.log("send?", isReadyToSend);
    if (isReadyToSend) {
      console.log(data);
      data.gender = parseInt(data.gender);
      data.roles.map(
        (role) => role.isAdministrative == Boolean(data.isAdministrative),
      );
      if (currentEmployee) {
        const id = employeeStore.getIdByIdnumber(data.idNumber);
        employeeStore.changeData(id, data);
      } else employeeStore.addData(data);
      employeeStore.requiredEmployee
        ? (employeeStore.requiredEmployee.roles = [])
        : (employeeStore.requiredEmployee = undefined);
      employeeStore.requiredEmployee = undefined;

      handleClose();
    }
  }

  // useEffect(() => {
  //     if (isOpen && dialogContentRef.current) {
  //         dialogContentRef.current.scrollTo(0, 0);
  //     }
  // }, [isOpen]);

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{ "& .MuiDialog-paper": { width: "80%", overflow: "auto" } }}
    >
      <Card
        component="form"
        sx={{
          maxWidth: "98%",
          // mx: 'auto',
          // to make the demo resizable
          overflow: "auto",
        }}
        onSubmit={handleSubmit(onSubmit)}
        // ref={dialogContentRef}
      >
        {!isReadyToSend && (
          <Alert severity="error">You choose the same role twice!</Alert>
        )}
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <TextField
            {...register("firstName", { required: true })}
            type="text"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <TextField
            {...register("lastName", { required: true })}
            type="text"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Id number</FormLabel>
          <TextField
            {...register("idNumber", { required: true })}
            type="text"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Start Work</FormLabel>
          <TextField
            {...register("dateSartingWork", { required: true })}
            type="date"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Birth Day</FormLabel>
          <TextField
            {...register("dateOfBirth", { required: true })}
            type="date"
          />
        </FormControl>

        <FormLabel>Gender</FormLabel>
        <RadioGroup
          value={genderValue !== undefined ? genderValue : ""}
          onChange={(event) => setGenderValue(parseInt(event.target.value))}
        >
          <FormControlLabel
            value={GENDER_ENUM.MALE}
            control={<Radio {...register("gender")} />}
            label="Male"
          />
          <FormControlLabel
            value={GENDER_ENUM.FEMALE}
            control={<Radio {...register("gender")} />}
            label="Female"
          />
        </RadioGroup>
        <Typography level="title-lg">Roles</Typography>

        <Button type="button" onClick={() => append({})}>
          Add Role
        </Button>

        {fields.map((item, index) => (
          <CardContent
            key={item.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(80px, 1fr))",
              gap: 1.5,
            }}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register(`roles.${index}.name`, { required: true })}
                label="Name"
                value={watch(`roles.${index}.name`)}
                onChange={(event) => {
                  setValue(`roles.${index}.name`, event.target.value);
                }}
              >
                {roleStore.roles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <TextField
                {...register(`roles.${index}.startDate`)}
                type="date"
              />
            </FormControl>
            <FormControl>
              <FormLabel>is Admin</FormLabel>
              <Checkbox
                {...register(`roles.${index}.isAdministrative`)}
                defaultChecked={currentEmployee?.roles[index]?.isAdministrative}
                label="Is Admin"
              ></Checkbox>
            </FormControl>

            <Button
              type="button"
              startIcon={<DeleteIcon />}
              onClick={(event) => {
                remove(index);
              }}
            >
              Delete
            </Button>
          </CardContent>
        ))}

        <CardActions>
          <Button type="submit">Submit</Button>
        </CardActions>
      </Card>
    </Dialog>
  );
});
export default AddEmployeeForm;
