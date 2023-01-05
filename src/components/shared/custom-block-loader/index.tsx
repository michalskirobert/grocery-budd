import BlockUi from "react-block-ui";

import { NShared } from "@namespace/shared";
import { Spinner } from "react-bootstrap";

export const CustomBlockLoader = ({
  children,
  isBlocking,
}: NShared.ICustomLoader) => (
  <BlockUi
    {...{
      tag: "div",
      blocking: isBlocking,
      loader: <Spinner animation="border" variant="warning" />,
    }}
  >
    {children}
  </BlockUi>
);
