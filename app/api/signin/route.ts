import supabase from "@/app/utils/supabase";
import {redirect} from 'next/navigation';
import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(request: Request) {
    console.log("Sign In Route Handler Executed");
    const {email, password} = await request.json();
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email, 
        password: password,
    });

    if (error){
        console.log(error);
        return Response.json({
            status: 0,
            body: {
                
            }
        });
    }

    cookies().set("access-token", data.session?.access_token || '');

    return NextResponse.json({
        status: 200
    });
  }