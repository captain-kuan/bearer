export type METHOD = "GET" | "POST" | "PUT" | "DELETE";

interface Workspace {
  id: number;
  name: string;
}

interface Collection {
  id: number;
  name: string;
}

interface CollectionItem {
  id: number;
  name: string;
  type: "";
  icon: "";
  children: CollectionItem[];
}

type Param = {};
type Header = {};
type Body = { mod: "raw"; raw: string };

interface Api {
  id: number;
  method: METHOD;
  url: string;
  params: Param[];
  headers: Header[];
  body: Body;
}
