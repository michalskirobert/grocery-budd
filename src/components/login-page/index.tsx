import { CustomForm } from "@components/shared";
import { Formik } from "formik";
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
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <>
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
              }}
            />
          ))}
          <Button type="submit" onClick={() => handleSubmit()}>
            Sign in
          </Button>
          if you have no account, <Link {...{ to: "/sign-up" }}>Sign-up</Link>
        </>
      )}
    </Formik>
  );
};

export default LoginPage;
