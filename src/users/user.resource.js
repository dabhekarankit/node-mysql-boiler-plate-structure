import moment from "moment";

class UserResource {
  constructor(data) {
    this.userId = data.id;
    this.name = data.name;
    this.email = data.email;
    this.verifiedAt = moment(data.verifiedAt).unix();
    this.createdAt = moment(data.createdAt).unix();
  }
}

export default UserResource;
