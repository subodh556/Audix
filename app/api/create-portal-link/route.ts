import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs"; 
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getUrl } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST() {
    try{
        const supabase = createRouteHandlerClient({cookies});
        const { data: { user } } = await supabase.auth.getUser();
        if(!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email || ''
        });

        if(!customer) {
            return new NextResponse('Customer not found', { status: 404 });
        }

        const { url } = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getUrl()}/account`
        });

        return NextResponse.json({url});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch (error: any) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }

}