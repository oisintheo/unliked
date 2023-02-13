export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}

export interface UserDetails {
  id: string /* primary key */;
  name: string;
  username: string;
  avatar_url?: string;
}
