import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const CustomCaptcha = () => (
  <ReCAPTCHA
    {...{
      sitekey: process.env.REACT_APP_CAPTCHA_KEY,
      onChange: (e) => console.log(e),
    }}
  />
);
