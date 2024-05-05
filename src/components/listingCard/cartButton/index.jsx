import TextLoader from "@/components/loader/textLoader";
import { GlobalContext } from "@/context";
import { deleteProductService } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function CardButton({ item }) {
  const pathName = usePathname();
  const isAdminView = pathName.includes("/admin-view");
  const { loader, setLoader } = useContext(GlobalContext);

  const router = useRouter();
  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  async function handleDeleteProduct(id) {
    setLoader({ loading: true, id: id });
    const response = await deleteProductService(id);

    if (response.success) {
      setLoader({ loading: false, id: "" });

      toast.success(response.message);
      router.refresh();
    } else {
      setLoader({ loading: false, id: "" });
      toast.error(response.message);
    }
  }
  return isAdminView ? (
    <>
      <button
        onClick={() => {
          router.push(
            "/admin-view/update-product/" +
              item._id +
              "?" +
              createQueryString("key", JSON.stringify(item))
          );
        }}
        className="card-button"
      >
        Update
      </button>
      <button
        className="card-button"
        onClick={() => handleDeleteProduct(item._id)}
      >
        {loader && loader.loading && item._id == loader.id ? (
          <TextLoader
            text="deleting product ..."
            loading={loader}
            color="white"
          />
        ) : (
          "Delete"
        )}
      </button>
    </>
  ) : (
    <button className="card-button">Add to Card</button>
  );
}