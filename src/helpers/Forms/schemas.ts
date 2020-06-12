export interface SignInFormSchema {
  email: string;
  password: string;
}

export interface SignUpFormSchema {
  email: string;
  name?: string;
  image?: string;
  password?: string;
}

export interface SignInGithubSchema {
  email: string;
  name?: string;
  image?: string;
}
