import { Tab, Tabs } from "react-bootstrap";

export const CustomTab = () => {
  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        lol
      </Tab>
      <Tab eventKey="profile" title="Profile">
        2
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        3
      </Tab>
    </Tabs>
  );
};
