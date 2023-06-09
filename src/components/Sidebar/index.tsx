"use client";
import React, { createRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { AiOutlineAppstore } from "react-icons/ai";
import { HiOutlineDatabase } from "react-icons/hi";
import { RiBuilding3Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { BsPerson } from "react-icons/bs"

import Image from "next/image";
import Link from "next/link";
import SubMenu from "./SubMenu";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface ISubMenu {
  name: string;
  icon: IconType;
  menus: string[];
}

function Sidebar() {
  let isTableMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState<boolean>(isTableMid ? false : true);
  const sidebarRef = createRef<HTMLDivElement>();
  const pathname = usePathname();
  useEffect(() => {
    isTableMid ? setOpen(false) : setOpen(true);
  }, [isTableMid])

  useEffect(() => {
    isTableMid && setOpen(false)
  },[pathname])

  const navAnimation = isTableMid
    ? {
        open: { x: 0, width: "16rem", transition: { damping: 40 } },
        closed: { x: -250, width: 0, transition: { damping: 40, delay: 0.15 } },
      }
    : {
        open: { width: "16rem", transition: { damping: 40 } },
        closed: { width: "4rem", transition: { damping: 40 } },
      };

  const subMenusList: ISubMenu[] = [
    {
      name: "build",
      icon: RiBuilding3Line,
      menus: ["auth", "app-settings", "stroage", "hosting"],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "realtime", "events"],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 
          ${open ? "block" : "hidden"}
        `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={navAnimation}
        initial={{ x: isTableMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem]
          overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <Image
            src="https://img.icons8.com/color/512/firebase.png"
            width={45} height={45} alt=""
          />
          <span className="text-xl whitespace-pre">Fireball</span>
        </div>
        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <li>
              <Link href={"/"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <AiOutlineAppstore size={23} className="min-w-max" /> All Apps
              </Link>
            </li>
            <li>
              <Link href={"/authentication"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <BsPerson size={23} className="min-w-max" /> Authentication
              </Link>
            </li>
            <li>
              <Link href={"/stroage"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <HiOutlineDatabase size={23} className="min-w-max" /> Stroage
              </Link>
            </li>
            {(open || isTableMid) && (
              <div className="borber-y py-5 border-slate-300">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categorias
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <Link
                href={"/settings"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
              >
                <SlSettings size={23} className="min-w-max" />
                Settings
              </Link>
            </li>
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => { setOpen(!open) }}
          animate={open ? { x: 0, y: 0, rotate: 0 } : { x: -10, y: -200, rotate: 180 }}
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  )
}

export default Sidebar
