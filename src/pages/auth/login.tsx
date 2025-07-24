import { authService } from "@/services";
import authStore from "@/store/auth_store";
import { Card } from "@heroui/card";
import { Form, Button, Image, Input } from "@heroui/react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
export default function Login() {
    const router = useRouter()

    const [errors, setErrors] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        if (!data.email) {
            setErrors({ email: "email is required" });

            return;
        }
        const response = await authService.login(data.email as string, data.password as string);
        if (response.IsSuccess) {
            // Assuming you have a way to set the user in your auth store
            authStore.getState().login(response.Data);
            router.push("/admin/dashboard")
        }

        // setErrors(result.errors);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#bca892] to-[#e6d6c3]">
            <Card className="bg-[#f5ede4] rounded-3xl shadow-2xl flex flex-row w-full max-w-5xl overflow-hidden">
                {/* Left Side */}
                <div className="flex flex-col justify-between px-10 py-12 w-full md:w-1/2">
                    <div>
                        <div className="font-logo text-3xl font-bold mb-6 text-[#6d4c2c]">Melarist</div>
                        <h2 className="text-2xl font-semibold mb-2 text-[#3d2c1e]">Create an Account</h2>
                        <p className="text-[#7c6a58] mb-6">Sign up and get 30 days free trial</p>
                        <Form className="space-y-4" validationErrors={errors} onSubmit={onSubmit}>
                            <Input
                                name="email"
                                type="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-[#ede3d6] border-none",
                                    input: "text-[#3d2c1e]",
                                }}
                                required
                            />
                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-[#ede3d6] border-none",
                                    input: "text-[#3d2c1e]",
                                }}
                                required
                                endContent={
                                    <Button tabIndex={-1} className="text-[#bca892] hover:text-[#6d4c2c]">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </Button>
                                }
                            />

                            <div className="flex flex-col gap-1 text-xs text-[#a68b6a] mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#bca892] inline-block" />
                                    Must be at least 8 characters
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#bca892] inline-block" />
                                    Must contain one special character
                                </div>
                            </div>
                            <Button
                                color="warning"
                                className="w-full font-semibold bg-[#bca892] text-white text-base rounded-lg py-2 mt-2 hover:bg-[#a68b6a] transition"
                                size="lg"
                                type="submit"
                            >
                                SUBMIT
                            </Button>
                        </Form>
                        <div className="flex gap-4 mt-6">
                            <Button
                                variant="bordered"
                                className="flex-1 bg-white border-[#bca892] text-[#3d2c1e] font-semibold"
                                startContent={
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                                }
                            >
                                Google
                            </Button>
                            <Button
                                variant="bordered"
                                className="flex-1 bg-white border-[#bca892] text-[#3d2c1e] font-semibold"
                                startContent={
                                    <img src="https://www.svgrepo.com/show/512317/apple-173.svg" alt="Apple" className="h-5 w-5" />
                                }

                            >
                                Apple
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-8 text-xs text-[#7c6a58]">
                        <div>
                            Already Have an Account?{" "}
                            <a href="#" className="underline text-[#3d2c1e] font-semibold">Sign In</a>
                        </div>
                        <a href="#" className="underline">Terms & Conditions</a>
                    </div>
                </div>
                {/* Right Side */}
                <div className="hidden md:block w-1/2 relative bg-[#e6d6c3] overflow-hidden">
                    <Image
                        isBlurred
                        src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600&q=80"
                        alt="Meeting"
                    />
                </div>
            </Card>
        </div>
    );
}