
import supabase from "./supabase";


export async function isAuth(){
 
        const { data, error } = await supabase.auth.getUser();
        if (error){
            console.log('Error');
            return false;
        }
        return data;
      
}
