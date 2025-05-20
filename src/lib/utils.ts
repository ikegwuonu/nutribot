import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { showerror } from "./toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const err = error?.response?.data?.errors as any[];

  if (!navigator.onLine) {
    return showerror("No internet connection.");
  }
  if (error?.code === "ERR_NETWORK") {
    return showerror("Network error occurred.");
  }

  if (error?.message) {
    return showerror(error.message);
  }
  if (typeof error == "string") {
    return showerror(error);
  }

  if (error?.data?.message) {
    return showerror(error?.data?.message);
  }
  if (error?.request) {
    return showerror(error?.statusText);
  } else {
    return showerror("An error occurred");
  }
};
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
export const convertSecToMin = (val: number) => {
  const min = Math.floor(val / 60);

  const sec = (val % 60).toString().padStart(2, "0");
  return min + ":" + sec;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getInitials = (firstName: string, lastName: string): string => {
  return (firstName[0] + lastName[0]).toUpperCase();
};

//  // Function to render star rating
//  const renderRating = (rating: number, book: any) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;

//   return (
//     <div className="flex items-center">
//       <div className="flex mr-1">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={`h-4 w-4 ${
//               i < fullStars
//                 ? "text-yellow-500 fill-yellow-500"
//                 : i === fullStars && hasHalfStar
//                   ? "text-yellow-500 fill-yellow-500"
//                   : "text-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//       <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
//       <span className="text-xs text-gray-500 ml-1">({book.reviews})</span>
//     </div>
//   );
// };
