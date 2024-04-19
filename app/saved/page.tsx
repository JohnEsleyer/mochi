'use client'
import Template from "@/components/PageTemplate";
import { useEffect, useState } from "react";



export default function Katakana(){
    return (
        <Template>
            <div className="h-full grid grid-cols-6">
            <div className="row-span-3 bg-gray-900 p-2 pt-4">
                <div className="grid grid-cols-3 p-2 bg-orange-200 text-black rounded">
                <p className="col-span-2">New group</p>
                <span className="col-span-1 material-symbols-outlined flex justify-end">
                    add_box
                </span>
                </div>
            </div>
            <div>

            </div>
            </div>
            
            </Template>
    );  
}