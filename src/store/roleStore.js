import { makeObservable, observable, action, runInAction } from "mobx";
class RolesStore {
  roles = [
    { name: "Manager" },
    { name: "Supervisor" },
    { name: "Team Leader" },
    { name: "Developer" },
    { name: "Designer" },
    { name: "Administrator" },
    { name: "Human Resources Specialist" },
    { name: "Sales Representative" },
    { name: "Accountant" },
    { name: "Customer Support Representative" },
  ];
  constructor() {
    makeObservable(this, {
      roles: observable,
      addRole: action,
      deleteRole: action,
    });
  }
  deleteRole(roleName) {
    runInAction(() => {
      this.roles.filter((r) => r.name != roleName);
    });
  }
  addRole(roleName) {
    runInAction(() => {
      this.roles.push({ name: roleName });
    });
  }
}
export default new RolesStore();
