import { Link, useParams } from "react-router-dom";
import { User } from "../../models/user.model";
import useAxios from "axios-hooks";
import { Button } from "@mui/material";
import { useState } from "react";
import EditForm from "./EditForm";

const EditUser = () => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  const { id } = useParams();

  const [{ data, loading, error }, refetch] = useAxios({
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
      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        onClick={() => setIsEditUserOpen(true)}
      >
        Edit User
      </Button>
      <EditForm
        open={isEditUserOpen}
        handleClose={() => setIsEditUserOpen(!isEditUserOpen)}
        refetch={refetch}
        user={data?.user}
      />
    </>
  );
};

export default EditUser;
