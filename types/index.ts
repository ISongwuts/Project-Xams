import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ServicesType {
  studentServices: string[],
  teacherServices: string[],
  manualServices: string[],
  authServices: string[],
}