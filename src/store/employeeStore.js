import { makeObservable, observable, action, runInAction } from "mobx";
import EmlpyeeAPI from "../API/employeeApi";
import { toJS } from "mobx";
import axios from "axios";

class EmployeeStore {
  employees = [];
  requiredEmployee = undefined;
  baseUrl = "https://localhost:7191/api/Emlpyee";
  constructor() {
    makeObservable(this, {
      employees: observable,
      requiredEmployee: observable,
      addData: action,
      changeData: action,
      daleteData: action,
    });
    this.getData();
  }
  // async getData() {
  //     try {
  //         const response = await EmlpyeeAPI.get();
  //         runInAction(() => {
  //             this.employees = response.data;
  //         });
  //     } catch (error) {
  //         console.log("get employee data", error);
  //     }
  // }

  getData() {
    axios
      .get(this.baseUrl)
      .then((res) => {
        console.log(res.data);
        runInAction(() => {
          this.employees = res.data;
        });
      })
      .catch((error) => {
        console.log("Error fetching employee data:", error);
      });
  }

  getDataById(id) {
    axios
      .get(`${this.baseUrl}/${id}`)
      .then((res) => {
        console.log(res.data);
        runInAction(() => {
          this.requiredEmployee = res.data;
        });
        return res.data;
      })
      .catch((error) => {
        console.log("Error fetching employee data:", error);
      });
  }

  getIdByIdnumber(idNumber) {
    return toJS(this.employees.find((e) => e.idNumber == idNumber).id);
  }
  async addData(data) {
    console.log(data);
    try {
      const response = await EmlpyeeAPI.post(data);
      runInAction(() => {
        this.employees.push(response.data);
      });
    } catch (error) {
      console.log("post employee data", error);
    }
  }
  async changeData(id, data) {
    // const id = data.id;
    try {
      const response = await EmlpyeeAPI.put(id, data);
      runInAction(() => {
        this.employees.forEach((element, index) => {
          if (element.id === id) {
            this.employees[index] = response.data;
          }
        });
      });
    } catch (error) {
      console.log("put employee data", error);
    }
  }
  async daleteData(id) {
    try {
      const response = await EmlpyeeAPI.delete(id);
      runInAction(() => {
        this.employees = this.employees.filter((item) => item.id !== id);
      });
    } catch (error) {
      console.log("delete employee data", error);
    }
  }
}
export default new EmployeeStore();
