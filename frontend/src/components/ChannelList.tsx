import { ExpandLess, ExpandMore } from "@mui/icons-material";
import TagIcon from "@mui/icons-material/Tag";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import useChannel, { Channel } from "../hook/useChannel";
import useServerStore from "../store/useServerStore";
import { CategoryWiseChannel, groupChannelsByCategory } from "../utils";

interface Props {
  serverId: number;
}

interface CategoryExpand {
  [key: string]: boolean;
}

const ChannelList = ({ serverId }: Props) => {
  const [categoriesExpand, setCategoriesExpand] = useState<CategoryExpand>(
    {} as CategoryExpand
  );
  const [categoryWiseChannels, setCategoryWiseChannel] = useState<
    CategoryWiseChannel[]
  >([]);

  const setSelectedChannel = useServerStore((s) => s.setSelectedChannel);
  const selectedServer = useServerStore((s) => s.selectedServer);
  const selectedChannel = useServerStore((s) => s.selectedChannel);
  const { data, isLoading, error } = useChannel({ serverId });
  const channels = data?.results;

  const preProcessChannelData = (channels: Channel[]) => {
    const categoryWiseChannel: CategoryWiseChannel[] =
      groupChannelsByCategory(channels);
    const categoryExpandData: CategoryExpand = {};
    categoryWiseChannel.forEach(
      (category) => (categoryExpandData[category.name] = true)
    );
    setCategoryWiseChannel(categoryWiseChannel);
    setSelectedChannel(channels[0]);
    setCategoriesExpand(categoryExpandData);
  };

  useEffect(() => {
    if (selectedServer && channels) {
      preProcessChannelData(channels);
    }
  }, [selectedServer, channels]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) return null;

  return (
    <List>
      {categoryWiseChannels.map((category: CategoryWiseChannel) => {
        const { id, channels, name } = category;
        const isExpandCategory = categoriesExpand[name];
        return (
          <span key={id}>
            <ListItemButton
              onClick={() => {
                setCategoriesExpand({
                  ...categoriesExpand,
                  [name]: !isExpandCategory,
                });
              }}
            >
              {/* <ListItemIcon>{<InboxIcon />}</ListItemIcon> */}
              <ListItemText primary={name} />
              {isExpandCategory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isExpandCategory} timeout="auto" unmountOnExit>
              <List>
                {channels.map((channel) => {
                  return (
                    <ListItem
                      key={channel.id}
                      disablePadding
                      onClick={() => setSelectedChannel(channel)}
                    >
                      <ListItemButton
                        selected={selectedChannel?.id === channel.id}
                        sx={{ borderRadius: "10px" }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 40,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <TagIcon />
                          <img
                            src={channel.icon}
                            alt=""
                            className="w-4 h-4 m-2"
                          />
                          {"|"}
                        </ListItemIcon>
                        <ListItemText primary={channel.name} className="m-2" />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </span>
        );
      })}
    </List>
  );
};

export default ChannelList;
