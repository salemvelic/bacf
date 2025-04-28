interface Author {
  name: string;
  picture: string;
}

export interface Comment {
  id: string;
  parent_id: string | null;
  author: Author;
  text: string;
  timestamp: number;
}
