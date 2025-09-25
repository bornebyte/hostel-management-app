"use server";

import { createSession, deleteSession } from "@/lib/session";
import { AES, enc } from "crypto-js";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";

export async function createUserTable() {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      application_id VARCHAR(255) NOT NULL UNIQUE,
      role VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    return data;
}

export async function createUser(name, password, applicationId, role) {
    const sql = neon(process.env.DATABASE_URL);
    await createUserTable()
    let app_id = await sql`SELECT application_id FROM users WHERE application_id = ${applicationId}`
    console.log(app_id.length)
    if (app_id.length === 0) {
        const encryptedPassword = AES.encrypt(password, process.env.SESSION_SECRET).toString();
        const data = await sql`
            INSERT INTO users (name, password, application_id, role)
            VALUES (${name}, ${encryptedPassword}, ${applicationId}, ${role})
            RETURNING *;
          `;
        return true
    }
    return false
}


export async function login(id, pass, role) {
    const sql = neon(process.env.DATABASE_URL)
    let data = await sql`SELECT application_id, password, role FROM users WHERE application_id = ${id} AND role = ${role}`
    if (data.length === 0) {
        return false
    }
    const realPassword = AES.decrypt(data[0].password || "", process.env.SESSION_SECRET).toString(enc.Utf8)
    if (pass === realPassword) {
        // const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
        await createSession(data[0].application_id, role);
        if (role === "admin") {
            redirect("/dashboard/admin");
        } else if (role === "student") {
            redirect("/dashboard/student");
        } else if (role === "staff") {
            redirect("/dashboard/staff");
        } else if (role === "warden") {
            redirect("/dashboard/warden");
        } else if (role === "canteen-manager") {
            redirect("/dashboard/canteen-manager");
        }
    } else {
        return false
    }
}

export async function logout() {
    await deleteSession();
    redirect("/auth");
}

export async function createMenuTable() {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
        CREATE TABLE IF NOT EXISTS menus (
            id SERIAL PRIMARY KEY,
            date DATE NOT NULL,
            meal_time VARCHAR(50) NOT NULL,
            items JSONB NOT NULL,
            created_at DATE DEFAULT CURRENT_DATE,
            updated_at DATE DEFAULT CURRENT_DATE,
            UNIQUE(date, meal_time)
        );
    `;
}

export async function addOrUpdateMenu(formData) {
    const { date, mealTime, menuItems } = formData;
    const sql = neon(process.env.DATABASE_URL);
    await createMenuTable();

    // The 'items' column is JSONB, so we need to stringify the array.
    const itemsJson = JSON.stringify(menuItems);

    // Insert or update, but only storing dates (not time).
    const result = await sql`
    INSERT INTO menus (date, meal_time, items) VALUES (${date}, ${mealTime}, ${itemsJson}) RETURNING *;
  `;

    return result[0];
}


export async function getMenuForDate(date) {
    const sql = neon(process.env.DATABASE_URL);
    await createMenuTable();
    // const menus = await sql`
    //     SELECT * FROM menus;
    // `;
    const menus = await sql`
        SELECT * FROM menus WHERE date = ${date} ORDER BY meal_time;
    `;
    return menus;
}

export async function deleteMenu(menuId) {
    const sql = neon(process.env.DATABASE_URL);
    await createMenuTable();
    await sql`
        DELETE FROM menus WHERE id = ${menuId};
    `;
}

export async function createMenuFeedbackTable() {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
        CREATE TABLE IF NOT EXISTS menu_feedback (
            id SERIAL PRIMARY KEY,
            menu_id INTEGER NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
            user_id TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
            comments TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;
}

export async function addOrUpdateMenuFeedback({ menuId, userId, rating, comments }) {
    await createMenuFeedbackTable()
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`INSERT INTO menu_feedback (menu_id, user_id, rating, comments) VALUES (${menuId}, ${userId}, ${rating}, ${comments}) RETURNING *;`;
    return result[0];
}
