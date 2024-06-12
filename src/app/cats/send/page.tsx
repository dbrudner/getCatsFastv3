"use client";

import { createCat } from "@/actions/cat/create";
import { useFormStatus } from "react-dom";

const Label = (props) => {
  return <label className="text-white" {...props} />;
};

const Button = (props) => {
  return (
    <button
      className="text-white bg-black border border border-sky-500 p-2"
      {...props}
    />
  );
};

const Input = (props) => {
  return (
    <input
      className="text-white bg-black border border border-sky-500 p-2 w-80"
      {...props}
    />
  );
};

const DragAndDropFileInput = (props) => {
  return (
    <input
      type="file"
      className="text-white bg-black border border border-sky-500 p-2 w-80"
      {...props}
    />
  );
};

const JustifyBetweenFlexContainer = (props) => {
  return (
    <div className="flex flex-col justify-between  w-full gap-x-2" {...props} />
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
    <main className="text-center min-h-screen flex flex-col justify-center">
      <SendCatsForm createCat={createCat} />
    </main>
  );
}
