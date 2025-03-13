import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { INavigator } from "@/interfaces/user.interface";
import Link from "next/link";

interface Props {
  paths: INavigator[];
}

const Navigator = ({ paths }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map(({ label, path }, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={path} className="text-gray-100">
                  {label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {paths.length > index + 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Navigator;
