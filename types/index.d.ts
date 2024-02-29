import { SVGProps } from "react";
import { SessionOptions } from "iron-session";
import { Prefix, Role } from "@prisma/client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ServicesType {
  studentServices: string[],
  teacherServices: string[],
  manualServices: string[],
  authServices: string[],
}

export interface UserType {
  createAt?: Date
  first_name?: string
  last_name?: string
  password?: string
  personal_id?: string
  prefix?: Prefix
  role?: Role
  tel?: string
  user_id?: string
  username?: string
}

export const sessionOptions: SessionOptions = {
  password: process.env.COOKIES_SECRET! ,
  cookieName: 'session',
  cookieOptions: {
    httpOnly: true,
    secure: true,

  }
}


interface ExistsResponse {
  status: {
      ok: boolean
  },
  message: string
}