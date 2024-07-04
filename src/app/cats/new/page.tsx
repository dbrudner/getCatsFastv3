"use client";

import { createCatWithFormData } from "@/actions/cat";
import Loading from "@/app/components/loading/loading";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { CheckIcon } from "@heroicons/react/24/outline";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  ButtonGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { create } from "zustand";

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
    <form action="/report-issue" method="post">
      <input type="hidden" name="issue" value="cat-drop-zone" />
      <FormHelperText>
        Having trouble sending cats? Click <button type="submit">here</button>{" "}
        to to let us know
        {/* <span className="text-fuchsia-400 font-bold">cat specialist</span>. */}
      </FormHelperText>
    </form>
  );
}

function SupportFromCatFansLikeYou() {
  return (
    <div>
      <p className="text-slate-600 text-xs">
        Your support helps us provide cats to those who need them most
      </p>
    </div>
  );
}

function SendCatButton() {
  const { pending } = useFormStatus();

  const loadingButtonText = pending ? "Life is butter dream" : "Coming soon";

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      className="bg-fuchsia-500 text-white"
      loading={pending}
      loadingPosition="end"
      disabled
    >
      {loadingButtonText}
    </LoadingButton>
  );
}

function SendCatsForm({ createCatWithFormData = (formData: FormData) => {} }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputEl = fileInputRef.current;

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

  const onClick = () => {
    removeFiles();

    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const onChange = (event: any) => {
    const catImageFile = event.target.files[0];

    if (catImageFile) {
      setHasDroppedFile(true);
    }
  };

  const removeFiles = () => {
    const fileInputEl = fileInputRef.current;

    if (fileInputEl) {
      fileInputEl.value = "";
      setHasDroppedFile(false);
    }
  };

  return (
    <Box
      component="div"
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div>
        <h1 className="text-4xl font-bold tracking-wide">
          <span className="text-sky-300">GetCatsFast</span> Distribution Center
        </h1>
        <p className="text-slate-600">
          We appreciate your ongoing support and interest in sending cats. This
          community depends on the kindness of cat lovers like you.
        </p>
      </div>
      <div className="my-4">
        <ButtonGroup>
          <Link href="/cat/new">
            <Button variant="outlined" color="primary">
              Single Cat
            </Button>
          </Link>
          <Link href="/cats/new">
            <Button variant="contained" color="primary">
              MultiCat™
            </Button>
          </Link>
        </ButtonGroup>
      </div>

      <form
        action={createCatWithFormData}
        className="flex flex-col m-auto gap-y-4"
      >
        <input
          ref={fileInputRef}
          type="file"
          name="catImage"
          className="hidden"
          onChange={onChange}
          accept="image/*"
          multiple={false}
        />
        <Box>
          <Box>Coming soon</Box>
          <FormHelperText>This feature will be launched soon</FormHelperText>
        </Box>
        <TextField
          disabled
          label=""
          name="catName"
          multiline
          rows={2}
          maxRows={2}
          placeholder="Cute cats being cute #boyboys"
          helperText="Enter anything you'd like to share about these cat pictures."
          inputProps={{ maxLength: 100 }}
        />
        <SendCatButton />
      </form>
      <div className="mt-1">
        <CatSpecialistAlert />
      </div>
    </Box>
  );
}

function SignIn() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-white font-bold mb-4">
        You&apos;re just moments away from becoming a{" "}
        <span className="text-sky-300">GetCatsFast</span> Contributor!
      </h1>
      <div className="flex items-center">
        <span className="flex items-center justify-center w-10 h-10 border-4 border-lime-600 rounded-full shrink-0">
          <CheckIcon className="w-6 h-6 text-lime-600" />
        </span>
        <div className="ml-6">
          <h2 className="text-xl font-bold tracking-widest text-slate-600">
            Find GetCatsFast.com
          </h2>
          <p className="text-slate-600">The fastest way to get cats</p>
        </div>
      </div>

      <div className="flex items-center mt-6">
        <span className="flex items-center justify-center w-10 h-10 border-4 border-blue-600 rounded-full shrink-0">
          2
        </span>
        <div className="ml-6">
          <h2 className="text-xl font-bold tracking-widest text-white">
            Sign in by clicking the button below.
          </h2>
          <p className="text-slate-600 mb-4">
            With <span className="text-slate-400">Google</span> or an email
            address
          </p>
          <SignInButton>
            <Button variant="contained" fullWidth type="button">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>

      <div className="flex items-center mt-6">
        <span className="flex items-center justify-center w-10 h-10 border-4 border-slate-600 rounded-full shrink-0 ">
          3
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
        <span className="flex items-center justify-center w-10 h-10 border-4 border-slate-600 rounded-full shrink-0 ">
          4
        </span>
        <div className="ml-6">
          <h2 className="text-xl font-bold tracking-widest text-slate-600">
            Enjoy Cats
          </h2>
          <p className="text-slate-600">
            Your cat will delight cat lovers around the world, and you can enjoy
            other cats in the meantime
          </p>
        </div>
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
    <main className="min-h-screen flex flex-col justify-center m-auto px-4">
      <ClerkLoaded>
        <SignedIn>
          <div className="m-auto">
            <SendCatsForm
              createCatWithFormData={(formData) =>
                createCatWithFormData(formData)
              }
            />
          </div>
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </ClerkLoaded>
      <ClerkLoading>
        <div className="flex flex-col items-center justify-center">
          <Loading />
        </div>
      </ClerkLoading>
    </main>
  );
}
