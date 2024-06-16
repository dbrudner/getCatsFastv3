import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@mui/material";

export default function Logout() {
  return (
    <div className="flex flex-col gap-y-24 items-center p-4">
      <h1>Logout</h1>
      <Button variant="contained">
        <SignOutButton redirectUrl="/cat/new" />
      </Button>
    </div>
  );
}
