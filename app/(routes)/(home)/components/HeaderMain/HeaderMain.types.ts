type TypeElement = "" | "password";

export type DataHeaderMainItemsProps = {
  icon: React.ComponentType<{ className?: string }>;
  typeElement: TypeElement;
  text: string;
};

export type HeaderMainProps = {
  userId: string;
};
