import {User} from "./user.model";


export interface Post {
  id: number;
  body: string;
  createdAt: Date;
  author: UserEntity;
}
