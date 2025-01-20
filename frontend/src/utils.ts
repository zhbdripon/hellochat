import { Channel } from "./hook/useChannel";

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export interface CategoryWiseChannel {
  id: number;
  name: string;
  channels: Channel[];
}

export function groupChannelsByCategory(
  channels: Channel[]
): CategoryWiseChannel[] {
  const categoryMap: { [key: number | string]: CategoryWiseChannel } = {};

  channels.forEach((channel) => {
    const categoryId = channel.category?.id ?? "uncategorized";
    const categoryName = channel.category?.name || "Uncategorized";

    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = {
        id: categoryId,
        name: categoryName,
        channels: [],
      };
    }

    categoryMap[categoryId].channels.push(channel);
  });

  return Object.values(categoryMap);
}
