import { CustomForm } from "@components/shared";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useLoginService } from "./service";
import { FORM } from "./utils";

export const LoginPage = () => {
  const { signIn } = useLoginService();

  return (
    <Formik
      {...{
        initialValues: { email: "", password: "" },
        onSubmit: (values) => signIn(values),
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
            <Button type="submit">Sign in</Button>
          </Form>
          if you have no account, <Link {...{ to: "/" }}>Sign-up</Link>
        </>
      )}
    </Formik>
  );
};

export default LoginPage;
