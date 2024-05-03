import { usePathname } from "next/navigation";

export default function CardButton() {
  const pathName = usePathname();
  const isAdminView = pathName.includes("/admin-view");
  return isAdminView ? (
    <>
      <button className="card-button">Update</button>
      <button className="card-button">Delete </button>
    </>
  ) : (
    <button className="card-button">Add to Card</button>
  );
}
