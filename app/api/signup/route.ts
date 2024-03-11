import supabase from "@/app/utils/supabase";
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    console.log("Sign Up Route Handler Executed");
    const {email, password} = await request.json();
    const {data, error} = await supabase.auth.signUp({
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

    const response = NextResponse.json({
        status: 200,
        body: {
            
        }
    });
    response.cookies.set("access-token", data.session?.access_token || '');
    return response;
  }