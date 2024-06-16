"use server";
import { getCatById } from "@/actions/cat/getCatById";
import CatCard from "@/components/catcard";

// function CatCard({ cat }: { cat: Cat }) {
//   const [openPreview, setOpenPreview] = useState(false);

//   const onClick = () => {
//     setOpenPreview(true);
//   };

//   if (openPreview) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <div className="bg-white p-4 rounded">
//           <Image src={cat.image} width={800} height={800} alt={cat.title} />
//           <h1 className="text-3xl font-bold">{cat.title}</h1>
//           <button onClick={() => setOpenPreview(false)}>Close</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-y-4">
//       <div
//         onClick={onClick}
//         className="border-2 border-sky-300 rounded p-4 cursor-pointer"
//       >
//         <Image src={cat.image} width={400} height={400} alt={cat.title} />
//       </div>
//       <h1 className="text-3xl font-bold">{cat.title}</h1>
//     </div>
//   );
// }

export default async function CatComponent({ id }: { id: string }) {
  const cat = await getCatById(id);

  if (!cat) {
    return <div>Failed to get cat</div>;
  }

  return <CatCard cat={cat} />;
}
