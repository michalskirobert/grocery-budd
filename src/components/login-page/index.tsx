import { CustomForm } from "@components/shared";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useLoginService } from "./service";
import { FORM } from "./utils";

import * as S from "./styles";

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
        <Form onSubmit={handleSubmit}>
          <S.Container>
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
            <Button {...{ color: "primary", type: "submit" }}>Sign in</Button>
            <S.InformationContainer>
              <S.text>If you have no account</S.text>
              <Link {...{ to: "/sign-up" }}>Sign-up</Link>
            </S.InformationContainer>
          </S.Container>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
