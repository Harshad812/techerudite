import { useFormik } from "formik";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "tabler-icons-react";
import { singup } from "../../../api";
import "../../../assets/css/auth.css";

import { Input } from "../../../components";
import { RoutesMapping } from "../../../routes";
import { UserDetailPayload } from "../../../types/UserType";

export const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = useMemo(() => {
    const path = location.pathname.split("/").slice(-1).join();
    if (path.length) {
      return path;
    }
    return "admin";
  }, [location.pathname]);

  const initialValues: UserDetailPayload = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: userRole,
  };

  const handleSubmit = async (value: UserDetailPayload) => {
    try {
      if (value !== initialValues) {
        const response = await singup(value);
        if (response.status) {
          alert(response.messages);
          navigate(RoutesMapping.Signin);
        } else {
          alert(response.error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value: any) => handleSubmit(value),
    validate: (values: UserDetailPayload) => {
      const errors: Partial<UserDetailPayload> = {};

      if (!values.firstname) errors.firstname = "Please Enter FirstName";
      if (!values.lastname) errors.lastname = "Please Enter LastName";

      if (!values.password) errors.password = "Please Enter Password";

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
  });

  const error = useMemo(() => formik.errors, [formik.errors]);

  return (
    <div className="auth-container">
      <div className="card">
        <div className="logo">
          <span>{`${userRole} Signup`}</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">
            <Input
              placeholder="Enter FirstName"
              label={"FirstName"}
              icon={<User />}
              value={formik.values.firstname}
              onChange={formik.handleChange}
              name="firstname"
              error={error.firstname}
            />
            <Input
              placeholder="Enter LastName"
              label={"LastName"}
              icon={<User />}
              value={formik.values.lastname}
              onChange={formik.handleChange}
              name="lastname"
              error={error.lastname}
            />
            <Input
              placeholder="Enter Email"
              label={"Email"}
              icon={<Mail />}
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              name="email"
              error={error.email}
            />
            <Input
              placeholder="*********"
              name="password"
              label={"Password"}
              icon={<Lock />}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={error.password}
            />

            <div className="button-section">
              <button className="submit-button" type="submit">
                Signup
              </button>
              <div className="link-section">
                <button onClick={() => navigate(RoutesMapping.Signin)}>
                  Signin
                </button>
                <button>Forgate Password</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
