import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

import { CategoryWiseChannel } from "../utils";
import ChannelItem from "./ChannelItem";

interface Props {
  category: CategoryWiseChannel;
}

const ChannelCategoryItem = ({ category }: Props) => {
  const [categoryExpand, setCategoryExpand] = useState<boolean>(true);
  const { name, channels } = category;

  return (
    <>
      <ListItemButton onClick={() => setCategoryExpand(!categoryExpand)}>
        {/* <ListItemIcon>{<InboxIcon />}</ListItemIcon> */}
        <ListItemText primary={name} />
        {categoryExpand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={categoryExpand} timeout="auto" unmountOnExit>
        <List>
          {channels.map((channel) => {
            return <ChannelItem key={channel.id} channel={channel} />;
          })}
        </List>
      </Collapse>
    </>
  );
};

export default ChannelCategoryItem;
