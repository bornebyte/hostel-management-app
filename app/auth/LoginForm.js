"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoginForm() {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <div className="h-full w-full flex items-center justify-center py-12">
            <form action={loginAction} className="flex lg:w-1/3 md:1/2 w-full mx-4 border border-gray-800 rounded-2xl p-10 flex-col gap-4">
                <p className="text-center font-bold text-3xl mb-4">Login</p>
                <div className="flex flex-col gap-2">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                    />
                </div>
                <SubmitButton />
                {state && <p className="text-center text-red-500">{state.message}</p>}
            </form>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} type="submit">
            {pending ? <Loader2 className="animate-spin" /> : ""} Login
        </Button>
    );
}