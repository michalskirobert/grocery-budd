import BlockUi from "block-ui";

import { NShared } from "@namespace/shared";

export const CustomLoader = ({
  children,
  isBlocking,
}: NShared.ICustomLoader) => (
  <BlockUi
    {...{
      tag: "div",
      blocking: isBlocking,
      loader: <div>Loader</div>,
    }}
  >
    {children}
  </BlockUi>
);
