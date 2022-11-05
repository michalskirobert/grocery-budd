export declare namespace NProvider {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;
  type JSX = JSX.Element;

  type TProviderProps = {
    Children: JSX;
  };

  type TLanguage = {
    value: S;
    label: S;
  };

  type TContextApiProps = {
    groceries: Record<string, any>[];
    setGroceries: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
    language: TLanguage;
    setLanguage: React.Dispatch<React.SetStateAction<TLanguage>>;
  };

  type TRoutes = readonly {
    path: string;
    Children: React.LazyExoticComponent<() => JSX.Element>;
    index?: boolean;
  }[];
}
