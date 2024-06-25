import { User } from "../../models/user.model";

type Props = {
  user?: User;
};

const EditUser = ({ user }: Props) => {
  return (
    <>
      <h2>First Name</h2>
      <p>{user?.firstName}</p>
      <h2>Last Name</h2>
      <p>{user?.lastName}</p>
      <h2>Email</h2>
      <p>{user?.email}</p>
      <h2>Birthday</h2>
      <p>{user?.birthday}</p>
    </>
  );
};

export default EditUser;
