"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { createUser, login } from "../actions"
import { toast } from "sonner"

const AuthFormPage = () => {
    // Login state
    const [loginData, setLoginData] = useState({
        id: '',
        password: '',
        role: ''
    })

    // Signup state
    const [signupData, setSignupData] = useState({
        name: '',
        password: '',
        id: '',
        role: ''
    })

    const handleLoginChange = (field, value) => {
        setLoginData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSignupChange = (field, value) => {
        setSignupData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSignUpSubmit = async (e) => {
        e.preventDefault()
        // Add validation here
        if (!signupData.name || !signupData.password || !signupData.id || !signupData.role) {
            toast.warning("Please fill all fields")
            return
        }
        // Submit logic here
        let data = await createUser(signupData.name, signupData.password, signupData.id, signupData.role)
        if (data === false) {
            toast.error("Application ID already exists")
            return
        }
        else {
            toast.success("User created successfully")
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        // Add validation here
        if (!loginData.id || !loginData.password || !loginData.role) {
            toast.warning("Please fill all fields")
            return
        }
        // Submit logic here
        let data = await login(loginData.id, loginData.password, loginData.role);
        if (data === false) {
            toast.error("Invalid credentials")
        } else {
            toast.success("Login successful")
        }
    }

    return (
        <div className="h-full w-full flex items-center justify-center py-12">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Tabs defaultValue="login">
                    <TabsList className={"w-full"}>
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Canteen member, students, admin can login.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="login-id">Application ID</Label>
                                    <Input
                                        id="login-id"
                                        placeholder="Enter your application id"
                                        value={loginData.id}
                                        onChange={(e) => handleLoginChange('id', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="login-password">Password</Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={loginData.password}
                                        onChange={(e) => handleLoginChange('password', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="login-role">Role</Label>
                                    <Select value={loginData.role} onValueChange={(value) => handleLoginChange('role', value)}>
                                        <SelectTrigger className="w-full flex items-center justify-between gap-2">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="staff">Staff</SelectItem>
                                            <SelectItem value="warden">Warden</SelectItem>
                                            <SelectItem value="student">Student</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className={"w-full"} onClick={handleLoginSubmit}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription>
                                    Canteen member, students, admin can sign up.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-name">Name</Label>
                                    <Input
                                        id="signup-name"
                                        placeholder="Enter your name"
                                        value={signupData.name}
                                        onChange={(e) => handleSignupChange('name', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={signupData.password}
                                        onChange={(e) => handleSignupChange('password', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-id">Application ID</Label>
                                    <Input
                                        id="signup-id"
                                        placeholder="Enter your application id"
                                        value={signupData.id}
                                        onChange={(e) => handleSignupChange('id', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-role">Role</Label>
                                    <Select value={signupData.role} onValueChange={(value) => handleSignupChange('role', value)}>
                                        <SelectTrigger className="w-full flex items-center justify-between gap-2">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="staff">Staff</SelectItem>
                                            <SelectItem value="warden">Warden</SelectItem>
                                            <SelectItem value="student">Student</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className={"w-full"} onClick={handleSignUpSubmit}>Sign Up</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AuthFormPage