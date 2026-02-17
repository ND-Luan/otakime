import { authService } from "@/services";
import authStore from "@/store/auth_store";
import { Card } from "@heroui/card";
import { Form, Button, Image, Input, Checkbox } from "@heroui/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        special: false,
        number: false,
        match: false
    });

    const validatePassword = (password: string, confirmPassword: string = '') => {
        setPasswordChecks({
            length: password.length >= 8,
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            number: /\d/.test(password),
            match: password === confirmPassword && password.length > 0
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        // Validation
        if (!data.fullName) {
            setErrors({ fullName: "Full name is required" });
            return;
        }

        if (!data.email) {
            setErrors({ email: "Email is required" });
            return;
        }

        if (!data.password) {
            setErrors({ password: "Password is required" });
            return;
        }

        if (data.password !== data.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        if (!passwordChecks.length || !passwordChecks.special || !passwordChecks.number) {
            setErrors({ password: "Password does not meet requirements" });
            return;
        }

        // Call register API
        const response = await authService.register(
            data.fullName as string,
            data.email as string,
            data.password as string
        );

        if (response.IsSuccess) {
            authStore.getState().login(response.Data);
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ADF709] via-[#F3ADC3] to-[#00CCFF] py-8">
            <Card className="bg-white rounded-3xl shadow-2xl flex flex-row w-full max-w-5xl overflow-hidden">
                {/* Left Side - Image */}
                <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-[#00CCFF] to-[#ADF709] items-center justify-center p-12">
                    <div className="relative z-10 text-center">
                        <h3 className="text-4xl font-bold text-white mb-4">Welcome Back!</h3>
                        <p className="text-white/90 text-lg mb-8">
                            To keep connected with us please login with your personal info
                        </p>
                        <Image
                            isBlurred
                            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600&q=80"
                            alt="Welcome Back"
                            className="rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex flex-col justify-between px-10 py-12 w-full md:w-1/2">
                    <div>
                        <div className="font-logo text-4xl font-bold mb-8 bg-gradient-to-r from-[#ADF709] via-[#F3ADC3] to-[#00CCFF] bg-clip-text text-transparent">
                            Melarist
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-800">Create Account</h2>
                        <p className="text-gray-600 mb-6">Sign up and get 30 days free trial</p>

                        <Form className="space-y-4" validationErrors={errors} onSubmit={onSubmit}>
                            <Input
                                name="fullName"
                                type="text"
                                label="Full Name"
                                placeholder="John Doe"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 hover:border-[#ADF709] focus-within:border-[#ADF709]",
                                    input: "text-gray-800",
                                    label: "text-gray-700 font-medium"
                                }}
                                required
                            />

                            <Input
                                name="email"
                                type="email"
                                label="Email Address"
                                placeholder="your.email@example.com"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 hover:border-[#ADF709] focus-within:border-[#ADF709]",
                                    input: "text-gray-800",
                                    label: "text-gray-700 font-medium"
                                }}
                                required
                            />
                            
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="Create a strong password"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 hover:border-[#ADF709] focus-within:border-[#ADF709]",
                                    input: "text-gray-800",
                                    label: "text-gray-700 font-medium"
                                }}
                                required
                                onChange={(e) => {
                                    const confirmPassword = (document.querySelector('input[name="confirmPassword"]') as HTMLInputElement)?.value || '';
                                    validatePassword(e.target.value, confirmPassword);
                                }}
                                endContent={
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-[#ADF709] transition"
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

                            <Input
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                label="Confirm Password"
                                placeholder="Re-enter your password"
                                fullWidth
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 hover:border-[#ADF709] focus-within:border-[#ADF709]",
                                    input: "text-gray-800",
                                    label: "text-gray-700 font-medium"
                                }}
                                required
                                onChange={(e) => {
                                    const password = (document.querySelector('input[name="password"]') as HTMLInputElement)?.value || '';
                                    validatePassword(password, e.target.value);
                                }}
                                endContent={
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-gray-400 hover:text-[#ADF709] transition"
                                    >
                                        {showConfirmPassword ? (
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

                            {/* Password Requirements */}
                            <div className="flex flex-col gap-2 text-xs">
                                <div className={`flex items-center gap-2 transition ${passwordChecks.length ? 'text-[#ADF709]' : 'text-gray-400'}`}>
                                    <span className={`h-2 w-2 rounded-full inline-block ${passwordChecks.length ? 'bg-[#ADF709]' : 'bg-gray-300'}`} />
                                    At least 8 characters
                                </div>
                                <div className={`flex items-center gap-2 transition ${passwordChecks.special ? 'text-[#ADF709]' : 'text-gray-400'}`}>
                                    <span className={`h-2 w-2 rounded-full inline-block ${passwordChecks.special ? 'bg-[#ADF709]' : 'bg-gray-300'}`} />
                                    Contains special character
                                </div>
                                <div className={`flex items-center gap-2 transition ${passwordChecks.number ? 'text-[#ADF709]' : 'text-gray-400'}`}>
                                    <span className={`h-2 w-2 rounded-full inline-block ${passwordChecks.number ? 'bg-[#ADF709]' : 'bg-gray-300'}`} />
                                    Contains number
                                </div>
                                <div className={`flex items-center gap-2 transition ${passwordChecks.match ? 'text-[#ADF709]' : 'text-gray-400'}`}>
                                    <span className={`h-2 w-2 rounded-full inline-block ${passwordChecks.match ? 'bg-[#ADF709]' : 'bg-gray-300'}`} />
                                    Passwords match
                                </div>
                            </div>

                            <Checkbox
                                name="terms"
                                classNames={{
                                    wrapper: "after:bg-[#ADF709]"
                                }}
                                required
                            >
                                <span className="text-sm text-gray-600">
                                    I agree to the{" "}
                                    <a href="#" className="text-[#00CCFF] hover:text-[#0099CC] font-medium">
                                        Terms & Conditions
                                    </a>
                                </span>
                            </Checkbox>

                            <Button
                                className="w-full font-bold bg-gradient-to-r from-[#ADF709] to-[#00CCFF] text-white text-base rounded-xl py-6 hover:opacity-90 transition shadow-lg mt-2"
                                size="lg"
                                type="submit"
                            >
                                CREATE ACCOUNT
                            </Button>
                        </Form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="bordered"
                                className="flex-1 bg-white border-2 border-gray-200 hover:border-[#ADF709] text-gray-700 font-semibold transition"
                                startContent={
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                                }
                            >
                                Google
                            </Button>
                            <Button
                                variant="bordered"
                                className="flex-1 bg-white border-2 border-gray-200 hover:border-[#ADF709] text-gray-700 font-semibold transition"
                                startContent={
                                    <img src="https://www.svgrepo.com/show/512317/apple-173.svg" alt="Apple" className="h-5 w-5" />
                                }
                            >
                                Apple
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-6 text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="ml-1 text-[#00CCFF] hover:text-[#0099CC] font-semibold">
                            Sign In
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    );
}