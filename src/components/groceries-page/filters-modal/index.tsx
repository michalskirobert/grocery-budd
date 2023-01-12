import Select from "react-select";

import { CustomBlockLoader } from "@components/shared";
import { useState } from "react";
import { ModalHeader } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CATEGORIES } from "./utils";

export const Filters = ({ toggle, isLoading, isOpen, onFilters }) => {
  const [search, setSearch] = useState<string>("");
  const [key, setKey] = useState<{ label: string; value: string }>({
    label: "Name",
    value: "name",
  });

  return (
    <Modal {...{ isOpen, toggle }}>
      <ModalHeader {...{ toggle }}>Filters</ModalHeader>
      <CustomBlockLoader {...{ isBlocking: isLoading }}>
        <ModalBody>
          <InputGroup size="sm">
            <InputGroupText>
              <Search />
            </InputGroupText>
            <div>
              <Select
                {...{
                  options: CATEGORIES,
                  defaultValue: CATEGORIES[0],
                  value: key,
                  styles: {
                    container: (prov) => ({
                      ...prov,
                      width: "135px",
                      marginRight: "2px",
                    }),
                  },
                  onChange: (e: any) => setKey(e),
                }}
              />
            </div>
            <Input
              {...{
                type: "search",
                placeholder: "Insert the key",
                value: search,
                onChange: (e) => setSearch(e.currentTarget.value),
              }}
            />
          </InputGroup>
        </ModalBody>
      </CustomBlockLoader>
      <ModalFooter>
        <Button
          {...{
            color: "primary",
            onClick: () => onFilters({ key: key.value, search }),
          }}
        >
          Find
        </Button>
        <Button {...{ color: "secondary", onClick: toggle }}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};
