import { Client } from "./client"
export default async function Home() {

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Client/>
    </div>
  );
};
