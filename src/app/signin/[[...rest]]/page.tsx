import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Box } from "@mui/material";

export default function Signin() {
  return (
    <Box sx={{ ".cl-footer": { background: "none" } }}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <SignIn
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "min-w-screen max-w-md w-full border-none",
              headerTitle: "text-4xl tracking-wider text-left",
              headerSubtitle: "text-left tracking-wide",
              card: "bg-green rounded-none border-none bg-gradient-to-r from-slate-950 to-slate-800",
              cardBox: "rounded-none w-full border-none shadow-none",
              formButtonPrimary: `bg-black text-white font-bold`,
              footer: "justify-start items-start",
              footerAction: "justify-start",
              footerActionLink: "text-fuchsia-300 font-bold text-left ml-1",
            },
            variables: {
              borderRadius: "5px",
            },
          }}
        />
      </div>
    </Box>
  );
}
