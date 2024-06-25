import { Link, useParams } from "react-router-dom";
import { User } from "../../models/user.model";
import useAxios from "axios-hooks";
import { Button } from "@mui/material";

const EditUser = () => {
  let { id } = useParams();

  const [{ data, loading, error }] = useAxios({
    url: `${process.env.REACT_APP_SERVER_BASE_URL}/user`,
    params: { id },
    method: "GET",
  });

  return (
    <>
      <Button variant="contained" type="submit" disabled={loading}>
        <Link to="/" style={{ color: "white", textDecorationLine: "none" }}>
          Home
        </Link>
      </Button>
      <h2>First Name</h2>
      <p>{data?.user.first_name}</p>
      <h2>Last Name</h2>
      <p>{data?.user.last_name}</p>
      <h2>Email</h2>
      <p>{data?.user.email}</p>
      <h2>Birthday</h2>
      <p>{data?.user.birthday ? data?.user.birthday : "Not Informed"}</p>
    </>
  );
};

export default EditUser;
