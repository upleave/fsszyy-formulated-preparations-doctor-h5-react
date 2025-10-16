import "./App.css";
import { showAlert } from "./utils/modal.utils";
import PullList from "./components/PullList";
import { useQuery } from "@tanstack/react-query";
import { get } from "./utils/request.utils";

function App() {
  function handleShowModal() {
    showAlert({ title: "提示", children: <p>这是弹窗内容</p> });
  }

  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: async (): Promise<{ id: string; name: string }[]> => {
      const response = await get<{ id: string; name: string }[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    },
  });

  console.log(data);

  return (
    <>
      <div className="h-[100vh]">
        <PullList
          getData={async () => {
            console.log(data);
            return data ?? [];
          }}
          renderItem={(item) => (
            <div key={item.id + item.name}>{item.name}</div>
          )}
        />
      </div>
      <button onClick={handleShowModal}>显示弹窗</button>
    </>
  );
}

export default App;
