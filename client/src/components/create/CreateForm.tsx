import { Alert, Box, Button, TextField } from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  onSubmit: () => void;
  refetch: () => void;
};

const CreateForm = ({ onSubmit, refetch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
      method: "POST",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    if (!isValid) return;

    await executePost({ data });
    refetch();
    onSubmit();
  };

  return (
    <>
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
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required={true}
            {...register("lastName")}
          />
          <TextField
            label="Email"
            variant="outlined"
            {...register("email")}
            required={true}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            Create User
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateForm;
