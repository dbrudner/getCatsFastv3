"use client";

import { createCat } from "@/actions/cat/create";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/base";
import { useFormStatus } from "react-dom";

const Label = (props: any) => {
  return <label className="text-white mb-1" {...props} />;
};

const Input = (props: any) => {
  return (
    <input
      className="text-white bg-black border border border-sky-500 p-2 w-80 text-left"
      {...props}
    />
  );
};

const DragAndDropFileInput = (props: any) => {
  return (
    <input
      type="file"
      className="text-white bg-black border border border-sky-500 p-2 w-80"
      {...props}
    />
  );
};

const JustifyBetweenFlexContainer = (props: any) => {
  return (
    <div
      className="flex flex-col justify-between w-full gap-x-2 items-start"
      {...props}
    />
  );
};

function SendCatsForm({ createCat = (formData: FormData) => {} }) {
  return (
    <form
      action={createCat}
      className="flex flex-col max-w-screen-sm m-auto gap-y-6"
    >
      <JustifyBetweenFlexContainer>
        <Label>Cat Name</Label>
        <Input type="text" name="catName" maxLength={10} />
      </JustifyBetweenFlexContainer>
      <JustifyBetweenFlexContainer>
        <Label>Cat Image</Label>
        <DragAndDropFileInput name="catImage" />
      </JustifyBetweenFlexContainer>
      <Button type="submit">Send Cat</Button>
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
      <div
        role="button"
        className="text-white bg-black border border border-sky-500 p-2 text-center cursor-pointer"
      >
        <SignInButton />
      </div>
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
