export declare namespace NReducer {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;
  type JSX = JSX.Element;

  type TState = {
    username: S;
    isLogged: B;
    isFitri: B;
    isAdmin: B;
    permissions: N[];
    budgets: [];
    language: S;
  };

  type TAction = {
    payload: unknown & Record<string, unknown>;
    type: S;
  };
}
