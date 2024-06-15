"use client";

import { createCat } from "@/actions/cat/create";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useFormStatus } from "react-dom";

{
  /* <Image src="/cat-drop-zone.webp" width={100} height={100} alt="Cat" /> */
}

function DashedBorderDragAndDropFileInputArea() {
  return (
    <div className="border-dashed border-2 border-fuchsia-300 rounded-lg p-4 h-fit text-center flex flex-col justify-center items-center relative">
      <div className="opacity-40">
        <Image src="/cat-drop-zone.jpeg" width={350} height={250} alt="Cat" />
        <input type="file" name="catImage" className="hidden" />
      </div>
      {/* <div
        className="h-full w-full"
        style={{ backgroundImage: "url(/cat-drop-zone.jpeg)", width: "484" }}
      > */}
      <p className="text-fuchsia-400 text-6xl absolute font-extrabold p-4 m-2 opacity-80">
        CAT DROP ZONE
      </p>
      {/* </div> */}
    </div>
  );
}

function SendCatsForm({ createCat = (formData: FormData) => {} }) {
  return (
    <form
      action={createCat}
      className="flex flex-col max-w-screen-sm m-auto gap-y-4"
    >
      <div>
        <DashedBorderDragAndDropFileInputArea />
        <p className="text-slate-600 text-sm mt-1">
          Drag and drop a cat image above or click to select a file
        </p>
      </div>
      <TextField label="" name="catName" multiline rows={2} />
      {/* <TextField label="Cat Image" name="catImage" type="file" /> */}
      <Button type="submit" variant="outlined">
        Send Cat
      </Button>
    </form>
  );
}

function SignIn() {
  return (
    <div className="flex flex-col max-w-screen-sm m-auto">
      <h1 className="text-6xl font-bold mb-4">
        You're moments away from creating a cat!
      </h1>
      <h2 className="text-xl font-bold mb-4 tracking-widest text-slate-600 my-10">
        Sign in first by clicking the button below
      </h2>
      <Button component="div">
        <SignInButton />
      </Button>
      <div>
        <p className="text-slate-700 text-sm mt-2">
          <InformationCircleIcon className="size-6 text-slate-600 inline" />{" "}
          GetCatsFast will never ask for your password or any other sensitive
          information.
        </p>
      </div>
    </div>
  );
}

export default function SendCats() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <main>
        <h1>Send Cats</h1>
        <p>Sending cat...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <SignedIn>
        <SendCatsForm createCat={createCat} />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </main>
  );
}
