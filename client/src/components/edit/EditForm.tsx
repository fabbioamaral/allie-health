import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "../../models/user.model";

type Props = {
  handleClose: () => void;
  refetch: () => void;
  open: boolean;
  user: User;
};

const EditForm = ({ handleClose, refetch, open, user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const [{ loading, error }, executePut] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/user`,
      method: "PUT",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    if (!isValid) return;

    await executePut({
      data: {
        ...data,
        id: user.id,
      },
    });
    refetch();
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {error && (
                <Alert severity="error">
                  Sorry - there was an error creating the user
                </Alert>
              )}
              <TextField
                label="First Name"
                variant="outlined"
                required={true}
                {...register("firstName")}
                defaultValue={user?.first_name}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                required={true}
                {...register("lastName")}
                defaultValue={user?.last_name}
              />
              <TextField
                label="Email"
                variant="outlined"
                {...register("email")}
                required={true}
                type="email"
                defaultValue={user?.email}
              />
              <TextField
                label="Birthday"
                variant="outlined"
                {...register("birthday")}
                required={true}
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue={user?.birthday}
              />
              <Button variant="contained" type="submit" disabled={loading}>
                Edit User
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditForm;
