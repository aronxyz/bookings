import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const authSchema = z.object({
    username: z.string().min(1, "Username is required"),

    password: z.string().min(1, "Password cannot be empty"),
  });

  type AuthFormValues = z.infer<typeof authSchema>;

  const { mutateAsync, isPending, isError, error } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: AuthFormValues) => {
    try {
      await mutateAsync(data);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed:", err.message);
      } else {
        console.error("Unexpected login error:", err);
      }
    }
  };

  return (
    <div>
      <Alert severity="info">
        Use <strong>admin</strong> with password <strong>password123</strong>
      </Alert>
      <Card
        variant="outlined"
        sx={{ maxWidth: "600px", marginInline: "auto", marginTop: "100px" }}
      >
        <CardHeader
          sx={{
            textAlign: "center",
          }}
          title="Welcome Back"
          subheader="Please log in to continue"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            {isError && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error?.message}
              </Alert>
            )}
            <Stack gap={3}>
              <TextField
                label="Username"
                fullWidth
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <FormControl
                variant="outlined"
                fullWidth
                error={!!errors.password}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  aria-describedby="password-helper-text"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {!!errors.password && (
                  <FormHelperText id="password-helper-text">
                    {errors.password?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </CardContent>
          <CardActions>
            <Button type="submit" loading={isPending} variant="contained">
              Log in
            </Button>
          </CardActions>
          <DevTool control={control} />
        </form>
      </Card>
    </div>
  );
}
