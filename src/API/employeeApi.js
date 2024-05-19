import axios from "axios";

class EmlpyeeAPI {
  baseURL = "https://localhost:7191/api/Emlpyee";
  // async get() {
  //     const res = await axios.get(this.baseURL)
  //     return res;

  // }
  get() {
    axios
      .get(this.baseURL)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }
  async getById(id) {
    const res = await axios.get(`${this.baseURL}/${id}`);
    return res;
  }
  async delete(id) {
    const res = await axios.delete(`${this.baseURL}/${id}`);
    return res;
  }
  async post(data) {
    const res = await axios.post(this.baseURL, data);
    return res;
  }
  async put(id, data) {
    const res = await axios.put(`${this.baseURL}/${id}`, data);
    return res;
  }
}
export default new EmlpyeeAPI();
