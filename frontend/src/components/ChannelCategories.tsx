import { List } from "@mui/material";
import { useEffect, useState } from "react";
import useChannel, { Channel } from "../hook/useChannel";
import useServerStore from "../store/useServerStore";
import { CategoryWiseChannel, groupChannelsByCategory } from "../utils";
import ChannelCategoryItem from "./ChannelCategoryItem";

interface Props {
  serverId: number;
}

const ChannelCategories = ({ serverId }: Props) => {
  const [categoryWiseChannels, setCategoryWiseChannel] = useState<
    CategoryWiseChannel[]
  >([]);

  const setSelectedChannel = useServerStore((s) => s.setSelectedChannel);
  const selectedServer = useServerStore((s) => s.selectedServer);
  const { data, isLoading, error } = useChannel({ serverId });
  const channels = data?.results;

  const preProcessChannelData = (channels: Channel[]) => {
    const categoryWiseChannel: CategoryWiseChannel[] =
      groupChannelsByCategory(channels);

    setCategoryWiseChannel(categoryWiseChannel);
    setSelectedChannel(channels[0]);
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
        return <ChannelCategoryItem key={category.id} category={category} />;
      })}
    </List>
  );
};

export default ChannelCategories;
