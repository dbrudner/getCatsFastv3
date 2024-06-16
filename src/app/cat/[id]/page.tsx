import Cat from "./cat";

export default function CatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-y-24 items-center p-4">
      <Cat id={params.id} />
    </div>
  );
}
