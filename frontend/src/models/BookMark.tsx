interface BookMark {
  createdAt: string;
  description: string;
  favicon: string;
  id: string;
  isArchived: string;
  lastVisited: string;
  pinned: boolean;
  tags: string[];
  title: string;
  url: string;
  visitCount: number;
}

export type { BookMark };
