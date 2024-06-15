"use client";

import { createCat } from "@/actions/cat/create";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  debounce,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { DragEventHandler, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { create } from "zustand";
import classNames from "classnames";

type DragAndDropState = {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
};

const useDragAndDropStore = create<DragAndDropState>((set) => ({
  isDragging: false,
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
}));

function CatSpecialistAlert() {
  return (
    <div>
      <p className="text-slate-500 text-xs mt-1 cursor-pointer opacity-80">
        Having trouble sending cats? Click here to chat with a{" "}
        <span className="text-fuchsia-400 font-bold">cat specialist</span>.
      </p>
    </div>
  );
}

function SupportFromCatFansLikeYou() {
  return (
    <div>
      <p className="text-slate-600 text-xs text-slate-600">
        Your support helps us provide cats to those who need them most
      </p>
    </div>
  );
}

function DashedBorderDragAndDropFileInputArea({
  isDragging,
}: {
  isDragging: boolean;
}) {
  console.log({ isDragging });

  const containerClassName = classNames(
    "border-dashed border-4 rounded-lg p-4 h-fit text-center flex flex-col justify-center items-center relative",
    {
      "border-slate-500": !isDragging,
      "border-fuchsia-500": isDragging,
    }
  );

  return (
    <div className={containerClassName}>
      <div className="opacity-40">
        <Image src="/cat-drop-zone.jpeg" width={350} height={250} alt="Cat" />
        <input type="file" name="catImage" className="hidden" />
      </div>
      <p className="text-fuchsia-400 text-6xl absolute font-extrabold p-4 m-2 opacity-80">
        CAT DROP ZONE
      </p>
    </div>
  );
}

function SendCatsForm({ createCat = (formData: FormData) => {} }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isDragging, setIsDragging } = useDragAndDropStore((state) => state);

  const [hasDroppedFile, setHasDroppedFile] = useState(false);

  const onDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (event: any) => {
    console.log(event);
    event.preventDefault();
    const catImageFile = event.dataTransfer.files[0];
    const fileInputEl = fileInputRef.current;

    if (catImageFile && fileInputEl) {
      fileInputEl.files = event.dataTransfer.files;
      setHasDroppedFile(true);
    }

    setIsDragging(false);
  };

  return (
    <Box
      component="div"
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-widest">
          Cat Distribution Center
        </h1>
        <p className="text-slate-600">
          We appreciate your ongoing support and interest in sending cats. This
          community depends on the kindness of cat lovers like you.
        </p>
      </div>
      <form action={createCat} className="flex flex-col m-auto gap-y-4">
        <input
          ref={fileInputRef}
          type="file"
          name="catImage"
          className="hidden"
        />
        <div>
          <DashedBorderDragAndDropFileInputArea isDragging={isDragging} />
          <p className="text-slate-600 text-sm mt-1 font-semibold">
            Gently drop a cat image into the area above or click to select a
            file
          </p>
        </div>
        <TextField
          label=""
          name="catName"
          multiline
          rows={2}
          placeholder="Cute cat being cute"
        />
        {/* <TextField label="Cat Image" name="catImage" type="file" /> */}
        <Button type="submit" variant="contained" disabled={!hasDroppedFile}>
          Send Cat
        </Button>
        <CatSpecialistAlert />
      </form>
    </Box>
  );
}

function SignIn() {
  return (
    <div className="flex flex-col">
      <h1 className="text-6xl text-slate-600 font-bold mb-4">
        You&apos;re moments away from creating a cat!
      </h1>
      <div className="flex items-center">
        <span className="flex items-center justify-center w-10 h-10 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
          1
        </span>
        <div className="ml-6">
          <h2 className="text-xl font-bold tracking-widest text-slate-600 mb-4">
            Sign in first by clicking the sign in button below with either your
            Google account or email
          </h2>
          <Button component="div" variant="contained" fullWidth>
            <SignInButton />
          </Button>
        </div>
      </div>

      <div className="flex items-center mt-6">
        <span className="flex items-center justify-center w-10 h-10 border border-slate-600 rounded-full shrink-0 ">
          2
        </span>
        <div className="ml-6">
          <h2 className="text-xl font-bold tracking-widest text-slate-600">
            Upload Cat
          </h2>
          <p className="text-slate-600">
            Once you&apos;re signed in, you can upload a cat image
          </p>
        </div>
      </div>
      <div className="flex items-center mt-6">
        <span className="flex items-center justify-center w-10 h-10 border border-slate-600 rounded-full shrink-0 ">
          3
        </span>
        <div className="ml-6">
          <h2 className="text-xl font-bold tracking-widest text-slate-600">
            Enjoy Cats
          </h2>
        </div>
      </div>

      {/* <div>
        <p className=" text-white text-sm mt-2">
          <InformationCircleIcon className="size-6 text-white inline" />{" "}
          GetCatsFast will never ask for any sensitive personal information,
          only your cats.
        </p>
      </div> */}
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
    <main className="min-h-screen flex flex-col justify-center max-w-screen-sm m-auto px-4">
      <SignedIn>
        <div className="max-w-screen-sm m-auto">
          <SendCatsForm createCat={createCat} />
        </div>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </main>
  );
}
