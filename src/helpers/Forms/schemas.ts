export interface SignInFormSchema {
  email: string;
  password: string;
}

export interface SignUpFormSchema {
  email: string;
  name: string;
  password?: string;
  image?: string;
}

export interface SignInGithubSchema {
  email: string;
  name?: string;
  image?: string;
}

export interface ToDoFormSchema {
  title: string;
  description: string;
  checked: boolean;
  user: string;
}
