import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Signin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: dark,
          elements: {
            card: "bg-slate-900",
            formButtonPrimary: `bg-black text-white font-bold`,
          },
          variables: {
            borderRadius: "5px",
          },
        }}
      />
    </div>
  );
}
