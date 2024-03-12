import supabase from "@/utils/supabase";
import {cookies} from 'next/headers';
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    await supabase.auth.signOut()

    cookies().set('access-token','');

    return NextResponse.redirect(new URL('/', request.url));
}