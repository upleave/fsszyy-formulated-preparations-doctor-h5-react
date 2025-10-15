import "./App.css";
import { showAlert } from "./utils/modal.utils";
import PullList from "./components/PullList";
import { useQuery } from "@tanstack/react-query";

let index = 1;
async function getListData(refresh?: boolean) {
  if (refresh) index = 1;
  return new Promise<{id: string, name: string}[]>((resolve) => {
    setTimeout(() => {
      const arr = [...Array(10)].map((_, i) => ({
        id: `${index + i}`,
        name: `${index + i} name`
      }));
      console.log(arr);
      resolve(arr);
      index += 10;
    }, 500);
  });
}

function App() {
  function handleShowModal() {
    showAlert({ title: "提示", children: <p>这是弹窗内容</p> });
  }

  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      return response.json()
    }
  })

  console.log(data)

  return (
    <>
      <div className='h-[100vh]'>
        <PullList
          getData={() => {
            console.log(data)
            return data
          }}
          renderItem={(item) => <div key={item.id + item.name}>{item.name}</div>}
        />
      </div>
      <button onClick={handleShowModal}>显示弹窗</button>
    </>
  );
}

export default App;
