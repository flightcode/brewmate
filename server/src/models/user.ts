export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
};

export type StrengthResult = {
  strong: boolean;
  tests: {
    minLength: boolean;
    minLowerCaseChars: boolean;
    minUpperCaseChars: boolean;
    minNumbers: boolean;
    minSpecialChars: boolean;
    forbiddenChars: boolean;
  };
};
