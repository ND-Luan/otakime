import { authService } from "@/services";
import authStore from "@/store/auth_store";
import { Card } from "@heroui/card";
import { Form, Button, Image, Input } from "@heroui/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        if (!data.email) {
            setErrors({ email: "Email is required" });
            return;
        }

        const response = await authService.login(data.email as string, data.password as string);
        if (response.IsSuccess) {
            authStore.getState().login(response.Data);
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00CCFF] via-[#F3ADC3] to-[#ADF709]">
            <Card className="bg-white rounded-3xl shadow-2xl flex flex-row w-full max-w-5xl overflow-hidden">
                {/* Left Side - Form */}
                <div className="flex flex-col justify-between px-10 py-12 w-full md:w-1/2">
                    <div>
                        <div className="font-logo text-4xl font-bold mb-8 bg-gradient-to-r from-[#00CCFF] via-[#F3ADC3] to-[#ADF709] bg-clip-text text-transparent">
                            Melarist
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome Back!</h2>
                        <p className="text-gray-600 mb-8">Sign in to continue to your account</p>

                        <Form className="space-y-5" validationErrors={errors} onSubmit={onSubmit}>
                            <Input
                                name="email"
                                type="email"
                                label="Email Address"
                                placeholder="your.email@example.com"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 hover:border-[#00CCFF] focus-within:border-[#00CCFF]",
                                    input: "text-gray-800",
                                    label: "text-gray-700 font-medium"
                                }}
                                required
                            />
                            
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 hover:border-[#00CCFF] focus-within:border-[#00CCFF]",
                                    input: "text-gray-800",
                                    label: "text-gray-700 font-medium"
                                }}
                                required
                                endContent={
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-[#00CCFF] transition"
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                }
                            />

                            <div className="flex justify-end">
                                <a href="#" className="text-sm text-[#00CCFF] hover:text-[#0099CC] font-medium">
                                    Forgot Password?
                                </a>
                            </div>

                            <Button
                                className="w-full font-bold bg-gradient-to-r from-[#00CCFF] to-[#ADF709] text-white text-base rounded-xl py-6 hover:opacity-90 transition shadow-lg"
                                size="lg"
                                type="submit"
                            >
                                SIGN IN
                            </Button>
                        </Form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="bordered"
                                className="flex-1 bg-white border-2 border-gray-200 hover:border-[#00CCFF] text-gray-700 font-semibold transition"
                                startContent={
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                                }
                            >
                                Google
                            </Button>
                            <Button
                                variant="bordered"
                                className="flex-1 bg-white border-2 border-gray-200 hover:border-[#00CCFF] text-gray-700 font-semibold transition"
                                startContent={
                                    <img src="https://www.svgrepo.com/show/512317/apple-173.svg" alt="Apple" className="h-5 w-5" />
                                }
                            >
                                Apple
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-8 text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="ml-1 text-[#00CCFF] hover:text-[#0099CC] font-semibold">
                            Sign Up
                        </a>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-[#F3ADC3] to-[#ADF709] items-center justify-center p-12">
                    <div className="relative z-10 text-center">
                        <h3 className="text-4xl font-bold text-white mb-4">Hello, Friend!</h3>
                        <p className="text-white/90 text-lg mb-8">
                            Enter your details and start your journey with us
                        </p>
                        <Image
                            isBlurred
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600&q=80"
                            alt="Welcome"
                            className="rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}