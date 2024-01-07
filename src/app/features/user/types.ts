export interface UserStructure {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UserRepository {
  registerUser: (userToBeRegistered: UserStructure) => Promise<UserStructure>;
}
