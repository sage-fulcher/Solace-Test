interface ILinkProps {
  href: string;
  text?: string;
}
export const Link = ({ href, text }: ILinkProps) => {
  return (
    <a
      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      href={`tel:${href}`}
    >
      {text ? text : href}
    </a>
  );
};
