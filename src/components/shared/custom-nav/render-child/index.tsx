import { Link } from "./link";
import { Dropdown } from "./dropdown";
import { Search } from "./search";

export const RenderChild = ({ type, content, eventKey, options }) => {
  switch (type) {
    case "search":
      return <Search />;
    case "link":
      return <Link {...{ content, eventKey }} />;
    case "dropdown":
      return <Dropdown {...{ content, eventKey, options }} />;

    default:
      return null;
  }
};
