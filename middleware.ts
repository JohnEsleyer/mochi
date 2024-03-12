import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import supabase from "./app/utils/supabase";

const protectedRoutes = ["/home", "/signout", "/api/japan"]

export default async function middleware(req: NextRequest){
    try{
        const cookie = cookies().get('access-token');
        const {data: {user}} = await supabase.auth.getUser(cookie?.value);

        if (!(user?.role == "authenticated") && protectedRoutes.includes(req.nextUrl.pathname)){
            const absoluteURL = new URL("/signin", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }else if ((user?.role == "authenticated") && req.nextUrl.pathname == "/signin"){
            const absoluteURL = new URL("/home", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }else{
            return NextResponse.next();
        }
    }catch(e){
        const absoluteURL = new URL("/home", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}
