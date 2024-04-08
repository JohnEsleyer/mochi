import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import supabase from "./utils/supabase";

const protectedRoutes = ["/home", "/signout", "/api/japan"]

export default async function middleware(req: NextRequest){
    
}
