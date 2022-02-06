
import { ConversationEntity } from './Conversation';
import {User} from "./user.model";

export interface Message {
  id?: number;
  message?: string;
  user?: UserEntity;
  conversation?: Conversation;
  createdAt?: Date;
}
