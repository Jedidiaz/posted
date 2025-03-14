import { LucideProps } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

interface Props {
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  link?: boolean;
}

const Tag = ({ Icon, label, link = false }: Props) => {
  const accessLink = () => {
    if (!link) return label;
    const regex =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
    if (regex.test(label)) {
      return label;
    }
    return `https://${label}`;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const url = useMemo(() => accessLink(), []);

  return (
    <p className="text-gray-500 text-sm flex items-center gap-1">
      {Icon && (
        <span>
          <Icon size={14} />
        </span>
      )}
      {link ? (
        <Link href={url} className="text-blue-700 underline" target="_blank">
          {label}
        </Link>
      ) : (
        label
      )}
    </p>
  );
};

export default Tag;
