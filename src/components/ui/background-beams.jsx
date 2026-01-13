"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 bg-neutral-950",
                className
            )}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_200px,#323238,transparent)]" />
            <div
                className="absolute h-full w-full"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #4a4a4a25 1px, transparent 1px), linear-gradient(to bottom, #4a4a4a25 1px, transparent 1px)",
                    backgroundSize: "4rem 4rem",
                }}
            ></div>
            <div
                className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"
            ></div>
            <div
                className="absolute right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"
            ></div>
        </div>
    );
};
