"use server";

import { createSession, deleteSession } from "@/lib/session";
import { neon } from "@neondatabase/serverless";
import { AES, enc } from "crypto-js";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
    let encryptedPassword = await sql.query("SELECT pass FROM password")
    const realPassword = AES.decrypt(encryptedPassword.rows[0].pass, process.env.SESSION_SECRET).toString(enc.Utf8)
    if (formData.get("password") !== realPassword) {
        const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
        await sql.query(`INSERT INTO notifications (title, created_at, category, label) VALUES ('Login Failed', '${date}','loginfailed','Login Failed')`);
        return {
            message: "Invalid Password",
        }
    } else {
        const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
        await sql.query(`INSERT INTO notifications (title, created_at, category, label) VALUES ('Login Successful', '${date}','loginsuccess','Login Successful')`);
        await createSession(encryptedPassword);
        redirect("/admin");
    }
}

export async function logout() {
    const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
    await sql.query(`INSERT INTO notifications (title, created_at, category, label) VALUES ('Logout', '${date}','logout','Logout')`);
    await deleteSession();
    redirect("/auth");
}