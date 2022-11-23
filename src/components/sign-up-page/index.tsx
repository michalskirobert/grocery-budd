import { CustomForm } from "@components/shared";
import { CustomCaptcha } from "@components/shared/custom-captcha";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useSignUpService } from "./service";
import { FORM } from "./utils";

export const LoginPage = () => {
  const { signUp } = useSignUpService();

  return (
    <Formik
      {...{
        initialValues: {
          email: "",
          password: "",
          confirmPassword: "",
          captcha: false,
        },
        onSubmit: (values) => signUp(values),
      }}
    >
      {({ values, handleSubmit, handleChange, setFieldValue, errors }) => (
        <>
          <Form onSubmit={handleSubmit}>
            {FORM.map(({ id, kind, label, options }) => (
              <CustomForm
                {...{
                  id,
                  kind,
                  label,
                  options,
                  handleChange,
                  setFieldValue,
                  values,
                  errors,
                }}
              />
            ))}
            <Button type="submit">Sign up</Button>
            <CustomCaptcha />
          </Form>
          if you have an account, <Link {...{ to: "/sign-in" }}>Sign-in</Link>
        </>
      )}
    </Formik>
  );
};

export default LoginPage;
