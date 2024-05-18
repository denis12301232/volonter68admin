export interface IUser {
  id: string;
  login: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface INews {
  id: string;
  title: string;
  reporter: string;
  content: string;
  date: Date;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
