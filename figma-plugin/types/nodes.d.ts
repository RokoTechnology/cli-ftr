export type Story = {
  id: string;
  name: string;
  title: string;
  html: string;
};

export type Component = {
  name: string;
  type: "text" | "tag" | "script" | "style" | "comment";
  tag: string; // TODO better typing
  class: string;
  style: object;
  children: Component[] | Leaf;
};

export type Leaf = LeafText | LeafSVG;

export type LeafText = {
  tag: "text";
  content: string;
};

export type LeafSVG = {
  tag: "svg";
  content: string;
};

export type Page = {
  title: string;
  components: Component[];
};
