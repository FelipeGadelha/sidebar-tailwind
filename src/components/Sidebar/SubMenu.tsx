"use client";
import React, { ElementType, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface ISubMenu {
  data: {
    name: string;
    icon: ElementType;
    menus: string[];
  };
}

function SubMenu({ data }: ISubMenu) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const pathname = usePathname()
  return (
    <>
      <li
        className={
          `p-2.5 flex flex-row rounded-md gap-6 items-center cursor-default duration-300 font-medium 
          ${pathname.includes(data.name) && "text-blue-600"}
          md:cursor-pointer`
        }
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={`${subMenuOpen && "rotate-180"} duration-200`}
        />
      </li>
      <motion.ul
        animate={subMenuOpen ? { height: "fit-content" } : { height: 0 }}
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.map((menu) => (
          <li key={menu}>
            <Link
              href={`/${data.name}/${menu}`}
              className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium !bg-transparent capitalize"
            >
              {menu}
            </Link>
          </li>
        ))}
      </motion.ul>
    </>
  );
}

export default SubMenu;
